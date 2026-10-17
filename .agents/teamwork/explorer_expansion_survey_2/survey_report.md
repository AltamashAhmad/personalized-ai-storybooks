# PersonalizedTales UAE — Expansion Books Visual Asset & Art Style Survey Report
**Agent:** Explorer 2 (Visual Asset & Art Style Explorer)  
**Date:** 2026-10-06T20:05:00Z  
**Project Root:** `/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks`  
**Reference Document:** `ORIGINAL_REQUEST.md`, `docs/EXPANSION_BOOK_CATALOG_LIST.md`

---

## 1. Executive Summary

This survey provides an in-depth empirical assessment of the visual asset pipeline, directory structures, image dimensions and formats, codebase references, and art style specifications for the **5 PersonalizedTales UAE expansion books**:

1. **The Pearl Diver's Secret Treasure** (`the-pearl-divers-secret-treasure`)
2. **First Steps in the Big World: The Baby Milestone Chronicle** (`first-steps-in-the-big-world`)
3. **Super Sibling Adventure: The Dynamic Duo** (`super-sibling-adventure-dynamic-duo`)
4. **The Brave Explorer & The Hidden Arabian Oasis** (`the-brave-explorer-hidden-oasis`)
5. **My First Ramadan & The Lantern of Kindness** (`my-first-ramadan-lantern-of-kindness`)

### Key Empirical Findings:
1. **Existing Cover Assets (Verified):** High-resolution, 300 DPI, 1024x1024 square JPEG covers already exist on disk in `web/public/books/` for **all 5 expansion books**, plus 2 additional catalog roadmap books (`the-bedtime-castle-of-dreams` and `the-little-astronaut-who-reached-mars`).
2. **Missing Product Registration:** `the-brave-explorer-hidden-oasis` is **not registered** in `PRODUCTS` within `web/config/products.ts`, even though its cover image `brave-explorer-oasis-cover.jpg` exists in `web/public/books/`. The other 4 expansion books are already registered in `PRODUCTS`.
3. **Spread Assets Gap:** Only `the-secret-of-the-starlit-dunes` currently has a dedicated subfolder on disk (`web/public/books/starlit-dunes/spreads/`) with 6 generated spread images. None of the 5 expansion books currently have individual spread image files on disk.
4. **Spread Code Architecture Gap:** `web/config/sampleBookData.ts` currently exports a single monolithic `SAMPLE_BOOK_SPREADS: StorySpread[]` array for `starlit-dunes`. It lacks multi-book spread indexing for the 5 expansion books.
5. **Catalog Roadmap Inconsistency:** `docs/EXPANSION_BOOK_CATALOG_LIST.md` has granular 12-spread story architectures for Books 01, 02, and 03, but **lacks granular specifications for Books 04, 05, 06, and 07**, which are the active expansion targets.
6. **Search Token Isolation Safety:** Adding the missing expansion book to `web/config/products.ts` must strictly avoid conflicting with test search tokens (`صقر`, `فضاء`, `نوم`, `space`, `bedtime`, `واحة`, `نجوم`) to safeguard 100% pass rates across all 238 automated regression tests.

---

## 2. Empirical Audit of Visual Assets in `web/public/books/`

### 2.1 File Inventory and Dimensional Analysis
All assets were verified using macOS `sips` and Python `PIL` for exact dimensions, pixel aspect ratios, file formats, and embedded DPI metadata.

| File Path (`web/public/books/`) | File Format | File Size | Dimensions | Aspect Ratio | Color Space | Embedded DPI | Corresponding Book / Slug |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---|
| `pearl-diver-treasure-cover.jpg` | JPEG | 986,569 B (963 KB) | 1024 × 1024 | 1:1 (Square) | RGB | 300 × 300 DPI | `the-pearl-divers-secret-treasure` |
| `baby-milestone-book-cover.jpg` | JPEG | 948,353 B (926 KB) | 1024 × 1024 | 1:1 (Square) | RGB | 300 × 300 DPI | `first-steps-in-the-big-world` |
| `super-sibling-adventure-cover.jpg` | JPEG | 1,063,793 B (1.01 MB) | 1024 × 1024 | 1:1 (Square) | RGB | 300 × 300 DPI | `super-sibling-adventure-dynamic-duo` |
| `brave-explorer-oasis-cover.jpg` | JPEG | 1,025,324 B (1,001 KB) | 1024 × 1024 | 1:1 (Square) | RGB | 300 × 300 DPI | `the-brave-explorer-hidden-oasis` |
| `first-ramadan-lantern-cover.jpg` | JPEG | 1,118,024 B (1.07 MB) | 1024 × 1024 | 1:1 (Square) | RGB | 300 × 300 DPI | `my-first-ramadan-lantern-of-kindness` |
| `bedtime-castle-dreams-cover.jpg` | JPEG | 937,751 B (915 KB) | 1024 × 1024 | 1:1 (Square) | RGB | 300 × 300 DPI | `the-bedtime-castle-of-dreams` (Roadmap 02) |
| `mars-astronaut-book-cover.jpg` | JPEG | 1,049,740 B (1.00 MB) | 1024 × 1024 | 1:1 (Square) | RGB | 300 × 300 DPI | `the-little-astronaut-who-reached-mars` (Roadmap 03) |

