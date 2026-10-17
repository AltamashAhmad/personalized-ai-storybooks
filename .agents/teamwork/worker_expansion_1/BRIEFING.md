# BRIEFING — 2026-10-06T20:15:00Z

## Mission
Execute production-grade implementation of 5 UAE Expansion Storybooks with complete 12-spread bilingual manuscripts (100% Tashkeel), catalog registration, preview funnel integration, and 100% pass rate across all 238 regression tests.

## 🔒 My Identity
- Archetype: worker_expansion_1
- Roles: implementer, qa, specialist
- Working directory: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/worker_expansion_1
- Original parent: 9c47d0c6-e926-47c6-86e2-a021c681df55
- Milestone: M1 Full Expansion Production & Regression Defense

## 🔒 Key Constraints
- Pure AED pricing compliance: Softcover 49, Hardcover 79, Layflat 99 AED. Zero foreign currency leaks ($ / USD / £ / €).
- CRITICAL SEARCH TOKEN DEFENSE:
  - DO NOT use `صقر` or `صقور` or "falcon" ANYWHERE in any expansion book! For Book 4 (The Brave Explorer & The Hidden Arabian Oasis), use Arabian Oryx (`المها العربي`), desert gazelle (`غزال الريم`), or desert wildlife (`الحياة البرية`).
  - DO NOT use `فضاء` or "space" ANYWHERE in any expansion book!
  - DO NOT use `نوم` in Arabic ANYWHERE in any expansion book! DO NOT set `category: "bedtime"`!
  - DO NOT use "bedtime" in English ANYWHERE in any expansion book!
  - DO NOT use `6-12` or `6–12` in `ageRange` (use `Ages 3–9`, `Ages 0–3`, `Ages 2–8`, `Ages 3–8`).
- MANDATORY TASHKEEL STANDARD: Every single Arabic verse across all spreads MUST be Modern Standard Arabic with 100% full Tashkeel diacritics (>= 10 vowel marks per verse: Fathah, Dammah, Kasrah, Sukun, Shaddah, Tanwin).
- Retain `SAMPLE_BOOK_SPREADS` in `sampleBookData.ts` for backward compatibility with `starlit-dunes`.
- Export `BOOK_SPREADS_MAP: Record<string, StorySpread[]>` and `getBookSpreads(slugOrId: string): StorySpread[]`.
- Dynamic spread loading in `web/app/create/preview/page.tsx` via `getBookSpreads(product?.slug || "starlit-dunes")`.
- Pass all 7 test suites (238/238 passing).
- `npx tsc --noEmit` 0 errors.
- `npm run build` 0 errors.

## Current Parent
- Conversation ID: 9c47d0c6-e926-47c6-86e2-a021c681df55
- Updated: 2026-10-06T20:15:00Z

## Task Summary
- **What to build**: 
  1. Detailed 12-spread beats for Books 04, 05, 06, and 07 in `docs/EXPANSION_BOOK_CATALOG_LIST.md`.
  2. Register Book 4 (`the-brave-explorer-hidden-oasis` / `brave-explorer-oasis`) in `web/config/products.ts` and audit all expansion products for search token safety and pricing compliance.
  3. Create authentic 12-spread bilingual manuscripts with 100% Tashkeel for all 5 expansion books in `web/config/sampleBookData.ts`.
  4. Export `BOOK_SPREADS_MAP` and `getBookSpreads()` in `sampleBookData.ts`.
  5. Connect `web/app/create/preview/page.tsx` to dynamically render book spreads via `getBookSpreads`.
  6. Verify all 7 test suites (238 tests), TypeScript type check, and Next.js static build.
- **Success criteria**: Zero test regressions (238/238 passing), zero TypeScript errors, clean `npm run build`, high-resolution visual fallback references, 100% Tashkeel compliance.
- **Interface contracts**: `web/config/products.ts`, `web/config/sampleBookData.ts`, `web/app/create/preview/page.tsx`.

## Change Tracker
- **Files modified**: None yet.
- **Build status**: Pending.
- **Pending issues**: None.

## Quality Status
- **Build/test result**: Baseline 238/238 passing.
- **Lint status**: Clean.
- **Tests added/modified**: Regression tests verified across 7 suites.

## Loaded Skills
- None requested.

## Key Decisions Made
- Use Arabian Oryx (`المها العربي`) and gazelle (`غزال الريم`) exclusively for Book 4, strictly zero falcon/صقر references.
- Use high-resolution existing assets for spreads fallback (`/books/...-cover.jpg`, `/final_book_mockup_...jpg`, `/images/...jpg`).
- Maintain exact backwards compatibility for `SAMPLE_BOOK_SPREADS`.

## Artifact Index
- `DISPATCH.md` — Orchestrator dispatch assignment.
- `BRIEFING.md` — Situational awareness and working memory.
- `progress.md` — Liveness and execution progress tracker.
