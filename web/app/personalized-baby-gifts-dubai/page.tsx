import type { Metadata } from 'next';
import SeoLandingView, { SeoLandingPageData } from '@/components/seo/SeoLandingView';
import { buildSeoPageJsonLd } from '@/lib/seo/taxonomy';

export const metadata: Metadata = {
  title: 'Personalized Baby Gifts Dubai | Heirloom Newborn Keepsakes',
  description:
    'The ultimate personalized baby gift in Dubai. Commemorate newborn milestones, Aqiqah, and 1st birthdays with luxury heirloom storybooks. Local 24–48h UAE delivery.',
  keywords: [
    'personalized baby gifts dubai',
    'personalized gifts for kids uae',
    'newborn keepsake dubai',
    'aqiqah gifts dubai',
    'first birthday gifts uae',
    'baby shower gifts dubai',
  ],
  alternates: {
    canonical: 'https://personalizedtales.com/personalized-baby-gifts-dubai',
    languages: {
      'en-AE': 'https://personalizedtales.com/personalized-baby-gifts-dubai',
      'ar-AE': 'https://personalizedtales.com/ar/personalized-baby-gifts-dubai',
      'x-default': 'https://personalizedtales.com/personalized-baby-gifts-dubai',
    },
  },
  openGraph: {
    locale: 'en_AE',
    title: 'Personalized Baby Gifts Dubai | Heirloom Keepsakes',
    description:
      'The premier personalized newborn baby gift in Dubai. Custom storybooks celebrating baby arrival, birth stats, and family dedications.',
    url: 'https://personalizedtales.com/personalized-baby-gifts-dubai',
    type: 'website',
  },
};

const pageData: SeoLandingPageData = {
  slug: 'personalized-baby-gifts-dubai',
  title: 'Personalized Baby Gifts Dubai',
  h1: 'Personalized Baby Gifts in Dubai — Heirloom Keepsake Books for Newborns',
  subheading:
    "Looking for a unique, enduring newborn gift in Dubai? Move beyond generic flowers and clothes with a custom storybook celebrating baby's arrival, birth stats, and family dedication.",
  heroTag: '🍼 NEWBORN HEIRLOOM KEEPSAKE',
  breadcrumbs: [
    { name: 'Home', url: 'https://personalizedtales.com' },
    { name: 'Personalized Baby Gifts Dubai', url: 'https://personalizedtales.com/personalized-baby-gifts-dubai' },
  ],
  valueProps: [
    {
      title: 'Permanent Heirloom vs Perishable Gifts',
      description:
        'Flowers wilt and baby clothes are outgrown in weeks; an heirloom storybook is read at bedtime and treasured for decades.',
    },
    {
      title: 'Birth Stats & Family Dedication',
      description:
        'Personalize with baby full name, arrival date, birth city, and a heartfelt 400-character family dedication message.',
    },
    {
      title: 'Luxury Gold Foil Presentation Box',
      description:
        'Delivered in an embossed keepsake presentation box with satin ribbon, ready for elegant hospital and home gifting.',
    },
    {
      title: 'Direct Hospital & Home Delivery',
      description:
        'Fast courier transit to Latifa Hospital, American Hospital Dubai, Danat Al Emarat (Abu Dhabi), and private villas across the UAE.',
    },
  ],
  faqs: [
    {
      q: 'What makes a personalized storybook the best baby gift in Dubai?',
      a: 'Unlike baby clothes that are outgrown in weeks or flowers that wilt, a personalized storybook becomes an heirloom keepsake that parents treasure and read to the child throughout their early years.',
    },
    {
      q: "Can I include the baby's birth date and birth weight in the book?",
      a: 'Yes. Our newborn keepsake edition, "When You Were Born", includes personalized fields for birth date, birth place, and a custom 400-character heartfelt dedication message.',
    },
    {
      q: 'Is a personalized book appropriate for an Aqiqah or baby shower celebration?',
      a: 'It is the premier gift choice across Dubai and Abu Dhabi. Accompanied by our gold foil gift box, it serves as a centerpiece present from grandparents, aunts, uncles, and close friends.',
    },
    {
      q: 'How fast can a personalized newborn gift be delivered in Dubai?',
      a: 'Digital 3D flipbook keepsakes are delivered via private link in 5 minutes (perfect for immediate hospital visits), while physical printed editions arrive via courier in 24–48 hours across the UAE.',
    },
  ],
};

export default function PersonalizedBabyGiftsDubaiPage() {
  const jsonLd = buildSeoPageJsonLd({
    pageUrl: 'https://personalizedtales.com/personalized-baby-gifts-dubai',
    name: 'Personalized Baby Keepsake Gift Book (Dubai Edition)',
    description:
      'The premier newborn keepsake gift in Dubai. Commemorate births, baby showers, and Aqiqah celebrations with bespoke personalized storybooks.',
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
