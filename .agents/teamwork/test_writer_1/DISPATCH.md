## 2026-10-06T17:46:12Z
Sender: c7b07fd5-1737-45b1-a1bd-8e0be9af8157 (orchestrator_seo_1)
Priority: MESSAGE_PRIORITY_HIGH

You are the E2E Test Writer subagent on the Dual Track.
Your working directory is: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/test_writer_1
Parent orchestrator directory: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/orchestrator_seo_1
Project root: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks

Input documents to read:
- ORIGINAL_REQUEST.md (specifically 2026-10-06T16:17:30Z)
- research/UAE_ORGANIC_SEO_DOMINATION_PLAYBOOK.md
- PROJECT.md
- /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/explorer_survey_1/survey_report.md
- /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/explorer_survey_3/test_and_quality_survey_report.md

Your files owned exclusively:
- tests/test_uae_seo_domination_suite.mjs
- TEST_INFRA.md
- TEST_READY.md

Your mission:
1. Create TEST_INFRA.md at project root adhering to the Project Pattern template:
   - Test philosophy (Opaque-box, requirement-driven, zero dependency on implementation design)
   - Methodology (Category-Partition, BVA, Pairwise, Real-world workload)
   - Feature inventory & coverage matrix
   - Test architecture & runner invocation
2. Implement the comprehensive automated SEO test suite in tests/test_uae_seo_domination_suite.mjs.
   It must implement the 7 rigorous test suites specified in test_and_quality_survey_report.md:
   - Suite 1: Schema.org JSON-LD Structured Data Validation (Product with pure AED 49/79/99, inStock, 4.96/5 rating from 428 reviews; FAQPage with >= 3 Q&As matching DOM; BreadcrumbList 3 tiers; Organization with UAE phone +971; WebSite with SearchAction; strict JSON-LD syntax).
   - Suite 2: Bi-directional Hreflang & Canonical URL Integrity (en-AE, ar-AE, x-default; absolute canonicals without trailing slash).
   - Suite 3: Localized Meta Tags & OpenGraph / Twitter Cards (UAE/Dubai targeting in title/description, og:locale en_AE and ar_AE, og:image 1200x630, twitter:card).
   - Suite 4: Route Resolution & Server-Side Rendering Hygiene (All 8 core landing page routes + 24 name hub routes resolve HTTP 200; Arabic routes render dir="rtl" and Arabic typography; zero SSR hydration mismatches).
   - Suite 5: Internal Link Mesh & Discovery Pathing (CTAs link to /create/start or PDPs; crawler depth <= 2; valid breadcrumbs).
   - Suite 6: Price Invariant & Currency Isolation (Pure AED 49/79/99; zero foreign currency leaks $ / £; Tabby 4 split calculation).
   - Suite 7: Dynamic Sitemap & Robots.txt Conformance (sitemap includes all 32 SEO routes, priority, bilingual alternates).
3. Verify that the test script runs cleanly with Node.js (node tests/test_uae_seo_domination_suite.mjs). Note that some assertions will fail until worker_m1 and worker_m2 complete the implementation; ensure the test harness is syntactically pristine, robust, and correctly structured.
4. When tests/test_uae_seo_domination_suite.mjs and TEST_INFRA.md are created and verified, create TEST_READY.md at project root summarizing test commands and coverage.
5. Write your report and handoff.md in your directory.
Send a message back when completed.
