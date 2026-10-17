import type { Metadata } from 'next';
import SeoLandingView, { SeoLandingPageData } from '@/components/seo/SeoLandingView';
import { buildSeoPageJsonLd } from '@/lib/seo/taxonomy';

export const metadata: Metadata = {
  title: 'أرقى هدايا مواليد بالاسم دبي | كتب تذكارية فاخرة للمولود الجديد',
  description:
    'أجمل هدية تذكارية للمواليد بالاسم في دبي والإمارات. خلد ذكرى استقبال المولود، العقيقة، وعيد الميلاد الأول في كتاب فاخر بتغليف ملكي وتوصيل سريع لكافة المستشفيات والمنازل.',
  keywords: [
    'هدايا مواليد بالاسم دبي',
    'هدايا مواليد فاخرة الإمارات',
    'توزيعات مواليد بالاسم',
    'هدايا عقيقة دبي',
    'أفكار هدايا مواليد جدد',
    'كتب تذكارية للمواليد',
  ],
  alternates: {
    canonical: 'https://personalizedtales.com/ar/personalized-baby-gifts-dubai',
    languages: {
      'en-AE': 'https://personalizedtales.com/personalized-baby-gifts-dubai',
      'ar-AE': 'https://personalizedtales.com/ar/personalized-baby-gifts-dubai',
      'x-default': 'https://personalizedtales.com/personalized-baby-gifts-dubai',
    },
  },
  openGraph: {
    locale: 'ar_AE',
    title: 'أرقى هدايا مواليد بالاسم دبي | حكايات مخصصة',
    description:
      'خلد قدوم مولودك الجديد بأفخم قصة تذكارية مخصصة بالاسم وتاريخ الميلاد. تغليف ملكي فاخر وتوصيل سريع لكافة مستشفيات ومنازل الدولة.',
    url: 'https://personalizedtales.com/ar/personalized-baby-gifts-dubai',
    type: 'website',
  },
};

const pageData: SeoLandingPageData = {
  slug: 'personalized-baby-gifts-dubai',
  title: 'أرقى هدايا مواليد بالاسم دبي',
  h1: 'أرقى هدايا المواليد بالاسم في دبي — كتب وقصص تذكارية فاخرة للمواليد الجدد',
  subheading:
    'تبحث عن هدية استثنائية تدوم للأبد لاستقبال مولود جديد في دبي؟ ابتعد عن الهدايا التقليدية واهدِ قصة تذكارية خالدة توثق اسم المولود وتاريخ قدومه بأفخم تجليد ملكي.',
  heroTag: '🍼 هدية تذكارية فاخرة للمواليد',
  breadcrumbs: [
    { name: 'الرئيسية', url: 'https://personalizedtales.com/ar' },
    { name: 'هدايا مواليد بالاسم دبي', url: 'https://personalizedtales.com/ar/personalized-baby-gifts-dubai' },
  ],
  valueProps: [
    {
      title: 'هدية تذكارية تدوم للأبد',
      description:
        'الورود تذبل سريعاً والملابس يضيق مقاسها، بينما القصة التذكارية تبقى كنزاً تقرأه العائلة وتتوارثه الأجيال.',
    },
    {
      title: 'توثيق بيانات وتاريخ الولادة',
      description:
        'تخصيص كامل لاسم المولود، وتاريخ ويوم قدومه المبارك، مع صفحة إهداء عائلي خاصة تتسع لـ ٤٠٠ حرف.',
    },
    {
      title: 'صندوق هدايا ملكي بالختم الذهبي',
      description:
        'تصل القصة داخل علبة هدايا فاخرة بشريط ستان ولمسات ذهبية، جاهزة لتقديمها في المستشفى أو حفل الاستقبال.',
    },
    {
      title: 'توصيل مباشر للمستشفيات والمنازل',
      description:
        'شحن سريع إلى مستشفى لطيفة، والمستشفى الأمريكي بدبي، ودانة الإمارات بأبوظبي، ومختلف مناطق الدولة.',
    },
  ],
  faqs: [
    {
      q: 'لماذا تُعد القصة المخصصة الهدية الأجمل للمولود الجديد في دبي؟',
      a: 'لأنها تدوم للأبد! فالملابس يضيق مقاسها خلال أسابيع والورود تذبل سريعاً، بينما تبقى القصة المخصصة كنزاً عائلياً يقرأه الوالدان لطفلهما كل ليلة وتتوارثه الأجيال.',
    },
    {
      q: 'هل يمكن إضافة تاريخ ميلاد الطفل ووزنه وإهداء خاص في الكتاب؟',
      a: 'نعم بالتأكيد! تتضمن قصة "حين وُلدت" خانات مخصصة لتوثيق تاريخ ومكان الولادة مع صفحة إهداء عائلي كاملة تتسع لـ ٤٠٠ حرف مع الحفاظ التام على التشكيل العربي.',
    },
    {
      q: 'هل هذه القصة مناسبة كهدية لعقيقة أو حفل استقبال المولود (بيبي شاور)؟',
      a: 'تُعد الخيار الأرقى والأكثر تميزاً في حفلات استقبال المواليد ومناسبات العقيقة في الإمارات، خاصة عند تقديمها داخل صندوق الهدايا الملكي بالختم الذهبي.',
    },
    {
      q: 'ما هي سرعة توصيل هدية المولود في دبي وأبوظبي؟',
      a: 'يتم تسليم الكتاب الرقمي التفاعلي خلال ٥ دقائق عبر رابط خاص (مثالي للمفاجآت الفورية في المستشفى)، بينما تصل النسخة المطبوعة عبر التوصيل السريع خلال ٢٤-٤٨ ساعة لكافة مناطق الدولة.',
    },
  ],
};

export default function ArabicPersonalizedBabyGiftsDubaiPage() {
  const jsonLd = buildSeoPageJsonLd({
    pageUrl: 'https://personalizedtales.com/ar/personalized-baby-gifts-dubai',
    name: 'قصة تذكارية فاخرة للمولود الجديد (دبي والإمارات)',
    description:
      'أرقى هدية تذكارية للمواليد بالاسم في دبي والإمارات. خلد استقبال المولود والعقيقة بأفخم قصة مصممة خصيصاً.',
    breadcrumbs: pageData.breadcrumbs,
    faqs: pageData.faqs,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SeoLandingView initialLang="ar" pageData={pageData} />
    </>
  );
}
