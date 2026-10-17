'use client';

import React from 'react';
import { Palette } from 'lucide-react';
import { KEEPSAKE_COVER_COLORS } from '@/config/sampleBookData';

export interface CoverFormatSelectorProps {
  isAr: boolean;
  coverColor: string;
  setCoverColor: (val: string) => void;
  coverFormat: 'softcover' | 'hardcover' | 'layflat' | 'digital';
  setCoverFormat: (val: 'softcover' | 'hardcover' | 'layflat' | 'digital') => void;
  /** Digital-only launch: physical formats render disabled with a coming-soon badge. */
  digitalOnly?: boolean;
}

interface PhysicalFormat {
  id: 'softcover' | 'hardcover' | 'layflat';
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  price: string;
  badgeEn?: string;
  badgeAr?: string;
}

const PHYSICAL_FORMATS: PhysicalFormat[] = [
  {
    id: 'softcover' as const,
    titleEn: 'Softcover',
    titleAr: 'غِلَافٌ مَرِنٌ',
    descEn: 'Lightweight & flexible',
    descAr: 'خَفِيفٌ وَسَهْلُ الْحَمْلِ',
    price: '49 AED',
  },
  {
    id: 'hardcover' as const,
    titleEn: 'Hardcover Keepsake',
    titleAr: 'غِلَافٌ مُقَوًّى كَلَاسِيكِيٌّ',
    descEn: 'Durable gloss finish',
    descAr: 'تَجْلِيدٌ صَلْبٌ لَامِعٌ فَاخِرٌ',
    price: '79 AED',
    badgeEn: 'Most Popular',
    badgeAr: 'الْأَكْثَرُ طَلَباً',
  },
  {
    id: 'layflat' as const,
    titleEn: 'Deluxe Layflat',
    titleAr: 'إِصْدَارٌ مَلَكِيٌّ مُنْبَسِطٌ',
    descEn: 'Stitch layflat binding',
    descAr: 'تَجْلِيدُ خِيَاطَةٍ وَوَرَقٌ سَمِيكٌ',
    price: '99 AED',
  },
];

export default function CoverFormatSelector({
  isAr,
  coverColor,
  setCoverColor,
  coverFormat,
  setCoverFormat,
  digitalOnly = false,
}: CoverFormatSelectorProps) {
  return (
    <>
      {/* Feature 15: Keepsake Cover Colorways */}
      <div className="flex flex-col gap-2 pt-2 border-t border-amber-900/10">
        <label className="block text-xs font-black text-slate-800 flex items-center gap-1.5 font-serif">
          <Palette className="w-4 h-4 text-[#1E5751]" />
          {isAr ? 'لَوْنُ الْغِلَافِ الْفَاخِرِ:' : 'Keepsake Cover Colorway:'}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {KEEPSAKE_COVER_COLORS.map((col) => {
            const isSelected = coverColor === col.id;
            return (
              <button
                key={col.id}
                type="button"
                onClick={() => setCoverColor(col.id)}
                className={`p-2 rounded-[2px] border-2 flex items-center gap-2 transition cursor-pointer ${
                  isSelected ? 'border-[#1E5751] bg-[#1E5751]/10 shadow-xs' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="w-4 h-4 rounded-full border border-slate-300 shadow-xs shrink-0" style={{ backgroundColor: col.hex }} />
                <span className="text-[11px] font-bold text-slate-800 truncate text-left rtl:text-right">
                  {isAr ? col.nameAr : col.nameEn}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feature 14: Format & Calibrated Pricing (digital 49 / softcover 49 / hardcover 79 / layflat 99 AED) */}
      <div className="pt-2 border-t border-amber-900/10">
        <label className="block text-xs font-black text-slate-800 mb-1.5 font-serif">
          {isAr ? 'نَوْعُ الْغِلَافِ وَالتَّجْلِيدِ:' : 'Book Cover Format & Binding:'}
        </label>
        <div className={`grid gap-2 ${digitalOnly ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 sm:grid-cols-3'}`}>
          {digitalOnly && (
            <button
              type="button"
              onClick={() => setCoverFormat('digital')}
              className={`p-3 rounded-[2px] border-2 text-left rtl:text-right relative transition flex flex-col justify-between cursor-pointer ${
                coverFormat === 'digital' ? 'border-[#1E5751] bg-[#1E5751]/5 shadow-xs' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className="absolute -top-2.5 right-2 rtl:right-auto rtl:left-2 bg-[#1E5751] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-[2px] shadow-xs">
                {isAr ? 'تَوْصِيلٌ فَوْرِيٌّ' : 'Instant'}
              </span>
              <div className="text-xs font-black text-slate-900 font-serif">{isAr ? 'النُّسْخَةُ الرَّقْمِيَّةُ' : 'Digital Edition'}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{isAr ? 'تَصِلُكَ عَلَى الْبَرِيدِ خِلَالَ دَقَائِقَ' : 'In your inbox within minutes'}</div>
              <div className="text-xs font-black text-[#1E5751] mt-2">49 AED</div>
            </button>
          )}

          {PHYSICAL_FORMATS.map((fmt) => {
            const isSelected = coverFormat === fmt.id;
            const isDisabled = digitalOnly;
            return (
              <button
                key={fmt.id}
                type="button"
                onClick={isDisabled ? undefined : () => setCoverFormat(fmt.id)}
                disabled={isDisabled}
                className={`p-3 rounded-[2px] border-2 text-left rtl:text-right relative transition flex flex-col justify-between ${
                  isDisabled
                    ? 'border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed'
                    : 'cursor-pointer'
                } ${
                  isSelected && !isDisabled ? 'border-[#1E5751] bg-[#1E5751]/5 shadow-xs' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {(isDisabled || fmt.badgeEn) && (
                  <span className={`absolute -top-2.5 right-2 rtl:right-auto rtl:left-2 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-[2px] shadow-xs ${
                    isDisabled ? 'bg-amber-600' : 'bg-[#1E5751]'
                  }`}>
                    {isDisabled ? (isAr ? 'قَرِيباً' : 'Coming soon') : (isAr ? fmt.badgeAr : fmt.badgeEn)}
                  </span>
                )}
                <div className="text-xs font-black text-slate-900 font-serif">{isAr ? fmt.titleAr : fmt.titleEn}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{isAr ? fmt.descAr : fmt.descEn}</div>
                <div className="text-xs font-black text-[#1E5751] mt-2">{fmt.price}</div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
