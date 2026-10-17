import type { Metadata } from 'next';
import SeoLandingView, { SeoLandingPageData } from '@/components/seo/SeoLandingView';
import { buildSeoPageJsonLd } from '@/lib/seo/taxonomy';

export const metadata: Metadata = {
  title: 'Custom Storybook for Kids Dubai | 3D Interactive Live Preview',
  description:
    'Create a custom storybook for kids in Dubai. Customize character hairstyles, skin tones, and dedications. 5-minute digital preview & 24h UAE courier delivery.',
  keywords: [
    'custom storybook for kids dubai',
    'custom kids storybook uae',
    'personalized storybook maker dubai',
    'personalized storybooks dubai',
    'custom children books uae',
    'create personalized book dubai',
  ],
  alternates: {
    canonical: 'https://personalizedtales.com/custom-storybook-for-kids-dubai',
    languages: {
      'en-AE': 'https://personalizedtales.com/custom-storybook-for-kids-dubai',
      'ar-AE': 'https://personalizedtales.com/ar/custom-storybook-for-kids-dubai',
      'x-default': 'https://personalizedtales.com/custom-storybook-for-kids-dubai',
    },
  },
  openGraph: {
    locale: 'en_AE',
    title: 'Custom Storybook for Kids Dubai | PersonalizedTales',
    description:
      'The UAE homegrown alternative to imported custom books. Customize characters, dedicate with love, and preview in 3D in 5 minutes.',
    url: 'https://personalizedtales.com/custom-storybook-for-kids-dubai',
    type: 'website',
  },
};

const pageData: SeoLandingPageData = {
  slug: 'custom-storybook-for-kids-dubai',
  title: 'Custom Storybook for Kids Dubai',
  h1: 'Custom Storybook for Kids in Dubai — Instant 3D Preview & 24h UAE Delivery',
  subheading:
    'The homegrown UAE alternative to imported custom books. Tailor every adventure with bespoke character appearance, family dedications, and museum-grade local printing.',
  heroTag: '✨ BESPOKE STORYBOOK CUSTOMIZER',
  breadcrumbs: [
    { name: 'Home', url: 'https://personalizedtales.com' },
    {
      name: 'Custom Storybook Dubai',
      url: 'https://personalizedtales.com/custom-storybook-for-kids-dubai',
    },
  ],
  valueProps: [
    {
      title: 'Complete Character Customization',
      description:
        'Choose nuanced skin tones, 8+ hair styles, hair colors, glasses, and outfit accents so every child feels genuinely represented.',
    },
    {
      title: 'Co-Star Family Characters',
      description:
        'Weave Baba (Dad), Mama (Mom), siblings, or loving grandparents directly into the storyline alongside the child.',
    },
    {
      title: 'Local Speed vs Overseas Delays',
      description:
        'Instant 5-minute 3D virtual flipbook + 24–48h local UAE courier delivery, avoiding 14-day European postal delays and customs fees.',
    },
    {
      title: 'High-Grade Archival Materials',
      description:
        'Crafted with 200 GSM Mohawk silk uncoated paper, PUR-reinforced durable binding, and child-safe vegetable Pantone inks.',
    },
  ],
  faqs: [
    {
      q: 'How do I make a custom storybook for my child in Dubai?',
      a: "It takes just 2 minutes: select your child's favorite adventure theme, type their name, customize character appearance (hair, skin tone, glasses), add your personal dedication, and preview the full 3D flipbook.",
    },
    {
      q: 'How is PersonalizedTales different from other personalized book brands?',
      a: 'PersonalizedTales offers authentic Arabic & bilingual editions with full Tashkeel, prints and delivers locally in the UAE within 24–48 hours via Aramex & Emirates Post with free UAE delivery, and every book includes an instant 3D digital keepsake preview.',
    },
    {
      q: 'Can I customize character details like glasses and skin tones?',
      a: 'Yes. Our customizer supports multiple hair styles, hair colors, nuanced skin tones, glasses, and cultural touches so every child feels genuinely represented.',
    },
    {
      q: 'Can I write a personalized dedication message inside the book?',
      a: 'Yes. You can write up to 400 characters of heartfelt dedication printed on page 1, complete with your name, date, and choice of pre-written poetic verses.',
    },
  ],
};

export default function CustomStorybookForKidsPage() {
  const jsonLd = buildSeoPageJsonLd({
    pageUrl: 'https://personalizedtales.com/custom-storybook-for-kids-dubai',
    name: "Custom Storybook for Kids (Dubai & UAE Edition)",
    description:
      "Craft a bespoke personalized storybook for your child in Dubai. Complete character likeness, bilingual rhymes with full Tashkeel, and 24h UAE courier delivery.",
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
