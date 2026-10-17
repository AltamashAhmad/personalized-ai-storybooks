'use client';

import React from 'react';
import Link from 'next/link';
import { Award, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS, ProductStory } from '@/config/products';
import { isComingSoon } from '@/config/comingSoon';
import { CATEGORY_TILES } from '@/lib/utils/categoryMatch';
import { TRANSLATIONS } from '@/config/translations';

export interface BookCarouselProps {
  isAr: boolean;
  dir: 'rtl' | 'ltr';
  products?: ProductStory[];
  title?: string;
  subtitle?: string;
  // Legacy props from the old filter-pills layout. Kept optional for
  // compatibility with older callers; the curated layout ignores them.
  categoryFilter?: string;
  setCategoryFilter?: (val: string) => void;
}

// Curated flagship shelf: the #1 bestseller first, then the top-rated
// purchasable books. Every id below resolves to a purchasable product
// (verified against web/config/comingSoon.ts); the isComingSoon guard
// below keeps gated products out even if the catalog changes.
const BESTSELLER_IDS = [
  'starlit-dunes',
  'baby-milestone-chronicle',
  'calligraphy-apprentice-letters',
  'first-ramadan-lantern',
  'young-architect-wonder-towers',
  'pearl-diver-treasure',
  'pottery-artisan-hatta',
  'super-sibling-adventure',
];

export default function BookCarousel({
  isAr,
  dir,
  title,
  subtitle,
}: BookCarouselProps) {
  const t = TRANSLATIONS[isAr ? 'ar' : 'en'];
  const getLocalizedPath = (path: string) => (isAr ? `/ar${path}` : path);

  const bestsellers: ProductStory[] = BESTSELLER_IDS.map((id) =>
    PRODUCTS.find((p) => p.id === id)
  ).filter((p): p is ProductStory => Boolean(p) && !isComingSoon(p.slug)).slice(0, 8);

  const ctaLabel = isAr
    ? `عرض جميع الكتب (${PRODUCTS.length})`
    : `View all ${PRODUCTS.length} books`;

  return (
    <section id="catalog" className="py-16 md:py-24 max-w-7xl mx-auto px-4 w-full border-t border-amber-900/10" dir={dir}>
      {/* Section header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-[#1E5751] mb-2">
          <Award className="w-4 h-4" />
          <span>{t.catalog.qualityBadge}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-[#23231E] tracking-tight font-serif">
          {title || t.catalog.title}
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          {subtitle || t.catalog.subtitle}
        </p>
      </div>

      {/* Shop by Category */}
      <h3 className="text-xl font-black text-[#23231E] font-serif mb-5">
        {isAr ? 'تسوق حسب الفئة' : 'Shop by Category'}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-14">
        {CATEGORY_TILES.map((tile) => (
          <Link
            key={tile.slug}
            href={getLocalizedPath(`/books/category/${tile.slug}`)}
            className="group bg-white rounded-2xl border border-slate-200 px-4 py-5 flex flex-col items-center justify-center gap-2 text-center shadow-sm hover:shadow-lg hover:border-amber-400/60 hover:-translate-y-0.5 transition-all"
          >
            <span className="text-3xl leading-none" aria-hidden="true">
              {tile.emoji}
            </span>
            <span className="font-extrabold text-sm text-slate-900 group-hover:text-amber-700 transition">
              {isAr ? tile.labelAr : tile.labelEn}
            </span>
          </Link>
        ))}
      </div>

      {/* Bestsellers shelf */}
      <div className="flex items-end justify-between gap-4 mb-6">
        <h3 className="text-xl font-black text-[#23231E] font-serif">
          {isAr ? 'الأكثر مبيعاً' : 'Bestsellers'}
        </h3>
        <Link
          href={getLocalizedPath('/all-books')}
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-black text-[#1E5751] hover:text-amber-700 transition shrink-0"
        >
          <span>{ctaLabel}</span>
          <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bestsellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Mobile / bottom CTA */}
      <div className="mt-10 text-center">
        <Link
          href={getLocalizedPath('/all-books')}
          className="inline-flex items-center gap-2 bg-[#23231E] hover:bg-[#1E5751] text-white font-black text-sm px-8 py-3.5 rounded-2xl transition shadow-md"
        >
          <span>{ctaLabel}</span>
          <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
        </Link>
        <p className="text-xs text-slate-500 mt-3">
          {isAr
            ? 'ابحث ورتّب حسب العمر والمناسبة والتوفر'
            : 'Search and filter by age, occasion and availability'}
        </p>
      </div>
    </section>
  );
}
