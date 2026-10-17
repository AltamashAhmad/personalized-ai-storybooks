import Link from "next/link";

/**
 * Branded 404 page. Bilingual (English primary, Arabic secondary) so it
 * serves both / and /ar routes without needing locale detection.
 */
export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FDF8F1] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="font-serif font-black text-7xl text-[#1E5751]">404</p>
        <h1 className="mt-4 font-serif font-black text-2xl text-[#23231E]">
          This page wandered off the story trail
        </h1>
        <p className="mt-2 text-sm text-slate-600" dir="rtl" lang="ar">
          عذراً، هذه الصفحة غير موجودة. لنعد إلى بداية الحكاية.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center bg-[#1E5751] hover:bg-[#16433e] text-white text-sm font-bold px-6 py-3 rounded-[2px] transition"
          >
            Back to Home
          </Link>
          <Link
            href="/ar"
            className="inline-flex items-center border border-[#1E5751]/40 text-[#1E5751] text-sm font-bold px-6 py-3 rounded-[2px] hover:bg-[#1E5751]/5 transition"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </main>
  );
}
