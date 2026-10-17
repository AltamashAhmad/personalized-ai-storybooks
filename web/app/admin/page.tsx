'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdminGate from './AdminGate';
import {
  Sparkles,
  CheckCircle2,
  Eye,
  Settings2,
  Clock,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Gift,
  BookOpen,
  Power,
  Tag,
  Copy,
} from 'lucide-react';
import { usePromotions } from '@/lib/hooks/usePromotions';

function AdminDashboardPage() {
  const {
    settings,
    isMounted,
    activeOffer,
    isBannerActive,
    toggleBanner,
    selectOffer,
    updateOffer,
    resetToDefault,
  } = usePromotions();

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [saveToast, setSaveToast] = useState(false);

  // Custom offer editing state
  const customOffer = settings.offers.find((o) => o.id === 'custom');
  const [customTitleEn, setCustomTitleEn] = useState(customOffer?.titleEn || '');
  const [customTitleAr, setCustomTitleAr] = useState(customOffer?.titleAr || '');
  const [customCode, setCustomCode] = useState(customOffer?.code || 'SPECIAL10');
  const [customBadge, setCustomBadge] = useState(customOffer?.badge || 'OFFER');
  const [customShowCountdown, setCustomShowCountdown] = useState(customOffer?.showCountdown || false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    updateOffer('custom', {
      code: customCode.trim().toUpperCase(),
      badge: customBadge.trim().toUpperCase(),
      titleEn: customTitleEn.trim(),
      titleAr: customTitleAr.trim(),
      showCountdown: customShowCountdown,
    });
    triggerToast();
  };

  const triggerToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24">
      {/* Top Admin Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-black shadow-lg">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white">
                  PersonalizedTales Admin
                </h1>
                <span className="text-[10px] uppercase font-black tracking-widest bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Google Standards
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Live Storefront Promotions, Campaign Controller & Operations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/qa"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Editorial QA Workstation</span>
            </Link>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open Storefront</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Banner Status Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">
                  Top Announcement Bar & Promotion Controller
                </h2>
                {isMounted && (
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      isBannerActive
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isBannerActive ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
                      }`}
                    />
                    {isBannerActive ? 'Active on Storefront' : 'Disabled (Hidden on Site)'}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Dynamically display new customer offers, BOGO50, or disable the banner completely.
              </p>
            </div>

            {/* Master Toggle */}
            <button
              type="button"
              onClick={() => {
                toggleBanner();
                triggerToast();
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-xs transition shadow-md cursor-pointer ${
                isBannerActive
                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <Power className="w-4 h-4" />
              <span>{isBannerActive ? 'Turn Banner OFF' : 'Turn Banner ON'}</span>
            </button>
          </div>

          {/* Live Storefront Preview Section */}
          <div className="py-6 border-b border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-amber-400" />
                Live Banner Preview (Exact Storefront Appearance)
              </span>
              <span>{isBannerActive ? '🟢 Currently Rendering' : '🔴 Currently Hidden'}</span>
            </div>

            {isBannerActive ? (
              <div className="space-y-2">
                {/* English Preview */}
                <div className="bg-[#1E5751] text-white text-xs font-bold py-2.5 px-4 rounded-2xl shadow-inner flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-sm">🇦🇪</span>
                    <span className="text-amber-200 font-bold truncate">
                      {activeOffer.showCountdown && (
                        <Clock className="w-3.5 h-3.5 text-amber-300 inline mr-1 animate-pulse" />
                      )}
                      {activeOffer.titleEn}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="bg-[#FFD15A] text-[#23231E] px-2.5 py-0.5 rounded-full font-mono font-extrabold text-[11px]">
                      {activeOffer.badge}
                    </span>
                    <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-[10px]">
                      العربية 🌐
                    </span>
                  </div>
                </div>

                {/* Arabic RTL Preview */}
                <div
                  className="bg-[#1E5751] text-white text-xs font-bold py-2.5 px-4 rounded-2xl shadow-inner flex items-center justify-between gap-3"
                  dir="rtl"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-sm">🇦🇪</span>
                    <span className="text-amber-200 font-bold truncate">
                      {activeOffer.showCountdown && (
                        <Clock className="w-3.5 h-3.5 text-amber-300 inline ml-1 animate-pulse" />
                      )}
                      {activeOffer.titleAr}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="bg-[#FFD15A] text-[#23231E] px-2.5 py-0.5 rounded-full font-mono font-extrabold text-[11px]">
                      {activeOffer.code}
                    </span>
                    <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-[10px]">
                      English 🌐
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-500 font-bold">
                Announcement banner is turned OFF. The storefront header renders clean with no top banner.
              </div>
            )}
          </div>

          {/* Offer Selection Cards */}
          <div className="pt-6 space-y-4">
            <h3 className="text-xs uppercase font-black tracking-wider text-slate-400 flex items-center gap-2">
              <Gift className="w-4 h-4 text-amber-400" />
              Select Active Offer
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Option 1: 10% Off New Account */}
              <div
                onClick={() => {
                  selectOffer('welcome10');
                  triggerToast();
                }}
                className={`p-5 rounded-2xl border transition cursor-pointer relative ${
                  settings.activeOfferId === 'welcome10'
                    ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {settings.activeOfferId === 'welcome10' && (
                  <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 p-1 rounded-full text-[10px] font-black">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-amber-500/20 text-amber-400 font-mono font-black text-xs px-2 py-0.5 rounded-lg border border-amber-500/30">
                    WELCOME10
                  </span>
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    10% OFF
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white mb-1">
                  New Customer Welcome Offer
                </h4>
                <p className="text-xs text-slate-400 mb-3">
                  Gives 10% discount on first order when user creates a new account.
                </p>
                <div className="text-[11px] text-amber-300 font-semibold bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  &quot;✨ Create an account & get 10% OFF your first order • Code: WELCOME10&quot;
                </div>
              </div>

              {/* Option 2: 50% Off 2nd Book (BOGO50) */}
              <div
                onClick={() => {
                  selectOffer('bogo50');
                  triggerToast();
                }}
                className={`p-5 rounded-2xl border transition cursor-pointer relative ${
                  settings.activeOfferId === 'bogo50'
                    ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {settings.activeOfferId === 'bogo50' && (
                  <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 p-1 rounded-full text-[10px] font-black">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-amber-500/20 text-amber-400 font-mono font-black text-xs px-2 py-0.5 rounded-lg border border-amber-500/30">
                    BOGO50
                  </span>
                  <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                    50% ON 2ND BOOK
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white mb-1">
                  Account Sign-Up BOGO Special
                </h4>
                <p className="text-xs text-slate-400 mb-3">
                  Encourages buying 2+ books with 50% off second book + live countdown.
                </p>
                <div className="text-[11px] text-amber-300 font-semibold bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  &quot;✨ Sign up & get 50% OFF your 2nd book with code BOGO50&quot;
                </div>
              </div>

              {/* Option 3: Custom Campaign */}
              <div
                onClick={() => {
                  selectOffer('custom');
                  triggerToast();
                }}
                className={`p-5 rounded-2xl border transition cursor-pointer relative ${
                  settings.activeOfferId === 'custom'
                    ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {settings.activeOfferId === 'custom' && (
                  <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 p-1 rounded-full text-[10px] font-black">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-slate-800 text-slate-300 font-mono font-black text-xs px-2 py-0.5 rounded-lg border border-slate-700">
                    {customCode || 'CUSTOM'}
                  </span>
                  <span className="text-[11px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">
                    CUSTOM
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white mb-1">
                  Custom Campaign
                </h4>
                <p className="text-xs text-slate-400 mb-3">
                  Specify your own promo code, copy, and countdown settings.
                </p>
                <div className="text-[11px] text-slate-300 font-semibold bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 truncate">
                  &quot;{customTitleEn || 'Custom offer headline'}&quot;
                </div>
              </div>
            </div>

            {/* Custom Campaign Form (expanded if custom is selected) */}
            {settings.activeOfferId === 'custom' && (
              <form
                onSubmit={handleSaveCustom}
                className="mt-4 p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4"
              >
                <div className="font-bold text-xs text-slate-300 uppercase tracking-wider">
                  Configure Custom Campaign
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Coupon Code</label>
                    <input
                      type="text"
                      value={customCode}
                      onChange={(e) => setCustomCode(e.target.value)}
                      placeholder="e.g. EID15"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={customBadge}
                      onChange={(e) => setCustomBadge(e.target.value)}
                      placeholder="e.g. 15% OFF"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">English Message</label>
                    <input
                      type="text"
                      value={customTitleEn}
                      onChange={(e) => setCustomTitleEn(e.target.value)}
                      placeholder="✨ Special Eid Offer: 15% off with code EID15"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Arabic Message (مع التشكيل)</label>
                    <input
                      type="text"
                      value={customTitleAr}
                      onChange={(e) => setCustomTitleAr(e.target.value)}
                      placeholder="✨ عرض العيد الخاص: خصم ١٥٪ مع كود EID15"
                      dir="rtl"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customShowCountdown}
                      onChange={(e) => setCustomShowCountdown(e.target.checked)}
                      className="rounded accent-amber-500 w-4 h-4"
                    />
                    <span>Show Live Countdown Clock</span>
                  </label>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition shadow-sm cursor-pointer"
                  >
                    Save Custom Campaign
                  </button>
                </div>
              </form>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => {
                  resetToDefault();
                  triggerToast();
                }}
                className="flex items-center gap-1.5 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset to Factory Defaults</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-slate-400">Current Code:</span>
                <span className="font-mono font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/30">
                  {activeOffer.code}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(activeOffer.code)}
                  className="p-1 text-slate-400 hover:text-white transition"
                  title="Copy code"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                {copiedCode && <span className="text-emerald-400 text-[10px]">Copied!</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Operational Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base text-white">Editorial QA Workstation</h3>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                Tashkeel Certified
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Audit children&apos;s story spreads, verify Arabic Tashkeel diacritics accuracy, and inspect AI image generation prompts.
            </p>
            <div className="pt-2">
              <Link
                href="/admin/qa"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition"
              >
                <span>Launch QA Workstation</span>
                <span>➔</span>
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-white">Storybook Catalog</h3>
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-bold">
                6 Keepsake Titles
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Heirloom catalog across 0-3, 3-6, 6-9, and 9-12 age groups, calibrated for 7 Emirates delivery with 300 DPI print output.
            </p>
            <div className="pt-2">
              <Link
                href="/#catalog"
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition"
              >
                <span>View Storefront Catalog</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Save Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 bg-emerald-600 text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-bottom-3 duration-200 z-50">
          <CheckCircle2 className="w-4 h-4" />
          <span>Promotion settings updated live on storefront!</span>
        </div>
      )}
    </div>
  );
}

export default function GatedAdminDashboardPage() {
  return (
    <AdminGate>
      <AdminDashboardPage />
    </AdminGate>
  );
}
