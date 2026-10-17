'use client';

import { useCountry } from '@/lib/context/CountryContext';
import type { Language, TranslationDictionary } from '@/config/translations';
import type { CountryConfig } from '@/config/locales';

export interface UseBilingualDirReturn {
  isAr: boolean;
  dir: 'ltr' | 'rtl';
  fontClass: string;
  lang: Language;
  country: CountryConfig;
  currency: string;
  formatPrice: (price?: number) => string;
  t: TranslationDictionary;
}

/**
 * Custom hook wrapping useCountry() to provide quick bilingual direction,
 * font class ('font-serif' for Arabic, 'font-sans' for English), language, country, and currency.
 */
export function useBilingualDir(): UseBilingualDirReturn {
  const countryContext = useCountry();
  const isAr = countryContext.language === 'ar';
  const dir = countryContext.dir;
  const fontClass = isAr ? 'font-serif' : 'font-sans';
  const lang = countryContext.language;
  const country = countryContext.country;
  const currency = country.currency;

  return {
    isAr,
    dir,
    fontClass,
    lang,
    country,
    currency,
    formatPrice: countryContext.formatPrice,
    t: countryContext.t,
  };
}

export default useBilingualDir;
