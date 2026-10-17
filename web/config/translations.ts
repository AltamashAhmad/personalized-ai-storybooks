export type Language = "en" | "ar";

export interface TranslationDictionary {
  common: {
    brand: string;
    tagline: string;
    currency: string;
    currencySymbol: string;
    free: string;
    instant: string;
    loading: string;
    verified: string;
    vatIncluded: string;
    guarantee: string;
    allEmirates: string;
    phaseOneBadge: string;
  };
  header: {
    announcement: string;
    promo: string;
    shopByAge: string;
    age03: string;
    age03Desc: string;
    age36: string;
    age36Desc: string;
    age69: string;
    age69Desc: string;
    age912: string;
    age912Desc: string;
    occasions: string;
    birthday: string;
    birthdayDesc: string;
    newBaby: string;
    newBabyDesc: string;
    bedtime: string;
    bedtimeDesc: string;
    ramadanEid: string;
    ramadanEidDesc: string;
    recipients: string;
    siblings: string;
    siblingsDesc: string;
    grandparents: string;
    grandparentsDesc: string;
    allBooks: string;
    faq: string;
    personalizeFree: string;
    uaeServing: string;
  };
  hero: {
    badge: string;
    edition: string;
    h1Pre: string;
    h1Highlight: string;
    subtitle: string;
    subtitleShort: string;
    inputPlaceholder: string;
    startFree: string;
    popularInUae: string;
    trustRating: string;
    reviewsCount: string;
    badgeApplePay: string;
    badgeBilingual: string;
  };
  catalog: {
    qualityBadge: string;
    title: string;
    subtitle: string;
    tabAll: string;
    tabBestseller: string;
    tabBedtime: string;
    tabHeritage: string;
    tabNewborn: string;
  };
  previewSpread: {
    badge: string;
    title: string;
    subtitle: string;
    tabEn: string;
    tabAr: string;
    openFlipbook: string;
  };
  howItWorks: {
    subheading: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  reviews: {
    badge: string;
    title: string;
    r1Text: string;
    r1Author: string;
    r1City: string;
    r2Text: string;
    r2Author: string;
    r2City: string;
    r3Text: string;
    r3Author: string;
    r3City: string;
  };
  pricing: {
    badge: string;
    title: string;
    subtitle: string;
    mostPopular: string;
    bundleTitle: string;
    bundleSubtitle: string;
    instantDelivery: string;
    f1: string;
    f2: string;
    f3: string;
    f4: string;
    f5: string;
    f6: string;
    cta: string;
  };
  wizard: {
    step1Title: string;
    step1Subtitle: string;
    childFirstName: string;
    nameHelp: string;
    namePlaceholder: string;
    nameRequired: string;
    chooseGender: string;
    boy: string;
    girl: string;
    chooseAppearance: string;
    appearanceHelp: string;
    languageFormat: string;
    bilingual: string;
    bilingualTop: string;
    bilingualDesc: string;
    arabicOnly: string;
    arabicOnlyDesc: string;
    englishOnly: string;
    englishOnlyDesc: string;
    frenchBadge: string;
    russianBadge: string;
    continuePreview: string;
    badgeInstant: string;
    badgeNoCard: string;
    badgeSatisfaction: string;
    backToBook: string;
  };
  preview: {
    customizeStory: string;
    coverColor: string;
    coverColorDesc: string;
    giver: string;
    giverDesc: string;
    dedication: string;
    dedicationDesc: string;
    photo: string;
    photoDesc: string;
    readFreePages: string;
    turnPage: string;
    soundOn: string;
    soundOff: string;
    unlockFullBook: string;
    drawerDone: string;
    charLimit: string;
  };
  cart: {
    basketTitle: string;
    forChild: string;
    editBook: string;
    editFormat: string;
    editDedication: string;
    bogoBanner: string;
    bogoDesc: string;
    addAnother: string;
    orderSummary: string;
    subtotal: string;
    discount: string;
    delivery: string;
    orderTotal: string;
    haveCoupon: string;
    apply: string;
    applied: string;
    checkoutBtn: string;
    sslSecure: string;
  };
  checkout: {
    headerSecure: string;
    step1Title: string;
    step1Subtitle: string;
    emailLabel: string;
    phoneLabel: string;
    emirateLabel: string;
    selectEmirate: string;
    whatsappOptIn: string;
    whatsappDesc: string;
    step2Title: string;
    step2Subtitle: string;
    payWithApplePay: string;
    processing: string;
    orderConfirmed: string;
    confirmedTitleSuffix: string;
    confirmedSubtitle: string;
    deliveredTo: string;
    whatsappNotification: string;
    totalPaid: string;
    launchReader: string;
    downloadPdf: string;
    shareWhatsapp: string;
    returnHome: string;
  };
  footer: {
    popularCategories: string;
    booksForKids: string;
    booksForBabies: string;
    booksForToddlers: string;
    booksForTwins: string;
    uaeAndGcc: string;
    globalMarkets: string;
    rightsReserved: string;
    privacy: string;
    terms: string;
    refunds: string;
    deliveryInfo: string;
    aboutUs: string;
    qualityPaper: string;
    helpFaq: string;
    contactUs: string;
  };
  recipientRail: {
    title: string;
    subtitle: string;
    forBabies: string;
    forBabiesAge: string;
    forBabiesDesc: string;
    forKids: string;
    forKidsAge: string;
    forKidsDesc: string;
    forFamily: string;
    forFamilyAge: string;
    forFamilyDesc: string;
    seeRange: string;
  };
  craftsmanship: {
    badge: string;
    title: string;
    subtitle: string;
    p1Title: string;
    p1Desc: string;
    p2Title: string;
    p2Desc: string;
    p3Title: string;
    p3Desc: string;
    readStory: string;
  };
  giftPackaging: {
    badge: string;
    title: string;
    subtitle: string;
    boxFeature1: string;
    boxFeature2: string;
    boxFeature3: string;
    boxCta: string;
  };
  newsletter: {
    badge: string;
    title: string;
    subtitle: string;
    placeholder: string;
    button: string;
    privacy: string;
    successMessage: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    common: {
      brand: "PersonalizedTales",
      tagline: "Heirloom Children's Books",
      currency: "AED",
      currencySymbol: "AED",
      free: "FREE",
      instant: "Instant",
      loading: "Loading...",
      verified: "Verified Purchase",
      vatIncluded: "Taxes & VAT Included",
      guarantee: "100% Heirloom Guarantee",
      allEmirates: "Serving all 7 Emirates",
      phaseOneBadge: "🇦🇪 UAE Edition",
    },
    header: {
      announcement: "✨ Free 3D Virtual Storybook Preview • Instant Digital Keepsake Delivered in 5 Mins • UAE Local 300 DPI Print Ready",
      promo: "Promo: DUBAI10",
      shopByAge: "Shop by Age",
      age03: "0–3 Years",
      age03Desc: "Newborn keepsakes & sensory rhymes",
      age36: "3–6 Years",
      age36Desc: "Early adventures & bedtime lullabies",
      age69: "6–9 Years",
      age69Desc: "Brave desert quests & golden knights",
      age912: "9–12 Years",
      age912Desc: "Galactic space & STEM quests",
      occasions: "Occasions",
      birthday: "🎂 Birthday Keepsakes",
      birthdayDesc: "Milestone birthday adventures",
      newBaby: "🍼 Newborn & Baby Shower",
      newBabyDesc: "Baby arrival celebrations",
      bedtime: "🌙 Bedtime Tales",
      bedtimeDesc: "Soothing nighttime poems",
      ramadanEid: "🕌 Ramadan & Eid",
      ramadanEidDesc: "Festive values & heritage stories",
      recipients: "Recipients",
      siblings: "👥 Siblings & Twins",
      siblingsDesc: "Two heroes in one adventure",
      grandparents: "👵 From Grandparents",
      grandparentsDesc: "Heirloom love across generations",
      allBooks: "All Books",
      faq: "FAQ",
      personalizeFree: "Personalize Free ➔",
      uaeServing: "Serving Abu Dhabi, Dubai & all 7 Emirates",
    },
    hero: {
      badge: "The World's #1 Bilingual Personalized Storybook",
      edition: "🇦🇪 UAE Edition",
      h1Pre: "Every Child is the Hero of Their Own",
      h1Highlight: "Magical Story",
      subtitle: "Create an heirloom-grade personalized children's book starring your child. Features an interactive 3D virtual flipbook, side-by-side English and Modern Standard Arabic with Tashkeel, and a 300 DPI print-ready keepsake PDF.",
      subtitleShort: "Create a personalized children's book starring your child — in English & Arabic, delivered instantly.",
      inputPlaceholder: "Enter child's name (e.g. Zayed, Fatima, Liam, Noah)",
      startFree: "Start Free ➔",
      popularInUae: "Popular in UAE:",
      trustRating: "4.8/5",
      reviewsCount: "from 300,000+ reviews",
      badgeApplePay: "1-Tap Apple Pay & Instant Delivery",
      badgeBilingual: "Bilingual English & Arabic with Tashkeel",
    },
    catalog: {
      qualityBadge: "Heirloom-Grade Quality • Instant Digital Delivery",
      title: "Personalize a Bestseller",
      subtitle: "Choose an enchanting tale crafted specifically for your child's age and passions.",
      tabAll: "All Stories",
      tabBestseller: "⭐ Bestsellers",
      tabBedtime: "🌙 Bedtime",
      tabHeritage: "🛡️ Heritage",
      tabNewborn: "🍼 Newborn",
    },
    previewSpread: {
      badge: "Interactive Keepsake Preview",
      title: "Experience the Magic Before You Buy",
      subtitle: "Turn realistic 3D virtual pages on iPad, iPhone, and desktop. Here is an authentic sample spread from our desert adventure:",
      tabEn: "English Poetic Verses",
      tabAr: "النسخة العربية (مع التشكيل الكامل)",
      openFlipbook: "Open Full 3D Interactive Flipbook ➔",
    },
    howItWorks: {
      subheading: "Meaningful Gifts, Made in Minutes",
      title: "How It Works in 4 Simple Steps",
      subtitle: "Creating a personalized keepsake book takes less than 2 minutes:",
      step1Title: "1. Personalize Details",
      step1Desc: "Enter your child's name, gender, age, and choose between English, Arabic, or our signature bilingual side-by-side format.",
      step2Title: "2. Read Free 3D Preview",
      step2Desc: "Instantly turn the virtual 3D pages. Read the first spreads with your child for free to experience the lyrical rhymes and visuals.",
      step3Title: "3. Treasure Forever",
      step3Desc: "Unlock the full 24-page digital flipbook on iPad/phone plus an archival 300 DPI print-ready PDF delivered straight to your email.",
    },
    reviews: {
      badge: "Loved by Over 10,000 Families Across the UAE & Globe",
      title: "What Parents Are Saying",
      r1Text: "“The Arabic Tashkeel and desert illustrations brought tears to my husband's eyes. Our son Zayed asks to read his book every single night on his iPad!”",
      r1Author: "Mariam Al-Mansoor",
      r1City: "Dubai, UAE 🇦🇪",
      r2Text: "“Finally a personalized book that honors our authentic language and heritage. We paid instantly with 1-tap Apple Pay and the PDF was printed in Abu Dhabi the same day.”",
      r2Author: "Dr. Faisal & Reem",
      r2City: "Abu Dhabi, UAE 🇦🇪",
      r3Text: "“The side-by-side Arabic and English rhymes are magnificent for raising bilingual children in the UAE. Delivered in 3 minutes with zero shipping delays.”",
      r3Author: "Sarah & David Jenkins",
      r3City: "Dubai Hills, UAE 🇦🇪",
    },
    pricing: {
      badge: "Phase 1 Launch Special • UAE",
      title: "The Magic Digital Keepsake Package",
      subtitle: "Heirloom quality at an accessible local price point. No physical shipping delays, zero customs friction.",
      mostPopular: "Most Popular Gift",
      bundleTitle: "Complete Keepsake Bundle",
      bundleSubtitle: "3D Interactive Web Reader + 300 DPI Archival Print PDF",
      instantDelivery: "✓ Instant Delivery to Email & iPad",
      f1: "Full 24-Page 3D Interactive Web Flippable Storybook",
      f2: "Archival 300 DPI Print-Ready PDF (Ready for home or local luxury printing)",
      f3: "Bilingual Side-by-Side English & Modern Standard Arabic with Tashkeel",
      f4: "Custom Child Dedication Page with Date & Family Names",
      f5: "Read on iPad, iPhone, Android, and Desktop with realistic page-turns",
      f6: "Lifetime Cloud Archive — Never lose your child's first story",
      cta: "Personalize Your Child's Book Now ➔",
    },
    wizard: {
      step1Title: "Who are you making this book for?",
      step1Subtitle: "Step 1 of 1 • Takes 25 seconds • Free 3D preview included",
      childFirstName: "Child's First Name",
      nameHelp: "Supports Arabic & English",
      namePlaceholder: "e.g. Zayed, Fatima, Liam, Noah, نور الهدى",
      nameRequired: "Oops! Don't forget to fill in your child's name",
      chooseGender: "Choose Their Gender",
      boy: "Boy (ولد)",
      girl: "Girl (بنت)",
      chooseAppearance: "Choose Their Character",
      appearanceHelp: "Skin tone & hair",
      languageFormat: "Book Language Format",
      bilingual: "🇦🇪 Bilingual",
      bilingualTop: "TOP",
      bilingualDesc: "Arabic + English side-by-side",
      arabicOnly: "العربية فقط",
      arabicOnlyDesc: "مع التشكيل الكامل",
      englishOnly: "English Only",
      englishOnlyDesc: "Lyrical rhyming verse",
      frenchBadge: "French (Français) • Coming Soon",
      russianBadge: "Russian (Русский) • Coming Soon",
      continuePreview: "Continue to 3D Preview ➔",
      badgeInstant: "✓ Instant Free Preview",
      badgeNoCard: "✓ No Card Required",
      badgeSatisfaction: "✓ 100% Satisfaction Guarantee",
      backToBook: "Back to book details",
    },
    preview: {
      customizeStory: "Personalize Details",
      coverColor: "Cover Color",
      coverColorDesc: "Choose front cover finish",
      giver: "Giver's Name",
      giverDesc: "Who is this gift from?",
      dedication: "Dedication Message",
      dedicationDesc: "Add a heartfelt note",
      photo: "Keepsake Photo",
      photoDesc: "Printed on page 2",
      readFreePages: "Read Free Pages",
      turnPage: "Turn Page",
      soundOn: "Sound FX On",
      soundOff: "Sound FX Off",
      unlockFullBook: "Get Full Book & Archival PDF ➔",
      drawerDone: "Done / Apply Changes",
      charLimit: "10 lines maximum (400 characters)",
    },
    cart: {
      basketTitle: "Your Shopping Basket",
      forChild: "for",
      editBook: "Edit book",
      editFormat: "Edit format & gift wrap",
      editDedication: "Edit dedication",
      bogoBanner: "Buy one book, get a second at 50% off!",
      bogoDesc: "Create a twin or sibling book and save with promo code BOGO50.",
      addAnother: "Add another book now ➔",
      orderSummary: "Order Summary",
      subtotal: "Subtotal (1 item)",
      discount: "Promo Discount",
      delivery: "Delivery (Standard UAE Courier)",
      orderTotal: "Order Total",
      haveCoupon: "Got a promotional code?",
      apply: "Apply",
      applied: "applied",
      checkoutBtn: "Proceed to Checkout ➔",
      sslSecure: "🔒 256-Bit SSL Encrypted • 100% Heirloom Guarantee",
    },
    checkout: {
      headerSecure: "256-Bit SSL Secure Checkout",
      step1Title: "1. Contact & Delivery",
      step1Subtitle: "Where should we send your child's interactive 3D flipbook and print PDF?",
      emailLabel: "Parent Email Address",
      phoneLabel: "Mobile Number (for instant WhatsApp delivery link)",
      emirateLabel: "Emirate (UAE Delivery)",
      selectEmirate: "Select Emirate (Dubai, Abu Dhabi, etc.)",
      whatsappOptIn: "Send 3D book access link via WhatsApp",
      whatsappDesc: "Receive permanent reader link directly on your phone for easy bedtime reading.",
      step2Title: "2. Payment Method",
      step2Subtitle: "Instant biometric checkout via Apple Pay, Google Pay, or Credit/Debit Card",
      payWithApplePay: "🍎 Pay with Apple Pay / Card",
      processing: "Authorizing Payment...",
      orderConfirmed: "Order Confirmed",
      confirmedTitleSuffix: "'s Keepsake is Ready!",
      confirmedSubtitle: "We have generated the permanent interactive 3D virtual flipbook and prepared your 300 DPI archival print PDF.",
      deliveredTo: "Delivered To:",
      whatsappNotification: "WhatsApp Notification:",
      totalPaid: "Total Paid:",
      launchReader: "Launch 3D Interactive Virtual Reader ➔",
      downloadPdf: "Download 300 DPI Archival Print PDF",
      shareWhatsapp: "Share 3D Flipbook on WhatsApp",
      returnHome: "← Return to PersonalizedTales Home",
    },
    footer: {
      popularCategories: "Popular Categories",
      booksForKids: "Books for Kids",
      booksForBabies: "Books for Babies",
      booksForToddlers: "Books for Toddlers",
      booksForTwins: "Books for Twins",
      uaeAndGcc: "UAE & GCC Editions",
      globalMarkets: "Global Markets",
      rightsReserved: "© 2026 PersonalizedTales. All rights reserved. Handcrafted in Abu Dhabi, UAE.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      refunds: "Refund Policy",
      deliveryInfo: "Delivery & Shipping",
      aboutUs: "Our Story",
      qualityPaper: "Paper & Quality",
      helpFaq: "Help & FAQs",
      contactUs: "Contact Us",
    },
    recipientRail: {
      title: "Who are you buying for?",
      subtitle: "Explore our award-winning personalized stories crafted for every stage of childhood",
      forBabies: "For Babies",
      forBabiesAge: "Ages 0–3",
      forBabiesDesc: "Gentle bedtime rhymes & sensory keepsake board books",
      forKids: "For Kids",
      forKidsAge: "Ages 3–8",
      forKidsDesc: "Epic magical adventures where they become the brave hero",
      forFamily: "For the Family",
      forFamilyAge: "All Ages",
      forFamilyDesc: "Treasured stories starring parents, siblings & grandparents",
      seeRange: "See the range ➔",
    },
    craftsmanship: {
      badge: "Thoughtfully Made",
      title: "Books as extraordinary as your child",
      subtitle: "We believe children's books should be printed with the highest archival standards — made to be treasured, passed down, and read hundreds of times.",
      p1Title: "Thick, Archival-Grade Paper",
      p1Desc: "200gsm FSC-certified Mohawk paper with child-safe matte finish that resists sticky fingers and smudges.",
      p2Title: "Layflat Panoramic Stitch Binding",
      p2Desc: "Opens completely flat across two pages so lush illustrations and poetry never disappear into the gutter.",
      p3Title: "Vibrant Child-Safe Vegetable Inks",
      p3Desc: "Brilliant, fade-proof colors that are non-toxic, sustainable, and 100% safe for little hands.",
      readStory: "Read our craftsmanship story ➔",
    },
    giftPackaging: {
      badge: "Luxury Keepsake Presentation",
      title: "Unboxing the Magic",
      subtitle: "Each book can be packaged in an emerald & midnight blue rigid gift box with embossed gold-foil stars and a satin ribbon pull.",
      boxFeature1: "Gold-foil embossed cover inscription",
      boxFeature2: "Rigid protective keepsake box",
      boxFeature3: "Satin ribbon tab for effortless opening",
      boxCta: "Add Luxury Gift Box (+39 AED)",
    },
    newsletter: {
      badge: "Special Welcome Offer",
      title: "Get 15% off your first personalized book",
      subtitle: "Join 25,000+ UAE parents receiving bedtime stories, parenting tips, and exclusive festive book releases.",
      placeholder: "Enter your email address...",
      button: "Get My 15% Off",
      privacy: "No spam ever. Unsubscribe with 1-click anytime.",
      successMessage: "✨ Welcome! Check your inbox for your 15% discount code: MAGIC15",
    },
  },
  ar: {
    common: {
      brand: "حكايات مخصصة",
      tagline: "قصص تذكارية فاخرة للأطفال",
      currency: "د.إ",
      currencySymbol: "د.إ",
      free: "مجاناً",
      instant: "فوري",
      loading: "جاري التحميل...",
      verified: "شراء موثق",
      vatIncluded: "شامل ضريبة القيمة المضافة",
      guarantee: "ضمان الجودة التذكارية 100%",
      allEmirates: "توصيل وتسليم فوري لجميع الإمارات السبع",
      phaseOneBadge: "🇦🇪 إصدار الإمارات",
    },
    header: {
      announcement: "✨ معاينة ثلاثية الأبعاد تفاعلية مجانية • إهداء رقمي فوري خلال ٥ دقائق • ملف جاهز للطباعة الفاخرة بدقة 300 نقطة",
      promo: "كود الخصم: DUBAI10",
      shopByAge: "حسب العمر",
      age03: "0–3 سنوات",
      age03Desc: "هدايا المواليد وأشعار إيقاعية مبكرة",
      age36: "3–6 سنوات",
      age36Desc: "مغامرات مرحلة الروضة وقصص قبل النوم",
      age69: "6–9 سنوات",
      age69Desc: "مغامرات الصقور والشجاعة والتراث",
      age912: "9–12 سنة",
      age912Desc: "استكشاف الفضاء والعلوم والابتكار",
      occasions: "المناسبات",
      birthday: "🎂 أعياد الميلاد",
      birthdayDesc: "قصص احتفالية لأعياد الميلاد السعيدة",
      newBaby: "🍼 استقبال المواليد",
      newBabyDesc: "هدايا قدوم المواليد الجدد",
      bedtime: "🌙 قصص قبل النوم",
      bedtimeDesc: "أشعار هادئة لنوم هانئ ومريح",
      ramadanEid: "🕌 رمضان والعيد",
      ramadanEidDesc: "قيم أصيلة واحتفالات العيد المبارك",
      recipients: "الإهداء إلى",
      siblings: "👥 الإخوة والتوائم",
      siblingsDesc: "بطلان في مغامرة واحدة مشتركة",
      grandparents: "👵 من الأجداد والجدات",
      grandparentsDesc: "محبة أبدية تتوارثها الأجيال",
      allBooks: "جميع القصص",
      faq: "الأسئلة الشائعة",
      personalizeFree: "خصص كتابك مجاناً ➔",
      uaeServing: "نخدم أبوظبي، دبي وجميع الإمارات السبع",
    },
    hero: {
      badge: "المنصة الأولى عالمياً لقصص الأطفال المخصصة ثنائية اللغة",
      edition: "🇦🇪 إصدار دولة الإمارات",
      h1Pre: "كل طفل هو بطل قصته",
      h1Highlight: "الساحرة والفريدة",
      subtitle: "اصنع كتاباً تذكارياً فاخراً من بطولة طفلك. استمتع بمحرر ثلاثي الأبعاد تفاعلي، وقصص ثنائية اللغة (عربي فصيح مع التشكيل الكامل + إنجليزي مقفى)، مع ملف طباعة فائق الجودة بدقة 300 نقطة.",
      subtitleShort: "اصنع كتاب أطفال مخصّصاً ببطولة طفلك — بالعربية والإنجليزية، مع توصيل رقمي فوري.",
      inputPlaceholder: "اكتب اسم الطفل (مثال: زايد، فاطمة، راشد، مريم)",
      startFree: "ابدأ مجاناً ➔",
      popularInUae: "الأسماء الأكثر طلباً في الإمارات:",
      trustRating: "٤.٨ / ٥",
      reviewsCount: "من أكثر من 300,000 تقييم",
      badgeApplePay: "دفع فوري بلمسة واحدة عبر Apple Pay وتسليم سريع",
      badgeBilingual: "ثنائي اللغة بالإنجليزية والعربية مع التشكيل الكامل",
    },
    catalog: {
      qualityBadge: "جودة فاخرة بمعايير عالمية • تسليم رقمي فوري",
      title: "خصص قصة من الأكثر مبيعاً",
      subtitle: "اختر حكاية ساحرة كُتبت خصيصاً لتناسب عمر طفلك وشغفه بالاستكشاف.",
      tabAll: "جميع القصص",
      tabBestseller: "⭐ الأكثر مبيعاً",
      tabBedtime: "🌙 قبل النوم",
      tabHeritage: "🛡️ التراث والشهامة",
      tabNewborn: "🍼 المواليد",
    },
    previewSpread: {
      badge: "معاينة ثلاثية الأبعاد تفاعلية",
      title: "عش روعة القصة قبل الشراء",
      subtitle: "اقلب الصفحات الافتراضية ثلاثية الأبعاد بواقعية على الآيباد والآيفون والكمبيوتر. إليك نموذجاً حقيقياً من مغامرة الكثبان:",
      tabEn: "English Poetic Verses",
      tabAr: "النسخة العربية (مع التشكيل الكامل)",
      openFlipbook: "افتح المعاينة التفاعلية الكاملة ➔",
    },
    howItWorks: {
      subheading: "هدايا قيّمة تدوم للأبد، تُصنع في دقائق",
      title: "كيف يعمل الموقع في ٤ خطوات سهلة",
      subtitle: "صناعة كتاب تذكاري مخصص تستغرق أقل من دقيقتين:",
      step1Title: "١. خصص بيانات الطفل",
      step1Desc: "أدخل اسم الطفل، جنسه، واختر بين الإنجليزية، أو العربية الفصحى، أو صيغتنا ثنائية اللغة المتميزة جنباً إلى جنب.",
      step2Title: "٢. تصفح المعاينة ثلاثية الأبعاد مجاناً",
      step2Desc: "اقلب الصفحات التفاعلية ثلاثية الأبعاد فوراً. اقرأ الصفحات الأولى مع طفلك مجاناً لتلمس روعة الأبيات والرسومات.",
      step3Title: "٣. احتفظ بذكرى لا تُنسى",
      step3Desc: "احصل على الكتاب كاملاً (24 صفحة) على الآيباد والهاتف، بالإضافة إلى ملف PDF جاهز للطباعة بدقة 300 نقطة يُرسل لبريدك فوراً.",
    },
    reviews: {
      badge: "يحبه أكثر من 10,000 عائلة في الإمارات وحول العالم",
      title: "آراء الأمهات والآباء في الإمارات",
      r1Text: "«التشكيل العربي الدقيق ورسومات الصحراء لامست مشاعرنا بشدة. ابننا زايد يطلب قراءة كتابه كل ليلة على الآيباد!»",
      r1Author: "مريم المنصور",
      r1City: "دبي، الإمارات 🇦🇪",
      r2Text: "«أخيراً قصة مخصصة تعتز بهويتنا ولغتنا الأصيلة. دفعنا فوراً بلمسة واحدة عبر Apple Pay وطبعنا ملف الـ PDF في أبوظبي في نفس اليوم.»",
      r2Author: "د. فيصل وريم",
      r2City: "أبوظبي، الإمارات 🇦🇪",
      r3Text: "«الجمع بين الإنجليزية والعربية جنباً إلى جنب رائع لتربية أطفال ثنائيي اللغة في الإمارات. استلمنا القصة في 3 دقائق وبدون أي تأخير!»",
      r3Author: "سارة وديفيد جينكينز",
      r3City: "دبي هيلز، الإمارات 🇦🇪",
    },
    pricing: {
      badge: "عرض خاص بمناسبة الإطلاق • الإمارات",
      title: "باقة الهدية التذكارية الرقمية المتكاملة",
      subtitle: "جودة تذكارية فائقة بسعر محلي مميز. تسليم فوري بدون انتظار الشحن أو رسوم جمركية.",
      mostPopular: "الهدية الأكثر طلباً",
      bundleTitle: "باقة الذكرى التذكارية الكاملة",
      bundleSubtitle: "قارئ ثلاثي الأبعاد تفاعلي + ملف PDF أرشيفي فائق الجودة للطباعة",
      instantDelivery: "✓ تسليم فوري إلى البريد الإلكتروني والآيباد",
      f1: "كتاب إلكتروني كامل 24 صفحة بتقنية التقليب ثلاثية الأبعاد",
      f2: "ملف PDF عالي الدقة 300 نقطة جاهز للطباعة المنزلية أو الفاخرة",
      f3: "صيغة ثنائية اللغة: إنجليزي وعربي فصيح مع التشكيل الكامل",
      f4: "صفحة إهداء مخصصة باسم العائلة والتاريخ",
      f5: "متوافق مع الآيباد والآيفون وأندرويد مع أصوات تقليب واقعية",
      f6: "أرشفة سحابية مدى الحياة — لن تفقد قصة طفلك أبداً",
      cta: "خصص كتاب طفلك الآن ➔",
    },
    wizard: {
      step1Title: "لمن تصنع هذا الكتاب الجميل؟",
      step1Subtitle: "الخطوة ١ من ١ • تستغرق ٢٥ ثانية • تشمل معاينة ثلاثية الأبعاد مجانية",
      childFirstName: "الاسم الأول للطفل",
      nameHelp: "يدعم الأسماء العربية والإنجليزية",
      namePlaceholder: "مثال: زايد، فاطمة، راشد، مريم، سارة",
      nameRequired: "عفواً! يرجى إدخال اسم الطفل للمتابعة",
      chooseGender: "اختر جنس الطفل",
      boy: "ولد 👦",
      girl: "بنت 👧",
      chooseAppearance: "اختر ملامح الشخصية",
      appearanceHelp: "لون البشرة والشعر",
      languageFormat: "لغة القصة داخل الكتاب",
      bilingual: "🇦🇪 ثنائي اللغة",
      bilingualTop: "الأفضل",
      bilingualDesc: "عربي + إنجليزي جنباً إلى جنب",
      arabicOnly: "العربية فقط",
      arabicOnlyDesc: "مع التشكيل الكامل",
      englishOnly: "English Only",
      englishOnlyDesc: "أشعار مقفاة بالإنجليزية",
      frenchBadge: "الفرنسية (Français) • قريباً",
      russianBadge: "الروسية (Русский) • قريباً",
      continuePreview: "المتابعة إلى المعاينة ثلاثية الأبعاد ➔",
      badgeInstant: "✓ معاينة فورية مجانية",
      badgeNoCard: "✓ بدون بطاقة بنكية",
      badgeSatisfaction: "✓ ضمان الرضا التام 100%",
      backToBook: "العودة لتفاصيل القصة",
    },
    preview: {
      customizeStory: "تخصيص التفاصيل",
      coverColor: "لون الغلاف",
      coverColorDesc: "اختر لمسة ولون الغلاف",
      giver: "اسم المُهدي",
      giverDesc: "من صاحب هذه الهدية؟",
      dedication: "رسالة الإهداء",
      dedicationDesc: "اكتب كلمات من القلب تدوم",
      photo: "صورة تذكارية",
      photoDesc: "تُطبع في الصفحة الثانية",
      readFreePages: "تصفح الصفحات المجانية",
      turnPage: "اقلب الصفحة",
      soundOn: "الصوت مفعّل",
      soundOff: "الصوت معطل",
      unlockFullBook: "احصل على الكتاب كاملاً وملف الطباعة ➔",
      drawerDone: "تم / تطبيق التغييرات",
      charLimit: "١٠ أسطر كحد أقصى (٤٠٠ حرف)",
    },
    cart: {
      basketTitle: "سلة المشتريات",
      forChild: "لـ",
      editBook: "تعديل بيانات القصة",
      editFormat: "تعديل نوع الغلاف والهدية",
      editDedication: "تعديل رسالة الإهداء",
      bogoBanner: "اشترِ كتاباً واحصل على الثاني بخصم 50%!",
      bogoDesc: "خصص قصة لأخ أو أخت ووفر مع كود الخصم BOGO50.",
      addAnother: "أضف كتاباً ثانياً الآن ➔",
      orderSummary: "ملخص الطلب",
      subtotal: "المجموع الفرعي (عنصر واحد)",
      discount: "خصم الكوبون الترويجي",
      delivery: "التوصيل (توصيل محلي في الإمارات)",
      orderTotal: "المجموع الإجمالي",
      haveCoupon: "هل لديك كود خصم؟",
      apply: "تطبيق",
      applied: "تم تطبيق الكود",
      checkoutBtn: "الانتقال للدفع الآمن ➔",
      sslSecure: "🔒 تشفير 256 بت SSL • ضمان الذكرى التذكارية 100%",
    },
    checkout: {
      headerSecure: "دفع آمن ومشفّر 256-Bit SSL",
      step1Title: "١. بيانات التواصل والتسليم",
      step1Subtitle: "أين ترغب أن نرسل رابط الكتاب التفاعلي ثلاثي الأبعاد وملف الطباعة؟",
      emailLabel: "البريد الإلكتروني لولي الأمر",
      phoneLabel: "رقم الهاتف المحمول (لاستلام رابط الكتاب عبر واتساب)",
      emirateLabel: "الإمارة (توصيل الإمارات)",
      selectEmirate: "اختر الإمارة (دبي، أبوظبي، الشارقة...)",
      whatsappOptIn: "إرسال رابط فتح القصة ثلاثية الأبعاد عبر الواتساب",
      whatsappDesc: "استلم رابط القصة الدائم مباشرة على هاتفك لتسهيل قراءتها قبل النوم.",
      step2Title: "٢. طريقة الدفع",
      step2Subtitle: "دفع بيومتري فوري عبر Apple Pay أو بطاقات الائتمان / الخصم",
      payWithApplePay: "🍎 ادفع بواسطة Apple Pay أو البطاقة",
      processing: "جاري معالجة الدفع الآمن...",
      orderConfirmed: "تم تأكيد الطلب بنجاح",
      confirmedTitleSuffix: "كتابه التذكاري جاهز الآن!",
      confirmedSubtitle: "تم تجهيز القصة التفاعلية ثلاثية الأبعاد وملف الـ PDF عالي الدقة (300 نقطة) الجاهز للطباعة.",
      deliveredTo: "تم التسليم إلى:",
      whatsappNotification: "إشعار الواتساب:",
      totalPaid: "المبلغ المدفوع:",
      launchReader: "فتح القارئ التفاعلي ثلاثي الأبعاد ➔",
      downloadPdf: "تحميل ملف الطباعة عالي الدقة 300 DPI",
      shareWhatsapp: "مشاركة القصة عبر الواتساب",
      returnHome: "← العودة للصفحة الرئيسية",
    },
    footer: {
      popularCategories: "الأقسام الشائعة",
      booksForKids: "قصص للأطفال",
      booksForBabies: "قصص للمواليد",
      booksForToddlers: "قصص للأطفال الصغار",
      booksForTwins: "قصص للتوائم والإخوة",
      uaeAndGcc: "إصدارات الإمارات والخليج",
      globalMarkets: "الأسواق العالمية",
      rightsReserved: "© 2026 حكايات مخصصة. جميع الحقوق محفوظة. صُنع بفخر في أبوظبي، الإمارات.",
      privacy: "سياسة الخصوصية",
      terms: "الشروط والأحكام",
      refunds: "سياسة الاسترداد",
      deliveryInfo: "الشحن والتوصيل",
      aboutUs: "قصتنا ورؤيتنا",
      qualityPaper: "جودة الورق والطباعة",
      helpFaq: "الأسئلة الشائعة والدعم",
      contactUs: "اتصل بنا",
    },
    recipientRail: {
      title: "لمن تشتري الهدية؟",
      subtitle: "استكشف قصصنا المخصصة والمصممة بعناية لتناسب كل مرحلة من مراحل الطفولة",
      forBabies: "للأطفال الرضع",
      forBabiesAge: "الأعمار ٠–٣ سنوات",
      forBabiesDesc: "أشعار نوم هادئة وكتب مقواة حسية مخصصة بالاسم للمواليد الجدد",
      forKids: "للأطفال الصغار",
      forKidsAge: "الأعمار ٣–٨ سنوات",
      forKidsDesc: "مغامرات سحرية وبطولية ممتعة يرى فيها طفلك اسمه وصورته على كل صفحة",
      forFamily: "لجميع أفراد العائلة",
      forFamilyAge: "جميع الأعمار",
      forFamilyDesc: "قصص مفعمة بالمشاعر تجمع الوالدين والإخوة والأجداد في ذكرى لا تُنسى",
      seeRange: "استكشف المجموعة ➔",
    },
    craftsmanship: {
      badge: "صُنع بعناية فائقة",
      title: "كتب استثنائية بقدر تميز طفلك",
      subtitle: "نؤمن بأن كتب الأطفال يجب أن تُصنع بأعلى معايير الطباعة الأرشيفية الفاخرة — صُنعت لتُحفظ وتُتوارث وتُقرأ مئات المرات قبل النوم.",
      p1Title: "ورق أرشيفي فاخر وسميك",
      p1Desc: "ورق موهوك معتمد بيئياً بسماكة ٢٠٠ جم بلمسة مطفية تقاوم البقع وتصمد أمام أصابع الصغار الفضولية.",
      p2Title: "تجليد مسطح ممتد بانورامي (Layflat)",
      p2Desc: "يفتح الكتاب بشكل مستوٍ تماماً بزاوية ١٨٠ درجة لتمتد الرسومات والشعر العربي بحرية دون أن تختفي في المنتصف.",
      p3Title: "أحبار نباتية زاهية وآمنة للأطفال",
      p3Desc: "ألوان براقة ومقاومة للبهتان عبر السنين، خالية من المواد السامة بنسبة ١٠٠٪ لتضمن سلامة طفلك.",
      readStory: "اقرأ قصة صناعة كتبنا ➔",
    },
    giftPackaging: {
      badge: "تغليف هدايا ملكي تذكاري",
      title: "سحر لحظة فتح الهدية",
      subtitle: "يمكن تغليف كل قصة داخل صندوق هدايا متين وفاخر بلون الزمرد والأزرق الملكي مع نقوش ونجوم مذهبة وشريط ستان حريري.",
      boxFeature1: "نقوش ذهبية براقة محفورة على الغلاف",
      boxFeature2: "صندوق صلب لحماية الكتاب وحفظ الذكريات",
      boxFeature3: "شريط حريري ذهبي لفتح سلس وأنيق",
      boxCta: "أضف صندوق الهدايا الفاخر (+٣٩ د.إ)",
    },
    newsletter: {
      badge: "عرض ترحيبي خاص",
      title: "احصل على خصم ١٥٪ على كتابك المخصص الأول",
      subtitle: "انضم إلى أكثر من ٢٥ ألف أسرة في الإمارات وتصلك أحدث قصص النوم والنصائح التربوية والعروض الحصرية للأعياد.",
      placeholder: "أدخل بريدك الإلكتروني هنا...",
      button: "احصل على الخصم",
      privacy: "لا نرسل رسائل مزعجة إطلاقاً. يمكنك إلغاء الاشتراك بنقرة واحدة في أي وقت.",
      successMessage: "✨ أهلاً بك! تم إرسال كود الخصم ١٥٪ إلى بريدك: MAGIC15",
    },
  },
};
