/**
 * Test Suite: Milestone M5 Corporate Trust Components Verification
 * Target: DeliveryView.tsx, QualityView.tsx, AboutUsView.tsx
 */

import fs from "fs";
import path from "path";
import assert from "assert";

console.log("=".repeat(80));
console.log("🏛️  M5 TRUST & INFORMATIONAL PAGES EMPIRICAL VERIFICATION SUITE");
console.log("=".repeat(80));

const WEB_DIR = path.resolve("web");
const COMPONENTS_DIR = path.join(WEB_DIR, "components");

function readComponent(fileName) {
  const filePath = path.join(COMPONENTS_DIR, fileName);
  assert(fs.existsSync(filePath), `Component file missing: ${filePath}`);
  return fs.readFileSync(filePath, "utf-8");
}

let passed = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// ============================================================================
// SUITE 1: DeliveryView.tsx Verification
// ============================================================================
console.log("\n--- SUITE 1: DeliveryView.tsx Specification Integrity ---");
const deliveryCode = readComponent("DeliveryView.tsx");

test("DeliveryView exports default function and accepts initialLang prop", () => {
  assert(deliveryCode.includes("export default function DeliveryView({ initialLang }"));
});

test("DeliveryView includes Hero Stats (5 Mins, 24-48h, 7 Emirates, Free Shipping)", () => {
  assert(deliveryCode.includes("5 Minutes") && deliveryCode.includes("٥ دقائق"));
  assert(deliveryCode.includes("24–48h") || deliveryCode.includes("24-48h"));
  assert(deliveryCode.includes("7 Emirates") && deliveryCode.includes("٧ إمارات"));
  assert(deliveryCode.includes("Free Shipping") && deliveryCode.includes("شحن مجاني"));
  assert(deliveryCode.includes("100 AED") || deliveryCode.includes("١٠٠ د.إ"));
});

test("DeliveryView includes 7 Emirates Delivery Timetable with all regions", () => {
  const emirates = [
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Ajman",
    "Ras Al Khaimah",
    "Fujairah",
    "Umm Al Quwain",
  ];
  for (const emirate of emirates) {
    assert(deliveryCode.includes(emirate), `Missing emirate in table: ${emirate}`);
  }
});

test("DeliveryView specifies calibrated SLAs for each Emirate", () => {
  assert(deliveryCode.includes("24h Express") || deliveryCode.includes("24 Hours (24h)"));
  assert(deliveryCode.includes("24-36h Premium") || deliveryCode.includes("24–36 Hours"));
  assert(deliveryCode.includes("24-48h Standard") || deliveryCode.includes("24–48 Hours"));
  assert(deliveryCode.includes("36–48 Hours") || deliveryCode.includes("36-48h"));
  assert(deliveryCode.includes("48 Hours"));
});

test("DeliveryView includes Digital Flipbook instant 5-minute delivery section", () => {
  assert(deliveryCode.includes("3D Virtual Flipbook") || deliveryCode.includes("القارئ التفاعلي ثلاثي الأبعاد"));
  assert(deliveryCode.includes("300 DPI"));
  assert(deliveryCode.includes("WhatsApp") || deliveryCode.includes("الواتساب"));
});

test("DeliveryView includes WhatsApp live courier tracking callout", () => {
  assert(deliveryCode.includes("Live WhatsApp Tracking") || deliveryCode.includes("تتبع مباشر"));
  assert(deliveryCode.includes("GPS"));
  assert(deliveryCode.includes("PT-8429") || deliveryCode.includes("Order Confirmed & Printing"));
});

test("DeliveryView includes Delivery FAQ mini-section with top 3 questions", () => {
  assert(deliveryCode.includes("deliveryFaqs") || deliveryCode.includes("toggleFaq"));
  assert(deliveryCode.includes("openFaqIndex"));
  assert(deliveryCode.includes("ChevronDown"));
});

// ============================================================================
// SUITE 2: QualityView.tsx Verification
// ============================================================================
console.log("\n--- SUITE 2: QualityView.tsx Specification Integrity ---");
const qualityCode = readComponent("QualityView.tsx");

test("QualityView exports default function and accepts initialLang prop", () => {
  assert(qualityCode.includes("export default function QualityView({ initialLang }"));
});

test("QualityView details 200 GSM Mohawk Silk Uncoated paper specification", () => {
  assert(qualityCode.includes("200 GSM") || qualityCode.includes("200gsm"));
  assert(qualityCode.includes("Mohawk"));
  assert(qualityCode.includes("Uncoated") || qualityCode.includes("Silk"));
  assert(qualityCode.includes("موهوك"));
});

test("QualityView details 180° Layflat and PUR-reinforced binding durability", () => {
  assert(qualityCode.includes("Layflat") || qualityCode.includes("مسطح"));
  assert(qualityCode.includes("180"));
  assert(qualityCode.includes("PUR"));
  assert(qualityCode.includes("10,000"));
});

test("QualityView details 100% vegetable-based Pantone inks with EN71-3 certification", () => {
  assert(qualityCode.includes("vegetable") || qualityCode.includes("نباتية"));
  assert(qualityCode.includes("EN71-3"));
  assert(qualityCode.includes("Pantone") || qualityCode.includes("بانتون"));
});

test("QualityView details 8.5\" x 8.5\" square heirloom keepsake format", () => {
  assert(qualityCode.includes("8.5") || qualityCode.includes("210mm"));
  assert(qualityCode.includes("210"));
});

