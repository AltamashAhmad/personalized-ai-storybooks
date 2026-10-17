/**
 * Core Domain & Engine Contracts (Ports & Adapters Architecture)
 * Any AI model, payment gateway, image generator, or PDF compiler must implement these interfaces.
 */

export interface ChildProfile {
  name: string;
  gender: 'boy' | 'girl';
  age: number;
  appearance?: {
    hairColor?: string;
    skinTone?: string;
    eyeColor?: string;
    hasGlasses?: boolean;
    avatarPromptDescription?: string;
  };
}

export interface StoryRequest {
  child: ChildProfile;
  theme: 'desert' | 'space' | 'bedtime' | 'ocean' | 'custom';
  language: 'bilingual' | 'en' | 'ar' | 'de' | 'fr' | 'es';
  customInterests?: string[];
  dedicationText?: string;
  spreadCount?: number;
}

export interface PageSpread {
  spreadNumber: number;
  leftPageText: {
    en?: string;
    ar?: string;
    de?: string;
    fr?: string;
    es?: string;
  };
  rightPageText?: {
    en?: string;
    ar?: string;
    de?: string;
    fr?: string;
    es?: string;
  };
  illustrationPrompt: string;
  characterSeed: number;
  mood?: string;
}

export interface StoryOutput {
  bookId: string;
  title: {
    en: string;
    ar?: string;
    de?: string;
    fr?: string;
    es?: string;
  };
  child: ChildProfile;
  dedication: {
    text: string;
    date: string;
  };
  spreads: PageSpread[];
  metadata: {
    modelUsed: string;
    generationTimeMs: number;
    tokensUsed: number;
    estimatedCostUsd: number;
  };
}

/**
 * Story Engine Port (Hot-swappable AI writing engine)
 */
export interface IStoryEngine {
  generateStory(request: StoryRequest): Promise<StoryOutput>;
  moderateChildName(name: string): Promise<{ isSafe: boolean; flaggedReason?: string }>;
  lintArabicTashkeel?(text: string): Promise<string>;
}

/**
 * Illustration Engine Port (Hot-swappable image generation)
 */
export interface IIllustrationEngine {
  generateSpreadIllustration(
    prompt: string,
    characterSeed: number,
    aspectRatio?: '1:1' | '16:9' | '4:3'
  ): Promise<{ imageUrl: string; cdnUrl: string; generationTimeMs: number }>;
}

/**
 * Payment Gateway Port (Hot-swappable checkout provider)
 */
export interface OrderRequest {
  bookId: string;
  customerEmail: string;
  customerName: string;
  amount: number;
  currency: 'AED' | 'USD';
  packageType: 'digital_keepsake' | 'hardcover_pod' | 'bundle';
  upsells?: {
    coloringBookPdf?: boolean;
    siblingDuplicate?: boolean;
    expressDelivery?: boolean;
  };
}

export interface CheckoutResponse {
  checkoutUrl: string;
  sessionId: string;
  expiresAt?: string;
}

export interface IPaymentGateway {
  createCheckoutSession(order: OrderRequest): Promise<CheckoutResponse>;
  verifyWebhookSignature(payload: string, signature: string): boolean;
  handleWebhookEvent(event: unknown): Promise<{ orderId: string; status: 'paid' | 'failed' | 'refunded' }>;
}

/**
 * PDF Compiler Port (Print-ready archival generation)
 */
export interface IPDFCompiler {
  compileBookPDF(story: StoryOutput): Promise<{ pdfBuffer: Buffer; pageCount: number; dpi: number }>;
}
