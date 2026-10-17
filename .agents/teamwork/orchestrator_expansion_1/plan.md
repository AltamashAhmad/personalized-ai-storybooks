# Implementation Plan: Expansion Personalized Children's Books

## Objective
Implement full-scale production and generation of flagship and expansion personalized children's books for PersonalizedTales UAE:
1. *The Pearl Diver's Secret Treasure* (`the-pearl-divers-secret-treasure`)
2. *First Steps in the Big World: The Baby Milestone Chronicle* (`first-steps-in-the-big-world`)
3. *Super Sibling Adventure: The Dynamic Duo* (`super-sibling-adventure-dynamic-duo`)
4. *The Brave Explorer & The Hidden Arabian Oasis* (`the-brave-explorer-hidden-oasis`)
5. *My First Ramadan & The Lantern of Kindness* (`my-first-ramadan-lantern-of-kindness`)

## Milestones
- **Phase 0: Survey & Codebase Exploration (3 Explorers)**
  - Explorer 1: Inspect `web/config/products.ts`, `sampleBookData.ts`, product data models, spread schemas, and customizer funnel integration points.
  - Explorer 2: Inspect existing assets in `web/public/books/`, cover filenames, formats, dimensions, and visual pipeline requirements.
  - Explorer 3: Inspect existing 7 test suites, identify search test contracts and isolated keywords (`صقر`, `فضاء`, `نوم`, `space`, `bedtime`, `واحة`, `نجوم`), and determine safe search keywords and tags for the 5 expansion books.

- **Milestone 1: Catalog Expansion & Visual Assets Verification**
  - Worker updates `docs/EXPANSION_BOOK_CATALOG_LIST.md` and verifies/organizes cover assets in `web/public/books/`.
  - Reviewer + Challenger check coverage and image referencing.

- **Milestone 2: Authentic Bilingual Manuscripts & 12-Spread Story Data**
  - Compose 12 lyrical spreads per book with 100% Arabic Tashkeel diacritics and rhythmic English verses.
  - Populate spread structures in `web/config/sampleBookData.ts` and `web/config/products.ts`.
  - Reviewer + Challenger + Auditor verify manuscript quality, Tashkeel presence, and data integrity.

- **Milestone 3: Storefront, PDP, Sitemap & Search Token Isolation**
  - Register new books in `PRODUCTS` in `web/config/products.ts`.
  - Connect to PDP routes (`/books/[slug]` and `/ar/books/[slug]`), categories, sitemap, and funnel preview.
  - Maintain absolute isolation from search test tokens.
  - Reviewer + Challenger verify storefront rendering, search behavior, and routing.

- **Milestone 4: Comprehensive Regression Defense & Final Quality Gate**
  - Execute all 7 test suites (238 automated tests), `tsc --noEmit`, and `npm run build`.
  - Forensic integrity audit for genuine implementation and zero cheating.
