# Scope: PersonalizedTales UAE Expansion Books

## Architecture
- **Catalog Registry**: `web/config/products.ts` (ProductStory interface, PRODUCTS array)
- **Manuscripts & Spreads**: `web/config/sampleBookData.ts` (StorySpread interface, 12 spreads per book, 100% Arabic Tashkeel diacritics, BOOK_SPREADS_MAP, getBookSpreads)
- **Preview Funnel**: `web/app/create/preview/page.tsx` (renders 3D Flipbook using getBookSpreads)
- **Visual Assets**: `web/public/books/` (300 DPI 1024x1024 square covers, two-tier spread fallback)
- **Catalog Documentation**: `docs/EXPANSION_BOOK_CATALOG_LIST.md` (master roadmap and granular 12-spread architectures)
- **Search Corpus Isolation**: Strict exclusion of isolated search tokens (`صقر`, `فضاء`, `نوم`, `space`, `bedtime`, `نجوم`) and preservation of orthogonal pairs (`oasis astronaut`, `واحة رائد فضاء`).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Master Catalog Documentation | Add granular 12-spread story beats for Books 04, 05, 06, and 07 in `docs/EXPANSION_BOOK_CATALOG_LIST.md` | M1 | ORIGINAL_REQUEST R1 |
| 2 | Catalog Product Registration | Register Book 4 (`brave-explorer-oasis` / `the-brave-explorer-hidden-oasis`) in `PRODUCTS` in `web/config/products.ts` with complete metadata, gallery, and badge | M1 | ORIGINAL_REQUEST R3 |
| 3 | 12-Spread Bilingual Manuscripts | Populate 12 complete spreads for all 5 books in `web/config/sampleBookData.ts` with lyrical English rhyming verse and Modern Standard Arabic with 100% Tashkeel (>=10 diacritics per verse) | M1 | ORIGINAL_REQUEST R2 |
| 4 | Multi-Book Spread Map & Funnel Integration | Export `BOOK_SPREADS_MAP` and `getBookSpreads` in `sampleBookData.ts`; update `web/app/create/preview/page.tsx` to render book-specific spreads | M1 | ORIGINAL_REQUEST R2 & R3 |
| 5 | Search Token Isolation Defense | Ensure zero use of `صقر`/falcon, `فضاء`/space, `نوم`/bedtime in expansion books; ensure Book 4 uses Arabian Oryx `المها العربي` instead of falcon | M1 | Test Invariant Survey |
| 6 | 238 Automated Tests & Build Verification | 100% pass rate across all 7 test suites, `npx tsc --noEmit` 0 errors, `npm run build` 0 errors | M1 | ORIGINAL_REQUEST R4 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Full Expansion Production & Regression Defense | Features 1-6 (Catalog docs, products.ts, sampleBookData.ts, preview funnel, 238 tests, build) | Phase 0 Survey | DONE |

## Interface Contracts
- `web/config/products.ts`: exports `PRODUCTS: ProductStory[]` and `getProductBySlug(slug: string): ProductStory | undefined`.
- `web/config/sampleBookData.ts`:
  - Retains existing `SAMPLE_BOOK_SPREADS: StorySpread[]` (for `starlit-dunes` backwards compatibility).
  - Exports `BOOK_SPREADS_MAP: Record<string, StorySpread[]>`.
  - Exports `getBookSpreads(slugOrId: string): StorySpread[]`.
- `web/app/create/preview/page.tsx`:
  - Resolves active product via `getProductBySlug(searchParams.get("book") || "starlit-dunes")`.
  - Resolves spreads via `getBookSpreads(product?.slug || "starlit-dunes")`.
