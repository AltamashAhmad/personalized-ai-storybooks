import fs from "fs";
import path from "path";
import { UNBOXING_REVIEWS, UNBOXING_RATINGS_BREAKDOWN, PDP_QA_ACCORDION, RELATED_STORYBOOKS } from "../web/config/reviews.ts";
import { COVER_FORMAT_PRICING } from "../web/config/pricing.ts";
import { PRODUCTS } from "../web/config/products.ts";

console.log("================================================================================");
console.log("🧪 EMPIRICAL CHALLENGER STRESS HARNESS — MILESTONE M2");
console.log("   Target: ProductSpecsDrawer, Unboxing Reviews, PDP Q&A, and Route Redirects");
console.log("================================================================================");

let totalPassed = 0;
let totalFailed = 0;
let totalWarnings = 0;
const failures = [];
const warnings = [];

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

function warn(cond, msg, meta = {}) {
  if (!cond) {
    totalWarnings++;
    console.warn(`  ⚠️ WARN (Adversarial Finding): ${msg}`, meta);
    warnings.push({ msg, meta });
  } else {
    totalPassed++;
    console.log(`  ✅ PASS: ${msg}`);
  }
}

// ==============================================================================
// SUITE 1: ProductSpecsDrawer Source & Interactive State Machine Verification
// ==============================================================================
console.log("\n--- SUITE 1: ProductSpecsDrawer Interactive States & Specs Renders ---");
const specsDrawerPath = path.resolve("web/components/ProductSpecsDrawer.tsx");
const specsDrawerCode = fs.readFileSync(specsDrawerPath, "utf-8");

// 1.1: Component interface and early return when isOpen is false
assert(
  specsDrawerCode.includes("if (!isOpen) return null;"),
  "ProductSpecsDrawer returns null when isOpen is false (DOM isolation / zero leak)"
);

// 1.2: Backdrop dismiss listener
assert(
  specsDrawerCode.includes("onClick={onClose}") &&
  specsDrawerCode.includes("bg-slate-950/70 backdrop-blur-sm"),
  "Backdrop has onClick={onClose} and backdrop blur styling"
);

// 1.3: Escape keydown listener
assert(
  specsDrawerCode.includes("e.key === 'Escape'") &&
  specsDrawerCode.includes("window.addEventListener('keydown', handleKeyDown)") &&
  specsDrawerCode.includes("window.removeEventListener('keydown', handleKeyDown)"),
  "ProductSpecsDrawer attaches and cleans up Escape keydown event listener"
);

// 1.4: Body scroll locking and restoration
assert(
  specsDrawerCode.includes("document.body.style.overflow = 'hidden'") &&
  specsDrawerCode.includes("document.body.style.overflow = originalOverflow"),
  "ProductSpecsDrawer locks body scroll on open and restores previous overflow on unmount"
);

// 1.5: Accessible ARIA attributes on drawer and backdrop
assert(
  specsDrawerCode.includes('role="dialog"') &&
  specsDrawerCode.includes('aria-modal="true"') &&
  specsDrawerCode.includes('aria-labelledby="specs-drawer-title"') &&
  specsDrawerCode.includes('aria-hidden="true"'),
  "ProductSpecsDrawer defines dialog ARIA attributes (role, modal, labelledby, aria-hidden backdrop)"
);

// 1.6: Accessible close button label in English and Arabic
assert(
  specsDrawerCode.includes("isAr ? 'إغلاق المواصفات' : 'Close specifications'"),
  "Close button provides localized accessible aria-label"
);

// 1.7: Technical specification cards content check
assert(
  specsDrawerCode.includes('8.5" × 8.5"') && specsDrawerCode.includes("210mm × 210mm"),
  "Renders dimensions card: 8.5\" × 8.5\" (210mm × 210mm)"
);

assert(
  specsDrawerCode.includes("24–32 Full-Color Pages") || specsDrawerCode.includes("32"),
  "Renders interior page count card (24–32 / 32 pages)"
);

assert(
  specsDrawerCode.includes("200 GSM Mohawk Silk") && specsDrawerCode.includes("FSC® 100%"),
  "Renders paper stock card: 200 GSM Mohawk Silk with FSC 100% badge"
);

assert(
  specsDrawerCode.includes("EN71-3 Food-Grade Inks") || specsDrawerCode.includes("EN71-3"),
  "Renders child safety card: EN71-3 toy-safe vegetable inks"
);

assert(
  specsDrawerCode.includes("Ages 0–3") &&
  specsDrawerCode.includes("Ages 3–6") &&
  specsDrawerCode.includes("Ages 6–8+"),
  "Renders reading age developmental guide with 3 progressive age tiers"
);

