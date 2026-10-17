'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Heart,
  Star,
  Truck,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Users,
  Check,
} from 'lucide-react';
import StoreHeader from '@/components/StoreHeader';
import Footer from '@/components/Footer';
import { SEOName, TOP_UAE_CHILD_NAMES } from '@/lib/seo/taxonomy';
import { getProductBySlug } from '@/config/products';

export interface NameHubViewProps {
  initialLang?: 'en' | 'ar';
  nameData: SEOName;
}

export default function NameHubView({
  initialLang = 'en',
  nameData,
}: NameHubViewProps) {
  const isAr = initialLang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const displayName = isAr ? nameData.nameAr : nameData.nameEn;
  const meaning = isAr ? nameData.meaningAr : nameData.meaningEn;
  const suggestedSlug = nameData.suggestedBookSlug || 'starlit-dunes';
  const matchedBook = getProductBySlug(suggestedSlug);
  const bookTitle = isAr
    ? matchedBook?.titleAr || 'سر الكثبان المضيئة بالنجوم'
    : matchedBook?.title || 'The Secret of the Starlit Dunes';
  const bookSubtitle = isAr
    ? matchedBook?.subtitleAr || 'مغامرة صحراوية ساحرة للبحث عن بوصلة النجوم'
    : matchedBook?.subtitle || 'A breathtaking desert quest to find the ancient star compass';

  // Sibling cross-links resolved against TOP_UAE_CHILD_NAMES
  const siblingSlugs = nameData.siblingSlugs || ['zayed', 'fatima', 'rashid', 'hamdan', 'maryam'];
  const siblingNames = siblingSlugs
    .map((s) => TOP_UAE_CHILD_NAMES.find((n) => n.slug === s))
    .filter(Boolean) as SEOName[];

  // Dynamic FAQs tailored to child name
  const nameFaqs = [
    {
      q: isAr
        ? `كيف يُدمج اسم ${nameData.nameAr} في القصة المخصصة؟`
        : `How is ${nameData.nameEn}'s name integrated into the story?`,
      a: isAr
        ? `يتم نسج اسم ${nameData.nameAr} كبطل رئيسي في حبكة القصة الشعرية، حيث يُطبع الاسم على الغلاف الأمامي، وصفحة الإهداء العائلي، وعلى صفحات المغامرة باللغتين العربية الفصحى المشكولة والإنجليزية.`
        : `${nameData.nameEn} is woven as the brave hero throughout the rhyming narrative. Their name appears prominently on the front cover, on the dedication page, and within every bilingual page spread.`,
    },
    {
      q: isAr
        ? `هل يمكنني معاينة كتاب ${nameData.nameAr} قبل الشراء؟`
        : `Can I preview ${nameData.nameEn}'s book before ordering?`,
      a: isAr
        ? `نعم! يوفر القارئ التفاعلي ثلاثي الأبعاد معاينة مجانية كاملة لجميع صفحات القصة مع اسم ومظهر ${nameData.nameAr}، لتتأكد من كل كلمة قبل إتمام الطلب.`
        : `Yes! Our live 3D virtual flipbook lets you preview every single spread of ${nameData.nameEn}'s personalized story in your browser for free before making any purchase.`,
    },
    {
      q: isAr
        ? `هل تتضمن القصة اللغتين العربية والإنجليزية مع التشكيل؟`
        : `Does ${nameData.nameEn}'s book include both Arabic and English text?`,
      a: isAr
        ? `نعم، صُممت كل صفحة بنظام متقابل: أبيات شعرية إنجليزية عذبة تقابلها فصحى عربية مشكولة بالكامل بالحركات (التشكيل)، مما يدعم ثقة ${nameData.nameAr} اللغوية وهويته.`
        : `Yes, each spread features side-by-side bilingual storytelling: poetic English verses matched with Modern Standard Arabic featuring complete Tashkeel vowel markings.`,
    },
    {
      q: isAr
        ? `كم يستغرق توصيل قصة ${nameData.nameAr} في دبي والإمارات؟`
        : `How fast is delivery for ${nameData.nameEn}'s book in Dubai & UAE?`,
      a: isAr
        ? `النسخة الرقمية التفاعلية تصبح جاهزة خلال ٥ دقائق عبر الواتساب والبريد الإلكتروني، والنسخة المطبوعة الفاخرة تصل إلى باب منزلك في دبي وكافة الإمارات خلال ٢٤ إلى ٤٨ ساعة.`
        : `The digital 3D flipbook is ready in 5 minutes via private link and WhatsApp. Physical heirloom hardcovers are printed locally and delivered across all 7 Emirates within 24 to 48 hours.`,
    },
  ];

  const primaryCtaUrl = `${
    isAr ? '/ar/create/start' : '/create/start'
  }?book=${suggestedSlug}&name=${encodeURIComponent(
    isAr ? nameData.nameAr : nameData.nameEn
  )}&gender=${nameData.gender}`;

  return (
    <div
      dir={dir}
      className={`min-h-screen flex flex-col bg-[#FDF8F1] text-[#23231E] selection:bg-[#FFE39C] selection:text-[#23231E] ${
        isAr ? 'font-amiri' : 'font-sans'
      }`}
    >
      {/* Store Header */}
      <StoreHeader />

      {/* Breadcrumbs Navigation */}
      <nav
        aria-label="Breadcrumbs"
        className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 pb-2 text-xs text-slate-500"
      >
        <ol className="flex items-center flex-wrap gap-2">
          <li>
            <Link
              href={isAr ? '/ar' : '/'}
              className="hover:text-[#1E5751] transition hover:underline"
            >
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-400">/</li>
          <li>
            <Link
              href={isAr ? '/ar/all-books' : '/all-books'}
              className="hover:text-[#1E5751] transition hover:underline"
            >
              {isAr ? 'القصص المخصصة' : 'Personalized Books'}
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-400">/</li>
          <li className="font-semibold text-[#1E5751]">
            {isAr ? `قصة باسم ${nameData.nameAr}` : `For ${nameData.nameEn}`}
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <section
          aria-label="Child Name Hero"
          className="relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16"
        >
          <style>{`
            @keyframes pt-hero-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
            @keyframes pt-hero-drift { 0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: .45; } 50% { transform: translate3d(16px, -20px, 0) scale(1.15); opacity: .85; } }
            @keyframes pt-hero-twinkle { 0%, 100% { opacity: .2; transform: scale(.8); } 50% { opacity: .9; transform: scale(1.15); } }
            .pt-hero-float { animation: pt-hero-float 7s ease-in-out infinite; }
            .pt-hero-drift { animation: pt-hero-drift 9s ease-in-out infinite; }
            .pt-hero-twinkle { animation: pt-hero-twinkle 3.5s ease-in-out infinite; }
            @media (prefers-reduced-motion: reduce) {
              .pt-hero-float, .pt-hero-drift, .pt-hero-twinkle { animation: none !important; }
            }
          `}</style>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="pt-hero-drift absolute -top-16 start-16 h-64 w-64 rounded-full bg-amber-300/25 blur-3xl" />
            <div className="pt-hero-drift absolute bottom-0 end-10 h-72 w-72 rounded-full bg-[#1E5751]/10 blur-3xl" style={{ animationDelay: '-4.5s' }} />
            <Sparkles className="pt-hero-twinkle absolute top-10 end-[18%] w-4 h-4 text-amber-400/70" />
            <Sparkles className="pt-hero-twinkle absolute bottom-12 start-[42%] w-3 h-3 text-[#1E5751]/40" style={{ animationDelay: '-1.8s' }} />
          </div>
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Name & Value */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-[#1E5751]/15 to-[#1E5751]/5 text-[#1E5751] text-xs font-bold uppercase tracking-wider rounded-[2px] border border-[#1E5751]/25 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {isAr
                    ? `إصدار خاص بالاسم: ${nameData.nameAr}`
                    : `NAME EDITION: FOR ${nameData.nameEn.toUpperCase()}`}
                </span>
              </div>

              {/* Dynamic H1 */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-black text-[#23231E] font-serif leading-[1.08] tracking-tight text-balance">
                {isAr
                  ? `قصة أطفال مخصصة باسم ${nameData.nameAr} — بطل المغامرة الساحرة في دبي`
                  : `Personalized Storybook for ${nameData.nameEn} — Star of Their Own Dubai Adventure`}
              </h1>

              {/* Name Meaning Card */}
              <div className="p-5 bg-white/90 backdrop-blur-sm border border-stone-200 rounded-[2px] shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1E5751] uppercase tracking-wider">
                  <Heart className="w-3.5 h-3.5" />
                  <span>{isAr ? 'معنى الاسم والأصل' : 'Name Origin & Meaning'}</span>
                </div>
                <p className="text-sm text-slate-800 font-medium">
                  <span className="font-bold text-[#23231E] text-base">{displayName}: </span>
                  {meaning}
                </p>
                <div className="text-[11px] text-slate-500">
                  {isAr
                    ? `الأصل: ${
                        nameData.origin === 'emirati'
                          ? 'إماراتي أصيل'
                          : nameData.origin === 'arab'
                          ? 'عربي عريق'
                          : 'عالمي'
                      } | الفئة: ${nameData.gender === 'boy' ? 'للأولاد' : 'للبنات'}`
                    : `Origin: ${nameData.origin.toUpperCase()} | Gender: ${nameData.gender.toUpperCase()}`}
                </div>
              </div>

              {/* Trust & Rating Bar */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-2.5 px-3 bg-white/70 backdrop-blur-sm border border-stone-200/70 rounded-[2px] shadow-2xs text-xs text-slate-600">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="font-black text-[#23231E] ml-1">4.96/5</span>
                </div>
                <span className="text-slate-300">|</span>
                <span className="font-semibold text-slate-700">
                  {isAr ? '٤٢٨ تقييم معتمد' : '428 Verified Reviews'}
                </span>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-1.5 text-[#1E5751] font-bold">
                  <Truck className="w-4 h-4" />
                  <span>{isAr ? 'توصيل ٢٤-٤٨ ساعة' : '24–48h UAE Delivery'}</span>
                </div>
              </div>

              {/* Pricing Box */}
              <div className="bg-gradient-to-br from-[#FAF0E1] to-[#F6E7CC] border border-[#E9DAC1] p-5 rounded-[2px] space-y-2 shadow-sm">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-2xl font-black text-[#1E5751] font-serif">
                    {isAr ? 'من ٤٩ درهم' : 'From 49 AED'}
                  </span>
                  <span className="text-xs text-slate-600">
                    {isAr
                      ? '(غلاف مرن ٤٩ د.إ | مقوى كلاسيكي ٧٩ د.إ | طبعة ملكية ٩٩ د.إ)'
                      : '(Softcover 49 AED | Classic Hardcover 79 AED | Deluxe Layflat 99 AED)'}
                  </span>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  href={primaryCtaUrl}
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden bg-gradient-to-b from-[#25665E] to-[#143F3B] text-white font-black px-8 py-4 rounded-[2px] text-base shadow-lg shadow-[#1E5751]/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#1E5751]/30 cursor-pointer text-center"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -translate-x-full rtl:translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full rtl:group-hover:-translate-x-full"
                  />
                  <span className="relative">
                    {isAr
                      ? `خصص قصة ${nameData.nameAr} الآن ➔`
                      : `Personalize For ${nameData.nameEn} ➔`}
                  </span>
                </Link>

              </div>
            </div>

            {/* Right Column: Book Visual Preview */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-3 translate-y-3 rotate-2 rounded-[2px] bg-gradient-to-br from-[#FFE39C] to-[#F0BE5F]"
                />
                <div className="pt-hero-float">
                  <div className="group relative bg-white p-4 rounded-[2px] border border-stone-200 shadow-[0_25px_60px_-15px_rgba(30,87,81,0.30)] transition-transform duration-500 hover:scale-[1.015] space-y-4">
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-[2px] bg-stone-100">
                  <Image
                    src={
                      matchedBook?.coverImage ||
                      '/final_book_mockup_1788701924626.jpg'
                    }
                    alt={bookTitle}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 start-3 bg-[#1E5751] text-white text-xs font-black px-2.5 py-1 rounded-[2px]">
                    {isAr ? 'قصة مقترحة' : 'RECOMMENDED ADVENTURE'}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg font-serif text-[#23231E]">
                    {bookTitle}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">{bookSubtitle}</p>
                </div>

                {/* Sample Tashkeel Verses Starring Child */}
                <div className="p-3 bg-[#FDF8F1] border border-amber-200/60 rounded-[2px] space-y-1.5">
                  <span className="text-[11px] font-bold text-[#1E5751] uppercase tracking-wider block">
                    {isAr
                      ? 'مقتطف من أبيات القصة المشكولة:'
                      : 'Sample Rhyming Verses from the Book:'}
                  </span>
                  {(isAr ? nameData.sampleVersesAr : nameData.sampleVersesEn)?.map(
                    (verse, idx) => (
                      <p
                        key={idx}
                        className="text-xs sm:text-sm font-semibold text-slate-800 italic leading-relaxed"
                      >
                        &ldquo;{verse}&rdquo;
                      </p>
                    )
                  )}
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dedication Spread Preview Section */}
        <section
          aria-label="Dedication Spread"
          className="bg-white border-y border-stone-200 py-12"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E5751]">
              {isAr ? 'صفحة الإهداء العائلي الأولى' : 'THE OPENING DEDICATION PAGE'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#23231E]">
              {isAr
                ? `إهداء مخصص من القلب إلى ${nameData.nameAr}`
                : `A Heartfelt Keepsake Dedication for ${nameData.nameEn}`}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              {isAr
                ? 'تُطبع كلماتكم ورسائل محبتكم في الصفحة الأولى من الكتاب لتظل تذكاراً يقرأه طفلكم طوال حياته.'
                : 'Your loving words printed permanently on page one, creating a treasured family heirloom for generations.'}
            </p>

            <div className="mt-6 p-6 sm:p-8 bg-[#FDF8F1] border border-stone-200 rounded-[2px] max-w-2xl mx-auto text-center shadow-xs">
              <div className="font-serif italic text-base sm:text-lg text-slate-800 leading-relaxed">
                &ldquo;
                {isAr
                  ? nameData.dedicationSampleAr ||
                    `إلى حبيبنا ${nameData.nameAr}، نرجو لك عمراً مليئاً بالحكمة والشجاعة والسعادة. بكل الحب، ماما وبابا.`
                  : nameData.dedicationSampleEn ||
                    `To our dearest ${nameData.nameEn}, may you always follow your dreams with courage, kindness, and love. Forever and always, Mama & Baba.`}
                &rdquo;
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200/60 text-xs font-bold text-[#1E5751]">
                {isAr ? 'طُبعت بحب في دولة الإمارات العربية المتحدة' : 'Printed with love in the UAE'}
              </div>
            </div>
          </div>
        </section>

        {/* 3 Cover Formats Comparison */}
        <section
          aria-label="Cover Formats"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E5751]">
              {isAr ? 'خيارات التجليد والطباعة' : 'COVER FORMATS'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#23231E] mt-1">
              {isAr ? 'اختر التجليد المناسب لقصتك' : 'Choose Your Heirloom Finish'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Softcover */}
            <div className="bg-white p-6 rounded-[2px] border border-stone-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">
                  {isAr ? 'الغلاف المرن' : 'Softcover'}
                </span>
                <div className="mt-2 text-2xl font-black font-serif text-[#1E5751]">
                  {isAr ? '٤٩ درهم' : '49 AED'}
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  {isAr
                    ? 'مثالي للقراءة اليومية الخفيفة للأيدي الصغيرة.'
                    : 'Lightweight and durable, ideal for bedtime story sessions.'}
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#1E5751]" />
                    <span>{isAr ? 'ورق موهوك الحريري ٢٠٠ جم' : '200 GSM Mohawk Silk'}</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#1E5751]" />
                    <span>{isAr ? 'معاينة ثلاثية الأبعاد فورية' : 'Instant 3D Flipbook'}</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100">
                <Link
                  href={primaryCtaUrl}
                  className="block text-center w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-[#23231E] font-bold text-xs rounded-[2px] transition"
                >
                  {isAr ? 'اختر الغلاف المرن' : 'Select Softcover'}
                </Link>
              </div>
            </div>

            {/* Classic Hardcover */}
            <div className="bg-white p-6 rounded-[2px] border-2 border-[#1E5751] shadow-sm flex flex-col justify-between relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1E5751] text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-[2px]">
                {isAr ? 'الأكثر طلباً' : 'MOST POPULAR'}
              </span>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">
                  {isAr ? 'المقوى الكلاسيكي' : 'Classic Hardcover'}
                </span>
                <div className="mt-2 text-2xl font-black font-serif text-[#1E5751]">
                  {isAr ? '٧٩ درهم' : '79 AED'}
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  {isAr
                    ? 'غلاف مقوى فاخر يدوم لعقود، الخيار الأمثل للهدايا.'
                    : 'Sturdy hardcover casebound format, the quintessential keepsake gift.'}
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#1E5751]" />
                    <span>{isAr ? 'تجليد مقوى مدعم PUR' : 'PUR-reinforced binding'}</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#1E5751]" />
                    <span>{isAr ? 'أحبار خالية من المواد السامة' : 'Child-safe vegetable inks'}</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100">
                <Link
                  href={primaryCtaUrl}
                  className="block text-center w-full py-2.5 px-4 bg-[#1E5751] hover:bg-[#16423D] text-white font-bold text-xs rounded-[2px] transition"
                >
                  {isAr ? 'اختر المقوى الكلاسيكي' : 'Select Hardcover'}
                </Link>
              </div>
            </div>

            {/* Deluxe Layflat */}
            <div className="bg-white p-6 rounded-[2px] border border-stone-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">
                  {isAr ? 'الطبعة الملكية المسطحة' : 'Deluxe Layflat'}
                </span>
                <div className="mt-2 text-2xl font-black font-serif text-[#1E5751]">
                  {isAr ? '٩٩ درهم' : '99 AED'}
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  {isAr
                    ? 'صفحات تنفتح ١٨٠ درجة بشكل مسطح تام، متعة بصرية مذهلة.'
                    : '180° flat seamless double-page panoramic spreads without seam cuts.'}
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#1E5751]" />
                    <span>{isAr ? 'انفتاح مسطح ١٨٠° بالكامل' : 'True 180° seamless layflat'}</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#1E5751]" />
                    <span>{isAr ? 'صندوق هدايا بالختم الذهبي' : 'Gold foil gift box packaging'}</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100">
                <Link
                  href={primaryCtaUrl}
                  className="block text-center w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-[#23231E] font-bold text-xs rounded-[2px] transition"
                >
                  {isAr ? 'اختر الطبعة الملكية' : 'Select Layflat'}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Sibling Name Discovery Chips */}
        {siblingNames.length > 0 && (
          <section
            aria-label="Sibling Names"
            className="bg-[#FAF0E1] border-y border-stone-200 py-10"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E5751] mb-2">
                <Users className="w-4 h-4" />
                <span>{isAr ? 'استكشف قصص الإخوة والأصدقاء' : 'EXPLORE SIBLING & POPULAR NAMES'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#23231E] mb-6">
                {isAr
                  ? `هل تبحث عن قصة لأخ أو أخت ${nameData.nameAr}؟`
                  : `Looking for a book for ${nameData.nameEn}'s siblings?`}
              </h2>

              <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto">
                {siblingNames.map((sibling) => (
                  <Link
                    key={sibling.slug}
                    href={
                      isAr
                        ? `/ar/personalized-books/for-${sibling.slug}`
                        : `/personalized-books/for-${sibling.slug}`
                    }
                    className="inline-flex items-center gap-1.5 bg-white hover:bg-stone-50 border border-stone-300 text-xs font-bold px-4 py-2 rounded-[2px] text-[#23231E] shadow-2xs hover:border-[#1E5751] transition"
                  >
                    <span>{isAr ? sibling.nameAr : sibling.nameEn}</span>
                    <span className="text-slate-400 text-[10px]">
                      ({isAr ? sibling.gender === 'boy' ? 'ولد' : 'بنت' : sibling.gender})
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PAA FAQs Accordion */}
        <section
          aria-label="Name FAQs"
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#23231E]">
              {isAr
                ? `أسئلة شائعة حول تخصيص قصة ${nameData.nameAr}`
                : `Frequently Asked Questions for ${nameData.nameEn}'s Book`}
            </h2>
          </div>

          <div className="space-y-3">
            {nameFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-stone-200 bg-white rounded-[2px] overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={`name-faq-panel-${index}`}
                    id={`name-faq-button-${index}`}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#23231E] hover:bg-stone-50 transition cursor-pointer"
                    style={{ textAlign: isAr ? 'right' : 'left' }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`w-5 h-5 text-[#1E5751] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div
                      id={`name-faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`name-faq-button-${index}`}
                      className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-stone-100 bg-[#FDF8F1]/40"
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section
          aria-label="Bottom CTA"
          className="bg-[#1E5751] text-white py-12 sm:py-16 text-center"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black font-serif">
              {isAr
                ? `اجعل ${nameData.nameAr} بطل قصته الخاصة الآن`
                : `Make ${nameData.nameEn} the Hero of Their Own Story Today`}
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 max-w-xl mx-auto">
              {isAr
                ? 'معاينة افتراضية ثلاثية الأبعاد فورية لجميع الصفحات مجاناً، وتوصيل سريع لكافة إمارات الدولة.'
                : 'Instant 3D live virtual flipbook preview. Starting at 49 AED with local 24–48h express delivery.'}
            </p>
            <div className="pt-4">
              <Link
                href={primaryCtaUrl}
                className="inline-flex items-center gap-2 bg-[#FFD15A] hover:bg-amber-400 text-[#23231E] font-black px-8 py-4 rounded-[2px] text-base shadow-sm transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>
                  {isAr
                    ? `ابدأ تخصيص كتاب ${nameData.nameAr}`
                    : `Personalize Book for ${nameData.nameEn}`}
                </span>
                <ArrowIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer initialLang={initialLang} />
    </div>
  );
}
