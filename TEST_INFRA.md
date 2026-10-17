# E2E Test Infrastructure & Quality Assurance Specification
**Platform**: PersonalizedTales UAE — Organic SEO Domination Engine & Zero-Regression Quality Architecture  
**Target Repository**: `/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks`  
**Test Suite Directory**: `/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/tests`  
**Status**: ACTIVE & EXPANDED (154 Baseline Core Regression Tests + 42 E2E UAE SEO Domination Assertions)  
**Date**: 2026-10-06  

---

## 1. Test Philosophy

The testing infrastructure for PersonalizedTales UAE is anchored on four non-negotiable principles:

1. **Opaque-Box Verification**: Tests validate system behavior, observable outputs, public contracts, DOM artifacts, HTTP status responses, and Schema.org rich snippet compliance. Tests maintain zero dependency on internal implementation mechanics, private helper names, or framework-specific internals.
2. **Requirement-Driven Assertions**: Every single test case traces directly to an explicit requirement in `PROJECT.md`, `ORIGINAL_REQUEST.md` (2026-10-06T16:17:30Z), or the authoritative market research in `research/UAE_ORGANIC_SEO_DOMINATION_PLAYBOOK.md`.
3. **Deterministic & Isolated Execution**: Tests are completely hermetic. They run without external network flakiness, cloud dependencies, or unseeded random state. Every test establishes its own assertions and cleans up any transient resources.
4. **Dual-Track Progressive Testability**: The test harness is designed to execute cleanly at any stage of milestone implementation. When implementation is in progress, the harness runs all 7 suites from start to finish, reports granular diagnostic feedback on missing routes or schema attributes, and enforces strict gates upon milestone completion.

---

## 2. Test Methodology & Design Techniques

The test architecture applies formal software quality assurance methodologies across all verification layers:

### A. Category-Partitioning Method
The input domain is systematically partitioned into discrete equivalent categories:
- **Locales & Linguistic Modes**: English (`/` and LTR) vs. Arabic (`/ar` and RTL with Amiri typography).
- **Page Archetypes**:
  - Storefront & Category Browsers (`/`, `/all-books`, `/books/category/[slug]`).
  - High-Intent Editorial Landing Pages (4 pairs: `/personalized-books-dubai`, `/personalized-baby-gifts-dubai`, `/bilingual-children-books-arabic-english`, `/custom-storybook-for-kids-dubai`).
  - Programmatic Child Names Hub (Top 12 UAE names: Zayed, Fatima, Hamdan, Maryam, Rashid, Noah, Olivia, Liam, Sarah, Omar, Ali, Layla across EN and AR).
  - Transactional Funnel (`/create/start`, `/create/preview`, `/cart`, `/checkout`, `/unwrap/[giftId]`).
- **Structured Data Entities**: `Product`, `AggregateOffer`, `AggregateRating`, `FAQPage`, `BreadcrumbList`, `Organization`, and `WebSite` with `SearchAction`.

### B. Boundary Value Analysis (BVA)
Boundary testing covers high-risk limit states:
- **Pricing Boundaries**: Exact fixed tiers (Softcover 49.00 AED, Classic Hardcover 79.00 AED, Deluxe Layflat 99.00 AED).
- **Free Shipping Threshold**: Exactly 100 AED qualifying limit (sub-100 displays shipping calculated at checkout).
- **Tabby Installment Math**: Exact 4-way split (`49 / 4 = 12.25 AED`).
- **Review Rating Boundaries**: Aggregate rating `4.96` out of `5` across `428` verified reviews.
- **FAQ Entity Counts**: Minimum 3 questions per landing page (spec enforces 4 PAA queries).
- **Breadcrumb Hierarchy**: Exactly 3 tiers (Level 1: Home, Level 2: Hub/Category, Level 3: Current Page).
- **Crawl Depth**: Maximum click depth $\le 2$ from root to all programmatic landing pages.

### C. Pairwise & Combinatorial Testing
- **Bidirectional Hreflang Reciprocity**: Every English route pairing symmetrically with its Arabic counterpart (`en-AE` $\leftrightarrow$ `ar-AE`) alongside `x-default`.
- **Locale vs Currency Isolation**: Ensuring that regardless of English or Arabic locale, currency output strictly remains pure AED / د.إ with zero foreign currency symbols ($ USD, £ GBP, € EUR).
- **Slug Normalization Combinations**: Handling case variations, dash normalizations (`-` vs `–`), and alias slugs (e.g., `sara` $\rightarrow$ `sarah`).

