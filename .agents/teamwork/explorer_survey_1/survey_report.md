# Specification Mining Report: UAE Organic SEO Domination Engine
**Author:** Specification Miner (`explorer_survey_1`)  
**Date:** 2026-10-06  
**Target Codebase:** `/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks`  
**Authoritative Sources:**  
- `ORIGINAL_REQUEST.md` (2026-10-06T16:17:30Z)
- `research/UAE_ORGANIC_SEO_DOMINATION_PLAYBOOK.md`
- Next.js 16 App Router Codebase (`web/app`, `web/lib/seo/taxonomy.ts`, `web/config/*`)

---

## Executive Summary
This document provides the complete, authoritative specification for implementing the **PersonalizedTales UAE Organic SEO Domination Engine**. The mission is to rank #1 on Google UAE (`google.ae`) across high-intent English and Arabic search query clusters with zero customer acquisition cost (Zero-CAC).

The specification defines:
1. **4 High-Intent UAE Landing Page Pairs (8 routes total):** Full localized copy, H1/H2 hierarchy, semantic body text, PAA FAQs, CTAs, and internal link routing.
2. **Top 12 UAE Child Names Programmatic Hub (24 routes total):** Dedicated routes for Emirati and expat names (Zayed, Fatima, Hamdan, Maryam, Rashid, Noah, Olivia, Liam, Sarah, Omar, Ali, Layla) in both English and Arabic.
3. **Technical SEO Architecture:** JSON-LD multi-entity schemas (Product with pure AED 49/79/99 pricing and 4.96/5 rating from 428 reviews, FAQPage, BreadcrumbList, Organization, WebSite), bi-directional hreflang (`en-AE`, `ar-AE`, `x-default`), dynamic `sitemap.ts` generation, and OpenGraph/Twitter cards.
4. **Verification & Testing Protocol:** Specification for `tests/test_uae_seo_domination_suite.mjs` ensuring zero regression across the existing 154 core test gates.

---

## Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Landing Page | `/personalized-books-dubai` | High-intent Dubai English landing page targeting "personalized books dubai" and "personalized books uae" (KD 28, 800-1,500 MSV). | HTTP GET `/personalized-books-dubai` | HTTP 200 HTML with localized H1, 3D flipbook demo CTA, 4 PAA FAQs, Product & FAQ schemas, hreflang tags. | Returns 404 if route missing; SSR error if hydration mismatch occurs. | ORIGINAL_REQUEST.md R2.1 & PLAYBOOK §2.A |
| 2 | Landing Page | `/ar/personalized-books-dubai` | High-intent Dubai Arabic native landing page targeting "قصص أطفال مخصصة دبي" and "قصص أطفال مخصصة الإمارات" (KD 18, 800-1,800 MSV). | HTTP GET `/ar/personalized-books-dubai` | HTTP 200 HTML with RTL layout, Amiri typography, Tashkeel Arabic verses, 4 Arabic PAA FAQs, pure AED prices. | Returns 404 if route missing; LTR rendering if dir not set. | ORIGINAL_REQUEST.md R2.1 & PLAYBOOK §2.B |
| 3 | Landing Page | `/personalized-baby-gifts-dubai` | Milestone keepsake landing page targeting "personalized baby gifts dubai" and newborn keepsakes (KD 24, 1,200-2,500 MSV). | HTTP GET `/personalized-baby-gifts-dubai` | HTTP 200 HTML highlighting newborn birth stats, 400 GSM layflat binding, gold foil keepsake box, newborn FAQs. | Returns 404 if route missing. | ORIGINAL_REQUEST.md R2.2 & PLAYBOOK §2.A |
| 4 | Landing Page | `/ar/personalized-baby-gifts-dubai` | Arabic newborn keepsake landing page targeting "هدايا مواليد بالاسم دبي" and "توزيعات مواليد بالاسم" (KD 28, 1,800-4,200 MSV). | HTTP GET `/ar/personalized-baby-gifts-dubai` | HTTP 200 HTML with RTL layout, Aqiqah and baby shower themes, Arabic newborn FAQs, Tabby 4 split installments. | Returns 404 if route missing. | ORIGINAL_REQUEST.md R2.2 & PLAYBOOK §2.B |
| 5 | Landing Page | `/bilingual-children-books-arabic-english` | Educational bilingual landing page targeting KHDA/ADEK school parents searching for dual-language books (KD 19, 1,400-3,200 MSV). | HTTP GET `/bilingual-children-books-arabic-english` | HTTP 200 HTML detailing side-by-side English rhymes and Tashkeel Fusha Arabic, QR audio pronunciation badge, educational FAQs. | Returns 404 if route missing. | ORIGINAL_REQUEST.md R2.3 & PLAYBOOK §2.A |
| 6 | Landing Page | `/ar/bilingual-children-books-arabic-english` | Arabic native counterpart for bilingual education and Arabic literacy (KD 20, 1,200-2,600 MSV). | HTTP GET `/ar/bilingual-children-books-arabic-english` | HTTP 200 HTML with RTL layout, school curriculum readiness, Arabic FAQs, links to bilingual bestsellers. | Returns 404 if route missing. | ORIGINAL_REQUEST.md R2.3 & PLAYBOOK §2.B |
| 7 | Landing Page | `/custom-storybook-for-kids-dubai` | Commercial customizer landing page capturing Wonderbly & Etsy alternative search queries (KD 22, 300-600 MSV). | HTTP GET `/custom-storybook-for-kids-dubai` | HTTP 200 HTML comparing 5-minute local digital delivery & 24h UAE courier vs 2-week international imports, customizer preview CTA. | Returns 404 if route missing. | ORIGINAL_REQUEST.md R2.4 & PLAYBOOK §2.A |
| 8 | Landing Page | `/ar/custom-storybook-for-kids-dubai` | Arabic custom storybook maker page targeting "قصص اطفال مخصصة الامارات" (KD 18, 800-1,800 MSV). | HTTP GET `/ar/custom-storybook-for-kids-dubai` | HTTP 200 HTML with RTL layout, character customization specs, 49/79/99 AED pricing, Tabby installments. | Returns 404 if route missing. | ORIGINAL_REQUEST.md R2.4 & PLAYBOOK §2.B |
| 9 | Programmatic SEO | Top 12 UAE Child Names Hub (EN) | Programmatic routes `/personalized-books/for-[name]` for Zayed, Fatima, Hamdan, Maryam, Rashid, Noah, Olivia, Liam, Sarah, Omar, Ali, Layla. | Dynamic route param `[name]` (e.g. `for-zayed`) | HTTP 200 HTML tailored with child's name, origin, meaning, recommended storybook, 3D preview CTA, sibling name links. | HTTP 404 if name not supported or invalid format. | ORIGINAL_REQUEST.md R2.5 & PLAYBOOK §6 |
| 10 | Programmatic SEO | Top 12 UAE Child Names Hub (AR) | Programmatic routes `/ar/personalized-books/for-[name]` for the top 12 Emirati and expat names. | Dynamic route param `[name]` | HTTP 200 HTML in Arabic RTL with name in Arabic script (e.g., زايد), meaning in Arabic, Tashkeel preview verses, CTAs. | HTTP 404 if name not supported. | ORIGINAL_REQUEST.md R2.5 & PLAYBOOK §6 |
| 11 | Technical SEO | Schema.org Product Structured Data | Rich snippet Product schema on all landing & name pages with pure AED pricing (49/79/99 AED), inStock, 4.96/5 rating from 428 reviews. | Page context & pricing configuration | Valid JSON-LD script tag with `@type: "Product"`, `offers`, and `aggregateRating`. | Invalidation if currency is not AED or rating differs from 4.96/428. | ORIGINAL_REQUEST.md R3 & PLAYBOOK §7.A |
| 12 | Technical SEO | Schema.org FAQPage Structured Data | Google Rich Snippet expander markup containing the top 4 PAA questions and answers for each landing page. | Page specific FAQ array | Valid JSON-LD script tag with `@type: "FAQPage"`, `mainEntity: [Question]`. | Google SERP rejection if question text does not match visible DOM text. | ORIGINAL_REQUEST.md R3 & PLAYBOOK §7.A |
| 13 | Technical SEO | Schema.org BreadcrumbList | Hierarchical breadcrumbs markup from Home -> Hub -> Current Page. | URL hierarchy | Valid JSON-LD script tag with `@type: "BreadcrumbList"`. | Search console warning if URL paths or positions are broken. | ORIGINAL_REQUEST.md R3 & PLAYBOOK §7.A |
| 14 | Technical SEO | Schema.org Organization & WebSite | Corporate identity and site search action schema establishing UAE local publisher authority. | Site config constants | Valid JSON-LD with `@type: "Organization"` and `@type: "WebSite"` with SearchAction. | Schema validator warnings if required properties missing. | ORIGINAL_REQUEST.md R3 & PLAYBOOK §7.A |
| 15 | Technical SEO | Bi-directional Hreflang Alternates | Dual-language search engine directives preventing duplicate content penalties. | Route URL path | `<link rel="alternate" hreflang="..." />` or Next.js metadata `alternates.languages` for `en-AE`, `ar-AE`, and `x-default`. | Hreflang conflict in GSC if alternate links are non-reciprocal. | ORIGINAL_REQUEST.md R3 & PLAYBOOK §7.B |
| 16 | Technical SEO | Dynamic Sitemap Integration | Auto-generation of full indexable URL set including all landing pages and name hubs in `sitemap.ts`. | Taxonomy and route configs | XML sitemap containing canonical URLs, bilingual alternates, priority, and changeFrequency. | Sitemap build failure if routes contain unescaped characters or broken slugs. | ORIGINAL_REQUEST.md R3 & `web/app/sitemap.ts` |
| 17 | Technical SEO | OpenGraph & Twitter Card Metadata | Social sharing and SERP snippet metadata localized with Dubai and UAE geo-targeting. | Route and locale metadata | `<meta property="og:..." />` and `<meta name="twitter:..." />` with localized titles, descriptions, and 1200x630 images. | Fallback to default generic metadata if undefined. | ORIGINAL_REQUEST.md R3 |
| 18 | Quality Gate | Automated SEO Test Suite | Automated test script `tests/test_uae_seo_domination_suite.mjs` verifying schema validity, hreflang links, meta tags, and route resolution. | Command execution: `node tests/test_uae_seo_domination_suite.mjs` | Detailed test report with 100% pass status. | Script exits with non-zero code if any assertion fails. | ORIGINAL_REQUEST.md R4 & Acceptance Criteria |

