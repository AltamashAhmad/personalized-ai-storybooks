## 2026-10-06T18:09:00Z
You are the Technical SEO Worker subagent for Milestone M2.
Your working directory is: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/worker_m2
Parent orchestrator directory: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/orchestrator_seo_1
Project root: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A forensic auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Input documents to read:
- ORIGINAL_REQUEST.md (specifically 2026-10-06T16:17:30Z)
- research/UAE_ORGANIC_SEO_DOMINATION_PLAYBOOK.md
- PROJECT.md
- TEST_READY.md
- TEST_INFRA.md
- tests/test_uae_seo_domination_suite.mjs
- /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/worker_m1/handoff.md

Your files to manage/update:
- web/app/sitemap.ts
- web/lib/seo/taxonomy.ts (and schema generators)
- web/components/seo/SeoLandingView.tsx & NameHubView.tsx
- The 8 core landing page files and 2 name hub page files (web/app/...)
- Any metadata, OpenGraph, or schema files required to satisfy tests/test_uae_seo_domination_suite.mjs.

Your mission:
1. Dynamic Sitemap Integration (web/app/sitemap.ts):
   - Update web/app/sitemap.ts to include all 32 SEO routes (8 landing pages: 4 EN + 4 AR, and 24 name hub variants: 12 EN + 12 AR).
   - Ensure every entry includes canonical URL, lastModified, changeFrequency ('daily' or 'weekly'), priority (0.8 - 0.9), and bilingual alternates.languages with en-AE, ar-AE, and x-default.
2. Schema.org JSON-LD Completeness & Invariants:
   - Ensure every SEO landing page and name hub injects the complete Schema.org JSON-LD @graph data:
     - Product: name, description, image, brand (PersonalizedTales), offers (49.00 AED, InStock, canonical url), and invariant aggregateRating (ratingValue: "4.96", reviewCount: "428", bestRating: "5").
     - FAQPage: >= 3 Q&As matching visible DOM text.
     - BreadcrumbList: 3 tiers (Home -> Hub -> Page).
     - Organization: name "PersonalizedTales", telephone with +971, languages English & Arabic.
     - WebSite: with SearchAction targeting /all-books?q={search_term_string}.
3. Hreflang & Metadata Conformance:
   - Verify every page exports Next.js metadata with alternates.languages for en-AE, ar-AE, x-default, and absolute canonical URL without trailing slash.
   - Verify OpenGraph images (1200x630), locales (en_AE / ar_AE), and Twitter card (summary_large_image).
4. Execute node tests/test_uae_seo_domination_suite.mjs:
   - Debug and fix any failed assertions until ALL 42 / 42 assertions PASS (100% across all 7 suites).
5. Verify zero regressions:
   - python3 tests/run_e2e_suite.py (62/62 PASSED)
   - node tests/test_header_search_and_countdown_stress.mjs (47/47 PASSED)
   - node tests/test_m5_trust_components.mjs (25/25 PASSED)
   - node tests/test_challenger_empirical_validation.mjs (20/20 PASSED)
   - npx tsc --noEmit in web/ (0 errors)
   - npm run build in web/ (0 errors)
6. Write full report in your directory and write handoff.md.
Send a message back when completed.
