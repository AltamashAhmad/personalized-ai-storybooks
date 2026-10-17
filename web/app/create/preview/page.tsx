'use client';

import React, { useState, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Palette,
  Edit3,
  Check,
  Sparkles,
  BookOpen,
  User,
  Users,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { PRODUCTS, getProductBySlug } from '@/config/products';
import { isComingSoon } from '@/config/comingSoon';
import { useCountry } from '@/lib/context/CountryContext';
import { paperSoundEngine } from '@/lib/audio/PaperSoundEngine';
import {
  CharacterConfig,
  getBookSpreads,
  SKIN_TONES,
  HAIR_STYLES,
  HAIR_COLORS,
  BEARD_STYLES,
  DEDICATION_TEMPLATES,
  KEEPSAKE_COVER_COLORS,
  validateProtagonistName,
} from '@/config/sampleBookData';
import FlipbookStage from '@/components/FlipbookStage';

// Relationship Chips for GCC Gifting
const GIVER_CHIPS = [
  { label: 'Mama & Baba (ماما وبابا)', valEn: 'Mama & Baba', valAr: 'ماما وبابا' },
  { label: 'Mom & Dad', valEn: 'Mom & Dad', valAr: 'أمي وأبي' },
  { label: 'Uncle Hamdan (العم حمدان)', valEn: 'Uncle Hamdan', valAr: 'العم حمدان' },
  { label: 'Auntie Fatima (الخالة فاطمة)', valEn: 'Auntie Fatima', valAr: 'الخالة فاطمة' },
  { label: 'Grandpa & Grandma (جدو وتيتا)', valEn: 'Grandpa & Grandma', valAr: 'جدو وتيتا' },
];

function CreatePreviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language: uiLang, dir } = useCountry();
  const isAr = uiLang === 'ar';

  const bookSlug = searchParams.get('book') || 'the-secret-of-the-starlit-dunes';
  const paramName = searchParams.get('name');
  // Gender allowlist (same rule as the start step): only 'boy' | 'girl' allowed.
  const rawGender = searchParams.get('gender');
  const paramGender: 'boy' | 'girl' = rawGender === 'girl' ? 'girl' : 'boy';
  const paramSkin = searchParams.get('skinTone') || 'olive';
  const paramHairStyle = searchParams.get('hairStyle') || 'short-waves';
  const paramHairColor = searchParams.get('hairColor') || 'jet-black';
  const paramGlasses = searchParams.get('glasses') === 'true';
  const paramHearingAid = searchParams.get('hearingAid') === 'true';

  const paramCoStarEnabled = searchParams.get('coStarEnabled') === 'true';
  const paramCoStarRole = (searchParams.get('coStarRole') as 'dad' | 'mom' | 'grandpa' | 'grandma') || 'dad';
  const paramCoStarName = searchParams.get('coStarName') || (isAr ? 'بابا' : 'Baba');
  const paramCoStarBeard = searchParams.get('coStarBeard') || 'neat-trimmed';

  // Story language chosen on the start step (validated; bilingual is the fallback)
  const paramLanguage = searchParams.get('language');
  const storyLanguage: 'bilingual' | 'ar' | 'en' =
    paramLanguage === 'ar' || paramLanguage === 'en' ? paramLanguage : 'bilingual';

  // Restored from the URL so back-navigation (formats → preview) never discards
  // the personalization and commerce choices made on later steps.
  const paramColor = searchParams.get('color');
  const paramGiver = searchParams.get('giver');
  const paramPhoto = searchParams.get('photo');
  const paramDedication = searchParams.get('dedicationText');
  const paramFormat = searchParams.get('format');
  const paramColoringBook = searchParams.get('coloringBook');
  const paramGiftBox = searchParams.get('giftBox');
  const paramGiftWrap = searchParams.get('giftWrap');
  const paramAudioKeepsake = searchParams.get('audioKeepsake');
  const paramWrap = searchParams.get('wrap');

  const product = getProductBySlug(bookSlug) ?? PRODUCTS[0];

  // Character States
  const [childName, setChildName] = useState(paramName || (isAr ? 'زايد' : 'Zayed'));
  const [gender, setGender] = useState<'boy' | 'girl'>(paramGender);
  const [skinTone, setSkinTone] = useState(paramSkin);
  const [hairStyle, setHairStyle] = useState(paramHairStyle);
  const [hairColor, setHairColor] = useState(paramHairColor);
  const [glasses, setGlasses] = useState(paramGlasses);
  const [hearingAid, setHearingAid] = useState(paramHearingAid);

  // Co-Star States
  const [coStarEnabled, setCoStarEnabled] = useState(paramCoStarEnabled);
  const [coStarRole, setCoStarRole] = useState(paramCoStarRole);
  const [coStarName, setCoStarName] = useState(paramCoStarName);
  const [coStarBeard, setCoStarBeard] = useState(paramCoStarBeard);

  // Reader & Customization States
  const [currentSpread, setCurrentSpread] = useState(0);
  const [coverColor, setCoverColor] = useState<'desert-gold' | 'midnight-sapphire' | 'emerald-oasis' | 'ruby-rose'>(
    paramColor === 'midnight-sapphire' || paramColor === 'emerald-oasis' || paramColor === 'ruby-rose'
      ? paramColor
      : 'desert-gold'
  );
  const [gifterName, setGifterName] = useState(paramGiver || (isAr ? 'ماما وبابا' : 'Mama & Baba'));
  const [hasPhoto] = useState(paramPhoto === 'yes' || paramPhoto === 'true');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Commerce state from the formats step (preview never edits these; it only
  // carries them forward so formats → preview → formats round trips are lossless)
  const [format] = useState(paramFormat || 'hardcover');
  const [coloringBook] = useState(paramColoringBook === 'true');
  const [giftBox] = useState(paramGiftBox === 'true');
  const [giftWrap] = useState(paramGiftWrap === 'true');
  const [audioKeepsake] = useState(paramAudioKeepsake === 'true');
  const [wrap] = useState(paramWrap || 'none');

  // Modal selector: none | name | cover | dedication | giver
  const [activeModal, setActiveModal] = useState<'none' | 'name' | 'cover' | 'dedication' | 'giver'>('none');

  // Name-modal validation error (same rule as the start step)
  const [nameError, setNameError] = useState('');

  // Dedication default text with authentic Tashkeel
  const defaultDedication = isAr
    ? `إِلَى بَطَلِنَا الصَّغِيرِ ${childName}،\n\nلِتَكُنْ شَجَاعَتُكَ مِثْلَ صُقُورِ الصَّحْرَاءِ، وَأَحْلامُكَ وَاسِعَةً كَسَمَائِهَا المُرَصَّعَةِ بِالنُّجُومِ. نُحِبُّكَ حُبّاً لا يَنْتَهِي.\n\n— ${gifterName}`
    : `To our little adventurer ${childName},\n\nMay your courage always fly as high as the golden falcon, and your heart shine as bright as the desert stars. With all our love,\n\n— ${gifterName}`;

  const [dedicationText, setDedicationText] = useState(
    paramDedication !== null ? paramDedication : defaultDedication
  );

  const activeColorObj =
    KEEPSAKE_COVER_COLORS.find((c) => c.id === coverColor) ?? KEEPSAKE_COVER_COLORS[0];

  // Unknown product → catalog; coming-soon product → its honest product page.
  // After all hooks so TS narrows product/activeColorObj for everything below.
  const productMissing = !product;
  const previewComingSoon = isComingSoon(bookSlug);
  const blocked = productMissing || !activeColorObj || previewComingSoon;
  useEffect(() => {
    if (productMissing) {
      router.replace(isAr ? '/ar/all-books' : '/all-books');
    } else if (previewComingSoon) {
      router.replace(`${isAr ? '/ar' : ''}/books/${encodeURIComponent(bookSlug)}`);
    }
  }, [productMissing, previewComingSoon, bookSlug, isAr, router]);

  // getBookSpreads returns undefined when a product has no manuscript.
  // Resolve the slug defensively (optional chaining — never crashes) and
  // redirect to the catalog instead of rendering the flipbook with no story.
  const previewSlug = blocked ? '' : product?.slug || product?.id || 'starlit-dunes';
  const activeBookSpreads = previewSlug ? getBookSpreads(previewSlug) : undefined;
  const spreadsMissing = !blocked && activeBookSpreads === undefined;
  useEffect(() => {
    if (spreadsMissing) {
      router.replace(isAr ? '/ar/all-books' : '/all-books');
    }
  }, [spreadsMissing, isAr, router]);

  if (blocked || spreadsMissing) return null;
  // Explicit narrowing for noUncheckedIndexedAccess: the redirect guard above
  // guarantees spreads are defined from here on.
  const safeSpreads = activeBookSpreads;
  if (!safeSpreads) return null;

  // Build reactive CharacterConfig for the 12-spread storybook engine
  const storyConfig: CharacterConfig = {
    protagonist: {
      name: childName,
      gender,
      skinTone,
      hairStyle,
      hairColor,
      outfit: 'kandora',
      outfitColor: 'pure-white',
      glasses,
      hearingAid,
    },
    coStar: {
      enabled: coStarEnabled,
      role: coStarRole,
      name: coStarName,
      skinTone,
      hairStyle: 'short',
      hairColor: 'dark-brown',
      beardStyle: coStarBeard,
      glasses: false,
    },
    dedication: dedicationText,
    gifterName,
    coverColor,
    coverFormat: 'hardcover',
    language: storyLanguage,
  };

  // Sound triggering helper (delegates to PaperSoundEngine singleton)
  const playPageTurnSound = (direction: 'next' | 'prev' = 'next') => {
    if (!soundEnabled) return;
    paperSoundEngine.playTurn({ direction, isRtl: isAr });
  };

  // Name modal save: same validation rule as the start step
  const handleNameSave = () => {
    const validation = validateProtagonistName(childName);
    if (!validation.isValid) {
      setNameError(
        isAr
          ? validation.errorMessageAr || 'يرجى كتابة اسم البطل'
          : validation.errorMessageEn || 'Please enter a valid name'
      );
      return;
    }
    setNameError('');
    setActiveModal('none');
  };

  // Progressive Flow to Step 3 Formats
  const handleMainContinue = () => {
    const query = new URLSearchParams({
      book: product.slug,
      name: childName,
      gender,
      skinTone,
      hairStyle,
      hairColor,
      glasses: glasses ? 'true' : 'false',
      hearingAid: hearingAid ? 'true' : 'false',
      coStarEnabled: coStarEnabled ? 'true' : 'false',
      coStarRole,
      coStarName,
      coStarBeard,
      color: coverColor,
      giver: gifterName,
      photo: hasPhoto ? 'yes' : 'no',
      dedicationText,
      language: storyLanguage,
      // Restored commerce state (formats → preview round trips)
      format,
      coloringBook: coloringBook ? 'true' : 'false',
      giftBox: giftBox ? 'true' : 'false',
      giftWrap: giftWrap ? 'true' : 'false',
      audioKeepsake: audioKeepsake ? 'true' : 'false',
      wrap,
    }).toString();

    router.push(`${isAr ? '/ar/create/formats' : '/create/formats'}?${query}`);
  };

  return (
    <div
      className="min-h-screen text-[#23231E] font-sans flex flex-col justify-between"
      style={{
        backgroundColor: '#FDF8F1',
        backgroundImage:
          'linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
      dir={dir}
    >
      {/* Signature Sticky Header Bar */}
      <header
        className="h-16 px-4 sm:px-8 bg-white/95 backdrop-blur-md border-b border-stone-200 sticky top-0 z-30 shadow-xs flex items-center justify-between"
        dir={dir}
      >
        {/* Back Link */}
        <div className="flex items-center gap-3">
          <Link
            href={`${isAr ? '/ar/create/start' : '/create/start'}?${searchParams.toString()}`}
            className="p-2 text-stone-600 hover:text-[#1E5751] rounded-[2px] hover:bg-stone-100 transition"
            title={isAr ? 'العودة للخطوة الأولى' : 'Back to Step 1'}
          >
            <ArrowLeft className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
          </Link>
          <div className="hidden sm:block">
            <h1 className="text-xs font-bold text-[#1E5751] uppercase tracking-widest font-serif">
              {isAr ? 'معاينة القصة المخصصة ثلاثية الأبعاد' : '3D Interactive Keepsake Preview'}
            </h1>
            <p className="text-sm font-extrabold text-[#23231E]">
              {isAr && product.titleAr ? product.titleAr : product.title}
            </p>
          </div>
        </div>

        {/* Center Title Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-[#1E5751] bg-[#1E5751]/10 px-2.5 py-1 rounded-[2px] font-serif">
            {isAr ? `البطل: ${childName}` : `Hero: ${childName}`}
          </span>
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-[2px] border border-stone-200 text-stone-600 hover:text-[#1E5751] hover:border-[#1E5751] transition"
            title={soundEnabled ? 'Mute page turns' : 'Enable sound'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#1E5751]" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

        {/* Quick CTA to Formats */}
        <button
          onClick={handleMainContinue}
          className="bg-[#1E5751] hover:bg-[#16433e] text-white font-extrabold px-5 py-2.5 rounded-[2px] text-xs sm:text-sm shadow-md shadow-[#1E5751]/20 transition flex items-center gap-2 cursor-pointer transform hover:scale-[1.02]"
        >
          <span>{isAr ? 'المتابعة للغلاف' : 'Continue'}</span>
          <ArrowRight className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
        </button>
      </header>

      {/* Title Section */}
      <section className="text-center pt-6 pb-2 px-4">
        <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#23231E] tracking-tight">
          {isAr
            ? (product?.titleAr ? `تخصيص كتاب ${childName}: ${product.titleAr}` : `تخصيص كتاب ${childName}`)
            : (product?.title ? `Personalize ${product.title} for ${childName}` : `Personalize your book for ${childName}`)}
        </h2>
        <p className="text-xs text-stone-600 mt-1.5 font-medium max-w-xl mx-auto">
          {isAr
            ? 'تصفح صفحات القصة الـ ٢٤ بالصوت والرسوم التفاعلية، أو عدّل ملامح الشخصية والإهداء بالأسفل'
            : 'Flip through the 24-spread tale with realistic audio paper turns, or customize character & dedication below'}
        </p>
      </section>

      {/* 3D Virtual Page Flipbook Reader Stage (Features 18, 21, 22) */}
      <main className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 max-w-6xl mx-auto w-full">
        <div className="w-full bg-slate-950 p-3 sm:p-6 rounded-[2px] shadow-[var(--shadow-spine)] border border-stone-800 relative">
          <FlipbookStage
            spreads={safeSpreads}
            currentSpreadIndex={currentSpread}
            onSpreadChange={(idx) => {
              playPageTurnSound(idx > currentSpread ? 'next' : 'prev');
              setCurrentSpread(idx);
            }}
            config={storyConfig}
            lang={isAr ? 'ar' : 'en'}
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled(!soundEnabled)}
            onPlaySound={(dir) => playPageTurnSound(dir)}
          />
        </div>
      </main>

      {/* Signature Sticky Bottom Review Bar */}
      <footer
        className="bg-white/95 backdrop-blur-md border-t border-stone-200 sticky bottom-0 z-30 py-3 px-4 sm:px-8 shadow-[0_-8px_25px_rgba(0,0,0,0.05)]"
        dir={dir}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* 4 Personalization Step Review Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full md:w-auto flex-1">
            {/* Card 1: Child Name & Character */}
            <button
              onClick={() => setActiveModal('name')}
              className="p-2.5 sm:p-3 rounded-[2px] border border-stone-200 bg-stone-50/50 hover:bg-stone-100 hover:border-[#1E5751] transition text-left rtl:text-right cursor-pointer flex flex-col justify-between"
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 font-serif">
                {isAr ? 'بطل القصة' : "Child's Character"}
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-4 h-4 rounded-[2px] bg-[#1E5751] text-white flex items-center justify-center text-[10px]">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span className="text-xs sm:text-sm font-extrabold text-[#23231E] truncate">
                  {childName} ({gender === 'boy' ? '👦' : '👧'})
                </span>
              </div>
            </button>

            {/* Card 2: Cover Colorway */}
            <button
              onClick={() => setActiveModal('cover')}
              className="p-2.5 sm:p-3 rounded-[2px] border border-stone-200 bg-stone-50/50 hover:bg-stone-100 hover:border-[#1E5751] transition text-left rtl:text-right cursor-pointer flex flex-col justify-between"
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 font-serif">
                {isAr ? 'لون الغلاف' : 'Cover Colorway'}
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <div
                  className="w-4 h-4 rounded-[2px] border border-stone-300"
                  style={{ backgroundColor: activeColorObj.hex }}
                />
                <span className="text-xs sm:text-sm font-extrabold text-[#23231E] truncate">
                  {isAr ? activeColorObj.nameAr : activeColorObj.nameEn}
                </span>
              </div>
            </button>

            {/* Card 3: Sentimental Dedication */}
            <button
              onClick={() => setActiveModal('dedication')}
              className="p-2.5 sm:p-3 rounded-[2px] border border-stone-200 bg-stone-50/50 hover:bg-stone-100 hover:border-[#1E5751] transition text-left rtl:text-right cursor-pointer flex flex-col justify-between"
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 font-serif">
                {isAr ? 'الإهداء الخاص' : 'Dedication Note'}
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                <span className="text-xs sm:text-sm font-extrabold text-[#23231E] truncate">
                  {isAr ? 'رسالة حب مكتوبة' : 'Loving Note Added'}
                </span>
              </div>
            </button>

            {/* Card 4: Giver Signature */}
            <button
              onClick={() => setActiveModal('giver')}
              className="p-2.5 sm:p-3 rounded-[2px] border border-stone-200 bg-stone-50/50 hover:bg-stone-100 hover:border-[#1E5751] transition text-left rtl:text-right cursor-pointer flex flex-col justify-between"
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 font-serif">
                {isAr ? 'توقيع المُهدي' : 'Giver Signature'}
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-4 h-4 rounded-[2px] bg-[#1E5751] text-white flex items-center justify-center text-[10px]">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span className="text-xs sm:text-sm font-extrabold text-[#23231E] truncate">
                  {gifterName}
                </span>
              </div>
            </button>
          </div>

          {/* Continue CTA */}
          <button
            onClick={handleMainContinue}
            className="w-full md:w-auto bg-[#1E5751] hover:bg-[#16433e] text-white font-extrabold px-8 py-3.5 rounded-[2px] shadow-lg shadow-[#1E5751]/20 transition text-sm flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>{isAr ? 'المتابعة لاختيار الغلاف' : 'Continue to Formats'}</span>
            <ArrowRight className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* MODAL DIALOGS (2px Radius, #1E5751 Accents, Tashkeel Protection) */}
      {/* ========================================================================= */}

      {/* MODAL 1: Character Builder Modal (6 skin tones, 8 hairstyles, 5 colors, glasses, co-star) */}
      {activeModal === 'name' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[2px] max-w-lg w-full p-6 shadow-2xl border border-stone-300 relative max-h-[90vh] overflow-y-auto animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <button
                onClick={() => setActiveModal('none')}
                className="text-xs font-bold text-stone-500 hover:text-stone-900 border border-stone-200 px-3 py-1.5 rounded-[2px] cursor-pointer"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <h3 className="font-serif font-black text-lg text-[#23231E]">
                {isAr ? 'تخصيص بطل القصة والمرافق' : 'Customize Character & Co-Star'}
              </h3>
              <div className="w-12" />
            </div>

            <div className="my-4 space-y-4">
              {/* Name & Gender */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isAr ? 'اسم الطفل الأول:' : "Child's First Name:"}
                </label>
                <input
                  type="text"
                  maxLength={14}
                  value={childName}
                  onChange={(e) => {
                    setChildName(e.target.value);
                    if (nameError) setNameError('');
                  }}
                  className="w-full p-3 text-sm border border-stone-300 rounded-[2px] focus:ring-2 focus:ring-[#1E5751] outline-hidden font-bold text-[#23231E] bg-[#FDF8F1]/40"
                />
                {nameError && (
                  <p className="text-rose-600 text-xs font-bold mt-1.5">{nameError}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isAr ? 'جنس البطل:' : 'Hero Gender:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGender('boy')}
                    className={`p-2.5 rounded-[2px] border text-xs font-bold cursor-pointer transition flex items-center justify-center gap-1.5 ${
                      gender === 'boy'
                        ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751]'
                        : 'border-stone-200 text-stone-600'
                    }`}
                  >
                    <span>👦</span>
                    <span>{isAr ? 'ولد' : 'Boy'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('girl')}
                    className={`p-2.5 rounded-[2px] border text-xs font-bold cursor-pointer transition flex items-center justify-center gap-1.5 ${
                      gender === 'girl'
                        ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751]'
                        : 'border-stone-200 text-stone-600'
                    }`}
                  >
                    <span>👧</span>
                    <span>{isAr ? 'بنت' : 'Girl'}</span>
                  </button>
                </div>
              </div>

              {/* 6 Skin Tones */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isAr ? 'لون البشرة (٦ درجات):' : 'Skin Tone (6 Fitzpatrick Archetypes):'}
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {SKIN_TONES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSkinTone(t.id)}
                      className={`h-9 rounded-[2px] border-2 transition cursor-pointer flex items-center justify-center ${
                        skinTone === t.id
                          ? 'border-[#1E5751] ring-2 ring-[#1E5751]/40'
                          : 'border-stone-300'
                      }`}
                      style={{ backgroundColor: t.hex }}
                    >
                      {skinTone === t.id && <Check className="w-3.5 h-3.5 text-stone-900" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 8 Hairstyles */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isAr ? 'تسريحة الشعر (٨ تسريحات):' : 'Hairstyle (8 Signature Styles):'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {HAIR_STYLES.slice(0, 8).map((hs) => (
                    <button
                      key={hs.id}
                      type="button"
                      onClick={() => setHairStyle(hs.id)}
                      className={`p-2 rounded-[2px] border text-[11px] font-bold text-left rtl:text-right transition cursor-pointer flex flex-col justify-between ${
                        hairStyle === hs.id
                          ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751]'
                          : 'border-stone-200 text-stone-700'
                      }`}
                    >
                      <span className="text-base">{hs.icon}</span>
                      <span className="truncate">{isAr ? hs.nameAr : hs.nameEn}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 5 Hair Colors */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isAr ? 'لون الشعر (٥ ألوان):' : 'Hair Color (5 Natural Shades):'}
                </label>
                <div className="flex items-center gap-2">
                  {HAIR_COLORS.map((hc) => (
                    <button
                      key={hc.id}
                      type="button"
                      onClick={() => setHairColor(hc.id)}
                      className={`w-8 h-8 rounded-[2px] border-2 transition cursor-pointer flex items-center justify-center ${
                        hairColor === hc.id
                          ? 'border-[#1E5751] ring-2 ring-[#1E5751]/40'
                          : 'border-stone-300'
                      }`}
                      style={{ backgroundColor: hc.hex }}
                    >
                      {hairColor === hc.id && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inclusive: Glasses & Hearing Aids */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGlasses(!glasses)}
                  className={`p-2.5 rounded-[2px] border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    glasses
                      ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751]'
                      : 'border-stone-200 text-stone-600'
                  }`}
                >
                  <span>👓</span>
                  <span>{isAr ? 'نظارات طبية' : 'Glasses'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setHearingAid(!hearingAid)}
                  className={`p-2.5 rounded-[2px] border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    hearingAid
                      ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751]'
                      : 'border-stone-200 text-stone-600'
                  }`}
                >
                  <span>🦻</span>
                  <span>{isAr ? 'سماعة أذن' : 'Hearing Aid'}</span>
                </button>
              </div>

              {/* Co-Star Customizer */}
              <div className="pt-2 border-t border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-[#23231E]">
                    {isAr ? 'الشخصية المساندة (ماما، بابا، جدو):' : 'Co-Star Character:'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCoStarEnabled(!coStarEnabled)}
                    className="text-[11px] font-bold text-[#1E5751]"
                  >
                    {coStarEnabled ? (isAr ? 'تعطيل' : 'Disable') : (isAr ? '+ تفعيل' : '+ Enable')}
                  </button>
                </div>

                {coStarEnabled && (
                  <div className="p-3 rounded-[2px] bg-[#FDF8F1] border border-stone-300 space-y-2">
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { role: 'dad' as const, labelEn: 'Baba', labelAr: 'بابا' },
                        { role: 'mom' as const, labelEn: 'Mama', labelAr: 'ماما' },
                        { role: 'grandpa' as const, labelEn: 'Grandpa', labelAr: 'جدو' },
                        { role: 'grandma' as const, labelEn: 'Grandma', labelAr: 'تيتا' },
                      ].map((item) => (
                        <button
                          key={item.role}
                          type="button"
                          onClick={() => setCoStarRole(item.role)}
                          className={`py-1.5 rounded-[2px] text-xs font-bold border transition ${
                            coStarRole === item.role
                              ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751]'
                              : 'border-stone-200 bg-white text-stone-600'
                          }`}
                        >
                          {isAr ? item.labelAr : item.labelEn}
                        </button>
                      ))}
                    </div>

                    <input
                      type="text"
                      maxLength={20}
                      value={coStarName}
                      onChange={(e) => setCoStarName(e.target.value)}
                      placeholder={isAr ? 'اسم الشخصية' : 'Co-Star Name'}
                      className="w-full px-2.5 py-1.5 text-xs font-bold border border-stone-300 rounded-[2px] bg-white"
                    />

                    {(coStarRole === 'dad' || coStarRole === 'grandpa') && (
                      <div className="grid grid-cols-2 gap-1 pt-1">
                        {BEARD_STYLES.map((b) => (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setCoStarBeard(b.id)}
                            className={`p-1 rounded-[2px] text-[10px] font-bold border truncate ${
                              coStarBeard === b.id
                                ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751]'
                                : 'border-stone-200 bg-white text-stone-600'
                            }`}
                          >
                            {isAr ? b.nameAr : b.nameEn}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleNameSave}
              className="w-full bg-[#1E5751] hover:bg-[#16433e] text-white font-extrabold py-3 rounded-[2px] text-sm transition cursor-pointer"
            >
              {isAr ? 'حفظ وتحديث القصة' : 'Save & Update Storybook'}
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: Cover Color Selection Modal (4 Arabian luxury colorways) */}
      {activeModal === 'cover' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[2px] max-w-lg w-full p-6 shadow-2xl border border-stone-300 relative animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <button
                onClick={() => setActiveModal('none')}
                className="text-xs font-bold text-stone-500 hover:text-stone-900 border border-stone-200 px-3 py-1.5 rounded-[2px] cursor-pointer"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <h3 className="font-serif font-black text-lg text-[#23231E]">
                {isAr ? 'أي لون يفضل طفلك؟' : 'Which color would they love?'}
              </h3>
              <div className="w-12" />
            </div>

            <p className="text-xs text-stone-600 text-center my-3">
              {isAr
                ? 'للمسة النهائية الفاخرة، اختر من بين أربعة ألوان أغلفة صحراوية ملكية'
                : 'For the ultimate heirloom finish, choose from four luxury Emirati cover colorways'}
            </p>

            <div className="grid grid-cols-2 gap-3 my-4">
              {KEEPSAKE_COVER_COLORS.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setCoverColor(c.id as 'desert-gold' | 'midnight-sapphire' | 'emerald-oasis' | 'ruby-rose')}
                  className={`p-3 rounded-[2px] border-2 transition cursor-pointer relative flex flex-col justify-between ${
                    coverColor === c.id
                      ? 'border-[#1E5751] bg-[#1E5751]/5 ring-2 ring-[#1E5751]/20'
                      : 'border-stone-200 hover:border-stone-300 bg-stone-50'
                  }`}
                >
                  <div
                    className="w-full aspect-[4/3] rounded-[2px] my-2 flex items-center justify-center text-white shadow-xs"
                    style={{ backgroundColor: c.hex }}
                  >
                    <span className="text-xl">✨</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#23231E]">
                      {isAr ? c.nameAr : c.nameEn}
                    </span>
                    {coverColor === c.id && (
                      <div className="w-4 h-4 rounded-[2px] bg-[#1E5751] text-white flex items-center justify-center text-[10px]">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveModal('none')}
              className="w-full bg-[#1E5751] hover:bg-[#16433e] text-white font-extrabold py-3 rounded-[2px] text-sm transition cursor-pointer mt-2"
            >
              {isAr ? 'حفظ اللون والمتابعة' : 'Save Cover Color'}
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: Sentimental Dedication Modal (400-char limit, pre-filled rhymes, full Tashkeel preservation) */}
      {activeModal === 'dedication' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[2px] max-w-lg w-full p-6 shadow-2xl border border-stone-300 relative animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <button
                onClick={() => setActiveModal('none')}
                className="text-xs font-bold text-stone-500 hover:text-stone-900 border border-stone-200 px-3 py-1.5 rounded-[2px] cursor-pointer"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <h3 className="font-serif font-black text-lg text-[#23231E]">
                {isAr ? `رسالة الإهداء لـ ${childName}` : `Write dedication for ${childName}`}
              </h3>
              <div className="w-12" />
            </div>

            <p className="text-xs text-stone-600 mt-2 mb-3">
              {isAr
                ? 'أضف إهداءك الشخصي الصادق، وسنطبعه بالتشكيل الكامل على الصفحة الأولى مجاناً.'
                : 'Include your loving dedication note on the first page, preserved verbatim in print.'}
            </p>

            {/* Pre-filled Rhymes / Dedication Templates */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {DEDICATION_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => {
                    // Substitute child name cleanly while preserving Tashkeel
                    const text = isAr ? tmpl.verseAr : tmpl.verseEn;
                    setDedicationText(text.replace(/\{childName\}/g, childName));
                  }}
                  className="text-[11px] font-bold px-2.5 py-1 rounded-[2px] bg-stone-100 hover:bg-[#1E5751]/10 text-stone-700 hover:text-[#1E5751] border border-stone-200 transition cursor-pointer"
                >
                  {isAr ? tmpl.nameAr : tmpl.nameEn}
                </button>
              ))}
            </div>

            <textarea
              rows={5}
              maxLength={400}
              value={dedicationText}
              onChange={(e) => setDedicationText(e.target.value.slice(0, 400))}
              className="w-full p-3 text-xs sm:text-sm font-serif border border-stone-300 rounded-[2px] focus:ring-2 focus:ring-[#1E5751] focus:border-transparent outline-hidden resize-none text-[#23231E] bg-[#FDF8F1]/40 leading-relaxed font-amiri"
              dir={isAr ? 'rtl' : 'ltr'}
            />

            <div className="flex items-center justify-between text-[11px] text-stone-500 mt-1 mb-4">
              <span>{isAr ? 'الحفاظ التام على علامات التشكيل' : 'Full Tashkeel Diacritics Preserved'}</span>
              <span className={dedicationText.length > 350 ? 'text-amber-600 font-bold' : ''}>
                {400 - dedicationText.length} {isAr ? 'حرف متبقي' : 'chars left'}
              </span>
            </div>

            <button
              onClick={() => setActiveModal('none')}
              className="w-full bg-[#1E5751] hover:bg-[#16433e] text-white font-extrabold py-3 rounded-[2px] text-sm transition cursor-pointer"
            >
              {isAr ? 'تأكيد الإهداء وحفظه' : 'Confirm Dedication'}
            </button>
          </div>
        </div>
      )}

      {/* MODAL 4: Giver Signature Modal */}
      {activeModal === 'giver' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[2px] max-w-md w-full p-6 shadow-2xl border border-stone-300 relative animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <button
                onClick={() => setActiveModal('none')}
                className="text-xs font-bold text-stone-500 hover:text-stone-900 border border-stone-200 px-3 py-1.5 rounded-[2px] cursor-pointer"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <h3 className="font-serif font-black text-lg text-[#23231E]">
                {isAr ? 'من صنع هذا الكتاب؟' : 'Who made this keepsake?'}
              </h3>
              <div className="w-12" />
            </div>

            <p className="text-xs text-stone-600 mt-2 mb-4">
              {isAr
                ? 'أضف اسمك أو صلتك وسنطبعه بكل فخر على الغلاف وصفحة الإهداء.'
                : 'Add your name or family title and we will print it with pride.'}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {GIVER_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => setGifterName(isAr ? chip.valAr : chip.valEn)}
                  className="text-xs font-bold px-3 py-1.5 rounded-[2px] bg-stone-100 hover:bg-[#1E5751]/10 text-stone-700 hover:text-[#1E5751] border border-stone-200 transition cursor-pointer"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            <input
              type="text"
              maxLength={30}
              value={gifterName}
              onChange={(e) => setGifterName(e.target.value)}
              className="w-full p-3 text-sm border border-stone-300 rounded-[2px] focus:ring-2 focus:ring-[#1E5751] outline-hidden mb-4 text-[#23231E] font-bold bg-[#FDF8F1]/40"
              placeholder={isAr ? 'مثال: ماما وبابا' : 'e.g. Mama & Baba'}
            />

            <button
              onClick={() => setActiveModal('none')}
              className="w-full bg-[#1E5751] hover:bg-[#16433e] text-white font-extrabold py-3 rounded-[2px] text-sm transition cursor-pointer"
            >
              {isAr ? 'تأكيد التوقيع' : 'Save Signature'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default function CreatePreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FDF8F1] flex items-center justify-center text-stone-600 font-sans">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-[#1E5751] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#1E5751]">
              Loading Storybook Preview...
            </span>
          </div>
        </div>
      }
    >
      <CreatePreviewContent />
    </Suspense>
  );
}