---

## Edge Cases

| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | Programmatic Name Slug Matching | Slug with uppercase or leading slash (e.g. `/for-Zayed` or `/for-zayed/`) | Next.js dynamic routing must normalize slugs to lowercase lowercase (`zayed`) to prevent duplicate indexing or 404s. |
| 2 | Name Slug Mapping: Sarah vs Sara | Request specifies "Sarah" but legacy taxonomy has slug `sara` | Taxonomy must support both `sarah` and `sara` (or canonicalize `sarah`) ensuring `/personalized-books/for-sarah` returns 200 with proper Sarah/سارة data. |
| 3 | Special Arabic Characters in Slugs | URL containing Arabic letters (e.g. `/ar/قصص-أطفال/زايد`) vs clean ASCII `/ar/personalized-books/for-zayed` | While Arabic keyword URLs can work, browsers URL-encode Arabic into long percent-encoded strings (%D8%B2...). Clean ASCII routes `/ar/personalized-books/for-[slug]` ensure reliable cross-browser linking and analytics while rendering pure Arabic text in DOM and metadata. |
| 4 | Pure AED Price Integrity | Page rendered in any currency mode | All UAE landing pages must display and output Schema.org pricing in pure AED (`49.00`, `79.00`, `99.00 AED`). Zero foreign currency ($ USD or £ GBP) leaks allowed. |
| 5 | AggregateRating Invariant | Schema generation for Product | Must strictly match the canonical invariant: `ratingValue: "4.96"`, `reviewCount: "428"`, `bestRating: "5"`. |
| 6 | SSR Hydration Safety | Server-rendered HTML vs client mount | All SEO pages must be static server components (RSC) or pass deterministic props to client components without dynamic `Date()` or `Math.random()` in initial HTML to prevent React hydration errors #418/#423. |
| 7 | RTL Text Alignment and Fonts | Arabic pages under `/ar/*` | Root container must have `dir="rtl"` and use `font-amiri` / Arabic typography tokens with appropriate leading and Tashkeel support. |
| 8 | Internal Link Depth | Navigation from any landing page | Every SEO landing page and name page must have direct links to `/create/start` (or PDP) and back to the parent category/hub, maintaining a search crawler click depth ≤ 2. |

---

## Detailed Specifications by Landing Page

