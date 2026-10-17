import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookOpen, ShieldCheck, Sparkles, Tag, ChevronLeft, HelpCircle, ChevronDown } from 'lucide-react';
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
  if (!cat) return { title: "قصص وكتب أطفال مخصصة | حكايات مخصصة" };

  const displayProducts = getMatchingProducts(cat.filterType, cat.filterValue);
  const featuredProduct = displayProducts[0] || PRODUCTS[0];
  if (!featuredProduct) notFound();
  const ogImageUrl = featuredProduct.coverImage.startsWith('http')
    ? featuredProduct.coverImage
    : `https://personalizedtales.com${featuredProduct.coverImage}`;

  const title = `${cat.titleAr} | قصص وكتب أطفال مخصصة بالاسم | حكايات مخصصة الإمارات`;
  const description = `${cat.subtitleAr}. اصنع كتاباً تذكارياً فاخراً ومخصصاً لطفلك بالاسم والصورة، مع معاينة ثلاثية الأبعاد وتوصيل سريع في الإمارات.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://personalizedtales.com/ar/books/category/${slug}`,
      languages: {
        'en-AE': `https://personalizedtales.com/books/category/${slug}`,
        'ar-AE': `https://personalizedtales.com/ar/books/category/${slug}`,
        'x-default': `https://personalizedtales.com/books/category/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://personalizedtales.com/ar/books/category/${slug}`,
      siteName: 'حكايات مخصصة',
      locale: 'ar_AE',
      alternateLocale: ['en_AE'],
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: cat.titleAr,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function ArabicCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const displayProducts = getMatchingProducts(category.filterType, category.filterValue);

  const faqs = [
    {
      question: `ما هي الفئة العمرية المناسبة لمجموعة "${category.titleAr}"؟`,
      answer: `صُممت هذه المجموعة خصيصاً لتناسب: ${category.subtitleAr}. تتميز كل قصة بنصوص ورسومات ملهمة تناسب التطور اللغوي والخيالي للطفل وإمكانية كتابة إهداء عائلي خاص.`,
    },
    {
      question: 'هل يمكنني معاينة القصة المخصصة بالكامل مجاناً قبل الشراء؟',
      answer: 'نعم بكل تأكيد! توفر حكايات مخصصة معاينة تفاعلية ثلاثية الأبعاد مجانية بالكامل. يمكنك إدخال اسم طفلك واختيار ملامحه وتصفح جميع صفحات القصة وقراءة الأبيات قبل إتمام الطلب.',
    },
    {
      question: 'كيف تعمل النسخة ثنائية اللغة (عربي وإنجليزي)؟',
      answer: 'تضم النسخة الثنائية أبياتاً شعرية باللغة العربية الفصحى مع التشكيل الكامل في الصفحة اليمنى، بجانب نظم شعري إنجليزي في الصفحة اليسرى لتعزيز ارتباط الطفل بلغته الأم والإنجليزية.',
    },
    {
      question: 'كم تستغرق مدة التوصيل إلى دبي وأبوظبي وكافة أنحاء الإمارات؟',
      answer: 'التسليم الرقمي وملف الطباعة عالي الدقة يتم إرسالهما فورياً خلال ٥ دقائق. أما النسخ المطبوعة ذات التجليد الفاخر، فيتم توصيلها إلى باب منزلك في الإمارات خلال ٢٤ إلى ٤٨ ساعة.',
    },
  ];

  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. Organization
      {
        '@type': 'Organization',
        '@id': 'https://personalizedtales.com/#organization',
        name: 'حكايات مخصصة',
        alternateName: 'PersonalizedTales',
        url: 'https://personalizedtales.com/ar',
        sameAs: [
          'https://instagram.com/personalizedtales',
          'https://tiktok.com/@personalizedtales',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'خدمة العملاء',
          areaServed: ['AE', 'SA', 'QA', 'KW', 'BH', 'OM'],
          availableLanguage: ['Arabic', 'English'],
        },
      },
      // 2. BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        '@id': `https://personalizedtales.com/ar/books/category/${category.slug}#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'الرئيسية',
            item: 'https://personalizedtales.com/ar',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'القصص والكتب',
            item: 'https://personalizedtales.com/ar#catalog',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: category.titleAr,
            item: `https://personalizedtales.com/ar/books/category/${category.slug}`,
          },
        ],
      },
      // 3. CollectionPage with ItemList
      {
        '@type': 'CollectionPage',
        '@id': `https://personalizedtales.com/ar/books/category/${category.slug}#webpage`,
        name: category.titleAr,
        description: category.subtitleAr,
        url: `https://personalizedtales.com/ar/books/category/${category.slug}`,
        inLanguage: 'ar',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://personalizedtales.com/ar/#website',
          name: 'حكايات مخصصة',
          url: 'https://personalizedtales.com/ar',
        },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: displayProducts.length,
          itemListElement: displayProducts.map((p, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            url: `https://personalizedtales.com/ar/books/${p.slug}`,
            name: p.titleAr,
          })),
        },
      },
      // 4. Products in this Category
      ...displayProducts.map((p) => ({
        '@type': 'Product',
        '@id': `https://personalizedtales.com/ar/books/${p.slug}#product`,
        name: p.titleAr,
        inLanguage: 'ar',
        image: p.coverImage.startsWith('http') ? p.coverImage : `https://personalizedtales.com${p.coverImage}`,
        description: p.subtitleAr,
        brand: {
          '@type': 'Brand',
          name: 'حكايات مخصصة',
        },
        // Representative hardcover-default price; format prices: softcover 49 / hardcover 79 / layflat 99 AED.
        // Coming-soon products get no offers/availability — they are not purchasable yet.
        ...(isComingSoon(p.slug)
          ? {}
          : {
              offers: {
                '@type': 'Offer',
                url: `https://personalizedtales.com/ar/books/${p.slug}`,
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
        '@id': `https://personalizedtales.com/ar/books/category/${category.slug}#faq`,
        inLanguage: 'ar',
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
    <div className="min-h-screen bg-[var(--color-kraft-paper-60,#FDF8F1)] text-[var(--color-sharpie,#23231E)] font-sans flex flex-col selection:bg-amber-200" dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph).replace(/</g, '\\u003c') }}
      />
      <StoreHeader />
      <CountrySelectorModal />

      <main className="flex-1 flex flex-col">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 py-4 w-full text-xs text-slate-500 flex items-center gap-1.5">
          <Link href="/ar" className="hover:text-slate-900 transition">الرئيسية</Link>
          <ChevronLeft className="w-3 h-3 text-slate-400" />
          <Link href="/ar#catalog" className="hover:text-slate-900 transition">القصص والكتب</Link>
          <ChevronLeft className="w-3 h-3 text-slate-400" />
          <span className="text-[#23231E] font-bold">{category.titleAr}</span>
        </div>

        {/* Category Hero Header */}
        <section className="py-12 px-4 border-b border-amber-900/10">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>مجموعة مختارة ومميزة</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-[#23231E] tracking-tight font-serif">
              {category.titleAr}
            </h1>

            <div className="text-base sm:text-lg font-bold text-amber-900 font-sans" dir="ltr">
              {category.titleEn}
            </div>

            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {category.subtitleAr}
            </p>

            {/* Filter Facet Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              <Link
                href="/ar/books/category/0-3-years"
                className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                  category.slug === '0-3-years'
                    ? 'bg-[#1E5751] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                الأعمار ٠–٣ سنوات
              </Link>
              <Link
                href="/ar/books/category/3-6-years"
                className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                  category.slug === '3-6-years'
                    ? 'bg-[#1E5751] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                الأعمار ٣–٦ سنوات
              </Link>
              <Link
                href="/ar/books/category/6-9-years"
                className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                  category.slug === '6-9-years'
                    ? 'bg-[#1E5751] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                الأعمار ٦–٩ سنوات
              </Link>
              <Link
                href="/ar/books/category/birthday"
                className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                  category.slug === 'birthday'
                    ? 'bg-[#1E5751] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                🎂 هدايا أعياد الميلاد
              </Link>
              <Link
                href="/ar/books/category/new-baby"
                className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                  category.slug === 'new-baby'
                    ? 'bg-[#1E5751] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                🍼 هدايا المواليد الجدد
              </Link>
              <Link
                href="/ar/books/category/bedtime"
                className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                  category.slug === 'bedtime'
                    ? 'bg-[#1E5751] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                🌙 قصص ما قبل النوم
              </Link>
              <Link
                href="/ar/books/category/for-siblings"
                className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                  category.slug === 'for-siblings'
                    ? 'bg-[#1E5751] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                👥 قصص الإخوة والأخوات
              </Link>
            </div>
          </div>
        </section>

        {/* Product Grid Section with In-Grid BOGO Promo Card */}
        <section className="max-w-7xl mx-auto px-4 py-12 w-full">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-amber-900/10">
            <div>
              <h2 className="text-xl font-black text-[#23231E] font-serif">
                عرض {displayProducts.length} قصص مخصصة
              </h2>
              <p className="text-xs text-slate-500">
                كل كتاب يتضمن معاينة تفاعلية ثلاثية الأبعاد وشعراً عربياً بالتشكيل
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-emerald-600" />
              <span>معاينة ثلاثية الأبعاد مجانية</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProducts.length === 0 ? (
              <div className="col-span-full text-center py-16 px-4 bg-white/60 border border-amber-900/10 rounded-[2px]">
                <p className="font-serif font-black text-xl text-[#23231E] mb-2">
                  لا توجد قصص في هذه المجموعة بعد
                </p>
                <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
                  نعمل على تأليف حكايات جديدة لهذا الرف. تصفح المجموعة الكاملة من القصص التذكارية المخصصة.
                </p>
                <Link
                  href="/ar/all-books"
                  className="inline-block bg-[#1E5751] hover:bg-[#16433e] text-white font-bold text-sm px-6 py-3 rounded-[2px] transition"
                >
                  تصفح جميع القصص
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
                    <div className="absolute -top-12 -left-12 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                    <div>
                      <span className="inline-block bg-[#FFD15A] text-[#23231E] font-black text-[11px] uppercase tracking-wider px-3 py-1 rounded-full mb-6">
                        عرض حصري ولفترة محدودة
                      </span>
                      <h3 className="text-3xl font-black font-serif leading-tight mb-4">
                        اشترِ كتاباً واحصل على الثاني بنصف السعر مع كود BOGO50
                      </h3>
                      <p className="text-emerald-100 text-xs leading-relaxed">
                        اختر أي قصتين تذكاريتين مخصصتين لأطفالك، وسيتم تطبيق الخصم فورياً وتلقائياً عند الدفع.
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/20">
                      <Link
                        href="/ar#catalog"
                        className="w-full bg-white hover:bg-emerald-50 text-[#1E5751] font-black text-xs py-3 px-4 rounded-[2px] text-center block transition shadow-sm"
                      >
                        استكشف جميع القصص
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

        {/* Arabic Trust & Guarantee Section */}
        <section className="bg-white/60 border-t border-amber-900/10 py-16 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-7 rounded-[2px] bg-white border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-[2px] bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#23231E] font-serif mb-2">
                معاينة ثلاثية الأبعاد مجاناً
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                تصفح القصة بالكامل على شاشتك وشاهد اسم طفلك ورسوماته قبل أن تدفع أي درهم.
              </p>
            </div>

            <div className="p-7 rounded-[2px] bg-white border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-[2px] bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#23231E] font-serif mb-2">
                لغة عربية فصحى مع التشكيل الكامل
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                شعر موزون وقصص ملهمة مكتوبة بضبط لغوي متقن يثري حصيلة طفلك اللغوية.
              </p>
            </div>

            <div className="p-7 rounded-[2px] bg-white border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-[2px] bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#23231E] font-serif mb-2">
                تسليم تذكاري فوري ومحلي
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                رابط دائم للقارئ التفاعلي + ملف طباعة أرشيفي فائق الجودة، مع خيار التوصيل السريع للمنزل.
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
                <span>الأسئلة الأكثر شيوعاً</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#23231E] font-serif">
                أسئلة متكررة حول {category.titleAr}
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
      <Footer initialLang="ar" />
    </div>
  );
}