### D. Real-World Workload Scenarios
- **Search Engine Crawler Simulation**: Crawling internal link mesh, validating all canonical tags, verifying sitemap XML inclusion, and confirming zero broken internal links.
- **Rich Snippet Googlebot Simulation**: Parsing `<script type="application/ld+json">` tags, validating JSON syntax, schema `@context`, required attributes, and ensuring visible DOM text matches FAQ answers.

---

## 3. Comprehensive Feature Inventory & Coverage Matrix

The platform verification matrix covers the 16 core features defined in `PROJECT.md` alongside the 7 specialized E2E SEO Domination suites:

| Feature # | Feature Name | Milestone | Primary Test Suite / Harness | Assertions / Cases | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **F01** | Baseline Quality Audit & Taxonomy Expansion | M1 | `test_uae_seo_domination_suite.mjs` (Suite 4) + `tsc` | 4 checks | Verified Baseline |
| **F02** | High-Intent Dubai Books Landing Page (EN & AR) | M1 | `test_uae_seo_domination_suite.mjs` (Suites 3, 4) | 4 checks | Target M1 |
| **F03** | Milestone Baby Gifts Landing Page (EN & AR) | M1 | `test_uae_seo_domination_suite.mjs` (Suites 3, 4) | 4 checks | Target M1 |
| **F04** | Bilingual Children's Books Landing Page (EN & AR) | M1 | `test_uae_seo_domination_suite.mjs` (Suites 3, 4) | 4 checks | Target M1 |
| **F05** | Custom Storybook Maker Landing Page (EN & AR) | M1 | `test_uae_seo_domination_suite.mjs` (Suites 3, 4) | 4 checks | Target M1 |
| **F06** | Top 12 UAE Child Names Programmatic Hub (EN) | M1 | `test_uae_seo_domination_suite.mjs` (Suites 3, 4) | 4 checks (12 names) | Target M1 |
| **F07** | Top 12 UAE Child Names Programmatic Hub (AR) | M1 | `test_uae_seo_domination_suite.mjs` (Suites 3, 4) | 4 checks (12 names) | Target M1 |
| **F08** | Schema.org Product Structured Data | M2 | `test_uae_seo_domination_suite.mjs` (Suite 1) | 3 checks | Target M2 |
| **F09** | Schema.org FAQPage Structured Data | M2 | `test_uae_seo_domination_suite.mjs` (Suite 1) | 3 checks | Target M2 |
| **F10** | Schema.org BreadcrumbList Structured Data | M2 | `test_uae_seo_domination_suite.mjs` (Suite 1) | 1 check | Target M2 |
| **F11** | Schema.org Organization & WebSite Schemas | M2 | `test_uae_seo_domination_suite.mjs` (Suite 1) | 2 checks | Target M2 |
| **F12** | Bi-directional Hreflang Alternates & Canonicals | M2 | `test_uae_seo_domination_suite.mjs` (Suite 2) | 7 checks | Target M2 |
| **F13** | Dynamic Sitemap Integration | M2 | `test_uae_seo_domination_suite.mjs` (Suite 7) | 4 checks | Target M2 |
| **F14** | Localized OpenGraph & Twitter Metadata | M2 | `test_uae_seo_domination_suite.mjs` (Suite 3) | 8 checks | Target M2 |
| **F15** | Internal Link Mesh & Discovery Pathing | M1 / M2 | `test_uae_seo_domination_suite.mjs` (Suite 5) | 5 checks | Target M1/M2 |
| **F16** | Pure AED Price Invariant & Currency Isolation | Core / M2 | `test_uae_seo_domination_suite.mjs` (Suite 6) | 5 checks | Target Core/M2 |
| **REG-1** | Core E2E 4-Tier Regression Suite | Core | `tests/run_e2e_suite.py` | 62 tests | 🟢 100% PASS |
| **REG-2** | Adversarial Search & Countdown Stress Suite | Core | `tests/test_header_search_and_countdown_stress.mjs` | 47 tests | 🟢 100% PASS |
| **REG-3** | Corporate Trust & Informational Views Suite | Core | `tests/test_m5_trust_components.mjs` | 25 tests | 🟢 100% PASS |
| **REG-4** | Challenger Empirical Search & Delivery Suite | Core | `tests/test_challenger_empirical_validation.mjs` | 20 tests | 🟢 100% PASS |

---

## 4. Detailed Specification of the 7 UAE SEO Domination Test Suites

The automated suite `tests/test_uae_seo_domination_suite.mjs` executes 42 discrete assertion points structured into 7 modular suites:

