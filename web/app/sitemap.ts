import { MetadataRoute } from "next";
import { PRODUCTS } from "@/config/products";
import { CATEGORIES } from "@/config/categories";
import {
  GULF_AND_GLOBAL_NAMES,
  SEO_OCCASIONS,
  TOP_UAE_CHILD_NAMES,
} from "@/lib/seo/taxonomy";

/**
 * High-Intent UAE Organic SEO Landing Pages (8 Core Routes)
 */
export const CORE_SEO_LANDING_PAGES = [
  {
    enPath: "/personalized-books-dubai",
    arPath: "/ar/personalized-books-dubai",
  },
  {
    enPath: "/personalized-baby-gifts-dubai",
    arPath: "/ar/personalized-baby-gifts-dubai",
  },
  {
    enPath: "/bilingual-children-books-arabic-english",
    arPath: "/ar/bilingual-children-books-arabic-english",
  },
  {
    enPath: "/custom-storybook-for-kids-dubai",
    arPath: "/ar/custom-storybook-for-kids-dubai",
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://personalizedtales.com").replace(/\/$/, "");
  const now = new Date();

  // Helper to generate paired English & Arabic sitemap entries with bidirectional hreflang alternates
  const makeBilingualEntries = (
    path: string, // e.g. "" for home, "/delivery", "/about-us"
    priority: number = 0.8,
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" = "weekly",
    images?: string[]
  ): MetadataRoute.Sitemap => {
    const enUrl = path === "" ? `${baseUrl}` : `${baseUrl}${path}`;
    const arUrl = `${baseUrl}/ar${path}`;
    const alternates = {
      languages: {
        "en-AE": enUrl,
        "ar-AE": arUrl,
        "x-default": path === "" ? `${baseUrl}` : enUrl,
      },
    };

    return [
      {
        url: enUrl,
        lastModified: now,
        changeFrequency,
        priority,
        alternates,
        ...(images && images.length > 0 ? { images } : {}),
      },
      {
        url: arUrl,
        lastModified: now,
        changeFrequency,
        priority,
        alternates,
        ...(images && images.length > 0 ? { images } : {}),
      },
    ];
  };

  // 1. Core Static Brand Pages (English & Arabic pairs)
  const coreRoutes: MetadataRoute.Sitemap = [
    ...makeBilingualEntries("", 1.0, "daily"),
    ...makeBilingualEntries("/delivery", 0.85, "weekly"),
    ...makeBilingualEntries("/about-us", 0.85, "weekly"),
    ...makeBilingualEntries("/quality", 0.85, "weekly"),
    ...makeBilingualEntries("/faq", 0.85, "weekly"),
    ...makeBilingualEntries("/contact", 0.8, "weekly"),
    ...makeBilingualEntries("/gift-finder", 0.9, "weekly"),
    ...makeBilingualEntries("/create", 0.9, "weekly"),
    ...makeBilingualEntries("/create/start", 0.85, "weekly"),
    ...makeBilingualEntries("/unwrap/demo", 0.7, "monthly"),
    ...makeBilingualEntries("/unwrap/welcome", 0.7, "monthly"),
    ...makeBilingualEntries("/unwrap/eid-gift", 0.7, "monthly"),
    ...makeBilingualEntries("/unwrap/birthday-gift", 0.7, "monthly"),
  ];

  // 2. High-Intent Core UAE Landing Pages (8 routes: 4 EN + 4 AR)
  const uaeLandingRoutes: MetadataRoute.Sitemap = CORE_SEO_LANDING_PAGES.flatMap((page) => {
    const enUrl = `${baseUrl}${page.enPath}`;
    const arUrl = `${baseUrl}${page.arPath}`;
    const alternates = {
      languages: {
        "en-AE": enUrl,
        "ar-AE": arUrl,
        "x-default": enUrl,
      },
    };

    return [
      {
        url: enUrl,
        lastModified: now,
        changeFrequency: "daily" as const,
        priority: 0.9,
        alternates,
      },
      {
        url: arUrl,
        lastModified: now,
        changeFrequency: "daily" as const,
        priority: 0.9,
        alternates,
      },
    ];
  });

  // 3. Top 12 UAE Child Names Hubs (24 variants: 12 EN + 12 AR)
  const uaeNameHubRoutes: MetadataRoute.Sitemap = TOP_UAE_CHILD_NAMES.flatMap((name) => {
    const enUrl = `${baseUrl}/personalized-books/for-${name.slug}`;
    const arUrl = `${baseUrl}/ar/personalized-books/for-${name.slug}`;
    const alternates = {
      languages: {
        "en-AE": enUrl,
        "ar-AE": arUrl,
        "x-default": enUrl,
      },
    };

    return [
      {
        url: enUrl,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.85,
        alternates,
      },
      {
        url: arUrl,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.85,
        alternates,
      },
    ];
  });

  // 4. Flagship Books (English & Arabic pairs with product cover images)
  const flagshipBookRoutes: MetadataRoute.Sitemap = PRODUCTS.flatMap((p) => {
    const coverUrl = p.coverImage.startsWith("http") ? p.coverImage : `${baseUrl}${p.coverImage}`;
    return makeBilingualEntries(`/books/${p.slug}`, 0.95, "daily", [coverUrl]);
  });

  // 5. Category Hubs (English & Arabic pairs)
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.flatMap((c) =>
    makeBilingualEntries(`/books/category/${c.slug}`, 0.9, "weekly")
  );

  // 6. GCC Occasions Hubs (English & Arabic pairs)
  const occasionRoutes: MetadataRoute.Sitemap = SEO_OCCASIONS.flatMap((o) =>
    makeBilingualEntries(`/books/${o.slug}`, 0.9, "weekly")
  );

  // 7. Legacy Programmatic Names (English & Arabic pairs)
  const programmaticNameRoutes: MetadataRoute.Sitemap = GULF_AND_GLOBAL_NAMES.flatMap((n) =>
    makeBilingualEntries(`/books/personalized-book-for-${n.slug}`, 0.8, "monthly")
  );

  return [
    ...coreRoutes,
    ...uaeLandingRoutes,
    ...uaeNameHubRoutes,
    ...flagshipBookRoutes,
    ...categoryRoutes,
    ...occasionRoutes,
    ...programmaticNameRoutes,
  ];
}
