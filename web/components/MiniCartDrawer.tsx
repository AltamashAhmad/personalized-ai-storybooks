"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Gift,
  Palette,
  Lock,
} from "lucide-react";
import { useCountry } from "@/lib/context/CountryContext";
import { useCart, ADDON_PRICES } from "@/lib/context/CartContext";
import { getCouponDiscount } from "@/lib/utils/pricing";
import { DIGITAL_ONLY_LAUNCH } from "@/config/launch";
import { KEEPSAKE_COVER_COLORS } from "@/config/sampleBookData";

interface MiniCartDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

// Personalization fields a sibling change adds to CartItem as optional fields.
// Read defensively so this compiles and renders before and after that change lands.
type CartItemExtras = {
  dedicationText?: string;
  giverName?: string;
  hasPhoto?: boolean;
  coverColor?: string;
  characterJson?: string;
};

export default function MiniCartDrawer({ isOpen: propIsOpen, onClose: propOnClose }: MiniCartDrawerProps) {
  const router = useRouter();
  const { country, language, dir } = useCountry();
  const isAr = language === "ar";
  const isRtl = dir === "rtl";

  const {
    items,
    addons,
    isMiniCartOpen: contextIsOpen,
    closeMiniCart: contextClose,
    removeItem,
    updateQuantity,
    toggleAddon,
    totalItemCount,
    itemsSubtotal,
    addonsTotal,
    appliedCoupon,
    hasFreeShipping,
  } = useCart();

  const isOpen = propIsOpen !== undefined ? propIsOpen : contextIsOpen;
  const onClose = propOnClose || contextClose;

  // Handle ESC key to dismiss and prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const firstItem = items[0];
  const firstChildName = firstItem?.childName || (isAr ? "زايد" : "Zayed");

  // Shared coupon math (lib/utils/pricing is the single source of truth) so the
  // drawer shows the same discount the customer will see in cart/checkout.
  // Keeps the default BOGO50 behavior; UNWRAP20 and the other advertised codes
  // now resolve here too instead of silently showing no discount.
  const drawerDiscount = getCouponDiscount(
    appliedCoupon,
    items.map((i) => ({ unitPrice: i.unitPrice, quantity: i.quantity })),
    itemsSubtotal + addonsTotal
  );
  const drawerTotal = Math.max(0, itemsSubtotal + addonsTotal - drawerDiscount);

  const buildQuery = () => {
    // Serialize EVERY item so multi-item carts survive the URL round-trip.
    // Legacy first-item params are kept for backward compatibility.
    return new URLSearchParams({
      book: firstItem?.bookSlug || "the-secret-of-the-starlit-dunes",
      name: firstItem?.childName || (isAr ? "زايد" : "Zayed"),
      format: firstItem?.format || "hardcover",
      qty: String(firstItem?.quantity || 1),
      coloringBook: String(addons.coloringBook),
      giftWrap: String(addons.giftWrap),
      stickers: String(addons.stickers),
      // Carry the active coupon so checkout applies the same discount the drawer showed.
      coupon: appliedCoupon || "",
      total: String(drawerTotal),
      items: JSON.stringify(
        items.map((item) => {
          // Personalization extras ride along so cart/checkout keep them (read defensively there).
          const ex = item as unknown as CartItemExtras;
          // Gender: prefer an explicit value embedded in characterJson, else the cart item's own field.
          let gender = '';
          try {
            const parsed = JSON.parse(ex.characterJson || '') as { gender?: unknown } | null;
            if (parsed && (parsed.gender === 'boy' || parsed.gender === 'girl')) gender = parsed.gender;
          } catch {
            // Non-JSON character payload — fall through to the item field.
          }
          if (!gender && (item.gender === 'boy' || item.gender === 'girl')) gender = item.gender;
          return {
            book: item.bookSlug,
            name: item.childName,
            format: item.format,
            qty: item.quantity,
            price: item.unitPrice,
            gender,
            dedicationText: ex.dedicationText ?? '',
            giverName: ex.giverName ?? '',
            hasPhoto: ex.hasPhoto ?? false,
            coverColor: ex.coverColor ?? '',
            characterJson: ex.characterJson ?? '',
          };
        })
      ),
    }).toString();
  };

  const handleCheckout = () => {
    onClose();
    const query = buildQuery();
    router.push(`${isAr ? "/ar/checkout" : "/checkout"}?${query}`);
  };

  const handleViewCart = () => {
    onClose();
    const query = buildQuery();
    router.push(`${isAr ? "/ar/cart" : "/cart"}?${query}`);
  };

  const getFormatLabel = (fmt: string) => {
    if (isAr) {
      if (fmt === "digital") return "النسخة الرقمية الفورية (٤٩ د.إ)";
      if (fmt === "layflat") return "إصدار ملكي منبسط فاخر (٩٩ د.إ)";
      if (fmt === "hardcover") return "غلاف مقوى تذكاري (٧٩ د.إ)";
      return "غلاف مرن خفيف (٤٩ د.إ)";
    }
    if (fmt === "digital") return "Digital Edition — Instant (49 AED)";
    if (fmt === "layflat") return "Deluxe Layflat Keepsake (99 AED)";
    if (fmt === "hardcover") return "Classic Hardcover Keepsake (79 AED)";
    return "Softcover Edition (49 AED)";
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={isAr ? "سلة المشتريات التذكارية" : "Shopping Basket"}
        dir={dir}
        className={`fixed top-0 bottom-0 z-50 w-full sm:max-w-md md:max-w-lg bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isRtl ? "left-0" : "right-0"
        } ${
          isOpen
            ? "translate-x-0 pointer-events-auto"
            : isRtl
            ? "-translate-x-full pointer-events-none"
            : "translate-x-full pointer-events-none"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#23231e]/10 bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-black text-base text-[#23231e]">
                {isAr ? "سلة المشتريات التذكارية" : "Your Keepsake Basket"}
              </h2>
              <span className="text-[11px] text-[#23231e]/70 font-bold">
                {totalItemCount} {totalItemCount === 1 ? (isAr ? "كتاب" : "book") : isAr ? "كتب" : "books"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-[2px] text-slate-400 hover:text-[#23231e] hover:bg-slate-100 transition cursor-pointer"
            aria-label={isAr ? "إغلاق" : "Close basket"}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {/* Cart Items */}
          {items.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-black text-base text-[#23231e]">
                {isAr ? "سلة المشتريات فارغة حالياً" : "Your basket is currently empty"}
              </h3>
              <p className="text-xs text-[#23231e]/70 max-w-xs mx-auto">
                {isAr
                  ? "استكشف قصصنا الساحرة وصمّم كتاباً تذكارياً فريداً ببطولة طفلك!"
                  : "Explore our heirloom storybooks and create an unforgettable personalized gift!"}
              </p>
              <button
                type="button"
                onClick={() => {
                  router.push(isAr ? "/ar/all-books" : "/all-books");
                  onClose();
                }}
                className="bg-[#23231e] hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-[2px] transition cursor-pointer"
              >
                {isAr ? "تصفح كتب الأطفال" : "Browse Storybooks"}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                // Personalization payload rides on the item (see CartItemExtras); read defensively.
                const ex = item as unknown as CartItemExtras;
                const coverColorEntry = ex.coverColor
                  ? KEEPSAKE_COVER_COLORS.find((c) => c.id === ex.coverColor)
                  : undefined;
                const coverColorLabel = coverColorEntry
                  ? isAr
                    ? coverColorEntry.nameAr
                    : coverColorEntry.nameEn
                  : ex.coverColor;
                return (
                <div
                  key={item.id}
                  className="bg-white rounded-[2px] p-4 border border-[#23231e]/15 shadow-xs flex items-start gap-3.5 relative"
                >
                  {/* Thumbnail */}
                  <div className="w-18 h-22 sm:w-20 sm:h-24 rounded-[2px] bg-amber-50 overflow-hidden shrink-0 border border-amber-200/80 shadow-xs">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif font-black text-xs sm:text-sm text-[#23231e] truncate">
                        {isAr && item.titleAr ? item.titleAr : item.title}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-slate-400 hover:text-rose-600 transition p-1 cursor-pointer rounded-[2px]"
                        title={isAr ? "حذف" : "Remove item"}
                        aria-label={isAr ? "حذف من السلة" : "Remove item from basket"}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs font-bold text-[#1E5751] flex items-center gap-1">
                      <span>✨</span>
                      <span>{isAr ? `للبطل الصغير: ${item.childName}` : `Starring: ${item.childName}`}</span>
                    </p>

                    <p className="text-[11px] text-[#23231e]/60 font-medium">
                      {getFormatLabel(item.format)}
                    </p>

                    {/* Personalization details captured in the builder (shown only when present) */}
                    {coverColorLabel && (
                      <p className="text-[11px] text-[#23231e]/60 font-medium">
                        🎨 {coverColorLabel}
                      </p>
                    )}
                    {ex.giverName && (
                      <p className="text-[11px] text-[#23231e]/60 font-medium">
                        ✍️ {isAr ? `بتوقيع: ${ex.giverName}` : `Signed: ${ex.giverName}`}
                      </p>
                    )}
                    {ex.dedicationText && (
                      <p className="text-[11px] italic text-[#23231e]/70 leading-snug">
                        💌 {ex.dedicationText}
                      </p>
                    )}
                    {ex.hasPhoto && (
                      <p className="text-[11px] text-[#23231e]/60 font-medium">
                        📷 {isAr ? "مع صورة تذكارية" : "With keepsake photo"}
                      </p>
                    )}

                    {/* Stepper and Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 bg-[#FDF8F1] px-2 py-1 rounded-[2px] border border-[#23231e]/15">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                          aria-label={isAr ? "إنقاص الكمية" : "Decrease quantity"}
                          className="w-5 h-5 rounded-[2px] bg-white border border-[#23231e]/10 shadow-xs flex items-center justify-center text-[#23231e] hover:bg-slate-200 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-black text-xs text-[#23231e] w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label={isAr ? "زيادة الكمية" : "Increase quantity"}
                          className="w-5 h-5 rounded-[2px] bg-white border border-[#23231e]/10 shadow-xs flex items-center justify-center text-[#23231e] hover:bg-slate-200 transition cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right rtl:text-left">
                        <span className="font-serif font-black text-sm text-[#23231e]">
                          {item.unitPrice * item.quantity}.00 {country.currency}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          )}

          {/* High-Margin Order Bump Addons (Coloring Book 19 AED, Gift Wrap 15 AED, Stickers 9 AED) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-xs uppercase tracking-wider text-[#23231e] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#1E5751]" />
                <span>{isAr ? "إضافات تذكارية لإكمال الهدية:" : "Complete the Keepsake Gift:"}</span>
              </span>
              <span className="text-[10px] text-[#1E5751] font-bold bg-[#1E5751]/10 px-2 py-0.5 rounded-[2px] border border-[#1E5751]/20">
                {isAr ? "عرض فوري" : "Instant Add-on"}
              </span>
            </div>

            {/* 1. Personalized Coloring Book */}
            <div
              className={`p-3 rounded-[2px] border transition-all ${
                addons.coloringBook
                  ? "bg-[#FDF8F1] border-[#1E5751] shadow-xs"
                  : "bg-white border-[#23231e]/15 hover:border-[#1E5751]/40"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] flex items-center justify-center shrink-0 mt-0.5">
                    <Palette className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-serif font-black text-[#23231e]">
                      {isAr
                        ? `دفتر تلوين مخصص باسم ${firstChildName}`
                        : `Personalized Coloring Book for ${firstChildName}`}
                    </div>
                    <div className="text-[10px] text-[#23231e]/70 leading-tight mt-0.5">
                      {isAr
                        ? "١٢ لوحة رسم مستوحاة من مشاهد القصة ليشارك في التلوين"
                        : "12 line-art adventure scenes for your child to color"}
                    </div>
                    <div className="text-xs font-black text-[#1E5751] mt-1">
                      +{ADDON_PRICES.coloringBook}.00 {country.currency}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleAddon("coloringBook")}
                  disabled={DIGITAL_ONLY_LAUNCH}
                  className={`px-3 py-1.5 rounded-[2px] text-xs font-black transition shrink-0 ${
                    DIGITAL_ONLY_LAUNCH
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "cursor-pointer"
                  } ${
                    addons.coloringBook
                      ? "bg-[#1E5751] text-white shadow-xs"
                      : "bg-white border border-[#23231e]/20 text-[#23231e] hover:bg-slate-100"
                  }`}
                >
                  {DIGITAL_ONLY_LAUNCH ? (isAr ? "قريباً" : "Soon") : addons.coloringBook ? (isAr ? "✓ مضاف" : "✓ Added") : isAr ? "+ إضافة" : "+ Add"}
                </button>
              </div>
            </div>

            {/* 2. Luxury Gift Wrap & Ribbon */}
            <div
              className={`p-3 rounded-[2px] border transition-all ${
                addons.giftWrap
                  ? "bg-[#FDF8F1] border-[#1E5751] shadow-xs"
                  : "bg-white border-[#23231e]/15 hover:border-[#1E5751]/40"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] flex items-center justify-center shrink-0 mt-0.5">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-serif font-black text-[#23231e]">
                      {isAr ? "تغليف هدايا ملكي وشريط ساتان" : "Luxury Gift Wrap & Satin Ribbon"}
                    </div>
                    <div className="text-[10px] text-[#23231e]/70 leading-tight mt-0.5">
                      {isAr
                        ? "تغليف يدوي فاخر بورق سميك منقوش ذهبياً مع بطاقة إهداء"
                        : "Hand-wrapped with heavyweight gold-foil paper & gift card"}
                    </div>
                    <div className="text-xs font-black text-[#1E5751] mt-1">
                      +{ADDON_PRICES.giftWrap}.00 {country.currency}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleAddon("giftWrap")}
                  disabled={DIGITAL_ONLY_LAUNCH}
                  className={`px-3 py-1.5 rounded-[2px] text-xs font-black transition shrink-0 ${
                    DIGITAL_ONLY_LAUNCH
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "cursor-pointer"
                  } ${
                    addons.giftWrap
                      ? "bg-[#1E5751] text-white shadow-xs"
                      : "bg-white border border-[#23231e]/20 text-[#23231e] hover:bg-slate-100"
                  }`}
                >
                  {DIGITAL_ONLY_LAUNCH ? (isAr ? "قريباً" : "Soon") : addons.giftWrap ? (isAr ? "✓ مضاف" : "✓ Added") : isAr ? "+ إضافة" : "+ Add"}
                </button>
              </div>
            </div>

            {/* 3. Matching Adventure Stickers */}
            <div
              className={`p-3 rounded-[2px] border transition-all ${
                addons.stickers
                  ? "bg-[#FDF8F1] border-[#1E5751] shadow-xs"
                  : "bg-white border-[#23231e]/15 hover:border-[#1E5751]/40"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-serif font-black text-[#23231e]">
                      {isAr ? "ملصقات المغامرة التذكارية اللامعة" : "Matching Adventure Stickers"}
                    </div>
                    <div className="text-[10px] text-[#23231e]/70 leading-tight mt-0.5">
                      {isAr
                        ? "٢٤ ملصقاً لامعاً مقاوماً للماء لشخصيات القصة وبوصلة النجوم"
                        : "24 waterproof gloss stickers featuring story characters"}
                    </div>
                    <div className="text-xs font-black text-[#1E5751] mt-1">
                      +{ADDON_PRICES.stickers}.00 {country.currency}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleAddon("stickers")}
                  disabled={DIGITAL_ONLY_LAUNCH}
                  className={`px-3 py-1.5 rounded-[2px] text-xs font-black transition shrink-0 ${
                    DIGITAL_ONLY_LAUNCH
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "cursor-pointer"
                  } ${
                    addons.stickers
                      ? "bg-[#1E5751] text-white shadow-xs"
                      : "bg-white border border-[#23231e]/20 text-[#23231e] hover:bg-slate-100"
                  }`}
                >
                  {DIGITAL_ONLY_LAUNCH ? (isAr ? "قريباً" : "Soon") : addons.stickers ? (isAr ? "✓ مضاف" : "✓ Added") : isAr ? "+ إضافة" : "+ Add"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Drawer Footer */}
        <div className="p-6 border-t border-[#23231e]/10 bg-[#FDF8F1] space-y-3 shrink-0">
          {/* Subtotal lines */}
          <div className="space-y-1.5 text-xs text-[#23231e]/80 font-semibold">
            <div className="flex justify-between">
              <span>{isAr ? "سعر الكتب:" : "Storybooks Subtotal:"}</span>
              <span className="font-bold text-[#23231e]">
                {itemsSubtotal}.00 {country.currency}
              </span>
            </div>

            {addonsTotal > 0 && (
              <div className="flex justify-between text-[#1E5751]">
                <span>{isAr ? "الإضافات التذكارية:" : "Keepsake Add-ons:"}</span>
                <span className="font-bold">
                  +{addonsTotal}.00 {country.currency}
                </span>
              </div>
            )}

            {drawerDiscount > 0 && (
              <div className="flex justify-between text-[#1E5751] font-bold">
                <span>{isAr ? `خصم (${appliedCoupon}):` : `Discount (${appliedCoupon}):`}</span>
                <span>
                  -{drawerDiscount}.00 {country.currency}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span>{isAr ? "توصيل الإمارات السريع:" : "UAE Express Delivery:"}</span>
              <span className={hasFreeShipping ? "text-emerald-700 font-black" : "text-slate-500 font-medium text-xs"}>
                {totalItemCount === 0
                  ? "—"
                  : hasFreeShipping
                  ? (isAr ? "مجاني" : "FREE")
                  : (isAr ? "يُحسب عند إتمام الطلب" : "Calculated at checkout")}
              </span>
            </div>

            <div className="pt-2 border-t border-[#23231e]/10 flex justify-between items-baseline">
              <span className="font-serif font-black text-sm text-[#23231e]">
                {isAr ? "المجموع النهائي:" : "Estimated Total:"}
              </span>
              <span className="font-serif font-black text-2xl text-[#23231e]">
                {drawerTotal}.00 {country.currency}
              </span>
            </div>
          </div>

          {/* Primary & Secondary Action Buttons */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={handleCheckout}
              disabled={items.length === 0}
              className="w-full bg-[#1E5751] hover:bg-[#16433e] text-white font-serif font-black py-3.5 px-4 rounded-[2px] shadow-sm transition flex items-center justify-center gap-2 text-sm cursor-pointer transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isAr ? "المتابعة إلى الدفع السريع" : "Proceed to Express Checkout"}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={handleViewCart}
              disabled={items.length === 0}
              className="w-full bg-white hover:bg-slate-50 text-[#23231e] border border-[#23231e]/20 font-bold py-2.5 px-4 rounded-[2px] transition flex items-center justify-center gap-1.5 text-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#1E5751]" />
              <span>{isAr ? "عرض سلة المشتريات الكاملة" : "View Full Keepsake Basket"}</span>
            </button>
          </div>

          {/* Security Guarantee */}
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#23231e]/60 font-medium pt-1">
            <Lock className="w-3 h-3 text-[#1E5751]" />
            <span>
              {isAr
                ? "🧪 وضع تجريبي — لا يتم معالجة أي دفع حقيقي"
                : "🧪 Demo mode — no real payment is processed"}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
