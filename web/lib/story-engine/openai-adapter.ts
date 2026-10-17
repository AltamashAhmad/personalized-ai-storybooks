import { IStoryEngine, StoryRequest, StoryOutput } from '@/types/engine';
import { buildStoryPrompt, parseStoryJson, validateChildName } from './story-json';

/**
 * OpenAI Story Engine Adapter — REAL OpenAI Chat Completions API implementation.
 *
 * Honesty contract: when OPENAI_API_KEY is set, this calls the live API
 * and maps the real response (with real token usage) into StoryOutput.
 * When the key is missing, it THROWS — it never silently returns canned data
 * and never delegates to another provider's mock.
 * Use STORY_ENGINE_PROVIDER=mock for offline development instead.
 */
export class OpenAIStoryEngineAdapter implements IStoryEngine {
  private apiKey: string;
  private model: string;

  constructor(apiKey?: string, model: string = 'gpt-4o') {
    this.apiKey = apiKey || process.env.OPENAI_API_KEY || '';
    this.model = model;
  }

  async moderateChildName(name: string): Promise<{ isSafe: boolean; flaggedReason?: string }> {
    // Stopgap local checks (length + denylist). Production must use a real
    // moderation API — see story-json.ts.
    return validateChildName(name);
  }

  async generateStory(request: StoryRequest): Promise<StoryOutput> {
    const apiKey = this.apiKey || process.env.OPENAI_API_KEY || '';
    if (!apiKey) {
      throw new Error(
        '[OpenAIStoryEngine] OPENAI_API_KEY is not configured. Set it to generate ' +
          'stories, or set STORY_ENGINE_PROVIDER=mock for offline development.'
      );
    }

    const startTime = Date.now();
    const spreadCount = request.spreadCount ?? 12;
    const prompt = buildStoryPrompt(request, spreadCount);

    let res: Response;
    try {
      res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: 6000,
          response_format: { type: 'json_object' },
          messages: [{ role: 'user', content: prompt }],
        }),
      });
    } catch (err) {
      throw new Error(`[OpenAIStoryEngine] Network error calling OpenAI API: ${(err as Error).message}`);
    }

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(
        `[OpenAIStoryEngine] OpenAI API error ${res.status}: ${errText.slice(0, 300)}`
      );
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
      usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number };
      model?: string;
    };
    const text = json.choices?.[0]?.message?.content ?? '';
    if (!text) {
      throw new Error('[OpenAIStoryEngine] OpenAI API returned no message content.');
    }

    const parsed = parseStoryJson(text);
    const promptTokens = json.usage?.prompt_tokens ?? 0;
    const completionTokens = json.usage?.completion_tokens ?? 0;
    const childName = request.child.name;

    return {
      bookId: `book_${childName.toLowerCase().replace(/[^a-z0-9]/g, '')}_${Date.now()}`,
      title: { en: parsed.titleEn, ar: parsed.titleAr },
      child: request.child,
      dedication: {
        text: request.dedicationText || '',
        date: new Date().toISOString().slice(0, 10),
      },
      spreads: parsed.spreads.map((s, i) => ({
        spreadNumber: i + 1,
        leftPageText: { en: s.en, ar: s.ar },
        illustrationPrompt: s.illustrationPrompt || '',
        characterSeed: Math.floor(Math.random() * 1_000_000_000),
        mood: s.mood,
      })),
      metadata: {
        modelUsed: json.model || this.model,
        generationTimeMs: Date.now() - startTime,
        tokensUsed: json.usage?.total_tokens ?? promptTokens + completionTokens,
        // Compute from OpenAI's pricing table — never fabricate a cost.
        estimatedCostUsd: 0,
      },
    };
  }
}
