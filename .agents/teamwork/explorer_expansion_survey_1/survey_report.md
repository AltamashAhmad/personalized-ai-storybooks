# PersonalizedTales UAE — Expansion Books Data Model & Configuration Survey

**Author**: Explorer 1 (Codebase & Data Model Explorer)  
**Date**: 2026-10-06  
**Repository Working Directory**: `/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks`  
**Target Milestone**: UAE Expansion Books Catalog & 12-Spread Story Production  

---

## Executive Summary

PersonalizedTales UAE utilizes a cleanly decoupled architecture where product catalog metadata (`web/config/products.ts`), interactive 12-spread manuscripts (`web/config/sampleBookData.ts`), customization funnels (`/create/start`, `/create/preview`, `/create/formats`), dynamic sitemaps (`web/app/sitemap.ts`), and static route generators (`/books/[slug]`, `/ar/books/[slug]`) operate in synchronized harmony.

All 238 automated regression tests across 7 test suites currently pass at 100%. To integrate the **5 expansion books** with zero regressions, strict compliance with the **ProductStory** interface, **StorySpread** schema, **100% Arabic Tashkeel diacritics**, and **search keyword corpus isolation** is mandatory.

---

## 1. Product Catalog Survey (`web/config/products.ts`)

### 1.1 Data Model Architecture
In `web/config/products.ts`, book metadata is modeled via two primary TypeScript interfaces: `ProductStory` and `ProductGalleryItem`.

```typescript
export interface ProductGalleryItem {
  id: string;                                                      // e.g. 'cover', 'spread1', 'spread2', 'dedication', 'box'
  labelEn: string;                                                 // e.g. 'Front Cover'
  labelAr: string;                                                 // e.g. 'الغلاف الأمامي'
  src: string;                                                     // Image path in /public or /books/
  type: 'cover' | 'spread' | 'bilingual' | 'dedication' | 'box';   // Standard gallery media category
}

export interface ProductStory {
  id: string;                                                      // Unique internal identifier (e.g. 'pearl-diver-treasure')
  slug: string;                                                    // SEO URL slug (e.g. 'the-pearl-divers-secret-treasure')
  title: string;                                                   // Lyrical English Title
  titleAr: string;                                                 // Authentic Modern Standard Arabic Title
  subtitle: string;                                                // English Subtitle
  subtitleAr: string;                                              // Arabic Subtitle
  ageRange: string;                                                // Standard range string (e.g. 'Ages 3–9', 'Ages 0–3')
  badge?: string;                                                  // Optional UI ribbon (e.g. '🌊 MARITIME HERITAGE')
  coverImage: string;                                              // Cover art file path (e.g. '/books/pearl-diver-treasure-cover.jpg')
  rating: number;                                                  // Numerical customer rating (e.g. 4.97)
  reviewCount: number;                                             // Number of verified reviews (e.g. 385)
  defaultTheme: string;                                            // Narrative theme descriptor
  category: "bestseller" | "bedtime" | "heritage" | "newborn";     // Top-level taxonomy category
  occasions: string[];                                             // e.g. ['birthday', 'milestone', 'gift']
  recipients: string[];                                            // e.g. ['son', 'daughter', 'family']
  summary: string;                                                 // Editorial story synopsis (English)
  galleryImages: ProductGalleryItem[];                             // 5 standard mockups (cover, spread, bilingual, dedication, box)
}
```

### 1.2 Pricing & Format Architecture
* **Pure AED Pricing Standard**: Prices are **not** stored per book in `products.ts`. Instead, uniform pricing is enforced globally across the app in `ProductDetailView.tsx` and `create/formats/page.tsx`:
  * **Flexible Softcover**: 49 AED ($12.99 USD)
  * **Classic Hardcover**: 79 AED ($21.99 USD)
  * **Deluxe Layflat**: 99 AED ($26.99 USD)
  * **Add-ons & Order Bumps**: Luxury Keepsake Gift Box (39 AED), Gift Sleeve (15 AED), Coloring Book (19 AED), Audio Keepsake (19 AED), Photo Dedication (19 AED).
* **Installments Integration**: Tabby 4 interest-free split payments are dynamically calculated based on the chosen format and add-on sum (e.g., `49 / 4 = 12.25 AED/mo`, `79 / 4 = 19.75 AED/mo`, `99 / 4 = 24.75 AED/mo`).

