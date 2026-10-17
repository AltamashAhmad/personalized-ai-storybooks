'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { TRANSLATIONS } from '@/config/translations';

export interface HeroPersonalizerProps {
  isAr: boolean;
  dir: 'rtl' | 'ltr';
  quickName?: string;
  setQuickName?: (val: string) => void;
  handleStart?: (e: React.FormEvent) => void;
  popularNames?: string[];
}

export default function HeroPersonalizer({
  isAr,
  dir,
}: HeroPersonalizerProps) {
  const t = TRANSLATIONS[isAr ? 'ar' : 'en'];

  return (
    <section
      dir={dir}
      className="relative overflow-hidden bg-slate-950 lg:aspect-video"
    >
      {/* Component-scoped motion: pure CSS keyframes, disabled under prefers-reduced-motion */}
      <style>{`
        @keyframes pt-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes pt-float-soft { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        @keyframes pt-twinkle { 0%,100% { opacity: .12; transform: scale(.75) rotate(0deg); } 50% { opacity: .95; transform: scale(1.15) rotate(20deg); } }
        @keyframes pt-drift { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(48px,-36px) scale(1.1); } }
        @keyframes pt-drift-alt { 0%,100% { transform: translate(0,0) scale(1.05); } 50% { transform: translate(-44px,28px) scale(1); } }
        @keyframes pt-reveal { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
        .pt-motion { animation-fill-mode: both; }
        .pt-reveal { animation-name: pt-reveal; animation-duration: .9s; animation-timing-function: cubic-bezier(.22,1,.36,1); }
        .pt-anim-float { animation-name: pt-float; animation-duration: 7s; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
        .pt-anim-float-soft { animation-name: pt-float-soft; animation-duration: 5.5s; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
        .pt-twinkle { animation-name: pt-twinkle; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
        .pt-drift { animation-name: pt-drift; animation-duration: 16s; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
        .pt-drift-alt { animation-name: pt-drift-alt; animation-duration: 20s; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
        @keyframes pt-kenburns { 0% { transform: scale(1); } 100% { transform: scale(1.08); } }
        .pt-kenburns { animation-name: pt-kenburns; animation-duration: 22s; animation-timing-function: ease-in-out; animation-iteration-count: infinite; animation-direction: alternate; }
        @media (prefers-reduced-motion: reduce) {
          .pt-motion { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* Permanent hero background — full-bleed photo layer (mother & baby illustration) */}
      <div className="absolute inset-0" aria-hidden="true">
        <picture className="pt-motion pt-kenburns absolute inset-0 w-full h-full">
          <source media="(max-width: 768px)" srcSet="/images/hero-bg-mobile.jpg" />
          <img
            src="/images/hero-bg.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </picture>
        {/* Direction-aware scrims keep the overlay copy legible on the dark photo */}
        <div
          className={`absolute inset-0 ${
            dir === 'rtl'
              ? 'bg-gradient-to-l from-slate-950/90 via-slate-950/45 to-slate-950/10'
              : 'bg-gradient-to-r from-slate-950/90 via-slate-950/45 to-slate-950/10'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />
      </div>

      {/* Original hero content on top of the photo */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-14 md:pb-20 min-h-[100svh] lg:min-h-0 flex flex-col lg:block">
        <div className={`${dir === 'rtl' ? 'text-right' : 'text-left'} max-w-3xl w-full flex-1 flex flex-col lg:block`} dir={dir}>
          {/* Mobile top group: headline stays pinned high */}
          <div>

          {/* Main Headline — larger scale, gradient gold highlight */}
          <h1
            className={`pt-motion pt-reveal text-4xl sm:text-6xl lg:text-[4.35rem] font-black ${
              isAr ? 'font-amiri leading-[1.25]' : 'tracking-tight leading-[1.08]'
            } mb-4 sm:mb-6 font-serif text-white text-balance drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)]`}
            style={{ animationDelay: '90ms' }}
          >
            {t.hero.h1Pre}{' '}
            <span className="bg-gradient-to-br from-amber-200 via-[#f5b942] to-amber-200 bg-clip-text text-transparent">
              {t.hero.h1Highlight}
            </span>
          </h1>
          </div>

          {/* Mobile bottom group: subheading + CTA pinned to the bottom */}
          <div className="mt-auto pt-8 lg:mt-0 lg:pt-0">

          {/* Subtitle — short single line */}
          <p
            className="pt-motion pt-reveal text-base sm:text-lg md:text-xl text-white/85 max-w-xl mb-6 sm:mb-8 leading-relaxed font-normal text-balance drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]"
            style={{ animationDelay: '180ms' }}
          >
            {t.hero.subtitleShort}
          </p>

          {/* Simple CTA */}
          <div className="pt-motion pt-reveal" style={{ animationDelay: '270ms' }}>
            <Link
              href={isAr ? '/ar/create/start?book=starlit-dunes' : '/create/start?book=starlit-dunes'}
              className="inline-flex items-center justify-center gap-2 bg-[#1E5751] hover:bg-[#153f3a] text-white font-extrabold px-8 py-4 rounded-2xl shadow-[0_12px_28px_-10px_rgba(30,87,81,0.6)] hover:shadow-[0_16px_36px_-10px_rgba(30,87,81,0.7)] transition-all duration-200 text-base whitespace-nowrap transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
            >
              <span>{t.hero.startFree}</span>
              <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            </Link>
          </div>
          </div>

        </div>

      </div>
    </section>
  );
}
