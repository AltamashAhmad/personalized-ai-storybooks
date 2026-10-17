import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Sparkles, BookOpen, ShieldCheck, Heart, Star } from 'lucide-react';
import ProductDetailView from '@/components/ProductDetailView';
import ComingSoonProductView from '@/components/ComingSoonProductView';
import StoreHeader from '@/components/StoreHeader';
import { PRODUCTS, getProductBySlug } from '@/config/products';
import { isComingSoon } from '@/config/comingSoon';
import { GULF_AND_GLOBAL_NAMES, SEO_OCCASIONS } from '@/lib/seo/taxonomy';

interface Props {
  params: Promise<{ slug: string }>;
}

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://personalizedtales.com').replace(/\/+$/, '');

/**
 * Serialize JSON-LD safely for <script> embedding: escape <, >, & so a
 * slug-derived string can never break out of the script tag (reflected XSS).
 */
function toSafeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

// Category-style slugs this route intentionally serves (mirrors generateStaticParams).
const BOOK_CATEGORY_SLUGS = new Set([
  'personalized-books-for-kids',
  'personalized-books-for-babies',
  'personalized-books-for-toddlers',
  'personalized-books-for-twins',
  'bilingual-arabic-english-storybook',
]);

/**
 * Slugs this route intentionally serves: products, occasions, programmatic
 * name pages (personalized-book-for-*) and category aliases. Anything else
 * 404s instead of rendering a generic thin-content page.
 */
function isKnownBookSlug(slug: string): boolean {
  if (getProductBySlug(slug)) return true;
  if (SEO_OCCASIONS.some((o) => o.slug === slug)) return true;
  if (slug.startsWith('personalized-book-for-')) return true;
  return BOOK_CATEGORY_SLUGS.has(slug);
}