test("QualityView details FSC Mix certification and 100+ year archival longevity", () => {
  assert(qualityCode.includes("FSC Mix") || qualityCode.includes("FSC"));
  assert(qualityCode.includes("100+ Year") || qualityCode.includes("١٠٠ عام"));
  assert(qualityCode.includes("Acid-free") || qualityCode.includes("خالٍ من الأحماض"));
});

test("QualityView details cover finishes comparison with calibrated 49 / 79 / 99 AED pricing", () => {
  assert(qualityCode.includes("49.00 AED"));
  assert(qualityCode.includes("79.00 AED"));
  assert(qualityCode.includes("99.00 AED"));
  assert(!qualityCode.includes("129") && !qualityCode.includes("169"), "Obsolete 129/169 AED prices must not appear!");
  assert(qualityCode.includes("Softcover"));
  assert(qualityCode.includes("Hardcover"));
  assert(qualityCode.includes("Deluxe"));
});

test("QualityView includes Heirloom Guarantee lifetime replacement promise", () => {
  assert(qualityCode.includes("Heirloom Guarantee") || qualityCode.includes("ضمان الذكرى الخالدة"));
  assert(qualityCode.includes("Lifetime Free Replacement") || qualityCode.includes("استبدال مدى الحياة"));
});

test("QualityView includes interactive 4-layer anatomy inspector", () => {
  assert(qualityCode.includes("activeLayer") && qualityCode.includes("setActiveLayer"));
  assert(qualityCode.includes("layers"));
});

// ============================================================================
// SUITE 3: AboutUsView.tsx Verification
// ============================================================================
console.log("\n--- SUITE 3: AboutUsView.tsx Specification Integrity ---");
const aboutCode = readComponent("AboutUsView.tsx");

test("AboutUsView exports default function and accepts initialLang prop", () => {
  assert(aboutCode.includes("export default function AboutUsView({ initialLang }"));
});

test("AboutUsView features UAE founding story: 'Born in Abu Dhabi, Made for Every Emirates Child'", () => {
  assert(aboutCode.includes("Born in Abu Dhabi, Made for Every Emirates Child") || aboutCode.includes("Born in Abu Dhabi"));
  assert(aboutCode.includes("أبوظبي") && aboutCode.includes("Abu Dhabi"));
});

test("AboutUsView details mission: complete Arabic Tashkeel alongside English narratives", () => {
  assert(aboutCode.includes("Tashkeel") || aboutCode.includes("التشكيل"));
  assert(aboutCode.includes("Modern Standard Arabic") || aboutCode.includes("الفصحى"));
  assert(aboutCode.includes("Bilingual") || aboutCode.includes("ثنائية"));
});

test("AboutUsView features Artisan Print Studio in the UAE", () => {
  assert(aboutCode.includes("Artisan Print Studio in UAE") || aboutCode.includes("الحرفية"));
  assert(aboutCode.includes("Zero-Waste") || aboutCode.includes("الهدر"));
  assert(aboutCode.includes("On-Demand") || aboutCode.includes("الطلب"));
});

test("AboutUsView includes 'Our Story Weavers' team section with authentic profiles", () => {
  assert(aboutCode.includes("Fatima Al-Nuaimi") || aboutCode.includes("فاطمة النعيمي"));
  assert(aboutCode.includes("Marcus Lindqvist") || aboutCode.includes("ماركوس ليندكفيست"));
  assert(aboutCode.includes("Dr. Tariq Mansoor") || aboutCode.includes("د. طارق منصور"));
  assert(aboutCode.includes("Zayan Al-Khatib") || aboutCode.includes("زيان الخطيب"));
});

test("AboutUsView includes '1,000+ Books, 1,000+ Smiles' impact counter and school partnerships", () => {
  assert(aboutCode.includes("1,000+ Books, 1,000+ Smiles") || aboutCode.includes("١,٠٠٠+ كتاب"));
  assert(aboutCode.includes("1,850+"));
  assert(aboutCode.includes("ADEK") && aboutCode.includes("KHDA"));
  assert(aboutCode.includes("Graduation") || aboutCode.includes("تخرج"));
});

// ============================================================================
// SUITE 4: Cross-Route Bilingual & Prerender Parity
// ============================================================================
console.log("\n--- SUITE 4: Cross-Route Bilingual Parity ---");

test("DeliveryView provides authentic Arabic translations and RTL support", () => {
  assert(deliveryCode.includes("dir={currentDir}"));
  assert(deliveryCode.includes("isAr"));
  assert(deliveryCode.includes("دبي") && deliveryCode.includes("أبوظبي") && deliveryCode.includes("الشارقة"));
});

test("QualityView provides authentic Arabic translations and RTL support", () => {
  assert(qualityCode.includes("dir={currentDir}"));
  assert(qualityCode.includes("isAr"));
  assert(qualityCode.includes("موهوك") && qualityCode.includes("أحبار نباتية"));
});

test("AboutUsView provides authentic Arabic translations and RTL support", () => {
  assert(aboutCode.includes("dir={currentDir}"));
  assert(aboutCode.includes("isAr"));
  assert(aboutCode.includes("قصتنا ورؤيتنا") && aboutCode.includes("حكايات مخصصة"));
});

console.log("\n" + "=".repeat(80));
console.log(`📊 M5 TRUST SUITE COMPLETE: ${passed} Passed | 0 Failed`);
console.log("=".repeat(80));
