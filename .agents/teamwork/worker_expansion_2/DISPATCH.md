## 2026-10-07T01:22:26Z

You are Worker 2 (Replacement Worker) for the PersonalizedTales UAE expansion books project.
Your working directory is:
/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/worker_expansion_2
The project root directory is:
/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks

MANDATORY FIRST STEP:
Read the authoritative user request at:
/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/ORIGINAL_REQUEST.md
Also read the scope and survey reports:
- /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/orchestrator_expansion_1/SCOPE.md
- /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/explorer_expansion_survey_1/survey_report.md
- /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/explorer_expansion_survey_2/survey_report.md
- /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/explorer_expansion_survey_3/survey_report.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Files You Own Exclusively:
- docs/EXPANSION_BOOK_CATALOG_LIST.md
- web/config/products.ts
- web/config/sampleBookData.ts
- web/app/create/preview/page.tsx

Implementation Tasks:
1. Update `docs/EXPANSION_BOOK_CATALOG_LIST.md`:
   - Add granular 12-spread story architectures and beats for Books 04, 05, 06, and 07, following the format of Books 01, 02, and 03.
   - For Book 06 (*The Brave Explorer & The Hidden Arabian Oasis*), do not mention falcons in any text; use Arabian Oryx (`المها العربي`) and gazelles.
2. Update `web/config/products.ts`:
   - Register Book 4 (`brave-explorer-oasis` / `the-brave-explorer-hidden-oasis`) in `PRODUCTS` with complete metadata, gallery items, and tags.
   - Review metadata across all 5 expansion books to guarantee pure AED pricing compliance (Softcover 49, Hardcover 79, Layflat 99 AED) and NO foreign currency leaks.
   - CRITICAL SEARCH TOKEN DEFENSE:
     - DO NOT use `صقر` or `صقور` or "falcon" ANYWHERE in any expansion book! For Book 4 (*The Brave Explorer & The Hidden Arabian Oasis*), use Arabian Oryx (`المها العربي`), desert gazelle (`غزال الريم`), or desert wildlife (`الحياة البرية`).
     - DO NOT use `فضاء` or "space" ANYWHERE in any expansion book!
     - DO NOT use `نوم` in Arabic ANYWHERE in any expansion book! DO NOT set `category: "bedtime"`!
     - DO NOT use "bedtime" in English ANYWHERE in any expansion book!
     - DO NOT use `6-12` or `6–12` in `ageRange` (use `Ages 3–9`, `Ages 0–3`, `Ages 2–8`, `Ages 3–8`).
     - DO NOT use "aqiqah" in `occasions` for expansion books (preserves isolation of `when-you-were-born`).
3. Update `web/config/sampleBookData.ts`:
   - Keep existing `SAMPLE_BOOK_SPREADS` intact for `starlit-dunes` (tests depend on it).
   - Add complete 12-spread story data for all 5 expansion books:
     1. `the-pearl-divers-secret-treasure` (`pearl-diver-treasure`)
     2. `first-steps-in-the-big-world` (`baby-milestone-chronicle`)
     3. `super-sibling-adventure-dynamic-duo` (`super-sibling-adventure`)
     4. `the-brave-explorer-hidden-oasis` (`brave-explorer-oasis`)
     5. `my-first-ramadan-lantern-of-kindness` (`first-ramadan-lantern`)
   - MANDATORY TASHKEEL STANDARD: Every single Arabic verse across all spreads MUST be Modern Standard Arabic with 100% full Tashkeel diacritics (>= 10 vowel marks per verse: Fathah, Dammah, Kasrah, Sukun, Shaddah, Tanwin).
   - Use high-resolution image references per the two-tier fallback strategy (Spread 0 uses coverImage, Spreads 1-11 use the cover art or appropriate high-res artwork from `/public`).
   - Export `BOOK_SPREADS_MAP: Record<string, StorySpread[]>` and `getBookSpreads(slugOrId: string): StorySpread[]`.
4. Update `web/app/create/preview/page.tsx`:
   - Dynamically load spreads for the active book using `getBookSpreads(product?.slug || "starlit-dunes")` so that the 3D CSS flipbook renders the specific manuscript for any chosen expansion book.
5. Verification & Tests:
   - Run all 7 test suites:
     - `node tests/test_uae_seo_domination_suite.mjs`
     - `node tests/test_challenger_2_adversarial_suite.mjs`
     - `node tests/test_uae_seo_m1_routes.mjs`
     - `python3 tests/run_e2e_suite.py`
     - `node tests/test_header_search_and_countdown_stress.mjs`
     - `node tests/test_m5_trust_components.mjs`
     - `node tests/test_challenger_empirical_validation.mjs`
   - Run `npx tsc --noEmit` (must return 0 errors).
   - Run `npm run build` (must compile all routes with 0 errors).
   - Document all verification commands and exact outputs in your handoff report.

Write `handoff.md` in your working directory and notify me via `send_message` when complete.
