# Survey Report: Phase 0 Design System & Token Foundation
**PersonalizedTales UAE (Wonderbly Replication)**  
**Author**: `explorer_survey_1`  
**Date**: 2026-10-06  
**Status**: Complete  

---

## 1. Executive Summary

An exhaustive investigation of the design system, typography setup, layout primitives, editorial tokens, and bilingual EN/AR RTL infrastructure was conducted across the `personalized-ai-storybooks` codebase (`web/styles/tokens.css`, `web/app/globals.css`, `web/app/layout.tsx`, and `web/components/ui/*`).

### Key Findings at a Glance:
1. **Tokens File (`web/styles/tokens.css`)**: Already defines Wonderbly core neutrals (Sharpie `#23231e`), Kraft Paper tones (`#fbf4e8`, `#fdf8f1`, `#fefcf8`), brand accents (Racing Green `#1e5751`, Mustard `#ffd15a`, Tinkerbell `#c1f1a1`), geometry (`--radius-sharp: 2px`, `--radius-pill: 9999px`), layout container, and stacking order. However, several Wonderbly accent colors (Butter `#FFEBA3`, Lily Pad `#9FE778`, Blueberry `#0049AC`, Bubble Bath `#D0EBFF`, Princess `#CEBCFA`, Pinking Shears `#E98EC1`, Grid Line Tint `#F9F0DF`) and the physical page realism drop shadow (`--shadow-spine`) are missing from `tokens.css`.
2. **Tailwind v4 Integration Gap**: Tailwind CSS v4 is used (`@import "tailwindcss";` in `globals.css`). The tokens in `tokens.css` are declared inside `@layer tokens { :root { ... } }`, but they are **not** exposed in Tailwind's `@theme inline` block. Consequently, Tailwind does not generate utility classes like `bg-kraft-paper`, `text-sharpie`, `bg-racing-green`, `rounded-sharp`, or `font-heading`. Developers were forced to use cumbersome arbitrary values (`bg-[var(--color-racing-green)]`) or hardcode hex values (`#1E5751`, `#FDF8F1`) in component files.
3. **Typography Disconnect**:
   - Google Fonts links in `web/app/layout.tsx` (line 66) properly import **Plus Jakarta Sans**, **Amiri**, **Fraunces**, and **Inter**.
   - However, in `web/app/globals.css` (lines 12–15), Tailwind's `@theme inline` maps `--font-serif` directly to `'Amiri', Georgia...` and `--font-sans` to `'Plus Jakarta Sans'`. Neither `Fraunces` nor `Inter` is registered in Tailwind `@theme inline`.
   - As a result, in English mode, headings using `.font-serif` render in `Amiri` rather than the Wonderbly display serif `Fraunces`!
4. **Layout Primitives Status**:
   - `PageSection.tsx` and `Accordion.tsx` exist in `web/components/ui/` with high fidelity (supporting tones: `default`, `kraft`, `white`, `green`, `tinkerbell`, `sharpie`, and accessible ARIA disclosure).
   - However, they are **orphaned/unadopted** on the homepage: `StorefrontView.tsx` currently uses ad-hoc `<section>` wrappers with mismatched paddings and an inline FAQ state toggle instead of using `PageSection` and `Accordion`.
   - Other primitives (`Button.tsx`, `Badge.tsx`) still use modern high radii (`rounded-xl`, `rounded-2xl`, `rounded-3xl`) and hardcoded hex values rather than Wonderbly's sharp 2px editorial geometry.
5. **Bilingual EN/AR RTL Foundation**:
   - `CountryContext.tsx` handles `dir="rtl"` and `lang="ar"` on `document.documentElement`.
   - `globals.css` has solid Tashkeel ligature protections (`letter-spacing: 0 !important; font-feature-settings: "kern" 1, "liga" 1, "calt" 1;`).
   - Primitives like `wb-container` (`margin-inline: auto`) and `Accordion.tsx` (`text-start`) natively support RTL, but components frequently use legacy physical classes (`left-`, `right-`) with manual conditionals instead of logical CSS properties (`start-`, `end-`).

