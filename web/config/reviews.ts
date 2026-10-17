/**
 * Feature 17: Customer Unboxing Reviews, Ratings Scorecard, PDP Q&A & Related Recommendations
 */

export interface UnboxingReview {
  id: string;
  authorEn: string;
  authorAr: string;
  cityEn: string;
  cityAr: string;
  dateEn: string;
  dateAr: string;
  rating: number; // e.g. 5
  format: 'softcover' | 'hardcover' | 'layflat';
  formatNameEn: string;
  formatNameAr: string;
  verifiedPurchase: boolean;
  verifiedPhotoBadge: boolean;
  photoUrl: string;
  quoteEn: string;
  quoteAr: string;
  tagsEn: string[];
  tagsAr: string[];
}

export const UNBOXING_REVIEWS: UnboxingReview[] = [
  {
    id: 'rev-1',
    authorEn: 'Maryam Al Mansoori',
    authorAr: 'مريم المنصوري',
    cityEn: 'Abu Dhabi',
    cityAr: 'أبوظبي',
    dateEn: '2 days ago',
    dateAr: 'منذ يومين',
    rating: 5,
    format: 'layflat',
    formatNameEn: 'Deluxe Layflat Keepsake (99 AED)',
    formatNameAr: 'طبعة ملكية مسطحة (٩٩ د.إ)',
    verifiedPurchase: true,
    verifiedPhotoBadge: true,
    photoUrl: '/cover_and_gift_box_mockup_1788701945105.jpg',
    quoteEn: 'Ordered "The Secret of the Starlit Dunes" for my son Zayed’s 4th birthday. His eyes lit up with pure wonder when he saw his name on the cover and realized he was flying the golden falcon! The 400 GSM layflat pages and luxury presentation box exceeded all expectations.',
    quoteAr: 'طلبت قصة "سر الكثبان المضيئة بالنجوم" لابني زايد في عيد ميلاده الرابع. لمعت عيناه بفرحة لا توصف حين رأى اسمه وصورته على الغلاف ورأى نفسه يحلق مع الصقر الذهبي! ورق الموهوك فائق السماكة وتجليد الصفحات المسطحة والصندوق الملكي فاق كل توقعاتي.',
    tagsEn: ['Thick 400 GSM Pages', 'Luxury Presentation Box', 'Instant Bedtime Favorite'],
    tagsAr: ['ورق سميك فاخر', 'صندوق هدايا ملكي', 'قصة النوم المفضلة'],
  },
  {
    id: 'rev-2',
    authorEn: 'Tariq Al Kaabi',
    authorAr: 'طارق الكعبي',
    cityEn: 'Dubai — Jumeirah',
    cityAr: 'دبي — جميرا',
    dateEn: '5 days ago',
    dateAr: 'منذ ٥ أيام',
    rating: 5,
    format: 'hardcover',
    formatNameEn: 'Classic Hardcover Keepsake (79 AED)',
    formatNameAr: 'غلاف مقوى كلاسيكي (٧٩ د.إ)',
    verifiedPurchase: true,
    verifiedPhotoBadge: true,
    photoUrl: '/images/gift_box_packaging.jpg',
    quoteEn: 'The best newborn gift I’ve ever bought. Arrived in under 24 hours in Dubai, and the gold-foil keepsake presentation box with satin pull-ribbon was so elegant it needed zero extra wrapping. The Arabic Tashkeel diacritics are flawless.',
    quoteAr: 'أجمل هدية مولود قدمتها لأختي! خدمة التوصيل تمت خلال أقل من ٢٤ ساعة في دبي، وصندوق الهدايا بالختم الذهبي وشريط الساتان راقٍ جداً ولم يحتج أي تغليف إضافي. التشكيل العربي دقيق وفصيح بنسبة ١٠٠٪.',
    tagsEn: ['24h Dubai Delivery', 'Flawless Arabic Tashkeel', 'Satin Ribbon Gift Box'],
    tagsAr: ['توصيل ٢٤ ساعة بدبي', 'تشكيل عربي دقيق', 'شريط ساتان فاخر'],
  },
  {
    id: 'rev-3',
    authorEn: 'Fatima & Rashid Al Nuaimi',
    authorAr: 'فاطمة وراشد النعيمي',
    cityEn: 'Sharjah',
    cityAr: 'الشارقة',
    dateEn: '1 week ago',
    dateAr: 'منذ أسبوع',
    rating: 5,
    format: 'hardcover',
    formatNameEn: 'Classic Hardcover Keepsake (79 AED)',
    formatNameAr: 'غلاف مقوى كلاسيكي (٧٩ د.إ)',
    verifiedPurchase: true,
    verifiedPhotoBadge: true,
    photoUrl: '/images/hero_reading_lifestyle.jpg',
    quoteEn: 'We personalized the co-star feature with Baba’s beard style and relationship honorific. Reading this together every evening has become our most cherished family ritual. The child-safe vegetable inks have zero chemical scent.',
    quoteAr: 'خصصنا ميزة البطل المساعد مع نمط لحية الأب ولقب "بابا". أصبحت قراءة هذه القصة معاً كل مساء طقسنا العائلي الأكثر دفئاً. الأحبار النباتية آمنة للأطفال تماماً وبدون أي رائحة كيميائية.',
    tagsEn: ['Co-Star Baba Likeness', 'Child-Safe Inks', 'Cherished Family Ritual'],
    tagsAr: ['شخصية بابا المساعد', 'أحبار نباتية آمنة', 'طقس عائلي دافئ'],
  },
  {
    id: 'rev-4',
    authorEn: 'Sara Jenkins',
    authorAr: 'سارة جينكينز',
    cityEn: 'Dubai — Arabian Ranches',
    cityAr: 'دبي — المرابع العربية',
    dateEn: '2 weeks ago',
    dateAr: 'منذ أسبوعين',
    rating: 5,
    format: 'softcover',
    formatNameEn: 'Softcover Edition (49 AED)',
    formatNameAr: 'غلاف مرن خفيف (٤٩ د.إ)',
    verifiedPurchase: true,
    verifiedPhotoBadge: true,
    photoUrl: '/images/book_craftsmanship.jpg',
    quoteEn: 'The bilingual dual-spread format is pure genius! My daughter reads the English verse while her grandmother reads the Arabic poem beside her. Remarkable print craftsmanship for 49 AED.',
    quoteAr: 'التنسيق ثنائي اللغة في الصفحات المتقابلة عبقري بحق! تقرأ ابنتي البيت الإنجليزي وتقرأ جدتها القصيدة العربية المشكولة بجانبها. جودة طباعة وتجليد استثنائية مقابل ٤٩ درهم فقط.',
    tagsEn: ['Bilingual Reading', 'Grandparent Bonding', 'High Value 49 AED'],
    tagsAr: ['قراءة ثنائية اللغة', 'تواصل مع الجدة', 'قيمة استثنائية ٤٩ د.إ'],
  },
];