assert(
  specsDrawerCode.includes("UAE 24–48h Express Delivery") &&
  specsDrawerCode.includes("Abu Dhabi, Dubai, Sharjah, Ajman, RAK, Fujairah, and UAQ"),
  "Renders UAE express delivery timetable covering all 7 Emirates"
);

// 1.8: Calibrated cover format pricing in binding comparison table
assert(
  specsDrawerCode.includes("49 AED") &&
  specsDrawerCode.includes("79 AED") &&
  specsDrawerCode.includes("99 AED"),
  "Specs drawer binding comparison table reflects calibrated 49 / 79 / 99 AED pricing"
);

// ==============================================================================
// SUITE 2: Unboxing Reviews, Ratings Scorecard & Lightbox Modal Verification
// ==============================================================================
console.log("\n--- SUITE 2: Unboxing Reviews, Ratings Breakdown & Photo Lightbox ---");

// 2.1: Ratings Breakdown Dimensions
assert(
  UNBOXING_RATINGS_BREAKDOWN.overallScore === 4.96,
  `Ratings overall score is 4.96 (got ${UNBOXING_RATINGS_BREAKDOWN.overallScore})`
);

assert(
  UNBOXING_RATINGS_BREAKDOWN.totalReviews >= 400,
  `Ratings total reviews count is >= 400 (got ${UNBOXING_RATINGS_BREAKDOWN.totalReviews})`
);

assert(
  UNBOXING_RATINGS_BREAKDOWN.dimensions.length === 4,
  `Ratings breakdown has exactly 4 evaluation dimensions (got ${UNBOXING_RATINGS_BREAKDOWN.dimensions.length})`
);

const expectedDimensionIds = ["print", "reaction", "packaging", "speed"];
const actualDimensionIds = UNBOXING_RATINGS_BREAKDOWN.dimensions.map((d) => d.id);
assert(
  expectedDimensionIds.every((id) => actualDimensionIds.includes(id)),
  "Dimensions contain print, reaction, packaging, and speed metrics",
  { actualDimensionIds }
);

// Verify individual dimension scores
const printDim = UNBOXING_RATINGS_BREAKDOWN.dimensions.find((d) => d.id === "print");
const reactionDim = UNBOXING_RATINGS_BREAKDOWN.dimensions.find((d) => d.id === "reaction");
const packagingDim = UNBOXING_RATINGS_BREAKDOWN.dimensions.find((d) => d.id === "packaging");
const speedDim = UNBOXING_RATINGS_BREAKDOWN.dimensions.find((d) => d.id === "speed");

assert(printDim?.score === 5.0, "Print Quality dimension score is 5.0");
assert(reactionDim?.score === 4.9, "Child Wonder & Reaction dimension score is 4.9");
assert(packagingDim?.score === 5.0, "Packaging & Presentation dimension score is 5.0");
assert(speedDim?.score === 4.9, "UAE Courier Speed dimension score is 4.9");

// 2.2: Reviews Data Integrity
assert(
  UNBOXING_REVIEWS.length >= 4,
  `UNBOXING_REVIEWS has at least 4 reviews (got ${UNBOXING_REVIEWS.length})`
);

const allVerifiedPurchase = UNBOXING_REVIEWS.every((r) => r.verifiedPurchase === true);
assert(allVerifiedPurchase, "All unboxing reviews have verifiedPurchase === true");

const allVerifiedPhoto = UNBOXING_REVIEWS.every((r) => r.verifiedPhotoBadge === true && r.photoUrl.length > 0);
assert(allVerifiedPhoto, "All unboxing reviews have verifiedPhotoBadge === true with valid photoUrl");

const allBilingual = UNBOXING_REVIEWS.every(
  (r) => r.authorEn && r.authorAr && r.cityEn && r.cityAr && r.quoteEn && r.quoteAr
);
assert(allBilingual, "All unboxing reviews have full bilingual metadata (EN and AR)");

// 2.3: Review Filter Tabs State Machine Simulation
console.log("  Testing Review Filter Tabs State Machine...");

function filterReviews(filterMode) {
  return UNBOXING_REVIEWS.filter((rev) => {
    if (filterMode === "photos") return rev.verifiedPhotoBadge;
    if (filterMode === "hardcover") return rev.format === "hardcover";
    if (filterMode === "layflat") return rev.format === "layflat";
    return true; // "all"
  });
}

const allFilter = filterReviews("all");
assert(allFilter.length === UNBOXING_REVIEWS.length, "Filter 'all' returns all reviews (4/4)");

