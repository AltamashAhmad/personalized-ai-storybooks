import { StoryRequest } from '@/types/engine';

/**
 * Shared helpers for the real (API-backed) story engine adapters.
 *
 * The adapters ask the model for strict JSON in the StoryOutput shape and map
 * the response honestly: token counts come from the provider's `usage` block,
 * and `estimatedCostUsd` is 0 with a comment — compute it from the provider's
 * pricing table, never fabricate it.
 */

export interface ParsedSpread {
  en: string;
  ar: string;
  illustrationPrompt?: string;
  mood?: string;
}

export interface ParsedStory {
  titleEn: string;
  titleAr: string;
  spreads: ParsedSpread[];
}

export function buildStoryPrompt(request: StoryRequest, spreadCount: number): string {
  const { child } = request;
  const interests = request.customInterests?.length
    ? ` The child's interests: ${request.customInterests.join(', ')}.`
    : '';
  return [
    `Write a personalized children's picture-book story of exactly ${spreadCount} spreads for a ${child.age}-year-old ${child.gender} named "${child.name}".`,
    `Theme: ${request.theme}.${interests}`,
    `Return ONLY valid JSON (no markdown fences, no commentary) with this exact shape:`,
    `{"titleEn": "...", "titleAr": "...", "spreads": [{"en": "4 rhyming English lines", "ar": "4 Arabic lines with full tashkeel", "illustrationPrompt": "short scene description for an illustrator", "mood": "one word"}]}`,
    `Rules: warm and age-appropriate; the child is the hero of the story; English verses rhyme; Arabic uses full tashkeel (harakat vowel marks); no scary, violent, or religious content.`,
  ].join('\n');
}

export function parseStoryJson(text: string): ParsedStory {
  const cleaned = text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();
  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error('[StoryEngine] The model did not return valid JSON for the story.');
  }
  const p = parsed as Partial<ParsedStory> | null;
  if (!p || typeof p.titleEn !== 'string' || !Array.isArray(p.spreads) || p.spreads.length === 0) {
    throw new Error('[StoryEngine] The model response is missing titleEn or spreads.');
  }
  for (const s of p.spreads) {
    const spread = s as Partial<ParsedSpread>;
    if (typeof spread?.en !== 'string' || typeof spread?.ar !== 'string') {
      throw new Error('[StoryEngine] The model response has a spread missing en/ar text.');
    }
  }
  return {
    titleEn: p.titleEn,
    titleAr: typeof p.titleAr === 'string' ? p.titleAr : '',
    spreads: p.spreads as ParsedSpread[],
  };
}

/**
 * Stopgap denylist for child-name moderation. This catches only the most
 * obvious cases — production MUST use a real moderation API (e.g. OpenAI
 * Moderations or Perspective) before personalizing a book.
 */
const BLOCKED_TERMS = [
  // English — hate, extremist, sexual, and profane terms
  'hitler',
  'nazi',
  'isis',
  'terrorist',
  'rape',
  'porn',
  'xxx',
  'fuck',
  'shit',
  'bitch',
  'whore',
  'slut',
  'bastard',
  // Arabic — extremist and profane terms
  'هتلر',
  'نازي',
  'داعش',
  'إرهاب',
  'إرهابي',
];

export function findBlockedTerm(name: string): string | null {
  const lower = name.toLowerCase();
  for (const term of BLOCKED_TERMS) {
    if (term && lower.includes(term.toLowerCase())) return term;
  }
  return null;
}

export function validateChildName(name: string): { isSafe: boolean; flaggedReason?: string } {
  const trimmed = name.trim();
  if (!trimmed || trimmed.length > 30) {
    return { isSafe: false, flaggedReason: 'Name length must be between 1 and 30 characters.' };
  }
  const blocked = findBlockedTerm(trimmed);
  if (blocked) {
    return { isSafe: false, flaggedReason: 'This name cannot be used for a personalized book.' };
  }
  return { isSafe: true };
}
