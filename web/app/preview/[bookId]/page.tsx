'use client';

import React, { useState, use, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, redirect, notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Lock,
  Sparkles,
  Check,
  Loader2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Edit3,
} from 'lucide-react';
import { paperSoundEngine } from '@/lib/audio/PaperSoundEngine';
import {
  getBookSpreads,
  getSpreadContent,
  type CharacterConfig,
} from '@/config/sampleBookData';
import { getProductBySlug } from '@/config/products';
import { isComingSoon } from '@/config/comingSoon';

interface Props {
  params: Promise<{ bookId: string }>;
}

function BookPreviewContent({ params }: Props) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const childName = searchParams.get('name') || 'Zayed';
  const lang = searchParams.get('lang') || 'en';
  const isAr = lang === 'ar';

  // Exclusively UAE Market (AED)
  const currencyInfo = { code: 'AED' as const, symbol: 'AED', amount: 49.0, label: '49 AED' };

  // View Mode: 'two-page' (spread) or 'one-page' (single centered page)
  const [viewMode, setViewMode] = useState<'two-page' | 'one-page'>('two-page');
  const [currentSpread, setCurrentSpread] = useState(0);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutError, setCheckoutError] = useState('');

  const bookId = resolvedParams.bookId;

  // Coming-soon products have no manuscript — their product page explains it.
  if (isComingSoon(bookId)) {
    redirect(isAr ? `/ar/books/${bookId}` : `/books/${bookId}`);
  }

  // Real spreads for THIS book — never the flagship demo for other books.
  const realSpreads = getBookSpreads(bookId);
  if (!realSpreads || realSpreads.length === 0) notFound();

  const product = getProductBySlug(bookId);
  const productTitleEn = product?.title ?? bookId;
  const productTitleAr = product?.titleAr ?? bookId;

  // Minimal character config so verse placeholders ({childName}, {gifterName}, …)
  // render in the preview. The full config is built in the create wizard.
  const genderParam = (searchParams.get('gender') || 'boy').toLowerCase();
  const coStarRoleParam = searchParams.get('coStarRole');
  const charConfig: CharacterConfig = {
    protagonist: {
      name: childName,
      gender: genderParam === 'girl' ? 'girl' : 'boy',
      skinTone: searchParams.get('skinTone') || 'olive',
      hairStyle: searchParams.get('hairStyle') || 'short-waves',
      hairColor: searchParams.get('hairColor') || 'jet-black',
      outfit: 'arabian-gold',
      outfitColor: 'desert-gold',
      glasses: searchParams.get('glasses') === 'true',
      hearingAid: searchParams.get('hearingAid') === 'true',
    },
    coStar: {
      enabled: searchParams.get('coStarEnabled') === 'true',
      role:
        coStarRoleParam === 'mom' ||
        coStarRoleParam === 'grandpa' ||
        coStarRoleParam === 'grandma'
          ? coStarRoleParam
          : 'dad',
      name: searchParams.get('coStarName') || '',
      skinTone: 'olive',
      hairStyle: 'short-waves',
      hairColor: 'jet-black',
      beardStyle: searchParams.get('coStarBeard') || 'neat-trimmed',
      glasses: false,
    },
    dedication: searchParams.get('dedicationText') || '',
    gifterName: searchParams.get('giver') || '',
    coverColor: 'desert-gold',
    coverFormat: 'hardcover',
    language: 'bilingual',
  };

  interface PreviewSpread {
    id: string;
    title: string;
    label: string;
    leftTextEn: string;
    leftTextAr: string;
    rightTextEn: string;
    rightTextAr: string;
    bgClass: string;
    accent: string;
    isCover?: boolean;
    isDedication?: boolean;
    isStory?: boolean;
    isLocked?: boolean;
  }

  // Spread 0 = front cover, spread 1 = dedication, 2+ = story spreads.
  // Show the cover, the dedication, and the first two story spreads as a
  // teaser; the rest unlocks after checkout.
  const coverSpread = realSpreads[0];
  const dedicationSpread = realSpreads[1];
  if (!coverSpread || !dedicationSpread) notFound();
  const coverContent = getSpreadContent(coverSpread, charConfig);
  const dedicationContent = getSpreadContent(dedicationSpread, charConfig);

  const spreads: PreviewSpread[] = [
    {
      id: 'cover',
      title: isAr ? 'الغلاف الأمامي' : 'Cover',
      label: isAr ? 'الغلاف' : 'Cover',
      leftTextEn: 'Personalized Keepsake Edition',
      leftTextAr: 'طبعة تذكارية مخصصة فاخرة',
      rightTextEn: coverContent.leftTitle ?? `${childName} & ${productTitleEn}`,
      rightTextAr: coverContent.rightTitle ?? `${childName} ${productTitleAr}`,
      bgClass: 'from-amber-600 via-amber-700 to-amber-900',
      accent: '✨',
      isCover: true,
    },
    {
      id: 'dedication',
      title: isAr ? 'صفحة الإهداء' : 'Dedication Page',
      label: isAr ? 'الإهداء' : 'Dedication',
      leftTextEn: dedicationContent.leftVerse,
      leftTextAr: dedicationContent.rightVerse,
      rightTextEn: '',
      rightTextAr: '',
      bgClass: 'from-stone-100 to-stone-200',
      accent: '📜',
      isDedication: true,
    },
    ...realSpreads.slice(2, 4).map(
      (s): PreviewSpread => {
        const c = getSpreadContent(s, charConfig);
        return {
          id: `story-${s.spreadNumber}`,
          title: isAr ? s.spreadTitleAr : s.spreadTitleEn,
          label: isAr ? `صفحة ${s.spreadNumber}` : `Spread ${s.spreadNumber}`,
          leftTextEn: c.leftVerse,
          leftTextAr: c.rightVerse,
          rightTextEn: c.leftTitle ?? '',
          rightTextAr: c.rightTitle ?? '',
          bgClass: 'from-stone-50 to-stone-100',
          accent: '📖',
          isStory: true,
        };
      }
    ),
    {
      id: 'locked',
      title: isAr ? 'القصة الكاملة' : 'Full Story',
      label: isAr ? 'القصة الكاملة' : 'Full Story',
      leftTextEn: `Full ${realSpreads.length}-Spread Keepsake Book Locked`,
      leftTextAr: 'باقي صفحات القصة الكاملة',
      rightTextEn: 'Unlock the full storybook & printed keepsake',
      rightTextAr: 'افتح القصة الكاملة والنسخة المطبوعة',
      bgClass: 'from-stone-100 to-stone-200',
      accent: '🔒',
      isLocked: true,
    },
  ];

  // The cast keeps noUncheckedIndexedAccess honest without changing behavior.
  const current = (spreads[currentSpread] ?? spreads[0]) as PreviewSpread;

  const playTurnSound = (direction: 'next' | 'prev' = 'next') => {
    try {
      paperSoundEngine.playTurn({ direction, isRtl: isAr });
    } catch {
      // Audio fallback
    }
  };

  const handlePrevPage = () => {
    if (currentSpread > 0) {
      playTurnSound('prev');
      setCurrentSpread(currentSpread - 1);
    }
  };

  const handleNextPage = () => {
    if (currentSpread < spreads.length - 1) {
      playTurnSound('next');
      setCurrentSpread(currentSpread + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showCheckoutModal) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (isAr) {
        if (e.key === 'ArrowLeft') handleNextPage();
        else if (e.key === 'ArrowRight') handlePrevPage();
      } else {
        if (e.key === 'ArrowRight') handleNextPage();
        else if (e.key === 'ArrowLeft') handlePrevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSpread, showCheckoutModal, isAr]);

  const handleCheckout = async () => {
    const email = checkoutEmail.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setCheckoutError(
        isAr
          ? 'يرجى إدخال بريد إلكتروني صحيح لاستلام كتابك التذكاري.'
          : 'Please enter a valid email address to receive your keepsake.'
      );
      return;
    }
    setCheckoutError('');
    setIsCheckingOut(true);
    try {
      // The server computes the amount from the catalog — we never send one.
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookSlug: resolvedParams.bookId,
          // DIGITAL-ONLY LAUNCH: the unlock flow sells the digital edition.
          format: 'digital',
          qty: 1,
          addons: {
            giftBox: false,
            coloringBook: false,
            audioKeepsake: false,
            giftWrap: false,
            stickers: false,
            photo: false,
          },
          customerName: childName,
          customerEmail: email,
          coupon: null,
        }),
      });
      const data = await res.json();
      if (res.status === 503 || data.error === 'payments_not_configured') {
        setCheckoutError(
          isAr
            ? 'وضع تجريبي — لم يتم ربط بوابة الدفع بعد. المعاينة مجانية للاستكشاف.'
            : 'Demo mode — the payment gateway is not connected yet. The preview is free to explore.'
        );
      } else if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setCheckoutError(
          isAr
            ? 'تعذر بدء عملية الدفع. يرجى المحاولة مرة أخرى لاحقاً.'
            : 'Could not start checkout. Please try again later.'
        );
      }
    } catch (e) {
      console.error('Checkout error:', e);
      setCheckoutError(
        isAr
          ? 'تعذر الاتصال ببوابة الدفع. يرجى المحاولة مرة أخرى لاحقاً.'
          : 'Could not connect to the payment gateway. Please try again later.'
      );
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div
      className="min-h-screen text-[#23231E] font-sans flex flex-col justify-between"
      style={{
        backgroundColor: '#FAF7F2',
        backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Top Navbar */}
      <header className="h-16 px-4 sm:px-8 border-b border-stone-200/80 flex items-center justify-between bg-white/95 backdrop-blur-md sticky top-0 z-20 shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            href={isAr ? '/ar/all-books' : '/all-books'}
            className="text-stone-500 hover:text-stone-900 p-2 rounded-lg hover:bg-stone-100 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="hidden sm:block">
            <h1 className="font-extrabold text-sm text-stone-900">
              {childName}&apos;s Keepsake Preview
            </h1>
            <p className="text-xs text-[#1C4D46] font-bold">
              Free 3D Preview (Spreads 1–2 Unlocked)
            </p>
          </div>
        </div>

        {/* View Switcher Pill */}
        <div className="flex items-center bg-stone-100 p-1 rounded-lg border border-stone-200 shadow-2xs">
          <button
            onClick={() => setViewMode('one-page')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer ${
              viewMode === 'one-page'
                ? 'bg-[#1C4D46] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <div className="w-3.5 h-3.5 rounded-xs border border-current bg-current/20" />
            <span className="hidden xs:inline">One-page view</span>
          </button>
          <button
            onClick={() => setViewMode('two-page')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer ${
              viewMode === 'two-page'
                ? 'bg-[#1C4D46] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <div className="flex gap-0.5">
              <div className="w-2.5 h-3.5 rounded-xs border border-current bg-current/20" />
              <div className="w-2.5 h-3.5 rounded-xs border border-current bg-current/20" />
            </div>
            <span className="hidden xs:inline">Two-page view</span>
          </button>
        </div>

        <button
          onClick={() => setShowCheckoutModal(true)}
          className="bg-[#23231E] hover:bg-black text-white font-extrabold px-5 py-2.5 rounded-lg text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer transform hover:scale-[1.02]"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Unlock Full Book ({currencyInfo.label})</span>
        </button>
      </header>

      {/* Headline */}
      <section className="text-center pt-8 pb-4 px-4">
        <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#23231E] tracking-tight">
          Personalize your book for {childName}
        </h2>
        <p className="text-xs text-stone-500 mt-1.5 font-medium">
          Experience the handcrafted storybook before ordering your heirloom print
        </p>
      </section>

      {/* 3D Skeuomorphic Flipbook Stage */}
      <main className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 max-w-6xl mx-auto w-full">
        <div className="relative w-full flex items-center justify-center">
          {/* Chevron Left */}
          <button
            disabled={currentSpread === 0}
            onClick={handlePrevPage}
            className="absolute left-0 sm:-left-6 md:-left-10 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 border border-stone-200 text-stone-700 hover:text-stone-950 hover:bg-white shadow-lg flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed transition cursor-pointer transform hover:scale-105"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Book Canvas */}
          <div className="w-full max-w-4xl transition-all duration-300">
            {viewMode === 'two-page' ? (
              /* TWO-PAGE SPREAD VIEW */
              <div className="w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] flex overflow-hidden border border-stone-300/80 bg-[#FFFDF9] relative">
                {/* Center Spine Gutter Crease Shadow */}
                <div className="absolute inset-y-0 left-1/2 -ml-6 w-12 pointer-events-none z-20 flex">
                  <div className="w-6 h-full bg-gradient-to-r from-transparent via-black/[0.04] to-black/[0.16]" />
                  <div className="w-[1px] h-full bg-stone-400/40" />
                  <div className="w-6 h-full bg-gradient-to-l from-transparent via-black/[0.04] to-black/[0.20]" />
                </div>

                {current.isCover && (
                  <div className="w-full h-full flex flex-col md:flex-row">
                    <div className="hidden md:flex flex-1 bg-stone-100 p-8 items-center justify-center border-r border-stone-200 text-center">
                      <div className="space-y-3 max-w-xs">
                        <div className="text-3xl">✨ 📖 ✨</div>
                        <h4 className="text-xs uppercase font-black tracking-widest text-stone-500">
                          Personalized Tales Keepsake
                        </h4>
                        <p className="text-[11px] text-stone-400 leading-relaxed">
                          Handcrafted with pride in the UAE. 100-year archival heirloom quality.
                        </p>
                      </div>
                    </div>
                    <div className={`flex-1 bg-gradient-to-br ${current.bgClass} text-white p-6 sm:p-10 flex flex-col justify-between items-center text-center shadow-inner`}>
                      <span className="text-[11px] uppercase tracking-widest font-black text-amber-200">
                        {current.leftTextEn}
                      </span>
                      <div className="space-y-3 my-auto">
                        <div className="text-5xl drop-shadow-md">✨ 🦅 ✨</div>
                        <h3 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white">
                          {current.rightTextEn}
                        </h3>
                        <div className="text-xl sm:text-2xl font-amiri font-bold text-amber-200" dir="rtl">
                          {current.rightTextAr}
                        </div>
                      </div>
                      <div className="text-xs text-amber-100 font-medium">
                        First Edition Keepsake • Personalized for {childName}
                      </div>
                    </div>
                  </div>
                )}

                {current.isDedication && (
                  <div className="w-full h-full flex flex-col md:flex-row bg-[#FFFDF9]">
                    <div className="flex-1 p-6 sm:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
                      <div>
                        <span className="text-[11px] font-black uppercase tracking-widest text-[#1C4D46]">
                          A Message to Keep Forever
                        </span>
                        <p className="mt-4 text-sm sm:text-base text-stone-800 font-serif leading-relaxed whitespace-pre-line italic">
                          &ldquo;{current.leftTextEn}&rdquo;
                        </p>
                      </div>
                      <div className="text-xs font-bold text-stone-600">
                        Created with love by: Mama & Baba
                      </div>
                    </div>
                    <div className="flex-1 p-6 sm:p-10 flex flex-col items-center justify-center text-center bg-stone-50/60">
                      <div className="w-36 h-36 rounded-2xl border-2 border-dashed border-stone-300 bg-white flex flex-col items-center justify-center p-4 shadow-xs">
                        <span className="text-3xl mb-1">📸</span>
                        <span className="text-xs font-bold text-stone-700">Child&apos;s Photo</span>
                        <span className="text-[10px] text-stone-400">Included on print</span>
                      </div>
                      <p className="text-[11px] text-stone-500 font-medium mt-3">
                        Printed on 150 gsm Mohawk Archival Silk Paper
                      </p>
                    </div>
                  </div>
                )}

                {current.isStory && (
                  <div className="w-full h-full flex flex-col md:flex-row bg-[#FFFDF9]">
                    <div className="flex-1 p-6 sm:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#1C4D46]">
                          English Lyrical Narrative
                        </span>
                        <p className="mt-4 text-sm sm:text-base font-serif italic text-stone-800 leading-relaxed whitespace-pre-line">
                          {current.leftTextEn}
                        </p>
                      </div>
                      <div className="text-[11px] text-stone-400 font-mono">
                        PersonalizedTales Keepsake Edition
                      </div>
                    </div>
                    <div className="flex-1 p-6 sm:p-10 flex flex-col justify-between text-right bg-stone-50/40" dir="rtl">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#1C4D46]">
                          اللغة العربية الفصحى (مع التشكيل الكامل)
                        </span>
                        <p className="mt-4 text-base sm:text-lg font-amiri font-bold text-stone-900 leading-loose whitespace-pre-line">
                          {current.leftTextAr}
                        </p>
                      </div>
                      <div className="text-[11px] text-stone-400 font-serif">
                        طبعة تذكارية مخصصة للطفل
                      </div>
                    </div>
                  </div>
                )}

                {current.isLocked && (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-stone-50">
                    <div className="w-16 h-16 rounded-2xl bg-[#1C4D46]/10 text-[#1C4D46] border border-[#1C4D46]/20 flex items-center justify-center mb-4">
                      <Lock className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-black text-[#23231E] mb-2">
                      Unlock {childName}&apos;s Entire {realSpreads.length}-Spread Story
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 max-w-md mb-6 leading-relaxed">
                      {isAr
                        ? `القصة الكاملة ثنائية اللغة، وصفحة الإهداء المخصصة، والنهاية التذكارية — مطبوعة ومجلدة خصيصاً لـ ${childName}.`
                        : `The full bilingual adventure, the personalized dedication page, and the heirloom ending — printed and bound just for ${childName}.`}
                    </p>
                    <button
                      onClick={() => setShowCheckoutModal(true)}
                      className="bg-[#23231E] hover:bg-black text-white font-black px-8 py-3.5 rounded-xl shadow-lg transition transform hover:scale-105 cursor-pointer text-sm flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Unlock Full Keepsake ({currencyInfo.label})</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ONE-PAGE VIEW */
              <div className="w-full max-w-md mx-auto aspect-square rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] overflow-hidden border border-stone-300 bg-[#FFFDF9] relative">
                <div className="absolute inset-y-0 left-0 w-8 pointer-events-none z-20 bg-gradient-to-r from-black/20 via-black/[0.05] to-transparent" />
                {current.isCover && (
                  <div className={`w-full h-full bg-gradient-to-br ${current.bgClass} text-white p-8 flex flex-col justify-between items-center text-center`}>
                    <span className="text-[10px] uppercase tracking-widest font-black text-amber-200">
                      {current.leftTextEn}
                    </span>
                    <div className="space-y-3">
                      <div className="text-5xl">✨ 🦅 ✨</div>
                      <h3 className="text-2xl font-serif font-black text-white">
                        {current.rightTextEn}
                      </h3>
                      <div className="text-xl font-amiri text-amber-200" dir="rtl">
                        {current.rightTextAr}
                      </div>
                    </div>
                    <div className="text-xs text-amber-100">
                      Personalized for {childName}
                    </div>
                  </div>
                )}
                {current.isDedication && (
                  <div className="w-full h-full p-8 flex flex-col justify-between bg-[#FFFDF9]">
                    <div>
                      <span className="text-xs font-black uppercase text-[#1C4D46]">
                        A Message to Keep Forever
                      </span>
                      <p className="mt-4 text-sm font-serif italic text-stone-800 leading-relaxed whitespace-pre-line">
                        &ldquo;{current.leftTextEn}&rdquo;
                      </p>
                    </div>
                    <div className="text-xs font-bold text-stone-600">
                      With love from Mama & Baba
                    </div>
                  </div>
                )}
                {current.isStory && (
                  <div className="w-full h-full p-8 flex flex-col justify-between bg-[#FFFDF9]">
                    <div>
                      <span className="text-xs font-black uppercase text-[#1C4D46]">
                        {current.title}
                      </span>
                      <p className="mt-4 text-sm font-serif italic text-stone-800 leading-relaxed whitespace-pre-line">
                        {current.leftTextEn}
                      </p>
                      <p className="mt-4 text-base font-amiri font-bold text-stone-900 leading-loose text-right" dir="rtl">
                        {current.leftTextAr}
                      </p>
                    </div>
                    <div className="text-[10px] text-stone-400">
                      Page {currentSpread + 1} of {spreads.length}
                    </div>
                  </div>
                )}
                {current.isLocked && (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-stone-50">
                    <Lock className="w-10 h-10 text-[#1C4D46] mb-3" />
                    <h3 className="text-lg font-serif font-bold text-stone-900 mb-2">
                      Complete Story Keepsake
                    </h3>
                    <button
                      onClick={() => setShowCheckoutModal(true)}
                      className="bg-[#23231E] text-white text-xs font-bold px-6 py-2.5 rounded-lg"
                    >
                      Unlock Full Book
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Chevron Right */}
          <button
            disabled={currentSpread === spreads.length - 1}
            onClick={handleNextPage}
            className="absolute right-0 sm:-right-6 md:-right-10 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 border border-stone-200 text-stone-700 hover:text-stone-950 hover:bg-white shadow-lg flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed transition cursor-pointer transform hover:scale-105"
            aria-label="Next Page"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Thumbnail scrubber dots */}
        <div className="flex items-center gap-2 mt-6">
          {spreads.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                playTurnSound(idx > currentSpread ? 'next' : 'prev');
                setCurrentSpread(idx);
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                currentSpread === idx
                  ? 'bg-[#1C4D46] text-white shadow-xs'
                  : 'bg-stone-200/80 hover:bg-stone-300 text-stone-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </main>

      {/* Sticky Bottom Action Bar */}
      <footer className="bg-white/95 backdrop-blur-md border-t border-stone-200 sticky bottom-0 z-30 py-3 px-4 sm:px-8 shadow-[0_-8px_25px_rgba(0,0,0,0.05)]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href={`${isAr ? '/ar/create/start' : '/create/start'}?book=${resolvedParams.bookId}&name=${encodeURIComponent(childName)}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-xs font-bold text-stone-700 transition"
            >
              <Edit3 className="w-4 h-4 text-[#1C4D46]" />
              <span>Personalize Name & Character</span>
            </Link>
            <div className="text-xs text-stone-500 hidden sm:block">
              Free 3D preview • 100% satisfaction guaranteed
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="text-right hidden xs:block">
              <div className="text-sm font-black text-stone-900">{currencyInfo.label}</div>
            </div>
            <button
              onClick={() => setShowCheckoutModal(true)}
              className="w-full sm:w-auto bg-[#23231E] hover:bg-black text-white font-extrabold px-8 py-3 rounded-xl text-sm shadow-md transition transform hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Unlock Full Book</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 p-2 cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#1C4D46]/10 text-[#1C4D46] flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-black text-stone-900">
                Unlock {childName}&apos;s Keepsake
              </h2>
              <p className="text-stone-500 text-xs mt-1">
                {isAr
                  ? 'تصلك النسخة المطبوعة التذكارية عبر التوصيل السريع'
                  : 'Your printed keepsake ships via express courier'}
              </p>
            </div>

            <div className="bg-stone-50 rounded-xl p-4 mb-6 space-y-2.5 border border-stone-200 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-stone-800">
                <Check className="w-4 h-4 text-[#1C4D46]" />
                <span>Full 3D Interactive Web Flipbook</span>
              </div>
              <div className="flex items-center gap-2 text-stone-800">
                <Check className="w-4 h-4 text-[#1C4D46]" />
                <span>
                  {isAr
                    ? 'النسخة المطبوعة التذكارية تصلك عبر التوصيل السريع'
                    : 'Printed keepsake ships via express courier'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-stone-800">
                <Check className="w-4 h-4 text-[#1C4D46]" />
                <span>Bilingual English & Arabic with Tashkeel</span>
              </div>
              <div className="flex items-center gap-2 text-stone-800">
                <Check className="w-4 h-4 text-[#1C4D46]" />
                <span>Personalized Dedication & Custom Avatar</span>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="text-3xl font-serif font-black text-stone-900">
                {currencyInfo.label}
              </div>
              <div className="text-xs text-emerald-700 font-bold mt-1">
                ✓ 100% Guaranteed Heirloom Keepsake
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="preview-checkout-email"
                className="block text-xs font-bold text-stone-700 mb-1.5 text-left"
              >
                {isAr ? 'البريد الإلكتروني لاستلام الكتاب' : 'Email to receive your book'}
              </label>
              <input
                id="preview-checkout-email"
                type="email"
                value={checkoutEmail}
                onChange={(e) => {
                  setCheckoutEmail(e.target.value);
                  if (checkoutError) setCheckoutError('');
                }}
                placeholder="you@example.com"
                dir="ltr"
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm font-medium outline-none focus:border-[#1C4D46] focus:ring-2 focus:ring-[#1C4D46]/20 text-left"
              />
              {checkoutError && (
                <p className="text-rose-600 text-xs font-bold mt-2 text-left">{checkoutError}</p>
              )}
            </div>

            <button
              disabled={isCheckingOut}
              onClick={handleCheckout}
              className="w-full bg-[#23231E] hover:bg-black disabled:opacity-50 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              {isCheckingOut ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Connecting to Gateway...</span>
                </>
              ) : (
                <>
                  <span>🍎</span> Pay with Apple Pay / Card
                </>
              )}
            </button>

            <p className="text-center text-[10px] text-stone-400 mt-4">
              {isAr
                ? '🧪 وضع تجريبي — لا يتم خصم أي مبلغ حقيقي'
                : '🧪 Demo mode — no real payment is processed.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookPreviewPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center font-bold text-[#23231E]">
          Loading preview...
        </div>
      }
    >
      <BookPreviewContent params={params} />
    </Suspense>
  );
}