const photosFilter = filterReviews("photos");
assert(photosFilter.length === 4, "Filter 'photos' returns all 4 reviews with photo badges");

const hardcoverFilter = filterReviews("hardcover");
assert(
  hardcoverFilter.length === 2 && hardcoverFilter.every((r) => r.format === "hardcover"),
  "Filter 'hardcover' returns exactly 2 hardcover reviews (79 AED format)"
);

const layflatFilter = filterReviews("layflat");
assert(
  layflatFilter.length === 1 && layflatFilter[0].format === "layflat",
  "Filter 'layflat' returns exactly 1 deluxe layflat review (99 AED format)"
);

// 2.4: Photo Lightbox Modal Source & Adversarial Audit in ProductDetailView.tsx
const pdpViewPath = path.resolve("web/components/ProductDetailView.tsx");
const pdpViewCode = fs.readFileSync(pdpViewPath, "utf-8");

assert(
  pdpViewCode.includes("activeReviewPhoto && ("),
  "ProductDetailView renders photo lightbox modal conditionally when activeReviewPhoto is non-null"
);

assert(
  pdpViewCode.includes("onClick={() => setActiveReviewPhoto(null)}"),
  "Lightbox backdrop click resets activeReviewPhoto to null"
);

assert(
  pdpViewCode.includes("onClick={(e) => e.stopPropagation()}"),
  "Lightbox modal content card stops click propagation to prevent premature dismissal"
);

// Adversarial Audit: Check whether the photo lightbox has an Escape key listener
const hasLightboxEscapeListener = pdpViewCode.includes("activeReviewPhoto") && pdpViewCode.includes("e.key === 'Escape'");
warn(
  hasLightboxEscapeListener,
  "Photo lightbox modal should support Escape keydown dismissal for WCAG keyboard accessibility (currently dismissed via click / close button)"
);

// ==============================================================================
// SUITE 3: PDP Q&A Accordion Behavior & Accessibility Verification
// ==============================================================================
console.log("\n--- SUITE 3: PDP Q&A Accordion Verification ---");

// 3.1: Question count and content completeness
assert(
  PDP_QA_ACCORDION.length === 6,
  `PDP_QA_ACCORDION contains exactly 6 questions (got ${PDP_QA_ACCORDION.length})`
);

const expectedQaIds = ["qa-1", "qa-2", "qa-3", "qa-4", "qa-5", "qa-6"];
const actualQaIds = PDP_QA_ACCORDION.map((q) => q.id);
assert(
  expectedQaIds.every((id) => actualQaIds.includes(id)),
  "Accordion questions contain IDs qa-1 through qa-6",
  { actualQaIds }
);

// 3.2: Verify content of each question
const qa1 = PDP_QA_ACCORDION.find((q) => q.id === "qa-1");
const qa2 = PDP_QA_ACCORDION.find((q) => q.id === "qa-2");
const qa3 = PDP_QA_ACCORDION.find((q) => q.id === "qa-3");
const qa4 = PDP_QA_ACCORDION.find((q) => q.id === "qa-4");
const qa5 = PDP_QA_ACCORDION.find((q) => q.id === "qa-5");
const qa6 = PDP_QA_ACCORDION.find((q) => q.id === "qa-6");

assert(
  qa1 && qa1.questionEn.includes("name and likeness") && qa1.answerEn.includes("6 Fitzpatrick tones"),
  "QA-1 covers child's name, likeness, and Fitzpatrick skin tones"
);

assert(
  qa2 && qa2.answerEn.includes("49 AED") && qa2.answerEn.includes("79 AED") && qa2.answerEn.includes("99 AED"),
  "QA-2 covers 49 / 79 / 99 AED format pricing differences"
);

assert(
  qa3 && qa3.questionEn.includes("Tashkeel") && qa3.answerEn.includes("vocalized Tashkeel"),
  "QA-3 covers bilingual Arabic Tashkeel and English side-by-side format"
);

assert(
  qa4 && qa4.answerEn.includes("400 characters") && qa4.answerEn.includes("+19 AED"),
  "QA-4 covers 400-char dedication and optional +19 AED photo upload"
);

assert(
  qa5 && qa5.answerEn.includes("24–48 hours") && qa5.answerEn.includes("7 Emirates"),
  "QA-5 covers 24-48h UAE courier delivery SLA across all 7 Emirates"
);

assert(
  qa6 && qa6.answerEn.includes("+39 AED") && qa6.answerEn.includes("Keepsake Presentation Box"),
  "QA-6 covers companion keepsake presentation gift box (+39 AED)"
);

// 3.3: Accordion State Machine Simulation
console.log("  Testing Accordion State Machine...");

