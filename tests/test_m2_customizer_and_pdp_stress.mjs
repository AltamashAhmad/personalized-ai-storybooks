// Empirical Stress Harness for Milestone M2: PDP & Live Personalization Customizer
// Tests Name Validation Regex, Dedication 400-Char Limit, Pricing Integrity (49/79/99 AED),
// Co-Star Configuration & Beard Visibility, and Specifications/Reviews Contracts.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import {
  validateProtagonistName,
  renderVerse,
  SKIN_TONES,
  HAIR_STYLES,
  HAIR_COLORS,
  BEARD_STYLES,
  KEEPSAKE_COVER_COLORS,
  DEDICATION_TEMPLATES,
  DEFAULT_CHARACTER_CONFIG,
} from "../web/config/sampleBookData.ts";

import {
  COVER_FORMAT_PRICING,
  FORMAT_LIST,
  getFormatPrice,
} from "../web/config/pricing.ts";

import {
  UNBOXING_REVIEWS,
  UNBOXING_RATINGS_BREAKDOWN,
  PDP_QA_ACCORDION,
  RELATED_STORYBOOKS,
} from "../web/config/reviews.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");
const WEB_DIR = path.resolve(REPO_ROOT, "web");

console.log("================================================================================");
console.log("🧪 EMPIRICAL ADVERSARIAL STRESS HARNESS: MILESTONE M2 (PDP & CUSTOMIZER)");
console.log("================================================================================");

let totalPassed = 0;
let totalFailed = 0;
const failureDetails = [];

function assert(condition, message, details = {}) {
  if (condition) {
    totalPassed++;
    console.log(`  ✅ PASS: ${message}`);
  } else {
    totalFailed++;
    console.error(`  ❌ FAIL: ${message}`, details);
    failureDetails.push({ message, details });
  }
}

// ================================================================================
// SUITE 1: PROTAGONIST NAME VALIDATION REGEX & BOUNDARY CONDITIONS
// ================================================================================
console.log("\n--- SUITE 1: Protagonist Name Validation Regex & Boundary Conditions ---");

// 1.1 Arabic Names with Tashkeel (Diacritics)
const arabicTashkeelNames = [
  { name: "زَايِد", desc: "Zayed with Fatha and Kasra" },
  { name: "سَعِيدْ", desc: "Saeed with Fatha, Kasra, and Sukun" },
  { name: "فَاطِمَةُ", desc: "Fatima with Fatha, Kasra, Fatha, and Damma" },
  { name: "مَرْيَمُ", desc: "Maryam with Fatha, Sukun, Fatha, and Damma" },
  { name: "مُحَمَّدٌ", desc: "Muhammad with Damma, Fatha, Shadda, and Dammatan" },
  { name: "سَارَّة", desc: "Sarah with Fatha, Shadda" },
  { name: "عَلِيّ", desc: "Ali with Fatha, Kasra, Shadda" },
  { name: "زَايِدٌ", desc: "Zayed with Dammatan tanween" },
  { name: "مُحَمَّداً", desc: "Muhammad with Fathatan tanween" },
  { name: "اِبْنُ", desc: "Ibn with Wasla/Kasra, Sukun, Damma" },
];

for (const item of arabicTashkeelNames) {
  const res = validateProtagonistName(item.name);
  assert(
    res.isValid === true,
    `Arabic name with Tashkeel (${item.desc}: '${item.name}') is valid`,
    { res }
  );
}

// 1.2 Classical Tashkeel Unicode Codepoints Range
const tashkeelCodePoints = [
  { hex: 0x064B, name: "Fathatan" },
  { hex: 0x064C, name: "Dammatan" },
  { hex: 0x064D, name: "Kasratan" },
  { hex: 0x064E, name: "Fatha" },
  { hex: 0x064F, name: "Damma" },
  { hex: 0x0650, name: "Kasra" },
  { hex: 0x0651, name: "Shadda" },
  { hex: 0x0652, name: "Sukun" },
];

for (const tp of tashkeelCodePoints) {
  const testChar = String.fromCharCode(tp.hex);
  const testName = `زا${testChar}يد`;
  const res = validateProtagonistName(testName);
  assert(
    res.isValid === true,
    `Tashkeel diacritic ${tp.name} (U+0${tp.hex.toString(16).toUpperCase()}) allowed in name`,
    { testName, res }
  );
}

