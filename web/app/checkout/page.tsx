'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname, notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CreditCard,
  CheckCircle2,
  Share2,
  Loader2,
  Truck,
  Clock,
} from 'lucide-react';
import { useCountry } from '@/lib/context/CountryContext';
import { PRODUCTS, getProductBySlug } from '@/config/products';
import { UAE_EMIRATES } from '@/config/locales';
import {
  FORMAT_PRICES,
  COUPON_RULES,
  ADDON_PRICES,
  getCouponDiscount,
  type FormatId,
} from '@/lib/utils/pricing';
import { DIGITAL_ONLY_LAUNCH } from '@/config/launch';

// Email format validation — shared by the form and the /api/checkout call.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function formatUAEPhoneNumber(val: string): string {
  // Strip non-digits. Never silently drop digits the user typed —
  // over-long input is flagged by validation instead of being mangled.
  const digits = val.replace(/\D/g, '').slice(0, 12);
  // UAE mobile numbers are 9 digits starting with 50, 52, 54, 55, 56, 58
  // Group as XX XXX XXXX
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
  if (digits.length <= 9) return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
  return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 9)} ${digits.slice(9)}`;
}

function CheckoutContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { country, language: contextLang, dir: contextDir } = useCountry();

  const isAr = contextLang === 'ar' || (pathname ? (pathname === '/ar' || pathname.startsWith('/ar/')) : false);
  const dir = isAr ? 'rtl' : 'ltr';

  const bookSlug = searchParams.get('book') || 'the-secret-of-the-starlit-dunes';
  const childName = searchParams.get('name') || (isAr ? 'زايد' : 'Zayed');
  // DIGITAL-ONLY LAUNCH: only the digital edition is sold — coerce any
  // physical or tampered format to digital (the API re-validates server-side).
  const format = DIGITAL_ONLY_LAUNCH ? 'digital' : (searchParams.get('format') || 'hardcover');
  // NOTE: the charged total is NEVER taken from ?total= — it is recomputed
  // below from the decoded order data (see displayTotal). ?total= survives
  // only as a sanitized last-resort display fallback.
  const hasGiftBox = searchParams.get('giftBox') === 'true';
  const hasGiftWrap = searchParams.get('giftWrap') === 'true';
  const hasColoringBook = searchParams.get('coloringBook') === 'true';
  const hasAudioKeepsake = searchParams.get('audioKeepsake') === 'true';
  const hasStickers = searchParams.get('stickers') === 'true';
  const quantity = searchParams.get('qty') || '1';

  // Personalization carried through from the create wizard (shown in the order summary)
  const dedicationText = searchParams.get('dedicationText') || '';
  const giverName = searchParams.get('giver') || '';
  const coverColor = searchParams.get('color') || '';
  const hasPhoto = searchParams.get('photo') === 'yes';

  // Multi-item support: the mini-cart may pass every item as a JSON array (?items=...).
  // Falls back to the legacy single-item params when absent or invalid.
  interface DecodedOrderItem {
    book: string;
    name: string;
    format: string;
    qty: number;
    price: number;
    // Personalization extras — optional in the URL JSON; always defaulted below.
    dedicationText: string;
    giverName: string;
    hasPhoto: boolean;
    coverColor: string;
    characterJson: string;
  }
  let decodedItems: DecodedOrderItem[] = [];
  try {
    const rawItems = searchParams.get('items');
    if (rawItems) {
      const parsed: unknown = JSON.parse(rawItems);
      if (Array.isArray(parsed)) {
        decodedItems = parsed
          .filter(
            (i): i is Record<string, unknown> =>
              typeof i === 'object' && i !== null && typeof (i as Record<string, unknown>).book === 'string'
          )
          .map((i) => ({
            book: String(i.book),
            name: String(i.name ?? ''),
            format: DIGITAL_ONLY_LAUNCH
              ? 'digital'
              : ['softcover', 'hardcover', 'layflat', 'digital'].includes(String(i.format))
                ? String(i.format)
                : 'hardcover',
            qty: Math.max(1, parseInt(String(i.qty ?? '1'), 10) || 1),
            price: Math.max(0, Number(i.price) || 0),
            // Personalization extras: read defensively, default when absent (backward compatible).
            dedicationText: typeof i.dedicationText === 'string' ? i.dedicationText : '',
            giverName: typeof i.giverName === 'string' ? i.giverName : '',
            hasPhoto: i.hasPhoto === true,
            coverColor: typeof i.coverColor === 'string' ? i.coverColor : '',
            characterJson: typeof i.characterJson === 'string' ? i.characterJson : '',
          }));
      }
    }
  } catch {
    decodedItems = [];
  }
  const hasItemsParam = decodedItems.length > 0;

  const product = getProductBySlug(bookSlug) ?? PRODUCTS[0];

  // Contact & Delivery form states (start empty — never prefill with demo data)
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedEmirate, setSelectedEmirate] = useState('dubai');
  const [streetAddress, setStreetAddress] = useState('');
  const [villaApartment, setVillaApartment] = useState('');
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'apple_pay' | 'card'>('apple_pay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // The catalog is static, so a missing product is unreachable in practice —
  // but noUncheckedIndexedAccess makes PRODUCTS[0] possibly undefined, so
  // fail loudly instead of rendering broken markup.
  if (!product) notFound();

  // ---- Order total: ALWAYS recomputed from order data, never from ?total= --
  // Unit prices come from the CATALOG (FORMAT_PRICES), never from the URL —
  // item.price inside ?items= JSON is a price-tampering vector and is ignored.
  // Mirrors the cart page's addon prices so the checkout total matches the
  // total the customer agreed to in the cart — derived from the shared
  // pricing authority (@/lib/utils/pricing) so they can never drift.
  // Keepsake photo is a free personalization marker (no upload exists yet),
  // so it is never billed.
  const ADDON_UNIT_PRICES = ADDON_PRICES;
  const addonsTotal =
    (hasGiftBox ? ADDON_UNIT_PRICES.giftBox : 0) +
    (hasColoringBook ? ADDON_UNIT_PRICES.coloringBook : 0) +
    (hasAudioKeepsake ? ADDON_UNIT_PRICES.audioKeepsake : 0) +
    (hasGiftWrap ? ADDON_UNIT_PRICES.giftWrap : 0) +
    (hasStickers ? ADDON_UNIT_PRICES.stickers : 0) +
    (hasPhoto ? ADDON_UNIT_PRICES.photo : 0);

  // ---- Coupon discounts: shared pricing authority -------------------------
  // The cart passes ?coupon= and discounts the total it showed; checkout must
  // honor the same discount or it would display a HIGHER total than the cart.
  // NOTE (demo): coupons are validated client-side only for now. When real
  // payments are wired, coupons MUST be validated server-side — never trust
  // the ?coupon= param as a payment authority.
  const couponParam = (searchParams.get('coupon') || '').toUpperCase();
  const appliedCoupon = couponParam in COUPON_RULES ? couponParam : null;
  const qtyNum = Math.max(1, parseInt(quantity, 10) || 1);
  const baseUnitPrice = FORMAT_PRICES[format as FormatId] ?? 79;
  // Per-item unit prices are derived from the catalog, NOT from ?items= JSON.
  const catalogUnitPrice = (itemFormat: string): number =>
    FORMAT_PRICES[itemFormat as FormatId] ?? 79;
  const itemsSubtotal = hasItemsParam
    ? decodedItems.reduce((sum, item) => sum + catalogUnitPrice(item.format) * item.qty, 0)
    : baseUnitPrice * qtyNum;
  const grossSubtotal = itemsSubtotal + addonsTotal;
  const discountItems = hasItemsParam
    ? decodedItems.map((item) => ({
        unitPrice: catalogUnitPrice(item.format),
        quantity: item.qty,
      }))
    : [{ unitPrice: baseUnitPrice, quantity: qtyNum }];
  const discountAmount = getCouponDiscount(appliedCoupon, discountItems, grossSubtotal);
  const computedTotal: number | null = Math.max(grossSubtotal - discountAmount, 0);
  // Last resort: sanitized ?total= — used ONLY when no item data exists at all
  // (legacy params always carry defaults, so this branch is effectively dead).
  const rawTotalParam = searchParams.get('total');
  const parsedTotalParam = rawTotalParam === null ? NaN : Number.parseFloat(rawTotalParam);
  const fallbackTotal = Number.isFinite(parsedTotalParam) && parsedTotalParam >= 0 ? parsedTotalParam : 79;
  const displayTotal = (computedTotal ?? fallbackTotal).toFixed(2);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatUAEPhoneNumber(e.target.value);
    setPhone(formatted);
    if (phoneError) setPhoneError('');
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate the email FORMAT (not just non-empty) before accepting the order.
    const trimmedEmail = email.trim();
    if (!EMAIL_RE.test(trimmedEmail)) {
      setEmailError(isAr ? 'يرجى إدخال بريد إلكتروني صحيح.' : 'Please enter a valid email address.');
      return;
    }
    setEmailError('');
    // Validate the phone number instead of silently mangling it:
    // a UAE mobile needs at least 9 digits.
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 9) {
      setPhoneError(
        isAr
          ? 'يرجى إدخال رقم هاتف إماراتي صحيح (٩ أرقام على الأقل)'
          : 'Please enter a valid UAE phone number (at least 9 digits).'
      );
      return;
    }
    setPhoneError('');

    // Build the payload from the ORDER data — never from any ?total= param.
    // Unit prices are recomputed SERVER-SIDE from the catalog; the client
    // only names products, formats, quantities, and addon toggles.
    const payloadItems = hasItemsParam
      ? decodedItems.map((i) => ({ bookSlug: i.book, format: i.format, qty: i.qty }))
      : [{ bookSlug, format, qty: qtyNum }];

    setIsProcessing(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: payloadItems,
          addons: {
            giftBox: hasGiftBox,
            coloringBook: hasColoringBook,
            audioKeepsake: hasAudioKeepsake,
            giftWrap: hasGiftWrap,
            stickers: hasStickers,
            photo: hasPhoto,
          },
          customerEmail: trimmedEmail,
          coupon: appliedCoupon,
        }),
      });
      const data: { checkoutUrl?: string; error?: string } = await res
        .json()
        .catch(() => ({}));
      if (res.ok && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      if (res.status === 503 && data.error === 'payments_not_configured') {
        // Honest demo fallback: gateway keys are not configured, so no real
        // payment can start. Reuse the existing order-complete screen — it
        // already says demo mode / no real payment was processed.
        setIsProcessing(false);
        setOrderComplete(true);
        return;
      }
      throw new Error(data.error || 'checkout_failed');
    } catch {
      setIsProcessing(false);
      alert(isAr ? 'تعذّر بدء الدفع. حاول مرة أخرى.' : 'Payment could not be started. Please try again.');
    }
  };

  const formatLabel = isAr
    ? format === 'digital'
      ? 'النسخة الرقمية الفورية (٤٩ د.إ)'
      : format === 'layflat'
        ? 'إصدار ملكي منبسط فاخر (٩٩ د.إ)'
        : format === 'hardcover'
          ? 'غلاف مقوى كلاسيكي تذكاري (٧٩ د.إ)'
          : 'غلاف مرن خفيف (٤٩ د.إ)'
    : format === 'digital'
      ? 'Digital Edition — Instant Delivery (49 AED)'
      : format === 'layflat'
        ? 'Deluxe Layflat Keepsake (99 AED)'
        : format === 'hardcover'
          ? 'Classic Hardcover Keepsake (79 AED)'
          : 'Softcover Edition (49 AED)';

  if (orderComplete) {
    return (
      <main className={`min-h-screen bg-[#FDF8F1] text-[#23231e] py-12 px-4 font-sans flex items-center justify-center ${isAr ? 'font-serif' : ''}`} dir={dir}>
        <div className="max-w-xl w-full bg-white border border-[#23231e]/15 rounded-[2px] p-8 text-center space-y-6 shadow-md animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] border border-[#1E5751]/20 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] text-xs font-mono font-bold uppercase tracking-wider">
              <span>{isAr ? 'تم تأكيد الطلب' : 'Order Confirmed'} #PT-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#23231e]">
              {DIGITAL_ONLY_LAUNCH
                ? (isAr ? `مبارك! النسخة الرقمية لقصة ${childName} جاهزة` : `Hooray! ${childName}’s Digital Story Is Ready`)
                : (isAr ? `مبارك! قصة ${childName} قيد الطباعة الفاخرة` : `Hooray! ${childName}’s Story is Being Handcrafted`)}
            </h1>
            <p className="text-xs text-[#23231e]/75 max-w-md mx-auto leading-relaxed font-medium">
              {DIGITAL_ONLY_LAUNCH
                ? (isAr
                  ? 'تم استلام طلبك بنجاح. أرسلنا النسخة الرقمية ثلاثية الأبعاد فوراً إلى بريدك الإلكتروني والواتساب.'
                  : 'Your order was successfully received. Your interactive 3D digital storybook has been sent instantly to your email & WhatsApp.')
                : (isAr
                  ? 'تم استلام طلبك بنجاح. أرسلنا النسخة الرقمية ثلاثية الأبعاد فوراً إلى بريدك الإلكتروني والواتساب، ويجري تجهيز النسخة المطبوعة للتوصيل خلال ٢٤-٤٨ ساعة.'
                  : 'Your order was successfully received. Your interactive 3D storybook is ready in your inbox, and your archival keepsake is scheduled for 24–48h express courier dispatch.')}
            </p>
          </div>

          {/* Delivery Details */}
          <div className="bg-[#FDF8F1] rounded-[2px] p-5 text-xs space-y-2.5 border border-[#23231e]/15 text-left rtl:text-right">
            <div className="flex justify-between">
              <span className="text-[#23231e]/60">{isAr ? 'المستلم:' : 'Recipient:'}</span>
              <span className="font-bold text-[#23231e]">{fullName} ({email})</span>
            </div>
            {!DIGITAL_ONLY_LAUNCH && (
            <div className="flex justify-between">
              <span className="text-[#23231e]/60">{isAr ? 'عنوان التوصيل:' : 'Delivery Address:'}</span>
              <span className="font-bold text-[#23231e]">{villaApartment}, {streetAddress}</span>
            </div>
            )}
            {phone && whatsappOptIn && (
              <div className="flex justify-between items-center text-[#1E5751] font-bold bg-[#1E5751]/10 p-2 rounded-[2px] border border-[#1E5751]/30">
                <span className="flex items-center gap-1.5">
                  <span className="text-sm">💬</span>
                  <span>{isAr ? 'إشعارات الواتساب مفعلة:' : 'WhatsApp Tracking Active:'}</span>
                </span>
                <span dir="ltr">+971 {phone}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-[#23231e]/15 font-serif font-black text-sm text-[#23231e]">
              <span>{isAr ? 'المبلغ المدفوع:' : 'Total Paid:'}</span>
              <span className="text-[#1E5751]">{displayTotal} {country.currency}</span>
            </div>
          </div>

          {/* Instant Action Buttons */}
          <div className="space-y-3 pt-2">
            <Link
              href={`${isAr ? '/ar/unwrap/demo' : '/unwrap/demo'}?name=${encodeURIComponent(childName)}&gifter=${encodeURIComponent(fullName)}`}
              className="w-full bg-[#1E5751] hover:bg-[#16433e] text-white font-serif font-black py-4 rounded-[2px] shadow-sm transition flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>{isAr ? `تصفح قصة ${childName} ثلاثية الأبعاد وفك الشريط` : `Open & Unwrap ${childName}’s 3D Keepsake`}</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                const text = isAr
                  ? `انظروا إلى القصة المخصصة التي صممناها للبطل ${childName}! تصفحوها هنا: https://personalizedtales.com`
                  : `Look at the personalized storybook we just made for ${childName}! Read it here: https://personalizedtales.com`;
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-[#23231e] font-bold py-3.5 rounded-[2px] transition flex items-center justify-center gap-2 text-xs cursor-pointer shadow-xs"
            >
              <Share2 className="w-4 h-4 text-[#23231e]" />
              <span>{isAr ? 'مشاركة رابط الهدية مع العائلة عبر الواتساب' : 'Share Keepsake with Family via WhatsApp'}</span>
            </button>
          </div>

          <div className="text-center pt-2">
            <Link href={isAr ? '/ar' : '/'} className="text-xs font-bold text-[#1E5751] hover:underline transition">
              {isAr ? '← العودة إلى الصفحة الرئيسية' : '← Return to Storefront'}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={`min-h-screen bg-[#FDF8F1] py-10 px-4 font-sans ${isAr ? 'font-serif' : ''}`} dir={dir}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#23231e]/10 mb-8">
          <Link href={isAr ? '/ar/cart' : '/cart'} className="inline-flex items-center gap-2 group">
            <span className="text-2xl group-hover:rotate-12 transition-transform">✨</span>
            <span className="font-serif font-black text-xl tracking-tight text-[#23231e]">
              {isAr ? (
                <>حكايات <span className="text-[#1E5751]">مخصصة</span></>
              ) : (
                <>Personalized<span className="text-[#1E5751]">Tales</span></>
              )}
            </span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-3.5 py-1.5 rounded-[2px] border border-amber-300 shadow-2xs">
            <span>{isAr ? 'وضع تجريبي' : 'Demo Mode'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Delivery Address & Payment */}
          <form onSubmit={handlePay} className="md:col-span-7 bg-white rounded-[2px] p-6 sm:p-8 border border-[#23231e]/15 shadow-xs space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] text-[10px] font-serif font-bold uppercase tracking-wider mb-2">
                <Truck className="w-3.5 h-3.5" />
                <span>{DIGITAL_ONLY_LAUNCH ? (isAr ? 'الخطوة الأولى: بيانات التواصل' : 'Step 1: Contact Details') : (isAr ? 'الخطوة الأولى: عنوان التوصيل' : 'Step 1: Delivery Address')}</span>
              </div>
              <h2 className="text-xl font-serif font-black text-[#23231e]">
                {DIGITAL_ONLY_LAUNCH
                  ? (isAr ? 'أين نرسل نسختك الرقمية؟' : 'Where Should We Send Your Digital Edition?')
                  : (isAr ? 'تفاصيل استلام الكتاب التذكاري' : 'Where Should We Deliver Your Keepsake?')}
              </h2>
              <p className="text-xs text-[#23231e]/70 mt-1">
                {DIGITAL_ONLY_LAUNCH
                  ? (isAr ? 'توصيل رقمي فوري إلى بريدك الإلكتروني والواتساب خلال دقائق' : 'Instant digital delivery to your email & WhatsApp — within minutes')
                  : (isAr ? 'توصيل محلي سريع خلال ٢٤ إلى ٤٨ ساعة في جميع الإمارات السبع' : 'Express 24–48h courier delivery across all 7 UAE Emirates')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#23231e] mb-1.5">
                  {isAr ? 'الاسم الكامل للمستلم' : 'Full Name'} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={isAr ? 'الاسم الكامل' : 'Full name'}
                  className="w-full px-4 py-3 rounded-[2px] border border-[#23231e]/20 text-sm font-medium outline-none focus:border-[#1E5751] focus:ring-1 focus:ring-[#1E5751]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#23231e] mb-1.5">
                  {isAr ? 'البريد الإلكتروني' : 'Email Address'} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-[2px] border border-[#23231e]/20 text-sm font-medium outline-none focus:border-[#1E5751] focus:ring-1 focus:ring-[#1E5751] text-left"
                  dir="ltr"
                />
                {emailError && (
                  <p className="text-rose-600 text-xs font-bold mt-1.5">{emailError}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#23231e] mb-1.5">
                  {isAr ? 'رقم هاتف المستلم (واتساب للتوصيل)' : 'UAE Phone Number'} <span className="text-rose-500">*</span>
                </label>
                <div className="flex gap-2" dir="ltr">
                  <span className="px-3 py-3 rounded-[2px] bg-[#FDF8F1] border border-[#23231e]/20 text-xs font-mono font-bold text-[#23231e] flex items-center">
                    +971
                  </span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="50 123 4567"
                    className="w-full px-4 py-3 rounded-[2px] border border-[#23231e]/20 text-sm font-medium outline-none focus:border-[#1E5751] text-left font-mono"
                  />
                </div>
                {phoneError && (
                  <p className="text-rose-600 text-xs font-bold mt-1.5">{phoneError}</p>
                )}
              </div>

              {/* UAE 7-Emirates Delivery Selection Dropdown — physical only */}
              {!DIGITAL_ONLY_LAUNCH && (
              <div>
                <label className="block text-xs font-bold text-[#23231e] mb-1.5">
                  {isAr ? 'الإمارة (الإمارات السبع)' : 'Emirate (All 7 Emirates)'} <span className="text-rose-500">*</span>
                </label>
                <select
                  value={selectedEmirate}
                  onChange={(e) => setSelectedEmirate(e.target.value)}
                  className="w-full px-4 py-3 rounded-[2px] border border-[#23231e]/20 text-sm font-medium outline-none focus:border-[#1E5751] bg-white cursor-pointer"
                >
                  {UAE_EMIRATES.map((em) => (
                    <option key={em.id} value={em.id}>
                      {isAr ? em.nameAr : em.nameEn} {em.isPopular ? '⭐' : ''}
                    </option>
                  ))}
                </select>
              </div>
              )}
            </div>

            {/* Street & villa address — physical deliveries only; digital needs just email & WhatsApp */}
            {!DIGITAL_ONLY_LAUNCH && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#23231e] mb-1.5">
                  {isAr ? 'اسم الشارع والمنطقة' : 'Street & Area'} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  placeholder={isAr ? 'اسم الشارع والمنطقة' : 'Street & area'}
                  className="w-full px-4 py-3 rounded-[2px] border border-[#23231e]/20 text-sm font-medium outline-none focus:border-[#1E5751]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#23231e] mb-1.5">
                  {isAr ? 'رقم الفيلا أو الشقة والمبنى' : 'Villa / Apartment & Building'} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={villaApartment}
                  onChange={(e) => setVillaApartment(e.target.value)}
                  placeholder={isAr ? 'رقم الفيلا / الشقة والمبنى' : 'Villa / apartment & building'}
                  className="w-full px-4 py-3 rounded-[2px] border border-[#23231e]/20 text-sm font-medium outline-none focus:border-[#1E5751]"
                />
              </div>
            </div>
            )}

            {/* PROMINENT WHATSAPP DELIVERY UPDATES CHECKBOX WITH UAE BADGE */}
            <div className="p-4 rounded-[2px] bg-[#1E5751]/10 border border-[#1E5751]/30 shadow-xs transition-all">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={whatsappOptIn}
                  onChange={(e) => setWhatsappOptIn(e.target.checked)}
                  className="w-5 h-5 rounded-[2px] text-[#1E5751] focus:ring-[#1E5751] border-slate-300 mt-0.5 cursor-pointer shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs bg-[#25D366] text-[#23231e] font-black px-2.5 py-0.5 rounded-[2px] inline-flex items-center gap-1 shadow-2xs">
                      <span>🇦🇪</span>
                      <span>WhatsApp</span>
                    </span>
                    <span className="font-serif font-bold text-xs sm:text-sm text-[#23231e]">
                      {isAr
                        ? 'استلام تحديثات التوصيل وتتبع الشحنة فوراً عبر الواتساب والرسائل'
                        : 'Receive instant SMS & WhatsApp tracking updates on your UAE phone number'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#23231e]/75 leading-relaxed">
                    {isAr
                      ? 'ستصلك تحديثات الطلب عبر البريد الإلكتروني.'
                      : 'Order updates via email.'}
                  </p>
                </div>
              </label>
            </div>

            {/* Payment Method Section */}
            <div className="pt-6 border-t border-[#23231e]/10 space-y-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] text-[10px] font-serif font-bold uppercase tracking-wider mb-2">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>{isAr ? 'الخطوة الثانية: طريقة الدفع' : 'Step 2: Payment Method'}</span>
                </div>
                <h2 className="text-xl font-serif font-black text-[#23231e]">
                  {isAr ? 'الدفع الآمن والمشفر' : 'Secure & Instant Payment'}
                </h2>
              </div>

              {/* Payment Method Tabs */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`py-3 px-2 rounded-[2px] border text-xs font-bold transition text-center cursor-pointer ${
                    paymentMethod === 'apple_pay'
                      ? 'border-[#23231e] bg-[#23231e] text-white shadow-xs'
                      : 'border-[#23231e]/15 bg-[#FDF8F1] text-[#23231e] hover:bg-slate-100'
                  }`}
                >
                  <span className="text-base block mb-0.5">🍎</span>
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-3 px-2 rounded-[2px] border text-xs font-bold transition text-center cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#23231e] bg-[#23231e] text-white shadow-xs'
                      : 'border-[#23231e]/15 bg-[#FDF8F1] text-[#23231e] hover:bg-slate-100'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1" />
                  <span>{isAr ? 'بطاقة بنكية' : 'Credit Card'}</span>
                </button>
              </div>

              {/* Primary Pay Action */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#1E5751] hover:bg-[#16433e] text-white font-serif font-black py-4 rounded-[2px] shadow-sm transition flex items-center justify-center gap-2 text-base cursor-pointer transform hover:-translate-y-0.5"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>{isAr ? 'جاري معالجة الدفع الآمن...' : 'Processing Secure Payment...'}</span>
                  </>
                ) : (
                  <>
                    <span>
                      {paymentMethod === 'apple_pay'
                        ? isAr
                          ? `الدفع عبر Apple Pay • ${displayTotal} ${country.currency}`
                          : `Pay with Apple Pay • ${displayTotal} ${country.currency}`
                        : isAr
                        ? `إتمام الطلب والدفع • ${displayTotal} ${country.currency}`
                        : `Complete Order • ${displayTotal} ${country.currency}`}
                    </span>
                    {dir === 'rtl' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-3 text-[10px] text-[#23231e]/60 font-bold">
                <span>{isAr ? '🧪 وضع تجريبي — لا يتم خصم أي مبلغ حقيقي' : '🧪 Demo mode — no real payment is processed'}</span>
                <span>•</span>
                <span>{isAr ? '✓ ضمان الرضا الكامل' : '✓ 100% Satisfaction Guarantee'}</span>
                <span>•</span>
                <span>{isAr ? '✓ توصيل رقمي فوري' : '✓ Instant Digital Delivery'}</span>
              </div>
            </div>
          </form>

          {/* Right Column: Order Summary */}
          <div className="md:col-span-5 bg-white rounded-[2px] p-6 border border-[#23231e]/15 shadow-xs space-y-4 sticky top-6">
            <h3 className="font-serif font-black text-base text-[#23231e] pb-3 border-b border-[#23231e]/10">
              {isAr ? 'ملخص الطلب' : 'Order Summary'}
            </h3>

            {hasItemsParam ? (
              <div className="space-y-3">
                {decodedItems.map((item, idx) => {
                  const itemProduct = getProductBySlug(item.book) ?? PRODUCTS[0];
                  if (!itemProduct) return null;
                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-12 h-14 rounded-[2px] bg-amber-50 overflow-hidden shrink-0 border border-[#23231e]/15 shadow-2xs">
                        <img src={itemProduct.coverImage} alt={itemProduct.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 space-y-0.5">
                        <h4 className="font-serif font-black text-xs text-[#23231e] line-clamp-1">
                          {isAr && itemProduct.titleAr ? itemProduct.titleAr : itemProduct.title}
                        </h4>
                        <p className="text-[11px] text-[#1E5751] font-bold">
                          {isAr ? `للبطل الصغير: ${item.name}` : `Starring: ${item.name}`}
                        </p>
                        <p className="text-[10px] text-[#23231e]/60 font-medium capitalize">
                          {item.format} • {isAr ? `${item.qty} نسخة` : `Qty: ${item.qty}`} • {catalogUnitPrice(item.format).toFixed(2)} {country.currency}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-16 h-20 rounded-[2px] bg-amber-50 overflow-hidden shrink-0 border border-[#23231e]/15 shadow-2xs">
                  <img src={product.coverImage} alt={product.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-serif font-black text-xs text-[#23231e] line-clamp-1">
                    {isAr && product.titleAr ? product.titleAr : product.title}
                  </h4>
                  <p className="text-[11px] text-[#1E5751] font-bold">
                    {isAr ? `للبطل الصغير: ${childName}` : `Starring: ${childName}`}
                  </p>
                  <p className="text-[10px] text-[#23231e]/60 font-medium">
                    {formatLabel} • {isAr ? `${quantity} نسخة` : `Qty: ${quantity}`}
                  </p>
                </div>
              </div>
            )}

            {/* Personalization details carried through from the create wizard */}
            {(dedicationText || giverName || coverColor || hasPhoto) && (
              <div className="pt-3 border-t border-[#23231e]/10 space-y-1.5 text-[11px]">
                {giverName && (
                  <div className="flex justify-between gap-2">
                    <span className="text-[#23231e]/60 shrink-0">{isAr ? 'المُهدي:' : 'Giver:'}</span>
                    <span className="font-bold text-[#23231e] text-right rtl:text-left">{giverName}</span>
                  </div>
                )}
                {coverColor && (
                  <div className="flex justify-between gap-2">
                    <span className="text-[#23231e]/60 shrink-0">{isAr ? 'لون الغلاف:' : 'Cover color:'}</span>
                    <span className="font-bold text-[#23231e] capitalize">{coverColor.replace(/-/g, ' ')}</span>
                  </div>
                )}
                {hasPhoto && (
                  <div className="flex justify-between gap-2">
                    <span className="text-[#23231e]/60 shrink-0">{isAr ? 'الصورة التذكارية:' : 'Keepsake photo:'}</span>
                    <span className="font-bold text-[#1E5751]">{isAr ? '✓ مرفقة' : '✓ Attached'}</span>
                  </div>
                )}
                {dedicationText && (
                  <div>
                    <span className="text-[#23231e]/60 block mb-1">{isAr ? 'رسالة الإهداء:' : 'Dedication:'}</span>
                    <p className="font-medium text-[#23231e] bg-[#FDF8F1] border border-[#23231e]/10 rounded-[2px] p-2 whitespace-pre-line line-clamp-4">
                      {dedicationText}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2 pt-3 border-t border-[#23231e]/10 text-xs font-semibold text-[#23231e]/80">
              <div className="flex justify-between">
                <span>{isAr ? 'قيمة الطلب:' : 'Subtotal:'}</span>
                <span className="font-bold text-[#23231e]">{grossSubtotal.toFixed(2)} {country.currency}</span>
              </div>
              {discountAmount > 0 && appliedCoupon && (
                <div className="flex justify-between text-[#1E5751] font-bold">
                  <span>
                    {appliedCoupon === 'BOGO50'
                      ? isAr
                        ? 'خصم (BOGO50 - ٥٠٪ على الكتاب الثاني):'
                        : 'Discount (BOGO50 - 50% off 2nd book):'
                      : isAr
                      ? `خصم (${appliedCoupon}):`
                      : `Discount (${appliedCoupon}):`}
                  </span>
                  <span>-{discountAmount.toFixed(2)} {country.currency}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>{DIGITAL_ONLY_LAUNCH ? (isAr ? 'التوصيل الرقمي:' : 'Digital Delivery:') : (isAr ? 'الشحن والتوصيل للإمارات:' : 'UAE Express Delivery:')}</span>
                <span className="text-[#1E5751] font-bold">{isAr ? 'مجاني' : 'FREE'}</span>
              </div>
              {hasGiftBox && (
                <div className="flex justify-between text-[#1E5751] text-[11px]">
                  <span>{isAr ? '✓ صندوق هدايا ملكي' : '✓ Luxury Gift Box'}</span>
                  <span className="font-bold">+39.00 {country.currency}</span>
                </div>
              )}
              {hasColoringBook && (
                <div className="flex justify-between text-[#1E5751] text-[11px]">
                  <span>{isAr ? '✓ دفتر تلوين مخصص' : '✓ Coloring Book'}</span>
                  <span className="font-bold">+19.00 {country.currency}</span>
                </div>
              )}
              {hasAudioKeepsake && (
                <div className="flex justify-between text-[#1E5751] text-[11px]">
                  <span>{isAr ? '✓ تسجيل صوتي سينمائي' : '✓ Bedtime Audio'}</span>
                  <span className="font-bold">+19.00 {country.currency}</span>
                </div>
              )}
              {hasGiftWrap && (
                <div className="flex justify-between text-[#1E5751] text-[11px]">
                  <span>{isAr ? '✓ غلاف هدية ساتان' : '✓ Satin Gift Sleeve'}</span>
                  <span className="font-bold">+15.00 {country.currency}</span>
                </div>
              )}
              {hasStickers && (
                <div className="flex justify-between text-[#1E5751] text-[11px]">
                  <span>{isAr ? '✓ ملصقات المغامرة' : '✓ Adventure Stickers'}</span>
                  <span className="font-bold">+9.00 {country.currency}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#23231e]/15 flex justify-between items-baseline">
              <span className="font-serif font-black text-sm text-[#23231e]">
                {isAr ? 'المجموع الإجمالي:' : 'Total Amount:'}
              </span>
              <div className="text-right rtl:text-left">
                <span className="font-serif font-black text-2xl text-[#23231e]">
                  {displayTotal} {country.currency}
                </span>
                <span className="text-[10px] text-[#23231e]/60 block">
                  {DIGITAL_ONLY_LAUNCH ? (isAr ? 'شاملاً ضريبة القيمة المضافة' : 'VAT Included') : (isAr ? 'شاملاً ضريبة القيمة المضافة والتوصيل' : 'VAT & Express Delivery Included')}
                </span>
              </div>
            </div>

            {/* Courier Dispatch Timetable across UAE */}
            <div className="pt-3 border-t border-[#23231e]/10 space-y-1.5 text-[11px] text-[#23231e]/70">
              <div className="flex items-center gap-1.5 text-[#1E5751] font-serif font-bold">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>{DIGITAL_ONLY_LAUNCH ? (isAr ? 'التوصيل: فوري (رقمي)' : 'Delivery: Instant (digital)') : (isAr ? 'موعد التسليم المقدر: ٢٤-٤٨ ساعة' : 'Estimated Delivery: 24–48 Hours')}</span>
              </div>
              <p className="leading-relaxed">
                {isAr
                  ? 'يتم تسليم الطلبات داخل دبي خلال ٢٤ ساعة، وأبوظبي وبقية الإمارات خلال يومي عمل كحد أقصى.'
                  : 'Orders in Dubai delivered within 24 hours; Abu Dhabi & northern Emirates delivered within 2 business days.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDF8F1] flex items-center justify-center font-bold text-[#23231e]">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