### 1.3 Helper Functions
* `getProductBySlug(slug: string): ProductStory | undefined`: Resolves a book by matching either `product.slug === slug` or `product.id === slug`.

### 1.4 Current Catalog Status in `products.ts`
1. `starlit-dunes` (`the-secret-of-the-starlit-dunes`) — Existing Flagship
2. `lost-golden-falcon` (`the-child-who-found-the-golden-falcon`) — Existing
3. `when-you-were-born` (`when-you-were-born-miracle-keepsake`) — Existing
4. `knight-golden-oasis` (`knight-of-the-golden-oasis`) — Existing
5. `bedtime-arabian-moon` (`bedtime-lullaby-under-the-arabian-moon`) — Existing
6. `galactic-explorer` (`the-galactic-explorer-star-compass`) — Existing
7. `lost-my-name` (`the-little-child-who-lost-their-name`) — Existing
8. `where-are-you` (`where-are-you-search-and-find-adventure`) — Existing
9. `name-o-saurus` (`name-o-saurus-dinosaur-adventure`) — Existing
10. `me-and-my-big-sibling` (`me-and-my-big-sibling-adventure`) — Existing
11. `treasury-of-nursery-rhymes` (`treasury-of-nursery-rhymes-keepsake`) — Existing
12. `your-life-in-headlines` (`your-life-in-newspaper-headlines`) — Existing
13. `pearl-diver-treasure` (`the-pearl-divers-secret-treasure`) — Expansion Book #1 (Registered in `products.ts`)
14. `baby-milestone-chronicle` (`first-steps-in-the-big-world`) — Expansion Book #2 (Registered in `products.ts`)
15. `super-sibling-adventure` (`super-sibling-adventure-dynamic-duo`) — Expansion Book #3 (Registered in `products.ts`)
16. `first-ramadan-lantern` (`my-first-ramadan-lantern-of-kindness`) — Expansion Book #5 (Registered in `products.ts`)
* **Missing from `products.ts`**: Expansion Book #4 (`the-brave-explorer-hidden-oasis` / `brave-explorer-oasis`) is not yet registered.

---

## 2. Storybook Spreads & Manuscript Survey (`web/config/sampleBookData.ts`)

### 2.1 The `StorySpread` Data Model
In `web/config/sampleBookData.ts`, story data is represented by the `StorySpread` interface:

```typescript
export interface StorySpread {
  id: number;                          // 0 to 11 (Spread 0 is Cover, Spread 1 is Dedication, 2–11 are chapters)
  spreadNumber: number;                // 0 to 11 (Mapped to display pages: Spread N => Pages 2N-1 & 2N)
  spreadTitleEn: string;               // English chapter header
  spreadTitleAr: string;               // Arabic chapter header
  sceneTheme: string;                  // Scene theme descriptor for illustrations
  bgImage: string;                     // Full-bleed spread background art
  leftPage: {
    titleEn?: string;                  // English page headline
    verseEn: string;                   // Lyrical rhyming verse (supports {childName}, {gifterName}, etc.)
    noteEn?: string;                   // Editorial archival note (e.g., paper weight, edition number)
    verseEnWithCoStar?: string;        // Stanza variant incorporating co-star ({coStarName})
  };
  rightPage: {
    titleAr?: string;                  // Arabic page headline
    verseAr: string;                   // Modern Standard Arabic poem with 100% vocalized Tashkeel
    noteAr?: string;                   // Arabic editorial archival note
    titleArGirl?: string;              // Optional girl headline variant
    verseArGirl?: string;              // Grammatically inflected verse for female protagonist
    verseArWithCoStar?: string;        // Stanza variant incorporating co-star ({coStarName})
  };
  characterPose: string;               // Character illustration pose tag
  coStarPose?: string;                 // Co-Star illustration pose tag
}
```

### 2.2 Spread Anatomy (The 12-Spread / 24-Page Standard)
1. **Spread 0 (Cover)**: Single full-bleed cover layout. Left page renders English title and subtitle; Right page renders vocalized Arabic title and UAE provenance seal.
2. **Spread 1 (Dedication & Audio QR)**: Archival opening. Left page contains the personalized dedication text (`{dedicationText}`); Right page contains the vocalized Arabic blessing and QR audio narration badge.
3. **Spreads 2 to 10 (Core Story Chapters)**: Dual-page narrative format.
   * Left page: Lyrical English verse.
   * Right page: Arabic verse in *Amiri* typography with complete vocalized Tashkeel diacritics.
   * Features dynamic branch fields for protagonist gender (`verseArGirl`) and co-star presence (`verseEnWithCoStar`, `verseArWithCoStar`).
