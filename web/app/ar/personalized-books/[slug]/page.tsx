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
      title: 'قصة أطفال مخصصة | حكايات مخصصة',
    };
  }

  const cleanSlug = `for-${nameData.slug}`;

  return {
    title: `قصة أطفال مخصصة باسم ${nameData.nameAr} | كتاب تفاعلي ثلاثي الأبعاد الإمارات`,
    description: `اجعل ${nameData.nameAr} بطل مغامرة ساحرة مخصصة في دبي! قصة شعرية ثنائية اللغة عربي وإنجليزي مشكولة بالكامل مع معاينة ثلاثية الأبعاد وتوصيل لكافة الإمارات خلال ٢٤-٤٨ ساعة.`,
    keywords: [
      `قصة أطفال باسم ${nameData.nameAr}`,
      `كتاب مخصص باسم ${nameData.nameAr}`,
      `قصص أطفال مخصصة دبي ${nameData.nameAr}`,
      `هدية مولود باسم ${nameData.nameAr}`,
      `كتب أطفال بالاسم والصورة الإمارات`,
    ],
    alternates: {
      canonical: `https://personalizedtales.com/ar/personalized-books/${cleanSlug}`,
      languages: {
        'en-AE': `https://personalizedtales.com/personalized-books/${cleanSlug}`,
        'ar-AE': `https://personalizedtales.com/ar/personalized-books/${cleanSlug}`,
        'x-default': `https://personalizedtales.com/personalized-books/${cleanSlug}`,
      },
    },
    openGraph: {
      locale: 'ar_AE',
      title: `قصة أطفال مخصصة باسم ${nameData.nameAr} | حكايات مخصصة`,
      description: `اجعل ${nameData.nameAr} بطل مغامرة ساحرة مخصصة في دبي! معاينة ثلاثية الأبعاد فورية وتوصيل لكافة الإمارات.`,
      url: `https://personalizedtales.com/ar/personalized-books/${cleanSlug}`,
      type: 'website',
    },
  };
}

export default async function ArabicNameHubPage({ params }: Props) {
  const { slug } = await params;
  const nameData = getTopUaeChildName(slug);

  if (!nameData) {
    notFound();
  }

  const cleanSlug = `for-${nameData.slug}`;
  const canonicalUrl = `https://personalizedtales.com/ar/personalized-books/${cleanSlug}`;

  const jsonLd = buildSeoPageJsonLd({
    pageUrl: canonicalUrl,
    name: `قصة أطفال مخصصة باسم ${nameData.nameAr} (إصدار دبي والإمارات)`,
    description: `قصة تذكارية ثنائية اللغة وبطولة ${nameData.nameAr} في دبي والإمارات. ورق موهوك الفاخر ومعاينة ثلاثية الأبعاد فورية وتوصيل محلي خلال ٢٤-٤٨ ساعة.`,
    breadcrumbs: [
      { name: 'الرئيسية', url: 'https://personalizedtales.com/ar' },
      {
        name: 'القصص المخصصة',
        url: 'https://personalizedtales.com/ar/all-books',
      },
      { name: `قصة باسم ${nameData.nameAr}`, url: canonicalUrl },
    ],
    faqs: [
      {
        q: `كيف يُدمج اسم ${nameData.nameAr} في القصة المخصصة؟`,
        a: `يتم نسج اسم ${nameData.nameAr} كبطل رئيسي في حبكة القصة الشعرية، حيث يُطبع الاسم على الغلاف الأمامي، وصفحة الإهداء العائلي، وعلى صفحات المغامرة باللغتين العربية الفصحى المشكولة والإنجليزية.`,
      },
      {
        q: `هل يمكنني معاينة كتاب ${nameData.nameAr} قبل الشراء؟`,
        a: `نعم! يوفر القارئ التفاعلي ثلاثي الأبعاد معاينة مجانية كاملة لجميع صفحات القصة مع اسم ومظهر ${nameData.nameAr}، لتتأكد من كل كلمة قبل إتمام الطلب.`,
      },
      {
        q: `هل تتضمن القصة اللغتين العربية والإنجليزية مع التشكيل؟`,
        a: `نعم، صُممت كل صفحة بنظام متقابل: أبيات شعرية إنجليزية عذبة تقابلها فصحى عربية مشكولة بالكامل بالحركات (التشكيل)، مما يدعم ثقة ${nameData.nameAr} اللغوية وهويته.`,
      },
      {
        q: `كم يستغرق توصيل قصة ${nameData.nameAr} في دبي والإمارات؟`,
        a: `النسخة الرقمية التفاعلية تصبح جاهزة خلال ٥ دقائق عبر الواتساب والبريد الإلكتروني، والنسخة المطبوعة الفاخرة تصل إلى باب منزلك في دبي وكافة الإمارات خلال ٢٤ إلى ٤٨ ساعة.`,
      },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NameHubView initialLang="ar" nameData={nameData} />
    </>
  );
}
