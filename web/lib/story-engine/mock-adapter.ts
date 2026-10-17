import { IStoryEngine, StoryRequest, StoryOutput } from '@/types/engine';
import { validateChildName } from './story-json';

/**
 * Mock Story Engine — offline development ONLY.
 *
 * This adapter is selected ONLY when STORY_ENGINE_PROVIDER=mock (see
 * factory.ts). It returns the legacy canned 2-spread demo story with
 * HONEST metadata (modelUsed: 'mock-fallback', tokensUsed: 0,
 * estimatedCostUsd: 0) so nothing downstream can mistake it for a real
 * generation. It must never be reachable in production.
 */
export class MockStoryEngineAdapter implements IStoryEngine {
  async moderateChildName(name: string): Promise<{ isSafe: boolean; flaggedReason?: string }> {
    return validateChildName(name);
  }

  async generateStory(request: StoryRequest): Promise<StoryOutput> {
    const startTime = Date.now();
    const childName = request.child.name;

    return {
      bookId: `book_${childName.toLowerCase().replace(/[^a-z0-9]/g, '')}_${Date.now()}`,
      title: {
        en: `${childName} and the Secret of the Starlit Dunes`,
        ar: `${childName} وسر الكثبان المضيئة بالنجوم`,
      },
      child: request.child,
      dedication: {
        text: request.dedicationText || `For our brave adventurer ${childName}. With all our love, Mama & Baba.`,
        date: new Date().toISOString().slice(0, 10),
      },
      spreads: [
        {
          spreadNumber: 1,
          leftPageText: {
            en: `The golden desert whispers soft when evening shadows grow,\nA little explorer named ${childName} watched the shifting sunset glow.\nIn their hand, an ancient compass pointed to the sky,\nWhere the first bright evening star was dancing way up high.`,
            ar: `تَهْمِسُ الرِّمَالُ الذَّهَبِيَّةُ حِينَ يَمِيلُ المَسَاءُ،\nوَ${childName} البَطَلُ يَتَأَمَّلُ كَيْفَ تَغِيبُ الأَضْوَاءُ.\nفِي يَدِهِ بَوْصَلَةٌ قَدِيمَةٌ تُشِيرُ نَحْوَ الفَضَاءِ،\nحَيْثُ يُنِيرُ أَوَّلُ نَجْمٍ فِي كَبِدِ السَّمَاءِ.`,
          },
          illustrationPrompt: `Cinematic children's book illustration, Pixar meets vintage watercolor style. A happy 5-year-old child named ${childName} stands atop a sweeping golden sand dune during a glowing Arabian sunset holding an antique brass compass. Ultra-detailed, 300 DPI.`,
          characterSeed: 8492041,
          mood: 'wonder and anticipation',
        },
        {
          spreadNumber: 2,
          leftPageText: {
            en: `A gentle rustle in the breeze, a chirp from up above,\nA baby falcon with soft wings of courage, hope, and love.\n${childName} held the lantern close and whispered, "Do not fear,\nWe'll find your mother in the stars, the desert path is clear!"`,
            ar: `حَفِيفٌ نَاعِمٌ فِي النَّسِيمِ، وَصَوْتٌ يُنَادِي مِنَ الأَعَالِي،\nفَرْخُ صَقْرٍ ذَهَبِيٍّ يَخْفِقُ بِأَجْنِحَةِ الآمَالِ.\nقَرَّبَ ${childName} قِنْدِيلَهُ وَقَالَ: «لا تَخَفْ يَا صَغِيرِي،\nسَنَتْبَعُ نُجُومَ السَّمَاءِ لِتُضِيءَ دَرْبَ مَسِيرِي!»`,
          },
          illustrationPrompt: `A cozy moonlit desert clearing. The child ${childName} gently offers water to a baby golden falcon perched upon a smooth desert stone. Bioluminescent starlight sparkles around them.`,
          characterSeed: 8492041,
          mood: 'empathy and friendship',
        },
      ],
      metadata: {
        // Honest mock labels — never claim real model usage or token counts.
        modelUsed: 'mock-fallback',
        generationTimeMs: Date.now() - startTime,
        tokensUsed: 0,
        estimatedCostUsd: 0,
      },
    };
  }
}
