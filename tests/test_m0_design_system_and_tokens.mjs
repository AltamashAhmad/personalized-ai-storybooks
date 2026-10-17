/**
 * test_m0_design_system_and_tokens.mjs
 *
 * Empirical verification suite for Milestone M0:
 * Design System, Wonderbly UI Tokens, and Typography Architecture.
 */

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('='.repeat(80));
console.log('🎨 MILESTONE M0: DESIGN SYSTEM & TOKEN FOUNDATION VERIFICATION SUITE');
console.log('='.repeat(80));

let passCount = 0;
let failCount = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passCount++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     Error: ${err.message}`);
    failCount++;
  }
}

const tokensCssPath = path.join(rootDir, 'web/styles/tokens.css');
const globalsCssPath = path.join(rootDir, 'web/app/globals.css');
const pageSectionPath = path.join(rootDir, 'web/components/ui/PageSection.tsx');
const accordionPath = path.join(rootDir, 'web/components/ui/Accordion.tsx');
const uiIndexPath = path.join(rootDir, 'web/components/ui/index.ts');

const tokensCss = fs.readFileSync(tokensCssPath, 'utf8');
const globalsCss = fs.readFileSync(globalsCssPath, 'utf8');
const pageSectionCode = fs.readFileSync(pageSectionPath, 'utf8');
const accordionCode = fs.readFileSync(accordionPath, 'utf8');
const uiIndexCode = fs.readFileSync(uiIndexPath, 'utf8');

console.log('\n--- SUITE 1: Wonderbly Design Tokens in tokens.css ---');

const expectedTokens = [
  { name: '--color-sharpie', value: '#23231e' },
  { name: '--color-kraft-paper', value: '#fbf4e8' },
  { name: '--color-kraft-paper-60', value: '#fdf8f1' },
  { name: '--color-grid-line', value: '#f9f0df' },
  { name: '--color-racing-green', value: '#1e5751' },
  { name: '--color-mustard', value: '#ffd15a' },
  { name: '--color-butter', value: '#ffeba3' },
  { name: '--color-tinkerbell', value: '#c1f1a1' },
  { name: '--color-lily-pad', value: '#9fe778' },
  { name: '--color-blueberry', value: '#0049ac' },
  { name: '--color-bubble-bath', value: '#d0ebff' },
  { name: '--color-princess', value: '#cebcfa' },
  { name: '--color-pinking-shears', value: '#e98ec1' },
  { name: '--radius-sharp', value: '2px' },
  { name: '--shadow-spine', value: 'rgba(129, 92, 24, 0.12)' },
];

for (const token of expectedTokens) {
  test(`tokens.css declares ${token.name}`, () => {
    assert(tokensCss.includes(token.name), `Missing token declaration: ${token.name}`);
    assert(tokensCss.includes(token.value), `Token ${token.name} does not match expected value ${token.value}`);
  });
}

test('tokens.css enforces letter-spacing: 0 !important on RTL headings', () => {
  assert(
    tokensCss.includes("[dir='rtl'] .wb-heading") &&
    tokensCss.includes('letter-spacing: 0 !important;'),
    'Expected letter-spacing: 0 !important for RTL .wb-heading'
  );
});

console.log('\n--- SUITE 2: Tailwind v4 @theme inline Integration in globals.css ---');

test('globals.css imports tokens.css', () => {
  assert(globalsCss.includes('@import "../styles/tokens.css";') || globalsCss.includes("@import '../styles/tokens.css';"),
    'globals.css must import tokens.css');
});

test('globals.css declares @theme inline block', () => {
  assert(globalsCss.includes('@theme inline {'), '@theme inline block must exist');
});

const themeTokens = [
  '--color-sharpie',
  '--color-kraft-paper',
  '--color-kraft-paper-60',
  '--color-grid-line',
  '--color-racing-green',
  '--color-mustard',
  '--color-butter',
  '--color-tinkerbell',
  '--color-lily-pad',
  '--color-blueberry',
  '--color-bubble-bath',
  '--color-princess',
  '--color-pinking-shears',
  '--radius-sharp',
  '--shadow-spine',
  '--font-sans',
  '--font-serif',
  '--font-heading',
  '--font-amiri',
];

for (const token of themeTokens) {
  test(`@theme inline exposes ${token}`, () => {
    assert(globalsCss.includes(token), `@theme inline missing token mapping: ${token}`);
  });
}

console.log('\n--- SUITE 3: Typography & RTL Tashkeel Architecture ---');

test('globals.css maps --font-serif to Fraunces in LTR', () => {
  assert(globalsCss.includes("--font-serif: 'Fraunces', Georgia, serif;"), 'Expected Fraunces for --font-serif');
  assert(globalsCss.includes(".font-serif {\n  font-family: 'Fraunces', Georgia, serif;\n}"),
    'Expected .font-serif class to use Fraunces');
});

test('globals.css maps --font-heading to Fraunces', () => {
  assert(globalsCss.includes("--font-heading: 'Fraunces', Georgia, serif;"), 'Expected Fraunces for --font-heading');
  assert(globalsCss.includes(".font-heading {\n  font-family: 'Fraunces', Georgia, serif;\n}"),
    'Expected .font-heading class to use Fraunces');
});

test('globals.css preserves Amiri and Tashkeel protection for RTL headings & serif', () => {
  assert(globalsCss.includes('[dir="rtl"] .font-serif') || globalsCss.includes('[dir="rtl"] .font-heading'),
    'Expected RTL font mapping for .font-serif / .font-heading');
  assert(globalsCss.includes("font-family: 'Amiri', serif;"), 'Expected Amiri for RTL');
  assert(globalsCss.includes('letter-spacing: 0 !important;'), 'Expected letter-spacing: 0 !important');
});

test('.font-amiri class maintains generous line-height 2.1 and font-feature-settings for diacritics', () => {
  assert(globalsCss.includes('line-height: 2.1;'), 'Expected line-height: 2.1 for Tashkeel vertical clearance');
  assert(globalsCss.includes('font-feature-settings: "kern" 1, "liga" 1, "calt" 1;'),
    'Expected OpenType cursive ligatures enabled');
});

console.log('\n--- SUITE 4: UI Primitives (PageSection & Accordion) Completeness ---');

test('PageSection.tsx exports PageSection and PageSectionTone', () => {
  assert(pageSectionCode.includes('export type PageSectionTone'), 'PageSectionTone type must be exported');
  assert(pageSectionCode.includes('export function PageSection'), 'PageSection component must be exported');
  assert(pageSectionCode.includes('export default PageSection'), 'PageSection must have default export');
});

test('PageSection supports Wonderbly tone palette including kraft, paper, green, tinkerbell, sharpie', () => {
  const expectedTones = ['default', 'kraft', 'paper', 'white', 'green', 'tinkerbell', 'sharpie'];
  for (const tone of expectedTones) {
    assert(pageSectionCode.includes(`'${tone}'`), `PageSection must support tone '${tone}'`);
  }
});

test('Accordion.tsx exports Accordion, AccordionProps, and AccordionItem', () => {
  assert(accordionCode.includes('export interface AccordionItem'), 'AccordionItem must be exported');
  assert(accordionCode.includes('export interface AccordionProps'), 'AccordionProps must be exported');
  assert(accordionCode.includes('export function Accordion'), 'Accordion function must be exported');
  assert(accordionCode.includes('export default Accordion'), 'Accordion default export must exist');
});

test('Accordion supports defaultOpenId and defaultOpenIndex initializers', () => {
  assert(accordionCode.includes('defaultOpenId?: string | string[];'), 'AccordionProps must support defaultOpenId');
  assert(accordionCode.includes('defaultOpenIndex?: number | number[];'), 'AccordionProps must support defaultOpenIndex');
});

test('Accordion follows WAI-ARIA disclosure pattern with aria-expanded and aria-controls', () => {
  assert(accordionCode.includes('aria-expanded={isOpen}'), 'Accordion button must bind aria-expanded');
  assert(accordionCode.includes('aria-controls={panelId}'), 'Accordion button must bind aria-controls');
  assert(accordionCode.includes('role="region"'), 'Accordion content panel must declare role="region"');
});

test('web/components/ui/index.ts barrel exports PageSection and Accordion', () => {
  assert(uiIndexCode.includes('export * from "./PageSection";'), 'index.ts must export PageSection');
  assert(uiIndexCode.includes('export * from "./Accordion";'), 'index.ts must export Accordion');
});

console.log('\n' + '='.repeat(80));
console.log(`📊 M0 SUITE COMPLETE: ${passCount} Passed | ${failCount} Failed`);
console.log('='.repeat(80));

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