```
                                [test_uae_seo_domination_suite.mjs]
                                                 │
      ┌───────────┬───────────┬───────────┼───────────┬───────────┬───────────┐
      ▼           ▼           ▼           ▼           ▼           ▼           ▼
  [SUITE 1]   [SUITE 2]   [SUITE 3]   [SUITE 4]   [SUITE 5]   [SUITE 6]   [SUITE 7]
  Schema.org  Hreflang &  Meta Tags   Route &     Internal    Currency &  Sitemap &
  JSON-LD     Canonicals  & OpenGraph SSR Safety  Link Mesh   Pricing     Robots.txt
  (9 Tests)   (7 Tests)   (8 Tests)   (4 Tests)   (5 Tests)   (5 Tests)   (4 Tests)
```

### Suite 1: Schema.org JSON-LD Structured Data Validation (9 Tests)
- **Test 1.1**: `Product` schema definition with `@type: "Product"`, `name`, `description`, `image`, and `brand.name: "PersonalizedTales"`.
- **Test 1.2**: `Product.offers` contains pure AED currency (`priceCurrency: "AED"`), entry price `49.00`, `availability: "https://schema.org/InStock"`, and canonical URL.
- **Test 1.3**: `Product.aggregateRating` contains invariant values: `ratingValue: "4.96"`, `reviewCount: "428"`, `bestRating: "5"`.
- **Test 1.4**: `FAQPage` schema injected across all 4 EN and 4 AR landing pages with array of $\ge 3$ (target 4) `Question` items.
- **Test 1.5**: `FAQPage` entity structure: each question defines valid `@type: "Question"`, `name`, and `acceptedAnswer` with `@type: "Answer"` and non-empty `text`.
- **Test 1.6**: `FAQPage` content covers localized UAE high-intent search queries (24–48h local UAE delivery vs 2-week international imports, Arabic Tashkeel vowel markings, Tabby split payments, instant 3D preview).
- **Test 1.7**: `BreadcrumbList` schema defines 3 hierarchical positions (1: Home, 2: Hub/Category, 3: Current Page) with valid item URLs.
- **Test 1.8**: `Organization` schema defines corporate publisher identity with UAE contact telephone (`+971`), `areaServed: "AE"`, and bilingual language support.
- **Test 1.9**: `WebSite` schema defines `potentialAction` with `SearchAction` targeting `/all-books?q={search_term_string}` and strict JSON syntax with zero `undefined` values.

### Suite 2: Bi-directional Hreflang & Canonical URL Integrity (7 Tests)
- **Test 2.1**: Absolute canonical URLs without trailing slashes, leftover ports, or query strings (`https://personalizedtales.com/...`).
- **Test 2.2**: Tri-fold hreflang alternates present on every page: `en-AE`, `ar-AE`, and `x-default`.
- **Test 2.3**: Reciprocal hreflang linking between the 4 core English landing pages and their 4 Arabic counterparts.
- **Test 2.4**: Reciprocal hreflang linking across all 12 UAE child name hubs (`/personalized-books/for-[name]` $\leftrightarrow$ `/ar/personalized-books/for-[name]`).
- **Test 2.5**: `x-default` alternate consistently designates the primary English version.
- **Test 2.6**: Zero orphan hreflang targets: all referenced alternate URLs map to valid routes in the platform topology.
- **Test 2.7**: URL hygiene: clean ASCII kebab-case slugs without broken percent-encoding artifacts.

### Suite 3: Localized Meta Tags & OpenGraph / Twitter Cards (8 Tests)
- **Test 3.1**: English landing pages feature high-CTR titles and descriptions geo-targeted to Dubai and UAE.
- **Test 3.2**: Arabic landing pages feature high-CTR titles and descriptions in authentic Arabic targeting Dubai and the UAE.
- **Test 3.3**: Programmatic name hubs dynamically inject child name, origin, and meaning into title, H1, and description.
- **Test 3.4**: `og:locale` properly localized to `en_AE` for English pages and `ar_AE` for Arabic pages.
- **Test 3.5**: `og:image` metadata specifies high-resolution 1200×630 share cards.
- **Test 3.6**: `twitter:card` set to `summary_large_image`.
- **Test 3.7**: Meta descriptions adhere to optimal search engine length constraints (100–175 characters).
- **Test 3.8**: City-level geo-targeting establishes local Dubai / Abu Dhabi publisher relevance.

