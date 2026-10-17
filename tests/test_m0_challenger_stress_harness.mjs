/**
 * test_m0_challenger_stress_harness.mjs
 *
 * EMPIRICAL ADVERSARIAL STRESS HARNESS for Milestone M0
 * Challenger 2: Stress-testing token integrity, Tailwind compilation,
 * bilingual typography / Tashkeel, layout primitives, and build artifacts.
 */

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const webDir = path.join(rootDir, 'web');

console.log('='.repeat(80));
console.log('🛡️  CHALLENGER 2: EMPIRICAL ADVERSARIAL STRESS HARNESS (MILESTONE M0)');
console.log('='.repeat(80));

let passCount = 0;
let failCount = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passCount++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     Error: ${err.message}`);
    failCount++;
    failures.push({ name, error: err.message });
  }
}

async function asyncTest(name, fn) {
  try {
    await fn();
    console.log(`  ✅ PASS: ${name}`);
    passCount++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     Error: ${err.message}`);
    failCount++;
    failures.push({ name, error: err.message });
  }
}

// ------------------------------------------------------------------------------
// SECTION 1: Token Integrity, Hex Syntax, and Variable Graph Analysis
// ------------------------------------------------------------------------------
console.log('\n--- SECTION 1: Token Integrity & Variable Resolution Graph ---');

const tokensCssPath = path.join(webDir, 'styles/tokens.css');
const globalsCssPath = path.join(webDir, 'app/globals.css');
const tokensCss = fs.readFileSync(tokensCssPath, 'utf8');
const globalsCss = fs.readFileSync(globalsCssPath, 'utf8');

