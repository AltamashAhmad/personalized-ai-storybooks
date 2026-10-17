"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Compass,
  ExternalLink,
  FileText,
  Gift,
  MapPin,
  MessageCircle,
  Package,
  Navigation,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Truck,
  Volume2,
} from "lucide-react";
import StoreHeader from "@/components/StoreHeader";
import Accordion from "@/components/ui/Accordion";
import { useCountry } from "@/lib/context/CountryContext";
import { DIGITAL_ONLY_LAUNCH } from "@/config/launch";

export default function DeliveryView({ initialLang }: { initialLang?: "en" | "ar" }) {
  const { language } = useCountry();
  const currentLang = initialLang || language;
  const isAr = currentLang === "ar";
  const currentDir = isAr ? "rtl" : "ltr";

  const deliveryFaqs = [
    {
      q: isAr
        ? "متى يمكنني البدء بقراءة الكتاب بعد إتمام الطلب؟"
        : "How quickly can I start reading my book after ordering?",
      a: isAr
        ? "تستطيع القراءة خلال ٥ دقائق فقط! بمجرد إتمام الدفع، يفتح القارئ التفاعلي ثلاثي الأبعاد على هاتفك أو جهازك اللوحي لتتصفح جميع الصفحات واسم طفلك بوضوح، كما نرسل ملف PDF عالي الدقة (300 DPI) مباشرة إلى بريدك الإلكتروني والواتساب، بينما تبدأ ورشتنا في الإمارات بطباعة وتجليد نسختك الورقية الفاخرة."
        : "You can start reading in under 5 minutes! The moment your order is placed, our dynamic rendering engine generates your child's personalized 3D virtual flipbook, accessible on phone, tablet, or desktop. We also deliver a print-ready 300 DPI archival PDF to your email and WhatsApp while our local UAE workshop prints and binds your physical heirloom copy.",
    },
    {
      q: isAr
        ? "كيف تعمل خدمة التوصيل السريع لجميع الإمارات السبع وشركاء الشحن؟"
        : "How does physical courier delivery work across all 7 Emirates with your partners?",
      a: isAr
        ? "نطبع كتبنا محلياً في دولة الإمارات ونشحن عبر شركاء لوجستيين معتمدين (كريم بوكس Careem Box، بريد الإمارات إكسبرس Emirates Post، وأرامكس Aramex). يتم التوصيل لباب منزلك في دبي والشارقة خلال ٢٤ ساعة (24h Express)، وأبوظبي خلال ٢٤ إلى ٣٦ ساعة (24-36h Premium)، وعجمان ورأس الخيمة والفجيرة وأم القيوين خلال ٣٦ إلى ٤٨ ساعة (بحد أقصى 48 Hours). الشحن مجاني تماماً لجميع الطلبات التي تتجاوز ١٠٠ درهم إماراتي (ورسم رمزي ١٥ درهماً فقط للطلبات الأقل)."
        : "We print locally inside the UAE and dispatch via premier courier partners (Careem Box for rapid city transit, Emirates Post Express, and Aramex). Delivery reaches doorsteps in Dubai & Sharjah in 24 hours (24h Express), Abu Dhabi in 24–36 hours (24-36h Premium), and Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain within 36–48 hours (up to 48 Hours max). Delivery is 100% FREE on all orders over 100 AED (flat 15 AED for smaller orders) with zero customs delays or hidden remote fees.",
    },
    {
      q: isAr
        ? "هل تتوفر خدمة التتبع المباشر وتحديد تعليمات التسليم عبر الواتساب؟"
        : "Can I track my courier in real-time and provide special delivery instructions?",
      a: isAr
        ? "نعم بالتأكيد! بمجرد تجهيز الكتاب وخروجه مع مندوب التوصيل (عبر كريم بوكس أو أرامكس أو بريد الإمارات)، تتلقى رسالة عبر الواتساب مزودة برابط تتبع GPS مباشر ونافذة تقريبية لوقت الوصول، مع إمكانية الرد الفوري لإضافة تعليمات مثل 'الرجاء ترك الطرد لدى أمن المبنى' أو تغيير موقع التسليم بنقرة واحدة."
        : "Absolutely! Upon dispatch, you receive an automated WhatsApp notification containing a live GPS courier tracking link (Careem Box, Aramex, or Emirates Post), driver contact, and estimated arrival window. You can reply directly with doorstep notes (such as 'Leave with building security' or 'Call upon arrival') or adjust your drop-off point with a single tap.",
    },
  ];

  // Dispatch timeline milestones
  const dispatchMilestones = [
    {
      hour: isAr ? "الدقيقة ٠–٥" : "Minute 0–5",
      badge: isAr ? "رقمي فوري" : "Instant Digital",
      title: isAr ? "تأكيد الطلب والإنشاء الرقمي" : "Order Placed & Digital Render",
      desc: isAr
        ? "يولد محركنا ثلاثي الأبعاد نسخة القصة الكاملة باسم طفلك، وتفتح فوراً في القارئ التفاعلي مع ملف PDF أرشيفي بدقة 300 DPI."
        : "Our rendering engine builds your personalized 3D virtual flipbook instantly, dispatched with an archival 300 DPI PDF download.",
    },
    {
      hour: isAr ? "الساعة ٢–٤" : "Hours 2–4",
      badge: isAr ? "الطباعة الحرفية" : "Print Studio",
      title: isAr ? "طباعة ورق موهوك ٢٠٠ جم" : "200 GSM Mohawk Silk Print",
      desc: isAr
        ? "تتم معايرة ألوان بانتون والأحبار النباتية الآمنة EN71-3 وطباعة الأوراق الداخلية على ورق موهوك الحريري الفاخر."
        : "Precision printing on 200 GSM Mohawk Silk FSC paper using certified EN71-3 child-safe vegetable Pantone inks.",
    },
    {
      hour: isAr ? "الساعة ١٢–١٦" : "Hours 12–16",
      badge: isAr ? "التجليد والفحص" : "Binding & QC",
      title: isAr ? "تجليد مسطح ١٨٠° وفحص يدوي" : "180° Layflat Binding & Review",
      desc: isAr
        ? "تجليد بصمغ PUR المقاوم لحرارة الخليج وتثبيت الغلاف المقاوم للماء واجتياز فحص الجودة اليدوي المكون من ١٢ نقطة."
        : "Spine curing with climate-resilient PUR adhesive, waterproof matte lamination, and strict 12-point manual inspection.",
    },
    {
      hour: isAr ? "الساعة ٢٤–٤٨" : "Hours 24–48",
      badge: isAr ? "التوصيل للباب" : "Doorstep Courier",
      title: isAr ? "انطلاق المندوب مع تتبع GPS حي" : "Courier Hand-off & Live GPS",
      desc: isAr
        ? "تسليم الشحنة لشركاء التوصيل (كريم بوكس، بريد الإمارات، أرامكس) مع إرسال رابط تتبع GPS مباشر عبر الواتساب."
        : "Dispatched via Careem Box, Emirates Post, or Aramex with instant live GPS tracking link delivered to your WhatsApp.",
    },
  ];

  // Courier partner networks
  const courierPartners = [
    {
      name: "Careem Box",
      nameAr: "كريم بوكس (Careem Box)",
      serviceEn: "Direct Express Courier (Dubai & Abu Dhabi Metro)",
      serviceAr: "توصيل إكسبرس فوري لباب المنزل في دبي وأبوظبي",
      speed: "24h Express",
      speedAr: "خلال ٢٤ ساعة",
      tagEn: "On-demand GPS Dispatch",
      tagAr: "تتبع لحظي عبر خرائط GPS",
      coverageEn: "Dubai, Abu Dhabi, Sharjah urban centers",
      coverageAr: "المناطق الحضرية في دبي وأبوظبي والشارقة",
    },
    {
      name: "Emirates Post",
      nameAr: "بريد الإمارات (Emirates Post)",
      serviceEn: "National Express Network (All 7 Emirates)",
      serviceAr: "الشبكة البريدية الوطنية السريعة لكافة إمارات الدولة",
      speed: "24–36h Premium",
      speedAr: "٢٤ إلى ٣٦ ساعة",
      tagEn: "Official Federal Courier",
      tagAr: "الناقل البريدي الرسمي الاتحادي",
      coverageEn: "Abu Dhabi, Dubai, Sharjah, Ajman, RAK, Fujairah, UAQ",
      coverageAr: "تغطية شاملة لجميع مدن وضواحي ومناطق الإمارات السبع",
    },
    {
      name: "Aramex",
      nameAr: "أرامكس (Aramex)",
      serviceEn: "Priority Doorstep Freight & Regional Logistics",
      serviceAr: "خدمات الشحن السريع والتسليم المباشر لباب الفيلا أو المبنى",
      speed: "24–48h Standard",
      speedAr: "٢٤ إلى ٤٨ ساعة",
      tagEn: "Live SMS & WhatsApp Tracking",
      tagAr: "إشعارات مباشرة وتنسيق الموعد عبر الواتساب",
      coverageEn: "All residential neighborhoods & remote Western Region",
      coverageAr: "كافة الأحياء والمجمعات السكنية ومناطق الظفرة",
    },
  ];

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
          <span className="text-[#23231E]">{isAr ? "الشحن والتوصيل" : "Delivery & Shipping"}</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] text-xs font-black uppercase tracking-wider mb-4 border border-[#1E5751]/20">
            <Truck className="w-3.5 h-3.5" />
            <span>{isAr ? "توصيل سريع لكافة إمارات الدولة" : "UAE Doorstep Express Logistics"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#23231E] tracking-tight font-serif mb-4">
            {isAr ? "معلومات الشحن ومواعيد التوصيل" : "Delivery Times & Shipping Coverage"}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed">
            {isAr
              ? "نحرص على وصول هديتك التذكارية بسرعة فائقة وموثوقية تامة، سواء اخترت الاستلام الرقمي الفوري خلال ٥ دقائق أو الطباعة الفاخرة المشحونة لباب منزلك عبر شركائنا المعتمدين في الإمارات."
              : "Every personalized book is an unforgettable heirloom. We ensure swift and dependable arrival across all 7 Emirates, whether you prefer instant 5-minute digital reading or luxury hand-bound delivery to your doorstep."}
          </p>
        </div>

        {/* DIGITAL-ONLY LAUNCH banner: honest framing at launch. */}
        {DIGITAL_ONLY_LAUNCH && (
          <div className="max-w-3xl mx-auto mb-10 p-4 rounded-[2px] bg-amber-50 border border-amber-300 text-center">
            <p className="text-sm font-bold text-amber-900 leading-relaxed">
              {isAr
                ? "🚀 عرض الإطلاق: النسخة الرقمية الفورية متوفرة الآن — وستتوفر النسخ المطبوعة الفاخرة قريباً."
                : "🚀 Launch offer: the instant Digital Edition is available now — printed keepsake editions are coming soon."}
            </p>
          </div>
        )}

        {/* Hero Key Stats Bar - 2px Sharp Editorial Radius */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-14">
          <div className="bg-white p-5 rounded-[2px] border border-slate-200/90 shadow-xs text-center">
            <div className="w-10 h-10 mx-auto rounded-[2px] bg-emerald-100 text-emerald-800 flex items-center justify-center font-black mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-serif mb-1">
              {isAr ? "٥ دقائق" : "5 Minutes"}
            </div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-0.5">
              {isAr ? "الاستلام الرقمي" : "Digital Flipbook"}
            </div>
            <div className="text-[11px] text-slate-500">
              {isAr ? "قارئ تفاعلي + ملف PDF" : "Instant 3D reader & PDF"}
            </div>
          </div>

          <div className="bg-white p-5 rounded-[2px] border border-slate-200/90 shadow-xs text-center">
            <div className="w-10 h-10 mx-auto rounded-[2px] bg-[#DAF7C6] text-[#1E5751] flex items-center justify-center font-black mb-3">
              <Truck className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#1E5751] font-serif mb-1">
              {isAr ? "٢٤-٤٨ ساعة" : "24–48h"}
            </div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-0.5">
              {isAr ? "الشحن السريع" : "Physical Dispatch"}
            </div>
            <div className="text-[11px] text-slate-500">
              {isAr ? "طباعة وتوصيل محلي في الإمارات" : "Local UAE courier transit"}
            </div>
          </div>

          <div className="bg-white p-5 rounded-[2px] border border-slate-200/90 shadow-xs text-center">
            <div className="w-10 h-10 mx-auto rounded-[2px] bg-[#FFE39C] text-[#23231E] flex items-center justify-center font-black mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#23231E] font-serif mb-1">
              {isAr ? "٧ إمارات" : "7 Emirates"}
            </div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-0.5">
              {isAr ? "تغطية شاملة" : "Doorstep Coverage"}
            </div>
            <div className="text-[11px] text-slate-500">
              {isAr ? "بدون أي رسوم للمناطق النائية" : "Zero remote area surcharges"}
            </div>
          </div>

          <div className="bg-white p-5 rounded-[2px] border border-slate-200/90 shadow-xs text-center">
            <div className="w-10 h-10 mx-auto rounded-[2px] bg-amber-100 text-amber-800 flex items-center justify-center font-black mb-3">
              <Gift className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#1E5751] font-serif mb-1">
              {isAr ? "شحن مجاني" : "Free Shipping"}
            </div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-0.5">
              {isAr ? "للطلبات فوق ١٠٠ د.إ" : "Over 100 AED"}
            </div>
            <div className="text-[11px] text-slate-500">
              {isAr ? "١٥ د.إ فقط للطلبات الأقل" : "Flat 15 AED for smaller orders"}
            </div>
          </div>
        </div>

        {/* Dispatch Timeline Graphic (Requirement 2) */}
        <section aria-label="Dispatch Timeline" className="bg-white p-7 sm:p-10 rounded-[2px] border border-slate-200 shadow-xs mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#1E5751] block mb-1">
                {isAr ? "الجدول الزمني للإنتاج والتسليم" : "Production & Dispatch Timeline"}
              </span>
              <h2 className="text-2xl font-black text-[#23231E] font-serif">
                {isAr ? "رحلة كتابك من الفكرة حتى باب منزلك" : "The 24–48h Journey from Order to Doorstep"}
              </h2>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-[#DAF7C6] px-3 py-1 rounded-[2px]">
              <Check className="w-3.5 h-3.5" />
              <span>{isAr ? "طباعة محلية في الإمارات" : "Locally Produced in UAE"}</span>
            </div>
          </div>

          {/* Timeline Milestones Graphic */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {dispatchMilestones.map((m, idx) => (
              <div
                key={idx}
                className="bg-[#FDF8F1] p-5 rounded-[2px] border border-amber-900/10 flex flex-col justify-between relative group hover:border-[#1E5751]/40 transition"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-black text-[#1E5751] bg-[#1E5751]/10 px-2 py-0.5 rounded-[2px]">
                      {m.hour}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white px-2 py-0.5 rounded-[2px] border border-slate-200">
                      {m.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-[#23231E] font-serif mb-2 leading-snug">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-amber-900/10 flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span>{isAr ? `المرحلة ${idx + 1} من ٤` : `Stage ${idx + 1} of 4`}</span>
                  <span className="text-[#1E5751]">✓</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Courier Tracking Partners Section (Requirement 2: Careem Box, Emirates Post, Aramex) */}
        <section aria-label="Courier Partners" className="bg-white p-7 sm:p-10 rounded-[2px] border border-slate-200 shadow-xs mb-14">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-black uppercase tracking-wider text-[#1E5751] block mb-1">
              {isAr ? "شركاء التوصيل المعتمدون" : "Verified Courier Tracking Partners"}
            </span>
            <h2 className="text-2xl font-black text-[#23231E] font-serif mb-2">
              {isAr ? "شحن آمن مع كبرى شركات التوصيل في الإمارات" : "Premium Courier Partners Across the UAE"}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {isAr
                ? "نتعاون مع شبكات لوجستية رائدة داخل الدولة لضمان وصول الكتب بحالتها المثالية مع إمكانية التتبع المباشر وإشعارك لحظة بلحظة."
                : "We partner directly with leading UAE logistics operators for seamless doorstep drops, live GPS map tracking, and flexible contactless drop-offs."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courierPartners.map((partner, idx) => (
              <div
                key={idx}
                className="bg-[#FDF8F1] p-6 rounded-[2px] border border-amber-900/10 flex flex-col justify-between hover:border-[#1E5751] transition"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-black text-[#1E5751] uppercase tracking-wider bg-white px-2 py-0.5 rounded-[2px] border border-slate-200">
                      {isAr ? partner.speedAr : partner.speed}
                    </span>
                    <Truck className="w-4 h-4 text-[#1E5751]" />
                  </div>
                  <h3 className="text-lg font-black text-[#23231E] font-serif mb-1">
                    {isAr ? partner.nameAr : partner.name}
                  </h3>
                  <div className="text-xs font-bold text-slate-700 mb-2">
                    {isAr ? partner.serviceAr : partner.serviceEn}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {isAr ? partner.coverageAr : partner.coverageEn}
                  </p>
                </div>
                <div className="pt-3 border-t border-amber-900/10 flex items-center justify-between text-[11px] font-bold text-[#1E5751]">
                  <span>{isAr ? partner.tagAr : partner.tagEn}</span>
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3 Delivery Options Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {/* Option 1: Instant Digital */}
          <div className="bg-white p-7 rounded-[2px] border-2 border-emerald-600 shadow-xs flex flex-col justify-between relative">
            <div
              className={`absolute -top-3 ${
                isAr ? "left-6" : "right-6"
              } bg-emerald-700 text-white font-black text-[10px] uppercase px-3 py-1 rounded-[2px] shadow-xs`}
            >
              {isAr ? "الأسرع والأوفر" : "Instant & Eco-Friendly"}
            </div>
            <div>
              <div className="w-12 h-12 rounded-[2px] bg-emerald-100 text-emerald-800 flex items-center justify-center font-black mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#23231E] font-serif mb-2">
                {isAr ? "التسليم الرقمي الفوري" : "Instant 5-Minute Digital"}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {isAr
                  ? "يُفتح القارئ التفاعلي ثلاثي الأبعاد فوراً على متصفحك، ويصلك ملف PDF عالي الدقة (300 DPI) عبر الإيميل والواتساب، مع رابط إهداء خاص للمشاركة العائلية."
                  : "Immediate 3D interactive virtual reader access on your phone or tablet, plus print-ready 300 DPI archival PDF and shareable gift link."}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-bold text-sm">
              <span className="text-slate-500">{isAr ? "الوقت:" : "Speed:"}</span>
              <span className="text-emerald-700 font-black">{isAr ? "٥ دقائق فقط" : "Under 5 Minutes"}</span>
            </div>
          </div>

          {/* Option 2: UAE Express Courier */}
          <div className="bg-white p-7 rounded-[2px] border-2 border-[#1E5751] shadow-xs flex flex-col justify-between relative">
            <div
              className={`absolute -top-3 ${
                isAr ? "left-6" : "right-6"
              } bg-[#1E5751] text-white font-black text-[10px] uppercase px-3 py-1 rounded-[2px] shadow-xs`}
            >
              {isAr ? "توصيل محلي في الإمارات" : "UAE Local Express"}
            </div>
            <div>
              <div className="w-12 h-12 rounded-[2px] bg-[#DAF7C6] text-[#1E5751] flex items-center justify-center font-black mb-6">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#23231E] font-serif mb-2">
                {isAr ? "الشحن السريع المحلي" : "UAE Express Courier"}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {isAr
                  ? "طباعة رقمية فاخرة وتجليد يدوي متقن داخل ورشتنا في دولة الإمارات، مع شحن سريع وتتبع مباشر عبر رسائل الواتساب حتى باب منزلك."
                  : "Local precision printing and luxury binding dispatched directly across Dubai, Abu Dhabi, and all 7 Emirates with live WhatsApp courier tracking."}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-bold text-sm">
              <span className="text-slate-500">{isAr ? "الوقت:" : "Speed:"}</span>
              <span className="text-[#1E5751] font-black">{isAr ? "٢٤ إلى ٤٨ ساعة" : "24–48 Hours"}</span>
            </div>
          </div>

          {/* Option 3: Luxury Keepsake Box Packaging */}
          <div className="bg-white p-7 rounded-[2px] border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-[2px] bg-[#FFE39C] text-[#23231E] flex items-center justify-center font-black mb-6">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#23231E] font-serif mb-2">
                {isAr ? "صندوق الهدايا الملكي" : "Luxury Keepsake Box"}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {isAr
                  ? "يوضع الكتاب داخل صندوق هدايا زمردي صلب مع نقوش ذهبية وشريط ستان حريري لحماية الكتاب وإبهار الطفل ومستلم الهدية عند الفتح."
                  : "Hand-packaged in a rigid presentation box with gold-foil embossing and emerald satin ribbon pull for an unforgettable unboxing experience."}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-bold text-sm">
              <span className="text-slate-500">{isAr ? "الوقت:" : "Speed:"}</span>
              <span className="text-slate-900 font-black">{isAr ? "٢ إلى ٣ أيام عمل" : "2–3 Working Days"}</span>
            </div>
          </div>
        </div>

        {/* 7 Emirates Delivery Timetable */}
        <section aria-label="7 Emirates Timetable" className="bg-white p-7 sm:p-10 rounded-[2px] border border-slate-200 shadow-xs mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-black text-[#23231E] font-serif">
                {isAr ? "جدول التوصيل لكافة الإمارات السبع" : "7 Emirates Doorstep Delivery Timetable"}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {isAr
                  ? "يتم شحن جميع الطلبات المحلية عبر شركائنا المعتمدين (كريم بوكس، أرامكس، وبريد الإمارات) مع التوصيل لباب منزلك"
                  : "Dispatched locally via Careem Box, Aramex & Emirates Post Express with full doorstep tracking"}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold bg-[#DAF7C6] text-[#1E5751] px-3.5 py-1.5 rounded-[2px] self-start sm:self-auto border border-emerald-300">
              <ShieldCheck className="w-4 h-4" />
              <span>{isAr ? "شحن مجاني فوق ١٠٠ د.إ" : "FREE Shipping Over 100 AED"}</span>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm" dir={currentDir}>
              <thead>
                <tr className="border-b border-slate-200 text-[#23231E] font-bold text-xs uppercase tracking-wider">
                  <th className="pb-3">{isAr ? "الإمارة / المنطقة" : "Emirate / Region"}</th>
                  <th className="pb-3">{isAr ? "مستوى الخدمة" : "Service Level"}</th>
                  <th className="pb-3">{isAr ? "الاستلام الرقمي" : "Digital Access"}</th>
                  <th className="pb-3">{isAr ? "مدة الشحن الورقي" : "Express Courier"}</th>
                  <th className="pb-3">{isAr ? "رسوم التوصيل" : "Courier Fee"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {[
                  {
                    emirate: isAr ? "دبي (Dubai)" : "Dubai",
                    tier: isAr ? "إكسبرس خلال يوم" : "24h Express",
                    digital: isAr ? "٥ دقائق" : "5 Minutes",
                    physical: isAr ? "٢٤ ساعة (24h)" : "24 Hours (24h)",
                    fee: isAr ? "١٥ د.إ (مجاناً فوق ١٠٠ د.إ)" : "15 AED (FREE over 100 AED)",
                    badge: "bg-emerald-50 text-emerald-800",
                  },
                  {
                    emirate: isAr ? "أبوظبي (Abu Dhabi)" : "Abu Dhabi",
                    tier: isAr ? "بريميوم فائق السرعة" : "24-36h Premium",
                    digital: isAr ? "٥ دقائق" : "5 Minutes",
                    physical: isAr ? "٢٤-٣٦ ساعة" : "24–36 Hours",
                    fee: isAr ? "١٥ د.إ (مجاناً فوق ١٠٠ د.إ)" : "15 AED (FREE over 100 AED)",
                    badge: "bg-blue-50 text-blue-800",
                  },
                  {
                    emirate: isAr ? "الشارقة (Sharjah)" : "Sharjah",
                    tier: isAr ? "إكسبرس خلال يوم" : "24h Express",
                    digital: isAr ? "٥ دقائق" : "5 Minutes",
                    physical: isAr ? "٢٤ ساعة (24h)" : "24 Hours (24h)",
                    fee: isAr ? "١٥ د.إ (مجاناً فوق ١٠٠ د.إ)" : "15 AED (FREE over 100 AED)",
                    badge: "bg-emerald-50 text-emerald-800",
                  },
                  {
                    emirate: isAr ? "عجمان (Ajman)" : "Ajman",
                    tier: isAr ? "توصيل قياسي سريع" : "24-48h Standard",
                    digital: isAr ? "٥ دقائق" : "5 Minutes",
                    physical: isAr ? "٢٤-٤٨ ساعة (24–48 Hours)" : "24–48 Hours",
                    fee: isAr ? "١٥ د.إ (مجاناً فوق ١٠٠ د.إ)" : "15 AED (FREE over 100 AED)",
                    badge: "bg-slate-100 text-slate-700",
                  },
                  {
                    emirate: isAr ? "رأس الخيمة (Ras Al Khaimah)" : "Ras Al Khaimah",
                    tier: isAr ? "شحن مجدول منتظم" : "36-48h Scheduled",
                    digital: isAr ? "٥ دقائق" : "5 Minutes",
                    physical: isAr ? "٣٦-٤٨ ساعة (حتى 48 Hours)" : "36–48 Hours (up to 48 Hours)",
                    fee: isAr ? "١٥ د.إ (مجاناً فوق ١٠٠ د.إ)" : "15 AED (FREE over 100 AED)",
                    badge: "bg-slate-100 text-slate-700",
                  },
                  {
                    emirate: isAr ? "الفجيرة (Fujairah)" : "Fujairah",
                    tier: isAr ? "شحن ساحلي منتظم" : "36-48h Coastal",
                    digital: isAr ? "٥ دقائق" : "5 Minutes",
                    physical: isAr ? "٣٦-٤٨ ساعة (حتى 48 Hours)" : "36–48 Hours (up to 48 Hours)",
                    fee: isAr ? "١٥ د.إ (مجاناً فوق ١٠٠ د.إ)" : "15 AED (FREE over 100 AED)",
                    badge: "bg-slate-100 text-slate-700",
                  },
                  {
                    emirate: isAr ? "أم القيوين (Umm Al Quwain)" : "Umm Al Quwain",
                    tier: isAr ? "شحن مباشر منتظم" : "36-48h Direct",
                    digital: isAr ? "٥ دقائق" : "5 Minutes",
                    physical: isAr ? "٣٦-٤٨ ساعة (حتى 48 Hours)" : "36–48 Hours (up to 48 Hours)",
                    fee: isAr ? "١٥ د.إ (مجاناً فوق ١٠٠ د.إ)" : "15 AED (FREE over 100 AED)",
                    badge: "bg-slate-100 text-slate-700",
                  },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 font-bold text-[#23231E]">{row.emirate}</td>
                    <td className="py-3.5">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-[2px] ${row.badge}`}>
                        {row.tier}
                      </span>
                    </td>
                    <td className="py-3.5 text-emerald-700 font-bold">{row.digital}</td>
                    <td className="py-3.5 font-semibold text-[#1E5751]">{row.physical}</td>
                    <td className="py-3.5 text-slate-500 font-medium">{row.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#1E5751]" />
              {isAr
                ? "مواعيد الإرسال: السبت إلى الخميس (الطلبات قبل ٢:٠٠ ظهراً تُشحن في نفس اليوم)"
                : "Daily cutoff: Orders placed before 2:00 PM GST dispatch the same business day"}
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              {isAr ? "توصيل عطلة نهاية الأسبوع متوفر في دبي وأبوظبي" : "Weekend residential delivery active in Dubai & Abu Dhabi"}
            </span>
          </div>
        </section>

        {/* Digital Flipbook Instant Delivery Section */}
        <div className="bg-[#1E5751] text-white p-7 sm:p-10 rounded-[2px] shadow-sm mb-14 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-white/10 text-[#FFD15A] text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? "تسليم فوري دون أي انتظار" : "Zero Waiting Time"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif tracking-tight leading-tight">
                {isAr
                  ? "اقرأ كتابك رقمياً خلال ٥ دقائق بينما يُطبع ورقياً"
                  : "Instant 3D Virtual Flipbook: Read in 5 Minutes While It Prints"}
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                {isAr
                  ? "لا داعي للانتظار حتى وصول المندوب لبدء المغامرة! فور تأكيد طلبك، يولد محركنا الذكي نسخة رقمية تفاعلية ثلاثية الأبعاد تحتوي على اسم طفلك ومظهره وإهدائك الشخصي لتقرآ معاً في سريره الليلة."
                  : "Don't wait for the courier to start the magic! Within 5 minutes of placing your order, our rendering engine creates an interactive 3D virtual flipbook featuring your child's name, customized avatar, and heartfelt dedication."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-white/10 p-3.5 rounded-[2px] border border-white/10 flex items-start gap-2.5">
                  <Smartphone className="w-5 h-5 text-[#FFD15A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-black text-white mb-0.5">
                      {isAr ? "قارئ ثلاثي الأبعاد واقعي" : "3D Realistic Reader"}
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      {isAr ? "تقليب صفحات واقعي مع مؤثرات صوتية لصوت الورق" : "Crisp page-turning sounds and dual-page spread reading"}
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 p-3.5 rounded-[2px] border border-white/10 flex items-start gap-2.5">
                  <FileText className="w-5 h-5 text-[#FFD15A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-black text-white mb-0.5">
                      {isAr ? "ملف PDF عالي الدقة (300 DPI)" : "Archival 300 DPI PDF"}
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      {isAr ? "نسخة أرشيفية جاهزة للطباعة والاحتفاظ العائلي" : "Full-resolution download for archiving and family sharing"}
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 p-3.5 rounded-[2px] border border-white/10 flex items-start gap-2.5">
                  <Gift className="w-5 h-5 text-[#FFD15A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-black text-white mb-0.5">
                      {isAr ? "رابط إهداء رقمي عبر الواتساب" : "WhatsApp Gift Unwrapping"}
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      {isAr ? "شارك رابط الهدية التفاعلي مع الأجداد والأقارب فوراً" : "Send instant interactive ribbon-cutting link via WhatsApp"}
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 p-3.5 rounded-[2px] border border-white/10 flex items-start gap-2.5">
                  <Volume2 className="w-5 h-5 text-[#FFD15A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-black text-white mb-0.5">
                      {isAr ? "رمز الاستماع الصوتي QR" : "Audio Narration Ready"}
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      {isAr ? "استمع للموسيقى والأشعار الموزونة باللغتين" : "Bilingual poetic narration and atmospheric background music"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#143B37] p-6 rounded-[2px] border border-white/15 text-center shadow-inner">
                <div className="w-14 h-14 rounded-[2px] bg-[#FFD15A] text-[#23231E] flex items-center justify-center mx-auto mb-4 font-black text-2xl">
                  ⚡
                </div>
                <h3 className="text-lg font-black font-serif text-white mb-2">
                  {isAr ? "تسليم رقمي مؤكد خلال ٥ دقائق" : "Guaranteed 5-Minute Delivery"}
                </h3>
                <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                  {isAr
                    ? "بمجرد إتمام الدفع، يتم تجهيز الرابط التفاعلي وإرساله فوراً عبر الإيميل ورسائل الواتساب."
                    : "No waiting period. Checkout immediately unlocks your virtual flipbook and downloads."}
                </p>
                <Link
                  href={isAr ? "/ar/create/start" : "/create/start"}
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#FFD15A] hover:bg-amber-400 text-[#23231E] font-black py-3.5 px-6 rounded-[2px] text-sm transition shadow-sm"
                >
                  <span>{isAr ? "جرب المعاينة الفورية الآن" : "Preview Your Book Now"}</span>
                  <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Tracking Opt-In Callout */}
        <section aria-label="WhatsApp Tracking" className="bg-[#F0FAF0] border-2 border-emerald-600/40 p-7 sm:p-10 rounded-[2px] shadow-xs mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider border border-emerald-300">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{isAr ? "خدمة تتبع الشحنة المباشرة" : "Live Courier Tracking"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#23231E] font-serif">
                {isAr
                  ? "تتبع مباشر ومرن لشحنتك عبر رسائل الواتساب"
                  : "Live WhatsApp Tracking & Real-Time Courier Alerts"}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isAr
                  ? "لا داعي للبحث عن أرقام بوالص الشحن المعقدة. بنقرة واحدة عند إتمام الطلب، تتلقى تحديثات مرحلية حية على الواتساب مع رابط مباشر لسيارة المندوب وخريطة الوصول عبر كريم بوكس أو أرامكس أو بريد الإمارات."
                  : "Skip opaque tracking numbers and telephone hold music. Opt in during checkout with one tap to receive interactive status updates on WhatsApp with live GPS driver tracking directly to your door."}
              </p>

              {/* Progress Tracker Simulation */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 bg-white p-3 rounded-[2px] border border-emerald-200 shadow-xs">
                  <div className="w-7 h-7 rounded-[2px] bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    ✓
                  </div>
                  <div className="text-xs">
                    <span className="font-black text-[#23231E]">
                      {isAr ? "١. تأكيد الطلب والطباعة الفورية:" : "1. Order Confirmed & Printing:"}
                    </span>{" "}
                    <span className="text-slate-600">
                      {isAr
                        ? "يبدأ تجهيز الورق الأرشيفي ٢٠٠ جم والأحبار النباتية"
                        : "Mohawk 200 GSM paper feed & color calibration started"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white p-3 rounded-[2px] border border-emerald-200 shadow-xs">
                  <div className="w-7 h-7 rounded-[2px] bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    ✓
                  </div>
                  <div className="text-xs">
                    <span className="font-black text-[#23231E]">
                      {isAr ? "٢. التجليد اليدوي والفحص:" : "2. Hand-Bound & Inspected:"}
                    </span>{" "}
                    <span className="text-slate-600">
                      {isAr
                        ? "اجتياز اختبار الجودة والتغليف في الغلاف المقاوم للرطوبة"
                        : "12-point quality review passed & sealed in rigid mailer"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white p-3 rounded-[2px] border border-emerald-200 shadow-xs">
                  <div className="w-7 h-7 rounded-[2px] bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    🚚
                  </div>
                  <div className="text-xs">
                    <span className="font-black text-[#23231E]">
                      {isAr ? "٣. خروج الشحنة مع المندوب:" : "3. Out for Delivery:"}
                    </span>{" "}
                    <span className="text-slate-600">
                      {isAr
                        ? "رسالة واتساب تحتوي على رابط تتبع المندوب وزمن الوصول التقريبي"
                        : "Live driver GPS link & 2-hour delivery window sent to WhatsApp"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Message Bubble Mockup */}
            <div className="lg:col-span-5">
              <div className="bg-[#EFEAE2] p-5 rounded-[2px] shadow-sm border border-slate-300 max-w-sm mx-auto">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-300/80 mb-3">
                  <div className="w-8 h-8 rounded-[2px] bg-emerald-700 text-white flex items-center justify-center font-black text-xs">
                    PT
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-800">
                      {isAr ? "حكايات مخصصة | التوصيل" : "PersonalizedTales UAE"}
                    </div>
                    <div className="text-[10px] text-emerald-700 font-bold">● {isAr ? "متصل الآن" : "Online"}</div>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-[2px] shadow-2xs text-xs space-y-2 mb-2">
                  <p className="font-black text-[#1E5751]">
                    {isAr ? "مرحباً! طلبك #PT-8429 في الطريق إليك 🚚" : "Hello! Your book #PT-8429 is on its way 🚚"}
                  </p>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {isAr
                      ? "المندوب طارق يتجه حالياً إلى عنوانك في دبي. وقت الوصول المتوقع: 3:30 - 4:15 مساءً."
                      : "Courier Tariq is en route to your address in Dubai. Estimated arrival: 3:30 PM – 4:15 PM."}
                  </p>
                  <div className="p-2 bg-slate-50 rounded-[2px] text-[10px] text-slate-500 flex items-center justify-between border border-slate-100">
                    <span>📍 {isAr ? "رابط التتبع المباشر (GPS)" : "Live GPS Courier Map"}</span>
                    <span className="text-emerald-700 font-bold">{isAr ? "فتح الخريطة" : "View Live"}</span>
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-[10px] text-slate-500">
                    {isAr ? "يمكنك الرد بإرشادات البوابة أو الاستلام من الأمن" : "Reply with gate code or concierge instructions"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local Advantage Callout */}
        <section aria-label="Local Advantage" className="bg-[#DAF7C6] p-7 sm:p-10 rounded-[2px] border border-emerald-300 mb-14">
          <div className="max-w-3xl">
            <span className="inline-block bg-white text-[#1E5751] text-xs font-black px-3 py-1 rounded-[2px] uppercase tracking-wider mb-3 border border-emerald-200">
              {isAr ? "مقارنة السرعة والتكلفة" : "Local Advantage vs International Importers"}
            </span>
            <h3 className="text-2xl font-black text-[#23231E] font-serif mb-3">
              {isAr
                ? "لماذا ينتظر عملاء المواقع العالمية شهراً كاملاً بينما نصلك في ٢٤ إلى ٤٨ ساعة؟"
                : "Why wait 20 to 33 days from European printers when you can receive it in 24–48 hours?"}
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed mb-6">
              {isAr
                ? "تشحن المواقع العالمية كتبها من المملكة المتحدة وأوروبا بالبريد الدولي البطيء، مما يستغرق حتى ٣٣ يوماً مع رسوم جمركية ومخاطر تلف الحواف. نحن نطبع ونفحص محلياً في دولة الإمارات بأعلى معايير الورق والتجليد، ونوفر تسليماً رقمياً فورياً خلال ٥ دقائق وشحناً محلياً سريعاً خلال ٢٤ إلى ٤٨ ساعة."
                : "International custom book publishers print overseas in the UK and ship via slow postal freight, taking 20 to 33 calendar days to reach the UAE with unexpected customs delays and crushed packaging. We craft and inspect every book locally in the UAE, providing 5-minute digital access and 24–48 hour local express delivery."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-white p-4 rounded-[2px] flex items-center gap-3 border border-slate-200">
                <Check className="w-5 h-5 text-emerald-700 shrink-0" />
                <span className="text-xs font-bold text-[#23231E]">
                  {isAr ? "تتبع مباشر للطلب وتحديثات واتساب حية" : "Live WhatsApp updates & direct courier contact"}
                </span>
              </div>
              <div className="bg-white p-4 rounded-[2px] flex items-center gap-3 border border-slate-200">
                <Check className="w-5 h-5 text-emerald-700 shrink-0" />
                <span className="text-xs font-bold text-[#23231E]">
                  {isAr ? "تغليف صلب مقاوم للرطوبة والصدمات لحماية الحواف" : "Rigid waterproof corner packaging preventing bent spines"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Inline FAQ Mini-Section */}
        <section aria-label="Delivery FAQs" className="bg-white p-7 sm:p-10 rounded-[2px] border border-slate-200 shadow-xs mb-14">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-black uppercase tracking-wider text-[#1E5751] mb-2 block">
              {isAr ? "الأسئلة الشائعة" : "Delivery FAQ"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#23231E] font-serif">
              {isAr ? "أهم الاستفسارات حول الشحن والتوصيل" : "Frequently Asked Questions About Delivery"}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto" dir={currentDir}>
            <Accordion
              items={deliveryFaqs.map((faq, idx) => ({
                id: `delivery-faq-${idx}`,
                heading: faq.q,
                content: <p>{faq.a}</p>,
              }))}
              single
              defaultOpenIndex={0}
            />
          </div>

          <div className="mt-8 text-center">
            <Link
              href={isAr ? "/ar/faq" : "/faq"}
              className="inline-flex items-center gap-1.5 text-xs font-black text-[#1E5751] hover:underline"
            >
              <span>{isAr ? "هل تبحث عن إجابات أخرى؟ تصفح جميع الأسئلة الشائعة ➔" : "Looking for more details? Browse our complete FAQ center ➔"}</span>
            </Link>
          </div>
        </section>

        {/* Bottom CTA */}
        <section aria-label="Call to Action" className="text-center bg-[#FFE39C]/40 border border-[#FFE39C] p-8 sm:p-10 rounded-[2px]">
          <h3 className="text-2xl sm:text-3xl font-black text-[#23231E] font-serif mb-3">
            {isAr ? "جاهز لابتكار قصة لا تُنسى لطفلك؟" : "Ready to Create an Unforgettable Heirloom?"}
          </h3>
          <p className="text-slate-600 text-sm max-w-xl mx-auto mb-6">
            {isAr
              ? "اختر القصة، أدخل اسم طفلك ومظهره، وعاين كل صفحة في القارئ ثلاثي الأبعاد مجاناً قبل الشراء."
              : "Choose a story, customize your child's character, and preview every single page in 3D for free before ordering."}
          </p>
          <Link
            href={isAr ? "/ar/create/start" : "/create/start"}
            className="inline-flex items-center gap-2 bg-[#23231E] hover:bg-black text-white font-black px-8 py-3.5 rounded-[2px] text-sm sm:text-base shadow-sm transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>{isAr ? "ابدأ تخصيص كتابك الآن مجاناً ➔" : "Personalize Your Book in 2 Minutes ➔"}</span>
          </Link>
        </section>
      </main>
    </div>
  );
}
