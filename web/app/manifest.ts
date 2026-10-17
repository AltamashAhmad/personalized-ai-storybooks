import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PersonalizedTales",
    short_name: "PersonalizedTales",
    description:
      "Heirloom-grade personalized children's storybooks starring your child — English & Arabic.",
    start_url: "/",
    display: "standalone",
    background_color: "#FDF8F1",
    theme_color: "#1E5751",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
