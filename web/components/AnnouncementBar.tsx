import React from 'react';
import { DIGITAL_ONLY_LAUNCH } from '@/config/launch';

export interface AnnouncementBarProps {
  /** Fully composed message (offer copy, countdown, code). Built by the caller. */
  children?: React.ReactNode;
  promoCode?: 'BOGO50' | 'WELCOME10' | string;
  promoText?: string;
  promoTextAr?: string;
  dir?: 'ltr' | 'rtl';
}

/**
 * Single-line promotional strip above the header.
 * Racing-green band, centred 14px/500 copy, wraps cleanly on narrow screens.
 * Supports dynamic admin promo banners (BOGO50 / WELCOME10) and live countdown timer.
 */
export default function AnnouncementBar({
  children,
  promoCode = 'BOGO50',
  promoText,
  promoTextAr,
  dir,
}: AnnouncementBarProps) {
  const isAr = dir === 'rtl';

  return (
    <aside
      role="region"
      aria-label="Promotion"
      dir={dir}
      className="wb-body bg-[var(--color-racing-green)] px-4 py-2 text-center text-[13px] font-medium leading-snug text-white sm:text-sm selection:bg-white/20 transition-colors"
    >
      <div className="wb-container flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5">
        {children ? (
          children
        ) : (
          <span>
            {promoCode === 'WELCOME10' ? (
              isAr ? (
                promoTextAr || (
                  <>
                    ✨ أنشئ حساباً جديداً واحصل على خصم ١٠٪ على طلبك الأول • كود:{' '}
                    <span className="font-mono font-semibold">WELCOME10</span>
                  </>
                )
              ) : (
                promoText || (
                  <>
                    ✨ Create an account & get 10% OFF your first order • Code:{' '}
                    <span className="font-mono font-semibold">WELCOME10</span>
                  </>
                )
              )
            ) : isAr ? (
              promoTextAr || (
                <>
                  ✨ اشترِ كتاباً واحصل على الثاني بنصف السعر مع كود{' '}
                  <span className="font-mono font-semibold">BOGO50</span> • {DIGITAL_ONLY_LAUNCH ? 'توصيل رقمي فوري' : 'توصيل سريع للإمارات'}
                </>
              )
            ) : (
              promoText || (
                <>
                  ✨ Buy 1 Book, Get 2nd at 50% Off with Code{' '}
                  <span className="font-mono font-semibold">BOGO50</span> • {DIGITAL_ONLY_LAUNCH ? 'Instant Digital Delivery' : 'Express UAE Delivery'}
                </>
              )
            )}
          </span>
        )}
      </div>
    </aside>
  );
}
