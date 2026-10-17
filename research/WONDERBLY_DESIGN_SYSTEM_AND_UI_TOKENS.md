# Wonderbly Design System & UI Token Specification

> **Source**: Extracted live from Wonderbly's Storefront, PDP, Creation Flow, and Preview Spread Reader (September 2026).  
> **Architecture**: CSS `@layer tokens`, `@layer components`, Next.js CSS Modules (`*.module.css`), Astro component styling.

---

## Executive Summary & Design System Philosophy

Wonderbly's visual design language is characterized by an **editorial, storybook-grade aesthetic** that bridges high-end print publishing with digital responsiveness:
- **Typography pairing**: A characterful serif display face (**Rza**) for warmth and bookish charm, paired with a clean, highly legible geometric grotesk sans-serif (**Atak**) for UI controls and reading body copy.
- **Warm tactile surfaces**: Off-white and cream background tones (Kraft Paper `#FDF8F1` / `#FBF4E8`) replicating physical warm book paper rather than sterile clinical digital whites (`#FFFFFF`).
- **Sharp editorial geometry**: `border-radius: 0px` or minimal `2px` for cards, containers, inputs, and modals, creating an intentional, crisp editorial frame around colorful book art.
- **Physical page realism**: Multi-layered spine drop shadows combining warm gold undertones (`rgba(129, 92, 24, 0.12)`) with deep contact occlusion shadows and directional multi-stop gradients that simulate physical book paper curvature and gutter crease depth.

---

## 1. Color Palette Tokens

Wonderbly defines its design tokens in `@layer tokens { :root { ... } }` and maps them semantically into `@layer components`.

### 1.1 Brand & Neutral Colors

| Token Name | CSS Variable | Hex Code | RGB | HSL / Visual Role |
| :--- | :--- | :--- | :--- | :--- |
| **Sharpie** | `--color-sharpie` | `#23231E` | `rgb(35, 35, 30)` | Primary dark text, primary CTA button background, high-contrast borders |
| **Sharpie 80** | `--color-sharpie-80` | `#555553` | `rgb(85, 85, 83)` | Secondary text, subtle subheadings |
| **Sharpie 60** | `--color-sharpie-60` | `#7B7B78` | `rgb(123, 123, 120)` | Micro-copy, character limit counters, inactive controls, overlay color (`rgba(124, 124, 121, 0.75)`) |
| **Sharpie 30** | `--color-sharpie-30` | `#BDBDBB` | `rgb(189, 189, 187)` | Input borders (`2px solid`), drawer inactive borders, modal divider lines |
| **Sharpie 20** | `--color-sharpie-20` | `#D9D9D7` | `rgb(217, 217, 215)` | Subtle container borders, header bottom line |
| **Sharpie 10** | `--color-sharpie-10` | `#E9E9E9` | `rgb(233, 233, 233)` | Dividers, table borders, inactive pagination dots (`#EFEFEF`) |
| **Bright Smile**| `--color-bright-smile` | `#FFFFFF` | `rgb(255, 255, 255)` | Pure white, card backgrounds, modal container cards, button text on dark |
| **Kraft Paper** | `--color-kraft-paper` | `#FBF4E8` | `rgb(251, 244, 232)` | Warm parchment base, cart button text, book page image placeholders |
| **Kraft Paper 60** | `--color-kraft-paper-60` | `#FDF8F1` | `rgb(253, 248, 241)` | Main preview reader page background, modal content area background |
| **Kraft Paper 30** | `--color-kraft-paper-30` | `#FEFCF8` | `rgb(254, 252, 248)` | Lightest parchment highlight |
| **Grid Line Tint** | N/A | `#F9F0DF` | `rgb(249, 240, 223)` | 1px repeating background grid pattern on preview reader canvas (`8px 8px` repeat) |

### 1.2 Accent & Brand Feature Colors

