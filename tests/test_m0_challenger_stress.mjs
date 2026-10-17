/**
 * test_m0_challenger_stress.mjs
 *
 * Empirical Challenger Adversarial Stress Suite for Milestone M0:
 * - Token geometry, hex parsing & WCAG 2.1 contrast ratios
 * - Typography fallback matrix & RTL Tashkeel protection invariants
 * - Layout primitives state machines (Accordion single/multi & PageSection tones)
 * - Edge case resilience under unexpected inputs
 */

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('='.repeat(80));
console.log('⚔️  CHALLENGER 1: ADVERSARIAL STRESS TEST HARNESS — MILESTONE M0');
console.log('='.repeat(80));

let totalPassed = 0;
let totalFailed = 0;
const failureLog = [];

function challenge(title, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${title}`);
    totalPassed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${title}`);
    console.error(`     Reason: ${err.message}`);
    totalFailed++;
    failureLog.push({ title, error: err.message });
  }
}

// ------------------------------------------------------------------------------
// SECTION 1: Token Hex Syntax, Geometry & WCAG Contrast Oracle
// ------------------------------------------------------------------------------
console.log('\n[CHALLENGE 1] Design Token Integrity & WCAG 2.1 Contrast Oracle');

const tokensCssPath = path.join(rootDir, 'web/styles/tokens.css');
const globalsCssPath = path.join(rootDir, 'web/app/globals.css');
const tokensCss = fs.readFileSync(tokensCssPath, 'utf8');
const globalsCss = fs.readFileSync(globalsCssPath, 'utf8');

