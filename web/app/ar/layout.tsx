import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://personalizedtales.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "حكايات مخصصة | قصص وكتب أطفال مخصصة بالاسم والصورة في الإمارات",
    template: "%s | حكايات مخصصة",
  },
  description: "اصنع كتاباً تذكارياً فاخراً ومخصصاً لطفلك بالاسم والصورة. معاينة تفاعلية ثلاثية الأبعاد مجاناً، لغة عربية فصحى مع التشكيل، وتوصيل سريع في كافة إمارات الدولة خلال ٢٤-٤٨ ساعة.",
  keywords: [
    "قصص أطفال مخصصة",
    "كتب مخصصة للأطفال بالاسم",
    "هدايا مواليد بالاسم دبي",
    "كتب أطفال بالاسم والصورة",
    "قصص أطفال ثنائية اللغة عربي وانجليزي",
    "هدايا عيد للاطفال الإمارات",
    "قصص عربية بالتشكيل",
  ],
  authors: [{ name: "حكايات مخصصة", url: "https://personalizedtales.com/ar" }],
  creator: "حكايات مخصصة",
  publisher: "حكايات مخصصة",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: `${siteUrl}/ar`,
    languages: {
      "en-AE": siteUrl,
      "ar-AE": `${siteUrl}/ar`,
      "x-default": siteUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_AE",
    alternateLocale: ["en_AE"],
    url: `${siteUrl}/ar`,
    title: "حكايات مخصصة | اجعل طفلك بطل قصته الخالدة",
    description: "معاينة افتراضية ثلاثية الأبعاد فورية + كتاب تذكاري يطبع محلياً في الإمارات. لغة عربية فصحى بالتشكيل.",
    siteName: "حكايات مخصصة",
    images: [
      {
        url: `${siteUrl}/final_book_mockup_1788701924626.jpg`,
        width: 1200,
        height: 630,
        alt: "حكايات مخصصة - قصص وكتب أطفال مخصصة بالاسم والصورة",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "حكايات مخصصة | قصص أطفال مخصصة بالاسم",
    description: "معاينة افتراضية ثلاثية الأبعاد فورية + كتاب تذكاري يطبع محلياً في الإمارات.",
    images: [`${siteUrl}/final_book_mockup_1788701924626.jpg`],
  },
};

export default function ArabicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/ar/#website`,
        url: `${siteUrl}/ar`,
        name: "حكايات مخصصة",
        alternateName: "PersonalizedTales",
        inLanguage: "ar",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
    ],
  };

  return (
    <div dir="rtl" lang="ar" className="min-h-full flex flex-col font-sans">
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang = "ar"; document.documentElement.dir = "rtl";`,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}
