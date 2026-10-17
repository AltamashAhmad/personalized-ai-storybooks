# 05. Product Specifications & Technical Architecture

## High-Level Architecture Overview

```
[ Next.js 14 Web / Mobile PWA ] (Tailwind + Framer Motion + 3D Flipbook)
           │
           ▼
[ Fast Next.js API Routes / NestJS Orchestrator ]
  ├── 1. Auth & Profiles: Supabase / PostgreSQL
  ├── 2. Story Generation: Google Gemini 1.5 Flash API (Bilingual, fast, structured JSON)
  ├── 3. Consistency & Art: Flux.1 / Ideogram API via fal.ai or Replicate
  ├── 4. Audio Narration: ElevenLabs API (Warm bedtime storytelling voice)
  ├── 5. PDF Engine: @react-pdf/renderer + Sharp (300 DPI CMYK print-ready)
  └── 6. Fulfillment: Gelato API / Lulu xPress API (Global) + Local UAE Print Partner
```

---

## 1. The Story Generation Pipeline (Gemini 1.5 Flash)

* **Prompt Framework:**
  * Inputs: Child Name, Age, Gender, 2 Hobbies (e.g. Soccer, Space), 1 Moral Lesson (e.g. Sharing, Bravery), Language Mode (`en`, `ar`, `en-ar`).
  * System Prompt constraints: Strictly generates a 12-spread story (24 pages), age-graded vocabulary, rhythmic rhyming meter, and precise visual scene descriptions for the illustration engine.
  * For Arabic: Automatically formats Arabic text with Tashkeel marks and RTL alignment.
* **Latency:** Generates complete 12-page structured JSON in under 3.5 seconds.

---

## 2. The Image Generation & Character Consistency Pipeline

* **Base Model:** Flux.1 Schnell / Dev via `fal.ai` (cost: ~$0.025 per image, generation time ~2 seconds).
* **Style Anchor:** A locked master prompt defining the art style:
  `"Whimsical watercolor and soft gouache children's storybook illustration, warm lighting, vibrant colors, gentle pastels, award-winning picture book art, masterwork, 8k resolution"`.
* **Character Consistency:** 
  * Generation of a 4-view character reference sheet upon child customization.
  * Using image-to-image reference (IP-Adapter or character seed locking) so the character's clothing, hair, skin tone, and features remain identical in every scene.

---

## 3. High-Resolution Print-Ready PDF Engine

* **Standard:** ISO 12647-2 certified 300 DPI CMYK PDF with 3mm bleed margin and crop marks.
* **Engine:** Node.js worker using `Sharp` for ultra-high-resolution image composition and `@react-pdf/renderer` or `Puppeteer` for precision typography layout.
* **Storage:** PDFs stored securely in Cloudflare R2 / AWS S3 with signed time-limited download URLs.

---

## 4. Print-on-Demand Automation Pipeline

* When order status switches to `PAID`:
  1. Webhook triggers PDF compiler.
  2. High-res CMYK PDF generated within 30 seconds.
  3. Order dispatched via REST API to **Gelato** (for US, UK, Europe orders) or **Local UAE Press** (for UAE/GCC orders).
  4. Tracking number automatically synced back to Supabase and emailed to customer via Resend.