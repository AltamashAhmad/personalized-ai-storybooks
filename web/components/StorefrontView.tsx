'use client';

import { useEffect } from 'react';
import CountrySelectorModal from '@/components/CountrySelectorModal';
import StoreHeader from '@/components/StoreHeader';
import HeroPersonalizer from '@/components/HeroPersonalizer';
import BookCarousel from '@/components/BookCarousel';
import RangeRail from '@/components/RangeRail';
import HowItWorksSection from '@/components/HowItWorksSection';
import TrustBar from '@/components/TrustBar';
import ThoughtfullyMade from '@/components/ThoughtfullyMade';
import SeoAccordionSection from '@/components/SeoAccordionSection';
import NewsletterBand from '@/components/NewsletterBand';
import Footer from '@/components/Footer';
import { PRODUCTS } from '@/config/products';
import { useCountry } from '@/lib/context/CountryContext';

export {
  HeroPersonalizer,
  BookCarousel,
  RangeRail,
  HowItWorksSection,
  TrustBar,
  ThoughtfullyMade,
  SeoAccordionSection,
  NewsletterBand,
  Footer,
};

export interface StorefrontViewProps {
  initialCountrySlug?: string;
  initialLang?: 'en' | 'ar';
}

/**
 * StorefrontView: Thin Orchestrator for the Homepage.
 */
export default function StorefrontView({
  initialCountrySlug,
  initialLang = 'en',
}: StorefrontViewProps) {
  void initialCountrySlug;
  const { language: contextLang, setLanguage } = useCountry();

  const activeLang = initialLang || contextLang;
  const isAr = activeLang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  useEffect(() => {
    if (initialLang && initialLang !== contextLang) {
      setLanguage(initialLang);
    }
  }, [initialLang, contextLang, setLanguage]);

  return (
    <div className="min-h-screen bg-[var(--color-kraft-paper-60,#FDF8F1)] text-[var(--color-sharpie,#23231E)] flex flex-col selection:bg-amber-200">
      <StoreHeader />
      <CountrySelectorModal />

      <main className="flex-1 flex flex-col">
        <HeroPersonalizer isAr={isAr} dir={dir} />
        <BookCarousel isAr={isAr} dir={dir} products={PRODUCTS} />
        <RangeRail isAr={isAr} dir={dir} />
        <HowItWorksSection isAr={isAr} dir={dir} />
        {/* S7: Social Proof Strip (Trustpilot reviews & verified ratings) */}
        <TrustBar isAr={isAr} dir={dir} trustRating={4.8} />
        <ThoughtfullyMade isAr={isAr} dir={dir} />
        <SeoAccordionSection isAr={isAr} dir={dir} />
        <NewsletterBand isAr={isAr} dir={dir} />
      </main>

      {/* S11: 5-column editorial footer (shared component) */}
      <Footer initialLang={initialLang} />
    </div>
  );
}
