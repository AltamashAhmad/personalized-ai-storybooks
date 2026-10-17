"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { ProductStory } from "@/config/products";
import { isComingSoon } from "@/config/comingSoon";
import { useCountry } from "@/lib/context/CountryContext";

interface ProductCardProps {
  product: ProductStory;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { formatPrice, language, dir } = useCountry();
  const isAr = language === "ar";
  // Products with no dedicated manuscript yet: visible teaser, but nothing
  // purchasable (see web/config/comingSoon.ts).
  const comingSoon = isComingSoon(product.slug);

  const bookHref = isAr ? `/ar/books/${product.slug}` : `/books/${product.slug}`;
  const createHref = isAr
    ? `/ar/create/start?book=${encodeURIComponent(product.slug)}`
    : `/create/start?book=${encodeURIComponent(product.slug)}`;

  return (
    <div
      className="group flex flex-col bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      dir={dir}
    >
      {/* Cover Image Container */}
      <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
        {product.badge && (
          <div className={`absolute top-3 ${isAr ? "right-3" : "left-3"} z-10 bg-slate-900/90 backdrop-blur-md text-amber-400 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow`}>
            {product.badge}
          </div>
        )}
        <div className={`absolute top-3 ${isAr ? "left-3" : "right-3"} z-10 bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-sm`}>
          {product.ageRange}
        </div>
        {comingSoon && (
          <div className={`absolute bottom-3 ${isAr ? "right-3" : "left-3"} z-10 bg-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow`}>
            {isAr ? "قريباً" : "Coming Soon"}
          </div>
        )}

        {/* Product Visual */}
        <Link href={bookHref} className="w-full h-full block relative overflow-hidden">
          <img
            src={product.coverImage}
            alt={isAr ? product.titleAr : product.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
          {comingSoon ? (
            <Link
              href={bookHref}
              className="w-full bg-white/90 hover:bg-white text-slate-950 font-black text-center py-2.5 rounded-xl text-xs shadow-lg transition pointer-events-auto flex items-center justify-center gap-1.5"
            >
              <span>{isAr ? "عرض القصة" : "View Story"}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isAr ? "rotate-180" : ""}`} />
            </Link>
          ) : (
            <Link
              href={createHref}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-center py-2.5 rounded-xl text-xs shadow-lg transition pointer-events-auto flex items-center justify-center gap-1.5"
            >
              <span>{isAr ? "تخصيص فوري" : "Quick Personalize"}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isAr ? "rotate-180" : ""}`} />
            </Link>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex text-amber-400" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <span className="text-xs font-black text-slate-900">{product.rating.toFixed(1)}</span>
            <span className="text-[11px] text-slate-400 font-medium">({product.reviewCount})</span>
          </div>

          {/* Title */}
          <Link href={bookHref}>
            <h3 className="font-extrabold text-base text-slate-950 leading-snug group-hover:text-amber-600 transition">
              {isAr ? product.titleAr : product.title}
            </h3>
          </Link>

          {/* Secondary Title */}
          <div className="text-xs text-amber-700 font-bold mt-0.5">
            {isAr ? product.title : product.titleAr}
          </div>

          {/* Subtitle / Pitch */}
          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
            {isAr ? product.subtitleAr : product.subtitle}
          </p>
        </div>

        {/* Card Footer: Price & CTA */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-extrabold block">
              {isAr ? "ابتداءً من" : "Starting from"}
            </span>
            <span className="text-base font-black text-slate-950">
              {formatPrice()}
            </span>
          </div>

          {comingSoon ? (
            <span
              aria-disabled="true"
              className="bg-slate-200 text-slate-500 font-black text-xs px-4 py-2 rounded-xl cursor-not-allowed flex items-center gap-1.5"
            >
              {isAr ? "قريباً" : "Coming Soon"}
            </span>
          ) : (
            <Link
              href={createHref}
              className="bg-slate-950 group-hover:bg-amber-500 text-white group-hover:text-slate-950 font-black text-xs px-4 py-2 rounded-xl transition shadow-sm flex items-center gap-1.5"
            >
              <span>{isAr ? "تخصيص" : "Personalize"}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isAr ? "rotate-180" : ""}`} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