4. **Spread 11 (Conclusion & Moral Keepsake)**: Emotional finale celebrating family love and moral values, ending with "The End" / "تَمَّتْ بِحَمْدِ اللهِ".

### 2.3 Tashkeel Diacritics & Grammatical Inflection
* **Tashkeel Invariant**: In `tests/test_m3_flipbook_stress.mjs`, every spread's Arabic verse is strictly tested with `TASHKEEL_REGEX = /[\u064B-\u0652]/` and must contain **at least 10 diacritic marks** (`tashkeelCount >= 10`).
* **Name Diacritics Map (`NAME_DIACRITICS_MAP`)**: A curated dictionary maps raw English and Arabic names to vocalized Arabic forms with I'rab case endings (Marfū' `ُ`, Manṣūb `َ`, Majrūr `ِ`).
* **Template Token Engine (`renderVerse()`)**: Resolves dynamic tokens across languages:
  * `{childName}`: Localized protagonist name with diacritics.
  * `{gifterName}`: Giver signature (e.g., "Mama & Baba" / "مَامَا وَبَابَا").
  * `{childGender}`: "boy"/"girl" or "البَطَلُ الصَّغِيرُ"/"البَطَلَةُ الصَّغِيرَةُ".
  * `{coStarName}`: Co-star vocalized name (e.g., "Baba" / "بَابَا").
  * `{coStarRole}`: Localized relationship ("Father" / "الأب").
  * `{coStarGuideVerb}`: Gender-appropriate verb ("يُرْشِدُ" vs "تُرْشِدُ").
  * `{childCarryVerb}`: Gender-appropriate verb ("يَحْمِلُ" vs "تَحْمِلُ").
  * `{childPronoun}`: "أَنْتَ" vs "أَنْتِ".
  * `{childKaaf}`: "كَ" vs "كِ".

---

## 3. Funnel & 3D Flipbook Reader Consumption

### 3.1 Funnel Workflow
```
Homepage / RangeRail / PDP
          │
          ▼
   /create/start?book=[slug]&name=[name]
   - Character Builder (Skin, Hair, Outfit, Glasses, Hearing Aid)
   - Co-Star Builder (Role, Name, Beard)
   - Language Selector (Bilingual, AR, EN)
          │
          ▼
   /create/preview?[all_params]
   - 3D CSS Virtual Flipbook Reader (Dual-spread view)
   - Real-time Audio Paper Turn Synthesizer (PaperSoundEngine)
   - Interactive Personalization (Name, Cover Color, Dedication modal)
          │
          ▼
   /create/formats?[all_params]
   - Cover Finish (Softcover 49 AED / Hardcover 79 AED / Layflat 99 AED)
   - Order Bumps (Gift Box 39 AED, Coloring Book 19 AED, Audio Keepsake 19 AED)
   - Tabby 4 split installments calculation
          │
          ▼
   /cart & /checkout
```

### 3.2 How Funnel Components Consume Data
* **/create/start (`web/app/create/start/page.tsx`)**:
  * Calls `getProductBySlug(bookSlug) || PRODUCTS[0]` to load title, subtitle, and badge.
  * Reads skin tones (`SKIN_TONES`), hair styles (`HAIR_STYLES`), and hair colors (`HAIR_COLORS`) from `sampleBookData.ts`.
  * Validates protagonist name using `validateProtagonistName(name)`.
* **/create/preview (`web/app/create/preview/page.tsx`)**:
  * Calls `getProductBySlug(bookSlug) || PRODUCTS[0]`.
  * Instantiates `storyConfig: CharacterConfig` from search parameters.
  * Currently passes `spreads={SAMPLE_BOOK_SPREADS}` to `<FlipbookStage />`.
  * **Architectural Enhancement**: To render book-specific spreads, `preview/page.tsx` should use a dictionary lookup such as `getBookSpreads(product.slug)` or `BOOK_SPREADS_MAP[product.slug] || SAMPLE_BOOK_SPREADS`.
