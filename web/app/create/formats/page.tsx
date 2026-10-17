'use client';

import React, { useState, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Sparkles, Gift, Palette, Headphones } from 'lucide-react';
import { useCountry } from '@/lib/context/CountryContext';
import { PRODUCTS, getProductBySlug } from '@/config/products';
import { isComingSoon } from '@/config/comingSoon';
import { FORMAT_PRICES, ADDON_PRICES } from '@/lib/utils/pricing';
import { DIGITAL_ONLY_LAUNCH } from '@/config/launch';

// Format & addon prices are derived from the shared pricing authority
// (@/lib/utils/pricing) so they can never drift from the catalog.

// DIGITAL-ONLY LAUNCH: the digital edition is the only purchasable format
// at launch. Physical formats stay visible (marked "coming soon") so
// customers see what is arriving next.
const DIGITAL_FORMAT_OPTION = {
  id: 'digital',
  badge: 'INSTANT DELIVERY',
  badgeAr: 'توصيل فوري',
  title: 'Digital Edition',
  titleAr: 'النسخة الرقمية',
  desc: 'The complete personalized storybook as an instant digital keepsake — interactive 3D flipbook delivered to your email & WhatsApp within minutes.',
  descAr: 'كتاب القصة المخصص كاملاً كنسخة رقمية فورية — قارئ ثلاثي الأبعاد تفاعلي يصلك على بريدك الإلكتروني والواتساب خلال دقائق.',
  aedPrice: FORMAT_PRICES.digital,
  usdPrice: 12.99,
};

const FORMAT_OPTIONS = [
  {
    id: 'layflat',
    badge: 'LIFETIME KEEPSAKE',
    badgeAr: 'تذكار فاخر يدوم للأبد',
    title: 'Deluxe Layflat Hardcover',
    titleAr: 'طبعة فاخرة منبسطة',
    desc: 'Luxurious thick panoramic pages that lay perfectly flat when reading — wrapped in a sturdy casebound cover for an unforgettable heirloom gift.',
    descAr: 'صفحات بانورامية سميكة وفاخرة تنبسط بنسبة ١٨٠ درجة بالكامل، مغلفة بتجليد مقوى صلب لتدوم كإرث عائلي لا يُنسى.',
    aedPrice: FORMAT_PRICES.layflat,
    usdPrice: 26.99,
  },
  {
    id: 'hardcover',
    badge: 'MOST POPULAR',
    badgeAr: 'الأكثر طلباً',
    title: 'Classic Hardcover',
    titleAr: 'غلاف مقوى كلاسيكي',
    desc: 'A premium hardcover with silky matte lamination and rigid 3mm greyboard. Made to be read and treasured again and again.',
    descAr: 'غلاف مقوى فاخر بسماكة ٣ مم مع طبقة حماية حريرية ناعمة تحمي الصفحات لتقرأها مراراً وتكراراً بحب وفخر.',
    aedPrice: FORMAT_PRICES.hardcover,
    usdPrice: 21.99,
    isDefault: true,
  },
  {
    id: 'softcover',
    badge: 'LIGHTWEIGHT & FLEXIBLE',
    badgeAr: 'خفيف وسهل الحمل',
    title: 'Softcover Edition',
    titleAr: 'غلاف مرن خفيف',
    desc: 'Lightweight and flexible with durable archival silk pages. Perfect for little hands to hold during bedtime stories on the go.',
    descAr: 'خفيف الوزن ومرن على ورق حريري أرشيفي متين، مثالي لأيدي الصغار في قصص ما قبل النوم والرحلات اليومية.',
    aedPrice: FORMAT_PRICES.softcover,
    usdPrice: 12.99,
  },
];

// Visible format list: digital first at launch, physical-only afterwards.
const formatOptions = DIGITAL_ONLY_LAUNCH
  ? [DIGITAL_FORMAT_OPTION, ...FORMAT_OPTIONS]
  : FORMAT_OPTIONS;

function CreateFormatsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { country, language, dir } = useCountry();
  const isAr = language === 'ar';

  const bookSlug = searchParams.get('book') || 'the-secret-of-the-starlit-dunes';
  const childName = searchParams.get('name') || (isAr ? 'زايد' : 'Zayed');
  const color = searchParams.get('color') || 'desert-gold';
  const giver = searchParams.get('giver') || (isAr ? 'ماما وبابا' : 'Mama & Baba');
  const photo = searchParams.get('photo') || 'no';

  // Full wizard state carried forward (character params, dedication, story language)
  const gender = searchParams.get('gender') || 'boy';
  const skinTone = searchParams.get('skinTone') || 'olive';
  const hairStyle = searchParams.get('hairStyle') || 'short-waves';
  const hairColor = searchParams.get('hairColor') || 'jet-black';
  const glasses = searchParams.get('glasses') || 'false';
  const hearingAid = searchParams.get('hearingAid') || 'false';
  const coStarEnabled = searchParams.get('coStarEnabled') || 'false';
  const coStarRole = searchParams.get('coStarRole') || 'dad';
  const coStarName = searchParams.get('coStarName') || '';
  const coStarBeard = searchParams.get('coStarBeard') || 'neat-trimmed';
  const dedicationText = searchParams.get('dedicationText') || '';
  const languageParam = searchParams.get('language');
  const storyLanguage = languageParam === 'ar' || languageParam === 'en' ? languageParam : 'bilingual';

  const product = getProductBySlug(bookSlug) ?? PRODUCTS[0];

  // Read the format from the query instead of resetting to hardcover.
  // DIGITAL-ONLY LAUNCH: digital is the default and the only selectable
  // format — physical formats (or tampered values) are coerced to digital.
  const paramFormat = searchParams.get('format');
  const [selectedFormat, setSelectedFormat] = useState(
    DIGITAL_ONLY_LAUNCH
      ? 'digital'
      : paramFormat === 'softcover' || paramFormat === 'layflat' || paramFormat === 'digital'
        ? paramFormat
        : 'hardcover'
  );

  // High-Margin Order Bumps (Feature 6):
  // Coloring Book (19 AED), Gift Wrap/Box (39/15 AED), Audio Keepsake (19 AED)
  // Restored from the URL so back-navigation (giftwraps → formats) never
  // discards the selections made here.
  const paramWrap = searchParams.get('wrap');
  const paramGiftBox = searchParams.get('giftBox');
  const paramGiftWrap = searchParams.get('giftWrap');
  // DIGITAL-ONLY LAUNCH: physical add-ons are not sold yet — force them
  // off so no physical upsell can leak into the order.
  const initialPackaging: 'standard' | 'sleeve' | 'box' = DIGITAL_ONLY_LAUNCH
    ? 'standard'
    : paramWrap === 'box' || paramWrap === 'sleeve'
      ? paramWrap
      : paramGiftBox === 'true'
        ? 'box'
        : paramGiftWrap === 'true'
          ? 'sleeve'
          : 'standard';
  const [hasColoringBook, setHasColoringBook] = useState(!DIGITAL_ONLY_LAUNCH && searchParams.get('coloringBook') === 'true');
  const [packagingType, setPackagingType] = useState<'standard' | 'sleeve' | 'box'>(initialPackaging);
  const [hasAudioKeepsake, setHasAudioKeepsake] = useState(!DIGITAL_ONLY_LAUNCH && searchParams.get('audioKeepsake') === 'true');

  const selectedFormatObj =
    formatOptions.find((f) => f.id === selectedFormat) ?? formatOptions[0];

  // Unknown product → catalog; coming-soon product → its honest product page.
  // After all hooks so TS narrows product/selectedFormatObj below.
  const formatsBlocked = !product || !selectedFormatObj || isComingSoon(bookSlug);
  useEffect(() => {
    if (!product) {
      router.replace(isAr ? '/ar/all-books' : '/all-books');
    } else if (isComingSoon(bookSlug)) {
      router.replace(`${isAr ? '/ar' : ''}/books/${encodeURIComponent(bookSlug)}`);
    }
  }, [product, bookSlug, isAr, router]);

  if (formatsBlocked) return null;

  // Addon prices from the shared pricing authority (never hardcoded).
  const COLORING_BOOK_PRICE = ADDON_PRICES.coloringBook;
  const GIFT_BOX_PRICE = ADDON_PRICES.giftBox;
  const GIFT_SLEEVE_PRICE = ADDON_PRICES.giftWrap;
  const AUDIO_KEEPSAKE_PRICE = ADDON_PRICES.audioKeepsake;

  const packagingCost =
    packagingType === 'box'
      ? GIFT_BOX_PRICE
      : packagingType === 'sleeve'
      ? GIFT_SLEEVE_PRICE
      : 0;

  const totalCost =
    selectedFormatObj.aedPrice +
    (hasColoringBook ? COLORING_BOOK_PRICE : 0) +
    packagingCost +
    (hasAudioKeepsake ? AUDIO_KEEPSAKE_PRICE : 0);

  const handleContinue = () => {
    const query = new URLSearchParams({
      book: product.slug,
      name: childName,
      gender,
      skinTone,
      hairStyle,
      hairColor,
      glasses,
      hearingAid,
      coStarEnabled,
      coStarRole,
      coStarName,
      coStarBeard,
      color,
      giver,
      photo,
      dedicationText,
      language: storyLanguage,
      format: selectedFormat,
      coloringBook: hasColoringBook ? 'true' : 'false',
      giftBox: packagingType === 'box' ? 'true' : 'false',
      giftWrap: packagingType === 'sleeve' ? 'true' : 'false',
      audioKeepsake: hasAudioKeepsake ? 'true' : 'false',
      // Normalized wrap choice for the gift-wrap step (box | sleeve | none)
      wrap: packagingType === 'box' ? 'box' : packagingType === 'sleeve' ? 'sleeve' : 'none',
    }).toString();

    // DIGITAL-ONLY LAUNCH: no physical wraps to choose — go straight to the
    // cart. (create/giftwraps also auto-redirects, so deep links stay safe.)
    const nextStep = DIGITAL_ONLY_LAUNCH ? 'cart' : 'create/giftwraps';
    router.push(`${isAr ? '/ar' : ''}/${nextStep}?${query}`);
  };

  return (
    <main
      className="min-h-screen py-10 px-4 text-[#23231E] font-sans"
      style={{
        backgroundColor: '#FDF8F1',
        backgroundImage:
          'linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
      dir={dir}
    >
      <div className="max-w-2xl mx-auto">
        {/* Top Header */}
        <div className="text-center mb-8">
          <Link href={isAr ? '/ar' : '/'} className="inline-flex items-center gap-2 mb-3 group">
            <span className="text-2xl group-hover:rotate-12 transition-transform">✨</span>
            <span className="font-black text-xl tracking-tight text-[#23231E] font-serif">
              {isAr ? 'حكايات مخصصة' : 'PersonalizedTales'}
            </span>
          </Link>
          <div className="text-xs font-bold uppercase tracking-widest text-[#1E5751] mb-1">
            {DIGITAL_ONLY_LAUNCH
              ? (isAr ? 'الخطوة ٣ من ٣ • النسخة الرقمية' : 'Step 3 of 3 • Digital Edition')
              : (isAr ? 'الخطوة ٣ من ٤ • صيغة الغلاف والإضافات' : 'Step 3 of 4 • Format & Upgrades')}
          </div>
          <h1 className="text-3xl font-black text-[#23231E] tracking-tight font-serif">
            {isAr ? `اختر صيغة كتاب ${childName}` : `Choose a format for ${childName}'s book`}
          </h1>
          <p className="text-xs text-stone-600 mt-1.5 font-medium max-w-md mx-auto">
            {isAr
              ? 'اجعل هديتك تدوم للأبد مع خيارات الأغلفة التذكارية الفاخرة المعتمدة'
              : 'Make your heirloom gift even more glorious with our selection of keepsake bindings'}
          </p>
        </div>

        {/* Formats Selection Cards — digital at launch, print coming soon */}
        <div className="space-y-4 mb-8">
          {formatOptions.map((fmt) => {
            const isSelected = selectedFormat === fmt.id;
            // DIGITAL-ONLY LAUNCH: physical cards stay visible but unselectable.
            const isDisabled = DIGITAL_ONLY_LAUNCH && fmt.id !== 'digital';
            const priceLabel =
              country.slug === 'us'
                ? `$${fmt.usdPrice.toFixed(2)} USD`
                : `${fmt.aedPrice}.00 ${country.currency}`;

            return (
              <div
                key={fmt.id}
                onClick={isDisabled ? undefined : () => setSelectedFormat(fmt.id)}
                className={`p-6 rounded-[2px] border transition relative ${
                  isDisabled
                    ? 'border-stone-200 bg-stone-50 opacity-70 cursor-not-allowed'
                    : 'cursor-pointer'
                } ${
                  isSelected
                    ? 'border-[#1E5751] bg-white ring-2 ring-[#1E5751]/20 shadow-[var(--shadow-spine)]'
                    : 'border-stone-300 bg-white/90 hover:border-stone-400'
                }`}
              >
                {/* Badge — physical formats show "coming soon" at launch */}
                {(fmt.badge || isDisabled) && (
                  <div
                    className={`absolute -top-3 left-6 rtl:left-auto rtl:right-6 text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-[2px] shadow-xs ${
                      isDisabled
                        ? 'bg-amber-600 text-white'
                        : isSelected
                          ? 'bg-[#1E5751] text-white'
                          : 'bg-stone-800 text-white'
                    }`}
                  >
                    {isDisabled
                      ? (isAr ? 'قريباً' : 'Coming soon')
                      : (isAr ? fmt.badgeAr : fmt.badge)}
                  </div>
                )}

                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-lg text-[#23231E] font-serif">
                        {fmt.title}
                      </h3>
                      <span className="text-xs font-bold text-[#1E5751] font-amiri" dir="rtl">
                        {fmt.titleAr}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed font-medium">
                      {isAr ? fmt.descAr : fmt.desc}
                    </p>
                  </div>

                  <div className="text-right rtl:text-left shrink-0">
                    <div className="font-black text-xl text-[#23231E] font-serif">
                      {priceLabel}
                    </div>
                    <div className="text-[11px] text-[#1E5751] font-bold">
                      {isDisabled
                        ? (isAr ? 'الطباعة قريباً' : 'Print coming soon')
                        : (isAr ? 'متوفر للطباعة الفورية' : 'In Stock • 24h Courier')}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold">
                  <span className={isSelected ? 'text-[#1E5751] font-extrabold' : 'text-stone-400'}>
                    {isDisabled
                      ? (isAr ? 'متوفر قريباً' : 'Available soon')
                      : isSelected
                        ? (isAr ? '✓ الصيغة المختارة' : '✓ Selected format')
                        : (isAr ? 'اضغط للاختيار' : 'Click to select')}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-[2px] border flex items-center justify-center transition ${
                      isSelected
                        ? 'border-[#1E5751] bg-[#1E5751] text-white'
                        : 'border-stone-300'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* High-Margin Order Bumps (Feature 6: Coloring Book, Gift Wrap/Box, Audio Keepsake) */}
        {/* DIGITAL-ONLY LAUNCH: physical add-ons are visible but unavailable. */}
        <div className={`bg-white rounded-[2px] p-6 border border-stone-300 shadow-[var(--shadow-spine)] mb-8 space-y-5 ${DIGITAL_ONLY_LAUNCH ? 'opacity-60 pointer-events-none select-none' : ''}`}>
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h2 className="text-sm font-extrabold text-[#23231E] font-serif flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#1E5751]" />
              {isAr ? 'إضافات تذكارية مميزة لهديتك (اختياري):' : 'Complete Your Heirloom Gift (Order Bumps):'}
            </h2>
            {DIGITAL_ONLY_LAUNCH ? (
              <span className="text-[10px] font-black uppercase tracking-wider text-white bg-amber-600 px-2 py-0.5 rounded-[2px]">
                {isAr ? 'قريباً' : 'Coming soon'}
              </span>
            ) : (
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E5751] bg-[#1E5751]/10 px-2 py-0.5 rounded-[2px]">
              {isAr ? 'قيمة مضافة' : 'High Value'}
            </span>
            )}
          </div>

          {/* Bump 1: Coloring Book (19 AED) */}
          <div
            onClick={() => setHasColoringBook(!hasColoringBook)}
            className={`p-4 rounded-[2px] border transition cursor-pointer flex items-start justify-between gap-3 ${
              hasColoringBook
                ? 'border-[#1E5751] bg-[#1E5751]/5 ring-1 ring-[#1E5751]/30'
                : 'border-stone-200 hover:border-stone-300 bg-stone-50/40'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-[2px] bg-amber-100 text-amber-800 shrink-0">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-extrabold text-[#23231E]">
                    {isAr ? `كتاب تلوين مخصص للبطل ${childName}` : `Personalized Adventure Coloring Book`}
                  </h3>
                  <span className="text-[10px] font-bold text-white bg-amber-600 px-1.5 py-0.2 rounded-[2px]">
                    +19 AED
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                  {isAr
                    ? `٢٤ صفحة من الرسومات والأنشطة الإبداعية تحكي مغامرة ${childName} في الصحراء للتلوين.`
                    : `24 personalized coloring and activity pages starring ${childName} in the magical dunes.`}
                </p>
              </div>
            </div>

            <div
              className={`w-5 h-5 rounded-[2px] border shrink-0 flex items-center justify-center transition mt-1 ${
                hasColoringBook ? 'border-[#1E5751] bg-[#1E5751] text-white' : 'border-stone-300'
              }`}
            >
              {hasColoringBook && <Check className="w-3.5 h-3.5" />}
            </div>
          </div>

          {/* Bump 2: Luxury Gift Box / Wrap (39 / 15 AED) */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-extrabold text-[#23231E] flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-[#1E5751]" />
              {isAr ? 'تغليف الهدايا وصناديق التقديم الفاخرة:' : 'Gift Wrap & Presentation Boxes:'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Option A: Deluxe Box (39 AED) */}
              <button
                type="button"
                onClick={() => setPackagingType('box')}
                className={`p-3 rounded-[2px] border text-left rtl:text-right transition cursor-pointer flex flex-col justify-between ${
                  packagingType === 'box'
                    ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751] ring-1 ring-[#1E5751]'
                    : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100 text-stone-700'
                }`}
              >
                <div>
                  <div className="text-xs font-black">
                    {isAr ? 'صندوق هدايا ملكي فاخر' : 'Deluxe Keepsake Box'}
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5">
                    {isAr ? 'صندوق كرتوني مقوى مع زخارف ذهبية' : 'Rigid magnetic presentation box'}
                  </div>
                </div>
                <div className="text-xs font-extrabold text-[#1E5751] mt-2">+39 AED</div>
              </button>

              {/* Option B: Sleeve Wrap (15 AED) */}
              <button
                type="button"
                onClick={() => setPackagingType('sleeve')}
                className={`p-3 rounded-[2px] border text-left rtl:text-right transition cursor-pointer flex flex-col justify-between ${
                  packagingType === 'sleeve'
                    ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751] ring-1 ring-[#1E5751]'
                    : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100 text-stone-700'
                }`}
              >
                <div>
                  <div className="text-xs font-black">
                    {isAr ? 'غلاف إهداء مع شريط حريري' : 'Satin Wrap & Sleeve'}
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5">
                    {isAr ? 'غلاف حريري فاخر مزين بشريط' : 'Luxury printed sleeve & ribbon'}
                  </div>
                </div>
                <div className="text-xs font-extrabold text-[#1E5751] mt-2">+15 AED</div>
              </button>

              {/* Option C: Standard Eco (Free) */}
              <button
                type="button"
                onClick={() => setPackagingType('standard')}
                className={`p-3 rounded-[2px] border text-left rtl:text-right transition cursor-pointer flex flex-col justify-between ${
                  packagingType === 'standard'
                    ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751] ring-1 ring-[#1E5751]'
                    : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100 text-stone-700'
                }`}
              >
                <div>
                  <div className="text-xs font-black">
                    {isAr ? 'تغليف قياسي آمن' : 'Standard Eco Pack'}
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5">
                    {isAr ? 'تغليف كرتوني مقوى قابل للتدوير' : 'Safe recyclable mailer box'}
                  </div>
                </div>
                <div className="text-xs font-extrabold text-stone-500 mt-2">FREE</div>
              </button>
            </div>
          </div>

          {/* Bump 3: Audio Keepsake (19 AED) */}
          <div
            onClick={() => setHasAudioKeepsake(!hasAudioKeepsake)}
            className={`p-4 rounded-[2px] border transition cursor-pointer flex items-start justify-between gap-3 ${
              hasAudioKeepsake
                ? 'border-[#1E5751] bg-[#1E5751]/5 ring-1 ring-[#1E5751]/30'
                : 'border-stone-200 hover:border-stone-300 bg-stone-50/40'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-[2px] bg-blue-100 text-blue-800 shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-extrabold text-[#23231E]">
                    {isAr ? 'التسجيل الصوتي السينمائي التذكاري' : 'Cinematic Audio Keepsake Drama'}
                  </h3>
                  <span className="text-[10px] font-bold text-white bg-blue-600 px-1.5 py-0.2 rounded-[2px]">
                    +19 AED
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                  {isAr
                    ? 'تسجيل صوتي كامل بمؤثرات صوتية وموسيقى ساحرة ينطق اسم طفلك، متاح فوراً عبر رمز الاستجابة السريعة (QR).'
                    : 'Full audio narration with orchestral soundtrack & voice acting customized with child’s name, accessed via QR.'}
                </p>
              </div>
            </div>

            <div
              className={`w-5 h-5 rounded-[2px] border shrink-0 flex items-center justify-center transition mt-1 ${
                hasAudioKeepsake ? 'border-[#1E5751] bg-[#1E5751] text-white' : 'border-stone-300'
              }`}
            >
              {hasAudioKeepsake && <Check className="w-3.5 h-3.5" />}
            </div>
          </div>

          {/* Live Order Summary */}
          <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FDF8F1] p-3 rounded-[2px]">
            <div>
              <div className="text-xs font-bold text-stone-500">
                {isAr ? 'الإجمالي التقديري مع الإضافات:' : 'Estimated Total with Upgrades:'}
              </div>
              <div className="text-lg font-black text-[#23231E] font-serif">
                {totalCost}.00 AED
              </div>
            </div>
          </div>
        </div>

        {/* Action Bottom Bar */}
        <div className="bg-white p-6 rounded-[2px] border border-stone-300 shadow-[var(--shadow-spine)] flex items-center justify-between gap-4">
          <Link
            href={`${isAr ? '/ar/create/preview' : '/create/preview'}?${searchParams.toString()}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 transition"
          >
            {dir === 'rtl' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{isAr ? 'تعديل بيانات القصة' : 'Edit Book & Dedication'}</span>
          </Link>

          <button
            onClick={handleContinue}
            className="bg-[#1E5751] hover:bg-[#16433e] text-white font-extrabold px-8 py-3.5 rounded-[2px] shadow-lg shadow-[#1E5751]/20 transition text-sm flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>{DIGITAL_ONLY_LAUNCH ? (isAr ? 'أضف إلى السلة وتابع' : 'Add to Cart & Continue') : (isAr ? 'المتابعة لتغليف الهدية' : 'Continue to Gift Wraps')}</span>
            {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </main>
  );
}

export default function CreateFormatsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FDF8F1] flex items-center justify-center font-bold text-stone-600">
          Loading formats...
        </div>
      }
    >
      <CreateFormatsContent />
    </Suspense>
  );
}
