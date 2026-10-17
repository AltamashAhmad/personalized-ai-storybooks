import type { Metadata } from "next";
import QualityView from "@/components/QualityView";

export const metadata: Metadata = {
  title: "جودة الورق والطباعة والتجليد الفاخر | ورق موهوك ٢٠٠ جم وتجليد مسطح",
  description: "اكتشف معايير النشر الملكية لكتب الأطفال التذكارية: ورق موهوك أرشيفي بسماكة ٢٠٠ جم، تجليد مسطح ١٨٠ درجة، وأحبار نباتية آمنة ١٠٠٪ للأطفال ومطابقة للمعايير الأوروبية.",
  keywords: [
    "جودة طباعة كتب أطفال الإمارات",
    "ورق موهوك ٢٠٠ جم دبي",
    "تجليد كتب فاخرة أبوظبي",
    "أحبار نباتية آمنة للأطفال",
    "كتب تذكارية تدوم للأبد"
  ],
  alternates: {
    canonical: "https://personalizedtales.com/ar/quality",
    languages: {
      "en-AE": "https://personalizedtales.com/quality",
      "ar-AE": "https://personalizedtales.com/ar/quality",
      "x-default": "https://personalizedtales.com/quality",
    },
  },
  openGraph: {
    locale: "ar_AE",
    title: "معايير النشر والطباعة الأرشيفية | حكايات مخصصة الإمارات",
    description: "ورق سميك ٢٠٠ جم وتجليد مسطح يدوي وأحبار آمنة للأطفال تدوم لعشرات السنين.",
    url: "https://personalizedtales.com/ar/quality",
    type: "website",
  },
};

export default function ArabicQualityPage() {
  return <QualityView initialLang="ar" />;
}
