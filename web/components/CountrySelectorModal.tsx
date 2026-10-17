"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check, Globe, Search, X } from "lucide-react";
import { SUPPORTED_COUNTRIES } from "@/config/locales";
import { useCountry } from "@/lib/context/CountryContext";

export default function CountrySelectorModal() {
  const {
    country: activeCountry,
    setCountrySlug,
    isModalOpen,
    closeCountryModal,
    language,
    toggleLanguage,
    dir,
  } = useCountry();
  const [search, setSearch] = useState("");
  const isAr = language === "ar";
  const dialogRef = useRef<HTMLDivElement>(null);

  // Escape-to-close + restore focus to the element that opened the modal.
  useEffect(() => {
    if (!isModalOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCountryModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    // The search input has autoFocus; only move focus to the dialog if nothing took it.
    if (
      dialogRef.current &&
      (document.activeElement === document.body ||
        !dialogRef.current.contains(document.activeElement))
    ) {
      dialogRef.current.focus();
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocused && typeof previouslyFocused.focus === "function") {
        previouslyFocused.focus();
      }
    };
  }, [isModalOpen, closeCountryModal]);

  if (!isModalOpen) return null;

  // Platform is UAE-only (PHASE_ONE_UAE_ONLY): the "UAE Domestic Market"
  // section must never list other markets, even if the config grows.
  const countries = Object.values(SUPPORTED_COUNTRIES).filter((c) => c.slug === "ae");
  const filteredCountries = countries.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.nameEn.toLowerCase().includes(q) ||
      c.nameAr.includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.currency.toLowerCase().includes(q)
    );
  });

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={closeCountryModal}
    >
      <div 
        ref={dialogRef}
        tabIndex={-1}
        className="relative w-full max-w-[454px] max-h-[90vh] bg-white rounded-[2px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-label={isAr ? "اختيار دولة التوصيل واللغة" : "Choose Country & Language"}
        dir={dir}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-[2px] bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center shrink-0">
              <Globe className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-extrabold text-slate-900 truncate">
                {isAr ? "اختيار دولة التوصيل واللغة" : "Country & Language"}
              </h3>
              <p className="text-[11px] text-slate-500 truncate">
                {isAr ? "حدد الدولة واللغة المفضلة لعرض الأسعار والقصص" : "Select shipping destination & language"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeCountryModal}
            className="w-8 h-8 rounded-[2px] bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition cursor-pointer shrink-0"
            aria-label={isAr ? "إغلاق النافذة" : "Close modal"}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Bilingual Segmented Toggle Control */}
        <div className="px-5 pt-3 pb-1 bg-slate-50/60 border-b border-slate-100">
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
            {isAr ? "لغة التصفح والقراءة" : "Interface & Reading Language"}
          </div>
          <div className="grid grid-cols-2 p-1 bg-slate-200/70 rounded-[2px] gap-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                if (language !== "en") toggleLanguage();
              }}
              className={`py-1.5 px-3 rounded-[2px] transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                language === "en"
                  ? "bg-white text-slate-900 shadow-xs font-extrabold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>🇬🇧</span>
              <span>English</span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (language !== "ar") toggleLanguage();
              }}
              className={`py-1.5 px-3 rounded-[2px] transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                language === "ar"
                  ? "bg-white text-slate-900 shadow-xs font-extrabold font-serif text-[13px]"
                  : "text-slate-600 hover:text-slate-900 font-serif text-[13px]"
              }`}
            >
              <span>🇦🇪</span>
              <span>العربية</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-5 py-3 bg-white border-b border-slate-100">
          <div className="relative">
            <Search className={`w-4 h-4 text-slate-400 absolute ${dir === "rtl" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2`} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                isAr
                  ? "ابحث عن الدولة، العملة، أو الرمز (مثال: AED)..."
                  : "Search country, currency, or language (e.g. AED)..."
              }
              className={`w-full ${dir === "rtl" ? "pr-9 pl-3" : "pl-9 pr-3"} py-2 text-xs bg-slate-50 border border-slate-200 rounded-[2px] font-medium text-slate-900 focus:outline-none focus:border-[#1E5751] focus:bg-white shadow-2xs`}
              autoFocus
            />
          </div>
        </div>

        {/* Country Lists */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* UAE Domestic Market */}
          {filteredCountries.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1E5751] bg-emerald-50 px-2 py-0.5 rounded-[2px] border border-emerald-200/60">
                  {isAr ? "الإمارات العربية المتحدة" : "United Arab Emirates (UAE)"}
                </span>
                <span className="text-[10px] text-emerald-700 font-bold">
                  {isAr ? "✓ كافة الإمارات الـ ٧" : "✓ All 7 Emirates"}
                </span>
              </div>
              <div className="space-y-2">
                {filteredCountries.map((c) => {
                  const isSelected = activeCountry.slug === c.slug;
                  return (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => setCountrySlug(c.slug)}
                      className={`w-full flex items-center justify-between p-3 rounded-[2px] border text-left rtl:text-right transition cursor-pointer ${
                        isSelected
                          ? "bg-[var(--color-kraft-paper-60,#FDF8F1)] border-[#1E5751] shadow-2xs"
                          : "bg-white border-slate-200 hover:border-amber-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{c.flag}</span>
                        <div>
                          <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{isAr ? c.nameAr : c.nameEn}</span>
                            <span className="text-[10px] text-slate-400 font-normal">
                              ({isAr ? c.nameEn : c.nameAr})
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-600 font-semibold mt-0.5">
                            {c.price.toFixed(2)} {c.currency} • {isAr ? "توصيل محلي سريع" : "Express Local Delivery"}
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#1E5751] text-white flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {filteredCountries.length === 0 && (
            <div className="text-center py-8 text-xs text-slate-400">
              {isAr ? `لم يتم العثور على نتائج لـ "${search}"` : `No matching countries found for "${search}"`}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span>
            {isAr
              ? "قارئ 3D تفاعلي + ملف طباعة ٣٠٠ نقطة"
              : "Includes 3D reader + 300 DPI print PDF"}
          </span>
          <span className="text-emerald-700 font-bold">
            {isAr ? "✓ بدون جمارك" : "✓ Zero customs"}
          </span>
        </div>
      </div>
    </div>
  );
}
