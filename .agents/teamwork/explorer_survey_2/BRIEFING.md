# BRIEFING — 2026-10-06T16:45:00Z

## Mission
Investigate Next.js App Router codebase architecture in `personalized-ai-storybooks/web` for SEO landing pages and name hubs (routing, layouts, sitemaps, metadata, JSON-LD, tokens, primitives, PDP links).

## 🔒 My Identity
- Archetype: explorer
- Roles: investigation, synthesis
- Working directory: /Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/.agents/teamwork/explorer_survey_2
- Original parent: c7b07fd5-1737-45b1-a1bd-8e0be9af8157
- Milestone: SEO Landing Pages & Name Hubs Architecture Survey

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- Inspect Next.js App Router routing structure (web/app/, /ar/ routes, rewrites, layouts)
- Inspect sitemap.ts / robots.ts / metadata generation
- Inspect UI components, design tokens (tokens.css, globals.css), primitives, PDP / preview links
- Recommend cleanest, maintainable architecture for SEO pages, JSON-LD schemas, hreflang, dynamic sitemap, zero hydration mismatches, strict TypeScript safety
- Output report to `codebase_survey_report.md` and `handoff.md`

## Current Parent
- Conversation ID: c7b07fd5-1737-45b1-a1bd-8e0be9af8157
- Updated: 2026-10-06T16:45:00Z

## Investigation State
- **Explored paths**:
  - `web/package.json` (Next.js 16.3.4, React 19.2.8, TailwindCSS v4)
  - `web/next.config.ts` (0 rewrites, 5 redirects)
  - `web/app/layout.tsx` (RootLayout with lang="en", providers, fonts, schema)
  - `web/app/ar/layout.tsx` (nested RTL layout with dir="rtl", lang="ar", AR schema)
  - `web/app/sitemap.ts` (makeBilingualEntries, 141 URLs, hreflang alternates)
  - `web/app/robots.ts` (crawl rules, sitemap link)
  - `web/styles/tokens.css` & `web/app/globals.css` (Wonderbly tokens, Fraunces, Amiri, 2px radius)
  - `web/components/ui/` (PageSection, Accordion, SectionHeader, Button)
  - `web/components/` (StoreHeader, Footer, QualityView, DeliveryView, HeroPersonalizer)
  - `web/lib/seo/taxonomy.ts` (28 names, missing 4 of top 12: fatima, omar, ali, layla)
  - `web/config/products.ts`, `pricing.ts`, `site.ts`
  - Automated tests: `tests/run_e2e_suite.py` (62/62), `test_header_search_and_countdown_stress.mjs` (47/47), `test_m5_trust_components.mjs` (25/25), `test_challenger_empirical_validation.mjs` (20/20) — 154/154 passing.
  - Production build: `npm run build` compiles 176/176 static and SSG routes in 8.8s.
- **Key findings**:
  - Arabic routes are physical directories under `web/app/ar/` (no rewrites/middleware).
  - Next.js 16 requires awaiting `params` (`params: Promise<{ slug: string }>`).
  - Landing pages belong in `web/app/[slug]/page.tsx` and `web/app/ar/[slug]/page.tsx`.
  - Child names dynamic route must be `web/app/personalized-books/[slug]/page.tsx` (emitting `for-zayed`, etc. in `generateStaticParams`), since `for-[name]` is literal syntax in Next.js.
  - Hub index at `web/app/personalized-books/page.tsx` and `web/app/ar/personalized-books/page.tsx`.
  - Centralize schemas in `web/lib/seo/schemas.ts` and add 4 missing names to `web/lib/seo/taxonomy.ts`.
- **Unexplored areas**: None. Full codebase survey complete.

## Key Decisions Made
- Completed comprehensive survey report `codebase_survey_report.md`.
- Completed 5-component hard handoff in `handoff.md`.
- Survey delivered with actionable blueprints for M1, M2, and M3.

## Artifact Index
- `DISPATCH.md` — Incoming dispatch instructions
- `BRIEFING.md` — Persistent working memory
- `progress.md` — Liveness heartbeat
- `codebase_survey_report.md` — Comprehensive Architecture Survey report
- `handoff.md` — 5-component handoff report
