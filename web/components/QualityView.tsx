"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Droplets,
  HeartHandshake,
  Layers,
  Leaf,
  Maximize2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import StoreHeader from "@/components/StoreHeader";
import { useCountry } from "@/lib/context/CountryContext";

export default function QualityView({ initialLang }: { initialLang?: "en" | "ar" }) {
  const { language } = useCountry();
  const currentLang = initialLang || language;
  const isAr = currentLang === "ar";
  const currentDir = isAr ? "rtl" : "ltr";

  // Layer inspection interactive tab
  const [activeLayer, setActiveLayer] = useState<number>(0);

  const layers = [
    {
      id: "paper",
      title: isAr ? "الورق الأرشيفي ٢٠٠ جم" : "200 GSM Archival Paper",
      subtitle: isAr ? "ورق موهوك حريري غير لامع" : "Mohawk Silk Uncoated Stock",
      badge: isAr ? "قلب الكتاب" : "Book Interior",
      desc: isAr
        ? "ورق فاخر بسماكة ٢٠٠ جم من مصانع موهوك العريقة، معالج ليكون خالياً تماماً من الأحماض بلمسة ناعمة طبيعية تقضي على الانعكاسات الضوئية المزعجة تحت إضاءة السرير الخافتة، وتقاوم بصمات الأصابع والتمزق."
        : "Ultra-premium 200 GSM Mohawk Silk Uncoated interior stock. pH-neutral and acid-free, providing an inviting tactile texture that eliminates annoying overhead light glare during bedtime reading while resisting toddler fingerprints.",
      specs: [
        isAr ? "سماكة ٢٠٠ جم تمنع شفافية الصفحات تماماً" : "200 GSM heavyweight core prevents image show-through",
        isAr ? "خالٍ من الأحماض لحماية الألوان لأكثر من ١٠٠ عام" : "Acid-free formulation prevents yellowing for 100+ years",
        isAr ? "ملمس حريري مطفي مريح لعين الطفل" : "Glare-free silky matte tactile finish for bedtime eyes",
        isAr ? "معتمد بيئياً بنسبة ١٠٠٪ من FSC Mix" : "100% FSC Mix certified sustainable forest pulp",
      ],
    },
    {
      id: "binding",
      title: isAr ? "تجليد مسطح ممتد ١٨٠° ومعزز بـ PUR" : "180° Layflat & PUR Binding",
      subtitle: isAr ? "هندسة تجليد فائقة المتانة" : "Engineered Spine Durability",
      badge: isAr ? "الهيكل والمتانة" : "Structural Core",
      desc: isAr
        ? "يفتح الكتاب أفقياً بالكامل بزاوية ١٨٠ درجة دون الحاجة لتثبيته باليد، مما يمنح الطفل مشهداً بانورامياً ممتداً عبر الصفحتين دون ضياع أي جزء من الرسومات أو الشعر العربي في ثنية المنتصف، ومثبت بمادة PUR المرنة والمقاومة لحرارة ورطوبة مناخ الإمارات."
        : "True 180-degree layflat opening allows magnificent panoramic desert dunes and star-filled skies to flow seamlessly across both pages without gutter loss. Reinforced with flexible PUR adhesive built to withstand 10,000+ page turns and the UAE climate.",
      specs: [
        isAr ? "انسيابية بانورامية كاملة بدون فراغ أوسط" : "Zero artwork or verse loss in the center gutter",
        isAr ? "صمغ PUR المتطور يتحمل أكثر من ١٠,٠٠٠ فتحة وقراءة" : "Advanced PUR adhesive tested for 10,000+ reading cycles",
        isAr ? "مقاوم لدرجات الحرارة والرطوبة العالية في الخليج" : "Climate-resilient spine formulation engineered for the Gulf",
        isAr ? "قراءة مريحة بدون استخدام اليدين أثناء نوم الطفل" : "Hands-free bed reading without fighting spring-back pages",
      ],
    },
    {
      id: "inks",
      title: isAr ? "أحبار نباتية ١٠٠٪ واعتماد EN71-3" : "100% Vegetable Inks & EN71-3",
      subtitle: isAr ? "أمان مطلق لصحة الأطفال" : "Certified Child-Safe Chemistry",
      badge: isAr ? "السلامة والألوان" : "Safety & Pigment",
      desc: isAr
        ? "نعتمد تركيبات أحبار بانتون نباتية مصنوعة من زيت الصويا والزيوت النباتية النقية بنسبة ١٠٠٪، خالية تماماً من الرصاص والسموم والمركبات العضوية المتطايرة (VOCs)، وحائزة على شهادة المطابقة الأوروبية لألعاب الأطفال EN71-3."
        : "Pure food-safe Pantone inks formulated from 100% vegetable and soy oils. Zero volatile organic compounds (VOCs), zero heavy metals, and rigorously certified under European Toy Safety Directive EN71-3 — 100% safe for curious toddlers and teething infants.",
      specs: [
        isAr ? "مطابقة تامة للمعيار الأوروبي لسلامة ألعاب الأطفال EN71-3" : "Fully certified under EN71-3 European Toy Safety standard",
        isAr ? "خالية تماماً من الرصاص والمعادن الثقيلة والسموم" : "Zero heavy metals, zero lead, and zero volatile solvents",
        isAr ? "ألوان مشبعة ومقاومة لأشعة الشمس والبهتان لسنوات" : "Vibrant pigment saturation with archival lightfastness",
        isAr ? "آمنة كلياً حتى لو وضع الطفل حافة الصفحة في فمه" : "Completely non-toxic if a teething toddler chews on corners",
      ],
    },
    {
      id: "format",
      title: isAr ? "تنسيق مربع فاخر ٨.٥ × ٨.٥ بوصة" : "8.5\" × 8.5\" Keepsake Geometry",
      subtitle: isAr ? "المقاس الذهبي لكتب الأطفال التذكارية" : "Ergonomic 210mm × 210mm Square",
      badge: isAr ? "الأبعاد والراحة" : "Dimensions",
      desc: isAr
        ? "أبعاد مدروسة بعناية (٢١٠ مم × ٢١٠ مم) تجمع بين المساحة البصرية الواسعة لعرض الرسوم الأخاذة، والراحة المثالية للأيدي الصغيرة وأحضان الآباء أثناء القراءة المشتركة، وتتسع لـ ٢٤ إلى ٣٢ صفحة مزدوجة مليئة بالحكايات."
        : "Precision-engineered square dimensions (210mm × 210mm / 8.5\" × 8.5\") providing the ideal lap-reading canvas. Large enough to deliver immersive cinematic spreads while remaining lightweight and effortless for small hands to hold.",
      specs: [
        isAr ? "أبعاد مربعة ٢١٠ × ٢١٠ مم مصممة للقراءة في الحضن" : "Classic 210mm × 210mm square heirloom dimensions",
        isAr ? "تحتوي على ٢٤ إلى ٣٢ صفحة من الحكايات والرسوم" : "24–32 interior pages of full-bleed customized artwork",
        isAr ? "تتناسب مع رفوف كتب الأطفال ومكتبات غرف النوم" : "Fits seamlessly on standard nursery picture book ledges",
        isAr ? "زوايا صلبة ومصقولة بدقة فائقة لمنع الانثناء" : "Precision machine-cut corners engineered against corner dings",
      ],
    },
  ];

  // Strict index access: the active tab always exists, but the flag types
  // layers[activeLayer] as possibly-undefined — guard once, use `layer` below.
  const layer = layers[activeLayer];
  if (!layer) return null;

  return (
    <div className="min-h-screen bg-[#FDF8F1] text-[#23231E] flex flex-col selection:bg-amber-200">
      <StoreHeader />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-10 md:py-16 w-full" dir={currentDir}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs font-bold text-slate-500 mb-6 flex items-center gap-2">
          <Link href={isAr ? "/ar" : "/"} className="hover:text-[#1E5751] transition">
            {isAr ? "الرئيسية" : "Home"}
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-[#23231E]">{isAr ? "جودة الورق والطباعة" : "Paper & Print Quality"}</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] text-xs font-black uppercase tracking-wider mb-4 border border-[#1E5751]/20">
            <Layers className="w-3.5 h-3.5" />
            <span>{isAr ? "معايير النشر والطباعة الأرشيفية الفاخرة" : "Museum-Grade Heirloom Standards"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#23231E] tracking-tight font-serif mb-4">
            {isAr ? "علم صناعة الورق، دقة الطباعة، والحرفية الأرشيفية" : "Paper Science, Artisanal Print & Archival Durability"}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed">
            {isAr
              ? "نصنع كتباً استثنائية صُممت لتقرأ مئات المرات قبل النوم، وتظل صامدة ومحفوظة لتتوارثها الأجيال كأثمن ذكرى عائلية."
              : "We construct books built to withstand hundreds of bedtime readings, passed down through generations as treasured family heirlooms."}
          </p>
        </div>

        {/* 6 Core Quality Highlights Bar - 2px Sharp Editorial Radius */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-14">
          <div className="bg-white p-4 rounded-[2px] border border-slate-200 text-center shadow-xs">
            <div className="text-lg font-black text-[#1E5751] font-serif mb-0.5">200 GSM</div>
            <div className="text-[11px] font-bold text-slate-800">
              {isAr ? "ورق موهوك الحريري" : "Mohawk Silk Paper"}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">{isAr ? "مقاوم للوهج والتمزق" : "Glare-Free Core"}</div>
          </div>

          <div className="bg-white p-4 rounded-[2px] border border-slate-200 text-center shadow-xs">
            <div className="text-lg font-black text-[#1E5751] font-serif mb-0.5">180° Layflat</div>
            <div className="text-[11px] font-bold text-slate-800">
              {isAr ? "تجليد مسطح ممتد" : "Panoramic Spine"}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">{isAr ? "صمغ PUR المقوى" : "PUR Reinforced"}</div>
          </div>

          <div className="bg-white p-4 rounded-[2px] border border-slate-200 text-center shadow-xs">
            <div className="text-lg font-black text-[#1E5751] font-serif mb-0.5">EN71-3</div>
            <div className="text-[11px] font-bold text-slate-800">
              {isAr ? "أحبار نباتية ١٠٠٪" : "Child-Safe Inks"}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">{isAr ? "معتمدة لألعاب الأطفال" : "Food-Grade Safe"}</div>
          </div>

          <div className="bg-white p-4 rounded-[2px] border border-slate-200 text-center shadow-xs">
            <div className="text-lg font-black text-[#1E5751] font-serif mb-0.5">{'8.5" × 8.5"'}</div>
            <div className="text-[11px] font-bold text-slate-800">
              {isAr ? "المقاس المربع الذهبي" : "Keepsake Format"}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">{isAr ? "٢١٠ مم × ٢١٠ مم" : "210mm × 210mm"}</div>
          </div>

          <div className="bg-white p-4 rounded-[2px] border border-slate-200 text-center shadow-xs">
            <div className="text-lg font-black text-[#1E5751] font-serif mb-0.5">100+ Years</div>
            <div className="text-[11px] font-bold text-slate-800">
              {isAr ? "جودة أرشيفية خالصة" : "Archival Lifespan"}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">{isAr ? "خالٍ من الأحماض" : "pH-Neutral Pulp"}</div>
          </div>

          <div className="bg-white p-4 rounded-[2px] border border-slate-200 text-center shadow-xs">
            <div className="text-lg font-black text-[#1E5751] font-serif mb-0.5">FSC Mix</div>
            <div className="text-[11px] font-bold text-slate-800">
              {isAr ? "غابات مستدامة ١٠٠٪" : "Sustainable Source"}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">{isAr ? "صديق للبيئة" : "Eco-Responsible"}</div>
          </div>
        </div>

        {/* Craftsmanship Visual Showcase */}
        <div className="relative aspect-[16/9] rounded-[2px] overflow-hidden shadow-sm border border-slate-200 mb-14">
          <Image
            src="/images/book_craftsmanship.jpg"
            alt="Artisanal children's storybook lying flat on natural oak table"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 800px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 sm:p-10">
            <div className="text-white max-w-xl">
              <span className="inline-block bg-[#FFD15A] text-[#23231E] text-xs font-black px-3 py-1 rounded-[2px] uppercase tracking-wider mb-2">
                {isAr ? "الحرفية الإماراتية" : "UAE Craftsmanship"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-serif">
                {isAr ? "تجليد يدوي ومراجعة بصرية لكل كتاب" : "Every Copy Hand-Inspected Before Dispatch"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 mt-1">
                {isAr
                  ? "يخضع كل كتاب لـ ١٢ نقطة فحص جودة لضمان حدة الألوان وثبات الغلاف وسلامة التشكيل الشعري."
                  : "Each individual book undergoes a 12-point manual inspection for color registration, spine flexibility, and typography integrity."}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Anatomy Layer Inspector */}
        <section aria-label="Anatomy Inspector" className="bg-white p-7 sm:p-10 rounded-[2px] border border-slate-200 shadow-xs mb-14">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-black uppercase tracking-wider text-[#1E5751] mb-2 block">
              {isAr ? "التشريح الفني للكتاب" : "Interactive Anatomy"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#23231E] font-serif">
              {isAr ? "استكشف طبقات الكتاب التذكاري الأربع" : "Explore the 4 Layers of an Heirloom Book"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isAr
                ? "انقر على أي طبقة لاكتشاف المعايير الهندسية والمواد الفاخرة المستخدمة"
                : "Select any component below to examine its exact material specifications"}
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {layers.map((layer, idx) => (
              <button
                key={layer.id}
                type="button"
                onClick={() => setActiveLayer(idx)}
                className={`px-4 py-2.5 rounded-[2px] font-bold text-xs transition cursor-pointer flex items-center gap-2 ${
                  activeLayer === idx
                    ? "bg-[#1E5751] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <span>{layer.title}</span>
              </button>
            ))}
          </div>

          {/* Active Layer Display Card */}
          <div className="bg-[#FDF8F1] p-6 sm:p-8 rounded-[2px] border border-amber-900/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <span className="inline-block bg-[#1E5751]/10 text-[#1E5751] text-[10px] font-black uppercase px-2.5 py-1 rounded-[2px] mb-1">
                  {layer.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#23231E] font-serif">
                  {layer.title}
                </h3>
                <div className="text-xs font-bold text-slate-500">{layer.subtitle}</div>
              </div>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed mb-6">
              {layer.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-amber-900/10">
              {layer.specs.map((spec, sIdx) => (
                <div key={sIdx} className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6 In-Depth Technical Pillars Grid */}
        <section aria-label="Quality Pillars" className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-[#1E5751] mb-2 block">
              {isAr ? "ركائز الجودة الست" : "The 6 Pillars"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#23231E] font-serif">
              {isAr ? "تفاصيل دقيقة صُممت لأجل أطفالكم" : "Technical Specifications & Materials"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. 200 GSM Mohawk Silk */}
            <div className="bg-white p-7 rounded-[2px] border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-[2px] bg-[#DAF7C6] text-[#1E5751] flex items-center justify-center font-black mb-6">
                  <Leaf className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-[#23231E] font-serif mb-2">
                  {isAr ? "ورق موهوك ٢٠٠ جم الفاخر" : "200 GSM Mohawk Silk"}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {isAr
                    ? "ورق سميك مخصص للمتاحف والمكتبات الملكية، بملمس حريري مطفي يمنع الانعكاسات الضوئية ويتحمل تقليب أصابع الأطفال مئات المرات."
                    : "Extra-heavyweight 200 GSM Mohawk Silk Uncoated paper. Rich velvety texture that eliminates bedside glare and withstands curious toddler fingers."}
                </p>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 font-bold pt-4 border-t border-slate-100">
                <li className="flex items-center gap-2">✓ {isAr ? "خالٍ من الأحماض (لا يصفر أو يبهت)" : "Acid-free (100+ year durability)"}</li>
                <li className="flex items-center gap-2">✓ {isAr ? "معتمد بيئياً بنسبة ١٠٠٪ FSC Mix" : "100% FSC Mix certified sustainable"}</li>
                <li className="flex items-center gap-2">✓ {isAr ? "سماكة ٢٠٠ جم تمنع الشفافية والتمزق" : "200 GSM high-opacity tear resistance"}</li>
              </ul>
            </div>

            {/* 2. Layflat & Stitch Binding Options */}
            <div className="bg-white p-7 rounded-[2px] border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-[2px] bg-[#FFE39C] text-[#23231E] flex items-center justify-center font-black mb-6">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-[#23231E] font-serif mb-2">
                  {isAr ? "تجليد مسطح ١٨٠° وصمغ PUR" : "180° Layflat & PUR Spine"}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {isAr
                    ? "خيارات تجليد احترافية: تجليد مسطح ١٨٠° معزز بصمغ PUR المرن للغلاف الصلب لمنع انكسار الكعب في حرارة الخليج، وتجليد خياطة معززة للغلاف المرن."
                    : "True 180° layflat binding for Hardcovers and reinforced saddle-stitch durability for Softcovers. PUR spine will not crack in Gulf summer conditions."}
                </p>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 font-bold pt-4 border-t border-slate-100">
                <li className="flex items-center gap-2">✓ {isAr ? "رؤية كاملة للشعر والرسوم بدون فراغ" : "Zero artwork or verse loss in gutter"}</li>
                <li className="flex items-center gap-2">✓ {isAr ? "يتحمل أكثر من ١٠ آلاف فتحة وقراءة" : "Tested for 10,000+ flex cycles"}</li>
                <li className="flex items-center gap-2">✓ {isAr ? "قراءة مريحة بدون الحاجة لتثبيت اليد" : "Effortless hands-free bedtime reading"}</li>
              </ul>
            </div>

            {/* 3. Child-Safe Inks */}
            <div className="bg-white p-7 rounded-[2px] border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-[2px] bg-emerald-100 text-emerald-800 flex items-center justify-center font-black mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-[#23231E] font-serif mb-2">
                  {isAr ? "أحبار نباتية واعتماد EN71-3" : "EN71-3 Child-Safe Inks"}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {isAr
                    ? "أحبار نباتية مصنوعة من زيت الصويا الخالص، خالية تماماً من الرصاص والسموم، ومطابقة لأعلى معايير السلامة الأوروبية لألعاب الرضع."
                    : "100% non-toxic vegetable and soy formulations. Zero heavy metals, zero VOCs, and fully certified under European Toy Safety Standard EN71-3."}
                </p>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 font-bold pt-4 border-t border-slate-100">
                <li className="flex items-center gap-2">✓ {isAr ? "آمنة تماماً عند ملامسة الفم أو الأسنان" : "Teething-safe and food-grade compliant"}</li>
                <li className="flex items-center gap-2">✓ {isAr ? "ألوان بانتون مشبعة ومقاومة للضوء" : "Museum-grade lightfast saturation"}</li>
                <li className="flex items-center gap-2">✓ {isAr ? "خالية من المذيبات الكيميائية والروائح" : "Zero chemical fumes or toxic solvents"}</li>
              </ul>
            </div>

            {/* 4. Waterproof Matte Laminate Covers (Requirement 3) */}
            <div className="bg-white p-7 rounded-[2px] border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-[2px] bg-sky-100 text-sky-800 flex items-center justify-center font-black mb-6">
                  <Droplets className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-[#23231E] font-serif mb-2">
                  {isAr ? "أغلفة مقاومة للماء والسوائل" : "Waterproof Matte Laminate"}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {isAr
                    ? "طبقة سيلوفان مطفية ناعمة تحمي الغلاف من السوائل المنسكبة، وبصمات الأصابع اللزجة، والخدوش، مع ملمس مخملي راقٍ يسهل تنظيفه بمسحة منديل."
                    : "Waterproof protective matte lamination protects outer covers from morning milk spills, juice drips, and sticky toddler fingers with zero shine."}
                </p>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 font-bold pt-4 border-t border-slate-100">
                <li className="flex items-center gap-2">✓ {isAr ? "حماية ضد السوائل والانسكابات" : "Spill and droplet resistant coating"}</li>
                <li className="flex items-center gap-2">✓ {isAr ? "ملمس مخملي مطفي مانع للبصمات" : "Soft-touch anti-fingerprint surface"}</li>
                <li className="flex items-center gap-2">✓ {isAr ? "سهل المسح والتنظيف بلطف" : "Wipes clean with a gentle damp cloth"}</li>
              </ul>
            </div>

            {/* 5. Keepsake Geometry */}
            <div className="bg-white p-7 rounded-[2px] border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-[2px] bg-amber-100 text-amber-800 flex items-center justify-center font-black mb-6">
                  <Maximize2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-[#23231E] font-serif mb-2">
                  {isAr ? "المقاس المربع ٨.٥ × ٨.٥ بوصة" : "8.5\" × 8.5\" Square Keepsake"}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {isAr
                    ? "مقاس ٢١٠ مم × ٢١٠ مم المتوازن يتيح راحة قصوى للوالدين أثناء القراءة المشتركة، ويتسع لـ ٢٤ إلى ٣٢ صفحة مزدوجة مليئة بالحكايات والمغامرات."
                    : "Dimensions of 210mm × 210mm offer the golden ratio for bedtime reading on a parent's lap, showcasing 24–32 richly illustrated story pages."}
                </p>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 font-bold pt-4 border-t border-slate-100">
                <li className="flex items-center gap-2">✓ {isAr ? "وزن مثالي مريح لحمله بيد واحدة" : "Ergonomic two-handed lap reading"}</li>
                <li className="flex items-center gap-2">✓ {isAr ? "يناسب رفوف غرف الأطفال القياسية" : "Fits standard nursery picture ledges"}</li>
                <li className="flex items-center gap-2">✓ {isAr ? "٢٤ إلى ٣٢ صفحة مزدوجة كاملة الألوان" : "24–32 interior pages of full art"}</li>
              </ul>
            </div>

            {/* 6. Archival Longevity & FSC Mix */}
            <div className="bg-white p-7 rounded-[2px] border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-[2px] bg-blue-100 text-blue-800 flex items-center justify-center font-black mb-6">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-[#23231E] font-serif mb-2">
                  {isAr ? "عمر أرشيفي يتجاوز ١٠٠ عام" : "100+ Year Archival Life"}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {isAr
                    ? "معادلة كيميائية متعادلة الحموضة (pH-neutral) تحمي الورق من الاصفرار والتفتت، مع اعتماد FSC Mix لحماية الغابات المستدامة."
                    : "pH-neutral balanced cellulose protects against degradation, yellowing, and brittleness. Certified FSC Mix from responsible sustainable forests."}
                </p>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 font-bold pt-4 border-t border-slate-100">
                <li className="flex items-center gap-2">✓ {isAr ? "ورق متعادل الحموضة بدون أحماض حرة" : "Acid-free archival chemistry"}</li>
                <li className="flex items-center gap-2">✓ {isAr ? "أصباغ مقاومة للأكسدة والبهتان" : "Oxidation-resistant color pigments"}</li>
                <li className="flex items-center gap-2">✓ {isAr ? "١٠٠٪ ورق مستدام ومعتمد بيئياً FSC Mix" : "100% FSC Mix sustainable wood fiber"}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cover Finishes Comparison Table */}
        <section aria-label="Finishes Comparison" className="bg-white p-7 sm:p-10 rounded-[2px] border border-slate-200 shadow-xs mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-black text-[#23231E] font-serif">
                {isAr ? "مقارنة أنواع الأغلفة والتجليد الفاخر" : "Compare Formats & Cover Finishes"}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {isAr
                  ? "جميع الخيارات تستخدم نفس الورق الأرشيفي ٢٠٠ جم والأحبار النباتية الآمنة مع الغلاف المقاوم للماء"
                  : "Every finish includes the identical 200 GSM Mohawk archival interior and EN71-3 vegetable inks"}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm" dir={currentDir}>
              <thead>
                <tr className="border-b border-slate-200 text-[#23231E] font-bold text-xs uppercase tracking-wider">
                  <th className="pb-3">{isAr ? "نوع الغلاف" : "Cover Format"}</th>
                  <th className="pb-3">{isAr ? "مواصفات وخامة الغلاف" : "Cover Board & Finish"}</th>
                  <th className="pb-3">{isAr ? "الاستخدام الأنسب" : "Best For"}</th>
                  <th className="pb-3">{isAr ? "السعر في الإمارات" : "UAE Price"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {/* 1: Softcover */}
                <tr className="hover:bg-slate-50">
                  <td className="py-4 font-bold text-[#23231E]">
                    <div>{isAr ? "غلاف مرن فاخر (Softcover)" : "Flexible Softcover"}</div>
                    <span className="text-[11px] text-slate-500">{isAr ? "خفيف وعملي" : "Lightweight & portable"}</span>
                  </td>
                  <td className="py-4">
                    {isAr
                      ? "كرتون كوشيه سميك ٣٥٠ جم مع طبقة سيلوفان حريرية واقية ضد السوائل"
                      : "Heavy 350 GSM laminated art card with spill-resistant satin touch"}
                  </td>
                  <td className="py-4">
                    {isAr ? "القراءة اليومية الخفيفة، السفر، وحقائب الحضانة" : "Daily bedtime reading, travel, daycares & backpacks"}
                  </td>
                  <td className="py-4 font-black text-[#1E5751] text-base">49.00 AED</td>
                </tr>

                {/* 2: Hardcover Keepsake (Most Popular) */}
                <tr className="hover:bg-slate-50 bg-[#DAF7C6]/20">
                  <td className="py-4 font-bold text-[#23231E]">
                    <span className="flex items-center gap-1.5 flex-wrap">
                      <span>{isAr ? "غلاف صلب تذكاري (Hardcover)" : "Hardcover Keepsake"}</span>
                      <span className="bg-[#1E5751] text-white text-[10px] px-2 py-0.5 rounded-[2px] font-black uppercase">
                        {isAr ? "الأكثر طلباً" : "Most Popular"}
                      </span>
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      {isAr ? "كرتون هولندي صلب ٣ مم" : "3mm rigid Dutch greyboard"}
                    </span>
                  </td>
                  <td className="py-4">
                    {isAr
                      ? "كرتون رمادي صلب ٣ مم مغطى بطبقة مخملية مطفية مقاومة للخدش مع حواف معززة"
                      : "3mm high-density rigid Dutch greyboard with anti-scratch matte UV velvet finish"}
                  </td>
                  <td className="py-4">
                    {isAr
                      ? "هدايا أعياد الميلاد والمواليد الجدد لتظل في رفوف غرفة النوم لعقود"
                      : "Milestone birthdays, newborn arrivals & permanent nursery display"}
                  </td>
                  <td className="py-4 font-black text-[#1E5751] text-base">79.00 AED</td>
                </tr>

                {/* 3: Deluxe Keepsake */}
                <tr className="hover:bg-slate-50">
                  <td className="py-4 font-bold text-[#23231E]">
                    <span className="flex items-center gap-1.5 flex-wrap">
                      <span>{isAr ? "الإصدار الملكي الفاخر (Deluxe)" : "Deluxe Keepsake"}</span>
                      <span className="bg-[#FFD15A] text-[#23231E] text-[10px] px-2 py-0.5 rounded-[2px] font-black uppercase">
                        {isAr ? "نقوش مذهبة" : "Gold-Foil"}
                      </span>
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      {isAr ? "صندوق هدايا زمردي صلب" : "Rigid emerald presentation box"}
                    </span>
                  </td>
                  <td className="py-4">
                    {isAr
                      ? "غلاف صلب ٣ مم بنقوش ذهبية نافرة لاسم الطفل + صندوق هدايا ملكي صلب مع شريط ستان"
                      : "3mm rigid board with gold-foil embossed title + royal emerald presentation box with ribbon pull"}
                  </td>
                  <td className="py-4">
                    {isAr
                      ? "المناسبات الملكية الكبرى، إهداء الأجداد، وجلسات التصوير العائلية"
                      : "Royal milestone gifting, grandparent keepsakes & timeless heirloom archiving"}
                  </td>
                  <td className="py-4 font-black text-[#1E5751] text-base">99.00 AED</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Heirloom Guarantee Section */}
        <section aria-label="Heirloom Guarantee" className="bg-[#1E5751] text-white p-7 sm:p-10 rounded-[2px] shadow-sm mb-14 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-white/10 text-[#FFD15A] text-xs font-black uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>{isAr ? "التزامنا التام تجاه عائلتك" : "Our Unconditional Promise"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif tracking-tight leading-tight">
                {isAr
                  ? "ضمان الذكرى الخالدة مدى الحياة (Heirloom Guarantee)"
                  : "The Heirloom Guarantee: Lifetime Free Replacement"}
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                {isAr
                  ? "نعلم أن الأطفال يقرؤون كتبهم المفضلة بحماس شديد! إذا تمزقت أي صفحة، أو انسكب عصير الصباح، أو تضرر الكتاب أثناء القراءة الأسرية المعتادة في أي وقت، أرسل لنا صورة عبر الواتساب، وسنعيد طباعة نسخة جديدة تماماً وإرسالها لباب منزلك مجاناً."
                  : "We believe family bedtime reading should be joyful and fearless. If juice spills on a spread, an enthusiastic toddler tears a page, or the spine suffers damage during family reading at any point in its lifetime, send a photo to our UAE WhatsApp team, and we will reprint and ship a brand-new copy to your doorstep completely free of charge."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white/10 p-3 rounded-[2px] border border-white/10 text-xs">
                  <div className="font-black text-[#FFD15A] mb-1">
                    {isAr ? "استبدال مدى الحياة" : "Lifetime Replacement"}
                  </div>
                  <div className="text-slate-300 text-[11px]">
                    {isAr ? "لحوادث الأطفال والانسكاب أثناء القراءة" : "For reading accidents, spills & toddler tears"}
                  </div>
                </div>

                <div className="bg-white/10 p-3 rounded-[2px] border border-white/10 text-xs">
                  <div className="font-black text-[#FFD15A] mb-1">
                    {isAr ? "إعادة طباعة فورية" : "Defect-Free Guarantee"}
                  </div>
                  <div className="text-slate-300 text-[11px]">
                    {isAr ? "لأي خطأ طباعي أو تلف في الشحن" : "100% free reprint for transit or print defects"}
                  </div>
                </div>

                <div className="bg-white/10 p-3 rounded-[2px] border border-white/10 text-xs">
                  <div className="font-black text-[#FFD15A] mb-1">
                    {isAr ? "دعم واتساب مباشر" : "WhatsApp Claims"}
                  </div>
                  <div className="text-slate-300 text-[11px]">
                    {isAr ? "بصورة واحدة دون استمارات معقدة" : "One-photo claim without bureaucratic forms"}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 text-center">
              <div className="bg-[#143B37] p-6 rounded-[2px] border border-white/15 shadow-inner">
                <div className="w-14 h-14 rounded-[2px] bg-[#FFD15A] text-[#23231E] flex items-center justify-center mx-auto mb-3 font-black text-2xl">
                  🛡️
                </div>
                <h4 className="text-base font-black font-serif text-white mb-1">
                  {isAr ? "ختم الجودة الملكية" : "Verified Heirloom Seal"}
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed mb-4">
                  {isAr
                    ? "معتمد في دولة الإمارات ومطابق لأعلى معايير دور النشر الأرشيفية العالمية."
                    : "Inspected and certified in Abu Dhabi under international archival bookmaking standards."}
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFD15A]">
                  <HeartHandshake className="w-4 h-4" />
                  <span>{isAr ? "صُنع ليدوم أجيالاً" : "Engineered for Generations"}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section aria-label="Call to Action" className="text-center bg-[#FFE39C]/40 border border-[#FFE39C] p-8 sm:p-10 rounded-[2px]">
          <h3 className="text-2xl sm:text-3xl font-black text-[#23231E] font-serif mb-3">
            {isAr ? "اصنع تحفة تذكارية تدوم في ذاكرة طفلك" : "Craft an Unforgettable Keepsake for Your Child"}
          </h3>
          <p className="text-slate-600 text-sm max-w-xl mx-auto mb-6">
            {isAr
              ? "اختر قصة من مجموعتنا، أدخل اسم طفلك ومظهره، وشاهد كتابك مجسماً في القارئ التفاعلي ثلاثي الأبعاد مجاناً."
              : "Select a story from our collection, personalize character appearance, and preview every single spread in 3D for free."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/create/start"
              className="inline-flex items-center gap-2 bg-[#23231E] hover:bg-black text-white font-black px-8 py-3.5 rounded-[2px] text-sm sm:text-base shadow-sm transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{isAr ? "ابدأ تصميم كتابك الآن ➔" : "Start Personalizing Your Book ➔"}</span>
            </Link>
            <Link
              href={isAr ? "/ar/delivery" : "/delivery"}
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#1E5751] border border-slate-200 font-bold px-6 py-3.5 rounded-[2px] text-sm transition"
            >
              <span>{isAr ? "استعرض مواعيد التوصيل في الإمارات" : "View UAE Delivery Timetable"}</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
