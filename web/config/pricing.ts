/**
 * Canonical Book Format & Pricing Definitions
 * Calibrated across all pages, carts, and checkout flows.
 * 
 * Softcover: 49 AED ($12.99 USD)
 * Classic Hardcover Keepsake: 79 AED ($21.99 USD) - Most Popular
 * Deluxe Layflat / Foil-Embossed: 99 AED ($26.99 USD) - Deluxe Heirloom
 */

export interface CoverFormatOption {
  id: 'softcover' | 'hardcover' | 'layflat';
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  priceAED: number;
  priceUSD: number;
  badgeEn?: string;
  badgeAr?: string;
  isDefault?: boolean;
}

export const COVER_FORMAT_PRICING: Record<'softcover' | 'hardcover' | 'layflat', CoverFormatOption> = {
  softcover: {
    id: 'softcover',
    titleEn: 'Softcover Edition',
    titleAr: 'غلاف مرن خفيف',
    descEn: 'Lightweight, durable 250gsm silk card with protective gloss laminate',
    descAr: 'غلاف مرن أنيق وخفيف بلمسة لامعة وسهل الحمل للأيدي الصغيرة',
    priceAED: 49,
    priceUSD: 12.99,
  },
  hardcover: {
    id: 'hardcover',
    titleEn: 'Classic Hardcover Keepsake',
    titleAr: 'غلاف مقوى كلاسيكي تذكاري',
    descEn: '3mm rigid greyboard, scratch-resistant gloss finish, stitched archival binding',
    descAr: 'تجليد كرتوني صلب فاخر ٣ مم، الأكثر طلباً للهدايا ويدوم للأجيال',
    priceAED: 79,
    priceUSD: 21.99,
    badgeEn: 'MOST POPULAR',
    badgeAr: 'الأكثر طلباً',
    isDefault: true,
  },
  layflat: {
    id: 'layflat',
    titleEn: 'Deluxe Layflat / Foil-Embossed',
    titleAr: 'إصدار ملكي منبسط بختم ذهبي',
    descEn: 'Seamless 180° panoramic spreads, 400gsm bonded archival stock, hot-stamped gold foil',
    descAr: 'صفحات بانورامية مسطحة تفتح ١٨٠ درجة بورق سميك وختم ذهبي بارز',
    priceAED: 99,
    priceUSD: 26.99,
    badgeEn: 'DELUXE HEIRLOOM',
    badgeAr: 'طبعة ملكية فاخرة',
  },
};

export const FORMAT_LIST: CoverFormatOption[] = [
  COVER_FORMAT_PRICING.softcover,
  COVER_FORMAT_PRICING.hardcover,
  COVER_FORMAT_PRICING.layflat,
];

export function getFormatPrice(format: 'softcover' | 'hardcover' | 'layflat'): CoverFormatOption {
  return COVER_FORMAT_PRICING[format] || COVER_FORMAT_PRICING.hardcover;
}
