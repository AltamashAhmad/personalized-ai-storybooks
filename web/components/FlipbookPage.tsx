'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { StorySpread, CharacterConfig, getSpreadContent } from '@/config/sampleBookData';
import AudioNarrationQrBadge from '@/components/AudioNarrationQrBadge';

export interface FlipbookPageProps {
  currentSpread: StorySpread;
  config: CharacterConfig;
  lang: 'en' | 'ar';
  isAr: boolean;
  isAnimating: boolean;
  turnDirection: 'next' | 'prev' | null;
  animProgress: number;
}

export default function FlipbookPage({
  currentSpread,
  config,
  lang,
  isAr,
  isAnimating,
  turnDirection,
  animProgress,
}: FlipbookPageProps) {
  const content = getSpreadContent(currentSpread, config, lang);
  const occlusionOpacity = Math.sin((animProgress * Math.PI) / 180) * 0.55;

  return (
    <>
      {/* Background Artwork Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={currentSpread.bgImage}
          alt={currentSpread.spreadTitleEn}
          className="w-full h-full object-cover opacity-85 transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-slate-950/90" />
      </div>

      {/* Inset Curvature Shadows (Feature 18) */}
      <div className="absolute left-0 inset-y-0 w-1/2 left-page-curve z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-1/2 right-page-curve z-10 pointer-events-none" />

      {/* Central Spine Gutter Crease Gradient (Feature 18 Contract) */}
      <div
        className="w-6 -ml-3 left-1/2 inset-y-0 absolute z-20 pointer-events-none bg-gradient-to-r from-black/40 via-black/5 to-black/40 shadow-inner"
        style={{ boxShadow: 'var(--shadow-spine)' }}
        aria-hidden="true"
      />

      {/* Dynamic Occlusion Overlay during turning */}
      {isAnimating && (
        <div
          className="absolute inset-0 z-25 pointer-events-none bg-black transition-opacity duration-75"
          style={{ opacity: occlusionOpacity }}
        />
      )}

      {/* Turning Leaf Animated Surface (CSS 3D rotateY) */}
      {isAnimating && (
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-none shadow-2xl"
          style={{
            width: '50%',
            left: turnDirection === 'next' ? '50%' : '0%',
            transformOrigin: turnDirection === 'next' ? 'left center' : 'right center',
            transform: `rotateY(${
              turnDirection === 'next' ? -animProgress : animProgress
            }deg)`,
            transformStyle: 'preserve-3d',
            background: 'linear-gradient(to right, rgba(15,23,42,0.95), rgba(30,41,59,0.9))',
            borderLeft: turnDirection === 'next' ? '1px solid rgba(255,255,255,0.15)' : 'none',
            borderRight: turnDirection === 'prev' ? '1px solid rgba(255,255,255,0.15)' : 'none',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          }}
        >
          <div className="w-full h-full p-6 flex flex-col justify-center items-center opacity-30 text-amber-400">
            <Sparkles className="w-12 h-12 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
        </div>
      )}

      {/* SPREAD CONTENT VIEWPORT */}
      {currentSpread.id === 0 ? (
        /* SPREAD 0: COVER SPREAD */
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-between p-6 sm:p-10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-[#1E5751]/80 text-white border border-[#1E5751] text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isAr ? 'إصدار فاخر خاص' : 'Deluxe Keepsake Edition'}</span>
          </div>

          <div className="my-auto space-y-3 max-w-xl">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white font-serif tracking-tight drop-shadow-lg">
              {isAr ? content.rightTitle || content.rightVerse : content.leftTitle || content.leftVerse}
            </h2>
            <p className="text-sm sm:text-lg text-amber-200/90 font-serif leading-relaxed drop-shadow">
              {isAr
                ? 'كِتَابٌ تَذْكَارِيٌّ سَاحِرٌ عَنِ الشَّجَاعَةِ وَالمُرُوءَةِ'
                : 'A Personalized Keepsake Tale of Courage & Wonder'}
            </p>
          </div>

          <div className="text-xs text-slate-300/80 font-medium">
            {isAr
              ? `صُنِعَ بِكُلِّ حُبٍّ فِي دَوْلَةِ الإِمَارَاتِ العَرَبِيَّةِ المُتَّحِدَةِ • ${config.gifterName || 'مَامَا وَبَابَا'}`
              : `Crafted with Love in the United Arab Emirates • By ${config.gifterName || 'Mama & Baba'}`}
          </div>
        </div>
      ) : (
        /* SPREADS 1–11: DUAL-PAGE READING SPREAD */
        <div className="relative z-10 w-full h-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x md:divide-slate-800/80">
          {/* Left Page (English by default) */}
          <div className="flex-1 p-5 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between text-xs text-amber-500 font-bold uppercase tracking-wider mb-2">
                <span>
                  {currentSpread.id === 1
                    ? 'Dedication Keepsake'
                    : `Page ${currentSpread.spreadNumber * 2 - 1}`}
                </span>
                <span className="text-slate-500 text-[10px]">Preview</span>
              </div>
              {content.leftTitle && (
                <h3 className="text-sm sm:text-base font-bold text-white font-serif mb-3 drop-shadow">
                  {content.leftTitle}
                </h3>
              )}
              <div className="verse-parchment-card p-4 sm:p-5 rounded-[2px] text-slate-100 font-serif text-sm sm:text-base leading-relaxed whitespace-pre-line text-shadow-arabic border border-white/10 shadow-md">
                {content.leftVerse}
              </div>
            </div>

            {content.leftNote && (
              <p className="text-[11px] text-slate-400 italic mt-3 text-center sm:text-left">
                {content.leftNote}
              </p>
            )}
          </div>

          {/* Right Page (Arabic with 100% Vocalized Tashkeel) */}
          <div
            className="flex-1 p-5 sm:p-8 flex flex-col justify-between overflow-y-auto"
            dir="rtl"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-amber-500 font-bold uppercase tracking-wider mb-2">
                <span>
                  {currentSpread.id === 1
                    ? 'رسالة الإهداء والتسجيل الصوتي'
                    : `صفحة ${currentSpread.spreadNumber * 2}`}
                </span>
                <span className="text-slate-500 text-[10px]">تشكيل كامل</span>
              </div>

              {content.rightTitle && (
                <h3 className="text-sm sm:text-base font-bold text-white font-serif mb-3 drop-shadow font-amiri">
                  {content.rightTitle}
                </h3>
              )}

              {/* SPREAD 1: Dedication & QR Audio Badge */}
              {currentSpread.id === 1 ? (
                <div className="space-y-4">
                  <div className="verse-parchment-card p-4 sm:p-5 rounded-[2px] text-amber-100 font-amiri text-sm sm:text-base leading-loose whitespace-pre-line text-shadow-arabic border border-white/10 shadow-md">
                    {content.rightVerse}
                  </div>
                  <div className="pt-1">
                    <AudioNarrationQrBadge
                      childName={config.protagonist.name}
                      giftId="starlit-audio"
                      lang={lang}
                    />
                  </div>
                </div>
              ) : (
                <div className="verse-parchment-card p-4 sm:p-5 rounded-[2px] text-slate-100 font-amiri text-sm sm:text-base leading-loose whitespace-pre-line text-shadow-arabic border border-white/10 shadow-md">
                  {content.rightVerse}
                </div>
              )}
            </div>

            {content.rightNote && (
              <p className="text-[11px] text-slate-400 font-amiri mt-3 text-center sm:text-right">
                {content.rightNote}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