export async function generateStaticParams() {
  const productParams = PRODUCTS.map((p) => ({
    slug: p.slug,
  }));

  const nameParams = GULF_AND_GLOBAL_NAMES.map((item) => ({
    slug: `personalized-book-for-${item.slug}`,
  }));

  const occasionParams = SEO_OCCASIONS.map((item) => ({
    slug: item.slug,
  }));

  const categoryParams = [
    { slug: 'personalized-books-for-kids' },
    { slug: 'personalized-books-for-babies' },
    { slug: 'personalized-books-for-toddlers' },
    { slug: 'personalized-books-for-twins' },
    { slug: 'bilingual-arabic-english-storybook' },
  ];

  return [...productParams, ...nameParams, ...occasionParams, ...categoryParams];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isKnownBookSlug(slug) || slug === 'personalized-book-for-') notFound();
  const matchedProduct = getProductBySlug(slug);

  if (matchedProduct) {
    const coverUrl = matchedProduct.coverImage.startsWith('http')
      ? matchedProduct.coverImage
      : `${siteUrl}${matchedProduct.coverImage}`;
    const comingSoon = isComingSoon(slug);
    const title = comingSoon
      ? `${matchedProduct.titleAr} — قريباً | حكايات مخصصة`
      : `${matchedProduct.titleAr} | كتاب وقصة مخصصة للأطفال بالاسم`;
    const description = comingSoon
      ? `${matchedProduct.subtitleAr} هذه القصة قيد الرسم وستتوفر قريباً.`
      : `${matchedProduct.subtitleAr}. اصنع كتاباً تذكارياً فاخراً ومخصصاً لطفلك بالاسم والصورة. معاينة ثلاثية الأبعاد وتوصيل سريع في الإمارات.`;
    return {
      title,
      description,
      alternates: {
        canonical: `${siteUrl}/ar/books/${slug}`,
        languages: {
          'en-AE': `${siteUrl}/books/${slug}`,
          'ar-AE': `${siteUrl}/ar/books/${slug}`,
          'x-default': `${siteUrl}/books/${slug}`,
        },
      },
      openGraph: {
        title,
        description,
        url: `${siteUrl}/ar/books/${slug}`,
        siteName: 'حكايات مخصصة',
        locale: 'ar_AE',
        alternateLocale: ['en_AE'],
        type: 'website',
        images: [
          {
            url: coverUrl,
            width: 1200,
            height: 630,
            alt: matchedProduct.titleAr,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [coverUrl],
      },
    };
  }

  let title = `قصص وكتب أطفال مخصصة بالاسم | حكايات مخصصة الإمارات`;
  let description = `اصنع كتاباً تذكارياً فريداً من نوعه يخلد اسم طفلك بطلاً لقصته. معاينة افتراضية ثلاثية الأبعاد فورية + ملف طباعة فائق الجودة.`;

  const matchedOccasion = SEO_OCCASIONS.find((o) => o.slug === slug);

  if (matchedOccasion) {
    title = `${matchedOccasion.titleAr} | قصة أطفال مخصصة بالاسم | حكايات مخصصة`;
    description = matchedOccasion.descriptionAr;
  } else if (slug.includes('personalized-book-for-')) {
    const nameSlugKey = slug.replace('personalized-book-for-', '').toLowerCase();
    const matchedName = GULF_AND_GLOBAL_NAMES.find((n) => n.slug === nameSlugKey);
    const rawName = nameSlugKey.replace(/-/g, ' ');
    const nameAr = matchedName ? matchedName.nameAr : rawName;
    title = `قصة أطفال مخصصة باسم ${nameAr} | هدايا مواليد وتذكارات فاخرة في الإمارات`;
    description = `اجعل ${nameAr} بطلاً لمغامرته الصحراوية الخالدة! تصفح المعاينة التفاعلية ثلاثية الأبعاد مجاناً الآن. كتاب تذكاري مطبوع باللغتين العربية والإنجليزية.`;
  } else if (slug.includes('twins') || slug.includes('siblings')) {
    title = `قصة أطفال مخصصة لتوأم وإخوة | حكايات مخصصة`;
    description = `الكتاب التذكاري الأمثل الذي يجمع أخوين أو توأمين في نفس القصة والمغامرة. معاينة ثلاثية الأبعاد مجاناً.`;
  } else if (slug.includes('babies') || slug.includes('baby')) {
    title = `كتب وهدايا مواليد مخصصة بالاسم | تذكارات فاخرة في الإمارات`;
    description = `احتفل بلحظات مولودك الأولى عبر كتاب تذكاري فاخر بالاسم والصورة. هدية تدوم للأجيال.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/ar/books/${slug}`,
      languages: {
        'en-AE': `${siteUrl}/books/${slug}`,
        'ar-AE': `${siteUrl}/ar/books/${slug}`,
        'x-default': `${siteUrl}/books/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/ar/books/${slug}`,
      siteName: 'حكايات مخصصة',
      locale: 'ar_AE',
      alternateLocale: ['en_AE'],
      type: 'website',
      images: [
        {
          url: `${siteUrl}/final_book_mockup_1788701924626.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/final_book_mockup_1788701924626.jpg`],
    },
  };
}

export default async function ArabicBookSlugPage({ params }: Props) {
  const { slug } = await params;
  if (!isKnownBookSlug(slug) || slug === 'personalized-book-for-') notFound();
  const matchedProduct = getProductBySlug(slug);
  const matchedOccasion = SEO_OCCASIONS.find((o) => o.slug === slug);
  const isNameSlug = slug.startsWith('personalized-book-for-');
  const nameKey = isNameSlug ? slug.replace('personalized-book-for-', '').toLowerCase() : '';
  const matchedName = GULF_AND_GLOBAL_NAMES.find((n) => n.slug === nameKey);

  const childName = matchedName
    ? matchedName.nameAr
    : isNameSlug
    ? slug
        .replace('personalized-book-for-', '')
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : 'طفلك';

  if (matchedProduct) {
    // Products with no dedicated manuscript yet get an honest "Coming Soon"
    // page instead of silently serving another book's story (see
    // web/config/comingSoon.ts). The URL keeps its SEO value (200).
    if (isComingSoon(slug)) {
      const comingSoonSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': matchedProduct.titleAr,
        'image': matchedProduct.coverImage,
        'description': matchedProduct.subtitleAr,
        'inLanguage': 'ar',
        'brand': { '@type': 'Brand', 'name': 'حكايات مخصصة' },
      };

      return (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: toSafeJsonLd(comingSoonSchema) }}
          />
          <ComingSoonProductView product={matchedProduct} initialLang="ar" />
        </>
      );
    }

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': matchedProduct.titleAr,
      'image': matchedProduct.coverImage,
      'description': matchedProduct.subtitleAr,
      'inLanguage': 'ar',
      'brand': { '@type': 'Brand', 'name': 'حكايات مخصصة' },
      'offers': {
        '@type': 'Offer',
        'priceCurrency': 'AED',
        'price': '49.00',
        'availability': 'https://schema.org/InStock',
      },
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toSafeJsonLd(productSchema) }}
        />
        <ProductDetailView product={matchedProduct} initialLang="ar" />
      </>
    );
  }


  // Programmatic Name & Occasion View
  const schemaJSON = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': `قصة أطفال مخصصة باسم ${childName}`,
    'inLanguage': 'ar',
    'brand': { '@type': 'Brand', 'name': 'حكايات مخصصة' },
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'AED',
      'price': '49.00',
    },
  };

  return (
    <main className="min-h-screen bg-[#FDF8F1] font-sans text-slate-900" dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toSafeJsonLd(schemaJSON) }}
      />
      <StoreHeader />

      {/* Hero */}
      <section className="py-16 md:py-24 px-4 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] border border-[#1E5751]/20 text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#1E5751]" />
          <span>قِصَّةٌ تِذْكَارِيَّةٌ مَلَكِيَّةٌ مُخَصَّصَةٌ لِلْأَطْفَالِ</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6 font-serif">
          {matchedOccasion ? (
            <>
              {matchedOccasion.titleAr}
              <span className="block text-xl md:text-2xl text-slate-500 mt-3 font-sans" dir="ltr">
                {matchedOccasion.titleEn}
              </span>
            </>
          ) : (
            <>
              اِجْعَلْ <span className="text-[#1E5751] underline decoration-[#1E5751]/40">{childName}</span> بَطَلَ مُغَامَرَتِهِ الْخَاصَّةِ الْخَالِدَةِ
            </>
          )}
        </h1>

        <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto mb-6 leading-relaxed font-medium">
          {matchedOccasion
            ? matchedOccasion.descriptionAr
            : `حَوِّلْ وَقْتَ النَّوْمِ إِلَى مُغَامَرَةٍ لَا تُنْسَى. كِتَابٌ تِذْكَارِيٌّ مُصَمَّمٌ خِصِّيصاً بِاسْمِ وَمَلَامِحِ ${childName} مَعَ رِسَالَةِ إِهْدَاءٍ شَخْصِيَّةٍ وَشِعْرٍ عَرَبِيٍّ فَصِيحٍ بِالتَّشْكِيلِ الْكَامِلِ.`}
        </p>

        {matchedName && (
          <div className="inline-block bg-white border border-amber-900/10 rounded-[2px] px-5 py-3 text-xs text-slate-800 mb-8 max-w-lg shadow-sm">
            <span className="font-bold font-serif text-sm text-[#1E5751]">{matchedName.nameAr}: </span>
            <span>&ldquo;{matchedName.meaningAr}&rdquo;</span>
            <span className="mx-2 text-slate-300">•</span>
            <span dir="ltr" className="text-slate-600 font-semibold font-sans">{matchedName.nameEn}: {matchedName.meaningEn}</span>
          </div>
        )}

        {/* Pricing Banner */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-[2px] bg-white border border-[#1E5751]/20 shadow-sm mb-8 text-xs">
          <span className="font-black text-slate-900">يَبْدَأُ مِنْ ٤٩ د.إ</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href={`/ar/create?name=${encodeURIComponent(childName !== 'طفلك' ? childName : '')}&book=${slug}`}
            className="w-full sm:w-auto bg-[#1E5751] hover:bg-[#16433e] text-white font-black text-lg px-8 py-4 rounded-[2px] shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            اِبْدَأْ تَصْمِيمَ كِتَابِ {childName} مَجَّاناً ➔
          </Link>
          <Link
            href={`/preview/${matchedProduct?.slug ?? 'starlit-dunes'}?name=${encodeURIComponent(childName)}&lang=ar`}
            className="w-full sm:w-auto bg-white hover:bg-amber-50/50 text-slate-800 font-bold text-lg px-8 py-4 rounded-[2px] border border-amber-900/15 shadow-sm transition"
          >
            شَاهِدِ الْمُعَايَنَةَ ثُلَاثِيَّةَ الْأَبْعَادِ
          </Link>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right max-w-4xl mx-auto mt-12">
          <div className="p-6 rounded-[2px] bg-white border border-amber-900/10 shadow-sm">
            <div className="w-10 h-10 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2 font-serif">قَارِئٌ ثُلَاثِيُّ الْأَبْعَادِ تَفَاعُلِيٌّ</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              اقْرَأْ مَعَ طِفْلِكَ عَلَى الْآيِبَاد أَوِ الْهَاتِفِ مَعَ فِيزْيَاءِ تَقْلِيبِ الصَّفَحَاتِ الْوَاقِعِيَّةِ وَأَصْوَاتِ الْوَرَقِ الْهَادِئَةِ.
            </p>
          </div>

          <div className="p-6 rounded-[2px] bg-white border border-amber-900/10 shadow-sm">
            <div className="w-10 h-10 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] flex items-center justify-center mb-4">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2 font-serif">عَرَبِيٌّ فُصْحَى بِالتَّشْكِيلِ الْكَامِلِ</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              شِعْرٌ عَرَبِيٌّ أَصِيلٌ مَضْبُوطُ الْحَرَكَاتِ جَنْباً إِلَى جَنْبٍ مَعَ تَرْجَمَةٍ وَنَظْمٍ إِنْجِلِيزِيٍّ سَلِسٍ.
            </p>
          </div>

          <div className="p-6 rounded-[2px] bg-white border border-amber-900/10 shadow-sm">
            <div className="w-10 h-10 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2 font-serif">مِلَفٌّ أَرْشِيفِيٌّ عَالِي الدِّقَّةِ (300 DPI)</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              مِلَفٌّ جَاهِزٌ لِلطِّبَاعَةِ الْمَنْزِلِيَّةِ أَوِ التَّجْلِيدِ الْفَاخِرِ، مَعَ إِمْكَانِيَّةِ التَّوْصِيلِ السَّرِيعِ لِلْمَنْزِلِ فِي الْإِمَارَاتِ.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-white py-12 border-t border-amber-900/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-1 text-amber-500 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-500" />
            ))}
          </div>
          <p className="font-bold text-slate-900 text-base font-serif">
            تَقْيِيمُ ٤٫٩٦ مِنْ ٥ بِوَاسِطَةِ أَكْثَرِ مِنْ ٤٠٠ وَلِيَّ أَمْرٍ مُوَثَّقٍ فِي الْإِمَارَاتِ
          </p>
        </div>
      </section>
    </main>
  );
}
