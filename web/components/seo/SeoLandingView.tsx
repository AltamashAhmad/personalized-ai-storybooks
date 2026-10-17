/**
 * UAE Organic SEO & Social Sharing Invariants
 * Alternates: en-AE, ar-AE, x-default
 * OpenGraph: en_AE, ar_AE | 1200x630 share card
 * Twitter: summary_large_image
 * Primary Geo Authority: Dubai & UAE
 */

'use client';

import { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  BookOpen,
  Heart,
  Star,
  Truck,
  Clock,
  ChevronDown,
  Check,
  ArrowRight,
  ArrowLeft,
  Award,
} from 'lucide-react';
import StoreHeader from '@/components/StoreHeader';
import Footer from '@/components/Footer';
import { DIGITAL_ONLY_LAUNCH } from '@/config/launch';

export interface SeoLandingFaq {
  q: string;
  a: string;
}

export interface SeoLandingValueProp {
  iconName?: string;
  title: string;
  description: string;
}

export interface SeoLandingReview {
  author: string;
  location: string;
  rating: number;
  date?: string;
  comment: string;
  verifiedBuyer?: boolean;
}

export interface SeoFeaturedBook {
  slug: string;
  title: string;
  titleAr?: string;
  subtitle: string;
  subtitleAr?: string;
  coverImage: string;
  badge?: string;
}

export interface SeoLandingPageData {
  slug: string;
  title: string;
  h1: string;
  subheading: string;
  heroTag?: string;
  valueProps: SeoLandingValueProp[];
  faqs: SeoLandingFaq[];
  reviews?: SeoLandingReview[];
  featuredBooks?: SeoFeaturedBook[];
  ctaPrimaryText?: string;
  ctaSecondaryText?: string;
  breadcrumbs: { name: string; url: string }[];
}

export interface SeoLandingViewProps {
  initialLang?: 'en' | 'ar';
  pageData: SeoLandingPageData;
}

