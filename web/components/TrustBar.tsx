'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ArrowRight } from 'lucide-react';
import { TRANSLATIONS } from '@/config/translations';

export interface TrustBarProps {
  isAr: boolean;
  dir: 'rtl' | 'ltr';
  trustRating?: number;
}

export default function TrustBar({ isAr, dir, trustRating = 4.8 }: TrustBarProps) {
  const t = TRANSLATIONS[isAr ? 'ar' : 'en'];
  const getLocalizedPath = (path: string) => (isAr ? `/ar${path}` : path);

  return (
    <>
      {/* Category Recipient Rail */}
      <section className="py-12 max-w-7xl mx-auto px-4 w-full" dir={dir}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: For Babies */}
          <Link
            href={getLocalizedPath('/books/category/0-3-years')}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
          >
            <div className="relative aspect-square overflow-hidden bg-[#FBF4E8]">
              <Image
                src="/images/category_for_babies.jpg"
                alt={t.recipientRail.forBabies}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 400px"
              />
              <span className={`absolute top-4 ${isAr ? 'right-4' : 'left-4'} bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black text-[#23231E] shadow-sm`}>
                {t.recipientRail.forBabiesAge}
              </span>
            </div>
            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-2xl font-black text-[#23231E] font-serif mb-2 group-hover:text-[#1E5751] transition">
                  {t.recipientRail.forBabies}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {t.recipientRail.forBabiesDesc}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-black text-[#1E5751] group-hover:underline">
                <span>{t.recipientRail.seeRange}</span>
                <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
              </span>
            </div>
          </Link>

          {/* Card 2: For Kids */}
          <Link
            href={getLocalizedPath('/books/category/3-6-years')}
            className="group bg-white rounded-3xl overflow-hidden border-2 border-[#FFD15A] shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col relative"
          >
            <div className="relative aspect-square overflow-hidden bg-[#FBF4E8]">
              <Image
                src="/images/category_for_kids.jpg"
                alt={t.recipientRail.forKids}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 400px"
              />
              <span className={`absolute top-4 ${isAr ? 'right-4' : 'left-4'} bg-[#FFD15A] px-3 py-1 rounded-full text-xs font-black text-[#23231E] shadow-sm`}>
                {t.recipientRail.forKidsAge}
              </span>
            </div>
            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-2xl font-black text-[#23231E] font-serif mb-2 group-hover:text-[#1E5751] transition">
                  {t.recipientRail.forKids}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {t.recipientRail.forKidsDesc}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-black text-[#1E5751] group-hover:underline">
                <span>{t.recipientRail.seeRange}</span>
                <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
              </span>
            </div>
          </Link>

          {/* Card 3: For the Family */}
          <Link
            href={getLocalizedPath('/books/category/for-siblings')}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col sm:col-span-2 lg:col-span-1"
          >
            <div className="relative aspect-square overflow-hidden bg-[#FBF4E8]">
              <Image
                src="/images/category_for_family.jpg"
                alt={t.recipientRail.forFamily}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 400px"
              />
              <span className={`absolute top-4 ${isAr ? 'right-4' : 'left-4'} bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black text-[#23231E] shadow-sm`}>
                {t.recipientRail.forFamilyAge}
              </span>
            </div>
            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-2xl font-black text-[#23231E] font-serif mb-2 group-hover:text-[#1E5751] transition">
                  {t.recipientRail.forFamily}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {t.recipientRail.forFamilyDesc}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-black text-[#1E5751] group-hover:underline">
                <span>{t.recipientRail.seeRange}</span>
                <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Customer Reviews & Social Proof Strip */}
      <section className="py-16 bg-[#FDF8F1] border-b border-amber-900/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10" dir={dir}>
            <div className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-[#1E5751] mb-2">
              {t.reviews.badge}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#23231E] tracking-tight font-serif">
              {t.reviews.title}
            </h2>
            <p className="text-xs font-bold text-slate-500 mt-2">
              <span className="text-slate-900 font-extrabold">{t.hero.trustRating}</span> {t.hero.reviewsCount}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" dir={dir}>
            {[
              { text: t.reviews.r1Text, author: t.reviews.r1Author, city: t.reviews.r1City },
              { text: t.reviews.r2Text, author: t.reviews.r2Author, city: t.reviews.r2City },
              { text: t.reviews.r3Text, author: t.reviews.r3Author, city: t.reviews.r3City },
            ].map((rev, idx) => (
              <div key={idx} className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex text-[#00B67A] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#00B67A]" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed italic mb-4">
                    {rev.text}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{rev.author}</span>
                    <span className="text-slate-400">{rev.city}</span>
                  </div>
                  <span className="text-emerald-600 font-bold">✓ {t.common.verified}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
