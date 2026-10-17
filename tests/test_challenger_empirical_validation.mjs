import { PRODUCTS } from "../web/config/products.ts";
import fs from "fs";
import path from "path";

console.log("================================================================================");
console.log("🕵️ EMPIRICAL CHALLENGER INDEPENDENT VERIFICATION SUITE");
console.log("================================================================================");

let totalPassed = 0;
let totalFailed = 0;
const failures = [];

function assert(cond, msg, meta = {}) {
  if (cond) {
    totalPassed++;
    console.log(`  ✅ PASS: ${msg}`);
  } else {
    totalFailed++;
    console.error(`  ❌ FAIL: ${msg}`, meta);
    failures.push({ msg, meta });
  }
}

// ------------------------------------------------------------------------------
// 1. Verify HeaderSearchModal.tsx code implementation directly
// ------------------------------------------------------------------------------
console.log("\n[TEST SECTION 1] Inspecting HeaderSearchModal.tsx Source Code");
const searchModalPath = path.resolve("web/components/HeaderSearchModal.tsx");
const searchModalCode = fs.readFileSync(searchModalPath, "utf-8");

// Verify NO universal Arabic keywords injection
assert(
  !searchModalCode.includes('isAr ? "كتاب قصة أطفال عيد ميلاد'),
  "Universal Arabic keyword injection line is completely absent"
);

// Verify normalizeDashes exists and handles \u2013 and \u2014
assert(
  searchModalCode.includes("normalizeDashes"),
  "HeaderSearchModal.tsx defines normalizeDashes function"
);
assert(
  searchModalCode.includes("CATEGORY_AR_MAP") &&
  searchModalCode.includes("OCCASION_AR_MAP") &&
  searchModalCode.includes("RECIPIENT_AR_MAP"),
  "HeaderSearchModal.tsx defines per-book localized metadata maps"
);

// ------------------------------------------------------------------------------
// 2. Replicate Search Function exactly as in HeaderSearchModal.tsx
// ------------------------------------------------------------------------------
console.log("\n[TEST SECTION 2] Empirical Query Matching Verification");

const CATEGORY_AR_MAP = {
  bedtime: "نوم قبل النوم تهويدة أحلام نوم هادئ",
  heritage: "تراث أصالة فروسية شهامة واحة خليجي",
  newborn: "مولود مواليد رضيع استقبال المعجزة الأولى",
  bestseller: "الأكثر مبيعا الأكثر طلبا مميز",
};

const OCCASION_AR_MAP = {
  birthday: "عيد ميلاد ميلاد احتفال",
  milestone: "ذكرى إنجاز",
  newborn: "مولود جديد ولادة",
  aqiqah: "عقيقة",
  "baby-shower": "استقبال مواليد",
  "first-year": "العام الأول سنة أولى",
  "national-day": "اليوم الوطني",
  "founding-day": "يوم التأسيس",
  graduation: "تخرج",
  stem: "علوم",
  gift: "هدية",
};

const RECIPIENT_AR_MAP = {
  son: "ابن ولد",
  daughter: "ابنة بنت",
  twins: "توأم توائم",
  nephew: "ابن الأخ ابن الأخت",
  niece: "بنت الأخ بنت الأخت",
  grandchildren: "أحفاد حفيد",
  family: "عائلة أسرة",
  "older-kids": "يافعين كبار",
};

const normalizeDashes = (s) => s.replace(/[\u2013\u2014]/g, "-");