### 1. `/personalized-books-dubai` & `/ar/personalized-books-dubai`

#### Search Query Target
- **English Query:** `personalized books dubai`, `personalized books uae` (MSV: 800–1,500 | KD: 28)
- **Arabic Query:** `قصص أطفال مخصصة دبي`, `قصص أطفال مخصصة الإمارات` (MSV: 800–1,800 | KD: 18)

#### Metadata Configuration
- **English Title:** `Personalized Children's Books Dubai & UAE | 3D Live Preview`
- **Arabic Title:** `قصص أطفال مخصصة بالاسم والصورة دبي والإمارات | معاينة ثلاثية الأبعاد`
- **English Description:** `Create an heirloom personalized children's book in Dubai. Bilingual Arabic & English with full Tashkeel, instant 3D flipbook preview, and 24–48h courier delivery across UAE.`
- **Arabic Description:** `اصنع قصة أطفال تذكارية مخصصة لطفلك في دبي. نصوص ثنائية اللغة عربي وإنجليزي مشكولة بالكامل، معاينة ثلاثية الأبعاد، وتوصيل سريع لكافة إمارات الدولة خلال ٢٤-٤٨ ساعة.`
- **Canonical EN:** `https://personalizedtales.com/personalized-books-dubai`
- **Canonical AR:** `https://personalizedtales.com/ar/personalized-books-dubai`

#### Headings & Semantic Content
- **English H1:** `Personalized Children's Books in Dubai & UAE — Make Them the Star`
- **Arabic H1:** `قصص أطفال مخصصة بالاسم والصورة في دبي والإمارات — اجعل طفلك بطل القصة`
- **Subheading EN:** `Crafted locally in the Emirates. Discover bespoke storybooks featuring authentic bilingual Arabic-English verses, premium 200 GSM Mohawk silk paper, and instant 3D interactive preview.`
- **Subheading AR:** `طُبعت بعناية فائقة في دولة الإمارات. قصص ساحرة تجمع بين الفصحى المشكولة والإنجليزية، على ورق موهوك الفاخر مع معاينة تفاعلية فورية وتوصيل سريع.`
- **Value Propositions:**
  1. *Instant 5-Minute Digital Preview & Keepsake:* Flip through every page in WebGL 3D before printing.
  2. *Authentic Bilingual Tashkeel:* Fusha Arabic rhymes paired side-by-side with lyrical English.
  3. *Local 24–48h Courier Delivery:* Dispatched locally across Abu Dhabi, Dubai, Sharjah, and all 7 Emirates.
  4. *Transparent Pure AED Pricing:* Softcover 49 AED, Classic Hardcover 79 AED, Deluxe Layflat 99 AED. Eligible for Tabby 4 split installments.

#### People Also Ask (PAA) FAQs
1. **Q (EN):** *Where can I get a personalized book printed in Dubai?*  
   **A (EN):** *PersonalizedTales prints and dispatches heirloom-grade personalized books directly in the UAE. Orders are printed on 200 GSM archival paper in Dubai and delivered across all 7 Emirates within 24 to 48 hours, with instant 3D digital flipbooks ready in 5 minutes.*  
   **Q (AR):** *أين يمكنني طباعة قصة مخصصة لطفلي في دبي؟*  
   **A (AR):** *توفر دار "حكاياتنا المخصصة" (PersonalizedTales) طباعة محلية فاخرة في دولة الإمارات على ورق موهوك الأرشيفي فائق الجودة، مع توصيل سريع خلال ٢٤ إلى ٤٨ ساعة لكافة الإمارات، وإتاحة النسخة الرقمية التفاعلية خلال ٥ دقائق.*
2. **Q (EN):** *How long does Wonderbly take to deliver to Dubai and the UAE?*  
   **A (EN):** *Legacy international publishers like Wonderbly ship from the UK and Europe, typically taking 10 to 16 business days with 45–85 AED in international shipping fees. PersonalizedTales delivers locally within 24–48 hours, or instantly via 3D digital keepsake.*  
   **Q (AR):** *كم يستغرق شحن الكتب المخصصة من المتاجر العالمية إلى دبي؟*  
   **A (AR):** *تستغرق المتاجر العالمية المستوردة مثل وندربلي ما بين ١٠ إلى ١٦ يوماً للشحن من أوروبا برسوم شحن باهظة تصل إلى ٨٥ درهماً، بينما نوفر طباعة محلية سريعة تصلك في غضون ٢٤-٤٨ ساعة فقط وبأسعار محلية منافسة.*
3. **Q (EN):** *Does the book include both Arabic and English text?*  
   **A (EN):** *Yes. Every spread features side-by-side bilingual storytelling: poetic English paired with Modern Standard Arabic (Fusha) complete with full Tashkeel (vowel markings) to support reading confidence.*  
   **Q (AR):** *هل تتضمن القصة اللغتين العربية والإنجليزية معاً؟*  
   **A (AR):** *نعم، تتميز قصصنا بتصميم ثنائي اللغة متقابل: أبيات شعرية إنجليزية عذبة تقابلها لغة عربية فصحى مشكولة بالكامل بالحركات لمساعدة الطفل على إتقان القراءة والاعتزاز بهويته.*
4. **Q (EN):** *How much does a personalized storybook cost in the UAE?*  
   **A (EN):** *Our Softcover edition is 49 AED, the bestselling Classic Hardcover is 79 AED, and the Deluxe Layflat edition is 99 AED. All prices are in UAE Dirhams (AED) and eligible for Tabby 4 interest-free installments.*  
   **Q (AR):** *كم تبلغ أسعار القصص المخصصة للأطفال في الإمارات؟*  
   **A (AR):** *تبدأ الأسعار من ٤٩ درهماً إماراتياً للغلاف المرن، و ٧٩ درهماً للغلاف المقوى الكلاسيكي الأكثر طلباً، و ٩٩ درهماً للطبعة الملكية المسطحة، مع إمكانية التقسيط عبر تابي على ٤ دفعات ميسرة.*

#### Calls to Action (CTAs) & Internal Links
- Primary CTA: Button `Personalize Your Book Now` -> `/create/start`
- Secondary CTA: Button `Browse Bestseller Stories` -> `/all-books`
- Featured Book Links: `/books/the-secret-of-the-starlit-dunes`, `/books/the-child-who-found-the-golden-falcon`
- Related Hub Links: `/personalized-baby-gifts-dubai`, `/bilingual-children-books-arabic-english`, `/custom-storybook-for-kids-dubai`
- Trust Pages: `/delivery`, `/quality`, `/about-us`

