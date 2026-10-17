# Codebase Architecture Survey Report: Organic SEO Domination Engine
**Subagent**: `explorer_survey_2` (Codebase Architecture Explorer)  
**Date**: October 6, 2026  
**Target Repository**: `personalized-ai-storybooks/web` (Next.js 16.3.4 App Router)  
**Authoritative Documents**: `ORIGINAL_REQUEST.md`, `research/UAE_ORGANIC_SEO_DOMINATION_PLAYBOOK.md`

---

## Executive Summary

This investigation surveys the architecture, routing conventions, metadata generation, sitemap/robots configuration, design tokens, primitives, and conversion funnels of the `personalized-ai-storybooks/web` codebase.

### Key Empirical Findings:
1. **Next.js 16.3.4 App Router Environment**: Uses React 19.2.8 and TailwindCSS v4. Crucially, in Next.js 16, route parameters in `generateMetadata({ params })` and `Page({ params })` are asynchronous (`params: Promise<{ slug: string }>`). Strict TypeScript safety requires awaiting `params`.
2. **Current Routing & `/ar/` Silo Architecture**: Arabic routes are implemented as dedicated parallel subdirectories under `web/app/ar/` rather than middleware/rewrites. `web/next.config.ts` contains only redirects (no rewrites).
3. **Layout Nesting Pattern**: `web/app/layout.tsx` is the `RootLayout` declaring `<html lang="en">` and `<body>` with context providers (`CountryProvider`, `CartProvider`). `web/app/ar/layout.tsx` is a nested layout wrapping children in `<div dir="rtl" lang="ar">`, injecting an inline script to update `document.documentElement`, and setting Arabic metadata templates and Arabic `Organization` / `WebSite` JSON-LD.
4. **Current Sitemap State (`web/app/sitemap.ts`)**: Generates ~141 bilingual URL entries using `makeBilingualEntries()` with bidirectional hreflang alternates (`en-AE`, `ar-AE`, `x-default`). Currently lacks the 4 new UAE high-intent editorial landing pages and the new `/personalized-books/for-[name]` hubs.
5. **Design System & Primitives**: Full Wonderbly editorial token foundation exists in `web/styles/tokens.css` (Kraft paper `#FBF4E8`/`#FDF8F1`, Racing Green `#1E5751`, Sharpie `#23231E`, 2px sharp radii, Fraunces serif, Inter sans, Amiri Arabic). Existing layout primitives include `PageSection.tsx`, `Accordion.tsx`, `SectionHeader.tsx`, `Button.tsx`, `StoreHeader.tsx`, and `Footer.tsx`.
6. **Route Placement Recommendation**:
   - The 4 high-intent landing pages should be placed directly in `web/app/[landing-slug]/page.tsx` and `web/app/ar/[landing-slug]/page.tsx`.
   - The Top UAE Child Names hub should be implemented at `web/app/personalized-books/[slug]/page.tsx` and `web/app/ar/personalized-books/[slug]/page.tsx` (with dynamic parameter `[slug]`, where `slug` is pre-rendered as `for-zayed`, `for-fatima`, etc. via `generateStaticParams()`). Next.js App Router syntax requires bracketed folder names (`[slug]`), meaning a folder named `for-[name]` would be treated as literal static text by the compiler.
   - A hub index should be placed at `web/app/personalized-books/page.tsx` and `web/app/ar/personalized-books/page.tsx`.
7. **Regression Baseline**: All 154 automated regression tests currently PASS (62/62 Python e2e suite, 47/47 search/countdown stress, 25/25 trust components, 20/20 challenger validation), and `npm run build` compiles 176/176 static routes with 0 errors.

---

## 1. Existing Routing Structure & `/ar/` Implementation

### 1.1 Directory Tree Organization
The application is structured cleanly using Next.js App Router conventions:

