# PersonalizedTales UAE — System Architecture & Scalability Guide

This document outlines the architectural patterns, extension guidelines, and directory organization for the PersonalizedTales UAE platform (Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4).

---

## 1. Ports & Adapters (Hexagonal) Architecture

The platform isolates core business logic and UI components from third-party infrastructure using the Ports & Adapters pattern in `web/lib/`. Each external capability is defined as a TypeScript interface (Port) in `web/types/engine.ts` and resolved via a factory:

- **Story Engine (`web/lib/story-engine/`)**:
  - Port: `IStoryEngine` (`generateStory`, `moderateChildName`, `lintArabicTashkeel`).
  - Factory: `StoryEngineFactory` (`web/lib/story-engine/factory.ts`) instantiates adapters based on `STORY_ENGINE_PROVIDER`.
  - Adapters: `ClaudeStoryEngineAdapter` (default, Anthropic Claude 3.5 Sonnet) and `OpenAIStoryEngineAdapter` (GPT-4o).
- **Payment Gateway (`web/lib/payments/`)**:
  - Port: `IPaymentGateway` (`createCheckoutSession`, `verifyWebhookSignature`, `handleWebhookEvent`).
  - Factory: `PaymentGatewayFactory` (`web/lib/payments/factory.ts`) instantiates adapters based on `PAYMENT_GATEWAY_PROVIDER`.
  - Adapters: `LemonSqueezyPaymentAdapter` (default Merchant of Record for UAE compliance) and `StripePaymentAdapter` (direct processor).
- **Illustration Engine (`web/lib/illustration-engine/`)**:
  - Port: `IIllustrationEngine` (`generateSpreadIllustration`).
  - Factory: `IllustrationEngineFactory` (`web/lib/illustration-engine/factory.ts`) instantiates adapters based on `ILLUSTRATION_ENGINE_PROVIDER`.
  - Adapters: `FluxIllustrationAdapter` (Black Forest Labs Flux 1.1 Pro).

---

## 2. How to Add a New Book

To add a new storybook to the platform catalog:

1. **Register Product Metadata (`web/config/products.ts`)**:
   Add a new entry to the `PRODUCTS` array conforming to `ProductStory`:
   - Unique `id` and `slug` (e.g., `slug: "the-little-falcon-of-liwa"`).
   - Bilingual metadata: `title`, `titleAr`, `subtitle`, `subtitleAr`, `ageRange`, `category`, and `occasions`.
   - Pricing, cover image asset paths, and `galleryImages` array (cover, bilingual spread, dedication mockup).
2. **Define Story Manuscript & Spreads (`web/config/sampleBookData.ts`)**:
   - Provide the 12-spread story layout with English verses and Arabic rhyming verses with vocalized Tashkeel diacritics.
   - Configure character builder options (skin tones, hair styles, outfits, co-stars) for the book's visual themes.
3. **Verify Dynamic Routing & SEO**:
   - The book will automatically render at `/books/[slug]` and `/ar/books/[slug]`.
   - `web/app/sitemap.ts` automatically maps all `PRODUCTS` into bilingual sitemap entries with `hreflang` alternates.

---

## 3. How to Add a New Payment Provider

To integrate an additional payment gateway (e.g., Telr or Adyen):

1. **Implement `IPaymentGateway`**:
   Create `web/lib/payments/<provider>-adapter.ts` implementing `IPaymentGateway` from `@/types/engine`:
   - `createCheckoutSession(order: OrderRequest): Promise<CheckoutResponse>`
   - `verifyWebhookSignature(payload: string, signature: string): boolean`
   - `handleWebhookEvent(event: unknown): Promise<{ orderId: string; status: 'paid' | 'failed' | 'refunded' }>`
2. **Register in Factory (`web/lib/payments/factory.ts`)**:
   Update `PaymentGatewayFactory.getGateway()` to recognize the new provider identifier from `PAYMENT_GATEWAY_PROVIDER`.
3. **Webhook Route**:
   Add an endpoint at `web/app/api/webhooks/<provider>/route.ts` validating signatures and updating order state.

---

## 4. How to Add a New Language

The platform is designed for bilingual English/Arabic, with extensible localization infrastructure:

1. **Add Translations (`web/config/translations.ts`)**:
   - Add the language code to the `Language` union type (e.g., `'de' | 'fr'`).
   - Add dictionary entries to `TRANSLATIONS` matching the `TranslationDictionary` shape.
2. **Update Direction & Context (`web/lib/context/CountryContext.tsx`)**:
   - Map the language code to its text direction (`dir: 'rtl' | 'ltr'`) and primary typography class.
   - Extend `useBilingualDir` hook (`web/lib/hooks/useBilingualDir.ts`) to return localized font styles.
3. **Add Localized App Router Routes**:
   - Create route tree under `web/app/[lang]/` (e.g., `web/app/fr/page.tsx`, `web/app/fr/books/[slug]/page.tsx`).
   - Re-use view components passing `initialLang="fr"`.
4. **Update Sitemap (`web/app/sitemap.ts`)**:
   - Extend `makeBilingualEntries` or create multilingual alternate tags for the new language code.

---

## 5. How to Add a New Page

To add a new informational or feature page:

1. **Build Reusable View Component**:
   Create `web/components/<PageName>View.tsx` accepting `initialLang` prop. Use design system primitives (`Button`, `Badge`, `Drawer`, `SectionHeader` from `@/components/ui`).
2. **Export from Components Barrel (`web/components/index.ts`)**:
   Re-export `<PageName>View` from `web/components/index.ts`.
3. **Create Next.js Route Files**:
   - English route: `web/app/<route-name>/page.tsx` rendering `<PageNameView initialLang="en" />`.
   - Arabic route: `web/app/ar/<route-name>/page.tsx` rendering `<PageNameView initialLang="ar" />`.
4. **Register in Sitemap (`web/app/sitemap.ts`)**:
   Add the path to `coreRoutes` via `...makeBilingualEntries('/<route-name>', priority, frequency)`.