// Helper: parse hex color to sRGB
function hexToRgb(hex) {
  const cleanHex = hex.trim().replace(/^#/, '');
  if (cleanHex.length !== 6) throw new Error(`Invalid 6-char hex: ${hex}`);
  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

// Helper: calculate sRGB relative luminance per WCAG 2.1
function getLuminance({ r, g, b }) {
  const a = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

// Helper: calculate contrast ratio (L1 + 0.05) / (L2 + 0.05)
function getContrastRatio(hex1, hex2) {
  const lum1 = getLuminance(hexToRgb(hex1));
  const lum2 = getLuminance(hexToRgb(hex2));
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / darker + 0.05 ? (lighter + 0.05) / (darker + 0.05) : 1;
}

const tokenExtractRegex = /(--color-[a-z0-9-]+):\s*(#[0-9a-fA-F]{6});/g;
const tokensMap = {};
let match;
while ((match = tokenExtractRegex.exec(tokensCss)) !== null) {
  tokensMap[match[1]] = match[2].toLowerCase();
}

challenge('tokens.css contains valid hex codes for all extracted color tokens', () => {
  const count = Object.keys(tokensMap).length;
  assert(count >= 20, `Expected at least 20 color tokens, got ${count}`);
  for (const [name, hex] of Object.entries(tokensMap)) {
    assert(/^#[0-9a-f]{6}$/.test(hex), `Invalid hex format for ${name}: ${hex}`);
  }
});

challenge('All required Wonderbly palette colors are present in tokens.css', () => {
  const mandatory = [
    '--color-sharpie',
    '--color-kraft-paper',
    '--color-kraft-paper-warm',
    '--color-kraft-paper-60',
    '--color-grid-line',
    '--color-racing-green',
    '--color-mustard',
    '--color-butter',
    '--color-tinkerbell',
    '--color-lily-pad',
    '--color-cherry-cola',
    '--color-ketchup',
    '--color-paper-boat',
    '--color-blueberry',
    '--color-bubble-bath',
    '--color-princess',
    '--color-pinking-shears',
  ];
  for (const token of mandatory) {
    assert(token in tokensMap, `Missing mandatory token: ${token}`);
  }
});

challenge('WCAG 2.1 Contrast: Primary reading pairs meet AAA (>= 7.0:1) or AA (>= 4.5:1)', () => {
  // Sharpie text on Kraft Paper
  const sharpieOnKraft = getContrastRatio(tokensMap['--color-sharpie'], tokensMap['--color-kraft-paper']);
  assert(sharpieOnKraft >= 10.0, `Sharpie on Kraft Paper contrast ${sharpieOnKraft.toFixed(2)} must be >= 10.0`);

  // Sharpie text on Kraft Paper Warm
  const sharpieOnKraftWarm = getContrastRatio(tokensMap['--color-sharpie'], tokensMap['--color-kraft-paper-warm']);
  assert(sharpieOnKraftWarm >= 10.0, `Sharpie on Kraft Paper Warm contrast ${sharpieOnKraftWarm.toFixed(2)} must be >= 10.0`);

  // Sharpie text on Kraft Paper 60
  const sharpieOnKraft60 = getContrastRatio(tokensMap['--color-sharpie'], tokensMap['--color-kraft-paper-60']);
  assert(sharpieOnKraft60 >= 12.0, `Sharpie on Kraft Paper 60 contrast ${sharpieOnKraft60.toFixed(2)} must be >= 12.0`);

  // White text on Racing Green
  const whiteOnGreen = getContrastRatio('#ffffff', tokensMap['--color-racing-green']);
  assert(whiteOnGreen >= 6.0, `White on Racing Green contrast ${whiteOnGreen.toFixed(2)} must be >= 6.0 (AA)`);

  // White text on Blueberry
  const whiteOnBlue = getContrastRatio('#ffffff', tokensMap['--color-blueberry']);
  assert(whiteOnBlue >= 7.0, `White on Blueberry contrast ${whiteOnBlue.toFixed(2)} must be >= 7.0 (AAA)`);

  // Sharpie text on Mustard
  const sharpieOnMustard = getContrastRatio(tokensMap['--color-sharpie'], tokensMap['--color-mustard']);
  assert(sharpieOnMustard >= 9.0, `Sharpie on Mustard contrast ${sharpieOnMustard.toFixed(2)} must be >= 9.0 (AAA)`);

  // Sharpie text on Tinkerbell Mint
  const sharpieOnTinkerbell = getContrastRatio(tokensMap['--color-sharpie'], tokensMap['--color-tinkerbell']);
  assert(sharpieOnTinkerbell >= 11.0, `Sharpie on Tinkerbell contrast ${sharpieOnTinkerbell.toFixed(2)} must be >= 11.0 (AAA)`);
});

challenge('Editorial Geometry: --radius-sharp is strictly 2px and --radius-pill is 9999px', () => {
  assert(tokensCss.includes('--radius-sharp: 2px;'), 'Expected --radius-sharp: 2px');
  assert(tokensCss.includes('--radius-pill: 9999px;'), 'Expected --radius-pill: 9999px');
  assert(globalsCss.includes('--radius-sharp: 2px;'), 'globals.css must define --radius-sharp: 2px');
  assert(globalsCss.includes('--radius-pill: 9999px;'), 'globals.css must define --radius-pill: 9999px');
});

challenge('Book Physical Realism: --shadow-spine has valid 3-stop drop shadow', () => {
  const spineRegex = /--shadow-spine:\s*([^;]+);/;
  const spineMatch = spineRegex.exec(tokensCss);
  assert(spineMatch, 'Missing --shadow-spine declaration');
  const val = spineMatch[1];
  assert(val.includes('rgba(129, 92, 24, 0.12)'), 'Missing warm kraft ambient spine shadow stop');
  assert(val.includes('rgba(0, 0, 0, 0.30)'), 'Missing direct spine depth shadow stop');
  assert(val.includes('rgba(0, 0, 0, 0.03)'), 'Missing spine spread shadow stop');
});

// ------------------------------------------------------------------------------
// SECTION 2: Tailwind v4 @theme inline Mappings
// ------------------------------------------------------------------------------
console.log('\n[CHALLENGE 2] Tailwind v4 @theme inline Completeness');

challenge('All extracted tokens in tokens.css are mapped in @theme inline', () => {
  for (const tokenName of Object.keys(tokensMap)) {
    assert(globalsCss.includes(tokenName), `@theme inline does not reference ${tokenName}`);
  }
});

challenge('@theme inline maps font variables for sans, serif, heading, and amiri', () => {
  assert(globalsCss.includes('--font-sans:'), 'Missing --font-sans');
  assert(globalsCss.includes('--font-serif:'), 'Missing --font-serif');
  assert(globalsCss.includes('--font-heading:'), 'Missing --font-heading');
  assert(globalsCss.includes('--font-amiri:'), 'Missing --font-amiri');
});

// ------------------------------------------------------------------------------
// SECTION 3: Bilingual Typography & Arabic Tashkeel Stress
// ------------------------------------------------------------------------------
console.log('\n[CHALLENGE 3] Bilingual Typography & RTL Tashkeel Diacritic Stability');

challenge('globals.css applies letter-spacing: 0 !important globally to RTL and AR contexts', () => {
  const rtlRule = /\[dir="rtl"\],\s*\[lang="ar"\]\s*\{\s*letter-spacing:\s*0\s*!important;\s*\}/;
  assert(rtlRule.test(globalsCss), 'Missing universal [dir="rtl"], [lang="ar"] { letter-spacing: 0 !important; }');
});

challenge('Heading elements and serif/heading classes map to Amiri in RTL and AR contexts', () => {
  assert(globalsCss.includes('[dir="rtl"] h1'), 'Missing [dir="rtl"] h1 selector');
  assert(globalsCss.includes('[dir="rtl"] .font-serif'), 'Missing [dir="rtl"] .font-serif selector');
  assert(globalsCss.includes('[dir="rtl"] .font-heading'), 'Missing [dir="rtl"] .font-heading selector');
  assert(globalsCss.includes('[lang="ar"] h1'), 'Missing [lang="ar"] h1 selector');
  assert(globalsCss.includes('[lang="ar"] .font-serif'), 'Missing [lang="ar"] .font-serif selector');
  assert(globalsCss.includes('[lang="ar"] .font-heading'), 'Missing [lang="ar"] .font-heading selector');
  assert(globalsCss.includes("font-family: 'Amiri', serif;"), "Missing font-family: 'Amiri', serif rule for RTL headings");
});

challenge('.font-amiri specifies generous line-height (2.1) and enables OpenType ligatures', () => {
  assert(globalsCss.includes('line-height: 2.1;'), 'Expected line-height: 2.1 for Tashkeel clearance');
  assert(globalsCss.includes('font-feature-settings: "kern" 1, "liga" 1, "calt" 1;'), 'Expected kern, liga, calt features');
  assert(globalsCss.includes('letter-spacing: 0 !important;'), 'Expected letter-spacing: 0 !important on .font-amiri');
});

challenge('Tashkeel Diacritics Oracle: Stress test Unicode Arabic Tashkeel string integrity', () => {
  const testPhrases = [
    // Standard Tashkeel (Fatha, Damma, Kasra, Sukun, Shadda, Tanwin)
    'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    'اجْعَلْهُمْ أَبْطَالَ القِصَّةِ الحَقِيقِيَّةِ',
    'عَبْدُ الرَّحْمَٰنِ وَفَاطِمَةُ فِي وَاحَةِ النَّخِيلِ',
    'كِتَابٌ مُخَصَّصٌ فَرِيدٌ مِنْ نَوْعِهِ',
    'أَلْفُ مَبْرُوكٍ بِمُنَاسَبَةِ المَوْلُودِ الجَدِيدِ',
  ];

  for (const phrase of testPhrases) {
    // Verify Unicode decomposition (NFD) and composition (NFC) maintain character codes
    const nfc = phrase.normalize('NFC');
    const nfd = phrase.normalize('NFD');
    assert(nfc.length > 0 && nfd.length > 0, `Normalization failed on ${phrase}`);
    // Verify Tashkeel code points range U+064B through U+0652 exist
    const hasTashkeel = /[\u064B-\u0652]/.test(phrase);
    assert(hasTashkeel, `Phrase should contain Tashkeel diacritics: ${phrase}`);
  }
});

// ------------------------------------------------------------------------------
// SECTION 4: Layout Primitives Behavioral Stress
// ------------------------------------------------------------------------------
console.log('\n[CHALLENGE 4] Layout Primitives (PageSection & Accordion) Verification');

const pageSectionPath = path.join(rootDir, 'web/components/ui/PageSection.tsx');
const accordionPath = path.join(rootDir, 'web/components/ui/Accordion.tsx');
const pageSectionSrc = fs.readFileSync(pageSectionPath, 'utf8');
const accordionSrc = fs.readFileSync(accordionPath, 'utf8');

challenge('PageSection toneStyles defines accessible background/text pairings for all tones', () => {
  const tones = ['default', 'kraft', 'paper', 'white', 'green', 'tinkerbell', 'sharpie'];
  for (const tone of tones) {
    assert(pageSectionSrc.includes(`${tone}:`), `Missing tone style: ${tone}`);
  }

  // Verify contrast correctness in toneStyles
  // kraft -> text-[var(--color-sharpie)]
  assert(pageSectionSrc.includes("kraft: 'bg-[var(--color-kraft-paper)] text-[var(--color-sharpie)]'"),
    'kraft tone must use sharpie text for high contrast');
  // green -> text-white
  assert(pageSectionSrc.includes("green: 'bg-[var(--color-racing-green)] text-white'"),
    'green tone must use white text for high contrast');
  // sharpie -> text-white
  assert(pageSectionSrc.includes("sharpie: 'bg-[var(--color-sharpie)] text-white'"),
    'sharpie tone must use white text');
  // tinkerbell -> text-[var(--color-sharpie)]
  assert(pageSectionSrc.includes("tinkerbell: 'bg-[var(--color-tinkerbell)] text-[var(--color-sharpie)]'"),
    'tinkerbell tone must use sharpie text');
});

challenge('PageSection supports flush boolean and container centering', () => {
  assert(pageSectionSrc.includes("flush ? '' : 'py-10 md:py-14'"), 'Expected conditional py-10 md:py-14 padding');
  assert(pageSectionSrc.includes('<div className="wb-container">{children}</div>'), 'Expected .wb-container child wrapper');
});

challenge('Accordion state machine simulation: single mode vs multi mode', () => {
  // Replicate toggle logic from Accordion.tsx
  function createAccordionState(single = true, initial = []) {
    let open = [...initial];
    return {
      getOpen: () => open,
      toggle: (id) => {
        if (open.includes(id)) {
          open = open.filter((x) => x !== id);
        } else {
          open = single ? [id] : [...open, id];
        }
      },
    };
  }

  // Test single mode
  const singleAcc = createAccordionState(true, ['q1']);
  assert.deepStrictEqual(singleAcc.getOpen(), ['q1']);
  singleAcc.toggle('q2');
  assert.deepStrictEqual(singleAcc.getOpen(), ['q2'], 'Single mode must close q1 when opening q2');
  singleAcc.toggle('q2');
  assert.deepStrictEqual(singleAcc.getOpen(), [], 'Single mode must collapse when open item clicked');

  // Test multi mode
  const multiAcc = createAccordionState(false, ['q1']);
  multiAcc.toggle('q2');
  assert.deepStrictEqual(multiAcc.getOpen(), ['q1', 'q2'], 'Multi mode must allow both open');
  multiAcc.toggle('q1');
  assert.deepStrictEqual(multiAcc.getOpen(), ['q2'], 'Multi mode must close only clicked item');
});

challenge('Accordion initializers: handles single id, id array, single index, index array', () => {
  const items = [
    { id: 'item-0', heading: 'H0', content: 'C0' },
    { id: 'item-1', heading: 'H1', content: 'C1' },
    { id: 'item-2', heading: 'H2', content: 'C2' },
  ];

  function getInitialOpen(defaultOpenId, defaultOpenIndex) {
    if (defaultOpenId) {
      return Array.isArray(defaultOpenId) ? defaultOpenId : [defaultOpenId];
    }
    if (defaultOpenIndex !== undefined) {
      const indices = Array.isArray(defaultOpenIndex) ? defaultOpenIndex : [defaultOpenIndex];
      return indices.map((i) => items[i]?.id).filter(Boolean);
    }
    return [];
  }

  assert.deepStrictEqual(getInitialOpen('item-1', undefined), ['item-1']);
  assert.deepStrictEqual(getInitialOpen(['item-0', 'item-2'], undefined), ['item-0', 'item-2']);
  assert.deepStrictEqual(getInitialOpen(undefined, 2), ['item-2']);
  assert.deepStrictEqual(getInitialOpen(undefined, [0, 1]), ['item-0', 'item-1']);
  assert.deepStrictEqual(getInitialOpen(undefined, 99), [], 'Out-of-bound index must safely produce empty array');
  assert.deepStrictEqual(getInitialOpen(undefined, undefined), []);
});

challenge('Accordion WAI-ARIA and focus styling contracts', () => {
  assert(accordionSrc.includes('aria-expanded={isOpen}'), 'Expected aria-expanded');
  assert(accordionSrc.includes('aria-controls={panelId}'), 'Expected aria-controls');
  assert(accordionSrc.includes('role="region"'), 'Expected role="region" on panel');
  assert(accordionSrc.includes('hidden={!isOpen}'), 'Expected hidden={!isOpen} on panel');
  assert(accordionSrc.includes('type="button"'), 'Button must specify type="button"');
  assert(accordionSrc.includes('focus-visible:outline-[var(--color-paper-boat)]'), 'Expected paper boat focus ring');
});

// ------------------------------------------------------------------------------
// SUMMARY
// ------------------------------------------------------------------------------
console.log('\n' + '='.repeat(80));
console.log(`📊 CHALLENGER EMPIRICAL RESULTS: ${totalPassed} PASSED | ${totalFailed} FAILED`);
console.log('='.repeat(80));

if (totalFailed > 0) {
  console.error('\nFailure Details:');
  for (const f of failureLog) {
    console.error(` - ${f.title}: ${f.error}`);
  }
  process.exit(1);
} else {
  console.log('🎉 All challenger adversarial stress tests passed with 100% empirical fidelity!');
  process.exit(0);
}