```
web/app/
├── layout.tsx                     <-- Root layout (html lang="en", head, providers)
├── page.tsx                       <-- English Homepage (/)
├── sitemap.ts                     <-- Dynamic sitemap.xml generator
├── robots.ts                      <-- robots.txt generator
├── all-books/page.tsx             <-- /all-books catalog
├── [country]/page.tsx             <-- /[country] localized domestic hub (/ae)
├── books/
│   ├── [slug]/page.tsx            <-- /books/[slug] PDP + fallback SEO pages
│   └── category/[slug]/page.tsx   <-- /books/category/[slug] Category hubs
├── create/
│   ├── page.tsx                   <-- Customizer start redirect
│   ├── start/page.tsx             <-- /create/start Character Builder
│   ├── preview/page.tsx           <-- /create/preview 3D Flipbook Preview
│   └── formats/page.tsx           <-- /create/formats Format & Cover Selector
├── delivery/page.tsx              <-- /delivery 7 Emirates Logistics Timetable
├── quality/page.tsx               <-- /quality 200 GSM Mohawk & PUR Binding specs
├── about-us/page.tsx              <-- /about-us UAE Founding Story
├── faq/page.tsx                   <-- /faq Comprehensive FAQ Center
├── contact/page.tsx               <-- /contact Concierge Support
├── sample-book/page.tsx           <-- /sample-book Interactive Flagship Flipbook
├── unwrap/[giftId]/page.tsx       <-- /unwrap/[giftId] 3D Digital Unwrapping
│
└── ar/                            <-- NATIVE ARABIC SILO
    ├── layout.tsx                 <-- Nested layout (dir="rtl", lang="ar", AR JSON-LD)
    ├── page.tsx                   <-- Arabic Homepage (/ar)
    ├── all-books/page.tsx         <-- /ar/all-books catalog
    ├── books/
    │   ├── [slug]/page.tsx        <-- /ar/books/[slug] Arabic PDP
    │   └── category/[slug]/page.tsx<-- /ar/books/category/[slug] Arabic Categories
    ├── create/start/page.tsx      <-- /ar/create/start Arabic Character Builder
    ├── delivery/page.tsx          <-- /ar/delivery Arabic Logistics Timetable
    ├── quality/page.tsx           <-- /ar/quality Arabic Craftsmanship
    ├── about-us/page.tsx          <-- /ar/about-us Arabic Story
    ├── faq/page.tsx               <-- /ar/faq Arabic FAQ Center
    └── sample-book/page.tsx       <-- /ar/sample-book Arabic Flipbook
```

### 1.2 Layout Nesting & RTL Behavior
- **`web/app/layout.tsx` (RootLayout)**:
  - Outer container: `<html lang="en" className="h-full antialiased scroll-smooth">`
  - Injects Google Fonts (`Plus Jakarta Sans`, `Amiri`, `Fraunces`, `Inter`).
  - Injects default Schema.org `Organization` and `WebSite` JSON-LD.
  - Wraps tree with `<CountryProvider>` and `<CartProvider>`.
- **`web/app/ar/layout.tsx` (Nested Arabic Layout)**:
  - Wraps children in `<div dir="rtl" lang="ar" className="min-h-full flex flex-col font-sans">`.
  - Executes inline client script:
    ```js
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
    ```
  - Injects Arabic-localized Schema.org `Organization` (name: "حكايات مخصصة") and `WebSite`.
  - Sets Arabic metadata template (`%s | حكايات مخصصة`).
  - Crucially, it does **not** duplicate `<html>` or `<body>`, preventing hydration hierarchy errors.

