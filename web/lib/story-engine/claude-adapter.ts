import { IStoryEngine, StoryRequest, StoryOutput } from '@/types/engine';
import { buildStoryPrompt, parseStoryJson, validateChildName } from './story-json';

/**
 * Claude Story Engine Adapter — REAL Anthropic Messages API implementation.
 *
 * Honesty contract: when ANTHROPIC_API_KEY is set, this calls the live API
 * and maps the real response (with real token usage) into StoryOutput.
 * When the key is missing, it THROWS — it never silently returns canned data.
 * Use STORY_ENGINE_PROVIDER=mock for offline development instead.
 */
export class ClaudeStoryEngineAdapter implements IStoryEngine {
  private apiKey: string;
  private model: string;

  constructor(apiKey?: string, model: string = 'claude-sonnet-5') {
    this.apiKey = apiKey || process.env.ANTHROPIC_API_KEY || '';
    this.model = model;
  }

  async moderateChildName(name: string): Promise<{ isSafe: boolean; flaggedReason?: string }> {
    // Stopgap local checks (length + denylist). Production must use a real
    // moderation API — see story-json.ts.
    return validateChildName(name);
  }

  async generateStory(request: StoryRequest): Promise<StoryOutput> {
    const apiKey = this.apiKey || process.env.ANTHROPIC_API_KEY || '';
    if (!apiKey) {
      throw new Error(
        '[ClaudeStoryEngine] ANTHROPIC_API_KEY is not configured. Set it to generate ' +
          'stories, or set STORY_ENGINE_PROVIDER=mock for offline development.'
      );
    }

    const startTime = Date.now();
    const spreadCount = request.spreadCount ?? 12;
    const prompt = buildStoryPrompt(request, spreadCount);

    let res: Response;
    try {
      res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: 6000,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
    } catch (err) {
      throw new Error(`[ClaudeStoryEngine] Network error calling Anthropic API: ${(err as Error).message}`);
    }

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(
        `[ClaudeStoryEngine] Anthropic API error ${res.status}: ${errText.slice(0, 300)}`
      );
    }

    const json = (await res.json()) as {
      content?: Array<{ type?: string; text?: string }>;
      usage?: { input_tokens?: number; output_tokens?: number };
      model?: string;
    };
    const text = json.content?.find((b) => b?.type === 'text')?.text ?? '';
    if (!text) {
      throw new Error('[ClaudeStoryEngine] Anthropic API returned no text content.');
    }

    const parsed = parseStoryJson(text);
    const inputTokens = json.usage?.input_tokens ?? 0;
    const outputTokens = json.usage?.output_tokens ?? 0;
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
        tokensUsed: inputTokens + outputTokens,
        // Compute from Anthropic's pricing table — never fabricate a cost.
        estimatedCostUsd: 0,
      },
    };
  }
}
