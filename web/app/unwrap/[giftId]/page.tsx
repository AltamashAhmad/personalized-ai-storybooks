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
    title: "You Have Received a Magical Storybook Gift!",
    description: "Untie the ribbon to unwrap your personalized children's storybook keepsake. Interactive 3D flipbook featuring your child as the hero. Made in UAE.",
    openGraph: {
      title: "🎁 A Special Storybook Gift For You!",
      description: "Tap to untie the ribbon and read your child's personalized 3D storybook keepsake.",
      url: `https://personalizedtales.com/unwrap/${giftId}`,
      type: "website",
    },
  };
}

export default async function UnwrapPage({ params }: UnwrapPageProps) {
  const { giftId } = await params;
  return <DigitalUnwrappingView initialLang="en" giftId={giftId} />;
}