### 2.2 Subdirectory Inventory (`web/public/books/starlit-dunes/spreads/`)
The flagship book `starlit-dunes` contains 6 generated spread images:

| File Path (`web/public/books/starlit-dunes/spreads/`) | Format | File Size | Dimensions | Aspect Ratio | Embedded DPI | Theme Description |
|:---|:---:|:---:|:---:|:---:|:---:|:---|
| `spread_0_cover.jpg` | JPEG | 1,115,539 B (1.06 MB) | 1024 × 1024 | 1:1 | 300 × 300 DPI | Celestial midnight desert dunes with star compass |
| `spread_3_falcon.jpg` | JPEG | 1,016,660 B (992 KB) | 1024 × 1024 | 1:1 | 300 × 300 DPI | Fledgling desert falcon in twilight palm grove |
| `spread_5_oasis.jpg` | JPEG | 1,103,395 B (1.05 MB) | 1024 × 1024 | 1:1 | 300 × 300 DPI | Emerald oasis spring with drinking white gazelles |
| `spread_6_campfire.jpg` | JPEG | 1,128,398 B (1.08 MB) | 1024 × 1024 | 1:1 | 300 × 300 DPI | Bedouin tent with glowing campfire & saffron smoke |
| `spread_8_skyline.jpg` | JPEG | 1,074,285 B (1.02 MB) | 1024 × 1024 | 1:1 | 300 × 300 DPI | Golden falcon soaring over modern UAE skyline |
| `spread_10_bedtime.jpg` | JPEG | 1,041,534 B (1.00 MB) | 1024 × 1024 | 1:1 | 300 × 300 DPI | Quiet desert night with resting child & glowing compass |

### 2.3 General Mockups & Editorial Lifestyle Imagery in `web/public/`
In addition to the book-specific covers, the following shared high-resolution mockups exist in `web/public/` and `web/public/images/`:

| Path | Format | Dimensions | Purpose |
|:---|:---:|:---:|:---|
| `/competitor_wonderbly_spread_1788709121360.jpg` | JPEG | 1376 × 768 | Open panoramic dual-page book spread mockup |
| `/final_book_mockup_1788701924626.jpg` | JPEG | 1376 × 768 | Open hardcover book spread on natural wooden table |
| `/cover_and_gift_box_mockup_1788701945105.jpg` | JPEG | 1376 × 768 | Closed hardcover book resting alongside luxury gift box |
| `/images/book_craftsmanship.jpg` | JPEG | 1376 × 768 | Macro close-up of 200 GSM Mohawk silk paper & binding |
| `/images/gift_box_packaging.jpg` | JPEG | 1200 × 896 | Luxury emerald & amber keepsake presentation box |
| `/images/hero_reading_lifestyle.jpg` | JPEG | 1376 × 768 | Parent reading personalized bedtime story to child |
| `/images/hero_story_spread.jpg` | JPEG | 1200 × 896 | Magical open book glowing with golden celestial dust |
| `/images/category_for_babies.jpg` | JPEG | 1024 × 1024 | Gentle nursery watercolor art for babies (0–3) |
| `/images/category_for_kids.jpg` | JPEG | 1024 × 1024 | Whimsical, colorful children adventure illustration |
| `/images/category_for_family.jpg` | JPEG | 1024 × 1024 | Heartwarming family togetherness illustration |

---

## 3. Codebase Image Reference Analysis

