import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ShieldCheck, Sparkles, ChevronLeft, HelpCircle, ChevronDown } from 'lucide-react';
import CountrySelectorModal from '@/components/CountrySelectorModal';
import StoreHeader from '@/components/StoreHeader';
import Footer from '@/components/Footer';
import AllBooksView from '@/components/AllBooksView';
import { PRODUCTS } from '@/config/products';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://personalizedtales.com').replace(/\/+$/, '');

export const metadata: Metadata = {
  title: "جميع قصص الأطفال المخصصة",
  description: "استكشف مجموعتنا الكاملة من القصص التذكارية المخصصة للأطفال من حكايات مخصصة الإمارات. هدايا قيّمة مصممة بأبيات شعرية عربية فصيحة مع التشكيل الكامل، صُنعت في أبوظبي.",
  alternates: {
    canonical: `${siteUrl}/ar/all-books`,
    languages: {
      'en-AE': `${siteUrl}/all-books`,
      'ar-AE': `${siteUrl}/ar/all-books`,
      'x-default': `${siteUrl}/all-books`,
    },
  },
  openGraph: {
    locale: 'ar_AE',
    title: "جميع قصص الأطفال المخصصة | حكايات مخصصة الإمارات",
    description: "استكشف جميع قصص الأطفال المخصصة. معاينة مجانية تفاعلية ثلاثية الأبعاد، شعر عربي فصيح بالتشكيل، وتوصيل سريع خلال ٢٤–٤٨ ساعة لجميع الإمارات.",
    url: `${siteUrl}/ar/all-books`,
    type: 'website',
  },
};

const AR_ALL_BOOKS_FAQS = [
  {
    question: "كيف أقوم بتخصيص كتاب من الكتالوج؟",
    answer: "اضغط على زر 'تخصيص' على أي قصة، أدخل اسم طفلك، اختر ملامحه الكرتونية المفضلة (لون البشرة، تسريحة ولون الشعر، والنظارات)، وأضف إهداءك العائلي الدافئ. يمكنك معاينة القصة كاملة بثلاثية الأبعاد قبل الشراء."
  },
  {
    question: "هل جميع الكتب ثنائية اللغة وتتضمن التشكيل العربي الكامل؟",
    answer: "نعم، كل قصة مصاغة بعناية فائقة بلغة عربية فصحى مشكولة بالكامل إلى جانب صياغة إنجليزية شعرية، مما يدعم الحصيلة اللغوية والهوية الثقافية للطفل."
  },
  {
    question: "ما هي أنواع الأغلفة وجودة الورق المستخدمة؟",
    answer: "نقدم ثلاثة خيارات فاخرة: غلاف ورقي ناعم (٤٩ درهم)، غلاف مقوى كلاسيكي تذكاري (٧٩ درهم)، وغلاف فاخر منبسط ١٨٠ درجة (٩٩ درهم). جميع الخيارات مطبوعة على ورق Mohawk الأرشيفي بوزن ٢٠٠ جم بأحبار نباتية آمنة."
  },
  {
    question: "كم تستغرق مدة التوصيل داخل دولة الإمارات العربية المتحدة؟",
    answer: "التوصيل السريع مجاني تماماً لجميع الطلبات في الإمارات السبع (٢٤–٤٨ ساعة)."
  }
];

export default function ArabicAllBooksPage() {
  const displayProducts = PRODUCTS;

  // JSON-LD ItemList Schema
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: "جميع قصص الأطفال المخصصة",
    description: "تصفح مجموعتنا الكاملة من كتب الأطفال المخصصة والقصص التذكارية العائلية.",
    url: `${siteUrl}/ar/all-books`,
    inLanguage: 'ar-AE',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: displayProducts.map((p, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `${siteUrl}/ar/books/${p.slug}`,
        name: p.titleAr,
        image: p.coverImage.startsWith('http') ? p.coverImage : `${siteUrl}${p.coverImage}`,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-[#FDF8F1] text-slate-800 flex flex-col font-sans selection:bg-[#1E5751] selection:text-white" dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema).replace(/</g, '\\u003c') }}
      />

      <StoreHeader />
      <CountrySelectorModal />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/ar" className="hover:text-slate-900 transition">الرئيسية</Link>
          <ChevronLeft className="w-3 h-3 text-slate-400" />
          <span className="text-[#23231E] font-bold">جميع القصص</span>
        </div>

        {/* Category Hero Header */}
        <section className="py-12 px-4 border-b border-amber-900/10">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>المجموعة الكاملة للقصص المخصصة</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-[#23231E] tracking-tight font-serif">
              جميع قصص الأطفال المخصصة
            </h1>

            <div className="text-base sm:text-lg font-bold text-amber-900 font-serif">
              All Personalized Storybooks
            </div>

            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              اكتشف هدايا قيّمة تدوم لأجيال وتُصنع في دقائق. كل قصة تجعل طفلك البطل الحقيقي للمغامرة، مطبوعة بجودة أرشيفية فاخرة على ورق Mohawk بوزن ٢٠٠ جم.
            </p>
          </div>
        </section>

        {/* Interactive catalog: search + filters + sort (client component) */}
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-4 py-16 text-center text-sm font-bold text-slate-500">
              جارٍ تحميل القصص…
            </div>
          }
        >
          <AllBooksView initialLang="ar" />
        </Suspense>

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

        {/* Visible Frequently Asked Questions */}
        <section className="py-16 px-4 bg-white/40 border-t border-amber-900/10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
                <HelpCircle className="w-3.5 h-3.5 text-slate-600" />
                <span>الأسئلة الأكثر شيوعاً</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#23231E] font-serif">
                أسئلة متكررة حول قصصنا
              </h2>
            </div>

            <div className="space-y-4">
              {AR_ALL_BOOKS_FAQS.map((faq, index) => (
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