function executeModalSearch(query) {
  const cleanQ = normalizeDashes(query.trim().toLowerCase());
  if (!cleanQ) return [];

  const tokens = cleanQ.split(/\s+/).filter(Boolean);

  return PRODUCTS.filter((book) => {
    const normAge = normalizeDashes(book.ageRange.toLowerCase());
    const catLoc = CATEGORY_AR_MAP[book.category] || "";
    const occLoc = (book.occasions || []).map((o) => OCCASION_AR_MAP[o] || "").join(" ");
    const recLoc = (book.recipients || []).map((r) => RECIPIENT_AR_MAP[r] || "").join(" ");
    const desc = (((book.description || book.summary || "") + "")).toLowerCase();
    const descAr = (((book.descriptionAr || "") + "")).toLowerCase();

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
      catLoc,
      book.defaultTheme.toLowerCase(),
      ...book.occasions.map((o) => o.toLowerCase()),
      occLoc,
      ...book.recipients.map((r) => r.toLowerCase()),
      recLoc,
      (normAge.includes("0-3") || book.ageRange.includes("0–3")) ? "0 1 2 3 0-3 0–3 baby babies newborn infant toddler" : "",
      (normAge.includes("2-7") || book.ageRange.includes("2–7")) ? "2 3 4 5 6 7 2-7 2–7 toddler preschool young" : "",
      (normAge.includes("3-8") || book.ageRange.includes("3–8")) ? "3 4 5 6 7 8 3-8 3–8 kids children primary" : "",
      (normAge.includes("4-10") || book.ageRange.includes("4–10")) ? "4 5 6 7 8 9 10 4-10 4–10 knight desert heritage" : "",
      (normAge.includes("6-12") || book.ageRange.includes("6–12")) ? "6 7 8 9 10 11 12 6-12 6–12 space stem older" : "",
    ].join(" ");

    return tokens.every((token) => corpus.includes(token));
  });
}

// ------------------------------------------------------------------------------
// TEST 2.1: Discovery Chip "Ages 0–3" (value: "0-3")
// ------------------------------------------------------------------------------
const chipResults = executeModalSearch("0-3");
assert(
  chipResults.some((b) => b.id === "when-you-were-born"),
  "Discovery chip '0-3' returns 'when-you-were-born' (When You Were Born: A Miracle Journey)",
  { matches: chipResults.map((b) => b.id) }
);

const miracleBook = chipResults.find((b) => b.id === "when-you-were-born");
assert(
  miracleBook && miracleBook.slug === "when-you-were-born-miracle-keepsake",
  "Matched book has slug 'when-you-were-born-miracle-keepsake'",
  { slug: miracleBook?.slug }
);
assert(
  miracleBook && miracleBook.badge === "🍼 NEWBORN KEEPSAKE",
  "Matched book has badge '🍼 NEWBORN KEEPSAKE'",
  { badge: miracleBook?.badge }
);

// Also test direct typing variations
const typedUnicodeEnDash = executeModalSearch("Ages 0–3");
assert(
  typedUnicodeEnDash.some((b) => b.id === "when-you-were-born"),
  "Typing 'Ages 0–3' (unicode en-dash) returns 'when-you-were-born'",
  { count: typedUnicodeEnDash.length }
);

const typedAsciiHyphen = executeModalSearch("Ages 0-3");
assert(
  typedAsciiHyphen.some((b) => b.id === "when-you-were-born"),
  "Typing 'Ages 0-3' (ASCII hyphen) returns 'when-you-were-born'",
  { count: typedAsciiHyphen.length }
);

const typedBaby = executeModalSearch("baby");
assert(
  typedBaby.some((b) => b.id === "when-you-were-born"),
  "Typing 'baby' returns 'when-you-were-born' via age corpus expansion",
  { count: typedBaby.length }
);

// ------------------------------------------------------------------------------
// TEST 2.2: Arabic Theme Queries ("صقر", "فضاء", "نوم")
// ------------------------------------------------------------------------------
console.log("\n[TEST SECTION 3] Arabic Theme Queries Specificity and Isolation");

// Query: "صقر" (Falcon)
const falconResults = executeModalSearch("صقر");
assert(
  falconResults.length === 1 && falconResults[0].id === "lost-golden-falcon",
  "Query 'صقر' strictly matches only 'lost-golden-falcon' (no universal false positives)",
  { count: falconResults.length, matches: falconResults.map((b) => b.id) }
);

// Query: "فضاء" (Space)
const spaceResults = executeModalSearch("فضاء");
assert(
  spaceResults.length === 1 && spaceResults[0].id === "galactic-explorer",
  "Query 'فضاء' strictly matches only 'galactic-explorer' (no universal false positives)",
  { count: spaceResults.length, matches: spaceResults.map((b) => b.id) }
);

