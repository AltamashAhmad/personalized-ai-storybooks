'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, Tag, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS } from '@/config/products';
import { getCategoryBySlug } from '@/config/categories';
import { isComingSoon } from '@/config/comingSoon';
import { CATEGORY_TILES, getMatchingProducts } from '@/lib/utils/categoryMatch';

interface AllBooksViewProps {
  initialLang: 'en' | 'ar';
}

type Availability = 'all' | 'available' | 'soon';
type SortKey = 'featured' | 'rating' | 'az';

const STRINGS = {
  en: {
    searchPlaceholder: 'Search storybooks by title…',
    categoryLabel: 'Category',
    availabilityLabel: 'Availability',
    sortLabel: 'Sort',
    all: 'All',
    available: 'Available',
    comingSoon: 'Coming soon',
    sortFeatured: 'Featured',
    sortRating: 'Top rated',
    sortAZ: 'Name A–Z',
    showing: (n: number) => `Showing ${n} ${n === 1 ? 'storybook' : 'storybooks'}`,
    sub: 'Every book includes free instant 3D preview & bilingual rhymes',
    freePreview: 'Free 3D Virtual Preview',
    noResultsTitle: 'No storybooks found',
    noResultsSub: 'Try a different search or clear your filters.',
    clearFilters: 'Clear filters',
    promoBadge: 'Limited Time Offer',
    promoTitle: 'Buy one book, get a second half price with code BOGO50',
    promoSub: 'Mix and match any two personalized keepsake storybooks. Discount applied automatically at checkout.',
    promoCta: 'Explore All Stories',
  },
  ar: {
    searchPlaceholder: 'ابحث باسم القصة…',
    categoryLabel: 'الفئة',
    availabilityLabel: 'التوفر',
    sortLabel: 'ترتيب',
    all: 'الكل',
    available: 'متاح الآن',
    comingSoon: 'قريباً',
    sortFeatured: 'مميز',
    sortRating: 'الأعلى تقييماً',
    sortAZ: 'أبجدي',
    showing: (n: number) => `عرض ${n} قصة`,
    sub: 'كل كتاب يتضمن معاينة تفاعلية ثلاثية الأبعاد وشعراً عربياً بالتشكيل',
    freePreview: 'معاينة ثلاثية الأبعاد مجانية',
    noResultsTitle: 'لا توجد قصص مطابقة',
    noResultsSub: 'جرّب بحثاً مختلفاً أو امسح الفلاتر.',
    clearFilters: 'مسح الفلاتر',
    promoBadge: 'عرض حصري ولفترة محدودة',
    promoTitle: 'اشترِ كتاباً واحصل على الثاني بنصف السعر مع كود BOGO50',
    promoSub: 'اختر أي قصتين تذكاريتين مخصصتين لأطفالك، وسيتم تطبيق الخصم فورياً وتلقائياً عند الدفع.',
    promoCta: 'استكشف جميع القصص',
  },
};

