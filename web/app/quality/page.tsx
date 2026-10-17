import type { Metadata } from "next";
import QualityView from "@/components/QualityView";

export const metadata: Metadata = {
  title: "Paper & Print Quality | 200gsm Archival Mohawk & Layflat Binding",
  description: "Discover our heirloom publishing specifications: 200gsm FSC-certified Mohawk paper, 180° panoramic layflat stitch binding, and non-toxic child-safe vegetable inks in the UAE.",
  keywords: [
    "children book printing quality",
    "mohawk paper storybooks uae",
    "layflat children book binding",
    "child safe vegetable inks dubai",
    "archival photo book uae"
  ],
  alternates: {
    canonical: "https://personalizedtales.com/quality",
    languages: {
      "en-AE": "https://personalizedtales.com/quality",
      "ar-AE": "https://personalizedtales.com/ar/quality",
      "x-default": "https://personalizedtales.com/quality",
    },
  },
  openGraph: {
    locale: "en_AE",
    title: "Artisanal Bookmaking Standards | PersonalizedTales",
    description: "200gsm archival paper and stitch layflat bindings crafted to withstand hundreds of bedtime readings.",
    url: "https://personalizedtales.com/quality",
    type: "website",
  },
};

export default function QualityPage() {
  return <QualityView initialLang="en" />;
}