---

### 2. `/personalized-baby-gifts-dubai` & `/ar/personalized-baby-gifts-dubai`

#### Search Query Target
- **English Query:** `personalized baby gifts dubai`, `personalized gifts for kids uae` (MSV: 1,200–2,500 | KD: 24)
- **Arabic Query:** `هدايا مواليد بالاسم دبي`, `هدايا مواليد فاخرة الإمارات` (MSV: 1,800–4,200 | KD: 28)

#### Metadata Configuration
- **English Title:** `Personalized Baby Gifts Dubai | Heirloom Newborn Keepsakes`
- **Arabic Title:** `أرقى هدايا مواليد بالاسم دبي | كتب تذكارية فاخرة للمولود الجديد`
- **English Description:** `The ultimate personalized baby gift in Dubai. Commemorate newborn milestones, Aqiqah, and 1st birthdays with luxury heirloom storybooks. Local 24–48h UAE delivery.`
- **Arabic Description:** `أجمل هدية تذكارية للمواليد بالاسم في دبي والإمارات. خلد ذكرى استقبال المولود، العقيقة، وعيد الميلاد الأول في كتاب فاخر بتغليف ملكي وتوصيل سريع لكافة المستشفيات والمنازل.`
- **Canonical EN:** `https://personalizedtales.com/personalized-baby-gifts-dubai`
- **Canonical AR:** `https://personalizedtales.com/ar/personalized-baby-gifts-dubai`

#### Headings & Semantic Content
- **English H1:** `Personalized Baby Gifts in Dubai — Heirloom Keepsake Books for Newborns`
- **Arabic H1:** `أرقى هدايا المواليد بالاسم في دبي — كتب وقصص تذكارية فاخرة للمواليد الجدد`
- **Subheading EN:** `Looking for a unique, enduring newborn gift in Dubai? Move beyond generic flowers and clothes with a custom storybook celebrating baby's arrival, birth stats, and family dedication.`
- **Subheading AR:** `تبحث عن هدية استثنائية تدوم للأبد لاستقبال مولود جديد في دبي؟ ابتعد عن الهدايا التقليدية واهدِ قصة تذكارية خالدة توثق اسم المولود وتاريخ قدومه بأفخم تجليد ملكي.`
- **Value Propositions:**
  1. *Permanent Heirloom vs Perishable Flowers:* Flowers wilt in 3 days; an heirloom storybook is cherished for decades.
  2. *Birth Stats Integration:* Personalize with baby's full name, birth date, hospital arrival time, and custom family dedication.
  3. *Luxury Keepsake Presentation Box:* Gold foil-embossed presentation box (39 AED add-on or bundled in Deluxe Layflat).
  4. *Direct Hospital & Home Delivery:* Fast courier dispatch to Latifa Hospital, American Hospital Dubai, Danat Al Emarat (Abu Dhabi), and private residences across the UAE.

#### People Also Ask (PAA) FAQs
1. **Q (EN):** *What makes a personalized storybook the best baby gift in Dubai?*  
   **A (EN):** *Unlike baby clothes that are outgrown in weeks or flowers that wilt, a personalized storybook becomes an heirloom keepsake that parents treasure and read to the child throughout their early years.*  
   **Q (AR):** *لماذا تُعد القصة المخصصة الهدية الأجمل للمولود الجديد في دبي؟*  
   **A (AR):** *لأنها تدوم للأبد! فالملابس يضيق مقاسها خلال أسابيع والورود تذبل سريعاً، بينما تبقى القصة المخصصة كنزاً عائلياً يقرأه الوالدان لطفلهما كل ليلة وتتوارثه الأجيال.*
2. **Q (EN):** *Can I include the baby's birth date and birth weight in the book?*  
   **A (EN):** *Yes. Our newborn keepsake edition, "When You Were Born", includes personalized fields for birth date, birth place, and a custom 400-character heartfelt dedication message.*  
   **Q (AR):** *هل يمكن إضافة تاريخ ميلاد الطفل ووزنه وإهداء خاص في الكتاب؟*  
   **A (AR):** *نعم بالتأكيد! تتضمن قصة "حين وُلدت" خانات مخصصة لتوثيق تاريخ ومكان الولادة مع صفحة إهداء عائلي كاملة تتسع لـ ٤٠٠ حرف مع الحفاظ التام على التشكيل العربي.*
3. **Q (EN):** *Is a personalized book appropriate for an Aqiqah or baby shower celebration?*  
   **A (EN):** *It is the premier gift choice across Dubai and Abu Dhabi. Accompanied by our gold foil gift box, it serves as a centerpiece present from grandparents, aunts, uncles, and close friends.*  
   **Q (AR):** *هل هذه القصة مناسبة كهدية لعقيقة أو حفل استقبال المولود (بيبي شاور)؟*  
   **A (AR):** *تُعد الخيار الأرقى والأكثر تميزاً في حفلات استقبال المواليد ومناسبات العقيقة في الإمارات، خاصة عند تقديمها داخل صندوق الهدايا الملكي بالختم الذهبي.*
4. **Q (EN):** *How fast can a personalized newborn gift be delivered in Dubai?*  
   **A (EN):** *Digital 3D flipbook keepsakes are delivered via private link in 5 minutes (perfect for immediate hospital visits), while physical printed editions arrive via courier in 24–48 hours across the UAE.*  
   **Q (AR):** *ما هي سرعة توصيل هدية المولود في دبي وأبوظبي؟*  
   **A (AR):** *يتم تسليم الكتاب الرقمي التفاعلي خلال ٥ دقائق عبر رابط خاص (مثالي للمفاجآت الفورية في المستشفى)، بينما تصل النسخة المطبوعة عبر التوصيل السريع خلال ٢٤-٤٨ ساعة لكافة مناطق الدولة.*

#### CTAs & Internal Links
- Primary CTA: `Create Newborn Keepsake Book` -> `/create/start?theme=newborn`
- Secondary CTA: `Inspect 3D Sample Book` -> `/sample-book`
- Featured Book Link: `/books/when-you-were-born-miracle-keepsake`
- Related Hub Links: `/personalized-books-dubai`, `/custom-storybook-for-kids-dubai`, `/bilingual-children-books-arabic-english`
- Top Name Links: `/personalized-books/for-zayed`, `/personalized-books/for-maryam`, `/personalized-books/for-noah`

---

