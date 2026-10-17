import os

target_path = "/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/research/WONDERBLY_COMPLETE_FORENSIC_TEARDOWN.md"

content = """# Wonderbly Forensic Teardown & Deep Architecture Audit Report

**Target Website:** https://www.wonderbly.com  
**Entity:** Lostmy.name Ltd (trading as Wonderbly, Reg Co. Number 08305498, London, UK)  
**Corporate Headquarters:** 20 Vauxhall Bridge Road, London, United Kingdom, SW1V 2SA  
**Data Saved Locally to:** `personalized-ai-storybooks/research/WONDERBLY_COMPLETE_FORENSIC_TEARDOWN.json`

---

## 1. Information Architecture & Navigation

### 1.1 Tech Stack & Frontend Infrastructure
- **Framework:** Modern **Astro SSR** with hydratable **React islands**. High Core Web Vitals score, sub-second initial load.
- **Headless CMS:** **Prismic CMS** (`static.cdn.prismic.io`, repo `wonderbly`, API endpoint `https://wonderbly.cdn.prismic.io/api/v2`). All banners, navigation schemas, occasion taxonomy, and localized copy are managed in Prismic documents (`type: site_navigation`, `type: header`, `type: promo_banner`).
- **E-Commerce Backend:** **Solidus** (open-source Ruby on Rails commerce platform) integrated via `/api/eagle` (internal code name: Eagle Engine). Cart items carry `solidus_slug` identifiers.
- **Search & Discovery:** **Algolia Search** integrated with live ranking indices (e.g., `products_us_salesLastDay_desc`, `products_us`). Instant autocomplete dropdown with suggested keywords and trending titles.
- **Referral Engine:** **Mention Me** (`https://tag.mention-me.com/api/v2`, partner ID `mm21c39383`), offering "Give 25%, Get 25%" referral incentives.
- **Lead Capture:** **Sleeknote** modal triggering "$5 off your first order" popup on exit intent / scroll depth.
- **Customer Analytics & Tracking:** Microsoft Clarity, Contentsquare UX Analytics, TikTok Pixel, Meta CAPI, Optimizely, Google Tag Manager (`GTM-NTG8CTR`), Optimove CRM trigger engine.

### 1.2 Header Navigation & Taxonomy
The primary header features a clean 5-pillar navigation bar with Radix UI accessible popovers:
1. **Our Books:**
   - Highlights: New In, Bestsellers, Shop All Books, Wonderbly Classics, Family Stories, Charity Partnership (Room to Read).
2. **Kids (Shop by Age & Recipient):**
   - **By Age:** For Newborns, 0–3 Years, 3–6 Years, 6–9 Years, 9–12 Years, For Teens, All Ages.
   - **By Recipient:** For Siblings, For Nieces & Nephews, For the Whole Family.
   - **By Theme:** Bedtime, Search-and-Find, Dinosaurs, Early Learning, Imaginative, Empowering.
3. **Adults (Grown-Up Gifting):**
   - **By Recipient:** For Moms, For Dads, For Grandparents, For Aunties & Uncles, For Friends, For Your Partner, For New Parents.
   - **By Theme:** Newspaper Archive, Sports / Football / Soccer, Food & Drink (Recipe books), Pets (Dogs & Cats), Humor, Love & Romance, Astrology / Zodiac, Poetry.
4. **Occasion:**
   - Birthday (Kids Birthdays & Adults Milestone Birthdays 30th/40th/50th/60th).
   - New Baby & Baby Shower.
   - Baptism & Christening.
   - Mother's Day & Father's Day.
   - Weddings, Anniversaries & Valentine's Day.
   - Graduation & Retirement.
5. **Seasonal / Christmas:** Dedicated top-level pillar activated Q3/Q4.

### 1.3 Footer Structure & Support Ecosystem
- **Help & Customer Support Channels:**
  - Dedicated Help Center at `/help` powered by a custom searchable knowledge base (`helpdesk angels`).
  - Asynchronous ticket submission via `/contact-us` and direct email: `hello@wonderbly.com`.
  - **Critical operational finding:** Wonderbly **does NOT provide phone support or live human chat**. Support is strictly asynchronous email ticketing with promised 24-48h SLA.
- **Corporate & Trust Footprint:**
  - Registered entity: Lostmy.name Ltd (trading as Wonderbly, UK Co. 08305498).
  - Prominent partnership attribution: "In partnership with Penguin Random House".
  - Delivery Information (`/pages/delivery-info`), Coupon Codes & Discounts (`/offers`), Country Selector (`/choose-your-country` covering 34 localized country storefronts).

---

## 2. Full Product Catalog Breakdown (Top 10 Bestsellers)

Wonderbly maintains a dynamic catalog of over 110 active SKUs. Based on real-time Algolia sales index data (`products_us_salesLastDay_desc`), the top 10 bestselling books across categories are:

| Rank | Product Title | SKU / Muse Slug | Target Age / Audience | Storyline Premise | Page Count | Format & Dimensions | Author & Illustrator Style |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Lost My Name** | `lost-my-name-v2` | Ages 0–8 | Child wakes up having lost their name and embarks on a whimsical journey encountering quirky creatures who give them letters to spell out their name. | 22 to 44 pages (dynamic based on name length) | Landscape: 312 × 225 mm (Spread: 609 × 225 mm, 7.5mm bleed) | Story: David Cadji-Newby.<br>Art: Pedro Serapicos. Iconic retro-whimsical hand-painted gouache. |
| **2** | **Where Are You?** | `where-are-you` | Ages 3–10 | High-energy multiverse search-and-find adventure where the personalized child must spot themselves across 6 elaborate alternative universes. | 36 pages (up to 202 pages in deluxe editions) | Portrait / Jumbo: 210 × 280 mm (cover: 472 × 331 mm) | Story: David Cadji-Newby.<br>Art: Marija Tiurina. Ultra-dense Where's Waldo-style isometric panoramic illustrations. |
| **3** | **Bedtime For You** | `bedtime-for-name` | Ages 0–3 | Gentle, calming bedtime rhyming tale leading the child through the Land of Nod, closing eyelids of animals along the way. | 26 pages | Square: 230 × 230 mm (Spread: 450 × 230 mm) | Story: David Cadji-Newby.<br>Art: Cynthia Cliff. Soft pastel, muted night palettes, folk-art inspired. |
| **4** | **I Love You This Much** | `i-love-you` | Ages 0–4 (supports 1-4 kids) | Quantifies unconditional love across gigantic scales (mountains, oceans, constellations) from parent/grandparent to up to 4 siblings. | 34 pages | Square: 230 × 230 mm (Spread: 450 × 230 mm) | Story: David Cadji-Newby.<br>Art: Daniel Gray-Barnett. Bright mid-century contemporary gouache. |
| **5** | **You Are The Best Dad / Mom Ever** | `best-dad-ever` / `best-mum-ever` | Adults / Parents | 10 personalized, heartfelt, and humorous qualities chosen by the gifter explaining why mom/dad is superhuman. | 42 pages | Square: 230 × 230 mm | Story: Wonderbly Creative Team.<br>Art: Studio modern line-and-wash digital illustration. |
| **6** | **Oh, What Parents You’ll Be!** | `oh-what-parents-youll-be` | Expecting / New Parents | Humorous, reassuring celebration of new parenthood highlighting the chaos, diapers, and unconditional love. Explicitly badged as **"Illustrated by award-winning creatives – without AI"**. | 34 pages | Landscape: 312 × 225 mm | Story: David Cadji-Newby.<br>Art: Adam Ming. Warm pencil sketch & watercolor style. |
| **7** | **When You Were Born** | `when-you-were-born` | Ages 0–3 | Poetic celebration of the child's entry into the world, integrating birth date, astrological constellations, and world joy. | 32 pages | Square: 230 × 230 mm | Story: David Cadji-Newby.<br>Art: Amy Blay. Modern scandi-minimalist vector-texture art. |
| **8** | **I'm a Name-O-Saurus** | `dinosaur-book` | Ages 2–5 | High-energy dinosaur fantasy where the child's name is transformed into their very own dinosaur species exploring prehistoric terrain. | 34 pages | Square: 230 × 230 mm | Story: David Cadji-Newby.<br>Art: Tom Bonson. Bold comic cartoon style. |
| **9** | **This Month's Child** | `this-months-child` | Ages 1–9 | Celebrates the specific magic, birthstone, flowers, and seasonal natural phenomena of the child's birth month. | 34 pages | Square: 230 × 230 mm | Story: David Cadji-Newby.<br>Art: Studio naturalistic botanical style. |
| **10** | **Your Life in Newspaper Headlines** | `newspaper-birthday` | Milestone Adults (30th, 50th, 70th) | Archival collection of authentic front pages from The Washington Post, The Telegraph, LA Times, or NY Daily News starting from recipient's birth year. | 80 to 140 pages | Oversized Hardcover: 380 × 310 mm | Archival news photography & authentic period typography with gold-embossed personalized cover. |

---

## 3. Step-by-Step Personalization Funnel Audit

### 3.1 Input Validation Engine
- **First Name Field:**
  - Minimum length: 2 characters (3 characters for *Lost My Name* to allow sufficient letter-story spreads).
  - Maximum length: **13 characters** (Strictly enforced due to print typography layout bounds).
  - Validation Regex: `/^[A-Za-zÀÃÁÄÅÂÆÇÈÊÉËÌÍÎÏÑÒÓÔÕÖØŠÙÚÛÜÝŸŽßàáâãäåæçèéêëìíîïñšòóôöøùúûüýÿžõ\-'’ ]*$/`.
  - Edge Cases: Hyphenated names (`Jean-Luc`) and apostrophes (`O'Connor`) pass cleanly. If a name exceeds 13 characters, the engine throws an inline alert: `"Whoops! This is too long for the page."`
- **Surname Field (in Search-and-Find titles):** Max length: 21 characters.
- **Gifter Name Field ("Created by"):** Min 2, max 60 characters. Printed on the title/dedication page.

### 3.2 Character Appearance Customizer
Wonderbly's customization is modular and template-based:
- **Fitzpatrick Phototype Scale:** Uses 4 to 6 discrete skin tone presets (`type-i` through `type-vi`).
- **Where Are You? Avatar Matrix:**
  - 9 Skin Tones (`tone-1` to `tone-9`).
  - 12 Hairstyles (`hair-1` to `hair-12`) categorized by length and curl texture.
  - 7 Hair Colors (`haircolour-1` to `haircolour-7`).
  - 2 Genders (`male` preset to hair-2, `female` preset to hair-12).
- **Lost My Name Algorithmic Library:**
  - 54 unique letter-story animals and characters (`aardvark`, `alligator`, `angel`, `bear`, `chameleon`, `dragon`, `elephant`, `giant`, `jester`, `narwhal`, `lion`, `unicorn`, etc.).
  - The engine matches each character of the child's name to a specific 4-page spread sequence (`first-left`, `first-right`, `second-left`, `second-right`).

### 3.3 Dedication Step
- Character Limit: **Hard ceiling of 400 characters**.
- Formatting Constraint: **Strict 10-line limit** (including blank lines).
- Default Pre-filled Message (emotional hook):
  > *"Dear [Name], We meet a lot of magical and wonderful creatures throughout our lives. These are just the first. We hope you meet a whole lot more."*
- Optional Photo Upload: Allows 1 square customer photo uploaded to Cloudinary/S3 (`dedication_photo_upload`) with interactive crop and grayscale/warm filter controls.

### 3.4 Live Preview Engine Architecture
- **Rendering Microservice:** Hosted on `https://mu2.wonderbly.com` (service endpoint: `/product/{sku}/preview/...` and `/website-api/chameleon`).
- **Rendering Mechanism:** Server-side pre-rendered slices assembled dynamically. Pages are delivered as high-resolution WebP/PNG image assets with dynamic dimensions (`_size=312x225x7.5` representing book width, height, and spine width in millimeters).
- **Security & Anti-Scraping:** Every image request is signed with a cryptographic HMAC token (`_sig=...`) and version hash (`_v=...`). Tampering with parameters invalidates the request.
- **Preview Coverage:** Wonderbly displays **100% of the book's pages** (all 22–44 pages), allowing full confidence prior to purchasing.
- **Controls:** Toggle between "One-page view" (mobile-optimized) and "Two-page view" (desktop realistic spread). Zoomable, high-res 1200px wide assets.

---

## 4. Cart, Upsells & Cross-Sells

### 4.1 Funnel Architecture & Interstitial Upsell Page
Once the user customizes their book, Wonderbly routes them through a high-converting multi-step upsell sequence:

1. **Cover & Binding Selection (Step 1):**
   - **Softcover:** $24.99 USD (Entry tier).
   - **Hardcover:** $39.99 USD (**+$15.00 upsell, badged "Most popular" and selected by default**).
   - **Layflat Keepsake:** $59.99 USD (**+$35.00 upsell, badged "Lifetime keepsake"**, thick luster board pages).
2. **Cover Color Micro-Upsell (Step 2):**
   - Default color: Free.
   - 3 Alternative colorways (Blush Pink, Forest Green, Midnight Blue): **+$3.00 USD each**.
3. **Gift Packaging Order Bumps (Step 3):**
   - **Deluxe Presentation Gift Box:** **+$14.99 USD** (Rigid box with gold foil detailing).
   - **Premium Multicolour Gift Box:** **+$7.99 USD** (Heavyweight card adorned with crowns).
   - **Envelope-style Gift Wrap:** **+$5.99 USD** (Sleek patterned paper envelope).
4. **Post-Creation Interstitial Page (Step 4):**
   - URL: `/continue-shopping/kids?product-added=[sku]`
   - Headline: *"Every child needs another adventure"*
   - Push Offer: **"Buy one kids' book, get one half price with code BOGO50"**.
5. **Complementary Cross-Sell Products in Cart:**
   - Personalized Activity Book: **$11.99 – $16.99 USD**.
   - Personalized Keepsake Self-Care / Birthday Journals: **$29.99 USD**.

---

## 5. Pricing, Currency & Shipping Breakdown

### 5.1 Multi-Currency Price Matrix

| Format / Edition | USA (USD $) | United Kingdom (GBP £) | Europe / Germany / France (EUR €) | UAE & GCC (USD / AED Equiv) |
| :--- | :--- | :--- | :--- | :--- |
| **Standard Softcover (24-34 pages)** | $24.99 USD | £19.99 | €34.99 | $24.99 USD (~91.75 AED) |
| **Premium Hardcover (Most Popular)** | $39.99 USD | £24.99 | €44.99 | $39.99 USD (~146.85 AED) |
| **Deluxe Layflat Keepsake Edition** | $59.99 USD | £39.99 | €54.99 | $59.99 USD (~220.30 AED) |
| **Adult Milestone Newspaper Editions** | $89.99 – $94.99 USD | £62.99 – £75.99 | €79.99 – €94.99 | $89.99 USD (~330.50 AED) |

*Note on UAE/GCC:* Wonderbly currently charges UAE customers in USD ($) without native AED dirham currency conversion, representing an immediate localization advantage for our competitor brand.

### 5.2 Production & Shipping SLA

- **Production Turnaround:** 2 to 4 working days printing and binding prior to dispatch.
- **USA:**
  - Standard Delivery: 6–8 business days ($5.99 – $7.99).
  - Tracked / Express: 2–4 business days ($12.99 – $15.99).
- **United Kingdom (Local Hub):**
  - Standard (Royal Mail): 3–5 business days (£3.99).
  - Express Tracked: 1–2 business days (£6.99).
- **Europe (Germany/France Hubs):**
  - Standard: 5–8 business days (€5.99 – €8.99).
  - Express: 2–4 business days (€14.99).
- **UAE / GCC (Cross-Border International):**
  - Standard / Tracked: **8 to 14 business days ($14.99 – $19.99 USD)**.
  - No local print facility in the Middle East; books are printed in the UK/Europe and flown via DHL/Aramex.

### 5.3 Active Promotional Playbook
- **BOGO50:** 50% off second book when purchasing two.
- **Seasonal Mystery Sends:** Automated CRM email workflows triggering codes like `SMILE` ($8-$12 off), `SUPERELF` / `DEARSANTA` (30% off 2+ books).
- **Free Shipping Threshold:** Triggered on orders above $55.00 USD.
- **New Subscriber Voucher:** $5.00 USD off first order via Sleeknote capture.

---

## 6. Copywriting, Emotional Hooks & Trust Elements

### 6.1 Core Value Proposition & Emotional Framing
- **Brand Hero Headline:** *"Bedtime tales for little dreamers – Our coziest personalized stories to lull them to the Land of Nod."*
- **Primary Value Prop:** *"Meaningful gifts, made in minutes – award-winning authors, illustrators and translators craft our books with care, so you can delight the people you love with stories they’ll want to keep forever."*
- **Emotional Trigger:** Transitioning a personalized book from an ephemeral novelty into an emotional heirloom ("A gift they will treasure for a lifetime").
- **Anti-AI Counter-Positioning:** Wonderbly explicitly markets human artistry on product pages: *"Illustrated by award-winning creatives – without AI"*.

### 6.2 Trust Proof Points & Press Badges
- **Trustpilot Rating:** **4.5 out of 5 stars** based on **89,563+ verified reviews**.
- **Social Proof Claim:** *"We’ve helped 10 million people make someone’s day."*
- **Institutional Endorsement:** Prominent badge linking to **Penguin Random House**.
- **Payment Badges:** Visa, Mastercard, American Express, PayPal Express, Apple Pay, Klarna.

### 6.3 Exact Cancellation, Reprint & Refund Policy
- **Personalized Goods Exemption:** Under UK/EU and US consumer law, Wonderbly strictly invokes the custom goods exemption:
  > *"For the avoidance of doubt, save in respect of Faulty or defective Products, nothing in these Terms and Conditions shall give you rights of cancellation in regard to the Products, which, by their nature, have been made to your specification or clearly personalized."*
- **Grace Window:** Customers are granted a **2-hour grace window** post-checkout to edit typos or shipping addresses in their account before the job is pushed to the print queue.
- **14-Day Defect Window:** Claims for print misalignment, binding flaws, or transit damage must be filed within **14 days of delivery** with photographic proof sent to `hello@wonderbly.com`.
- **Courier Redelivery:** Couriers attempt delivery up to 2 times; if returned due to incorrect address, the customer is billed return and re-shipping fees.

### 6.4 Paper Sustainability & Environmental Claims
- **FSC Certification:** All books are printed on Forest Stewardship Council (FSC) certified paper, guaranteeing responsible forestry.
- **Print-on-Demand Eco Angle:** Zero unsold inventory waste; books are only manufactured when ordered.
- **Paper Stock:** Interior pages printed on heavy 150–200 gsm acid-free uncoated/satin paper designed to resist fading and toddler wear-and-tear.

---

## 7. Strategic Synthesis: 5 Vulnerabilities to Exploit for Our 10x Competitor

1. **The Static Template Bottleneck:** Wonderbly offers only 4–6 generic skin tones and fixed letter-rhymes. Our generative AI platform creates **photo-accurate characters and entirely bespoke storylines** based on real child interests (e.g., soccer, robotics, UAE space missions).
2. **The "Anti-AI" Marketing Gap:** Wonderbly's defensive stance ("without AI") leaves them vulnerable to high production costs and slow release cycles. We position AI as a tool for **boundless imagination, personalized morals, and instant generation**.
3. **The MENA / UAE Blindspot:** Wonderbly does not support **Arabic script, bilingual English-Arabic typography**, or local GCC currencies (AED/SAR), and takes **8–14 days to ship to Dubai**. With our local print partnership, we deliver in **24–48 hours** with native Apple Pay and Tabby BNPL.
4. **Missing Audio Dimension:** Wonderbly's books are purely static physical paper. We include a **scannable bedtime audio QR code** where an AI voice reads the personalized story with gentle lullaby background music.
5. **Pricing Arbitrage:** Wonderbly's hardcover + shipping to UAE costs **~$55 USD (~200 AED)**. We can deliver superior personalized hardcover quality locally for **129–149 AED** with higher margins and instant satisfaction.
"""

with open(target_path, "w", encoding="utf-8") as f:
    f.write(content.strip())

print(f"Successfully generated {target_path}")
