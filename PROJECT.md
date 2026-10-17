# Project: PersonalizedTales UAE - Organic SEO Domination Engine & Code Quality Audit

## Architecture
- **Framework**: Next.js 16.3.4 (App Router, React 19, TypeScript, Tailwind CSS v4)
- **Design Tokens**: Sharpie (`#23231E`), Kraft Paper (`#FBF4E8`/`#FDF8F1`), Racing Green (`#1E5751`), Mustard (`#FFD15A`), Tinkerbell Mint (`#C1F1A1`), 2px sharp editorial radii (`--radius-sharp`).
- **Typography**: Display Serif: Fraunces (LTR English) / Amiri (RTL Arabic); UI Sans: Inter; Arabic UI: Amiri with `letter-spacing: 0`.
- **Dual Track Architecture**:
  - **Implementation Track**: Built taxonomy, editorial & programmatic landing pages (EN/AR), Schema.org JSON-LD engines, dynamic sitemap, and hreflang routing.
  - **E2E Testing Track**: Built opaque-box test suite `tests/test_uae_seo_domination_suite.mjs` covering all 7 test suites / 42 assertions, published `TEST_READY.md`.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Baseline Quality Audit & Taxonomy Expansion | Update `web/lib/seo/taxonomy.ts` to include all top 12 UAE names (add Fatima, Omar, Ali, Layla with Arabic names, meanings, story mappings); verify clean TypeScript and hydration safety | M1 | Survey & ORIGINAL_REQUEST R1 |
| 2 | High-Intent Dubai Books Landing Page (EN & AR) | `/personalized-books-dubai` & `/ar/personalized-books-dubai` targeting "personalized books dubai/uae" (KD 28, 800-1500 MSV); localized H1/H2, value props, 4 PAA FAQs, CTAs to `/create/start` | M1 | ORIGINAL_REQUEST R2.1 & PLAYBOOK §2.A/B |
| 3 | Milestone Baby Gifts Landing Page (EN & AR) | `/personalized-baby-gifts-dubai` & `/ar/personalized-baby-gifts-dubai` targeting "personalized baby gifts dubai" (KD 24, 1200-2500 MSV); birth stats, newborn keepsake focus, 4 PAA FAQs | M1 | ORIGINAL_REQUEST R2.2 & PLAYBOOK §2.A/B |
| 4 | Bilingual Children's Books Landing Page (EN & AR) | `/bilingual-children-books-arabic-english` & `/ar/bilingual-children-books-arabic-english` targeting dual-language school readiness (KD 19, 1400-3200 MSV); Tashkeel verses, KHDA/ADEK focus, 4 PAA FAQs | M1 | ORIGINAL_REQUEST R2.3 & PLAYBOOK §2.A/B |
| 5 | Custom Storybook Maker Landing Page (EN & AR) | `/custom-storybook-for-kids-dubai` & `/ar/custom-storybook-for-kids-dubai` targeting "custom storybook for kids dubai" (KD 22, 300-600 MSV); 5-min digital / 24h local dispatch vs 2-week imports, 4 PAA FAQs | M1 | ORIGINAL_REQUEST R2.4 & PLAYBOOK §2.A/B |
| 6 | Top 12 UAE Child Names Programmatic Hub (EN) | Programmatic routes `/personalized-books/for-[name]` for Zayed, Fatima, Hamdan, Maryam, Rashid, Noah, Olivia, Liam, Sarah, Omar, Ali, Layla with tailored meanings, stories, CTAs | M1 | ORIGINAL_REQUEST R2.5 & PLAYBOOK §6 |
| 7 | Top 12 UAE Child Names Programmatic Hub (AR) | Programmatic routes `/ar/personalized-books/for-[name]` for top 12 names in Arabic script with Tashkeel sample verses, RTL typography, CTAs | M1 | ORIGINAL_REQUEST R2.5 & PLAYBOOK §6 |
| 8 | Schema.org Product Structured Data | JSON-LD Product schema across all landing and name routes with pure AED pricing (49/79/99 AED), InStock, AggregateRating 4.96/5 from 428 reviews | M2 | ORIGINAL_REQUEST R3 & PLAYBOOK §7.A |
| 9 | Schema.org FAQPage Structured Data | JSON-LD FAQPage schema on all landing pages answering top PAA Google UAE questions | M2 | ORIGINAL_REQUEST R3 & PLAYBOOK §7.A |
| 10 | Schema.org BreadcrumbList Structured Data | JSON-LD BreadcrumbList schema on all category, landing, and name routes | M2 | ORIGINAL_REQUEST R3 & PLAYBOOK §7.A |
| 11 | Schema.org Organization & WebSite | Corporate identity and searchAction markup establishing UAE local publisher authority | M2 | ORIGINAL_REQUEST R3 & PLAYBOOK §7.A |
| 12 | Bi-directional Hreflang Alternates & Canonicals | `en-AE`, `ar-AE`, and `x-default` alternate link tags and absolute canonical URLs on all routes | M2 | ORIGINAL_REQUEST R3 & PLAYBOOK §7.B |
| 13 | Dynamic Sitemap Integration | Complete `sitemap.ts` generating all 32+ SEO landing pages & name hubs alongside catalog routes | M2 | ORIGINAL_REQUEST R3 & PLAYBOOK §6 |
| 14 | Localized OpenGraph & Twitter Metadata | High-CTR social and SERP preview cards with Dubai/UAE geo-targeting | M2 | ORIGINAL_REQUEST R3 |
| 15 | E2E UAE SEO Domination Test Suite | `tests/test_uae_seo_domination_suite.mjs` verifying schema validity, hreflang reciprocity, metadata, route resolution, internal links, price invariants | M3 / Test Track | ORIGINAL_REQUEST R4 & Survey 3 |
| 16 | Zero-Regression Quality Gate Defense | 100% pass on 154 core regression tests (`run_e2e_suite.py`, search stress, trust components, challenger validation), 0 tsc errors, 0 lint errors, build 244 static routes | M3 | ORIGINAL_REQUEST R4 & Acceptance Criteria |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | SEO Landing Pages & UAE Child Names Hubs | Taxonomy expansion in `taxonomy.ts` + 4 core landing pages (8 routes EN/AR) + Top 12 UAE Child Names Hub (24 routes EN/AR) with CTAs and internal linking | none | DONE |
| M2 | Technical SEO, Schema.org JSON-LD, Sitemap & Hreflang | Multi-entity JSON-LD schemas (`buildSeoPageJsonLd`), bi-directional hreflang, dynamic `sitemap.ts`, OpenGraph metadata | M1 | DONE |
| M3 | Final Verification, 100% Regression Defense & Certification | 100% pass on E2E SEO Domination suite (`test_uae_seo_domination_suite.mjs`) + full 154 regression suite defense, tsc, static build compilation, independent reviews, adversarial challenges, forensic audit | M1, M2, Test Track | DONE |

