export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "PersonalizedTales",
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || "personalizedtales.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://personalizedtales.com",
  tagline: "Every Child is the Hero of Their Own Magical Story",
  description: "Create unforgettable heirloom-grade personalized children's books with 3D interactive web previews, bilingual English & Modern Standard Arabic, and 300 DPI print keepsakes.",
  supportEmail: "support@personalizedtales.com",
  founderLocation: "Abu Dhabi, United Arab Emirates (Serving the UAE)",
  // UAE-only (PHASE_ONE_UAE_ONLY): prices are AED only. Do not add other
  // currencies here until the business actually operates outside the UAE.
  pricing: {
    digitalKeepsake: {
      aed: 49.00,
    },
    upsells: {
      coloringBookPdf: { aed: 19.00 },
      siblingDuplicate: { aed: 29.00 },
      expressReview: { aed: 15.00 },
    },
  },
  social: {
    instagram: "https://instagram.com/personalizedtales",
    tiktok: "https://tiktok.com/@personalizedtales",
  },
};
