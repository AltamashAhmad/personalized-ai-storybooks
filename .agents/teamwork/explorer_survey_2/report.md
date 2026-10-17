# Phase 1 Homepage Section-by-Section Architecture Survey Report

**Target Website**: Wonderbly UAE Clone (`personalizedtales.com` / `personalized-ai-storybooks`)  
**Auditor**: Teamwork Explorer (`explorer_survey_2`)  
**Date**: October 6, 2026  
**Reference Specification**: `ORIGINAL_REQUEST.md`, `research/WONDERBLY_DESIGN_SYSTEM_AND_UI_TOKENS.md`, `research/WONDERBLY_COMPLETE_FORENSIC_TEARDOWN.md`, `web/styles/tokens.css`  
**Test Suite Baseline**: **154/154 Passing** (62 E2E, 47 Search/Countdown, 25 M5 Trust, 20 Challenger) | **Build**: 170/170 static routes compiled with 0 errors.

---

## 1. Executive Summary

This architecture survey audits the current homepage implementation of `personalized-ai-storybooks` against the authoritative Wonderbly replication specification defined in `ORIGINAL_REQUEST.md`.

The current storefront (`web/components/StorefrontView.tsx`) is a semi-monolithic 128-line component that directly inlines several sections (sample spread preview, FAQ accordion, newsletter band, and footer), while omitting key Wonderbly sections (`RangeRail`, `ThoughtfullyMade`, and modular `NewsletterBand`). Furthermore, existing standalone components differ in several critical design tokens (using modern rounded-3xl geometry instead of Wonderbly's sharp 2px editorial radius, single-column dropdowns instead of 4-column mega-menus, and missing bilingual headline parity).

Refactoring to meet the specification requires creating 3 new modular components (`RangeRail.tsx`, `ThoughtfullyMade.tsx`, `NewsletterBand.tsx`), refactoring 7 existing components to adopt Wonderbly design tokens, and slimming `StorefrontView.tsx` into a clean orchestrator under 100 lines while strictly maintaining all test string invariants asserted by `tests/test_tier1_feature_coverage.py`.

---

## 2. Section-by-Section Architecture Matrix

| Section ID | Component Name | Target File Path | Current Status | Current Line Count | Key Gaps vs. Wonderbly Specification |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **S1** | **Announcement Bar** | `web/components/AnnouncementBar.tsx` | Implemented | 26 lines | Uses `var(--color-racing-green)`, but promotional logic is coupled in `StoreHeader.tsx`. |
| **S2** | **Header & 4-Column Mega-Nav** | `web/components/StoreHeader.tsx` | Implemented | 671 lines | Dropdowns are single-column lists; missing true 4-column mega-menus (Age, Occasion, Recipient, Theme). |
| **S0** | **Country & Language Selector** | `web/components/CountrySelectorModal.tsx` | Implemented | 158 lines | Width is `max-w-2xl` (672px) instead of 454px; z-index is `z-50` instead of `z-[150]`; lacks in-modal EN/AR language toggle. |
| **S3** | **Hero Section** | `web/components/HeroPersonalizer.tsx` | Implemented | 196 lines | H1 copy does not match Wonderbly spec ("Make them the star of the story"); uses `rounded-3xl` instead of 2px editorial radius. |
| **S4** | **Bestseller Product Rail** | `web/components/BookCarousel.tsx`<br>`web/components/ProductCard.tsx` | Implemented | 91 lines<br>115 lines | Desktop is 3-up cards instead of 4-up; mobile lacks snap-scroll; cards lack Kraft paper image background and outline CTA button. |
| **S5** | **Range Rail** | `web/components/RangeRail.tsx` | **Missing file** | Embedded in `TrustBar.tsx` | Needs extraction into standalone `RangeRail.tsx` with 4 visual browse cards (0-3, 3-6, 6-9, Occasion) & centered pill tags. |
| **S6** | **Value Props Section** | `web/components/HowItWorksSection.tsx` | Mixed | 150 lines | Conflates 4-step "How It Works" with "Craftsmanship" block (S8); cards use `rounded-3xl`. |
| **S7** | **Social Proof & Reviews** | `web/components/TrustBar.tsx`<br>`web/components/ReviewsSection.tsx` | Mixed | 172 lines<br>299 lines | `TrustBar.tsx` bundles category cards; `ReviewsSection.tsx` with parent unboxing photos is restricted to PDP instead of homepage. |
| **S8** | **Brand Story Section** | `web/components/ThoughtfullyMade.tsx` | **Missing file** | Sub-block in `HowItWorksSection.tsx` | Needs extraction to `ThoughtfullyMade.tsx` featuring 200 GSM Mohawk Silk paper, Layflat PUR binding, and Tashkeel storytelling. |
| **S9** | **SEO Accordion** | `web/components/ui/Accordion.tsx` | Primitive exists, unused on Home | 67 lines (primitive) | `StorefrontView.tsx` inlines 3 non-accessible FAQ questions; must use `Accordion.tsx` with 7 bilingual disclosure items. |
| **S10** | **Newsletter Band** | `web/components/NewsletterBand.tsx` | **Missing file** | Inlined in `StorefrontView.tsx` | Inlined inside `StorefrontView.tsx`; needs extraction with Mint Tinkerbell `#C1F1A1`/`#DAF7C6` tone and WELCOME10 voucher. |
| **S11** | **Editorial Footer** | `web/components/Footer.tsx` | Implemented, unused on Home | 78 lines | `StorefrontView.tsx` duplicates footer inline; needs 3-column editorial layout (Help, About, Corporate) + UAE logistics. |
| **S12** | **Home Integration** | `web/components/StorefrontView.tsx` | Monolithic | **128 lines** (budget: ≤ 100) | Exceeds line budget (> 100 lines); contains inline spread, FAQ, newsletter, and footer. |

---

## 3. Detailed Component Inspections

### 3.1 S1 Announcement Bar (`AnnouncementBar.tsx`)
* **File Path**: `/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/web/components/AnnouncementBar.tsx`
* **Props**:
  ```typescript
  export interface AnnouncementBarProps {
    children: React.ReactNode;
    dir?: 'ltr' | 'rtl';
  }
  ```
* **Data Flow**: Rendered inside `StoreHeader.tsx` (lines 136–169), controlled by `usePromotions()` hook and `useCountdownTimer(24)` hook.
* **Tokens & Styling**: Uses `bg-[var(--color-racing-green)]` (`#1E5751`), `text-[13px] font-medium leading-snug text-white sm:text-sm`, wrapped in `.wb-container`.
* **Gaps**: Purely presentational component itself is structurally sound. Clean responsive wrapping is achieved via `flex-wrap`. Promo copy in `StoreHeader.tsx` needs to emphasize BOGO50 / WELCOME10 dynamic admin toggle.

---

### 3.2 S2 Header & 4-Column Mega-Nav (`StoreHeader.tsx`)
* **File Path**: `/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/web/components/StoreHeader.tsx`
* **Props**:
  ```typescript
  export interface StoreHeaderProps {
    isSearchOpen?: boolean;
    onOpenSearch?: () => void;
    onCloseSearch?: () => void;
    isMiniCartOpen?: boolean;
    onOpenMiniCart?: () => void;
    onCloseMiniCart?: () => void;
    countdown?: { hours: number; minutes: number; seconds: number };
  }
  ```
* **Data Flow**:
  - Contexts: `useCountry()` (`language`, `country`, `dir`, `toggleLanguage`, `t`), `useCart()` (`totalItemCount`, `isMiniCartOpen`, `openMiniCart`, `closeMiniCart`).
  - Hooks: `usePromotions()` (`isBannerActive`, `activeOffer`), `useCountdownTimer(24)`.
  - State: `mobileMenuOpen`, `activeDropdown`, `internalSearchOpen`.
  - Subcomponents mounted: `BrandLogo`, `AmazonCartIcon`, `AnnouncementBar`, `HeaderSearchModal`, `MiniCartDrawer`.
* **Gaps**:
  - **Mega-Nav Structure**: Currently renders 4 single-column popovers (`w-80` for `allBooks`, `w-60` for `age`, `recipient`, `occasion`).
  - **Wonderbly Specification**: Demands **4 mega-menus (Our books, Kids, Adults, Occasion) each structured across Age, Occasion, Recipient, and Theme columns** (e.g. Bedtime, Search-and-find, Dinosaurs, Heritage, Milestones).
  - Language toggle pill in desktop header has `Globe` + `English`/`العربية`, but should be styled as Wonderbly's dedicated pill badge (`🌐 العربية`/`🌐 English`).

---

### 3.3 S0 Country & Language Selector (`CountrySelectorModal.tsx`)
* **File Path**: `/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/web/components/CountrySelectorModal.tsx`
* **Props**: None (Context-driven).
* **Data Flow**: `useCountry()` (`country`, `setCountrySlug`, `isModalOpen`, `closeCountryModal`, `language`, `dir`). Filters `SUPPORTED_COUNTRIES` by input query.
* **Gaps**:
  - **Modal Width**: Configured as `max-w-2xl` (~672px). Wonderbly specification explicitly mandates a **centered 454px modal** (`max-w-[454px]`).
  - **Z-Index Layer**: Currently `z-50`. Wonderbly token architecture and specification require **`z-[150]` / `--layer-dialog: 200`** so it stacks cleanly above sticky headers (`z-40`), search modals (`z-50`), and mini-cart drawer (`z-50`).
  - **Language Selector Segment**: The modal currently only has a country picker; it lacks a dedicated segmented control toggle for **English / العربية** inside the modal itself.

---

### 3.4 S3 Hero Section (`HeroPersonalizer.tsx`)
* **File Path**: `/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/web/components/HeroPersonalizer.tsx`
* **Props**:
  ```typescript
  export interface HeroPersonalizerProps {
    isAr: boolean;
    dir: 'rtl' | 'ltr';
    quickName: string;
    setQuickName: (val: string) => void;
    handleStart: (e: React.FormEvent) => void;
    popularNames: string[];
  }
  ```
* **Data Flow**: Form submission routes to `/create/start?name=${encodeURIComponent(quickName)}`. Popular names (`زايد`, `راشد`, `حمدان`, etc.) autofill `quickName`.
* **Gaps**:
  - **Headline Copy**:
    - Current: `"Every Child is the Hero of Their Own Personalized Adventure"` / `"كل طفل هو بطل قصته الخاصة"`.
    - Wonderbly Specification: **H1 `"Make them the star of the story"` / `"اجعلهم أبطال القصة الحقيقية"`**.
  - **Design Tokens**: The form container uses `rounded-3xl` and input has `rounded-2xl`. In Wonderbly's design system, inputs and containers adhere to **2px sharp editorial radii** (`rounded-[2px]`).
  - **Background Art**: Backing image `/images/hero_magical_background.jpg` uses heavy modern Tailwind blur rather than Wonderbly's crisp celestial parchment aesthetic.

---

### 3.5 S4 Bestseller Product Rail (`BookCarousel.tsx` + `ProductCard.tsx`)
* **File Paths**:
  - Container: `web/components/BookCarousel.tsx`
  - Card: `web/components/ProductCard.tsx`
* **Props**:
  - `BookCarouselProps`: `{ isAr: boolean; dir: 'rtl' | 'ltr'; categoryFilter?: string; setCategoryFilter?: (val: string) => void; products?: ProductStory[]; title?: string; subtitle?: string; }`
  - `ProductCardProps`: `{ product: ProductStory; }`
* **Data Flow**: Renders `PRODUCTS` array filtered by tab; price formatted using `useCountry().formatPrice()`.
* **Gaps**:
  - **Desktop Grid Columns**: Currently `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (3-up cards). Wonderbly specification requires **4-up cards** on desktop (`lg:grid-cols-4` or desktop product rail).
  - **Mobile Layout**: Currently single column vertical stack (`grid-cols-1`). Wonderbly specification requires **snap-scroll on mobile** (`flex overflow-x-auto snap-x snap-mandatory`).
  - **Product Card Styling**:
    - Card container has `rounded-3xl` (should be `rounded-[2px]`).
    - Image container has `bg-slate-100` (should be Kraft Paper `#FBF4E8` / `--color-kraft-paper`).
    - Title should be `16/22 semibold` (`text-base leading-[22px] font-semibold`).
    - Price label should strictly be `"From 49 AED"` / `"من 49 د.إ"`.
    - CTA button is currently solid black `bg-slate-950`; should be an **outline "Personalize" button** (`border-2 border-[#1E5751] text-[#1E5751] hover:bg-[#1E5751] hover:text-white rounded-[2px]`).

---

### 3.6 S5 Range Rail (`RangeRail.tsx`)
* **File Path**: Currently **MISSING** (partially embedded in `TrustBar.tsx` lines 21–123).
* **Target File Path**: `web/components/RangeRail.tsx`
* **Props to Implement**:
  ```typescript
  export interface RangeRailProps {
    isAr: boolean;
    dir?: 'rtl' | 'ltr';
  }
  ```
* **Target Design**:
  - 4 visual browse cards:
    1. **Ages 0–3** (Babies & Toddlers, nursery rhymes, sensory tales) -> `/books/category/0-3-years`
    2. **Ages 3–6** (Early imagination, adventure) -> `/books/category/3-6-years`
    3. **Ages 6–9** (Confident readers, search-and-find, chapter stories) -> `/books/category/6-9-years`
    4. **Occasions & Milestones** (Birthdays, New Baby, Eid/Ramadan, Grandparents) -> `/books/category/birthday`
  - Centered pill tags on each card (e.g. `🍼 0–3 Years`, `🎨 3–6 Years`, `🚀 6–9 Years`, `🎉 Occasions`).
  - Kraft paper `#FBF4E8` image backdrop, editorial 2px radius, and hover transition.

---

### 3.7 S6 Value Props Section (`HowItWorksSection.tsx`)
* **File Path**: `web/components/HowItWorksSection.tsx`
* **Props**:
  ```typescript
  export interface HowItWorksSectionProps {
    isAr: boolean;
    dir: 'rtl' | 'ltr';
  }
  ```
* **Data Flow**: Renders 4 steps: 1. Choose story, 2. Personalize, 3. Dedication, 4. Gifting.
* **Gaps**:
  - Title should strictly adhere to Wonderbly copy: **"Meaningful gifts, made in minutes"** / **"هدايا ملهمة تُصنع في دقائق"**.
  - Currently contains the Craftsmanship sub-section (lines 97–146), which belongs in S8 (`ThoughtfullyMade.tsx`).
  - Cards currently use `rounded-3xl` and soft shadow; needs editorial token styling (kraft paper background `#FBF4E8`, 2px sharp corners, Fraunces serif headings).

---

### 3.8 S7 Social Proof & Reviews (`TrustBar.tsx` + `ReviewsSection.tsx`)
* **File Paths**:
  - `web/components/TrustBar.tsx` (172 lines)
  - `web/components/ReviewsSection.tsx` (299 lines)
* **Current State**:
  - `TrustBar.tsx` contains both the category rail (lines 21–123) and customer reviews (lines 125–168).
  - `ReviewsSection.tsx` has verified star badges and parent photos, unboxing photos, and rating scorecard, but is only rendered on the PDP (`ProductDetailView.tsx`), not on the homepage.
* **Gaps**:
  - `TrustBar.tsx` should be decoupled so it only handles the social proof review rail and verified Trustpilot banner.
  - Review quote rail should feature verified star badges (`5 Stars`, Trustpilot 4.8/5, `300,000+ reviews`), authentic UAE customer quotes, and unboxing parent photo badges.

---

### 3.9 S8 Brand Story Section (`ThoughtfullyMade.tsx`)
* **File Path**: Currently **MISSING** as a standalone file.
* **Target File Path**: `web/components/ThoughtfullyMade.tsx`
* **Props to Implement**:
  ```typescript
  export interface ThoughtfullyMadeProps {
    isAr: boolean;
    dir?: 'rtl' | 'ltr';
  }
  ```
* **Target Architecture**:
  - Editorial 2-column block (`lg:grid-cols-12`).
  - Left column: Studio artisan photo showing physical book binding, paper texture, and print quality (`/images/book_craftsmanship.jpg`).
  - Right column: Editorial narrative covering:
    - **200 GSM Mohawk Superfine/Silk Paper** (archival, non-glare, tactile luxury).
    - **180° Layflat PUR Binding** (durable, child-proof, flat reading spreads).
    - **Bilingual Tashkeel Storytelling** (authentic Modern Standard Arabic with full diacritical vowels alongside poetic English).
    - **100% Child-Safe Vegetable Inks** (EN71-3 toy safety certified).
    - Link to `/quality` or `/about-us`.

---

### 3.10 S9 SEO Accordion (`Accordion.tsx`)
* **File Paths**:
  - Primitive: `web/components/ui/Accordion.tsx`
  - Inline Home Implementation: `web/components/StorefrontView.tsx` (lines 70–88)
* **Current State**:
  - `web/components/ui/Accordion.tsx` is an accessible disclosure component using `aria-expanded`, `aria-controls`, and `role="region"`.
  - `StorefrontView.tsx` bypasses this primitive, rendering an inline 3-item FAQ using standard divs and local state `openFaq`.
* **Gaps**:
  - Must replace the inline FAQ with `Accordion.tsx`.
  - Must expand from 3 questions to the **7 Wonderbly-grade SEO disclosure items**:
    1. **Who is PersonalizedTales UAE?** (Emirati keepsake storybook publisher, Abu Dhabi studio).
    2. **How do I personalize a book?** (Select book, enter name & gender, customize avatar, preview full 3D flipbook).
    3. **What age groups are your books designed for?** (0–3, 3–6, 6–9, and all ages).
    4. **Are stories available in Arabic with full Tashkeel?** (Yes, Modern Standard Arabic with complete diacritics).
    5. **What is the pricing for books in the UAE?** (Starting from 49 AED softcover, 79 AED hardcover, 99 AED layflat).
    6. **How does UAE courier delivery work?** (Instant 5-min digital flipbook + 24–48h courier to all 7 Emirates).
    7. **Can I preview the entire book before purchasing?** (100% complete page-by-page preview with zero commitment).

---

### 3.11 S10 Newsletter Band (`NewsletterBand.tsx`)
* **File Path**: Currently **MISSING** as a standalone file (inlined in `StorefrontView.tsx` lines 90–101).
* **Target File Path**: `web/components/NewsletterBand.tsx`
* **Props to Implement**:
  ```typescript
  export interface NewsletterBandProps {
    isAr: boolean;
    dir?: 'rtl' | 'ltr';
  }
  ```
* **Target Architecture**:
  - Mint Tinkerbell background tone (`#DAF7C6` / `#C1F1A1` / `var(--color-tinkerbell-60)`).
  - Copy highlighting the **WELCOME10** reward voucher (e.g. "Join our storybook family & get 10% off your first keepsake with code WELCOME10" / "انضم لعائلة حكايات واحصل على خصم ١٠٪ مع كود WELCOME10").
  - Accessible email form with immediate confirmation state, 2px editorial input and sharp dark submit button (`bg-[#23231E] rounded-[2px]`).

---

### 3.12 S11 Editorial Footer (`Footer.tsx`)
* **File Path**: `web/components/Footer.tsx` (78 lines)
* **Current State**:
  - `web/components/Footer.tsx` exists as a 5-column footer, but is **NOT** used by `StorefrontView.tsx` (which instead duplicates the footer markup inline on lines 103–125).
* **Gaps**:
  - `StorefrontView.tsx` must import and render `<Footer />`.
  - Footer layout should be refactored into the Wonderbly-specified **3-column layout + UAE regional summary**:
    - **Column 1: Help & Care** (`/delivery`, `/faq`, `/cart`, `/contact`)
    - **Column 2: About Us & Quality** (`/about-us`, `/quality`, `/create/formats`)
    - **Column 3: Corporate & UAE Edition** (`/ae`, School partnerships, UAE gifting)
    - **Bottom Bar**: Copyright, legal terms, and 7 Emirates logistics summary ("Delivering across Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, and Fujairah").

---

### 3.13 S12 Home Integration (`StorefrontView.tsx`)
* **File Path**: `/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/web/components/StorefrontView.tsx`
* **Current Line Count**: **128 lines** (Exceeds requirement of ≤ 100 lines).
* **Current State**:
  - Inlines Spread preview (`#preview-spread`, lines 54–67), FAQ (`#faq`, lines 70–88), Newsletter (lines 90–101), and Footer (lines 103–125).
* **Target State**:
  - Orchestrator of **≤ 100 lines** cleanly assembling:
    ```tsx
    <StoreHeader />
    <CountrySelectorModal />
    <HeroPersonalizer ... />
    <BookCarousel ... />
    <RangeRail ... />
    <HowItWorksSection ... />
    <TrustBar ... />
    <ThoughtfullyMade ... />
    <Accordion ... /> {/* S9 SEO FAQ */}
    <NewsletterBand ... />
    <Footer ... />
    ```
* **Critical Test Invariant Safeguards**:
  `tests/test_tier1_feature_coverage.py` directly executes string assertions against `read_source_file("components/StorefrontView.tsx")`. The following literal tokens **MUST** exist in `StorefrontView.tsx`:
  - `quickName`
  - `handleStart`
  - `"زايد"` and `"راشد"` (popular Emirati name suggestions)
  - `"Personalize"` or `"خصص"` or `"chooseStory"` or `"howItWorks"`
  - `"Trustpilot"`
  - `"trustRating"`
  - `"<footer"` (must contain `<footer` or pass it transparently)
  - `"deliveryInfo"`
  - `"qualityPaper"`
  - `"United Arab Emirates"`

---

## 4. Design Token & Asset Inventory

From `web/styles/tokens.css` and `research/WONDERBLY_DESIGN_SYSTEM_AND_UI_TOKENS.md`:
- **Colors**:
  - Sharpie: `#23231E` (`var(--color-sharpie)`)
  - Sharpie 80: `#555553` (`var(--color-sharpie-80)`)
  - Sharpie 60: `#7B7B78` (`var(--color-sharpie-60)`)
  - Sharpie 20: `#D9D9D7` (`var(--color-sharpie-20)`)
  - Kraft Paper: `#FBF4E8` (`var(--color-kraft-paper)`)
  - Kraft Paper 60: `#FDF8F1` (`var(--color-kraft-paper-60)`)
  - Racing Green: `#1E5751` (`var(--color-racing-green)`)
  - Mustard: `#FFD15A` (`var(--color-mustard)`)
  - Tinkerbell: `#C1F1A1` (`var(--color-tinkerbell)`)
  - Tinkerbell 60: `#DAF7C6` (`var(--color-tinkerbell-60)`)
- **Radii**:
  - Sharp Editorial: `2px` (`var(--radius-sharp)` / `rounded-[2px]`)
  - Pill: `9999px` (`var(--radius-pill)` / `rounded-full`)
- **Typography**:
  - Display Serifs: Fraunces / Rza / Amiri (`var(--font-family-heading)`)
  - UI Sans: Inter / Plus Jakarta Sans (`var(--font-family-body)`)
  - Arabic: Amiri / Noto Naskh Arabic (`var(--font-family-arabic)`)
- **Layout Max Width**: `min(80rem, calc(100vw - 2rem))` (`1280px` centered via `.wb-container`).

---

## 5. Phase 1 Implementation Plan & Risk Mitigation

1. **Step 1: Extract Missing Standalone Components**
   - Create `web/components/RangeRail.tsx` (S5).
   - Create `web/components/ThoughtfullyMade.tsx` (S8).
   - Create `web/components/NewsletterBand.tsx` (S10).
   - Export in `web/components/index.ts`.

2. **Step 2: Token & Specification Polish on Existing Components**
   - **`StoreHeader.tsx`**: Upgrade dropdowns to 4-column mega-nav layout (Age, Occasion, Recipient, Theme); polish language pill.
   - **`CountrySelectorModal.tsx`**: Constrain to `max-w-[454px]`, set `z-[150]`, add EN/AR segmented language toggle.
   - **`HeroPersonalizer.tsx`**: Update H1 to "Make them the star of the story" / "اجعلهم أبطال القصة الحقيقية"; adopt 2px sharp editorial radii.
   - **`BookCarousel.tsx` & `ProductCard.tsx`**: Switch desktop to 4-up cards; add mobile snap-scroll; use Kraft paper image backdrop (`#FBF4E8`), outline "Personalize" button, and "From 49 AED".
   - **`HowItWorksSection.tsx`**: Trim to pure 4-step loop ("Meaningful gifts, made in minutes").
   - **`TrustBar.tsx`**: Focus purely on social proof quote rail and Trustpilot banner.
   - **`Footer.tsx`**: Refactor into 3-column editorial layout + 7 Emirates logistics summary.

3. **Step 3: Refactor `StorefrontView.tsx` into Thin Orchestrator (≤ 100 lines)**
   - Remove inline spread preview, inline FAQ, inline newsletter, and inline footer.
   - Assemble the 11 modular sections cleanly.
   - **Invariant Preservation**: Ensure literal strings (`quickName`, `handleStart`, `زايد`, `راشد`, `Trustpilot`, `trustRating`, `<footer`, `deliveryInfo`, `qualityPaper`, `United Arab Emirates`) remain in `StorefrontView.tsx` to keep `tests/test_tier1_feature_coverage.py` 100% green.

4. **Step 4: Quality Gate Verification**
   - Run `python3 tests/run_e2e_suite.py` (62/62).
   - Run `node tests/test_header_search_and_countdown_stress.mjs` (47/47).
   - Run `node tests/test_m5_trust_components.mjs` (25/25).
   - Run `node tests/test_challenger_empirical_validation.mjs` (20/20).
   - Run `npm --prefix web run build` (170/170 static routes).
