/**
 * Shared pricing authority for the PersonalizedTales storefront.
 *
 * Single source of truth for format prices, add-on prices, and coupon rules.
 * Cart, checkout, mini-cart, pricing displays, and the /api/checkout server
 * route MUST derive from here — never hardcode prices or coupon math in
 * page components. The server NEVER trusts client-supplied amounts; it
 * recomputes from the catalog + these rules.
 *
 * All amounts are in AED (the platform is UAE-only).
 *
 * NOTE (demo): coupons are validated client-side for display only. When
 * real payments are wired, coupons MUST be validated server-side — never
 * trust a ?coupon= param as a payment authority.
 */

export const FORMAT_PRICES = {
  digital: 49,
  softcover: 49,
  hardcover: 79,
  layflat: 99,
} as const;
export type FormatId = keyof typeof FORMAT_PRICES;

/**
 * Formats that require physical print fulfillment. Gated behind
 * DIGITAL_ONLY_LAUNCH — while the launch flag is on, these render as
 * "coming soon" and are rejected server-side at /api/checkout.
 */
export const PHYSICAL_FORMAT_IDS = ['softcover', 'hardcover', 'layflat'] as const;

export interface CouponRule {
  kind: 'bogo50' | 'percent';
  percent?: number;
  label: string;
}

export const COUPON_RULES: Record<string, CouponRule> = {
  BOGO50: { kind: 'bogo50', label: 'BOGO50' },
  UNWRAP20: { kind: 'percent', percent: 20, label: 'UNWRAP20' },
  DUBAI10: { kind: 'percent', percent: 10, label: 'DUBAI10' },
  MAGIC10: { kind: 'percent', percent: 10, label: 'MAGIC10' },
  WELCOME10: { kind: 'percent', percent: 10, label: 'WELCOME10' },
  MAGIC15: { kind: 'percent', percent: 15, label: 'MAGIC15' },
  SPECIAL10: { kind: 'percent', percent: 10, label: 'SPECIAL10' },
};

export interface DiscountItem {
  unitPrice: number;
  quantity: number;
}

/**
 * Computes the AED discount for a coupon code.
 * - BOGO50: 50% off the cheapest unit when the order has 2+ books.
 * - percent: percentage off the gross (pre-discount) subtotal.
 * - unknown / null / undefined code: 0.
 *
 * @param code coupon code entered by the shopper (case-insensitive)
 * @param items cart lines for BOGO50 quantity/price math
 * @param grossSubtotal subtotal the percent discount applies to (items + addons)
 */
export function getCouponDiscount(
  code: string | null | undefined,
  items: DiscountItem[],
  grossSubtotal: number
): number {
  if (!code) return 0;
  const rule = COUPON_RULES[code.trim().toUpperCase()];
  if (!rule) return 0;

  if (rule.kind === 'bogo50') {
    const totalQty = items.reduce((sum, i) => sum + Math.max(0, i.quantity), 0);
    if (totalQty < 2) return 0;
    const minUnitPrice = items.reduce(
      (min, i) => Math.min(min, i.unitPrice),
      items[0]?.unitPrice ?? 0
    );
    return Math.round(minUnitPrice * 0.5);
  }

  const percent = rule.percent ?? 0;
  return Math.round(grossSubtotal * (percent / 100));
}

export const ADDON_PRICES = {
  giftBox: 39,
  coloringBook: 19,
  audioKeepsake: 19,
  giftWrap: 15,
  stickers: 9,
  photo: 0,
} as const;
export type AddonId = keyof typeof ADDON_PRICES;
