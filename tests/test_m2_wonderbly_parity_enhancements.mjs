// Behavioral & Contract Verification Harness for Milestone M2 Wonderbly Replication Enhancements
// Verifies:
// 1. Sharp editorial design token compliance (rounded-[2px]) on Category & all-books pages
// 2. /all-books and /ar/all-books routes and redirects
// 3. PDP Sticky Gallery (lg:sticky lg:top-24 self-start)
// 4. PDP Emotional Storytelling 2-column block (Why kids love this story / Why parents love it)
// 5. PDP Editorial Footer mounting
// 6. CharacterBuilderStep dynamic CharacterAvatarIllustration SVG preview
// 7. ReviewsSection "You may also like" header and current product exclusion filter
// 8. knight-of-the-golden-oasis coverImage fix in reviews.ts
// 9. Arabic funnel parity routes (/ar/create, /ar/create/start, /ar/create/preview)
// 10. Checkout symmetrical unwrap CTA routing (/ar/unwrap/demo vs /unwrap/demo)
// 11. Giftwraps page Wonderbly restyling (rounded-[2px], Kraft paper tokens)

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PRODUCTS } from "../web/config/products.ts";
import { RELATED_STORYBOOKS } from "../web/config/reviews.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");
const WEB_DIR = path.resolve(REPO_ROOT, "web");

console.log("================================================================================");
console.log("🧪 VERIFICATION SUITE: MILESTONE M2 WONDERBLY REPLICATION PARITY");
console.log("================================================================================");

let passed = 0;
let failed = 0;

function assert(condition, message, details = {}) {
  if (condition) {
    passed++;
    console.log(`  ✅ PASS: ${message}`);
  } else {
    failed++;
    console.error(`  ❌ FAIL: ${message}`, details);
  }
}

// ================================================================================
// SUITE 1: Sharp Editorial Design Token Compliance on Category Pages (R1)
// ================================================================================
console.log("\n--- SUITE 1: Category Listing Sharp Radius Tokens & all-books ---");

const enCategorySrc = fs.readFileSync(path.resolve(WEB_DIR, "app/books/category/[slug]/page.tsx"), "utf-8");
const arCategorySrc = fs.readFileSync(path.resolve(WEB_DIR, "app/ar/books/category/[slug]/page.tsx"), "utf-8");

assert(
  !enCategorySrc.includes("rounded-3xl") && !enCategorySrc.includes("rounded-2xl"),
  "English category page contains ZERO rounded-3xl or rounded-2xl violations (sharp 2px tokens)"
);
assert(
  enCategorySrc.includes("rounded-[2px]"),
  "English category page applies sharp rounded-[2px] to promotional and trust components"
);

assert(
  !arCategorySrc.includes("rounded-3xl") && !arCategorySrc.includes("rounded-2xl"),
  "Arabic category page contains ZERO rounded-3xl or rounded-2xl violations (sharp 2px tokens)"
);
assert(
  arCategorySrc.includes("rounded-[2px]"),
  "Arabic category page applies sharp rounded-[2px] to promotional and trust components"
);

// Verify /all-books and /ar/all-books files exist and contain full catalog logic
const enAllBooksPath = path.resolve(WEB_DIR, "app/all-books/page.tsx");
const arAllBooksPath = path.resolve(WEB_DIR, "app/ar/all-books/page.tsx");

assert(fs.existsSync(enAllBooksPath), "web/app/all-books/page.tsx exists in App Router");
assert(fs.existsSync(arAllBooksPath), "web/app/ar/all-books/page.tsx exists in App Router");

const enAllBooksSrc = fs.readFileSync(enAllBooksPath, "utf-8");
const arAllBooksSrc = fs.readFileSync(arAllBooksPath, "utf-8");

assert(
  enAllBooksSrc.includes("All Personalized Storybooks") && enAllBooksSrc.includes("font-serif"),
  "English /all-books page features Fraunces serif header"
);
assert(
  arAllBooksSrc.includes("جميع قصص الأطفال المخصصة") && arAllBooksSrc.includes("dir=\"rtl\""),
  "Arabic /ar/all-books page features Arabic header and native RTL layout"
);

// Verify next.config.ts redirects for /books -> /all-books
const nextConfigSrc = fs.readFileSync(path.resolve(WEB_DIR, "next.config.ts"), "utf-8");
assert(
  nextConfigSrc.includes("source: '/books'") && nextConfigSrc.includes("destination: '/all-books'"),
  "next.config.ts defines permanent redirect for /books -> /all-books"
);
assert(
  nextConfigSrc.includes("source: '/ar/books'") && nextConfigSrc.includes("destination: '/ar/all-books'"),
  "next.config.ts defines permanent redirect for /ar/books -> /ar/all-books"
);

// ================================================================================
// SUITE 2: Product Detail Page Parity (R2)
// ================================================================================
console.log("\n--- SUITE 2: Product Detail Page Parity (R2) ---");

const pdpViewSrc = fs.readFileSync(path.resolve(WEB_DIR, "components/ProductDetailView.tsx"), "utf-8");

// 2.1 Sticky Gallery Container
assert(
  pdpViewSrc.includes("lg:sticky lg:top-24 self-start"),
  "ProductDetailView.tsx gallery container defines 'lg:sticky lg:top-24 self-start' on desktop"
);

