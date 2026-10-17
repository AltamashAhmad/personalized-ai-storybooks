import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NameHubView from '@/components/seo/NameHubView';
import {
  TOP_UAE_CHILD_NAMES,
  getTopUaeChildName,
  normalizeNameSlug,
  buildSeoPageJsonLd,
} from '@/lib/seo/taxonomy';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const names = [
    'zayed',
    'fatima',
    'hamdan',
    'maryam',
    'rashid',
    'noah',
    'olivia',
    'liam',
    'sarah',
    'omar',
    'ali',
    'layla',
  ];

  const params: { slug: string }[] = [];
  for (const name of names) {
    params.push({ slug: `for-${name}` });
    params.push({ slug: name });
  }
  params.push({ slug: 'for-sara' });
  params.push({ slug: 'sara' });

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const nameData = getTopUaeChildName(slug);

  if (!nameData) {
    return {
      title: "Personalized Children's Storybook | PersonalizedTales",
    };
  }

  const cleanSlug = `for-${nameData.slug}`;

  return {
    title: `Personalized Storybook for ${nameData.nameEn} | 3D Interactive Flipbook (Dubai, UAE)`,
    description: `Make ${nameData.nameEn} the hero of their own magical adventure in Dubai! Bilingual English & Arabic rhyming text with full Tashkeel, 3D flipbook preview, and 24–48h UAE delivery.`,
    keywords: [
      `personalized book for ${nameData.nameEn.toLowerCase()}`,
      `custom storybook ${nameData.nameEn.toLowerCase()}`,
      `story book for ${nameData.nameEn.toLowerCase()} dubai`,
      `personalized baby gift ${nameData.nameEn.toLowerCase()}`,
      `bilingual book ${nameData.nameEn.toLowerCase()}`,
    ],
    alternates: {
      canonical: `https://personalizedtales.com/personalized-books/${cleanSlug}`,
      languages: {
        'en-AE': `https://personalizedtales.com/personalized-books/${cleanSlug}`,
        'ar-AE': `https://personalizedtales.com/ar/personalized-books/${cleanSlug}`,
        'x-default': `https://personalizedtales.com/personalized-books/${cleanSlug}`,
      },
    },
    openGraph: {
      locale: 'en_AE',
      title: `Personalized Storybook for ${nameData.nameEn} | PersonalizedTales`,
      description: `Make ${nameData.nameEn} the star of their own magical adventure in Dubai! Instant 3D flipbook preview, bilingual English-Arabic rhyming text.`,
      url: `https://personalizedtales.com/personalized-books/${cleanSlug}`,
      type: 'website',
    },
  };
}

export default async function NameHubPage({ params }: Props) {
  const { slug } = await params;
  const nameData = getTopUaeChildName(slug);

  if (!nameData) {
    notFound();
  }

  const cleanSlug = `for-${nameData.slug}`;
  const canonicalUrl = `https://personalizedtales.com/personalized-books/${cleanSlug}`;

  const jsonLd = buildSeoPageJsonLd({
    pageUrl: canonicalUrl,
    name: `Personalized Storybook for ${nameData.nameEn} (Dubai & UAE Edition)`,
    description: `An heirloom-grade personalized bilingual storybook starring ${nameData.nameEn} across Dubai and the UAE. Features 200 GSM archival paper, 3D interactive flipbook preview, and local 24-48h courier delivery.`,
    breadcrumbs: [
      { name: 'Home', url: 'https://personalizedtales.com' },
      {
        name: 'Personalized Books',
        url: 'https://personalizedtales.com/all-books',
      },
      { name: `For ${nameData.nameEn}`, url: canonicalUrl },
    ],
    faqs: [
      {
        q: `How is ${nameData.nameEn}'s name integrated into the personalized story?`,
        a: `${nameData.nameEn} is woven as the brave hero throughout the rhyming narrative. Their name appears prominently on the front cover, on the dedication page, and within every bilingual page spread.`,
      },
      {
        q: `Can I preview ${nameData.nameEn}'s full book before ordering?`,
        a: `Yes! Our live 3D virtual flipbook lets you preview every single spread of ${nameData.nameEn}'s personalized story in your browser for free before making any purchase.`,
      },
      {
        q: `Does ${nameData.nameEn}'s book include both Arabic and English text?`,
        a: `Yes, each spread features side-by-side bilingual storytelling: poetic English verses matched with Modern Standard Arabic featuring complete Tashkeel vowel markings.`,
      },
      {
        q: `How fast is delivery for ${nameData.nameEn}'s book in Dubai and the UAE?`,
        a: `The digital 3D flipbook is ready in 5 minutes via private link and WhatsApp. Physical heirloom hardcovers are printed locally and delivered across all 7 Emirates within 24 to 48 hours.`,
      },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NameHubView initialLang="en" nameData={nameData} />
    </>
  );
}