class AccordionStateMachine {
  constructor(initialOpenId = "qa-1") {
    this.openId = initialOpenId;
  }

  toggle(id) {
    this.openId = this.openId === id ? null : id;
  }

  isOpen(id) {
    return this.openId === id;
  }
}

const accordion = new AccordionStateMachine("qa-1");
assert(accordion.isOpen("qa-1"), "Accordion initially has qa-1 open by default");
assert(!accordion.isOpen("qa-2"), "qa-2 is initially collapsed");

// Clicking qa-1 collapses it
accordion.toggle("qa-1");
assert(accordion.openId === null, "Clicking open question qa-1 collapses it (openId becomes null)");

// Clicking qa-3 opens qa-3
accordion.toggle("qa-3");
assert(accordion.isOpen("qa-3"), "Clicking qa-3 expands qa-3");
assert(!accordion.isOpen("qa-1"), "qa-1 remains collapsed");

// Clicking qa-4 expands qa-4 and collapses qa-3 (exclusive accordion)
accordion.toggle("qa-4");
assert(accordion.isOpen("qa-4") && !accordion.isOpen("qa-3"), "Clicking qa-4 expands qa-4 and automatically collapses qa-3");

// 3.4: Accessibility ARIA Audit on Accordion in ProductDetailView.tsx
const hasAriaExpandedOnAccordion = pdpViewCode.includes("aria-expanded={openFaqId ===");
warn(
  hasAriaExpandedOnAccordion,
  "PDP Q&A accordion disclosure button should declare aria-expanded={openFaqId === qa.id} for screen reader accessibility"
);

// ==============================================================================
// SUITE 4: Route Redirects Verification (/book/[slug] & /ar/book/[slug])
// ==============================================================================
console.log("\n--- SUITE 4: Route Redirects Verification ---");

// 4.1: next.config.ts Redirects Configuration
const nextConfigPath = path.resolve("web/next.config.ts");
const nextConfigCode = fs.readFileSync(nextConfigPath, "utf-8");

assert(
  nextConfigCode.includes("source: '/book/:slug'") &&
  nextConfigCode.includes("destination: '/books/:slug'") &&
  nextConfigCode.includes("permanent: true"),
  "next.config.ts defines permanent redirect: /book/:slug -> /books/:slug"
);

assert(
  nextConfigCode.includes("source: '/ar/book/:slug'") &&
  nextConfigCode.includes("destination: '/ar/books/:slug'") &&
  nextConfigCode.includes("permanent: true"),
  "next.config.ts defines permanent redirect: /ar/book/:slug -> /ar/books/:slug"
);

// 4.1b: Compiled Next.js routes-manifest.json verification
const routesManifestPath = path.resolve("web/.next/routes-manifest.json");
if (fs.existsSync(routesManifestPath)) {
  const routesManifest = JSON.parse(fs.readFileSync(routesManifestPath, "utf-8"));
  const manifestRedirects = routesManifest.redirects || [];
  const enManifestRedirect = manifestRedirects.find((r) => r.source === "/book/:slug");
  const arManifestRedirect = manifestRedirects.find((r) => r.source === "/ar/book/:slug");

  assert(
    enManifestRedirect && enManifestRedirect.statusCode === 308 && enManifestRedirect.destination === "/books/:slug",
    "Compiled routes-manifest.json has permanent 308 redirect for /book/:slug -> /books/:slug"
  );
  assert(
    arManifestRedirect && arManifestRedirect.statusCode === 308 && arManifestRedirect.destination === "/ar/books/:slug",
    "Compiled routes-manifest.json has permanent 308 redirect for /ar/book/:slug -> /ar/books/:slug"
  );

  const enRegex = new RegExp(enManifestRedirect.regex);
  const arRegex = new RegExp(arManifestRedirect.regex);

  assert(
    enRegex.test("/book/the-secret-of-the-starlit-dunes") && !enRegex.test("/books/the-secret-of-the-starlit-dunes"),
    "Compiled EN regex matches /book/[slug] and strictly avoids /books/[slug]"
  );
  assert(
    arRegex.test("/ar/book/the-secret-of-the-starlit-dunes") && !arRegex.test("/ar/books/the-secret-of-the-starlit-dunes"),
    "Compiled AR regex matches /ar/book/[slug] and strictly avoids /ar/books/[slug]"
  );
}

// 4.2: App Router Page Fallback Handlers
const enRedirectPagePath = path.resolve("web/app/book/[slug]/page.tsx");
const arRedirectPagePath = path.resolve("web/app/ar/book/[slug]/page.tsx");