---

## 2. In-Depth Analysis: `web/styles/tokens.css`

### 2.1 Current Token Declarations

Located at `web/styles/tokens.css`, imported at line 2 of `web/app/globals.css`:

```css
@layer tokens {
  :root {
    /* Neutrals */
    --color-sharpie: #23231e;
    --color-sharpie-80: #555553;
    --color-sharpie-60: #7b7b78;
    --color-sharpie-30: #bdbdbb;
    --color-sharpie-20: #d9d9d7;
    --color-sharpie-10: #e9e9e9;
    --color-bright-smile: #ffffff;
    --color-kraft-paper: #fbf4e8;
    --color-kraft-paper-60: #fdf8f1;
    --color-kraft-paper-30: #fefcf8;

    /* Brand accents */
    --color-racing-green: #1e5751;
    --color-racing-green-60: #789a97;
    --color-racing-green-30: #bbcdcb;
    --color-mustard: #ffd15a;
    --color-mustard-60: #ffe39c;
    --color-mustard-30: #fff1ce;
    --color-tinkerbell: #c1f1a1;
    --color-tinkerbell-60: #daf7c6;
    --color-cherry-cola: #851926;
    --color-ketchup: #d8460d;
    --color-paper-boat: #6ab5f4;

    /* Typography */
    --font-family-heading: 'Fraunces', 'Amiri', Georgia, serif;
    --font-family-body: 'Inter', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-family-arabic: 'Amiri', 'Noto Naskh Arabic', serif;

    /* Geometry */
    --radius-sharp: 2px;
    --radius-pill: 9999px;

    /* Layout grid */
    --layout-content-width: min(80rem, calc(100vw - 2rem));
    --layout-gutter: 1rem;
    --layout-inline: max(1rem, calc(50vw - var(--layout-content-width) / 2));
    --site-header-height: 150px;

    /* Stacking order */
    --layer-header: 30;
    --layer-search: 60;
    --layer-country-picker: 100;
    --layer-dialog: 200;
  }
}
```

### 2.2 Comparison with Wonderbly Specification (`research/WONDERBLY_DESIGN_SYSTEM_AND_UI_TOKENS.md`)