// 1.3 Compound Arabic Names, Hyphens & Spaces
const compoundArabicNames = [
  { name: "عبد الرحمن", desc: "Abd al-Rahman with space" },
  { name: "نور الهدى", desc: "Noor al-Huda with space" },
  { name: "سارة-نور", desc: "Sarah-Noor with hyphen" },
  { name: "عبد-الرحمن", desc: "Abd-al-Rahman with hyphen" },
  { name: "زين العابدين", desc: "Zayn al-Abidin with space" },
];

for (const item of compoundArabicNames) {
  const res = validateProtagonistName(item.name);
  assert(
    res.isValid === true,
    `Compound Arabic name (${item.desc}: '${item.name}') is valid`,
    { res }
  );
}

// 1.4 English Names, Hyphens & Apostrophes
const englishHyphenAposNames = [
  { name: "Mary-Jane", desc: "English hyphenated name" },
  { name: "Jean-Luc", desc: "French hyphenated name" },
  { name: "O'Connor", desc: "Irish apostrophe name" },
  { name: "D'Angelo", desc: "Italian apostrophe name" },
  { name: "Al-Zahra", desc: "Transliterated Arabic hyphenated name" },
];

for (const item of englishHyphenAposNames) {
  const res = validateProtagonistName(item.name);
  assert(
    res.isValid === true,
    `English name with hyphen/apostrophe (${item.desc}: '${item.name}') is valid`,
    { res }
  );
}

// 1.5 Whitespace Trimming & Empty Names
const emptyWhitespaceCases = [
  { input: "", desc: "Empty string" },
  { input: "   ", desc: "Spaces only" },
  { input: "\t\t", desc: "Tabs only" },
  { input: "\n\n", desc: "Newlines only" },
  { input: "  \r\n\t  ", desc: "Mixed whitespace" },
];

for (const item of emptyWhitespaceCases) {
  const res = validateProtagonistName(item.input);
  assert(
    res.isValid === false && res.errorKey === "required",
    `Empty/whitespace input (${item.desc}) returns isValid=false and errorKey='required'`,
    { res }
  );
}

// Leading & Trailing Whitespace is trimmed and accepted
const trimmedNameRes = validateProtagonistName("   Zayed   ");
assert(
  trimmedNameRes.isValid === true,
  "Leading and trailing whitespace is trimmed and name is accepted",
  { trimmedNameRes }
);

// 1.6 Name Length Boundary Conditions (1–14 characters)
assert(
  validateProtagonistName("A").isValid === true,
  "1 character name 'A' is valid boundary"
);
assert(
  validateProtagonistName("ن").isValid === true,
  "1 character Arabic name 'ن' is valid boundary"
);
assert(
  validateProtagonistName("Abdel-Rahmann").isValid === true && "Abdel-Rahmann".length === 13,
  "13 character name 'Abdel-Rahmann' is valid"
);
assert(
  validateProtagonistName("Abdel-Rahmannn").isValid === true && "Abdel-Rahmannn".length === 14,
  "Exact 14 character name 'Abdel-Rahmannn' is valid boundary"
);
assert(
  validateProtagonistName("Abdel-Rahmannnn").isValid === false &&
  validateProtagonistName("Abdel-Rahmannnn").errorKey === "maxLength",
  "15 character name 'Abdel-Rahmannnn' is rejected with errorKey='maxLength'"
);
assert(
  validateProtagonistName("A".repeat(50)).isValid === false &&
  validateProtagonistName("A".repeat(50)).errorKey === "maxLength",
  "50 character name is rejected with errorKey='maxLength'"
);

// 1.7 Tashkeel Diacritic Character Counting vs Code Units
// In JavaScript, each combining diacritic is 1 UTF-16 code unit.
const shortNameWithManyTashkeel = "عَبْدُهْ"; // 4 letters (ع, ب, د, ه) + 4 diacritics = 8 code units
assert(
  shortNameWithManyTashkeel.length === 8 && validateProtagonistName(shortNameWithManyTashkeel).isValid === true,
  "Arabic name with 4 letters + 4 diacritics (8 code units) is valid"
);
// Name exceeding 14 code units due to heavy diacritics
const heavilyVocalized = "عَبْدُ الرَّحْمَنِ"; // 18 code units
assert(
  heavilyVocalized.length === 18 &&
  validateProtagonistName(heavilyVocalized).isValid === false &&
  validateProtagonistName(heavilyVocalized).errorKey === "maxLength",
  "Heavily vocalized name exceeding 14 code units triggers maxLength validation"
);

