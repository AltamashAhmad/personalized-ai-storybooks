import type { Metadata } from "next";
import AboutUsView from "@/components/AboutUsView";

export const metadata: Metadata = {
  title: "About Us | London & Abu Dhabi Dual Heritage",
  description: "Learn about PersonalizedTales: our London & Abu Dhabi dual heritage, our mission to inspire a lifelong love of reading, our commitment to rich Arabic & English literature, and our archival print craftsmanship in the United Arab Emirates.",
  keywords: [
    "about personalized tales",
    "children book publisher uae",
    "london abu dhabi children books",
    "heirloom storybooks dubai",
    "bilingual children stories abu dhabi"
  ],
  alternates: {
    canonical: "https://personalizedtales.com/about-us",
    languages: {
      "en-AE": "https://personalizedtales.com/about-us",
      "ar-AE": "https://personalizedtales.com/ar/about-us",
      "x-default": "https://personalizedtales.com/about-us",
    },
  },
  openGraph: {
    locale: "en_AE",
    title: "About Us | London & Abu Dhabi Dual Heritage | PersonalizedTales",
    description: "Extraordinary personalized books crafted with London storytelling heritage and Abu Dhabi cultural pride in the United Arab Emirates.",
    url: "https://personalizedtales.com/about-us",
    type: "website",
  },
};

export default function AboutUsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About PersonalizedTales",
    description: "Publishing house for personalized heirloom children's books uniting London storytelling craft with Abu Dhabi cultural heritage.",
    publisher: {
      "@type": "Organization",
      name: "PersonalizedTales",
      url: "https://personalizedtales.com",
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
      <AboutUsView initialLang="en" />
    </>
  );
}