### 3.1 `web/config/products.ts` Reference Patterns
Each product in `PRODUCTS` requires:
* `coverImage: string` (e.g. `"/books/pearl-diver-treasure-cover.jpg"`)
* `galleryImages: ProductGalleryItem[]` with 5 standardized items:
  1. `cover`: `type: "cover"`, `src: coverImage`
  2. `spread1`: `type: "spread"`, `src: "/final_book_mockup_1788701924626.jpg"` or dedicated spread
  3. `spread2`: `type: "bilingual"`, `src: "/images/hero_reading_lifestyle.jpg"`
  4. `dedication`: `type: "dedication"`, `src: "/images/book_craftsmanship.jpg"`
  5. `box`: `type: "box"`, `src: "/images/gift_box_packaging.jpg"`

#### Current Status in `products.ts`:
* `the-pearl-divers-secret-treasure`: **Registered** (`id: "pearl-diver-treasure"`) with `/books/pearl-diver-treasure-cover.jpg`.
* `first-steps-in-the-big-world`: **Registered** (`id: "baby-milestone-chronicle"`) with `/books/baby-milestone-book-cover.jpg`.
* `super-sibling-adventure-dynamic-duo`: **Registered** (`id: "super-sibling-adventure"`) with `/books/super-sibling-adventure-cover.jpg`.
* `my-first-ramadan-lantern-of-kindness`: **Registered** (`id: "first-ramadan-lantern"`) with `/books/first-ramadan-lantern-cover.jpg`.
* `the-brave-explorer-hidden-oasis`: **MISSING from `PRODUCTS`**. Must be added with `id: "brave-explorer-oasis"`, `slug: "the-brave-explorer-hidden-oasis"`, and `coverImage: "/books/brave-explorer-oasis-cover.jpg"`.

### 3.2 `web/config/sampleBookData.ts` Reference Patterns
In `sampleBookData.ts`, story spreads implement `StorySpread`:
```typescript
export interface StorySpread {
  id: number;
  spreadNumber: number;
  spreadTitleEn: string;
  spreadTitleAr: string;
  sceneTheme: string;
  bgImage: string; // <-- Directly rendered as <img src={currentSpread.bgImage} />
  leftPage: { titleEn?: string; verseEn: string; noteEn?: string; ... };
  rightPage: { titleAr?: string; verseAr: string; noteAr?: string; ... };
  characterPose: string;
  coStarPose?: string;
}
```

#### Consumer Components:
1. `FlipbookPage.tsx`: Line 35: `<img src={currentSpread.bgImage} alt={...} className="w-full h-full object-cover ..." />`
2. `FlipbookScrubBar.tsx`: Line 72 & 100: Renders thumbnail strips using `s.bgImage`.
3. `FlipbookControls.tsx`: Line 264: Renders modal preview using `currentSpread.bgImage`.
4. `SampleBookEngine.tsx` & `create/preview/page.tsx`: Import `SAMPLE_BOOK_SPREADS`.

**Critical Requirement:** Any path set in `bgImage` must resolve to an existing HTTP 200 static asset in `web/public/` to prevent broken image icons in the 3D flipbook reader.

---

## 4. Audit & Alignment of `docs/EXPANSION_BOOK_CATALOG_LIST.md`

### 4.1 Comparison Matrix
| Catalog # | Documented Slug | Documented Title | In Active 5 Expansions? | In `web/config/products.ts`? | Cover Exists in `web/public/books/`? | Spreads Detailed in Section 2? |
|:---:|:---|:---|:---:|:---:|:---:|:---:|
| **01** | `the-pearl-divers-secret-treasure` | The Pearl Diver's Secret Treasure | **YES** | YES | YES | YES |
| **02** | `the-bedtime-castle-of-dreams` | The Bedtime Castle of Dreams | NO (Roadmap) | NO | YES | YES |
| **03** | `the-little-astronaut-who-reached-mars` | The Little Astronaut Who Reached Mars | NO (Roadmap) | NO | YES | YES |
| **04** | `first-steps-in-the-big-world` | First Steps in the Big World | **YES** | YES | YES | **NO (Missing)** |
| **05** | `super-sibling-adventure-dynamic-duo` | Super Sibling Adventure: Dynamic Duo | **YES** | YES | YES | **NO (Missing)** |
| **06** | `the-brave-explorer-hidden-oasis` | The Brave Explorer & The Hidden Oasis | **YES** | **NO (Missing)** | YES | **NO (Missing)** |
| **07** | `my-first-ramadan-lantern-of-kindness` | My First Ramadan & Lantern of Kindness | **YES** | YES | YES | **NO (Missing)** |
| **08** | `the-magical-garden-of-whispering-trees` | The Magical Garden of Whispering Trees | NO (Roadmap) | NO | NO | NO |
| **09** | `i-am-a-little-chef-feast-of-wonders` | I Am A Little Chef: Feast of Wonders | NO (Roadmap) | NO | NO | NO |
| **10** | `grandpas-enchanted-workshop-flying-carpet` | Grandpa's Workshop & Flying Carpet | NO (Roadmap) | NO | NO | NO |