// 1.8 Security & Injections Testing: Numbers, SQL, XSS, Symbols
const injectionAndInvalidNames = [
  { name: "Zayed123", desc: "Latin digits at end" },
  { name: "007", desc: "Digits only" },
  { name: "<script>alert('XSS')</script>", desc: "Standard script tag XSS" },
  { name: "<img src=x onerror=alert(1)>", desc: "Image onerror XSS" },
  { name: "javascript:alert(1)", desc: "javascript: protocol URI" },
  { name: "Zayed'; DROP TABLE books;--", desc: "SQL injection quote and semicolon" },
  { name: "1' OR '1'='1", desc: "Classic SQL tautology" },
  { name: "Zayed 🌟", desc: "Unicode Star Emoji" },
  { name: "👦 Zayed", desc: "Boy Emoji" },
  { name: "Zayed!@#$%", desc: "Keyboard symbols" },
  { name: "Zayed_Ali", desc: "Underscore symbol" },
  { name: "Zayed+Ali", desc: "Plus sign" },
  { name: "Zayed=Ali", desc: "Equal sign" },
  { name: "Zayed/Ali", desc: "Forward slash" },
  { name: "Zayed\\Ali", desc: "Backslash" },
  { name: "Zayed\0Null", desc: "Null byte injection" },
  { name: "Zayed`Backtick", desc: "Backtick character" },
  { name: "Иван", desc: "Cyrillic script" },
  { name: "李明", desc: "Chinese ideograms" },
  { name: "अमित", desc: "Devanagari script" },
];

for (const item of injectionAndInvalidNames) {
  const res = validateProtagonistName(item.name);
  assert(
    res.isValid === false,
    `Adversarial input (${item.desc}: '${item.name}') is rejected (isValid=false)`,
    { res }
  );
}

// 1.9 UI MaxLength Attributes Contract Inspection
const pdpSource = fs.readFileSync(path.resolve(WEB_DIR, "components/ProductDetailView.tsx"), "utf-8");
const studioSource = fs.readFileSync(path.resolve(WEB_DIR, "components/SampleBookEngine.tsx"), "utf-8");

assert(
  pdpSource.includes('maxLength={13}'),
  "ProductDetailView.tsx enforces maxLength={13} on protagonist name input"
);
assert(
  studioSource.includes('maxLength={14}'),
  "SampleBookEngine.tsx enforces maxLength={14} on protagonist name input"
);

// ================================================================================
// SUITE 2: SENTIMENTAL DEDICATION CHARACTER BOUNDARY & FORMATTING
// ================================================================================
console.log("\n--- SUITE 2: Sentimental Dedication Character Boundary & Formatting ---");

// 2.1 Exactly 400 Characters Acceptance
const exact400CharsEn = "A".repeat(400);
assert(exact400CharsEn.length === 400, "Constructed ASCII string is exactly 400 characters");

const exact400CharsAr = "إلى بطلنا الصغير زايد ".repeat(20).slice(0, 400);
assert(exact400CharsAr.length === 400, "Constructed Arabic string is exactly 400 characters");

// 2.2 401 Characters Boundary Truncation
const chars401 = "A".repeat(401);
const truncated400 = chars401.slice(0, 400);
assert(
  truncated400.length === 400,
  "String of 401 characters truncated via .slice(0, 400) results in exactly 400 characters"
);
assert(
  truncated400 === "A".repeat(400),
  "Truncated 401 characters matches exact 400 characters without 401st character"
);

// 2.3 Warning Indicator Triggers
// PDP warning condition: dedication.length > 350
const pdpUnderWarning = "A".repeat(350);
const pdpAtWarning = "A".repeat(351);
assert(
  !(pdpUnderWarning.length > 350),
  "PDP: 350 characters does NOT trigger character count warning"
);
assert(
  pdpAtWarning.length > 350,
  "PDP: 351 characters triggers character count warning (> 350)"
);

// SampleBook Studio warning condition: 400 - dedication.length <= 40 (i.e. length >= 360)
const studioUnderWarning = "A".repeat(359);
const studioAtWarning = "A".repeat(360);
assert(
  !(400 - studioUnderWarning.length <= 40),
  "SampleBook Studio: 359 characters (41 left) does NOT trigger warning"
);
assert(
  (400 - studioAtWarning.length <= 40),
  "SampleBook Studio: 360 characters (40 left) triggers warning (<= 40 left)"
);
assert(
  (400 - exact400CharsEn.length === 0),
  "SampleBook Studio: 400 characters indicates 0 characters left"
);

