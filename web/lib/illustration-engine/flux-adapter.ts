import { IIllustrationEngine } from '@/types/engine';

/**
 * Flux.1 Illustration Engine Adapter
 * Implements high-consistency character generation using Flux Schnell/Dev (via fal.ai API or direct).
 *
 * Honesty contract: generating an illustration requires FAL_KEY (or
 * ILLUSTRATION_API_KEY). A missing key or a failed API call THROWS a
 * descriptive error — it never silently substitutes a stock photo, because a
 * substituted photo would be the wrong illustration for the child's book.
 */
export class FluxIllustrationAdapter implements IIllustrationEngine {
  private apiKey: string;
  private endpoint: string;

  constructor(apiKey?: string, endpoint?: string) {
    this.apiKey = apiKey || process.env.FAL_KEY || process.env.ILLUSTRATION_API_KEY || '';
    this.endpoint = endpoint || 'https://fal.run/fal-ai/flux/schnell';
  }

  async generateSpreadIllustration(
    prompt: string,
    characterSeed: number,
    aspectRatio: '1:1' | '16:9' | '4:3' = '16:9'
  ): Promise<{ imageUrl: string; cdnUrl: string; generationTimeMs: number }> {
    const startTime = Date.now();

    if (!this.apiKey) {
      throw new Error(
        '[FluxIllustrationAdapter] FAL_KEY (or ILLUSTRATION_API_KEY) is not configured. ' +
          'Set it to generate illustrations. Refusing to substitute a stock photo.'
      );
    }

    let response: Response;
    try {
      response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Key ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `${prompt}, children's book illustration, award-winning picture book, vibrant soft colors, high resolution, rich depth of field`,
          seed: characterSeed,
          image_size: aspectRatio === '16:9' ? 'landscape_16_9' : aspectRatio === '4:3' ? 'landscape_4_3' : 'square_hd',
          num_inference_steps: 4,
          enable_safety_checker: true,
        }),
      });
    } catch (err) {
      throw new Error(
        `[FluxIllustrationAdapter] Network error calling the illustration API: ${(err as Error).message}`
      );
    }

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(
        `[FluxIllustrationAdapter] Illustration API error ${response.status}: ${errText.slice(0, 300)}`
      );
    }

    const result = (await response.json()) as { images?: Array<{ url?: string }> };
    const imgUrl = result?.images?.[0]?.url || '';
    if (!imgUrl) {
      throw new Error('[FluxIllustrationAdapter] Illustration API returned no image URL.');
    }
    return {
      imageUrl: imgUrl,
      cdnUrl: imgUrl,
      generationTimeMs: Date.now() - startTime,
    };
  }
}