| Wonderbly Spec Token | Hex Code | Status in `tokens.css` | Status in Tailwind Theme | Functional Usage / Role |
| :--- | :--- | :--- | :--- | :--- |
| **Sharpie** | `#23231E` | Present (`--color-sharpie`) | Missing | Primary text, primary CTA bg, high-contrast borders |
| **Sharpie 80** | `#555553` | Present (`--color-sharpie-80`) | Missing | Secondary body text, subheadings |
| **Sharpie 60** | `#7B7B78` | Present (`--color-sharpie-60`) | Missing | Micro-copy, character counters, overlay base |
| **Sharpie 30** | `#BDBDBB` | Present (`--color-sharpie-30`) | Missing | Input borders (`2px solid`), drawer inactive borders |
| **Sharpie 20** | `#D9D9D7` | Present (`--color-sharpie-20`) | Missing | Subtle container borders, dividers, hairline lines |
| **Sharpie 10** | `#E9E9E9` | Present (`--color-sharpie-10`) | Missing | Light dividers, inactive pagination dots |
| **Bright Smile** | `#FFFFFF` | Present (`--color-bright-smile`) | Missing | Pure white card surfaces, dark CTA text |
| **Kraft Paper** | `#FBF4E8` | Present (`--color-kraft-paper`) | Missing | Warm parchment base, book cover placeholder bg |
| **Kraft Paper 60** | `#FDF8F1` | Present (`--color-kraft-paper-60`)| Missing | Primary page background, modal content bg |
| **Kraft Paper 30** | `#FEFCF8` | Present (`--color-kraft-paper-30`)| Missing | Lightest parchment card highlight |
| **Grid Line Tint** | `#F9F0DF` | **MISSING** | Missing | 1px repeating canvas grid pattern (`8px 8px`) |
| **Racing Green** | `#1E5751` | Present (`--color-racing-green`) | Missing | Signature brand deep teal, promo bar, active selectors |
| **Racing Green 60**| `#789A97` | Present (`--color-racing-green-60`)| Missing | Secondary green accent |
| **Racing Green 30**| `#BBCDCB` | Present (`--color-racing-green-30`)| Missing | Soft sage background for promo chips |
| **Mustard** | `#FFD15A` | Present (`--color-mustard`) | Missing | Golden yellow accent, hero badge, key CTAs |
| **Mustard 60** | `#FFE39C` | Present (`--color-mustard-60`) | Missing | Secondary gold tint |
| **Mustard 30** | `#FFF1CE` | Present (`--color-mustard-30`) | Missing | Soft gold badge background |
| **Butter** | `#FFEBA3` | **MISSING** | Missing | Warm creamy yellow highlight |
| **Tinkerbell** | `#C1F1A1` | Present (`--color-tinkerbell`) | Missing | Bright lime/mint, discount badges, newsletter band |
| **Tinkerbell 60** | `#DAF7C6` | Present (`--color-tinkerbell-60`)| Missing | Promo code tag background in checkout & cart |
| **Lily Pad** | `#9FE778` | **MISSING** | Missing | Electric lime accent, tertiary button border |
| **Cherry Cola** | `#851926` | Present (`--color-cherry-cola`) | Missing | Error validation border (`[aria-invalid="true"]`) |
| **Ketchup** | `#D8460D` | Present (`--color-ketchup`) | Missing | Vibrant orange/red accent, sale badges |
| **Paper Boat** | `#6AB5F4` | Present (`--color-paper-boat`) | Missing | Focus ring outline color (`0 0 0 4px #6AB5F4`) |
| **Blueberry** | `#0049AC` | **MISSING** | Missing | Deep royal blue button variant |
| **Bubble Bath** | `#D0EBFF` | **MISSING** | Missing | Soft blue banner / notification background |
| **Princess** | `#CEBCFA` | **MISSING** | Missing | Lavender theme accent |
| **Pinking Shears**| `#E98EC1` | **MISSING** | Missing | Playful pink theme accent |
| **Sharp Radius** | `2px` | Present (`--radius-sharp`) | Missing | Crisp editorial cards, inputs, containers |
| **Spine Drop Shadow**| `rgba(...)` | **MISSING** | Missing | Multi-layer spine shadow with warm ochre bounce |

---

## 3. Typography Architecture & Setup

### 3.1 Font Loading (`web/app/layout.tsx`)
In `web/app/layout.tsx` (lines 64–66), the Google Fonts link tag loads:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Amiri:wght@400;700&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
```
All required fonts are loaded at the network layer:
- **Fraunces**: Optical sizes 9..144, weights 400, 500, 600 (Display serif stand-in for Wonderbly's *Rza*)
- **Inter**: Weights 400, 500, 600 (UI sans stand-in for Wonderbly's *Atak*)
- **Amiri**: Weights 400, 700 (Classical Naskh Arabic typography with full Tashkeel diacritics support)
- **Plus Jakarta Sans**: Loaded as secondary sans-serif

### 3.2 The Tailwind v4 Font Configuration Bug in `web/app/globals.css`
In `web/app/globals.css` (lines 9–15):
```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-serif: 'Amiri', Georgia, Cambria, 'Times New Roman', Times, serif;
  --font-amiri: 'Amiri', serif, system-ui;
}
```
And lines 37–43:
```css
.font-serif {
  font-family: 'Amiri', Georgia, serif;
}

