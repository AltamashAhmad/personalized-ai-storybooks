"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { ADDON_PRICES as SHARED_ADDON_PRICES, getCouponDiscount } from "@/lib/utils/pricing";

export interface CartItem {
  id: string;
  bookSlug: string;
  title: string;
  titleAr?: string;
  coverImage: string;
  childName: string;
  gender?: "boy" | "girl";
  format: "softcover" | "hardcover" | "layflat";
  unitPrice: number;
  quantity: number;
  // Personalization data collected by the create-wizard (all optional)
  dedicationText?: string;
  giverName?: string;
  hasPhoto?: boolean;
  coverColor?: string;
  characterJson?: string;
}

export interface CartAddons {
  coloringBook: boolean; // 19 AED
  giftWrap: boolean;     // 15 AED
  stickers: boolean;     // 9 AED
}

// Re-exported for existing importers — values sourced from the shared
// pricing authority (@/lib/utils/pricing) so they can never drift.
export const ADDON_PRICES = {
  coloringBook: SHARED_ADDON_PRICES.coloringBook,
  giftWrap: SHARED_ADDON_PRICES.giftWrap,
  stickers: SHARED_ADDON_PRICES.stickers,
} as const;

export const FREE_DELIVERY_THRESHOLD = 100;

interface CartContextType {
  items: CartItem[];
  addons: CartAddons;
  isMiniCartOpen: boolean;
  openMiniCart: () => void;
  closeMiniCart: () => void;
  toggleMiniCart: () => void;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleAddon: (addon: keyof CartAddons) => void;
  setAddon: (addon: keyof CartAddons, value: boolean) => void;
  clearCart: () => void;
  setCoupon: (code: string | null) => void;

  // Computed values
  totalItemCount: number;
  itemsSubtotal: number;
  addonsTotal: number;
  discountAmount: number;
  appliedCoupon: string | null;
  cartTotal: number;
  hasFreeShipping: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function isValidStoredItem(it: unknown): it is CartItem {
  if (!it || typeof it !== "object") return false;
  const item = it as Partial<CartItem>;
  return (
    typeof item.id === "string" &&
    typeof item.bookSlug === "string" &&
    typeof item.unitPrice === "number" &&
    Number.isFinite(item.unitPrice)
  );
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Cart starts empty — no pre-filled demo items.
  const [items, setItems] = useState<CartItem[]>([]);
  const [addons, setAddons] = useState<CartAddons>({
    coloringBook: false,
    giftWrap: false,
    stickers: false,
  });
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  // The site's standing auto-promo. NOTE: client-side demo math only — real
  // payment wiring must validate coupons server-side.
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>("BOGO50");
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage — with validation. Corrupt or foreign JSON
  // falls back to an empty cart instead of crashing the provider.
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem("pt_cart_items");
      if (savedItems) {
        const parsed: unknown = JSON.parse(savedItems);
        if (Array.isArray(parsed)) {
          const valid: CartItem[] = [];
          for (const it of parsed) {
            if (isValidStoredItem(it)) {
              const qty = Math.floor(it.quantity);
              valid.push({
                ...it,
                quantity: Number.isFinite(qty) && qty >= 1 ? qty : 1,
              });
            }
          }
          setItems(valid);
        }
      }
      const savedAddons = localStorage.getItem("pt_cart_addons");
      if (savedAddons) {
        const parsed: unknown = JSON.parse(savedAddons);
        if (parsed && typeof parsed === "object") {
          const p = parsed as Partial<Record<keyof CartAddons, unknown>>;
          setAddons({
            coloringBook: p.coloringBook === true,
            giftWrap: p.giftWrap === true,
            stickers: p.stickers === true,
          });
        }
      }
    } catch {
      // Corrupt storage → start with an empty cart.
    }
    setIsHydrated(true);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("pt_cart_items", JSON.stringify(items));
      localStorage.setItem("pt_cart_addons", JSON.stringify(addons));
    } catch {}
  }, [items, addons, isHydrated]);

  const openMiniCart = () => setIsMiniCartOpen(true);
  const closeMiniCart = () => setIsMiniCartOpen(false);
  const toggleMiniCart = () => setIsMiniCartOpen((prev) => !prev);

  const setCoupon = (code: string | null) => {
    const normalized = code?.trim().toUpperCase() || null;
    setAppliedCoupon(normalized);
  };

  const addItem = (newItem: Omit<CartItem, "id">) => {
    // Validate quantity: reject NaN / <= 0 / fractional input.
    const quantity = Math.floor(newItem.quantity);
    if (!Number.isFinite(quantity) || quantity < 1) return;
    const sanitized = { ...newItem, quantity };
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.bookSlug === sanitized.bookSlug && i.format === sanitized.format && i.childName === sanitized.childName
      );
      if (existingIndex >= 0) {
        const existing = prev[existingIndex];
        if (!existing) return prev;
        // Replace the item object — never mutate state in place.
        return prev.map((i, idx) =>
          idx === existingIndex ? { ...existing, quantity: existing.quantity + sanitized.quantity } : i
        );
      }
      // Unique id: slug + timestamp + random suffix (collisions were possible
      // with slug-timestamp alone under rapid double-clicks).
      return [
        ...prev,
        { ...sanitized, id: `${sanitized.bookSlug}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` },
      ];
    });
    setIsMiniCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    const qty = Math.floor(quantity);
    if (!Number.isFinite(qty)) return; // ignore invalid input
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  };

  const toggleAddon = (addon: keyof CartAddons) => {
    setAddons((prev) => ({ ...prev, [addon]: !prev[addon] }));
  };

  const setAddon = (addon: keyof CartAddons, value: boolean) => {
    setAddons((prev) => ({ ...prev, [addon]: value }));
  };

  const clearCart = () => {
    setItems([]);
    setAddons({ coloringBook: false, giftWrap: false, stickers: false });
  };

  // Calculations
  const totalItemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const itemsSubtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items]
  );

  const addonsTotal = useMemo(
    () =>
      (addons.coloringBook ? ADDON_PRICES.coloringBook : 0) +
      (addons.giftWrap ? ADDON_PRICES.giftWrap : 0) +
      (addons.stickers ? ADDON_PRICES.stickers : 0),
    [addons]
  );

  // Single pricing authority — supports BOGO50, UNWRAP20, DUBAI10, MAGIC10,
  // WELCOME10, MAGIC15, SPECIAL10. Unknown codes discount 0.
  const discountAmount = useMemo(
    () => getCouponDiscount(appliedCoupon, items, itemsSubtotal + addonsTotal),
    [appliedCoupon, items, itemsSubtotal, addonsTotal]
  );

  const cartTotal = useMemo(
    () => Math.max(0, itemsSubtotal + addonsTotal - discountAmount),
    [itemsSubtotal, addonsTotal, discountAmount]
  );

  const hasFreeShipping = cartTotal >= FREE_DELIVERY_THRESHOLD;

  return (
    <CartContext.Provider
      value={{
        items,
        addons,
        isMiniCartOpen,
        openMiniCart,
        closeMiniCart,
        toggleMiniCart,
        addItem,
        removeItem,
        updateQuantity,
        toggleAddon,
        setAddon,
        clearCart,
        setCoupon,
        totalItemCount,
        itemsSubtotal,
        addonsTotal,
        discountAmount,
        appliedCoupon,
        cartTotal,
        hasFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
