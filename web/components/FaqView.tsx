"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Gift,
  HelpCircle,
  MessageCircle,
  Printer,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
} from "lucide-react";
import StoreHeader from "@/components/StoreHeader";
import { useCountry } from "@/lib/context/CountryContext";

interface FaqItemData {
  id: string;
  categoryKey: string;
  categoryLabelEn: string;
  categoryLabelAr: string;
  qEn: string;
  aEn: string;
  qAr: string;
  aAr: string;
}

export default function FaqView({ initialLang }: { initialLang?: "en" | "ar" }) {
  const { language } = useCountry();
  const currentLang = initialLang || language;
  const isAr = currentLang === "ar";
  const currentDir = isAr ? "rtl" : "ltr";

  // WhatsApp support number — web/config/site.ts has no whatsapp constant, so it is defined here.
  const WHATSAPP_URL = "https://wa.me/971501234567";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<string | number | null>("q1");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    q1: true,
  });

  const categories = [
    {
      id: "personalization",
      label: isAr ? "التخصيص وصناعة القصة" : "Personalization",
      icon: BookOpen,
      count: 7,
    },
    {
      id: "delivery",
      label: isAr ? "الشحن والتوصيل في الإمارات" : "Delivery",
      icon: Truck,
      count: 6,
    },
    {
      id: "quality",
      label: isAr ? "جودة الورق والطباعة" : "Quality",
      icon: Printer,
      count: 6,
    },
    {
      id: "returns",
      label: isAr ? "الإرجاع وضمان إعادة الطباعة" : "Returns & Reprint Guarantee",
      icon: RotateCcw,
      count: 6,
    },
    {
      id: "payment",
      label: isAr ? "الدفع والأسعار" : "Payment & Pricing",
      icon: CreditCard,
      count: 4,
    },
  ];

  const faqs: FaqItemData[] = [
    // -------------------------------------------------------------
    // Category 1: Personalization
    // -------------------------------------------------------------
    {
      id: "q1",
      categoryKey: "personalization",
      categoryLabelEn: "Personalization",
      categoryLabelAr: "التخصيص وصناعة القصة",
      qEn: "How is the book personalized with my child's name and appearance?",
      aEn: "In our character studio, enter your child's first name, choose their gender, and customize their appearance by choosing from 6+ skin tones, 8+ hair styles, and natural hair colors. Our illustration engine dynamically renders your child as the star on the front cover, dedication spread, and throughout all 24–32 illustrated story pages.",
      qAr: "كيف يتم تخصيص الكتاب باسم ومظهر طفلي؟",
      aAr: "في استوديو تصميم الشخصيات، تدخل الاسم الأول لطفلك وتحدد جنسه وتخصص ملامحه بالاختيار من بين أكثر من 6 درجات للون البشرة و8 تسريحات وألوان شعر متنوعة. يقوم محركنا الفني بإدراج شخصية طفلك واسمه كنجم القصة على الغلاف الخارجي وصفحة الإهداء وجميع صفحات الكتاب المصورة البالغ عددها 24 إلى 32 صفحة.",
    },
    {
      id: "q2",
      categoryKey: "personalization",
      categoryLabelEn: "Personalization",
      categoryLabelAr: "التخصيص وصناعة القصة",
      qEn: "Can I add a real photo and personal dedication message?",
      aEn: "Yes! Every book includes a complimentary full-page dedication spread. You can write a personal message of up to 400 characters (or choose from our pre-written sentimental rhymes) and upload a high-resolution photograph of your child, which is printed in an elegant archival keepsake frame on page 1.",
      qAr: "هل يمكنني إضافة صورة حقيقية للطفل ورسالة إهداء؟",
      aAr: "نعم، بالتأكيد! يتضمن كل كتاب صفحة إهداء مخصصة مجانية مطبوعة في الصفحة الأولى. يمكنك كتابة رسالتك الخاصة بما يصل إلى 400 حرف (أو الاختيار من قصائدنا التذكارية الجاهزة)، بالإضافة إلى إمكانية رفع صورة فوتوغرافية عالية الدقة لطفلك تُطبع داخل إطار أرشيفي تذكاري فاخر.",
    },
    {
      id: "q3",
      categoryKey: "personalization",
      categoryLabelEn: "Personalization",
      categoryLabelAr: "التخصيص وصناعة القصة",
      qEn: "How does the Bilingual Arabic+English edition with Tashkeel work?",
      aEn: "Our signature Bilingual edition presents the complete story in both languages side-by-side. The right-hand page features classical Modern Standard Arabic with full grammatical Tashkeel (vocalization diacritics) for correct pronunciation, while the left-hand page features poetic English rhyming verse. It is proven to nurture dual-language literacy in UAE households.",
      qAr: "كيف تعمل النسخة الثنائية (عربي وإنجليزي) مع التشكيل الكامل؟",
      aAr: "تقدم نسختنا الثنائية الشهيرة القصة كاملة باللغتين جنباً إلى جنب؛ حيث تُعرض في الصفحة اليمنى اللغة العربية الفصحى مع التشكيل الكامل (الحركات) لتعلم النطق السليم، بينما تضم الصفحة المقابلة نظماً شعرياً عذباً باللغة الإنجليزية. صُممت هذه النسخة خصيصاً لتعزيز ثنائية اللغة لدى أطفالنا في دولة الإمارات.",
    },
    {
      id: "q4",
      categoryKey: "personalization",
      categoryLabelEn: "Personalization",
      categoryLabelAr: "التخصيص وصناعة القصة",
      qEn: "What language options are available across the titles?",
      aEn: "We offer three language options across all our titles: 1) Bilingual Arabic & English (our bestselling edition in the UAE), 2) Arabic Only with complete Tashkeel diacritics, and 3) English Only. You can easily switch between language editions during the preview and personalization flow.",
      qAr: "ما هي خيارات اللغات المتوفرة في القصص؟",
      aAr: "نوفر ثلاثة خيارات لغوية لجميع إصداراتنا: 1) النسخة الثنائية (عربي وإنجليزي معاً - الأكثر طلباً في الإمارات)، 2) النسخة العربية الفصحى بالكامل مع التشكيل التام، 3) النسخة الإنجليزية بالكامل. يمكنك التنقل بين اللغات واختيار النسخة المفضلة أثناء تخصيص القصة ومعاينتها.",
    },
    {
      id: "q5",
      categoryKey: "personalization",
      categoryLabelEn: "Personalization",
      categoryLabelAr: "التخصيص وصناعة القصة",
      qEn: "What age range is each book designed for?",
      aEn: "Our titles are crafted for children aged 0 to 10 years old. We categorize books into Early Years (0–3 years) with bold colors and sensory rhymes, Young Readers (3–6 years) with engaging phonetic stories and character building, and Confident Readers (6–10 years) with rich narratives and vocabulary development.",
      qAr: "ما الفئة العمرية التي يناسبها كل كتاب؟",
      aAr: "كُتبت ورُسمت إصداراتنا للأطفال من عمر الولادة وحتى 10 سنوات. نقسم الكتب حسب الفئات العمرية: مرحلة الطفولة المبكرة (0-3 سنوات) برسومات زاهية وإيقاع بسيط، والمستكشفون الصغار (3-6 سنوات) بحكايات تفاعلية لبناء الثقة، والقراء الواثقون (6-10 سنوات) بحبكات غنية تثري الحصيلة اللغوية والخيال.",
    },
    {
      id: "q6",
      categoryKey: "personalization",
      categoryLabelEn: "Personalization",
      categoryLabelAr: "التخصيص وصناعة القصة",
      qEn: "Can I add a co-star (sibling, parent, or grandparent)?",
      aEn: "Absolutely! In many of our signature titles, such as 'The Secret of the Starlit Dunes' and 'The Sibling Adventure', you can add a co-star (a brother, sister, best friend, parent, or grandparent) who journeys alongside the main character throughout the story.",
      qAr: "هل يمكنني إضافة شخصية مشاركة (أخ، أخت، أو الجدين)؟",
      aAr: "بكل تأكيد! في العديد من قصصنا البارزة مثل «سر الكثبان المضيئة» و«مغامرة الإخوة»، يمكنك إضافة شخصية ثانوية مرافقة (أخ أو أخت، أو صديق مفضل، أو أحد الوالدين، أو الجدين) ليشارك البطل الرئيسي رحلته ومغامراته طوال صفحات القصة.",
    },
    {
      id: "q7",
      categoryKey: "personalization",
      categoryLabelEn: "Personalization",
      categoryLabelAr: "التخصيص وصناعة القصة",
      qEn: "How do I preview the book in 3D before ordering?",
      aEn: "Before adding to cart, you can open our interactive 3D virtual flipbook. It renders your personalized child's name, character avatar, and chosen dedication across every single two-page spread with realistic page-turning animations and audio, ensuring you see the exact final product prior to printing.",
      qAr: "كيف يمكنني معاينة الكتاب كاملاً في القارئ ثلاثي الأبعاد قبل الشراء؟",
      aAr: "قبل إتمام الشراء، يمكنك فتح قارئ الكتب ثلاثي الأبعاد التفاعلي الذي يعرض اسم طفلك ومظهره المخصص ورسالة الإهداء في جميع صفحات القصة، مع محاكاة واقعية لتقليب الصفحات الورقية، لتطمئن وتتأكد من شكل ومحتوى الكتاب المطبوع قبل الشراء.",
    },

    // -------------------------------------------------------------
    // Category 2: Delivery
    // -------------------------------------------------------------
    // DIGITAL-ONLY LAUNCH: the first delivery FAQ answers the launch-day
    // question honestly — printed editions are coming soon.
    {
      id: "q7-launch",
      categoryKey: "delivery",
      categoryLabelEn: "Delivery",
      categoryLabelAr: "الشحن والتوصيل في الإمارات",
      qEn: "Is the printed keepsake edition available at launch?",
      aEn: "At launch, PersonalizedTales sells the instant Digital Edition (49 AED) — your personalized 3D storybook is delivered to your email and WhatsApp within 5 minutes of ordering. Printed keepsake editions (softcover, hardcover, layflat) and gift add-ons are coming soon.",
      qAr: "هل النسخة المطبوعة الفاخرة متوفرة عند الإطلاق؟",
      aAr: "عند الإطلاق، نبيع النسخة الرقمية الفورية (٤٩ د.إ) — تصلك قصتك الشخصية ثلاثية الأبعاد على بريدك الإلكتروني والواتساب خلال ٥ دقائق من الطلب. النسخ المطبوعة الفاخرة (الغلاف المرن، المقوى، والملكي) وإضافات الهدايا قريباً.",
    },
    {
      id: "q8",
      categoryKey: "delivery",
      categoryLabelEn: "Delivery",
      categoryLabelAr: "الشحن والتوصيل في الإمارات",
      qEn: "How long does delivery take in Dubai & Abu Dhabi?",
      aEn: "Printed keepsake editions are produced locally in our UAE workshop and courier-delivered within 24 to 48 business hours across Dubai and Abu Dhabi. Digital 3D editions and WhatsApp unwrapping links are delivered immediately (within 5 minutes) upon order confirmation.",
      qAr: "كم يستغرق التوصيل في دبي وأبوظبي؟",
      aAr: "تتم طباعة الطلبات محلياً داخل ورشتنا في دولة الإمارات وتوصيلها خلال 24 إلى 48 ساعة عمل في كل من دبي وأبوظبي. أما النسخة الرقمية ورابط الإهداء التفاعلي عبر الواتساب، فيتم تسليمهما فوراً خلال 5 دقائق من تأكيد الطلب.",
    },
    {
      id: "q9",
      categoryKey: "delivery",
      categoryLabelEn: "Delivery",
      categoryLabelAr: "الشحن والتوصيل في الإمارات",
      qEn: "Do you deliver to all 7 Emirates?",
      aEn: "Yes! We provide express courier delivery across all 7 Emirates: Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, and Fujairah, including residential communities and Western Region addresses.",
      qAr: "هل تقومون بالتوصيل لكافة الإمارات السبع؟",
      aAr: "نعم! تغطي خدمة التوصيل السريع لدينا كافة إمارات الدولة السبع: أبوظبي، ودبي، والشارقة، وعجمان، وأم القيوين، ورأس الخيمة، والفجيرة، بما يشمل كافة المجمعات والضواحي السكنية ومناطق الظفرة.",
    },
    {
      id: "q10",
      categoryKey: "delivery",
      categoryLabelEn: "Delivery",
      categoryLabelAr: "الشحن والتوصيل في الإمارات",
      qEn: "Which courier tracking partners handle physical deliveries?",
      aEn: "We dispatch via trusted tracked logistics partners: Aramex and Emirates Post. Every order includes live tracking.",
      qAr: "من هم شركاء الشحن والتوصيل المعتمدون لديكم؟",
      aAr: "نشحن عبر ناقلين موثوقين مع تتبع مباشر: أرامكس (Aramex) وبريد الإمارات (Emirates Post). جميع الطلبات تشمل تتبعاً مباشراً.",
    },
    {
      id: "q11",
      categoryKey: "delivery",
      categoryLabelEn: "Delivery",
      categoryLabelAr: "الشحن والتوصيل في الإمارات",
      qEn: "What is the cost of shipping in the UAE?",
      aEn: "Express courier delivery is completely FREE on every order across all 7 Emirates — delivered in 24–48 hours.",
      qAr: "ما هي تكلفة الشحن والتوصيل داخل الإمارات؟",
      aAr: "التوصيل السريع مجاني تماماً على جميع الطلبات لجميع الإمارات السبع — ويصل خلال ٢٤-٤٨ ساعة.",
    },
    {
      id: "q12",
      categoryKey: "delivery",
      categoryLabelEn: "Delivery",
      categoryLabelAr: "الشحن والتوصيل في الإمارات",
      qEn: "How do I track my order with live WhatsApp courier alerts?",
      aEn: "The moment your custom book is inspected and handed to the courier (Aramex or Emirates Post), you receive an automated WhatsApp notification containing a live GPS driver map link and estimated 2-hour arrival window.",
      qAr: "كيف أقوم بتتبع طلبي عبر تنبيهات الواتساب المباشرة؟",
      aAr: "بمجرد الانتهاء من تجليد كتابك وتسليمه لمندوب التوصيل (أرامكس أو بريد الإمارات)، تتلقى رسالة واتساب آلية تحتوي على رابط تتبع GPS مباشر على الخريطة مع نافذة زمنية تقريبية لوصول المندوب لباب منزلك.",
    },
    {
      id: "q13",
      categoryKey: "delivery",
      categoryLabelEn: "Delivery",
      categoryLabelAr: "الشحن والتوصيل في الإمارات",
      qEn: "What if I am away from home during courier delivery?",
      aEn: "The courier will call or WhatsApp prior to arrival. If you are away, you can request a contactless drop-off with your villa concierge, security guard, or reception desk, or easily reschedule delivery for your preferred time slot at no extra charge.",
      qAr: "ماذا لو لم أكن في المنزل وقت وصول المندوب؟",
      aAr: "سيتواصل معك المندوب هاتفياً أو عبر الواتساب قبل الوصول. وفي حال عدم تواجدك، يمكنك توجيهه لترك الطرد بأمان لدى أمن المبنى أو استراحة الفيلا، أو طلب إعادة جدولته في الوقت واليوم المناسبين لك مجاناً.",
    },

    // -------------------------------------------------------------
    // Category 3: Quality
    // -------------------------------------------------------------
    {
      id: "q14",
      categoryKey: "quality",
      categoryLabelEn: "Quality",
      categoryLabelAr: "جودة الورق والطباعة",
      qEn: "What paper quality and specifications do you use?",
      aEn: "We print exclusively on ultra-premium 200 GSM Mohawk Silk FSC-certified archival paper. This uncoated silk stock eliminates reflections from bedtime bedside lamps, resists toddler finger tears, is completely acid-free for 100+ year durability, and prevents show-through across spreads.",
      qAr: "ما هي مواصفات وجودة الورق المستخدم في الطباعة؟",
      aAr: "نطبع حصرياً على ورق موهوك الحريري الفاخر بسماكة 200 جم المعتمد بيئياً من FSC. يتميز هذا الورق الأرشيفي بملمس مطفي ناعم يقضي على الانعكاسات الضوئية تحت إضاءة السرير الخافتة، ويقاوم تمزق أصابع الأطفال، وهو خالٍ تماماً من الأحماض ليدوم أكثر من 100 عام.",
    },
    {
      id: "q15",
      categoryKey: "quality",
      categoryLabelEn: "Quality",
      categoryLabelAr: "جودة الورق والطباعة",
      qEn: "Are your printing inks safe for infants and toddlers?",
      aEn: "Yes, 100%. We print exclusively using 100% vegetable- and soy-based non-toxic Pantone inks certified to European Toy Safety Standard EN71-3. They contain zero heavy metals, zero lead, and zero VOCs — completely safe even if an infant puts the book edge in their mouth.",
      qAr: "هل أحبار الطباعة آمنة للأطفال والرضع؟",
      aAr: "نعم بنسبة 100%. نستخدم أحبار بانتون نباتية وعضوية نقية مستخلصة من فول الصويا، وحاصلة على شهادة المعايير الأوروبية لسلامة لعب الأطفال (EN71-3). الأحبار خالية تماماً من الرصاص والسموم والمركبات المتطايرة، وهي آمنة كلياً حتى لو وضع الطفل حافة الصفحة في فمه.",
    },
    {
      id: "q16",
      categoryKey: "quality",
      categoryLabelEn: "Quality",
      categoryLabelAr: "جودة الورق والطباعة",
      qEn: "How does the 180° Layflat and PUR spine binding work?",
      aEn: "Our Hardcover and Deluxe editions utilize true 180-degree panoramic layflat binding reinforced with climate-resilient PUR polymer adhesive. The book lies perfectly flat on your lap without fighting spring-back pages, ensuring zero artwork or poetry is lost in the center gutter.",
      qAr: "كيف يعمل التجليد المسطح ١٨٠° وصمغ PUR المقوى؟",
      aAr: "تعتمد نسخ الغلاف الصلب والملكي لدينا على تجليد مسطح ممتد بزاوية 180 درجة بالكامل معزز بصمغ PUR المرن والمصمم لتحمل حرارة ورطوبة مناخ الخليج. يفتح الكتاب أفقياً بالكامل على حضن الوالدين دون الحاجة لتثبيته باليد، وبدون ضياع أي جزء من الرسومات أو الشعر في المنتصف.",
    },
    {
      id: "q17",
      categoryKey: "quality",
      categoryLabelEn: "Quality",
      categoryLabelAr: "جودة الورق والطباعة",
      qEn: "Are the covers waterproof and protected against spills?",
      aEn: "Yes! All covers are wrapped in a protective waterproof matte lamination. This soft-touch velvety layer shields the exterior from morning juice spills, milk splashes, and sticky toddler fingers, allowing you to wipe the cover clean with a gentle damp cloth without leaving marks.",
      qAr: "هل أغلفة الكتب مقاومة للماء والسوائل المنسكبة؟",
      aAr: "نعم! تُغلف جميع أغلفة كتبنا بطبقة حماية سيلوفان مطفية مقاومة للماء والرطوبة. هذه الطبقة المخملية الناعمة تحمي الغلاف من انسكاب العصائر والحليب وبصمات الأصابع اللزجة، مما يتيح لك تنظيف الغلاف بسهولة بمسحة منديل مبلل بلطف دون أن يتأثر الكتاب.",
    },
    {
      id: "q18",
      categoryKey: "quality",
      categoryLabelEn: "Quality",
      categoryLabelAr: "جودة الورق والطباعة",
      qEn: "What size and dimensions are the storybooks?",
      aEn: "All our signature books are produced in the classic square heirloom format measuring 8.5\" × 8.5\" (210 mm × 210 mm). This golden ratio provides a wide cinematic canvas for panoramic artwork while remaining ergonomic and comfortable for shared lap reading.",
      qAr: "ما هي أبعاد ومقاسات كتب القصص التذكارية؟",
      aAr: "تُطبع جميع كتبنا التذكارية بالمقاس المربع الكلاسيكي الذهبي 8.5 × 8.5 إنش (210 مم × 210 مم). يوفر هذا المقاس مساحة بصرية سينمائية رحبة لعرض الرسومات البانورامية مع الحفاظ على وزن خفيف ومريح للقراءة المشتركة في الحضن.",
    },
    {
      id: "q19",
      categoryKey: "quality",
      categoryLabelEn: "Quality",
      categoryLabelAr: "جودة الورق والطباعة",
      qEn: "What is the difference between Softcover, Hardcover, and Deluxe?",
      aEn: "Softcover (49.00 AED) features a flexible 350 GSM laminated cardstock cover with reinforced binding, perfect for travel. Hardcover (79.00 AED) features sturdy 3mm rigid board binding designed for permanent nursery shelves. Deluxe (99.00 AED) includes gold-foil embossed cover typography and a royal emerald presentation box with ribbon pull.",
      qAr: "ما الفرق بين الغلاف المرن (Softcover) والصلب (Hardcover) والملكي (Deluxe)؟",
      aAr: "الغلاف المرن (49.00 درهماً) مصنوع من كرتون مقوى 350 جم عملي وخفيف للسفر. الغلاف الصلب (79.00 درهماً) مصنوع من كرتون هولندي صلب 3 مم يدوم لعقود في مكتبة الطفل. أما الإصدار الملكي (99.00 درهماً) فيتضمن نقوشاً ذهبية نافرة لاسم الطفل وصندوق هدايا زمردي صلب مع شريط ستان حريري.",
    },

    // -------------------------------------------------------------
    // Category 4: Returns & Reprint Guarantee
    // -------------------------------------------------------------
    {
      id: "q20",
      categoryKey: "returns",
      categoryLabelEn: "Returns & Reprint Guarantee",
      categoryLabelAr: "الإرجاع وضمان إعادة الطباعة",
      qEn: "What is your 100% Heirloom Guarantee?",
      aEn: "Our Heirloom Guarantee is our unconditional promise that every book meets royal publishing standards. If your book arrives with any binding flaw, print blemish, misaligned text, or shipping damage, we will reprint and express-deliver a replacement copy within 48 hours completely free of charge, or provide a 100% refund.",
      qAr: "ما هو ضمان الذكرى الخالدة ١٠٠٪ (Heirloom Guarantee)؟",
      aAr: "ضمان الذكرى الخالدة هو وعدنا الصارم بأعلى معايير الطباعة والنشر؛ فإذا وصل كتابك وبه أي عيب مصنعي في التجليد، أو بهتان في الألوان، أو تلف ناتج عن الشحن، سنقوم بإعادة طباعة نسخة جديدة وإرسالها إليك خلال 48 ساعة مجاناً بالكامل دون أي تكلفة إضافية، أو استرداد كامل المبلغ.",
    },
    {
      id: "q21",
      categoryKey: "returns",
      categoryLabelEn: "Returns & Reprint Guarantee",
      categoryLabelAr: "الإرجاع وضمان إعادة الطباعة",
      qEn: "Can I return or exchange a personalized book if I change my mind?",
      aEn: "Because each book is individually manufactured and customized with your child's specific name, avatar, and dedication, we cannot accept returns for change of mind once printing has begun. However, any manufacturing defect, typo caused by our engine, or shipping damage is 100% covered by our free reprint guarantee.",
      qAr: "هل يمكنني استرجاع أو استبدال الكتاب المخصص إذا غيرت رأيي؟",
      aAr: "نظراً لأن كل كتاب يُطبع عند الطلب ومخصص بالكامل باسم ومظهر وإهداء طفلك الخاص، لا يمكننا قبول الاسترجاع في حال تغيير الرأي بعد بدء الطباعة. ومع ذلك، فإن أي خطأ طباعي أو عيب مصنعي أو تلف في الشحن مشمول بضمان الاستبدال وإعادة الطباعة المجانية 100%.",
    },
    {
      id: "q22",
      categoryKey: "returns",
      categoryLabelEn: "Returns & Reprint Guarantee",
      categoryLabelAr: "الإرجاع وضمان إعادة الطباعة",
      qEn: "What is your Lifetime Free Replacement policy for family reading accidents?",
      aEn: "We want bedtime reading to be fearless and joyful. If juice spills on a page, an enthusiastic toddler tears a sheet, or the spine is damaged during normal family reading at any point in its life, simply send a photo to our UAE WhatsApp team, and we will reprint and dispatch a brand-new copy free of charge.",
      qAr: "ما هي سياسة الاستبدال المجاني مدى الحياة لحوادث القراءة العائلية؟",
      aAr: "نريد أن تكون قراءة ما قبل النوم تجربة مبهجة وخالية من القلق! إذا انسكب عصير على الصفحات، أو تمزقت ورقة بفعل حماس الطفل الصغير، أو تضرر كعب الكتاب أثناء القراءة الأسرية المعتادة في أي وقت، أرسل لنا صورة عبر الواتساب وسنعيد طباعة نسخة جديدة وإرسالها لك مجاناً.",
    },
    {
      id: "q23",
      categoryKey: "returns",
      categoryLabelEn: "Returns & Reprint Guarantee",
      categoryLabelAr: "الإرجاع وضمان إعادة الطباعة",
      qEn: "How do I submit a reprint claim if my book arrives damaged?",
      aEn: "Filing a claim takes less than 60 seconds! No complex forms needed: simply snap a photo of the defect or damaged parcel and send it via WhatsApp to our parent care team (+971 50 123 4567) or email support@personalizedtales.com. We verify and trigger an express reprint within 2 hours.",
      qAr: "كيف أقدم طلب إعادة طباعة إذا وصل الكتاب تالفاً؟",
      aAr: "تقديم الطلب لا يستغرق أكثر من دقيقة واحدة ودون أي استمارات معقدة! التقط صورة للضرر أو العيب في الكتاب وأرسلها عبر الواتساب لفريق رعاية الوالدين (4567 123 50 971+) أو عبر البريد support@personalizedtales.com. نراجع الصورة ونطلق طباعة النسخة البديلة خلال ساعتين.",
    },
    {
      id: "q24",
      categoryKey: "returns",
      categoryLabelEn: "Returns & Reprint Guarantee",
      categoryLabelAr: "الإرجاع وضمان إعادة الطباعة",
      qEn: "Can I modify my child's name, avatar, or address after placing an order?",
      aEn: "You have a 2-hour grace period immediately after placing your order to make adjustments before our print engines initiate production. Message us via WhatsApp immediately with your order number, and our team will update your details right away.",
      qAr: "هل يمكنني تعديل الاسم أو مظهر الشخصية أو العنوان بعد تقديم الطلب؟",
      aAr: "لديك مهلة ساعتين فور إتمام الطلب لإجراء أي تعديلات قبل بدء عمليات الطباعة الفعلية. تواصل معنا فوراً عبر الواتساب مع ذكر رقم طلبك، وسيقوم فريقنا بتحديث تفاصيل الاسم أو الإهداء أو العنوان دون أي تكلفة إضافية.",
    },
    {
      id: "q25",
      categoryKey: "returns",
      categoryLabelEn: "Returns & Reprint Guarantee",
      categoryLabelAr: "الإرجاع وضمان إعادة الطباعة",
      qEn: "How long does a reprint take to reach my door?",
      aEn: "Reprint orders receive VIP priority queueing in our UAE print studio. We reprint and dispatch within 24 hours, and deliver to your doorstep via express courier within 24 to 48 hours anywhere in the UAE.",
      qAr: "كم يستغرق وصول النسخة البديلة المعاد طباعتها؟",
      aAr: "تحظى طلبات إعادة الطباعة بأولوية VIP مطلقة في ورشتنا المحلية؛ حيث تتم الطباعة والتجليد خلال 24 ساعة، ويتم التوصيل لباب منزلك عبر الشحن السريع خلال 24 إلى 48 ساعة في أي مكان داخل دولة الإمارات.",
    },

    // -------------------------------------------------------------
    // Category 5: Payment & Pricing
    // -------------------------------------------------------------
    {
      id: "q26",
      categoryKey: "payment",
      categoryLabelEn: "Payment & Pricing",
      categoryLabelAr: "الدفع والأسعار",
      qEn: "What payment methods do you accept?",
      aEn: "We accept Apple Pay, Visa, Mastercard, and American Express. Our checkout is currently in demo mode — no real payment is processed yet; real payments are coming soon.",
      qAr: "ما هي وسائل الدفع المقبولة لديكم؟",
      aAr: "نقبل الدفع عبر Apple Pay، وبطاقات فيزا وماستركارد وأمريكان إكسبريس. صفحة الدفع لدينا حالياً في الوضع التجريبي — لا تتم معالجة أي مدفوعات حقيقية بعد؛ وستتوفر المدفوعات الحقيقية قريباً.",
    },
    {
      id: "q28",
      categoryKey: "payment",
      categoryLabelEn: "Payment & Pricing",
      categoryLabelAr: "الدفع والأسعار",
      qEn: "What is the BOGO50 promotional discount?",
      aEn: "BOGO50 is our 'Buy One, Get Second at 50% Off' discount. When you add any two personalized books to your basket, enter promo code BOGO50 at checkout to automatically receive 50% off the second book of equal or lesser value.",
      qAr: "ما هو كود الخصم الترويجي (BOGO50)؟",
      aAr: "عرض (BOGO50) هو «اشترِ كتاباً واحصل على الثاني بنصف السعر (خصم 50%)». عند إضافة أي كتابين مخصصين إلى سلتك وإدخال الرمز BOGO50 عند الدفع، يُحتسب خصم 50% تلقائياً على الكتاب الثاني الأقل أو المساوي سعراً.",
    },
    {
      id: "q29",
      categoryKey: "payment",
      categoryLabelEn: "Payment & Pricing",
      categoryLabelAr: "الدفع والأسعار",
      qEn: "Do you offer school or bulk order discounts?",
      aEn: "Yes! We offer tiered volume discounts for twins, siblings, nursery classrooms, and school graduation ceremonies (aligned with ADEK & KHDA). Enjoy 15% off 3+ copies, and 25% off 10+ copies. Contact our UAE parent care team on WhatsApp for dedicated invoicing.",
      qAr: "هل تقدمون خصومات للمدارس والطلبات الجماعية؟",
      aAr: "نعم! نوفر أسعاراً وخصومات مميزة للتوائم والإخوة، وفصول رياض الأطفال، وحفلات تخرج المدارس (المتوافقة مع برامج ADEK وKHDA). احصل على خصم 15% عند طلب 3 كتب فأكثر، و25% عند طلب 10 كتب فأكثر مع ترتيب فواتير مخصصة.",
    },
    {
      id: "q30",
      categoryKey: "payment",
      categoryLabelEn: "Payment & Pricing",
      categoryLabelAr: "الدفع والأسعار",
      qEn: "Can I preview the complete storybook for free before paying?",
      aEn: "Absolutely! You can customize your child's character, enter your personal dedication, and read through every single page in our 3D interactive virtual flipbook 100% free with no credit card required. You only pay when you decide to order the printed heirloom edition.",
      qAr: "هل يمكنني قراءة القصة كاملة مجاناً قبل الدفع؟",
      aAr: "بالتأكيد! يمكنك تصميم شخصية طفلك وإدخال إهدائك الخاص وتصفح وقراءة جميع صفحات القصة في القارئ التفاعلي ثلاثي الأبعاد مجاناً تماماً وبدون إدخال أي بطاقة بنكية. تدفع فقط عندما تقرر طباعة النسخة الورقية الفاخرة.",
    },
  ];

  // Instant search filtering
  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return faqs.filter((item) => {
      // Category filter
      if (selectedCategory !== "all" && item.categoryKey !== selectedCategory) {
        return false;
      }

      // Keyword query filter
      if (!query) return true;

      const matchQEn = item.qEn.toLowerCase().includes(query);
      const matchAEn = item.aEn.toLowerCase().includes(query);
      const matchQAr = item.qAr.toLowerCase().includes(query);
      const matchAAr = item.aAr.toLowerCase().includes(query);

      return matchQEn || matchAEn || matchQAr || matchAAr;
    });
  }, [faqs, searchQuery, selectedCategory]);

  // Group filtered items by category
  const groupedFaqs = useMemo(() => {
    const groups: {
      category: (typeof categories)[0];
      items: FaqItemData[];
    }[] = [];

    categories.forEach((cat) => {
      const itemsInCat = filteredFaqs.filter((f) => f.categoryKey === cat.id);
      if (itemsInCat.length > 0) {
        groups.push({
          category: cat,
          items: itemsInCat,
        });
      }
    });

    return groups;
  }, [categories, filteredFaqs]);

  const toggleItem = (id: string, idx?: number) => {
    const key = idx !== undefined ? idx : id;
    setOpenIndex(openIndex === key ? null : key);
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const next: Record<string, boolean> = {};
    filteredFaqs.forEach((f) => {
      next[f.id] = true;
    });
    setOpenItems(next);
  };

  const collapseAll = () => {
    setOpenItems({});
  };

  const popularSearches = isAr
    ? ["توصيل دبي", "التشكيل", "الغلاف الصلب", "معاينة 3D", "ضمان الاستبدال"]
    : ["Dubai delivery", "Tashkeel", "Hardcover", "3D Preview", "Reprint Guarantee"];

  return (
    <div className="min-h-screen bg-[#FDF8F1] text-[#23231E] flex flex-col selection:bg-amber-200">
      <StoreHeader />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16 w-full" dir={currentDir}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs font-bold text-slate-500 mb-6 flex items-center gap-2">
          <Link href={isAr ? "/ar" : "/"} className="hover:text-[#1E5751] transition">
            {isAr ? "الرئيسية" : "Home"}
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-[#23231E]">{isAr ? "الأسئلة الشائعة والدعم" : "Help & FAQs"}</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] text-xs font-black uppercase tracking-wider mb-4 border border-[#1E5751]/20">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isAr ? "مركز المساعدة والاستفسارات" : "Help Center & FAQs"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#23231E] tracking-tight font-serif mb-4">
            {isAr ? "الأسئلة الشائعة والدعم الشامل" : "Frequently Asked Questions"}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? "إليك إجابات شاملة وموثوقة عن تخصيص القصص، الشحن السريع في الإمارات، جودة الورق والتجليد، وضمان الذكرى الخالدة لإعادة الطباعة."
              : "Find authentic answers about custom story creation, 24–48h UAE delivery, archival printing, and our Heirloom Guarantee."}
          </p>
        </header>

        {/* Live Search Filter Card */}
        <section aria-label="Search FAQs" className="max-w-2xl mx-auto mb-8">
          <div className="relative bg-white rounded-[2px] border border-slate-200 shadow-xs focus-within:border-[#1E5751] transition-all p-1.5 flex items-center gap-2">
            <div className="ps-3 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isAr
                  ? "ابحث بالكلمات المفتاحية (مثل: الشحن، التشكيل، الغلاف، الإهداء)..."
                  : "Search questions by keyword (e.g. delivery, Tashkeel, hardcover)..."
              }
              className="w-full py-2.5 px-1 text-sm md:text-base text-[#23231E] placeholder-slate-400 bg-transparent focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label={isAr ? "مسح البحث" : "Clear search"}
                className="p-2 hover:bg-slate-100 rounded-[2px] text-slate-400 hover:text-slate-700 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Search Chips */}
          <div className="mt-3 flex flex-wrap items-center gap-2 justify-center text-xs text-slate-500">
            <span className="font-semibold flex items-center gap-1 text-slate-600">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {isAr ? "بحث سريع:" : "Popular:"}
            </span>
            {popularSearches.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSearchQuery(chip)}
                className="bg-white hover:bg-amber-50 text-slate-700 hover:text-[#1E5751] px-2.5 py-1 rounded-[2px] border border-slate-200 transition cursor-pointer text-xs"
              >
                {chip}
              </button>
            ))}
          </div>
        </section>

        {/* Category Tabs */}
        <section aria-label="FAQ Categories" className="mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 justify-start md:justify-center">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-[2px] text-xs md:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-[#1E5751] text-white shadow-2xs"
                  : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>{isAr ? "جميع الأسئلة" : "All Questions"}</span>
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded-[2px] ${
                  selectedCategory === "all" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                {faqs.length}
              </span>
            </button>

            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-[2px] text-xs md:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                    isSelected
                      ? "bg-[#1E5751] text-white shadow-2xs"
                      : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.5 rounded-[2px] ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Results Bar & Expand/Collapse All */}
        <div className="flex items-center justify-between gap-4 mb-6 border-b border-slate-200/80 pb-3 text-xs md:text-sm text-slate-600">
          <div>
            {searchQuery ? (
              <span>
                {isAr
                  ? `تم العثور على ${filteredFaqs.length} سؤال يطابق: "${searchQuery}"`
                  : `Found ${filteredFaqs.length} questions matching "${searchQuery}"`}
              </span>
            ) : (
              <span>
                {isAr
                  ? `عرض ${filteredFaqs.length} من إجمالي ${faqs.length} سؤالاً`
                  : `Showing ${filteredFaqs.length} of ${faqs.length} questions`}
              </span>
            )}
          </div>
          {filteredFaqs.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={expandAll}
                className="hover:text-[#1E5751] font-semibold transition cursor-pointer"
              >
                {isAr ? "توسيع الكل" : "Expand all"}
              </button>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={collapseAll}
                className="hover:text-[#1E5751] font-semibold transition cursor-pointer"
              >
                {isAr ? "طي الكل" : "Collapse all"}
              </button>
            </div>
          )}
        </div>

        {/* FAQ Accordion Groups */}
        {groupedFaqs.length > 0 ? (
          <div className="space-y-10 mb-14">
            {groupedFaqs.map((group) => {
              const IconComp = group.category.icon;

              return (
                <section key={group.category.id} className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-amber-900/10">
                    <div className="w-7 h-7 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] flex items-center justify-center">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-black text-[#23231E] font-serif">
                      {group.category.label}
                    </h2>
                    <span className="text-xs font-bold text-slate-400 ms-auto">
                      {group.items.length} {isAr ? "أسئلة" : "questions"}
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    {group.items.map((item) => {
                      const isOpen = !!openItems[item.id];
                      const panelId = `faq-panel-${item.id}`;

                      return (
                        <div
                          key={item.id}
                          className={`bg-white rounded-[2px] border transition-all duration-200 overflow-hidden ${
                            isOpen
                              ? "border-[#1E5751] shadow-2xs"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => toggleItem(item.id)}
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            className="w-full px-5 py-4 text-start flex items-center justify-between gap-4 font-bold text-[#23231E] hover:text-[#1E5751] transition cursor-pointer"
                          >
                            <span className="text-sm md:text-base font-serif leading-snug">
                              {isAr ? item.qAr : item.qEn}
                            </span>
                            <div
                              className={`w-7 h-7 rounded-[2px] flex items-center justify-center shrink-0 transition-colors ${
                                isOpen
                                  ? "bg-[#1E5751] text-white"
                                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                              }`}
                            >
                              <ChevronDown
                                className={`w-4 h-4 transition-transform duration-200 ${
                                  isOpen ? "rotate-180" : ""
                                }`}
                              />
                            </div>
                          </button>
                          {isOpen && (
                            <div
                              id={panelId}
                              role="region"
                              className="px-5 pb-5 pt-1 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100"
                            >
                              <p className="whitespace-pre-line">{isAr ? item.aAr : item.aEn}</p>
                              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                                <span className="inline-flex items-center gap-1 text-[#1E5751] font-semibold">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  {isAr ? "إجابة معتمدة وموثوقة" : "Verified Parent Guide"}
                                </span>
                                <span>{isAr ? item.categoryLabelAr : item.categoryLabelEn}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="bg-white rounded-[2px] border border-slate-200 p-10 text-center max-w-lg mx-auto mb-14 shadow-xs">
            <div className="w-12 h-12 rounded-[2px] bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-[#23231E] font-serif mb-2">
              {isAr ? "لم نجد أسئلة تطابق بحثك" : "No matching questions found"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              {isAr
                ? `لم تظهر أي نتائج مطابقة لـ "${searchQuery}". جرب البحث بكلمات أخرى أو تواصل معنا مباشرة عبر الواتساب.`
                : `We couldn't find any questions matching "${searchQuery}". Try using different terms or chat directly with our team.`}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-[2px] text-xs sm:text-sm transition cursor-pointer"
              >
                {isAr ? "عرض جميع الأسئلة" : "Show all questions"}
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#1E5751] hover:bg-[#163f3a] text-white font-bold rounded-[2px] text-xs sm:text-sm transition shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>{isAr ? "اسألنا عبر الواتساب" : "Ask on WhatsApp"}</span>
              </a>
            </div>
          </div>
        )}

        {/* 100% Heirloom Guarantee Callout */}
        <section aria-label="Heirloom Guarantee" className="bg-white rounded-[2px] border border-amber-900/15 p-6 sm:p-8 mb-10 shadow-xs flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="flex-1 text-center md:text-start">
            <h3 className="text-xl md:text-2xl font-black text-[#23231E] font-serif mb-1">
              {isAr ? "ضمان الجودة التذكارية 100%" : "Our 100% Heirloom Guarantee"}
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {isAr
                ? "إذا وصل كتابك وبه أي خطأ في الطباعة أو تلف أثناء الشحن، سنقوم بإعادة طباعته وشحنه إليك مجاناً وفوراً خلال 48 ساعة دون أي رسوم إضافية، أو استرداد أموالك بالكامل."
                : "Every book is inspected by our UAE master binders. If your keepsake arrives with any print defect or transit damage, we reprint and express-courier a new copy free within 48 hours or refund you 100%."}
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href={isAr ? "/ar/quality" : "/quality"}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] border border-slate-200 text-[#23231E] hover:bg-slate-50 font-bold text-xs md:text-sm transition"
            >
              <span>{isAr ? "اكتشف معايير الجودة" : "Quality Standards"}</span>
            </Link>
          </div>
        </section>

        {/* WhatsApp Parent Care Banner */}
        <section aria-label="Customer Care" className="bg-[#DAF7C6] p-7 sm:p-10 rounded-[2px] border border-emerald-300 text-center mb-10 shadow-xs">
          <h3 className="text-2xl sm:text-3xl font-black text-[#23231E] font-serif mb-2">
            {isAr ? "هل لديك استفسار إضافي؟ تحدث مع فريقنا الآن" : "Still have questions? Chat with our parent care team"}
          </h3>
          <p className="text-slate-700 text-xs sm:text-sm md:text-base max-w-xl mx-auto mb-6 leading-relaxed">
            {isAr
              ? "فريقنا المتواجد في أبوظبي ودبي مستعد لمساعدتك طوال أيام الأسبوع في اختيار القصة، وتخصيص الأسماء، ومتابعة الشحن والتسليم."
              : "Our dedicated UAE-based team in Dubai & Abu Dhabi is available 7 days a week (9 AM – 9 PM GST) to assist with personalization and orders."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#23231E] hover:bg-black text-white font-black px-7 py-3 rounded-[2px] text-xs sm:text-sm transition shadow-2xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? "محادثة فورية عبر الواتساب (+971)" : "Chat on WhatsApp (+971)"}</span>
            </a>
            <Link
              href={isAr ? "/ar/contact" : "/contact"}
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#23231E] font-bold px-7 py-3 rounded-[2px] text-xs sm:text-sm border border-slate-300 transition"
            >
              <span>{isAr ? "نموذج التواصل عبر البريد" : "Email Support"}</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
