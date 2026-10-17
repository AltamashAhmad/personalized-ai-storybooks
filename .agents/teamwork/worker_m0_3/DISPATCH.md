# Dispatch Task for Worker M0 (Replacement: worker_m0_3)

## Milestone
Milestone M0: Design System & Token Foundation

## Working Directory
`/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/worker_m0_3`

## Context & Interruption Point
Predecessor worker `worker_m0_2` completed the token additions and verified all tests, but suffered an infrastructure network timeout right before writing `handoff.md`.
Read `worker_m0_2/progress.md` and `worker_m0_2/BRIEFING.md`.

## Authoritative Inputs
- User Request: `/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/ORIGINAL_REQUEST.md`
- Project Blueprint: `/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/PROJECT.md`
- Survey Findings: `/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/explorer_survey_1/report.md`
- Baseline Verification Commands: `/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/explorer_survey_3/report.md`

## MANDATORY INTEGRITY WARNING
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A forensic auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Task
1. Verify `web/styles/tokens.css` and `web/app/globals.css`:
   Ensure all Wonderbly tokens, `@theme inline` mappings, typography (Fraunces LTR / Amiri RTL with Tashkeel protection), and `--radius-sharp: 2px` are complete and accurate.
2. Confirm layout primitives `web/components/ui/PageSection.tsx` and `web/components/ui/Accordion.tsx` are intact.
3. Run the verification commands:
   - `npx --prefix web tsc --noEmit`
   - `npm --prefix web run lint`
   - `python3 tests/run_e2e_suite.py` (62/62)
   - `node tests/test_header_search_and_countdown_stress.mjs` (47/47)
   - `node tests/test_m5_trust_components.mjs` (25/25)
   - `node tests/test_challenger_empirical_validation.mjs` (20/20)
   - `npm --prefix web run build` (170/170 static routes)
4. Write `handoff.md` in `/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/worker_m0_3/handoff.md` with:
   - Observation: list of files modified and current token structure
   - Logic Chain: why each token/style was added or verified
   - Caveats: any warnings or edge cases
   - Conclusion: ready for review/auditing
   - Verification Method: exact commands and results
5. Send completion message via `send_message` to parent orchestrator.

## 2026-10-06T07:38:32Z
You are Worker 3 (replacement for worker_m0_2) for Milestone M0 (Design System & Token Foundation) of the PersonalizedTales UAE project.
Your working directory is: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/worker_m0_3/
Read your task description in: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/worker_m0_3/DISPATCH.md
Read the predecessor progress in: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/worker_m0_2/progress.md and BRIEFING.md
Read the authoritative user request in: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/ORIGINAL_REQUEST.md
Read the project blueprint in: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/PROJECT.md
Read the survey findings in: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/explorer_survey_1/report.md
Read the verification test commands in: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/explorer_survey_3/report.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A forensic auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Core Tasks for M0:
1. Verify web/styles/tokens.css: Ensure all Wonderbly tokens (--color-butter, --color-lily-pad, --color-blueberry, --color-bubble-bath, --color-princess, --color-pinking-shears, --color-grid-line, --shadow-spine, --color-kraft-paper-warm) are present.
2. Verify web/app/globals.css: Ensure Tailwind v4 @theme inline mappings, typography font mappings (--font-sans, --font-serif Fraunces LTR / Amiri RTL, --font-heading, --font-amiri), and Tashkeel ligature protections (letter-spacing: 0 !important) are present and working.
3. Review web/components/ui/PageSection.tsx and web/components/ui/Accordion.tsx.
4. Execute verification commands:
   - npx --prefix web tsc --noEmit
   - npm --prefix web run lint
   - python3 tests/run_e2e_suite.py (62/62)
   - node tests/test_header_search_and_countdown_stress.mjs (47/47)
   - node tests/test_m5_trust_components.mjs (25/25)
   - node tests/test_challenger_empirical_validation.mjs (20/20)
   - npm --prefix web run build (170/170 static routes)
5. Write your complete handoff report to /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/worker_m0_3/handoff.md with all details and test results.
6. When complete, use send_message to report completion to parent orchestrator.
