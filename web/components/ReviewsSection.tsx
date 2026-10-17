'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle2,
  HelpCircle,
  Camera,
  Maximize2,
} from 'lucide-react';
import Accordion from '@/components/ui/Accordion';
import {
  UNBOXING_REVIEWS,
  UNBOXING_RATINGS_BREAKDOWN,
  PDP_QA_ACCORDION,
  RELATED_STORYBOOKS,
} from '@/config/reviews';
import { PRODUCTS } from '@/config/products';

export interface ReviewsSectionProps {
  isAr: boolean;
  reviewFilter: 'all' | 'photos' | 'hardcover' | 'layflat';
  setReviewFilter: (filter: 'all' | 'photos' | 'hardcover' | 'layflat') => void;
  openFaqId: string | null;
  setOpenFaqId: (id: string | null) => void;
  onPhotoClick: (photoUrl: string) => void;
  currentSlug?: string;
}

/**
 * Star display derived from a numeric score — never a hardcoded string.
 * `openFaqId` below is only an initial seed; the PDP Q&A accordion keeps its own
 * open state via ui/Accordion so it no longer cross-talks with other accordions
 * sharing the parent's state.
 */
function Stars({ score, className }: { score: number; className?: string }) {
  const filled = Math.max(0, Math.min(5, Math.round(score)));
  return (
    <span className={className} role="img" aria-label={`${score} out of 5 stars`}>
      {"★".repeat(filled)}
      {"☆".repeat(5 - filled)}
    </span>
  );
}