export const UNBOXING_RATINGS_BREAKDOWN = {
  overallScore: 4.96,
  totalReviews: 428,
  recommendationPercentage: 98,
  dimensions: [
    {
      id: 'print',
      labelEn: 'Print Quality & Paper Thickness',
      labelAr: 'جودة الطباعة وسماكة الورق (200 GSM)',
      score: 5.0,
      stars: 5,
    },
    {
      id: 'reaction',
      labelEn: 'Child Wonder & Reaction',
      labelAr: 'بهجة وفرحة الطفل بالاسم والشخصية',
      score: 4.9,
      stars: 5,
    },
    {
      id: 'packaging',
      labelEn: 'Keepsake Box & Presentation',
      labelAr: 'صندوق الهدايا والتغليف التذكاري',
      score: 5.0,
      stars: 5,
    },
    {
      id: 'speed',
      labelEn: 'UAE Express Courier Speed',
      labelAr: 'سرعة التوصيل في الإمارات (24-48 ساعة)',
      score: 4.9,
      stars: 5,
    },
  ],
  distribution: [
    { stars: 5, percentage: 96, count: 411 },
    { stars: 4, percentage: 4, count: 17 },
    { stars: 3, percentage: 0, count: 0 },
    { stars: 2, percentage: 0, count: 0 },
    { stars: 1, percentage: 0, count: 0 },
  ],
};

