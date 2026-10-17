export interface CountryConfig {
  code: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  flag: string;
  currency: "AED";
  currencySymbol: string;
  price: number;
  promoCode: string;
  popularNames: string[];
  bannerNoticeEn: string;
  bannerNoticeAr: string;
  shippingNoticeEn: string;
  shippingNoticeAr: string;
}

export const SUPPORTED_COUNTRIES: Record<string, CountryConfig> = {
  ae: {
    code: "AE",
    slug: "ae",
    nameEn: "United Arab Emirates",
    nameAr: "الإمارات العربية المتحدة",
    flag: "🇦🇪",
    currency: "AED",
    currencySymbol: "AED",
    price: 49.00,
    promoCode: "DUBAI10",
    popularNames: ["Zayed", "Rashid", "Hamdan", "Mansoor", "Fatima", "Noura", "Shamma", "Mariam"],
    bannerNoticeEn: "✨ Free 3D Virtual Storybook Preview • Instant Digital Keepsake Delivered in 5 Mins • Local 300 DPI Print Ready",
    bannerNoticeAr: "✨ معاينة ثلاثية الأبعاد تفاعلية مجانية • إهداء رقمي فوري خلال ٥ دقائق • جاهز للطباعة الفاخرة",
    shippingNoticeEn: "Printed in Dubai — express courier 24–48h across all 7 Emirates, FREE",
    shippingNoticeAr: "طُبع في دبي — توصيل سريع خلال ٢٤–٤٨ ساعة لجميع الإمارات السبع، مجاني",
  },
};

// Platform operates exclusively for the UAE market (Dubai, Abu Dhabi, Sharjah, etc.)
export const PHASE_ONE_UAE_ONLY: boolean = true;

export interface UAEEmirate {
  id: string;
  nameEn: string;
  nameAr: string;
  isPopular?: boolean;
}

export const UAE_EMIRATES: UAEEmirate[] = [
  { id: "dubai", nameEn: "Dubai", nameAr: "دبي", isPopular: true },
  { id: "abu-dhabi", nameEn: "Abu Dhabi", nameAr: "أبوظبي", isPopular: true },
  { id: "sharjah", nameEn: "Sharjah", nameAr: "الشارقة", isPopular: true },
  { id: "ajman", nameEn: "Ajman", nameAr: "عجمان" },
  { id: "ras-al-khaimah", nameEn: "Ras Al Khaimah", nameAr: "رأس الخيمة" },
  { id: "fujairah", nameEn: "Fujairah", nameAr: "الفجيرة" },
  { id: "umm-al-quwain", nameEn: "Umm Al Quwain", nameAr: "أم القيوين" },
];

export const DEFAULT_COUNTRY = "ae";

export function getCountryConfig(slug?: string): CountryConfig {
  const config = slug ? SUPPORTED_COUNTRIES[slug] : undefined;
  if (config) return config;
  const ae = SUPPORTED_COUNTRIES["ae"];
  if (ae) return ae;
  // Unreachable in practice: "ae" is defined in SUPPORTED_COUNTRIES above.
  // The throw exists only to satisfy noUncheckedIndexedAccess on the
  // declared CountryConfig (non-optional) return type.
  throw new Error('[locales] Missing "ae" country config');
}
