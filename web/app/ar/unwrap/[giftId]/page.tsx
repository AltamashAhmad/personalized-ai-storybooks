import React from "react";
import type { Metadata } from "next";
import DigitalUnwrappingView from "@/components/DigitalUnwrappingView";

interface UnwrapPageProps {
  params: Promise<{
    giftId: string;
  }>;
}

export async function generateStaticParams() {
  return [
    { giftId: "demo" },
    { giftId: "welcome" },
    { giftId: "eid-gift" },
    { giftId: "birthday-gift" },
  ];
}

export async function generateMetadata({ params }: UnwrapPageProps): Promise<Metadata> {
  const { giftId } = await params;

  return {
    title: "وصلتك هدية قصة سحرية مخصصة!",
    description: "اضغط لفك الشريط وفتح هديتك التذكارية السحرية. قصة تفاعلية ثلاثية الأبعاد يظهر فيها طفلك كبطل المغامرة. صُنعت بكل حب في الإمارات.",
    openGraph: {
      title: "🎁 مفاجأة خاصة! وصلتك هدية قصة مخصصة لطفلك",
      description: "اضغط لفك الشريط وتصفح القصة التفاعلية ثلاثية الأبعاد الآن.",
      url: `https://personalizedtales.com/ar/unwrap/${giftId}`,
      type: "website",
    },
  };
}

export default async function ArabicUnwrapPage({ params }: UnwrapPageProps) {
  const { giftId } = await params;
  return <DigitalUnwrappingView initialLang="ar" giftId={giftId} />;
}