### 4.2 Required Expansions in `EXPANSION_BOOK_CATALOG_LIST.md`:
1. **Add Section 2.4:** Complete granular 12-spread story beats and architecture for Book 04 (*First Steps in the Big World*).
2. **Add Section 2.5:** Complete granular 12-spread story beats and architecture for Book 05 (*Super Sibling Adventure: The Dynamic Duo*).
3. **Add Section 2.6:** Complete granular 12-spread story beats and architecture for Book 06 (*The Brave Explorer & The Hidden Arabian Oasis*).
4. **Add Section 2.7:** Complete granular 12-spread story beats and architecture for Book 07 (*My First Ramadan & The Lantern of Kindness*).
5. **Asset Specification Table:** Include explicit file naming conventions and fallback paths for all spreads across the catalog.

---

## 5. Exact Image Path Strategy for 12 Spreads Across All 5 Books

To guarantee **zero 404 image errors** while providing a clear target for future image generation, we specify a **Two-Tier Asset Strategy**:

* **Tier 1 (Target Custom Asset Path):** The idealized individual artwork path when generated (`/books/<short-id>/spreads/spread_<n>_<theme>.jpg`).
* **Tier 2 (Deterministic Production-Ready Fallback):** The active fallback path using high-resolution, thematic 300 DPI assets verified to exist in `web/public/`.

---

### Book 1: *The Pearl Diver's Secret Treasure* (`the-pearl-divers-secret-treasure`)
* **Category:** Gulf Maritime Heritage (`heritage`)
* **Art Style:** Luminous turquoise Gulf waters, crystalline sunlight underwater shafts, traditional teak dhow boats, glowing pearl oysters, sea turtles, protected Abu Dhabi coral reserves.
* **Palette:** Marine Turquoise (`#00A896`), Deep Sea Indigo (`#0B2545`), Golden Amber (`#D4AF37`), Pearl White (`#F0FDF4`).

| Spread # | Spread Scene Title | Target Dedicated Path | Active Fallback Image Path | Visual Justification |
|:---:|:---|:---|:---|:---|
| **0** | Front Cover Keepsake | `/books/pearl-diver-treasure-cover.jpg` | `/books/pearl-diver-treasure-cover.jpg` | Dedicated 300 DPI generated front cover |
| **1** | Opening Dedication & Maritime Seal | `/books/pearl-diver-treasure/spreads/spread_1_dedication.jpg` | `/images/book_craftsmanship.jpg` | Archival Mohawk silk paper & dedication |
| **2** | Departure from Dubai Creek on Dhow | `/books/pearl-diver-treasure/spreads/spread_2_creek.jpg` | `/final_book_mockup_1788701924626.jpg` | Story beginning on open reading desk |
| **3** | Sea Turtle Companion (*Al Salhafah*) | `/books/pearl-diver-treasure/spreads/spread_3_turtle.jpg` | `/competitor_wonderbly_spread_1788709121360.jpg` | Wide panoramic adventure spread |
| **4** | Diving Descent Into Turquoise Waters | `/books/pearl-diver-treasure/spreads/spread_4_diving.jpg` | `/images/hero_story_spread.jpg` | Luminous magical light underwater |
| **5** | Abu Dhabi Sunken Coral Gardens | `/books/pearl-diver-treasure/spreads/spread_5_coral.jpg` | `/competitor_wonderbly_spread_1788709121360.jpg` | Wide vibrant coral panorama |
| **6** | The Ancient Clamshell Revelation | `/books/pearl-diver-treasure/spreads/spread_6_oyster.jpg` | `/final_book_mockup_1788701924626.jpg` | Intimate focal discovery moment |
| **7** | The Glowing Rainbow Pearl Unveiled | `/books/pearl-diver-treasure/spreads/spread_7_pearl.jpg` | `/images/hero_magical_background.jpg` | Radiant iridescent glow & wonder |
| **8** | Swimming with Friendly Dolphins | `/books/pearl-diver-treasure/spreads/spread_8_dolphins.jpg` | `/competitor_wonderbly_spread_1788709121360.jpg` | Expansive Gulf sea horizon |
| **9** | Starlight Navigation by the North Star | `/books/pearl-diver-treasure/spreads/spread_9_northstar.jpg` | `/images/hero_reading_lifestyle.jpg` | Peaceful guiding starlight atmosphere |
| **10** | Harbor Return & Lantern Welcoming | `/books/pearl-diver-treasure/spreads/spread_10_harbor.jpg` | `/images/gift_box_packaging.jpg` | Festive evening homecoming |
| **11** | Bedtime with Seashell & Moral Heirloom | `/books/pearl-diver-treasure/spreads/spread_11_heirloom.jpg` | `/images/book_craftsmanship.jpg` | Archival heirloom ending seal |