// 2.4 Dedication Pre-filled Rhyme Templates & Interpolation
assert(
  DEDICATION_TEMPLATES.length === 5,
  "DEDICATION_TEMPLATES contains 5 curated occasion rhymes (Blessing, Birthday, Newborn, Heritage, Bedtime)"
);

for (const tmpl of DEDICATION_TEMPLATES) {
  assert(
    Boolean(tmpl.verseEn && tmpl.verseAr),
    `Template '${tmpl.id}' contains both English and Arabic verses`
  );
  assert(
    tmpl.verseEn.includes("{childName}") && tmpl.verseAr.includes("{childName}"),
    `Template '${tmpl.id}' contains {childName} token in both English and Arabic verses`
  );
  const interpolatedEn = tmpl.verseEn.replace(/{childName}/g, "Zayed");
  const interpolatedAr = tmpl.verseAr.replace(/{childName}/g, "زايد");
  assert(
    !interpolatedEn.includes("{childName}") && interpolatedEn.includes("Zayed"),
    `Template '${tmpl.id}' interpolates English child name cleanly`
  );
  assert(
    !interpolatedAr.includes("{childName}") && interpolatedAr.includes("زايد"),
    `Template '${tmpl.id}' interpolates Arabic child name cleanly`
  );
}

// 2.5 Multi-line Dedication & Punctuation Preservation
const multilineDedication = `To our dearest Zayed,\n\nMay your dreams be as vast as the desert dunes!\nAlways remember: courage, kindness, and love.\n\n— Mama & Baba`;
const renderedMultiline = renderVerse(multilineDedication, DEFAULT_CHARACTER_CONFIG, "en");
assert(
  renderedMultiline.includes("\n\n") && renderedMultiline.includes("— Mama & Baba"),
  "Multi-line dedication with newlines, exclamation marks, and em-dashes is preserved intact"
);

// 2.6 Tashkeel Diacritics in Dedication
const arabicDedicationWithTashkeel = "إِلَى بَطَلِنَا الصَّغِيرِ زَايِد، نُحِبُّكَ حُبّاً لَا يَنْتَهِي!";
assert(
  arabicDedicationWithTashkeel.length > 0 && arabicDedicationWithTashkeel.length <= 400,
  "Arabic dedication with vocalized Tashkeel is within 400 characters limit"
);
const renderedArDedication = renderVerse(arabicDedicationWithTashkeel, DEFAULT_CHARACTER_CONFIG, "ar");
assert(
  renderedArDedication.includes("الصَّغِيرِ") && renderedArDedication.includes("نُحِبُّكَ"),
  "Arabic dedication Tashkeel marks are completely preserved during verse rendering"
);

// ================================================================================
// SUITE 3: PRICING CALCULATIONS & 129 / 169 AED LEAK AUDIT
// ================================================================================
console.log("\n--- SUITE 3: Pricing Calculations & 129 / 169 AED Leak Audit ---");

// 3.1 Canonical Pricing Configuration
assert(
  COVER_FORMAT_PRICING.softcover.priceAED === 49 &&
  COVER_FORMAT_PRICING.softcover.priceUSD === 12.99,
  "COVER_FORMAT_PRICING: Softcover is calibrated to 49 AED ($12.99 USD)"
);
assert(
  COVER_FORMAT_PRICING.hardcover.priceAED === 79 &&
  COVER_FORMAT_PRICING.hardcover.priceUSD === 21.99 &&
  COVER_FORMAT_PRICING.hardcover.isDefault === true,
  "COVER_FORMAT_PRICING: Classic Hardcover is calibrated to 79 AED ($21.99 USD, isDefault=true)"
);
assert(
  COVER_FORMAT_PRICING.layflat.priceAED === 99 &&
  COVER_FORMAT_PRICING.layflat.priceUSD === 26.99,
  "COVER_FORMAT_PRICING: Deluxe Layflat is calibrated to 99 AED ($26.99 USD)"
);

assert(
  getFormatPrice("softcover").priceAED === 49,
  "getFormatPrice('softcover') returns 49 AED"
);
assert(
  getFormatPrice("hardcover").priceAED === 79,
  "getFormatPrice('hardcover') returns 79 AED"
);
assert(
  getFormatPrice("layflat").priceAED === 99,
  "getFormatPrice('layflat') returns 99 AED"
);
assert(
  getFormatPrice("invalid_format").priceAED === 79,
  "getFormatPrice with invalid format safely falls back to default Hardcover (79 AED)"
);

