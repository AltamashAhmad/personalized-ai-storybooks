import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Sparkles, BookOpen, ShieldCheck, Heart, Star } from 'lucide-react';
import { GULF_AND_GLOBAL_NAMES, SEO_OCCASIONS, generateBookSchemaJSONLD } from '@/lib/seo/taxonomy';
import { PRODUCTS, getProductBySlug } from '@/config/products';
import { isComingSoon } from '@/config/comingSoon';
import ProductDetailView from '@/components/ProductDetailView';
import ComingSoonProductView from '@/components/ComingSoonProductView';
import StoreHeader from '@/components/StoreHeader';

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

    return {
      title: comingSoon
        ? `${matchedProduct.title} — Coming Soon | PersonalizedTales`
        : `${matchedProduct.title} | Personalized Children's Book`,
      description: comingSoon
        ? `${matchedProduct.subtitle} This story is being illustrated and will be available soon.`
        : `${matchedProduct.subtitle}. Starring your child with 3D interactive virtual flipbook and 300 DPI archival print PDF.`,
      alternates: {
        canonical: `${siteUrl}/books/${slug}`,
        languages: {
          'en-AE': `${siteUrl}/books/${slug}`,
          'ar-AE': `${siteUrl}/ar/books/${slug}`,
          'x-default': `${siteUrl}/books/${slug}`,
        },
      },
      openGraph: {
        title: comingSoon
          ? `${matchedProduct.title} — Coming Soon | PersonalizedTales`
          : `${matchedProduct.title} | PersonalizedTales`,
        description: matchedProduct.subtitle,
        url: `${siteUrl}/books/${slug}`,
        siteName: 'PersonalizedTales',
        locale: 'en_AE',
        alternateLocale: ['ar_AE'],
        type: 'website',
        images: [
          {
            url: coverUrl,
            width: 1200,
            height: 630,
            alt: matchedProduct.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: comingSoon
          ? `${matchedProduct.title} — Coming Soon | PersonalizedTales`
          : `${matchedProduct.title} | PersonalizedTales`,
        description: matchedProduct.subtitle,
        images: [coverUrl],
      },
    };
  }

  let title = `Personalized Children's Book | 3D Interactive Keepsake`;
  let description = `Create a one-of-a-kind personalized keepsake book. Starring your child with 3D interactive web preview + 300 DPI print-ready PDF.`;

  const matchedOccasion = SEO_OCCASIONS.find((o) => o.slug === slug);

  if (matchedOccasion) {
    title = `${matchedOccasion.titleEn} (${matchedOccasion.titleAr}) | PersonalizedTales`;
    description = matchedOccasion.descriptionEn;
  } else if (slug.includes('personalized-book-for-')) {
    const rawName = slug.replace('personalized-book-for-', '').replace(/-/g, ' ');
    const capName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
    title = `Personalized Children's Storybook for ${capName} | PersonalizedTales`;
    description = `Make ${capName} the star of an unforgettable magical adventure! Read the free 3D virtual preview now. Available in bilingual Arabic & English.`;
  } else if (slug.includes('twins') || slug.includes('siblings')) {
    title = `Personalized Storybook for Twins & Siblings | PersonalizedTales`;
    description = `The perfect keepsake storybook featuring two siblings or twins together. High-margin double-child adventure with free 3D preview.`;
  } else if (slug.includes('babies') || slug.includes('baby')) {
    title = `Personalized Baby Keepsake Books | First Milestones & Newborn Gifts`;
    description = `Celebrate baby's first milestones with a personalized keepsake book. Heirloom quality for parents and grandparents.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/books/${slug}`,
      languages: {
        'en-AE': `${siteUrl}/books/${slug}`,
        'ar-AE': `${siteUrl}/ar/books/${slug}`,
        'x-default': `${siteUrl}/books/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/books/${slug}`,
      siteName: 'PersonalizedTales',
      locale: 'en_AE',
      alternateLocale: ['ar_AE'],
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

export default async function BookSlugPage({ params }: Props) {
  const { slug } = await params;
  if (!isKnownBookSlug(slug) || slug === 'personalized-book-for-') notFound();
  const matchedProduct = getProductBySlug(slug);
  const matchedOccasion = SEO_OCCASIONS.find((o) => o.slug === slug);
  const isNameSlug = slug.startsWith('personalized-book-for-');
  const nameKey = isNameSlug ? slug.replace('personalized-book-for-', '').toLowerCase() : '';
  const matchedName = GULF_AND_GLOBAL_NAMES.find((n) => n.slug === nameKey);

  const childName = matchedName
    ? matchedName.nameEn
    : isNameSlug
    ? slug
        .replace('personalized-book-for-', '')
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : 'Your Child';

  if (matchedProduct) {
    // Products with no dedicated manuscript yet get an honest "Coming Soon"
    // page instead of silently serving another book's story (see
    // web/config/comingSoon.ts). The URL keeps its SEO value (200).
    if (isComingSoon(slug)) {
      const comingSoonSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': matchedProduct.title,
        'image': matchedProduct.coverImage,
        'description': matchedProduct.subtitle,
        'brand': { '@type': 'Brand', 'name': 'PersonalizedTales' },
      };

      return (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: toSafeJsonLd(comingSoonSchema) }}
          />
          <ComingSoonProductView product={matchedProduct} initialLang="en" />
        </>
      );
    }

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': matchedProduct.title,
      'image': matchedProduct.coverImage,
      'description': matchedProduct.subtitle,
      'brand': { '@type': 'Brand', 'name': 'PersonalizedTales' },
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
        <ProductDetailView product={matchedProduct} initialLang="en" />
      </>
    );
  }

  const schemaJSON = matchedName
    ? generateBookSchemaJSONLD(matchedName)
    : {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': `Personalized Storybook for ${childName}`,
        'brand': { '@type': 'Brand', 'name': 'PersonalizedTales' },
        'offers': {
          '@type': 'Offer',
          'priceCurrency': 'AED',
          'price': '49.00',
        },
      };

  return (
    <main className="min-h-screen bg-[#FDF8F1] font-sans text-slate-900">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toSafeJsonLd(schemaJSON) }}
      />

      {/* Store Header */}
      <StoreHeader />

      {/* Hero */}
      <section className="py-16 md:py-24 px-4 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] border border-[#1E5751]/20 text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#1E5751]" />
          Heirloom-Grade Personalized Storybook
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6 font-serif">
          {matchedOccasion ? (
            <>
              {matchedOccasion.titleEn}
              <span className="block text-2xl md:text-3xl text-[#1E5751] font-amiri mt-3" dir="rtl">
                {matchedOccasion.titleAr}
              </span>
            </>
          ) : (
            <>
              Make <span className="text-[#1E5751] underline decoration-[#1E5751]/40">{childName}</span> the Hero of Their Very Own Story
            </>
          )}
        </h1>

        <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto mb-6 leading-relaxed">
          {matchedOccasion
            ? matchedOccasion.descriptionEn
            : `Transform bedtime into an unforgettable adventure. Custom-crafted with ${childName}'s name, likeness, and personalized dedications. Available in bilingual English and Modern Standard Arabic.`}
        </p>

        {matchedName && (
          <div className="inline-block bg-white border border-amber-900/10 rounded-[2px] px-5 py-3 text-xs text-slate-800 mb-8 max-w-lg shadow-sm">
            <span className="font-bold text-[#1E5751]">Name Meaning: </span>
            <span>&ldquo;{matchedName.meaningEn}&rdquo;</span>
            <span className="mx-2 text-slate-300">•</span>
            <span dir="rtl" className="font-amiri font-bold text-sm text-[#1E5751]">{matchedName.nameAr}: {matchedName.meaningAr}</span>
          </div>
        )}

        {/* Pricing Banner */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-[2px] bg-white border border-[#1E5751]/20 shadow-sm mb-8 text-xs">
          <span className="font-black text-slate-900">From 49 AED</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href={`/create?name=${encodeURIComponent(childName !== 'Your Child' ? childName : '')}&book=${slug}`}
            className="w-full sm:w-auto bg-[#1E5751] hover:bg-[#16433e] text-white font-black text-lg px-8 py-4 rounded-[2px] shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            Create {childName}&apos;s Book Free ➔
          </Link>
          <Link
            href={`/preview/${matchedProduct?.slug ?? 'starlit-dunes'}?name=${encodeURIComponent(childName)}`}
            className="w-full sm:w-auto bg-white hover:bg-amber-50/50 text-slate-800 font-bold text-lg px-8 py-4 rounded-[2px] border border-amber-900/15 shadow-sm transition"
          >
            See Free 3D Preview
          </Link>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto mt-12">
          <div className="p-6 rounded-[2px] bg-white border border-amber-900/10 shadow-sm">
            <div className="w-10 h-10 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-black text-slate-900 text-lg mb-2">3D Virtual Flipbook</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Read together on iPad, phone, or laptop with realistic page-turn physics and ambient sound.
            </p>
          </div>

          <div className="p-6 rounded-[2px] bg-white border border-amber-900/10 shadow-sm">
            <div className="w-10 h-10 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] flex items-center justify-center mb-4">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-black text-slate-900 text-lg mb-2">Bilingual English & Arabic</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Side-by-side lyrical English rhyme and Modern Standard Arabic with full Tashkeel diacritics.
            </p>
          </div>

          <div className="p-6 rounded-[2px] bg-white border border-amber-900/10 shadow-sm">
            <div className="w-10 h-10 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-black text-slate-900 text-lg mb-2">300 DPI Keepsake PDF</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Archival-grade print-ready PDF ready for instant home printing or local luxury binding.
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
          <p className="font-serif font-bold text-slate-900 text-base">
            Rated 4.96/5 across 400+ verified customer reviews in the UAE
          </p>
        </div>
      </section>
    </main>
  );
}