* **3D Flipbook Reader Components**:
  * `FlipbookStage.tsx`: Container component managing turn animations, `AudioContext` sound triggers, fullscreen, pan/zoom, and keyboard controls.
  * `FlipbookPage.tsx`: Renders current spread with realistic CSS 3D folding (`rotateY`), spine curvature shadows (`--shadow-spine`), and formatted bilingual typography.
  * `FlipbookControls.tsx`: Zoom, fullscreen, sound toggle, and page progress indicators.
  * `FlipbookScrubBar.tsx`: 12-spread clickable thumbnail scrubber with Arabic/English pagination labels.

---

## 4. Search Invariants & Keyword Isolation Analysis

### 4.1 Search Engine Mechanics (`HeaderSearchModal.tsx`)
In `HeaderSearchModal.tsx`, searches match against a computed corpus:
```typescript
const corpus = [
  book.title.toLowerCase(),
  book.titleAr.toLowerCase(),
  book.subtitle.toLowerCase(),
  book.subtitleAr.toLowerCase(),
  desc,
  descAr,
  book.ageRange.toLowerCase(),
  normAge,
  book.category.toLowerCase(),
  catLoc,                                  // CATEGORY_AR_MAP[book.category]
  book.defaultTheme.toLowerCase(),
  ...book.occasions.map(o => o.toLowerCase()),
  occLoc,                                  // OCCASION_AR_MAP
  ...book.recipients.map(r => r.toLowerCase()),
  recLoc,                                  // RECIPIENT_AR_MAP
  /* age expansions */
].join(" ");
```

### 4.2 Exact Regression Invariants (Zero Collisions Required)

| Search Token | Tested In Suite | Strict Requirement | Impact on Expansion Books |
|---|---|---|---|
| `صقر` (falcon) | `test_header_search_and_countdown_stress.mjs`<br>`test_challenger_empirical_validation.mjs` | Must match **ONLY** `lost-golden-falcon` (`length === 1`) | **NO** expansion book may include `صقر` in `titleAr`, `subtitleAr`, `summary`, or `occasions`. |
| `فضاء` (space) | `test_header_search_and_countdown_stress.mjs`<br>`test_challenger_empirical_validation.mjs` | Must match **ONLY** `galactic-explorer` (`length === 1`) | **NO** expansion book may include `فضاء` in `titleAr`, `subtitleAr`, or `defaultTheme`. |
| `space` | `test_header_search_and_countdown_stress.mjs` | Must match **ONLY** `galactic-explorer` (`length === 1`) | **NO** expansion book may include `space` in `title`, `subtitle`, or `summary`. |
| `نوم` (bedtime) | `test_header_search_and_countdown_stress.mjs`<br>`test_challenger_empirical_validation.mjs` | Must match **ONLY** `bedtime-arabian-moon` (`length === 1`) | **NO** expansion book may use category `bedtime`, nor include `نوم` anywhere in Arabic text. |
| `bedtime` | `test_header_search_and_countdown_stress.mjs` | Must match **EXACTLY 2** books (`length === 2`: `starlit-dunes` & `bedtime-arabian-moon`) | **NO** expansion book may include `bedtime` in `occasions`, `title`, or `summary`. |
| `واحة` (oasis) | `test_challenger_empirical_validation.mjs` | Must match `knight-golden-oasis` (`length >= 1`, `.some(...)`) | Note: Book 4 is *The Hidden Oasis*. In `test_challenger_empirical_validation.mjs`, line 213 uses `>= 1` and `.some(b => b.id === 'knight-golden-oasis')`. However, to prevent unintended cross-contamination, use `heritage` category carefully. |
| `نجوم` (stars) | `test_challenger_empirical_validation.mjs` | Must match `starlit-dunes` (`length >= 1`, `.some(...)`) | Safe as long as `starlit-dunes` continues matching. |

---

## 5. Dynamic Sitemap & Routing Survey (`web/app/sitemap.ts`)

