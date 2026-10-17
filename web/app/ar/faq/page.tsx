import type { Metadata } from "next";
import FaqView from "@/components/FaqView";

export const metadata: Metadata = {
  title: "الأسئلة الأكثر شيوعاً ومركز المساعدة",
  description: "إجابات شاملة عن كافة الأسئلة المتعلقة بتخصيص كتب الأطفال بالاسم والصورة، تشكيل اللغة العربية، مدة الشحن والتوصيل في الإمارات، وضمان استرداد الأموال ١٠٠٪.",
  keywords: [
    "أسئلة شائعة قصص أطفال",
    "مركز مساعدة حكايات مخصصة",
    "توصيل كتب أطفال دبي",
    "كتب أطفال بالتشكيل"
  ],
  alternates: {
    canonical: "https://personalizedtales.com/ar/faq",
    languages: {
      "en-AE": "https://personalizedtales.com/faq",
      "ar-AE": "https://personalizedtales.com/ar/faq",
      "x-default": "https://personalizedtales.com/faq",
    },
  },
  openGraph: {
    locale: "ar_AE",
    title: "الأسئلة الشائعة ومركز المساعدة | حكايات مخصصة",
    description: "كل ما تود معرفته عن كتبنا التذكارية الفاخرة المخصصة للأطفال في الإمارات.",
    url: "https://personalizedtales.com/ar/faq",
    type: "website",
  },
};

export default function ArabicFAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "ar",
    mainEntity: [
      {
        "@type": "Question",
        name: "كيف يتم تخصيص القصة باسم ومظهر طفلي؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "في الخطوة الأولى، تدخل اسم طفلك وتحدد جنسه وتختار النمط الأقرب لملامحه ولون بشرته وشعره. يقوم محركنا برسم وتوليد شخصية طفلك لتظهر على الغلاف وفي جميع الصفحات والرسومات الداخلية."
        }
      },
      {
        "@type": "Question",
        name: "كيف تعمل النسخة الثنائية (عربي وإنجليزي)؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "تُعرض الأبيات الشعرية باللغة العربية الفصحى مع التشكيل الكامل في الصفحة اليمنى، بجانب ترجمتها ونظمها الشعري الإنجليزي في الصفحة اليسرى لتعزيز ثنائية اللغة لدى أطفال الإمارات."
        }
      },
      {
        "@type": "Question",
        name: "كم يستغرق استلام الكتاب في دولة الإمارات؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "التسليم الرقمي فوري خلال ٥ دقائق، والنسخ المطبوعة الفاخرة (الغلاف الصلب والتجليد المسطح) يتم توصيلها داخل الإمارات خلال ٢٤ إلى ٤٨ ساعة."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FaqView initialLang="ar" />
    </>
  );
}
