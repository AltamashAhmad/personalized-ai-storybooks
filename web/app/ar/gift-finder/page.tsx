import type { Metadata } from "next";
import GiftFinderView from "@/components/GiftFinderView";

export const metadata: Metadata = {
  title: "مساعد اختيار الهدية — اعثر على الكتاب المخصص المثالي | حكايات مخصصة",
  description: "أجب عن ٣ أسئلة بسيطة واعثر على الكتاب المخصص المثالي لطفلك حسب عمره والمناسبة واهتماماته — ثنائي اللغة العربية والإنجليزية، مع التوصيل في جميع أنحاء الإمارات.",
  keywords: [
    "مساعد اختيار هدية الأطفال",
    "هدية كتاب مخصص دبي",
    "كتب أطفال هدايا الإمارات",
    "هدية عيد ميلاد قصة طفل"
  ],
  alternates: {
    canonical: "https://personalizedtales.com/ar/gift-finder",
    languages: {
      "en-AE": "https://personalizedtales.com/gift-finder",
      "ar-AE": "https://personalizedtales.com/ar/gift-finder",
      "x-default": "https://personalizedtales.com/gift-finder",
    },
  },
  openGraph: {
    locale: "ar_AE",
    title: "مساعد اختيار الهدية — اعثر على الكتاب المخصص المثالي | حكايات مخصصة",
    description: "أجب عن ٣ أسئلة بسيطة وسنساعدك في اختيار القصة الأنسب لطفلك وعمره واهتماماته.",
    url: "https://personalizedtales.com/ar/gift-finder",
    type: "website",
  },
};

export default function ArabicGiftFinderPage() {
  return <GiftFinderView initialLang="ar" />;
}