### Suite 4: Route Resolution & Server-Side Rendering Hygiene (4 Tests / 32 Routes)
- **Test 4.1**: Route resolution for all 8 core landing pages (4 EN + 4 AR).
- **Test 4.2**: Route resolution for all 24 name hub variants (12 EN + 12 AR).
- **Test 4.3**: Arabic routes specify `dir="rtl"`, `lang="ar"`, and authentic Arabic typography (`font-amiri` / `Amiri`).
- **Test 4.4**: SSR hydration safety: deterministic initial rendering without unsynchronized client state or dynamic timers causing React error #418/#423.

### Suite 5: Internal Link Mesh & Discovery Pathing (5 Tests)
- **Test 5.1**: Direct Funnel CTAs: Every landing page features prominent buttons linking to `/create/start` or PDPs.
- **Test 5.2**: Cross-linking to at least 2 relevant storybook Product Detail Pages (`/books/[slug]`).
- **Test 5.3**: Name hub sibling link mesh connecting to at least 3 related child names.
- **Test 5.4**: Accessible breadcrumb navigation linking back to Home and Catalog.
- **Test 5.5**: Zero broken internal links; maximum click depth $\le 2$ from root.

### Suite 6: Pure AED Price Invariant & Currency Isolation (5 Tests)
- **Test 6.1**: Exclusivity of UAE Dirham (`AED` / `د.إ`) across all customer-facing elements.
- **Test 6.2**: Complete isolation: zero foreign currency leaks (`$`, `USD`, `£`, `GBP`, `€`, `EUR`).
- **Test 6.3**: Fixed cover pricing tiers: Softcover 49 AED, Classic Hardcover 79 AED, Deluxe Layflat 99 AED.
- **Test 6.4**: Zero obsolete pricing leaks (`129 AED`, `149 AED`, `169 AED`, `189 AED`).
- **Test 6.5**: Tabby 4-split calculation (`49 / 4 = 12.25 AED`) and 100 AED free delivery threshold.

### Suite 7: Dynamic Sitemap & Robots.txt Conformance (4 Tests)
- **Test 7.1**: `web/app/sitemap.ts` includes all 32 SEO routes (8 landing pages + 24 name hubs) alongside catalog routes.
- **Test 7.2**: Sitemap entries define bilingual alternates (`alternates.languages` for `en-AE`, `ar-AE`, `x-default`).
- **Test 7.3**: `web/app/robots.ts` allows indexation of all public routes and disallows private paths (`/cart`, `/checkout`, `/admin`, `/api`).
- **Test 7.4**: Build manifest integration verifies `/sitemap.xml` and `/robots.txt` resolution.

---

## 5. Test Architecture & Runner Invocation

### A. Directory Layout
```
personalized-ai-storybooks/
├── tests/
│   ├── run_e2e_suite.py                              # Core 4-Tier Regression Suite (62 tests)
│   ├── test_tier1_feature_coverage.py
│   ├── test_tier2_boundary_corner_cases.py
│   ├── test_tier3_cross_feature_combinations.py
│   ├── test_tier4_real_world_scenarios.py
│   ├── test_header_search_and_countdown_stress.mjs   # Search & Countdown Stress Suite (47 tests)
│   ├── test_m5_trust_components.mjs                  # Corporate Trust Pages Suite (25 tests)
│   ├── test_challenger_empirical_validation.mjs      # Challenger Empirical Suite (20 tests)
│   └── test_uae_seo_domination_suite.mjs             # Comprehensive E2E SEO Suite (42 assertions)
├── TEST_INFRA.md                                     # Test architecture specification (this file)
└── TEST_READY.md                                     # Test readiness declaration
```

### B. Execution Commands

#### 1. Run the New UAE SEO Domination Suite
```bash
node tests/test_uae_seo_domination_suite.mjs
```

#### 2. Run All Existing Core Regression Suites (154 Tests)
```bash
python3 tests/run_e2e_suite.py
node tests/test_header_search_and_countdown_stress.mjs
node tests/test_m5_trust_components.mjs
node tests/test_challenger_empirical_validation.mjs
```

#### 3. Run Static Type Checking & Code Quality Linter
```bash
cd web && npx tsc --noEmit
cd web && npm run lint
```

#### 4. Run Full Production Build
```bash
cd web && npm run build
```

---

## 6. Exit Codes and CI/CD Quality Gate Behavior

- **Exit Code `0`**: All tests passed (100% success rate).
- **Exit Code `1`**: One or more assertions failed. Detailed failure diagnostics and line references are printed to `stderr`.
- **Progressive Testability Guarantee**: When run during intermediate development, `test_uae_seo_domination_suite.mjs` executes all 7 suites without unhandled exceptions or process crashes, outputting an executive scorecard detailing passing vs. pending checks. Upon final milestone completion, all 42 assertions must pass with exit code `0`.
