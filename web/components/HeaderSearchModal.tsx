"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Search,
  Sparkles,
  Tag,
  X,
} from "lucide-react";
import { PRODUCTS } from "@/config/products";
import { useCountry } from "@/lib/context/CountryContext";

// Authentic localized metadata maps for search tokenization
const CATEGORY_AR_MAP: Record<string, string> = {
  bedtime: "نوم قبل النوم تهويدة أحلام نوم هادئ",
  heritage: "تراث أصالة فروسية شهامة واحة خليجي",
  newborn: "مولود مواليد رضيع استقبال المعجزة الأولى",
  bestseller: "الأكثر مبيعا الأكثر طلبا مميز",
};

const OCCASION_AR_MAP: Record<string, string> = {
  birthday: "عيد ميلاد ميلاد احتفال",
  milestone: "ذكرى إنجاز",
  newborn: "مولود جديد ولادة",
  aqiqah: "عقيقة",
  "baby-shower": "استقبال مواليد",
  "first-year": "العام الأول سنة أولى",
  "national-day": "اليوم الوطني",
  "founding-day": "يوم التأسيس",
  graduation: "تخرج",
  stem: "علوم",
  gift: "هدية",
};

const RECIPIENT_AR_MAP: Record<string, string> = {
  son: "ابن ولد",
  daughter: "ابنة بنت",
  twins: "توأم توائم",
  nephew: "ابن الأخ ابن الأخت",
  niece: "بنت الأخ بنت الأخت",
  grandchildren: "أحفاد حفيد",
  family: "عائلة أسرة",
  "older-kids": "يافعين كبار",
};

const normalizeDashes = (s: string) => s.replace(/[\u2013\u2014]/g, "-");

interface HeaderSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HeaderSearchModal({ isOpen, onClose }: HeaderSearchModalProps) {
  const router = useRouter();
  const { language, dir, formatPrice } = useCountry();
  const isAr = language === "ar";
  const getLocalizedPath = (path: string) => (isAr ? `/ar${path}` : path);

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input and lock scroll on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "unset";
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Handle global Escape key when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Live filtered products matching title, age, occasion, recipient, summary/description
  const filteredProducts = useMemo(() => {
    const cleanQ = normalizeDashes(query.trim().toLowerCase());
    if (!cleanQ) return [];

    const tokens = cleanQ.split(/\s+/).filter(Boolean);

    return PRODUCTS.filter((book) => {
      const normAge = normalizeDashes(book.ageRange.toLowerCase());
      const catLoc = CATEGORY_AR_MAP[book.category] || "";
      const occLoc = (book.occasions || []).map((o) => OCCASION_AR_MAP[o] || "").join(" ");
      const recLoc = (book.recipients || []).map((r) => RECIPIENT_AR_MAP[r] || "").join(" ");
      const desc = (((book as { description?: string }).description || book.summary || "") + "").toLowerCase();
      const descAr = (((book as { descriptionAr?: string }).descriptionAr || "") + "").toLowerCase();

      const corpus = [
        book.title.toLowerCase(),
        book.titleAr.toLowerCase(),
        book.subtitle.toLowerCase(),
        book.subtitleAr.toLowerCase(),
        desc,
        descAr,
        book.ageRange.toLowerCase(),
        normAge,
        book.category.toLowerCase(),
        catLoc,
        book.defaultTheme.toLowerCase(),
        ...book.occasions.map((o) => o.toLowerCase()),
        occLoc,
        ...book.recipients.map((r) => r.toLowerCase()),
        recLoc,
        (normAge.includes("0-3") || book.ageRange.includes("0–3")) ? "0 1 2 3 0-3 0–3 baby babies newborn infant toddler" : "",
        (normAge.includes("2-7") || book.ageRange.includes("2–7")) ? "2 3 4 5 6 7 2-7 2–7 toddler preschool young" : "",
        (normAge.includes("3-8") || book.ageRange.includes("3–8")) ? "3 4 5 6 7 8 3-8 3–8 kids children primary" : "",
        (normAge.includes("4-10") || book.ageRange.includes("4–10")) ? "4 5 6 7 8 9 10 4-10 4–10 knight desert heritage" : "",
        (normAge.includes("6-12") || book.ageRange.includes("6–12")) ? "6 7 8 9 10 11 12 6-12 6–12 space stem older" : "",
      ].join(" ");

      return tokens.every((token) => corpus.includes(token));
    });
  }, [query]);