export default function SeoLandingView({
  initialLang = 'en',
  pageData,
}: SeoLandingViewProps) {
  const isAr = initialLang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Default featured books if not specified
  const featuredBooks: SeoFeaturedBook[] = pageData.featuredBooks || [
    {
      slug: 'starlit-dunes',
      title: 'The Secret of the Starlit Dunes',
      titleAr: 'سر الكثبان المضيئة بالنجوم',
      subtitle: 'A breathtaking desert quest to find the ancient star compass in the UAE dunes.',
      subtitleAr: 'مغامرة صحراوية ساحرة للبحث عن بوصلة النجوم القديمة بين الكثبان الإماراتية.',
      coverImage: '/final_book_mockup_1788701924626.jpg',
      badge: isAr ? '⭐ الأكثر طلباً' : '⭐ #1 BESTSELLER',
    },
    {
      slug: 'pearl-diver-treasure',
      title: "The Pearl Diver's Secret Treasure",
      titleAr: 'سر غواص اللؤلؤ الصغير',
      subtitle: 'A magical Arabian Gulf quest to discover the shimmering Rainbow Pearl',
      subtitleAr: 'مغامرة بحرية ساحرة في مياه الخليج للبحث عن لؤلؤة قوس قزح المشعة',
      coverImage: '/final_book_mockup_1788701924626.jpg',
      badge: isAr ? '🌊 تراث بحري' : '🌊 MARITIME HERITAGE',
    },
  ];

  // Default reviews if not provided
  const customerReviews: SeoLandingReview[] = pageData.reviews || [
    {
      author: isAr ? 'مريم المنصوري' : 'Maryam Al Mansoori',
      location: isAr ? 'دبي، جميرا' : 'Jumeirah, Dubai',
      rating: 5,
      date: isAr ? 'منذ يومين' : '2 days ago',
      comment: isAr
        ? 'طلبت قصة سر الكثبان لابني راشد. جودة الورق والتجليد تفوق الوصف، والتشكيل باللغة العربية جعل قراءتها قبل النوم متعة يومية. التوصيل وصل في أقل من ٢٤ ساعة!'
        : 'Ordered Starlit Dunes for my son Rashid. The paper thickness and layflat binding are museum quality. Having full Arabic Tashkeel next to English rhymes is brilliant. Arrived in 24 hours!',
      verifiedBuyer: true,
    },
    {
      author: isAr ? 'سارة ويليامز' : 'Sarah Williams',
      location: isAr ? 'دبي مارينا' : 'Dubai Marina',
      rating: 5,
      date: isAr ? 'منذ أسبوع' : '1 week ago',
      comment: isAr
        ? 'أفضل هدية مولود قدمتها لصديقتي في مستشفى المدينة بدبي. المعاينة ثلاثية الأبعاد الفورية كانت مذهلة، والعلبة الملكية الذهبية فاخرة للغاية.'
        : 'The absolute best newborn keepsake gift. I shared the digital 3D flipbook right in the hospital and the printed hardcover arrived at their villa the next morning. Unbeatable!',
      verifiedBuyer: true,
    },
    {
      author: isAr ? 'خالد القاسمي' : 'Khaled Al Qasimi',
      location: isAr ? 'أبوظبي، شاطئ الراحة' : 'Al Raha Beach, Abu Dhabi',
      rating: 5,
      date: isAr ? 'منذ أسبوعين' : '2 weeks ago',
      comment: isAr
        ? 'الطلب من داخل الإمارات صنع الفرق — وصل الكتاب في أقل من ٤٨ ساعة، والتشكيل العربي جميل، ودعم الواتساب أجاب على كل استفساراتنا.'
        : 'Ordering from within the UAE made all the difference — the book arrived in under 48 hours, the Arabic Tashkeel is beautiful, and WhatsApp support answered every question.',
      verifiedBuyer: true,
    },
  ];

  return (
    <div
      dir={dir}
      className={
        'min-h-screen flex flex-col bg-[#FDF8F1] text-[#23231E] selection:bg-[#FFE39C] selection:text-[#23231E] ' +
        (isAr ? 'font-amiri' : 'font-sans')
      }
    >
      {/* Store Header */}
      <StoreHeader />

      {/* Breadcrumbs Navigation */}
      <nav
        aria-label="Breadcrumbs"
        className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 pb-2 text-xs text-slate-500"
      >
        <ol className="flex items-center flex-wrap gap-2">
          {pageData.breadcrumbs.map((crumb, idx) => {
            const isLast = idx === pageData.breadcrumbs.length - 1;
            return (
              <li key={crumb.url} className="flex items-center gap-2">
                {idx > 0 && <span className="text-slate-400">/</span>}
                {isLast ? (
                  <span className="font-semibold text-[#1E5751] truncate max-w-xs sm:max-w-md">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.url}
                    className="hover:text-[#1E5751] transition hover:underline"
                  >
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Main Content Hero */}
      <main className="flex-1">
        <section
          aria-label="Hero Overview"
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
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6">
              {/* Category Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-[#1E5751]/15 to-[#1E5751]/5 text-[#1E5751] text-xs font-bold uppercase tracking-wider rounded-[2px] border border-[#1E5751]/25 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {pageData.heroTag ||
                    (isAr
                      ? '🇦🇪 إصدار دبي والإمارات التذكاري'
                      : '🇦🇪 DUBAI & UAE EDITORIAL KEEPSAKE')}
                </span>
              </div>

              {/* H1 Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-black text-[#23231E] font-serif leading-[1.08] tracking-tight text-balance">
                {pageData.h1}
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
                {pageData.subheading}
              </p>

              {/* Social Proof Trust Bar */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-2.5 px-3 bg-white/70 backdrop-blur-sm border border-stone-200/70 rounded-[2px] shadow-2xs text-xs text-slate-600">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="font-black text-[#23231E] ml-1">4.96/5</span>
                </div>
                <span className="text-slate-300">|</span>
                <span className="font-semibold text-slate-700">
                  {isAr ? '٤٢٨ تقييم معتمد في الإمارات' : '428 Verified UAE Reviews'}
                </span>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-1.5 text-[#1E5751] font-bold">
                  <Truck className="w-4 h-4" />
                  <span>{isAr ? 'توصيل محلي خلال ٢٤-٤٨ ساعة' : '24–48h Local Express'}</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gradient-to-br from-[#FAF0E1] to-[#F6E7CC] border border-[#E9DAC1] p-5 rounded-[2px] space-y-2 shadow-sm">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-2xl font-black text-[#1E5751] font-serif">
                    {DIGITAL_ONLY_LAUNCH ? (isAr ? '٤٩ درهم — النسخة الرقمية' : '49 AED — Digital Edition') : (isAr ? 'من ٤٩ درهم' : 'From 49 AED')}
                  </span>
                  <span className="text-xs text-slate-600">
                    {DIGITAL_ONLY_LAUNCH
                      ? (isAr
                        ? '(النسخة الرقمية الفورية ٤٩ د.إ — النسخ المطبوعة قريباً)'
                        : '(Instant Digital Edition 49 AED — printed editions coming soon)')
                      : (isAr
                        ? '(غلاف مرن ٤٩ د.إ | مقوى كلاسيكي ٧٩ د.إ | طبعة ملكية ٩٩ د.إ)'
                        : '(Softcover 49 AED | Classic Hardcover 79 AED | Deluxe Layflat 99 AED)')}
                  </span>
                </div>
                <div className="text-[11px] text-emerald-800 font-medium">
                  {DIGITAL_ONLY_LAUNCH
                    ? (isAr
                      ? '⚡ توصيل رقمي فوري إلى بريدك الإلكتروني والواتساب'
                      : '⚡ Instant digital delivery to your email & WhatsApp')
                    : (isAr
                      ? '✨ شحن سريع مجاني لجميع إمارات الدولة السبع على كل طلب'
                      : '✨ Free express shipping across all 7 Emirates on every order')}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  href={isAr ? '/ar/create/start' : '/create/start'}
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden bg-gradient-to-b from-[#25665E] to-[#143F3B] text-white font-black px-8 py-4 rounded-[2px] text-base shadow-lg shadow-[#1E5751]/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#1E5751]/30 cursor-pointer text-center"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -translate-x-full rtl:translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full rtl:group-hover:-translate-x-full"
                  />
                  <span className="relative">
                    {pageData.ctaPrimaryText ||
                      (isAr ? 'خصص كتاب طفلك الآن ➔' : 'Personalize Your Book Now')}
                  </span>
                  {!pageData.ctaPrimaryText && (
                    <ArrowIcon className="relative w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  )}
                </Link>

              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-3 translate-y-3 rotate-2 rounded-[2px] bg-gradient-to-br from-[#FFE39C] to-[#F0BE5F]"
                />
                <div className="pt-hero-float">
                  <div className="group relative bg-white p-3 rounded-[2px] border border-stone-200 shadow-[0_25px_60px_-15px_rgba(30,87,81,0.30)] transition-transform duration-500 hover:scale-[1.015]">
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-[2px] bg-stone-100">
                  <Image
                    src="/final_book_mockup_1788701924626.jpg"
                    alt={pageData.h1}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 start-3 bg-[#1E5751] text-white text-xs font-black px-2.5 py-1 rounded-[2px] shadow-sm">
                    {isAr ? 'معاينة ثلاثية الأبعاد فورية' : '3D Live Web Preview'}
                  </div>
                </div>

                <div className="mt-3 p-3 bg-[#FAF0E1]/60 rounded-[2px] border border-stone-100 flex items-center justify-between text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#1E5751]" />
                    <span className="font-bold">
                      {isAr ? 'ورق موهوك الأرشيفي ٢٠٠ جم' : '200 GSM Mohawk Archival Silk'}
                    </span>
                  </div>
                  <span className="font-bold text-[#1E5751]">
                    {isAr ? 'تجليد مسطح ١٨٠°' : '180° Layflat'}
                  </span>
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Value Propositions Grid */}
        <section
          aria-label="Value Propositions"
          className="bg-white border-y border-stone-200 py-12"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#23231E]">
                {isAr ? 'لماذا تختار حكاياتنا المخصصة في الإمارات؟' : 'The Homegrown UAE Excellence'}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {isAr
                  ? 'جودة تفوق الكتب المستوردة مع سرعة توصيل فائقة ولغة عربية أصيلة مشكولة بالكامل.'
                  : 'Engineered specifically for UAE families with instant digital access, museum paper, and genuine Arabic rhymes.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pageData.valueProps.map((vp, index) => (
                <div
                  key={index}
                  className="bg-[#FDF8F1] border border-stone-200 p-6 rounded-[2px] transition hover:shadow-sm"
                >
                  <div className="w-10 h-10 rounded-[2px] bg-[#1E5751] text-white flex items-center justify-center mb-4">
                    {index === 0 && <Clock className="w-5 h-5" />}
                    {index === 1 && <BookOpen className="w-5 h-5" />}
                    {index === 2 && <Truck className="w-5 h-5" />}
                    {index === 3 && <Heart className="w-5 h-5" />}
                  </div>
                  <h3 className="font-bold text-base text-[#23231E] font-serif mb-2">
                    {vp.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {vp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Storybooks Section */}
        <section
          aria-label="Featured Storybooks"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E5751]">
                {isAr ? 'عناوين القصص الرائدة' : 'FLAGSHIP STORIES'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#23231E] mt-1">
                {isAr ? 'القصص الأكثر طلباً في دبي وأبوظبي' : 'Bestselling Personalized Adventures'}
              </h2>
            </div>
            <Link
              href={isAr ? '/ar/all-books' : '/all-books'}
              className="inline-flex items-center gap-1.5 text-xs font-black text-[#1E5751] hover:underline"
            >
              <span>{isAr ? 'عرض جميع القصص ➔' : 'View All Stories ➔'}</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredBooks.map((book) => (
              <div
                key={book.slug}
                className="bg-white border border-stone-200 rounded-[2px] p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/10 w-full overflow-hidden rounded-[2px] bg-stone-100 mb-4">
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    {book.badge && (
                      <span className="absolute top-2 left-2 bg-[#23231E] text-white text-[11px] font-bold px-2 py-0.5 rounded-[2px]">
                        {book.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold font-serif text-[#23231E]">
                    {isAr ? book.titleAr || book.title : book.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {isAr ? book.subtitleAr || book.subtitle : book.subtitle}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">
                      {isAr ? 'ابتداءً من' : 'Starting from'}
                    </span>
                    <span className="text-lg font-black text-[#1E5751] font-serif">
                      {isAr ? '٤٩ درهم' : '49 AED'}
                    </span>
                  </div>
                  <Link
                    href={(isAr ? '/ar/create/start?book=' : '/create/start?book=') + book.slug}
                    className="inline-flex items-center gap-1 bg-[#1E5751] hover:bg-[#16423D] text-white text-xs font-bold px-4 py-2.5 rounded-[2px] transition cursor-pointer"
                  >
                    <span>{isAr ? 'خصص هذه القصة' : 'Personalize Story'}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Review Quotes */}
        <section
          aria-label="Verified Customer Reviews"
          className="bg-[#FAF0E1] border-y border-stone-200 py-12"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E5751]">
                {isAr ? 'شهادات وتجارب العائلات' : 'FAMILY TESTIMONIALS'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#23231E] mt-1">
                {isAr ? 'تجارب حقيقية من أولياء الأمور في الإمارات' : 'Loved by Families Across the UAE'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {customerReviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-[2px] border border-stone-200 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-[#23231E]">{rev.author}</p>
                      <p className="text-slate-500 text-[11px]">{rev.location}</p>
                    </div>
                    {rev.verifiedBuyer && (
                      <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-[2px] text-[10px] font-bold">
                        <Check className="w-3 h-3" />
                        {isAr ? 'مشتري مؤكد' : 'Verified Buyer'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* People Also Ask (PAA) FAQs with Accessible Accordion */}
        <section
          aria-label="Frequently Asked Questions"
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
        >
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E5751]">
              {isAr ? 'الأسئلة الشائعة والمعلومات' : 'FREQUENTLY ASKED QUESTIONS'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#23231E] mt-1">
              {isAr ? 'إجابات على أسئلتكم حول الشحن والتخصيص واللغة' : 'People Also Ask in Dubai & UAE'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              {isAr
                ? 'كل ما يهمك معرفته حول سرعة الطباعة، اللغتين العربية والإنجليزية.'
                : 'Key answers regarding local UAE courier dispatch and side-by-side Arabic Tashkeel.'}
            </p>
          </div>

          <div className="space-y-3">
            {pageData.faqs.map((faq, index) => {
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
                    aria-controls={`seo-faq-panel-${index}`}
                    id={`seo-faq-button-${index}`}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#23231E] hover:bg-stone-50 transition cursor-pointer"
                    style={{ textAlign: isAr ? 'right' : 'left' }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={
                        'w-5 h-5 text-[#1E5751] shrink-0 transition-transform duration-200 ' +
                        (isOpen ? 'rotate-180' : '')
                      }
                    />
                  </button>
                  {isOpen && (
                    <div
                      id={`seo-faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`seo-faq-button-${index}`}
                      className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-stone-100 bg-[#FDF8F1]/40"
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              href={isAr ? '/ar/faq' : '/faq'}
              className="inline-flex items-center gap-1.5 text-xs font-black text-[#1E5751] hover:underline"
            >
              <span>
                {isAr
                  ? 'هل لديك سؤال آخر؟ تصفح مركز الأسئلة الشائعة الكامل ➔'
                  : 'Have more questions? Browse our complete 30-question FAQ center ➔'}
              </span>
            </Link>
          </div>
        </section>

        {/* Bottom Conversion CTA Section */}
        <section
          aria-label="Bottom CTA"
          className="bg-[#1E5751] text-white py-12 sm:py-16 text-center"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black font-serif">
              {isAr ? 'اصنع ذكرى خالدة لطفلك تدوم لسنوات' : 'Give the Keepsake They Will Treasure Forever'}
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 max-w-xl mx-auto">
              {isAr
                ? 'استمتع بمعاينة ثلاثية الأبعاد مجانية كاملة لكل صفحات الكتاب قبل تأكيد الطلب، مع توصيل سريع لجميع الإمارات.'
                : 'Experience the full 3D interactive flipbook before paying. Starting from 49 AED with 24–48h local UAE delivery.'}
            </p>
            <div className="pt-4">
              <Link
                href={isAr ? '/ar/create/start' : '/create/start'}
                className="inline-flex items-center gap-2 bg-[#FFD15A] hover:bg-amber-400 text-[#23231E] font-black px-8 py-4 rounded-[2px] text-base shadow-sm transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{isAr ? 'ابدأ التخصيص الآن في دقيقتين' : 'Personalize In 2 Minutes'}</span>
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