export interface PDPQuestionItem {
  id: string;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}

export const PDP_QA_ACCORDION: PDPQuestionItem[] = [
  {
    id: 'qa-1',
    questionEn: "How does my child's name and likeness appear throughout the book?",
    questionAr: 'كيف يظهر اسم طفلي وملامح شخصيته في القصة؟',
    answerEn: "Your child's chosen name is seamlessly woven into the poetic rhyming stanzas in both English and Arabic with full Tashkeel diacritics. The protagonist character mirrors your selections for skin tone (6 Fitzpatrick tones), hair style (10 options including curls, braids, and traditional Ghutra), hair color, and accessories (glasses/hearing aid).",
    answerAr: 'يُنسج اسم طفلك بحرفية داخل الأبيات الشعرية باللغتين الإنجليزية والعربية الفصحى مع التشكيل الكامل. كما تُطابق شخصية البطل خياراتك من درجات البشرة (٦ درجات فيتزباتريك)، تسريحة الشعر (١٠ خيارات تشمل الكيرلي والجدائل والغترة الإماراتية)، ولون الشعر والإكسسوارات كالنظارة أو السماعة الطبية.',
  },
  {
    id: 'qa-2',
    questionEn: 'What is the difference between Softcover (49 AED), Hardcover (79 AED), and Deluxe Layflat (99 AED)?',
    questionAr: 'ما الفرق بين الغلاف المرن (٤٩ د.إ)، المقوى (٧٩ د.إ)، والملكي المنبسط (٩٩ د.إ)؟',
    answerEn: '• Softcover (49 AED): Lightweight, flexible 250 GSM silk cover with high-gloss laminate — ideal for travel and little hands.\n• Hardcover Keepsake (79 AED - Most Popular): Sturdy 3mm rigid greyboard cover with archival gloss finish and stitched cloth binding.\n• Deluxe Layflat (99 AED): Opens completely flat at 180° with seamless panoramic double spreads, 400 GSM heavyweight bonded pages, and hot-stamped gold foil lettering.',
    answerAr: '• غلاف مرن (٤٩ د.إ): خفيف ومرن من كرتون حريري ٢٥٠ جم مع طبقة حماية لامعة — مثالي للأيدي الصغيرة والسفر.\n• غلاف مقوى كلاسيكي (٧٩ د.إ - الأكثر طلباً): كرتون رمادي صلب سماكة ٣ مم مع تشطيب لامع وخياطة متينة للمحافظة على الذكريات.\n• طبعة ملكية مسطحة (٩٩ د.إ): تفتح بزاوية ١٨٠ درجة أفقياً مع صفحات بانورامية سميكة ٤٠٠ جم وختم ذهبي بارز على الغلاف.',
  },
  {
    id: 'qa-3',
    questionEn: 'How does the bilingual Arabic (with full Tashkeel) and English format work?',
    questionAr: 'كيف يعمل التنسيق ثنائي اللغة بالعربية المشكولة والإنجليزية؟',
    answerEn: 'Each story spread features side-by-side pages: lyrical, rhyming English stanzas on the left and authentic Modern Standard Arabic poetry with complete vocalized Tashkeel on the right. This allows siblings, parents, and grandparents to share the storytelling experience in their preferred language while nurturing dual-language fluency.',
    answerAr: 'كل مشهد في القصة يعرض صفحتين متقابلتين: أبيات إنجليزية موزونة على اليسار، وشعر عربي فصيح متناسق مع التشكيل الكامل (الحركات) على اليمين. يتيح ذلك للآباء والأجداد مشاركة القراءة بلغتهم المفضلة مع تعزيز ثنائية اللغة لدى الطفل.',
  },
  {
    id: 'qa-4',
    questionEn: 'Can I write a personal printed dedication and add a child photo?',
    questionAr: 'هل يمكنني كتابة إهداء شخصي مطبوع وإضافة صورة للطفل؟',
    answerEn: 'Yes! Spread 1 of the book is your sentimental dedication page. You can choose from 5 pre-filled occasion rhymes (Blessing, Birthday, Newborn, Heritage, Bedtime) or write your own custom message (up to 400 characters) with your family signature. You can also upload a keepsake photo framed in an ornate gilded arch (+19 AED).',
    answerAr: 'نعم بكل تأكيد! الصفحة الأولى مخصصة بالكامل لرسالة الإهداء. يمكنك اختيار أحد النماذج الشعرية الخمسة (دعاء وبركة، عيد ميلاد، مولود جديد، أصالة وفخر، تهويدة النوم) أو كتابة رسالتك الخاصة (حتى ٤٠٠ حرف) مع توقيع العائلة. يمكنك أيضاً رفع صورة للطفل مؤطرة بقوس ذهبي تذكاري فاخر (+١٩ د.إ).',
  },
  {
    id: 'qa-5',
    questionEn: 'What are the delivery timelines across Abu Dhabi, Dubai, and all 7 Emirates?',
    questionAr: 'ما هي مواعيد التوصيل في أبوظبي ودبي وكافة الإمارات السبع؟',
    answerEn: 'All books are printed and bound locally in the UAE. Dispatched via premium tracked couriers (Aramex & Emirates Post) within 24–48 hours to all 7 Emirates (Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, Fujairah). You also receive immediate access to the interactive 3D virtual flipbook in 5 minutes.',
    answerAr: 'تُطبع وتُجلّد كافة الكتب محلياً داخل دولة الإمارات. يتم الشحن عبر ناقلين موثوقين (أرامكس وبريد الإمارات) خلال ٢٤-٤٨ ساعة لكافة الإمارات السبع (أبوظبي، دبي، الشارقة، عجمان، أم القيوين، رأس الخيمة، الفجيرة). كما يُتاح التصفح الرقمي التفاعلي ثلاثي الأبعاد فوراً خلال ٥ دقائق.',
  },
  {
    id: 'qa-6',
    questionEn: 'What does the Companion Keepsake Gift Box include?',
    questionAr: 'ماذا يشمل صندوق الهدايا الملكي التذكاري؟',
    answerEn: 'The Keepsake Presentation Box (+39 AED) is a rigid, foil-stamped luxury gift box finished in deep emerald with Arabian amber filigree, magnetic closure, and a soft-touch satin pull-ribbon. It safely preserves your heirloom book against dust and humidity for decades.',
    answerAr: 'صندوق الهدايا الملكي (+٣٩ د.إ) عبارة عن علبة صلبة فاخرة باللون الأخضر الزمردي وزخارف ذهبية عربية، مع إغلاق مغناطيسي وشريط ساتان فاخر، تحمي كتاب الذكريات من الغبار والرطوبة لسنوات طويلة.',
  },
];

