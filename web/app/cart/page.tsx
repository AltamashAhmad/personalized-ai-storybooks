'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname, notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Edit3,
  Sparkles,
  Check,
  Plus,
  Minus,
  Gift,
  Truck,
  Star,
  Lock,
  Tag,
} from 'lucide-react';
import { useCountry } from '@/lib/context/CountryContext';
import { PRODUCTS, getProductBySlug } from '@/config/products';
import {
  FORMAT_PRICES,
  COUPON_RULES,
  ADDON_PRICES,
  getCouponDiscount,
  type FormatId,
} from '@/lib/utils/pricing';
import { DIGITAL_ONLY_LAUNCH } from '@/config/launch';

interface CartPageProps {
  initialLang?: 'en' | 'ar';
}

function CartContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { country, language: contextLang } = useCountry();

  const isAr = contextLang === 'ar' || (pathname ? (pathname === '/ar' || pathname.startsWith('/ar/')) : false);
  const dir = isAr ? 'rtl' : 'ltr';

  const bookSlug = searchParams.get('book') || 'the-secret-of-the-starlit-dunes';
  const childName = searchParams.get('name') || (isAr ? 'زايد' : 'Zayed');
  const format = (searchParams.get('format') || 'hardcover') as 'softcover' | 'hardcover' | 'layflat' | 'digital';
  // Guard tampered ?format= values (e.g. ?format=ebook): an unknown key makes
  // FORMAT_PRICES lookups return undefined, which would render NaN totals.
  // DIGITAL-ONLY LAUNCH: only the digital edition is sold — any physical or
  // unknown format is coerced to digital (the API re-validates server-side).
  const safeFormat = DIGITAL_ONLY_LAUNCH
    ? 'digital'
    : (['softcover', 'hardcover', 'layflat', 'digital'].includes(format) ? format : 'hardcover');

  const product = getProductBySlug(bookSlug) ?? PRODUCTS[0];

  // Base item pricing comes from the shared catalog (FORMAT_PRICES), never the URL.
  const baseUnitPrice = FORMAT_PRICES[safeFormat] ?? 79;

  // Personalization carried through from the create wizard
  const dedicationText = searchParams.get('dedicationText') || '';
  const giverName = searchParams.get('giver') || '';
  const coverColor = searchParams.get('color') || '';
  const hasPhoto = searchParams.get('photo') === 'yes';
  // Gender carried through from the create wizard — validated against the
  // allowlist; invalid or absent values are omitted downstream.
  const genderParam = searchParams.get('gender');
  const gender = genderParam === 'boy' || genderParam === 'girl' ? genderParam : '';

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
  const isMultiItem = decodedItems.length > 1;

  // Full wizard query (carried forward so back-navigation keeps every choice)
  const wizardQuery = searchParams.toString();
  const createBase = isAr ? '/ar/create' : '/create';

  // Cart item state
  const initialQty = parseInt(searchParams.get('qty') || '1', 10);
  const [quantity, setQuantity] = useState(isNaN(initialQty) || initialQty < 1 ? 1 : initialQty);
  const wrapParam = searchParams.get('wrap');
  // DIGITAL-ONLY LAUNCH: physical add-ons are not sold yet — force every
  // add-on off so they can never enter the order, whatever the URL says.
  const [hasGiftBox, setHasGiftBox] = useState(!DIGITAL_ONLY_LAUNCH && (searchParams.get('giftBox') === 'true' || wrapParam === 'box'));
  const [hasGiftWrap, setHasGiftWrap] = useState(!DIGITAL_ONLY_LAUNCH && (searchParams.get('giftWrap') === 'true' || wrapParam === 'sleeve'));
  const [hasColoringBook, setHasColoringBook] = useState(!DIGITAL_ONLY_LAUNCH && searchParams.get('coloringBook') === 'true');
  const [hasAudioKeepsake, setHasAudioKeepsake] = useState(!DIGITAL_ONLY_LAUNCH && searchParams.get('audioKeepsake') === 'true');
  const [hasStickers, setHasStickers] = useState(!DIGITAL_ONLY_LAUNCH && searchParams.get('stickers') === 'true');

  // Coupon state: check if URL provided coupon (e.g. UNWRAP20), default to BOGO50
  const urlCoupon = searchParams.get('coupon')?.toUpperCase();
  const defaultCoupon = urlCoupon === 'UNWRAP20' ? 'UNWRAP20' : 'BOGO50';
  const [couponCode, setCouponCode] = useState(defaultCoupon);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(defaultCoupon);

  // Addon unit prices — derived from the shared pricing authority
  // (@/lib/utils/pricing) so they can never drift from the catalog.
  const GIFT_BOX_PRICE = ADDON_PRICES.giftBox;
  const GIFT_SLEEVE_PRICE = ADDON_PRICES.giftWrap;
  const COLORING_BOOK_PRICE = ADDON_PRICES.coloringBook;
  const AUDIO_KEEPSAKE_PRICE = ADDON_PRICES.audioKeepsake;
  // Keepsake photo is a free personalization marker — no upload exists yet
  // (see DedicationStep TODO), so it must never be billed.
  const PHOTO_PRICE = ADDON_PRICES.photo;
  const STICKERS_PRICE = ADDON_PRICES.stickers;

  // Addons total
  const addonsTotal =
    (hasGiftBox ? GIFT_BOX_PRICE : 0) +
    (hasGiftWrap ? GIFT_SLEEVE_PRICE : 0) +
    (hasColoringBook ? COLORING_BOOK_PRICE : 0) +
    (hasAudioKeepsake ? AUDIO_KEEPSAKE_PRICE : 0) +
    (hasPhoto ? PHOTO_PRICE : 0) +
    (hasStickers ? STICKERS_PRICE : 0);

  // Subtotal before discounts (multi-item orders sum every line).
  // Per-item unit prices come from the CATALOG — never from the URL JSON
  // (item.price is a price-tampering vector and is ignored).
  const catalogUnitPrice = (itemFormat: string): number =>
    FORMAT_PRICES[itemFormat as FormatId] ?? 79;
  const itemsSubtotal = isMultiItem
    ? decodedItems.reduce((sum, i) => sum + catalogUnitPrice(i.format) * i.qty, 0)
    : baseUnitPrice * quantity;
  const grossSubtotal = itemsSubtotal + addonsTotal;

  // Discounts via the shared pricing authority. BOGO50 is fixed for
  // multi-item orders: it looks at TOTAL quantity across items and the
  // LOWEST unit price (the old math used single-item quantity/price only).
  const discountItems = isMultiItem
    ? decodedItems.map((i) => ({
        unitPrice: catalogUnitPrice(i.format),
        quantity: i.qty,
      }))
    : [{ unitPrice: baseUnitPrice, quantity }];
  const discountAmount = getCouponDiscount(appliedCoupon, discountItems, grossSubtotal);

  const finalTotal = Math.max(grossSubtotal - discountAmount, 0);

  // Basket badge count: total books in the order, not the single-item quantity.
  const basketCount = isMultiItem
    ? decodedItems.reduce((sum, i) => sum + i.qty, 0)
    : quantity;
  // BOGO50 banner inputs: total quantity + cheapest unit across the order.
  const bogoTotalQty = discountItems.reduce((sum, i) => sum + i.quantity, 0);
  const bogoUnitPrice = discountItems.reduce(
    (min, i) => Math.min(min, i.unitPrice),
    discountItems[0]?.unitPrice ?? baseUnitPrice
  );
  const bogoSavings = Math.round(bogoUnitPrice * 0.5);

  // UAE delivery is FREE on every order — no threshold meter, no "calculated at checkout".

  const formatLabel = isAr
    ? safeFormat === 'digital'
      ? 'النسخة الرقمية الفورية (٤٩ د.إ)'
      : safeFormat === 'layflat'
        ? 'إصدار ملكي منبسط فاخر (٩٩ د.إ)'
        : safeFormat === 'hardcover'
          ? 'غلاف مقوى كلاسيكي تذكاري (٧٩ د.إ)'
          : 'غلاف مرن خفيف (٤٩ د.إ)'
    : safeFormat === 'digital'
      ? 'Digital Edition — Instant Delivery (49 AED)'
      : safeFormat === 'layflat'
        ? 'Deluxe Layflat Keepsake (99 AED)'
        : safeFormat === 'hardcover'
          ? 'Classic Hardcover Keepsake (79 AED)'
          : 'Softcover Edition (49 AED)';

  // The catalog is static, so a missing product is unreachable in practice —
  // but noUncheckedIndexedAccess makes PRODUCTS[0] possibly undefined, so
  // fail loudly instead of rendering broken markup.
  if (!product) notFound();

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code in COUPON_RULES) {
      setAppliedCoupon(code);
    } else {
      alert(isAr ? 'رمز الكوبون غير صالح. جرب WELCOME10 أو BOGO50 أو UNWRAP20' : 'Invalid coupon code. Try WELCOME10, BOGO50, or UNWRAP20');
    }
  };

  const handleCheckout = () => {
    const query = new URLSearchParams({
      book: product.slug,
      name: childName,
      format: safeFormat,
      giftBox: String(hasGiftBox),
      giftWrap: String(hasGiftWrap),
      coloringBook: String(hasColoringBook),
      audioKeepsake: String(hasAudioKeepsake),
      stickers: String(hasStickers),
      qty: String(quantity),
      total: String(finalTotal),
      coupon: appliedCoupon || '',
      dedicationText,
      giver: giverName,
      color: coverColor,
      photo: hasPhoto ? 'yes' : 'no',
      // Forward the validated gender (omitted entirely when absent/invalid)
      ...(gender ? { gender } : {}),
      // Structured items array so checkout renders every item, incl. multi-item mini-cart orders
      items: JSON.stringify(
        isMultiItem
          ? decodedItems
          : [
              {
                book: product.slug,
                name: childName,
                format: safeFormat,
                qty: quantity,
                price: baseUnitPrice,
                dedicationText,
                giverName,
                hasPhoto,
                coverColor,
                characterJson: gender ? JSON.stringify({ gender }) : '',
              },
            ]
      ),
    }).toString();

    const checkoutPath = isAr ? '/ar/checkout' : '/checkout';
    router.push(`${checkoutPath}?${query}`);
  };

  return (
    <main className={`min-h-screen bg-[#FDF8F1] py-10 px-4 font-sans ${isAr ? 'font-serif' : ''}`} dir={dir}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#23231e]/10 mb-8">
          <Link href={isAr ? '/ar' : '/'} className="inline-flex items-center gap-2 group">
            <span className="text-2xl group-hover:rotate-12 transition-transform">✨</span>
            <span className="font-serif font-black text-xl tracking-tight text-[#23231e]">
              {isAr ? (
                <>حكايات <span className="text-[#1E5751]">مخصصة</span></>
              ) : (
                <>Personalized<span className="text-[#1E5751]">Tales</span></>
              )}
            </span>
          </Link>

          <div className="flex items-center gap-4 text-xs font-bold text-[#23231e]">
            <Link
              href={isAr ? '/ar#catalog' : '/#catalog'}
              className="hidden sm:inline-flex items-center gap-1 hover:text-[#1E5751] transition"
            >
              <span>{isAr ? '← متابعة التسوق' : '← Continue Shopping'}</span>
            </Link>
            <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-[2px] border border-[#23231e]/15 shadow-xs">
              <ShoppingBag className="w-4 h-4 text-[#1E5751]" />
              <span>{isAr ? 'سلة المشتريات' : 'Your Basket'} ({basketCount})</span>
            </div>
          </div>
        </div>

        {/* Free UAE Delivery banner — applies to every order */}
        <div className="mb-6 p-4 bg-white border border-[#23231e]/15 rounded-[2px] shadow-xs">
          <div className="flex items-center gap-2 text-[#1E5751] font-serif font-bold text-xs sm:text-sm">
            <Truck className="w-4 h-4 text-[#1E5751] shrink-0" />
            <span>
              {DIGITAL_ONLY_LAUNCH
                ? (isAr
                  ? '⚡ توصيل رقمي فوري إلى بريدك الإلكتروني والواتساب — خلال دقائق'
                  : '⚡ Instant digital delivery to your email & WhatsApp — within minutes')
                : (isAr
                  ? '🎉 توصيل سريع مجاني لجميع الإمارات السبع (٢٤-٤٨ ساعة) على جميع الطلبات'
                  : '🎉 FREE Express 24–48h Delivery across all 7 UAE Emirates on every order')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Cart Items Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#23231e]">
                {isAr ? 'سلة المشتريات التذكارية' : 'Your Keepsake Basket'}
              </h1>
              <span className="text-xs text-[#23231e]/70 font-semibold">
                {DIGITAL_ONLY_LAUNCH
                  ? (isAr ? 'توصيل رقمي فوري' : 'Instant digital delivery')
                  : (isAr ? 'شحن سريع ٢٤-٤٨ ساعة بالإمارات' : '24–48h Express UAE Courier')}
              </span>
            </div>

            {/* Dynamic BOGO 50% Promo Calculator (Buy 1 get 2nd at 50% off) */}
            {appliedCoupon === 'BOGO50' ? (
              <div className={`p-4 rounded-[2px] border transition-all ${
                bogoTotalQty >= 2
                  ? 'bg-[#1E5751]/10 border-[#1E5751]/40 text-[#23231e] shadow-xs'
                  : 'bg-[#FDF8F1] border-amber-400 text-[#23231e]'
              }`}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-[2px] flex items-center justify-center shrink-0 ${
                      bogoTotalQty >= 2 ? 'bg-[#1E5751] text-white' : 'bg-amber-500 text-white'
                    }`}>
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-serif font-bold uppercase tracking-wider">
                        {bogoTotalQty >= 2
                          ? isAr
                            ? '🎉 تم تفعيل كود BOGO50! خصم ٥٠٪ على الكتاب الثاني'
                            : '🎉 Code BOGO50 Activated! 50% OFF on 2nd Book Applied'
                          : isAr
                            ? 'عرض خاص: اشترِ كتاباً واحصل على الثاني بنصف السعر (كود BOGO50)'
                            : 'Special Offer: Buy 1 Book, Get 2nd at 50% OFF (Code BOGO50)'}
                      </div>
                      <p className="text-[11px] opacity-80 mt-0.5">
                        {bogoTotalQty >= 2
                          ? isAr
                            ? `وفرت الآن ${bogoSavings}.00 ${country.currency} مباشرة في سلتك!`
                            : `You just saved ${bogoSavings}.00 ${country.currency} instantly!`
                          : isAr
                            ? 'أضف نسخة ثانية لأخ، أخت، أو صديق للاستفادة من خصم ٥٠٪ فوراً.'
                            : 'Add another copy for a sibling, twin, or friend to unlock 50% savings on the 2nd book.'}
                      </p>
                    </div>
                  </div>

                  {!isMultiItem && quantity === 1 && (
                    <button
                      type="button"
                      onClick={() => setQuantity(2)}
                      className="bg-[#1E5751] hover:bg-[#16433e] text-white text-xs font-bold px-4 py-2 rounded-[2px] shadow-xs transition shrink-0 cursor-pointer"
                    >
                      {isAr ? '+ أضف كتاباً ثانياً (وفر ٥٠٪)' : '+ Add 2nd Copy (Save 50%)'}
                    </button>
                  )}
                </div>
              </div>
            ) : appliedCoupon === 'UNWRAP20' ? (
              <div className="p-4 rounded-[2px] border bg-[#1E5751]/10 border-[#1E5751]/30 text-[#23231e] shadow-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-[2px] bg-[#1E5751] text-white flex items-center justify-center shrink-0">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-serif font-bold uppercase tracking-wider">
                      {isAr ? '🎁 تم تفعيل كود الهدية UNWRAP20 (خصم ٢٠٪)!' : '🎁 Code UNWRAP20 Activated! 20% OFF Applied'}
                    </div>
                    <p className="text-[11px] opacity-80 mt-0.5">
                      {isAr
                        ? `وفرت ${discountAmount}.00 ${country.currency} بفضل كود فتح الهدية الرقمية!`
                        : `Saved ${discountAmount}.00 ${country.currency} from your digital unwrapping invitation!`}
                    </p>
                  </div>
                </div>
              </div>
            ) : appliedCoupon === 'WELCOME10' ? (
              <div className="p-4 rounded-[2px] border bg-[#1E5751]/10 border-[#1E5751]/30 text-[#23231e] shadow-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-[2px] bg-[#1E5751] text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-serif font-bold uppercase tracking-wider">
                      {isAr ? '🎉 تم تفعيل كود الترحيب WELCOME10! خصم ١٠٪ على طلبك الأول' : '🎉 Code WELCOME10 Activated! 10% OFF Applied'}
                    </div>
                    <p className="text-[11px] opacity-80 mt-0.5">
                      {isAr
                        ? `وفرت ${discountAmount}.00 ${country.currency} مباشرة مع خصم الحساب الجديد!`
                        : `You just saved ${discountAmount}.00 ${country.currency} with your new customer discount!`}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Multi-item order (from the mini-cart): read-only rows; add-ons & totals below apply to the whole order */}
            {isMultiItem && (
              <div className="bg-white rounded-[2px] p-6 border border-[#23231e]/15 shadow-xs space-y-4">
                <h3 className="font-serif font-black text-lg text-[#23231e]">
                  {isAr ? `كتبك التذكارية (${decodedItems.length})` : `Your Keepsake Books (${decodedItems.length})`}
                </h3>
                {decodedItems.map((item, idx) => {
                  const itemProduct = getProductBySlug(item.book) ?? PRODUCTS[0];
                  if (!itemProduct) return null;
                  return (
                    <div key={idx} className="flex items-start gap-4 py-3 border-b border-[#23231e]/10 last:border-0">
                      <div className="w-16 h-20 rounded-[2px] bg-amber-50 overflow-hidden shrink-0 border border-[#23231e]/15">
                        <img src={itemProduct.coverImage} alt={itemProduct.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-serif font-black text-sm text-[#23231e] line-clamp-1">
                          {isAr && itemProduct.titleAr ? itemProduct.titleAr : itemProduct.title}
                        </h4>
                        <p className="text-[11px] font-bold text-[#1E5751] mt-0.5">
                          {isAr ? `للبطل الصغير: ${item.name}` : `Starring: ${item.name}`}
                        </p>
                        <p className="text-[11px] text-[#23231e]/60 font-medium mt-0.5 capitalize">
                          {item.format} • {isAr ? `${item.qty} نسخة` : `Qty: ${item.qty}`}
                        </p>
                      </div>
                      <div className="text-sm font-serif font-black text-[#23231e] shrink-0">
                        {(catalogUnitPrice(item.format) * item.qty).toFixed(2)} {country.currency}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Cart Line Item Card (single-item mode) */}
            {!isMultiItem && (
            <div className="bg-white rounded-[2px] p-6 border border-[#23231e]/15 shadow-xs relative space-y-6">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* Book Thumbnail */}
                <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-[2px] bg-amber-50 overflow-hidden shrink-0 border border-[#23231e]/15 shadow-xs">
                  <img
                    src={product.coverImage}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] text-[10px] font-bold uppercase tracking-wider mb-1">
                        <span>{isAr ? 'كتاب مخصص لطفلك' : 'Personalized Keepsake'}</span>
                      </div>
                      <h3 className="font-serif font-black text-lg text-[#23231e]">
                        {isAr && product.titleAr ? product.titleAr : product.title}
                      </h3>
                      <p className="text-xs font-bold text-[#1E5751] mt-0.5">
                        {isAr ? `للبطل الصغير: ${childName}` : `Starring: ${childName}`} • {formatLabel}
                      </p>

                      {/* Personalization carried through from the create wizard */}
                      {(giverName || coverColor || hasPhoto || dedicationText) && (
                        <div className="mt-2 pt-2 border-t border-[#23231e]/10 space-y-1 text-[11px]">
                          {giverName && (
                            <p className="text-[#23231e]/70">
                              <span className="font-bold text-[#23231e]">{isAr ? 'المُهدي: ' : 'Giver: '}</span>
                              {giverName}
                            </p>
                          )}
                          {coverColor && (
                            <p className="text-[#23231e]/70">
                              <span className="font-bold text-[#23231e]">{isAr ? 'لون الغلاف: ' : 'Cover: '}</span>
                              <span className="capitalize">{coverColor.replace(/-/g, ' ')}</span>
                            </p>
                          )}
                          {hasPhoto && (
                            <p className="text-[#1E5751] font-bold">
                              {isAr ? '✓ صورة تذكارية مرفقة' : '✓ Keepsake photo attached'}
                            </p>
                          )}
                          {dedicationText && (
                            <p className="text-[#23231e]/70">
                              <span className="font-bold text-[#23231e]">{isAr ? 'الإهداء: ' : 'Dedication: '}</span>
                              <span className="italic line-clamp-2">"{dedicationText}"</span>
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Unit & Line Total */}
                    <div className="text-left sm:text-right rtl:sm:text-left">
                      <div className="text-lg font-serif font-black text-[#23231e]">
                        {itemsSubtotal.toFixed(2)} {country.currency}
                      </div>
                      {quantity > 1 && (
                        <span className="text-[11px] text-[#23231e]/60 block font-medium">
                          {baseUnitPrice.toFixed(2)} {country.currency} {isAr ? 'لكل كتاب' : 'each'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Stepper & Edit Links */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#23231e]/10">
                    {/* Stepper */}
                    <div className="flex items-center gap-3 bg-[#FDF8F1] px-3 py-1.5 rounded-[2px] border border-[#23231e]/15">
                      <span className="text-xs font-bold text-[#23231e]/70">
                        {isAr ? 'الكمية:' : 'Qty:'}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="w-6 h-6 rounded-[2px] bg-white border border-[#23231e]/10 shadow-xs flex items-center justify-center text-[#23231e] hover:bg-slate-200 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        title={isAr ? 'تقليل الكمية' : 'Decrease quantity'}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-black text-sm text-[#23231e] w-4 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-6 h-6 rounded-[2px] bg-white border border-[#23231e]/10 shadow-xs flex items-center justify-center text-[#23231e] hover:bg-slate-200 transition cursor-pointer"
                        title={isAr ? 'زيادة الكمية' : 'Increase quantity'}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Quick Edit Links */}
                    <div className="flex items-center gap-3 text-xs font-bold text-[#1E5751]">
                      <Link
                        href={`${createBase}/start?${wizardQuery}`}
                        className="hover:underline flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>{isAr ? 'تعديل الاسم والملامح' : 'Edit Name & Look'}</span>
                      </Link>
                      <span className="text-slate-300">•</span>
                      <Link
                        href={`${createBase}/preview?${wizardQuery}`}
                        className="hover:underline"
                      >
                        {isAr ? 'معاينة القصة ثلاثية الأبعاد' : '3D Preview'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Keepsake Companion Add-ons */}
            {/* DIGITAL-ONLY LAUNCH: physical add-ons are visible but unavailable. */}
            <div className="bg-white rounded-[2px] p-6 border border-[#23231e]/15 shadow-xs space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-[#1E5751]" />
                  <h3 className="font-serif font-black text-base text-[#23231e]">
                    {isAr ? 'إضافات تذكارية فاخرة لإكمال الهدية (اختيارية):' : 'Complete the Keepsake with Luxury Add-ons:'}
                  </h3>
                </div>
                {DIGITAL_ONLY_LAUNCH && (
                  <span className="text-[10px] font-black uppercase tracking-wider text-white bg-amber-600 px-2 py-0.5 rounded-[2px] shrink-0">
                    {isAr ? 'قريباً' : 'Coming soon'}
                  </span>
                )}
              </div>

              <div className={`space-y-3 ${DIGITAL_ONLY_LAUNCH ? 'pointer-events-none opacity-60 select-none' : ''}`}>
                {/* 1. Gift Box */}
                <label className={`flex items-center justify-between p-4 rounded-[2px] border transition-all cursor-pointer ${
                  hasGiftBox ? 'bg-[#FDF8F1] border-[#1E5751] shadow-xs' : 'bg-white border-[#23231e]/15 hover:border-[#1E5751]/40'
                }`}>
                  <div className="flex items-center gap-3.5">
                    <input
                      type="checkbox"
                      checked={hasGiftBox}
                      onChange={(e) => setHasGiftBox(e.target.checked)}
                      className="w-5 h-5 text-[#1E5751] rounded-[2px] border-slate-300 focus:ring-[#1E5751] cursor-pointer"
                    />
                    <div>
                      <span className="font-serif font-black text-xs sm:text-sm text-[#23231e] block">
                        {isAr ? 'صندوق هدايا ملكي بنقوش ذهبية وشريط ساتان' : 'Luxury Gold-Foil Keepsake Presentation Box'}
                      </span>
                      <span className="text-[11px] text-[#23231e]/70 block">
                        {isAr ? 'صندوق صلب مقوى يحمي الكتاب لسنوات ويقدم كهدية راقية' : 'Rigid keepsake box with satin ribbon pull for effortless gifting'}
                      </span>
                    </div>
                  </div>
                  <span className="font-serif font-black text-xs sm:text-sm text-[#1E5751] shrink-0">
                    +{GIFT_BOX_PRICE}.00 {country.currency}
                  </span>
                </label>

                {/* 2. Coloring Book */}
                <label className={`flex items-center justify-between p-4 rounded-[2px] border transition-all cursor-pointer ${
                  hasColoringBook ? 'bg-[#FDF8F1] border-[#1E5751] shadow-xs' : 'bg-white border-[#23231e]/15 hover:border-[#1E5751]/40'
                }`}>
                  <div className="flex items-center gap-3.5">
                    <input
                      type="checkbox"
                      checked={hasColoringBook}
                      onChange={(e) => setHasColoringBook(e.target.checked)}
                      className="w-5 h-5 text-[#1E5751] rounded-[2px] border-slate-300 focus:ring-[#1E5751] cursor-pointer"
                    />
                    <div>
                      <span className="font-serif font-black text-xs sm:text-sm text-[#23231e] block">
                        {isAr ? `دفتر تلوين مخصص باسم ${childName} (١٢ لوحة رسم)` : `Personalized Coloring Book Companion for ${childName}`}
                      </span>
                      <span className="text-[11px] text-[#23231e]/70 block">
                        {isAr ? '١٢ لوحة تلوين فنية مستوحاة من مشاهد القصة ليشارك الطفل في الرسم' : '12 line-art coloring spreads featuring your child as the adventure hero'}
                      </span>
                    </div>
                  </div>
                  <span className="font-serif font-black text-xs sm:text-sm text-[#1E5751] shrink-0">
                    +{COLORING_BOOK_PRICE}.00 {country.currency}
                  </span>
                </label>

                {/* 3. Audio Narration */}
                <label className={`flex items-center justify-between p-4 rounded-[2px] border transition-all cursor-pointer ${
                  hasAudioKeepsake ? 'bg-[#FDF8F1] border-[#1E5751] shadow-xs' : 'bg-white border-[#23231e]/15 hover:border-[#1E5751]/40'
                }`}>
                  <div className="flex items-center gap-3.5">
                    <input
                      type="checkbox"
                      checked={hasAudioKeepsake}
                      onChange={(e) => setHasAudioKeepsake(e.target.checked)}
                      className="w-5 h-5 text-[#1E5751] rounded-[2px] border-slate-300 focus:ring-[#1E5751] cursor-pointer"
                    />
                    <div>
                      <span className="font-serif font-black text-xs sm:text-sm text-[#23231e] block">
                        {isAr ? 'تسجيل صوتي سينمائي للقصة مع تهويدة النوم' : 'Bedtime Audio Companion & Cinematic Lullaby'}
                      </span>
                      <span className="text-[11px] text-[#23231e]/70 block">
                        {isAr ? 'رمز QR سحري مدمج داخل الكتاب للاستماع إلى القصة بصوت دافئ وموسيقى هادئة' : 'Scannable QR code inside book with cinematic voice acting & desert soundscape'}
                      </span>
                    </div>
                  </div>
                  <span className="font-serif font-black text-xs sm:text-sm text-[#1E5751] shrink-0">
                    +{AUDIO_KEEPSAKE_PRICE}.00 {country.currency}
                  </span>
                </label>

                {/* 4. Satin Gift Sleeve (keepsake gift-wrap step) */}
                <label className={`flex items-center justify-between p-4 rounded-[2px] border transition-all cursor-pointer ${
                  hasGiftWrap ? 'bg-[#FDF8F1] border-[#1E5751] shadow-xs' : 'bg-white border-[#23231e]/15 hover:border-[#1E5751]/40'
                }`}>
                  <div className="flex items-center gap-3.5">
                    <input
                      type="checkbox"
                      checked={hasGiftWrap}
                      onChange={(e) => setHasGiftWrap(e.target.checked)}
                      className="w-5 h-5 text-[#1E5751] rounded-[2px] border-slate-300 focus:ring-[#1E5751] cursor-pointer"
                    />
                    <div>
                      <span className="font-serif font-black text-xs sm:text-sm text-[#23231e] block">
                        {isAr ? 'غلاف هدية ساتان مع شريط حريري' : 'Satin Gift Sleeve & Ribbon'}
                      </span>
                      <span className="text-[11px] text-[#23231e]/70 block">
                        {isAr ? 'غلاف إهداء أنيق يغلف الكتاب التذكاري — خطوة التغليف' : 'Elegant presentation sleeve for the keepsake — the gift-wrap step'}
                      </span>
                    </div>
                  </div>
                  <span className="font-serif font-black text-xs sm:text-sm text-[#1E5751] shrink-0">
                    +{GIFT_SLEEVE_PRICE}.00 {country.currency}
                  </span>
                </label>

                {/* 5. Matching Adventure Stickers */}
                <label className={`flex items-center justify-between p-4 rounded-[2px] border transition-all cursor-pointer ${
                  hasStickers ? 'bg-[#FDF8F1] border-[#1E5751] shadow-xs' : 'bg-white border-[#23231e]/15 hover:border-[#1E5751]/40'
                }`}>
                  <div className="flex items-center gap-3.5">
                    <input
                      type="checkbox"
                      checked={hasStickers}
                      onChange={(e) => setHasStickers(e.target.checked)}
                      className="w-5 h-5 text-[#1E5751] rounded-[2px] border-slate-300 focus:ring-[#1E5751] cursor-pointer"
                    />
                    <div>
                      <span className="font-serif font-black text-xs sm:text-sm text-[#23231e] block">
                        {isAr ? 'ملصقات المغامرة التذكارية اللامعة' : 'Matching Adventure Stickers'}
                      </span>
                      <span className="text-[11px] text-[#23231e]/70 block">
                        {isAr ? '٢٤ ملصقاً لامعاً مقاوماً للماء لشخصيات القصة وبوصلة النجوم' : '24 waterproof gloss stickers featuring story characters'}
                      </span>
                    </div>
                  </div>
                  <span className="font-serif font-black text-xs sm:text-sm text-[#1E5751] shrink-0">
                    +{STICKERS_PRICE}.00 {country.currency}
                  </span>
                </label>
              </div>
            </div>

            {/* UAE Delivery Guarantee & Craftsmanship Note */}
            <div className="bg-white rounded-[2px] p-5 border border-[#23231e]/15 flex items-center gap-4 text-xs text-[#23231e]/80">
              <div className="w-10 h-10 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif font-black text-[#23231e] block">
                  {DIGITAL_ONLY_LAUNCH
                    ? (isAr ? '⚡ توصيل رقمي فوري إلى بريدك والواتساب' : '⚡ Instant Digital Delivery to Your Email & WhatsApp')
                    : (isAr ? '🇦🇪 ضمان التوصيل السريع لجميع الإمارات السبع خلال ٢٤ إلى ٤٨ ساعة' : '🇦🇪 Express 24–48h Courier Delivery Across All 7 UAE Emirates')}
                </span>
                <span className="text-[11px] text-[#23231e]/70 block mt-0.5">
                  {DIGITAL_ONLY_LAUNCH
                    ? (isAr
                      ? 'تصلك النسخة الرقمية التفاعلية ثلاثية الأبعاد خلال دقائق من إتمام الطلب. النسخ المطبوعة الفاخرة قريباً.'
                      : 'Your interactive 3D digital storybook arrives within minutes of ordering. Printed keepsake editions coming soon.')
                    : (isAr
                      ? 'طباعة محلية فاخرة في دبي على ورق موهوك سميك ٢٠٠ جم بأحبار نباتية معتمدة FSC.'
                      : 'Locally printed in Dubai on 200gsm archival Mohawk paper with child-safe vegetable inks.')}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout */}
          <div className="lg:col-span-4 bg-white rounded-[2px] p-6 border border-[#23231e]/15 shadow-sm space-y-6 sticky top-6">
            <h3 className="font-serif font-black text-lg text-[#23231e] pb-3 border-b border-[#23231e]/10">
              {isAr ? 'ملخص الطلب' : 'Order Summary'}
            </h3>

            <div className="space-y-2.5 text-xs font-semibold text-[#23231e]/80">
              <div className="flex justify-between">
                <span>{isAr ? 'سعر الكتب:' : 'Storybooks Subtotal:'}</span>
                <span className="font-bold text-[#23231e]">
                  {itemsSubtotal.toFixed(2)} {country.currency}
                </span>
              </div>

              {addonsTotal > 0 && (
                <div className="flex justify-between text-[#1E5751]">
                  <span>{isAr ? 'الإضافات التذكارية:' : 'Keepsake Add-ons:'}</span>
                  <span className="font-bold">
                    +{addonsTotal.toFixed(2)} {country.currency}
                  </span>
                </div>
              )}
              {hasGiftWrap && (
                <div className="flex justify-between text-[#1E5751] text-[11px]">
                  <span>{isAr ? '✓ غلاف هدية ساتان' : '✓ Satin Gift Sleeve'}</span>
                  <span className="font-bold">+{GIFT_SLEEVE_PRICE}.00 {country.currency}</span>
                </div>
              )}
              {hasPhoto && (
                <div className="flex justify-between text-[#1E5751] text-[11px]">
                  <span>{isAr ? '✓ صورة تذكارية مطبوعة' : '✓ Printed Keepsake Photo'}</span>
                  <span className="font-bold">{isAr ? 'مجاناً' : 'FREE'}</span>
                </div>
              )}

              {discountAmount > 0 && (
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
                  <span>
                    -{discountAmount.toFixed(2)} {country.currency}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span>{isAr ? 'رسوم الشحن والتوصيل للإمارات:' : 'UAE Express Shipping:'}</span>
                <span className="text-[#1E5751] font-black">{isAr ? 'مجاني' : 'FREE'}</span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-4 border-t border-[#23231e]/10 flex justify-between items-baseline">
              <span className="font-serif font-black text-sm text-[#23231e]">
                {isAr ? 'المجموع النهائي:' : 'Total Amount:'}
              </span>
              <div className="text-right rtl:text-left">
                <span className="font-serif font-black text-3xl text-[#23231e]">
                  {finalTotal.toFixed(2)} {country.currency}
                </span>
                <span className="text-[11px] text-[#23231e]/60 block mt-0.5">
                  {isAr ? 'شاملاً ضريبة القيمة المضافة والشحن' : 'VAT & Express Courier Included'}
                </span>
              </div>
            </div>

            {/* Promo Code Box */}
            <div className="pt-3 border-t border-[#23231e]/10">
              <label className="text-[11px] font-serif font-bold text-[#23231e] block mb-1.5">
                {isAr ? 'هل لديك كود خصم أو إهداء؟' : 'Have a Promo or Gift Code?'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="BOGO50 / UNWRAP20"
                  className="w-full px-3 py-2 rounded-[2px] bg-white border border-[#23231e]/20 text-xs font-mono font-bold uppercase outline-none focus:border-[#1E5751] text-left"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="bg-[#23231e] hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-[2px] transition cursor-pointer"
                >
                  {isAr ? 'تطبيق' : 'Apply'}
                </button>
              </div>
              {appliedCoupon && (
                <div className="text-[10px] text-[#1E5751] font-bold mt-1.5 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>
                    {isAr ? `الكود مفعل: ${appliedCoupon}` : `Code active: ${appliedCoupon}`}
                  </span>
                </div>
              )}
            </div>

            {/* Primary Checkout CTA Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-[#1E5751] hover:bg-[#16433e] text-white font-serif font-black py-4 rounded-[2px] shadow-sm transition text-base flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>{isAr ? 'المتابعة إلى إتمام الطلب' : 'Proceed to Checkout'}</span>
              {dir === 'rtl' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </button>

            {/* Security Badges */}
            <div className="pt-2 text-center space-y-2">
              <div className="inline-flex items-center gap-1 text-[11px] text-[#23231e]/70 font-medium">
                <Lock className="w-3 h-3 text-[#1E5751]" />
                <span>{isAr ? '🧪 وضع تجريبي — لا يتم خصم أي مبلغ حقيقي' : '🧪 Demo mode — no real payment is processed'}</span>
              </div>
              <div className="flex items-center justify-center gap-1 text-amber-500 text-xs">
                <Star className="w-3 h-3 fill-amber-400" />
                <Star className="w-3 h-3 fill-amber-400" />
                <Star className="w-3 h-3 fill-amber-400" />
                <Star className="w-3 h-3 fill-amber-400" />
                <Star className="w-3 h-3 fill-amber-400" />
                <span className="text-[11px] text-[#23231e]/70 font-semibold ml-1">
                  {isAr ? 'تقييم 4.96/5 من أولياء الأمور' : '4.96/5 from 428+ UAE Parents'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDF8F1] flex items-center justify-center font-bold text-[#23231e]">Loading cart...</div>}>
      <CartContent />
    </Suspense>
  );
}