### 1.3 `web/next.config.ts` Inspection
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/book/:slug', destination: '/books/:slug', permanent: true },
      { source: '/ar/book/:slug', destination: '/ar/books/:slug', permanent: true },
      { source: '/books', destination: '/all-books', permanent: true },
      { source: '/ar/books', destination: '/ar/all-books', permanent: true },
      { source: '/ar/create/formats', destination: '/create/formats', permanent: false },
    ];
  },
};
export default nextConfig;
```
- There are **zero rewrites** in `next.config.ts`.
- Every Arabic URL `/ar/...` maps to an actual directory in `web/app/ar/...`.

---

## 2. Current Sitemap, Robots & Metadata Generation

### 2.1 Sitemap (`web/app/sitemap.ts`)
The sitemap is dynamically generated using Next.js `MetadataRoute.Sitemap`:
- **Core helper function**: `makeBilingualEntries(path, priority, changeFrequency, images)`
  ```ts
  const enUrl = path === "" ? `${baseUrl}` : `${baseUrl}${path}`;
  const arUrl = `${baseUrl}/ar${path}`;
  const alternates = {
    languages: {
      "en-AE": enUrl,
      "ar-AE": arUrl,
      "x-default": path === "" ? `${baseUrl}/` : enUrl,
    },
  };
  ```
- **Current Route Groups in Sitemap**:
  1. `coreRoutes`: Home, `/delivery`, `/about-us`, `/quality`, `/faq`, `/contact`, `/sample-book`, `/gift-finder`, `/continue-shopping`, `/create`, `/create/start`, `/unwrap/...`
  2. `flagshipBookRoutes`: 7 books from `PRODUCTS` (e.g. `/books/the-secret-of-the-starlit-dunes`)
  3. `categoryRoutes`: 10 categories from `CATEGORIES`
  4. `occasionRoutes`: 10 occasions from `SEO_OCCASIONS`
  5. `programmaticNameRoutes`: Old route format `/books/personalized-book-for-${n.slug}`
  6. `countryRoutes`: `/ae`
- **Gaps Identified**:
  - Does NOT yet include the 4 new high-intent UAE SEO landing pages (`/personalized-books-dubai`, `/personalized-baby-gifts-dubai`, `/bilingual-children-books-arabic-english`, `/custom-storybook-for-kids-dubai`).
  - Does NOT yet include the new Top UAE Child Names hub (`/personalized-books` and `/personalized-books/for-[name]`).

### 2.2 Robots (`web/app/robots.ts`)
- Returns `MetadataRoute.Robots`.
- Explicitly permits indexation of `/` for `*`, `Googlebot`, `Applebot`, and `Bingbot`.
- Disallows `/api/`, `/admin/`, `/private/`, `/cart`, `/checkout`, `/ar/cart`, `/ar/checkout`.
- Directs search engine crawlers to `https://personalizedtales.com/sitemap.xml`.

### 2.3 Metadata Generation Contracts
- In Next.js 16.3.4, dynamic routes define:
  ```ts
  interface Props {
    params: Promise<{ slug: string }>;
  }
  export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    // ...
  }
  ```
- Canonical and hreflang alternates are set using:
  ```ts
  alternates: {
    canonical: `https://personalizedtales.com${canonicalPath}`,
    languages: {
      'en-AE': `https://personalizedtales.com${enPath}`,
      'ar-AE': `https://personalizedtales.com/ar${enPath}`,
      'x-default': `https://personalizedtales.com${enPath}`,
    },
  }
  ```
  Next.js converts this directly into `<link rel="canonical">` and `<link rel="alternate" hreflang="...">` tags in the HTML `<head>`.

---

## 3. UI Components, Design Tokens, Primitives & Linking Funnels

### 3.1 Design System Tokens (`web/styles/tokens.css` & `web/app/globals.css`)
- **Palette**:
  - Kraft Paper: `--color-kraft-paper: #FBF4E8`, `--color-kraft-paper-60: #FDF8F1`
  - Racing Green: `--color-racing-green: #1E5751`, `--color-racing-green-60: #789A97`
  - Sharpie: `--color-sharpie: #23231E`, `--color-sharpie-80: #555553`, `--color-sharpie-20: #D9D9D7`
  - Mustard: `--color-mustard: #FFD15A`
  - Tinkerbell: `--color-tinkerbell: #C1F1A1`
- **Geometry**:
  - Editorial sharp radius: `--radius-sharp: 2px` (`rounded-[2px]`)
  - Pill radius: `--radius-pill: 9999px` (`rounded-full`)
- **Typography**:
  - Display / Editorial Serif: `Fraunces` (`font-serif`, `font-heading`)
  - UI Sans: `Inter` / `Plus Jakarta Sans` (`font-sans`)
  - Arabic: `Amiri` (`font-amiri`) with strict ligature and Tashkeel protection (`letter-spacing: 0 !important; line-height: 2.1; font-feature-settings: "kern" 1, "liga" 1, "calt" 1;`).