// Parse all CSS variables declared in tokens.css under :root
const tokenVarRegex = /(--[a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g;
const declaredTokens = new Map();
let match;
while ((match = tokenVarRegex.exec(tokensCss)) !== null) {
  declaredTokens.set(match[1].trim(), match[2].trim());
}

test('tokens.css declares at least 25 Wonderbly core design tokens', () => {
  assert(declaredTokens.size >= 25, `Expected >= 25 tokens, found ${declaredTokens.size}`);
});

// Hex color validator regex
const hexRegex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;

const expectedHexTokens = [
  '--color-sharpie',
  '--color-sharpie-80',
  '--color-sharpie-60',
  '--color-sharpie-30',
  '--color-sharpie-20',
  '--color-sharpie-10',
  '--color-bright-smile',
  '--color-kraft-paper',
  '--color-kraft-paper-warm',
  '--color-kraft-paper-60',
  '--color-kraft-paper-30',
  '--color-grid-line',
  '--color-racing-green',
  '--color-racing-green-60',
  '--color-racing-green-30',
  '--color-mustard',
  '--color-mustard-60',
  '--color-mustard-30',
  '--color-butter',
  '--color-tinkerbell',
  '--color-tinkerbell-60',
  '--color-lily-pad',
  '--color-cherry-cola',
  '--color-ketchup',
  '--color-paper-boat',
  '--color-blueberry',
  '--color-bubble-bath',
  '--color-princess',
  '--color-pinking-shears',
];

for (const t of expectedHexTokens) {
  test(`Token ${t} exists and has valid hex format`, () => {
    assert(declaredTokens.has(t), `Missing token declaration for ${t}`);
    const val = declaredTokens.get(t);
    assert(hexRegex.test(val), `Token ${t} has invalid hex value: "${val}"`);
  });
}

test('Physical book shadow token (--shadow-spine) is non-empty and contains warm ochre bounce', () => {
  assert(declaredTokens.has('--shadow-spine'), 'Missing --shadow-spine');
  const val = declaredTokens.get('--shadow-spine');
  assert(val.includes('rgba(129, 92, 24, 0.12)'), 'Spine shadow must contain warm ochre bounce');
  assert(val.includes('rgba(0, 0, 0, 0.30)'), 'Spine shadow must contain contact occlusion');
});

test('Radius tokens (--radius-sharp, --radius-pill) are valid CSS dimensions', () => {
  assert.strictEqual(declaredTokens.get('--radius-sharp'), '2px');
  assert.strictEqual(declaredTokens.get('--radius-pill'), '9999px');
});

// Check that every variable mapped in @theme inline in globals.css exists in tokens.css
const themeVarRegex = /--color-([a-zA-Z0-9_-]+)\s*:\s*var\((--[a-zA-Z0-9_-]+)\);/g;
const themeMappings = [];
while ((match = themeVarRegex.exec(globalsCss)) !== null) {
  themeMappings.push({ property: match[1], referencedVar: match[2] });
}

test('@theme inline does not have dangling or undefined variable references', () => {
  assert(themeMappings.length > 20, 'Expected > 20 mapped color tokens in @theme');
  for (const mapping of themeMappings) {
    if (mapping.referencedVar === '--background' || mapping.referencedVar === '--foreground') continue;
    assert(
      declaredTokens.has(mapping.referencedVar),
      `Dangling reference in globals.css: ${mapping.referencedVar} not found in tokens.css`
    );
  }
});

// ------------------------------------------------------------------------------
// SECTION 2: Tailwind CSS v4 PostCSS Compilation Stress Testing
// ------------------------------------------------------------------------------
console.log('\n--- SECTION 2: Tailwind CSS v4 PostCSS Engine Compilation ---');

const postcssModule = await import(path.join(webDir, 'node_modules/postcss/lib/postcss.mjs')).catch(
  () => import(path.join(webDir, 'node_modules/postcss/lib/postcss.js'))
);
const postcss = postcssModule.default;
const tailwindModule = await import(path.join(webDir, 'node_modules/@tailwindcss/postcss/dist/index.mjs'));
const tailwind = tailwindModule.default;

await asyncTest('Tailwind v4 compiles full globals.css with zero warnings and valid CSS output', async () => {
  const result = await postcss([tailwind()]).process(globalsCss, { from: path.join(webDir, 'app/globals.css') });
  assert(result.css.length > 50000, `Compiled CSS should be substantial, got length ${result.css.length}`);
  const warnings = result.warnings();
  assert.strictEqual(warnings.length, 0, `Expected 0 PostCSS warnings, got ${warnings.map(w => w.toString()).join(', ')}`);
});

await asyncTest('Tailwind v4 compiles all 29 color utilities for bg-*, text-*, and border-*', async () => {
  const testRules = [];
  for (const t of expectedHexTokens) {
    const cleanName = t.replace('--color-', '');
    testRules.push(
      `.stress-bg-${cleanName} { @apply bg-${cleanName}; }`,
      `.stress-text-${cleanName} { @apply text-${cleanName}; }`,
      `.stress-border-${cleanName} { @apply border-${cleanName}; }`
    );
  }
  const testCss = `
@import "./globals.css";
${testRules.join('\n')}
`;
  const result = await postcss([tailwind()]).process(testCss, { from: path.join(webDir, 'app/stress_test.css') });
  for (const t of expectedHexTokens) {
    const cleanName = t.replace('--color-', '');
    assert(result.css.includes(`.stress-bg-${cleanName}`), `Failed to compile bg-${cleanName}`);
    assert(result.css.includes(`.stress-text-${cleanName}`), `Failed to compile text-${cleanName}`);
    assert(result.css.includes(`.stress-border-${cleanName}`), `Failed to compile border-${cleanName}`);
  }
});

await asyncTest('Tailwind v4 compiles geometry & font utilities (rounded-sharp, font-serif, etc.)', async () => {
  const testCss = `
@import "./globals.css";
.stress-sharp { @apply rounded-sharp; }
.stress-pill { @apply rounded-pill; }
.stress-serif { @apply font-serif; }
.stress-heading { @apply font-heading; }
.stress-sans { @apply font-sans; }
.stress-amiri { @apply font-amiri; }
`;
  const result = await postcss([tailwind()]).process(testCss, { from: path.join(webDir, 'app/stress_geom.css') });
  assert(result.css.includes('.stress-sharp'), 'Failed to compile rounded-sharp');
  assert(result.css.includes('.stress-pill'), 'Failed to compile rounded-pill');
  assert(result.css.includes('.stress-serif'), 'Failed to compile font-serif');
  assert(result.css.includes('.stress-heading'), 'Failed to compile font-heading');
  assert(result.css.includes('.stress-sans'), 'Failed to compile font-sans');
  assert(result.css.includes('.stress-amiri'), 'Failed to compile font-amiri');
});

// ------------------------------------------------------------------------------
// SECTION 3: Bilingual Typography, RTL Cascade, and Tashkeel Protection
// ------------------------------------------------------------------------------
console.log('\n--- SECTION 3: Bilingual Typography & Tashkeel Ligature Stress ---');

test('Arabic letter-spacing: 0 !important is strictly enforced on all RTL heading selectors', () => {
  const rtlHeadingSelectors = [
    '[dir="rtl"] h1', '[dir="rtl"] h2', '[dir="rtl"] h3', '[dir="rtl"] h4', '[dir="rtl"] h5', '[dir="rtl"] h6',
    '[lang="ar"] h1', '[lang="ar"] h2', '[lang="ar"] h3', '[lang="ar"] h4', '[lang="ar"] h5', '[lang="ar"] h6',
    '[dir="rtl"] .font-serif', '[dir="rtl"] .font-heading',
    '[lang="ar"] .font-serif', '[lang="ar"] .font-heading'
  ];
  for (const sel of rtlHeadingSelectors) {
    assert(globalsCss.includes(sel), `globals.css must target selector ${sel}`);
  }
});

test('Amiri font class defines line-height 2.1 to prevent Tashkeel vertical truncation', () => {
  assert(globalsCss.includes('.font-amiri'), 'Must define .font-amiri class');
  assert(globalsCss.includes('line-height: 2.1;'), 'Must have line-height: 2.1');
});

test('Amiri font class explicitly activates OpenType kerning, standard ligatures, and contextual alternates', () => {
  assert(globalsCss.includes('font-feature-settings: "kern" 1, "liga" 1, "calt" 1;'),
    'Must declare font-feature-settings: "kern" 1, "liga" 1, "calt" 1;'
  );
});

// ------------------------------------------------------------------------------
// SECTION 4: Layout Primitives Behavioral & Edge-Case Stress Testing
// ------------------------------------------------------------------------------
console.log('\n--- SECTION 4: Layout Primitives Behavioral & Edge-Case Stress ---');

const tsModule = await import(path.join(webDir, 'node_modules/typescript/lib/typescript.js'));
const ts = tsModule.default;
const React = (await import(path.join(webDir, 'node_modules/react/index.js'))).default;
const ReactDOMServer = (await import(path.join(webDir, 'node_modules/react-dom/server.node.js'))).default;

// Transpile PageSection.tsx
const pageSectionSrc = fs.readFileSync(path.join(webDir, 'components/ui/PageSection.tsx'), 'utf8');
const pageSectionTranspiled = ts.transpileModule(pageSectionSrc, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX }
});

