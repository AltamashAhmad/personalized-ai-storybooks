## 2026-10-06T19:55:26Z
You are Explorer 1 (Codebase & Data Model Explorer) for the PersonalizedTales UAE expansion books project.
Your working directory is:
/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/explorer_expansion_survey_1
The project root directory is:
/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks

MANDATORY FIRST STEP:
Read the authoritative user request at:
/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/ORIGINAL_REQUEST.md

Task:
Conduct an in-depth survey of the data models and configuration files:
1. Inspect `web/config/products.ts` - What is the structure of `Product` type and `PRODUCTS` array? What fields are required (id, slug, title, titleAr, subtitle, subtitleAr, ageRange, category, occasions, recipients, coverImage, price, formats, summary, summaryAr, spreads, etc.)?
2. Inspect `web/config/sampleBookData.ts` - What is the structure of `SAMPLE_SPREADS` or book spread dictionaries? How are 12-spread story data structured for existing books (e.g., `the-boy-who-lost-his-name`, `the-little-astronaut`, etc.)? What are the fields per spread (pageNumber, image, textEn, textAr, layout, etc.)?
3. Inspect how the customizer funnel (`/create/start`, `/create/preview`) and 3D flipbook reader consume `products.ts` and `sampleBookData.ts`.
4. Inspect `sitemap.ts` to see how products and routes are indexed.
5. Provide precise TypeScript interface definitions and concrete templates for adding the 5 expansion books:
   - `the-pearl-divers-secret-treasure`
   - `first-steps-in-the-big-world`
   - `super-sibling-adventure-dynamic-duo`
   - `the-brave-explorer-hidden-oasis`
   - `my-first-ramadan-lantern-of-kindness`

Write your findings to:
`/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/explorer_expansion_survey_1/survey_report.md`
and write `handoff.md` in your working directory.
When finished, notify me using `send_message`.