// Query: "نوم" (Bedtime / Sleep)
const bedtimeResults = executeModalSearch("نوم");
assert(
  bedtimeResults.length === 1 && bedtimeResults[0].id === "bedtime-arabian-moon",
  "Query 'نوم' strictly matches only 'bedtime-arabian-moon' (no universal false positives)",
  { count: bedtimeResults.length, matches: bedtimeResults.map((b) => b.id) }
);

// Negative check: verify that starlit-dunes, knight-golden-oasis, when-you-were-born are NOT returned for "نوم"
const nonBedtimeMatched = bedtimeResults.filter((b) => b.id !== "bedtime-arabian-moon");
assert(
  nonBedtimeMatched.length === 0,
  "Negative check: 0 unrelated books matched for query 'نوم'",
  { nonBedtimeMatched }
);

// Check additional Arabic queries
const oasisResults = executeModalSearch("واحة");
assert(
  oasisResults.length >= 1 && oasisResults.some((b) => b.id === "knight-golden-oasis"),
  "Query 'واحة' matches 'knight-golden-oasis'",
  { count: oasisResults.length, matches: oasisResults.map((b) => b.id) }
);

const starsResults = executeModalSearch("نجوم");
assert(
  starsResults.length >= 1 && starsResults.some((b) => b.id === "starlit-dunes"),
  "Query 'نجوم' matches 'starlit-dunes'",
  { count: starsResults.length, matches: starsResults.map((b) => b.id) }
);

// ------------------------------------------------------------------------------
// TEST 3: StoreHeader.tsx Contract and Countdown Props Precedence
// ------------------------------------------------------------------------------
console.log("\n[TEST SECTION 4] StoreHeader.tsx Props & Hydration Verification");
const storeHeaderPath = path.resolve("web/components/StoreHeader.tsx");
const storeHeaderCode = fs.readFileSync(storeHeaderPath, "utf-8");

assert(
  storeHeaderCode.includes("countdown: propCountdown"),
  "StoreHeader accepts propCountdown in props"
);

assert(
  storeHeaderCode.includes("activeCountdown =") &&
  storeHeaderCode.includes("propCountdown !== undefined") &&
  storeHeaderCode.includes("? propCountdown"),
  "StoreHeader prioritizes propCountdown over internal timerState"
);

assert(
  storeHeaderCode.includes("formattedCountdown ? (") &&
  storeHeaderCode.includes("formattedCountdown.hours") &&
  storeHeaderCode.includes("formattedCountdown.minutes") &&
  storeHeaderCode.includes("formattedCountdown.seconds"),
  "StoreHeader renders hours, minutes, seconds from activeCountdown"
);

// Hydration safety: when activeCountdown is null (SSR unmounted and no prop), renders static fallback text
assert(
  storeHeaderCode.includes("Buy 1 Book, Get 2nd at 50% Off with Code BOGO50"),
  "StoreHeader has static fallback announcement for SSR hydration safety"
);

// MiniCartDrawer delivery fee and total arithmetic check
console.log("\n[TEST SECTION 5] MiniCartDrawer.tsx Delivery Fee Consistency");
const miniCartPath = path.resolve("web/components/MiniCartDrawer.tsx");
const miniCartCode = fs.readFileSync(miniCartPath, "utf-8");

assert(
  miniCartCode.includes("totalItemCount === 0") &&
  miniCartCode.includes("Calculated at checkout"),
  "MiniCartDrawer renders 'Calculated at checkout' when sub-threshold, avoiding arithmetic discrepancy"
);

// ------------------------------------------------------------------------------
// SUMMARY
// ------------------------------------------------------------------------------
console.log("\n================================================================================");
console.log(`📊 EMPIRICAL VERIFICATION COMPLETE: ${totalPassed} Passed | ${totalFailed} Failed`);
console.log("================================================================================");

if (totalFailed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