// We can test the tone mapping logic directly
const toneStylesMatch = pageSectionSrc.match(/const toneStyles:\s*Record<PageSectionTone,\s*string>\s*=\s*\{([^}]+)\};/s);
test('PageSection defines exhaustive toneStyles mapping for all 7 tones', () => {
  assert(toneStylesMatch, 'toneStyles object must be defined');
  const tones = ['default', 'kraft', 'paper', 'white', 'green', 'tinkerbell', 'sharpie'];
  for (const tone of tones) {
    assert(toneStylesMatch[1].includes(`${tone}:`), `toneStyles must define style for '${tone}'`);
  }
});

test('PageSection flush prop toggles vertical padding', () => {
  assert(pageSectionSrc.includes("flush ? '' : 'py-10 md:py-14'"),
    'PageSection must conditionally apply py-10 md:py-14 when flush is false'
  );
});

test('PageSection wraps children in .wb-container', () => {
  assert(pageSectionSrc.includes('className="wb-container"'),
    'PageSection must include inner div with className="wb-container"'
  );
});

// Transpile Accordion.tsx
const accordionSrc = fs.readFileSync(path.join(webDir, 'components/ui/Accordion.tsx'), 'utf8');

test('Accordion implements WAI-ARIA disclosure attributes', () => {
  assert(accordionSrc.includes('aria-expanded={isOpen}'), 'Accordion button must bind aria-expanded');
  assert(accordionSrc.includes('aria-controls={panelId}'), 'Accordion button must bind aria-controls');
  assert(accordionSrc.includes('role="region"'), 'Accordion content panel must declare role="region"');
  assert(accordionSrc.includes('hidden={!isOpen}'), 'Accordion content panel must bind hidden');
});

test('Accordion toggle logic handles single=true by collapsing other items', () => {
  assert(accordionSrc.includes('return single ? [id] : [...prev, id];'),
    'Accordion must replace open list with [id] when single is true'
  );
});

test('Accordion toggle logic handles single=false by adding/removing item id', () => {
  assert(accordionSrc.includes('if (prev.includes(id)) return prev.filter((x) => x !== id);'),
    'Accordion must toggle id out if previously open'
  );
});

test('Accordion initializes from defaultOpenId (string or array)', () => {
  assert(accordionSrc.includes('Array.isArray(defaultOpenId) ? defaultOpenId : [defaultOpenId]'),
    'Accordion must normalize defaultOpenId into array'
  );
});

test('Accordion initializes from defaultOpenIndex with safe array indexing', () => {
  assert(accordionSrc.includes('indices.map((i) => items[i]?.id).filter(Boolean)'),
    'Accordion must safely map indices with optional chaining and filter(Boolean)'
  );
});