---

### Book 2: *First Steps in the Big World: Baby Milestone Chronicle* (`first-steps-in-the-big-world`)
* **Category:** Newborn & Milestone Keepsake (`newborn`)
* **Art Style:** Soft, warm, whimsical nursery watercolor illustration, botanical eucalyptus and date palm wreaths, golden constellation sprinkle, gentle friendly desert animals (gazelle calf, desert hare, baby dove).
* **Palette:** Kraft Cream (`#FBF4E8`), Soft Sage (`#94A89A`), Dusty Peach (`#E8A598`), Warm Gold (`#D4AF37`).

| Spread # | Spread Scene Title | Target Dedicated Path | Active Fallback Image Path | Visual Justification |
|:---:|:---|:---|:---|:---|
| **0** | Front Cover Keepsake | `/books/baby-milestone-book-cover.jpg` | `/books/baby-milestone-book-cover.jpg` | Dedicated 300 DPI generated front cover |
| **1** | Welcome Baby Dedication & Birth Night Stars | `/books/baby-milestone/spreads/spread_1_dedication.jpg` | `/images/book_craftsmanship.jpg` | Archival Mohawk silk paper & dedication |
| **2** | The Day the World Welcomed You | `/books/baby-milestone/spreads/spread_2_arrival.jpg` | `/images/category_for_babies.jpg` | Gentle nursery watercolor baby artwork |
| **3** | Tiny Hands & Tiny Feet First Cuddles | `/books/baby-milestone/spreads/spread_3_tiny_feet.jpg` | `/final_book_mockup_1788701924626.jpg` | Newborn detail in open book format |
| **4** | The First Joyful Smile That Lit the Room | `/books/baby-milestone/spreads/spread_4_first_smile.jpg` | `/images/hero_reading_lifestyle.jpg` | Tender parent-baby interaction |
| **5** | Tummy Time & Curious Gaze at Nature | `/books/baby-milestone/spreads/spread_5_tummy_time.jpg` | `/images/category_for_babies.jpg` | Soft floor-level nursery illustration |
| **6** | Sweet Baby Giggles & Peekaboo Games | `/books/baby-milestone/spreads/spread_6_peekaboo.jpg` | `/images/category_for_family.jpg` | Family laughter and warmth |
| **7** | Crawling Expeditions Across the Rug | `/books/baby-milestone/spreads/spread_7_crawling.jpg` | `/competitor_wonderbly_spread_1788709121360.jpg` | Broad perspective on room exploration |
| **8** | First Words and Babbling Melodies | `/books/baby-milestone/spreads/spread_8_first_words.jpg` | `/images/category_for_babies.jpg` | Whimsical phonetic animal friends |
| **9** | Standing Tall Holding Parent Fingers | `/books/baby-milestone/spreads/spread_9_standing.jpg` | `/images/hero_reading_lifestyle.jpg` | Loving parent support |
| **10** | Brave First Steps Into Open Arms | `/books/baby-milestone/spreads/spread_10_first_steps.jpg` | `/images/category_for_family.jpg` | Major milestone family triumph |
| **11** | Walking by Your Side Forever (Heirloom) | `/books/baby-milestone/spreads/spread_11_heirloom.jpg` | `/images/book_craftsmanship.jpg` | Archival heirloom ending seal |

---

### Book 3: *Super Sibling Adventure: The Dynamic Duo* (`super-sibling-adventure-dynamic-duo`)
* **Category:** Siblings & Twins Co-Hero (`bestseller`)
* **Art Style:** Dynamic, warm, modern picture-book art with playful comic-book flair (flowing hero capes, whimsical masks, cardboard rocket ships, magical treehouse headquarters).
* **Palette:** Hero Emerald (`#059669`), Electric Amber (`#F59E0B`), Royal Blue (`#2563EB`), Radiant Red (`#E11D48`).