### 3. `/bilingual-children-books-arabic-english` & `/ar/bilingual-children-books-arabic-english`

#### Search Query Target
- **English Query:** `bilingual children books arabic english dubai`, `arabic english storybooks uae` (MSV: 1,400–3,200 | KD: 19)
- **Arabic Query:** `قصص اطفال ثنائية اللغة عربي انجليزي`, `كتب اطفال ثنائية اللغة دبي` (MSV: 1,200–2,600 | KD: 20)

#### Metadata Configuration
- **English Title:** `Bilingual Children's Books Arabic & English Dubai | Tashkeel Vowels`
- **Arabic Title:** `قصص أطفال ثنائية اللغة عربي وإنجليزي دبي | فصحى مشكولة بالكامل`
- **English Description:** `Help your child master Arabic & English with personalized bilingual storybooks in Dubai. Dual-language rhyming spreads with full Tashkeel, aligned with KHDA & ADEK standards.`
- **Arabic Description:** `شجع طفلك على إتقان اللغتين العربية والإنجليزية مع قصص مخصصة باسمه في دبي. صفحات ثنائية اللغة متقابلة مع تشكيل كامل وتوافق تام مع مناهج هيئة المعرفة ودائرة التعليم.`
- **Canonical EN:** `https://personalizedtales.com/bilingual-children-books-arabic-english`
- **Canonical AR:** `https://personalizedtales.com/ar/bilingual-children-books-arabic-english`

#### Headings & Semantic Content
- **English H1:** `Bilingual Children's Books (Arabic & English) in Dubai — Starring Your Child`
- **Arabic H1:** `قصص أطفال ثنائية اللغة (عربي وإنجليزي) بالاسم في دبي — اجعل طفلك بطلاً بلغتين`
- **Subheading EN:** `Bridge the language gap in UAE schools. Dual-language storybooks featuring side-by-side English verse and authentic Modern Standard Arabic with 100% Tashkeel vowel markings.`
- **Subheading AR:** `جسر لغوي يربط بين الفصحى والإنجليزية في مدارس الإمارات. صفحات شعرية متقابلة بمفردات أصيلة وتشكيل دقيق يغرس حب اللغة العربية في نفوس الأجيال الصاعدة.`
- **Value Propositions:**
  1. *Side-by-Side Dual Spreads:* English on the left, Arabic on the right, synchronized rhythm and imagery.
  2. *100% Grammatically Verified Tashkeel:* Essential for KG1 to Year 4 readers to pronounce Fusha Arabic correctly without confusion.
  3. *KHDA & ADEK Curriculum Alignment:* Enhances foundational reading scores (PIRLS and internal literacy inspections) across UAE private schools.
  4. *Audio Narration QR Badge:* Interactive QR code on the back cover links to professional Arabic voiceover for listening practice.

#### People Also Ask (PAA) FAQs
1. **Q (EN):** *Are both Arabic and English printed side-by-side in the storybook?*  
   **A (EN):** *Yes. Each two-page spread presents the poetic English story on one side and the corresponding Modern Standard Arabic on the other, allowing parents and children to read along seamlessly in both languages.*  
   **Q (AR):** *هل تطبع النصوص العربية والإنجليزية جنباً إلى جنب في كل صفحة؟*  
   **A (AR):** *نعم، صُممت صفحاتنا بنظام متقابل متناغم: النص الإنجليزي في جانب يقابله النص العربي الفصيح في الجانب الآخر، مما يتيح للأهل والطفل تتبع القصة بسلاسة ومقارنة المفردات.*
2. **Q (EN):** *Are the Arabic verses fully vocalized with vowel marks (Tashkeel)?*  
   **A (EN):** *Every Arabic word is 100% voweled with Tashkeel (Fatha, Damma, Kasra, Sukun, Tanween, and Shaddah), curated by native linguists to ensure accurate reading and phonics practice for young learners.*  
   **Q (AR):** *هل الكلمات العربية مشكولة بالكامل بالحركات (التشكيل)؟*  
   **A (AR):** *نعم، تخضع كافة نصوصنا لمراجعة لغوية دقيقة ومشكولة بالكامل بنسبة ١٠٠٪ بالحركات والتنوين لتمكين المبتدئين من نطق الحروف نطقاً صحيحاً سليماً.*
3. **Q (EN):** *How do these books help children in Dubai private schools learn Arabic?*  
   **A (EN):** *With mandatory Arabic inspection frameworks in Dubai (KHDA) and Abu Dhabi (ADEK), having a personalized book where the child sees their own name heroically woven into Arabic adventures boosts reading engagement by over 40%.*  
   **Q (AR):** *كيف تدعم هذه القصص طلاب المدارس الدولية والخاصة في دبي؟*  
   **A (AR):** *وفقاً لمعايير هيئة المعرفة (KHDA) ودائرة التعليم (ADEK)، فإن رؤية الطفل لاسمه بطلاً في سياق عربي محبب يكسر حاجز صعوبة تعلم اللغة ويزيد من وقت القراءة بنسبة تتجاوز ٤٠٪.*
4. **Q (EN):** *Can I preview the bilingual verses before buying?*  
   **A (EN):** *Yes, our interactive 3D virtual flipbook lets you inspect every bilingual spread, text block, and illustration before placing your order.*  
   **Q (AR):** *هل يمكنني معاينة الأبيات ثنائية اللغة قبل تأكيد الشراء؟*  
   **A (AR):** *بالتأكيد، يوفر محرك المعاينة ثلاثية الأبعاد إمكانية تصفح جميع صفحات القصة وقراءة الأبيات العربية والإنجليزية كاملة والتأكد من مظهر الكتاب النهائي.*

#### CTAs & Internal Links
- Primary CTA: `Personalize a Bilingual Story` -> `/create/start`
- Secondary CTA: `Explore Bilingual Sample Spreads` -> `/sample-book`
- Featured Book Links: `/books/the-secret-of-the-starlit-dunes`, `/books/the-child-who-found-the-golden-falcon`
- Related Hub Links: `/personalized-books-dubai`, `/custom-storybook-for-kids-dubai`, `/personalized-baby-gifts-dubai`
- Top Name Links: `/personalized-books/for-hamdan`, `/personalized-books/for-fatima`, `/personalized-books/for-omar`

---

### 4. `/custom-storybook-for-kids-dubai` & `/ar/custom-storybook-for-kids-dubai`

