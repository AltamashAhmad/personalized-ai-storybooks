"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  CountryConfig,
  SUPPORTED_COUNTRIES,
  DEFAULT_COUNTRY,
  getCountryConfig,
  PHASE_ONE_UAE_ONLY,
} from "@/config/locales";
import { Language, TranslationDictionary, TRANSLATIONS } from "@/config/translations";

interface CountryContextType {
  country: CountryConfig;
  setCountrySlug: (slug: string) => void;
  formatPrice: (price?: number) => string;
  isModalOpen: boolean;
  openCountryModal: () => void;
  closeCountryModal: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  dir: "ltr" | "rtl";
  t: TranslationDictionary;
  isPhaseOne: boolean;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export function CountryProvider({
  children,
  initialCountrySlug,
  initialLang,
}: {
  children: React.ReactNode;
  initialCountrySlug?: string;
  initialLang?: Language;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const isArPath = pathname ? (pathname === "/ar" || pathname.startsWith("/ar/")) : false;
  const resolvedInitialLang: Language = initialLang || (isArPath ? "ar" : "en");

  const pathSegment = pathname ? pathname.split("/")[1]?.toLowerCase() : "";
  const initialSlug = PHASE_ONE_UAE_ONLY
    ? "ae"
    : initialCountrySlug || (SUPPORTED_COUNTRIES[pathSegment] ? pathSegment : DEFAULT_COUNTRY);

  const [currentCountry, setCurrentCountry] = useState<CountryConfig>(
    getCountryConfig(initialSlug)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [language, setLanguageState] = useState<Language>(resolvedInitialLang);

  // Tracks whether the mount-time saved preference was applied, so the
  // pathname-sync effect below never overwrites it on first render.
  const savedPrefAppliedRef = useRef(false);
  const pathnameSyncFirstRunRef = useRef(true);

  // 1) On first mount, honor the visitor's saved language preference BEFORE
  // the pathname sync runs. Skipped when the URL itself pins a language
  // region (/ar*): an explicitly shared Arabic link always renders Arabic.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pt_lang");
      const pinsArabic = pathname === "/ar" || (pathname?.startsWith("/ar/") ?? false);
      if ((saved === "ar" || saved === "en") && !pinsArabic) {
        savedPrefAppliedRef.current = true;
        setLanguageState(saved);
        document.documentElement.lang = saved;
        document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
      }
    } catch {}
    // Mount-only: the saved preference is a first-load concern; the pathname
    // remains the source of truth on navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) Sync language from the pathname on mount/navigation — but never let
  // the first run clobber a just-applied saved preference.
  useEffect(() => {
    if (pathnameSyncFirstRunRef.current) {
      pathnameSyncFirstRunRef.current = false;
      if (savedPrefAppliedRef.current) return;
    }
    try {
      if (pathname && (pathname === "/ar" || pathname.startsWith("/ar/"))) {
        setLanguageState("ar");
        document.documentElement.lang = "ar";
        document.documentElement.dir = "rtl";
        localStorage.setItem("pt_lang", "ar");
      } else {
        setLanguageState("en");
        document.documentElement.lang = "en";
        document.documentElement.dir = "ltr";
        localStorage.setItem("pt_lang", "en");
      }
    } catch {}
  }, [pathname]);

  // Locked to UAE exclusively
  useEffect(() => {
    const ae = SUPPORTED_COUNTRIES["ae"];
    if (ae) setCurrentCountry(ae);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("pt_lang", lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    } catch {}
  };

  const toggleLanguage = () => {
    if (language === "en") {
      setLanguageState("ar");
      try {
        localStorage.setItem("pt_lang", "ar");
        document.documentElement.lang = "ar";
        document.documentElement.dir = "rtl";
      } catch {}

      // Navigate to /ar equivalent if on an indexable page
      if (pathname === "/") {
        router.push("/ar");
      } else if (pathname && !pathname.startsWith("/ar")) {
        router.push(`/ar${pathname}`);
      }
    } else {
      setLanguageState("en");
      try {
        localStorage.setItem("pt_lang", "en");
        document.documentElement.lang = "en";
        document.documentElement.dir = "ltr";
      } catch {}

      // Navigate back to English equivalent
      if (pathname === "/ar") {
        router.push("/");
      } else if (pathname && pathname.startsWith("/ar/")) {
        router.push(pathname.replace(/^\/ar/, "") || "/");
      }
    }
  };

  const setCountrySlug = (slug?: string) => {
    const normalized = (slug || "").trim().toLowerCase();
    // Phase 1 is UAE-only: honor the requested slug when it maps to a
    // supported country instead of silently discarding it.
    const config = normalized ? SUPPORTED_COUNTRIES[normalized] : undefined;
    if (config) {
      setCurrentCountry(config);
    }
    setIsModalOpen(false);
  };

  const formatPrice = (customPrice?: number): string => {
    const val = customPrice !== undefined ? customPrice : currentCountry.price;
    if (language === "ar") {
      return `${val.toFixed(2)} د.إ`;
    }
    return `${val.toFixed(2)} AED`;
  };

  const t = TRANSLATIONS[language];
  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <CountryContext.Provider
      value={{
        country: currentCountry,
        setCountrySlug,
        formatPrice,
        isModalOpen,
        openCountryModal: () => setIsModalOpen(true),
        closeCountryModal: () => setIsModalOpen(false),
        language,
        setLanguage,
        toggleLanguage,
        dir,
        t,
        isPhaseOne: PHASE_ONE_UAE_ONLY,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountry must be used within a CountryProvider");
  }
  return context;
}

