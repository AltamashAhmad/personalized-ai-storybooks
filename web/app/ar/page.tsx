import type { Metadata } from "next";
import StorefrontView from "@/components/StorefrontView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://personalizedtales.com";

export const metadata: Metadata = {
  title: "قصص وكتب أطفال مخصصة بالاسم والصورة في الإمارات",
  description: "اصنع كتاباً تذكارياً فاخراً ومخصصاً لطفلك بالاسم والصورة. معاينة تفاعلية ثلاثية الأبعاد مجاناً، لغة عربية فصحى مع التشكيل، وتوصيل سريع في كافة إمارات الدولة خلال ٢٤-٤٨ ساعة.",
  keywords: [
    "قصص أطفال مخصصة",
    "كتب مخصصة للأطفال بالاسم",
    "هدايا مواليد بالاسم دبي",
    "كتب أطفال بالاسم والصورة",
    "قصص أطفال ثنائية اللغة عربي وانجليزي",
    "هدايا عيد للاطفال الإمارات",
    "قصص عربية بالتشكيل"
  ],
  alternates: {
    canonical: `${siteUrl}/ar`,
    languages: {
      "en-AE": `${siteUrl}/`,
      "ar-AE": `${siteUrl}/ar`,
      "x-default": `${siteUrl}/`,
    },
  },
  openGraph: {
    locale: "ar_AE",
    title: "حكايات مخصصة | اجعل طفلك بطل قصته الخالدة",
    description: "معاينة افتراضية ثلاثية الأبعاد فورية + كتاب تذكاري يطبع محلياً في الإمارات.",
    url: `${siteUrl}/ar`,
    type: "website",
  },
};

export default function ArabicHomePage() {
  return <StorefrontView initialCountrySlug="ae" initialLang="ar" />;
}