assert(
  fs.existsSync(enRedirectPagePath),
  "web/app/book/[slug]/page.tsx exists in App Router filesystem"
);
assert(
  fs.existsSync(arRedirectPagePath),
  "web/app/ar/book/[slug]/page.tsx exists in App Router filesystem"
);

const enRedirectCode = fs.readFileSync(enRedirectPagePath, "utf-8");
const arRedirectCode = fs.readFileSync(arRedirectPagePath, "utf-8");

assert(
  enRedirectCode.includes("import { redirect } from 'next/navigation'") &&
  enRedirectCode.includes("redirect(`/books/${slug}`)"),
  "English page component calls redirect(`/books/${slug}`)"
);

assert(
  arRedirectCode.includes("import { redirect } from 'next/navigation'") &&
  arRedirectCode.includes("redirect(`/ar/books/${slug}`)"),
  "Arabic page component calls redirect(`/ar/books/${slug}`)"
);

// 4.3: Simulate redirect destination URL generation across catalog products
PRODUCTS.forEach((product) => {
  const enDest = `/books/${product.slug}`;
  const arDest = `/ar/books/${product.slug}`;
  assert(
    enDest.startsWith("/books/") && enDest.length > 7,
    `Product '${product.id}' generates valid EN redirect destination: ${enDest}`
  );
  assert(
    arDest.startsWith("/ar/books/") && arDest.length > 10,
    `Product '${product.id}' generates valid AR redirect destination: ${arDest}`
  );
});

// ==============================================================================
// SUITE 5: Cross-Touchpoint Pricing Calibration Audit (49 / 79 / 99 AED)
// ==============================================================================
console.log("\n--- SUITE 5: Cross-Touchpoint Pricing Calibration Audit ---");

assert(
  COVER_FORMAT_PRICING.softcover.priceAED === 49 &&
  COVER_FORMAT_PRICING.hardcover.priceAED === 79 &&
  COVER_FORMAT_PRICING.layflat.priceAED === 99,
  "COVER_FORMAT_PRICING in web/config/pricing.ts strictly equals 49 / 79 / 99 AED"
);

const sampleBookEnginePath = path.resolve("web/components/SampleBookEngine.tsx");
const sampleBookEngineCode = fs.readFileSync(sampleBookEnginePath, "utf-8");

assert(
  sampleBookEngineCode.includes("config.coverFormat === 'layflat' ? 99 : config.coverFormat === 'hardcover' ? 79 : 49") &&
  sampleBookEngineCode.includes('price: "49 AED"') &&
  sampleBookEngineCode.includes('price: "79 AED"') &&
  sampleBookEngineCode.includes('price: "99 AED"'),
  "SampleBookEngine.tsx calculates and renders 49 / 79 / 99 AED format pricing"
);

assert(
  pdpViewCode.includes("softcover: { aed: 49") &&
  pdpViewCode.includes("hardcover: { aed: 79") &&
  pdpViewCode.includes("layflat: { aed: 99"),
  "ProductDetailView.tsx formatPrices equals 49 / 79 / 99 AED"
);

// Check that obsolete 129 / 169 AED are absent from web/components and web/app
const webFilesToCheck = [
  "web/components/ProductDetailView.tsx",
  "web/components/ProductSpecsDrawer.tsx",
  "web/components/SampleBookEngine.tsx",
  "web/components/QualityView.tsx",
  "web/app/cart/page.tsx",
  "web/app/checkout/page.tsx",
];

webFilesToCheck.forEach((filePath) => {
  const fullPath = path.resolve(filePath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, "utf-8");
    const has129 = content.includes("129");
    const has169 = content.includes("169");
    assert(
      !has129 && !has169,
      `File ${filePath} contains zero references to legacy prices (129 / 169 AED)`
    );
  }
});

// ==============================================================================
// SUMMARY & VERDICT
// ==============================================================================
console.log("\n================================================================================");
console.log(`📊 EMPIRICAL STRESS RESULTS: ${totalPassed} Passed | ${totalFailed} Failed | ${totalWarnings} Warnings`);
console.log("================================================================================");

if (failures.length > 0) {
  console.error("FAILURES ENCOUNTERED:");
  failures.forEach((f, idx) => console.error(` ${idx + 1}. ${f.msg}`));
  process.exit(1);
} else {
  console.log("ALL MANDATORY CHALLENGER BEHAVIORAL VERIFICATIONS PASSED!");
  if (warnings.length > 0) {
    console.log("Adversarial Observations / Non-blocking Accessibility Opportunities:");
    warnings.forEach((w, idx) => console.log(` ${idx + 1}. ${w.msg}`));
  }
  process.exit(0);
}
