import type { Metadata } from "next";
import AboutUsView from "@/components/AboutUsView";

export const metadata: Metadata = {
  title: "قصتنا ورؤيتنا | إرث أدبي بين لندن وأبوظبي",
  description: "تعرف على حكايات مخصصة: هويتنا المزدوجة بين لندن وأبوظبي، ورسالتنا لغرس حب القراءة مدى الحياة، والتزامنا باللغة العربية الفصحى وأشعارها الموزونة، ومعايير الطباعة الأرشيفية الفاخرة في دولة الإمارات.",
  keywords: [
    "من نحن حكايات مخصصة",
    "دار نشر قصص أطفال الإمارات",
    "كتب تذكارية للأطفال دبي",
    "قصص عربية بالتشكيل أبوظبي"
  ],
  alternates: {
    canonical: "https://personalizedtales.com/ar/about-us",
    languages: {
      "en-AE": "https://personalizedtales.com/about-us",
      "ar-AE": "https://personalizedtales.com/ar/about-us",
      "x-default": "https://personalizedtales.com/about-us",
    },
  },
  openGraph: {
    locale: "ar_AE",
    title: "قصتنا ورؤيتنا | حكايات مخصصة للأطفال في الإمارات",
    description: "نصنع كتباً استثنائية تجمع عراقة أدب الأطفال في لندن وأصالة وفخر التراث في أبوظبي لغرس حب القراءة مدى الحياة.",
    url: "https://personalizedtales.com/ar/about-us",
    type: "website",
  },
};

export default function ArabicAboutUsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "قصتنا ورؤيتنا - حكايات مخصصة",
    inLanguage: "ar",
    description: "دار نشر متخصصة في إصدار كتب الأطفال التذكارية المخصصة بالاسم والصورة باللغة العربية الفصحى والإنجليزية في دولة الإمارات مع إرث أدبي بين لندن وأبوظبي.",
    publisher: {
      "@type": "Organization",
      name: "حكايات مخصصة",
      url: "https://personalizedtales.com/ar",
      areaServed: {
        "@type": "Country",
        name: "United Arab Emirates"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutUsView initialLang="ar" />
    </>
  );
}
