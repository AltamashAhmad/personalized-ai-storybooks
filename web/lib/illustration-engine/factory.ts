import { IIllustrationEngine } from '@/types/engine';
import { FluxIllustrationAdapter } from './flux-adapter';

/**
 * Illustration Engine Factory
 * Decouples image generation providers so any model (Flux, Midjourney, Ideogram, Imagen 3)
 * can be plugged in without changing domain or UI code.
 *
 * Unknown providers THROW — there is no silent fallthrough to a default,
 * because silently generating with the wrong engine would produce the wrong
 * illustrations for a child's book.
 */
export class IllustrationEngineFactory {
  private static instance: IIllustrationEngine | null = null;

  public static getEngine(): IIllustrationEngine {
    if (this.instance) {
      return this.instance;
    }

    const provider = (process.env.ILLUSTRATION_ENGINE_PROVIDER || 'flux').toLowerCase();

    switch (provider) {
      case 'flux':
        this.instance = new FluxIllustrationAdapter();
        break;
      default:
        throw new Error(
          `[IllustrationEngineFactory] Unknown illustration provider "${provider}". ` +
            `Set ILLUSTRATION_ENGINE_PROVIDER to one of: 'flux'.`
        );
    }

    return this.instance;
  }

  public static reset(): void {
    this.instance = null;
  }
}
