'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ArrowRight, ArrowLeft, AlertCircle, Sparkles, Check, Palette, Users } from 'lucide-react';
import { PRODUCTS, getProductBySlug } from '@/config/products';
import { isComingSoon } from '@/config/comingSoon';
import { useCountry } from '@/lib/context/CountryContext';
import {
  SKIN_TONES,
  HAIR_STYLES,
  HAIR_COLORS,
  BEARD_STYLES,
  validateProtagonistName,
} from '@/config/sampleBookData';

function CreateStartContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language: uiLang, dir, t } = useCountry();

  const isAr = uiLang === 'ar';
  const bookSlug = searchParams.get('book') || 'the-secret-of-the-starlit-dunes';
  const initialName = searchParams.get('name') || '';

  const matchedProduct = getProductBySlug(bookSlug) ?? PRODUCTS[0];

  // Character Builder States
  const [name, setName] = useState(initialName);
  const paramGender = searchParams.get('gender');
  const [gender, setGender] = useState<'boy' | 'girl'>(
    paramGender === 'boy' || paramGender === 'girl' ? paramGender : 'boy'
  );
  const [skinTone, setSkinTone] = useState(searchParams.get('skinTone') || 'olive');
  const [hairStyle, setHairStyle] = useState(searchParams.get('hairStyle') || 'short-waves');
  const [hairColor, setHairColor] = useState(searchParams.get('hairColor') || 'jet-black');
  const [glasses, setGlasses] = useState(searchParams.get('glasses') === 'true');
  const [hearingAid, setHearingAid] = useState(searchParams.get('hearingAid') === 'true');

  // Co-Star Builder States
  const [coStarEnabled, setCoStarEnabled] = useState(searchParams.get('coStarEnabled') === 'true');
  const paramCoStarRole = searchParams.get('coStarRole');
  const [coStarRole, setCoStarRole] = useState<'dad' | 'mom' | 'grandpa' | 'grandma'>(
    paramCoStarRole === 'dad' ||
    paramCoStarRole === 'mom' ||
    paramCoStarRole === 'grandpa' ||
    paramCoStarRole === 'grandma'
      ? paramCoStarRole
      : 'dad'
  );
  const [coStarName, setCoStarName] = useState(
    searchParams.get('coStarName') || (isAr ? 'بابا' : 'Baba')
  );
  const [coStarBeard, setCoStarBeard] = useState(searchParams.get('coStarBeard') || 'neat-trimmed');

  // Preserved from later wizard steps on back-navigation (preview → start →
  // preview). Start never edits these; it only carries them forward so the
  // round trip is lossless.
  const preservedColor = searchParams.get('color') || 'desert-gold';
  const preservedGiver = searchParams.get('giver') || (isAr ? 'ماما وبابا' : 'Mama & Baba');
  const preservedPhoto = searchParams.get('photo') || 'no';
  const preservedDedication = searchParams.get('dedicationText') || '';

  // Commerce choices from the formats step (restored on back-navigation and
  // forwarded again on submit so preview → start → preview round trips are
  // lossless). Start never edits these; it only carries them forward.
  const preservedFormat = searchParams.get('format');
  const preservedColoringBook = searchParams.get('coloringBook');
  const preservedGiftBox = searchParams.get('giftBox');
  const preservedGiftWrap = searchParams.get('giftWrap');
  const preservedAudioKeepsake = searchParams.get('audioKeepsake');
  const preservedWrap = searchParams.get('wrap');

  // Language Format (restored from the query on back-navigation; bilingual is the fallback)
  const initialLanguage = searchParams.get('language');
  const [language, setLanguage] = useState<'bilingual' | 'ar' | 'en'>(
    initialLanguage === 'ar' || initialLanguage === 'en' ? initialLanguage : 'bilingual'
  );
  const [errorMessage, setErrorMessage] = useState('');

  // Route locale (not the CountryContext preference, which can reflect a saved
  // language choice) decides the redirect target, so /ar/create/start always
  // lands on the Arabic product page and vice versa.
  const pathname = usePathname();
  const routeIsAr = pathname === '/ar' || (pathname?.startsWith('/ar/') ?? false);

  // Books with no dedicated manuscript can't be personalized or fulfilled —
  // bounce to the product page, which shows the honest "Coming Soon" state.
  const bookIsComingSoon = isComingSoon(bookSlug);
  useEffect(() => {
    if (bookIsComingSoon) {
      router.replace(`${routeIsAr ? '/ar' : ''}/books/${encodeURIComponent(bookSlug)}`);
    }
  }, [bookIsComingSoon, bookSlug, routeIsAr, router]);

  const activeSkin = SKIN_TONES.find((s) => s.id === skinTone) ?? SKIN_TONES[2];
  const activeHairColor = HAIR_COLORS.find((h) => h.id === hairColor) ?? HAIR_COLORS[0];

  // Static catalog/config lookups. PRODUCTS, SKIN_TONES and HAIR_COLORS are never
  // empty, so this is unreachable at runtime — it only satisfies TS strict mode.
  const configMissing = !matchedProduct || !activeSkin || !activeHairColor;
  useEffect(() => {
    if (configMissing) {
      router.replace(`${routeIsAr ? '/ar' : ''}/all-books`);
    }
  }, [configMissing, routeIsAr, router]);

  // Don't flash the wizard while the redirects above fire. Placed before
  // handleSubmit so TS narrows matchedProduct for the submit handler below.
  if (configMissing || bookIsComingSoon) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateProtagonistName(name);
    if (!validation.isValid) {
      setErrorMessage(isAr ? (validation.errorMessageAr || t.wizard.nameRequired) : (validation.errorMessageEn || t.wizard.nameRequired));
      return;
    }
    setErrorMessage('');

    // Query parameters passed to Preview
    const query = new URLSearchParams({
      book: matchedProduct.slug,
      name: name.trim(),
      gender,
      skinTone,
      hairStyle,
      hairColor,
      glasses: glasses ? 'true' : 'false',
      hearingAid: hearingAid ? 'true' : 'false',
      coStarEnabled: coStarEnabled ? 'true' : 'false',
      coStarRole,
      coStarName: coStarName.trim() || (isAr ? (coStarRole === 'dad' ? 'بابا' : coStarRole === 'mom' ? 'ماما' : coStarRole === 'grandpa' ? 'جدو' : 'تيتا') : (coStarRole === 'dad' ? 'Baba' : coStarRole === 'mom' ? 'Mama' : coStarRole === 'grandpa' ? 'Grandpa' : 'Grandma')),
      coStarBeard,
      language,
      // Carry through anything set on later steps (back-navigation round trips)
      color: preservedColor,
      giver: preservedGiver,
      photo: preservedPhoto,
      ...(preservedDedication ? { dedicationText: preservedDedication } : {}),
      // Forward commerce choices set on the formats step (preview → start →
      // preview round trips). Only included when present so start never
      // clobbers preview's own defaults.
      ...(preservedFormat ? { format: preservedFormat } : {}),
      ...(preservedColoringBook ? { coloringBook: preservedColoringBook } : {}),
      ...(preservedGiftBox ? { giftBox: preservedGiftBox } : {}),
      ...(preservedGiftWrap ? { giftWrap: preservedGiftWrap } : {}),
      ...(preservedAudioKeepsake ? { audioKeepsake: preservedAudioKeepsake } : {}),
      ...(preservedWrap ? { wrap: preservedWrap } : {}),
    }).toString();

    router.push(`${isAr ? '/ar/create/preview' : '/create/preview'}?${query}`);
  };

  return (
    <main
      className="min-h-screen py-10 px-4 text-[#23231E] font-sans"
      style={{
        backgroundColor: '#FDF8F1',
        backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
      dir={dir}
    >
      <div className="max-w-xl mx-auto">
        {/* Top Header */}
        <div className="text-center mb-8">
          <Link href={isAr ? '/ar' : '/'} className="inline-flex items-center gap-2 mb-3 group">
            <span className="text-2xl group-hover:rotate-12 transition-transform">✨</span>
            <span className="font-black text-xl tracking-tight text-[#23231E] font-serif">
              {isAr ? 'حكايات مخصصة' : 'PersonalizedTales'}
            </span>
          </Link>
          <div className="text-xs font-bold uppercase tracking-widest text-[#1E5751] mb-1">
            {isAr && matchedProduct.titleAr ? matchedProduct.titleAr : matchedProduct.title}
          </div>
          <h1 className="text-3xl font-black text-[#23231E] tracking-tight font-serif">
            {t.wizard.step1Title}
          </h1>
          <p className="text-xs text-stone-600 mt-1.5 font-medium">
            {t.wizard.step1Subtitle}
          </p>
        </div>

        {/* Form Card (Design Tokens: Kraft Paper #FDF8F1, 2px Sharp Radius, Racing Green #1E5751) */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[2px] p-6 sm:p-8 shadow-[var(--shadow-spine)] border border-stone-200 space-y-6"
        >
          {/* Field 1: Child's First Name */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="name" className="text-sm font-extrabold text-[#23231E] font-serif">
                {t.wizard.childFirstName}
              </label>
              <span className="text-[11px] text-stone-500 font-medium">
                {isAr ? 'الحد الأقصى ١٤ حرفاً' : 'Max 14 characters'}
              </span>
            </div>
            <input
              id="name"
              type="text"
              autoFocus
              maxLength={14}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder={t.wizard.namePlaceholder}
              className={`w-full px-4 py-3.5 rounded-[2px] border text-[#23231E] text-lg font-bold outline-hidden transition ${
                errorMessage
                  ? 'border-rose-400 ring-2 ring-rose-100 bg-rose-50/20'
                  : 'border-stone-300 focus:border-[#1E5751] focus:ring-2 focus:ring-[#1E5751]/20 bg-[#FDF8F1]/40'
              }`}
            />
            {errorMessage && (
              <p className="text-rose-600 text-xs font-bold mt-2 flex items-center gap-1.5 animate-in fade-in duration-200">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errorMessage}</span>
              </p>
            )}
          </div>

          {/* Field 2: Gender Selector */}
          <div>
            <label className="block text-sm font-extrabold text-[#23231E] font-serif mb-2">
              {t.wizard.chooseGender}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender('boy')}
                className={`py-3.5 rounded-[2px] border text-sm font-extrabold flex items-center justify-center gap-2 transition cursor-pointer ${
                  gender === 'boy'
                    ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751] ring-1 ring-[#1E5751]'
                    : 'border-stone-200 bg-stone-50/60 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span className="text-xl">👦</span>
                <span>{t.wizard.boy}</span>
              </button>
              <button
                type="button"
                onClick={() => setGender('girl')}
                className={`py-3.5 rounded-[2px] border text-sm font-extrabold flex items-center justify-center gap-2 transition cursor-pointer ${
                  gender === 'girl'
                    ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751] ring-1 ring-[#1E5751]'
                    : 'border-stone-200 bg-stone-50/60 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span className="text-xl">👧</span>
                <span>{t.wizard.girl}</span>
              </button>
            </div>
          </div>

          {/* Field 3: Character Builder (6 Skin Tones, 8 Hairstyles, 5 Hair Colors, Glasses, Hearing Aids) */}
          <div className="space-y-4 pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-[#23231E] font-serif flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#1E5751]" />
                {isAr ? 'تخصيص مظهر البطل (اللون والشعر):' : 'Character Appearance Builder:'}
              </span>
              <span className="text-[11px] text-[#1E5751] font-bold">
                {isAr ? activeSkin.nameAr : activeSkin.nameEn}
              </span>
            </div>

            {/* 6 Fitzpatrick Skin Tones */}
            <div>
              <label className="block text-xs font-bold text-stone-600 mb-2">
                {isAr ? '١. درجة لون البشرة (٦ درجات فيتزباتريك):' : '1. Skin Tone (6 Fitzpatrick Tones):'}
              </label>
              <div className="grid grid-cols-6 gap-2">
                {SKIN_TONES.map((tone) => {
                  const isSelected = skinTone === tone.id;
                  return (
                    <button
                      key={tone.id}
                      type="button"
                      onClick={() => setSkinTone(tone.id)}
                      title={isAr ? tone.nameAr : tone.nameEn}
                      className={`h-11 rounded-[2px] border-2 transition transform flex items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'border-[#1E5751] ring-2 ring-[#1E5751]/40 scale-105 shadow-sm'
                          : 'border-stone-300 hover:scale-102'
                      }`}
                      style={{ backgroundColor: tone.hex }}
                    >
                      {isSelected && (
                        <Check className="w-4 h-4 text-stone-900 drop-shadow" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 8 Hairstyles */}
            <div>
              <label className="block text-xs font-bold text-stone-600 mb-2">
                {isAr ? '٢. تسريحة الشعر (٨ تسريحات):' : '2. Hairstyle (8 Signature Styles):'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {HAIR_STYLES.slice(0, 8).map((hs) => {
                  const isSelected = hairStyle === hs.id;
                  return (
                    <button
                      key={hs.id}
                      type="button"
                      onClick={() => setHairStyle(hs.id)}
                      className={`p-2.5 rounded-[2px] border text-left rtl:text-right transition cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751] font-black ring-1 ring-[#1E5751]'
                          : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      <span className="text-lg mb-1">{hs.icon}</span>
                      <span className="text-[11px] leading-tight truncate">
                        {isAr ? hs.nameAr : hs.nameEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5 Hair Colors */}
            <div>
              <label className="block text-xs font-bold text-stone-600 mb-2">
                {isAr ? '٣. لون الشعر (٥ ألوان طبيعية):' : '3. Hair Color (5 Natural Shades):'}
              </label>
              <div className="flex items-center gap-3">
                {HAIR_COLORS.map((hc) => {
                  const isSelected = hairColor === hc.id;
                  return (
                    <button
                      key={hc.id}
                      type="button"
                      onClick={() => setHairColor(hc.id)}
                      title={isAr ? hc.nameAr : hc.nameEn}
                      className={`w-9 h-9 rounded-[2px] border-2 transition transform cursor-pointer flex items-center justify-center ${
                        isSelected
                          ? 'border-[#1E5751] ring-2 ring-[#1E5751]/40 scale-105 shadow-sm'
                          : 'border-stone-300 hover:scale-102'
                      }`}
                      style={{ backgroundColor: hc.hex }}
                    >
                      {isSelected && (
                        <Check className="w-4 h-4 text-white drop-shadow" />
                      )}
                    </button>
                  );
                })}
                <span className="text-xs text-stone-500 font-medium ml-2">
                  {isAr ? activeHairColor.nameAr : activeHairColor.nameEn}
                </span>
              </div>
            </div>

            {/* Inclusive Features: Glasses & Hearing Aids */}
            <div>
              <label className="block text-xs font-bold text-stone-600 mb-2">
                {isAr ? '٤. ميزات شاملة إضافية:' : '4. Inclusive Features:'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGlasses(!glasses)}
                  className={`p-3 rounded-[2px] border text-xs font-extrabold flex items-center justify-center gap-2 transition cursor-pointer ${
                    glasses
                      ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751] ring-1 ring-[#1E5751]'
                      : 'border-stone-200 bg-stone-50/60 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <span className="text-lg">👓</span>
                  <span>{isAr ? 'نظارات طبية' : 'Glasses'}</span>
                  {glasses && <Check className="w-3.5 h-3.5 ml-1" />}
                </button>
                <button
                  type="button"
                  onClick={() => setHearingAid(!hearingAid)}
                  className={`p-3 rounded-[2px] border text-xs font-extrabold flex items-center justify-center gap-2 transition cursor-pointer ${
                    hearingAid
                      ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751] ring-1 ring-[#1E5751]'
                      : 'border-stone-200 bg-stone-50/60 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <span className="text-lg">🦻</span>
                  <span>{isAr ? 'سماعة أذن' : 'Hearing Aid'}</span>
                  {hearingAid && <Check className="w-3.5 h-3.5 ml-1" />}
                </button>
              </div>
            </div>
          </div>

          {/* Field 4: Co-Star Selection (Dad/Baba, Mom/Mama, Grandpa, Grandma with Beard Customizer) */}
          <div className="space-y-4 pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-[#23231E] font-serif flex items-center gap-2">
                <Users className="w-4 h-4 text-[#1E5751]" />
                {isAr ? 'إضافة شخصية مساندة (ماما، بابا، جدو):' : 'Add Co-Star (Baba, Mama, Grandpa):'}
              </span>
              <button
                type="button"
                onClick={() => setCoStarEnabled(!coStarEnabled)}
                className={`text-xs font-black px-3 py-1 rounded-[2px] transition cursor-pointer ${
                  coStarEnabled
                    ? 'bg-[#1E5751] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {coStarEnabled ? (isAr ? 'مُضاف ✓' : 'Added ✓') : (isAr ? '+ إضافة' : '+ Add')}
              </button>
            </div>

            {coStarEnabled && (
              <div className="p-4 rounded-[2px] bg-[#FDF8F1] border border-stone-300 space-y-4 animate-in fade-in duration-200">
                {/* Role Selection */}
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1.5">
                    {isAr ? 'صلة القرابة:' : 'Co-Star Role:'}
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { role: 'dad' as const, labelEn: 'Baba / Dad', labelAr: 'بابا' },
                      { role: 'mom' as const, labelEn: 'Mama / Mom', labelAr: 'ماما' },
                      { role: 'grandpa' as const, labelEn: 'Grandpa', labelAr: 'جدو' },
                      { role: 'grandma' as const, labelEn: 'Grandma', labelAr: 'تيتا' },
                    ].map((item) => (
                      <button
                        key={item.role}
                        type="button"
                        onClick={() => {
                          setCoStarRole(item.role);
                          setCoStarName(isAr ? item.labelAr : (item.labelEn.split(' ')[0] ?? ''));
                        }}
                        className={`py-2 rounded-[2px] text-xs font-extrabold border transition cursor-pointer truncate ${
                          coStarRole === item.role
                            ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751] ring-1 ring-[#1E5751]'
                            : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {isAr ? item.labelAr : item.labelEn.split('/')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Co-Star Name */}
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1">
                    {isAr ? 'الاسم الذي يناديه به الطفل:' : 'Co-Star Display Name:'}
                  </label>
                  <input
                    type="text"
                    maxLength={20}
                    value={coStarName}
                    onChange={(e) => setCoStarName(e.target.value)}
                    placeholder={isAr ? 'مثال: بابا سعيد، عمو طارق' : 'e.g. Baba, Uncle Tariq'}
                    className="w-full px-3 py-2 rounded-[2px] border border-stone-300 text-xs font-bold bg-white text-[#23231E] focus:outline-hidden focus:ring-1 focus:ring-[#1E5751]"
                  />
                </div>

                {/* Beard Customizer for Dad & Grandpa */}
                {(coStarRole === 'dad' || coStarRole === 'grandpa') && (
                  <div>
                    <label className="block text-xs font-bold text-stone-600 mb-1.5">
                      {isAr ? 'ستايل اللحية والشارب:' : 'Beard Customizer:'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {BEARD_STYLES.map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setCoStarBeard(b.id)}
                          className={`px-2 py-1.5 rounded-[2px] text-[11px] font-bold border transition cursor-pointer truncate ${
                            coStarBeard === b.id
                              ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751] ring-1 ring-[#1E5751]'
                              : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          {isAr ? b.nameAr : b.nameEn}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Field 5: Language Format */}
          <div className="pt-4 border-t border-stone-200">
            <label className="block text-sm font-extrabold text-[#23231E] font-serif mb-2">
              {t.wizard.languageFormat}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setLanguage('bilingual')}
                className={`p-3 rounded-[2px] border text-left rtl:text-right transition cursor-pointer ${
                  language === 'bilingual'
                    ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751] ring-1 ring-[#1E5751]'
                    : 'border-stone-200 bg-stone-50/60 text-stone-700 hover:bg-stone-100'
                }`}
                dir={dir}
              >
                <div className="font-extrabold text-xs flex items-center justify-between">
                  <span>{t.wizard.bilingual}</span>
                  <span className="text-[9px] bg-[#1E5751] text-white px-1.5 py-0.5 rounded-[2px] font-black">
                    {t.wizard.bilingualTop}
                  </span>
                </div>
                <div className="text-[10px] text-stone-500 mt-1">{t.wizard.bilingualDesc}</div>
              </button>

              <button
                type="button"
                onClick={() => setLanguage('ar')}
                className={`p-3 rounded-[2px] border text-right transition cursor-pointer ${
                  language === 'ar'
                    ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751] ring-1 ring-[#1E5751]'
                    : 'border-stone-200 bg-stone-50/60 text-stone-700 hover:bg-stone-100'
                }`}
                dir="rtl"
              >
                <div className="font-extrabold text-xs">{t.wizard.arabicOnly}</div>
                <div className="text-[10px] text-stone-500 mt-1">{t.wizard.arabicOnlyDesc}</div>
              </button>

              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`p-3 rounded-[2px] border text-left transition cursor-pointer ${
                  language === 'en'
                    ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751] ring-1 ring-[#1E5751]'
                    : 'border-stone-200 bg-stone-50/60 text-stone-700 hover:bg-stone-100'
                }`}
                dir="ltr"
              >
                <div className="font-extrabold text-xs">{t.wizard.englishOnly}</div>
                <div className="text-[10px] text-stone-500 mt-1">{t.wizard.englishOnlyDesc}</div>
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-stone-200">
            <button
              type="submit"
              className="w-full bg-[#1E5751] hover:bg-[#16433e] text-white font-extrabold py-4 rounded-[2px] shadow-lg shadow-[#1E5751]/20 transition text-base flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>{t.wizard.continuePreview}</span>
              <ArrowRight className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            </button>
            <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 font-semibold mt-3">
              <span>{t.wizard.badgeInstant}</span>
              <span>•</span>
              <span>{t.wizard.badgeNoCard}</span>
              <span>•</span>
              <span>{t.wizard.badgeSatisfaction}</span>
            </div>
          </div>
        </form>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            href={`${isAr ? '/ar/books' : '/books'}/${matchedProduct.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 transition"
          >
            <ArrowLeft className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            <span>{t.wizard.backToBook}</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function CreateStartPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FDF8F1] flex items-center justify-center font-bold text-stone-600">
        Loading personalization...
      </div>
    }>
      <CreateStartContent />
    </Suspense>
  );
}
