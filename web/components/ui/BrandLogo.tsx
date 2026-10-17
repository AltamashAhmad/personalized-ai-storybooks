"use client";

import React, { useId } from "react";
import Link from "next/link";

export interface BrandLogoProps {
  /** Variant of the logo to render */
  variant?: "full" | "mark" | "wordmark";
  /** Size preset */
  size?: "sm" | "md" | "lg";
  /** Whether Arabic locale is active */
  isAr?: boolean;
  /** Optional link destination (defaults to "/" or "/ar") */
  href?: string;
  /** Optional custom CSS classes */
  className?: string;
}

/**
 * BrandLogo - Precision Vector SVG Logo for PersonalizedTales UAE.
 *
 * Inspired by the royal heirloom aesthetic:
 * - 3-peak royal crown silhouette
 * - Open heirloom storybook spread in the crown base
 * - Golden starlight sparkle atop the central peak
 * - Rich Arabian forest green (#1E5751) and desert amber gold (#D97706 / #F59E0B)
 * - 100% vector SVG: zero pixelation on Retina/OLED displays, 0ms FCP, 0 CLS
 */
export default function BrandLogo({
  variant = "full",
  size = "md",
  isAr = false,
  href,
  className = "",
}: BrandLogoProps) {
  // Dimensions based on size preset (responsive for mobile)
  const dimensions = {
    sm: { markSize: 24, textClass: "text-base sm:text-lg", subClass: "text-[8px]" },
    md: { markSize: 32, textClass: "text-lg sm:text-2xl", subClass: "hidden sm:block text-[10px]" },
    lg: { markSize: 44, textClass: "text-2xl sm:text-3xl", subClass: "text-xs" },
  }[size];

  const targetHref = href !== undefined ? href : isAr ? "/ar" : "/";

  // Unique SVG gradient/filter IDs per instance so multiple logos on one page never collide.
  const uid = useId().replace(/:/g, "");
  const greenGradId = `ptGreenGrad-${uid}`;
  const goldGradId = `ptGoldGrad-${uid}`;
  const glowId = `ptGlow-${uid}`;

  // Vector Emblem: Crown + Open Storybook + Star Sparkle
  const Emblem = (
    <svg
      width={dimensions.markSize}
      height={dimensions.markSize}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      aria-hidden="true"
    >
      <defs>
        {/* Emerald Forest Green Gradient */}
        <linearGradient id={greenGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E5751" />
          <stop offset="100%" stopColor="#133834" />
        </linearGradient>

        {/* Royal Desert Gold Gradient */}
        <linearGradient id={goldGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Soft Drop Shadow Filter */}
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#1E5751" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Background Badge Contour (Crown silhouette fused with open book) */}
      <path
        d="M6 46C6 46 10 24 10 22C10 20 12 19 14 20L22 28L30 14C31 12 33 12 34 14L42 28L50 20C52 19 54 20 54 22C54 24 58 46 58 46C58 50 48 53 32 53C16 53 6 50 6 46Z"
        fill={`url(#${greenGradId})`}
        filter={`url(#${glowId})`}
      />

      {/* Open Storybook Pages at Crown Base */}
      {/* Left Page Spread */}
      <path
        d="M13 44C19 42 26 43 31 47C31 41 24 37 14 38L13 44Z"
        fill="white"
        fillOpacity="0.95"
      />
      {/* Right Page Spread */}
      <path
        d="M51 44C45 42 38 43 33 47C33 41 40 37 50 38L51 44Z"
        fill="white"
        fillOpacity="0.95"
      />
      {/* Storybook Spine Centerline */}
      <path
        d="M32 40V49"
        stroke="#E5A93C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Royal 4-Point Golden Star Sparkle on Center Peak */}
      <path
        d="M32 5L33.5 10L38.5 11.5L33.5 13L32 18L30.5 13L25.5 11.5L30.5 10L32 5Z"
        fill={`url(#${goldGradId})`}
      />

      {/* Subtle Star Accents on Left and Right Peaks */}
      <circle cx="13" cy="20" r="1.75" fill={`url(#${goldGradId})`} />
      <circle cx="51" cy="20" r="1.75" fill={`url(#${goldGradId})`} />
    </svg>
  );

  // Wordmark: English or Arabic
  const Wordmark = (
    <div className="flex flex-col justify-center select-none">
      {isAr ? (
        <>
          <div className={`font-black ${dimensions.textClass} tracking-tight text-[#1E5751] font-serif leading-none`}>
            حكايات<span className="text-[#D97706]">مخصصة</span>
          </div>
          <span className={`${dimensions.subClass} text-slate-500 font-bold tracking-wider mt-0.5`}>
            كتب تذكارية فاخرة للأطفال
          </span>
        </>
      ) : (
        <>
          <div className={`font-black ${dimensions.textClass} tracking-tight text-[#1E5751] font-serif leading-none`}>
            Personalized<span className="text-[#D97706]">Tales</span>
          </div>
          <span className={`${dimensions.subClass} text-slate-500 font-bold uppercase tracking-widest mt-0.5`}>
            Heirloom Children&apos;s Books
          </span>
        </>
      )}
    </div>
  );

  const content = (
    <div
      className={`inline-flex items-center gap-2.5 group cursor-pointer ${className}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      {(variant === "full" || variant === "mark") && Emblem}
      {(variant === "full" || variant === "wordmark") && Wordmark}
    </div>
  );

  if (targetHref) {
    return (
      <Link
        href={targetHref}
        aria-label={isAr ? "حكايات مخصصة - الصفحة الرئيسية" : "PersonalizedTales Home"}
        className="inline-flex items-center group"
      >
        {content}
      </Link>
    );
  }

  return null;
}