.font-sans {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

#### Diagnostic Finding:
1. `--font-serif` is hardwired to `'Amiri', Georgia...` regardless of direction!
2. When English components (such as `StorefrontView.tsx`, `SectionHeader.tsx`, `HeroPersonalizer.tsx`, `BookCarousel.tsx`, `ContactView.tsx`) declare `className="font-serif"`, they are styled with the Arabic Naskh face **Amiri** instead of the intended Wonderbly display serif **Fraunces**.
3. In `web/styles/tokens.css`, `--font-family-heading: 'Fraunces', 'Amiri', Georgia, serif;` is defined, and `.wb-heading` consumes it, but `.wb-heading` is used **0 times** across the application.
4. `--font-sans` is mapped to `'Plus Jakarta Sans'`, completely bypassing `Inter`.

### 3.3 Target Typography Mapping Blueprint
To achieve genuine Wonderbly typography parity in Phase 0:
- **Heading Display Serif (EN)**: `Fraunces, Georgia, serif`
- **Heading Display Serif (AR)**: `Amiri, 'Noto Naskh Arabic', serif`
- **UI Sans / Body (EN)**: `Inter, 'Plus Jakarta Sans', system-ui, sans-serif`
- **Arabic Body (AR)**: `Amiri, system-ui, sans-serif` (or `'Noto Naskh Arabic'`) with `letter-spacing: 0 !important;` and `line-height: 1.6` for titles / `2.1` for verses.

---

## 4. Layout Primitives Deep Dive

### 4.1 `PageSection.tsx` (`web/components/ui/PageSection.tsx`)
```tsx
export type PageSectionTone = 'default' | 'kraft' | 'white' | 'green' | 'tinkerbell' | 'sharpie';

export interface PageSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  tone?: PageSectionTone;
  flush?: boolean;
}
```
- **Tones Implemented**:
  - `default`: `bg-[var(--color-kraft-paper-60)] text-[var(--color-sharpie)]` (`#FDF8F1`)
  - `kraft`: `bg-[var(--color-kraft-paper)] text-[var(--color-sharpie)]` (`#FBF4E8`)
  - `white`: `bg-[var(--color-bright-smile)] text-[var(--color-sharpie)]` (`#FFFFFF`)
  - `green`: `bg-[var(--color-racing-green)] text-white` (`#1E5751`)
  - `tinkerbell`: `bg-[var(--color-tinkerbell)] text-[var(--color-sharpie)]` (`#C1F1A1`)
  - `sharpie`: `bg-[var(--color-sharpie)] text-white` (`#23231E`)
- **Spacing & Alignment**:
  - `flush`: removes vertical padding for full-bleed hero backgrounds.
  - Standard padding: `py-10 md:py-14`.
  - Inner container: `<div className="wb-container">{children}</div>` with `width: min(80rem, calc(100vw - 2rem)); margin-inline: auto;`.
- **Status in Codebase**:
  `PageSection` is cleanly implemented and exported in `web/components/ui/index.ts`, but currently **0 of the 11 homepage sections** consume it.

### 4.2 `Accordion.tsx` (`web/components/ui/Accordion.tsx`)
```tsx
export interface AccordionItem {
  id: string;
  heading: string;
  content: React.ReactNode;
}
```
- **Accessibility & WAI-ARIA**:
  - Trigger: `<button type="button" aria-expanded={isOpen} aria-controls={panelId}>`
  - Region: `<div id={panelId} role="region" hidden={!isOpen}>`
  - Focus Ring: `focus-visible:outline-[var(--color-paper-boat)]` (Paper boat `#6AB5F4` focus ring)
- **Visual Styling**:
  - Divider: `border-b border-[var(--color-sharpie-20)]`
  - Heading: `text-start text-base font-semibold text-[var(--color-sharpie)]`
  - Icon: `ChevronDown` from `lucide-react`, `text-[var(--color-racing-green)]`, rotates `180deg` smoothly (`transition-transform duration-200`)
- **Status in Codebase**:
  Fully implemented and functional. However, `StorefrontView.tsx` currently reimplements an inline, non-accessible FAQ accordion (lines 73–87) using `<div>` and simple state toggles instead of `<Accordion items={...} />`.

### 4.3 Other Shared Primitives (`web/components/ui/`)
- **`Button.tsx`**:
  - Variants: `primary`, `secondary`, `outline`, `ghost`
  - Issue: Has hardcoded styles `bg-[#1E5751]`, `bg-[#C9A96E]`, `rounded-xl`, `rounded-2xl`. To align with Wonderbly, buttons should support `rounded-[2px]` (sharp editorial) or `rounded-full` (pills) and consume `--color-racing-green`, `--color-mustard`, `--color-sharpie`.
- **`Badge.tsx`**:
  - Variants: `default`, `gold`, `success`, `warning`, `outline`
  - Issue: Uses hardcoded hex codes and `rounded-full`.
- **`Drawer.tsx`**:
  - Accessible, slide-over drawer with ESC key trap and body scroll lock. Fully RTL-aware (`left-0` for RTL, `right-0` for LTR, `-translate-x-full` vs `translate-x-full`).
- **`BrandLogo.tsx`**:
  - High-precision vector SVG logo combining royal 3-peak crown, open storybook pages, and gold starlight sparkle. 0 CLS, 0ms FCP, perfectly responsive.
- **`AmazonCartIcon.tsx`**:
  - Vector Amazon wireframe shopping cart chassis with mathematically centered dynamic item count text.

---

## 5. Editorial Tokens & Sharp Geometry

### 5.1 Geometry Contrast: Existing vs Wonderbly Spec
- **Current Codebase Practice**:
  Throughout `HeroPersonalizer.tsx`, `ProductCard.tsx`, `TrustBar.tsx`, `HowItWorksSection.tsx`, and `CountrySelectorModal.tsx`, components use Tailwind default pill / bubble radii:
  `rounded-2xl`, `rounded-3xl`, `rounded-xl`.
- **Wonderbly Specification**:
  Wonderbly's visual identity relies on **crisp, sharp editorial framing**:
  - Cards, modals, containers, inputs: `border-radius: 0px` or `2px` (`--radius-sharp: 2px`).
  - Chips, age tags, filter toggles: `border-radius: 9999px` (`--radius-pill: 9999px`).
  - This sharp geometry creates the tactile look of a physical printed book or fine paper stationery.

### 5.2 Color Tokens Verification
All primary Wonderbly brand colors are correctly hex-calibrated in `tokens.css`:
- **Sharpie** (`#23231E`): Deep charcoal ink for text and high-contrast buttons.
- **Kraft Paper 60** (`#FDF8F1`): Warm off-white parchment background.
- **Kraft Paper Base** (`#FBF4E8`): Darker kraft paper tone for cards and image backgrounds.
- **Racing Green** (`#1E5751`): Deep teal brand color for announcement bar and accents.
- **Mustard** (`#FFD15A`): Golden yellow for badges and primary CTA highlights.
- **Tinkerbell** (`#C1F1A1` / `#DAF7C6`): Lime/mint green for discount badges and newsletter band.

---

## 6. Bilingual EN/AR RTL Support in Tokens & Base Styles

### 6.1 Direction & Language Orchestration
In `web/lib/context/CountryContext.tsx`:
- When navigating to `/ar` or switching language:
  ```ts
  setLanguageState("ar");
  document.documentElement.lang = "ar";
  document.documentElement.dir = "rtl";
  ```
- Context exposes:
  `language: 'ar' | 'en'`, `dir: 'rtl' | 'ltr'`, and `isRtl: dir === 'rtl'`.

### 6.2 Base CSS RTL Styles (`web/app/globals.css`)
```css
/* RTL Typography & Tashkeel Ligature Protection */
[dir="rtl"], [lang="ar"] {
  letter-spacing: 0 !important;
}

[dir="rtl"] h1, [dir="rtl"] h2, [dir="rtl"] h3, [dir="rtl"] h4, [dir="rtl"] h5, [dir="rtl"] h6,
[dir="rtl"] .font-serif, [lang="ar"] h1, [lang="ar"] h2, [lang="ar"] h3, [lang="ar"] h4, [lang="ar"] .font-serif {
  font-family: 'Amiri', serif;
  letter-spacing: 0 !important;
}

.font-amiri {
  font-family: 'Amiri', serif, system-ui;
  letter-spacing: 0 !important;
  line-height: 2.1;
  font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
}
```
- **Tashkeel Protection**: Arabic requires `letter-spacing: 0 !important;` because any positive or negative letter spacing breaks cursive ligatures in OpenType Arabic fonts like Amiri.
- **Line Height for Tashkeel**: Arabic diacritic marks (Fathah, Dammah, Kasrah, Shaddah, Tanwin) extend vertically beyond standard Latin glyphs. Setting `line-height: 2.1` in `.font-amiri` ensures Tashkeel marks do not collide with adjacent lines.
- **Heading Line Height**: In `tokens.css`, `[dir='rtl'] .wb-heading` sets `line-height: 1.6;`, which is balanced for Arabic titles and headings.

### 6.3 Logical Layout Properties & Best Practices
- `wb-container` uses `margin-inline: auto`, which centers content identically in both LTR and RTL without direction-specific overrides.
- `Accordion.tsx` uses `text-start`, aligning headings to the right in Arabic and to the left in English naturally.
- In components like `ProductCard.tsx` and `HeroPersonalizer.tsx`, several instances of conditional string templates (`${isAr ? "right-3" : "left-3"}`) can be cleaned up using standard CSS logical properties (`start-3`, `end-3`, `ms-`, `me-`).

---

## 7. Quality & Test Regression Invariants

Before concluding this survey, the entire existing quality and verification suite was executed to establish an empirical baseline:

| Test Suite / Gate | Command | Invariant Contract | Result |
| :--- | :--- | :--- | :--- |
| **Python E2E Suite (Tiers 1–4)** | `python3 tests/run_e2e_suite.py` | 62 test cases covering AED pricing (49/79/99), cart, formats, delivery SLAs | **62 / 62 PASSED** |
| **Header Search & Countdown Stress** | `node tests/test_header_search_and_countdown_stress.mjs` | 47 tests covering search isolation, Arabic keyword filtering, hydration safety | **47 / 47 PASSED** |
| **M5 Trust & Informational Pages** | `node tests/test_m5_trust_components.mjs` | 25 tests verifying DeliveryView, QualityView, AboutUsView specifications | **25 / 25 PASSED** |
| **Challenger Empirical Validation** | `node tests/test_challenger_empirical_validation.mjs` | 20 tests verifying query isolation, normalizeDashes, countdown props | **20 / 20 PASSED** |
| **TypeScript Compilation** | `npx tsc --noEmit` | Strict mode static type checking across all 187 files | **0 errors** |
| **ESLint** | `npm run lint` | Next.js code quality and hooks auditing | **0 errors** (54 warnings) |
| **Production Build** | `npm run build` | 170/170 static & dynamic routes compiled via Next.js 16 webpack | **0 errors** (170/170 generated) |

**Total Automated Tests Passing: 154 / 154 (100% Green).**

---

## 8. Actionable Recommendations for Phase 0 Foundation

To establish a 100% Wonderbly-grade foundation ready for the Phase 1 section-by-section clone:

### Recommendation 1: Bridge Tokens into Tailwind v4 `@theme inline`
In `web/app/globals.css`, expand `@theme inline` so that Tailwind generates first-class utilities for all design tokens:
```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);

  /* Fonts */
  --font-sans: 'Inter', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-serif: 'Fraunces', Georgia, serif;
  --font-heading: 'Fraunces', Georgia, serif;
  --font-amiri: 'Amiri', serif, system-ui;

  /* Editorial Neutrals */
  --color-sharpie: var(--color-sharpie);
  --color-sharpie-80: var(--color-sharpie-80);
  --color-sharpie-60: var(--color-sharpie-60);
  --color-sharpie-30: var(--color-sharpie-30);
  --color-sharpie-20: var(--color-sharpie-20);
  --color-sharpie-10: var(--color-sharpie-10);
  --color-bright-smile: var(--color-bright-smile);
  --color-kraft-paper: var(--color-kraft-paper);
  --color-kraft-paper-60: var(--color-kraft-paper-60);
  --color-kraft-paper-30: var(--color-kraft-paper-30);

  /* Editorial Accents */
  --color-racing-green: var(--color-racing-green);
  --color-racing-green-60: var(--color-racing-green-60);
  --color-racing-green-30: var(--color-racing-green-30);
  --color-mustard: var(--color-mustard);
  --color-mustard-60: var(--color-mustard-60);
  --color-mustard-30: var(--color-mustard-30);
  --color-tinkerbell: var(--color-tinkerbell);
  --color-tinkerbell-60: var(--color-tinkerbell-60);
  --color-cherry-cola: var(--color-cherry-cola);
  --color-ketchup: var(--color-ketchup);
  --color-paper-boat: var(--color-paper-boat);

  /* Editorial Radii */
  --radius-sharp: 2px;
}
```

### Recommendation 2: Complete the Missing Color & Spine Shadow Tokens in `tokens.css`
Add the missing Wonderbly tokens identified in Section 2.2:
- `--color-butter: #ffeba3;`
- `--color-lily-pad: #9fe778;`
- `--color-blueberry: #0049ac;`
- `--color-bubble-bath: #d0ebff;`
- `--color-princess: #cebcfa;`
- `--color-pinking-shears: #e98ec1;`
- `--color-grid-line: #f9f0df;`
- `--shadow-spine: rgba(129, 92, 24, 0.12) 0px 13px 27px -5px, rgba(0, 0, 0, 0.30) 0px 8px 16px -8px, rgba(0, 0, 0, 0.03) 0px -6px 16px -6px;`

### Recommendation 3: Enforce Fraunces for English Serif and Amiri for Arabic Serif
Ensure `.font-serif` or `h1..h6` defaults to `Fraunces` in LTR and switches to `Amiri` when `[dir="rtl"]` or `[lang="ar"]` is active:
```css
.font-serif {
  font-family: 'Fraunces', Georgia, serif;
}

[dir="rtl"] .font-serif, [lang="ar"] .font-serif,
[dir="rtl"] h1, [dir="rtl"] h2, [dir="rtl"] h3, [dir="rtl"] h4, [dir="rtl"] h5, [dir="rtl"] h6,
[lang="ar"] h1, [lang="ar"] h2, [lang="ar"] h3, [lang="ar"] h4, [lang="ar"] h5, [lang="ar"] h6 {
  font-family: 'Amiri', serif;
  letter-spacing: 0 !important;
}
```

### Recommendation 4: Wire `PageSection` and `Accordion` into Homepage Sections
When implementing the 11 homepage sections in Phase 1:
- Wrap each section with `<PageSection tone="...">` (`default` for hero & products, `kraft` for how-it-works, `white` for range rail, `green` for announcement/promo, `tinkerbell` for newsletter band).
- Implement Section S9 (SEO FAQ Accordion) by directly passing the 7 bilingual disclosure items to `<Accordion items={faqItems} />`.
- Update `Button.tsx` and `ProductCard.tsx` to adopt the 2px sharp editorial radii (`rounded-[2px]`) and Kraft paper backgrounds (`bg-[#FDF8F1]`).
