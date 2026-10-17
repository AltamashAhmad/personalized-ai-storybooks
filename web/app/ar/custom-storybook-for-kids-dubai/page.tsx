import type { Metadata } from 'next';
import SeoLandingView, { SeoLandingPageData } from '@/components/seo/SeoLandingView';
import { buildSeoPageJsonLd } from '@/lib/seo/taxonomy';

export const metadata: Metadata = {
  title: 'قصص أطفال مخصصة في دبي | اصنع قصة طفلك بمعاينة ثلاثية الأبعاد',
  description:
    'صمم قصة أطفال مخصصة بالكامل لطفلك في دبي. حدد تسريحة الشعر، لون البشرة، وأضف إهداءك الخاص. معاينة تفاعلية فورية وتوصيل لكافة الإمارات خلال ٢٤-٤٨ ساعة.',
  keywords: [
    'قصص اطفال مخصصة الامارات',
    'كتب قصص مخصصة للاطفال دبي',
    'تصميم قصة اطفال بالاسم دبي',
    'كتب أطفال مخصصة الإمارات',
    'طباعة كتب اطفال مخصصة دبي',
    'هدايا اطفال مخصصة بالاسم',
  ],
  alternates: {
    canonical:
      'https://personalizedtales.com/ar/custom-storybook-for-kids-dubai',
    languages: {
      'en-AE':
        'https://personalizedtales.com/custom-storybook-for-kids-dubai',
      'ar-AE':
        'https://personalizedtales.com/ar/custom-storybook-for-kids-dubai',
      'x-default':
        'https://personalizedtales.com/custom-storybook-for-kids-dubai',
    },
  },
  openGraph: {
    locale: 'ar_AE',
    title: 'قصص أطفال مخصصة في دبي | حكايات مخصصة',
    description:
      'البديل الإماراتي للكتب المستوردة. صمم شخصية طفلك، عاين القصة ثلاثية الأبعاد، واستلم الكتاب محلياً خلال ٢٤-٤٨ ساعة.',
    url: 'https://personalizedtales.com/ar/custom-storybook-for-kids-dubai',
    type: 'website',
  },
};

const pageData: SeoLandingPageData = {
  slug: 'custom-storybook-for-kids-dubai',
  title: 'قصص أطفال مخصصة في دبي',
  h1: 'قصص أطفال مصممة ومخصصة في دبي — معاينة ثلاثية الأبعاد وتوصيل محلي سريع',
  subheading:
    'البديل الإماراتي المبتكر للكتب المستوردة. صمم مغامرة طفلك بنفسك مع خيارات تخصيص الملامح، الإهداء العائلي، والطباعة الفاخرة محلياً بأعلى مواصفات الإتقان.',
  heroTag: '✨ مصمم القصص المخصصة في دبي',
  breadcrumbs: [
    { name: 'الرئيسية', url: 'https://personalizedtales.com/ar' },
    {
      name: 'قصص أطفال مخصصة',
      url: 'https://personalizedtales.com/ar/custom-storybook-for-kids-dubai',
    },
  ],
  valueProps: [
    {
      title: 'تخصيص كامل لملامح الشخصية',
      description:
        'اختر لون البشرة، تسريحة ولون الشعر، النظارات الطبية، وتفاصيل الملابس ليشعر طفلك بأنه البطل الحقيقي للقصة.',
    },
    {
      title: 'مشاركة العائلة في المغامرة',
      description:
        'أضف شخصيات بابا وماما والإخوة والأجداد في سياق القصة ليشاركونه أجمل اللحظات والذكريات.',
    },
    {
      title: 'سرعة محلية تفوق الشحن المستورد',
      description:
        'معاينة ثلاثية الأبعاد خلال ٥ دقائق وتوصيل سريع لباب منزلك خلال ٢٤-٤٨ ساعة بدلاً من الانتظار أسبوعين للكتب المستوردة.',
    },
    {
      title: 'أجود الخامات والورق الأرشيفي',
      description:
        'ورق موهوك الحريري ٢٠٠ جم المقاوم للتمزق، وتجليد PUR المتين، وأحبار بانتون نباتية آمنة ١٠٠٪ للأطفال.',
    },
  ],
  faqs: [
    {
      q: 'كيف يمكنني تصميم قصة مخصصة لطفلي في دبي؟',
      a: 'يستغرق الأمر دقيقتين فقط: اختر عنوان القصة المفضل، اكتب اسم الطفل، حدد ملامحه (لون البشرة والشعر والنظارات)، أضف إهداءك الشخصي، ثم تصفح كامل الكتاب في المعاينة ثلاثية الأبعاد.',
    },
    {
      q: 'ما الذي يميز حكاياتنا المخصصة عن غيرها من متاجر الكتب المخصصة؟',
      a: 'نتميز بتقديم لغة عربية فصحى مشكولة بالكامل إلى جانب الإنجليزية، مع طباعة وتوصيل محلي خلال ٢٤-٤٨ ساعة بتوصيل مجاني داخل الإمارات.',
    },
    {
      q: 'هل يمكنني تخصيص تفاصيل مثل النظارات ولون البشرة؟',
      a: 'نعم، يتيح محرك التخصيص اختيار درجات متنوعة للبشرة، تسريحات وألوان شعر مختلفة، إضافة نظارات طبية، وتفاصيل ملابس تعكس مظهر طفلك الحقيقي.',
    },
    {
      q: 'هل يمكنني كتابة إهداء شخصي يطبع داخل القصة؟',
      a: 'نعم، نوفر صفحة إهداء مخصصة في مقدمة الكتاب تتسع لـ ٤٠٠ حرف لكتابة كلمات المحبة والدعاء باسم الوالدين أو الأقارب مع الحفاظ على التشكيل الكامل.',
    },
  ],
};

export default function ArabicCustomStorybookForKidsPage() {
  const jsonLd = buildSeoPageJsonLd({
    pageUrl:
      'https://personalizedtales.com/ar/custom-storybook-for-kids-dubai',
    name: 'قصة أطفال مصممة ومخصصة (إصدار دبي والإمارات)',
    description:
      'صمم قصة أطفال مخصصة بالكامل لطفلك في دبي. ملامح شخصية فريدة، لغة عربية فصحى مشكولة، وتوصيل محلي سريع خلال ٢٤-٤٨ ساعة.',
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