## Interface Contracts
### M1 -> M2, M3
- `web/lib/seo/taxonomy.ts` exports `TOP_UAE_CHILD_NAMES` containing all 12 names (`zayed`, `fatima`, `hamdan`, `maryam`, `rashid`, `noah`, `olivia`, `liam`, `sarah`, `omar`, `ali`, `layla`), supporting `slug`, `nameEn`, `nameAr`, `meaningEn`, `meaningAr`, `gender`, `origin`, `suggestedBookSlug`.
- Normalization utility `normalizeNameSlug(slug: string)` maps variants (e.g. `sara` -> `sarah`).
- Landing page routes created and verified:
  - `web/app/personalized-books-dubai/page.tsx` & `web/app/ar/personalized-books-dubai/page.tsx`
  - `web/app/personalized-baby-gifts-dubai/page.tsx` & `web/app/ar/personalized-baby-gifts-dubai/page.tsx`
  - `web/app/bilingual-children-books-arabic-english/page.tsx` & `web/app/ar/bilingual-children-books-arabic-english/page.tsx`
  - `web/app/custom-storybook-for-kids-dubai/page.tsx` & `web/app/ar/custom-storybook-for-kids-dubai/page.tsx`
  - `web/app/personalized-books/[slug]/page.tsx` & `web/app/ar/personalized-books/[slug]/page.tsx` (supporting static params for top 12 names)
- All landing pages mount accessible bilingual CTAs to `/create/start` and PDPs.

### M2 -> M3
- Schema JSON-LD helper `buildSeoPageJsonLd` in `taxonomy.ts` injecting valid `@graph` scripts:
  - Product: 49/79/99 AED, InStock, 4.96 rating, 428 reviews.
  - FAQPage: 4 Q&As per landing page.
  - BreadcrumbList: 3-tier hierarchy.
  - Organization & WebSite with SearchAction.
- Dynamic `sitemap.ts` returns array of all indexable URLs with `alternates.languages` for `en-AE`, `ar-AE`, `x-default`.

### E2E Testing Track -> M3
- `tests/test_uae_seo_domination_suite.mjs` implementing 7 suites / 42 assertions (100% passing).
- `TEST_READY.md` published at project root.

### M3 -> Parent / User
- 100% pass rate on `tests/test_uae_seo_domination_suite.mjs` (42/42 assertions).
- 100% pass rate on 154 existing regression tests (62 + 47 + 25 + 20).
- `npx tsc --noEmit` returns 0 errors.
- `npm run build` generates 244 static routes with 0 errors.
- Unanimous APPROVE verdicts from reviewer_1, reviewer_2, challenger_1, challenger_2.
- Binary CLEAN verdict from auditor_1 (0 integrity violations).

## Code Layout
- `web/lib/seo/taxonomy.ts`: Top UAE child names and query cluster taxonomy, JSON-LD schema generator
- `web/components/seo/SeoLandingView.tsx`: Shared reusable editorial landing layout primitive
- `web/components/seo/NameHubView.tsx`: Shared reusable programmatic name hub layout primitive
- `web/app/personalized-books-dubai/page.tsx`: English Books Dubai landing
- `web/app/ar/personalized-books-dubai/page.tsx`: Arabic Books Dubai landing
- `web/app/personalized-baby-gifts-dubai/page.tsx`: English Baby Gifts landing
- `web/app/ar/personalized-baby-gifts-dubai/page.tsx`: Arabic Baby Gifts landing
- `web/app/bilingual-children-books-arabic-english/page.tsx`: English Bilingual Books landing
- `web/app/ar/bilingual-children-books-arabic-english/page.tsx`: Arabic Bilingual Books landing
- `web/app/custom-storybook-for-kids-dubai/page.tsx`: English Custom Storybook landing
- `web/app/ar/custom-storybook-for-kids-dubai/page.tsx`: Arabic Custom Storybook landing
- `web/app/personalized-books/[slug]/page.tsx`: English name hub routes
- `web/app/ar/personalized-books/[slug]/page.tsx`: Arabic name hub routes
- `web/app/sitemap.ts`: Dynamic XML sitemap generator
- `tests/test_uae_seo_domination_suite.mjs`: Automated UAE SEO Domination test suite
- `TEST_INFRA.md`: E2E test infra index
- `TEST_READY.md`: Signal that test suite is ready
