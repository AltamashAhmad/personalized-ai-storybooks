"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Compass,
  Feather,
  GraduationCap,
  Heart,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import StoreHeader from "@/components/StoreHeader";
import { useCountry } from "@/lib/context/CountryContext";

export default function AboutUsView({ initialLang }: { initialLang?: "en" | "ar" }) {
  const { language } = useCountry();
  const currentLang = initialLang || language;
  const isAr = currentLang === "ar";
  const currentDir = isAr ? "rtl" : "ltr";

  // Team members: Our Story Weavers
  const storyWeavers = [
    {
      name: isAr ? "فاطمة النعيمي" : "Fatima Al-Nuaimi",
      role: isAr ? "شريك مؤسس ومديرة التراث الأدبي العربي" : "Co-Founder & Head of Arabic Literary Heritage",
      bio: isAr
        ? "كاتبة وباحثة إماراتية في أدب الطفل. تقود فريق صياغة الأشعار والقصص باللغة العربية الفصحى مع الضبط النحوي والتشكيل الكامل، وتستلهم حكاياتها من سحر الرمال وتراث الآباء والأجداد."
        : "Emirati children's author and heritage researcher. Fatima ensures every story verse adheres to lyrical Modern Standard Arabic with complete grammatical Tashkeel, celebrating Arabian wonder.",
      expertise: isAr ? "الشعر العربي والتشكيل الدقيق والتراث الإماراتي" : "Arabic Meter, Tashkeel & Cultural Heritage",
      initials: "FN",
      bg: "bg-[#1E5751] text-white",
    },
    {
      name: isAr ? "ماركوس ليندكفيست" : "Marcus Lindqvist",
      role: isAr ? "مدير الرسوم والفنون البصرية" : "Lead Children's Book Illustrator & Art Director",
      bio: isAr
        ? "رسام كتب أطفال دولي حائز على جوائز مرموقة. يدمج الدفء الإسكندنافي مع ألوان الصحراء الذهبية وسماء الخليج المرصعة بالنجوم لخلق عوالم بصرية ساحرة لكل صفحة."
        : "Award-winning Nordic visual artist who fell in love with Arabian skies. Marcus blends whimsical, warm character design with rich desert palettes and luminous astronomical spreads.",
      expertise: isAr ? "رسم الشخصيات والخلفيات البانورامية المزدوجة" : "Character Design & Panoramic Spread Illustration",
      initials: "ML",
      bg: "bg-[#FFD15A] text-[#23231E]",
    },
    {
      name: isAr ? "د. طارق منصور" : "Dr. Tariq Mansoor",
      role: isAr ? "المدير التقني وهندسة التخصيص الذكي" : "Chief Technology Officer & Personalization Architect",
      bio: isAr
        ? "دكتوراه في اللغويات الحاسوبية وخبير في الذكاء الاصطناعي التوليدي. صمم المحرك الرقمي ثلاثي الأبعاد ومعالج الطباعة اللحظي الذي يدمج مظهر الطفل واسمه في ثوانٍ معدودة."
        : "PhD in Computational Linguistics. Tariq architected our real-time 3D book preview engine and dynamic typesetting pipeline that blends custom child avatars into high-res print files.",
      expertise: isAr ? "الطباعة الرقمية ثلاثية الأبعاد ومعالجة الخط العربي" : "Dynamic RTL Typesetting & 3D Flipbook Engines",
      initials: "TM",
      bg: "bg-emerald-800 text-white",
    },
    {
      name: isAr ? "زيان الخطيب" : "Zayan Al-Khatib",
      role: isAr ? "مدير ورشة التجليد والطباعة الحرفية" : "Master Bookbinder & Production Director",
      bio: isAr
        ? "حرفي تجليد متمرس يتمتع بأكثر من ٢٥ عاماً في فنون التجليد الملكي الفاخر ونقوش الذهب في دولة الإمارات. يشرف شخصياً على جودة صمغ PUR وتثبيت الصفحات المسطحة."
        : "Master artisan with 25+ years in luxury bespoke bookmaking in the UAE. Zayan oversees PUR spine bonding, 200 GSM Mohawk sheet feeds, and hand-embossed foil titles.",
      expertise: isAr ? "التجليد المسطح والنقش المذهب وصمغ PUR" : "PUR Layflat Binding, Foil Stamping & Finishing",
      initials: "ZK",
      bg: "bg-amber-900 text-white",
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
          <span className="text-[#23231E]">{isAr ? "قصتنا ورؤيتنا" : "Our Story"}</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] bg-[#FFD15A]/30 border border-[#FFD15A] text-[#23231E] text-xs font-black uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-800" />
            <span>
              {isAr
                ? "ولدت في أبوظبي، صُنعت لكل طفل في الإمارات"
                : "Born in Abu Dhabi, Made for Every Emirates Child"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#23231E] tracking-tight font-serif mb-5 leading-tight">
            {isAr
              ? "نصنع حكايات استثنائية تجعل كل طفل بطلاً لقصته الخالدة"
              : "We Turn Every Child into the Hero of an Unforgettable Keepsake"}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? "نؤمن بأن رؤية الطفل لاسمه ومظهره بطلاً في قصة مطبوعة باللغة العربية الفصحى والإنجليزية ليس مجرد تسلية، بل هو شرارة تبني هويته وثقته بنفسه وتغرس فيه حب القراءة مدى الحياة."
              : "We believe seeing yourself as the hero of a tangible, heirloom storybook in both Arabic and English isn't just entertainment — it anchors a child's identity, builds lifelong confidence, and sparks an enduring love of reading."}
          </p>
        </div>

        {/* Big Visual Photo */}
        <div className="relative aspect-[16/9] rounded-[2px] overflow-hidden shadow-sm border border-slate-200 mb-14">
          <Image
            src="/images/hero_reading_lifestyle.jpg"
            alt="Family reading personalized keepsake book"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 800px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 sm:p-10">
            <div className="text-white max-w-xl">
              <span className="inline-block bg-[#1E5751] text-white text-xs font-black px-3 py-1 rounded-[2px] uppercase tracking-wider mb-2">
                {isAr ? "رؤيتنا الثقافية" : "Our Heritage Mission"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-serif">
                {isAr ? "جسور الخيال بين عراقة التراث وتطلعات المستقبل" : "Bridging Arabic Heritage & Modern Wonder"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 mt-1">
                {isAr
                  ? "كتب تحتفي بالصقور والرمال الذهبية ومسابر الفضاء، مصممة بلغة ثنائية متوازنة تجمع أفراد الأسرة معاً."
                  : "Books celebrating desert dunes, soaring falcons, and galactic space probes, crafted to bring families together every bedtime."}
              </p>
            </div>
          </div>
        </div>

        {/* Dual Heritage Section: London & Abu Dhabi (Requirement 4) */}
        <section aria-label="Dual Heritage" className="bg-white p-7 sm:p-10 rounded-[2px] border border-slate-200 shadow-xs mb-14">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-black uppercase tracking-wider text-[#1E5751] block mb-1">
              {isAr ? "الجذور والهوية المزدوجة" : "London & Abu Dhabi Dual Heritage"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#23231E] font-serif mb-3">
              {isAr
                ? "إرث النشر البريطاني العريق يلتقي بأصالة وفخر أبوظبي"
                : "London Storytelling Heritage Meets Abu Dhabi Pride"}
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {isAr
                ? "تأسست دارنا برؤية تجمع بين بيئتين غنيتين بالإلهام: تقاليد النشر الأدبي والتجليد الكلاسيكي الراقي في لندن، مع روح الأصالة والضيافة والتراث الشعري الملهم في عاصمة الإمارات أبوظبي. أردنا دمج صرامة النشر الإنجليزي العالمي بسحر الحكاية العربية الفصيحة لتلهم أطفالنا في دولة الإمارات شغف القراءة واعتزاز الهوية."
                : "Our publishing house was forged across two inspiring literary capitals: the storied bookbinding tradition and narrative craft of London, intertwined with the deep cultural pride, poetic lyricism, and boundless ambition of Abu Dhabi, United Arab Emirates. We united the highest international editorial standards with authentic Middle Eastern representation."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#FDF8F1] p-6 rounded-[2px] border border-amber-900/10">
              <div className="flex items-center gap-2 mb-2 text-[#1E5751] font-bold text-xs uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                <span>{isAr ? "إرث لندن الأدبي" : "London Editorial Discipline"}</span>
              </div>
              <h3 className="text-lg font-black text-[#23231E] font-serif mb-2">
                {isAr ? "تقاليد حكايات الأطفال العالمية" : "Classic Narrative Artistry & Typography"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isAr
                  ? "استلهام معايير التجليد الأرشيفي، والإيقاع الشعري الموسيقي، والرسم التوضيحي الغامر الذي يتحدى شاشات الأجهزة الرقمية ويعيد للأطفال متعة حمل الكتاب الورقي الأصيل."
                  : "Drawing from Britain's rich heritage of picture book craft, rigorous typesetting, and musical rhyming meter that pulls children away from glowing screens into physical wonder."}
              </p>
            </div>

            <div className="bg-[#FDF8F1] p-6 rounded-[2px] border border-amber-900/10">
              <div className="flex items-center gap-2 mb-2 text-[#1E5751] font-bold text-xs uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>{isAr ? "قلب أبوظبي النابض" : "Abu Dhabi Cultural Anchor"}</span>
              </div>
              <h3 className="text-lg font-black text-[#23231E] font-serif mb-2">
                {isAr ? "اللغة العربية الفصحى والتراث الحي" : "Authentic Arabic Tashkeel & Local Pride"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isAr
                  ? "قصائد فصيحة موزونة بتشكيل نحوي كامل، واحتفاء بالشخصيات والبيئة المحلية من الكثبان الرملية الذهبية إلى استكشاف الفضاء مع طباعة سريعة في الإمارات."
                  : "Rooted in lyrical Modern Standard Arabic with complete Tashkeel, celebrating desert dunes, falcons, and futuristic probes with 24–48h local express dispatch."}
              </p>
            </div>
          </div>
        </section>

        {/* Founding Story: Why We Started in Abu Dhabi */}
        <section aria-label="Founding Story" className="bg-white p-7 sm:p-10 rounded-[2px] border border-slate-200 shadow-xs mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] text-xs font-black uppercase tracking-wider border border-[#1E5751]/20">
                <MapPin className="w-3.5 h-3.5" />
                <span>{isAr ? "بداية الحكاية في العاصمة" : "Founded in Abu Dhabi, UAE"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#23231E] font-serif tracking-tight">
                {isAr
                  ? "لماذا بدأنا في أبوظبي؟ سد فجوة أهملتها دور النشر العالمية"
                  : "Born in Abu Dhabi: Solving the Problem Global Publishers Ignored"}
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {isAr
                  ? "لسنوات طويلة، كان الآباء في الإمارات يطلبون كتب الأطفال المخصصة من مواقع بريطانية وأمريكية، فينتظرون من ٢٠ إلى ٣٣ يوماً لوصولها، ليفاجأوا بأنها مكتوبة بالإنجليزية فقط، أو تحوي ترجمة عربية آلية مشوهة تفتقر إلى التشكيل وتفصل الحروف وتتجاهل الاتجاه الصحيح للكتابة."
                  : "For years, families across the UAE ordered personalized children's books from overseas platforms in the UK and US. They waited 20 to 33 days for parcels to crawl through international post, only to receive books that ignored the Arabic language entirely, or printed broken, unvocalized translations with reversed letter connections."}
              </p>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {isAr
                  ? "لذلك تأسست 'حكايات مخصصة' في أبوظبي لنمنح أطفالنا ما يستحقونه: أدباً عربياً فصيحاً وموزوناً بتشكيل كامل، متوجاً برسومات عالمية وطباعة أرشيفية محلية فاخرة تصل لباب منزلك في الإمارات خلال ٢٤ إلى ٤٨ ساعة."
                  : "PersonalizedTales was founded in Abu Dhabi to give our children what they truly deserve: authentic Modern Standard Arabic poetry with full grammatical Tashkeel, matched with magnificent illustrations, printed locally in the UAE, and delivered to their doorstep in 24–48 hours."}
              </p>
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 text-xs font-black text-[#1E5751]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>
                    {isAr
                      ? "صناعة محلية ١٠٠٪ في دولة الإمارات العربية المتحدة"
                      : "100% locally printed, hand-bound, and dispatched in the United Arab Emirates"}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#DAF7C6]/50 p-6 rounded-[2px] border border-emerald-300 space-y-4">
                <h3 className="font-black text-lg text-[#1E5751] font-serif">
                  {isAr ? "وعدنا لكل أسرة في الإمارات" : "Our Commitment to UAE Families"}
                </h3>
                <ul className="space-y-3 text-xs text-slate-700 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="font-black text-emerald-800">✓</span>
                    <span>
                      {isAr
                        ? "تشكيل عربي كامل ودقيق لجميع الكلمات لتعزيز النطق السليم"
                        : "Complete grammatical Tashkeel on every Arabic verse for effortless read-alouds"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-black text-emerald-800">✓</span>
                    <span>
                      {isAr
                        ? "تسليم رقمي فوري خلال ٥ دقائق وتوصيل محلي خلال ٢٤-٤٨ ساعة"
                        : "Instant 5-minute digital 3D reading + local 24–48h express courier delivery"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-black text-emerald-800">✓</span>
                    <span>
                      {isAr
                        ? "تجليد مسطح ١٨٠° وورق موهوك ٢٠٠ جم وأحبار آمنة للأطفال"
                        : "Mohawk 200 GSM archival paper, 180° layflat binding & food-safe inks"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-black text-emerald-800">✓</span>
                    <span>
                      {isAr
                        ? "ضمان الذكرى الخالدة: استبدال مجاني مدى الحياة لحوادث القراءة"
                        : "Heirloom Guarantee: Free lifetime reprint for family bedtime accidents"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Pillars of Our Philosophy */}
        <section aria-label="Philosophy Pillars" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="bg-white p-7 rounded-[2px] border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-[2px] bg-[#DAF7C6] text-[#1E5751] flex items-center justify-center font-black mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#23231E] font-serif mb-3">
                {isAr ? "أدب راقٍ وتشكيل عربي دقيق" : "Literary Artistry & Tashkeel"}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {isAr
                  ? "لا نكتفي بوضع الاسم فوق قوالب جاهزة؛ بل نكتب أشعاراً موزونة وقصصاً ملهمة باللغة العربية الفصحى مع التشكيل الكامل، وكذلك بالإنجليزية الفاخرة، لتنمية الحصيلة اللغوية للصغار."
                  : "We don't merely stamp names onto templates. Every book features lyrical verses in Modern Standard Arabic with complete Tashkeel alongside rhythmic English poetry, empowering bilingual development."}
              </p>
            </div>
            <div className="text-xs font-bold text-[#1E5751] pt-4 border-t border-slate-100">
              {isAr ? "فصحى مشكولة + إنجليزية رنانة" : "Full Arabic Tashkeel + English Meter"}
            </div>
          </div>

          <div className="bg-white p-7 rounded-[2px] border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-[2px] bg-[#FFE39C] text-[#23231E] flex items-center justify-center font-black mb-6">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#23231E] font-serif mb-3">
                {isAr ? "تحف تذكارية، وليست ألعاباً عابرة" : "Heirlooms, Not Disposable Toys"}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {isAr
                  ? "الألعاب البلاستيكية تُنسى وتتلف بعد أسابيع، أما الكتاب التذكاري المزين بإهداء والديه فيظل محفوظاً في مكتبته حتى يكبر ويقرأه لأطفاله بعد ثلاثين عاماً بنفس النضارة والبريق."
                  : "Plastic toys break and get discarded within weeks. A luxury hardcover keepsake bearing a heartfelt dedication from parents or grandparents remains treasured for decades and generations."}
              </p>
            </div>
            <div className="text-xs font-bold text-[#23231E] pt-4 border-t border-slate-100">
              {isAr ? "عمر أرشيفي يتجاوز ١٠٠ عام" : "Engineered to Last 100+ Years"}
            </div>
          </div>

          <div className="bg-white p-7 rounded-[2px] border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-[2px] bg-emerald-100 text-emerald-800 flex items-center justify-center font-black mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#23231E] font-serif mb-3">
                {isAr ? "صُنعت بفخر في الإمارات" : "Proudly Crafted in the UAE"}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {isAr
                  ? "انطلقنا من أبوظبي وطورنا ورشتنا المحلية في الإمارات لتوفير تجربة تسوق سلسة بعملة الدرهم الإماراتي وتوصيل فوري خلال ٢٤ إلى ٤٨ ساعة لباب بيتك دون أي رسوم جمركية مفاجئة."
                  : "Headquartered in Abu Dhabi, we manufacture locally to provide transparent native AED pricing, zero foreign transaction fees, and fast 24–48 hour delivery to all 7 Emirates."}
              </p>
            </div>
            <div className="text-xs font-bold text-emerald-800 pt-4 border-t border-slate-100">
              {isAr ? "أبوظبي ودبي وسائر الإمارات" : "Abu Dhabi, Dubai & All 7 Emirates"}
            </div>
          </div>
        </section>

        {/* Artisan Print Studio Section */}
        <section aria-label="Print Studio" className="bg-[#FBF4E8] p-7 sm:p-10 rounded-[2px] border border-amber-900/10 mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-[#1E5751]">
                {isAr ? "الحرفية والطباعة المستدامة" : "Artisan Print Studio in UAE"}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#23231E] font-serif">
                {isAr ? "ورشة طباعة وتجليد حرفية خالية من الهدر" : "Zero-Waste On-Demand Printing in the UAE"}
              </h2>
              <p className="text-slate-700 text-sm leading-relaxed">
                {isAr
                  ? "في ورشتنا داخل دولة الإمارات، لا نقوم بطباعة كميات مسبقة مجهولة المصير. كل كتاب يُطبع فردياً عند طلبه بدقة فائقة على ورق موهوك الفاخر بسماكة ٢٠٠ جم، مع معايرة خاصة لألوان بانتون لإبراز درجات الرمال الذهبية وسحر الليل العربي."
                  : "Inside our UAE facility, we produce zero warehouse waste. Every single copy is manufactured on-demand the moment an order is confirmed, using 200 GSM Mohawk Silk paper, EN71-3 toy-safe inks, and high-precision color profiling tuned for rich Middle Eastern tones."}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>{isAr ? "١٢ نقطة فحص جودة يدوية" : "12-Point Manual Inspection"}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Layers className="w-4 h-4 text-emerald-700" />
                  <span>{isAr ? "تجليد PUR مسطح ١٨٠°" : "180° PUR Layflat Binding"}</span>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href={isAr ? "/ar/quality" : "/quality"}
                  className="inline-flex items-center gap-1.5 text-sm font-black text-[#1E5751] hover:underline"
                >
                  <span>{isAr ? "اطلع على مواصفات الورق والطباعة بالتفصيل ➔" : "Explore our full paper & binding specifications ➔"}</span>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-square rounded-[2px] overflow-hidden shadow-sm border border-slate-200">
                <Image
                  src="/images/book_craftsmanship.jpg"
                  alt="Craftsmanship book photo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Weavers Team Section */}
        <section aria-label="Our Team" className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-[#1E5751] mb-2 block">
              {isAr ? "فريق العمل" : "The Creators"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#23231E] font-serif">
              {isAr ? "نساجو الحكايات (Our Story Weavers)" : "Meet Our Story Weavers"}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
              {isAr
                ? "مزيج متناغم من الأدباء الإماراتيين، والرسامين العالميين، ومهندسي التقنية، وحرفيي التجليد في أبوظبي"
                : "A passionate team of Emirati authors, global children's illustrators, AI personalization engineers, and master bookbinders."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {storyWeavers.map((member, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-[2px] border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-14 h-14 rounded-[2px] flex items-center justify-center font-black text-lg shadow-2xs shrink-0 ${member.bg}`}
                    >
                      {member.initials}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-[#23231E] font-serif">{member.name}</h3>
                      <div className="text-xs font-bold text-[#1E5751]">{member.role}</div>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">{member.bio}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <Feather className="w-3.5 h-3.5 text-[#1E5751] shrink-0" />
                  <span>
                    {isAr ? "التخصص: " : "Specialty: "}
                    <strong className="text-slate-800">{member.expertise}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 1,000+ Books, 1,000+ Smiles Impact Counter & School Partnerships */}
        <section aria-label="Social Impact" className="bg-[#1E5751] text-white p-7 sm:p-10 rounded-[2px] shadow-sm mb-14 relative overflow-hidden">
          {/* Metric Highlights */}
          <div className="text-center max-w-2xl mx-auto mb-10 relative z-10">
            <span className="inline-block bg-[#FFD15A] text-[#23231E] text-xs font-black px-3 py-1 rounded-[2px] uppercase tracking-wider mb-3">
              {isAr ? "أثرنا في المجتمع" : "Our Impact in Numbers"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif tracking-tight">
              {isAr ? "١,٠٠٠+ كتاب، ١,٠٠٠+ ابتسامة" : "1,000+ Books, 1,000+ Smiles"}
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm mt-2">
              {isAr
                ? "إنجازات نفتخر بها مع عائلات ومدارس وحضانات دولة الإمارات العربية المتحدة"
                : "Real milestones reached with families and schools across the United Arab Emirates"}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-10 relative z-10">
            <div className="bg-white/10 p-5 rounded-[2px] border border-white/10 text-center">
              <div className="text-3xl sm:text-4xl font-black text-[#FFD15A] font-serif mb-1">1,850+</div>
              <div className="text-xs font-bold text-slate-200">
                {isAr ? "كتاب طُبع وجُلّد في الإمارات" : "Books Bound in UAE"}
              </div>
            </div>

            <div className="bg-white/10 p-5 rounded-[2px] border border-white/10 text-center">
              <div className="text-3xl sm:text-4xl font-black text-[#FFD15A] font-serif mb-1">7</div>
              <div className="text-xs font-bold text-slate-200">
                {isAr ? "إمارات تصلها شحناتنا لباب المنزل" : "Emirates Doorstep Reach"}
              </div>
            </div>

            <div className="bg-white/10 p-5 rounded-[2px] border border-white/10 text-center">
              <div className="text-3xl sm:text-4xl font-black text-[#FFD15A] font-serif mb-1">99.4%</div>
              <div className="text-xs font-bold text-slate-200">
                {isAr ? "نسبة رضا أولياء الأمور" : "Parent Satisfaction"}
              </div>
            </div>

            <div className="bg-white/10 p-5 rounded-[2px] border border-white/10 text-center">
              <div className="text-3xl sm:text-4xl font-black text-[#FFD15A] font-serif mb-1">35+</div>
              <div className="text-xs font-bold text-slate-200">
                {isAr ? "مدرسة وحضانة شريكة" : "Partner Schools & Nurseries"}
              </div>
            </div>
          </div>

          {/* School Partnerships Callout Card */}
          <div className="bg-[#143B37] p-6 sm:p-8 rounded-[2px] border border-white/15 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-2">
                <div className="flex items-center gap-2 text-[#FFD15A] text-xs font-bold">
                  <GraduationCap className="w-4 h-4" />
                  <span>
                    {isAr
                      ? "برامج القراءة لمدارس وحضانات الإمارات (ADEK & KHDA)"
                      : "UAE School & Nursery Gift Programs (Aligned with ADEK & KHDA)"}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-serif text-white">
                  {isAr
                    ? "هدايا تخرج وحفلات مخصصة لطلاب رياض الأطفال والمدارس"
                    : "Customized Graduation Keepsakes & Literacy Partnerships"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {isAr
                    ? "نتعاون مع مدارس أبوظبي ودبي لتقديم كتب مخصصة لكل طالب في حفلات التخرج ونهاية العام واليوم الوطني ويوم القراءة، حيث يتسلم كل طفل نسخته الفريدة المطبوعة باسمه وصورته ورسالة خاصة من معلمه."
                    : "We collaborate with leading early learning academies in Abu Dhabi and Dubai to craft custom storybooks for kindergarten graduations, UAE National Day celebrations, and Reading Month initiatives."}
                </p>
              </div>

              <div className="lg:col-span-4 text-center sm:text-right">
                <Link
                  href={isAr ? "/ar/contact" : "/contact"}
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#FFD15A] hover:bg-amber-400 text-[#23231E] font-black py-3 px-5 rounded-[2px] text-xs sm:text-sm transition shadow-2xs"
                >
                  <span>{isAr ? "استفسر عن هدايا المدارس ➔" : "Inquire About School Gifting ➔"}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section aria-label="Call to Action" className="text-center bg-[#FFE39C]/40 border border-[#FFE39C] p-8 sm:p-10 rounded-[2px]">
          <h3 className="text-2xl sm:text-3xl font-black text-[#23231E] font-serif mb-3">
            {isAr ? "امنح طفلك هدية حب القراءة مدى الحياة" : "Give Your Child the Gift of Lifelong Wonder"}
          </h3>
          <p className="text-slate-600 text-sm max-w-xl mx-auto mb-6">
            {isAr
              ? "خصص قصة لطفلك الآن في دقيقتين وشاهد اسمه ووجهه يضيء صفحات المغامرة في القارئ ثلاثي الأبعاد."
              : "Personalize your storybook in 2 minutes. Watch your child's face and name light up the pages in our 3D interactive reader."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/create/start"
              className="inline-flex items-center gap-2 bg-[#23231E] hover:bg-black text-white font-black px-8 py-3.5 rounded-[2px] text-sm sm:text-base shadow-sm transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{isAr ? "خصص قصة لطفلك الآن ➔" : "Personalize a Story Now ➔"}</span>
            </Link>
            <Link
              href={isAr ? "/ar/quality" : "/quality"}
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#1E5751] border border-slate-200 font-bold px-6 py-3.5 rounded-[2px] text-sm transition"
            >
              <span>{isAr ? "استكشف جودة الطباعة والورق" : "Explore Paper & Quality"}</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
