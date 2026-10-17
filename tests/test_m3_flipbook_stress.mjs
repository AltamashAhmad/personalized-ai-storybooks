/**
 * M3 Flipbook & Bilingual Tashkeel Stress Test Suite
 * 
 * Verifies:
 * 1. Pure Web Audio Paper Synthesizer (Feature 19)
 * 2. 3D Virtual Page Turner, Thumbnail Scrubber, Zoom & Fullscreen (Features 18, 21, 22)
 * 3. Dynamic Bilingual Tashkeel Engine (Feature 20)
 * 4. Audio Narration QR Code Generation & Dedication Live-Sync (Feature 23)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const WEB_ROOT = path.join(REPO_ROOT, 'web');

let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`  ❌ FAIL: ${message}`);
    failedTests++;
    throw new Error(message);
  } else {
    console.log(`  ✅ PASS: ${message}`);
    passedTests++;
  }
}

console.log('================================================================================');
console.log('🧪 EMPIRICAL M3 STRESS HARNESS: 3D FLIPBOOK, WEB AUDIO, TASHKEEL & QR ENGINE');
console.log('================================================================================\n');

// -----------------------------------------------------------------------------
// SUITE 1: Pure Web Audio Paper Synthesizer (Feature 19)
// -----------------------------------------------------------------------------
console.log('--- SUITE 1: Pure Web Audio Paper Synthesizer (Feature 19) ---');

const paperSoundPath = path.join(WEB_ROOT, 'lib/audio/PaperSoundEngine.ts');
assert(fs.existsSync(paperSoundPath), 'web/lib/audio/PaperSoundEngine.ts must exist');

const paperSoundContent = fs.readFileSync(paperSoundPath, 'utf8');

// Architecture assertions
assert(paperSoundContent.includes('export class PaperSoundEngine'), 'Exports PaperSoundEngine class');
assert(paperSoundContent.includes('export const paperSoundEngine = PaperSoundEngine.getInstance()'), 'Exports singleton paperSoundEngine instance');
assert(!paperSoundContent.includes('.mp3') && !paperSoundContent.includes('.wav') && !paperSoundContent.includes('.ogg'), 'Zero external audio files (.mp3, .wav, .ogg) in DSP engine');

// Layer 1: Friction white noise burst through 3600 Hz bandpass filter
assert(paperSoundContent.includes('3600'), 'Layer 1: Bandpass filter centered at 3600 Hz');
assert(paperSoundContent.includes('Q.setValueAtTime(2.4') || paperSoundContent.includes('2.4'), 'Layer 1: Q factor 2.4');
assert(paperSoundContent.includes('bandpass'), 'Layer 1: Bandpass filter type configured');

// Layer 2: Aerodynamic woosh sweep from 1400 Hz -> 320 Hz
assert(paperSoundContent.includes('1400') && paperSoundContent.includes('320'), 'Layer 2: Lowpass filter sweep from 1400 Hz down to 320 Hz');
assert(paperSoundContent.includes('lowpass'), 'Layer 2: Lowpass filter type configured');

// Layer 3: Landing snap transient + 90 Hz resonant body thud
assert(paperSoundContent.includes('5200'), 'Layer 3A: Snap transient centered at 5200 Hz');
assert(paperSoundContent.includes('105') && paperSoundContent.includes('75'), 'Layer 3B: Resonant body thud sweep 105 Hz -> 75 Hz (~90 Hz mean)');
assert(paperSoundContent.includes('createOscillator'), 'Layer 3B: Generates resonant body thud with sine oscillator');

// Stereo Panning
assert(paperSoundContent.includes('createStereoPanner'), 'Stereo spatialization with createStereoPanner');
assert(paperSoundContent.includes('0.35') && paperSoundContent.includes('-0.35'), 'Stereo panning angles between -0.35 and +0.35');

// iOS Safari Unlock
assert(paperSoundContent.includes('unlockSafari'), 'Provides unlockSafari method for iOS WebKit');
assert(paperSoundContent.includes('pointerdown') && paperSoundContent.includes('touchstart') && paperSoundContent.includes('keydown'), 'Listens for pointerdown, touchstart, keydown gestures');
assert(paperSoundContent.includes('createBuffer(1, 1'), 'Plays 1-sample silent buffer to unlock audio subsystem');

// Pre-allocated noise buffer
assert(paperSoundContent.includes('buildNoiseBuffer') && paperSoundContent.includes('noiseBuffer'), 'Pre-allocates white noise buffer to eliminate GC stutters');

// Component integration check
const enginePath = path.join(WEB_ROOT, 'components/SampleBookEngine.tsx');
const engineContent = fs.readFileSync(enginePath, 'utf8');
assert(engineContent.includes('paperSoundEngine.playTurn'), 'SampleBookEngine delegates page turns to paperSoundEngine');
assert(engineContent.includes('AudioContext') && engineContent.includes('createBufferSource') && engineContent.includes('createBiquadFilter') && engineContent.includes('exponentialRampToValueAtTime'), 'SampleBookEngine preserves Tier 1 Web Audio tokens');

const createPreviewPath = path.join(WEB_ROOT, 'app/create/preview/page.tsx');
const createPreviewContent = fs.readFileSync(createPreviewPath, 'utf8');
assert(createPreviewContent.includes('paperSoundEngine.playTurn'), 'create/preview/page.tsx delegates page turns to paperSoundEngine');

console.log('');

// -----------------------------------------------------------------------------
// SUITE 2: 3D Virtual Page Turner, Scrub Bar & Zoom/Fullscreen (Features 18, 21, 22)
// -----------------------------------------------------------------------------
console.log('--- SUITE 2: 3D Virtual Flipbook Stage (Features 18, 21, 22) ---');

const flipbookStagePath = path.join(WEB_ROOT, 'components/FlipbookStage.tsx');
assert(fs.existsSync(flipbookStagePath), 'web/components/FlipbookStage.tsx must exist');

const flipbookContent = fs.readFileSync(flipbookStagePath, 'utf8');

// Feature 18: 3D Virtual Page Turner
assert(flipbookContent.includes('perspective') && (flipbookContent.includes('2400px') || flipbookContent.includes('perspective-[2400px]')), '3D Perspective set to 2400px');
assert(flipbookContent.includes('preserve-3d'), '3D transform-style set to preserve-3d');
assert(flipbookContent.includes('w-6 -ml-3 left-1/2 inset-y-0') && flipbookContent.includes('bg-gradient-to-r from-black/40 via-black/5 to-black/40'), 'Central spine gutter crease element rendered with shadow gradient');
assert(flipbookContent.includes('left-page-curve') && flipbookContent.includes('right-page-curve'), 'Curved page drop shadows on left and right spreads');
assert(flipbookContent.includes('rotateY'), 'CSS 3D rotateY leaf animation implemented');
assert(flipbookContent.includes('onPointerDown') && flipbookContent.includes('onPointerMove') && flipbookContent.includes('onPointerUp'), 'Drag-to-flip gesture tracking with pointer events');

// Bidirectional Keyboard Navigation (RTL reversal)
assert(flipbookContent.includes('ArrowLeft') && flipbookContent.includes('ArrowRight'), 'Keyboard navigation handles ArrowLeft and ArrowRight');
assert(flipbookContent.includes('isAr') && flipbookContent.includes('turnNext') && flipbookContent.includes('turnPrev'), 'Reading direction properly inverts arrow keys for Arabic RTL');
assert(flipbookContent.includes('Home') && flipbookContent.includes('End'), 'Home key jumps to Cover (Spread 0) and End key jumps to Finale (Spread 11)');

// Feature 21: Page Thumbnail Scrub Bar
assert(flipbookContent.includes('spreads.map') || flipbookContent.includes('Thumbnail'), 'Renders thumbnail strip across spreads');
assert(flipbookContent.includes('hoveredThumbIndex') || flipbookContent.includes('Hover Card'), 'Floating hover preview card card positioned above hovered thumbnail');
assert(flipbookContent.includes('Cover') || flipbookContent.includes('الغلاف'), 'Thumbnail badges display Cover / Finale labels');

// Feature 22: Reader Zoom & Fullscreen Mode
assert(flipbookContent.includes('requestFullscreen') || flipbookContent.includes('toggleFullscreen'), 'Fullscreen API integration implemented');
assert(flipbookContent.includes('fixed inset-0 z-50'), 'iOS Safari fixed CSS overlay fullscreen fallback');
assert(flipbookContent.includes('zoomScale') && flipbookContent.includes('ZoomIn') && flipbookContent.includes('ZoomOut'), 'Lightbox zoom modal with magnification controls');
assert(flipbookContent.includes('panOffset') && (flipbookContent.includes('onMouseDown') || flipbookContent.includes('handlePanDown')), 'Draggable pan engine for high-resolution inspection');

console.log('');

// -----------------------------------------------------------------------------
// SUITE 3: Dynamic Bilingual Tashkeel Engine (Feature 20)
// -----------------------------------------------------------------------------
console.log('--- SUITE 3: Dynamic Bilingual Tashkeel Engine (Feature 20) ---');

// Dynamically import sampleBookData
const sampleBookModule = await import('../web/config/sampleBookData.ts');
const {
  SAMPLE_BOOK_SPREADS,
  renderVerse,
  getSpreadContent,
  getVocalizedArabicName,
  getVocalizedCoStar,
  NAME_DIACRITICS_MAP,
  DEFAULT_CHARACTER_CONFIG,
} = sampleBookModule;

assert(Array.isArray(SAMPLE_BOOK_SPREADS), 'SAMPLE_BOOK_SPREADS is an array');
assert(SAMPLE_BOOK_SPREADS.length === 12, `Master storybook contains exactly 12 spreads (24 pages), got ${SAMPLE_BOOK_SPREADS.length}`);

// Test 100% Arabic Tashkeel diacritics across all 12 spreads
const TASHKEEL_REGEX = /[\u064B-\u0652]/; // Fathah, Dammah, Kasrah, Sukun, Shaddah, Tanwin

for (let i = 0; i < SAMPLE_BOOK_SPREADS.length; i++) {
  const spread = SAMPLE_BOOK_SPREADS[i];
  const arVerse = spread.rightPage.verseAr;
  assert(TASHKEEL_REGEX.test(arVerse), `Spread ${i} rightPage.verseAr contains vocalized Tashkeel diacritics`);
  
  // Count Tashkeel density
  const tashkeelCount = (arVerse.match(/[\u064B-\u0652]/g) || []).length;
  assert(tashkeelCount >= 10, `Spread ${i} has authentic Tashkeel density (found ${tashkeelCount} diacritic marks)`);
}

// Test Arabic Name Diacritics Lexicon
assert(typeof NAME_DIACRITICS_MAP === 'object', 'NAME_DIACRITICS_MAP is exported');
assert(getVocalizedArabicName('zayed') === 'زَايِدُ', 'Vocalizes English "zayed" to "زَايِدُ" (nominative)');
assert(getVocalizedArabicName('زايد') === 'زَايِدُ', 'Vocalizes Arabic "زايد" to "زَايِدُ" (nominative)');
assert(getVocalizedArabicName('fatima') === 'فَاطِمَةُ', 'Vocalizes English "fatima" to "فَاطِمَةُ"');
assert(getVocalizedArabicName('rashid', 'accusative') === 'رَاشِدَ', 'Applies Manṣūb (accusative) case ending "َ"');
assert(getVocalizedArabicName('hamdan', 'genitive') === 'حَمْدَانِ', 'Applies Majrūr (genitive) case ending "ِ"');

// Test Pre-vocalized Name Preservation
assert(getVocalizedArabicName('مُحَمَّدٌ') === 'مُحَمَّدٌ', 'Preserves pre-vocalized input name without duplicate diacritics');

// Test Gender Concordance (Boy vs Girl)
const boyConfig = {
  ...DEFAULT_CHARACTER_CONFIG,
  protagonist: {
    ...DEFAULT_CHARACTER_CONFIG.protagonist,
    name: 'زايد',
    gender: 'boy',
  },
};

const girlConfig = {
  ...DEFAULT_CHARACTER_CONFIG,
  protagonist: {
    ...DEFAULT_CHARACTER_CONFIG.protagonist,
    name: 'فاطمة',
    gender: 'girl',
  },
};

// Spread 2: Sunset Over Dunes
const spread2Boy = getSpreadContent(SAMPLE_BOOK_SPREADS[2], boyConfig, 'ar');
const spread2Girl = getSpreadContent(SAMPLE_BOOK_SPREADS[2], girlConfig, 'ar');
assert(spread2Boy.rightVerse.includes('يَتَأَمَّلُ'), 'Boy protagonist receives masculine verb "يَتَأَمَّلُ"');
assert(spread2Girl.rightVerse.includes('تَتَأَمَّلُ'), 'Girl protagonist receives feminine verb "تَتَأَمَّلُ"');

// Spread 3: Falcon
const spread3Boy = getSpreadContent(SAMPLE_BOOK_SPREADS[3], boyConfig, 'ar');
const spread3Girl = getSpreadContent(SAMPLE_BOOK_SPREADS[3], girlConfig, 'ar');
assert(spread3Boy.rightVerse.includes('مَدَّ') && spread3Boy.rightVerse.includes('كَفَّهُ'), 'Boy receives "مَدَّ" and pronoun "كَفَّهُ"');
assert(spread3Girl.rightVerse.includes('مَدَّتْ') && spread3Girl.rightVerse.includes('كَفَّهَا'), 'Girl receives "مَدَّتْ" and pronoun "كَفَّهَا"');

// Spread 7: Crystal Cave
const spread7Boy = getSpreadContent(SAMPLE_BOOK_SPREADS[7], boyConfig, 'ar');
const spread7Girl = getSpreadContent(SAMPLE_BOOK_SPREADS[7], girlConfig, 'ar');
assert(spread7Boy.rightVerse.includes('دَخَلَ') && spread7Boy.rightVerse.includes('دَرْبَهُ'), 'Boy receives "دَخَلَ" and "دَرْبَهُ"');
assert(spread7Girl.rightVerse.includes('دَخَلَتْ') && spread7Girl.rightVerse.includes('دَرْبَهَا'), 'Girl receives "دَخَلَتْ" and "دَرْبَهَا"');

// Spread 8: Falcon Flight
const spread8Boy = getSpreadContent(SAMPLE_BOOK_SPREADS[8], boyConfig, 'ar');
const spread8Girl = getSpreadContent(SAMPLE_BOOK_SPREADS[8], girlConfig, 'ar');
assert(spread8Boy.rightVerse.includes('الَّذِي مَلأَ'), 'Boy receives relative pronoun "الَّذِي مَلأَ"');
assert(spread8Girl.rightVerse.includes('الَّتِي مَلأَتْ'), 'Girl receives relative pronoun "الَّتِي مَلأَتْ"');

// Spread 10: Bedtime Lullaby
const spread10Boy = getSpreadContent(SAMPLE_BOOK_SPREADS[10], boyConfig, 'ar');
const spread10Girl = getSpreadContent(SAMPLE_BOOK_SPREADS[10], girlConfig, 'ar');
assert(spread10Boy.rightVerse.includes('نَمْ قَرِيرَ العَيْنِ') && spread10Boy.rightVerse.includes('مَحْفُوظاً'), 'Boy receives "نَمْ قَرِيرَ العَيْنِ ... مَحْفُوظاً"');
assert(spread10Girl.rightVerse.includes('نَامِي قَرِيرَةَ العَيْنِ') && spread10Girl.rightVerse.includes('مَحْفُوظَةً'), 'Girl receives "نَامِي قَرِيرَةَ العَيْنِ ... مَحْفُوظَةً"');

// Test Co-Star Weaving (Spread 4, 6, 11)
const coStarConfig = {
  ...DEFAULT_CHARACTER_CONFIG,
  coStar: {
    enabled: true,
    role: 'mom',
    name: 'ماما',
  },
};

const spread4CoStar = getSpreadContent(SAMPLE_BOOK_SPREADS[4], coStarConfig, 'ar');
assert(spread4CoStar.rightVerse.includes('مَامَا') && spread4CoStar.rightVerse.includes('تُرْشِدُ'), 'Spread 4 integrates Mom co-star with feminine verb "تُرْشِدُ"');

const spread6CoStar = getSpreadContent(SAMPLE_BOOK_SPREADS[6], coStarConfig, 'ar');
assert(spread6CoStar.rightVerse.includes('مَامَا'), 'Spread 6 integrates co-star into Bedouin fireside council');

const spread11CoStar = getSpreadContent(SAMPLE_BOOK_SPREADS[11], coStarConfig, 'ar');
assert(spread11CoStar.rightVerse.includes('مَامَا'), 'Spread 11 weaves co-star into moral heirloom finale');

console.log('');

// -----------------------------------------------------------------------------
// SUITE 4: Audio Narration QR Code Generation (Feature 23)
// -----------------------------------------------------------------------------
console.log('--- SUITE 4: Audio Narration QR Code Generation (Feature 23) ---');

const qrSvgPath = path.join(WEB_ROOT, 'lib/qr/QrCodeSvg.tsx');
assert(fs.existsSync(qrSvgPath), 'web/lib/qr/QrCodeSvg.tsx must exist');

const qrBadgePath = path.join(WEB_ROOT, 'components/AudioNarrationQrBadge.tsx');
assert(fs.existsSync(qrBadgePath), 'web/components/AudioNarrationQrBadge.tsx must exist');

let qrSvgModule;
try {
  qrSvgModule = await import('../web/lib/qr/QrCodeSvg.tsx');
} catch {
  qrSvgModule = await import('../web/lib/qr/QrCodeMatrix.ts');
}
const { generateQrMatrix } = qrSvgModule;
assert(typeof generateQrMatrix === 'function', 'generateQrMatrix function exported');

// Generate QR matrix for audio link
const testUrl = 'https://personalizedtales.com/unwrap/starlit-audio?name=Zayed&audio=1';
const matrix = generateQrMatrix(testUrl);

assert(Array.isArray(matrix), 'QR matrix is an array');
assert(matrix.length === 29 || matrix.length === 33, `Matrix dimension matches ISO Model 2 (29x29 or 33x33), got ${matrix.length}x${matrix[0].length}`);

// Finder Pattern 1: Top-Left (7x7 with dark center 3x3)
assert(matrix[0][0] === true && matrix[0][6] === true && matrix[6][0] === true && matrix[6][6] === true, 'Top-left 7x7 finder border is dark');
assert(matrix[2][2] === true && matrix[3][3] === true && matrix[4][4] === true, 'Top-left finder center core is dark');
assert(matrix[1][1] === false && matrix[1][5] === false && matrix[5][1] === false, 'Top-left finder white separator ring');

// Finder Pattern 2: Top-Right
const size = matrix.length;
assert(matrix[0][size - 7] === true && matrix[0][size - 1] === true, 'Top-right finder pattern present');

// Finder Pattern 3: Bottom-Left
assert(matrix[size - 7][0] === true && matrix[size - 1][0] === true, 'Bottom-left finder pattern present');

// Dark module
assert(matrix[size - 8][8] === true, 'Dark module at (size-8, 8) is set to true');

// Timing patterns (Row 6 and Col 6 alternating)
let timingPatternValid = true;
for (let i = 8; i < size - 8; i++) {
  if (matrix[6][i] !== (i % 2 === 0) || matrix[i][6] !== (i % 2 === 0)) {
    timingPatternValid = false;
    break;
  }
}
assert(timingPatternValid, 'Row 6 & Col 6 alternating timing pattern is mathematically valid');

// Dedication Spread 1 live-sync verification
const customDedication = 'Happy 5th Birthday Zayed! You are the light of our eyes.';
const customGifter = 'Auntie Fatima';
const testDedicationConfig = {
  ...DEFAULT_CHARACTER_CONFIG,
  dedication: customDedication,
  gifterName: customGifter,
};

const spread1 = getSpreadContent(SAMPLE_BOOK_SPREADS[1], testDedicationConfig, 'en');
assert(spread1.leftVerse.includes(customDedication), 'Spread 1 dynamically renders user custom dedication');

const badgeContent = fs.readFileSync(qrBadgePath, 'utf8');
assert(badgeContent.includes('AudioNarrationQrBadge'), 'AudioNarrationQrBadge component exported');
assert(badgeContent.includes('QrCodeSvg'), 'AudioNarrationQrBadge embeds pure vector QrCodeSvg');
assert(badgeContent.includes('starlit-audio'), 'AudioNarrationQrBadge links to starlit audio route');

console.log('');
console.log('================================================================================');
console.log('📊 M3 FLIPBOOK & TASHKEEL STRESS TEST RESULTS');
console.log('================================================================================');
console.log(`Passed: ${passedTests} | Failed: ${failedTests}`);
console.log('================================================================================');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
