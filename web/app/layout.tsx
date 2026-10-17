import type { Metadata, Viewport } from "next";
import { CartProvider } from "@/lib/context/CartContext";
import { CountryProvider } from "@/lib/context/CountryContext";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://personalizedtales.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Personalized Children's Storybooks | 3D Interactive Keepsakes & Bilingual Tales",
    template: "%s | PersonalizedTales",
  },
  description: "Create unforgettable heirloom-grade personalized children's books. Starring your child with 3D interactive web previews, bilingual English & Arabic verses, and 300 DPI print keepsakes.",
  keywords: [
    "personalized books",
    "personalized children's books",
    "custom storybook",
    "bilingual kids books",
    "personalized books for toddlers",
    "personalized books for twins",
    "قصص أطفال مخصصة",
    "كتب مخصصة للأطفال",
  ],
  authors: [{ name: "PersonalizedTales", url: "https://personalizedtales.com" }],
  creator: "PersonalizedTales",
  publisher: "PersonalizedTales",
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
    canonical: siteUrl,
    languages: {
      "en-AE": siteUrl,
      "ar-AE": `${siteUrl}/ar`,
      "x-default": siteUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    alternateLocale: ["ar_AE", "en_US", "en_GB"],
    url: siteUrl,
    title: "Personalized Children's Storybooks | Make Your Child the Hero",
    description: "Instant 3D interactive web preview + 300 DPI keepsake PDF. Available in English and Modern Standard Arabic.",
    siteName: "PersonalizedTales",
    images: [
      {
        url: `${siteUrl}/final_book_mockup_1788701924626.jpg`,
        width: 1200,
        height: 630,
        alt: "PersonalizedTales - Heirloom Personalized Children's Storybooks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Personalized Children's Storybooks | PersonalizedTales",
    description: "Heirloom-grade personalized storybooks starring your child. Interactive 3D flipbook + PDF download.",
    images: [`${siteUrl}/final_book_mockup_1788701924626.jpg`],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "PersonalizedTales",
        alternateName: "حكايات مخصصة",
        url: siteUrl,
        sameAs: [
          "https://instagram.com/personalizedtales",
          "https://tiktok.com/@personalizedtales",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          areaServed: ["AE", "SA", "QA", "KW", "BH", "OM", "US", "GB"],
          availableLanguage: ["English", "Arabic"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "PersonalizedTales",
        alternateName: "حكايات مخصصة",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        inLanguage: ["en", "ar"],
      },
    ],
  };

  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Amiri:wght@400;700&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdOrg),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900 selection:bg-amber-200 selection:text-amber-900">
        <CountryProvider>
          <CartProvider>{children}</CartProvider>
        </CountryProvider>
      </body>
    </html>
  );
}
