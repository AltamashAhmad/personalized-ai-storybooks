import type { Metadata } from 'next';
import SeoLandingView, { SeoLandingPageData } from '@/components/seo/SeoLandingView';
import { buildSeoPageJsonLd } from '@/lib/seo/taxonomy';

export const metadata: Metadata = {
  title: "Bilingual Children's Books Arabic & English Dubai | Tashkeel Vowels",
  description:
    'Help your child master Arabic & English with personalized bilingual storybooks in Dubai. Dual-language rhyming spreads with full Tashkeel, aligned with KHDA & ADEK standards.',
  keywords: [
    'bilingual children books arabic english dubai',
    'arabic english storybooks uae',
    'learn arabic kids stories dubai',
    'arabic books with tashkeel',
    'khda curriculum arabic reading',
    'bilingual storybooks uae',
  ],
  alternates: {
    canonical: 'https://personalizedtales.com/bilingual-children-books-arabic-english',
    languages: {
      'en-AE': 'https://personalizedtales.com/bilingual-children-books-arabic-english',
      'ar-AE': 'https://personalizedtales.com/ar/bilingual-children-books-arabic-english',
      'x-default': 'https://personalizedtales.com/bilingual-children-books-arabic-english',
    },
  },
  openGraph: {
    locale: 'en_AE',
    title: "Bilingual Arabic-English Children's Books Dubai | PersonalizedTales",
    description:
      'Bridge the language gap with side-by-side English & voweled Arabic rhyming adventures starring your child.',
    url: 'https://personalizedtales.com/bilingual-children-books-arabic-english',
    type: 'website',
  },
};

const pageData: SeoLandingPageData = {
  slug: 'bilingual-children-books-arabic-english',
  title: "Bilingual Children's Books Arabic & English",
  h1: "Bilingual Children's Books (Arabic & English) in Dubai — Starring Your Child",
  subheading:
    'Bridge the language gap in UAE schools. Dual-language storybooks featuring side-by-side English verse and authentic Modern Standard Arabic with 100% Tashkeel vowel markings.',
  heroTag: '📖 BILINGUAL EDUCATION & HERITAGE',
  breadcrumbs: [
    { name: 'Home', url: 'https://personalizedtales.com' },
    {
      name: "Bilingual Children's Books",
      url: 'https://personalizedtales.com/bilingual-children-books-arabic-english',
    },
  ],
  valueProps: [
    {
      title: 'Side-by-Side Dual Spreads',
      description:
        'Lyrical English verse on one side paired seamlessly with Modern Standard Arabic on the facing page, synchronized in rhythm and art.',
    },
    {
      title: '100% Grammatically Verified Tashkeel',
      description:
        'Every single Arabic word features complete vowel markings (Fatha, Damma, Kasra, Sukun, Shaddah) for phonics accuracy and confidence.',
    },
    {
      title: 'KHDA & ADEK Curriculum Alignment',
      description:
        'Boosts foundational literacy and Arabic inspection readiness across UAE private nurseries, British curriculum, and IB schools.',
    },
    {
      title: 'Audio Narration QR Badge Included',
      description:
        'Back cover features a quick-scan QR badge launching professional native Arabic voiceover narration for bedtime listening practice.',
    },
  ],
  faqs: [
    {
      q: 'Are both Arabic and English printed side-by-side in the storybook?',
      a: 'Yes. Each two-page spread presents the poetic English story on one side and the corresponding Modern Standard Arabic on the other, allowing parents and children to read along seamlessly in both languages.',
    },
    {
      q: 'Are the Arabic verses fully vocalized with vowel marks (Tashkeel)?',
      a: 'Every Arabic word is 100% voweled with Tashkeel (Fatha, Damma, Kasra, Sukun, Tanween, and Shaddah), curated by native linguists to ensure accurate reading and phonics practice for young learners.',
    },
    {
      q: 'How do these books help children in Dubai private schools learn Arabic?',
      a: 'With mandatory Arabic inspection frameworks in Dubai (KHDA) and Abu Dhabi (ADEK), having a personalized book where the child sees their own name heroically woven into Arabic adventures boosts reading engagement by over 40%.',
    },
    {
      q: 'Can I preview the bilingual verses before buying?',
      a: 'Yes, our interactive 3D virtual flipbook lets you inspect every bilingual spread, text block, and illustration before placing your order.',
    },
  ],
};

export default function BilingualChildrenBooksPage() {
  const jsonLd = buildSeoPageJsonLd({
    pageUrl:
      'https://personalizedtales.com/bilingual-children-books-arabic-english',
    name: "Bilingual Children's Storybook (Arabic & English Dubai Edition)",
    description:
      "Personalized bilingual Arabic and English children's books with full Tashkeel vowel markings. Aligned with KHDA and ADEK literacy standards.",
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
