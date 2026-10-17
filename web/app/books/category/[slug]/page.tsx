import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookOpen, ShieldCheck, Sparkles, Tag, ChevronRight, HelpCircle, ChevronDown } from 'lucide-react';
import CountrySelectorModal from '@/components/CountrySelectorModal';
import ProductCard from '@/components/ProductCard';
import StoreHeader from '@/components/StoreHeader';
import Footer from '@/components/Footer';
import { CATEGORIES, getCategoryBySlug } from '@/config/categories';
import { isComingSoon } from '@/config/comingSoon';
import { PRODUCTS, ProductStory } from '@/config/products';

interface Props {
  params: Promise<{ slug: string }>;
}

function getMatchingProducts(filterType: string, filterValue: string): ProductStory[] {
  const matches = PRODUCTS.filter((p) => {
    if (filterType === 'age') {
      if (filterValue === '0-3') return p.ageRange.includes('0–') || p.ageRange.includes('0-') || p.ageRange.includes('2–');
      if (filterValue === '3-6') return p.ageRange.includes('3–') || p.ageRange.includes('2–') || p.ageRange.includes('0–4');
      if (filterValue === '6-9') return p.ageRange.includes('4–') || p.ageRange.includes('3–8') || p.ageRange.includes('6–');
      if (filterValue === '9-12') return p.ageRange.includes('6–12') || p.ageRange.includes('4–10');
    }
    if (filterType === 'occasion') {
      return p.occasions.includes(filterValue) || p.category === filterValue;
    }
    if (filterType === 'recipient') {
      return p.recipients.some((r) => r.includes(filterValue));
    }
    return true;
  });

  return matches;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return { title: "Personalized Children's Books | PersonalizedTales" };

  const displayProducts = getMatchingProducts(cat.filterType, cat.filterValue);
  const featuredProduct = displayProducts[0] || PRODUCTS[0];
  if (!featuredProduct) notFound();
  const ogImageUrl = featuredProduct.coverImage.startsWith('http')
    ? featuredProduct.coverImage
    : `https://personalizedtales.com${featuredProduct.coverImage}`;

  return {
    title: cat.metaTitle,
    description: cat.metaDescription,
    alternates: {
      canonical: `https://personalizedtales.com/books/category/${slug}`,
      languages: {
        'en-AE': `https://personalizedtales.com/books/category/${slug}`,
        'ar-AE': `https://personalizedtales.com/ar/books/category/${slug}`,
        'x-default': `https://personalizedtales.com/books/category/${slug}`,
      },
    },
    openGraph: {
      title: cat.metaTitle,
      description: cat.metaDescription,
      url: `https://personalizedtales.com/books/category/${slug}`,
      siteName: 'PersonalizedTales',
      locale: 'en_AE',
      alternateLocale: ['ar_AE'],
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: cat.titleEn,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: cat.metaTitle,
      description: cat.metaDescription,
      images: [ogImageUrl],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const displayProducts = getMatchingProducts(category.filterType, category.filterValue);

  const faqs = [
    {
      question: `What age range is the "${category.titleEn}" collection suitable for?`,
      answer: `This collection is curated specifically for ${category.subtitleEn}. Each story features adjustable character appearances, personalized dedications, and lyrical rhymes suited to your child's developmental stage.`,
    },
    {
      question: 'Can I preview my personalized storybook before purchasing?',
      answer: 'Yes! PersonalizedTales provides a 100% free interactive 3D virtual flipbook preview. You can customize the name, character, dedication, and read every single page before making any payment.',
    },
    {
      question: 'How does the bilingual English and Arabic edition work?',
      answer: 'Our books feature musical rhyming English verses on the left page and Modern Standard Arabic verses with full vowel markings (Tashkeel) on the right page, celebrating multicultural storytelling.',
    },
    {
      question: 'How quickly are books delivered across Dubai and the UAE?',
      answer: 'Instant digital access and 300 DPI print-ready PDF are delivered within 5 minutes. Heirloom hardcover print editions are printed and delivered locally across all 7 Emirates within 24 to 48 hours.',
    },
  ];

  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. Organization
      {
        '@type': 'Organization',
        '@id': 'https://personalizedtales.com/#organization',
        name: 'PersonalizedTales',
        alternateName: 'حكايات مخصصة',
        url: 'https://personalizedtales.com',
        sameAs: [
          'https://instagram.com/personalizedtales',
          'https://tiktok.com/@personalizedtales',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          areaServed: ['AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'US', 'GB'],
          availableLanguage: ['English', 'Arabic'],
        },
      },
      // 2. BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        '@id': `https://personalizedtales.com/books/category/${category.slug}#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://personalizedtales.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Books',
            item: 'https://personalizedtales.com/#catalog',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: category.titleEn,
            item: `https://personalizedtales.com/books/category/${category.slug}`,
          },
        ],
      },
      // 3. CollectionPage with ItemList
      {
        '@type': 'CollectionPage',
        '@id': `https://personalizedtales.com/books/category/${category.slug}#webpage`,
        name: category.titleEn,
        description: category.subtitleEn,
        url: `https://personalizedtales.com/books/category/${category.slug}`,
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://personalizedtales.com/#website',
          name: 'PersonalizedTales',
          url: 'https://personalizedtales.com',
        },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: displayProducts.length,
          itemListElement: displayProducts.map((p, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            url: `https://personalizedtales.com/books/${p.slug}`,
            name: p.title,
          })),
        },
      },
      // 4. Products in this Category
      ...displayProducts.map((p) => ({
        '@type': 'Product',
        '@id': `https://personalizedtales.com/books/${p.slug}#product`,
        name: p.title,
        image: p.coverImage.startsWith('http') ? p.coverImage : `https://personalizedtales.com${p.coverImage}`,
        description: p.summary || p.subtitle,
        brand: {
          '@type': 'Brand',
          name: 'PersonalizedTales',
        },
        // Representative hardcover-default price; format prices: softcover 49 / hardcover 79 / layflat 99 AED.
        // Coming-soon products get no offers/availability — they are not purchasable yet.
        ...(isComingSoon(p.slug)
          ? {}
          : {
              offers: {
                '@type': 'Offer',
                url: `https://personalizedtales.com/books/${p.slug}`,
                priceCurrency: 'AED',
                price: '79.00',
                priceValidUntil: '2027-12-31',
                itemCondition: 'https://schema.org/NewCondition',
                availability: 'https://schema.org/InStock',
              },
            }),
      })),
      // 5. FAQPage
      {
        '@type': 'FAQPage',
        '@id': `https://personalizedtales.com/books/category/${category.slug}#faq`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--color-kraft-paper-60,#FDF8F1)] text-[var(--color-sharpie,#23231E)] font-sans flex flex-col selection:bg-amber-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph).replace(/</g, '\\u003c') }}
      />
      <StoreHeader />
      <CountrySelectorModal />

      <main className="flex-1 flex flex-col">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 py-4 w-full text-xs text-slate-500 flex items-center gap-1.5">
          <Link href="/" className="hover:text-slate-900 transition">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/#catalog" className="hover:text-slate-900 transition">Books</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-[#23231E] font-bold">{category.titleEn}</span>
        </div>

        {/* Category Hero Header */}
        <section className="py-12 px-4 border-b border-amber-900/10">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Curated Collection</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-[#23231E] tracking-tight font-serif">
              {category.titleEn}
            </h1>

            <div className="text-base sm:text-lg font-bold text-amber-900 font-serif" dir="rtl">
              {category.titleAr}
            </div>

            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {category.subtitleEn}
            </p>

            {/* Filter Facet Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              <Link
                href="/books/category/0-3-years"
                className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                  category.slug === '0-3-years'
                    ? 'bg-[#1E5751] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                0–3 Years
              </Link>
              <Link
                href="/books/category/3-6-years"
                className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                  category.slug === '3-6-years'
                    ? 'bg-[#1E5751] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                3–6 Years
              </Link>
              <Link
                href="/books/category/6-9-years"
                className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                  category.slug === '6-9-years'
                    ? 'bg-[#1E5751] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                6–9 Years
              </Link>
              <Link
                href="/books/category/birthday"
                className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                  category.slug === 'birthday'
                    ? 'bg-[#1E5751] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                🎂 Birthday
              </Link>
              <Link
                href="/books/category/new-baby"
                className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                  category.slug === 'new-baby'
                    ? 'bg-[#1E5751] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                🍼 New Baby
              </Link>
              <Link
                href="/books/category/bedtime"
                className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                  category.slug === 'bedtime'
                    ? 'bg-[#1E5751] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                🌙 Bedtime
              </Link>
              <Link
                href="/books/category/for-siblings"
                className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                  category.slug === 'for-siblings'
                    ? 'bg-[#1E5751] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                👥 Siblings
              </Link>
            </div>
          </div>
        </section>

        {/* Product Grid Section with In-Grid BOGO Promo Card */}
        <section className="max-w-7xl mx-auto px-4 py-12 w-full">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-amber-900/10">
            <div>
              <h2 className="text-xl font-black text-[#23231E] font-serif">
                Showing {displayProducts.length} Storybooks
              </h2>
              <p className="text-xs text-slate-500">
                Every book includes free instant 3D preview & bilingual rhymes
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Free 3D Virtual Preview</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProducts.length === 0 ? (
              <div className="col-span-full text-center py-16 px-4 bg-white/60 border border-amber-900/10 rounded-[2px]">
                <p className="font-serif font-black text-xl text-[#23231E] mb-2">
                  No storybooks in this collection yet
                </p>
                <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
                  We&apos;re crafting new tales for this shelf. Meanwhile, explore the full collection of personalized keepsakes.
                </p>
                <Link
                  href="/all-books"
                  className="inline-block bg-[#1E5751] hover:bg-[#16433e] text-white font-bold text-sm px-6 py-3 rounded-[2px] transition"
                >
                  Browse All Storybooks
                </Link>
              </div>
            ) : (
              <>
                {displayProducts.map((product, index) => (
              <React.Fragment key={product.id}>
                <ProductCard product={product} />

                {/* In-Grid Promotional BOGO Banner Card after 3rd item */}
                {index === 2 && (
                  <div className="bg-[#1E5751] text-white rounded-[2px] p-8 flex flex-col justify-between shadow-md relative overflow-hidden group">
                    <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                    <div>
                      <span className="inline-block bg-[#FFD15A] text-[#23231E] font-black text-[11px] uppercase tracking-wider px-3 py-1 rounded-full mb-6">
                        Limited Time Offer
                      </span>
                      <h3 className="text-3xl font-black font-serif leading-tight mb-4">
                        Buy one book, get a second half price with code BOGO50
                      </h3>
                      <p className="text-emerald-100 text-xs leading-relaxed">
                        Mix and match any two personalized keepsake storybooks. Discount applied automatically at checkout.
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/20">
                      <Link
                        href="/#catalog"
                        className="w-full bg-white hover:bg-emerald-50 text-[#1E5751] font-black text-xs py-3 px-4 rounded-[2px] text-center block transition shadow-sm"
                      >
                        Explore All Stories
                      </Link>
                    </div>
                  </div>
                )}
                  </React.Fragment>
                ))}
              </>
            )}
          </div>
        </section>

        {/* Craftsmanship & Trust Section */}
        <section className="bg-white/60 border-t border-amber-900/10 py-16 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-7 rounded-[2px] bg-white border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-[2px] bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#23231E] font-serif mb-2">
                Free 3D Virtual Preview
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Experience the full interactive storybook online before you spend a single dirham.
              </p>
            </div>

            <div className="p-7 rounded-[2px] bg-white border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-[2px] bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#23231E] font-serif mb-2">
                Bilingual Arabic & English
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every story is thoughtfully crafted in lyrical English and Modern Standard Arabic with full Tashkeel diacritics.
              </p>
            </div>

            <div className="p-7 rounded-[2px] bg-white border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-[2px] bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#23231E] font-serif mb-2">
                Instant Keepsake Delivery
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Permanent cloud 3D reader link + 300 DPI archival print PDF sent straight to your email and WhatsApp in 5 minutes.
              </p>
            </div>
          </div>
        </section>

        {/* Visible Frequently Asked Questions (Matching JSON-LD FAQPage Schema) */}
        <section className="py-16 px-4 bg-white/40 border-t border-amber-900/10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
                <HelpCircle className="w-3.5 h-3.5 text-slate-600" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#23231E] font-serif">
                Questions About {category.titleEn}
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-white rounded-[2px] border border-slate-200/80 p-5 shadow-sm transition hover:border-[#1E5751]/40"
                  open={index === 0}
                >
                  <summary className="flex items-center justify-between cursor-pointer font-bold text-sm sm:text-base text-[#23231E] list-none select-none">
                    <span>{faq.question}</span>
                    <ChevronDown className="w-4 h-4 text-slate-500 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Editorial Footer */}
      <Footer initialLang="en" />
    </div>
  );
}
