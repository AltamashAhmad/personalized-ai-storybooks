"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Branded route error boundary with a retry action. Bilingual so it serves
 * both / and /ar routes.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("PersonalizedTales route error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#FDF8F1] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="font-serif font-black text-6xl text-[#1E5751]" aria-hidden="true">
          ✦
        </p>
        <h1 className="mt-4 font-serif font-black text-2xl text-[#23231E]">
          Something interrupted the story
        </h1>
        <p className="mt-2 text-sm text-slate-600" dir="rtl" lang="ar">
          حدث خطأ غير متوقع. حاول مرة أخرى أو عد إلى الصفحة الرئيسية.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center bg-[#1E5751] hover:bg-[#16433e] text-white text-sm font-bold px-6 py-3 rounded-[2px] transition cursor-pointer"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center border border-[#1E5751]/40 text-[#1E5751] text-sm font-bold px-6 py-3 rounded-[2px] hover:bg-[#1E5751]/5 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
