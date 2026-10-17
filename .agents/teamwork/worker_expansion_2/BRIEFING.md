# BRIEFING — 2026-10-07T01:23:00Z

## Mission
Implement 5 UAE expansion books for PersonalizedTales: detailed catalog docs, product registration, full 12-spread bilingual manuscripts with 100% Arabic Tashkeel diacritics, 3D flipbook preview integration, and 100% regression defense across all 7 test suites (238 tests) and build.

## 🔒 My Identity
- Archetype: worker_expansion_2
- Roles: implementer, qa, specialist
- Working directory: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/worker_expansion_2
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
  - DO NOT use "aqiqah" in `occasions` for expansion books (preserves isolation of `when-you-were-born`).
- MANDATORY TASHKEEL STANDARD: Every single Arabic verse across all spreads MUST be Modern Standard Arabic with 100% full Tashkeel diacritics (>= 10 vowel marks per verse: Fathah, Dammah, Kasrah, Sukun, Shaddah, Tanwin).
- Retain `SAMPLE_BOOK_SPREADS` in `sampleBookData.ts` for backward compatibility with `starlit-dunes`.
- Export `BOOK_SPREADS_MAP: Record<string, StorySpread[]>` and `getBookSpreads(slugOrId: string): StorySpread[]`.
- Dynamic spread loading in `web/app/create/preview/page.tsx` via `getBookSpreads(product?.slug || "starlit-dunes")`.
- Pass all 7 test suites (238/238 passing).
- `npx tsc --noEmit` 0 errors.
- `npm run build` 0 errors.

## Current Parent
- Conversation ID: 9c47d0c6-e926-47c6-86e2-a021c681df55
- Updated: 2026-10-07T01:23:00Z

## Task Summary
- **What to build**:
  1. Update `docs/EXPANSION_BOOK_CATALOG_LIST.md` with granular 12-spread story beats for Books 04, 05, 06, and 07 (no falcons in Book 06).
  2. Update `web/config/products.ts`: Register Book 4 (`brave-explorer-oasis` / `the-brave-explorer-hidden-oasis`), audit all expansion books for pure AED pricing and search token defenses.
  3. Update `web/config/sampleBookData.ts`: Retain `SAMPLE_BOOK_SPREADS`, add 12-spread manuscripts for all 5 expansion books with 100% Tashkeel diacritics (>=10 marks per verse), export `BOOK_SPREADS_MAP` and `getBookSpreads`.
  4. Update `web/app/create/preview/page.tsx`: Dynamically load spreads using `getBookSpreads(product?.slug || "starlit-dunes")`.
  5. Verify all 7 test suites, `npx tsc --noEmit`, and `npm run build`.
- **Success criteria**: 100% pass rate on all 7 test suites, 0 TS errors, 0 build errors, complete bilingual spreads.
- **Interface contracts**: `web/config/products.ts`, `web/config/sampleBookData.ts`, `web/app/create/preview/page.tsx`.
- **Code layout**: Specified in `SCOPE.md`.

## Key Decisions Made
- For Book 06 (*The Brave Explorer & The Hidden Arabian Oasis*), strictly avoid `صقر`, `falcon`, `فضاء`, `space`, `نوم`, `bedtime`, `astronaut`. Focus narrative on Arabian Oryx (`المها العربي`), gazelles (`غزال الريم`), desert flora (Ghaf tree), and hidden spring.
- Retain existing `SAMPLE_BOOK_SPREADS` unchanged to maintain existing tests and compatibility.
- Ensure high-resolution artwork fallback paths resolve to real files in `web/public`.

## Artifact Index
- `DISPATCH.md` — Assignment instructions
- `BRIEFING.md` — Agent memory
- `progress.md` — Progress tracker and liveness heartbeat
- `handoff.md` — Final handoff report (upon completion)

## Change Tracker
- **Files modified**: None yet.
- **Build status**: Untested.
- **Pending issues**: None.

## Quality Status
- **Build/test result**: Baseline 238/238 passing.
- **Lint status**: Clean.
- **Tests added/modified**: Regression verification pending.

## Loaded Skills
- None requested.
