'use client';

import React from 'react';
import Link from 'next/link';
import BrandLogo from '@/components/ui/BrandLogo';

import { useCountry } from '@/lib/context/CountryContext';
import { TRANSLATIONS } from '@/config/translations';

export interface FooterProps {
  className?: string;
  initialLang?: 'en' | 'ar';
}

export default function Footer({ className = '', initialLang }: FooterProps) {
  const { country, formatPrice, language: contextLang } = useCountry();
  const activeLang = initialLang || contextLang;
  const isAr = activeLang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const t = TRANSLATIONS[activeLang];
  const getLocalizedPath = (path: string) => (isAr ? `/ar${path}` : path);

  return (
    <footer className={`bg-[#23231E] text-slate-300 py-12 text-xs border-t border-slate-800 ${className}`} dir={dir}>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-6 gap-6 mb-8">
        <div>
          <div className="bg-white rounded-xl p-3 inline-flex mb-2">
            <BrandLogo variant="full" size="sm" isAr={isAr} />
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white uppercase mb-2 font-serif">{t.footer.popularCategories}</h4>
          <ul className="space-y-1 text-[11px]">
            <li><Link href={getLocalizedPath('/books/category/0-3-years')}>{t.footer.booksForBabies}</Link></li>
            <li><Link href={getLocalizedPath('/books/category/3-6-years')}>{t.footer.booksForToddlers}</Link></li>
            <li><Link href={getLocalizedPath('/books/category/6-9-years')}>{t.footer.booksForKids}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white uppercase mb-2 font-serif">{isAr ? 'خدمة العملاء' : 'Customer Care'}</h4>
          <ul className="space-y-1 text-[11px]">
            <li><Link href={getLocalizedPath('/contact')}>{isAr ? 'اتصل بنا' : 'Contact Us'}</Link></li>
            <li><Link href={getLocalizedPath('/delivery')}>{t.footer.deliveryInfo}</Link></li>
            <li><Link href={getLocalizedPath('/faq')}>{t.footer.helpFaq}</Link></li>
            <li><Link href={getLocalizedPath('/cart')}>{isAr ? 'سلة المشتريات' : 'Your Basket'}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white uppercase mb-2 font-serif">{isAr ? 'عن حكايات' : 'About Us'}</h4>
          <ul className="space-y-1 text-[11px]">
            <li><Link href={getLocalizedPath('/about-us')}>{t.footer.aboutUs}</Link></li>
            <li><Link href={getLocalizedPath('/quality')}>{t.footer.qualityPaper}</Link></li>
            <li><Link href={getLocalizedPath('/create/formats')}>{isAr ? 'خيارات التجليد' : 'Formats'}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white uppercase mb-2 font-serif">{isAr ? 'الإمارات العربية المتحدة' : 'United Arab Emirates'}</h4>
          <ul className="space-y-1 text-[11px]">
            <li><Link href={isAr ? '/ar' : '/'}>🇦🇪 {isAr ? 'الإمارات العربية المتحدة' : 'United Arab Emirates'}</Link></li>
            <li className="text-amber-300 font-semibold">{t.common.allEmirates}</li>
          </ul>
        </div>
        <div className="bg-white/5 p-3 rounded-xl border border-white/10">
          <div className="text-white font-bold mb-1 flex items-center gap-1.5 text-xs">
            <span>{country.flag}</span>
            <span>{isAr ? country.nameAr : country.nameEn}</span>
          </div>
          <div className="text-slate-400 text-[10px] mb-2">
            {isAr ? `العملة: ${country.currency} (${formatPrice()})` : `Currency: ${country.currency} (${formatPrice()})`}
          </div>
          <div className="text-[10px] text-amber-300 font-bold">{t.common.allEmirates}</div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px]">
        <div>{t.footer.rightsReserved}</div>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <Link href={getLocalizedPath('/delivery')}>{t.footer.deliveryInfo}</Link>
          <Link href={getLocalizedPath('/faq')}>{t.footer.helpFaq}</Link>
          <Link href={getLocalizedPath('/about-us')}>{t.footer.aboutUs}</Link>
        </div>
      </div>
    </footer>
  );
}
