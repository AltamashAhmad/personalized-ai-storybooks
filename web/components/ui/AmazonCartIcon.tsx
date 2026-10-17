"use client";

import React from "react";

export interface AmazonCartIconProps {
  /** Total number of items in the cart */
  count?: number;
  /** Optional custom CSS classes */
  className?: string;
}

/**
 * AmazonCartIcon - Precision Amazon-Style Vector Shopping Cart Icon.
 *
 * Replicates the world-famous Amazon cart experience:
 * - Contoured wireframe shopping cart chassis with angled push handle
 * - Precision roller wheels
 * - Live item count dynamically centered INSIDE the shopping basket
 * - Bold desert amber (#D97706) indicator when items > 0
 * - 100% SVG vector with mathematical text-anchor centering (zero layout drift across zoom/browsers)
 */
export default function AmazonCartIcon({
  count = 0,
  className = "",
}: AmazonCartIconProps) {
  const hasItems = count > 0;
  const displayCount = count > 99 ? "99+" : count.toString();
  const fontSize = count > 99 ? "10px" : count > 9 ? "11.5px" : "13px";

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group cursor-pointer ${className}`}
      aria-label={`Shopping cart with ${count} items`}
    >
      <svg
        viewBox="0 0 44 36"
        className="w-9 h-8 transition-transform duration-200 group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Amazon-style Cart Frame & Push Handle */}
        <path
          d="M3 5.5H8.5L13.8 23.5H32.5L37 9.5H10"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Lower Structural Axle */}
        <path
          d="M14.5 24L16 27H31.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Left Roller Wheel */}
        <circle cx="17" cy="31" r="2.5" fill="currentColor" />

        {/* Right Roller Wheel */}
        <circle cx="29.5" cy="31" r="2.5" fill="currentColor" />

        {/* Dynamic Centered Count inside the Cart Basket */}
        <text
          x="23.5"
          y="18"
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontWeight: 900,
            fontSize,
          }}
          className={
            hasItems
              ? "fill-[#D97706] font-black transition-colors"
              : "fill-slate-700 font-bold transition-colors"
          }
        >
          {displayCount}
        </text>
      </svg>

      {/* Subtle indicator dot when active */}
      {hasItems && (
        <span
          className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#D97706] rounded-full ring-2 ring-white animate-pulse"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