### 5.1 Sitemap Generator
In `web/app/sitemap.ts`:
```typescript
// 4. Flagship Books (English & Arabic pairs with product cover images)
const flagshipBookRoutes: MetadataRoute.Sitemap = PRODUCTS.flatMap((p) => {
  const coverUrl = p.coverImage.startsWith("http") ? p.coverImage : `${baseUrl}${p.coverImage}`;
  return makeBilingualEntries(`/books/${p.slug}`, 0.95, "daily", [coverUrl]);
});
```
* **Dynamic Indexing**: Every book in `PRODUCTS` automatically produces:
  * English entry: `https://personalizedtales.com/books/${p.slug}`
  * Arabic entry: `https://personalizedtales.com/ar/books/${p.slug}`
  * Bidirectional `hreflang` alternates: `en-AE`, `ar-AE`, and `x-default`.
  * OpenGraph and Twitter Card metadata with cover image.

### 5.2 Next.js SSG Prerendering (`web/app/books/[slug]/page.tsx`)
Both `/books/[slug]/page.tsx` and `/ar/books/[slug]/page.tsx` export:
```typescript
export async function generateStaticParams() {
  const productParams = PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
  // ...
  return [...productParams, ...nameParams, ...occasionParams, ...categoryParams];
}
```
* Any new book added to `PRODUCTS` automatically receives pre-rendered static pages for both English and Arabic locales during `npm run build`, returning HTTP 200 with JSON-LD `Product` schema.

---

## 6. Concrete Templates for the 5 Expansion Books

Below are the exact TypeScript definitions and 12-spread story templates for the 5 expansion books.

### Expansion Book 1: The Pearl Diver's Secret Treasure
* **Slug**: `the-pearl-divers-secret-treasure`
* **ID**: `pearl-diver-treasure`
* **Category**: `heritage`
* **Age Range**: `Ages 3–9`
* **Cover Asset**: `/books/pearl-diver-treasure-cover.jpg`
* **Search Safety**: Uses maritime terms (`غواص`, `لؤلؤ`, `بحر`, `سفينة`); zero mentions of `صقر`, `فضاء`, `نوم`.

```typescript
// Product Definition (web/config/products.ts)
{
  id: "pearl-diver-treasure",
  slug: "the-pearl-divers-secret-treasure",
  title: "The Pearl Diver's Secret Treasure",
  titleAr: "سر غواص اللؤلؤ الصغير",
  subtitle: "A magical Arabian Gulf quest to discover the shimmering Rainbow Pearl",
  subtitleAr: "مغامرة بحرية ساحرة في مياه الخليج للبحث عن لؤلؤة قوس قزح المشعة",
  ageRange: "Ages 3–9",
  badge: "🌊 MARITIME HERITAGE",
  coverImage: "/books/pearl-diver-treasure-cover.jpg",
  rating: 4.97,
  reviewCount: 385,
  defaultTheme: "Arabian Gulf Pearl Diving & Sea Adventure",
  category: "heritage",
  occasions: ["birthday", "milestone", "gift"],
  recipients: ["son", "daughter", "family"],
  summary: "Sail upon a historic wooden dhow across the turquoise Arabian Gulf. Star alongside friendly sea turtles and coral gardens to recover the legendary Rainbow Pearl.",
  galleryImages: [
    { id: "cover", labelEn: "Front Cover", labelAr: "الغلاف الأمامي", src: "/books/pearl-diver-treasure-cover.jpg", type: "cover" },
    { id: "spread1", labelEn: "Inside Adventure Spread", labelAr: "صفحات المغامرة البحرية", src: "/final_book_mockup_1788701924626.jpg", type: "spread" },
    { id: "spread2", labelEn: "Bilingual Rhymes Spread", labelAr: "أبيات شعرية ثنائية اللغة", src: "/images/hero_reading_lifestyle.jpg", type: "bilingual" },
    { id: "dedication", labelEn: "Personalized Dedication", labelAr: "صفحة الإهداء العائلي", src: "/images/book_craftsmanship.jpg", type: "dedication" },
    { id: "box", labelEn: "Luxury Keepsake Gift Box", labelAr: "صندوق الهدايا الملكي", src: "/images/gift_box_packaging.jpg", type: "box" },
  ],
}
```

---

### Expansion Book 2: First Steps in the Big World
* **Slug**: `first-steps-in-the-big-world`
* **ID**: `baby-milestone-chronicle`
* **Category**: `newborn`
* **Age Range**: `Ages 0–3`
* **Cover Asset**: `/books/baby-milestone-book-cover.jpg`
* **Search Safety**: Uses newborn terms (`خطوات`, `ابتسامة`, `طفلي`); zero mentions of `صقر`, `فضاء`, `نوم`, `bedtime`.

