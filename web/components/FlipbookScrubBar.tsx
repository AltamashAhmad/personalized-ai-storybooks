'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { StorySpread } from '@/config/sampleBookData';

export interface FlipbookScrubBarProps {
  spreads: StorySpread[];
  currentSpreadIndex: number;
  onSpreadChange: (newIndex: number) => void;
  isAr: boolean;
  isAnimating: boolean;
  turnPrev: () => void;
  turnNext: () => void;
}

export default function FlipbookScrubBar({
  spreads,
  currentSpreadIndex,
  onSpreadChange,
  isAr,
  isAnimating,
  turnPrev,
  turnNext,
}: FlipbookScrubBarProps) {
  const [hoveredThumbIndex, setHoveredThumbIndex] = useState<number | null>(null);

  return (
    <div className="w-full pt-4 mt-2 border-t border-slate-800 flex flex-col items-center">
      {/* Navigation Step Buttons and Scrubber Track */}
      <div className="w-full flex items-center justify-between gap-3">
        <button
          type="button"
          disabled={currentSpreadIndex === 0 || isAnimating}
          onClick={turnPrev}
          className="flex items-center gap-1 px-3 py-1.5 rounded-[2px] bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 transition cursor-pointer border border-slate-700/70"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isAr ? 'السابق' : 'Previous'}</span>
        </button>

        {/* 12-Spread Thumbnail Scrub Strip */}
        <div className="relative flex items-center gap-2 overflow-x-auto px-2 py-2 max-w-full no-scrollbar">
          {spreads.map((s, idx) => {
            const isSelected = currentSpreadIndex === idx;
            const label =
              idx === 0
                ? isAr
                  ? 'الغلاف'
                  : 'Cover'
                : idx === spreads.length - 1
                ? isAr
                  ? 'الخاتمة'
                  : 'Finale'
                : `${idx * 2 - 1}–${idx * 2}`;

            return (
              <div
                key={s.id}
                className="relative flex flex-col items-center group"
                onMouseEnter={() => setHoveredThumbIndex(idx)}
                onMouseLeave={() => setHoveredThumbIndex(null)}
              >
                {/* Floating Hover Card Preview (Feature 21) */}
                {hoveredThumbIndex === idx && (
                  <div
                    className="absolute bottom-full mb-3 z-40 w-44 p-2 rounded-[2px] bg-slate-900 border border-[#1E5751]/80 shadow-2xl pointer-events-none transform -translate-x-1/2 left-1/2 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-150"
                    style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.8))' }}
                  >
                    <div className="w-full h-20 rounded-[2px] overflow-hidden mb-1.5 border border-slate-700">
                      <img
                        src={s.bgImage}
                        alt={s.spreadTitleEn}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                      {label}
                    </p>
                    <p className="text-[11px] font-semibold text-white leading-tight line-clamp-2">
                      {isAr ? s.spreadTitleAr : s.spreadTitleEn}
                    </p>
                    <div className="w-2 h-2 bg-slate-900 border-b border-r border-[#1E5751]/80 transform rotate-45 -mb-3 mt-1" />
                  </div>
                )}

                {/* Thumbnail Button — disabled while animating, same as Prev/Next */}
                <button
                  type="button"
                  disabled={isAnimating}
                  onClick={() => onSpreadChange(idx)}
                  className={`relative w-9 h-9 sm:w-11 sm:h-11 rounded-[2px] overflow-hidden border-2 transition transform active:scale-95 cursor-pointer flex-shrink-0 disabled:opacity-30 disabled:cursor-not-allowed ${
                    isSelected
                      ? 'border-[#1E5751] shadow-md shadow-[#1E5751]/40 scale-105'
                      : 'border-slate-700/80 hover:border-slate-400 opacity-70 hover:opacity-100'
                  }`}
                  title={isAr ? s.spreadTitleAr : s.spreadTitleEn}
                  aria-label={`Thumbnail: Jump to spread ${label}`}
                >
                  <img
                    src={s.bgImage}
                    alt={s.spreadTitleEn}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className={`absolute inset-x-0 bottom-0 text-[8px] font-black leading-tight text-center py-0.5 ${
                      isSelected
                        ? 'bg-[#1E5751] text-white'
                        : 'bg-black/70 text-slate-200'
                    }`}
                  >
                    {label}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          disabled={currentSpreadIndex === spreads.length - 1 || isAnimating}
          onClick={turnNext}
          className="flex items-center gap-1 px-3 py-1.5 rounded-[2px] bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 transition cursor-pointer border border-slate-700/70"
        >
          <span className="hidden sm:inline">{isAr ? 'التالي' : 'Next'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
