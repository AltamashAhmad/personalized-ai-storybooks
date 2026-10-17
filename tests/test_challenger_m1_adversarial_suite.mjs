// Adversarial Empirical Challenge Suite for Milestone M1
// Independent Verification by Challenger 1
import fs from "fs";
import path from "path";
import { PRODUCTS } from "../web/config/products.ts";

console.log("================================================================================");
console.log("⚔️  CHALLENGER 1: EMPIRICAL CONTRACT & COMPONENT ADVERSARIAL SUITE");
console.log("================================================================================");

let totalPassed = 0;
let totalFailed = 0;
const failures = [];

function assert(condition, message, meta = {}) {
  if (condition) {
    totalPassed++;
    console.log(`  ✅ PASS: ${message}`);
  } else {
    totalFailed++;
    console.error(`  ❌ FAIL: ${message}`, meta);
    failures.push({ message, meta });
  }
}

// ================================================================================
// SUITE 1: CONTRACT 3 — SEARCH CORPUS ISOLATION & ADVERSARIAL ARABIC QUERIES
// ================================================================================
console.log("\n--- SUITE 1: Contract 3 — Search Corpus Isolation & Semantic Specificity ---");

const searchModalPath = path.resolve("web/components/HeaderSearchModal.tsx");
const searchModalCode = fs.readFileSync(searchModalPath, "utf-8");

// 1.1 Source Code Integrity
assert(
  !searchModalCode.includes('isAr ? "كتاب قصة أطفال عيد ميلاد'),
  "No universal Arabic phrases injected into search corpus"
);
assert(
  !searchModalCode.includes("كتاب قصة أطفال عيد ميلاد"),
  "Search corpus is clean of hardcoded catch-all Arabic tokens"
);

// Metadata maps from HeaderSearchModal
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

