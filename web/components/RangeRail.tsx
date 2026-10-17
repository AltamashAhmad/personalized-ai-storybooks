'use client';

import React from 'react';
import Link from 'next/link';

export interface RangeRailItem {
  id: string;
  titleEn: string;
  titleAr: string;
  href: string;
  imageUrl: string;
  accentBg: string;
}

export interface RangeRailProps {
  isAr?: boolean;
  dir?: 'ltr' | 'rtl';
}

const DEFAULT_RANGE_ITEMS: RangeRailItem[] = [
  {
    id: 'age-0-3',
    titleEn: 'Ages 0–3 Years',
    titleAr: 'من ٠ إلى ٣ سنوات',
    href: '/books/category/0-3-years',
    imageUrl: '/images/category_for_babies.jpg',
    accentBg: 'from-amber-100 to-amber-200',
  },
  {
    id: 'age-3-6',
    titleEn: 'Ages 3–6 Years',
    titleAr: 'من ٣ إلى ٦ سنوات',
    href: '/books/category/3-6-years',
    imageUrl: '/images/category_for_kids.jpg',
    accentBg: 'from-emerald-100 to-teal-200',
  },
  {
    id: 'age-6-9',
    titleEn: 'Ages 6–9 Years',
    titleAr: 'من ٦ إلى ٩ سنوات',
    href: '/books/category/6-9-years',
    imageUrl: '/images/category_for_family.jpg',
    accentBg: 'from-indigo-100 to-blue-200',
  },
  {
    id: 'newborn',
    titleEn: 'Newborn Keepsakes',
    titleAr: 'هدايا المواليد الجدد',
    href: '/books/category/newborn',
    imageUrl: '/images/gift_box_packaging.jpg',
    accentBg: 'from-rose-100 to-pink-200',
  },
];

/**
 * Section S5: RangeRail
 * "Brilliant, buzz-worthy, best-loved books" category navigation strip.
 * Features 300px (desktop) / 250px (tablet) / 175px (mobile) image cards
 * with floating bottom pill CTAs that invert on hover.
 */
export default function RangeRail({ isAr = false, dir = 'ltr' }: RangeRailProps) {
  const getLocalizedPath = (path: string) => (isAr ? `/ar${path}` : path);

  return (
    <section className="py-12 md:py-16 bg-[var(--color-kraft-paper-60,#FDF8F1)] border-b border-[var(--color-sharpie-20,#D9D9D7)]" dir={dir}>
      <div className="wb-container">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="wb-heading text-2xl md:text-3xl lg:text-4xl font-black mb-3">
            {isAr ? 'كتب ملهمة ومحبوبة للأطفال' : 'Brilliant, buzz-worthy, best-loved books'}
          </h2>
          <p className="wb-body text-sm md:text-base text-[var(--color-sharpie-80,#555553)]">
            {isAr ? 'استكشف مجموعتنا حسب المرحلة العمرية والمناسبات المميزة' : 'Meet our smash-hit personalized stories across every age group'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {DEFAULT_RANGE_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={getLocalizedPath(item.href)}
              className="group relative flex flex-col h-[175px] sm:h-[250px] lg:h-[300px] overflow-hidden rounded-[2px] bg-[var(--color-kraft-paper,#FBF4E8)] border border-[var(--color-sharpie-20,#D9D9D7)] shadow-xs transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={isAr ? item.titleAr : item.titleEn}
                  className="w-full h-full object-cover object-center opacity-85 transition-opacity duration-200 group-hover:opacity-95 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${item.accentBg} opacity-60 mix-blend-multiply`} />
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-200" />
              </div>

              {/* Centered Floating Pill CTA */}
              <div className="relative mt-auto mb-4 mx-auto z-10">
                <span className="inline-block px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white text-[var(--color-racing-green,#1E5751)] text-xs sm:text-sm font-extrabold tracking-tight shadow-md border border-slate-200/80 transition-colors duration-200 group-hover:bg-[var(--color-racing-green,#1E5751)] group-hover:text-white group-hover:border-[var(--color-racing-green,#1E5751)] text-center whitespace-nowrap">
                  {isAr ? item.titleAr : item.titleEn}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