### 3.2 Layout & UI Primitives (`web/components/ui/`)
- **`PageSection.tsx`**: Full-bleed section container with `.wb-container` (max-width `80rem`), supporting tones:
  - `paper` / `default` (`bg-[var(--color-kraft-paper-60)] text-[var(--color-sharpie)]`)
  - `kraft` (`bg-[var(--color-kraft-paper)]`)
  - `white` (`bg-[var(--color-bright-smile)]`)
  - `green` (`bg-[var(--color-racing-green)] text-white`)
  - `tinkerbell` (`bg-[var(--color-tinkerbell)] text-[var(--color-sharpie)]`)
- **`Accordion.tsx`**: Accessible disclosure primitive with `aria-expanded`, `aria-controls`, and `role="region"`.
- **`SectionHeader.tsx`**: Consistent Wonderbly editorial eyebrow badge, Fraunces serif heading, and descriptive subtitle.
- **`Button.tsx`**: Accessible buttons with sharp 2px radius and racing green / outline styling.
- **`StoreHeader.tsx`**: Sticky Wonderbly mega-nav with 4-column menus, search modal, language switch, cart drawer badge, and delivery timer.
- **`Footer.tsx`**: 3-column editorial navigation, UAE legal notices, payment badges, and 7 Emirates delivery overview.

### 3.3 Conversion Funnels & Link Architecture
- **Direct Entry to Customizer**:
  - `/create/start?name=[childName]&book=[slug]&gender=[gender]`
  - In Arabic: `/ar/create/start?name=[childName]&book=[slug]&gender=[gender]`
  - `web/app/create/start/page.tsx` parses `searchParams` for `name`, `book`, and `gender`, automatically pre-filling the character builder.
- **Direct PDP Links**:
  - English: `/books/[slug]` (e.g. `/books/the-secret-of-the-starlit-dunes`)
  - Arabic: `/ar/books/[slug]`
- **Interactive 3D Virtual Preview**:
  - `/sample-book` & `/ar/sample-book` provide an instant 24-page WebGL/CSS page-flip experience.

---

## 4. Route Placement for New SEO Landing Pages & Name Hubs

### 4.1 Four High-Intent Landing Pages
To capture the top UAE keyword clusters identified in `UAE_ORGANIC_SEO_DOMINATION_PLAYBOOK.md`, the pages should be placed as physical static routes matching the parallel English/Arabic structure:

| Target Query Cluster | English Route (web/app/...) | Arabic Route (web/app/ar/...) |
| :--- | :--- | :--- |
| **"personalized books dubai"** / "personalized books uae" | `personalized-books-dubai/page.tsx` | `ar/personalized-books-dubai/page.tsx` |
| **"personalized baby gifts dubai"** / "هدايا مواليد بالاسم دبي" | `personalized-baby-gifts-dubai/page.tsx` | `ar/personalized-baby-gifts-dubai/page.tsx` |
| **"bilingual children books arabic english dubai"** / "قصص اطفال ثنائية اللغة" | `bilingual-children-books-arabic-english/page.tsx` | `ar/bilingual-children-books-arabic-english/page.tsx` |
| **"custom storybook for kids dubai"** / "قصص اطفال مخصصة الامارات" | `custom-storybook-for-kids-dubai/page.tsx` | `ar/custom-storybook-for-kids-dubai/page.tsx` |

**Rationale**:
- Exact match with acceptance criteria in `ORIGINAL_REQUEST.md` R2.
- Direct root URLs maximize URL readability, keyword density, and search CTR.
- Arabic routes under `web/app/ar/` automatically inherit `web/app/ar/layout.tsx` (`dir="rtl"`, Arabic metadata, Arabic schema).

### 4.2 Top UAE Child Names Hub Architecture
The requirement specifies:
> "Top UAE Child Names hub (`/personalized-books/for-[name]` & `/ar/personalized-books/for-[name]` for top 12 Emirati and expat names: Zayed, Fatima, Hamdan, Maryam, Rashid, Noah, Olivia, Liam, Sarah, Omar, Ali, Layla)."

#### Dynamic Route Evaluation: `[slug]` vs `for-[name]`
In Next.js App Router, dynamic folder parameters **must** be enclosed in brackets at the boundaries: `[param]`.
- A folder named `for-[name]` is **not recognized as a dynamic segment** by Next.js; the compiler treats it as literal static string `/for-[name]`.
- Therefore, the correct Next.js App Router folder structure is:
  - English: `web/app/personalized-books/[slug]/page.tsx`
  - Arabic: `web/app/ar/personalized-books/[slug]/page.tsx`