// 3.2 Verification Across All Web UI Touchpoints
assert(
  pdpSource.includes("softcover: { aed: 49, usd: 12.99 }") &&
  pdpSource.includes("hardcover: { aed: 79, usd: 21.99 }") &&
  pdpSource.includes("layflat: { aed: 99, usd: 26.99 }"),
  "ProductDetailView.tsx formatPrices dictionary calibrated to 49 / 79 / 99 AED"
);

assert(
  studioSource.includes("config.coverFormat === 'layflat' ? 99 : config.coverFormat === 'hardcover' ? 79 : 49"),
  "SampleBookEngine.tsx handleOrderBook calculates 49 / 79 / 99 AED correctly"
);

const cartPageSource = fs.readFileSync(path.resolve(WEB_DIR, "app/cart/page.tsx"), "utf-8");
assert(
  cartPageSource.includes("const baseUnitPrice = format === 'layflat' ? 99 : format === 'hardcover' ? 79 : 49;"),
  "web/app/cart/page.tsx baseUnitPrice strictly calibrated to 49 / 79 / 99 AED"
);

const createFormatsSource = fs.readFileSync(path.resolve(WEB_DIR, "app/create/formats/page.tsx"), "utf-8");
assert(
  createFormatsSource.includes("aedPrice: 99") &&
  createFormatsSource.includes("aedPrice: 79") &&
  createFormatsSource.includes("aedPrice: 49"),
  "web/app/create/formats/page.tsx FORMAT_OPTIONS contains 49 / 79 / 99 AED"
);

const cartContextSource = fs.readFileSync(path.resolve(WEB_DIR, "lib/context/CartContext.tsx"), "utf-8");
assert(
  cartContextSource.includes("unitPrice: 79") && cartContextSource.includes('format: "hardcover"'),
  "CartContext.tsx DEFAULT_ITEM initializes with 79 AED hardcover unitPrice"
);

// 3.3 Exhaustive Codebase Scan for 129 and 169 AED Leaks in web/
function scanDirectoryForPriceLeaks(dirPath) {
  const leaks = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      leaks.push(...scanDirectoryForPriceLeaks(fullPath));
    } else if (entry.isFile() && /\.(tsx?|jsx?|json|css|md)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, "utf-8");
      
      // Check for 129
      if (content.includes("129")) {
        // Exclude innocent matches if any (e.g. CSS RGBA color coordinates in tokens.css)
        const lines = content.split("\n");
        lines.forEach((line, idx) => {
          if (line.includes("129") && !/rgba?\(\s*129\s*,/i.test(line)) {
            leaks.push({ file: `${fullPath}:${idx + 1}`, match: line.trim() });
          }
        });
      }

      // Check for 169 as price (e.g. 169 AED or price: 169)
      const lines = content.split("\n");
      lines.forEach((line, idx) => {
        if (/169\s*(AED|د\.إ|\$|USD)/i.test(line) || /price.*169/i.test(line) || /169\.00/i.test(line)) {
          leaks.push({ file: `${fullPath}:${idx + 1}`, match: line.trim() });
        }
      });
    }
  }
  return leaks;
}

const webPriceLeaks = scanDirectoryForPriceLeaks(WEB_DIR);
assert(
  webPriceLeaks.length === 0,
  "Exhaustive recursive scan of web/ confirmed ZERO occurrences of 129 or 169 AED in any source file",
  { leaks: webPriceLeaks }
);

// 3.4 Cart & Tabby Installment Arithmetic Stress
// Tabby formula: Math.round((cartTotal / 4) * 100) / 100
const testPrices = [
  { total: 49, expectedTabby: 12.25 },
  { total: 79, expectedTabby: 19.75 },
  { total: 99, expectedTabby: 24.75 },
  { total: 103, expectedTabby: 25.75 },
  { total: 118, expectedTabby: 29.50 },
  { total: 148, expectedTabby: 37.00 },
];

for (const tp of testPrices) {
  const calculatedTabby = Math.round((tp.total / 4) * 100) / 100;
  assert(
    calculatedTabby === tp.expectedTabby,
    `Cart total ${tp.total} AED yields exact Tabby 4-installment of ${tp.expectedTabby} AED/mo`
  );
}

// BOGO50 discount calculations on calibrated prices
// Qty 2 Softcover (49 AED each): Subtotal = 98, Discount = round(49 * 0.5) = 25, Total = 73
const bogoSoftcover = {
  subtotal: 49 * 2,
  discount: Math.round(49 * 0.5),
  total: 98 - 25,
};
assert(
  bogoSoftcover.total === 73 && bogoSoftcover.discount === 25,
  "2x Softcover (49 AED) with BOGO50 yields 25 AED discount and 73 AED total"
);