  // Keyboard navigation through search results (ArrowDown, ArrowUp, Enter)
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (filteredProducts.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredProducts.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = filteredProducts[selectedIndex] || filteredProducts[0];
      if (target) {
        navigateToBook(target.slug);
      }
    }
  };

  const navigateToBook = (slug: string) => {
    onClose();
    router.push(getLocalizedPath(`/books/${slug}`));
  };

  const setFilterChip = (chip: string) => {
    setQuery(chip);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  const discoveryChips = isAr
    ? [
        { label: "سن ٠–٣ سنوات", value: "0-3" },
        { label: "قصص ما قبل النوم", value: "bedtime" },
        { label: "أعياد الميلاد", value: "birthday" },
        { label: "مولود جديد", value: "newborn" },
        { label: "تراث خليجي", value: "heritage" },
        { label: "مغامرات الفضاء", value: "space" },
      ]
    : [
        { label: "Ages 0–3", value: "0-3" },
        { label: "Bedtime", value: "bedtime" },
        { label: "Birthday", value: "birthday" },
        { label: "New Baby", value: "newborn" },
        { label: "Gulf Heritage", value: "heritage" },
        { label: "Space & STEM", value: "space" },
      ];

  const popularBooks = PRODUCTS.slice(0, 3);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-0 sm:p-4 sm:pt-16 md:pt-20 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full sm:h-auto sm:max-w-2xl bg-white sm:rounded-3xl shadow-2xl border-0 sm:border border-slate-200/90 overflow-hidden flex flex-col sm:max-h-[85vh] animate-in sm:zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-label={isAr ? "البحث في القصص التذكارية" : "Search Personalized Storybooks"}
        dir={dir}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar */}
        <div className="p-3.5 sm:p-5 border-b border-slate-100 flex items-center gap-2.5 sm:gap-3 bg-slate-50/70">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>

          <div className="relative flex-1 min-w-0">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleInputKeyDown}
              placeholder={
                isAr
                  ? "ابحث باسم القصة، العمر، أو المناسبة..."
                  : "Search stories, age, occasion..."
              }
              className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 font-bold text-sm sm:text-base md:text-lg focus:outline-none pe-7 sm:pe-8"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className={`absolute ${dir === "rtl" ? "left-0" : "right-0"} top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer`}
                aria-label={isAr ? "مسح البحث" : "Clear search input"}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Universal Close Button: Clean X on mobile, X + Close on tablet, X + Close + ESC badge on desktop */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-200/70 hover:bg-slate-300 active:bg-slate-400 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0"
            aria-label={isAr ? "إغلاق البحث" : "Close search"}
          >
            <X className="w-5 h-5 sm:w-4 sm:h-4 text-slate-600" />
            <span className="hidden sm:inline font-bold">{isAr ? "إغلاق" : "Close"}</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-mono font-bold text-slate-500 shadow-2xs">ESC</kbd>
          </button>
        </div>

        {/* Modal Body / Results */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-4 flex-1">
          {/* Quick Discovery State */}
          {!query.trim() && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <Tag className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                    {isAr ? "تصفح سريع حسب الاهتمام" : "Quick Discovery Filters"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {discoveryChips.map((chip) => (
                    <button
                      key={chip.value}
                      type="button"
                      onClick={() => setFilterChip(chip.value)}
                      className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-amber-50 hover:bg-amber-100 active:bg-amber-200 text-amber-950 border border-amber-200/80 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer touch-manipulation"
                    >
                      <span className="text-xs">✨</span>
                      <span>{chip.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                      {isAr ? "أكثر القصص طلباً بالإمارات" : "Popular Keepsake Stories"}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-semibold hidden sm:inline">
                    {isAr ? "انقر للمعاينة المباشرة" : "Click for instant preview"}
                  </span>
                </div>

                <div className="space-y-2">
                  {popularBooks.map((book) => (
                    <div
                      key={book.id}
                      onClick={() => navigateToBook(book.slug)}
                      className="group flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:bg-amber-50/60 active:bg-amber-100/50 transition cursor-pointer shadow-xs gap-2"
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-xl border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 shrink-0">
                              {book.ageRange}
                            </span>
                            {book.badge && (
                              <span className="text-[10px] font-bold text-amber-700 truncate hidden sm:inline">
                                {book.badge}
                              </span>
                            )}
                          </div>
                          <div className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-amber-800 transition truncate mt-0.5">
                            {isAr ? book.titleAr : book.title}
                          </div>
                          <div className="text-xs text-slate-500 truncate mt-0.5">
                            {isAr ? book.subtitleAr : book.subtitle}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <div className="text-right rtl:text-left">
                          <div className="text-[10px] text-slate-400 uppercase font-extrabold">
                            {isAr ? "ابتداءً من" : "From"}
                          </div>
                          <div className="text-xs sm:text-sm font-black text-slate-900">
                            {formatPrice(49)}
                          </div>
                        </div>
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 group-hover:bg-amber-500 group-hover:text-slate-950 text-slate-500 flex items-center justify-center transition">
                          <ArrowRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isAr ? "rotate-180" : ""}`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results State */}
          {query.trim() && filteredProducts.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                {isAr
                  ? `تم العثور على ${filteredProducts.length} قصة تطابق بحثك`
                  : `Found ${filteredProducts.length} ${filteredProducts.length === 1 ? "storybook" : "storybooks"}`}
              </div>

              {filteredProducts.map((book, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={book.id}
                    onClick={() => navigateToBook(book.slug)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`group flex items-center justify-between p-2.5 sm:p-3.5 rounded-2xl border transition cursor-pointer gap-2 ${
                      isSelected
                        ? "bg-amber-50/90 border-amber-400 ring-2 ring-amber-400/30 shadow-sm"
                        : "bg-white border-slate-200 hover:border-amber-300 hover:bg-slate-50 active:bg-amber-50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-cover rounded-xl border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 shrink-0">
                            {book.ageRange}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 capitalize hidden sm:inline">
                            {book.occasions.slice(0, 2).join(" • ")}
                          </span>
                        </div>

                        <div className="font-extrabold text-sm sm:text-base text-slate-950 group-hover:text-amber-800 transition truncate mt-0.5">
                          {isAr ? book.titleAr : book.title}
                        </div>

                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {isAr ? book.subtitleAr : book.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                      <div className="text-right rtl:text-left">
                        <span className="text-[10px] text-slate-400 uppercase font-extrabold block">
                          {isAr ? "ابتداءً من" : "From"}
                        </span>
                        <span className="text-xs sm:text-sm font-black text-slate-900">
                          {formatPrice(49)}
                        </span>
                      </div>
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center transition ${
                          isSelected
                            ? "bg-amber-500 text-slate-950"
                            : "bg-slate-100 text-slate-500 group-hover:bg-amber-200"
                        }`}
                      >
                        <ArrowRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isAr ? "rotate-180" : ""}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Zero Results State */}
          {query.trim() && filteredProducts.length === 0 && (
            <div className="text-center py-10 sm:py-12 px-4 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-xl">
                🔍
              </div>
              <h4 className="font-black text-slate-900 text-base">
                {isAr ? "لم نعثر على قصص مطابقة" : "No storybooks found"}
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                {isAr
                  ? `لم نجد أي نتائج لـ "${query}". جرب البحث بكلمات مثل: "نوم"، "٠-٣"، "صقر"، أو "عيد ميلاد".`
                  : `No results matching "${query}". Try searching by occasion ("bedtime", "birthday"), age ("0-3", "3-8"), or theme ("falcon", "space").`}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-xs font-bold text-amber-700 hover:underline cursor-pointer"
                >
                  {isAr ? "إعادة ضبط البحث" : "Clear search & view all stories"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-5 py-2.5 sm:py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          {/* Desktop Keyboard Shortcuts (Hidden on mobile and tablet touch devices) */}
          <div className="hidden lg:flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono font-bold">↑↓</kbd> {isAr ? "للتنقل" : "to navigate"}
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono font-bold">↵</kbd> {isAr ? "للاختيار" : "to select"}
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono font-bold">esc</kbd> {isAr ? "للإغلاق" : "to dismiss"}
            </span>
          </div>

          {/* Mobile & Tablet Touch Guidance (Hidden on desktop) */}
          <div className="lg:hidden text-slate-400 font-bold text-[11px] flex items-center gap-1.5">
            <span>💡</span>
            <span>{isAr ? "انقر على أي قصة للمعاينة" : "Tap any story to preview"}</span>
          </div>

          {/* Instant 3D Preview Available Badge */}
          <span className="text-emerald-600 font-bold flex items-center gap-1 shrink-0">
            <span>✓</span>
            <span className="hidden sm:inline">{isAr ? "معاينة ثلاثية الأبعاد فورية متاحة" : "Instant 3D Preview Available"}</span>
            <span className="sm:hidden">{isAr ? "معاينة 3D فورية" : "3D Preview"}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
