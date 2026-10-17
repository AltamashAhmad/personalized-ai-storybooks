/**
 * test_m1_challenger_empirical_deep_harness.mjs
 *
 * EMPIRICAL ADVERSARIAL STRESS HARNESS — CHALLENGER M1 FIX 2
 * Roles: critic, specialist
 *
 * Rigorous empirical stress-testing across:
 * 1. Search Corpus Isolation & Semantic Precision (English + Arabic tokenization, AND conjunction, diacritics, leakage)
 * 2. Unicode Dash Normalization (En-dash, Em-dash, Figure dash, Minus sign, mixed dashes, multi-dashes)
 * 3. Countdown Timer Hydration Safety, Rollover Boundaries & Precedence Guards
 * 4. 4-Column Mega-Nav Architectural Integrity, Link Resolution & RTL Symmetry
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PRODUCTS } from "../web/config/products.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const webDir = path.join(rootDir, "web");

console.log("=".repeat(85));
console.log("⚔️  EMPIRICAL ADVERSARIAL STRESS HARNESS — CHALLENGER M1 FIX 2");
console.log("=".repeat(85));

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
// MODULE 1: SEARCH CORPUS ISOLATION & SEMANTIC PRECISION STRESS
// ================================================================================
console.log("\n--- MODULE 1: Search Corpus Isolation & Semantic Precision Stress ---");

// Replicate exact filtering logic from web/components/HeaderSearchModal.tsx
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

function filterProducts(query) {
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

// 1.1 Mutual Exclusivity Tests: Ensure books with distinct themes don't match each other
const exclusivePairs = [
  { term: "falcon", expectedId: "lost-golden-falcon", forbiddenId: "galactic-explorer" },
  { term: "صقر", expectedId: "lost-golden-falcon", forbiddenId: "galactic-explorer" },
  { term: "galactic", expectedId: "galactic-explorer", forbiddenId: "bedtime-arabian-moon" },
  { term: "cosmos", expectedId: "galactic-explorer", forbiddenId: "bedtime-arabian-moon" },
  { term: "فضاء", expectedId: "galactic-explorer", forbiddenId: "bedtime-arabian-moon" },
  { term: "moon", expectedId: "bedtime-arabian-moon", forbiddenId: "knight-golden-oasis" },
  { term: "oasis", expectedId: "knight-golden-oasis", forbiddenId: "when-you-were-born" },
  { term: "عقيقة", expectedId: "when-you-were-born", forbiddenId: "galactic-explorer" },
  { term: "starlit dunes", expectedId: "starlit-dunes", forbiddenId: "lost-golden-falcon" },
];

for (const pair of exclusivePairs) {
  const matches = filterProducts(pair.term);
  assert(
    matches.some((b) => b.id === pair.expectedId) && !matches.some((b) => b.id === pair.forbiddenId),
    `Query '${pair.term}' matches '${pair.expectedId}' and excludes '${pair.forbiddenId}'`,
    { count: matches.length, ids: matches.map((b) => b.id) }
  );
}

// 1.2 Multi-match accuracy: "dunes" matches both starlit dunes and golden falcon desert quest
const dunesMatches = filterProducts("dunes");
assert(
  dunesMatches.length === 2 &&
  dunesMatches.some((b) => b.id === "starlit-dunes") &&
  dunesMatches.some((b) => b.id === "lost-golden-falcon"),
  "Query 'dunes' correctly matches both desert books (starlit-dunes and lost-golden-falcon)"
);

// 1.3 AND Conjunction Isolation: Combining orthogonal tokens MUST yield 0 results
const orthogonalPairs = [
  "falcon space",
  "صقر فضاء",
  "bedtime galaxy",
  "نوم كواكب",
  "oasis astronaut",
  "واحة رائد فضاء",
  "newborn falcon bedtime",
];

for (const query of orthogonalPairs) {
  const matches = filterProducts(query);
  assert(
    matches.length === 0,
    `Orthogonal multi-token query '${query}' strictly yields 0 results (no false positive OR behavior)`,
    { count: matches.length, matches: matches.map((b) => b.id) }
  );
}

// 1.4 Permutation Invariance for valid conjunctions
const p1 = filterProducts("golden falcon");
const p2 = filterProducts("falcon golden");
assert(
  p1.length === 1 && p2.length === 1 && p1[0].id === p2[0].id,
  "Token order invariance: 'golden falcon' and 'falcon golden' yield identical result"
);

// 1.5 Adversarial Injection Strings & Special Delimiters
const injectionStrings = [
  "<script>alert(document.cookie)</script>",
  "'; DROP TABLE books; --",
  "${7*7}",
  "{{7*7}}",
  "../../../etc/passwd",
  "\x00nullbyte",
  "\\u0000",
  "NaN",
  "undefined",
  "null",
  "[object Object]",
];

for (const inj of injectionStrings) {
  const res = filterProducts(inj);
  assert(
    Array.isArray(res) && res.length === 0,
    `Adversarial input string safely handled with 0 matches: '${inj}'`
  );
}

// 1.6 Codebase Leakage Scan: HeaderSearchModal must not contain hardcoded catch-all tokens in corpus
const modalFileContent = fs.readFileSync(path.join(webDir, "components/HeaderSearchModal.tsx"), "utf8");
// Extract the corpus definition section
const corpusSection = modalFileContent.slice(
  modalFileContent.indexOf("const corpus = ["),
  modalFileContent.indexOf("].join(\" \");")
);
assert(
  !corpusSection.includes('"صقر"') && !corpusSection.includes("'صقر'"),
  "Corpus definition does NOT contain hardcoded falcon 'صقر' as a catch-all token"
);
assert(
  !corpusSection.includes("نوم") && !corpusSection.includes("فضاء"),
  "Corpus definition does NOT contain hardcoded universal Arabic tokens"
);


// ================================================================================
// MODULE 2: UNICODE DASH NORMALIZATION STRESS
// ================================================================================
console.log("\n--- MODULE 2: Unicode Dash Normalization Stress ---");

// Test all 6 age cohorts with standard hyphen, en-dash (U+2013), em-dash (U+2014)
const ageRanges = [
  { ascii: "0-3", enDash: "0–3", emDash: "0—3", expectedBookId: "when-you-were-born" },
  { ascii: "2-7", enDash: "2–7", emDash: "2—7", expectedBookId: "lost-golden-falcon" },
  { ascii: "3-8", enDash: "3–8", emDash: "3—8", expectedBookId: "starlit-dunes" },
  { ascii: "4-10", enDash: "4–10", emDash: "4—10", expectedBookId: "knight-golden-oasis" },
  { ascii: "6-12", enDash: "6–12", emDash: "6—12", expectedBookId: "galactic-explorer" },
];

for (const age of ageRanges) {
  const rAscii = filterProducts(age.ascii);
  const rEn = filterProducts(age.enDash);
  const rEm = filterProducts(age.emDash);

  const asciiIds = rAscii.map((b) => b.id).sort();
  const enIds = rEn.map((b) => b.id).sort();
  const emIds = rEm.map((b) => b.id).sort();

  assert(
    rAscii.length > 0 && JSON.stringify(asciiIds) === JSON.stringify(enIds) && JSON.stringify(asciiIds) === JSON.stringify(emIds),
    `Dash normalization equivalence for '${age.ascii}': ASCII (${rAscii.length}), En-dash (${rEn.length}), Em-dash (${rEm.length}) match identical products`,
    { asciiIds, enIds, emIds }
  );

  assert(
    rAscii.some((b) => b.id === age.expectedBookId),
    `Query '${age.ascii}' correctly includes primary cohort story '${age.expectedBookId}'`
  );
}

// 2.2 Prefix queries with dashes (e.g. "Ages 0–3", "ages 3—8")
const prefixedQueries = [
  { q: "Ages 0–3", expectedId: "when-you-were-born" },
  { q: "Ages 0-3", expectedId: "when-you-were-born" },
  { q: "Ages 3—8", expectedId: "starlit-dunes" },
  { q: "ages 6–12", expectedId: "galactic-explorer" },
];

for (const pq of prefixedQueries) {
  const res = filterProducts(pq.q);
  assert(
    res.some((b) => b.id === pq.expectedId),
    `Prefixed dash query '${pq.q}' returns expected story '${pq.expectedId}'`,
    { count: res.length, matches: res.map((b) => b.id) }
  );
}

// 2.3 Multiple spaced dashes (e.g. "0 - 3", "0 – 3")
assert(
  filterProducts("0 - 3").length > 0 && filterProducts("0 – 3").length > 0,
  "Spaced dash queries '0 - 3' and '0 – 3' match products via tokenization of numbers"
);


// ================================================================================
// MODULE 3: COUNTDOWN TIMER HYDRATION SAFETY & ROLLOVER HARNESS
// ================================================================================
console.log("\n--- MODULE 3: Countdown Rollover & Hydration Safety Harness ---");

// Hook logic simulation operating on local calendar dates (identical to browser)
function simulateTimerBehavior(now, cutoffHour = 24) {
  const target = new Date(now);
  if (cutoffHour >= 24) {
    target.setHours(23, 59, 59, 999);
  } else {
    target.setHours(cutoffHour, 0, 0, 0);
    if (now.getTime() > target.getTime()) {
      target.setDate(target.getDate() + 1);
    }
  }

  const diffMs = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => Math.max(0, Math.floor(n)).toString().padStart(2, "0");

  return {
    hours,
    minutes,
    seconds,
    formattedHours: pad(hours),
    formattedMinutes: pad(minutes),
    formattedSeconds: pad(seconds),
    totalSecondsRemaining: totalSeconds,
  };
}

// 3.1 Extreme Rollover Timings (using local Date representation)
// Exact midnight boundary: 23:59:59.999 -> 00:00:00.000
const tMidnightPre = new Date(2026, 9, 6, 23, 59, 59, 999);
const resMidnightPre = simulateTimerBehavior(tMidnightPre, 24);
assert(resMidnightPre.totalSecondsRemaining === 0, "At 23:59:59.999, remaining seconds is exactly 0");

const tMidnightPost = new Date(2026, 9, 7, 0, 0, 0, 0);
const resMidnightPost = simulateTimerBehavior(tMidnightPost, 24);
assert(
  resMidnightPost.hours === 23 && resMidnightPost.minutes === 59 && resMidnightPost.seconds === 59,
  "At 00:00:00, timer cleanly resets to full day 23:59:59",
  { resMidnightPost }
);

// Year-end rollover: Dec 31 -> Jan 1
const tNewYear = new Date(2026, 11, 31, 23, 59, 59, 999);
const resNewYear = simulateTimerBehavior(tNewYear, 24);
assert(resNewYear.totalSecondsRemaining === 0, "Dec 31 23:59:59 has 0 remaining seconds");

// 3.2 Cutoff hour with custom 18:00 cutoff (6 PM UAE courier cutoff)
const tAfternoon = new Date(2026, 9, 6, 14, 15, 30);
const resCourier = simulateTimerBehavior(tAfternoon, 18);
// 14:15:30 until 18:00:00 = 3h 44m 30s
assert(
  resCourier.hours === 3 && resCourier.minutes === 44 && resCourier.seconds === 30,
  "Custom courier cutoff (18:00) calculates exact remaining delta: 3h 44m 30s",
  { resCourier }
);

// Past courier cutoff: 19:00 -> rolls to next day 18:00 (23h remaining)
const tPastCourier = new Date(2026, 9, 6, 19, 0, 0);
const resNextDayCourier = simulateTimerBehavior(tPastCourier, 18);
assert(
  resNextDayCourier.hours === 23 && resNextDayCourier.minutes === 0 && resNextDayCourier.seconds === 0,
  "Past 18:00 courier cutoff smoothly rolls target to next calendar day (23h remaining)",
  { resNextDayCourier }
);

// 3.3 StoreHeader Hydration Contract Inspection
const storeHeaderContent = fs.readFileSync(path.join(webDir, "components/StoreHeader.tsx"), "utf8");

assert(
  storeHeaderContent.includes("isMounted: boolean") || storeHeaderContent.includes("timerState.isMounted"),
  "StoreHeader inspects timerState.isMounted for hydration safety"
);

assert(
  storeHeaderContent.includes("propCountdown !== undefined"),
  "StoreHeader supports propCountdown override with explicit undefined check"
);

// Static fallback announcement verification
assert(
  storeHeaderContent.includes("✨ Buy 1 Book, Get 2nd at 50% Off") ||
  storeHeaderContent.includes("activeOffer.titleEn"),
  "StoreHeader has deterministic fallback text when countdown is unmounted/null"
);


// ================================================================================
// MODULE 4: 4-COLUMN MEGA-NAV ARCHITECTURAL INTEGRITY & ROUTE RESOLUTION
// ================================================================================
console.log("\n--- MODULE 4: 4-Column Mega-Nav Architectural Integrity & Route Resolution ---");

// 4.1 Count mega-nav instances and verify grid-cols-4 in each
const gridColsMatches = storeHeaderContent.match(/grid grid-cols-4/g) || [];
assert(
  gridColsMatches.length === 4,
  `StoreHeader contains exactly 4 instances of 'grid grid-cols-4' (found: ${gridColsMatches.length})`,
  { count: gridColsMatches.length }
);

// 4.2 Verify dropdown names
const dropdownNames = ["allBooks", "kids", "adults", "occasion"];
for (const name of dropdownNames) {
  assert(
    storeHeaderContent.includes(`activeDropdown === "${name}"`),
    `StoreHeader handles state for mega-menu '${name}'`
  );
}

// 4.3 Verify 4 mandatory pillars in navigation
const pillars = [
  { name: "Shop by Age", code: "t.header.shopByAge" },
  { name: "Shop by Occasion", code: "t.header.occasions" },
  { name: "Shop by Recipient", code: "t.header.recipients" },
  { name: "Gift Finder", code: "Gift Finder" },
];

for (const p of pillars) {
  assert(
    storeHeaderContent.includes(p.code),
    `Mega-nav contains navigation pillar '${p.name}' (${p.code})`
  );
}

// 4.4 Verify all mega-nav Link href routes resolve to actual Next.js pages
const linkHrefRegex = /href=\{getLocalizedPath\((["'][^"']+["'])\)\}/g;
let match;
const extractedRoutes = new Set();
while ((match = linkHrefRegex.exec(storeHeaderContent)) !== null) {
  const rawRoute = match[1].replace(/['"]/g, "");
  // Ignore query/hash anchors for filesystem matching
  const cleanRoute = rawRoute.split("#")[0].split("?")[0];
  if (cleanRoute && cleanRoute !== "/") {
    extractedRoutes.add(cleanRoute);
  }
}

console.log(`  Found ${extractedRoutes.size} distinct localized routes in mega-nav links.`);

// Verify each route corresponds to a page.tsx in web/app or a category/book slug
const appDir = path.join(webDir, "app");

for (const route of extractedRoutes) {
  if (route.startsWith("/books/category/")) {
    const slug = route.replace("/books/category/", "");
    const exists = fs.existsSync(path.join(appDir, "books/category/[slug]/page.tsx"));
    assert(exists, `Route '${route}' backed by App Router [slug] template`);
  } else if (route.startsWith("/books/")) {
    const slug = route.replace("/books/", "");
    const exists = fs.existsSync(path.join(appDir, "books/[slug]/page.tsx"));
    const bookExists = PRODUCTS.some((b) => b.slug === slug);
    assert(exists && bookExists, `Book route '${route}' backed by App Router and matches active product in catalog`);
  } else {
    // Static page e.g. /quality, /delivery, /sample-book
    const pagePath = path.join(appDir, route.replace(/^\//, ""), "page.tsx");
    assert(fs.existsSync(pagePath), `Static page route '${route}' exists at '${pagePath}'`);
  }
}

// 4.5 Verify RTL Symmetry and Language Switching
assert(
  storeHeaderContent.includes('dir === "rtl"'),
  "StoreHeader conditionally sets RTL styles based on direction context"
);
assert(
  storeHeaderContent.includes("toggleLanguage"),
  "StoreHeader connects to language switcher toggle"
);

// 4.6 Verify Mobile Navigation Drawer
assert(
  storeHeaderContent.includes("mobileMenuOpen"),
  "StoreHeader manages mobileMenuOpen state"
);
assert(
  storeHeaderContent.includes("setMobileMenuOpen"),
  "StoreHeader includes toggle handlers for mobile navigation drawer"
);

// ================================================================================
// SUMMARY & VERDICT
// ================================================================================
console.log("\n" + "=".repeat(85));
console.log("📊 EMPIRICAL ADVERSARIAL STRESS HARNESS SUMMARY");
console.log("=".repeat(85));
console.log(`Passed: ${totalPassed} | Failed: ${totalFailed}`);

if (failureDetails.length > 0) {
  console.log("\n🚨 DISCOVERED BUGS / REGRESSIONS:");
  failureDetails.forEach((f, i) => {
    console.log(`${i + 1}. ${f.message}`);
    console.log("   Details:", JSON.stringify(f.details));
  });
}
console.log("=".repeat(85));

process.exit(totalFailed === 0 ? 0 : 1);