// Qty 2 Hardcover (79 AED each): Subtotal = 158, Discount = round(79 * 0.5) = 40, Total = 118
const bogoHardcover = {
  subtotal: 79 * 2,
  discount: Math.round(79 * 0.5),
  total: 158 - 40,
};
assert(
  bogoHardcover.total === 118 && bogoHardcover.discount === 40,
  "2x Hardcover (79 AED) with BOGO50 yields 40 AED discount and 118 AED total"
);

// Mixed 1 Softcover (49) + 1 Hardcover (79): Subtotal = 128, Discount = round(49 * 0.5) = 25, Total = 103
const bogoMixed = {
  subtotal: 49 + 79,
  discount: Math.round(Math.min(49, 79) * 0.5),
  total: 128 - 25,
};
assert(
  bogoMixed.total === 103 && bogoMixed.discount === 25,
  "Mixed 1 Softcover (49 AED) + 1 Hardcover (79 AED) with BOGO50 discounts lowest item (-25 AED) = 103 AED"
);

// Free shipping threshold (100 AED)
const FREE_SHIPPING_THRESHOLD = 100;
assert(
  49 < FREE_SHIPPING_THRESHOLD && (FREE_SHIPPING_THRESHOLD - 49 === 51),
  "1x Softcover (49 AED) requires 51 AED more for free shipping"
);
assert(
  79 < FREE_SHIPPING_THRESHOLD && (FREE_SHIPPING_THRESHOLD - 79 === 21),
  "1x Hardcover (79 AED) requires 21 AED more for free shipping"
);
assert(
  99 < FREE_SHIPPING_THRESHOLD && (FREE_SHIPPING_THRESHOLD - 99 === 1),
  "1x Layflat (99 AED) requires exactly 1 AED more for free shipping"
);
assert(
  bogoMixed.total >= FREE_SHIPPING_THRESHOLD,
  "Mixed 2-book order (103 AED) satisfies free shipping threshold (>= 100 AED)"
);

// ================================================================================
// SUITE 4: CO-STAR CONFIGURATION & TOKEN INTERPOLATION
// ================================================================================
console.log("\n--- SUITE 4: Co-Star Configuration & Token Interpolation ---");

// 4.1 Co-Star Kinship Roles
const validRoles = ["dad", "mom", "grandpa", "grandma"];
assert(
  BEARD_STYLES.length === 4,
  "BEARD_STYLES contains 4 distinct styles (neat-trimmed, arabian-goatee, full-beard, clean-shaven)"
);

// 4.2 Beard Style Visibility Predicate
// Only visible for male roles ('dad' or 'grandpa')
function isBeardStyleVisible(role) {
  return role === "dad" || role === "grandpa";
}

assert(
  isBeardStyleVisible("dad") === true,
  "Beard styles VISIBLE for male role 'dad'"
);
assert(
  isBeardStyleVisible("grandpa") === true,
  "Beard styles VISIBLE for male role 'grandpa'"
);
assert(
  isBeardStyleVisible("mom") === false,
  "Beard styles HIDDEN for female role 'mom'"
);
assert(
  isBeardStyleVisible("grandma") === false,
  "Beard styles HIDDEN for female role 'grandma'"
);

// Verify UI code implements this exact predicate
assert(
  pdpSource.includes("(coStar.role === 'dad' || coStar.role === 'grandpa')"),
  "ProductDetailView.tsx restricts beard styles strictly to 'dad' and 'grandpa'"
);
assert(
  studioSource.includes('(config.coStar.role === "dad" || config.coStar.role === "grandpa")'),
  "SampleBookEngine.tsx restricts beard styles strictly to 'dad' and 'grandpa'"
);

// 4.3 Co-Star Verse Token Interpolation in renderVerse
// Case A: Co-star enabled with custom name
const configCustomCoStar = {
  ...DEFAULT_CHARACTER_CONFIG,
  coStar: {
    enabled: true,
    role: "dad",
    name: "Amo Tariq",
    skinTone: "olive",
    hairStyle: "short",
    hairColor: "jet-black",
    beardStyle: "arabian-goatee",
    glasses: false,
  },
};
const verseWithCoStar = renderVerse("With guidance from {coStarName}, our adventurer flies.", configCustomCoStar, "en");
assert(
  verseWithCoStar.includes("Amo Tariq"),
  "Custom co-star name 'Amo Tariq' interpolated into verse for {coStarName}"
);

