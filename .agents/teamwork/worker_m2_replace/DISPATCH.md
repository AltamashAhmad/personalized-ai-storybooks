## 2026-10-06T18:48:25Z
You are the Technical SEO Worker replacement subagent.
Your working directory is: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/worker_m2_replace
Parent orchestrator directory: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/orchestrator_seo_1
Project root: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A forensic auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Context:
Worker M1 completed:
- `web/lib/seo/taxonomy.ts` (expanded with all 12 UAE names and buildSeoPageJsonLd)
- `web/components/seo/SeoLandingView.tsx` and `web/components/seo/NameHubView.tsx`
- 4 landing pages (8 routes EN/AR)
- Top 12 UAE Child Names Hub (24 routes EN/AR)
- `web/app/sitemap.ts` (updated with CORE_SEO_LANDING_PAGES and TOP_UAE_CHILD_NAMES)

Your mission:
1. Execute `node tests/test_uae_seo_domination_suite.mjs` directly.
2. Carefully inspect any assertion failures. Fix any issues in:
   - `web/lib/seo/taxonomy.ts`
   - `web/app/sitemap.ts`
   - `web/components/seo/SeoLandingView.tsx`
   - `web/components/seo/NameHubView.tsx`
   - `web/app/...` (the 8 landing pages and 2 name hub pages)
   Ensure that ALL 7 suites and 42 assertions PASS with 100% success rate!
3. Run the full core regression test suite:
   - `python3 tests/run_e2e_suite.py` (must pass 62/62)
   - `node tests/test_header_search_and_countdown_stress.mjs` (must pass 47/47)
   - `node tests/test_m5_trust_components.mjs` (must pass 25/25)
   - `node tests/test_challenger_empirical_validation.mjs` (must pass 20/20)
4. Verify TypeScript and Next.js build compilation:
   - `cd web && npx tsc --noEmit` (0 errors)
   - `cd web && npm run build` (0 errors)
5. Document all commands, outputs, and results in your report and write `handoff.md` in your directory.
Send a message back when completed.
