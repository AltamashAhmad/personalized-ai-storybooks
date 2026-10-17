'use client';

import React from 'react';
import Link from 'next/link';
import Accordion, { AccordionItem } from '@/components/ui/Accordion';

export interface SeoAccordionSectionProps {
  isAr?: boolean;
  dir?: 'ltr' | 'rtl';
}

/**
 * Section S9: SEO Accordion Section
 * "PersonalizedTales Books and Gifts" / "حكايات مخصصة وهدايا للأطفال"
 * 7 fully accessible, structured disclosure items answering parent questions.
 */
export default function SeoAccordionSection({ isAr = false, dir = 'ltr' }: SeoAccordionSectionProps) {
  const getLocalizedPath = (path: string) => (isAr ? `/ar${path}` : path);

  const items: AccordionItem[] = [
    {
      id: 'who-we-are',
      heading: isAr ? 'من نحن؟ وما هي فكرة الحكايات المخصصة؟' : 'Who is PersonalizedTales?',
      content: isAr ? (
        <p>
          نحن دار نشر متخصصة في ابتكار قصص الأطفال التذكارية المخصصة بأعلى معايير الإتقان العالمية. نجمع بين السرد القصصي العربي الفصيح المشكول بالكامل وأحدث تقنيات المعاينة ثلاثية الأبعاد، لنجعل كل طفل بطلاً حقيقياً لكتابه الخاص يحتفظ به مدى الحياة.
        </p>
      ) : (
        <p>
          We are an online publisher creating heirloom-grade personalized children’s books. Every story is thoughtfully written with rhyme, authentic bilingual Arabic and English verses, and printed locally with artisan binding so children feel extraordinarily special.
        </p>
      ),
    },
    {
      id: 'how-to-make',
      heading: isAr ? 'كيف أقوم بتخصيص كتاب لطفلي؟' : 'How do I make a personalized book?',
      content: isAr ? (
        <p>
          الأمر غاية في البساطة ويستغرق أقل من دقيقتين: اختر القصة المفضلة، أدخل اسم طفلك وحدد مظهره (لون الشعر، التسريحة، ولون البشرة)، ثم أضف إهداءك الخاص. يمكنك تصفح كامل صفحات الكتاب عبر المعاينة ثلاثية الأبعاد قبل إتمام الطلب.
        </p>
      ) : (
        <p>
          It takes less than two minutes: choose your favorite story, enter your child’s name, select their appearance, and write your heartfelt dedication. You can flip through every single page in our live 3D preview engine before ordering.
        </p>
      ),
    },
    {
      id: 'how-to-order',
      heading: isAr ? 'كيف أتمم عملية الطلب والدفع؟' : 'How do I place an order?',
      content: isAr ? (
        <p>
          بعد معاينة كتابك، اختر نوع الغلاف المناسب (غلاف ناعم، غلاف مقوى، أو غلاف منبسط فاخر)، ثم أضف صندوق الهدية أو خيارات التغليف إن رغبت. ندعم الدفع الآمن بالبطاقات الائتمانية.
        </p>
      ) : (
        <p>
          Once you’ve previewed your story, choose your preferred format (Softcover, Classic Hardcover, or Deluxe Layflat), add optional gift wrap, and check out securely with major credit cards.
        </p>
      ),
    },
    {
      id: 'pricing-formats',
      heading: isAr ? 'كم تبلغ أسعار الكتب وخيارات التجليد؟' : 'How much are the books?',
      content: isAr ? (
        <p>
          تبدأ أسعار كتبنا من ٤٩ درهماً إماراتياً للغلاف الناعم، و ٧٩ درهماً للغلاف المقوى الكلاسيكي (الأكثر طلباً)، و ٩٩ درهماً لنسخة الغلاف المنبسط الفاخرة (Layflat). جميع الأسعار بالدرهم الإماراتي وتخضع لعروض حصرية متجددة كعرض خصم ٥٠٪ على الكتاب الثاني (BOGO50).
        </p>
      ) : (
        <p>
          Our storybooks start at 49 AED for Softcover, 79 AED for Classic Hardcover (our bestseller), and 99 AED for Deluxe Layflat. All prices are in UAE Dirhams (AED) and eligible for volume offers such as BOGO50 (50% off your second book).
        </p>
      ),
    },
    {
      id: 'why-splendid-gift',
      heading: isAr ? 'لماذا تُعد هذه الكتب هدايا استثنائية؟' : 'Why are your books such splendid gifts?',
      content: isAr ? (
        <p>
          لأنها ليست مجرد كتب، بل ذكريات حية تُخلد مشاعر المحبة. رؤية الطفل لاسمه وصورته يزرع في نفسه الثقة والشغف بالقراءة، ويصبح الكتاب كنزاً عائلياً تتوارثه الأجيال.
        </p>
      ) : (
        <p>
          Because they are more than books—they are cherished keepsakes. Seeing their name woven into the plot ignites a child’s love of reading, builds emotional confidence, and creates an unforgettable family keepsake that lasts forever.
        </p>
      ),
    },
    {
      id: 'where-based',
      heading: isAr ? 'أين يقع مقرنا وكيف يتم التوصيل في الإمارات؟' : 'Where are you based and how does delivery work?',
      content: isAr ? (
        <p>
          انطلقت حكاياتنا من أبوظبي ودبي في دولة الإمارات العربية المتحدة. نوفر توصيلاً سريعاً خلال ٢٤ إلى ٤٨ ساعة عبر شركات شحن معتمدة إلى كافة إمارات الدولة (أبوظبي، دبي، الشارقة، عجمان، رأس الخيمة، الفجيرة، وأم القيوين).
        </p>
      ) : (
        <p>
          We are founded in the UAE. Physical storybooks are printed and dispatched locally with express courier delivery within 24–48 hours across Abu Dhabi, Dubai, and all 7 Emirates. Digital keepsakes are ready within 5 minutes.
        </p>
      ),
    },
    {
      id: 'how-contact',
      heading: isAr ? 'كيف يمكنني التواصل مع خدمة العملاء؟' : 'How do I contact customer care?',
      content: isAr ? (
        <p>
          فريقنا يسعد دائماً بمساعدتك! يمكنك زيارة{' '}
          <Link href={getLocalizedPath('/faq')} className="text-[#1E5751] font-bold underline">
            صفحة الأسئلة الشائعة
          </Link>
          ، أو مراجعة{' '}
          <Link href={getLocalizedPath('/delivery')} className="text-[#1E5751] font-bold underline">
            معلومات التوصيل
          </Link>
          ، أو التواصل مباشرة عبر الواتساب والبريد الإلكتروني على مدار الساعة.
        </p>
      ) : (
        <p>
          Our concierge support team is always here to help! You can check our{' '}
          <Link href={getLocalizedPath('/faq')} className="text-[#1E5751] font-bold underline">
            Help & FAQ Center
          </Link>
          , review{' '}
          <Link href={getLocalizedPath('/delivery')} className="text-[#1E5751] font-bold underline">
            Delivery Information
          </Link>
          , or reach out to us directly via WhatsApp and email.
        </p>
      ),
    },
  ];

  return (
    <section className="py-14 md:py-20 bg-white border-b border-[var(--color-sharpie-20,#D9D9D7)]" dir={dir}>
      <div className="wb-container max-w-3xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="wb-heading text-2xl sm:text-3xl lg:text-4xl font-black mb-3 text-[var(--color-sharpie,#23231E)]">
            {isAr ? 'حكايات مخصصة وهدايا استثنائية للأطفال' : 'Personalized Books and Gifts'}
          </h2>
          <p className="wb-body text-xs sm:text-sm text-[var(--color-sharpie-80,#555553)]">
            {isAr ? 'كل ما تحتاج لمعرفته حول كتبنا وطريقة تخصيصها وتوصيلها' : 'Everything you need to know about crafting your personalized keepsake'}
          </p>
        </div>

        <Accordion items={items} single={true} className="divide-y divide-[var(--color-sharpie-20,#D9D9D7)]" />
      </div>
    </section>
  );
}