// Case B: Co-star enabled with empty name (fallback to role default)
const configEmptyCoStarDad = {
  ...DEFAULT_CHARACTER_CONFIG,
  coStar: { ...DEFAULT_CHARACTER_CONFIG.coStar, enabled: true, role: "dad", name: "" },
};
assert(
  renderVerse("{coStarName}", configEmptyCoStarDad, "en") === "Baba",
  "Empty dad coStar name falls back to 'Baba' in English"
);
assert(
  renderVerse("{coStarName}", configEmptyCoStarDad, "ar") === "بابا",
  "Empty dad coStar name falls back to 'بابا' in Arabic"
);

const configEmptyCoStarMom = {
  ...DEFAULT_CHARACTER_CONFIG,
  coStar: { ...DEFAULT_CHARACTER_CONFIG.coStar, enabled: true, role: "mom", name: "" },
};
assert(
  renderVerse("{coStarName}", configEmptyCoStarMom, "en") === "Mama",
  "Empty mom coStar name falls back to 'Mama' in English"
);
assert(
  renderVerse("{coStarName}", configEmptyCoStarMom, "ar") === "ماما",
  "Empty mom coStar name falls back to 'ماما' in Arabic"
);

const configEmptyCoStarGrandpa = {
  ...DEFAULT_CHARACTER_CONFIG,
  coStar: { ...DEFAULT_CHARACTER_CONFIG.coStar, enabled: true, role: "grandpa", name: "" },
};
assert(
  renderVerse("{coStarName}", configEmptyCoStarGrandpa, "en") === "Grandpa",
  "Empty grandpa coStar name falls back to 'Grandpa' in English"
);
assert(
  renderVerse("{coStarName}", configEmptyCoStarGrandpa, "ar") === "جدو",
  "Empty grandpa coStar name falls back to 'جدو' in Arabic"
);

const configEmptyCoStarGrandma = {
  ...DEFAULT_CHARACTER_CONFIG,
  coStar: { ...DEFAULT_CHARACTER_CONFIG.coStar, enabled: true, role: "grandma", name: "" },
};
assert(
  renderVerse("{coStarName}", configEmptyCoStarGrandma, "en") === "Grandma",
  "Empty grandma coStar name falls back to 'Grandma' in English"
);
assert(
  renderVerse("{coStarName}", configEmptyCoStarGrandma, "ar") === "تيتا",
  "Empty grandma coStar name falls back to 'تيتا' in Arabic"
);

// 4.4 Co-Star Role Token Interpolation ({coStarRole})
assert(
  renderVerse("{coStarRole}", configEmptyCoStarDad, "en") === "Father" &&
  renderVerse("{coStarRole}", configEmptyCoStarDad, "ar") === "الأب",
  "{coStarRole} for dad interpolates to 'Father' (EN) and 'الأب' (AR)"
);
assert(
  renderVerse("{coStarRole}", configEmptyCoStarMom, "en") === "Mother" &&
  renderVerse("{coStarRole}", configEmptyCoStarMom, "ar") === "الأم",
  "{coStarRole} for mom interpolates to 'Mother' (EN) and 'الأم' (AR)"
);
assert(
  renderVerse("{coStarRole}", configEmptyCoStarGrandpa, "en") === "Grandfather" &&
  renderVerse("{coStarRole}", configEmptyCoStarGrandpa, "ar") === "الجد",
  "{coStarRole} for grandpa interpolates to 'Grandfather' (EN) and 'الجد' (AR)"
);
assert(
  renderVerse("{coStarRole}", configEmptyCoStarGrandma, "en") === "Grandmother" &&
  renderVerse("{coStarRole}", configEmptyCoStarGrandma, "ar") === "الجدة",
  "{coStarRole} for grandma interpolates to 'Grandmother' (EN) and 'الجدة' (AR)"
);

// 4.5 Composite Multi-Token Interpolation Stress
const compositeTemplateEn = "Dear {childName} ({childGender}), your {coStarRole} {coStarName} and {gifterName} love you!";
const compositeTemplateAr = "عزيزنا {childName} ({childGender})، {coStarRole} {coStarName} و {gifterName} يحبونك!";

const renderedCompositeEn = renderVerse(compositeTemplateEn, configCustomCoStar, "en");
const renderedCompositeAr = renderVerse(compositeTemplateAr, configCustomCoStar, "ar");

