import { PRODUCTS, ProductStory } from '@/config/products';

/**
 * Shared category → product matching logic.
 * Mirrors the rules used by the category landing pages
 * (web/app/books/category/[slug]/page.tsx) so /all-books?category=<slug>
 * and the homepage category tiles resolve the exact same product sets.
 */
export function getMatchingProducts(filterType: string, filterValue: string): ProductStory[] {
  return PRODUCTS.filter((p) => {
    if (filterType === 'age') {
      if (filterValue === '0-3') return p.ageRange.includes('0–') || p.ageRange.includes('0-') || p.ageRange.includes('2–');
      if (filterValue === '3-6') return p.ageRange.includes('3–') || p.ageRange.includes('2–') || p.ageRange.includes('0–4');
      if (filterValue === '6-9') return p.ageRange.includes('4–') || p.ageRange.includes('3–8') || p.ageRange.includes('6–');
      if (filterValue === '9-12') return p.ageRange.includes('6–12') || p.ageRange.includes('4–10');
    }
    if (filterType === 'occasion') {
      return p.occasions.includes(filterValue) || p.category === filterValue;
    }
    if (filterType === 'recipient') {
      return p.recipients.some((r) => r.includes(filterValue));
    }
    return true;
  });
}

export interface CategoryTile {
  slug: string;
  emoji: string;
  labelEn: string;
  labelAr: string;
}

/**
 * Homepage "Shop by Category" tiles: age bands + occasions.
 * Slugs match web/config/categories.ts (each links to /books/category/<slug>
 * and preselects the same filter on /all-books?category=<slug>).
 */
export const CATEGORY_TILES: CategoryTile[] = [
  { slug: '0-3-years', emoji: '🧸', labelEn: '0–3 Years', labelAr: '٠–٣ سنوات' },
  { slug: '3-6-years', emoji: '🎨', labelEn: '3–6 Years', labelAr: '٣–٦ سنوات' },
  { slug: '6-9-years', emoji: '🚀', labelEn: '6–9 Years', labelAr: '٦–٩ سنوات' },
  { slug: '9-12-years', emoji: '🌌', labelEn: '9–12 Years', labelAr: '٩–١٢ سنة' },
  { slug: 'birthday', emoji: '🎂', labelEn: 'Birthday', labelAr: 'أعياد الميلاد' },
  { slug: 'new-baby', emoji: '🍼', labelEn: 'New Baby', labelAr: 'المواليد الجدد' },
  { slug: 'bedtime', emoji: '🌙', labelEn: 'Bedtime', labelAr: 'قصص النوم' },
  { slug: 'ramadan-eid', emoji: '🕌', labelEn: 'Ramadan & Eid', labelAr: 'رمضان والعيد' },
];
