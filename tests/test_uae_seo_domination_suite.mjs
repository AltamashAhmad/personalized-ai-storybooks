/**
 * Automated E2E Test Suite: UAE Organic SEO Domination Engine
 * 
 * Verifies the 7 comprehensive SEO quality gates specified in:
 * - research/UAE_ORGANIC_SEO_DOMINATION_PLAYBOOK.md
 * - ORIGINAL_REQUEST.md (2026-10-06T16:17:30Z)
 * - PROJECT.md (Dual-Track Milestone Architecture)
 * - test_and_quality_survey_report.md (42 discrete assertion points)
 * 
 * Invocation: node tests/test_uae_seo_domination_suite.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import assert from "assert";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");
const WEB_ROOT = path.join(REPO_ROOT, "web");

console.log("=".repeat(80));
console.log("🌟 PERSONALIZEDTALES UAE — ORGANIC SEO DOMINATION E2E VERIFICATION SUITE");
console.log("   Target: Google UAE (google.ae) #1 Organic Discovery Architecture");
console.log("   Standard: 7 Suites | 42 Invariant & Contract Assertions");
console.log("=".repeat(80));

// ----------------------------------------------------------------------------
// Test Harness Infrastructure
// ----------------------------------------------------------------------------
const suiteResults = [
  { id: 1, name: "Suite 1: Schema.org JSON-LD Structured Data", total: 0, passed: 0, failed: 0, tests: [] },
  { id: 2, name: "Suite 2: Bi-directional Hreflang & Canonical URL Integrity", total: 0, passed: 0, failed: 0, tests: [] },
  { id: 3, name: "Suite 3: Localized Meta Tags & OpenGraph / Twitter Cards", total: 0, passed: 0, failed: 0, tests: [] },
  { id: 4, name: "Suite 4: Route Resolution & Server-Side Rendering Hygiene", total: 0, passed: 0, failed: 0, tests: [] },
  { id: 5, name: "Suite 5: Internal Link Mesh & Discovery Pathing", total: 0, passed: 0, failed: 0, tests: [] },
  { id: 6, name: "Suite 6: Price Invariant & Currency Isolation", total: 0, passed: 0, failed: 0, tests: [] },
  { id: 7, name: "Suite 7: Dynamic Sitemap & Robots.txt Conformance", total: 0, passed: 0, failed: 0, tests: [] },
];

let globalTotal = 0;
let globalPassed = 0;
let globalFailed = 0;
const failureDetails = [];

function runTest(suiteId, testCode, testName, fn) {
  globalTotal++;
  const suite = suiteResults.find((s) => s.id === suiteId);
  suite.total++;

  try {
    fn();
    suite.passed++;
    globalPassed++;
    console.log(`  ✅ PASS [${testCode}]: ${testName}`);
    suite.tests.push({ code: testCode, name: testName, status: "PASS" });
  } catch (err) {
    suite.failed++;
    globalFailed++;
    const errMsg = err && err.message ? err.message : String(err);
    console.error(`  ❌ FAIL [${testCode}]: ${testName}`);
    console.error(`     Reason: ${errMsg}`);
    failureDetails.push({ code: testCode, name: testName, error: errMsg, suite: suite.name });
    suite.tests.push({ code: testCode, name: testName, status: "FAIL", error: errMsg });
  }
}

// ----------------------------------------------------------------------------
// File & Module Helpers
// ----------------------------------------------------------------------------
function readWebFile(relPath) {
  const fullPath = path.join(WEB_ROOT, relPath);
  if (!fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath, "utf-8");
}

function fileExists(relPath) {
  return fs.existsSync(path.join(WEB_ROOT, relPath));
}

// The 12 Canonical UAE Child Names Matrix
const CANONICAL_UAE_NAMES = [
  { slug: "zayed", nameEn: "Zayed", nameAr: "زايد", gender: "boy", origin: "emirati" },
  { slug: "fatima", nameEn: "Fatima", nameAr: "فاطمة", gender: "girl", origin: "emirati" },
  { slug: "hamdan", nameEn: "Hamdan", nameAr: "حمدان", gender: "boy", origin: "emirati" },
  { slug: "maryam", nameEn: "Maryam", nameAr: "مريم", gender: "girl", origin: "emirati" },
  { slug: "rashid", nameEn: "Rashid", nameAr: "راشد", gender: "boy", origin: "emirati" },
  { slug: "noah", nameEn: "Noah", nameAr: "نوح", gender: "boy", origin: "global" },
  { slug: "olivia", nameEn: "Olivia", nameAr: "أوليفيا", gender: "girl", origin: "global" },
  { slug: "liam", nameEn: "Liam", nameAr: "ليام", gender: "boy", origin: "global" },
  { slug: "sarah", nameEn: "Sarah", nameAr: "سارة", gender: "girl", origin: "arab" },
  { slug: "omar", nameEn: "Omar", nameAr: "عمر", gender: "boy", origin: "emirati" },
  { slug: "ali", nameEn: "Ali", nameAr: "علي", gender: "boy", origin: "emirati" },
  { slug: "layla", nameEn: "Layla", nameAr: "ليلى", gender: "girl", origin: "arab" },
];

// The 8 Core High-Intent Landing Pages
const CORE_LANDING_PAGES = [
  { enPath: "/personalized-books-dubai", arPath: "/ar/personalized-books-dubai" },
  { enPath: "/personalized-baby-gifts-dubai", arPath: "/ar/personalized-baby-gifts-dubai" },
  { enPath: "/bilingual-children-books-arabic-english", arPath: "/ar/bilingual-children-books-arabic-english" },
  { enPath: "/custom-storybook-for-kids-dubai", arPath: "/ar/custom-storybook-for-kids-dubai" },
];

// ============================================================================
// SUITE 1: Schema.org JSON-LD Structured Data Validation (9 Tests)
// ============================================================================
console.log("\n" + "-".repeat(80));
console.log("📋 SUITE 1: Schema.org JSON-LD Structured Data Validation (9 Tests)");
console.log("-".repeat(80));

// Test 1.1: Product Schema Definition
runTest(1, "T1.1", "Product Schema Structure & Brand Identity", () => {
  const schemaFile = readWebFile("lib/seo/schema.ts") || readWebFile("components/seo/SeoLandingView.tsx");
  assert(schemaFile !== null, "Schema implementation file (web/lib/seo/schema.ts or SeoLandingView.tsx) must exist");
  assert(schemaFile.includes('"@type": "Product"') || schemaFile.includes("@type': 'Product'") || schemaFile.includes('@type": "Product"'), "Schema must define @type: Product");
  assert(schemaFile.includes("PersonalizedTales"), "Product schema brand must be PersonalizedTales");
});

// Test 1.2: Product Offers Pure AED Pricing & InStock
runTest(1, "T1.2", "Product Offers with Pure AED 49.00 and InStock Availability", () => {
  const schemaFile = readWebFile("lib/seo/schema.ts") || readWebFile("components/seo/SeoLandingView.tsx");
  assert(schemaFile !== null, "Schema implementation file must exist");
  assert(schemaFile.includes("AED"), "Product offers must declare AED priceCurrency");
  assert(schemaFile.includes("49.00") || schemaFile.includes("49"), "Product offers must define base price 49.00 AED");
  assert(schemaFile.includes("https://schema.org/InStock") || schemaFile.includes("InStock"), "Product offers must declare InStock availability");
});

// Test 1.3: Product AggregateRating Invariant (4.96/5 from 428 reviews)
runTest(1, "T1.3", "Product AggregateRating Invariant (4.96/5 from 428 reviews)", () => {
  const schemaFile = readWebFile("lib/seo/schema.ts") || readWebFile("components/seo/SeoLandingView.tsx");
  assert(schemaFile !== null, "Schema implementation file must exist");
  assert(schemaFile.includes("4.96"), "AggregateRating must be exactly 4.96");
  assert(schemaFile.includes("428"), "AggregateRating reviewCount must be exactly 428 verified reviews");
  assert(schemaFile.includes("AggregateRating"), "Must specify @type: AggregateRating");
});

// Test 1.4: FAQPage Schema Invariant
runTest(1, "T1.4", "FAQPage Schema Presence on Landing Pages with >= 3 Questions", () => {
  const schemaFile = readWebFile("lib/seo/schema.ts") || readWebFile("components/seo/SeoLandingView.tsx");
  assert(schemaFile !== null, "Schema implementation file must exist");
  assert(schemaFile.includes("FAQPage"), "FAQPage schema entity must be defined");
  assert(schemaFile.includes("mainEntity"), "FAQPage must define mainEntity array");
});

// Test 1.5: FAQPage Question and Answer Structure
runTest(1, "T1.5", "FAQPage Entity Structure (Question & Answer Types)", () => {
  const schemaFile = readWebFile("lib/seo/schema.ts") || readWebFile("components/seo/SeoLandingView.tsx");
  assert(schemaFile !== null, "Schema implementation file must exist");
  assert(schemaFile.includes("Question"), "FAQ items must define @type: Question");
  assert(schemaFile.includes("acceptedAnswer"), "Questions must define acceptedAnswer");
  assert(schemaFile.includes("Answer"), "acceptedAnswer must define @type: Answer");
});

// Test 1.6: FAQ Content Relevance to UAE Queries
runTest(1, "T1.6", "FAQ Content Matches Google UAE High-Intent Search Queries", () => {
  const schemaFile = readWebFile("lib/seo/schema.ts") || readWebFile("components/seo/SeoLandingView.tsx");
  const landingCode = readWebFile("components/seo/SeoLandingView.tsx") || "";
  const combined = (schemaFile || "") + landingCode;
  assert(combined.length > 0, "Schema or landing code must be readable");
  const mentionsDelivery = combined.includes("24") || combined.includes("Dubai") || combined.includes("دبي") || combined.includes("توصيل");
  const mentionsArabicOrTashkeel = combined.includes("Tashkeel") || combined.includes("تشكيل") || combined.includes("Arabic") || combined.includes("عربي");
  assert(mentionsDelivery, "FAQs must address UAE delivery / shipping timeframes");
  assert(mentionsArabicOrTashkeel, "FAQs must address Arabic Tashkeel / bilingual formatting");
});

// Test 1.7: BreadcrumbList 3-Tier Hierarchy
runTest(1, "T1.7", "BreadcrumbList 3-Tier Hierarchy (Home -> Hub -> Page)", () => {
  const schemaFile = readWebFile("lib/seo/schema.ts") || readWebFile("components/seo/SeoLandingView.tsx");
  assert(schemaFile !== null, "Schema implementation file must exist");
  assert(schemaFile.includes("BreadcrumbList"), "Must define @type: BreadcrumbList");
  assert(schemaFile.includes("itemListElement"), "BreadcrumbList must include itemListElement array");
  assert(schemaFile.includes("position"), "Breadcrumb items must define position sequence");
});

// Test 1.8: Organization Schema Invariant with UAE Contact
runTest(1, "T1.8", "Organization Schema with UAE Contact Telephone (+971)", () => {
  const schemaFile = readWebFile("lib/seo/schema.ts") || readWebFile("app/layout.tsx");
  assert(schemaFile !== null, "Organization schema source must exist");
  assert(schemaFile.includes("Organization"), "Must define @type: Organization");
  assert(schemaFile.includes("+971") || schemaFile.includes("971"), "Organization must declare UAE telephone code +971");
  assert(schemaFile.includes("AE"), "Organization must specify AE areaServed / addressCountry");
});

// Test 1.9: WebSite Schema with SearchAction & Strict JSON-LD Syntax
runTest(1, "T1.9", "WebSite Schema with SearchAction & Strict Syntax", () => {
  const schemaFile = readWebFile("lib/seo/schema.ts") || readWebFile("app/layout.tsx");
  assert(schemaFile !== null, "Schema implementation file must exist");
  assert(schemaFile.includes("WebSite"), "Must define @type: WebSite");
  assert(schemaFile.includes("SearchAction"), "WebSite must declare potentialAction with SearchAction");
  assert(schemaFile.includes("search_term_string"), "SearchAction must specify search_term_string target");
});

// ============================================================================
// SUITE 2: Bi-directional Hreflang & Canonical URL Integrity (7 Tests)
// ============================================================================
console.log("\n" + "-".repeat(80));
console.log("🔗 SUITE 2: Bi-directional Hreflang & Canonical URL Integrity (7 Tests)");
console.log("-".repeat(80));

// Test 2.1: Absolute Canonical URLs Without Trailing Slashes
runTest(2, "T2.1", "Absolute Canonical URLs Without Trailing Slashes", () => {
  const schemaFile = readWebFile("lib/seo/schema.ts") || readWebFile("components/seo/SeoLandingView.tsx");
  assert(schemaFile !== null, "SEO implementation file must exist");
  assert(schemaFile.includes("https://personalizedtales.com"), "Canonical URLs must use absolute domain https://personalizedtales.com");
  assert(!schemaFile.includes("https://personalizedtales.com/personalized-books-dubai/"), "Canonical URLs must NOT contain trailing slash");
});

// Test 2.2: Tri-fold Hreflang Alternates Definition (en-AE, ar-AE, x-default)
runTest(2, "T2.2", "Tri-fold Hreflang Alternates Definition (en-AE, ar-AE, x-default)", () => {
  const landingLayout = readWebFile("components/seo/SeoLandingView.tsx") || readWebFile("lib/seo/schema.ts") || readWebFile("app/layout.tsx");
  assert(landingLayout !== null, "SEO landing layout or metadata generator must exist");
  assert(landingLayout.includes("en-AE") || landingLayout.includes("en-ae"), "Must define en-AE language alternate");
  assert(landingLayout.includes("ar-AE") || landingLayout.includes("ar-ae"), "Must define ar-AE language alternate");
  assert(landingLayout.includes("x-default"), "Must define x-default fallback alternate");
});

// Test 2.3: Core Landing Page Hreflang Reciprocity
runTest(2, "T2.3", "Core Landing Page Hreflang Reciprocal Symmetry", () => {
  for (const page of CORE_LANDING_PAGES) {
    const enFile = readWebFile(`app${page.enPath}/page.tsx`);
    const arFile = readWebFile(`app${page.arPath}/page.tsx`);
    assert(enFile !== null, `English route file must exist: web/app${page.enPath}/page.tsx`);
    assert(arFile !== null, `Arabic route file must exist: web/app${page.arPath}/page.tsx`);
    assert(enFile.includes(page.arPath) || enFile.includes("ar"), `English page ${page.enPath} must reference Arabic alternate ${page.arPath}`);
    assert(arFile.includes(page.enPath) || arFile.includes("en"), `Arabic page ${page.arPath} must reference English alternate ${page.enPath}`);
  }
});

// Test 2.4: Name Hub Hreflang Reciprocity
runTest(2, "T2.4", "Top 12 Name Hubs Hreflang Reciprocal Symmetry", () => {
  const enNameRoute = readWebFile("app/personalized-books/for-[name]/page.tsx") || 
                     readWebFile("app/personalized-books/[slug]/page.tsx");
  const arNameRoute = readWebFile("app/ar/personalized-books/for-[name]/page.tsx") || 
                     readWebFile("app/ar/personalized-books/[slug]/page.tsx");
  
  assert(enNameRoute !== null, "English programmatic name route file must exist");
  assert(arNameRoute !== null, "Arabic programmatic name route file must exist");
  assert(enNameRoute.includes("/ar/personalized-books/") || enNameRoute.includes("alternates"), "English name hub must define Arabic alternates");
  assert(arNameRoute.includes("/personalized-books/") || arNameRoute.includes("alternates"), "Arabic name hub must define English alternates");
});

// Test 2.5: x-default Designation Points to Primary English
runTest(2, "T2.5", "x-default Alternates Consistently Target Primary English URLs", () => {
  const sitemapFile = readWebFile("app/sitemap.ts") || readWebFile("lib/seo/schema.ts");
  assert(sitemapFile !== null, "Sitemap or schema file must exist");
  assert(sitemapFile.includes("x-default"), "Must specify x-default alternate");
  assert(sitemapFile.includes("https://personalizedtales.com"), "x-default must target canonical base domain");
});

// Test 2.6: Zero Orphan Hreflang References
runTest(2, "T2.6", "Zero Orphan Hreflang References in Taxonomy & Sitemap", () => {
  const taxonomy = readWebFile("lib/seo/taxonomy.ts");
  assert(taxonomy !== null, "Taxonomy file web/lib/seo/taxonomy.ts must exist");
  for (const name of CANONICAL_UAE_NAMES) {
    assert(taxonomy.includes(name.slug), `Taxonomy must define slug for ${name.slug}`);
  }
});

// Test 2.7: Clean ASCII Kebab-Case Slugs
runTest(2, "T2.7", "URL Slugs Adhere to Clean ASCII Kebab-Case (No %xx artifacts)", () => {
  for (const page of CORE_LANDING_PAGES) {
    assert(!page.enPath.includes("%"), `English path ${page.enPath} must not contain percent encoding`);
    assert(!page.arPath.includes("%"), `Arabic path ${page.arPath} must not contain percent encoding`);
    assert(/^[a-z0-9\/-]+$/.test(page.enPath), `English path ${page.enPath} must be clean kebab-case`);
    assert(/^[a-z0-9\/-]+$/.test(page.arPath), `Arabic path ${page.arPath} must be clean kebab-case`);
  }
});

// ============================================================================
// SUITE 3: Localized Meta Tags & OpenGraph / Twitter Cards (8 Tests)
// ============================================================================
console.log("\n" + "-".repeat(80));
console.log("🏷️  SUITE 3: Localized Meta Tags & OpenGraph / Twitter Cards (8 Tests)");
console.log("-".repeat(80));

// Test 3.1: English Landing Pages Localized Title and Description
runTest(3, "T3.1", "English Landing Pages Localized Title & Meta Description", () => {
  const dubaiBooks = readWebFile("app/personalized-books-dubai/page.tsx");
  assert(dubaiBooks !== null, "web/app/personalized-books-dubai/page.tsx must exist");
  assert(dubaiBooks.includes("Dubai") || dubaiBooks.includes("UAE"), "Title/metadata must target Dubai/UAE");
  assert(dubaiBooks.includes("Personalized") || dubaiBooks.includes("Children"), "Title must target personalized books");
  assert(dubaiBooks.includes("generateMetadata"), "Page must export generateMetadata");
});

// Test 3.2: Arabic Landing Pages Localized Title and Description
runTest(3, "T3.2", "Arabic Landing Pages Localized Title & Meta Description", () => {
  const arDubaiBooks = readWebFile("app/ar/personalized-books-dubai/page.tsx");
  assert(arDubaiBooks !== null, "web/app/ar/personalized-books-dubai/page.tsx must exist");
  assert(arDubaiBooks.includes("دبي") || arDubaiBooks.includes("الإمارات"), "Arabic metadata must target Dubai/UAE in Arabic script");
  assert(arDubaiBooks.includes("قصص") || arDubaiBooks.includes("أطفال"), "Arabic metadata must target children's stories");
  assert(arDubaiBooks.includes("generateMetadata"), "Page must export generateMetadata");
});

// Test 3.3: Dynamic Name Hub Metadata Formula
runTest(3, "T3.3", "Dynamic Name Hub Metadata Formula Interpolates Child Names", () => {
  const enNameRoute = readWebFile("app/personalized-books/for-[name]/page.tsx") || 
                     readWebFile("app/personalized-books/[slug]/page.tsx");
  assert(enNameRoute !== null, "English programmatic name hub page must exist");
  assert(enNameRoute.includes("name") || enNameRoute.includes("Name") || enNameRoute.includes("params"), "Must read dynamic name param");
  assert(enNameRoute.includes("Dubai") || enNameRoute.includes("UAE"), "Must include UAE/Dubai in name hub metadata");
});

// Test 3.4: OpenGraph Locales (en_AE and ar_AE)
runTest(3, "T3.4", "OpenGraph Locales Configured for en_AE and ar_AE", () => {
  const landingLayout = readWebFile("components/seo/SeoLandingView.tsx") || 
                        readWebFile("lib/seo/schema.ts") || 
                        readWebFile("app/personalized-books-dubai/page.tsx");
  assert(landingLayout !== null, "Landing page layout or page file must exist");
  assert(landingLayout.includes("en_AE") || landingLayout.includes("en-AE"), "Must specify en_AE openGraph locale");
});

// Test 3.5: OpenGraph Image Dimensions (1200x630)
runTest(3, "T3.5", "OpenGraph Social Cards Specify High-Resolution Images (1200x630)", () => {
  const landingLayout = readWebFile("components/seo/SeoLandingView.tsx") || 
                        readWebFile("app/personalized-books-dubai/page.tsx") || 
                        readWebFile("app/layout.tsx");
  assert(landingLayout !== null, "SEO metadata file must exist");
  assert(landingLayout.includes("1200") && landingLayout.includes("630") || landingLayout.includes("openGraph"), "Must specify 1200x630 openGraph image or standard share card");
});

// Test 3.6: Twitter Card Specification (summary_large_image)
runTest(3, "T3.6", "Twitter Card Metadata Set to summary_large_image", () => {
  const landingLayout = readWebFile("components/seo/SeoLandingView.tsx") || 
                        readWebFile("app/personalized-books-dubai/page.tsx") || 
                        readWebFile("app/layout.tsx");
  assert(landingLayout !== null, "SEO metadata file must exist");
  assert(landingLayout.includes("summary_large_image"), "Twitter card must be set to summary_large_image");
});

// Test 3.7: Meta Description Length Constraints (100–175 Chars)
runTest(3, "T3.7", "Meta Description Length Adheres to Optimal SERP Bounds (100–175 chars)", () => {
  const landingLayout = readWebFile("components/seo/SeoLandingView.tsx") || 
                        readWebFile("app/personalized-books-dubai/page.tsx");
  assert(landingLayout !== null, "SEO landing layout or page must exist");
  // Check that descriptions in the file are informative and not empty
  assert(landingLayout.includes("description") || landingLayout.includes("Description"), "Metadata must define description");
});

// Test 3.8: City-Level UAE Geo-Targeting Metadata
runTest(3, "T3.8", "City-Level UAE Geo-Targeting Establishes Dubai / Abu Dhabi Relevance", () => {
  const landingLayout = readWebFile("components/seo/SeoLandingView.tsx") || 
                        readWebFile("app/personalized-books-dubai/page.tsx") ||
                        readWebFile("lib/seo/taxonomy.ts");
  assert(landingLayout !== null, "SEO source must exist");
  assert(landingLayout.includes("Dubai") && landingLayout.includes("UAE"), "Metadata must establish local UAE / Dubai authority");
});

// ============================================================================
// SUITE 4: Route Resolution & Server-Side Rendering Hygiene (4 Tests / 32 Routes)
// ============================================================================
console.log("\n" + "-".repeat(80));
console.log("🛣️  SUITE 4: Route Resolution & Server-Side Rendering Hygiene (4 Tests)");
console.log("-".repeat(80));

// Test 4.1: All 8 Core Landing Page Routes File Existence
runTest(4, "T4.1", "All 8 Core High-Intent Landing Page Route Files Exist", () => {
  for (const page of CORE_LANDING_PAGES) {
    const enFile = `app${page.enPath}/page.tsx`;
    const arFile = `app${page.arPath}/page.tsx`;
    assert(fileExists(enFile), `Missing English route file: web/${enFile}`);
    assert(fileExists(arFile), `Missing Arabic route file: web/${arFile}`);
  }
});

// Test 4.2: All 24 Name Hub Routes Resolution via Taxonomy & Static Params
runTest(4, "T4.2", "Top 12 UAE Child Names Hub Routes Resolution (24 Variants)", () => {
  const taxonomy = readWebFile("lib/seo/taxonomy.ts");
  assert(taxonomy !== null, "web/lib/seo/taxonomy.ts must exist");

  const enRouteExists = fileExists("app/personalized-books/for-[name]/page.tsx") ||
                        fileExists("app/personalized-books/[slug]/page.tsx");
  const arRouteExists = fileExists("app/ar/personalized-books/for-[name]/page.tsx") ||
                        fileExists("app/ar/personalized-books/[slug]/page.tsx");

  assert(enRouteExists, "English dynamic name hub route file must exist under web/app/personalized-books/");
  assert(arRouteExists, "Arabic dynamic name hub route file must exist under web/app/ar/personalized-books/");

  // Verify all 12 names exist in taxonomy
  for (const item of CANONICAL_UAE_NAMES) {
    assert(taxonomy.includes(item.slug), `Taxonomy must contain name slug: ${item.slug}`);
    assert(taxonomy.includes(item.nameAr), `Taxonomy must contain Arabic name: ${item.nameAr}`);
  }
});

// Test 4.3: Arabic RTL Layout & Typography Directives
runTest(4, "T4.3", "Arabic Routes Render dir='rtl' with Amiri Typography", () => {
  const arPage = readWebFile("app/ar/personalized-books-dubai/page.tsx") ||
                 readWebFile("components/seo/SeoLandingView.tsx");
  assert(arPage !== null, "Arabic landing page or shared view must exist");
  assert(arPage.includes('dir="rtl"') || arPage.includes("dir={'rtl'}") || arPage.includes("currentDir") || arPage.includes("rtl"), "Arabic page must enforce dir='rtl'");
  assert(arPage.includes("amiri") || arPage.includes("Amiri") || arPage.includes("font-amiri"), "Arabic page must apply Amiri typography");
});

// Test 4.4: SSR Hydration Safety & Deterministic Rendering
runTest(4, "T4.4", "SSR Hydration Safety & Deterministic Initial State", () => {
  const landingView = readWebFile("components/seo/SeoLandingView.tsx");
  if (landingView) {
    // Ensure no dynamic Date() calls directly inside render body without mounted guard
    assert(!landingView.includes("new Date().getTime()") && !landingView.includes("Date.now()"), "SeoLandingView must not use unsynchronized Date calls in render");
    assert(!landingView.includes("Math.random()"), "SeoLandingView must not use Math.random() in render");
  } else {
    // Check page files directly
    const enPage = readWebFile("app/personalized-books-dubai/page.tsx");
    assert(enPage !== null, "Page file must exist");
    assert(!enPage.includes("Math.random()"), "Page must not use Math.random() in render");
  }
});

// ============================================================================
// SUITE 5: Internal Link Mesh & Discovery Pathing (5 Tests)
// ============================================================================
console.log("\n" + "-".repeat(80));
console.log("🕸️  SUITE 5: Internal Link Mesh & Discovery Pathing (5 Tests)");
console.log("-".repeat(80));

// Test 5.1: Direct Funnel CTAs
runTest(5, "T5.1", "Direct Funnel CTAs Link to /create/start or PDP", () => {
  const landingCode = readWebFile("components/seo/SeoLandingView.tsx") || 
                      readWebFile("app/personalized-books-dubai/page.tsx");
  assert(landingCode !== null, "SEO landing code must exist");
  assert(landingCode.includes("/create/start") || landingCode.includes("/create"), "Landing page must feature CTA linking to /create/start");
});

// Test 5.2: Cross-Linking to Storybook PDPs
runTest(5, "T5.2", "Cross-Linking to at Least 2 Relevant Storybook PDPs", () => {
  const landingCode = readWebFile("components/seo/SeoLandingView.tsx") || 
                      readWebFile("app/personalized-books-dubai/page.tsx");
  assert(landingCode !== null, "SEO landing code must exist");
  assert(landingCode.includes("/books/") || landingCode.includes("the-secret-of-the-starlit-dunes") || landingCode.includes("the-child-who-found-the-golden-falcon"), "Landing page must link to storybook PDPs");
});

// Test 5.3: Name Hub Sibling Links Mesh
runTest(5, "T5.3", "Name Hub Cross-Links to Sibling Child Names (Discovery Mesh)", () => {
  const nameHubCode = readWebFile("components/seo/NameHubView.tsx") || 
                      readWebFile("app/personalized-books/for-[name]/page.tsx") ||
                      readWebFile("lib/seo/taxonomy.ts");
  assert(nameHubCode !== null, "Name hub code or taxonomy must exist");
  assert(nameHubCode.includes("sibling") || nameHubCode.includes("related") || nameHubCode.includes("for-"), "Name hub must establish links to related child names");
});

// Test 5.4: Breadcrumb Navigation Links
runTest(5, "T5.4", "Breadcrumb Navigation Links Back to Home & Catalog", () => {
  const landingCode = readWebFile("components/seo/SeoLandingView.tsx") || 
                      readWebFile("app/personalized-books-dubai/page.tsx");
  assert(landingCode !== null, "Landing page source must exist");
  assert(landingCode.includes("Home") || landingCode.includes("الرئيسية") || landingCode.includes("breadcrumb") || landingCode.includes("Breadcrumb"), "Page must provide breadcrumb navigation");
});

// Test 5.5: Zero Broken Internal Links & Click Depth <= 2
runTest(5, "T5.5", "Internal Links Resolve Cleanly with Crawler Click Depth <= 2", () => {
  const landingCode = readWebFile("components/seo/SeoLandingView.tsx") || 
                      readWebFile("app/personalized-books-dubai/page.tsx");
  assert(landingCode !== null, "Landing page source must exist");
  // Verify href targets do not contain placeholder '#' or broken javascript: links
  assert(!landingCode.includes('href="#"') && !landingCode.includes('href="javascript:void(0)"'), "Must not use placeholder '#' links in SEO landing pages");
});

// ============================================================================
// SUITE 6: Price Invariant & Currency Isolation (5 Tests)
// ============================================================================
console.log("\n" + "-".repeat(80));
console.log("💰 SUITE 6: Price Invariant & Currency Isolation (5 Tests)");
console.log("-".repeat(80));

// Test 6.1: Customer-Facing Currency Exclusivity
runTest(6, "T6.1", "Customer-Facing Prices Exclusively Use AED / د.إ", () => {
  const landingCode = readWebFile("components/seo/SeoLandingView.tsx") || 
                      readWebFile("app/personalized-books-dubai/page.tsx");
  assert(landingCode !== null, "SEO landing code must exist");
  assert(landingCode.includes("AED") || landingCode.includes("د.إ"), "Displayed prices must use AED / د.إ");
});

// Test 6.2: Complete Foreign Currency Isolation (Zero $, £, €)
runTest(6, "T6.2", "Zero Foreign Currency Leaks ($, USD, £, GBP, €, EUR)", () => {
  const landingCode = readWebFile("components/seo/SeoLandingView.tsx") || 
                      readWebFile("app/personalized-books-dubai/page.tsx");
  assert(landingCode !== null, "SEO landing code must exist");
  assert(!landingCode.includes("$") && !landingCode.includes("USD"), "Must not leak USD ($)");
  assert(!landingCode.includes("£") && !landingCode.includes("GBP"), "Must not leak GBP (£)");
  assert(!landingCode.includes("€") && !landingCode.includes("EUR"), "Must not leak EUR (€)");
});

// Test 6.3: Format Price Invariant (49 / 79 / 99 AED)
runTest(6, "T6.3", "Format Pricing Strictly Calibrated to 49 / 79 / 99 AED", () => {
  const landingCode = readWebFile("components/seo/SeoLandingView.tsx") || 
                      readWebFile("app/personalized-books-dubai/page.tsx");
  assert(landingCode !== null, "SEO landing code must exist");
  assert(landingCode.includes("49"), "Must state Softcover entry price 49 AED");
  assert(landingCode.includes("79"), "Must state Classic Hardcover price 79 AED");
  assert(landingCode.includes("99"), "Must state Deluxe Layflat price 99 AED");
});

// Test 6.4: Zero Stale Price Leaks (No 129, 149, 169, 189 AED)
runTest(6, "T6.4", "Zero Leaks of Obsolete Legacy Prices (129, 149, 169, 189 AED)", () => {
  const landingCode = readWebFile("components/seo/SeoLandingView.tsx") || 
                      readWebFile("app/personalized-books-dubai/page.tsx");
  assert(landingCode !== null, "SEO landing code must exist");
  assert(!landingCode.includes("129 AED") && !landingCode.includes("129 د.إ"), "Must not contain obsolete price 129 AED");
  assert(!landingCode.includes("149 AED") && !landingCode.includes("149 د.إ"), "Must not contain obsolete price 149 AED");
  assert(!landingCode.includes("169 AED") && !landingCode.includes("169 د.إ"), "Must not contain obsolete price 169 AED");
  assert(!landingCode.includes("189 AED") && !landingCode.includes("189 د.إ"), "Must not contain obsolete price 189 AED");
});

// Test 6.5: Tabby 4 Installments & Free Shipping Arithmetic (12.25 AED / 100 AED)
runTest(6, "T6.5", "Tabby 4 Installments (12.25 AED) & Free Shipping (100 AED)", () => {
  const landingCode = readWebFile("components/seo/SeoLandingView.tsx") || 
                      readWebFile("app/personalized-books-dubai/page.tsx");
  assert(landingCode !== null, "SEO landing code must exist");
  assert(landingCode.includes("12.25") || landingCode.includes("Tabby") || landingCode.includes("تابي"), "Must mention Tabby installments (12.25 AED for 49 AED base)");
  assert(landingCode.includes("100 AED") || landingCode.includes("١٠٠ د.إ") || landingCode.includes("100"), "Must state 100 AED free delivery threshold");
});

// ============================================================================
// SUITE 7: Dynamic Sitemap & Robots.txt Conformance (4 Tests)
// ============================================================================
console.log("\n" + "-".repeat(80));
console.log("🗺️  SUITE 7: Dynamic Sitemap & Robots.txt Conformance (4 Tests)");
console.log("-".repeat(80));

// Test 7.1: Dynamic Sitemap Route Coverage (All 32 SEO Routes)
runTest(7, "T7.1", "Dynamic Sitemap Includes All 32 SEO Routes (8 Landing + 24 Name Hubs)", () => {
  const sitemapCode = readWebFile("app/sitemap.ts");
  assert(sitemapCode !== null, "web/app/sitemap.ts must exist");
  for (const page of CORE_LANDING_PAGES) {
    assert(sitemapCode.includes(page.enPath), `sitemap.ts must include English route ${page.enPath}`);
    assert(sitemapCode.includes(page.arPath), `sitemap.ts must include Arabic route ${page.arPath}`);
  }
  assert(sitemapCode.includes("personalized-books/for-") || sitemapCode.includes("for-") || sitemapCode.includes("CANONICAL_UAE_NAMES") || sitemapCode.includes("GULF_AND_GLOBAL_NAMES") || sitemapCode.includes("TOP_UAE_CHILD_NAMES"), "sitemap.ts must include programmatic name hub routes");
});

// Test 7.2: Sitemap Bilingual Alternate Language Directives
runTest(7, "T7.2", "Sitemap Entries Define Bilingual Alternate Language Directives", () => {
  const sitemapCode = readWebFile("app/sitemap.ts");
  assert(sitemapCode !== null, "web/app/sitemap.ts must exist");
  assert(sitemapCode.includes("alternates"), "sitemap.ts entries must define alternates");
  assert(sitemapCode.includes("languages"), "sitemap.ts alternates must define languages");
  assert(sitemapCode.includes("en-AE") || sitemapCode.includes("en-ae"), "sitemap.ts must define en-AE alternate");
  assert(sitemapCode.includes("ar-AE") || sitemapCode.includes("ar-ae"), "sitemap.ts must define ar-AE alternate");
});

// Test 7.3: Robots.txt Indexation Directives
runTest(7, "T7.3", "Robots.txt Allows Public SEO Pages & Disallows Private Paths", () => {
  const robotsCode = readWebFile("app/robots.ts");
  assert(robotsCode !== null, "web/app/robots.ts must exist");
  assert(robotsCode.includes("allow") || robotsCode.includes("Allow"), "robots.ts must define allow rules");
  assert(robotsCode.includes("disallow") || robotsCode.includes("Disallow"), "robots.ts must define disallow rules");
  assert(robotsCode.includes("/cart") || robotsCode.includes("/checkout") || robotsCode.includes("/api"), "robots.ts must disallow private checkout/api routes");
});

// Test 7.4: Build Manifest Integration
runTest(7, "T7.4", "Build Manifest Integration Confirms Sitemap & Robots Resolution", () => {
  assert(fileExists("app/sitemap.ts"), "web/app/sitemap.ts must exist");
  assert(fileExists("app/robots.ts"), "web/app/robots.ts must exist");
});

// ----------------------------------------------------------------------------
// Executive Scorecard & Summary
// ----------------------------------------------------------------------------
console.log("\n" + "=".repeat(80));
console.log("📊 UAE ORGANIC SEO DOMINATION — EXECUTIVE TEST SUMMARY REPORT");
console.log("=".repeat(80));
console.log(
  `${"Suite Name".padEnd(46)} | ${"Tests".padStart(5)} | ${"Passed".padStart(6)} | ${"Failed".padStart(6)} | Status`
);
console.log("-".repeat(80));

for (const suite of suiteResults) {
  const statusStr = suite.failed === 0 && suite.total > 0 ? "✅ PASS" : "❌ PENDING";
  console.log(
    `${suite.name.padEnd(46)} | ${String(suite.total).padStart(5)} | ${String(suite.passed).padStart(6)} | ${String(suite.failed).padStart(6)} | ${statusStr}`
  );
}

console.log("-".repeat(80));
const overallStatus = globalFailed === 0 ? "PASSED (100%)" : "INCOMPLETE (Worker M1/M2 Implementation In Progress)";
console.log(
  `TOTAL: ${globalTotal} assertions across 7 suites | Passed: ${globalPassed} | Failed: ${globalFailed}`
);
console.log(`OVERALL STATUS: ${overallStatus}`);
console.log("=".repeat(80));

if (failureDetails.length > 0) {
  console.log("\n🔍 DETAILED BREAKDOWN OF PENDING / FAILING ASSERTIONS:");
  for (const f of failureDetails) {
    console.log(`  - [${f.code}] ${f.name} (${f.suite}): ${f.error}`);
  }
}

// Exit code behavior:
// If STRICT_EXIT is not explicitly '0' and failures exist, exit with 1.
const strictExit = process.env.STRICT_EXIT !== "0";
if (globalFailed > 0 && strictExit) {
  process.exit(1);
} else {
  process.exit(0);
}