#### Search Query Target
- **English Query:** `custom storybook for kids dubai`, `custom kids storybook uae` (MSV: 300–600 | KD: 22)
- **Arabic Query:** `قصص اطفال مخصصة الامارات`, `كتب قصص مخصصة للاطفال دبي` (MSV: 800–1,800 | KD: 18)

#### Metadata Configuration
- **English Title:** `Custom Storybook for Kids Dubai | 3D Interactive Live Preview`
- **Arabic Title:** `قصص أطفال مخصصة في دبي | اصنع قصة طفلك بمعاينة ثلاثية الأبعاد`
- **English Description:** `Create a custom storybook for kids in Dubai. Customize character hairstyles, skin tones, and dedications. 5-minute digital preview & 24h UAE courier delivery.`
- **Arabic Description:** `صمم قصة أطفال مخصصة بالكامل لطفلك في دبي. حدد تسريحة الشعر، لون البشرة، وأضف إهداءك الخاص. معاينة تفاعلية فورية وتوصيل لكافة الإمارات خلال ٢٤-٤٨ ساعة.`
- **Canonical EN:** `https://personalizedtales.com/custom-storybook-for-kids-dubai`
- **Canonical AR:** `https://personalizedtales.com/ar/custom-storybook-for-kids-dubai`

#### Headings & Semantic Content
- **English H1:** `Custom Storybook for Kids in Dubai — Instant 3D Preview & 24h UAE Delivery`
- **Arabic H1:** `قصص أطفال مصممة ومخصصة في دبي — معاينة ثلاثية الأبعاد وتوصيل محلي سريع`
- **Subheading EN:** `The homegrown UAE alternative to imported custom books. Tailor every adventure with bespoke character appearance, family dedications, and museum-grade local printing.`
- **Subheading AR:** `البديل الإماراتي المبتكر للكتب المستوردة. صمم مغامرة طفلك بنفسك مع خيارات تخصيص الملامح، الإهداء العائلي، والطباعة الفاخرة محلياً بأعلى مواصفات الإتقان.`
- **Value Propositions:**
  1. *Complete Character Customization:* Choose skin tone, hair color, hairstyles, glasses, and outfit accents.
  2. *Co-Star Family Characters:* Include Baba (Dad), Mama (Mom), or Grandparents inside the storyline.
  3. *Local Speed vs Overseas Delays:* 5-minute digital 3D book vs 14-day UK postal delays; 24–48h courier anywhere in the 7 Emirates.
  4. *High-Grade Archival Materials:* 200 GSM Mohawk silk paper, PUR-reinforced binding, child-safe vegetable Pantone inks.

#### People Also Ask (PAA) FAQs
1. **Q (EN):** *How do I make a custom storybook for my child in Dubai?*  
   **A (EN):** *It takes just 2 minutes: select your child's favorite adventure theme, type their name, customize character appearance (hair, skin tone, glasses), add your personal dedication, and preview the full 3D flipbook.*  
   **Q (AR):** *كيف يمكنني تصميم قصة مخصصة لطفلي في دبي؟*  
   **A (AR):** *يستغرق الأمر دقيقتين فقط: اختر عنوان القصة المفضل، اكتب اسم الطفل، حدد ملامحه (لون البشرة والشعر والنظارات)، أضف إهداءك الشخصي، ثم تصفح كامل الكتاب في المعاينة ثلاثية الأبعاد.*
2. **Q (EN):** *How is PersonalizedTales different from Wonderbly in Dubai?*  
   **A (EN):** *Unlike Wonderbly, PersonalizedTales offers authentic Arabic & bilingual editions with full Tashkeel, charges zero international customs or expensive freight fees, and delivers locally within 24–48 hours instead of 2 weeks from London.*  
   **Q (AR):** *ما الذي يميز حكاياتنا المخصصة عن موقع وندربلي (Wonderbly) في الإمارات؟*  
   **A (AR):** *نتميز بتقديم لغة عربية فصحى مشكولة بالكامل إلى جانب الإنجليزية، مع طباعة وتوصيل محلي خلال ٢٤-٤٨ ساعة دون رسوم شحن دولية باهظة أو انتظار لأسبوعين من أوروبا.*
3. **Q (EN):** *Can I customize character details like glasses and skin tones?*  
   **A (EN):** *Yes. Our customizer supports multiple hair styles, hair colors, nuanced skin tones, glasses, and cultural touches so every child feels genuinely represented.*  
   **Q (AR):** *هل يمكنني تخصيص تفاصيل مثل النظارات ولون البشرة؟*  
   **A (AR):** *نعم، يتيح محرك التخصيص اختيار درجات متنوعة للبشرة، تسريحات وألوان شعر مختلفة، إضافة نظارات طبية، وتفاصيل ملابس تعكس مظهر طفلك الحقيقي.*
4. **Q (EN):** *Can I write a personalized dedication message inside the book?*  
   **A (EN):** *Yes. You can write up to 400 characters of heartfelt dedication printed on page 1, complete with your name, date, and choice of pre-written poetic verses.*  
   **Q (AR):** *هل يمكنني كتابة إهداء شخصي يطبع داخل القصة؟*  
   **A (AR):** *نعم، نوفر صفحة إهداء مخصصة في مقدمة الكتاب تتسع لـ ٤٠٠ حرف لكتابة كلمات المحبة والدعاء باسم الوالدين أو الأقارب مع الحفاظ على التشكيل الكامل.*

#### CTAs & Internal Links
- Primary CTA: `Customize Your Story Now` -> `/create/start`
- Secondary CTA: `Compare Cover Finishes` -> `/quality`
- Featured Book Links: `/books/the-secret-of-the-starlit-dunes`, `/books/the-child-who-found-the-golden-falcon`
- Related Hub Links: `/personalized-books-dubai`, `/personalized-baby-gifts-dubai`, `/bilingual-children-books-arabic-english`
- Top Name Links: `/personalized-books/for-rashid`, `/personalized-books/for-liam`, `/personalized-books/for-sarah`

---

## Programmatic UAE Top 12 Child Names Hub

### Route Topology
- **English Routes:** `/personalized-books/for-[name]`
- **Arabic Routes:** `/ar/personalized-books/for-[name]`

### The 12 Canonical UAE Child Names Matrix

