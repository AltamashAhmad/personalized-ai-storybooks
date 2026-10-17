import { IStoryEngine } from '@/types/engine';
import { ClaudeStoryEngineAdapter } from './claude-adapter';
import { OpenAIStoryEngineAdapter } from './openai-adapter';
import { MockStoryEngineAdapter } from './mock-adapter';

/**
 * Story Engine Factory — NEVER silently selects a mock.
 *
 * Set STORY_ENGINE_PROVIDER explicitly:
 *   - 'claude' → ClaudeStoryEngineAdapter (requires ANTHROPIC_API_KEY)
 *   - 'openai' → OpenAIStoryEngineAdapter (requires OPENAI_API_KEY)
 *   - 'mock'   → MockStoryEngineAdapter (offline development ONLY — returns
 *                  the canned demo story with honestly-labeled metadata)
 *
 * An unset or unknown provider THROWS a descriptive error instead of
 * silently falling back to canned data.
 */
export class StoryEngineFactory {
  static getEngine(provider?: string): IStoryEngine {
    const selected = (provider || process.env.STORY_ENGINE_PROVIDER || '').toLowerCase();

    switch (selected) {
      case 'claude':
        return new ClaudeStoryEngineAdapter();
      case 'openai':
        return new OpenAIStoryEngineAdapter();
      case 'mock':
        return new MockStoryEngineAdapter();
      default:
        throw new Error(
          `[StoryEngineFactory] Unknown or unset story engine provider "${selected || '(empty)'}". ` +
            `Set STORY_ENGINE_PROVIDER to one of: 'claude' (requires ANTHROPIC_API_KEY), ` +
            `'openai' (requires OPENAI_API_KEY), or 'mock' (offline development only).`
        );
    }
  }
}
