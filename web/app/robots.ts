import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://personalizedtales.com").replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/private/",
          "/cart",
          "/checkout",
          "/ar/cart",
          "/ar/checkout",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/private/",
          "/cart",
          "/checkout",
          "/ar/cart",
          "/ar/checkout",
        ],
      },
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/private/",
          "/cart",
          "/checkout",
          "/ar/cart",
          "/ar/checkout",
        ],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/private/",
          "/cart",
          "/checkout",
          "/ar/cart",
          "/ar/checkout",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
