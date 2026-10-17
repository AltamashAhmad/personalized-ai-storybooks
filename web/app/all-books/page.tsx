import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ShieldCheck, Sparkles, ChevronRight, HelpCircle, ChevronDown } from 'lucide-react';
import CountrySelectorModal from '@/components/CountrySelectorModal';
import StoreHeader from '@/components/StoreHeader';
import Footer from '@/components/Footer';
import AllBooksView from '@/components/AllBooksView';
import { PRODUCTS } from '@/config/products';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://personalizedtales.com').replace(/\/+$/, '');

export const metadata: Metadata = {
  title: "All Personalized Storybooks",
  description: "Browse all personalized children's storybooks from PersonalizedTales UAE. Handcrafted heirloom keepsakes with bilingual English & Arabic rhymes, made in Abu Dhabi.",
  alternates: {
    canonical: `${siteUrl}/all-books`,
    languages: {
      'en-AE': `${siteUrl}/all-books`,
      'ar-AE': `${siteUrl}/ar/all-books`,
      'x-default': `${siteUrl}/all-books`,
    },
  },
  openGraph: {
    locale: 'en_AE',
    title: "All Personalized Storybooks | PersonalizedTales UAE",
    description: "Browse all personalized children's storybooks. Free instant 3D preview, bilingual English & Arabic rhymes, 24–48h express delivery across the UAE.",
    url: `${siteUrl}/all-books`,
    type: 'website',
  },
};

const ALL_BOOKS_FAQS = [
  {
    question: "How do I personalize a book from the catalog?",
    answer: "Simply click 'Personalize' on any storybook, enter your child's name, choose their character appearance (skin tone, hair style, hair color, and glasses), and add a loving family dedication message. You can instantly preview the full book in 3D before ordering."
  },
  {
    question: "Are all books bilingual with Arabic Tashkeel diacritics?",
    answer: "Yes, every book is thoughtfully written in both lyrical English and Modern Standard Arabic with complete vocalized Tashkeel diacritics, promoting early bilingual language development."
  },
  {
    question: "What paper and binding formats are available?",
    answer: "We offer three heirloom formats: Softcover (49 AED), Classic Hardcover Keepsake (79 AED), and Deluxe 180° Layflat (99 AED). All formats are printed on FSC® certified 200 GSM Mohawk silk paper with child-safe vegetable inks."
  },
  {
    question: "How fast is delivery across the United Arab Emirates?",
    answer: "Express courier delivery is completely FREE on every order across all 7 Emirates (24–48h)."
  }
];

export default function AllBooksPage() {
  const displayProducts = PRODUCTS;

  // JSON-LD ItemList Schema
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: "All Personalized Children's Books",
    description: "Browse our complete collection of personalized children's books and heirloom keepsakes.",
    url: `${siteUrl}/all-books`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: displayProducts.map((p, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `${siteUrl}/books/${p.slug}`,
        name: p.title,
        image: p.coverImage.startsWith('http') ? p.coverImage : `${siteUrl}${p.coverImage}`,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-[#FDF8F1] text-slate-800 flex flex-col font-sans selection:bg-[#1E5751] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema).replace(/</g, '\\u003c') }}
      />

      <StoreHeader />
      <CountrySelectorModal />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-[#23231E] font-bold">All Books</span>
        </div>

        {/* Category Hero Header */}
        <section className="py-12 px-4 border-b border-amber-900/10">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Full Storybook Collection</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-[#23231E] tracking-tight font-serif">
              All Personalized Storybooks
            </h1>

            <div className="text-base sm:text-lg font-bold text-amber-900 font-serif" dir="rtl">
              جميع قصص الأطفال المخصصة
            </div>

            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Discover meaningful personalized gifts made in minutes. Each book features your child as the courageous star, with lyrical bilingual storytelling on 200 GSM archival Mohawk paper.
            </p>
          </div>
        </section>

        {/* Interactive catalog: search + filters + sort (client component) */}
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-4 py-16 text-center text-sm font-bold text-slate-500">
              Loading storybooks…
            </div>
          }
        >
          <AllBooksView initialLang="en" />
        </Suspense>

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

        {/* Visible Frequently Asked Questions */}
        <section className="py-16 px-4 bg-white/40 border-t border-amber-900/10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
                <HelpCircle className="w-3.5 h-3.5 text-slate-600" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#23231E] font-serif">
                Questions About Our Storybooks
              </h2>
            </div>

            <div className="space-y-4">
              {ALL_BOOKS_FAQS.map((faq, index) => (
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
