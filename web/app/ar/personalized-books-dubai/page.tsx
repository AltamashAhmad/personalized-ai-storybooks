import type { Metadata } from 'next';
import SeoLandingView, { SeoLandingPageData } from '@/components/seo/SeoLandingView';
import { buildSeoPageJsonLd } from '@/lib/seo/taxonomy';

export function generateMetadata(): Metadata {
  return {
    title: 'قصص أطفال مخصصة بالاسم والصورة دبي والإمارات | معاينة ثلاثية الأبعاد',
    description:
      'اصنع قصة أطفال تذكارية مخصصة لطفلك في دبي. نصوص ثنائية اللغة عربي وإنجليزي مشكولة بالكامل، معاينة ثلاثية الأبعاد، وتوصيل سريع لكافة إمارات الدولة خلال ٢٤-٤٨ ساعة.',
    keywords: [
      'قصص أطفال مخصصة دبي',
      'قصص أطفال مخصصة الإمارات',
      'كتب مخصصة للأطفال بالاسم',
      'هدايا مواليد بالاسم دبي',
      'كتب أطفال بالاسم والصورة',
      'قصص ثنائية اللغة عربي وانجليزي',
    ],
    alternates: {
      canonical: 'https://personalizedtales.com/ar/personalized-books-dubai',
      languages: {
        'en-AE': 'https://personalizedtales.com/personalized-books-dubai',
        'ar-AE': 'https://personalizedtales.com/ar/personalized-books-dubai',
        'x-default': 'https://personalizedtales.com/personalized-books-dubai',
      },
    },
    openGraph: {
      locale: 'ar_AE',
      title: 'قصص أطفال مخصصة بالاسم دبي والإمارات | حكايات مخصصة',
      description:
        'اجعل طفلك بطل قصته الخالدة في دبي. معاينة افتراضية ثلاثية الأبعاد فورية + توصيل محلي سريع خلال ٢٤-٤٨ ساعة لكافة الإمارات.',
      url: 'https://personalizedtales.com/ar/personalized-books-dubai',
      type: 'website',
      images: [
        {
          url: 'https://personalizedtales.com/final_book_mockup_1788701924626.jpg',
          width: 1200,
          height: 630,
          alt: 'قصص أطفال مخصصة دبي والإمارات',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'قصص أطفال مخصصة بالاسم دبي والإمارات | حكايات مخصصة',
      description:
        'اجعل طفلك بطل قصته الخالدة في دبي. معاينة افتراضية ثلاثية الأبعاد فورية + توصيل محلي سريع خلال ٢٤-٤٨ ساعة لكافة الإمارات.',
      images: ['https://personalizedtales.com/final_book_mockup_1788701924626.jpg'],
    },
  };
}

const pageData: SeoLandingPageData = {
  slug: 'personalized-books-dubai',
  title: 'قصص أطفال مخصصة دبي والإمارات',
  h1: 'قصص أطفال مخصصة بالاسم والصورة في دبي والإمارات — اجعل طفلك بطل القصة',
  subheading:
    'طُبعت بعناية فائقة في دولة الإمارات. قصص ساحرة تجمع بين الفصحى المشكولة والإنجليزية، على ورق موهوك الفاخر مع معاينة تفاعلية فورية وتوصيل سريع.',
  heroTag: '🇦🇪 إصدار دبي والإمارات التذكاري',
  breadcrumbs: [
    { name: 'الرئيسية', url: 'https://personalizedtales.com/ar' },
    { name: 'قصص أطفال مخصصة دبي', url: 'https://personalizedtales.com/ar/personalized-books-dubai' },
  ],
  valueProps: [
    {
      title: 'معاينة رقمية فورية خلال ٥ دقائق',
      description:
        'تصفح القصة كاملة بكل صفحاتها في القارئ ثلاثي الأبعاد مجاناً قبل الشراء مع استلام ملف الطباعة فوراً.',
    },
    {
      title: 'لغة عربية فصحى مشكولة بالكامل',
      description:
        'أبيات شعرية ثنائية اللغة، عربية فصحى بالتشكيل الكامل تقابلها نصوص إنجليزية عذبة تغرس حب القراءة.',
    },
    {
      title: 'توصيل محلي خلال ٢٤-٤٨ ساعة',
      description:
        'طباعة محلية فاخرة في دولة الإمارات وتوصيل سريع لكافة إمارات الدولة (أبوظبي، دبي، الشارقة، وجميع الإمارات).',
    },
    {
      title: 'أسعار واضحة',
      description:
        'تبدأ الأسعار من ٤٩ درهماً إماراتياً.',
    },
  ],
  faqs: [
    {
      q: 'أين يمكنني طباعة قصة مخصصة لطفلي في دبي؟',
      a: 'توفر دار "حكاياتنا المخصصة" (PersonalizedTales) طباعة محلية فاخرة في دولة الإمارات على ورق موهوك الأرشيفي فائق الجودة، مع توصيل سريع خلال ٢٤ إلى ٤٨ ساعة لكافة الإمارات، وإتاحة النسخة الرقمية التفاعلية خلال ٥ دقائق.',
    },
    {
      q: 'كم يستغرق توصيل الكتب المخصصة داخل الإمارات؟',
      a: 'نوفر طباعة محلية سريعة تصلك في غضون ٢٤-٤٨ ساعة فقط بتوصيل مجاني داخل الإمارات وبأسعار محلية منافسة.',
    },
    {
      q: 'هل تتضمن القصة اللغتين العربية والإنجليزية معاً؟',
      a: 'نعم، تتميز قصصنا بتصميم ثنائي اللغة متقابل: أبيات شعرية إنجليزية عذبة تقابلها لغة عربية فصحى مشكولة بالكامل بالحركات لمساعدة الطفل على إتقان القراءة والاعتزاز بهويته.',
    },
    {
      q: 'كم تبلغ أسعار القصص المخصصة للأطفال في الإمارات؟',
      a: 'تبدأ الأسعار من ٤٩ درهماً إماراتياً للغلاف المرن، و ٧٩ درهماً للغلاف المقوى الكلاسيكي الأكثر طلباً، و ٩٩ درهماً للطبعة الملكية المسطحة.',
    },
  ],
};

export default function ArabicPersonalizedBooksDubaiPage() {
  const jsonLd = buildSeoPageJsonLd({
    pageUrl: 'https://personalizedtales.com/ar/personalized-books-dubai',
    name: 'قصة أطفال مخصصة (إصدار دبي والإمارات)',
    description:
      'قصة تذكارية استثنائية وبطولة طفلك في دبي والإمارات. ورق موهوك الفاخر، معاينة ثلاثية الأبعاد فورية وتوصيل محلي خلال ٢٤-٤٨ ساعة.',
    breadcrumbs: pageData.breadcrumbs,
    faqs: pageData.faqs,
  });

  return (
    <div dir="rtl" className="font-amiri">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SeoLandingView initialLang="ar" pageData={pageData} />
    </div>
  );
}
