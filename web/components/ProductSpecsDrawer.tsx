'use client';

import React, { useEffect } from 'react';
import { 
  X, 
  Ruler, 
  BookOpen, 
  FileText, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Award, 
  ArrowRight
} from 'lucide-react';
import { useCountry } from '@/lib/context/CountryContext';
import { COVER_FORMAT_PRICING } from '@/config/pricing';

interface ProductSpecsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialLang?: 'en' | 'ar';
  onCustomize?: () => void;
}

export default function ProductSpecsDrawer({
  isOpen,
  onClose,
  initialLang,
  onCustomize,
}: ProductSpecsDrawerProps) {
  const { language: contextLang } = useCountry();
  const lang = initialLang || contextLang || 'en';
  const isAr = lang === 'ar';

  // Handle ESC key and scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside 
        className={`relative ${isAr ? 'mr-auto left-0' : 'ml-auto right-0'} w-full max-w-xl bg-white text-slate-900 shadow-2xl h-full flex flex-col z-10 overflow-hidden transition-transform transform duration-300 ease-in-out`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="specs-drawer-title"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-amber-900/10 bg-[#FDF8F1] flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#1E5751]" />
              <h2 id="specs-drawer-title" className="text-lg font-black text-slate-950 font-serif">
                {isAr ? 'مُوَاصَفَاتُ الْكِتَابِ وَجَوْدَةُ الصِّنَاعَةِ' : 'Product Specifications & Craftsmanship'}
              </h2>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              {isAr ? 'جَوْدَةٌ فَاخِرَةٌ صُنِعَتْ لِتَدُومَ وَتَتَوَارَثَهَا الْأَجْيَالُ' : 'Artisanal heirloom quality crafted to last for generations'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-[2px] text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer"
            aria-label={isAr ? 'إغلاق المواصفات' : 'Close specifications'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {/* Key Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Dimensions */}
            <div className="p-4 rounded-[2px] bg-[#FDF8F1] border border-amber-900/10 flex flex-col justify-between shadow-2xs">
              <div className="flex items-center gap-2.5 text-[#1E5751] mb-2">
                <Ruler className="w-5 h-5 shrink-0" />
                <span className="font-black text-xs uppercase tracking-wider font-serif">
                  {isAr ? 'الْأَبْعَادُ وَالْمَقَاسُ الْمُرَبَّعُ' : 'Dimensions & Format'}
                </span>
              </div>
              <div className="text-base font-black text-slate-900 font-serif">
                {'8.5" × 8.5" (210mm × 210mm)'}
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                {isAr 
                  ? 'مَقَاسٌ مُرَبَّعٌ تِذْكَارِيٌّ كَلَاسِيكِيٌّ صُمِّمَ خِصِّيصاً لِلْقِرَاءَةِ الْمُرِيحَةِ فِي الْحِضْنِ وَمُشَارَكَةِ الْوَالِدَيْنِ.'
                  : 'Classic square heirloom format engineered for comfortable two-handed lap reading and bedtime storytelling.'}
              </p>
            </div>

            {/* Page Count */}
            <div className="p-4 rounded-[2px] bg-[#FDF8F1] border border-amber-900/10 flex flex-col justify-between shadow-2xs">
              <div className="flex items-center gap-2.5 text-[#1E5751] mb-2">
                <BookOpen className="w-5 h-5 shrink-0 text-[#1E5751]" />
                <span className="font-black text-xs uppercase tracking-wider font-serif">
                  {isAr ? 'عَدَدُ الصَّفَحَاتِ الدَّاخِلِيَّةِ' : 'Interior Page Count'}
                </span>
              </div>
              <div className="text-base font-black text-slate-900 font-serif">
                {isAr ? '٢٤–٣٢ صفحة ملونة بالكامل' : '24–32 Full-Color Pages'}
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                {isAr 
                  ? '١٢ مَشْهَداً بَانُورَامِيّاً مُزْدَوَجاً مَطْبُوعاً عَلَى وَرَقٍ عَالِي الْكَثَافَةِ بِدُونِ أَيِّ تَسْرِيبٍ لِلْحِبْرِ.'
                  : '12 expansive panoramic dual-spread story scenes printed on high-opacity archival stock with zero bleed.'}
              </p>
            </div>

            {/* Paper Quality */}
            <div className="p-4 rounded-[2px] bg-[#FDF8F1] border border-amber-900/10 flex flex-col justify-between shadow-2xs">
              <div className="flex items-center gap-2.5 text-[#1E5751] mb-2">
                <FileText className="w-5 h-5 shrink-0 text-[#1E5751]" />
                <span className="font-black text-xs uppercase tracking-wider font-serif">
                  {isAr ? 'سَمَاكَةُ وَنَوْعِيَّةُ الْوَرَقِ' : 'Paper Stock & Quality'}
                </span>
              </div>
              <div className="text-base font-black text-slate-900 flex items-center gap-2 font-serif">
                <span>200 GSM Mohawk Silk</span>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-[2px]">FSC® 100%</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                {isAr 
                  ? 'وَرَقُ مُوهُوكْ حَرِيرِيٌّ فَاخِرٌ خَالٍ مِنَ الْأَحْمَاضِ وَمُقَاوِمٌ لِلْبَصَمَاتِ وَالِاصْفِرَارِ لِأَكْثَرَ مِنْ ٥٠ عَاماً.'
                  : 'Acid-free, anti-glare silk coating that resists fingerprints and preserves vibrancy for 50+ years.'}
              </p>
            </div>

            {/* Inks & Child Safety */}
            <div className="p-4 rounded-[2px] bg-[#FDF8F1] border border-amber-900/10 flex flex-col justify-between shadow-2xs">
              <div className="flex items-center gap-2.5 text-[#1E5751] mb-2">
                <ShieldCheck className="w-5 h-5 shrink-0 text-[#1E5751]" />
                <span className="font-black text-xs uppercase tracking-wider font-serif">
                  {isAr ? 'الْأَحْبَارُ وَسَلَامَةُ الطِّفْلِ' : 'Inks & Child Safety'}
                </span>
              </div>
              <div className="text-base font-black text-slate-900 flex items-center gap-2 font-serif">
                <span>EN71-3 Food-Grade Inks</span>
                <span className="text-[9px] bg-[#1E5751]/10 text-[#1E5751] font-bold px-1.5 py-0.5 rounded-[2px]">EN71-3</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                {isAr 
                  ? 'أَحْبَارٌ نَبَاتِيَّةٌ وَصُويَا طَبِيعِيَّةٌ آمِنَةٌ تَمَاماً لِلْأَطْفَالِ وَخَالِيَةٌ مِنَ الْمُرَكَّبَاتِ الْعُضْوِيَّةِ الْمُتَطَايِرَةِ (Zero VOCs).'
                  : '100% non-toxic, child toy safety compliant soy & vegetable inks with zero chemical odor.'}
              </p>
            </div>
          </div>

          {/* Reading Age Guide */}
          <div className="p-5 rounded-[2px] bg-[#FDF8F1] border border-amber-900/15">
            <div className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-wider mb-2 font-serif">
              <Sparkles className="w-4 h-4 text-[#1E5751]" />
              <span>{isAr ? 'دَلِيلُ الْفِئَةِ الْعُمْرِيَّةِ وَنُمُوِّ الْقِرَاءَةِ' : 'Reading Age & Developmental Guide'}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3 text-xs">
              <div className="p-3 bg-white rounded-[2px] border border-amber-900/10 shadow-2xs">
                <div className="font-black text-slate-900 font-serif">{isAr ? '٠–٣ سنوات' : 'Ages 0–3'}</div>
                <div className="text-[10px] text-[#1E5751] font-bold mt-0.5">{isAr ? 'قِرَاءَةُ مَا قَبْلَ النَّوْمِ' : 'Bedtime Lap Reading'}</div>
                <p className="text-[10px] text-slate-500 mt-1 leading-tight">
                  {isAr ? 'أَوْزَانٌ شِعْرِيَّةٌ مُهَدِّئَةٌ وَتَعَرُّفٌ بَصَرِيٌّ عَلَى الِاسْمِ' : 'Soothing rhyming cadence and visual name recognition'}
                </p>
              </div>

              <div className="p-3 bg-white rounded-[2px] border-2 border-[#1E5751] shadow-2xs">
                <div className="font-black text-slate-900 font-serif">{isAr ? '٣–٦ سنوات' : 'Ages 3–6'}</div>
                <div className="text-[10px] text-[#1E5751] font-bold mt-0.5">{isAr ? 'الِارْتِبَاطُ بِالْبَطَلِ' : 'Character Hero'}</div>
                <p className="text-[10px] text-slate-500 mt-1 leading-tight">
                  {isAr ? 'مُطَابَقَةُ الْمَلَامِحِ وَتَعْزِيزُ الثِّقَةِ وَالشَّجَاعَةِ' : 'Likeness self-identification and reading confidence'}
                </p>
              </div>

              <div className="p-3 bg-white rounded-[2px] border border-amber-900/10 shadow-2xs">
                <div className="font-black text-slate-900 font-serif">{isAr ? '٦–٨+ سنوات' : 'Ages 6–8+'}</div>
                <div className="text-[10px] text-[#1E5751] font-bold mt-0.5">{isAr ? 'الْقِرَاءَةُ الْمُسْتَقِلَّةُ' : 'Independent Fluency'}</div>
                <p className="text-[10px] text-slate-500 mt-1 leading-tight">
                  {isAr ? 'تَقْوِيَةُ الْمُفْرَدَاتِ الشِّعْرِيَّةِ الثُّنَائِيَّةِ مَعَ التَّشْكِيلِ' : 'Dual-language vocabulary & Tashkeel mastery'}
                </p>
              </div>
            </div>
          </div>

          {/* Binding Comparison Matrix */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-3 font-serif">
              {isAr ? 'مُقَارَنَةُ خِيَارَاتِ الْغِلَافِ وَالتَّجْلِيدِ' : 'Cover Format & Binding Comparison'}
            </h3>
            <div className="border border-amber-900/10 rounded-[2px] overflow-hidden divide-y divide-amber-900/10">
              {/* Softcover */}
              <div className="p-4 flex items-start justify-between gap-4 hover:bg-amber-50/30 transition">
                <div>
                  <div className="font-black text-slate-900 flex items-center gap-2 font-serif">
                    <span>{COVER_FORMAT_PRICING.softcover.titleEn}</span>
                    <span className="text-slate-400 text-xs font-normal">({COVER_FORMAT_PRICING.softcover.titleAr})</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isAr ? COVER_FORMAT_PRICING.softcover.descAr : COVER_FORMAT_PRICING.softcover.descEn}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black text-[#1E5751] text-sm">49 AED</div>
                </div>
              </div>

              {/* Hardcover */}
              <div className="p-4 bg-[#FDF8F1] flex items-start justify-between gap-4">
                <div>
                  <div className="font-black text-slate-900 flex items-center gap-2 font-serif">
                    <span>{COVER_FORMAT_PRICING.hardcover.titleEn}</span>
                    <span className="text-[#1E5751] text-[9px] bg-[#1E5751]/15 px-1.5 py-0.5 rounded-[2px] font-black uppercase">
                      {isAr ? 'الْأَكْثَرُ طَلَباً' : 'POPULAR'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {isAr ? COVER_FORMAT_PRICING.hardcover.descAr : COVER_FORMAT_PRICING.hardcover.descEn}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black text-[#1E5751] text-sm">79 AED</div>
                </div>
              </div>

              {/* Layflat */}
              <div className="p-4 flex items-start justify-between gap-4 hover:bg-amber-50/30 transition">
                <div>
                  <div className="font-black text-slate-900 flex items-center gap-2 font-serif">
                    <span>{COVER_FORMAT_PRICING.layflat.titleEn}</span>
                    <span className="text-indigo-800 text-[9px] bg-indigo-100 px-1.5 py-0.5 rounded-[2px] font-black uppercase">
                      {isAr ? 'مَلَكِيٌّ' : 'DELUXE'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isAr ? COVER_FORMAT_PRICING.layflat.descAr : COVER_FORMAT_PRICING.layflat.descEn}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black text-[#1E5751] text-sm">99 AED</div>
                </div>
              </div>
            </div>
          </div>

          {/* UAE Delivery Timetable */}
          <div className="p-4 rounded-[2px] bg-[#1E5751] text-white flex items-start gap-3.5 shadow-xs">
            <Truck className="w-6 h-6 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <div className="font-black text-sm text-white flex items-center gap-2 font-serif">
                <span>{isAr ? 'شحن سريع ٢٤–٤٨ ساعة لكافة الإمارات السبع' : 'UAE 24–48h Express Delivery Timetable'}</span>
                <span className="bg-white/20 text-white text-[9px] font-bold px-2 py-0.5 rounded-[2px] border border-white/30">
                  {isAr ? 'مَحَلِّيٌّ' : 'Local UAE'}
                </span>
              </div>
              <p className="text-xs text-emerald-100 mt-1 leading-relaxed">
                {isAr
                  ? 'طباعة محلية وتجهيز خلال ٢٤ ساعة. توصيل موثق لباب المنزل في أبوظبي، دبي، الشارقة، عجمان، رأس الخيمة، الفجيرة، وأم القيوين.'
                  : 'Printed locally in the UAE within 24h. Doorstep tracked courier across Abu Dhabi, Dubai, Sharjah, Ajman, RAK, Fujairah, and UAQ. Instant 3D virtual flipbook available in 5 minutes.'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-amber-900/10 bg-[#FDF8F1] shrink-0 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-[2px] border border-amber-900/20 text-slate-700 font-bold text-xs hover:bg-white transition cursor-pointer"
          >
            {isAr ? 'إِغْلَاقٌ' : 'Close'}
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              if (onCustomize) onCustomize();
            }}
            className="flex-1 bg-[#1E5751] hover:bg-[#16433e] text-white font-black py-2.5 px-4 rounded-[2px] text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
          >
            <span>{isAr ? 'اِبْدَأِ التَّخْصِيصَ الْآنَ مَجَّاناً' : 'Personalize This Book Free'}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </aside>
    </div>
  );
}
