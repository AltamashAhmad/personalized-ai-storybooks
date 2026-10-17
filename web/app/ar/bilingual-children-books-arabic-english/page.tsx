import type { Metadata } from 'next';
import SeoLandingView, { SeoLandingPageData } from '@/components/seo/SeoLandingView';
import { buildSeoPageJsonLd } from '@/lib/seo/taxonomy';

export const metadata: Metadata = {
  title: 'قصص أطفال ثنائية اللغة عربي وإنجليزي دبي | فصحى مشكولة بالكامل',
  description:
    'شجع طفلك على إتقان اللغتين العربية والإنجليزية مع قصص مخصصة باسمه في دبي. صفحات ثنائية اللغة متقابلة مع تشكيل كامل وتوافق تام مع مناهج هيئة المعرفة ودائرة التعليم.',
  keywords: [
    'قصص اطفال ثنائية اللغة عربي انجليزي',
    'كتب اطفال ثنائية اللغة دبي',
    'قصص عربية بالتشكيل للاطفال',
    'تعليم اللغة العربية للاطفال دبي',
    'قصص أطفال مناهج هيئة المعرفة',
    'كتب أطفال لغتين الإمارات',
  ],
  alternates: {
    canonical:
      'https://personalizedtales.com/ar/bilingual-children-books-arabic-english',
    languages: {
      'en-AE':
        'https://personalizedtales.com/bilingual-children-books-arabic-english',
      'ar-AE':
        'https://personalizedtales.com/ar/bilingual-children-books-arabic-english',
      'x-default':
        'https://personalizedtales.com/bilingual-children-books-arabic-english',
    },
  },
  openGraph: {
    locale: 'ar_AE',
    title: 'قصص أطفال ثنائية اللغة عربي وإنجليزي دبي | حكايات مخصصة',
    description:
      'اغرس حب اللغة العربية في قلب طفلك مع قصص شعرية متقابلة باللغتين العربية والإنجليزية وتشكيل كامل متوافق مع معايير المدارس.',
    url: 'https://personalizedtales.com/ar/bilingual-children-books-arabic-english',
    type: 'website',
  },
};

const pageData: SeoLandingPageData = {
  slug: 'bilingual-children-books-arabic-english',
  title: 'قصص أطفال ثنائية اللغة عربي وإنجليزي',
  h1: 'قصص أطفال ثنائية اللغة (عربي وإنجليزي) بالاسم في دبي — اجعل طفلك بطلاً بلغتين',
  subheading:
    'جسر لغوي يربط بين الفصحى والإنجليزية في مدارس الإمارات. صفحات شعرية متقابلة بمفردات أصيلة وتشكيل دقيق يغرس حب اللغة العربية في نفوس الأجيال الصاعدة.',
  heroTag: '📖 تعليم وتراث ثنائي اللغة',
  breadcrumbs: [
    { name: 'الرئيسية', url: 'https://personalizedtales.com/ar' },
    {
      name: 'قصص ثنائية اللغة',
      url: 'https://personalizedtales.com/ar/bilingual-children-books-arabic-english',
    },
  ],
  valueProps: [
    {
      title: 'صفحات متقابلة متناغمة',
      description:
        'أبيات شعرية إنجليزية عذبة في صفحة يقابلها نص عربي فصيح في الصفحة الأخرى مع تناسق كامل في الرسومات والإيقاع.',
    },
    {
      title: 'تشكيل لغوي دقيق بنسبة ١٠٠٪',
      description:
        'كافة الكلمات العربية مشكولة بالحركات الكاملة والتنوين والشدة بإشراف لغويين معتمدين لضمان نطق سليم وثقة في القراءة.',
    },
    {
      title: 'توافق مع معايير هيئة المعرفة ودائرة التعليم',
      description:
        'تعزز مهارات القراءة الأساسية للأطفال في المدارس الدولية والخاصة بدبي وأبوظبي وتدعم مبادرات القراءة الوطنية.',
    },
    {
      title: 'رمز الاستماع الصوتي QR مدمج',
      description:
        'رمز استجابة سريعة على الغلاف الخلفي يتيح للطفل الاستماع إلى قراءة صوتية فصيحة ومؤثرات موسيقية مهدئة قبل النوم.',
    },
  ],
  faqs: [
    {
      q: 'هل تطبع النصوص العربية والإنجليزية جنباً إلى جنب في كل صفحة؟',
      a: 'نعم، صُممت صفحاتنا بنظام متقابل متناغم: النص الإنجليزي في جانب يقابله النص العربي الفصيح في الجانب الآخر، مما يتيح للأهل والطفل تتبع القصة بسلاسة ومقارنة المفردات.',
    },
    {
      q: 'هل الكلمات العربية مشكولة بالكامل بالحركات (التشكيل)؟',
      a: 'نعم، تخضع كافة نصوصنا لمراجعة لغوية دقيقة ومشكولة بالكامل بنسبة ١٠٠٪ بالحركات والتنوين لتمكين المبتدئين من نطق الحروف نطقاً صحيحاً سليماً.',
    },
    {
      q: 'كيف تدعم هذه القصص طلاب المدارس الدولية والخاصة في دبي؟',
      a: 'وفقاً لمعايير هيئة المعرفة (KHDA) ودائرة التعليم (ADEK)، فإن رؤية الطفل لاسمه بطلاً في سياق عربي محبب يكسر حاجز صعوبة تعلم اللغة ويزيد من وقت القراءة بنسبة تتجاوز ٤٠٪.',
    },
    {
      q: 'هل يمكنني معاينة الأبيات ثنائية اللغة قبل تأكيد الشراء؟',
      a: 'بالتأكيد، يوفر محرك المعاينة ثلاثية الأبعاد إمكانية تصفح جميع صفحات القصة وقراءة الأبيات العربية والإنجليزية كاملة والتأكد من مظهر الكتاب النهائي.',
    },
  ],
};

export default function ArabicBilingualChildrenBooksPage() {
  const jsonLd = buildSeoPageJsonLd({
    pageUrl:
      'https://personalizedtales.com/ar/bilingual-children-books-arabic-english',
    name: 'قصص أطفال ثنائية اللغة عربي وإنجليزي (إصدار دبي والإمارات)',
    description:
      'قصص مخصصة ثنائية اللغة عربي وإنجليزي مع تشكيل كامل وتوافق تام مع معايير القراءة في دولة الإمارات.',
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