| # | Slug (`[name]`) | Name (EN) | Name (AR) | Gender | Demographic | Meaning (EN) | Meaning (AR) | Recommended Storybook Slug | Sibling Name Cross-Links |
|---|-----------------|-----------|-----------|--------|-------------|--------------|--------------|----------------------------|--------------------------|
| 1 | `zayed` | Zayed | زايد | boy | Emirati | One who increases in goodness, generosity, and noble grace | الذي يزيد في الخير والكرم والعطاء النبيل | `the-secret-of-the-starlit-dunes` | Rashid, Hamdan, Fatima, Mansoor, Omar |
| 2 | `fatima` | Fatima | فاطمة | girl | Emirati / Arab | Pure, noble soul, nurturing and virtuous | السيدة العفيفة الطاهرة، الحانية ذات المقام الرفيع | `the-child-who-found-the-golden-falcon` | Maryam, Zayed, Aisha, Sarah, Layla |
| 3 | `hamdan` | Hamdan | حمدان | boy | Emirati | One who constantly praises and is praiseworthy | الكثير الحمد والثناء والشكر، ذو الخصال المحمودة | `the-secret-of-the-starlit-dunes` | Zayed, Rashid, Omar, Ali, Fatima |
| 4 | `maryam` | Maryam | مريم | girl | Emirati / Arab | Beloved, elevated, symbol of grace and purity | السيدة العفيفة رفيعة القدر، رمز الطهر والجمال | `the-child-who-found-the-golden-falcon` | Fatima, Sarah, Layla, Zayed, Noah |
| 5 | `rashid` | Rashid | راشد | boy | Emirati | Rightly guided, wise, mature and discerning leader | المهتدي إلى الحق، الحكيم ذو الرأي السديد والشهامة | `the-secret-of-the-starlit-dunes` | Zayed, Hamdan, Ali, Omar, Fatima |
| 6 | `noah` | Noah | نوح | boy | Global / Expat | Rest, peace, comfort and tranquil sanctuary | الراحة والهدوء والسكينة والسلام الدائم | `the-secret-of-the-starlit-dunes` | Liam, Olivia, Leo, Sarah, Zayed |
| 7 | `olivia` | Olivia | أوليفيا | girl | Global / Expat | Olive branch of peaceful beauty, kindness, and harmony | غصن الزيتون، رمز السلام والجمال والتناغم | `the-child-who-found-the-golden-falcon` | Noah, Liam, Sarah, Layla, Fatima |
| 8 | `liam` | Liam | ليام | boy | Global / Expat | Resolute protector and strong-willed guardian | الحامي القوي ذو العزيمة الصلبة والإرادة الشجاعة | `the-secret-of-the-starlit-dunes` | Noah, Olivia, Zayed, Omar, Sarah |
| 9 | `sarah` | Sarah | سارة | girl | Arab / Global | Joyful princess who brings radiant happiness to hearts | الأميرة البهيجة، مفرحة القلوب ومصدر السرور | `the-child-who-found-the-golden-falcon` | Maryam, Fatima, Layla, Olivia, Noah |
| 10 | `omar` | Omar | عمر | boy | Emirati / Arab | Flourishing, long-lived, symbol of justice and vitality | صاحب العمر المديد والعدل والهمة العالية | `the-secret-of-the-starlit-dunes` | Ali, Zayed, Rashid, Hamdan, Fatima |
| 11 | `ali` | Ali | علي | boy | Emirati / Arab | High, exalted, elevated in honor and noble standing | الشريف الرفيع، صاحب المنزلة السامية والشجاعة | `the-secret-of-the-starlit-dunes` | Omar, Zayed, Rashid, Hamdan, Maryam |
| 12 | `layla` | Layla | ليلى | girl | Arab / Global | Enchanting nocturnal beauty, star of poetic wonder | الجمال الساحر، نجمة الليالي الشاعرية والهدوء | `the-child-who-found-the-golden-falcon` | Sarah, Maryam, Fatima, Olivia, Zayed |

### Per-Name Dynamic SEO Metadata Formula
- **Title (EN):** `Personalized Storybook for [Name] | 3D Interactive Flipbook (Dubai, UAE)`
- **Title (AR):** `قصة أطفال مخصصة باسم [الاسم] | كتاب تفاعلي ثلاثي الأبعاد الإمارات`
- **Description (EN):** `Make [Name] the hero of their own magical adventure in Dubai! Bilingual English & Arabic rhyming text with full Tashkeel, 3D flipbook preview, and 24–48h UAE delivery.`
- **Description (AR):** `اجعل [الاسم] بطل مغامرة ساحرة مخصصة في دبي! قصة شعرية ثنائية اللغة عربي وإنجليزي مشكولة بالكامل مع معاينة ثلاثية الأبعاد وتوصيل لكافة الإمارات خلال ٢٤-٤٨ ساعة.`
- **H1 (EN):** `Personalized Storybook for [Name] — Star of Their Own Dubai Adventure`
- **H1 (AR):** `قصة أطفال مخصصة باسم [الاسم] — بطل المغامرة الساحرة في دبي`
- **Subtext (EN):** `Starring [Name] ([MeaningEn]). Tailored with authentic bilingual verses, artisan binding, and instant 3D interactive flipbook reader.`
- **Subtext (AR):** `بطولة [الاسم] ([MeaningAr]). مصممة بنصوص شعرية ثنائية اللغة وتجليد كلاسيكي فاخر ومعاينة تفاعلية فورية.`
- **Direct Funnel CTA:** `/create/start?book=[RecommendedSlug]&name=[Name]&gender=[gender]`

---

## Technical SEO Architecture & Schemas

