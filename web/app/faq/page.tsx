import type { Metadata } from "next";
import FaqView from "@/components/FaqView";

export const metadata: Metadata = {
  title: "Help Center & FAQs",
  description: "Find answers to frequently asked questions about creating personalized children's books, Arabic diacritics (Tashkeel), local 24–48h UAE delivery, and our 100% Heirloom Guarantee.",
  keywords: [
    "personalized books faq",
    "children storybook help dubai",
    "bilingual books questions uae",
    "heirloom guarantee storybook"
  ],
  alternates: {
    canonical: "https://personalizedtales.com/faq",
    languages: {
      "en-AE": "https://personalizedtales.com/faq",
      "ar-AE": "https://personalizedtales.com/ar/faq",
      "x-default": "https://personalizedtales.com/faq",
    },
  },
  openGraph: {
    locale: "en_AE",
    title: "Frequently Asked Questions | PersonalizedTales Help Center",
    description: "Answers to all your questions about our personalized children's storybooks.",
    url: "https://personalizedtales.com/faq",
    type: "website",
  },
};

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is the book personalized with my child's name and appearance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In Step 1, enter your child's first name, choose their gender, and select the avatar archetype closest to their appearance. Our illustration engine features your child's character and name across the cover and inside every single story spread."
        }
      },
      {
        "@type": "Question",
        name: "How does the Bilingual (Arabic + English) edition work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In our bestselling Bilingual edition, Modern Standard Arabic poetry with full Tashkeel diacritics is displayed on the right page, accompanied by musical English rhyming verses on the left page."
        }
      },
      {
        "@type": "Question",
        name: "How long does delivery take after ordering in UAE?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Digital delivery is instant within 5 minutes. Printed keepsake editions are coming soon."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FaqView initialLang="en" />
    </>
  );
}
