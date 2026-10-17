import type { Metadata } from "next";
import DeliveryView from "@/components/DeliveryView";

export const metadata: Metadata = {
  title: "Delivery & Shipping Times UAE | 5-Min Digital & 24–48h Local Express",
  description: "Swift delivery of personalized children's keepsake books across all 7 Emirates (Abu Dhabi, Dubai, Sharjah, Ajman, RAK, Fujairah, UAQ). Instant 5-minute 3D virtual flipbook + express courier within 24–48 hours via Aramex and Emirates Post.",
  keywords: [
    "personalized books delivery uae",
    "children book delivery dubai",
    "express gift delivery abu dhabi",
    "aramex express delivery uae",
    "emirates post express books",
    "aramex children books dubai",
    "same day baby gift dubai",
    "personalized storybook shipping"
  ],
  alternates: {
    canonical: "https://personalizedtales.com/delivery",
    languages: {
      "en-AE": "https://personalizedtales.com/delivery",
      "ar-AE": "https://personalizedtales.com/ar/delivery",
      "x-default": "https://personalizedtales.com/delivery",
    },
  },
  openGraph: {
    locale: "en_AE",
    title: "Delivery & Shipping Times UAE | PersonalizedTales",
    description: "Instant 5-minute digital 3D reading + 24–48h local UAE express delivery across all 7 Emirates.",
    url: "https://personalizedtales.com/delivery",
    type: "website",
  },
};

export default function DeliveryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DeliveryChargeSpecification",
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
      <DeliveryView initialLang="en" />
    </>
  );
}
