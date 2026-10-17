'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, PenTool, Heart, Gift, Layers } from 'lucide-react';
import { TRANSLATIONS } from '@/config/translations';

export interface HowItWorksSectionProps {
  isAr: boolean;
  dir: 'rtl' | 'ltr';
}

export default function HowItWorksSection({ isAr, dir }: HowItWorksSectionProps) {
  const t = TRANSLATIONS[isAr ? 'ar' : 'en'];

  return (
    <>
      {/* 4-Step How It Works Section */}
      <section id="how-it-works" className="py-20 bg-[#FBF4E8] border-y border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#1E5751] mb-2">
            {t.howItWorks.subheading}
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#23231E] mb-4 tracking-tight font-serif">
            {t.howItWorks.title}
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm mb-14">
            {t.howItWorks.subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left" dir={dir}>
            {/* Step 1 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#DAF7C6] text-[#1E5751] flex items-center justify-center font-black text-xl mb-6">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-[#23231E] font-serif mb-2">
                  1. {isAr ? 'اختر القصة المثالية' : "Find a book they'll love"}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {t.howItWorks.step1Desc}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFE39C] text-[#23231E] flex items-center justify-center font-black text-xl mb-6">
                  <PenTool className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-[#23231E] font-serif mb-2">
                  2. {isAr ? 'خصصها بكل حب' : 'Personalize it with care'}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {t.howItWorks.step2Desc}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-black text-xl mb-6">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-[#23231E] font-serif mb-2">
                  3. {isAr ? 'أضف رسالة إهداء دافئة' : 'Add a personal message'}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {isAr ? 'سنطبع كلماتك الرقيقة داخل إطار إهداء مذهب في الصفحة الأولى مجاناً.' : "We'll print your loving dedication inside a gilded archival frame on page 1."}
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xl mb-6">
                  <Gift className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-[#23231E] font-serif mb-2">
                  4. {isAr ? 'قدم هدية تدوم للأبد' : 'Give a gift to remember'}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {t.howItWorks.step3Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship & Gift Packaging Highlights */}
      <section className="py-16 max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" dir={dir}>
          <div className="lg:col-span-6">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <Image
                src="/images/book_craftsmanship.jpg"
                alt="Personalized book craftsmanship on natural wooden table"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-black text-[#1E5751] shadow-sm">
                {t.craftsmanship.badge}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-[#1E5751]">
              <Layers className="w-4 h-4" />
              <span>{t.craftsmanship.badge}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#23231E] tracking-tight font-serif">
              {t.craftsmanship.title}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {t.craftsmanship.subtitle}
            </p>
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 text-center">
                <span className="text-[#1E5751] font-bold text-sm block">200 GSM</span>
                <span className="text-[10px] text-slate-500 font-semibold">{isAr ? 'ورق موهوك الحريري' : 'Mohawk Silk'}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 text-center">
                <span className="text-[#1E5751] font-bold text-sm block">180° Layflat</span>
                <span className="text-[10px] text-slate-500 font-semibold">{isAr ? 'تجليد منبسط متين' : 'PUR Binding'}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 text-center">
                <span className="text-[#1E5751] font-bold text-sm block">EN71-3</span>
                <span className="text-[10px] text-slate-500 font-semibold">{isAr ? 'أحبار نباتية آمنة' : 'Child-safe Inks'}</span>
              </div>
            </div>
            <div>
              <Link href={isAr ? "/ar/quality" : "/quality"} className="inline-flex items-center gap-2 text-xs font-black text-[#1E5751] hover:underline">
                <span>{t.craftsmanship.readStory}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