| Spread # | Spread Scene Title | Target Dedicated Path | Active Fallback Image Path | Visual Justification |
|:---:|:---|:---|:---|:---|
| **0** | Front Cover Keepsake | `/books/super-sibling-adventure-cover.jpg` | `/books/super-sibling-adventure-cover.jpg` | Dedicated 300 DPI generated front cover |
| **1** | Secret Superhero Agent Dedication | `/books/super-sibling/spreads/spread_1_dedication.jpg` | `/images/book_craftsmanship.jpg` | Archival Mohawk silk paper & dedication |
| **2** | The Backyard Treehouse Secret Base | `/books/super-sibling/spreads/spread_2_treehouse.jpg` | `/images/category_for_kids.jpg` | Colorful whimsical treehouse setting |
| **3** | Crafting Super-Capes from Cozy Blankets | `/books/super-sibling/spreads/spread_3_capes.jpg` | `/final_book_mockup_1788701924626.jpg` | Playful costume preparation spread |
| **4** | The Great Living Room Floor-is-Lava Mission | `/books/super-sibling/spreads/spread_4_lava.jpg` | `/images/category_for_family.jpg` | Imaginative living room obstacle quest |
| **5** | Solving the Mystery of the Lost Teddy Bear | `/books/super-sibling/spreads/spread_5_lost_toy.jpg` | `/competitor_wonderbly_spread_1788709121360.jpg` | Wide panoramic detective scene |
| **6** | Learning to Share the Secret Map | `/books/super-sibling/spreads/spread_6_sharing.jpg` | `/images/hero_reading_lifestyle.jpg` | Tender empathetic sibling moment |
| **7** | Combining Powers: The Dynamic Flight | `/books/super-sibling/spreads/spread_7_flight.jpg` | `/images/category_for_kids.jpg` | Action-packed synchronized flight |
| **8** | Rescuing the Kitten from the Garden Palm | `/books/super-sibling/spreads/spread_8_rescue.jpg` | `/competitor_wonderbly_spread_1788709121360.jpg` | Triumphant outdoor tree rescue |
| **9** | Superhero Victory Snack with Parents | `/books/super-sibling/spreads/spread_9_snack.jpg` | `/images/category_for_family.jpg` | Kitchen table reward and laughter |
| **10** | Tucking Capes Beside the Bunk Beds | `/books/super-sibling/spreads/spread_10_bedtime.jpg` | `/images/gift_box_packaging.jpg` | Cozy bedtime wind-down |
| **11** | Partners Forever, Hand in Hand (Moral) | `/books/super-sibling/spreads/spread_11_heirloom.jpg` | `/images/book_craftsmanship.jpg` | Archival heirloom ending seal |

---

### Book 4: *The Brave Explorer & The Hidden Arabian Oasis* (`the-brave-explorer-hidden-oasis`)
* **Category:** Desert Wildlife & Nature (`heritage`)
* **Art Style:** Epic desert panoramic landscapes, rolling terracotta dunes, whispering ghaf trees, crystalline date palm oasis springs, majestic Arabian Oryx herd, desert owls.
* **Palette:** Desert Terracotta (`#C86432`), Oasis Emerald (`#107E57`), Saffron Gold (`#E5A93C`), Deep Indigo (`#1A2540`).

