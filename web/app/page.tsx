import React from "react";
import type { Metadata } from "next";
import StorefrontView from "@/components/StorefrontView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://personalizedtales.com";

export const metadata: Metadata = {
  title: "Personalized Children's Storybooks | 3D Interactive Keepsakes & Bilingual Tales",
  description: "Create unforgettable heirloom-grade personalized children's books starring your child. Featuring instant 3D virtual page-turn preview, side-by-side English & Arabic verses with full Tashkeel, and 24-48h UAE delivery.",
  alternates: {
    canonical: `${siteUrl}/`,
    languages: {
      "en-AE": `${siteUrl}/`,
      "ar-AE": `${siteUrl}/ar`,
      "x-default": `${siteUrl}/`,
    },
  },
  openGraph: {
    locale: "en_AE",
    title: "Personalized Children's Storybooks | Make Your Child the Hero",
    description: "Instant 3D interactive web preview + 300 DPI keepsake PDF. Bilingual English & Modern Standard Arabic.",
    url: `${siteUrl}/`,
    type: "website",
  },
};

export default function HomePage() {
  return <StorefrontView initialCountrySlug="ae" />;
}