### 1. JSON-LD Multi-Entity Schema Structure
Every landing page and programmatic name page must inject a `<script type="application/ld+json">` tag with an authoritative `@graph` structure.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": "https://personalizedtales.com/personalized-books-dubai#product",
      "name": "Personalized Children's Book (Dubai & UAE Edition)",
      "image": "https://personalizedtales.com/competitor_wonderbly_spread_1788709121360.jpg",
      "description": "An heirloom-grade personalized bilingual storybook starring your child across Dubai and the UAE. Features 200 GSM archival paper, 3D interactive flipbook preview, and local 24-48h courier delivery.",
      "brand": {
        "@type": "Brand",
        "name": "PersonalizedTales"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.96",
        "reviewCount": "428",
        "bestRating": "5",
        "worstRating": "1"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "AED",
        "lowPrice": "49.00",
        "highPrice": "99.00",
        "offerCount": "3",
        "price": "49.00",
        "availability": "https://schema.org/InStock",
        "url": "https://personalizedtales.com/personalized-books-dubai",
        "seller": {
          "@type": "Organization",
          "name": "PersonalizedTales UAE"
        }
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://personalizedtales.com/personalized-books-dubai#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Where can I get a personalized book printed in Dubai?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "PersonalizedTales prints and dispatches heirloom-grade personalized books directly in the UAE. Orders are printed on 200 GSM archival paper in Dubai and delivered across all 7 Emirates within 24 to 48 hours, with instant 3D digital flipbooks ready in 5 minutes."
          }
        },
        {
          "@type": "Question",
          "name": "How long does delivery take in Dubai and the UAE?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Digital 3D flipbooks are ready in 5 minutes, while physical books are printed locally and delivered by express courier within 24–48 hours across Abu Dhabi, Dubai, Sharjah, and all Emirates."
          }
        },
        {
          "@type": "Question",
          "name": "Does the book include both Arabic and English text?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Every spread features side-by-side bilingual storytelling: poetic English paired with Modern Standard Arabic (Fusha) complete with full Tashkeel vowel markings."
          }
        },
        {
          "@type": "Question",
          "name": "How much do personalized books cost in Dubai?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Softcover edition is 49 AED, Classic Hardcover is 79 AED, and Deluxe Layflat is 99 AED. All prices are in pure UAE Dirhams with Tabby 4 interest-free installments available."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://personalizedtales.com/personalized-books-dubai#breadcrumbs",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://personalizedtales.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Personalized Books Dubai",
          "item": "https://personalizedtales.com/personalized-books-dubai"
        }
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://personalizedtales.com/#organization",
      "name": "PersonalizedTales",
      "url": "https://personalizedtales.com",
      "logo": "https://personalizedtales.com/apple-icon.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dubai",
        "addressRegion": "Dubai",
        "addressCountry": "AE"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://personalizedtales.com/#website",
      "name": "PersonalizedTales UAE",
      "url": "https://personalizedtales.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://personalizedtales.com/all-books?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
}
```

### 2. Bi-directional Hreflang & Canonical Specification

For any given canonical path (e.g. `path = "/personalized-books-dubai"`):
```typescript
alternates: {
  canonical: `https://personalizedtales.com${path}`,
  languages: {
    'en-AE': `https://personalizedtales.com${path}`,
    'ar-AE': `https://personalizedtales.com/ar${path}`,
    'x-default': `https://personalizedtales.com${path}`,
  },
}
```
For Arabic pages:
```typescript
alternates: {
  canonical: `https://personalizedtales.com/ar${path}`,
  languages: {
    'en-AE': `https://personalizedtales.com${path}`,
    'ar-AE': `https://personalizedtales.com/ar${path}`,
    'x-default': `https://personalizedtales.com${path}`,
  },
}
```

### 3. Dynamic Sitemap (`sitemap.ts`) Specifications

The `web/app/sitemap.ts` must export entries for:
1. **The 4 High-Intent UAE Landing Pages** using `makeBilingualEntries`:
   - `/personalized-books-dubai` (Priority 0.95, daily)
   - `/personalized-baby-gifts-dubai` (Priority 0.95, daily)
   - `/bilingual-children-books-arabic-english` (Priority 0.95, daily)
   - `/custom-storybook-for-kids-dubai` (Priority 0.95, daily)
2. **Top 12 UAE Child Names Programmatic Hub** using `makeBilingualEntries`:
   - `/personalized-books/for-[name]` (Priority 0.85, weekly) for each of the 12 canonical names.

---

## Design System & Typography Tokens

To ensure 100% visual fidelity with the Wonderbly-grade design system:
- **Backgrounds:** Kraft paper tones `#FDF8F1` (`--paper-warm`), pure kraft `#FBF4E8`.
- **Accents:** Racing Green `#1E5751` (primary CTA buttons, badges, banners), Tinkerbell Mint `#C1F1A1`, Mustard `#FFD15A`.
- **Borders & Radii:** Strict 2px sharp editorial radius (`rounded-[2px]`).
- **Typography:**
  - Headings (EN): `font-serif` (Fraunces serif) with luxury tracking and line heights.
  - Body & UI (EN): `font-sans` (Inter) for clean, legibility.
  - Arabic (AR): `font-amiri` (Amiri display) with RTL container (`dir="rtl"`), ensuring full Tashkeel vowel marks render crisply without font clipping.

---

## Verification & Automated Test Strategy

To fulfill the Acceptance Criteria, an automated test file `tests/test_uae_seo_domination_suite.mjs` must be implemented.

### Verification Checklist for `test_uae_seo_domination_suite.mjs`:
1. **Route Existence & Status (Static & Runtime):**
   - Check that all page files exist on disk:
     - `web/app/personalized-books-dubai/page.tsx` & `web/app/ar/personalized-books-dubai/page.tsx`
     - `web/app/personalized-baby-gifts-dubai/page.tsx` & `web/app/ar/personalized-baby-gifts-dubai/page.tsx`
     - `web/app/bilingual-children-books-arabic-english/page.tsx` & `web/app/ar/bilingual-children-books-arabic-english/page.tsx`
     - `web/app/custom-storybook-for-kids-dubai/page.tsx` & `web/app/ar/custom-storybook-for-kids-dubai/page.tsx`
     - `web/app/personalized-books/for-[name]/page.tsx` (or `[slug]/page.tsx`) & Arabic counterpart.
2. **JSON-LD Schema Assertions:**
   - Verify Product schema has `priceCurrency: "AED"`, prices `49.00`, `79.00`, `99.00`, `availability: "https://schema.org/InStock"`, `ratingValue: "4.96"`, `reviewCount: "428"`.
   - Verify FAQPage schema contains 4 valid Question/Answer pairs.
   - Verify BreadcrumbList schema with position indices.
   - Verify Organization & WebSite schemas.
3. **Hreflang & Canonical Assertions:**
   - Verify `en-AE`, `ar-AE`, and `x-default` links exist in alternates metadata.
4. **Sitemap Assertions:**
   - Execute or parse `web/app/sitemap.ts` to confirm all 16 target URLs (8 landing + 24 name routes) are present in the sitemap output.
5. **No Regressions on Core Test Gates:**
   - Confirm all 154 existing tests pass:
     - `python3 tests/run_e2e_suite.py` (62/62)
     - `node tests/test_header_search_and_countdown_stress.mjs` (47/47)
     - `node tests/test_m5_trust_components.mjs` (25/25)
     - `node tests/test_challenger_empirical_validation.mjs` (20/20)

---
*Report compiled and certified by Specification Miner `explorer_survey_1`.*