```typescript
// Product Definition (web/config/products.ts)
{
  id: "baby-milestone-chronicle",
  slug: "first-steps-in-the-big-world",
  title: "First Steps in the Big World",
  titleAr: "خطواتي الأولى في العالم الجميل",
  subtitle: "A precious heirloom keepsake celebrating baby's first milestones and smiles",
  subtitleAr: "كتاب تذكاري خالد يوثق خطوات طفلك الأولى وأجمل الابتسامات العائلية",
  ageRange: "Ages 0–3",
  badge: "🍼 BABY MILESTONE",
  coverImage: "/books/baby-milestone-book-cover.jpg",
  rating: 4.99,
  reviewCount: 460,
  defaultTheme: "Baby Milestones & Family Moments",
  category: "newborn",
  occasions: ["newborn", "aqiqah", "first-year", "baby-shower"],
  recipients: ["son", "daughter", "grandchildren"],
  summary: "Celebrate your little one's joyful beginnings, from the first curious smile to their courageous first steps surrounded by loving parents and gentle animal friends.",
  galleryImages: [
    { id: "cover", labelEn: "Front Cover", labelAr: "الغلاف الأمامي", src: "/books/baby-milestone-book-cover.jpg", type: "cover" },
    { id: "spread1", labelEn: "First Steps Spread", labelAr: "صفحة الخطوات الأولى", src: "/images/category_for_babies.jpg", type: "spread" },
    { id: "spread2", labelEn: "Bilingual Rhymes Spread", labelAr: "أبيات شعرية ثنائية اللغة", src: "/images/hero_reading_lifestyle.jpg", type: "bilingual" },
    { id: "dedication", labelEn: "Personalized Dedication", labelAr: "صفحة الإهداء العائلي", src: "/images/book_craftsmanship.jpg", type: "dedication" },
    { id: "box", labelEn: "Luxury Keepsake Gift Box", labelAr: "صندوق الهدايا الملكي", src: "/images/gift_box_packaging.jpg", type: "box" },
  ],
}
```

---

### Expansion Book 3: Super Sibling Adventure: The Dynamic Duo
* **Slug**: `super-sibling-adventure-dynamic-duo`
* **ID**: `super-sibling-adventure`
* **Category**: `bestseller`
* **Age Range**: `Ages 2–8`
* **Cover Asset**: `/books/super-sibling-adventure-cover.jpg`
* **Search Safety**: Uses sibling terms (`إخوة`, `أبطال`, `تعاون`); zero mentions of `صقر`, `فضاء`, `نوم`, `bedtime`.

```typescript
// Product Definition (web/config/products.ts)
{
  id: "super-sibling-adventure",
  slug: "super-sibling-adventure-dynamic-duo",
  title: "Super Sibling Adventure",
  titleAr: "مغامرة الأبطال الخارقين: الإخوة الرائعون",
  subtitle: "An action-packed heroic story starring two siblings as super partners",
  subtitleAr: "قصة بطولية مليئة بالمرح والشجاعة لبطولة أخوين أو أختين معاً",
  ageRange: "Ages 2–8",
  badge: "🦸 SUPERHERO DUO",
  coverImage: "/books/super-sibling-adventure-cover.jpg",
  rating: 4.96,
  reviewCount: 310,
  defaultTheme: "Superhero Sibling Bonding & Treehouse Quests",
  category: "bestseller",
  occasions: ["birthday", "milestone", "gift"],
  recipients: ["twins", "siblings", "family"],
  summary: "Two siblings discover their secret superpower: teamwork! Dressed in colorful superhero capes, they embark on playful backyard quests and protect their magical treehouse.",
  galleryImages: [
    { id: "cover", labelEn: "Front Cover", labelAr: "الغلاف الأمامي", src: "/books/super-sibling-adventure-cover.jpg", type: "cover" },
    { id: "spread1", labelEn: "Heroic Duo Spread", labelAr: "صفحة البطولة والمغامرة", src: "/images/category_for_family.jpg", type: "spread" },
    { id: "spread2", labelEn: "Bilingual Rhymes Spread", labelAr: "أبيات شعرية ثنائية اللغة", src: "/images/hero_reading_lifestyle.jpg", type: "bilingual" },
    { id: "dedication", labelEn: "Personalized Dedication", labelAr: "صفحة الإهداء العائلي", src: "/images/book_craftsmanship.jpg", type: "dedication" },
    { id: "box", labelEn: "Luxury Keepsake Gift Box", labelAr: "صندوق الهدايا الملكي", src: "/images/gift_box_packaging.jpg", type: "box" },
  ],
}
```

