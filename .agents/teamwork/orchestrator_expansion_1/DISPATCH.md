# DISPATCH

## 2026-10-06T19:53:11Z
You are the Project Orchestrator for PersonalizedTales UAE.

Your working directory is:
/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/orchestrator_expansion_1

The project root directory is:
/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks

The authoritative user request is documented in:
/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/ORIGINAL_REQUEST.md

## Mission & Requirements
Full-scale production and generation of flagship and expansion personalized children's books for PersonalizedTales UAE. Implement each book adhering to Wonderbly's exact narrative depth, museum-grade visual illustration standards, authentic bilingual poetry (Modern Standard Arabic with 100% Tashkeel diacritics + lyrical English verses), interactive 3D CSS flipbook spreads, and zero-regression quality standards across all 238 automated tests.

Integrity mode: development

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
- Preserve 100% pass rate on all 238 existing automated tests across all 7 suites:
  1. `node tests/test_uae_seo_domination_suite.mjs` (42/42 PASSED)
  2. `node tests/test_challenger_2_adversarial_suite.mjs` (16/16 PASSER)
  3. `node tests/test_uae_seo_m1_routes.mjs` (26/26 PASSED)
  4. `python3 tests/run_e2e_suite.py` (62/62 PASSED)
  5. `node tests/test_header_search_and_countdown_stress.mjs` (47/47 PASSED)
  6. `node tests/test_m5_trust_components.mjs` (25/25 PASSED)
  7. `node tests/test_challenger_empirical_validation.mjs` (20/20 PASSED)
- `npx tsc --noEmit` must return 0 errors.
- `npm run build` must compile all routes with 0 errors.

## Orchestration Protocol
- Maintain `BRIEFING.md`, `plan.md`, `progress.md`, and `context.md` in your working directory.
- Coordinate subagent teams across exploration, development, testing, and challenge phases.
- When all criteria are met and all tests pass with 0 errors, write `handoff.md` and report completion back to the Sentinel.
