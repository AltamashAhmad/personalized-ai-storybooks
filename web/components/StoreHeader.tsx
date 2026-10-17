"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Globe,
  Menu,
  X,
  ShoppingBag,
  Search,
  User,
} from "lucide-react";
import HeaderSearchModal from "@/components/HeaderSearchModal";
import MiniCartDrawer from "@/components/MiniCartDrawer";
import BrandLogo from "@/components/ui/BrandLogo";
import AmazonCartIcon from "@/components/ui/AmazonCartIcon";
import { useCart } from "@/lib/context/CartContext";
import { useCountry } from "@/lib/context/CountryContext";
import { useFocusTrap } from "@/components/ui/useFocusTrap";

export interface StoreHeaderProps {
  isSearchOpen?: boolean;
  onOpenSearch?: () => void;
  onCloseSearch?: () => void;
  isMiniCartOpen?: boolean;
  onOpenMiniCart?: () => void;
  onCloseMiniCart?: () => void;
  countdown?: { hours: number; minutes: number; seconds: number };
}

export default function StoreHeader({
  isSearchOpen: propIsSearchOpen,
  onOpenSearch: propOnOpenSearch,
  onCloseSearch: propOnCloseSearch,
  isMiniCartOpen: propIsMiniCartOpen,
  onOpenMiniCart: propOnOpenMiniCart,
  onCloseMiniCart: propOnCloseMiniCart,
  countdown: propCountdown,
}: StoreHeaderProps = {}) {
  const {
    country,
    language,
    toggleLanguage,
    dir,
    t,
  } = useCountry();

  const {
    totalItemCount,
    isMiniCartOpen: contextMiniCartOpen,
    openMiniCart: contextOpenMiniCart,
    closeMiniCart: contextCloseMiniCart,
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [internalSearchOpen, setInternalSearchOpen] = useState(false);

  // Search modal state resolution
  const isSearchActive = propIsSearchOpen !== undefined ? propIsSearchOpen : internalSearchOpen;
  const handleOpenSearch = useCallback(() => {
    if (propOnOpenSearch) {
      propOnOpenSearch();
    } else {
      setInternalSearchOpen(true);
    }
  }, [propOnOpenSearch]);

  const handleCloseSearch = useCallback(() => {
    if (propOnCloseSearch) {
      propOnCloseSearch();
    } else {
      setInternalSearchOpen(false);
    }
  }, [propOnCloseSearch]);

  // Mini cart state resolution
  const isMiniCartActive = propIsMiniCartOpen !== undefined ? propIsMiniCartOpen : contextMiniCartOpen;
  const handleOpenMiniCart = propOnOpenMiniCart || contextOpenMiniCart;
  const handleCloseMiniCart = propOnCloseMiniCart || contextCloseMiniCart;

  const isAr = language === "ar";
  const getLocalizedPath = (path: string) => (isAr ? `/ar${path}` : path);

  // Transparent scroll-aware header: transparent + light content only on the
  // homepage before scrolling; solid everywhere else.
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const isHome = pathname === "/" || pathname === "/ar";
  const transparent = isHome && !scrolled;

  // Global keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isSearchActive) {
          handleCloseSearch();
        } else {
          handleOpenSearch();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchActive, handleOpenSearch, handleCloseSearch]);

  // Mobile drawer: trap Tab focus inside, lock body scroll, and close on Escape.
  const mobileDrawerRef = useFocusTrap<HTMLElement>(mobileMenuOpen);
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Main Navigation Header */}
      <header className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${transparent ? "bg-transparent border-b border-transparent" : "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-[0_1px_12px_rgba(0,0,0,0.06)]"}`}>
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
          {/* Left Cluster: Vector SVG Brand Logo & Nav */}
          <div className="flex items-center gap-6 xl:gap-8 min-w-0">
            {/* Brand Logo (Vector SVG Crown + Storybook) */}
            <div className="shrink-0">
              <BrandLogo isAr={isAr} size="md" className="shrink-0" />
            </div>

            {/* Desktop Mega-Menu Navigation (4-Column Mega-Menus) */}
            <nav
              className={`relative hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-bold transition-colors ${transparent ? "text-white" : "text-slate-700"}`}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {/* 1. Our books Dropdown */}
              <div
                className="group h-20 flex items-center"
                onMouseEnter={() => setActiveDropdown("allBooks")}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "allBooks" ? null : "allBooks")}
                  aria-expanded={activeDropdown === "allBooks"}
                  aria-haspopup="true"
                  className={`flex items-center gap-1 transition cursor-pointer ${transparent ? "hover:text-amber-200" : "hover:text-[#1E5751]"}`}
                >
                  <span>{isAr ? "جميع الكتب" : "Our books"}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeDropdown === "allBooks" ? "rotate-180" : "group-hover:rotate-180"}`} />
                </button>

                {activeDropdown === "allBooks" && (
                  <div
                    className={`absolute top-full left-0 right-0 mx-auto ${
                      dir === "rtl" ? "text-right" : "text-left"
                    } w-[840px] xl:w-[920px] max-w-[calc(100vw-2rem)] bg-white rounded-[2px] shadow-2xl border border-slate-200 p-6 animate-in fade-in slide-in-from-top-2 duration-150 z-50`}
                  >
                    <div className="pb-3 mb-4 border-b border-slate-100 flex items-center justify-between">
                      <div className="text-xs font-black uppercase text-slate-900 tracking-wider flex items-center gap-2">
                        <span>{isAr ? "جميع كتب الحكايات التذكارية الفاخرة" : "All PersonalizedTales Keepsake Storybooks"}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#1E5751] border border-emerald-200/60">
                          {isAr ? "طباعة فاخرة بالإمارات" : "Made in UAE"}
                        </span>
                      </div>
                      <Link
                        href={getLocalizedPath("/#catalog")}
                        className="text-xs font-black text-[#1E5751] hover:underline"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {isAr ? "تصفح كامل المعرض ←" : "Browse Complete Catalog Grid ➔"}
                      </Link>
                    </div>

                    <div className="grid grid-cols-4 gap-5 text-xs">
                      {/* Column 1: Age */}
                      <div className="space-y-3">
                        <div className="pb-1.5 border-b border-slate-100">
                          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                            {t.header.shopByAge}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700">Shop by Age</span>
                        </div>
                        <div className="space-y-1">
                          <Link
                            href={getLocalizedPath("/books/category/0-3-years")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🍼</span>
                            <span>{t.header.age03}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/3-6-years")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🎨</span>
                            <span>{t.header.age36}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/6-9-years")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🚀</span>
                            <span>{t.header.age69}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/9-12-years")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🌌</span>
                            <span>{t.header.age912}</span>
                          </Link>
                        </div>
                      </div>

                      {/* Column 2: Occasion */}
                      <div className="space-y-3">
                        <div className="pb-1.5 border-b border-slate-100">
                          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                            {t.header.occasions}
                          </span>
                          <span className="text-[10px] font-bold text-amber-700">Shop by Occasion</span>
                        </div>
                        <div className="space-y-1">
                          <Link
                            href={getLocalizedPath("/books/category/birthday")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🎂</span>
                            <span>{t.header.birthday}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/new-baby")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🍼</span>
                            <span>{t.header.newBaby}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/bedtime")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🌙</span>
                            <span>{t.header.bedtime}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/ramadan-eid")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">✨</span>
                            <span>{t.header.ramadanEid}</span>
                          </Link>
                        </div>
                      </div>

                      {/* Column 3: Recipient */}
                      <div className="space-y-3">
                        <div className="pb-1.5 border-b border-slate-100">
                          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                            {t.header.recipients}
                          </span>
                          <span className="text-[10px] font-bold text-purple-700">Shop by Recipient</span>
                        </div>
                        <div className="space-y-1">
                          <Link
                            href={getLocalizedPath("/books/category/for-siblings")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">👫</span>
                            <span>{t.header.siblings}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/for-grandparents")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">👵</span>
                            <span>{t.header.grandparents}</span>
                          </Link>
                          {/* swapped from coming-soon slug to purchasable product */}
                          <Link
                            href={getLocalizedPath("/books/pearl-diver-treasure")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">👧</span>
                            <span>{isAr ? "للبنات والأميرات" : "For Daughters & Girls"}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/starlit-dunes")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">👦</span>
                            <span>{isAr ? "للأولاد والأبطال" : "For Sons & Boys"}</span>
                          </Link>
                        </div>
                      </div>

                      {/* Column 4: Theme & Featured / Gift Finder */}
                      <div className="space-y-3 bg-[var(--color-kraft-paper-60,#FDF8F1)] p-3 rounded-[2px] border border-[var(--color-grid-line,#F9F0DF)]">
                        <div className="pb-1 border-b border-amber-200/60 flex items-center justify-between">
                          <span className="text-[11px] font-black uppercase tracking-wider text-[#1E5751]">
                            {isAr ? "مواضيع الحكايات" : "Story Themes"}
                          </span>
                          <span className="text-[10px] font-extrabold text-[#1E5751]">★ Featured</span>
                        </div>
                        <div className="space-y-1.5">
                          <Link
                            href={getLocalizedPath("/books/starlit-dunes")}
                            onClick={() => setActiveDropdown(null)}
                            className="block p-2 rounded-[2px] bg-white border border-slate-200 hover:border-[#1E5751] transition"
                          >
                            <div className="font-bold text-slate-900 leading-tight">
                              {isAr ? "سر الكثبان المضيئة" : "The Starlit Dunes"}
                            </div>
                            <div className="text-[10px] text-slate-500 font-medium">
                              {isAr ? "مغامرة صحراوية ساحرة" : "Desert & Star Quest"}
                            </div>
                          </Link>
                          <Link
                            href={getLocalizedPath("/gift-finder")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center justify-between p-2 rounded-[2px] bg-white border border-amber-200 hover:border-[#1E5751] font-bold text-slate-800 hover:text-[#1E5751] transition"
                          >
                            <span className="flex items-center gap-1.5">
                              <span>🎁</span>
                              <span>{isAr ? "مكتشف الهدايا" : "Gift Finder"}</span>
                            </span>
                            <span className="text-[10px] font-extrabold text-[#1E5751]">➔</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Kids Dropdown (4-Column Mega-Menu) */}
              <div
                className="group h-20 flex items-center"
                onMouseEnter={() => setActiveDropdown("kids")}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "kids" ? null : "kids")}
                  aria-expanded={activeDropdown === "kids"}
                  aria-haspopup="true"
                  aria-label="Shop by Age"
                  className={`flex items-center gap-1 transition cursor-pointer ${transparent ? "hover:text-amber-200" : "hover:text-[#1E5751]"}`}
                >
                  <span>{isAr ? "الأطفال" : "Kids"}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeDropdown === "kids" ? "rotate-180" : "group-hover:rotate-180"}`} />
                </button>

                {activeDropdown === "kids" && (
                  <div
                    className={`absolute top-full left-0 right-0 mx-auto ${
                      dir === "rtl" ? "text-right" : "text-left"
                    } w-[840px] xl:w-[920px] max-w-[calc(100vw-2rem)] bg-white rounded-[2px] shadow-2xl border border-slate-200 p-6 animate-in fade-in slide-in-from-top-2 duration-150 z-50`}
                  >
                    <div className="pb-3 mb-4 border-b border-slate-100 flex items-center justify-between">
                      <div className="text-xs font-black uppercase text-slate-900 tracking-wider flex items-center gap-2">
                        <span>{isAr ? "قصص الأطفال المخصصة حسب الفئات العمرية" : "Kids Personalized Stories by Age & Category"}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                          {isAr ? "من ٠ إلى ١٢ سنة" : "Ages 0 to 12"}
                        </span>
                      </div>
                      <Link
                        href={getLocalizedPath("/#catalog")}
                        className="text-xs font-black text-[#1E5751] hover:underline"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {isAr ? "تصفح كامل المعرض ←" : "Browse Complete Catalog Grid ➔"}
                      </Link>
                    </div>

                    <div className="grid grid-cols-4 gap-5 text-xs">
                      {/* Column 1: Age */}
                      <div className="space-y-3">
                        <div className="pb-1.5 border-b border-slate-100">
                          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                            {t.header.shopByAge}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700">Shop by Age</span>
                        </div>
                        <div className="space-y-1">
                          <Link
                            href={getLocalizedPath("/books/category/0-3-years")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🍼</span>
                            <span>{t.header.age03}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/3-6-years")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🎨</span>
                            <span>{t.header.age36}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/6-9-years")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🚀</span>
                            <span>{t.header.age69}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/9-12-years")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🌌</span>
                            <span>{t.header.age912}</span>
                          </Link>
                        </div>
                      </div>

                      {/* Column 2: Occasion */}
                      <div className="space-y-3">
                        <div className="pb-1.5 border-b border-slate-100">
                          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                            {t.header.occasions}
                          </span>
                          <span className="text-[10px] font-bold text-amber-700">Shop by Occasion</span>
                        </div>
                        <div className="space-y-1">
                          <Link
                            href={getLocalizedPath("/books/category/birthday")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🎂</span>
                            <span>{t.header.birthday}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/bedtime")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🌙</span>
                            <span>{t.header.bedtime}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/new-baby")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🍼</span>
                            <span>{t.header.newBaby}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/ramadan-eid")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">✨</span>
                            <span>{t.header.ramadanEid}</span>
                          </Link>
                        </div>
                      </div>

                      {/* Column 3: Recipient */}
                      <div className="space-y-3">
                        <div className="pb-1.5 border-b border-slate-100">
                          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                            {t.header.recipients}
                          </span>
                          <span className="text-[10px] font-bold text-purple-700">Shop by Recipient</span>
                        </div>
                        <div className="space-y-1">
                          <Link
                            href={getLocalizedPath("/books/starlit-dunes")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">👦</span>
                            <span>{isAr ? "للأولاد والأبطال" : "For Sons & Little Boys"}</span>
                          </Link>
                          {/* swapped from coming-soon slug to purchasable product */}
                          <Link
                            href={getLocalizedPath("/books/pearl-diver-treasure")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">👧</span>
                            <span>{isAr ? "للبنات والأميرات" : "For Daughters & Girls"}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/for-siblings")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">👫</span>
                            <span>{t.header.siblings}</span>
                          </Link>
                          {/* swapped from coming-soon slug to purchasable product */}
                          <Link
                            href={getLocalizedPath("/books/super-sibling-adventure")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🌟</span>
                            <span>{isAr ? "للأصدقاء والأحباب" : "For Best Friends"}</span>
                          </Link>
                        </div>
                      </div>

                      {/* Column 4: Theme & Featured / Gift Finder */}
                      <div className="space-y-3 bg-[var(--color-kraft-paper-60,#FDF8F1)] p-3 rounded-[2px] border border-[var(--color-grid-line,#F9F0DF)]">
                        <div className="pb-1 border-b border-amber-200/60 flex items-center justify-between">
                          <span className="text-[11px] font-black uppercase tracking-wider text-[#1E5751]">
                            {isAr ? "مواضيع الأطفال" : "Story Themes"}
                          </span>
                          <span className="text-[10px] font-extrabold text-[#1E5751]">★ Themes</span>
                        </div>
                        <div className="space-y-1.5">
                          {/* swapped from coming-soon slug to purchasable product */}
                          <Link
                            href={getLocalizedPath("/books/starlit-dunes")}
                            onClick={() => setActiveDropdown(null)}
                            className="block p-2 rounded-[2px] bg-white border border-slate-200 hover:border-[#1E5751] transition"
                          >
                            <div className="font-bold text-slate-900 leading-tight">
                              {isAr ? "سر الكثبان المضيئة" : "The Starlit Dunes"}
                            </div>
                            <div className="text-[10px] text-slate-500 font-medium">
                              {isAr ? "مغامرة صحراوية ساحرة" : "Desert & Star Quest"}
                            </div>
                          </Link>
                          <Link
                            href={getLocalizedPath("/gift-finder")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center justify-between p-2 rounded-[2px] bg-white border border-amber-200 hover:border-[#1E5751] font-bold text-slate-800 hover:text-[#1E5751] transition"
                          >
                            <span className="flex items-center gap-1.5">
                              <span>🎁</span>
                              <span>{isAr ? "مكتشف الهدايا" : "Gift Finder"}</span>
                            </span>
                            <span className="text-[10px] font-extrabold text-[#1E5751]">➔</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Adults Dropdown (4-Column Mega-Menu) */}
              <div
                className="group h-20 flex items-center"
                onMouseEnter={() => setActiveDropdown("adults")}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "adults" ? null : "adults")}
                  aria-expanded={activeDropdown === "adults"}
                  aria-haspopup="true"
                  aria-label="Shop by Recipient"
                  className={`flex items-center gap-1 transition cursor-pointer ${transparent ? "hover:text-amber-200" : "hover:text-[#1E5751]"}`}
                >
                  <span>{isAr ? "الكبار" : "Adults"}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeDropdown === "adults" ? "rotate-180" : "group-hover:rotate-180"}`} />
                </button>

                {activeDropdown === "adults" && (
                  <div
                    className={`absolute top-full left-0 right-0 mx-auto ${
                      dir === "rtl" ? "text-right" : "text-left"
                    } w-[840px] xl:w-[920px] max-w-[calc(100vw-2rem)] bg-white rounded-[2px] shadow-2xl border border-slate-200 p-6 animate-in fade-in slide-in-from-top-2 duration-150 z-50`}
                  >
                    <div className="pb-3 mb-4 border-b border-slate-100 flex items-center justify-between">
                      <div className="text-xs font-black uppercase text-slate-900 tracking-wider flex items-center gap-2">
                        <span>{isAr ? "هدايا وذكريات الكبار والعائلة" : "Gifts for Loved Ones & Grown-Ups"}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-900 border border-purple-200">
                          {isAr ? "هدايا الأجداد والوالدين" : "From Grandparents & Parents"}
                        </span>
                      </div>
                      <Link
                        href={getLocalizedPath("/quality")}
                        className="text-xs font-black text-[#1E5751] hover:underline"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {isAr ? "معايير الجودة الفاخرة ←" : "Heirloom Quality Standards ➔"}
                      </Link>
                    </div>

                    <div className="grid grid-cols-4 gap-5 text-xs">
                      {/* Column 1: Age */}
                      <div className="space-y-3">
                        <div className="pb-1.5 border-b border-slate-100">
                          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                            {t.header.shopByAge}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700">Shop by Age</span>
                        </div>
                        <div className="space-y-1">
                          <Link
                            href={getLocalizedPath("/books/category/0-3-years")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🍼</span>
                            <span>{isAr ? "ذكريات المواليد (٠–٣)" : "Newborn Memories (0–3)"}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/3-6-years")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🎨</span>
                            <span>{isAr ? "سنوات البراءة (٣–٦)" : "Early Years (3–6)"}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/6-9-years")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🚀</span>
                            <span>{isAr ? "سنوات المدرسة (٦–٩)" : "School Years (6–9)"}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/9-12-years")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🌌</span>
                            <span>{isAr ? "لكل الأعمار والعائلة" : "Keepsakes for All Ages"}</span>
                          </Link>
                        </div>
                      </div>

                      {/* Column 2: Occasion */}
                      <div className="space-y-3">
                        <div className="pb-1.5 border-b border-slate-100">
                          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                            {t.header.occasions}
                          </span>
                          <span className="text-[10px] font-bold text-amber-700">Shop by Occasion</span>
                        </div>
                        <div className="space-y-1">
                          <Link
                            href={getLocalizedPath("/books/category/new-baby")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🍼</span>
                            <span>{t.header.newBaby}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/birthday")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🎂</span>
                            <span>{t.header.birthday}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/ramadan-eid")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">✨</span>
                            <span>{t.header.ramadanEid}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/bedtime")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🌙</span>
                            <span>{t.header.bedtime}</span>
                          </Link>
                        </div>
                      </div>

                      {/* Column 3: Recipient */}
                      <div className="space-y-3">
                        <div className="pb-1.5 border-b border-slate-100">
                          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                            {t.header.recipients}
                          </span>
                          <span className="text-[10px] font-bold text-purple-700">Shop by Recipient</span>
                        </div>
                        <div className="space-y-1">
                          <Link
                            href={getLocalizedPath("/books/category/for-grandparents")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">👵</span>
                            <span>{t.header.grandparents}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/for-siblings")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">👫</span>
                            <span>{t.header.siblings}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/about-us")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">👨‍👩‍👧</span>
                            <span>{isAr ? "رسائل حب من الوالدين" : "From Parents with Love"}</span>
                          </Link>
                          {/* swapped from coming-soon slug to purchasable product */}
                          <Link
                            href={getLocalizedPath("/books/sandcastle-master-saadiyat")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🎁</span>
                            <span>{isAr ? "للأحفاد وأولاد الأخوة" : "For Nieces & Nephews"}</span>
                          </Link>
                        </div>
                      </div>

                      {/* Column 4: Theme & Featured / Gift Finder */}
                      <div className="space-y-3 bg-[var(--color-kraft-paper-60,#FDF8F1)] p-3 rounded-[2px] border border-[var(--color-grid-line,#F9F0DF)]">
                        <div className="pb-1 border-b border-amber-200/60 flex items-center justify-between">
                          <span className="text-[11px] font-black uppercase tracking-wider text-[#1E5751]">
                            {isAr ? "حرفية خالدة" : "Story Themes"}
                          </span>
                          <span className="text-[10px] font-extrabold text-[#1E5751]">★ Mohawk</span>
                        </div>
                        <div className="space-y-1.5">
                          <Link
                            href={getLocalizedPath("/quality")}
                            onClick={() => setActiveDropdown(null)}
                            className="block p-2 rounded-[2px] bg-white border border-slate-200 hover:border-[#1E5751] transition"
                          >
                            <div className="font-bold text-slate-900 leading-tight">
                              {isAr ? "ورق موهوك الحريري ٢٠٠ غرام" : "200 GSM Mohawk Paper"}
                            </div>
                            <div className="text-[10px] text-slate-500 font-medium">
                              {isAr ? "أرشيفي يدوم أكثر من ١٠٠ عام" : "Archival keepsake longevity"}
                            </div>
                          </Link>
                          <Link
                            href={getLocalizedPath("/gift-finder")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center justify-between p-2 rounded-[2px] bg-white border border-amber-200 hover:border-[#1E5751] font-bold text-slate-800 hover:text-[#1E5751] transition"
                          >
                            <span className="flex items-center gap-1.5">
                              <span>🎁</span>
                              <span>{isAr ? "مكتشف الهدايا" : "Gift Finder"}</span>
                            </span>
                            <span className="text-[10px] font-extrabold text-[#1E5751]">➔</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Occasion Dropdown (4-Column Mega-Menu) */}
              <div
                className="group h-20 flex items-center"
                onMouseEnter={() => setActiveDropdown("occasion")}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "occasion" ? null : "occasion")}
                  aria-expanded={activeDropdown === "occasion"}
                  aria-haspopup="true"
                  aria-label="Shop by Occasion"
                  className={`flex items-center gap-1 transition cursor-pointer ${transparent ? "hover:text-amber-200" : "hover:text-[#1E5751]"}`}
                >
                  <span>{isAr ? "المناسبات" : "Occasion"}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeDropdown === "occasion" ? "rotate-180" : "group-hover:rotate-180"}`} />
                </button>

                {activeDropdown === "occasion" && (
                  <div
                    className={`absolute top-full left-0 right-0 mx-auto ${
                      dir === "rtl" ? "text-right" : "text-left"
                    } w-[840px] xl:w-[920px] max-w-[calc(100vw-2rem)] bg-white rounded-[2px] shadow-2xl border border-slate-200 p-6 animate-in fade-in slide-in-from-top-2 duration-150 z-50`}
                  >
                    <div className="pb-3 mb-4 border-b border-slate-100 flex items-center justify-between">
                      <div className="text-xs font-black uppercase text-slate-900 tracking-wider flex items-center gap-2">
                        <span>{isAr ? "هدايا المناسبات والأعياد واللحظات السعيدة" : "Occasions, Milestones & Celebrations"}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-900 border border-rose-200">
                          {isAr ? "توصيل سريع بالإمارات" : "Express UAE Delivery"}
                        </span>
                      </div>
                      <Link
                        href={getLocalizedPath("/delivery")}
                        className="text-xs font-black text-[#1E5751] hover:underline"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {isAr ? "مواعيد التوصيل لكافة الإمارات ←" : "Delivery Timetable across UAE ➔"}
                      </Link>
                    </div>

                    <div className="grid grid-cols-4 gap-5 text-xs">
                      {/* Column 1: Age */}
                      <div className="space-y-3">
                        <div className="pb-1.5 border-b border-slate-100">
                          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                            {t.header.shopByAge}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700">Shop by Age</span>
                        </div>
                        <div className="space-y-1">
                          <Link
                            href={getLocalizedPath("/books/category/0-3-years")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🍼</span>
                            <span>{t.header.age03}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/3-6-years")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🎨</span>
                            <span>{t.header.age36}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/6-9-years")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🚀</span>
                            <span>{t.header.age69}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/9-12-years")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🌌</span>
                            <span>{t.header.age912}</span>
                          </Link>
                        </div>
                      </div>

                      {/* Column 2: Occasion */}
                      <div className="space-y-3">
                        <div className="pb-1.5 border-b border-slate-100">
                          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                            {t.header.occasions}
                          </span>
                          <span className="text-[10px] font-bold text-amber-700">Shop by Occasion</span>
                        </div>
                        <div className="space-y-1">
                          <Link
                            href={getLocalizedPath("/books/category/birthday")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🎂</span>
                            <span>{t.header.birthday}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/new-baby")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🍼</span>
                            <span>{t.header.newBaby}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/ramadan-eid")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">✨</span>
                            <span>{t.header.ramadanEid}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/bedtime")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">🌙</span>
                            <span>{t.header.bedtime}</span>
                          </Link>
                        </div>
                      </div>

                      {/* Column 3: Recipient */}
                      <div className="space-y-3">
                        <div className="pb-1.5 border-b border-slate-100">
                          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                            {t.header.recipients}
                          </span>
                          <span className="text-[10px] font-bold text-purple-700">Shop by Recipient</span>
                        </div>
                        <div className="space-y-1">
                          <Link
                            href={getLocalizedPath("/books/category/for-grandparents")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">👵</span>
                            <span>{t.header.grandparents}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/category/for-siblings")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">👫</span>
                            <span>{t.header.siblings}</span>
                          </Link>
                          {/* swapped from coming-soon slug to purchasable product */}
                          <Link
                            href={getLocalizedPath("/books/brave-explorer-oasis")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">👧</span>
                            <span>{isAr ? "هدية للبنات" : "Birthday Girl Keepsake"}</span>
                          </Link>
                          <Link
                            href={getLocalizedPath("/books/starlit-dunes")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[2px] hover:bg-[var(--color-kraft-paper-60,#FDF8F1)] hover:text-[#1E5751] transition font-bold text-slate-800"
                          >
                            <span className="text-base">👦</span>
                            <span>{isAr ? "هدية للأولاد" : "Birthday Boy Adventure"}</span>
                          </Link>
                        </div>
                      </div>

                      {/* Column 4: Theme & Featured / Gift Finder */}
                      <div className="space-y-3 bg-[var(--color-kraft-paper-60,#FDF8F1)] p-3 rounded-[2px] border border-[var(--color-grid-line,#F9F0DF)]">
                        <div className="pb-1 border-b border-amber-200/60 flex items-center justify-between">
                          <span className="text-[11px] font-black uppercase tracking-wider text-[#1E5751]">
                            {isAr ? "الموضوع وتغليف الهدايا" : "Story Themes"}
                          </span>
                          <span className="text-[10px] font-extrabold text-[#1E5751]">★ Gifting</span>
                        </div>
                        <div className="space-y-1.5">
                          <Link
                            href={getLocalizedPath("/gift-finder")}
                            onClick={() => setActiveDropdown(null)}
                            className="block p-2 rounded-[2px] bg-white border border-slate-200 hover:border-[#1E5751] transition"
                          >
                            <div className="font-bold text-slate-900 leading-tight">
                              {isAr ? "صندوق الهدايا الملكي" : "Luxury Gift Box Keepsake"}
                            </div>
                            <div className="text-[10px] text-slate-500 font-medium">
                              {isAr ? "تغليف فاخر وجاهز للإهداء" : "Ready-to-gift heirloom presentation"}
                            </div>
                          </Link>
                          <Link
                            href={getLocalizedPath("/gift-finder")}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center justify-between p-2 rounded-[2px] bg-white border border-amber-200 hover:border-[#1E5751] font-bold text-slate-800 hover:text-[#1E5751] transition"
                          >
                            <span className="flex items-center gap-1.5">
                              <span>🎁</span>
                              <span>{isAr ? "مكتشف الهدايا" : "Gift Finder"}</span>
                            </span>
                            <span className="text-[10px] font-extrabold text-[#1E5751]">➔</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </nav>
          </div>

          {/* Right Header Action Items (Language Toggle + Search + Account + Amazon Cart) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* 1. Language Switcher Pill (🌐 العربية / 🌐 English) */}
            <button
              type="button"
              onClick={toggleLanguage}
              className={`hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold transition shadow-2xs cursor-pointer select-none backdrop-blur-sm ${transparent ? "border-white/40 bg-white/10 text-white hover:border-white/70 hover:bg-white/20" : "border-[var(--color-sharpie-20,#d9d9d7)] hover:border-[var(--color-racing-green,#1e5751)] bg-white hover:bg-[var(--color-kraft-paper-60,#fdf8f1)] text-[var(--color-sharpie,#23231e)] hover:text-[var(--color-racing-green,#1e5751)]"}`}
              title={isAr ? "Switch interface to English" : "تحويل الموقع إلى اللغة العربية"}
              aria-label={isAr ? "Switch interface to English" : "تحويل الموقع إلى اللغة العربية"}
            >
              <span className="text-sm leading-none" aria-hidden="true">🌐</span>
              <span className={`font-bold tracking-tight ${!isAr ? "font-serif text-[13px]" : ""}`}>
                {isAr ? "English" : "العربية"}
              </span>
            </button>

            {/* 2. Search Icon Button (Magnifying Glass -> triggers search modal ⌘K) */}
            <button
              type="button"
              onClick={handleOpenSearch}
              className={`p-2 sm:p-2.5 rounded-full transition cursor-pointer ${transparent ? "text-white hover:bg-white/10 hover:text-amber-200" : "hover:bg-slate-100 text-slate-700 hover:text-[#1E5751]"}`}
              title={isAr ? "البحث في القصص (⌘K)" : "Search storybooks (⌘K)"}
              aria-label={isAr ? "البحث في القصص" : "Search storybooks"}
            >
              <Search className={`w-5 h-5 ${transparent ? "text-white" : "text-[#23231E]"}`} />
            </button>

            {/* 3. Account & Order Lookup Icon (Desktop / Tablet: inside mobile menu on phones) */}
            <Link
              href={getLocalizedPath("/contact")}
              className={`hidden sm:flex p-2.5 rounded-full transition ${transparent ? "text-white hover:bg-white/10 hover:text-amber-200" : "hover:bg-slate-100 text-slate-700 hover:text-[#1E5751]"}`}
              title={isAr ? "خدمة أولياء الأمور وتتبع الطلبات" : "Parent Care & Order Lookup"}
              aria-label={isAr ? "خدمة أولياء الأمور وتتبع الطلبات" : "Parent Care & Order Lookup"}
            >
              <User className={`w-5 h-5 ${transparent ? "text-white" : "text-[#23231E]"}`} />
            </Link>

            {/* 4. Amazon-Style Shopping Cart Button (With Dynamic Basket Item Counter) */}
            <button
              type="button"
              onClick={handleOpenMiniCart}
              className={`cart-trigger relative p-1 sm:p-1.5 rounded-xl transition flex items-center justify-center cursor-pointer group ${transparent ? "text-white hover:bg-white/10" : "hover:bg-slate-100 text-slate-800"}`}
              title={isAr ? "سلة المشتريات" : "View Cart"}
              aria-label={isAr ? "عرض سلة المشتريات" : "View Cart"}
            >
              <AmazonCartIcon count={totalItemCount} className={transparent ? "text-white [&_text]:fill-white" : ""} />
            </button>

            {/* 5. Mobile Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 cursor-pointer rounded-xl transition ${transparent ? "text-white hover:text-amber-200 hover:bg-white/10" : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"}`}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className={`w-6 h-6 ${transparent ? "text-white" : "text-[#23231E]"}`} /> : <Menu className={`w-6 h-6 ${transparent ? "text-white" : "text-[#23231E]"}`} />}
            </button>
          </div>
        </div>
      </header>
      {/* Spacer: header is now fixed; keeps page flow identical on solid-header pages.
          The homepage hero intentionally slides under the transparent header. */}
      {!transparent && <div aria-hidden="true" className="h-20 shrink-0" />}

      {/* Mobile Navigation Off-Canvas Drawer (Mounted outside <header> to break free from backdrop-filter stacking context) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop Scrim */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Off-canvas Sheet */}
          <aside
            ref={mobileDrawerRef}
            tabIndex={-1}
            className={`fixed inset-y-0 ${
              isAr ? "right-0" : "left-0"
            } w-[85vw] max-w-sm bg-white shadow-2xl p-5 overflow-y-auto flex flex-col justify-between transition-transform duration-300 ease-in-out z-50`}
            dir={dir}
            role="dialog"
            aria-modal="true"
            aria-label={isAr ? "قائمة التصفح" : "Mobile Navigation"}
          >
            <div className="space-y-4">
              {/* Header with Brand & Close */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <BrandLogo isAr={isAr} size="sm" />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 transition cursor-pointer"
                  aria-label={isAr ? "إغلاق القائمة" : "Close menu"}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Currency & Language Controls on Mobile */}
              <div className="py-2 flex items-center justify-between gap-2 border-b border-slate-100">
                <div
                  className="flex items-center gap-1.5 text-xs font-bold bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 select-none"
                >
                  <span className="text-base">{country.flag}</span>
                  <span>{country.currency} • {isAr ? "توصيل سريع بالإمارات" : "Express UAE Delivery"}</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    toggleLanguage();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 transition cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-amber-600" />
                  <span>{isAr ? "English" : "العربية"}</span>
                </button>
              </div>

              {/* Search Trigger Button in Mobile Menu */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenSearch();
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold border border-slate-200/80 transition cursor-pointer"
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span>{isAr ? "ابحث في القصص التذكارية..." : "Search personalized stories..."}</span>
              </button>

              {/* Category Grid */}
              <div className="space-y-1">
                <span className="font-extrabold text-[11px] uppercase tracking-wider text-slate-400 block pb-1">
                  {t.header.shopByAge}
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <Link
                    href={getLocalizedPath("/books/category/0-3-years")}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 transition border border-slate-100"
                  >
                    {t.header.age03}
                  </Link>
                  <Link
                    href={getLocalizedPath("/books/category/3-6-years")}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 transition border border-slate-100"
                  >
                    {t.header.age36}
                  </Link>
                  <Link
                    href={getLocalizedPath("/books/category/6-9-years")}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 transition border border-slate-100"
                  >
                    {t.header.age69}
                  </Link>
                  <Link
                    href={getLocalizedPath("/books/category/9-12-years")}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 transition border border-slate-100"
                  >
                    {t.header.age912}
                  </Link>
                  <Link
                    href={getLocalizedPath("/books/category/birthday")}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 transition border border-slate-100"
                  >
                    {t.header.birthday}
                  </Link>
                  <Link
                    href={getLocalizedPath("/books/category/new-baby")}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 transition border border-slate-100"
                  >
                    {t.header.newBaby}
                  </Link>
                  <Link
                    href={getLocalizedPath("/#catalog")}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 transition border border-slate-100"
                  >
                    📚 {t.header.allBooks}
                  </Link>
                </div>
              </div>

              {/* Secondary Links & Cart Drawer */}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2 font-semibold text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleOpenMiniCart();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 text-[#1E5751] font-black border border-emerald-200/80 cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isAr ? "سلة المشتريات" : "Shopping Basket"}</span>
                  </span>
                  <span className="bg-[#1E5751] text-white px-2 py-0.5 rounded-full text-[10px]">
                    {totalItemCount}
                  </span>
                </button>
                <Link
                  href={getLocalizedPath("/contact")}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700"
                >
                  <User className="w-4 h-4 text-slate-500" />
                  <span>{isAr ? "حسابي وتتبع الطلبات" : "My Orders & Tracking"}</span>
                </Link>
                <Link href={getLocalizedPath("/delivery")} onClick={() => setMobileMenuOpen(false)} className="px-2 py-1 hover:text-[#1E5751]">
                  🚚 {t.footer.deliveryInfo}
                </Link>
                <Link href={getLocalizedPath("/quality")} onClick={() => setMobileMenuOpen(false)} className="px-2 py-1 hover:text-[#1E5751]">
                  🏅 {t.footer.qualityPaper}
                </Link>
                <Link href={getLocalizedPath("/about-us")} onClick={() => setMobileMenuOpen(false)} className="px-2 py-1 hover:text-[#1E5751]">
                  📖 {t.footer.aboutUs}
                </Link>
                <Link href={getLocalizedPath("/faq")} onClick={() => setMobileMenuOpen(false)} className="px-2 py-1 hover:text-[#1E5751]">
                  ❓ {t.footer.helpFaq}
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 font-bold">
              🇦🇪 {isAr ? "الإمارات العربية المتحدة • توصيل سريع خلال ٢٤-٤٨ ساعة" : "United Arab Emirates • Express 24–48h Delivery"}
            </div>
          </aside>
        </div>
      )}

      {/* Mount Search Dialog Modal */}
      <HeaderSearchModal
        isOpen={isSearchActive}
        onClose={handleCloseSearch}
      />

      {/* Mount Slide-Over Mini-Cart Drawer */}
      <MiniCartDrawer
        isOpen={isMiniCartActive}
        onClose={handleCloseMiniCart}
      />
    </>
  );
}
