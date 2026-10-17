import type { Metadata } from "next";
import ContactView from "@/components/ContactView";

export const metadata: Metadata = {
  title: "Contact Us | UAE Parent Care & WhatsApp Support",
  description: "Get in touch with PersonalizedTales in Abu Dhabi and Dubai. Direct WhatsApp support (+971), 2-hour response email guarantee, and customer care for custom children's books.",
  keywords: [
    "contact personalized tales",
    "children book customer service dubai",
    "whatsapp support personalized books",
    "abu dhabi storybook publisher"
  ],
  alternates: {
    canonical: "https://personalizedtales.com/contact",
    languages: {
      "en-AE": "https://personalizedtales.com/contact",
      "ar-AE": "https://personalizedtales.com/ar/contact",
      "x-default": "https://personalizedtales.com/contact",
    },
  },
  openGraph: {
    locale: "en_AE",
    title: "Contact Parent Care | PersonalizedTales UAE",
    description: "Instant WhatsApp and email support for all your personalized storybook inquiries.",
    url: "https://personalizedtales.com/contact",
    type: "website",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact PersonalizedTales",
    description: "Parent care support for personalized children's storybooks in UAE.",
    mainEntity: {
      "@type": "Organization",
      name: "PersonalizedTales",
      email: "support@personalizedtales.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Abu Dhabi",
        addressCountry: "AE"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactView initialLang="en" />
    </>
  );
}
