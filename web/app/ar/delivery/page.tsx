import type { Metadata } from "next";
import DeliveryView from "@/components/DeliveryView";

export const metadata: Metadata = {
  title: "الشحن والتوصيل في الإمارات | تسليم رقمي فوري وتوصيل سريع خلال ٢٤-٤٨ ساعة",
  description: "معلومات الشحن والتوصيل لكتب وقصص الأطفال المخصصة في كافة الإمارات السبع (أبوظبي، دبي، الشارقة، عجمان، رأس الخيمة، الفجيرة، أم القيوين) عبر أرامكس وبريد الإمارات. استلام رقمي فوري خلال ٥ دقائق وتوصيل سريع لباب المنزل خلال ٢٤ إلى ٤٨ ساعة.",
  keywords: [
    "توصيل قصص أطفال الإمارات",
    "شحن كتب مخصصة دبي",
    "توصيل هدايا مواليد أبوظبي",
    "أرامكس توصيل سريع",
    "بريد الإمارات إكسبرس",
    "أرامكس كتب أطفال",
    "شحن سريع كتب أطفال بالاسم",
    "توصيل فوري كتب تفاعلية"
  ],
  alternates: {
    canonical: "https://personalizedtales.com/ar/delivery",
    languages: {
      "en-AE": "https://personalizedtales.com/delivery",
      "ar-AE": "https://personalizedtales.com/ar/delivery",
      "x-default": "https://personalizedtales.com/delivery",
    },
  },
  openGraph: {
    locale: "ar_AE",
    title: "الشحن والتوصيل لكتب الأطفال المخصصة في الإمارات | حكايات مخصصة",
    description: "تسليم رقمي ثلاثي الأبعاد خلال ٥ دقائق وشحن سريع لجميع الإمارات السبع خلال ٢٤ إلى ٤٨ ساعة عبر أرامكس وبريد الإمارات.",
    url: "https://personalizedtales.com/ar/delivery",
    type: "website",
  },
};

export default function ArabicDeliveryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DeliveryChargeSpecification",
    name: "توصيل سريع لكتب الأطفال المخصصة في الإمارات",
    inLanguage: "ar",
    appliesToDeliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModeDirectDownload",
    areaServed: {
      "@type": "Country",
      name: "United Arab Emirates"
    },
    // Delivery is FREE on every order — no minimum-order threshold.
    price: "0.00",
    priceCurrency: "AED"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DeliveryView initialLang="ar" />
    </>
  );
}