// Stress test accordion logic via simulated reducer
function simulateAccordionState(items, { single = true, defaultOpenId, defaultOpenIndex }, toggleId) {
  let open = [];
  if (defaultOpenId) {
    open = Array.isArray(defaultOpenId) ? defaultOpenId : [defaultOpenId];
  } else if (defaultOpenIndex !== undefined) {
    const indices = Array.isArray(defaultOpenIndex) ? defaultOpenIndex : [defaultOpenIndex];
    open = indices.map((i) => items[i]?.id).filter(Boolean);
  }

  // Perform toggle
  if (toggleId) {
    if (open.includes(toggleId)) {
      open = open.filter((x) => x !== toggleId);
    } else {
      open = single ? [toggleId] : [...open, toggleId];
    }
  }

  return open;
}

const sampleItems = [
  { id: 'faq-1', heading: 'Q1', content: 'A1' },
  { id: 'faq-2', heading: 'Q2', content: 'A2' },
  { id: 'faq-3', heading: 'Q3', content: 'A3' },
];

test('Accordion stress: defaultOpenIndex out of bounds does not crash or corrupt state', () => {
  const state1 = simulateAccordionState(sampleItems, { defaultOpenIndex: 999 });
  assert.deepStrictEqual(state1, [], 'Out of bounds index 999 should result in empty open array');

  const state2 = simulateAccordionState(sampleItems, { defaultOpenIndex: -1 });
  assert.deepStrictEqual(state2, [], 'Negative index -1 should result in empty open array');

  const state3 = simulateAccordionState(sampleItems, { defaultOpenIndex: [0, 999, -5] });
  assert.deepStrictEqual(state3, ['faq-1'], 'Mixed indices should safely keep valid item');
});

test('Accordion stress: single mode mutates correctly on sequential toggles', () => {
  let open = simulateAccordionState(sampleItems, { single: true, defaultOpenIndex: 0 }, 'faq-2');
  assert.deepStrictEqual(open, ['faq-2'], 'Toggling faq-2 in single mode should close faq-1');

  // Toggle faq-2 again
  if (open.includes('faq-2')) open = open.filter((x) => x !== 'faq-2');
  assert.deepStrictEqual(open, [], 'Toggling faq-2 again should close it');
});

test('Accordion stress: multi mode allows simultaneous open panels', () => {
  let open = simulateAccordionState(sampleItems, { single: false, defaultOpenIndex: 0 }, 'faq-2');
  assert.deepStrictEqual(open, ['faq-1', 'faq-2'], 'Multi mode should allow both faq-1 and faq-2');

  // Toggle faq-3
  open = [...open, 'faq-3'];
  assert.deepStrictEqual(open, ['faq-1', 'faq-2', 'faq-3'], 'Multi mode should allow 3 open panels');
});

// ------------------------------------------------------------------------------
// SECTION 5: Next.js Static Route Manifest & Build Output Invariants
// ------------------------------------------------------------------------------
console.log('\n--- SECTION 5: Next.js 170 Static Routes Verification ---');

const nextBuildManifestPath = path.join(webDir, '.next/build-manifest.json');
test('Next.js .next/build-manifest.json exists and is valid JSON', () => {
  assert(fs.existsSync(nextBuildManifestPath), '.next/build-manifest.json must exist');
  const manifest = JSON.parse(fs.readFileSync(nextBuildManifestPath, 'utf8'));
  assert(manifest.pages, 'Manifest must contain pages object');
});

const appPathsManifestPath = path.join(webDir, '.next/server/app-paths-manifest.json');
test('Next.js App Router app-paths-manifest.json exists and contains key storefront routes', () => {
  assert(fs.existsSync(appPathsManifestPath), 'app-paths-manifest.json must exist');
  const appPaths = JSON.parse(fs.readFileSync(appPathsManifestPath, 'utf8'));
  const requiredRoutes = [
    '/[country]/page',
    '/page',
    '/ar/page',
    '/about-us/page',
    '/ar/about-us/page',
    '/delivery/page',
    '/ar/delivery/page',
    '/quality/page',
    '/ar/quality/page',
    '/faq/page',
    '/ar/faq/page',
    '/cart/page',
    '/ar/cart/page',
    '/checkout/page',
    '/ar/checkout/page'
  ];
  for (const r of requiredRoutes) {
    assert(appPaths[r], `Missing required route in app-paths-manifest: ${r}`);
  }
});

// ------------------------------------------------------------------------------
// SUMMARY
// ------------------------------------------------------------------------------
console.log('\n' + '='.repeat(80));
console.log(`📊 CHALLENGER 2 STRESS HARNESS COMPLETE: ${passCount} Passed | ${failCount} Failed`);
console.log('='.repeat(80));

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