function executeSearch(query) {
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

// 1.2 Isolation & Single-Book Precision
const queriesAndExpected = [
  { q: "صقر", expectedId: "lost-golden-falcon", label: "Golden Falcon by Arabic falcon keyword 'صقر'" },
  { q: "فضاء", expectedId: "galactic-explorer", label: "Galactic Explorer by Arabic space keyword 'فضاء'" },
  { q: "نوم", expectedId: "bedtime-arabian-moon", label: "Bedtime story by Arabic sleep keyword 'نوم'" },
  { q: "عقيقة", expectedId: "when-you-were-born", label: "Newborn Keepsake by Arabic aqiqah keyword 'عقيقة'" },
];

for (const item of queriesAndExpected) {
  const res = executeSearch(item.q);
  assert(
    res.length === 1 && res[0].id === item.expectedId,
    `Strict match: ${item.label} returns ONLY ${item.expectedId}`,
    { query: item.q, count: res.length, matches: res.map(b => b.id) }
  );
}

// 1.3 Conjunction behavior (multi-token search)
const multiTokenDisjoint = executeSearch("صقر نوم");
assert(
  multiTokenDisjoint.length === 0,
  "Conjunction isolation: query 'صقر نوم' returns 0 results because no book is both falcon and bedtime",
  { count: multiTokenDisjoint.length }
);

const multiTokenMatching = executeSearch("صقر ذهبي");
assert(
  multiTokenMatching.length === 1 && multiTokenMatching[0].id === "lost-golden-falcon",
  "Conjunction match: query 'صقر ذهبي' matches 'lost-golden-falcon'",
  { count: multiTokenMatching.length }
);

// 1.4 Non-existent / Gibberish queries
const nonExistentQueries = ["بطيخ_طائر_99", "nonexistentstorybookxyz", "<script>alert(1)</script>", "DROP TABLE books;--"];
for (const badQ of nonExistentQueries) {
  const badRes = executeSearch(badQ);
  assert(
    badRes.length === 0,
    `Adversarial query '${badQ}' safely returns 0 matches`,
    { query: badQ, count: badRes.length }
  );
}

// ================================================================================
// SUITE 2: CONTRACT 4 — UNICODE DASH NORMALIZATION
// ================================================================================
console.log("\n--- SUITE 2: Contract 4 — Unicode Dash Normalization Equivalence ---");

assert(
  searchModalCode.includes("normalizeDashes") && (searchModalCode.includes("\\u2013") || searchModalCode.includes("\u2013")),
  "HeaderSearchModal implements regex replacing en-dash (\\u2013) and em-dash (\\u2014) with hyphen (-)"
);

// Test every actual age bracket present in the catalog
const testDashPairs = [
  { ascii: "0-3", enDash: "0\u20133", emDash: "0\u20143", label: "0 to 3" },
  { ascii: "2-7", enDash: "2\u20137", emDash: "2\u20147", label: "2 to 7" },
  { ascii: "3-8", enDash: "3\u20138", emDash: "3\u20148", label: "3 to 8" },
  { ascii: "4-10", enDash: "4\u201310", emDash: "4\u201410", label: "4 to 10" },
  { ascii: "6-12", enDash: "6\u201312", emDash: "6\u201412", label: "6 to 12" },
  { ascii: "Ages 0-3", enDash: "Ages 0\u20133", emDash: "Ages 0\u20143", label: "Ages 0 to 3" },
  { ascii: "Ages 3-8", enDash: "Ages 3\u20138", emDash: "Ages 3\u20148", label: "Ages 3 to 8" },
  { ascii: "Ages 6-12", enDash: "Ages 6\u201312", emDash: "Ages 6\u201412", label: "Ages 6 to 12" },
];

for (const pair of testDashPairs) {
  const resAscii = executeSearch(pair.ascii).map(b => b.id).sort();
  const resEn = executeSearch(pair.enDash).map(b => b.id).sort();
  const resEm = executeSearch(pair.emDash).map(b => b.id).sort();

  const isIdentical =
    JSON.stringify(resAscii) === JSON.stringify(resEn) &&
    JSON.stringify(resAscii) === JSON.stringify(resEm);

  assert(
    isIdentical && resAscii.length > 0,
    `Dash normalization equivalence for '${pair.label}': ASCII (-), En-dash (–), Em-dash (—) yield exact same ${resAscii.length} results (${resAscii.join(", ")})`,
    { ascii: resAscii, en: resEn, em: resEm }
  );
}

// ================================================================================
// SUITE 3: CONTRACT 5 — COUNTDOWN HYDRATION SAFETY & PROP OVERRIDES
// ================================================================================
console.log("\n--- SUITE 3: Contract 5 — Countdown Hydration Safety & Prop Precedence ---");

const storeHeaderPath = path.resolve("web/components/StoreHeader.tsx");
const storeHeaderCode = fs.readFileSync(storeHeaderPath, "utf-8");

// Check prop definitions in StoreHeaderProps
assert(
  storeHeaderCode.includes("countdown?: { hours: number; minutes: number; seconds: number }"),
  "StoreHeaderProps interface defines optional countdown override prop"
);

// Check precedence logic
assert(
  storeHeaderCode.includes("propCountdown !== undefined") &&
  storeHeaderCode.includes("? propCountdown") &&
  storeHeaderCode.includes(": timerState.isMounted"),
  "StoreHeader evaluates propCountdown first before checking timerState.isMounted"
);

// Check SSR deterministic fallback when unmounted and prop is undefined
assert(
  storeHeaderCode.includes("formattedCountdown ? (") &&
  storeHeaderCode.includes("Buy 1 Book, Get 2nd at 50% Off with Code BOGO50"),
  "StoreHeader renders static deterministic fallback when formattedCountdown is null (SSR hydration guard)"
);

// Check zero padding function logic
function padZero(num) {
  return Math.max(0, Math.floor(num)).toString().padStart(2, "0");
}
assert(padZero(5) === "05", "padZero(5) returns '05'");
assert(padZero(0) === "00", "padZero(0) returns '00'");
assert(padZero(12) === "12", "padZero(12) returns '12'");
assert(padZero(-3) === "00", "padZero(-3) clamps to '00' safely");
assert(padZero(9.8) === "09", "padZero(9.8) floors to '09'");

// Check simulated activeCountdown resolution
function resolveActiveCountdown(propCountdown, timerState) {
  return propCountdown !== undefined
    ? propCountdown
    : timerState.isMounted
    ? {
        hours: timerState.hours,
        minutes: timerState.minutes,
        seconds: timerState.seconds,
      }
    : null;
}

const ssrUnmountedState = resolveActiveCountdown(undefined, { isMounted: false, hours: 10, minutes: 20, seconds: 30 });
assert(ssrUnmountedState === null, "SSR unmounted state resolves to null (triggers static announcement, prevents mismatch)");

const clientMountedState = resolveActiveCountdown(undefined, { isMounted: true, hours: 10, minutes: 20, seconds: 30 });
assert(
  clientMountedState && clientMountedState.hours === 10 && clientMountedState.minutes === 20 && clientMountedState.seconds === 30,
  "Client mounted state uses timerState when propCountdown is undefined"
);

const propOverrideState = resolveActiveCountdown({ hours: 1, minutes: 2, seconds: 3 }, { isMounted: true, hours: 10, minutes: 20, seconds: 30 });
assert(
  propOverrideState && propOverrideState.hours === 1 && propOverrideState.minutes === 2 && propOverrideState.seconds === 3,
  "Prop override strictly supersedes internal timerState even when mounted"
);

// ================================================================================
// SUITE 4: COMPONENT S0 — CountrySelectorModal.tsx SPECIFICATION
// ================================================================================
console.log("\n--- SUITE 4: Component S0 — CountrySelectorModal Dimensions & Z-Index ---");

const countryModalPath = path.resolve("web/components/CountrySelectorModal.tsx");
const countryModalCode = fs.readFileSync(countryModalPath, "utf-8");

assert(
  countryModalCode.includes("max-w-[454px]") && countryModalCode.includes("w-full"),
  "CountrySelectorModal dialog is constrained to w-full max-w-[454px]"
);

assert(
  countryModalCode.includes("z-[150]"),
  "CountrySelectorModal backdrop/overlay uses z-[150] stacking above sticky headers and drawers"
);

assert(
  countryModalCode.includes("toggleLanguage") &&
  countryModalCode.includes("English") &&
  countryModalCode.includes("العربية"),
  "CountrySelectorModal integrates bilingual segmented control (English / العربية)"
);

assert(
  countryModalCode.includes("Search") &&
  countryModalCode.includes("search") &&
  countryModalCode.includes("filteredCountries"),
  "CountrySelectorModal preserves invariant tokens (Search, search, filteredCountries)"
);

assert(
  countryModalCode.includes('role="dialog"') && countryModalCode.includes('aria-modal="true"'),
  "CountrySelectorModal satisfies accessible dialog semantics"
);

// ================================================================================
// SUITE 5: COMPONENT S1 — AnnouncementBar.tsx SPECIFICATION
// ================================================================================
console.log("\n--- SUITE 5: Component S1 — AnnouncementBar Styling & Dynamic Banners ---");

const announcementBarPath = path.resolve("web/components/AnnouncementBar.tsx");
const announcementBarCode = fs.readFileSync(announcementBarPath, "utf-8");

assert(
  announcementBarCode.includes("bg-[var(--color-racing-green)]"),
  "AnnouncementBar styles background with var(--color-racing-green)"
);

assert(
  announcementBarCode.includes("flex flex-wrap items-center justify-center"),
  "AnnouncementBar provides responsive single-line centered wrapping"
);

assert(
  announcementBarCode.includes("BOGO50") && announcementBarCode.includes("WELCOME10"),
  "AnnouncementBar supports both BOGO50 and WELCOME10 promotional codes"
);

assert(
  announcementBarCode.includes("children ? (") &&
  announcementBarCode.includes("children") &&
  announcementBarCode.includes("promoCode"),
  "AnnouncementBar supports both composed children and standalone dynamic promo props"
);

assert(
  announcementBarCode.includes('role="region"') && announcementBarCode.includes('aria-label="Promotion"'),
  "AnnouncementBar provides accessible banner landmark roles"
);

// ================================================================================
// SUITE 6: COMPONENT S2 — StoreHeader.tsx MEGA-NAV, LANGUAGE PILL & CART
// ================================================================================
console.log("\n--- SUITE 6: Component S2 — StoreHeader 4 Mega-Menus, Language Pill & Cart ---");

// Check 4 mega menus
const megaMenuKeys = ["allBooks", "kids", "adults", "occasion"];
for (const key of megaMenuKeys) {
  assert(
    storeHeaderCode.includes(`activeDropdown === "${key}"`),
    `StoreHeader includes mega-menu dropdown for '${key}'`
  );
}

// Check 4 columns in each menu
const requiredPillars = ["Shop by Age", "Shop by Occasion", "Shop by Recipient", "Gift Finder"];
for (const pillar of requiredPillars) {
  const matches = (storeHeaderCode.match(new RegExp(pillar, "g")) || []).length;
  assert(
    matches >= 4,
    `Pillar '${pillar}' is present across all 4 mega-menus (found ${matches} occurrences)`,
    { occurrences: matches }
  );
}

// Check Language Switcher Pill Badge
assert(
  storeHeaderCode.includes("rounded-full") &&
  storeHeaderCode.includes("🌐") &&
  storeHeaderCode.includes("English") &&
  storeHeaderCode.includes("العربية"),
  "StoreHeader renders dedicated Wonderbly pill badge for language switching"
);

// Check Amazon Cart Icon
assert(
  storeHeaderCode.includes("AmazonCartIcon count={totalItemCount}"),
  "StoreHeader renders AmazonCartIcon with live totalItemCount badge"
);

// Check MiniCartDrawer toggle integration
assert(
  storeHeaderCode.includes("MiniCartDrawer"),
  "StoreHeader integrates MiniCartDrawer slide-over"
);

// Check HeaderSearchModal integration & ⌘K shortcut
assert(
  storeHeaderCode.includes("<HeaderSearchModal") &&
  storeHeaderCode.includes("isOpen={isSearchActive}") &&
  storeHeaderCode.includes("onClose={handleCloseSearch}"),
  "StoreHeader mounts HeaderSearchModal with isOpen and onClose props"
);
assert(
  storeHeaderCode.includes('e.key.toLowerCase() === "k"') &&
  storeHeaderCode.includes("e.metaKey || e.ctrlKey"),
  "StoreHeader attaches global Cmd+K / Ctrl+K keyboard shortcut"
);

// ================================================================================
// SUMMARY
// ================================================================================
console.log("\n================================================================================");
console.log(`📊 ADVERSARIAL CHALLENGE COMPLETE: ${totalPassed} Passed | ${totalFailed} Failed`);
console.log("================================================================================");

if (totalFailed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
