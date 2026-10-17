export interface PromotionOffer {
  id: string;
  code: string;
  badge: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  showCountdown: boolean;
  countdownHours?: number;
  discountType: 'percentage' | 'bogo50' | 'fixed';
  discountValue: number;
}

export interface PromotionsSettings {
  isBannerActive: boolean;
  activeOfferId: string;
  offers: PromotionOffer[];
}

export const DEFAULT_PROMOTION_OFFERS: PromotionOffer[] = [
  {
    id: 'welcome10',
    code: 'WELCOME10',
    badge: '10% OFF',
    titleEn: '✨ Create an account & get 10% OFF your first order • Code: WELCOME10',
    titleAr: '✨ أنشئ حساباً جديداً واحصل على خصم ١٠٪ على طلبك الأول • كود: WELCOME10',
    descriptionEn: 'Sign up today and enjoy 10% off your keepsake personalized storybook.',
    descriptionAr: 'سجّل حساباً جديداً اليوم واستمتع بخصم ١٠٪ على قصتك التذكارية المخصصة.',
    showCountdown: false,
    discountType: 'percentage',
    discountValue: 10,
  },
  {
    id: 'bogo50',
    code: 'BOGO50',
    badge: '50% OFF 2ND BOOK',
    titleEn: '✨ Sign up & get 50% OFF your 2nd book with code BOGO50',
    titleAr: '✨ سجّل الآن واحصل على خصم ٥٠٪ على كتابك الثاني مع كود BOGO50',
    descriptionEn: 'Buy 1 Book, Get 2nd at 50% Off with Code BOGO50',
    descriptionAr: 'اشترِ كتاباً واحصل على الثاني بنصف السعر مع كود BOGO50',
    showCountdown: true,
    countdownHours: 24,
    discountType: 'bogo50',
    discountValue: 50,
  },
  {
    id: 'custom',
    code: 'SPECIAL10',
    badge: 'LIMITED OFFER',
    titleEn: '✨ Special Limited Time Offer for New Readers',
    titleAr: '✨ عرض ترويجي خاص لفترة محدودة للقراء الجدد',
    descriptionEn: 'Exclusive savings on personalized children\'s storybooks.',
    descriptionAr: 'توفير حصري على قصص الأطفال المخصصة.',
    showCountdown: false,
    discountType: 'percentage',
    discountValue: 10,
  },
];

export const DEFAULT_PROMOTIONS_SETTINGS: PromotionsSettings = {
  isBannerActive: true,
  activeOfferId: 'bogo50',
  offers: DEFAULT_PROMOTION_OFFERS,
};