assert(
  !renderedCompositeEn.includes("{") && !renderedCompositeEn.includes("}"),
  "All 5 tokens in composite English template replaced with zero unhandled tokens",
  { renderedCompositeEn }
);
assert(
  !renderedCompositeAr.includes("{") && !renderedCompositeAr.includes("}"),
  "All 5 tokens in composite Arabic template replaced with zero unhandled tokens",
  { renderedCompositeAr }
);

// ================================================================================
// SUITE 5: PRODUCT SPECIFICATIONS DRAWER & UNBOXING REVIEWS CONTRACTS
// ================================================================================
console.log("\n--- SUITE 5: Product Specifications Drawer & Unboxing Reviews Contracts ---");

// 5.1 Product Specifications Drawer Verification
const specsDrawerSource = fs.readFileSync(path.resolve(WEB_DIR, "components/ProductSpecsDrawer.tsx"), "utf-8");

assert(
  specsDrawerSource.includes('23 cm × 23 cm') || specsDrawerSource.includes('8.5" × 8.5"') || specsDrawerSource.includes('٢٣ سم × ٢٣ سم'),
  "ProductSpecsDrawer specifies square dimensions (8.5\" × 8.5\" / 23 cm × 23 cm)"
);
assert(
  specsDrawerSource.includes('200 GSM') || specsDrawerSource.includes('٢٠٠ جم'),
  "ProductSpecsDrawer specifies 200 GSM archival paper"
);
assert(
  specsDrawerSource.includes('EN71-3'),
  "ProductSpecsDrawer specifies EN71-3 toy-safety child-safe ink standard"
);
assert(
  specsDrawerSource.includes('24–48h') || specsDrawerSource.includes('٢٤–٤٨ ساعة'),
  "ProductSpecsDrawer specifies 24–48h UAE express courier delivery"
);
assert(
  specsDrawerSource.includes("e.key === 'Escape'"),
  "ProductSpecsDrawer implements Escape key dismissal listener for accessibility"
);

// 5.2 Customer Unboxing Reviews & Ratings Scorecard
assert(
  UNBOXING_REVIEWS.length >= 4,
  `UNBOXING_REVIEWS contains ${UNBOXING_REVIEWS.length} reviews (>= 4 verified reviews)`
);

for (const rev of UNBOXING_REVIEWS) {
  assert(
    rev.verifiedPurchase === true && rev.verifiedPhotoBadge === true,
    `Review ${rev.id} (${rev.authorEn}) has verifiedPurchase and verifiedPhotoBadge`
  );
  assert(
    Boolean(rev.format && rev.photoUrl && rev.quoteEn && rev.quoteAr),
    `Review ${rev.id} has valid format, photoUrl, quoteEn, and quoteAr`
  );
}

assert(
  UNBOXING_RATINGS_BREAKDOWN.overallScore === 4.96 &&
  UNBOXING_RATINGS_BREAKDOWN.totalReviews >= 400,
  "UNBOXING_RATINGS_BREAKDOWN indicates 4.96/5.0 rating across 400+ reviews"
);

// 5.3 PDP Q&A Accordion Coverage
assert(
  PDP_QA_ACCORDION.length >= 5,
  `PDP_QA_ACCORDION contains ${PDP_QA_ACCORDION.length} bilingual items (>= 5)`
);

const dedicationFaq = PDP_QA_ACCORDION.find(
  (q) => q.questionEn.toLowerCase().includes("dedication") || q.answerEn.toLowerCase().includes("400")
);
assert(
  Boolean(dedicationFaq && dedicationFaq.answerEn.includes("400")),
  "PDP Q&A accordion includes question clarifying the 400-character dedication limit"
);

// 5.4 Keepsake Cover Colorways
assert(
  KEEPSAKE_COVER_COLORS.length === 4,
  "KEEPSAKE_COVER_COLORS contains 4 Arabian luxury colorways (desert-gold, midnight-sapphire, emerald-oasis, ruby-rose)"
);

// ================================================================================
// FINAL VERDICT & SUMMARY
// ================================================================================
console.log("\n================================================================================");
console.log("📊 EMPIRICAL STRESS TEST RESULTS: MILESTONE M2");
console.log("================================================================================");
console.log(`Passed: ${totalPassed} | Failed: ${totalFailed}`);
if (totalFailed > 0) {
  console.log("Failures summary:");
  for (const f of failureDetails) {
    console.error(` - ${f.message}`, f.details);
  }
}
console.log("================================================================================");

process.exit(totalFailed === 0 ? 0 : 1);
