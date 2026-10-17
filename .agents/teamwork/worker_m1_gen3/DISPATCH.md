# Dispatch Task for Worker M1 (Generation 3)

## Milestone
Milestone M1: Navigation & Header Hierarchy

## Working Directory
`/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/worker_m1_gen3`

## Authoritative Inputs
- User Request: `/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/ORIGINAL_REQUEST.md` (§R2.1, §R2.2, §R2.3)
- Project Blueprint: `/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/PROJECT.md` (M1 Scope & Interface Contracts)
- Survey Findings: `/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/explorer_survey_2/report.md` (Sections 3.1, 3.2, 3.3)
- Invariant & Regression Contracts: `/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/explorer_survey_3/report.md` (Contracts 3, 4, 5, 6, 7)

## MANDATORY INTEGRITY WARNING
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A forensic auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Detailed Scope & Instructions
1. `web/components/AnnouncementBar.tsx` (S1):
   - Ensure racing green styling (`bg-[var(--color-racing-green)]`), single-line centered with responsive wrapping.
   - Dynamic support for promo banners (BOGO50 / WELCOME10).
2. `web/components/StoreHeader.tsx` (S2):
   - Refactor navigation mega-menus: provide true 4-column mega-nav layout across Age, Occasion, Recipient, and Theme columns for the primary categories (Our books, Kids, Adults, Occasion).
   - Retain full search integration: HeaderSearchModal with search corpus isolation (Contract 3) and unicode dash normalization (Contract 4).
   - Retain countdown timer props & SSR hydration guard (Contract 5): deterministic SSR fallback, `propCountdown` support.
   - Retain Amazon cart icon with badge count and mini-cart drawer toggle.
   - Polish language toggle pill badge (`🌐 العربية` / `🌐 English`).
   - Mobile responsive drawer with accessible navigation.
3. `web/components/CountrySelectorModal.tsx` (S0):
   - Constrain modal width to centered 454px (`max-w-[454px] w-full`).
   - Set z-index to `z-[150]` (above sticky header `z-40`, search `z-50`, cart drawer `z-50`).
   - Include bilingual segmented toggle (English / العربية) inside the modal alongside the UAE AED country selector.
4. Run all verification checks:
   - `npx --prefix web tsc --noEmit`
   - `npm --prefix web run lint`
   - `python3 tests/run_e2e_suite.py` (62/62)
   - `node tests/test_header_search_and_countdown_stress.mjs` (47/47)
   - `node tests/test_m5_trust_components.mjs` (25/25)
   - `node tests/test_challenger_empirical_validation.mjs` (20/20)
   - `npm --prefix web run build` (170/170 static routes)
5. Write your complete handoff report to `/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/worker_m1_gen3/handoff.md`.
6. Send completion message via `send_message`.


## 2026-10-06T08:07:26Z
You are Worker M1 (Generation 3) for Milestone M1 (Navigation & Header Hierarchy) of the PersonalizedTales UAE project.
Your working directory is: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/worker_m1_gen3

Read your dispatch instructions at:
/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/worker_m1_gen3/DISPATCH.md
Also read:
- /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/ORIGINAL_REQUEST.md
- /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/PROJECT.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A forensic auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Scope:
1. web/components/AnnouncementBar.tsx:
   - Racing green background (bg-[var(--color-racing-green)]), single-line centered with clean mobile responsive wrapping.
   - Dynamic support for promo banners (BOGO50 / WELCOME10).
2. web/components/StoreHeader.tsx:
   - Refactor navigation mega-menus: implement 4 mega-menus (Our books, Kids, Adults, Occasion) each structured with 4 columns: Age, Occasion, Recipient, and Theme.
   - Retain full HeaderSearchModal integration (preserving search corpus isolation Contract 3 and unicode dash normalization Contract 4).
   - Retain countdown timer props & SSR hydration guard (Contract 5: deterministic SSR fallback, propCountdown).
   - Retain Amazon cart icon with badge count and mini-cart drawer toggle.
   - Polish language toggle pill badge (🌐 العربية / 🌐 English).
   - Mobile responsive drawer with accessible navigation.
3. web/components/CountrySelectorModal.tsx:
   - Constrain modal width to centered 454px (max-w-[454px] w-full).
   - Set z-index to z-[150].
   - Include bilingual segmented toggle (English / العربية) inside the modal alongside UAE AED selector.
4. Run all verification checks:
   - npx --prefix web tsc --noEmit
   - npm --prefix web run lint
   - python3 tests/run_e2e_suite.py
   - node tests/test_header_search_and_countdown_stress.mjs
   - node tests/test_m5_trust_components.mjs
   - node tests/test_challenger_empirical_validation.mjs
   - npm --prefix web run build (170/170 static routes)
5. Write your complete handoff report to:
   /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/worker_m1_gen3/handoff.md
6. Notify your parent via send_message when complete.


## 2026-10-06T08:20:18Z
**Context**: Milestone M1 (Navigation & Header Hierarchy) Liveness Check
**Content**: Heartbeat check at 08:20Z. Please provide a brief status update on your current step (inspecting, implementing AnnouncementBar/StoreHeader/CountrySelectorModal, or running verification tests) and update your progress.md timestamp.
**Action**: Reply with your status and proceed with implementation and verification.
