import re

target_path = "/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/MASTER_PROJECT_BLUEPRINT_AND_NOTES.md"

with open(target_path, "r", encoding="utf-8") as f:
    content = f.read()

# Update Section 2 Story Engine & Scope
old_section = """### The Core Digital Package: "The Magic Digital Keepsake"
* **Customer Receives:**
  1. **Interactive 3D Web Flippable Storybook:** Private link (e.g. `[brand]/read/[id]`), works on iPad, tablet, iPhone, laptop with smooth page-turn animations.
  2. **High-Resolution 300 DPI Keepsake PDF:** Ready for home printing or archiving forever.
  3. **AI Bedtime Audio Narration:** High-quality soothing voice with ambient lullaby music accessible via web player and downloadable MP3.
* **Pricing:**
  * **UAE Market:** **49 AED** (~$13.34 USD)
  * **US / Global Market:** **$12.99 USD** / **£10.99 GBP** / **€12.99 EUR**
* **Granular Unit Economics:**
  * AI Story Engine (Gemini 1.5 Flash): 0.05 AED ($0.01)
  * AI Image Illustrations (12 pages via Flux API on fal.ai): 1.35 AED ($0.36)
  * AI Audio Narration (ElevenLabs Multilingual v2): 0.40 AED ($0.11)
  * Payment Processing (LemonSqueezy 5% + $0.50): 2.90 AED ($0.79)
  * Cloud CDN Hosting & PDF Delivery: 0.10 AED ($0.03)
  * **Total Cost of Goods Sold (COGS):** **4.80 AED (~$1.30 USD)**
  * **Net Profit per Sale:** **44.20 AED (~$12.04 USD) -> 90.2% Net Margin!**"""

new_section = """### The Core Digital Package: "The Magic Digital Keepsake" (Phase 1 Scope)
* **Customer Receives:**
  1. **Interactive 3D Web Flippable Storybook:** Private link (e.g. `[brand]/read/[id]`), works on iPad, tablet, iPhone, laptop with smooth page-turn animations.
  2. **High-Resolution 300 DPI Keepsake PDF:** Ready for home printing or archiving forever.
  *(Note: Audio Narration intentionally postponed to Phase 2 to streamline launch and serve as a future upsell).*
* **Pricing:**
  * **UAE Market:** **49 AED** (~$13.34 USD)
  * **US / Global Market:** **$12.99 USD** / **£10.99 GBP** / **€12.99 EUR**
* **Premium Unit Economics (Zero Quality Compromise):**
  * Premium Story Engine (**Claude 3.5 Sonnet / GPT-4o** - Best in class literary prose): 0.25 AED ($0.07)
  * AI Image Illustrations (12 pages via Flux API on fal.ai): 1.35 AED ($0.36)
  * Payment Processing (LemonSqueezy 5% + $0.50): 2.90 AED ($0.79)
  * Cloud CDN Hosting & PDF Delivery: 0.10 AED ($0.03)
  * **Total Cost of Goods Sold (COGS):** **4.60 AED (~$1.25 USD)**
  * **Net Profit per Sale:** **44.40 AED (~$12.09 USD) -> 90.6% Net Margin!**"""

content = content.replace(old_section, new_section)

with open(target_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated MASTER_PROJECT_BLUEPRINT_AND_NOTES.md successfully.")