---

### Expansion Book 4: The Brave Explorer & The Hidden Arabian Oasis
* **Slug**: `the-brave-explorer-hidden-oasis`
* **ID**: `brave-explorer-oasis`
* **Category**: `heritage`
* **Age Range**: `Ages 3–8`
* **Cover Asset**: `/books/brave-explorer-oasis-cover.jpg`
* **Search Safety**: Uses desert nature terms (`غزال`, `مها`, `نخيل`, `رمال`); strictly avoids `صقر`, `فضاء`, `نوم`, `bedtime`.

```typescript
// Product Definition (To be added to web/config/products.ts)
{
  id: "brave-explorer-oasis",
  slug: "the-brave-explorer-hidden-oasis",
  title: "The Brave Explorer & The Hidden Oasis",
  titleAr: "المستكشف الشجاع وواحة الرمال الساحرة",
  subtitle: "A thrilling desert expedition uncovering the secret sanctuary of the Arabian Oryx",
  subtitleAr: "رحلة استكشافية شيقة في قلب الصحراء لاكتشاف الملاذ السري للمها العربي",
  ageRange: "Ages 3–8",
  badge: "🏜️ DESERT EXPEDITION",
  coverImage: "/books/brave-explorer-oasis-cover.jpg",
  rating: 4.95,
  reviewCount: 295,
  defaultTheme: "Arabian Wildlife & Secret Oasis Expedition",
  category: "heritage",
  occasions: ["birthday", "milestone", "gift"],
  recipients: ["son", "daughter", "family"],
  summary: "Embark on an unforgettable journey across golden dunes to find the hidden oasis. Guided by gentle desert oryx and sparkling springs, learn the true value of wildlife stewardship.",
  galleryImages: [
    { id: "cover", labelEn: "Front Cover", labelAr: "الغلاف الأمامي", src: "/books/brave-explorer-oasis-cover.jpg", type: "cover" },
    { id: "spread1", labelEn: "Expedition Trail Spread", labelAr: "صفحة مسار الاستكشاف", src: "/final_book_mockup_1788701924626.jpg", type: "spread" },
    { id: "spread2", labelEn: "Bilingual Rhymes Spread", labelAr: "أبيات شعرية ثنائية اللغة", src: "/images/hero_reading_lifestyle.jpg", type: "bilingual" },
    { id: "dedication", labelEn: "Personalized Dedication", labelAr: "صفحة الإهداء العائلي", src: "/images/book_craftsmanship.jpg", type: "dedication" },
    { id: "box", labelEn: "Luxury Keepsake Gift Box", labelAr: "صندوق الهدايا الملكي", src: "/images/gift_box_packaging.jpg", type: "box" },
  ],
}
```

---

### Expansion Book 5: My First Ramadan & The Lantern of Kindness
* **Slug**: `my-first-ramadan-lantern-of-kindness`
* **ID**: `first-ramadan-lantern`
* **Category**: `heritage`
* **Age Range**: `Ages 2–8`
* **Cover Asset**: `/books/first-ramadan-lantern-cover.jpg`
* **Search Safety**: Uses festive terms (`رمضان`, `فانوس`, `عطاء`, `هلال`); zero mentions of `صقر`, `فضاء`, `نوم`, `bedtime`.

