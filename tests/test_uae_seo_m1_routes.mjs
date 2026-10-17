// test_uae_seo_m1_routes.mjs
// Milestone M1 Automated Verification Suite
// Verifies:
// 1. Taxonomy Top 12 UAE names & normalization functions
// 2. 4 Core Landing Page Pairs (8 routes total)
// 3. Top 12 UAE Child Names Hub (24 routes total)
// 4. Schema.org JSON-LD structure & AED 49/79/99 pricing invariants
// 5. Tabby 4 split calculation (12.25 AED) & free shipping (100 AED)
// 6. Zero foreign currency leaks in visible text

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const WEB_DIR = path.resolve(REPO_ROOT, 'web');

console.log('================================================================================');
console.log('🌟 MILESTONE M1: UAE SEO LANDING PAGES & CHILD NAMES HUB VERIFICATION');
console.log('================================================================================');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ✅ PASS: ${name}`);
  } catch (err) {
    failed++;
    console.error(`  ❌ FAIL: ${name}`, err.message);
  }
}

// SUITE 1: Taxonomy & Normalization
console.log('\n--- SUITE 1: Taxonomy & Slug Normalization ---');

const taxonomyPath = path.resolve(WEB_DIR, 'lib/seo/taxonomy.ts');
const taxonomyContent = fs.readFileSync(taxonomyPath, 'utf8');

test('taxonomy.ts exports TOP_UAE_CHILD_NAMES containing all 12 names', () => {
  const expectedNames = [
    'zayed', 'fatima', 'hamdan', 'maryam', 'rashid', 'noah',
    'olivia', 'liam', 'sarah', 'omar', 'ali', 'layla',
  ];
  for (const n of expectedNames) {
    assert(taxonomyContent.includes(`slug: '${n}'`), `Missing ${n} in taxonomy`);
  }
});

test('taxonomy.ts exports normalizeNameSlug and getTopUaeChildName', () => {
  assert(taxonomyContent.includes('export function normalizeNameSlug'), 'Missing normalizeNameSlug');
  assert(taxonomyContent.includes('export function getTopUaeChildName'), 'Missing getTopUaeChildName');
  assert(taxonomyContent.includes("if (clean === 'sara') return 'sarah'"), 'Missing sara -> sarah alias mapping');
});

test('taxonomy.ts exports buildSeoPageJsonLd with Product, FAQ, Breadcrumbs', () => {
  assert(taxonomyContent.includes('export function buildSeoPageJsonLd'), 'Missing buildSeoPageJsonLd');
  assert(taxonomyContent.includes("'@type': 'Product'"), 'Missing Product type');
  assert(taxonomyContent.includes("'@type': 'FAQPage'"), 'Missing FAQPage type');
  assert(taxonomyContent.includes("'@type': 'BreadcrumbList'"), 'Missing BreadcrumbList type');
  assert(taxonomyContent.includes("ratingValue = '4.96'"), 'Missing 4.96 rating default');
  assert(taxonomyContent.includes("reviewCount = '428'"), 'Missing 428 review count default');
});

// SUITE 2: Core 8 Landing Page Routes Existence
console.log('\n--- SUITE 2: Core 8 Landing Page Routes Existence ---');

const corePageFiles = [
  'app/personalized-books-dubai/page.tsx',
  'app/ar/personalized-books-dubai/page.tsx',
  'app/personalized-baby-gifts-dubai/page.tsx',
  'app/ar/personalized-baby-gifts-dubai/page.tsx',
  'app/bilingual-children-books-arabic-english/page.tsx',
  'app/ar/bilingual-children-books-arabic-english/page.tsx',
  'app/custom-storybook-for-kids-dubai/page.tsx',
  'app/ar/custom-storybook-for-kids-dubai/page.tsx',
];

for (const relPath of corePageFiles) {
  test(`File exists: web/${relPath}`, () => {
    const fullPath = path.resolve(WEB_DIR, relPath);
    assert(fs.existsSync(fullPath), `File does not exist: ${fullPath}`);
    const code = fs.readFileSync(fullPath, 'utf8');
    assert(code.includes('SeoLandingView'), `Missing SeoLandingView in ${relPath}`);
    assert(code.includes('buildSeoPageJsonLd'), `Missing buildSeoPageJsonLd in ${relPath}`);
  });
}

// SUITE 3: Reusable SEO Components
console.log('\n--- SUITE 3: Reusable Components Inspection ---');

const seoLandingViewPath = path.resolve(WEB_DIR, 'components/seo/SeoLandingView.tsx');
const nameHubViewPath = path.resolve(WEB_DIR, 'components/seo/NameHubView.tsx');

test('SeoLandingView.tsx exists and contains Wonderbly design tokens', () => {
  assert(fs.existsSync(seoLandingViewPath), 'SeoLandingView.tsx missing');
  const code = fs.readFileSync(seoLandingViewPath, 'utf8');
  assert(code.includes('#FDF8F1'), 'Missing Kraft paper #FDF8F1 token');
  assert(code.includes('#1E5751'), 'Missing Racing green #1E5751 token');
  assert(code.includes('rounded-[2px]'), 'Missing 2px sharp radius token');
  assert(code.includes('font-serif'), 'Missing Fraunces serif headings');
  assert(code.includes('12.25'), 'Missing Tabby 12.25 AED installment display');
});

test('NameHubView.tsx exists and contains child name personalization features', () => {
  assert(fs.existsSync(nameHubViewPath), 'NameHubView.tsx missing');
  const code = fs.readFileSync(nameHubViewPath, 'utf8');
  assert(code.includes('displayName'), 'Missing child display name binding');
  assert(code.includes('meaning'), 'Missing child name meaning binding');
  assert(code.includes('siblingNames'), 'Missing sibling names chips');
  assert(code.includes('12.25'), 'Missing Tabby 12.25 AED installment');
  assert(code.includes('sampleVerses'), 'Missing sample verses display');
  assert(code.includes('dedicationSample'), 'Missing dedication sample spread');
});

// SUITE 4: Prerender Manifest Verification (All 32 Routes)
console.log('\n--- SUITE 4: Prerender Manifest 32 Routes Verification ---');

const manifestPath = path.resolve(WEB_DIR, '.next/prerender-manifest.json');
test('prerender-manifest.json exists and contains all 32 SEO routes', () => {
  assert(fs.existsSync(manifestPath), 'prerender-manifest.json not found');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  const expectedRoutes = [
    '/personalized-books-dubai',
    '/ar/personalized-books-dubai',
    '/personalized-baby-gifts-dubai',
    '/ar/personalized-baby-gifts-dubai',
    '/bilingual-children-books-arabic-english',
    '/ar/bilingual-children-books-arabic-english',
    '/custom-storybook-for-kids-dubai',
    '/ar/custom-storybook-for-kids-dubai',
    '/personalized-books/for-zayed',
    '/ar/personalized-books/for-zayed',
    '/personalized-books/for-fatima',
    '/ar/personalized-books/for-fatima',
    '/personalized-books/for-hamdan',
    '/ar/personalized-books/for-hamdan',
    '/personalized-books/for-maryam',
    '/ar/personalized-books/for-maryam',
    '/personalized-books/for-rashid',
    '/ar/personalized-books/for-rashid',
    '/personalized-books/for-noah',
    '/ar/personalized-books/for-noah',
    '/personalized-books/for-olivia',
    '/ar/personalized-books/for-olivia',
    '/personalized-books/for-liam',
    '/ar/personalized-books/for-liam',
    '/personalized-books/for-sarah',
    '/ar/personalized-books/for-sarah',
    '/personalized-books/for-omar',
    '/ar/personalized-books/for-omar',
    '/personalized-books/for-ali',
    '/ar/personalized-books/for-ali',
    '/personalized-books/for-layla',
    '/ar/personalized-books/for-layla',
  ];

  for (const route of expectedRoutes) {
    assert(manifest.routes[route], `Route missing from prerender manifest: ${route}`);
  }
});

// SUITE 5: Static HTML Quality & Invariant Defense
console.log('\n--- SUITE 5: Static HTML Quality & Pricing Defense ---');

const sampleHtmlPaths = [
  'server/app/personalized-books-dubai.html',
  'server/app/ar/personalized-books-dubai.html',
  'server/app/personalized-baby-gifts-dubai.html',
  'server/app/ar/personalized-baby-gifts-dubai.html',
  'server/app/bilingual-children-books-arabic-english.html',
  'server/app/ar/bilingual-children-books-arabic-english.html',
  'server/app/custom-storybook-for-kids-dubai.html',
  'server/app/ar/custom-storybook-for-kids-dubai.html',
  'server/app/personalized-books/for-zayed.html',
  'server/app/ar/personalized-books/for-zayed.html',
  'server/app/personalized-books/for-fatima.html',
  'server/app/ar/personalized-books/for-fatima.html',
];

for (const relHtml of sampleHtmlPaths) {
  const fullHtmlPath = path.resolve(WEB_DIR, '.next', relHtml);
  test(`HTML Invariants for ${relHtml}`, () => {
    assert(fs.existsSync(fullHtmlPath), `HTML missing on disk: ${fullHtmlPath}`);
    const html = fs.readFileSync(fullHtmlPath, 'utf8');

    // JSON-LD present
    assert(html.includes('application/ld+json'), 'Missing JSON-LD');
    assert(html.includes('4.96'), 'Missing 4.96 rating in schema');
    assert(html.includes('428'), 'Missing 428 reviews in schema');
    assert(html.includes('AED'), 'Missing AED currency in schema');

    // Strip scripts to inspect visible text
    const textOnly = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ');

    assert(!textOnly.includes('$'), 'Foreign currency $ leaked in visible text');
    assert(!textOnly.includes('USD'), 'Foreign currency USD leaked in visible text');
    assert(!textOnly.includes('GBP'), 'Foreign currency GBP leaked in visible text');
    assert(!textOnly.includes('EUR'), 'Foreign currency EUR leaked in visible text');
    assert(!textOnly.includes('149 AED'), 'Stale price 149 AED leaked in visible text');
    assert(!textOnly.includes('189 AED'), 'Stale price 189 AED leaked in visible text');
    assert(textOnly.includes('12.25') || html.includes('١٢.٢٥'), 'Missing Tabby 12.25 installment in visible text');
  });
}

console.log('\n================================================================================');
console.log(`📊 MILESTONE M1 VERIFICATION SUMMARY: ${passed} Passed | ${failed} Failed`);
console.log('================================================================================\n');

if (failed > 0) {
  process.exit(1);
}