| Token Name | CSS Variable | Hex Code | RGB | Functional Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Racing Green** | `--color-racing-green` | `#1E5751` | `rgb(30, 87, 81)` | Signature deep teal brand color, announcement promo bar, active layout selector toggle, active radio button indicator |
| **Racing Green 60** | `--color-racing-green-60` | `#789A97` | `rgb(120, 154, 151)` | Secondary green tint |
| **Racing Green 30** | `--color-racing-green-30` | `#BBCDCB` | `rgb(187, 205, 203)` | Soft sage background for promo items |
| **Mustard** | `--color-mustard` | `#FFD15A` | `rgb(255, 209, 90)` | Signature golden yellow, hero badge, primary marketing CTA accent |
| **Mustard 60** | `--color-mustard-60` | `#FFE39C` | `rgb(255, 227, 156)` | Secondary gold tint |
| **Mustard 30** | `--color-mustard-30` | `#FFF1CE` | `rgb(255, 241, 206)` | Soft gold badge background |
| **Butter** | `--color-butter` | `#FFEBA3` | `rgb(255, 235, 163)` | Warm creamy yellow highlight |
| **Tinkerbell** | `--color-tinkerbell` | `#C1F1A1` | `rgb(193, 241, 161)` | Bright lime/mint green, discount badges, upsell chips |
| **Tinkerbell 60** | `--color-tinkerbell-60` | `#DAF7C6` | `rgb(218, 247, 198)` | Promo code tag background (`#DAF7C6`) in checkout & cart |
| **Lily Pad** | `--color-lily-pad` | `#9FE778` | `rgb(159, 231, 120)` | Electric lime accent, secondary tertiary button border |
| **Cherry Cola** | `--color-cherry-cola` | `#851926` | `rgb(133, 25, 38)` | Deep burgundy, error validation border (`[aria-invalid="true"]`), warning notices |
| **Ketchup** | `--color-ketchup` | `#D8460D` | `rgb(216, 70, 13)` | Vibrant orange/red accent, sale banners |
| **Paper Boat** | `--color-paper-boat` | `#6AB5F4` | `rgb(106, 181, 244)` | Focus ring shadow color (`0 0 0 4px #6AB5F4`) |
| **Blueberry** | `--color-blueberry` | `#0049AC` | `rgb(0, 73, 172)` | Deep royal blue button variant |
| **Bubble Bath** | `--color-bubble-bath` | `#D0EBFF` | `rgb(208, 235, 255)` | Soft blue banner / notification background |
| **Princess** | `--color-princess` | `#CEBCFA` | `rgb(206, 188, 250)` | Lavender theme accent background |
| **Pinking Shears**| `--color-pinking-shears`| `#E98EC1` | `rgb(233, 142, 193)` | Playful pink theme accent |

---

## 2. Typography System

### 2.1 Font Families
- **Headings Font**: `"Rza", Georgia, serif` (Token: `--font-family-heading`, Next.js variable: `--font-rza`).
- **Body & UI Font**: `"Atak", Arial, sans-serif` (Token: `--font-family-body`, Next.js variable: `--font-atak`).

### 2.2 Heading Typography Specifications

| Element / Level | Token Name | Font | Weight | Size | Line Height | Color |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **H1 (Hero / PDP)** | `--font-heading-4xl-regular` | Rza | 500 / 400 | `36px` | `43.2px` | `#23231E` |
| **H2 (Section Titles)** | `--font-heading-2xl-regular` | Rza | 500 / 400 | `24px`- `28px` | `30px` - `42px` | `#23231E` |
| **H3 (Subsections)** | `--font-heading-l-semibold` | Atak | 600 | `20px` | `28px` | `#23231E` |
| **Product Card Titles** | `ProductCard-heading` | Atak | 600 | `16px` | `22px` | `#23231E` |

---

## 3. Physical Page Realism & Box Shadows

```css
/* Spine Drop Shadow with Warm Ochre Bounce */
box-shadow: 
  rgba(129, 92, 24, 0.12) 0px 13px 27px -5px,
  rgba(0, 0, 0, 0.30) 0px 8px 16px -8px,
  rgba(0, 0, 0, 0.03) 0px -6px 16px -6px;

/* Page Aspect Ratio */
aspect-ratio: 1.38667 / 1; /* 25:18 landscape */
```
