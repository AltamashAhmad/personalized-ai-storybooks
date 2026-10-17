/**
 * Challenger 2: Tashkeel & Route Resolution Empirical Verification Harness
 * 
 * Tests:
 * 1. Tashkeel diacritics count (>= 10 marks [\u064B-\u0652]) across all 60 spreads in 5 expansion books.
 * 2. Background image asset existence on disk under web/public for all spreads.
 * 3. Additional verse variants (verseArGirl, verseArWithCoStar) Tashkeel counts.
 * 4. Catalog mapping in BOOK_SPREADS_MAP for all 5 expansion books and aliases.
 * 5. Robustness & fallback behavior of getBookSpreads and getProductBySlug.
 * 6. Product catalog assets (coverImage, gallery) existence on disk for all books.
 * 7. Prerender & dynamic sitemap inclusion for all 5 expansion books (EN and AR).
 * 8. Static HTML build audit for all 10 expansion PDP pages (Schema.org, AED pricing, zero undefined).
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import assert from "assert";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");
const WEB_ROOT = path.join(REPO_ROOT, "web");
const PUBLIC_DIR = path.join(WEB_ROOT, "public");

// Dynamic import or load sampleBookData.ts and products.ts
import {
  PEARL_DIVER_SPREADS,
  BABY_MILESTONE_SPREADS,
  SUPER_SIBLING_SPREADS,
  BRAVE_EXPLORER_SPREADS,
  FIRST_RAMADAN_SPREADS,
  BOOK_SPREADS_MAP,
  getBookSpreads,
  SAMPLE_BOOK_SPREADS,
} from "../web/config/sampleBookData.ts";

import {
  PRODUCTS,
  getProductBySlug,
} from "../web/config/products.ts";

console.log("=".repeat(80));
console.log("🔍 CHALLENGER 2: EMPIRICAL TASHKEEL, ROUTE & SPREAD ASSET VERIFICATION");
console.log("=".repeat(80));

const EXPANSION_BOOKS = [
  {
    name: "The Pearl Diver's Secret Treasure",
    slug: "the-pearl-divers-secret-treasure",
    alias: "pearl-diver-treasure",
    spreads: PEARL_DIVER_SPREADS,
  },
  {
    name: "First Steps in the Big World",
    slug: "first-steps-in-the-big-world",
    alias: "baby-milestone-chronicle",
    spreads: BABY_MILESTONE_SPREADS,
  },
  {
    name: "Super Sibling Adventure",
    slug: "super-sibling-adventure-dynamic-duo",
    alias: "super-sibling-adventure",
    spreads: SUPER_SIBLING_SPREADS,
  },
  {
    name: "The Brave Explorer & The Hidden Arabian Oasis",
    slug: "the-brave-explorer-hidden-oasis",
    alias: "brave-explorer-oasis",
    spreads: BRAVE_EXPLORER_SPREADS,
  },
  {
    name: "My First Ramadan & The Lantern of Kindness",
    slug: "my-first-ramadan-lantern-of-kindness",
    alias: "first-ramadan-lantern",
    spreads: FIRST_RAMADAN_SPREADS,
  },
];

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const failureDetails = [];

function check(title, fn) {
  totalChecks++;
  try {
    fn();
    passedChecks++;
    console.log(`  ✅ PASS: ${title}`);
  } catch (err) {
    failedChecks++;
    const msg = err && err.message ? err.message : String(err);
    console.error(`  ❌ FAIL: ${title}`);
    console.error(`     Reason: ${msg}`);
    failureDetails.push({ title, error: msg });
  }
}

const TASHKEEL_REGEX = /[\u064B-\u0652]/g;

function countTashkeel(text) {
  if (!text) return 0;
  const matches = text.match(TASHKEEL_REGEX);
  return matches ? matches.length : 0;
}

// -----------------------------------------------------------------------------
// CHECK 1: Book Count and Spread Counts
// -----------------------------------------------------------------------------
console.log("\n--- PART 1: Spread Inventory & Catalog Map ---");

check("All 5 expansion books are defined", () => {
  assert.strictEqual(EXPANSION_BOOKS.length, 5, "Expected 5 expansion books");
});

let totalExpansionSpreads = 0;
for (const book of EXPANSION_BOOKS) {
  check(`Book "${book.name}" has exactly 12 spreads`, () => {
    assert(Array.isArray(book.spreads), `Spreads for ${book.name} is not an array`);
    assert.strictEqual(book.spreads.length, 12, `Expected 12 spreads for ${book.name}, found ${book.spreads.length}`);
  });
  totalExpansionSpreads += book.spreads.length;

  check(`BOOK_SPREADS_MAP maps primary slug "${book.slug}" to 12 spreads`, () => {
    const fromMap = BOOK_SPREADS_MAP[book.slug];
    assert(fromMap, `Missing mapping for ${book.slug}`);
    assert.strictEqual(fromMap.length, 12, `Expected 12 spreads for ${book.slug}`);
  });

  check(`BOOK_SPREADS_MAP maps alias slug "${book.alias}" to 12 spreads`, () => {
    const fromMap = BOOK_SPREADS_MAP[book.alias];
    assert(fromMap, `Missing mapping for ${book.alias}`);
    assert.strictEqual(fromMap.length, 12, `Expected 12 spreads for ${book.alias}`);
  });

  check(`getBookSpreads("${book.slug}") returns 12 spreads`, () => {
    const spreads = getBookSpreads(book.slug);
    assert.strictEqual(spreads.length, 12, `Expected 12 spreads from getBookSpreads for ${book.slug}`);
  });
}

check("Total expansion spreads across 5 books is exactly 60", () => {
  assert.strictEqual(totalExpansionSpreads, 60, `Expected 60 total spreads, found ${totalExpansionSpreads}`);
});

// -----------------------------------------------------------------------------
// CHECK 2: Tashkeel Diacritic Counts across all 60 Spreads
// -----------------------------------------------------------------------------
console.log("\n--- PART 2: Arabic Tashkeel Marks (>= 10 per verse) ---");

let totalVersesScanned = 0;
const tashkeelStats = [];

for (const book of EXPANSION_BOOKS) {
  console.log(`\n  Scanning Book: ${book.name} (${book.slug})`);
  book.spreads.forEach((spread, idx) => {
    const spreadNum = spread.spreadNumber || idx;
    
    // Primary Arabic verse
    const verseAr = spread.rightPage?.verseAr;
    const countAr = countTashkeel(verseAr);
    totalVersesScanned++;
    tashkeelStats.push({ book: book.slug, spread: spreadNum, field: "verseAr", count: countAr });

    check(`[${book.slug}] Spread ${spreadNum} verseAr has >= 10 Tashkeel marks (found: ${countAr})`, () => {
      assert(typeof verseAr === "string" && verseAr.length > 0, `Missing verseAr on spread ${spreadNum}`);
      assert(
        countAr >= 10,
        `Spread ${spreadNum} verseAr has only ${countAr} Tashkeel marks (< 10). Text: "${verseAr.slice(0, 40)}..."`
      );
    });

    // Optional Girl Arabic verse
    if (spread.rightPage?.verseArGirl) {
      const verseArGirl = spread.rightPage.verseArGirl;
      const countGirl = countTashkeel(verseArGirl);
      totalVersesScanned++;
      tashkeelStats.push({ book: book.slug, spread: spreadNum, field: "verseArGirl", count: countGirl });

      check(`[${book.slug}] Spread ${spreadNum} verseArGirl has >= 10 Tashkeel marks (found: ${countGirl})`, () => {
        assert(
          countGirl >= 10,
          `Spread ${spreadNum} verseArGirl has only ${countGirl} Tashkeel marks (< 10). Text: "${verseArGirl.slice(0, 40)}..."`
        );
      });
    }

    // Optional CoStar Arabic verse
    if (spread.rightPage?.verseArWithCoStar) {
      const verseArCoStar = spread.rightPage.verseArWithCoStar;
      const countCoStar = countTashkeel(verseArCoStar);
      totalVersesScanned++;
      tashkeelStats.push({ book: book.slug, spread: spreadNum, field: "verseArWithCoStar", count: countCoStar });

      check(`[${book.slug}] Spread ${spreadNum} verseArWithCoStar has >= 10 Tashkeel marks (found: ${countCoStar})`, () => {
        assert(
          countCoStar >= 10,
          `Spread ${spreadNum} verseArWithCoStar has only ${countCoStar} Tashkeel marks (< 10). Text: "${verseArCoStar.slice(0, 40)}..."`
        );
      });
    }
  });
}

// -----------------------------------------------------------------------------
// CHECK 3: Spread Image References On Disk (No 404s)
// -----------------------------------------------------------------------------
console.log("\n--- PART 3: Spread Image Disk Asset Verification (Zero 404s) ---");

const imagePathsChecked = new Set();

for (const book of EXPANSION_BOOKS) {
  console.log(`\n  Checking Assets for Book: ${book.name}`);
  book.spreads.forEach((spread, idx) => {
    const spreadNum = spread.spreadNumber || idx;
    const bgImage = spread.bgImage;

    check(`[${book.slug}] Spread ${spreadNum} bgImage is specified`, () => {
      assert(typeof bgImage === "string" && bgImage.trim().length > 0, `Spread ${spreadNum} has empty bgImage`);
    });

    if (bgImage) {
      const relativePath = bgImage.startsWith("/") ? bgImage.slice(1) : bgImage;
      const diskPath = path.join(PUBLIC_DIR, relativePath);
      imagePathsChecked.add(bgImage);

      check(`[${book.slug}] Spread ${spreadNum} image exists on disk: ${bgImage}`, () => {
        assert(
          fs.existsSync(diskPath),
          `Image NOT found on disk! Expected file at: ${diskPath} (bgImage: "${bgImage}")`
        );
        const stat = fs.statSync(diskPath);
        assert(stat.isFile(), `Asset path is not a file: ${diskPath}`);
        assert(stat.size > 0, `Asset file is empty (0 bytes): ${diskPath}`);
      });
    }
  });
}

// -----------------------------------------------------------------------------
// CHECK 4: Robustness & Adversarial Edge Cases for getBookSpreads & getProductBySlug
// -----------------------------------------------------------------------------
console.log("\n--- PART 4: Adversarial Input Robustness & Fallback Integrity ---");

check("getBookSpreads handles unknown slug safely by falling back to SAMPLE_BOOK_SPREADS", () => {
  const result = getBookSpreads("non-existent-random-book-slug-xyz");
  assert.strictEqual(result, SAMPLE_BOOK_SPREADS, "Must fall back to SAMPLE_BOOK_SPREADS");
  assert.strictEqual(result.length, 12, "Fallback must contain 12 spreads");
});

check("getBookSpreads handles empty string safely", () => {
  const result = getBookSpreads("");
  assert.strictEqual(result, SAMPLE_BOOK_SPREADS, "Must fall back to SAMPLE_BOOK_SPREADS on empty string");
});

check("getBookSpreads handles undefined/null safely", () => {
  const result1 = getBookSpreads(undefined);
  assert.strictEqual(result1, SAMPLE_BOOK_SPREADS, "Must fall back to SAMPLE_BOOK_SPREADS on undefined");
  const result2 = getBookSpreads(null);
  assert.strictEqual(result2, SAMPLE_BOOK_SPREADS, "Must fall back to SAMPLE_BOOK_SPREADS on null");
});

check("getProductBySlug returns product for all 5 expansion slugs", () => {
  for (const b of EXPANSION_BOOKS) {
    const p = getProductBySlug(b.slug);
    assert(p, `getProductBySlug failed to find ${b.slug}`);
    assert.strictEqual(p.slug, b.slug);
  }
});

check("getProductBySlug returns undefined for non-existent slug without error", () => {
  const p = getProductBySlug("non-existent-book-xyz");
  assert.strictEqual(p, undefined);
});

// -----------------------------------------------------------------------------
// CHECK 5: Products Catalog Assets (Covers and Galleries on Disk)
// -----------------------------------------------------------------------------
console.log("\n--- PART 5: Product Catalog Cover & Gallery Assets On Disk ---");

for (const book of PRODUCTS) {
  check(`Product "${book.title}" coverImage exists on disk: ${book.coverImage}`, () => {
    const rel = book.coverImage.startsWith("/") ? book.coverImage.slice(1) : book.coverImage;
    const disk = path.join(PUBLIC_DIR, rel);
    assert(fs.existsSync(disk), `Product cover not found: ${disk}`);
    assert(fs.statSync(disk).size > 0, `Product cover is 0 bytes: ${disk}`);
  });

  if (Array.isArray(book.galleryImages)) {
    for (const g of book.galleryImages) {
      check(`Product "${book.id}" gallery image [${g.id}] exists on disk: ${g.src}`, () => {
        const rel = g.src.startsWith("/") ? g.src.slice(1) : g.src;
        const disk = path.join(PUBLIC_DIR, rel);
        assert(fs.existsSync(disk), `Gallery image not found: ${disk}`);
        assert(fs.statSync(disk).size > 0, `Gallery image is 0 bytes: ${disk}`);
      });
    }
  }
}

// -----------------------------------------------------------------------------
// CHECK 6: Prerender & Dynamic Sitemap Verification
// -----------------------------------------------------------------------------
console.log("\n--- PART 6: Prerender Manifest & Static Sitemap Verification ---");

const prerenderManifestPath = path.join(WEB_ROOT, ".next/prerender-manifest.json");
assert(fs.existsSync(prerenderManifestPath), "Prerender manifest must exist");
const prerenderManifest = JSON.parse(fs.readFileSync(prerenderManifestPath, "utf8"));
const prerenderedRoutes = new Set(Object.keys(prerenderManifest.routes));

for (const book of EXPANSION_BOOKS) {
  const enRoute = `/books/${book.slug}`;
  const arRoute = `/ar/books/${book.slug}`;

  check(`Prerender manifest includes English route: ${enRoute}`, () => {
    assert(prerenderedRoutes.has(enRoute), `Route not in prerender-manifest: ${enRoute}`);
  });

  check(`Prerender manifest includes Arabic route: ${arRoute}`, () => {
    assert(prerenderedRoutes.has(arRoute), `Route not in prerender-manifest: ${arRoute}`);
  });
}

// Check sitemap.xml.body
const sitemapBodyPath = path.join(WEB_ROOT, ".next/server/app/sitemap.xml.body");
if (fs.existsSync(sitemapBodyPath)) {
  const sitemapXml = fs.readFileSync(sitemapBodyPath, "utf8");
  for (const book of EXPANSION_BOOKS) {
    const enUrl = `https://personalizedtales.com/books/${book.slug}`;
    const arUrl = `https://personalizedtales.com/ar/books/${book.slug}`;

    check(`Sitemap includes English URL: ${enUrl}`, () => {
      assert(sitemapXml.includes(`<loc>${enUrl}</loc>`), `Sitemap missing ${enUrl}`);
    });

    check(`Sitemap includes Arabic URL: ${arUrl}`, () => {
      assert(sitemapXml.includes(`<loc>${arUrl}</loc>`), `Sitemap missing ${arUrl}`);
    });
  }
}

// -----------------------------------------------------------------------------
// CHECK 7: Static HTML Audit for Expansion Book PDPs
// -----------------------------------------------------------------------------
console.log("\n--- PART 7: Static HTML Build Invariants for Expansion Books ---");

for (const book of EXPANSION_BOOKS) {
  const enHtmlPath = path.join(WEB_ROOT, `.next/server/app/books/${book.slug}.html`);
  const arHtmlPath = path.join(WEB_ROOT, `.next/server/app/ar/books/${book.slug}.html`);

  check(`[EN] ${book.slug}.html exists and passes invariants`, () => {
    assert(fs.existsSync(enHtmlPath), `Missing ${enHtmlPath}`);
    const html = fs.readFileSync(enHtmlPath, "utf8");
    assert(html.includes("application/ld+json"), "Missing JSON-LD structured data");
    assert(html.includes("49") && html.includes("AED"), "Missing 49 AED baseline pricing");
    assert(!html.includes("NaN"), "Leaked NaN");
    assert(!html.includes(">undefined<"), "Leaked >undefined<");
  });

  check(`[AR] ${book.slug}.html exists and passes invariants`, () => {
    assert(fs.existsSync(arHtmlPath), `Missing ${arHtmlPath}`);
    const html = fs.readFileSync(arHtmlPath, "utf8");
    assert(html.includes("application/ld+json"), "Missing JSON-LD structured data");
    assert(html.includes("49") && (html.includes("AED") || html.includes("د.إ")), "Missing 49 AED pricing");
    assert(!html.includes("NaN"), "Leaked NaN");
    assert(!html.includes(">undefined<"), "Leaked >undefined<");
  });
}

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log("\n" + "=".repeat(80));
console.log("📊 CHALLENGER 2 EMPIRICAL AUDIT REPORT");
console.log("=".repeat(80));
console.log(`Total Checks Run:     ${totalChecks}`);
console.log(`Passed Checks:        ${passedChecks}`);
console.log(`Failed Checks:        ${failedChecks}`);
console.log(`Total Verses Scanned: ${totalVersesScanned}`);
console.log(`Unique Image Assets:  ${imagePathsChecked.size}`);

const minTashkeel = Math.min(...tashkeelStats.map(s => s.count));
const maxTashkeel = Math.max(...tashkeelStats.map(s => s.count));
const avgTashkeel = (tashkeelStats.reduce((acc, s) => acc + s.count, 0) / tashkeelStats.length).toFixed(1);

console.log(`Tashkeel Stats:       Min = ${minTashkeel} marks | Max = ${maxTashkeel} marks | Avg = ${avgTashkeel} marks`);

if (failedChecks > 0) {
  console.error("\n❌ FAILED CHECKS SUMMARY:");
  failureDetails.forEach((f, i) => {
    console.error(`  ${i + 1}. ${f.title}: ${f.error}`);
  });
  process.exit(1);
} else {
  console.log("\n🎉 ALL EMPIRICAL TASHKEEL, ROUTE, AND ASSET VERIFICATION CHECKS PASSED!");
  process.exit(0);
}