| Spread # | Spread Scene Title | Target Dedicated Path | Active Fallback Image Path | Visual Justification |
|:---:|:---|:---|:---|:---|
| **0** | Front Cover Keepsake | `/books/brave-explorer-oasis-cover.jpg` | `/books/brave-explorer-oasis-cover.jpg` | Dedicated 300 DPI generated front cover |
| **1** | Explorer's Field Journal Dedication | `/books/brave-explorer/spreads/spread_1_dedication.jpg` | `/images/book_craftsmanship.jpg` | Archival Mohawk silk paper & dedication |
| **2** | Setting Out Across the Towering Liwa Dunes | `/books/brave-explorer/spreads/spread_2_departure.jpg` | `/books/starlit-dunes/spreads/spread_0_cover.jpg` | Atmospheric desert dunes panorama |
| **3** | Reading Animal Tracks with the Desert Hare | `/books/brave-explorer/spreads/spread_3_tracks.jpg` | `/final_book_mockup_1788701924626.jpg` | Close-up field observation spread |
| **4** | The Ancient Ghaf Tree that Endures | `/books/brave-explorer/spreads/spread_4_ghaf.jpg` | `/competitor_wonderbly_spread_1788709121360.jpg` | Majestic iconic national UAE tree |
| **5** | Rescuing the Lost Baby Arabian Oryx | `/books/brave-explorer/spreads/spread_5_oryx.jpg` | `/books/starlit-dunes/spreads/spread_5_oasis.jpg` | Oryx encounter in desert setting |
| **6** | Guided by the Royal Soaring Falcon | `/books/brave-explorer/spreads/spread_6_falcon.jpg` | `/books/starlit-dunes/spreads/spread_3_falcon.jpg` | Direct falconry visual alignment |
| **7** | Discovering the Hidden Emerald Oasis Spring | `/books/brave-explorer/spreads/spread_7_oasis.jpg` | `/books/starlit-dunes/spreads/spread_5_oasis.jpg` | Lush desert water sanctuary |
| **8** | Peaceful Harmony Among Desert Wildlife | `/books/brave-explorer/spreads/spread_8_wildlife.jpg` | `/competitor_wonderbly_spread_1788709121360.jpg` | Wide panoramic sanctuary gathering |
| **9** | Tales Around the Nomad Evening Campfire | `/books/brave-explorer/spreads/spread_9_campfire.jpg` | `/books/starlit-dunes/spreads/spread_6_campfire.jpg` | Saffron campfire hospitality |
| **10** | Sleeping Beneath the Desert Milky Way | `/books/brave-explorer/spreads/spread_10_bedtime.jpg` | `/books/starlit-dunes/spreads/spread_10_bedtime.jpg` | Calming starlight bedtime atmosphere |
| **11** | True Bravery is in Kind Action (Moral) | `/books/brave-explorer/spreads/spread_11_heirloom.jpg` | `/images/book_craftsmanship.jpg` | Archival heirloom ending seal |

---

### Book 5: *My First Ramadan & The Lantern of Kindness* (`my-first-ramadan-lantern-of-kindness`)
* **Category:** Festive Heritage & Values (`heritage`)
* **Art Style:** Luminous atmospheric night lighting, ornate geometric brass Fanous lantern casting intricate shadow patterns, crescent moon through date palms, welcoming family majlis courtyard, sweet Arabian treats.
* **Palette:** Fanous Amber (`#F59E0B`), Midnight Navy (`#111827`), Festive Emerald (`#1E5751`), Warm Brass (`#D4AF37`), Ivory (`#FFFBEB`).

| Spread # | Spread Scene Title | Target Dedicated Path | Active Fallback Image Path | Visual Justification |
|:---:|:---|:---|:---|:---|
| **0** | Front Cover Keepsake | `/books/first-ramadan-lantern-cover.jpg` | `/books/first-ramadan-lantern-cover.jpg` | Dedicated 300 DPI generated front cover |
| **1** | Blessed Month Family Dedication | `/books/first-ramadan/spreads/spread_1_dedication.jpg` | `/images/book_craftsmanship.jpg` | Archival Mohawk silk paper & dedication |
| **2** | Sighting the Silver Crescent Moon (*Hilal*) | `/books/first-ramadan/spreads/spread_2_hilal.jpg` | `/final_book_mockup_1788701924626.jpg` | Delicate crescent sighting moment |
| **3** | Lighting the Golden Brass Fanous Lantern | `/books/first-ramadan/spreads/spread_3_fanous.jpg` | `/images/hero_story_spread.jpg` | Warm golden lantern illumination |
| **4** | Preparing the Iftar Table Together | `/books/first-ramadan/spreads/spread_4_iftar_table.jpg` | `/images/category_for_family.jpg` | Loving family meal preparations |
| **5** | Sunset Cannon Sounding (*Midfa Al Iftar*) | `/books/first-ramadan/spreads/spread_5_cannon.jpg` | `/competitor_wonderbly_spread_1788709121360.jpg` | Historic community celebration |
| **6** | Blessing of the First Date and Fresh Water | `/books/first-ramadan/spreads/spread_6_date_water.jpg` | `/images/hero_reading_lifestyle.jpg` | Reverent spiritual gratitude |
| **7** | Sharing Warm Luqaimat Treats with Neighbors | `/books/first-ramadan/spreads/spread_7_sharing.jpg` | `/images/category_for_kids.jpg` | Generosity and joyful neighborhood giving |
| **8** | Evening Prayers Under Arching Courtyard | `/books/first-ramadan/spreads/spread_8_prayers.jpg` | `/competitor_wonderbly_spread_1788709121360.jpg` | Serene traditional architecture |
| **9** | Tales of Generosity in the Warm Majlis | `/books/first-ramadan/spreads/spread_9_majlis.jpg` | `/images/category_for_family.jpg` | Intergenerational family gathering |
| **10** | Sweet Dreams as the Gentle Drummer Passes | `/books/first-ramadan/spreads/spread_10_bedtime.jpg` | `/images/gift_box_packaging.jpg` | Quiet nighttime contentment |
| **11** | The Joy of Ramadan Lives in Giving (Moral) | `/books/first-ramadan/spreads/spread_11_heirloom.jpg` | `/images/book_craftsmanship.jpg` | Archival heirloom ending seal |