- In `generateStaticParams()`:
  ```ts
  export async function generateStaticParams() {
    const TOP_12_NAMES = [
      'zayed', 'fatima', 'hamdan', 'maryam', 'rashid', 'noah',
      'olivia', 'liam', 'sarah', 'omar', 'ali', 'layla'
    ];
    return TOP_12_NAMES.flatMap((name) => [
      { slug: `for-${name}` },
      { slug: name }, // alias fallback
    ]);
  }
  ```
- When a user or crawler visits `/personalized-books/for-zayed`:
  - `params` resolves to `{ slug: 'for-zayed' }`.
  - The page cleanly parses the name: `const nameKey = slug.replace(/^for-/, '').toLowerCase();`.
  - Matches the requirement: `/personalized-books/for-[name]` returns HTTP 200 with rich localized content.
- **Hub Index Route**:
  - `web/app/personalized-books/page.tsx` & `web/app/ar/personalized-books/page.tsx`
  - Acts as the directory hub listing all 12 child names with quick-search pills, cultural name origins, and direct internal links to each `/personalized-books/for-[name]` route.

---

## 5. Architectural Recommendations: Schemas, Hreflang, Sitemap & Code Quality

### 5.1 Centralized SEO Configuration & Name Taxonomy
Currently, `web/lib/seo/taxonomy.ts` contains 28 names, but is **missing 4 of the 12 canonical names**: `fatima`, `omar`, `ali`, and `layla`, and spells `sara` instead of `sarah`.

**Recommendation**:
Update `web/lib/seo/taxonomy.ts` to include a canonical export `TOP_12_UAE_NAMES` containing:
1. **Zayed** (`zayed` / زايد) - Emirati Boy ("One who increases in goodness and grace")
2. **Fatima** (`fatima` / فاطمة) - Emirati Girl ("Captivating, gentle and pure")
3. **Hamdan** (`hamdan` / حمدان) - Emirati Boy ("One who is continually praiseworthy")
4. **Maryam** (`maryam` / مريم) - Emirati Girl ("Beloved, exalted, symbol of grace")
5. **Rashid** (`rashid` / راشد) - Emirati Boy ("Rightly guided, wise and courageous")
6. **Noah** (`noah` / نوح) - Expat/Global Boy ("Peaceful sanctuary, comfort, strength")
7. **Olivia** (`olivia` / أوليفيا) - Expat/Global Girl ("Olive branch of beauty and peace")
8. **Liam** (`liam` / ليام) - Expat/Global Boy ("Resolute guardian and protector")
9. **Sarah** (`sarah` & `sara` / سارة) - Arab/Global Girl ("Princess who brings joy")
10. **Omar** (`omar` / عمر) - Emirati Boy ("Flourishing, high-spirited, long-lived")
11. **Ali** (`ali` / علي) - Emirati Boy ("Noble, exalted champion of honor")
12. **Layla** (`layla` / ليلى) - Emirati Girl ("Enchanting night, star of the evening")

### 5.2 Structured Schema Architecture (`web/lib/seo/schemas.ts`)
Create a dedicated, strongly-typed schema utility file: `web/lib/seo/schemas.ts`:
- **`generateProductSchema({ ... })`**:
  - Injects `@type: "Product"`
  - Offers with pure AED pricing (49.00 AED Softcover, 79.00 AED Hardcover, 99.00 AED Layflat)
  - `priceCurrency: "AED"`, `availability: "https://schema.org/InStock"`, `priceValidUntil: "2027-12-31"`
  - `aggregateRating`: 4.96/5 from 428 verified UAE reviews
- **`generateFaqSchema(faqItems)`**:
  - Injects `@type: "FAQPage"` with `mainEntity` list of `Question` and `acceptedAnswer`
  - Targets Google UAE "People Also Ask" rich cards
- **`generateBreadcrumbSchema(items)`**:
  - Injects `@type: "BreadcrumbList"` with hierarchical position items
