'use client';

import React from 'react';
import Link from 'next/link';
import { Award, Feather, ShieldCheck, Sparkles } from 'lucide-react';

export interface ThoughtfullyMadeProps {
  isAr?: boolean;
  dir?: 'ltr' | 'rtl';
}

/**
 * Section S8: ThoughtfullyMade
 * Editorial craftsmanship and brand storytelling block.
 * Highlights master storytelling, 200 GSM Mohawk archival paper,
 * complete Arabic Tashkeel vocalization, and UAE express courier delivery.
 */
export default function ThoughtfullyMade({ isAr = false, dir = 'ltr' }: ThoughtfullyMadeProps) {
  const getLocalizedPath = (path: string) => (isAr ? `/ar${path}` : path);

  const benefits = [
    {
      icon: Feather,
      titleEn: 'Master Storytelling & Rhymes',
      titleAr: 'صياغة أدبية وأوزان شعرية عذبة',
      descEn: 'Narratives written by accomplished children’s authors with authentic Arabic Tashkeel diacritics alongside poetic English verses.',
      descAr: 'نصوص كتبها أدباء أطفال متخصصون، مشكولة بالتشكيل الكامل باللغة العربية الفصحى إلى جانب النسخة الإنجليزية المتقنة.',
    },
    {
      icon: Award,
      titleEn: '200 GSM Mohawk Archival Paper',
      titleAr: 'ورق موهوك الفاخر ٢٠٠ جم',
      descEn: 'Printed on heavyweight, FSC-certified silk uncoated paper that feels velvety soft to touch and lasts for generations.',
      descAr: 'طباعة على ورق حريري سميك معتمد بيئياً، ملمس مخملي راقٍ يحفظ ذكريات الطفولة لأكثر من مائة عام.',
    },
    {
      icon: ShieldCheck,
      titleEn: 'Artisan UAE Printing & Express Delivery',
      titleAr: 'طباعة حرفية في الإمارات وتوصيل سريع',
      descEn: 'Crafted locally in the UAE with 24–48h door-to-door courier dispatch across Abu Dhabi, Dubai, and all 7 Emirates.',
      descAr: 'تُطبع محلياً بأعلى معايير الإتقان، وتصلك خلال ٢٤ إلى ٤٨ ساعة عبر شحن سريع لكافة إمارات الدولة السبع.',
    },
  ];

  return (
    <section className="py-14 md:py-20 bg-white border-b border-[var(--color-sharpie-20,#D9D9D7)]" dir={dir}>
      <div className="wb-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Visual Keepsake Showcase */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-[2px] overflow-hidden bg-[var(--color-kraft-paper,#FBF4E8)] border border-[var(--color-sharpie-20,#D9D9D7)] p-6 sm:p-8 shadow-md">
              <div className="aspect-[4/3] rounded-[2px] overflow-hidden relative mb-6 shadow-inner">
                <img
                  src="/images/hero_magical_background.jpg"
                  alt={isAr ? 'حرفية وجودة كتب الحكايات' : 'Keepsake Book Craftsmanship'}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
                  <div className="text-white">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFD15A] text-[#23231E] font-black text-[10px] uppercase mb-1">
                      {isAr ? 'جودة تذكارية فاخرة' : 'Heirloom Standard'}
                    </span>
                    <p className="text-xs font-bold leading-tight">
                      {isAr ? 'ورق موهوك الحريري ٢٠٠ جم • ألوان بانتون الآمنة للأطفال' : '200 GSM Mohawk Silk • EN71-3 Certified Child-Safe Inks'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-[var(--color-sharpie,#23231E)] pt-3 border-t border-[var(--color-sharpie-20,#D9D9D7)]">
                <span className="flex items-center gap-1.5 text-[#1E5751]">
                  <Sparkles className="w-4 h-4 text-[#C9A96E]" />
                  {isAr ? 'ضمان التذكار لمدى الحياة' : 'Lifetime Keepsake Guarantee'}
                </span>
                <Link
                  href={getLocalizedPath('/quality')}
                  className="text-[#1E5751] hover:underline font-extrabold"
                >
                  {isAr ? 'تفاصيل الجودة ➔' : 'Quality Specs ➔'}
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy & Benefit Pillars */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="max-w-xl">
              <span className="inline-block text-xs font-black uppercase tracking-wider text-[#1E5751] bg-emerald-50 px-3 py-1 rounded-full mb-3 border border-emerald-200/60">
                {isAr ? 'عناية فائقة بكل تفصيل' : 'Thoughtfully Made'}
              </span>
              <h2 className="wb-heading text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
                {isAr ? 'صُنعت بعناية فائقة لتبقى إلى الأبد' : 'Thoughtfully made to keep forever'}
              </h2>
              <p className="wb-body text-sm sm:text-base text-[var(--color-sharpie-80,#555553)] leading-relaxed mb-8">
                {isAr
                  ? 'يصوغ أدباؤنا ورسّامونا ومترجمونا قصصنا باهتمام بالغ، لتفاجئ من تحب بحكاية استثنائية يحتفظون بها ويفخرون بقراءتها جيلاً بعد جيل.'
                  : 'Award-winning authors, illustrators and translators craft our books with care, so you can delight the people you love with stories they’ll want to keep forever.'}
              </p>

              <div className="space-y-6">
                {benefits.map((b, idx) => {
                  const Icon = b.icon;
                  return (
                    <div key={idx} className="flex gap-4">
                      <div className="w-10 h-10 rounded-[2px] bg-[var(--color-kraft-paper,#FBF4E8)] text-[#1E5751] border border-[var(--color-sharpie-20,#D9D9D7)] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[#1E5751]" />
                      </div>
                      <div>
                        <h3 className="wb-heading text-base font-bold mb-1">
                          {isAr ? b.titleAr : b.titleEn}
                        </h3>
                        <p className="wb-body text-xs sm:text-sm text-[var(--color-sharpie-80,#555553)] leading-relaxed">
                          {isAr ? b.descAr : b.descEn}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