// 2.2 Emotional Storytelling Block
assert(
  pdpViewSrc.includes("Why kids love this story") &&
  pdpViewSrc.includes("Why parents love it"),
  "ProductDetailView.tsx includes English editorial storytelling block ('Why kids love this story', 'Why parents love it')"
);
assert(
  pdpViewSrc.includes("لماذا يحب الأطفال هذه القصة") &&
  pdpViewSrc.includes("لماذا يحب الآباء هذا الكتاب"),
  "ProductDetailView.tsx includes Arabic editorial storytelling block ('لماذا يحب الأطفال هذه القصة', 'لماذا يحب الآباء هذا الكتاب')"
);

// 2.3 Editorial Footer on PDP
assert(
  pdpViewSrc.includes("import Footer from '@/components/Footer';") &&
  pdpViewSrc.includes("<Footer initialLang={isAr ? 'ar' : 'en'} />"),
  "ProductDetailView.tsx mounts <Footer initialLang={isAr ? 'ar' : 'en'} /> at the bottom"
);

// 2.4 Character Avatar Illustration in CharacterBuilderStep.tsx
const charBuilderSrc = fs.readFileSync(path.resolve(WEB_DIR, "components/CharacterBuilderStep.tsx"), "utf-8");
assert(
  charBuilderSrc.includes("CharacterAvatarIllustration") &&
  charBuilderSrc.includes("<svg viewBox=\"0 0 200 200\""),
  "CharacterBuilderStep.tsx implements and renders CharacterAvatarIllustration component with SVG avatar"
);
assert(
  charBuilderSrc.includes("traditional-ghutra") &&
  charBuilderSrc.includes("modest-shaila") &&
  charBuilderSrc.includes("curly-afro"),
  "CharacterAvatarIllustration models traditional Ghutra, Shaila, and Afro cultural hairstyles"
);

// 2.5 ReviewsSection Cross-Sell Header & Dynamic Filtering
const reviewsSectionSrc = fs.readFileSync(path.resolve(WEB_DIR, "components/ReviewsSection.tsx"), "utf-8");
assert(
  reviewsSectionSrc.includes("You may also like") &&
  reviewsSectionSrc.includes("قد يعجبك أيضاً"),
  "ReviewsSection.tsx displays 'You may also like' / 'قد يعجبك أيضاً' cross-sell header"
);
assert(
  reviewsSectionSrc.includes("p.slug !== currentSlug"),
  "ReviewsSection.tsx dynamically filters PRODUCTS excluding the currently viewed book"
);

// 2.6 Fix knight-of-the-golden-oasis coverImage in web/config/reviews.ts
const knightReview = RELATED_STORYBOOKS.find((b) => b.slug === "knight-of-the-golden-oasis");
assert(
  knightReview && knightReview.coverImage === "/competitor_wonderbly_spread_1788709121360.jpg",
  "knight-of-the-golden-oasis in reviews.ts points to proper cover image (/competitor_wonderbly_spread_1788709121360.jpg)"
);
assert(
  !knightReview.coverImage.includes("starlit-dunes"),
  "knight-of-the-golden-oasis does NOT leak starlit-dunes coverImage"
);

// ================================================================================
// SUITE 3: Funnel & Routing Parity (R3 & R4)
// ================================================================================
console.log("\n--- SUITE 3: Funnel & Routing Parity (R3 & R4) ---");

// 3.1 Arabic Funnel Route Parity Files
const arCreatePath = path.resolve(WEB_DIR, "app/ar/create/page.tsx");
const arCreateStartPath = path.resolve(WEB_DIR, "app/ar/create/start/page.tsx");
const arCreatePreviewPath = path.resolve(WEB_DIR, "app/ar/create/preview/page.tsx");

assert(fs.existsSync(arCreatePath), "web/app/ar/create/page.tsx exists");
assert(fs.existsSync(arCreateStartPath), "web/app/ar/create/start/page.tsx exists");
assert(fs.existsSync(arCreatePreviewPath), "web/app/ar/create/preview/page.tsx exists");

// 3.2 Symmetrical Unwrap CTA in Checkout
const checkoutSrc = fs.readFileSync(path.resolve(WEB_DIR, "app/checkout/page.tsx"), "utf-8");
assert(
  checkoutSrc.includes("${isAr ? '/ar/unwrap/demo' : '/unwrap/demo'}"),
  "web/app/checkout/page.tsx links unwrap CTA symmetrically to /ar/unwrap/demo when in Arabic mode"
);

// 3.3 Giftwraps Page Wonderbly Restyling
const giftwrapsSrc = fs.readFileSync(path.resolve(WEB_DIR, "app/create/giftwraps/page.tsx"), "utf-8");
assert(
  !giftwrapsSrc.includes("rounded-3xl") && !giftwrapsSrc.includes("rounded-2xl"),
  "web/app/create/giftwraps/page.tsx uses sharp rounded-[2px] tokens (no rounded-3xl or rounded-2xl)"
);
assert(
  giftwrapsSrc.includes("bg-[#FDF8F1]") && giftwrapsSrc.includes("#1E5751"),
  "web/app/create/giftwraps/page.tsx applies Wonderbly Kraft paper and Racing Green design tokens"
);

// ================================================================================
// SUMMARY
// ================================================================================
console.log("\n================================================================================");
console.log(`📊 PARITY SUITE COMPLETE: ${passed} Passed | ${failed} Failed`);
console.log("================================================================================");

process.exit(failed === 0 ? 0 : 1);
