## 2026-10-06T17:46:12Z
You are the SEO Landing Pages Worker subagent for Milestone M1.
Your working directory is: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/worker_m1
Parent orchestrator directory: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/orchestrator_seo_1
Project root: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A forensic auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Input documents to read:
- ORIGINAL_REQUEST.md (specifically 2026-10-06T16:17:30Z)
- research/UAE_ORGANIC_SEO_DOMINATION_PLAYBOOK.md
- PROJECT.md
- /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/explorer_survey_1/survey_report.md
- /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/explorer_survey_3/test_and_quality_survey_report.md

Your files owned exclusively:
- web/lib/seo/taxonomy.ts
- web/components/seo/SeoLandingView.tsx
- web/components/seo/NameHubView.tsx
- web/app/personalized-books-dubai/page.tsx
- web/app/ar/personalized-books-dubai/page.tsx
- web/app/personalized-baby-gifts-dubai/page.tsx
- web/app/ar/personalized-baby-gifts-dubai/page.tsx
- web/app/bilingual-children-books-arabic-english/page.tsx
- web/app/ar/bilingual-children-books-arabic-english/page.tsx
- web/app/custom-storybook-for-kids-dubai/page.tsx
- web/app/ar/custom-storybook-for-kids-dubai/page.tsx
- web/app/personalized-books/[slug]/page.tsx (and/or dynamic route for-[name])
- web/app/ar/personalized-books/[slug]/page.tsx (and/or dynamic route for-[name])

Your mission:
1. Update web/lib/seo/taxonomy.ts to include all top 12 UAE names:
   Zayed, Fatima, Hamdan, Maryam, Rashid, Noah, Olivia, Liam, Sarah, Omar, Ali, Layla.
   Include full English and Arabic names, meanings, origins, suggested books, and slug normalization (e.g. sara -> sarah).
2. Build reusable, high-fidelity SEO landing layout components in web/components/seo/:
   - SeoLandingView.tsx: Adheres to Wonderbly design tokens (Kraft paper #FDF8F1, Racing green #1E5751, Fraunces serif headings, Amiri Arabic typography, 2px radius), localized H1/H2, value props, PAA FAQs with accessible Accordion, customer review quotes, trust badges, Tabby 4 split calculation, and prominent CTAs to /create/start and PDPs.
   - NameHubView.tsx: Tailored child name landing page with child name prominence, cultural meaning, featured storybook preview, dedication example, and sibling name discovery chips.
3. Implement the 4 core landing pages (8 routes total):
   - /personalized-books-dubai & /ar/personalized-books-dubai
   - /personalized-baby-gifts-dubai & /ar/personalized-baby-gifts-dubai
   - /bilingual-children-books-arabic-english & /ar/bilingual-children-books-arabic-english
   - /custom-storybook-for-kids-dubai & /ar/custom-storybook-for-kids-dubai
4. Implement the Top 12 UAE Child Names Hub (24 routes total):
   - Routes: /personalized-books/for-[name] & /ar/personalized-books/for-[name]
   - Ensure routes resolve HTTP 200 for: for-zayed, for-fatima, for-hamdan, for-maryam, for-rashid, for-noah, for-olivia, for-liam, for-sarah, for-omar, for-ali, for-layla in both English and Arabic.
5. Ensure zero hydration mismatches and strict TypeScript conformance. Run npx tsc --noEmit in web/ to verify 0 errors. Run existing 154 tests to ensure zero regressions.
6. Write full report in your directory and write handoff.md.
Send a message back when completed.
