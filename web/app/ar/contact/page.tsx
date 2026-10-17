import type { Metadata } from "next";
import ContactView from "@/components/ContactView";

export const metadata: Metadata = {
  title: "اتصل بنا وخدمة أولياء الأمور | دعم مباشر عبر الواتساب في الإمارات",
  description: "تواصل مع فريق حكايات مخصصة في أبوظبي ودبي. دعم مباشر وسريع عبر الواتساب (+971)، رد خلال ساعتين عبر البريد الإلكتروني، ومساعدة كاملة في تخصيص ومتابعة طلبات كتب الأطفال.",
  keywords: [
    "اتصل بنا حكايات مخصصة",
    "دعم واتساب كتب أطفال",
    "خدمة عملاء قصص أطفال دبي",
    "رقم حكايات مخصصة الإمارات"
  ],
  alternates: {
    canonical: "https://personalizedtales.com/ar/contact",
    languages: {
      "en-AE": "https://personalizedtales.com/contact",
      "ar-AE": "https://personalizedtales.com/ar/contact",
      "x-default": "https://personalizedtales.com/contact",
    },
  },
  openGraph: {
    locale: "ar_AE",
    title: "تواصل معنا | خدمة أولياء الأمور في الإمارات | حكايات مخصصة",
    description: "فريقنا متواجد في أبوظبي ودبي للرد على استفساراتكم عبر الواتساب والبريد الإلكتروني.",
    url: "https://personalizedtales.com/ar/contact",
    type: "website",
  },
};

export default function ArabicContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "اتصل بنا - حكايات مخصصة",
    inLanguage: "ar",
    description: "خدمة أولياء الأمور لكتب وقصص الأطفال المخصصة بالاسم والصورة في دولة الإمارات.",
    mainEntity: {
      "@type": "Organization",
      name: "حكايات مخصصة",
      email: "support@personalizedtales.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "أبوظبي",
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
      <ContactView initialLang="ar" />
    </>
  );
}
