import type { Metadata } from 'next';
import SeoLandingView, { SeoLandingPageData } from '@/components/seo/SeoLandingView';
import { buildSeoPageJsonLd } from '@/lib/seo/taxonomy';

export function generateMetadata(): Metadata {
  return {
    title: "Personalized Children's Books Dubai & UAE | 3D Live Preview",
    description:
      "Create an heirloom personalized children's book in Dubai. Bilingual Arabic & English with full Tashkeel, instant 3D flipbook preview, and 24–48h courier delivery across UAE.",
    keywords: [
      'personalized books dubai',
      'personalized books uae',
      'custom storybook dubai',
      'children books dubai',
      'personalized baby gifts dubai',
      'bilingual arabic english books dubai',
    ],
    alternates: {
      canonical: 'https://personalizedtales.com/personalized-books-dubai',
      languages: {
        'en-AE': 'https://personalizedtales.com/personalized-books-dubai',
        'ar-AE': 'https://personalizedtales.com/ar/personalized-books-dubai',
        'x-default': 'https://personalizedtales.com/personalized-books-dubai',
      },
    },
    openGraph: {
      locale: 'en_AE',
      title: "Personalized Children's Books Dubai & UAE | PersonalizedTales",
      description:
        "Make your child the star of their own magical adventure in Dubai. Instant 3D virtual flipbook + 24–48h local UAE express delivery.",
      url: 'https://personalizedtales.com/personalized-books-dubai',
      type: 'website',
      images: [
        {
          url: 'https://personalizedtales.com/final_book_mockup_1788701924626.jpg',
          width: 1200,
          height: 630,
          alt: "Personalized Children's Books Dubai & UAE",
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: "Personalized Children's Books Dubai & UAE | PersonalizedTales",
      description:
        "Make your child the star of their own magical adventure in Dubai. Instant 3D virtual flipbook + 24–48h local UAE express delivery.",
      images: ['https://personalizedtales.com/final_book_mockup_1788701924626.jpg'],
    },
  };
}

const pageData: SeoLandingPageData = {
  slug: 'personalized-books-dubai',
  title: "Personalized Children's Books Dubai & UAE",
  h1: "Personalized Children's Books in Dubai & UAE — Make Them the Star",
  subheading:
    'Crafted locally in the Emirates. Discover bespoke storybooks featuring authentic bilingual Arabic-English verses, premium 200 GSM Mohawk silk paper, and instant 3D interactive preview.',
  heroTag: '🇦🇪 DUBAI & UAE EDITORIAL KEEPSAKE',
  breadcrumbs: [
    { name: 'Home', url: 'https://personalizedtales.com' },
    { name: 'Personalized Books Dubai', url: 'https://personalizedtales.com/personalized-books-dubai' },
  ],
  valueProps: [
    {
      title: 'Instant 5-Minute Digital Preview',
      description:
        'Flip through every single personalized spread in WebGL 3D before printing, with high-res PDF sent instantly.',
    },
    {
      title: 'Authentic Bilingual Tashkeel',
      description:
        'Poetic Modern Standard Arabic with full vowel markings printed side-by-side with lyrical English rhymes.',
    },
    {
      title: 'Local 24–48h Courier Delivery',
      description:
        'Printed in the UAE and dispatched via local couriers across Abu Dhabi, Dubai, Sharjah, and all 7 Emirates.',
    },
    {
      title: 'Transparent Pure AED Pricing',
      description:
        'Softcover 49 AED, Classic Hardcover 79 AED, Deluxe Layflat 99 AED.',
    },
  ],
  faqs: [
    {
      q: 'Where can I get a personalized book printed in Dubai?',
      a: 'PersonalizedTales prints and dispatches heirloom-grade personalized books directly in the UAE. Orders are printed on 200 GSM archival paper in Dubai and delivered across all 7 Emirates within 24 to 48 hours, with instant 3D digital flipbooks ready in 5 minutes.',
    },
    {
      q: 'How do your delivery times compare to other personalized book brands?',
      a: 'PersonalizedTales prints and delivers locally in the UAE within 24–48 hours via Aramex & Emirates Post, with free UAE delivery on every order — or instantly via 3D digital keepsake.',
    },
    {
      q: 'Does the book include both Arabic and English text?',
      a: 'Yes. Every spread features side-by-side bilingual storytelling: poetic English paired with Modern Standard Arabic (Fusha) complete with full Tashkeel (vowel markings) to support reading confidence.',
    },
    {
      q: 'How much does a personalized storybook cost in the UAE?',
      a: 'Our Softcover edition is 49 AED, the bestselling Classic Hardcover is 79 AED, and the Deluxe Layflat edition is 99 AED. All prices are in UAE Dirhams (AED).',
    },
  ],
};

export default function PersonalizedBooksDubaiPage() {
  const jsonLd = buildSeoPageJsonLd({
    pageUrl: 'https://personalizedtales.com/personalized-books-dubai',
    name: "Personalized Children's Book (Dubai & UAE Edition)",
    description:
      "An heirloom-grade personalized bilingual storybook starring your child across Dubai and the UAE. Features 200 GSM archival paper, 3D interactive flipbook preview, and local 24-48h courier delivery.",
    breadcrumbs: pageData.breadcrumbs,
    faqs: pageData.faqs,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SeoLandingView initialLang="en" pageData={pageData} />
    </>
  );
}
