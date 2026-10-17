'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { DEDICATION_TEMPLATES } from '@/config/sampleBookData';

export interface DedicationStepProps {
  isAr: boolean;
  dedication: string;
  setDedication: (val: string) => void;
  giverName: string;
  setGiverName: (val: string) => void;
  hasPhoto: boolean;
  setHasPhoto: (val: boolean) => void;
}

export default function DedicationStep({
  isAr,
  dedication,
  setDedication,
  giverName,
  setGiverName,
  hasPhoto,
  setHasPhoto,
}: DedicationStepProps) {
  return (
    <div className="flex flex-col gap-2.5 pt-2 border-t border-amber-900/10">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black text-slate-900 flex items-center gap-1.5 font-serif">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          {isAr ? 'إِهْدَاءٌ خَاصٌّ وَتَوْقِيعٌ تِذْكَارِيٌّ:' : 'Sentimental Dedication & Note:'}
        </span>
        <span className={`text-[10px] font-bold ${dedication.length > 350 ? 'text-rose-600' : 'text-slate-400'}`}>
          {dedication.length}/400
        </span>
      </div>

      {/* Quick Template Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {DEDICATION_TEMPLATES.map((tmpl) => (
          <button
            key={tmpl.id}
            type="button"
            onClick={() => setDedication(isAr ? tmpl.verseAr : tmpl.verseEn)}
            className="shrink-0 px-2.5 py-1 rounded-[2px] text-[10px] font-bold bg-white hover:bg-[#1E5751]/10 text-slate-700 hover:text-[#1E5751] border border-amber-900/15 transition cursor-pointer shadow-xs"
          >
            {isAr ? tmpl.nameAr : tmpl.nameEn}
          </button>
        ))}
      </div>

      <textarea
        rows={3}
        maxLength={400}
        value={dedication}
        onChange={(e) => setDedication(e.target.value.slice(0, 400))}
        placeholder={isAr ? 'اُكْتُبْ إِهْدَاءَكَ الْخَاصَّ هُنَا...' : 'Write your loving dedication message...'}
        className="w-full p-2.5 rounded-[2px] border border-amber-900/20 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#1E5751] focus:border-[#1E5751] resize-none shadow-xs"
      />

      <div>
        <label className="block text-[10px] font-bold text-slate-600 mb-1">
          {isAr ? 'اِسْمُ الْمُهْدِي (التَّوْقِيعُ):' : 'Giver Name (Signature):'}
        </label>
        <input
          type="text"
          maxLength={30}
          value={giverName}
          onChange={(e) => setGiverName(e.target.value)}
          placeholder={isAr ? 'مِثَال: مَامَا وَبَابَا' : 'e.g. Mama & Baba'}
          className="w-full px-2.5 py-1.5 rounded-[2px] border border-slate-200 text-xs font-bold bg-white focus:outline-none focus:ring-1 focus:ring-[#1E5751]"
        />
      </div>
      {/* TODO: Keepsake photo upload is NOT implemented yet. It previously billed +19 AED
          with no file input and no upload handler. Build a real file input + storage +
          fulfillment handoff before re-enabling the hasPhoto flow. */}
    </div>
  );
}
