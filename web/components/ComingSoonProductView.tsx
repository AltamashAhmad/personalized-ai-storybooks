import Link from 'next/link';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import StoreHeader from '@/components/StoreHeader';
import Footer from '@/components/Footer';
import { ProductStory } from '@/config/products';

interface Props {
  product: ProductStory;
  initialLang?: 'en' | 'ar';
}

/**
 * Honest placeholder for products that have no dedicated story manuscript
 * yet (see web/config/comingSoon.ts). Shows the cover and title with a
 * "Coming Soon" message instead of silently serving the wrong story.
 * The URL keeps its SEO value (200 with real content); nothing here can
 * be purchased or personalized.
 */
export default function ComingSoonProductView({ product, initialLang = 'en' }: Props) {
  const isAr = initialLang === 'ar';
  const title = isAr ? product.titleAr : product.title;
  const allBooksHref = isAr ? '/ar/all-books' : '/all-books';

  return (
    <div
      className="min-h-screen bg-[#FDF8F1] text-slate-900 flex flex-col font-sans"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <StoreHeader />

      <main className="flex-1">
        <section className="py-16 md:py-24 px-4 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/80 border border-amber-300/50 text-amber-900 text-xs font-black uppercase tracking-wider mb-6">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span>{isAr ? 'قريباً' : 'Coming Soon'}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-8 font-serif">
            {title}
          </h1>

          <div className="max-w-md mx-auto mb-8 rounded-3xl overflow-hidden shadow-xl border-4 border-white/90">
            <img
              src={product.coverImage}
              alt={title}
              className="w-full h-auto object-cover"
            />
          </div>

          <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto mb-4 leading-relaxed">
            {isAr
              ? 'هذه القصة قيد الرسم والتلوين حالياً — عُد قريباً لترى المغامرة كاملة.'
              : 'This story is being illustrated right now — check back soon to see the full adventure.'}
          </p>

          <p className="text-sm text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed">
            {isAr
              ? 'نعمل على صياغة أبياتها الشعرية باللغتين العربية والإنجليزية مع التشكيل الكامل.'
              : 'We are crafting its bilingual English and Arabic verses with full Tashkeel diacritics.'}
          </p>

          <Link
            href={allBooksHref}
            className="inline-flex items-center justify-center gap-2 bg-[#1E5751] hover:bg-[#16433e] text-white font-black text-lg px-8 py-4 rounded-2xl shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Sparkles className="w-5 h-5" />
            <span>{isAr ? 'تصفح القصص المتاحة' : 'Browse Available Stories'}</span>
            <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
          </Link>
        </section>
      </main>

      <Footer initialLang={initialLang} />
    </div>
  );
}
