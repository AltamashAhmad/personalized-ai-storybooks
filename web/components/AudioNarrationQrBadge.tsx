'use client';

import React from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import QrCodeSvg from '@/lib/qr/QrCodeSvg';

export interface AudioNarrationQrBadgeProps {
  childName: string;
  giftId?: string;
  lang?: 'en' | 'ar';
}

export default function AudioNarrationQrBadge({
  childName,
  giftId = 'starlit-audio',
  lang = 'en',
}: AudioNarrationQrBadgeProps) {
  const isAr = lang === 'ar';
  const qrUrl = `https://personalizedtales.com/unwrap/${giftId}?name=${encodeURIComponent(childName)}&audio=1`;

  return (
    <div className="bg-gradient-to-br from-amber-500/15 via-white/95 to-amber-100/90 border-2 border-amber-500/50 rounded-2xl p-3 shadow-xl flex flex-col items-center text-center max-w-[150px] mx-auto transition transform hover:scale-105">
      <div className="flex items-center gap-1 text-amber-700 mb-1">
        <Volume2 className="w-3.5 h-3.5 animate-pulse text-amber-600" />
        <span className="text-[9px] font-black uppercase tracking-wider">
          {isAr ? 'تسجيل صوتي' : 'Audio Book'}
        </span>
        <Sparkles className="w-3 h-3 text-amber-500" />
      </div>

      {/* High-Contrast Standalone SVG QR Code */}
      <div className="p-1.5 bg-white rounded-xl shadow-inner border border-slate-200">
        <QrCodeSvg value={qrUrl} size={84} />
      </div>

      <div className="mt-1.5 space-y-0.5">
        <p className="text-[9px] font-bold text-slate-800 leading-tight">
          {isAr ? 'امْسَحْ لِسَمَاعِ القِصَّةِ' : 'Scan to Listen to Story'}
        </p>
        <p className="text-[8px] text-amber-800 font-medium">
          {isAr ? 'مع تهويدة النوم والموسيقى' : '& Bedtime Desert Lullaby'}
        </p>
      </div>
    </div>
  );
}
