import type { Metadata } from "next";
import GiftFinderView from "@/components/GiftFinderView";

export const metadata: Metadata = {
  title: "Gift Finder — Find the Perfect Personalized Book | PersonalizedTales",
  description: "Answer 3 quick questions and find the perfect personalized children's book for your child's age, occasion, and interests — bilingual Arabic & English, delivered across the UAE.",
  keywords: [
    "gift finder personalized books",
    "personalized book gift dubai",
    "children book gift finder uae",
    "birthday gift kids storybook"
  ],
  alternates: {
    canonical: "https://personalizedtales.com/gift-finder",
    languages: {
      "en-AE": "https://personalizedtales.com/gift-finder",
      "ar-AE": "https://personalizedtales.com/ar/gift-finder",
      "x-default": "https://personalizedtales.com/gift-finder",
    },
  },
  openGraph: {
    locale: "en_AE",
    title: "Gift Finder — Find the Perfect Personalized Book | PersonalizedTales",
    description: "Answer 3 quick questions and our story engine will find the most magical personalized book for your child.",
    url: "https://personalizedtales.com/gift-finder",
    type: "website",
  },
};

export default function GiftFinderPage() {
  return <GiftFinderView initialLang="en" />;
}
