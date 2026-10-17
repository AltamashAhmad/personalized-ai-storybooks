# Dispatch Task for Worker M0 (Replacement: worker_m0_2)

## Milestone
Milestone M0: Design System & Token Foundation

## Working Directory
`/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/worker_m0_2`

## Context & Interruption Point
Predecessor worker `worker_m0` experienced a network timeout during start. No files were modified. You are replacing it to execute the full M0 scope.

## Authoritative Inputs
- User Request: `/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/ORIGINAL_REQUEST.md`
- Project Blueprint: `/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/PROJECT.md`
- Survey Findings & Implementation Blueprint: `/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/explorer_survey_1/report.md`
- Baseline Verification Commands: `/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/explorer_survey_3/report.md`

## MANDATORY INTEGRITY WARNING
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A forensic auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Detailed Scope & Instructions
Follow the recommendations in `explorer_survey_1/report.md`:
1. `web/styles/tokens.css`: Add missing Wonderbly tokens:
   - `--color-butter: #ffeba3;`
   - `--color-lily-pad: #9fe778;`
   - `--color-blueberry: #0049ac;`
   - `--color-bubble-bath: #d0ebff;`
   - `--color-princess: #cebcfa;`
   - `--color-pinking-shears: #e98ec1;`
   - `--color-grid-line: #f9f0df;`
   - `--shadow-spine: rgba(129, 92, 24, 0.12) 0px 13px 27px -5px, rgba(0, 0, 0, 0.30) 0px 8px 16px -8px, rgba(0, 0, 0, 0.03) 0px -6px 16px -6px;`
2. `web/app/globals.css`:
   - Bridge tokens into Tailwind v4 `@theme inline` block so utilities (`bg-kraft-paper`, `text-sharpie`, `bg-racing-green`, `rounded-sharp`, `font-serif`, etc.) work natively.
   - Configure typography mapping in `@theme inline` and classes:
     `--font-sans: 'Inter', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;`
     `--font-serif: 'Fraunces', Georgia, serif;`
     `--font-heading: 'Fraunces', Georgia, serif;`
     `--font-amiri: 'Amiri', serif, system-ui;`
   - Enforce Fraunces for English `.font-serif` and Amiri for Arabic `.font-serif` / RTL headings, preserving Tashkeel ligature protections (`letter-spacing: 0 !important;`).
3. Verify layout primitives in `web/components/ui/PageSection.tsx` and `web/components/ui/Accordion.tsx`. Ensure they export cleanly and conform to tokens.
4. Run all verification checks:
   - `npx --prefix web tsc --noEmit`
   - `npm --prefix web run lint`
   - `python3 tests/run_e2e_suite.py` (62/62)
   - `node tests/test_header_search_and_countdown_stress.mjs` (47/47)
   - `node tests/test_m5_trust_components.mjs` (25/25)
   - `node tests/test_challenger_empirical_validation.mjs` (20/20)
   - `npm --prefix web run build` (170/170 static routes)
5. Write your complete handoff report to `/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/worker_m0_2/handoff.md` with all changes, rationale, test execution results, and layout verification.
6. When complete, use send_message to report completion to parent orchestrator.


## 2026-10-06T07:30:45Z
You are Worker 2 (replacement for worker_m0) for Milestone M0 (Design System & Token Foundation) of the PersonalizedTales UAE project.
Your working directory is: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/worker_m0_2/
Read your task description in: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/worker_m0_2/DISPATCH.md
Read the authoritative user request in: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/ORIGINAL_REQUEST.md
Read the project blueprint in: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/PROJECT.md
Read the detailed survey report and recommendations in: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/explorer_survey_1/report.md
Read the verification test commands in: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/explorer_survey_3/report.md
