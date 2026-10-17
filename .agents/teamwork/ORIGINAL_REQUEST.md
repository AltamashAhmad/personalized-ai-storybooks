# Original User Request

## 2026-10-06T06:56:37Z

Full section-by-section replication of Wonderbly (https://www.wonderbly.com/) on PersonalizedTales UAE. Implement each section adhering to Wonderbly's exact layout, editorial design tokens (kraft paper, 2px radius, typography hierarchy, racing green accents), bilingual EN/AR RTL fidelity, and zero-regression quality standards.

Working directory: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks
Integrity mode: development

## Requirements

### R1. Design System & Token Foundation (Phase 0)
- Ensure all design tokens in `web/styles/tokens.css` (Sharpie, Kraft Paper `#FBF4E8`/`#FDF8F1`, Racing Green `#1E5751`, Mustard `#FFD15A`, Tinkerbell `#C1F1A1`, 2px sharp editorial radii) and layout primitives (`PageSection.tsx`, `Accordion.tsx`, `tokens.css`) are cleanly integrated.
- Ensure Fraunces (display serif), Inter (UI sans), and Amiri (Arabic typography) are active and responsive.

### R2. Homepage Section-by-Section Clone (Phase 1)
Execute the strict clone loop across all 11 homepage sections in order:
1. **S1 Announcement Bar (`AnnouncementBar.tsx`):** Racing green bar, dynamic `/admin` promo (BOGO50 / WELCOME10), single-line centered, clean mobile responsive wrapping.
2. **S2 Header & 4-Column Mega-Nav (`StoreHeader.tsx`):** 4 mega-menus (Our books, Kids, Adults, Occasion) each with Age, Occasion, Recipient, Theme columns, responsive mobile drawer, animated Amazon cart badge, and dedicated language switch pill (`🌐 العربية`/`🌐 English`).
3. **S0 Country & Language Selector (`CountrySelectorModal.tsx`):** Centered modal (454px, z-150) supporting UAE AED and EN/AR language toggle.
4. **S3 Hero Section (`HeroPersonalizer.tsx`):** H1 "Make them the star of the story" / "اجعلهم أبطال القصة الحقيقية", subtext, Trustpilot badge, bespoke celestial art backdrop, and instant personalization CTA.
5. **S4 Bestseller Product Rail (`BookCarousel.tsx` + `ProductCard.tsx`):** 4-up cards, kraft paper image background, 16/22 semibold title, "From 49 AED", outline "Personalize" button, snap-scroll on mobile.
6. **S5 Range Rail (`RangeRail.tsx`):** Category visual browse cards (0–3, 3–6, 6–9, occasion) with centered pill tags.
7. **S6 Value Props Section (`HowItWorksSection.tsx`):** "Meaningful gifts, made in minutes" (Find → Personalize → Add message → Give).
8. **S7 Social Proof & Reviews (`TrustBar.tsx` + `ReviewsSection.tsx`):** Review quote rail, verified star badges, and parent photos.
9. **S8 Brand Story Section (`ThoughtfullyMade.tsx`):** Editorial 2-column block highlighting artisan craftsmanship, 200 GSM Mohawk paper, and bilingual Tashkeel storytelling.
10. **S9 SEO Accordion (`Accordion.tsx`):** 7 accessible bilingual disclosure items (Who is PersonalizedTales, How to make a book, Pricing, UAE courier delivery, etc.).
11. **S10 Newsletter Band (`NewsletterBand.tsx`):** Mint tinkerbell banner with email input and WELCOME10 reward.
12. **S11 Editorial Footer (`Footer.tsx`):** 3-column layout (Help, About, Corporate) + UAE legal & 7 Emirates logistics summary.
13. **Home Integration (`StorefrontView.tsx`):** Thin orchestrator (≤ 100 lines), clean removal of obsolete monolithic code.

### R3. Automated Regression & Quality Gates
- Every section change must preserve all test invariant contracts (pure AED pricing 49/79/99, search keyword isolation, etc.).
- Pass all 154 automated regression tests after every major milestone.
- `npm run build` must compile 170+ static routes with 0 errors.

## Acceptance Criteria

### Code Quality & Standards
- [ ] `npx tsc --noEmit` returns 0 errors
- [ ] `npm run lint` returns 0 errors
- [ ] Zero dead code, unused imports, or orphaned files
- [ ] Clean modular architecture with typed props and SRP

### Visual & Interactive Fidelity
- [ ] All 11 homepage sections render with Wonderbly-grade design tokens (Kraft paper tones, 2px radius, Fraunces serif headings)
- [ ] Flawless bilingual parity in both English and Arabic with native RTL layout
- [ ] Mobile-first responsive perfection across 390px, 768px, 1024px, and 1440px viewports

### Verification Suite (154/154 Passing)
- [ ] `python3 tests/run_e2e_suite.py` (62/62 PASSED)
- [ ] `node tests/test_header_search_and_countdown_stress.mjs` (47/47 PASSED)
- [ ] `node tests/test_m5_trust_components.mjs` (25/25 PASSED)
- [ ] `node tests/test_challenger_empirical_validation.mjs` (20/20 PASSED)
- [ ] `npm run build` compiles with 0 errors


## 2026-10-06T11:47:53Z

Use a very large team of agents. Full section-by-section replication of Wonderbly (https://www.wonderbly.com/ and https://www.wonderbly.com/ae/) across PersonalizedTales UAE. Implement each page and section adhering to Wonderbly's exact layout, editorial design tokens (kraft paper #FDF8F1, 2px editorial radius, Fraunces serif typography hierarchy, racing green accents), bilingual EN/AR RTL fidelity, and zero-regression quality standards.

Working directory: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks
Integrity mode: development

## Requirements

### R1. Category Listing Pages Completion (Phase 2)
- Replicate Wonderbly's /all-books and category landing layouts across /books/category/[slug] and /ar/books/category/[slug].
- Feature Fraunces serif headers, responsive filter facet pills (Ages 0–3, 3–6, 6–9, Birthday, Bedtime, Sibling), in-grid BOGO50 promo banner card, craftsmanship trust badges, and 5-column editorial footer.

### R2. Product Detail Page (PDP) Replication (Phase 3)
- Replicate Wonderbly's PDP (/books/[slug] and /ar/books/[slug]):
  1. Sticky gallery with book mockups, open spreads, and unboxing photography.
  2. Above-the-fold instant personalization card (name input, gender, avatar preview).
  3. Format & cover selector (Softcover 49 AED, Classic Hardcover 79 AED, Deluxe Layflat 99 AED) with Tabby 4 interest-free installments calculation.
  4. Emotional storytelling block ("Why kids love this story", "Why parents love it").
  5. Technical specifications drawer (8.5" x 8.5", 200 GSM Mohawk silk, EN71-3 child-safe ink, 24–48h UAE delivery).
  6. Verified customer photo reviews rail with star breakdowns.
  7. "You may also like" cross-sell recommendations rail.

### R3. Personalization & 3D Interactive Live Preview Funnel (Phase 4)
- Replicate Wonderbly's customization funnel (/create/start, /create/preview, /create/formats):
  1. Character appearance selector (skin tones, hairstyles, hair colors, glasses, accessories).
  2. Co-star selection (Dad/Baba, Mom/Mama, Grandpa, Grandma with beard customizer).
  3. Sentimental dedication step (400-char limit, pre-filled rhymes, Arabic Tashkeel preservation, giver signature).
  4. 3D CSS virtual page flipbook reader with spine curvature, dual-spread rendering, zoom, and authentic paper turn audio.
  5. High-margin order bumps (Coloring book 19 AED, Luxury Gift Box 39 AED, Audio Keepsake 19 AED).

### R4. Cart, Checkout & Digital Gifting (Phase 5)
- Replicate Wonderbly's cart and frictionless checkout (/cart, /checkout, /unwrap/[giftId]):
  1. Slide-over mini-cart drawer and full basket view with dynamic BOGO50 discount application and free shipping progress meter (>= 100 AED).
  2. Pure AED pricing with Tabby 4 split installments.
  3. UAE 7-Emirates delivery selection with +971 mobile formatting and WhatsApp real-time dispatch tracking opt-in.
  4. Interactive 3D digital gift unwrapping experience (/unwrap/[giftId]) with animated ribbon cutting and confetti.

### R5. Automated Regression & Quality Gates
- Preserve all invariant contracts: pure AED pricing (49 / 79 / 99 AED), zero leaks of stale prices, search corpus isolation, and SSR hydration safety.
- Pass 100% of the 154 automated regression tests.
- npm run build must compile all routes with 0 errors.

## Acceptance Criteria

### Code Quality & Standards
- [ ] npx tsc --noEmit returns 0 errors
- [ ] Zero dead code, unused imports, or orphaned files
- [ ] Clean modular architecture with typed props and SRP

### Visual & Interactive Parity
- [ ] All pages render with Wonderbly-grade design tokens (Kraft paper tones, 2px radius, Fraunces serif headings)
- [ ] Flawless bilingual parity in both English and Arabic with native RTL layout
- [ ] Mobile-first responsive perfection across 390px, 768px, 1024px, and 1440px viewports

### Verification Suite (154/154 Passing)
- [ ] python3 tests/run_e2e_suite.py (62/62 PASSED)
- [ ] node tests/test_header_search_and_countdown_stress.mjs (47/47 PASSED)
- [ ] node tests/test_m5_trust_components.mjs (25/25 PASSED)
- [ ] node tests/test_challenger_empirical_validation.mjs (20/20 PASSED)
- [ ] npm run build compiles with 0 errors


## 2026-10-06T16:17:30Z

Use a very large team of agents. Execute a full code quality audit and implement an authoritative Organic SEO Domination Engine for PersonalizedTales UAE to rank #1 on Google UAE (google.ae) across high-intent English and Arabic search queries. The project delivers high-ranking programmatic SEO landing pages, localized Dubai/Abu Dhabi milestone hubs, full Schema.org JSON-LD structured data (Product, FAQPage, BreadcrumbList, Organization), dynamic sitemaps with bi-directional hreflang tags, and internal link routing while preserving all existing zero-regression test gates.

Working directory: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks
Integrity mode: development

## Requirements

### R1. Full Code Quality & Storefront Polish
- Conduct a complete audit across the existing storefront, PDP, customizer funnel, and checkout views to ensure zero hydration mismatches, zero broken links, perfect mobile layout responsiveness, and pristine TypeScript safety.
- Verify all interactive UI components (3D flipbook, character builder, sticky gallery, cart drawer) are responsive and error-free.

### R2. High-Intent UAE SEO Landing Pages (English & Arabic)
- Create optimized programmatic and editorial SEO landing pages targeting top UAE search query clusters from the SEO playbook (/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/research/UAE_ORGANIC_SEO_DOMINATION_PLAYBOOK.md):
  1. `/personalized-books-dubai` & `/ar/personalized-books-dubai` (Target: "personalized books dubai", "personalized books uae")
  2. `/personalized-baby-gifts-dubai` & `/ar/personalized-baby-gifts-dubai` (Target: "personalized baby gifts dubai", "هدايا مواليد بالاسم دبي")
  3. `/bilingual-children-books-arabic-english` & `/ar/bilingual-children-books-arabic-english` (Target: "bilingual children books arabic english dubai", "قصص اطفال ثنائية اللغة")
  4. `/custom-storybook-for-kids-dubai` & `/ar/custom-storybook-for-kids-dubai` (Target: "custom storybook for kids dubai", "قصص اطفال مخصصة الامارات")
  5. Top UAE Child Names hub (`/personalized-books/for-[name]` & `/ar/personalized-books/for-[name]` for top 12 Emirati and expat names: Zayed, Fatima, Hamdan, Maryam, Rashid, Noah, Olivia, Liam, Sarah, Omar, Ali, Layla).
- Each page must feature localized H1/H2 headings, rich semantic body text, FAQs answering Google People Also Ask queries, live book preview CTAs, and internal links directly into the PDP and 3D preview funnel.

### R3. Technical SEO & Schema.org Rich Snippets Architecture
- Inject full Schema.org JSON-LD structured data:
  - `Product` schema on all book and landing pages with pure AED pricing (49, 79, 99 AED), `InStock` availability, and `AggregateRating` (4.96/5 from 428 verified UAE reviews).
  - `FAQPage` schema on landing pages and FAQ routes for Google Rich Snippet expanders.
  - `BreadcrumbList` schema on all category, landing, and product routes.
  - `Organization` and `WebSite` schema with search action markup.
- Implement bi-directional hreflang alternates (`en-AE`, `ar-AE`, `x-default`) and canonical URLs across all pages.
- Dynamic `sitemap.ts` generating full indexable URLs for all routes, static pages, categories, and SEO hubs.
- High-CTR OpenGraph and Twitter Card metadata localized with Dubai/Abu Dhabi city targeting.

### R4. Automated Regression & Quality Gates
- Preserve 100% pass rate on all 154 existing core regression tests (`run_e2e_suite.py`, `test_header_search_and_countdown_stress.mjs`, `test_m5_trust_components.mjs`, `test_challenger_empirical_validation.mjs`).
- Add an automated SEO verification test suite (`tests/test_uae_seo_domination_suite.mjs`) verifying JSON-LD schema validity, hreflang links, meta tags, and HTTP 200 route resolution for all SEO landing pages.
- `npx tsc --noEmit` and `npm run lint` must exit with 0 errors.
- `npm run build` must compile all routes with 0 errors.

## Acceptance Criteria

### Technical SEO & Schema Markup
- [ ] Valid JSON-LD `Product`, `FAQPage`, and `BreadcrumbList` schemas injected across all target landing pages
- [ ] Correct hreflang tags (`en-AE`, `ar-AE`, `x-default`) present on all pages
- [ ] Dynamic `sitemap.xml` includes all SEO landing pages and catalog routes
- [ ] Metadata (title, description, canonical, OpenGraph) fully localized for UAE in both English and Arabic

### SEO Landing Pages Coverage
- [ ] `/personalized-books-dubai` and `/ar/personalized-books-dubai` exist and return HTTP 200
- [ ] `/personalized-baby-gifts-dubai` and `/ar/personalized-baby-gifts-dubai` exist and return HTTP 200
- [ ] `/bilingual-children-books-arabic-english` and `/ar/bilingual-children-books-arabic-english` exist and return HTTP 200
- [ ] Top UAE child names routes (`/personalized-books/for-[name]`) resolve cleanly with localized content
- [ ] All SEO landing pages include clear CTAs linking directly to `/create/start` or PDPs

### Quality & Regression Verification (100% Passing)
- [ ] `python3 tests/run_e2e_suite.py` (62/62 PASSED)
- [ ] `node tests/test_header_search_and_countdown_stress.mjs` (47/47 PASSED)
- [ ] `node tests/test_m5_trust_components.mjs` (25/25 PASSED)
- [ ] `node tests/test_challenger_empirical_validation.mjs` (20/20 PASSED)
- [ ] `node tests/test_uae_seo_domination_suite.mjs` PASSED
- [ ] `npx tsc --noEmit` returns 0 errors
- [ ] `npm run build` compiles with 0 errors

## 2026-10-06T19:51:37Z

Use a very large team of agents. Full-scale production and generation of flagship and expansion personalized children's books for PersonalizedTales UAE. Implement each book adhering to Wonderbly's exact narrative depth, museum-grade visual illustration standards, authentic bilingual poetry (Modern Standard Arabic with 100% Tashkeel diacritics + lyrical English verses), interactive 3D CSS flipbook spreads, and zero-regression quality standards across all 238 automated tests.

Working directory: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks
Integrity mode: development

## Requirements

### R1. Expansion Catalog Roster & Visual Asset Pipeline
- Maintain and expand the master book roster in `docs/EXPANSION_BOOK_CATALOG_LIST.md` covering:
  1. *The Pearl Diver's Secret Treasure* (`the-pearl-divers-secret-treasure`)
  2. *First Steps in the Big World: The Baby Milestone Chronicle* (`first-steps-in-the-big-world`)
  3. *Super Sibling Adventure: The Dynamic Duo* (`super-sibling-adventure-dynamic-duo`)
  4. *The Brave Explorer & The Hidden Arabian Oasis* (`the-brave-explorer-hidden-oasis`)
  5. *My First Ramadan & The Lantern of Kindness* (`my-first-ramadan-lantern-of-kindness`)
- Ensure high-resolution book cover images and spread artwork exist in `web/public/books/`, and are referenced cleanly. (Note: initial cover assets have already been generated and placed in `web/public/books/`).

### R2. Authentic Bilingual Manuscripts & 12-Spread Story Data
- For each book, draft an engaging 12-spread story manuscript:
  - English: Lyrical, rhythmic verses suited to the target age group.
  - Arabic: Modern Standard Arabic (الفصحى) with complete Tashkeel vowel markings, culturally authentic and educational.
  - Populate full spread structures in `web/config/sampleBookData.ts` and `web/config/products.ts`.

### R3. Storefront, PDP & Funnel Integration
- Integrate new books into `PRODUCTS` in `web/config/products.ts` with complete metadata:
  - Title, subtitle, age range, category (`bestseller`, `heritage`, `newborn`), occasions, recipients, summary, and gallery images.
  - CRITICAL: Ensure zero collision with existing isolated test search tokens (`صقر`, `فضاء`, `نوم`, `space`, `bedtime`, `واحة`, `نجوم`) so all empirical search test suites continue passing at 100%.
  - Connect with the live customizer funnel (`/create/start`, `/create/preview`) and 3D flipbook reader.

### R4. Automated Regression & Quality Gates
- Preserve 100% pass rate on all 238 existing automated tests across all 7 suites (`test_uae_seo_domination_suite.mjs`, `test_challenger_2_adversarial_suite.mjs`, `test_uae_seo_m1_routes.mjs`, `run_e2e_suite.py`, `test_header_search_and_countdown_stress.mjs`, `test_m5_trust_components.mjs`, `test_challenger_empirical_validation.mjs`).
- `npx tsc --noEmit` must return 0 errors.
- `npm run build` must compile all routes with 0 errors.

## Acceptance Criteria

### Visual & Manuscript Quality
- [ ] High-resolution generated covers exist in `web/public/books/`
- [ ] Each new book contains complete bilingual spreads with full Arabic Tashkeel diacritics
- [ ] Zero foreign currency leaks ($ / USD / £ / €) — pure AED pricing (49 / 79 / 99 AED)

### Storefront & Route Integration
- [ ] New books registered in `PRODUCTS` in `web/config/products.ts`
- [ ] Product Detail Pages (`/books/[slug]` and `/ar/books/[slug]`) resolve cleanly
- [ ] Dynamic sitemap (`sitemap.ts`) indexes new book routes

### Test & Build Defense (100% Passing)
- [ ] `node tests/test_uae_seo_domination_suite.mjs` (42/42 PASSED)
- [ ] `node tests/test_challenger_2_adversarial_suite.mjs` (16/16 PASSED)
- [ ] `node tests/test_uae_seo_m1_routes.mjs` (26/26 PASSED)
- [ ] `python3 tests/run_e2e_suite.py` (62/62 PASSED)
- [ ] `node tests/test_header_search_and_countdown_stress.mjs` (47/47 PASSED)
- [ ] `node tests/test_m5_trust_components.mjs` (25/25 PASSED)
- [ ] `node tests/test_challenger_empirical_validation.mjs` (20/20 PASSED)
- [ ] `npx tsc --noEmit` returns 0 errors
- [ ] `npm run build` compiles with 0 errors
