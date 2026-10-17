'use client';

import React, { useState, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import { useCountry } from '@/lib/context/CountryContext';
import { PRODUCTS, getProductBySlug } from '@/config/products';
import { isComingSoon } from '@/config/comingSoon';
import { ADDON_PRICES } from '@/lib/utils/pricing';
import { DIGITAL_ONLY_LAUNCH } from '@/config/launch';

// Wrap costs are derived from the shared pricing authority
// (@/lib/utils/pricing) so they can never drift from the catalog.
const GIFTWRAP_OPTIONS = [
  {
    id: 'box',
    name: 'Luxury Rigid Keepsake Gift Box',
    nameAr: 'صندوق الهدايا الملكي الفاخر مع زخارف ذهبية',
    desc: 'Elevate your storybook into an heirloom with our luxury presentation box featuring gold-embossed Arabian celestial details.',
    aedCost: ADDON_PRICES.giftBox,
    icon: '🎁',
  },
  {
    id: 'sleeve',
    name: 'Satin Gift Sleeve & Envelope',
    nameAr: 'غلاف إهداء أنيق مع شريط حريري',
    desc: 'An envelope-style presentation wrap with satin ribbon for a sleek, colorful finish.',
    aedCost: ADDON_PRICES.giftWrap,
    icon: '✉️',
  },
  {
    id: 'none',
    name: 'Standard Eco Keepsake Packaging',
    nameAr: 'تغليف تذكاري قياسي صديق للبيئة',
    desc: 'Carefully wrapped and protected in our recyclable FSC® certified eco-friendly packaging.',
    aedCost: 0,
    icon: '🌱',
    isDefault: true,
  },
];

function CreateGiftwrapsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { country, language, dir } = useCountry();

  const isAr = language === 'ar';
  const bookSlug = searchParams.get('book') || 'the-secret-of-the-starlit-dunes';
  const childName = searchParams.get('name') || (isAr ? 'زايد' : 'Zayed');
  const color = searchParams.get('color') || 'desert-gold';
  const giver = searchParams.get('giver') || (isAr ? 'ماما وبابا' : 'Mama & Baba');
  const photo = searchParams.get('photo') || 'no';
  const format = searchParams.get('format') || 'hardcover';

  const product = getProductBySlug(bookSlug) ?? PRODUCTS[0];

  // Preselect from the query when arriving from the formats step (box | sleeve | none)
  const paramWrap = searchParams.get('wrap');
  const [selectedWrap, setSelectedWrap] = useState(
    paramWrap === 'box' || paramWrap === 'sleeve' ? paramWrap : 'none'
  );

  // Unknown product → catalog; coming-soon product → its honest product page.
  // After all hooks so TS narrows product below.
  const giftwrapsBlocked = !product || isComingSoon(bookSlug);
  useEffect(() => {
    if (!product) {
      router.replace(isAr ? '/ar/all-books' : '/all-books');
    } else if (isComingSoon(bookSlug)) {
      router.replace(`${isAr ? '/ar' : ''}/books/${encodeURIComponent(bookSlug)}`);
    }
  }, [product, bookSlug, isAr, router]);

  // DIGITAL-ONLY LAUNCH: there is nothing physical to wrap — pass straight
  // through to the cart, preserving every query param. Deep links here
  // stay safe because the redirect keeps the full wizard state.
  useEffect(() => {
    if (DIGITAL_ONLY_LAUNCH) {
      router.replace(`${isAr ? '/ar/cart' : '/cart'}?${searchParams.toString()}`);
    }
  }, [isAr, router, searchParams]);

  if (DIGITAL_ONLY_LAUNCH) return null;

  if (giftwrapsBlocked) return null;

  const handleContinue = () => {
    const query = new URLSearchParams({
      book: product.slug,
      name: childName,
      gender: searchParams.get('gender') || 'boy',
      skinTone: searchParams.get('skinTone') || 'olive',
      hairStyle: searchParams.get('hairStyle') || 'short-waves',
      hairColor: searchParams.get('hairColor') || 'jet-black',
      glasses: searchParams.get('glasses') || 'false',
      hearingAid: searchParams.get('hearingAid') || 'false',
      coStarEnabled: searchParams.get('coStarEnabled') || 'false',
      coStarRole: searchParams.get('coStarRole') || 'dad',
      coStarName: searchParams.get('coStarName') || '',
      coStarBeard: searchParams.get('coStarBeard') || 'neat-trimmed',
      color,
      giver,
      photo,
      dedicationText: searchParams.get('dedicationText') || '',
      language: searchParams.get('language') || 'bilingual',
      format,
      coloringBook: searchParams.get('coloringBook') || 'false',
      audioKeepsake: searchParams.get('audioKeepsake') || 'false',
      giftBox: selectedWrap === 'box' ? 'true' : 'false',
      giftWrap: selectedWrap === 'sleeve' ? 'true' : 'false',
      wrap: selectedWrap,
    }).toString();

    // Route cleanly to /cart
    router.push(isAr ? `/ar/cart?${query}` : `/cart?${query}`);
  };

  return (
    <main className="min-h-screen bg-[#FDF8F1] py-10 px-4 font-sans text-slate-900" dir={dir}>
      <div className="max-w-2xl mx-auto">
        {/* Top Header */}
        <div className="text-center mb-8">
          <Link href={isAr ? '/ar' : '/'} className="inline-flex items-center gap-2 mb-3 group">
            <span className="text-2xl group-hover:rotate-12 transition-transform">✨</span>
            <span className="font-black text-xl tracking-tight text-[#1E5751] font-serif">
              {isAr ? 'حكايات مخصصة' : 'PersonalizedTales'}
            </span>
          </Link>
          <div className="text-xs font-bold uppercase tracking-widest text-[#1E5751] mb-1 font-serif">
            {isAr ? 'الخطوة ٤ • التغليف وعلب الهدايا الفاخرة' : 'Step 4 • Keepsake Gift Wrap & Packaging'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-serif">
            {isAr ? `أضف لمسة إهداء ساحرة لكتاب ${childName}` : `Add a Final Flourish for ${childName}`}
          </h1>
          <p className="text-xs text-slate-600 mt-1.5 max-w-md mx-auto leading-relaxed">
            {isAr ? 'اختر من تشكيلتنا الفاخرة من علب الهدايا الملكية مع شريط حريري وتوصيل سريع للإمارات' : 'Choose from our collection of heirloom presentation boxes and luxury wraps'}
          </p>
        </div>

        {/* Giftwrap Options */}
        <div className="space-y-4 mb-8">
          {GIFTWRAP_OPTIONS.map((wrap) => {
            const isSelected = selectedWrap === wrap.id;
            const priceLabel = wrap.aedCost === 0
              ? (isAr ? 'مجاني' : 'FREE')
              : `+${wrap.aedCost}.00 ${country.currency}`;

            return (
              <div
                key={wrap.id}
                onClick={() => setSelectedWrap(wrap.id)}
                className={`p-6 rounded-[2px] border-2 transition cursor-pointer flex items-center justify-between gap-4 ${
                  isSelected
                    ? 'border-[#1E5751] bg-white ring-2 ring-[#1E5751]/20 shadow-md'
                    : 'border-amber-900/10 bg-white hover:border-[#1E5751]/40 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{wrap.icon}</span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-base text-slate-950 font-serif">
                        {isAr ? wrap.nameAr : wrap.name}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-md">
                      {wrap.desc}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 rtl:text-left">
                  <div className="font-black text-sm text-[#1E5751]">{priceLabel}</div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center mt-2 ${
                    isAr ? 'mr-auto' : 'ml-auto'
                  } ${
                    isSelected ? 'border-[#1E5751] bg-[#1E5751] text-white' : 'border-slate-300'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Bottom Bar */}
        <div className="bg-white p-6 rounded-[2px] border border-amber-900/10 shadow-sm flex items-center justify-between gap-4">
          <Link
            href={`${isAr ? '/ar/create/formats' : '/create/formats'}?${searchParams.toString()}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition"
          >
            {dir === 'rtl' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{isAr ? 'الرجوع لنوع الغلاف' : 'Back to Format'}</span>
          </Link>

          <button
            type="button"
            onClick={handleContinue}
            className="bg-[#1E5751] hover:bg-[#16433e] text-white font-serif font-black px-8 py-3.5 rounded-[2px] shadow-sm transition text-sm flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-[#FFD15A]" />
            <span>{isAr ? 'الإضافة إلى السلة والمتابعة' : 'Add to Cart & Continue'}</span>
            {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </main>
  );
}

export default function CreateGiftwrapsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDF8F1] flex items-center justify-center font-bold text-slate-600">Loading giftwrap...</div>}>
      <CreateGiftwrapsContent />
    </Suspense>
  );
}