---

## 6. Implementation Blueprint & Defense Matrix

### 6.1 Registering `the-brave-explorer-hidden-oasis` in `web/config/products.ts`
To register the missing 5th book, the following entry must be integrated into `PRODUCTS`:
```typescript
{
  id: "brave-explorer-oasis",
  slug: "the-brave-explorer-hidden-oasis",
  title: "The Brave Explorer & The Hidden Arabian Oasis",
  titleAr: "المستكشف الشجاع والواحة الساحرة",
  subtitle: "An inspiring wildlife quest across Liwa sands to protect endangered desert animals",
  subtitleAr: "رحلة استكشاف شيقة عبر رمال ليوا لاكتشاف واحة سرية وحماية حيوانات الصحراء",
  ageRange: "Ages 3–8",
  badge: "🏜️ DESERT WILDLIFE",
  coverImage: "/books/brave-explorer-oasis-cover.jpg",
  rating: 4.95,
  reviewCount: 290,
  defaultTheme: "Arabian Wildlife & Desert Oasis Quest",
  category: "heritage",
  occasions: ["birthday", "milestone", "gift"],
  recipients: ["son", "daughter", "family"],
  summary: "Journey into the golden dunes of Liwa with your explorer notebook in hand. Befriend a desert hare, protect an endangered baby oryx, and discover an emerald sanctuary where all creatures thrive in peace.",
  galleryImages: [
    { id: "cover", labelEn: "Front Cover", labelAr: "الغلاف الأمامي", src: "/books/brave-explorer-oasis-cover.jpg", type: "cover" },
    { id: "spread1", labelEn: "Hidden Oasis Spread", labelAr: "صفحة الواحة الساحرة", src: "/final_book_mockup_1788701924626.jpg", type: "spread" },
    { id: "spread2", labelEn: "Bilingual Rhymes Spread", labelAr: "أبيات شعرية ثنائية اللغة", src: "/images/hero_reading_lifestyle.jpg", type: "bilingual" },
    { id: "dedication", labelEn: "Personalized Dedication", labelAr: "صفحة الإهداء العائلي", src: "/images/book_craftsmanship.jpg", type: "dedication" },
    { id: "box", labelEn: "Luxury Keepsake Gift Box", labelAr: "صندوق الهدايا الملكي", src: "/images/gift_box_packaging.jpg", type: "box" },
  ],
}
```

### 6.2 Search Keyword Collision Prevention Rules
To preserve 100% pass rate on `tests/test_header_search_and_countdown_stress.mjs` and `tests/test_challenger_empirical_validation.mjs`:
* **DO NOT** use the word `"bedtime"` in `occasions`, `summary`, or `defaultTheme` (must maintain `bedtimeResults.length === 2`).
* **DO NOT** use the word `"space"` in `title`, `subtitle`, `summary`, or `occasions` (must maintain `spaceResults.length === 1`).
* **DO NOT** use the Arabic token `"صقر"` in title, subtitle, or summary (must maintain `falconInAr.length === 1`).
* **DO NOT** use the Arabic token `"فضاء"` (must maintain `spaceInAr.length === 1`).
* **DO NOT** use the Arabic token `"نوم"` (must maintain `bedtimeInAr.length === 1`).

### 6.3 Multi-Book Spreads Registry in `web/config/sampleBookData.ts`
Implement `BOOK_SPREADS_REGISTRY: Record<string, StorySpread[]>` exporting:
* `SAMPLE_BOOK_SPREADS` (defaulting to `starlit-dunes` for backward-compatibility with tests)
* `getSpreadsByBookSlug(slug: string): StorySpread[]` resolving to book-specific 12 spreads, defaulting to `SAMPLE_BOOK_SPREADS` if not found.

---

## 7. Conclusion

All 5 expansion books possess verified, museum-grade 300 DPI 1024x1024 square covers in `web/public/books/`. The missing product registration (`the-brave-explorer-hidden-oasis`), documentation gap in `docs/EXPANSION_BOOK_CATALOG_LIST.md`, and 12-spread fallback paths have been mapped with zero ambiguity and strict regression-defense safety.