export default function ReviewsSection({
  isAr,
  reviewFilter,
  setReviewFilter,
  openFaqId,
  onPhotoClick,
  currentSlug,
}: ReviewsSectionProps) {
  return (
    <>
      {/* Feature 17: Customer Unboxing Reviews with Photo Badges & Ratings Scorecard */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-white rounded-[2px] p-6 sm:p-10 border border-amber-900/10 shadow-sm flex flex-col gap-8">
          {/* Header & Overall Scorecard */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-amber-900/10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] text-xs font-black mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1E5751]" />
                <span>{isAr ? 'تَقْيِيمَاتٌ مُوَثَّقَةٌ مِنْ عَائِلَاتِ الْإِمَارَاتِ' : 'Verified UAE Customer Reviews'}</span>
              </div>
              <h2 className="text-2xl font-black text-slate-950 font-serif">
                {isAr ? 'تَجَارِبُ حَقِيقِيَّةٌ وَصُوَرُ فَتْحِ الصُّنْدُوقِ' : 'Customer Stories & Unboxing Photos'}
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                {isAr ? 'شَارَكَنَا مِئَاتُ الْآبَاءِ وَالْأُمَّهَاتِ لَحَظَاتِ فَرْحَةِ أَطْفَالِهِمْ عِنْدَ اسْتِلَامِ كُتُبِهِمْ' : 'Families across Dubai, Abu Dhabi, and Sharjah share their heartfelt reactions'}
              </p>
            </div>

            {/* Main Scorecard Widget */}
            <div className="p-4 rounded-[2px] bg-[#FDF8F1] border border-amber-900/15 flex items-center gap-5 shrink-0 shadow-xs">
              <div className="text-center">
                <div className="text-3xl font-black text-slate-900 leading-none font-serif">{UNBOXING_RATINGS_BREAKDOWN.overallScore}</div>
                <Stars score={UNBOXING_RATINGS_BREAKDOWN.overallScore} className="flex text-amber-500 text-xs mt-1 justify-center" />
                <div className="text-[10px] text-slate-500 font-bold mt-1">
                  {isAr ? `مِنْ أَصْلِ ٥ (${UNBOXING_RATINGS_BREAKDOWN.totalReviews}+ تَقْيِيمٍ)` : `Out of 5 (${UNBOXING_RATINGS_BREAKDOWN.totalReviews}+ reviews)`}
                </div>
              </div>

              {/* Dimensions Mini Breakdown */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] font-bold border-l rtl:border-l-0 rtl:border-r border-amber-900/15 pl-4 rtl:pl-0 rtl:pr-4">
                {UNBOXING_RATINGS_BREAKDOWN.dimensions.map((dim) => (
                  <div key={dim.id} className="flex items-center justify-between gap-2">
                    <span className="text-slate-600 truncate">{isAr ? dim.labelAr : dim.labelEn}:</span>
                    <span className="text-[#1E5751] font-black">{dim.score.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Verified Customer Photo Reviews Rail */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#1E5751]" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 font-serif">
                  {isAr ? 'مَعْرِضُ صُوَرِ فَتْحِ الصُّنْدُوقِ الْمُوَثَّقَةِ' : 'Verified Customer Unboxing Photo Rail'}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-bold">
                {isAr ? 'انْقُرْ عَلَى أَيِّ صُورَةٍ لِلتَّكْبِيرِ' : 'Click any photo to enlarge'}
              </span>
            </div>
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {UNBOXING_REVIEWS.filter(r => r.verifiedPhotoBadge && r.photoUrl).map((rev) => (
                <button
                  key={`rail-${rev.id}`}
                  type="button"
                  onClick={() => onPhotoClick(rev.photoUrl!)}
                  className="group relative shrink-0 w-36 sm:w-44 aspect-square rounded-[2px] overflow-hidden border-2 border-amber-900/10 hover:border-[#1E5751] transition shadow-xs cursor-pointer text-left rtl:text-right"
                >
                  <Image src={rev.photoUrl!} alt={isAr ? rev.authorAr : rev.authorEn} fill className="object-cover group-hover:scale-105 transition duration-300" sizes="(max-width: 640px) 144px, 176px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-2.5">
                    <Stars score={rev.rating} className="flex items-center gap-1 text-[10px] text-amber-300" />
                    <div className="text-[11px] font-black text-white truncate font-serif">
                      {isAr ? rev.authorAr : rev.authorEn}
                    </div>
                    <div className="text-[9px] text-emerald-300 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>{isAr ? rev.cityAr : rev.cityEn}</span>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 rtl:right-auto rtl:left-2 opacity-0 group-hover:opacity-100 transition bg-slate-950/70 p-1 rounded-[2px] text-white">
                    <Maximize2 className="w-3 h-3" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {([
              { id: 'all' as const, labelEn: 'All Reviews', labelAr: 'جَمِيعُ التَّقْيِيمَاتِ' },
              { id: 'photos' as const, labelEn: 'With Unboxing Photos', labelAr: 'مَعَ صُوَرِ فَتْحِ الصُّنْدُوقِ' },
              { id: 'hardcover' as const, labelEn: 'Hardcover Keepsake (79 AED)', labelAr: 'غِلَافٌ مُقَوًّى (٧٩ د.إ)' },
              { id: 'layflat' as const, labelEn: 'Deluxe Layflat (99 AED)', labelAr: 'طَبْعَةٌ مَلَكِيَّةٌ (٩٩ د.إ)' },
            ]).map((f) => {
              const isSelected = reviewFilter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setReviewFilter(f.id)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-[2px] text-xs font-black transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#1E5751] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isAr ? f.labelAr : f.labelEn}
                </button>
              );
            })}
          </div>

          {/* Reviews List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {UNBOXING_REVIEWS
              .filter((rev) => {
                if (reviewFilter === 'photos') return rev.verifiedPhotoBadge;
                if (reviewFilter === 'hardcover') return rev.format === 'hardcover';
                if (reviewFilter === 'layflat') return rev.format === 'layflat';
                return true;
              })
              .map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-[2px] bg-[#FDF8F1] border border-amber-900/10 flex flex-col justify-between gap-4 shadow-xs"
                >
                  <div className="flex flex-col gap-2.5">
                    {/* Reviewer Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-xs font-black text-slate-900 flex items-center gap-1.5 font-serif">
                          <span>{isAr ? rev.authorAr : rev.authorEn}</span>
                          <span className="text-slate-400 font-normal">•</span>
                          <span className="text-slate-500 font-medium text-[11px] font-sans">{isAr ? rev.cityAr : rev.cityEn}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Stars score={rev.rating} className="flex text-amber-500 text-xs" />
                          <span className="text-[10px] text-slate-400">{isAr ? rev.dateAr : rev.dateEn}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] bg-emerald-100/80 text-emerald-800 text-[10px] font-black">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{isAr ? 'شِرَاءٌ مُوَثَّقٌ' : 'Verified Purchase'}</span>
                        </span>
                        <span className="text-[10px] font-bold text-[#1E5751]">
                          {isAr ? rev.formatNameAr : rev.formatNameEn}
                        </span>
                      </div>
                    </div>

                    {/* Quote */}
                    <p className="text-xs text-slate-700 font-medium leading-relaxed italic">
                      &ldquo;{isAr ? rev.quoteAr : rev.quoteEn}&rdquo;
                    </p>

                    {/* Tags */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {(isAr ? rev.tagsAr : rev.tagsEn).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-[2px] bg-white border border-amber-900/10 text-[10px] font-bold text-slate-600 shadow-2xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Verified Photo Badge & Thumbnail */}
                  {rev.verifiedPhotoBadge && rev.photoUrl && (
                    <div className="pt-3 border-t border-amber-900/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onPhotoClick(rev.photoUrl!)}
                          className="relative w-14 h-14 rounded-[2px] overflow-hidden border-2 border-[#1E5751] hover:opacity-90 transition group shadow-xs shrink-0 cursor-pointer"
                        >
                          <Image src={rev.photoUrl!} alt="Unboxing" fill className="object-cover" sizes="56px" />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition flex items-center justify-center">
                            <Maximize2 className="w-3.5 h-3.5 text-white drop-shadow" />
                          </div>
                        </button>
                        <div>
                          <div className="text-[11px] font-black text-slate-900 flex items-center gap-1 font-serif">
                            <Camera className="w-3.5 h-3.5 text-[#1E5751]" />
                            <span>{isAr ? 'صُورَةُ اسْتِلَامٍ مُوَثَّقَةٌ' : 'Verified Unboxing Photo'}</span>
                          </div>
                          <span className="text-[10px] text-slate-500">
                            {isAr ? 'اُنْقُرْ لِلتَّكْبِيرِ وَالْمُعَايَنَةِ' : 'Click to enlarge and inspect'}
                          </span>
                        </div>
                      </div>
                      <span className="text-[#1E5751] text-xs font-black">✓ {isAr ? 'مُوَثَّقٌ' : 'Verified'}</span>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Feature 17: Interactive PDP Q&A Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-white rounded-[2px] p-6 sm:p-10 border border-amber-900/10 shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#1E5751]" />
            <h2 className="text-2xl font-black text-slate-950 font-serif">
              {isAr ? 'الْأَسْئِلَةُ الْأَكْثَرُ شُيُوعاً حَوْلَ الْقِصَّةِ وَالطِّبَاعَةِ' : 'Frequently Asked Questions (PDP Q&A)'}
            </h2>
          </div>

          <Accordion
            items={PDP_QA_ACCORDION.map((qa) => ({
              id: `pdp-${qa.id}`,
              heading: isAr ? qa.questionAr : qa.questionEn,
              content: <p>{isAr ? qa.answerAr : qa.answerEn}</p>,
            }))}
            single
            defaultOpenId={
              openFaqId && PDP_QA_ACCORDION.some((qa) => qa.id === openFaqId)
                ? `pdp-${openFaqId}`
                : undefined
            }
          />
        </div>
      </section>

      {/* Feature 17: Related Recommendations Rail (3 Books excluding current) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-white rounded-[2px] p-6 sm:p-10 border border-amber-900/10 shadow-sm flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#1E5751] block mb-1">
                {isAr ? 'اِكْتَشِفِ الْمَزِيدَ مِنَ الْمُغَامَرَاتِ' : 'Complete The Collection'}
              </span>
              <h2 className="text-2xl font-black text-slate-950 font-serif">
                {isAr ? 'قد يعجبك أيضاً' : 'You may also like'}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {(currentSlug
              ? PRODUCTS.filter((p) => p.slug !== currentSlug).slice(0, 3)
              : PRODUCTS.slice(0, 3)
            ).map((book) => (
              <div
                key={book.slug}
                className="group rounded-[2px] border border-amber-900/10 overflow-hidden bg-white hover:border-[#1E5751] hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={book.coverImage}
                    alt={isAr ? book.titleAr : book.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-sm text-amber-400 text-[10px] font-black px-2.5 py-1 rounded-[2px] uppercase tracking-wider">
                    {isAr ? 'الْأَكْثَرُ طَلَباً' : 'Bestseller'}
                  </span>
                </div>

                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <div className="text-[10px] font-bold text-[#1E5751] mb-1">{book.ageRange}</div>
                    <h3 className="text-sm font-black text-slate-900 line-clamp-1 group-hover:text-[#1E5751] transition font-serif">
                      {isAr ? book.titleAr : book.title}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">{isAr ? 'يَبْدَأُ مِنْ' : 'From'}</span>
                      <span className="text-xs font-black text-slate-900">49 AED</span>
                    </div>
                    <Link
                      href={isAr ? `/ar/books/${book.slug}` : `/books/${book.slug}`}
                      className="px-3 py-1.5 rounded-[2px] bg-[#1E5751] hover:bg-[#16433e] text-white font-black text-xs transition shadow-xs cursor-pointer"
                    >
                      {isAr ? 'تَخْصِيصٌ' : 'Personalize'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