export interface RelatedStorybookRecommendation {
  slug: string;
  titleEn: string;
  titleAr: string;
  ageRange: string;
  coverImage: string;
  startingPriceAED: number;
}

export const RELATED_STORYBOOKS: RelatedStorybookRecommendation[] = [
  {
    slug: 'the-child-who-found-the-golden-falcon',
    titleEn: 'The Child Who Found The Golden Falcon',
    titleAr: 'الطفل الذي عثر على الصقر الذهبي',
    ageRange: 'Ages 2–7',
    coverImage: '/final_book_mockup_1788701924626.jpg',
    startingPriceAED: 49,
  },
  {
    slug: 'when-you-were-born-miracle-keepsake',
    titleEn: 'When You Were Born: A Miracle Journey',
    titleAr: 'حين وُلدت: رحلة المعجزة الأولى',
    ageRange: 'Ages 0–3',
    coverImage: '/cover_and_gift_box_mockup_1788701945105.jpg',
    startingPriceAED: 49,
  },
  {
    slug: 'knight-of-the-golden-oasis',
    titleEn: 'Knight of the Golden Oasis',
    titleAr: 'فارس الواحة الذهبية',
    ageRange: 'Ages 4–10',
    coverImage: '/final_book_mockup_1788701924626.jpg',
    startingPriceAED: 49,
  },
];
