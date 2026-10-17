"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Baby,
  BookOpen,
  Check,
  Compass,
  Gift,
  Heart,
  RotateCcw,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import StoreHeader from "@/components/StoreHeader";
import { PRODUCTS, ProductStory } from "@/config/products";
import { useCountry } from "@/lib/context/CountryContext";

export default function GiftFinderView({ initialLang }: { initialLang?: "en" | "ar" }) {
  const { country, language } = useCountry();
  const currentLang = initialLang || language;
  const isAr = currentLang === "ar";
  const currentDir = isAr ? "rtl" : "ltr";

  // Step state (1: Recipient, 2: Age, 3: Occasion/Theme, 4: Results)
  const [step, setStep] = useState<number>(1);
  const [recipient, setRecipient] = useState<string>("child");
  const [ageRange, setAgeRange] = useState<string>("3-6");
  const [theme, setTheme] = useState<string>("adventure");
  const [childName, setChildName] = useState<string>("");

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));
  const restart = () => {
    setStep(1);
    setRecipient("child");
    setAgeRange("3-6");
    setTheme("adventure");
    setChildName("");
  };

  // Recommendation engine — resolves slugs to products, dropping any that
  // don't resolve instead of falling back to unrelated books. `starlit-dunes`
  // is the flagship's real slug (verified purchasable in config/comingSoon).
  const getRecommendations = (): ProductStory[] => {
    const picks = (slugs: string[]): ProductStory[] =>
      slugs
        .map((slug) => PRODUCTS.find((p) => p.slug === slug))
        .filter((p): p is ProductStory => !!p);
    if (ageRange === "0-1" || theme === "newborn") {
      return picks(["when-you-were-born-miracle-keepsake", "starlit-dunes"]);
    }
    if (theme === "heritage" || theme === "adventure") {
      return picks(["the-child-who-found-the-golden-falcon", "starlit-dunes"]);
    }
    if (theme === "bedtime") {
      return picks(["starlit-dunes", "when-you-were-born-miracle-keepsake"]);
    }
    return PRODUCTS.slice(0, 3);
  };

  const results = getRecommendations();
  const effectiveName = childName.trim() || (isAr ? "زايد" : "Zayed");

  return (
    <div className={`min-h-screen bg-[#FDF8F1] text-[#23231E] flex flex-col selection:bg-amber-200 ${isAr ? "font-serif" : "font-sans"}`} dir={currentDir}>
      <StoreHeader />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 md:py-16 w-full">
        {/* Breadcrumb */}
        <div className="text-xs font-bold text-slate-500 mb-6 flex items-center gap-2">
          <Link href={isAr ? "/ar" : "/"} className="hover:text-[#1E5751] transition">
            {isAr ? "الرئيسية" : "Home"}
          </Link>
          <span>/</span>
          <span className="text-[#23231E]">{isAr ? "مساعد اختيار الهدية" : "Gift Finder"}</span>
        </div>

        {/* Header Badge & Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-800 text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{isAr ? "مستشار الكتب الذكي في الإمارات" : "UAE Gift & Story Advisor"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#23231E] tracking-tight mb-3">
            {isAr ? "اعثر على الهدية التذكارية المثالية" : "Find the Perfect Magical Storybook"}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            {isAr
              ? "أجب عن ٣ أسئلة بسيطة وسنساعدك في اختيار القصة الأنسب لطفلك وعمره واهتماماته."
              : "Answer 3 quick questions and our story engine will find the most magical personalized book for your child."}
          </p>

          {/* Stepper Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  step === s
                    ? "w-8 bg-amber-500"
                    : step > s
                    ? "w-2 bg-emerald-600"
                    : "w-2 bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Container Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md">
          {/* STEP 1: RECIPIENT */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-black text-amber-600 uppercase tracking-wider block mb-1">
                  {isAr ? "الخطوة الأولى من ٣" : "Step 1 of 3"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#23231E]">
                  {isAr ? "لمن تصنع هذه الهدية التذكارية؟" : "Who are you creating this keepsake for?"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {isAr ? "اختر صلة القرابة بالطفل المحظوظ" : "Select your relationship to the lucky child"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    id: "child",
                    icon: Heart,
                    labelEn: "My Son or Daughter",
                    labelAr: "ابني أو ابنتي",
                    descEn: "A loving keepsake to cherish every bedtime",
                    descAr: "هدية حب وعناية لكل قراءة قبل النوم",
                  },
                  {
                    id: "grandchild",
                    icon: Star,
                    labelEn: "My Grandchild",
                    labelAr: "حفيدي أو حفيدتي",
                    descEn: "Heirloom memory from loving grandparents",
                    descAr: "ذكرى عائلية غالية من الجد والجدة",
                  },
                  {
                    id: "siblings",
                    icon: Users,
                    labelEn: "Siblings or Twins",
                    labelAr: "إخوة أو توأم",
                    descEn: "Celebrating brotherhood and sisterhood",
                    descAr: "احتفال برابطة الأخوة والمشاركة",
                  },
                  {
                    id: "nephew_niece",
                    icon: Gift,
                    labelEn: "Niece, Nephew, or Friend",
                    labelAr: "ابن الأخ/الأخت أو صديق العائلة",
                    descEn: "The unforgettable birthday or milestone gift",
                    descAr: "هدية عيد ميلاد استثنائية لا تُنسى",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = recipient === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setRecipient(item.id)}
                      className={`p-5 rounded-2xl border-2 text-left rtl:text-right transition flex items-start gap-4 cursor-pointer ${
                        isSelected
                          ? "border-amber-500 bg-amber-50/50 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? "bg-amber-500 text-slate-950" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="font-black text-base text-[#23231E]">
                          {isAr ? item.labelAr : item.labelEn}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {isAr ? item.descAr : item.descEn}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-[#23231E] hover:bg-black text-white font-black px-8 py-3.5 rounded-xl text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <span>{isAr ? "التالي: اختيار العمر" : "Next: Choose Age"}</span>
                  {currentDir === "rtl" ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: AGE */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-black text-amber-600 uppercase tracking-wider block mb-1">
                  {isAr ? "الخطوة الثانية من ٣" : "Step 2 of 3"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#23231E]">
                  {isAr ? "كم يبلغ عمر الطفل؟" : "How old is the child?"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {isAr ? "يضمن تخصيص مستوى القراءة ومفردات القصة لتناسب مرحلته" : "Ensures vocabulary and rhyme meter match their developmental stage"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    id: "0-1",
                    labelEn: "0–1 Years",
                    labelAr: "٠–١ سنة (مواليد)",
                    subEn: "Sensory & Miracle Keepsake",
                    subAr: "هدية استقبال ومولود مبارك",
                    icon: Baby,
                  },
                  {
                    id: "1-3",
                    labelEn: "1–3 Years",
                    labelAr: "١–٣ سنوات (براعم)",
                    subEn: "First Words & Rhymes",
                    subAr: "كلمات أولى وقوافي ممتعة",
                    icon: BookOpen,
                  },
                  {
                    id: "3-6",
                    labelEn: "3–6 Years",
                    labelAr: "٣–٦ سنوات (أبطال)",
                    subEn: "Bedtime & Desert Magic",
                    subAr: "مغامرات وقصص قبل النوم",
                    icon: Compass,
                  },
                  {
                    id: "6-9",
                    labelEn: "6–9 Years",
                    labelAr: "٦–٩ سنوات (قراء)",
                    subEn: "Heritage & Falcon Quests",
                    subAr: "فروسية، صقور، وثقة بالنفس",
                    icon: Star,
                  },
                  {
                    id: "all-ages",
                    labelEn: "All Ages / Family",
                    labelAr: "لكل الأعمار / العائلة",
                    subEn: "Treasured Milestone Book",
                    subAr: "كتاب تذكاري للعائلة بأكملها",
                    icon: Heart,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = ageRange === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setAgeRange(item.id)}
                      className={`p-5 rounded-2xl border-2 text-center transition flex flex-col items-center gap-2 cursor-pointer ${
                        isSelected
                          ? "border-amber-500 bg-amber-50/50 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isSelected ? "bg-amber-500 text-slate-950" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="font-black text-base text-[#23231E]">
                        {isAr ? item.labelAr : item.labelEn}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {isAr ? item.subAr : item.subEn}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 transition flex items-center gap-1 cursor-pointer"
                >
                  {currentDir === "rtl" ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                  <span>{isAr ? "رجوع" : "Back"}</span>
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-[#23231E] hover:bg-black text-white font-black px-8 py-3.5 rounded-xl text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <span>{isAr ? "التالي: اختيار المغامرة" : "Next: Choose Theme"}</span>
                  {currentDir === "rtl" ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: THEME & OCCASION */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-black text-amber-600 uppercase tracking-wider block mb-1">
                  {isAr ? "الخطوة الثالثة من ٣" : "Step 3 of 3"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#23231E]">
                  {isAr ? "ما هي المناسبة أو المغامرة المفضلة؟" : "What is the magical occasion or theme?"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {isAr ? "اختر موضوع القصة المناسب لإسعاد طفلك" : "Select what sparks their imagination"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    id: "adventure",
                    titleEn: "Arabian Desert & Golden Falcon",
                    titleAr: "مغامرة الصقر الذهبي والصحراء",
                    descEn: "Courage, heritage, and kindness across UAE dunes",
                    descAr: "الشجاعة والفروسية والتراث الإماراتي الأصيل",
                    badge: "Best Seller",
                  },
                  {
                    id: "bedtime",
                    titleEn: "Starlit Dunes & Cosmic Discovery",
                    titleAr: "سر الكثبان المضيئة بالنجوم",
                    descEn: "Gentle lullaby story for dreamy bedtimes",
                    descAr: "قصة هادئة ورقيقة لنوم هانئ وأحلام ساحرة",
                    badge: "Bedtime",
                  },
                  {
                    id: "newborn",
                    titleEn: "When You Were Born: Miracle Keepsake",
                    titleAr: "حين وُلدت: رحلة المعجزة",
                    descEn: "Tender birth keepsake for new parents and aqiqah",
                    descAr: "توثيق ميلاد المولود وتفاصيل قدومه المبارك",
                    badge: "New Baby",
                  },
                  {
                    id: "birthday",
                    titleEn: "The Greatest Birthday Adventure",
                    titleAr: "مغامرة عيد الميلاد الكبرى",
                    descEn: "Celebrating another year of wonder and growth",
                    descAr: "الاحتفال بسنة جديدة من الفرح والنمو والتميز",
                    badge: "Celebration",
                  },
                ].map((item) => {
                  const isSelected = theme === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTheme(item.id)}
                      className={`p-5 rounded-2xl border-2 text-left rtl:text-right transition cursor-pointer relative ${
                        isSelected
                          ? "border-amber-500 bg-amber-50/50 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {item.badge}
                        </span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <div className="font-black text-base text-[#23231E]">
                        {isAr ? item.titleAr : item.titleEn}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {isAr ? item.descAr : item.descEn}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Child Name Input (Optional Personalization Boost) */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {isAr ? "اسم الطفل (اختياري لمعاينة مخصصة):" : "Child's First Name (Optional for live preview):"}
                </label>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder={isAr ? "مثال: زايد، فاطمة، راشد..." : "e.g. Zayed, Sophia, Leo..."}
                  className="w-full bg-white px-4 py-3 rounded-xl border border-slate-300 text-sm font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 transition flex items-center gap-1 cursor-pointer"
                >
                  {currentDir === "rtl" ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                  <span>{isAr ? "رجوع" : "Back"}</span>
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-8 py-3.5 rounded-xl text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isAr ? "عرض التوصيات السحرية ➔" : "Reveal Matching Books ➔"}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: RECOMMENDATION RESULTS */}
          {step === 4 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full mb-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>{isAr ? "أفضل الترشيحات لك" : "Top picks for you"}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#23231E]">
                    {isAr ? `القصص الموصى بها لـ ${effectiveName}` : `Recommended Books for ${effectiveName}`}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={restart}
                  className="text-xs font-bold text-slate-500 hover:text-[#1E5751] transition flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isAr ? "إعادة الاختبار من البداية" : "Start Over"}</span>
                </button>
              </div>

              {/* Matched Books Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((book, idx) => (
                  <div
                    key={book.id}
                    className={`rounded-3xl border p-6 flex flex-col justify-between transition group relative ${
                      idx === 0
                        ? "border-amber-400 bg-gradient-to-b from-amber-50/40 to-white shadow-md ring-2 ring-amber-400/30"
                        : "border-slate-200 bg-white shadow-sm"
                    }`}
                  >
                    {idx === 0 && (
                      <div className="absolute -top-3.5 left-6 bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow">
                        ⭐ {isAr ? "ترشيح مميز" : "Top Pick"}
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute bottom-2 right-2 bg-slate-950/80 backdrop-blur-md text-white font-bold text-[10px] px-2.5 py-1 rounded-lg">
                          {book.ageRange}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-black text-lg text-[#23231E] group-hover:text-amber-600 transition">
                          {isAr && book.titleAr ? book.titleAr : book.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-2 mt-1 font-medium">
                          {isAr && book.subtitleAr ? book.subtitleAr : book.subtitle}
                        </p>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl text-[11px] text-slate-600 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{isAr ? "ثنائي اللغة: العربية بتشكيل كامل + الإنجليزية" : "Bilingual: Arabic with Tashkeel + English"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{isAr ? "معاينة تفاعلية ثلاثية الأبعاد فورية" : "Instant 3D Virtual Flipbook preview"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{isAr ? "توصيل خلال ٢٤-٤٨ ساعة لكافة الإمارات" : "24–48h express delivery across 7 Emirates"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold uppercase">
                          {isAr ? "السعر يبدأ من" : "Starting from"}
                        </span>
                        <span className="text-base font-black text-[#23231E]">
                          {isAr ? `٤٩.٠٠ ${country.currency}` : `49.00 ${country.currency}`}
                        </span>
                      </div>

                      <Link
                        href={
                          isAr
                            ? `/ar/books/${book.slug}?name=${encodeURIComponent(effectiveName)}`
                            : `/books/${book.slug}?name=${encodeURIComponent(effectiveName)}`
                        }
                        className="bg-[#23231E] hover:bg-black text-white font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition flex items-center gap-1.5 cursor-pointer group-hover:bg-amber-500 group-hover:text-slate-950"
                      >
                        <span>{isAr ? `تخصيص لـ ${effectiveName}` : `Personalize for ${effectiveName}`}</span>
                        {currentDir === "rtl" ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