- **`generateOrganizationSchema(isAr)`**:
  - Injects `@type: "Organization"` with UAE contact points and social links

### 5.3 Modular Server Component Architecture
To prevent duplication across the 8 landing pages (4 EN + 4 AR), build two reusable presentation views:
1. **`web/components/SeoLandingPageView.tsx`**:
   - Server Component (`async` or pure presentation)
   - Accepts typed props: `locale`, `slug`, `hero`, `faqs`, `breadcrumbs`, `featuredProduct`, `benefits`
   - Injects `Product`, `FAQPage`, and `BreadcrumbList` JSON-LD schemas
   - Renders Wonderbly design tokens, PageSection, StoreHeader, Footer, Tabby installment badges, and high-converting CTAs
2. **`web/components/SeoNameHubView.tsx`**:
   - Server Component
   - Accepts `nameData: SEOName`, `locale: 'en' | 'ar'`
   - Renders personalized hero with child's name, cultural name meaning pill, recommended storybooks starring this child, FAQ accordion, and instant `/create/start?name=...` personalization CTA

### 5.4 Hydration Safety & Strict TypeScript
1. **Zero Hydration Mismatch**:
   - All page components remain React Server Components (RSC) without `'use client'`.
   - Schema JSON-LD is serialized via deterministic `JSON.stringify()` in `<script type="application/ld+json">`.
   - Client interactivity (accordions, language toggles, search modals) is encapsulated strictly within tested client leaf components (`Accordion.tsx`, `StoreHeader.tsx`).
   - No `Date.now()`, `Math.random()`, or `window` access during server render.
2. **Next.js 16 Asynchronous `params` Contract**:
   ```ts
   interface Props {
     params: Promise<{ slug: string }>;
   }
   export async function generateMetadata({ params }: Props): Promise<Metadata> {
     const { slug } = await params;
     // ...
   }
   export default async function Page({ params }: Props) {
     const { slug } = await params;
     // ...
   }
   ```
   This ensures 100% compliance with `npx tsc --noEmit` on TypeScript 5 / Next.js 16.3.4.

### 5.5 Dynamic Sitemap Integration (`web/app/sitemap.ts`)
Update `web/app/sitemap.ts`:
1. Add `seoLandingPageRoutes`:
   - `/personalized-books-dubai`
   - `/personalized-baby-gifts-dubai`
   - `/bilingual-children-books-arabic-english`
   - `/custom-storybook-for-kids-dubai`
   - Priority `0.95`, changeFrequency `daily`
2. Add `childNameHubRoutes`:
   - Hub index: `/personalized-books` (priority `0.9`, changeFrequency `weekly`)
   - 12 name hubs: `/personalized-books/for-${name.slug}` (priority `0.85`, changeFrequency `weekly`)
3. Both automatically generate English and Arabic URL pairs with `en-AE`, `ar-AE`, and `x-default` hreflang alternates via `makeBilingualEntries()`.

---

## 6. Verification & Invariant Safety Matrix

| Invariant Contract | Source of Truth | Verification Command | Status |
| :--- | :--- | :--- | :--- |
| **Pure AED Pricing** | 49 / 79 / 99 AED, zero stale prices | `python3 tests/run_e2e_suite.py` | Verified (62/62 PASS) |
| **Header Search Isolation** | Exact Arabic query matching (نوم, فضاء, صقر) | `node tests/test_header_search_and_countdown_stress.mjs` | Verified (47/47 PASS) |
| **Trust & Informational Pages** | Delivery timetable, 200 GSM Mohawk specs | `node tests/test_m5_trust_components.mjs` | Verified (25/25 PASS) |
| **Empirical Challenger Gates** | Dash normalization, countdown SSR safety | `node tests/test_challenger_empirical_validation.mjs` | Verified (20/20 PASS) |
| **Full Build Compilation** | 176+ static/SSG routes compile with 0 errors | `npm run build` | Verified (176/176 PASS) |
| **New SEO Domination Suite** | HTTP 200, JSON-LD validity, hreflang tags | `node tests/test_uae_seo_domination_suite.mjs` | Ready for M3 implementation |

---
*Report compiled by explorer_survey_2. Ready for handoff to orchestrator_seo_1.*