export default function AllBooksView({ initialLang }: AllBooksViewProps) {
  const isAr = initialLang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const s = STRINGS[initialLang];
  const searchParams = useSearchParams();

  const initialCategory = useMemo(() => {
    const c = searchParams.get('category');
    return c && getCategoryBySlug(c) ? c : 'all';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [category, setCategory] = useState<string>(initialCategory);
  const [query, setQuery] = useState('');
  const [availability, setAvailability] = useState<Availability>('all');
  const [sort, setSort] = useState<SortKey>('featured');

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (category !== 'all') {
      const cat = getCategoryBySlug(category);
      if (cat) list = getMatchingProducts(cat.filterType, cat.filterValue);
    }
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) =>
        [p.title, p.titleAr, p.subtitle, p.subtitleAr].join(' ').toLowerCase().includes(q)
      );
    }
    if (availability === 'available') list = list.filter((p) => !isComingSoon(p.slug));
    if (availability === 'soon') list = list.filter((p) => isComingSoon(p.slug));
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    if (sort === 'az') {
      list.sort((a, b) =>
        (isAr ? a.titleAr : a.title).localeCompare(isAr ? b.titleAr : b.title, isAr ? 'ar' : 'en')
      );
    }
    return list;
  }, [category, query, availability, sort, isAr]);

  const hasActiveFilters =
    category !== 'all' || query.trim() !== '' || availability !== 'all';

  const clearAll = () => {
    setCategory('all');
    setQuery('');
    setAvailability('all');
    setSort('featured');
  };

  const chipClass = (active: boolean) =>
    `px-4 py-2 rounded-full text-xs font-bold transition border ${
      active
        ? 'bg-[#1E5751] text-white border-[#1E5751] shadow-sm'
        : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
    }`;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 w-full" dir={dir}>
      {/* Search + sort row */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center mb-5">
        <div className="relative flex-1">
          <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 ${isAr ? 'right-4' : 'left-4'}`} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={s.searchPlaceholder}
            aria-label={s.searchPlaceholder}
            className={`w-full bg-white border border-slate-200 rounded-2xl py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#1E5751] focus:ring-2 focus:ring-[#1E5751]/15 transition ${isAr ? 'pr-11 pl-10' : 'pl-11 pr-10'}`}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label={s.clearFilters}
              className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 hover:text-slate-700 ${isAr ? 'left-4' : 'right-4'}`}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <label className="flex items-center gap-2 text-xs font-bold text-slate-600 shrink-0">
          <span>{s.sortLabel}</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 outline-none focus:border-[#1E5751] cursor-pointer"
          >
            <option value="featured">{s.sortFeatured}</option>
            <option value="rating">{s.sortRating}</option>
            <option value="az">{s.sortAZ}</option>
          </select>
        </label>
      </div>

      {/* Category chips */}
      <div className="mb-3">
        <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
          {s.categoryLabel}
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setCategory('all')} className={chipClass(category === 'all')}>
            {s.all} ({PRODUCTS.length})
          </button>
          {CATEGORY_TILES.map((tile) => (
            <button
              key={tile.slug}
              type="button"
              onClick={() => setCategory(tile.slug)}
              className={chipClass(category === tile.slug)}
            >
              {tile.emoji} {isAr ? tile.labelAr : tile.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Availability chips */}
      <div className="mb-8">
        <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
          {s.availabilityLabel}
        </div>
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: 'all', label: s.all },
              { id: 'available', label: s.available },
              { id: 'soon', label: s.comingSoon },
            ] as { id: Availability; label: string }[]
          ).map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setAvailability(opt.id)}
              className={chipClass(availability === opt.id)}
            >
              {opt.label}
            </button>
          ))}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="px-4 py-2 rounded-full text-xs font-bold text-slate-500 hover:text-slate-900 underline underline-offset-2"
            >
              {s.clearFilters}
            </button>
          )}
        </div>
      </div>

      {/* Results header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-amber-900/10">
        <div>
          <h2 className="text-xl font-black text-[#23231E] font-serif">{s.showing(filtered.length)}</h2>
          <p className="text-xs text-slate-500">{s.sub}</p>
        </div>
        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 hidden sm:flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-emerald-600" />
          <span>{s.freePreview}</span>
        </span>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product, index) => (
            <React.Fragment key={product.id}>
              <ProductCard product={product} />
              {!hasActiveFilters && index === 2 && (
                <div className="bg-[#1E5751] text-white rounded-[2px] p-8 flex flex-col justify-between shadow-md relative overflow-hidden group">
                  <div className={`absolute -top-12 ${isAr ? '-left-12' : '-right-12'} w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none`} />
                  <div>
                    <span className="inline-block bg-[#FFD15A] text-[#23231E] font-black text-[11px] uppercase tracking-wider px-3 py-1 rounded-full mb-6">
                      {s.promoBadge}
                    </span>
                    <h3 className="text-3xl font-black font-serif leading-tight mb-4">
                      {s.promoTitle}
                    </h3>
                    <p className="text-emerald-100 text-xs leading-relaxed">
                      {s.promoSub}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-white/20">
                    <Link
                      href={isAr ? '/ar#catalog' : '/#catalog'}
                      className="w-full bg-white hover:bg-emerald-50 text-[#1E5751] font-black text-xs py-3 px-4 rounded-[2px] text-center block transition shadow-sm"
                    >
                      {s.promoCta}
                    </Link>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4" aria-hidden="true">🔍</div>
          <h3 className="text-lg font-black text-[#23231E] mb-2">{s.noResultsTitle}</h3>
          <p className="text-sm text-slate-500 mb-6">{s.noResultsSub}</p>
          <button
            type="button"
            onClick={clearAll}
            className="bg-[#1E5751] hover:bg-[#163f3b] text-white font-black text-sm px-6 py-3 rounded-2xl transition"
          >
            {s.clearFilters}
          </button>
        </div>
      )}
    </section>
  );
}