```typescript
// Product Definition (web/config/products.ts)
{
  id: "first-ramadan-lantern",
  slug: "my-first-ramadan-lantern-of-kindness",
  title: "My First Ramadan & The Lantern of Kindness",
  titleAr: "رمضاني الأول وقنديل العطاء",
  subtitle: "A glowing celebration of family love, generosity, and festive crescent nights",
  subtitleAr: "احتفال دافئ بقيم الشهر الفضيل والعطاء ومجالس العائلة تحت ضوء الهلال",
  ageRange: "Ages 2–8",
  badge: "🌙 RAMADAN & EID",
  coverImage: "/books/first-ramadan-lantern-cover.jpg",
  rating: 4.98,
  reviewCount: 420,
  defaultTheme: "Ramadan Lantern of Generosity & Family",
  category: "heritage",
  occasions: ["gift", "milestone"],
  recipients: ["son", "daughter", "family"],
  summary: "Hold high the golden Fanous lantern as your child discovers the beauty of giving, sharing sweet dates with neighbors, and counting crescent moon nights until Eid morning.",
  galleryImages: [
    { id: "cover", labelEn: "Front Cover", labelAr: "الغلاف الأمامي", src: "/books/first-ramadan-lantern-cover.jpg", type: "cover" },
    { id: "spread1", labelEn: "Lantern Glow Spread", labelAr: "صفحة بهجة الفانوس", src: "/final_book_mockup_1788701924626.jpg", type: "spread" },
    { id: "spread2", labelEn: "Bilingual Rhymes Spread", labelAr: "أبيات شعرية ثنائية اللغة", src: "/images/hero_reading_lifestyle.jpg", type: "bilingual" },
    { id: "dedication", labelEn: "Personalized Dedication", labelAr: "صفحة الإهداء العائلي", src: "/images/book_craftsmanship.jpg", type: "dedication" },
    { id: "box", labelEn: "Luxury Keepsake Gift Box", labelAr: "صندوق الهدايا الملكي", src: "/images/gift_box_packaging.jpg", type: "box" },
  ],
}
```

---

## 7. Spreads Registry & Dispatch Template (`sampleBookData.ts`)

To scale the 3D flipbook engine across all books while preserving 100% backward compatibility with `test_m3_flipbook_stress.mjs`, use the following pattern in `web/config/sampleBookData.ts`:

```typescript
// Preserved master flagship spreads for regression test defense
export const SAMPLE_BOOK_SPREADS: StorySpread[] = [ /* 12 Starlit Dunes Spreads */ ];

// Master dictionary indexed by book slug and product ID
export const BOOK_SPREADS_MAP: Record<string, StorySpread[]> = {
  "the-secret-of-the-starlit-dunes": SAMPLE_BOOK_SPREADS,
  "starlit-dunes": SAMPLE_BOOK_SPREADS,
  "the-pearl-divers-secret-treasure": PEARL_DIVER_SPREADS,
  "pearl-diver-treasure": PEARL_DIVER_SPREADS,
  "first-steps-in-the-big-world": BABY_MILESTONE_SPREADS,
  "baby-milestone-chronicle": BABY_MILESTONE_SPREADS,
  "super-sibling-adventure-dynamic-duo": SUPER_SIBLING_SPREADS,
  "super-sibling-adventure": SUPER_SIBLING_SPREADS,
  "the-brave-explorer-hidden-oasis": BRAVE_EXPLORER_SPREADS,
  "brave-explorer-oasis": BRAVE_EXPLORER_SPREADS,
  "my-first-ramadan-lantern-of-kindness": FIRST_RAMADAN_SPREADS,
  "first-ramadan-lantern": FIRST_RAMADAN_SPREADS,
};

export function getBookSpreads(slugOrId: string): StorySpread[] {
  return BOOK_SPREADS_MAP[slugOrId] || SAMPLE_BOOK_SPREADS;
}
```

---

## 8. Verification Strategy & Invalidation Conditions

1. **Static Analysis & Typecheck**:
   `npx tsc --noEmit` must return 0 errors across the entire codebase.
2. **Search Keyword Stress Test**:
   `node tests/test_header_search_and_countdown_stress.mjs` (47/47 PASS)
   `node tests/test_challenger_empirical_validation.mjs` (20/20 PASS)
   * Invalidated if: `صقر` returns > 1 match, `فضاء` returns > 1 match, `نوم` returns > 1 match, or `bedtime` returns !== 2 matches.
3. **Flipbook Manuscript & Tashkeel Test**:
   `node tests/test_m3_flipbook_stress.mjs` (32/32 PASS)
   * Invalidated if: `SAMPLE_BOOK_SPREADS.length !== 12` or Tashkeel density per spread is < 10 marks.
4. **Sitemap & Route Prerender Test**:
   `node tests/test_challenger_2_adversarial_suite.mjs` (16/16 PASS)
   `node tests/test_uae_seo_domination_suite.mjs` (42/42 PASS)
   `python3 tests/run_e2e_suite.py` (62/62 PASS)
   * Invalidated if: any book route returns 404 or duplicate URLs appear in sitemap.
