// Complete Flagship Storybook Manuscript & Character Matrix
// "The Secret of the Starlit Dunes" | "سر الكثبان المضيئة بالنجوم"

import {
  POTTERY_ARTISAN_SPREADS,
  YOUNG_ARCHITECT_SPREADS,
  SANDCASTLE_MASTER_SPREADS,
  CALLIGRAPHY_APPRENTICE_SPREADS,
} from "./expansionSpreads";

export interface CharacterSkinTone {
  id: string;
  nameEn: string;
  nameAr: string;
  hex: string;
}

export interface CharacterHairStyle {
  id: string;
  nameEn: string;
  nameAr: string;
  icon: string;
}

export interface CharacterHairColor {
  id: string;
  nameEn: string;
  nameAr: string;
  hex: string;
}

export interface CharacterOutfitColor {
  id: string;
  nameEn: string;
  nameAr: string;
  hex: string;
  bgClass: string;
}

export interface CharacterConfig {
  protagonist: {
    name: string;
    gender: "boy" | "girl";
    skinTone: string;
    hairStyle: string;
    hairColor: string;
    outfit: string;
    outfitColor: string;
    glasses: boolean;
    hearingAid: boolean;
  };
  coStar: {
    enabled: boolean;
    role: "dad" | "mom" | "grandpa" | "grandma";
    name: string;
    skinTone: string;
    hairStyle: string;
    hairColor: string;
    beardStyle: string;
    glasses: boolean;
  };
  dedication: string;
  gifterName: string;
  coverColor: "desert-gold" | "midnight-sapphire" | "emerald-oasis" | "ruby-rose";
  coverFormat: "softcover" | "hardcover" | "layflat";
  language: "bilingual" | "ar" | "en";
}

export interface StorySpread {
  id: number;
  spreadNumber: number;
  spreadTitleEn: string;
  spreadTitleAr: string;
  sceneTheme: string;
  bgImage: string;
  leftPage: {
    titleEn?: string;
    verseEn: string;
    noteEn?: string;
    verseEnWithCoStar?: string;
  };
  rightPage: {
    titleAr?: string;
    verseAr: string;
    noteAr?: string;
    titleArGirl?: string;
    verseArGirl?: string;
    verseArWithCoStar?: string;
  };
  characterPose: string;
  coStarPose?: string;
}

// 6 Fitzpatrick Skin Tone Archetypes
export const SKIN_TONES: CharacterSkinTone[] = [
  { id: "fair", nameEn: "Fair Porcelain", nameAr: "بشرة بيضاء ناصعة", hex: "#FAD8BE" },
  { id: "light", nameEn: "Light Peach", nameAr: "بشرة فاتحة وردية", hex: "#F5C6A5" },
  { id: "olive", nameEn: "Warm Olive (GCC Favorite)", nameAr: "حنطي دافئ (الخليج)", hex: "#D89E6E" },
  { id: "caramel", nameEn: "Caramel Honey", nameAr: "قمحي كراميل", hex: "#BA7A48" },
  { id: "deep", nameEn: "Rich Bronze", nameAr: "أسمر برونزي", hex: "#8C5229" },
  { id: "rich", nameEn: "Deep Ebony", nameAr: "أسمر داكن", hex: "#4D2A15" },
];

export const HAIR_STYLES: CharacterHairStyle[] = [
  { id: "short-waves", nameEn: "Short Waves", nameAr: "أمواج قصيرة", icon: "👦" },
  { id: "curly-afro", nameEn: "Bouncy Curls / Afro", nameAr: "كيرلي حيوي", icon: "🧑‍🦱" },
  { id: "straight-crop", nameEn: "Neat Classic Crop", nameAr: "قصة كلاسيكية", icon: "👦🏻" },
  { id: "braids", nameEn: "Braided Twists", nameAr: "جدائل أنيقة", icon: "👧" },
  { id: "long-waves", nameEn: "Long Flowing Waves", nameAr: "شعر مموج طويل", icon: "👧🏽" },
  { id: "classic-bob", nameEn: "Classic Bob", nameAr: "قصة بوب ناعمة", icon: "👧🏼" },
  { id: "high-ponytail", nameEn: "High Ponytail", nameAr: "ذيل حصان مرتفع", icon: "👧🏻" },
  { id: "modern-quiff", nameEn: "Modern Quiff / Spikes", nameAr: "قصة عصرية قصيرة", icon: "👦🏼" },
  { id: "traditional-ghutra", nameEn: "Traditional Keffiyeh / Ghutra", nameAr: "الغترة والعقال الإماراتي", icon: "👳" },
  { id: "modest-shaila", nameEn: "Modest Shaila / Hijab", nameAr: "شيلة وحجاب أنيق", icon: "🧕" },
];

export const HAIR_COLORS: CharacterHairColor[] = [
  { id: "jet-black", nameEn: "Jet Black", nameAr: "أسود فاحم", hex: "#1C1917" },
  { id: "dark-brown", nameEn: "Dark Chestnut", nameAr: "كستنائي داكن", hex: "#451A03" },
  { id: "warm-brown", nameEn: "Warm Amber Brown", nameAr: "بني دافئ", hex: "#78350F" },
  { id: "golden-blonde", nameEn: "Golden Honey", nameAr: "أشقر ذهبي", hex: "#D97706" },
  { id: "auburn-red", nameEn: "Desert Auburn", nameAr: "نحاسي محمر", hex: "#9A3412" },
];

export const OUTFIT_COLORS: CharacterOutfitColor[] = [
  { id: "emerald", nameEn: "Oasis Emerald", nameAr: "أخضر زمردي", hex: "#059669", bgClass: "bg-emerald-600" },
  { id: "desert-gold", nameEn: "Arabian Gold", nameAr: "ذهبي صحراوي", hex: "#D97706", bgClass: "bg-amber-600" },
  { id: "coral", nameEn: "Sunset Coral", nameAr: "مرجاني شروق الشمس", hex: "#E11D48", bgClass: "bg-rose-600" },
  { id: "royal-blue", nameEn: "Midnight Sapphire", nameAr: "أزرق ملكي ليلي", hex: "#2563EB", bgClass: "bg-blue-600" },
  { id: "pure-white", nameEn: "Crisp White (Kandora)", nameAr: "أبيض ناصع (كندورة)", hex: "#F8FAFC", bgClass: "bg-slate-100" },
];

export const BEARD_STYLES = [
  { id: "neat-trimmed", nameEn: "Neat Trimmed", nameAr: "لحية مرتبة أنيقة" },
  { id: "arabian-goatee", nameEn: "Arabian Goatee", nameAr: "سكسوكة خليجية" },
  { id: "full-beard", nameEn: "Full Warm Beard", nameAr: "لحية كاملة دافئة" },
  { id: "clean-shaven", nameEn: "Clean Shaven", nameAr: "بدون لحية" },
];

export interface KeepsakeCoverColor {
  id: string;
  nameEn: string;
  nameAr: string;
  hex: string;
  gradientClass: string;
  borderClass: string;
}

export const KEEPSAKE_COVER_COLORS: KeepsakeCoverColor[] = [
  { 
    id: "desert-gold", 
    nameEn: "Arabian Gold", 
    nameAr: "الأصفر الصحراوي", 
    hex: "#D97706", 
    gradientClass: "from-amber-600 via-amber-700 to-amber-900", 
    borderClass: "border-amber-500" 
  },
  { 
    id: "midnight-sapphire", 
    nameEn: "Midnight Sapphire", 
    nameAr: "أزرق ليلي ملكي", 
    hex: "#1E1B4B", 
    gradientClass: "from-indigo-900 via-blue-950 to-slate-950", 
    borderClass: "border-indigo-500" 
  },
  { 
    id: "emerald-oasis", 
    nameEn: "Emerald Oasis", 
    nameAr: "أخضر زمردي", 
    hex: "#065F46", 
    gradientClass: "from-emerald-800 via-teal-900 to-teal-950", 
    borderClass: "border-emerald-500" 
  },
  { 
    id: "ruby-rose", 
    nameEn: "Desert Rose", 
    nameAr: "وردي شروق الشمس", 
    hex: "#9F1239", 
    gradientClass: "from-rose-800 via-rose-900 to-amber-950", 
    borderClass: "border-rose-500" 
  },
];

export interface DedicationTemplate {
  id: string;
  nameEn: string;
  nameAr: string;
  category: "blessing" | "birthday" | "newborn" | "heritage" | "bedtime";
  verseEn: string;
  verseAr: string;
}

export const DEDICATION_TEMPLATES: DedicationTemplate[] = [
  {
    id: "blessing",
    nameEn: "🌟 General Blessing & Love",
    nameAr: "🌟 دعاء وبركة عامة",
    category: "blessing",
    verseEn: "For our beloved adventurer {childName}.\nMay your courage always fly as high as the golden falcon, and your heart shine as bright as the desert stars. Walk through life with kindness, bravery, and curiosity.",
    verseAr: "إلى بطلنا الصغير {childName}،\nلتكن شجاعتك مثل صقور الصحراء، وأحلامك واسعة كسمائها المرصعة بالنجوم. سِرْ في دربك بشهامة وطيبة قلب، واعلم أنك محبوب إلى ما لا نهاية."
  },
  {
    id: "birthday",
    nameEn: "🎂 Birthday Celebration",
    nameAr: "🎂 عيد ميلاد سعيد",
    category: "birthday",
    verseEn: "Happy Birthday to our brightest star, {childName}!\nThe world became infinitely more magical the day you were born. Keep exploring, laughing, and dreaming big dreams.",
    verseAr: "عيد ميلاد سعيد لأبهى نجومنا {childName}!\nأضاءت الدنيا يوم ولادتك، وزادت بهجتنا برؤية ابتسامتك كل يوم. كبرت عاماً وزاد فخرنا بك ألف عام."
  },
  {
    id: "newborn",
    nameEn: "🍼 Newborn Miracle Keepsake",
    nameAr: "🍼 مولود جديد وبركة العائلة",
    category: "newborn",
    verseEn: "Before you were born, little {childName}, we dreamed of your smile.\nNow that you are here nestled in our arms, you are our greatest miracle and our deepest blessing forever.",
    verseAr: "قبل أن تأتي إلى دنيانا يا {childName}، حلمنا بيوم لقائك.\nواليوم وأنت بين أحضاننا، أنت أغلى معجزات حبنا وأكبر نعم الله علينا، حفظك الرحمن ورعاك."
  },
  {
    id: "heritage",
    nameEn: "🦅 Heritage & Desert Dignity",
    nameAr: "🦅 عزة وفخر وأصالة",
    category: "heritage",
    verseEn: "To {childName}, child of pride and honor.\nWalk with the nobility of the falcon and the steadfast strength of the sands. You carry the proud legacy of your family and this blessed land.",
    verseAr: "إلى {childName}، رمز الفخر والمروءة.\nامشِ بهامة مرفوعة كعزة الصقور، وأكرم أهلك ووطنك بطيب الأصل وجميل الأثر. أنت فخر هذه الأرض الطيبة ونبراس غدها."
  },
  {
    id: "bedtime",
    nameEn: "🌙 Bedtime Starlight Lullaby",
    nameAr: "🌙 تهويدة النوم وأحلام النجوم",
    category: "bedtime",
    verseEn: "Close your sweet eyes, {childName}, as evening turns deep.\nThe desert breeze sings softly to rock you to sleep. Always remember as you drift into dreams, you are loved beyond words.",
    verseAr: "أغمض عينيك الجميلتين يا {childName} حين يسكن الليل.\nتُنشد رمال الصحراء أرق تهويدة لتنام بسلام. اعلم في يقظتك ومنامك أنك تسكن سويداء قلوبنا دائماً."
  }
];

export function validateProtagonistName(name: string): { 
  isValid: boolean; 
  errorKey?: 'required' | 'maxLength' | 'invalidChars'; 
  errorMessageEn?: string; 
  errorMessageAr?: string; 
} {
  const trimmed = name.trim();
  if (!trimmed) {
    return {
      isValid: false,
      errorKey: 'required',
      errorMessageEn: 'Name is required (1–14 characters)',
      errorMessageAr: 'يرجى كتابة اسم البطل (١-١٤ حرفاً)',
    };
  }
  if (trimmed.length > 14) {
    return {
      isValid: false,
      errorKey: 'maxLength',
      errorMessageEn: 'Name must be 14 characters or less',
      errorMessageAr: 'الاسم يجب ألا يتجاوز ١٤ حرفاً',
    };
  }
  const validCharsRegex = /^[a-zA-Z\u0600-\u06FF\s'-]+$/;
  if (!validCharsRegex.test(trimmed)) {
    return {
      isValid: false,
      errorKey: 'invalidChars',
      errorMessageEn: 'Letters, spaces, hyphens, and apostrophes only',
      errorMessageAr: 'يرجى استخدام الحروف الهجائية فقط',
    };
  }
  return { isValid: true };
}


export const DEFAULT_CHARACTER_CONFIG: CharacterConfig = {
  protagonist: {
    name: "Zayed",
    gender: "boy",
    skinTone: "olive",
    hairStyle: "short-waves",
    hairColor: "jet-black",
    outfit: "kandora",
    outfitColor: "pure-white",
    glasses: false,
    hearingAid: false,
  },
  coStar: {
    enabled: true,
    role: "dad",
    name: "Baba",
    skinTone: "olive",
    hairStyle: "short",
    hairColor: "dark-brown",
    beardStyle: "neat-trimmed",
    glasses: false,
  },
  dedication: "To our little hero Zayed,\n\nMay your courage always fly as high as the golden falcon, and your heart shine as bright as the desert stars. We love you infinitely!\n\n— Mama & Baba",
  gifterName: "Mama & Baba",
  coverColor: "desert-gold",
  coverFormat: "hardcover",
  language: "bilingual",
};

// Curated Bilingual Diacritics Lexicon (Emirati & International)
export const NAME_DIACRITICS_MAP: Record<string, { ar: string; gender?: "boy" | "girl" }> = {
  // Common Boys Names
  zayed: { ar: "زَايِد", gender: "boy" },
  زايد: { ar: "زَايِد", gender: "boy" },
  rashid: { ar: "رَاشِد", gender: "boy" },
  راشد: { ar: "رَاشِد", gender: "boy" },
  hamdan: { ar: "حَمْدَان", gender: "boy" },
  حمدان: { ar: "حَمْدَان", gender: "boy" },
  sultan: { ar: "سُلْطَان", gender: "boy" },
  سلطان: { ar: "سُلْطَان", gender: "boy" },
  mansoor: { ar: "مَنْصُور", gender: "boy" },
  mansur: { ar: "مَنْصُور", gender: "boy" },
  منصور: { ar: "مَنْصُور", gender: "boy" },
  salem: { ar: "سَالِم", gender: "boy" },
  سالم: { ar: "سَالِم", gender: "boy" },
  khalifa: { ar: "خَلِيفَة", gender: "boy" },
  خليفة: { ar: "خَلِيفَة", gender: "boy" },
  saeed: { ar: "سَعِيد", gender: "boy" },
  سعيد: { ar: "سَعِيد", gender: "boy" },
  mohammed: { ar: "مُحَمَّد", gender: "boy" },
  muhammad: { ar: "مُحَمَّد", gender: "boy" },
  محمد: { ar: "مُحَمَّد", gender: "boy" },
  ali: { ar: "عَلِيّ", gender: "boy" },
  علي: { ar: "عَلِيّ", gender: "boy" },
  omar: { ar: "عُمَر", gender: "boy" },
  عمر: { ar: "عُمَر", gender: "boy" },
  noah: { ar: "نُوح", gender: "boy" },
  نوح: { ar: "نُوح", gender: "boy" },
  adam: { ar: "آدَم", gender: "boy" },
  آدم: { ar: "آدَم", gender: "boy" },
  leo: { ar: "لِيُو", gender: "boy" },
  liam: { ar: "لِيَام", gender: "boy" },
  zayn: { ar: "زَيْن", gender: "boy" },
  زين: { ar: "زَيْن", gender: "boy" },

  // Common Girls Names
  fatima: { ar: "فَاطِمَة", gender: "girl" },
  فاطمة: { ar: "فَاطِمَة", gender: "girl" },
  mariam: { ar: "مَرْيَم", gender: "girl" },
  maryam: { ar: "مَرْيَم", gender: "girl" },
  مريم: { ar: "مَرْيَم", gender: "girl" },
  noura: { ar: "نُورَة", gender: "girl" },
  noora: { ar: "نُورَة", gender: "girl" },
  نورة: { ar: "نُورَة", gender: "girl" },
  shamma: { ar: "شَمَّا", gender: "girl" },
  شما: { ar: "شَمَّا", gender: "girl" },
  mouza: { ar: "مَوْزَة", gender: "girl" },
  موزة: { ar: "مَوْزَة", gender: "girl" },
  reem: { ar: "رِيم", gender: "girl" },
  ريم: { ar: "رِيم", gender: "girl" },
  dana: { ar: "دَانَة", gender: "girl" },
  دانة: { ar: "دَانَة", gender: "girl" },
  sara: { ar: "سَارَة", gender: "girl" },
  sarah: { ar: "سَارَة", gender: "girl" },
  سارة: { ar: "سَارَة", gender: "girl" },
  latifa: { ar: "لَطِيفَة", gender: "girl" },
  لطيفة: { ar: "لَطِيفَة", gender: "girl" },
  aisha: { ar: "عَائِشَة", gender: "girl" },
  عائشة: { ar: "عَائِشَة", gender: "girl" },
  maitha: { ar: "مِيثَاء", gender: "girl" },
  ميثاء: { ar: "مِيثَاء", gender: "girl" },
  mahra: { ar: "مَهْرَة", gender: "girl" },
  مهرة: { ar: "مَهْرَة", gender: "girl" },
  hessa: { ar: "حِصَّة", gender: "girl" },
  حصة: { ar: "حِصَّة", gender: "girl" },
  alia: { ar: "عَلْيَا", gender: "girl" },
  عليا: { ar: "عَلْيَا", gender: "girl" },
  hind: { ar: "هِنْد", gender: "girl" },
  هند: { ar: "هِنْد", gender: "girl" },
  shahad: { ar: "شَهْد", gender: "girl" },
  شهد: { ar: "شَهْد", gender: "girl" },
  layla: { ar: "لَيْلَى", gender: "girl" },
  ليلى: { ar: "لَيْلَى", gender: "girl" },
  yasmin: { ar: "يَاسْمِين", gender: "girl" },
  ياسمين: { ar: "يَاسْمِين", gender: "girl" },
  joud: { ar: "جُود", gender: "girl" },
  جود: { ar: "جُود", gender: "girl" },
  nour: { ar: "نُور", gender: "girl" },
  نور: { ar: "نُور", gender: "girl" },
  amira: { ar: "أَمِيرَة", gender: "girl" },
  أميرة: { ar: "أَمِيرَة", gender: "girl" },
};

/**
 * Returns vocalized Arabic name with context-appropriate diacritics and I'rab case endings.
 */
export function getVocalizedArabicName(
  rawName: string,
  grammaticalCase: "nominative" | "accusative" | "genitive" | "vocative" = "nominative"
): string {
  const clean = rawName.trim();
  if (!clean) return "زَايِدُ";

  const lookupKey = clean.toLowerCase();
  const baseArabic = NAME_DIACRITICS_MAP[lookupKey]?.ar || clean;

  // If the raw input already ends with a case ending or tanwin, preserve it verbatim
  if (/[ًٌٍَُِْ]$/.test(clean)) {
    return clean;
  }

  // Strip any existing terminal case ending from the stem before applying inflection
  const stem = baseArabic.replace(/[ًٌٍَُِْ]$/, "");

  // Grammatical case inflection
  switch (grammaticalCase) {
    case "nominative": // Marfū' (ُ)
    case "vocative":   // Munāda (ُ)
      return `${stem}ُ`;
    case "accusative": // Manṣūb (َ)
      return `${stem}َ`;
    case "genitive":   // Majrūr (ِ)
      return `${stem}ِ`;
    default:
      return stem;
  }
}

/**
 * Returns vocalized Co-Star name.
 */
export function getVocalizedCoStar(
  name: string,
  role: "dad" | "mom" | "grandpa" | "grandma"
): string {
  const clean = name.trim();
  if (clean) {
    const key = clean.toLowerCase();
    if (NAME_DIACRITICS_MAP[key]) return NAME_DIACRITICS_MAP[key].ar;
    if (clean === "بابا" || key === "baba") return "بَابَا";
    if (clean === "ماما" || key === "mama") return "مَامَا";
    if (clean === "جدو" || key === "grandpa") return "جَدُّو";
    if (clean === "تيتا" || key === "grandma") return "تِيتَا";
    return clean;
  }
  switch (role) {
    case "mom": return "ماما";
    case "grandpa": return "جدو";
    case "grandma": return "تيتا";
    default: return "بابا";
  }
}

// Complete 12-Spread (24-Page) Master Story Manuscript with 100% Vocalized Tashkeel
export const SAMPLE_BOOK_SPREADS: StorySpread[] = [
  // Spread 0: Cover
  {
    id: 0,
    spreadNumber: 0,
    spreadTitleEn: "Front Cover Keepsake",
    spreadTitleAr: "الغلاف التذكاري الأمامي",
    sceneTheme: "celestial-cover",
    bgImage: "/books/starlit-dunes/spreads/spread_0_cover.jpg",
    leftPage: {
      titleEn: "{childName} & The Secret of the Starlit Dunes",
      verseEn: "A Personalized Keepsake Tale of Courage & Wonder\nCrafted with Love in the United Arab Emirates",
      noteEn: "Personalized with love by: {gifterName}\nPersonalizedTales.com • United Arab Emirates",
    },
    rightPage: {
      titleAr: "{childName} وَسِرُّ الكُثْبَانِ المُضِيئَةِ بِالنُّجُومِ",
      verseAr: "كِتَابٌ تَذْكَارِيٌّ سَاحِرٌ عَنِ الشَّجَاعَةِ وَالمُرُوءَةِ\nصُنِعَ بِكُلِّ حُبٍّ فِي دَوْلَةِ الإِمَارَاتِ العَرَبِيَّةِ المُتَّحِدَةِ",
      noteAr: "إِهْدَاءٌ مَفْعُومٌ بِالحُبِّ مِنْ: {gifterName}\nحِكَايَاتٌ مُخَصَّصَةٌ • دَوْلَةُ الإِمَارَاتِ العَرَبِيَّةِ المُتَّحِدَةِ",
    },
    characterPose: "standing-proud",
  },

  // Spread 1: Dedication & Audio Narration
  {
    id: 1,
    spreadNumber: 1,
    spreadTitleEn: "Opening Dedication & Heirloom Seal",
    spreadTitleAr: "صفحة الإهداء والختم والتسجيل الصوتي",
    sceneTheme: "parchment-dedication",
    bgImage: "/images/book_craftsmanship.jpg",
    leftPage: {
      titleEn: "A Message to Keep in Your Heart Forever",
      verseEn: "{dedicationText}",
      noteEn: "Archival 200gsm Mohawk Silk Paper • Keepsake Edition 001 • UAE",
    },
    rightPage: {
      titleAr: "رِسَالَةٌ تَسْكُنُ القَلْبَ إِلَى الأَبَدِ",
      verseAr: "«إِلَى بَطَلِنَا الصَّغِيرِ {childName}،\n\nقَبْلَ أَنْ تَأْتِيَ إِلَى هَذَا العَالَمِ، حَلُمْنَا بِأَيَّامِكَ وَمَغَامَرَاتِكَ. سِرْ فِي دَرْبِكَ بِشَهَامَةٍ وَطِيبَةِ قَلْبٍ، وَاعْلَمْ أَنَّكَ حَيْثُمَا نَظَرْتَ إِلَى نُجُومِ السَّمَاءِ سَتَجِدُ دُعَاءَنَا يُحِيطُكَ.\n\nمَعَ كُلِّ مَحَبَّتِنَا،\n{gifterName}»",
      verseArGirl: "«إِلَى بَطَلَتِنَا الصَّغِيرَةِ {childName}،\n\nقَبْلَ أَنْ تَأْتِيَ إِلَى هَذَا العَالَمِ، حَلُمْنَا بِأَيَّامِكِ وَمَغَامَرَاتِكِ. سِيرِي فِي دَرْبِكِ بِشَهَامَةٍ وَطِيبَةِ قَلْبٍ، وَاعْلَمِي أَنَّكِ حَيْثُمَا نَظَرْتِ إِلَى نُجُومِ السَّمَاءِ سَتَجِدِينَ دُعَاءَنَا يُحِيطُكِ.\n\nمَعَ كُلِّ مَحَبَّتِنَا،\n{gifterName}»",
      noteAr: "طُبِعَ خِصِّيصاً كَذِكْرَى خَالِدَةٍ • نُسْخَةُ إِهْدَاءٍ رَقْم 001",
    },
    characterPose: "reading-letter",
  },

  // Spread 2: Sunset Over The Crimson Dunes
  {
    id: 2,
    spreadNumber: 2,
    spreadTitleEn: "The Whispering Desert Sands",
    spreadTitleAr: "رِمَالُ الصَّحْرَاءِ الهَامِسَةُ",
    sceneTheme: "desert-sunset",
    bgImage: "/final_book_mockup_1788701924626.jpg",
    leftPage: {
      titleEn: "Chapter One: The Golden Compass",
      verseEn: "The golden desert whispers soft when evening shadows grow,\nA little {childGender} named {childName} watched the shifting crimson glow.\nUpon the velvet crest of dunes where gentle breezes blow,\nA shimmering brass compass lay half-buried just below!",
    },
    rightPage: {
      titleAr: "الفَصْلُ الأَوَّلُ: بَوْصَلَةُ النُّجُومِ الذَّهَبِيَّةُ",
      verseAr: "تَهْمِسُ الرِّمَالُ الذَّهَبِيَّةُ حِينَ يَمِيلُ المَسَاءُ،\nوَ{childName} يَتَأَمَّلُ كَيْفَ تُوَدِّعُ الكُثْبَانَ الأَضْوَاءُ.\nفَوْقَ كَثِيبٍ سَاحِرٍ تُرَفْرِفُ عَلَيْهِ أَنْسَامُ الهَوَاءِ،\nلاَحَتْ بَوْصَلَةٌ نُحَاسِيَّةٌ تَبْتَسِمُ لِلسَّمَاءِ!",
      verseArGirl: "تَهْمِسُ الرِّمَالُ الذَّهَبِيَّةُ حِينَ يَمِيلُ المَسَاءُ،\nوَ{childName} تَتَأَمَّلُ كَيْفَ تُوَدِّعُ الكُثْبَانَ الأَضْوَاءُ.\nفَوْقَ كَثِيبٍ سَاحِرٍ تُرَفْرِفُ عَلَيْهِ أَنْسَامُ الهَوَاءِ،\nلاَحَتْ بَوْصَلَةٌ نُحَاسِيَّةٌ تَبْتَسِمُ لِلسَّمَاءِ!",
    },
    characterPose: "kneeling-at-dune",
  },

  // Spread 3: The Little Desert Falcon
  {
    id: 3,
    spreadNumber: 3,
    spreadTitleEn: "The Little Desert Falcon",
    spreadTitleAr: "فَرْخُ الصَّقْرِ الصَّغِيرُ",
    sceneTheme: "dune-twilight",
    bgImage: "/books/starlit-dunes/spreads/spread_0_cover.jpg",
    leftPage: {
      titleEn: "A Feathered Friend Appears",
      verseEn: "A gentle flutter in the palms, two curious golden eyes,\nA fledgling falcon looked up close with innocent surprise.\n{childName} smiled and held a hand beneath the purple skies:\n“We’ll find your way together, friend, where desert starlight lies!”",
    },
    rightPage: {
      titleAr: "صَدِيقٌ صَغِيرٌ ذُو جَنَاحَيْنِ رَقِيقَيْنِ",
      verseAr: "حَفِيفٌ نَاعِمٌ بَيْنَ النَّخِيلِ، وَعَيْنَانِ كَبَرِيقِ الذَّهَبِ،\nفَرْخُ صَقْرٍ وَدِيعٌ يَتَرَقَّبُ دُونَ خَوْفٍ أَوْ عَجَبِ.\nمَدَّ {childName} كَفَّهُ الحَنُونَ تَحْتَ سُكُونِ الشُّهُبِ:\n«سَنَمْشِي مَعاً يَا صَدِيقِي لِنَلْتَقِيَ بِالأُمِّ عَنْ كَثَبِ!»",
      verseArGirl: "حَفِيفٌ نَاعِمٌ بَيْنَ النَّخِيلِ، وَعَيْنَانِ كَبَرِيقِ الذَّهَبِ،\nفَرْخُ صَقْرٍ وَدِيعٌ يَتَرَقَّبُ دُونَ خَوْفٍ أَوْ عَجَبِ.\nمَدَّتْ {childName} كَفَّهَا الحَنُونَ تَحْتَ سُكُونِ الشُّهُبِ:\n«سَنَمْشِي مَعاً يَا صَدِيقِي لِنَلْتَقِيَ بِالأُمِّ عَنْ كَثَبِ!»",
    },
    characterPose: "holding-falcon",
  },

  // Spread 4: The Ancient Constellation Map
  {
    id: 4,
    spreadNumber: 4,
    spreadTitleEn: "The Celestial Sky Map",
    spreadTitleAr: "خَرِيطَةُ البُرُوجِ وَالنُّجُومِ",
    sceneTheme: "starry-constellations",
    bgImage: "/images/hero_reading_lifestyle.jpg",
    leftPage: {
      titleEn: "Guided by the Stars",
      verseEn: "The compass needle turned and spun, then pointed straight and true,\nTo Orion’s belt and Sirius in shades of sapphire blue.\n{childName} learned what Bedouin scouts through generations knew:\nThe stars will never let you stray when courage walks with you!",
      verseEnWithCoStar: "The compass needle turned and spun, then pointed straight and true,\nWhile {coStarName} smiled and showed the path through shades of sapphire blue.\n{childName} learned what desert scouts through generations knew:\nThe stars will never let you stray when love guides both of you!",
    },
    rightPage: {
      titleAr: "بِالنَّجْمِ هُمْ يَهْتَدُونَ",
      verseAr: "دَارَتْ عَقَارِبُ البَوْصَلَةِ وَاشْتَدَّ فِي قَلْبِهَا النُّورُ،\nتُشِيرُ لِنُجُومِ الثُّرَيَّا حَيْثُ الفَضَاءُ يَمُورُ.\nتَعَلَّمَ {childName} حِكْمَةَ الأَجْدَادِ إِذْ تَمْضِي الدُّهُورُ:\nمَنْ يَمْشِ بِالشَّجَاعَةِ وَاليَقِينِ فَلَنْ يَخِيبَ لَهُ مَسِيرُ!",
      verseArGirl: "دَارَتْ عَقَارِبُ البَوْصَلَةِ وَاشْتَدَّ فِي قَلْبِهَا النُّورُ،\nتُشِيرُ لِنُجُومِ الثُّرَيَّا حَيْثُ الفَضَاءُ يَمُورُ.\nتَعَلَّمَتْ {childName} حِكْمَةَ الأَجْدَادِ إِذْ تَمْضِي الدُّهُورُ:\nمَنْ تَمْشِ بِالشَّجَاعَةِ وَاليَقِينِ فَلَنْ يَخِيبَ لَهَا مَسِيرُ!",
      verseArWithCoStar: "دَارَتْ عَقَارِبُ البَوْصَلَةِ وَاشْتَدَّ فِي قَلْبِهَا النُّورُ،\nتُشِيرُ لِنُجُومِ الثُّرَيَّا حَيْثُ الفَضَاءُ يَمُورُ.\nوَ{coStarName} {coStarGuideVerb} {childName} كَمَا مَضَتِ الدُّهُورُ:\nمَنْ يَمْشِ بِالشَّجَاعَةِ وَالمَحَبَّةِ لَنْ يَخِيبَ لَهُ مَسِيرُ!",
    },
    characterPose: "pointing-to-stars",
    coStarPose: "guiding-hand",
  },

  // Spread 5: The Whispering Oasis & The Desert Gazelle
  {
    id: 5,
    spreadNumber: 5,
    spreadTitleEn: "The Emerald Oasis",
    spreadTitleAr: "وَاحَةُ النَّخِيلِ الزُّمُرُّدِيَّةُ",
    sceneTheme: "oasis-night",
    bgImage: "/books/starlit-dunes/spreads/spread_5_oasis.jpg",
    leftPage: {
      titleEn: "The Secret Spring",
      verseEn: "Beneath the tall date palms they found a crystal bubbling pool,\nWhere graceful white gazelles stepped out into the evening cool.\n{childName} offered fresh clear water, gentle, calm, and sweet,\nA lesson in pure kindness that makes every heart complete.",
    },
    rightPage: {
      titleAr: "غِزْلاَنُ الوَاحَةِ الطَّيِّبَةُ",
      verseAr: "تَحْتَ ظِلاَلِ النَّخِيلِ البَاسِقِ انْسَابَتْ عَيْنُ مَاءٍ رَقْرَاقٍ،\nتَرِدُ إِلَيْهَا الغِزْلاَنُ البَيْضَاءُ بِشَوْقٍ وَعِنَاقٍ.\nقَدَّمَ {childName} المَاءَ الزُّلاَلَ بِرِفْقٍ وَحُسْنِ أَخْلاَقٍ،\nفَالطِّيبَةُ نُورٌ يَمْلأُ الكَوْنَ بِأَبْهَى إِشْرَاقٍ.",
      verseArGirl: "تَحْتَ ظِلاَلِ النَّخِيلِ البَاسِقِ انْسَابَتْ عَيْنُ مَاءٍ رَقْرَاقٍ،\nتَرِدُ إِلَيْهَا الغِزْلاَنُ البَيْضَاءُ بِشَوْقٍ وَعِنَاقٍ.\nقَدَّمَتْ {childName} المَاءَ الزُّلاَلَ بِرِفْقٍ وَحُسْنِ أَخْلاَقٍ،\nفَالطِّيبَةُ نُورٌ يَمْلأُ الكَوْنَ بِأَبْهَى إِشْرَاقٍ.",
    },
    characterPose: "feeding-gazelle",
  },

  // Spread 6: The Bedouin Camp of Wisdom
  {
    id: 6,
    spreadNumber: 6,
    spreadTitleEn: "Stories by the Saffron Fire",
    spreadTitleAr: "حِكَايَاتٌ حَوْلَ مَوْقِدِ الزَّعْفَرَانِ",
    sceneTheme: "campfire-tales",
    bgImage: "/books/starlit-dunes/spreads/spread_6_campfire.jpg",
    leftPage: {
      titleEn: "Warm Hospitality",
      verseEn: "Cardamom steam and crackling wood around a desert tent,\nWhere greetings of “Marhaba” were generously sent.\nAn elder spoke: “True bravery is in the helping hand,\nAnd {childName} carries honor across this blessed land!”",
      verseEnWithCoStar: "Cardamom steam and crackling wood around a desert tent,\nWhere {coStarName} smiled as warm and friendly greetings were all sent.\nAn elder spoke: “True bravery is in the helping hand,\nAnd {childName} brings great pride and joy across this blessed land!”",
    },
    rightPage: {
      titleAr: "كَرَمُ الضِّيَافَةِ وَأَصَالَةُ الدِّيَارِ",
      verseAr: "فَاحَ عَبِيقُ الهَيْلِ الزَّكِيُّ فِي خَيْمَةِ الكَرَمِ وَالجُودِ،\nحَيْثُ يُرَحَّبُ بِالضَّيْفِ دَائِماً بِأَطْيَبِ العُهُودِ.\nقَالَ حَكِيمُ القَوْمِ: «الشَّجَاعَةُ فِي عَوْنِ كُلِّ وَدُودِ،\nوَ{childName} يَحْمِلُ شَرَفَ الإِيثَارِ بَيْنَ هَذِهِ الحُدُودِ!»",
      verseArGirl: "فَاحَ عَبِيقُ الهَيْلِ الزَّكِيُّ فِي خَيْمَةِ الكَرَمِ وَالجُودِ،\nحَيْثُ يُرَحَّبُ بِالضَّيْفِ دَائِماً بِأَطْيَبِ العُهُودِ.\nقَالَ حَكِيمُ القَوْمِ: «الشَّجَاعَةُ فِي عَوْنِ كُلِّ وَدُودِ،\nوَ{childName} تَحْمِلُ شَرَفَ الإِيثَارِ بَيْنَ هَذِهِ الحُدُودِ!»",
      verseArWithCoStar: "فَاحَ عَبِيقُ الهَيْلِ فِي مَجْلِسِ الكَرَمِ وَالجُودِ،\nمَعَ {coStarName} حَيْثُ يُرَحَّبُ بِالضَّيْفِ بِأَطْيَبِ العُهُودِ.\nقَالَ حَكِيمُ القَوْمِ: «الشَّجَاعَةُ فِي عَوْنِ كُلِّ وَدُودِ،\nوَ{childName} {childCarryVerb} شَرَفَ الإِيثَارِ بَيْنَ هَذِهِ الحُدُودِ!»",
    },
    characterPose: "sitting-listening",
    coStarPose: "sitting-beside",
  },

  // Spread 7: The Cave of Hidden Light
  {
    id: 7,
    spreadNumber: 7,
    spreadTitleEn: "The Cave of Hidden Light",
    spreadTitleAr: "كَهْفُ النُّورِ السَّاحِرِ",
    sceneTheme: "crystal-cave",
    bgImage: "/images/category_for_babies.jpg",
    leftPage: {
      titleEn: "A Spark in the Darkness",
      verseEn: "Deep in a secret dune cavern carved by wind and grace,\nA luminous celestial crystal illuminated the space!\n{childName} stepped inside without a tremor or a fright,\nFor brave young hearts carry inside their own eternal light.",
    },
    rightPage: {
      titleAr: "ضِيَاءٌ يَكْشِفُ عَتَمَةَ المَغَارَةِ",
      verseAr: "فِي جَوْفِ كَهْفٍ حَفَرَتْهُ الرِّيَاحُ بِأَبْدَعِ التَّصَامِيمِ،\nتَلأْلأَتْ بِلَّوْرَةٌ سَمَاوِيَّةٌ كَأَنْوَارِ النَّسِيمِ!\nدَخَلَ {childName} بِخُطَى الثَّبَاتِ دُونَ خَوْفٍ أَوْ تَقْدِيمِ،\nفَالقَلْبُ الشُّجَاعُ يُنِيرُ دَرْبَهُ بِفَضْلِ العَلِيمِ.",
      verseArGirl: "فِي جَوْفِ كَهْفٍ حَفَرَتْهُ الرِّيَاحُ بِأَبْدَعِ التَّصَامِيمِ،\nتَلأْلأَتْ بِلَّوْرَةٌ سَمَاوِيَّةٌ كَأَنْوَارِ النَّسِيمِ!\nدَخَلَتْ {childName} بِخُطَى الثَّبَاتِ دُونَ خَوْفٍ أَوْ تَقْدِيمِ،\nفَالقَلْبُ الشُّجَاعُ يُنِيرُ دَرْبَهَا بِفَضْلِ العَلِيمِ.",
    },
    characterPose: "holding-crystal",
  },

  // Spread 8: High Flight Over The Seven Emirates
  {
    id: 8,
    spreadNumber: 8,
    spreadTitleEn: "The Mother Falcon Returns",
    spreadTitleAr: "عَوْدَةُ الصَّقْرِ إِلَى أُمِّهِ الحَنُونِ",
    sceneTheme: "flight-over-dunes",
    bgImage: "/final_book_mockup_1788701924626.jpg",
    leftPage: {
      titleEn: "Soaring on Golden Wings",
      verseEn: "A majestic golden falcon swept down through starry air,\nShe saw her baby safe and sound within {childName}’s loving care!\nWith joyful calls they circled high above the desert floor,\nA bond of sacred harmony that lasts forevermore.",
    },
    rightPage: {
      titleAr: "تَحْلِيقٌ مَهِيبٌ فَوْقَ الرِّمَالِ",
      verseAr: "هَبَطَتْ صَقْرَةٌ مَهِيبَةٌ تَشُقُّ عَنَانَ الفَضَاءِ،\nرَأَتْ فَرْخَهَا الصَّغِيرَ آمِناً فِي رِعَايَةِ الأَوْفِيَاءِ!\nحَلَّقَا مَعاً فَوْقَ الكُثْبَانِ بِأَعْذَبِ نِدَاءِ،\nشَاكِرَيْنِ {childName} الَّذِي مَلأَ لَيْلَهُمَا بِالسَّخَاءِ.",
      verseArGirl: "هَبَطَتْ صَقْرَةٌ مَهِيبَةٌ تَشُقُّ عَنَانَ الفَضَاءِ،\nرَأَتْ فَرْخَهَا الصَّغِيرَ آمِناً فِي رِعَايَةِ الأَوْفِيَاءِ!\nحَلَّقَا مَعاً فَوْقَ الكُثْبَانِ بِأَعْذَبِ نِدَاءِ،\nشَاكِرَيْنِ {childName} الَّتِي مَلأَتْ لَيْلَهُمَا بِالسَّخَاءِ.",
    },
    characterPose: "waving-to-sky",
  },

  // Spread 9: The Starlight Festival Above The City
  {
    id: 9,
    spreadNumber: 9,
    spreadTitleEn: "Constellations Over The Skyline",
    spreadTitleAr: "مَهْرَجَانُ الأَنْوَارِ فَوْقَ صَرْحِ البِلادِ",
    sceneTheme: "skyline-festival",
    bgImage: "/images/hero_reading_lifestyle.jpg",
    leftPage: {
      titleEn: "Modern Horizons, Ancient Roots",
      verseEn: "Across the glowing skyline where the desert meets the sea,\nAbu Dhabi and Dubai shone bright in grand tranquility.\nThe stars above whispered low: “Remember who you are,\nA child of heritage and pride, as radiant as a star!”",
    },
    rightPage: {
      titleAr: "أَصَالَةُ المَاضِي وَإِشْرَاقَةُ المُسْتَقْبَلِ",
      verseAr: "عَلَى امْتِدَادِ الأُفُقِ السَّاحِرِ حَيْثُ يَلْتَقِي البَحْرُ بِالرِّمَالِ،\nأَضَاءَتْ أَبْرَاجُ الإِمَارَاتِ فِي أَبْهَى جَلاَلِ.\nهَمَسَتِ النُّجُومُ لِـ {childName}: «أَنْتَ فَخْرُ الرِّجَالِ،\nابْنُ هَذِهِ الأَرْضِ الطَّيِّبَةِ، وَنِبْرَاسُ الأَمَلِ وَالكَمَالِ!»",
      verseArGirl: "عَلَى امْتِدَادِ الأُفُقِ السَّاحِرِ حَيْثُ يَلْتَقِي البَحْرُ بِالرِّمَالِ،\nأَضَاءَتْ أَبْرَاجُ الإِمَارَاتِ فِي أَبْهَى جَلاَلِ.\nهَمَسَتِ النُّجُومُ لِـ {childName}: «أَنْتِ فَخْرُ الأَجْيَالِ،\nابْنَةُ هَذِهِ الأَرْضِ الطَّيِّبَةِ، وَنِبْرَاسُ الأَمَلِ وَالجَمَالِ!»",
    },
    characterPose: "admiring-view",
  },

  // Spread 10: Bedtime by the Warm Campfire
  {
    id: 10,
    spreadNumber: 10,
    spreadTitleEn: "The Desert Lullaby",
    spreadTitleAr: "أُنْشُودَةُ النَّوْمِ تَحْتَ ضَوْءِ القَمَرِ",
    sceneTheme: "peaceful-bedtime",
    bgImage: "/images/gift_box_packaging.jpg",
    leftPage: {
      titleEn: "Sleep Softly, Little Hero",
      verseEn: "Now nestled close in cozy warmth as night turns calm and deep,\nThe desert breeze sings tender tunes to lull our child to sleep.\nThe compass rests beside the bed, its magic glowing bright,\nDream sweet, beloved {childName}, until the morning light.",
    },
    rightPage: {
      titleAr: "نَوْماً هَنِيئاً يَا بَطَلَنَا الغَالِي",
      titleArGirl: "نَوْماً هَنِيئاً يَا بَطَلَتَنَا الغَالِيَةَ",
      verseAr: "وَالآنَ فِي حِضْنِ الدِّفْءِ حَيْثُ يَسْكُنُ كُلُّ شَيْءٍ بِسَلاَمٍ،\nتُنْشِدُ رِيَاحُ الصَّحْرَاءِ أَعْذَبَ أَلْحَانِ المَنَامِ.\nتَسْتَرِيحُ البَوْصَلَةُ قُرْبَ السَّرِيرِ تُضِيءُ فِي الظَّلاَمِ،\nنَمْ قَرِيرَ العَيْنِ يَا {childName}، مَحْفُوظاً عَلَى الدَّوَامِ.",
      verseArGirl: "وَالآنَ فِي حِضْنِ الدِّفْءِ حَيْثُ يَسْكُنُ كُلُّ شَيْءٍ بِسَلاَمٍ،\nتُنْشِدُ رِيَاحُ الصَّحْرَاءِ أَعْذَبَ أَلْحَانِ المَنَامِ.\nتَسْتَرِيحُ البَوْصَلَةُ قُرْبَ السَّرِيرِ تُضِيءُ فِي الظَّلاَمِ،\nنَامِي قَرِيرَةَ العَيْنِ يَا {childName}، مَحْفُوظَةً عَلَى الدَّوَامِ.",
    },
    characterPose: "sleeping-peacefully",
  },

  // Spread 11: The Golden Dawn & Moral Keepsake
  {
    id: 11,
    spreadNumber: 11,
    spreadTitleEn: "The Golden Morning & Moral Heirloom",
    spreadTitleAr: "شُرُوقُ الشَّمْسِ وَالعِبْرَةُ الخَالِدَةُ",
    sceneTheme: "golden-dawn",
    bgImage: "/images/book_craftsmanship.jpg",
    leftPage: {
      titleEn: "An Heirloom to Treasure",
      verseEn: "The sun rises in glory, painting dunes with golden sand,\nA reminder that true wonder lives inside your own two hands.\nYou are our heart, our greatest joy, the reason that we smile,\nAnd we will walk beside you through every single mile.\n\nThe End.",
      verseEnWithCoStar: "The sun rises in glory, painting dunes with golden sand,\nA reminder that true wonder lives inside your own two hands.\nYou are our heart, our greatest joy, the reason that we smile,\nAnd {coStarName} walks beside you through every single mile.\n\nThe End.",
    },
    rightPage: {
      titleAr: "عِبْرَةٌ تَسْكُنُ الأَجْيَالَ",
      verseAr: "أَشْرَقَتِ الشَّمْسُ بِهَيْبَةٍ تَكْسُو الرُّبَى بِالذَّهَبِ،\nتُخْبِرُنَا أَنَّ المُعْجِزَاتِ تَتَحَقَّقُ بِالسَّعْيِ وَالطَّلَبِ.\nأَنْتَ نَبْضُ قُلُوبِنَا، وَأَغْلَى مَا نَرْجُو مِنَ الإِرْبِ،\nوَسَنَبْقَى دَوْماً بِجَانِبِكَ عَلَى مَدَى الدَّرْبِ.\n\nتَمَّتْ بِحَمْدِ اللهِ.",
      verseArGirl: "أَشْرَقَتِ الشَّمْسُ بِهَيْبَةٍ تَكْسُو الرُّبَى بِالذَّهَبِ،\nتُخْبِرُنَا أَنَّ المُعْجِزَاتِ تَتَحَقَّقُ بِالسَّعْيِ وَالطَّلَبِ.\nأَنْتِ نَبْضُ قُلُوبِنَا، وَأَغْلَى مَا نَرْجُو مِنَ الإِرْبِ،\nوَسَنَبْقَى دَوْماً بِجَانِبِكِ عَلَى مَدَى الدَّرْبِ.\n\nتَمَّتْ بِحَمْدِ اللهِ.",
      verseArWithCoStar: "أَشْرَقَتِ الشَّمْسُ بِهَيْبَةٍ تَكْسُو الرُّبَى بِالذَّهَبِ،\nتُخْبِرُنَا أَنَّ المُعْجِزَاتِ تَتَحَقَّقُ بِالسَّعْيِ وَالطَّلَبِ.\n{childPronoun} نَبْضُ قُلُوبِنَا، وَأَغْلَى مَا نَرْجُو مِنَ الإِرْبِ،\nوَمَعَ{childKaaf} {coStarName} دَوْماً عَلَى مَدَى الدَّرْبِ.\n\nتَمَّتْ بِحَمْدِ اللهِ.",
    },
    characterPose: "hugging-parent",
    coStarPose: "embracing-child",
  },
];

/**
 * Enhanced renderVerse supporting Arabic Tashkeel, I'rab inflection,
 * gender concordance, and co-star stanza integration.
 */
export function renderVerse(
  template: string,
  config: CharacterConfig,
  lang: "en" | "ar" = "en",
  grammaticalCase: "nominative" | "accusative" | "genitive" | "vocative" = "nominative"
): string {
  const isGirl = config.protagonist.gender === "girl";
  const rawChildName = config.protagonist.name.trim();

  const childName = lang === "ar"
    ? getVocalizedArabicName(rawChildName || (isGirl ? "فاطمة" : "زايد"), grammaticalCase)
    : (rawChildName || (isGirl ? "Fatima" : "Zayed"));

  const gifterName = config.gifterName.trim() || (lang === "ar" ? "مَامَا وَبَابَا" : "Mama & Baba");
  const childGender = isGirl
    ? (lang === "ar" ? "البَطَلَةُ الصَّغِيرَةُ" : "girl")
    : (lang === "ar" ? "البَطَلُ الصَّغِيرُ" : "boy");

  const coStarRole = config.coStar?.role || "dad";
  const coStarName = lang === "ar"
    ? getVocalizedCoStar(config.coStar?.name || "", coStarRole)
    : (config.coStar?.name?.trim() || (coStarRole === "mom" ? "Mama" : coStarRole === "grandpa" ? "Grandpa" : coStarRole === "grandma" ? "Grandma" : "Baba"));

  const coStarRoleLabel = coStarRole === "mom"
    ? (lang === "ar" ? "الأم" : "Mother")
    : coStarRole === "grandpa"
    ? (lang === "ar" ? "الجد" : "Grandfather")
    : coStarRole === "grandma"
    ? (lang === "ar" ? "الجدة" : "Grandmother")
    : (lang === "ar" ? "الأب" : "Father");

  const coStarGuideVerb = (coStarRole === "mom" || coStarRole === "grandma") ? "تُرْشِدُ" : "يُرْشِدُ";
  const childCarryVerb = isGirl ? "تَحْمِلُ" : "يَحْمِلُ";
  const childPronoun = isGirl ? "أَنْتِ" : "أَنْتَ";
  const childKaaf = isGirl ? "كِ" : "كَ";

  // Dynamic morphological tokens for verse adaptation
  let result = template
    .replace(/{childName}/g, childName)
    .replace(/{gifterName}/g, gifterName)
    .replace(/{childGender}/g, childGender)
    .replace(/{coStarName}/g, coStarName)
    .replace(/{coStarRole}/g, coStarRoleLabel)
    .replace(/{coStarGuideVerb}/g, coStarGuideVerb)
    .replace(/{childCarryVerb}/g, childCarryVerb)
    .replace(/{childPronoun}/g, childPronoun)
    .replace(/{childKaaf}/g, childKaaf)
    .replace(/{dedicationText}/g, config.dedication || "");

  // If rendering in Arabic for a female protagonist, perform context-aware concordance replacements if not already branched
  if (lang === "ar" && isGirl) {
    result = result
      .replace(/يَتَأَمَّلُ/g, "تَتَأَمَّلُ")
      .replace(/مَدَّ\s+([\u0600-\u06FF\s]+)\s+كَفَّهُ/g, "مَدَّتْ $1 كَفَّهَا")
      .replace(/تَعَلَّمَ\s+([\u0600-\u06FF\s]+)\s+حِكْمَةَ/g, "تَعَلَّمَتْ $1 حِكْمَةَ")
      .replace(/قَدَّمَ\s+([\u0600-\u06FF\s]+)\s+المَاءَ/g, "قَدَّمَتْ $1 المَاءَ")
      .replace(/دَخَلَ\s+([\u0600-\u06FF\s]+)\s+بِخُطَى/g, "دَخَلَتْ $1 بِخُطَى")
      .replace(/يُنِيرُ دَرْبَهُ/g, "يُنِيرُ دَرْبَهَا")
      .replace(/شَاكِرَيْنِ\s+([\u0600-\u06FF\s]+)\s+الَّذِي مَلأَ/g, "شَاكِرَيْنِ $1 الَّتِي مَلأَتْ")
      .replace(/أَنْتَ فَخْرُ الرِّجَالِ،\s*ابْنُ هَذِهِ الأَرْضِ الطَّيِّبَةِ، وَنِبْرَاسُ الأَمَلِ وَالكَمَالِ/g, "أَنْتِ فَخْرُ الأَجْيَالِ،\nابْنَةُ هَذِهِ الأَرْضِ الطَّيِّبَةِ، وَنِبْرَاسُ الأَمَلِ وَالجَمَالِ")
      .replace(/نَمْ قَرِيرَ العَيْنِ/g, "نَامِي قَرِيرَةَ العَيْنِ")
      .replace(/مَحْفُوظاً عَلَى الدَّوَامِ/g, "مَحْفُوظَةً عَلَى الدَّوَامِ")
      .replace(/أَنْتَ نَبْضُ قُلُوبِنَا/g, "أَنْتِ نَبْضُ قُلُوبِنَا")
      .replace(/بِجَانِبِكَ عَلَى مَدَى الدَّرْبِ/g, "بِجَانِبِكِ عَلَى مَدَى الدَّرْبِ");
  }

  return result;
}

/**
 * Returns fully resolved spread content based on config, gender, co-star status, and language.
 */
export function getSpreadContent(
  spread: StorySpread,
  config: CharacterConfig,
  _lang: "en" | "ar" = "en"
): {
  leftTitle?: string;
  leftVerse: string;
  leftNote?: string;
  rightTitle?: string;
  rightVerse: string;
  rightNote?: string;
} {
  void _lang;
  const isGirl = config.protagonist.gender === "girl";
  const hasCoStar = !!(config.coStar?.enabled);

  // Left page
  let rawLeftVerse = spread.leftPage.verseEn;
  if (hasCoStar && spread.leftPage.verseEnWithCoStar) {
    rawLeftVerse = spread.leftPage.verseEnWithCoStar;
  }
  const leftVerse = renderVerse(rawLeftVerse, config, "en");
  const leftTitle = spread.leftPage.titleEn ? renderVerse(spread.leftPage.titleEn, config, "en") : undefined;
  const leftNote = spread.leftPage.noteEn ? renderVerse(spread.leftPage.noteEn, config, "en") : undefined;

  // Right page
  let rawRightVerse = spread.rightPage.verseAr;
  if (hasCoStar && spread.rightPage.verseArWithCoStar) {
    rawRightVerse = spread.rightPage.verseArWithCoStar;
  } else if (isGirl && spread.rightPage.verseArGirl) {
    rawRightVerse = spread.rightPage.verseArGirl;
  }

  let rawRightTitle = spread.rightPage.titleAr;
  if (isGirl && spread.rightPage.titleArGirl) {
    rawRightTitle = spread.rightPage.titleArGirl;
  }

  const rightVerse = renderVerse(rawRightVerse, config, "ar");
  const rightTitle = rawRightTitle ? renderVerse(rawRightTitle, config, "ar") : undefined;
  const rightNote = spread.rightPage.noteAr ? renderVerse(spread.rightPage.noteAr, config, "ar") : undefined;

  return {
    leftTitle,
    leftVerse,
    leftNote,
    rightTitle,
    rightVerse,
    rightNote,
  };
}

// =========================================================================
// EXPANSION BOOK 1: THE PEARL DIVER'S SECRET TREASURE (12 SPREADS)
// Slug: the-pearl-divers-secret-treasure | ID: pearl-diver-treasure
// =========================================================================
export const PEARL_DIVER_SPREADS: StorySpread[] = [
  {
    id: 0,
    spreadNumber: 0,
    spreadTitleEn: "Front Cover Keepsake",
    spreadTitleAr: "الغلاف التذكاري الأمامي",
    sceneTheme: "maritime-cover",
    bgImage: "/books/pearl-diver-treasure-cover.jpg",
    leftPage: {
      titleEn: "{childName} & The Pearl Diver's Secret Treasure",
      verseEn: "A Magical Arabian Gulf Voyage to Discover the Shimmering Rainbow Pearl\nCrafted with Love in the United Arab Emirates",
      noteEn: "Personalized with love by: {gifterName}\nPersonalizedTales.com • United Arab Emirates",
    },
    rightPage: {
      titleAr: "{childName} وَسِرُّ غَوَّاصِ اللُّؤْلُؤِ الصَّغِيرِ",
      verseAr: "رِحْلَةٌ بَحْرِيَّةٌ سَاحِرَةٌ فِي أَعْمَاقِ الخَلِيجِ العَرَبِيِّ\nصُنِعَ بِكُلِّ حُبٍّ فِي دَوْلَةِ الإِمَارَاتِ العَرَبِيَّةِ المُتَّحِدَةِ",
      noteAr: "إِهْدَاءٌ مَفْعُومٌ بِالحُبِّ مِنْ: {gifterName}\nحِكَايَاتٌ مُخَصَّصَةٌ • دَوْلَةُ الإِمَارَاتِ العَرَبِيَّةِ المُتَّحِدَةِ",
    },
    characterPose: "captain-at-helm",
  },
  {
    id: 1,
    spreadNumber: 1,
    spreadTitleEn: "Opening Dedication & Maritime Seal",
    spreadTitleAr: "صفحة الإهداء والختم التذكاري",
    sceneTheme: "parchment-maritime",
    bgImage: "/images/book_craftsmanship.jpg",
    leftPage: {
      titleEn: "A Message to Anchor in Your Heart Forever",
      verseEn: "{dedicationText}",
      noteEn: "Archival 200gsm Mohawk Silk Paper • Maritime Heritage Edition • UAE",
    },
    rightPage: {
      titleAr: "رِسَالَةٌ تَسْكُنُ أَعْمَاقَ الفُؤَادِ",
      verseAr: "«إِلَى بَطَلِنَا الشُّجَاعِ {childName}،\n\nكَمَا يَغُوصُ النَّوَاخِذَةُ فِي لُجَجِ البَحْرِ طَلَباً لِلُّؤْلُؤِ، نَدْعُو اللهَ أَنْ تَكُونَ حَيَاتُكَ نَقِيَّةً وَمَغَامَرَاتُكَ مَلِيئَةً بِالشَّجَاعَةِ وَالإِقْدَامِ. نُحِبُّكَ حُبّاً يَمْتَدُّ كَاتِّسَاعِ الخَلِيجِ.\n\nمَعَ كُلِّ مَحَبَّتِنَا،\n{gifterName}»",
      verseArGirl: "«إِلَى بَطَلَتِنَا الشُّجَاعَةِ {childName}،\n\nكَمَا يَغُوصُ النَّوَاخِذَةُ فِي لُجَجِ البَحْرِ طَلَباً لِلُّؤْلُؤِ، نَدْعُو اللهَ أَنْ تَكُونَ حَيَاتُكِ نَقِيَّةً وَمَغَامَرَاتُكِ مَلِيئَةً بِالشَّجَاعَةِ وَالإِقْدَامِ. نُحِبُّكِ حُبّاً يَمْتَدُّ كَاتِّسَاعِ الخَلِيجِ.\n\nمَعَ كُلِّ مَحَبَّتِنَا،\n{gifterName}»",
      noteAr: "طُبِعَ خِصِّيصاً كَذِكْرَى خَالِدَةٍ • نُسْخَةُ إِهْدَاءٍ تَارِيخِيَّةٍ",
    },
    characterPose: "reading-seal",
  },
  {
    id: 2,
    spreadNumber: 2,
    spreadTitleEn: "Setting Sail from Dubai Creek",
    spreadTitleAr: "الإِبْحَارُ مِنْ خُورِ دُبَيَّ العَتِيقِ",
    sceneTheme: "dhow-departure",
    bgImage: "/final_book_mockup_1788701924626.jpg",
    leftPage: {
      titleEn: "Chapter One: The Wooden Dhow",
      verseEn: "Upon the sparkling waters where the wooden dhow boats sway,\nYoung {childName} stepped aboard the deck to greet the golden day.\nThe giant white sails caught the breeze, the seagulls danced on high,\nTo seek the fabled Rainbow Pearl beneath the coastal sky!",
    },
    rightPage: {
      titleAr: "الفَصْلُ الأَوَّلُ: مَتْنُ السَّفِينَةِ الخَشَبِيَّةِ",
      verseAr: "رَفَعَتْ سَفِينَةُ الغَوْصِ شِرَاعَهَا الأَبْيَضَ النَّاصِعَ فِي ضِيَاءِ النَّهَارِ،\nوَ{childName} يَبْتَسِمُ لِلْمَوْجِ وَالبَحْرِ الشَّاسِعِ بِكُلِّ اسْتِبْشَارٍ.\nانْطَلَقَتِ المَخَاطِفُ نَحْوَ مِيَاهِ الخَلِيجِ الزَّرْقَاءِ بِعَزِيمَةٍ شَمَّاءِ،\nتَبْحَثُ عَنْ لُؤْلُؤَةِ قَوْسِ قُزَحَ السَّاطِعَةِ الوَضَّاءِ!",
      verseArGirl: "رَفَعَتْ سَفِينَةُ الغَوْصِ شِرَاعَهَا الأَبْيَضَ النَّاصِعَ فِي ضِيَاءِ النَّهَارِ،\nوَ{childName} تَبْتَسِمُ لِلْمَوْجِ وَالبَحْرِ الشَّاسِعِ بِكُلِّ اسْتِبْشَارٍ.\nانْطَلَقَتِ المَخَاطِفُ نَحْوَ مِيَاهِ الخَلِيجِ الزَّرْقَاءِ بِعَزِيمَةٍ شَمَّاءِ،\nتَبْحَثُ عَنْ لُؤْلُؤَةِ قَوْسِ قُزَحَ السَّاطِعَةِ الوَضَّاءِ!",
    },
    characterPose: "pointing-to-sea",
  },
  {
    id: 3,
    spreadNumber: 3,
    spreadTitleEn: "The Wise Green Turtle Guide",
    spreadTitleAr: "سُلَحْفَاةُ البَحْرِ المُرْشِدَةُ الوَدِيعَةُ",
    sceneTheme: "turtle-encounter",
    bgImage: "/final_book_mockup_1788701924626.jpg",
    leftPage: {
      titleEn: "A Friendly Guide from the Deep",
      verseEn: "A gentle sea turtle arose with shell of moss and gold,\nShe tapped the cedar timber hull and ancient secrets told.\n{childName} leaned across the side with bright, delighted eyes,\nTo follow where the ocean path beneath the current lies.",
    },
    rightPage: {
      titleAr: "مُرْشِدَةُ الأَعْمَاقِ ذَاتُ القَوْقَعَةِ المُذَهَّبَةِ",
      verseAr: "أَطَلَّتْ سُلَحْفَاةُ البَحْرِ تُحَيِّي البَطَلَ الصَّغِيرَ بِلُطْفٍ وَحَنَانٍ،\nبِقَوْقَعَةٍ ذَهَبِيَّةٍ تَلْمَعُ فَوْقَ المَاءِ فِي هَذَا المَكَانِ.\nمَدَّ {childName} كَفَّهُ لِيَتْبَعَ مَسَارَ الأَمْوَاجِ الهَادِئَةِ،\nنَحْوَ حَدَائِقِ المَرْجَانِ وَالكُنُوزِ الدَّافِئَةِ!",
      verseArGirl: "أَطَلَّتْ سُلَحْفَاةُ البَحْرِ تُحَيِّي البَطَلَةَ الصَّغِيرَةَ بِلُطْفٍ وَحَنَانٍ،\nبِقَوْقَعَةٍ ذَهَبِيَّةٍ تَلْمَعُ فَوْقَ المَاءِ فِي هَذَا المَكَانِ.\nمَدَّتْ {childName} كَفَّهَا لِيَتْبَعَ مَسَارَ الأَمْوَاجِ الهَادِئَةِ،\nنَحْوَ حَدَائِقِ المَرْجَانِ وَالكُنُوزِ الدَّافِئَةِ!",
    },
    characterPose: "waving-at-turtle",
  },
  {
    id: 4,
    spreadNumber: 4,
    spreadTitleEn: "The Deep Turquoise Plunge",
    spreadTitleAr: "الغَوْصُ فِي أَعْمَاقِ الفَيْرُوزِ",
    sceneTheme: "diving-descent",
    bgImage: "/images/hero_story_spread.jpg",
    leftPage: {
      titleEn: "Into the Shimmering Turquoise",
      verseEn: "With nose-clip carved of seasoned bone and stone to pull below,\nOur brave young hero took a breath where crystal waters flow.\nDown down into the turquoise deep where gentle bubbles gleam,\nA world more wondrous than the heart could ever paint or dream!",
    },
    rightPage: {
      titleAr: "هُبُوطٌ شُجَاعٌ إِلَى عَالَمِ الأَسْرَارِ",
      verseAr: "شَدَّ الغَوَّاصُ الصَّغِيرُ حَبْلَ الهُبُوطِ بِإِتْقَانٍ وَبَرَاعَةٍ تَامَّةٍ،\nوَغَاصَ فِي أَعْمَاقِ اليَمِّ بِكُلِّ جَسَارَةٍ وَشَجَاعَةٍ عَامَّةٍ.\nفُقَاعَاتُ المَاءِ تَتَرَاقَصُ حَوْلَهُ كَالجُمَانِ اللَّمَّاعِ،\nتَكْشِفُ عَنْ سِحْرٍ عَجِيبٍ يَسْبِي كُلَّ شُجَاعٍ!",
      verseArGirl: "شَدَّتِ الغَوَّاصَةُ الصَّغِيرَةُ حَبْلَ الهُبُوطِ بِإِتْقَانٍ وَبَرَاعَةٍ تَامَّةٍ،\nوَغَاصَتْ فِي أَعْمَاقِ اليَمِّ بِكُلِّ جَسَارَةٍ وَشَجَاعَةٍ عَامَّةٍ.\nفُقَاعَاتُ المَاءِ تَتَرَاقَصُ حَوْلَهَا كَالجُمَانِ اللَّمَّاعِ،\nتَكْشِفُ عَنْ سِحْرٍ عَجِيبٍ يَسْبِي كُلَّ شُجَاعٍ!",
    },
    characterPose: "swimming-underwater",
  },
  {
    id: 5,
    spreadNumber: 5,
    spreadTitleEn: "The Protected Coral Gardens",
    spreadTitleAr: "حَدَائِقُ المَرْجَانِ المَحْمِيَّةُ",
    sceneTheme: "coral-reef",
    bgImage: "/final_book_mockup_1788701924626.jpg",
    leftPage: {
      titleEn: "Abu Dhabi's Sunken Kingdom",
      verseEn: "Along the sanctuary reef, bright corals softly sway,\nPink anemones and golden fish in quiet schools at play.\n{childName} swam with graceful strokes amidst the coral reef,\nIn awe of ocean treasures far beyond our plain belief!",
    },
    rightPage: {
      titleAr: "بَهْجَةُ الشِّعَابِ وَالأَسْمَاكِ المُلَوَّنَةِ",
      verseAr: "أَمَامَ مَحْمِيَّةِ المَرْجَانِ تَفَتَّحَتْ أَزْهَارُ البِحَارِ النَّضِرَةُ،\nوَأَسْمَاكٌ مُلَوَّنَةٌ تَمْرَحُ بَيْنَ الصُّخُورِ بِأَلْوَانٍ عَطِرَةٍ.\nسَبَحَ {childName} بَيْنَ الشِّعَابِ كَأَمِيرِ الأَعْمَاقِ بِافْتِخَارٍ،\nيُشَاهِدُ إِبْدَاعَ الخَالِقِ فِي حُسْنِ هَذِهِ الدِّيَارِ!",
      verseArGirl: "أَمَامَ مَحْمِيَّةِ المَرْجَانِ تَفَتَّحَتْ أَزْهَارُ البِحَارِ النَّضِرَةُ،\nوَأَسْمَاكٌ مُلَوَّنَةٌ تَمْرَحُ بَيْنَ الصُّخُورِ بِأَلْوَانٍ عَطِرَةٍ.\nسَبَحَتْ {childName} بَيْنَ الشِّعَابِ كَأَمِيرَةِ الأَعْمَاقِ بِافْتِخَارٍ،\nيُشَاهِدُ إِبْدَاعَ الخَالِقِ فِي حُسْنِ هَذِهِ الدِّيَارِ!",
    },
    characterPose: "exploring-coral",
  },
  {
    id: 6,
    spreadNumber: 6,
    spreadTitleEn: "The Ancient Giant Oyster",
    spreadTitleAr: "مَحَارَةُ اللُّؤْلُؤِ العَتِيقَةُ",
    sceneTheme: "oyster-bed",
    bgImage: "/final_book_mockup_1788701924626.jpg",
    leftPage: {
      titleEn: "The Discovery in the Sand",
      verseEn: "Tucked deep within a sandy bed where sea-grass softly rolled,\nA giant oyster rested quiet, centuries untold.\nWith tender hands and patient care, {childName} set it free,\nA gift preserved for generations deep within the sea!",
    },
    rightPage: {
      titleAr: "كَنْزٌ مَحْفُوظٌ بَيْنَ رِمَالِ الأَعْمَاقِ",
      verseAr: "بَيْنَ عُشْبِ البَحْرِ اسْتَقَرَّتْ مَحَارَةٌ كَبِيرَةٌ نَادِرَةُ المِثَالِ،\nحَفِظَتْهَا الأَمْوَاجُ عُصُوراً طَوِيلَةً فِي أَمَانٍ وَجَلاَلٍ.\nاقْتَرَبَ {childName} بِرِفْقٍ وَحَمَلَهَا بَيْنَ يَدَيْهِ بِاحْتِرَامٍ،\nفَانْسَابَ شُعَاعٌ بَرَّاقٌ يُبَشِّرُ بِالنُّورِ وَالسَّلاَمِ!",
      verseArGirl: "بَيْنَ عُشْبِ البَحْرِ اسْتَقَرَّتْ مَحَارَةٌ كَبِيرَةٌ نَادِرَةُ المِثَالِ،\nحَفِظَتْهَا الأَمْوَاجُ عُصُوراً طَوِيلَةً فِي أَمَانٍ وَجَلاَلٍ.\nاقْتَرَبَتْ {childName} بِرِفْقٍ وَحَمَلَتْهَا بَيْنَ يَدَيْهَا بِاحْتِرَامٍ،\nفَانْسَابَ شُعَاعٌ بَرَّاقٌ يُبَشِّرُ بِالنُّورِ وَالسَّلاَمِ!",
    },
    characterPose: "holding-oyster",
  },
  {
    id: 7,
    spreadNumber: 7,
    spreadTitleEn: "The Shimmering Rainbow Pearl",
    spreadTitleAr: "لُؤْلُؤَةُ قَوْسِ قُزَحَ السَّاحِرَةُ",
    sceneTheme: "pearl-unveiling",
    bgImage: "/images/hero_story_spread.jpg",
    leftPage: {
      titleEn: "Iridescent Splendor",
      verseEn: "The shell parted gently to reveal a brilliant sight,\nA rainbow pearl of purest grace that shone with inner light!\nPink and azure, gold and green, its radiant colors shone,\nThe most enchanting treasure that the waters had ever known!",
    },
    rightPage: {
      titleAr: "بَرِيقُ الأَلْوَانِ السَّبْعَةِ المُشِعَّةِ",
      verseAr: "تَفَتَّحَتِ المَحَارَةُ فَبَدَتْ لُؤْلُؤَةٌ فَرِيدَةٌ تَفُوقُ الخَيَالَ،\nتَشِعُّ بِأَلْوَانِ قَوْسِ قُزَحَ فِي غَايَةِ السِّحْرِ وَالجَمَالِ!\nوَرْدِيٌّ وَفَيْرُوزِيٌّ وَذَهَبٌ خَالِصٌ يَخْطَفُ الأَبْصَارَ،\nأَغْلَى مَا جَادَ بِهِ الخَلِيجُ مِنْ نَفَائِسَ وَأَسْرَارٍ!",
      verseArGirl: "تَفَتَّحَتِ المَحَارَةُ فَبَدَتْ لُؤْلُؤَةٌ فَرِيدَةٌ تَفُوقُ الخَيَالَ،\nتَشِعُّ بِأَلْوَانِ قَوْسِ قُزَحَ فِي غَايَةِ السِّحْرِ وَالجَمَالِ!\nوَرْدِيٌّ وَفَيْرُوزِيٌّ وَذَهَبٌ خَالِصٌ يَخْطَفُ الأَبْصَارَ،\nأَغْلَى مَا جَادَ بِهِ الخَلِيجُ مِنْ نَفَائِسَ وَأَسْرَارٍ!",
    },
    characterPose: "marveling-at-pearl",
  },
  {
    id: 8,
    spreadNumber: 8,
    spreadTitleEn: "Dancing Dolphins of the Gulf",
    spreadTitleAr: "رَقْصَةُ الدَّلاَفِينِ فِي خَلِيجِ الأَمَانِ",
    sceneTheme: "dolphin-leap",
    bgImage: "/final_book_mockup_1788701924626.jpg",
    leftPage: {
      titleEn: "Celebration on the Waves",
      verseEn: "Surfacing to open air, the crew cried out with cheer,\nFriendly Gulf dolphins gathered round, leaping far and near.\nThey danced above the emerald waves beside the dhow's bow line,\nTo celebrate the courage of a captain so divine!",
    },
    rightPage: {
      titleAr: "ابْتِهَاجُ أَهْلِ البَحْرِ بِعَوْدَةِ البَطَلِ",
      verseAr: "صَعِدَ البَطَلُ إِلَى السَّطْحِ فَاشْتَعَلَتْ هُتَافَاتُ النَّوَاخِذَةِ الفَرِحِينَ،\nوَجَاءَتْ دَلاَفِينُ الخَلِيجِ تَقْفِزُ حَوْلَ السَّفِينَةِ فِي حِينٍ.\nتَتَمَايَلُ فَوْقَ المَوْجِ كَأَنَّهَا فُرْسَانٌ فِي حَفْلِ السَّبَقِ،\nتُحَيِّي صَغِيراً مِقْدَاماً تَأَلَّقَ نُورُهُ كَأَبْهَى شَفَقٍ!",
      verseArGirl: "صَعِدَتِ البَطَلَةُ إِلَى السَّطْحِ فَاشْتَعَلَتْ هُتَافَاتُ النَّوَاخِذَةِ الفَرِحِينَ،\nوَجَاءَتْ دَلاَفِينُ الخَلِيجِ تَقْفِزُ حَوْلَ السَّفِينَةِ فِي حِينٍ.\nتَتَمَايَلُ فَوْقَ المَوْجِ كَأَنَّهَا فُرْسَانٌ فِي حَفْلِ السَّبَقِ،\nتُحَيِّي صَغِيرَةً مِقْدَامَةً تَأَلَّقَ نُورُهَا كَأَبْهَى شَفَقٍ!",
    },
    characterPose: "cheering-with-crew",
  },
  {
    id: 9,
    spreadNumber: 9,
    spreadTitleEn: "Steering by the North Star",
    spreadTitleAr: "الإِبْحَارُ عَلَى ضَوْءِ نَجْمِ الجَدْيِ",
    sceneTheme: "starlit-navigation",
    bgImage: "/images/hero_reading_lifestyle.jpg",
    leftPage: {
      titleEn: "The Guiding Silver Star",
      verseEn: "When evening shadows settled down with thousands of bright stars,\nThe captain read the ancient charts without compass bars.\nThe North Star gleamed above the mast, a friendly silver spark,\nGuiding {childName} and the crew safely through the dark.",
    },
    rightPage: {
      titleAr: "بَوْصَلَةُ السَّمَاءِ المُرَصَّعَةُ بِالقَنَادِيلِ",
      verseAr: "أَضَاءَتْ قُبَّةُ السَّمَاءِ بِأَلْفِ نَجْمٍ مُنِيرٍ زَاهِرٍ وَضِيءٍ،\nيُرْشِدُ السَّفِينَةَ إِلَى المَرْسَى بِعَزْمٍ بَاهِرٍ جَرِيءٍ.\nنَظَرَ {childName} إِلَى نَجْمِ الشِّمَالِ فِي عُلَى الأَفْلاَكِ العَالِيَةِ،\nفَأَبْحَرَ الخَشَبُ العَتِيقُ فِي أَمَانٍ نَحْوَ الشَّوَاطِئِ الغَالِيَةِ!",
      verseArGirl: "أَضَاءَتْ قُبَّةُ السَّمَاءِ بِأَلْفِ نَجْمٍ مُنِيرٍ زَاهِرٍ وَضِيءٍ،\nيُرْشِدُ السَّفِينَةَ إِلَى المَرْسَى بِعَزْمٍ بَاهِرٍ جَرِيءٍ.\nنَظَرَتْ {childName} إِلَى نَجْمِ الشِّمَالِ فِي عُلَى الأَفْلاَكِ العَالِيَةِ،\nفَأَبْحَرَ الخَشَبُ العَتِيقُ فِي أَمَانٍ نَحْوَ الشَّوَاطِئِ الغَالِيَةِ!",
    },
    characterPose: "looking-at-stars",
  },
  {
    id: 10,
    spreadNumber: 10,
    spreadTitleEn: "Welcomed Home at the Harbor",
    spreadTitleAr: "اسْتِقْبَالُ الأَبْطَالِ فِي المِينَاءِ",
    sceneTheme: "harbor-welcome",
    bgImage: "/images/gift_box_packaging.jpg",
    leftPage: {
      titleEn: "Homecoming Joy",
      verseEn: "Lanterns flickered on the shore where eager families stood,\nTo welcome back the wooden dhow and praise the captain good.\nSweet saffron tea and cardamom, warm smiles from every friend,\nA joyful coastal jubilee that never seemed to end!",
    },
    rightPage: {
      titleAr: "أَنْوَارُ الشَّاطِئِ وَفَرْحَةُ اللِّقَاءِ",
      verseAr: "عَلَى شَاطِئِ الوَطَنِ تَلأْلأَتْ قَنَادِيلُ الفَرَحِ وَالسُّرُورِ الكَبِيرِ،\nتَسْتَقْبِلُ عَوْدَةَ البَحَّارَةِ بِمِسْكٍ وَعِطْرِ بَخُورٍ نَمِيرٍ.\nقَدَّمَتِ الأُمَّهَاتُ حَلْوَى التَّمْرِ وَالقَهْوَةَ الزَّكِيَّةَ المُعَطَّرَةَ،\nتَفْخَرُ بِـ{childName} وَرِحْلَتِهِ التَّارِيخِيَّةِ المُظَفَّرَةِ!",
      verseArGirl: "عَلَى شَاطِئِ الوَطَنِ تَلأْلأَتْ قَنَادِيلُ الفَرَحِ وَالسُّرُورِ الكَبِيرِ،\nتَسْتَقْبِلُ عَوْدَةَ البَحَّارَةِ بِمِسْكٍ وَعِطْرِ بَخُورٍ نَمِيرٍ.\nقَدَّمَتِ الأُمَّهَاتُ حَلْوَى التَّمْرِ وَالقَهْوَةَ الزَّكِيَّةَ المُعَطَّرَةَ،\nتَفْخَرُ بِـ{childName} وَرِحْلَتِهَا التَّارِيخِيَّةِ المُظَفَّرَةِ!",
    },
    characterPose: "embracing-family",
  },
  {
    id: 11,
    spreadNumber: 11,
    spreadTitleEn: "A Legacy of Courage and Generosity",
    spreadTitleAr: "أَمَانَةُ الأَجْدَادِ وَعَطَاءُ الأَحْفَادِ",
    sceneTheme: "museum-legacy",
    bgImage: "/images/book_craftsmanship.jpg",
    leftPage: {
      titleEn: "The Greatest Treasure",
      verseEn: "{childName} gave the pearl away for every child to see,\nA symbol of our heritage, our strength and honesty.\nFor greatest treasures aren't the pearls we keep upon a shelf,\nTrue richness lies in giving love and sharing from oneself!",
    },
    rightPage: {
      titleAr: "العِبْرَةُ الخَالِدَةُ: كَنْزُ العَطَاءِ",
      verseAr: "أَهْدَى {childName} اللُّؤْلُؤَةَ لِمَتْحَفِ الوَطَنِ العَزِيزِ الغَالِي،\nلِتَبْقَى شَاهِداً لِلأَجْيَالِ عَلَى عِزَّةِ الأَهْلِ وَالمَعَالِي.\nفَأَغْلَى كُنُوزِ الدُّنْيَا لَيْسَتْ حُلِيّاً تُخَبَّأُ فِي الصَّنَادِيقِ،\nبَلْ نَبْلُ الرُّوحِ، وَمَحَبَّةُ الأَهْلِ، وَعَوْنُ كُلِّ صَدِيقٍ!\nتَمَّتْ بِحَمْدِ اللهِ",
      verseArGirl: "أَهْدَتْ {childName} اللُّؤْلُؤَةَ لِمَتْحَفِ الوَطَنِ العَزِيزِ الغَالِي،\nلِتَبْقَى شَاهِداً لِلأَجْيَالِ عَلَى عِزَّةِ الأَهْلِ وَالمَعَالِي.\nفَأَغْلَى كُنُوزِ الدُّنْيَا لَيْسَتْ حُلِيّاً تُخَبَّأُ فِي الصَّنَادِيقِ،\nبَلْ نَبْلُ الرُّوحِ، وَمَحَبَّةُ الأَهْلِ، وَعَوْنُ كُلِّ صَدِيقٍ!\nتَمَّتْ بِحَمْدِ اللهِ",
    },
    characterPose: "standing-proud-finale",
  },
];

// =========================================================================
// EXPANSION BOOK 2: FIRST STEPS IN THE BIG WORLD (12 SPREADS)
// Slug: first-steps-in-the-big-world | ID: baby-milestone-chronicle
// =========================================================================
export const BABY_MILESTONE_SPREADS: StorySpread[] = [
  {
    id: 0,
    spreadNumber: 0,
    spreadTitleEn: "Front Cover Keepsake",
    spreadTitleAr: "الغلاف التذكاري الأمامي",
    sceneTheme: "nursery-cover",
    bgImage: "/books/baby-milestone-book-cover.jpg",
    leftPage: {
      titleEn: "{childName}'s First Steps in the Big World",
      verseEn: "A Precious Keepsake Chronicle of Baby's Milestones & Smiles\nCrafted with Love in the United Arab Emirates",
      noteEn: "Personalized with love by: {gifterName}\nPersonalizedTales.com • United Arab Emirates",
    },
    rightPage: {
      titleAr: "خُطُوَاتُ {childName} الأُولَى فِي العَالَمِ الجَمِيلِ",
      verseAr: "كِتَابٌ تَذْكَارِيٌّ خَالِدٌ يُوَثِّقُ أَبْهَى لَحَظَاتِ الطُّفُولَةِ\nصُنِعَ بِكُلِّ حُبٍّ فِي دَوْلَةِ الإِمَارَاتِ العَرَبِيَّةِ المُتَّحِدَةِ",
      noteAr: "إِهْدَاءٌ مَفْعُومٌ بِالحُبِّ مِنْ: {gifterName}\nحِكَايَاتٌ مُخَصَّصَةٌ • دَوْلَةُ الإِمَارَاتِ العَرَبِيَّةِ المُتَّحِدَةِ",
    },
    characterPose: "baby-smiling",
  },
  {
    id: 1,
    spreadNumber: 1,
    spreadTitleEn: "Welcome Baby Dedication",
    spreadTitleAr: "صفحة الإهداء وميلاد المعجزة",
    sceneTheme: "parchment-baby",
    bgImage: "/images/book_craftsmanship.jpg",
    leftPage: {
      titleEn: "Welcome to the World, Little Miracle",
      verseEn: "{dedicationText}",
      noteEn: "Archival 200gsm Mohawk Silk Paper • Baby Heirloom Edition • UAE",
    },
    rightPage: {
      titleAr: "مَرْحَباً بِكَ يَا أَغْلَى هَدَايَا القَدَرِ",
      verseAr: "«إِلَى حَبِيبِ قُلُوبِنَا {childName}،\n\nمُنْذُ اليَوْمِ الأَوَّلِ الَّذِي نَوَّرْتَ فِيهِ دُنْيَانَا، تَغَيَّرَ كُلُّ شَيْءٍ وَصَارَ أَجْمَلَ. سَنَكُونُ دَوْماً بِجَانِبِكَ نُمْسِكُ بِيَدِكَ الصَّغِيرَةِ مَعَ كُلِّ خُطْوَةٍ جَدِيدَةٍ تَمْشِيهَا. نُحِبُّكَ حُبّاً يَمْلأُ الكَوْنَ.\n\nمَعَ كُلِّ مَحَبَّتِنَا،\n{gifterName}»",
      verseArGirl: "«إِلَى حَبِيبَةِ قُلُوبِنَا {childName}،\n\nمُنْذُ اليَوْمِ الأَوَّلِ الَّذِي نَوَّرْتِ فِيهِ دُنْيَانَا، تَغَيَّرَ كُلُّ شَيْءٍ وَصَارَ أَجْمَلَ. سَنَكُونُ دَوْماً بِجَانِبِكِ نُمْسِكُ بِيَدِكِ الصَّغِيرَةِ مَعَ كُلِّ خُطْوَةٍ جَدِيدَةٍ تَمْشِينَهَا. نُحِبُّكِ حُبّاً يَمْلأُ الكَوْنَ.\n\nمَعَ كُلِّ مَحَبَّتِنَا،\n{gifterName}»",
      noteAr: "طُبِعَ خِصِّيصاً كَذِكْرَى خَالِدَةٍ • نُسْخَةُ إِهْدَاءٍ عَصْرِيَّةٍ",
    },
    characterPose: "baby-in-blanket",
  },
  {
    id: 2,
    spreadNumber: 2,
    spreadTitleEn: "The Day You Arrived",
    spreadTitleAr: "يَوْمَ أَقْبَلْتَ عَلَى الدُّنْيَا",
    sceneTheme: "nursery-arrival",
    bgImage: "/images/category_for_babies.jpg",
    leftPage: {
      titleEn: "Chapter One: The Golden Sunrise",
      verseEn: "The morning birds began to sing, the flowers burst in bloom,\nThe moment little {childName} brought sunshine to the room!\nWith button nose and rosy cheeks and fingers small and sweet,\nOur family held our breath in awe, our happiness complete.",
    },
    rightPage: {
      titleAr: "الفَصْلُ الأَوَّلُ: نُورُ الفَجْرِ الجَدِيدِ",
      verseAr: "أَشْرَقَتِ الشَّمْسُ بِأَنْوَارِ السَّعَادَةِ وَالبَهْجَةِ الغَمِيرَةِ،\nيَوْمَ جِئْتَ يَا {childName} لِتَمْلأَ الدُّنْيَا رِقَّةً وَأُنْساً لِعَشِيرَةٍ.\nأَصَابِعُكَ الصَّغِيرَةُ كَحَبَّاتِ اللُّؤْلُؤِ النَّدِيِّ الطَّاهِرِ،\nوَوَجْهُكَ المَلائِكِيُّ نَبْعٌ مِنَ النُّورِ البَهِيِّ الزَّاهِرِ!",
      verseArGirl: "أَشْرَقَتِ الشَّمْسُ بِأَنْوَارِ السَّعَادَةِ وَالبَهْجَةِ الغَمِيرَةِ،\nيَوْمَ جِئْتِ يَا {childName} لِتَمْلَئِي الدُّنْيَا رِقَّةً وَأُنْساً لِعَشِيرَةٍ.\nأَصَابِعُكِ الصَّغِيرَةُ كَحَبَّاتِ اللُّؤْلُؤِ النَّدِيِّ الطَّاهِرِ،\nوَوَجْهُكِ المَلائِكِيُّ نَبْعٌ مِنَ النُّورِ البَهِيِّ الزَّاهِرِ!",
    },
    characterPose: "baby-crib",
  },
  {
    id: 3,
    spreadNumber: 3,
    spreadTitleEn: "Tiny Hands, Tiny Feet",
    spreadTitleAr: "أَكُفٌّ صَغِيرَةٌ وَأَقْدَامٌ رَقِيقَةٌ",
    sceneTheme: "baby-details",
    bgImage: "/final_book_mockup_1788701924626.jpg",
    leftPage: {
      titleEn: "Miracles in Miniature",
      verseEn: "Ten tiny toes to count and kiss, two hands that hold on tight,\nYou held our fingers in your grip from morning until night.\nA little miracle of love that rested in our arms,\nSurrounded by our whispered hopes and tender soothing charms.",
    },
    rightPage: {
      titleAr: "مُعْجِزَةُ الحُبِّ بَيْنَ الأَحْضَانِ",
      verseAr: "أَصَابِعُ أَقْدَامٍ نَاعِمَةٌ كَحَبَّاتِ المَطَرِ السَّاكِبِ،\nتُقَبِّلُهَا القُلُوبُ بِشَوْقٍ مَعَ كُلِّ صُبْحٍ غَارِبٍ.\nتَقْبِضُ بِكَفِّكَ الصَّغِيرِ عَلَى أَيْدِينَا بِحَنَانٍ شَفِيقٍ،\nفَنَشْعُرُ أَنَّ مَعَنَا أَعْظَمَ مَا فِي الكَوْنِ مِنْ بَرِيقٍ!",
      verseArGirl: "أَصَابِعُ أَقْدَامٍ نَاعِمَةٌ كَحَبَّاتِ المَطَرِ السَّاكِبِ،\nتُقَبِّلُهَا القُلُوبُ بِشَوْقٍ مَعَ كُلِّ صُبْحٍ غَارِبٍ.\nتَقْبِضِينَ بِكَفِّكِ الصَّغِيرِ عَلَى أَيْدِينَا بِحَنَانٍ شَفِيقٍ،\nفَنَشْعُرُ أَنَّ مَعَنَا أَعْظَمَ مَا فِي الكَوْنِ مِنْ بَرِيقٍ!",
    },
    characterPose: "holding-parents-finger",
  },
  {
    id: 4,
    spreadNumber: 4,
    spreadTitleEn: "The First Sweet Smile",
    spreadTitleAr: "الابْتِسَامَةُ الأُولَى المُشْرِقَةُ",
    sceneTheme: "first-smile",
    bgImage: "/images/hero_reading_lifestyle.jpg",
    leftPage: {
      titleEn: "Lighting Up the Whole Room",
      verseEn: "Then came the day that melted hearts without a single word,\nThe sweetest little baby grin that anyone had heard!\n{childName} smiled right up at us, with eyes of sparkling light,\nAnd instantly the whole wide room was glowing warm and bright!",
    },
    rightPage: {
      titleAr: "ضِحْكَةٌ تَمْلأُ القَلْبَ ضِيَاءً",
      verseAr: "وَفِي صَبَاحٍ جَمِيلٍ لاَحَتِ الابْتِسَامَةُ البَرِيئَةُ الوَسِيمَةُ،\nفَأَزْهَرَتْ فِي قُلُوبِ العَائِلَةِ الأَمَانِي العَظِيمَةُ!\nابْتَسَمَ {childName} فَمَالَتْ لَهُ زُهُورُ الحَدَائِقِ حُبّاً،\nوَغَرَّدَتْ لِضِحْكَتِهِ العَذْبَةِ كُلُّ الطُّيُورِ قُرْباً!",
      verseArGirl: "وَفِي صَبَاحٍ جَمِيلٍ لاَحَتِ الابْتِسَامَةُ البَرِيئَةُ الوَسِيمَةُ،\nفَأَزْهَرَتْ فِي قُلُوبِ العَائِلَةِ الأَمَانِي العَظِيمَةُ!\nابْتَسَمَتْ {childName} فَمَالَتْ لَهَا زُهُورُ الحَدَائِقِ حُبّاً،\nوَغَرَّدَتْ لِضِحْكَتِهَا العَذْبَةِ كُلُّ الطُّيُورِ قُرْباً!",
    },
    characterPose: "baby-giggling",
  },
  {
    id: 5,
    spreadNumber: 5,
    spreadTitleEn: "Tummy Time Explorations",
    spreadTitleAr: "رِحْلَةُ الاسْتِلْقَاءِ وَالتَّأَمُّلِ",
    sceneTheme: "tummy-time",
    bgImage: "/images/category_for_babies.jpg",
    leftPage: {
      titleEn: "Strength in Tiny Muscles",
      verseEn: "Lying upon the cozy rug amidst soft toys and blocks,\nYou lifted up your head with strength to watch the ticking clocks.\nA desert gazelle calf looked on, a butterfly flew near,\nCheering for little {childName} with every passing cheer!",
    },
    rightPage: {
      titleAr: "فُضُولُ المُكْتَشِفِ الصَّغِيرِ",
      verseAr: "فَوْقَ السِّجَادِ الوَفِيرِ رَفَعَ البَطَلُ رَأْسَهُ بِهِمَّةٍ وَنَشَاطٍ،\nيَنْظُرُ حَوْلَهُ بِفُضُولٍ جَمِيلٍ بَعِيداً عَنِ الإِحْبَاطِ.\nغَزَالُ الرِّيمِ الوَدِيعُ يُرَاقِبُهُ بِإِعْجَابٍ كَبِيرٍ فِي السَّاحَةِ،\nيُحَيِّي قُوَّةَ عَزْمِهِ فَوْقَ هَذِهِ الرِّيَاضِ المُتَاحَةِ!",
      verseArGirl: "فَوْقَ السِّجَادِ الوَفِيرِ رَفَعَتِ البَطَلَةُ رَأْسَهَا بِهِمَّةٍ وَنَشَاطٍ،\nيَنْظُرُ حَوْلَهُ بِفُضُولٍ جَمِيلٍ بَعِيداً عَنِ الإِحْبَاطِ.\nغَزَالُ الرِّيمِ الوَدِيعُ يُرَاقِبُهَا بِإِعْجَابٍ كَبِيرٍ فِي السَّاحَةِ،\nيُحَيِّي قُوَّةَ عَزْمِهَا فَوْقَ هَذِهِ الرِّيَاضِ المُتَاحَةِ!",
    },
    characterPose: "tummy-time-pose",
  },
  {
    id: 6,
    spreadNumber: 6,
    spreadTitleEn: "Baby Giggles & Peekaboo",
    spreadTitleAr: "ضِحْكَاتُ الطُّفُولَةِ وَلُعْبَةُ الغُمَّيْضَةِ",
    sceneTheme: "peekaboo-fun",
    bgImage: "/images/category_for_family.jpg",
    leftPage: {
      titleEn: "The Music of Laughter",
      verseEn: "Where did you go? Behind our hands! Peekaboo, here you are!\nYour joyful chuckles bubbled up, our shining little star.\nNo melody upon the earth can match that happy sound,\nWhen baby {childName}'s ringing laughs fill every corner round!",
    },
    rightPage: {
      titleAr: "فَرَحٌ يُعَطِّرُ أَرْكَانَ البَيْتِ",
      verseAr: "«أَيْنَ أَنْتَ؟ خَلْفَ الأَيْدِي! هَا أَنْتَ ذَا تَبْتَسِمُ بِاشْتِيَاقٍ!»\nفَتَعْلُو ضَحَكَاتُكَ الصَّافِيَةُ كَأَنْوَارِ الإِشْرَاقِ.\nمَا أَجْمَلَ رَنَّةَ صَوْتِكَ حِينَ تَمْرَحُ فِي أَرْجَاءِ الدَّارِ،\nتَنْشُرُ أُنْساً يُسْعِدُ قُلُوبَ العَائِلَةِ لَيْلَ نَهَارٍ!",
      verseArGirl: "«أَيْنَ أَنْتِ؟ خَلْفَ الأَيْدِي! هَا أَنْتِ ذِي تَبْتَسِمِينَ بِاشْتِيَاقٍ!»\nفَتَعْلُو ضَحَكَاتُكِ الصَّافِيَةُ كَأَنْوَارِ الإِشْرَاقِ.\nمَا أَجْمَلَ رَنَّةَ صَوْتِكِ حِينَ تَمْرَحِينَ فِي أَرْجَاءِ الدَّارِ،\nتَنْشُرِينَ أُنْساً يُسْعِدُ قُلُوبَ العَائِلَةِ لَيْلَ نَهَارٍ!",
    },
    characterPose: "playing-peekaboo",
  },
  {
    id: 7,
    spreadNumber: 7,
    spreadTitleEn: "The Rolling Adventure",
    spreadTitleAr: "التَّدَحْرُجُ الأَوَّلُ وَالبُطُولَةُ",
    sceneTheme: "rolling-over",
    bgImage: "/final_book_mockup_1788701924626.jpg",
    leftPage: {
      titleEn: "Over and Across",
      verseEn: "A little wiggle, then a twist, a determined little kick,\nYou rolled right over onto back with one courageous flick!\nThe room erupted into cheers, high-fives and proudest sighs,\nWatching the sheer accomplishment in your delighted eyes!",
    },
    rightPage: {
      titleAr: "إِنْجَازٌ جَدِيدٌ يُفْرِحُ القُلُوبَ",
      verseAr: "حَرَكَةٌ يَمْنَةً وَحَرَكَةٌ يَسْرَةً بِعَزِيمَةٍ وَإِصْرَارٍ وَثَبَاتٍ،\nتَدَحْرَجَ البَطَلُ بِخِفَّةٍ فَوْقَ البِسَاطِ بِلاَ عَقَبَاتٍ!\nهَتَفَ الجَمِيعُ فَرَحاً بِهَذَا الإِنْجَازِ البَدِيعِ الجَلِيِّ،\nوَعَيْنَا {childName} تَلْمَعَانِ بِسِحْرِ النَّصْرِ العَلِيِّ!",
      verseArGirl: "حَرَكَةٌ يَمْنَةً وَحَرَكَةٌ يَسْرَةً بِعَزِيمَةٍ وَإِصْرَارٍ وَثَبَاتٍ،\nتَدَحْرَجَتِ البَطَلَةُ بِخِفَّةٍ فَوْقَ البِسَاطِ بِلاَ عَقَبَاتٍ!\nهَتَفَ الجَمِيعُ فَرَحاً بِهَذَا الإِنْجَازِ البَدِيعِ الجَلِيِّ،\nوَعَيْنَا {childName} تَلْمَعَانِ بِسِحْرِ النَّصْرِ العَلِيِّ!",
    },
    characterPose: "rolling-on-rug",
  },
  {
    id: 8,
    spreadNumber: 8,
    spreadTitleEn: "Crawling Across the Floor",
    spreadTitleAr: "حَبْوُ المُسْتَكْشِفِ الصَّغِيرِ",
    sceneTheme: "crawling-quest",
    bgImage: "/images/category_for_babies.jpg",
    leftPage: {
      titleEn: "Hands and Knees Explorer",
      verseEn: "On hands and knees you set off fast to see what you could find,\nThe living room became a trail with plush toys left behind!\nFrom kitchen door to sofa edge, curious and full of grace,\n{childName} explored the cozy world with joy across your face!",
    },
    rightPage: {
      titleAr: "اسْتِكْشَافُ أَرْكَانِ المَنْزِلِ الدَّافِئِ",
      verseAr: "عَلَى الرُّكَبِ وَالأَكُفِّ انْطَلَقَ الصَّغِيرُ يَحْبُو بِشَغَفٍ وَسُرُورٍ،\nيَسْتَكْشِفُ أَرْكَانَ البَيْتِ كَأَمِيرٍ يَمْشِي بَيْنَ القُصُورِ!\nمِنْ قُرْبِ الأَرِيكَةِ إِلَى أَبْوَابِ الغُرَفِ المُضِيئَةِ بِالأَنْوَارِ،\n{childName} يَخْطُو فِي رِحْلَتِهِ الجَرِيئَةِ لَيْلَ نَهَارٍ!",
      verseArGirl: "عَلَى الرُّكَبِ وَالأَكُفِّ انْطَلَقَتِ الصَّغِيرَةُ تَحْبُو بِشَغَفٍ وَسُرُورٍ،\nيَسْتَكْشِفُ أَرْكَانَ البَيْتِ كَأَمِيرَةٍ تَمْشِي بَيْنَ القُصُورِ!\nمِنْ قُرْبِ الأَرِيكَةِ إِلَى أَبْوَابِ الغُرَفِ المُضِيئَةِ بِالأَنْوَارِ،\n{childName} تَخْطُو فِي رِحْلَتِهَا الجَرِيئَةِ لَيْلَ نَهَارٍ!",
    },
    characterPose: "crawling-forward",
  },
  {
    id: 9,
    spreadNumber: 9,
    spreadTitleEn: "First Words and Babbling Songs",
    spreadTitleAr: "أَوَّلُ الكَلِمَاتِ وَأَعْذَبُ النَّغَمَاتِ",
    sceneTheme: "first-words",
    bgImage: "/images/hero_reading_lifestyle.jpg",
    leftPage: {
      titleEn: "The Language of Love",
      verseEn: "“Ba-ba”, “Ma-ma”, sweet syllables began to softly flow,\nThe music of your little voice that made our spirits glow.\nEach little sound a golden thread of language taking flight,\nFilling our home with endless grace and genuine delight!",
    },
    rightPage: {
      titleAr: "نُطْقُ الحُرُوفِ الأُولَى بِعُذُوبَةٍ",
      verseAr: "«بَابَا» وَ«مَامَا» نَطَقَ اللِّسَانُ الحُلْوُ بِالكَلِمَاتِ الجَمِيلَةِ،\nفَانْسَابَتْ فِي البَيْتِ أَعْذَبُ الأَلْحَانِ الأَصِيلَةِ.\nكُلُّ حَرْفٍ يَخْرُجُ مِنْ فَمِكَ كَقَطْرَةِ نَدَى فِي الصَّبَاحِ،\nيَزِيدُ قُلُوبَنَا حُبّاً وَيَمْلأُ الأَيَّامَ بِالفَلاَحِ!",
      verseArGirl: "«بَابَا» وَ«مَامَا» نَطَقَ اللِّسَانُ الحُلْوُ بِالكَلِمَاتِ الجَمِيلَةِ،\nفَانْسَابَتْ فِي البَيْتِ أَعْذَبُ الأَلْحَانِ الأَصِيلَةِ.\nكُلُّ حَرْفٍ يَخْرُجُ مِنْ فَمِكِ كَقَطْرَةِ نَدَى فِي الصَّبَاحِ،\nيَزِيدُ قُلُوبَنَا حُبّاً وَيَمْلأُ الأَيَّامَ بِالفَلاَحِ!",
    },
    characterPose: "speaking-happily",
  },
  {
    id: 10,
    spreadNumber: 10,
    spreadTitleEn: "Pulling Up to Stand",
    spreadTitleAr: "الوُقُوفُ الشَّامِخُ بِثَبَاتٍ",
    sceneTheme: "standing-tall",
    bgImage: "/images/category_for_family.jpg",
    leftPage: {
      titleEn: "Standing on Two Feet",
      verseEn: "Holding tight to mama's hands, with knees that shook with pride,\nYou pulled yourself straight up to stand, with nothing left to hide!\nBalancing tall upon two feet, laughing in pure delight,\nReady to conquer all the world with all your little might!",
    },
    rightPage: {
      titleAr: "شُمُوخٌ وَإِصْرَارٌ عَلَى القَدَمَيْنِ",
      verseAr: "تَمَسَّكَ الصَّغِيرُ بِأَيْدِينَا وَوَقَفَ عَلَى قَدَمَيْهِ شَامِخاً أَبِيّاً،\nيَتَطَلَّعُ إِلَى العَالَمِ الوَاسِعِ بِعَزْمٍ بَرِيئاً وَفَتِيّاً!\nتَوَازُنٌ بَدِيعٌ بَيْنَ الفَرَحِ وَالإِقْدَامِ المَيْمُونِ،\nيَسْتَعِدُّ لِأَيَّامٍ سَعِيدَةٍ تَفُوقُ كُلَّ الظُّنُونِ!",
      verseArGirl: "تَمَسَّكَتِ الصَّغِيرَةُ بِأَيْدِينَا وَوَقَفَتْ عَلَى قَدَمَيْهَا شَامِخَةً أَبِيَّةً،\nيَتَطَلَّعُ إِلَى العَالَمِ الوَاسِعِ بِعَزْمٍ بَرِيئاً وَفَتِيّاً!\nتَوَازُنٌ بَدِيعٌ بَيْنَ الفَرَحِ وَالإِقْدَامِ المَيْمُونِ،\nيَسْتَعِدُّ لِأَيَّامٍ سَعِيدَةٍ تَفُوقُ كُلَّ الظُّنُونِ!",
    },
    characterPose: "standing-with-support",
  },
  {
    id: 11,
    spreadNumber: 11,
    spreadTitleEn: "The Courageous First Steps",
    spreadTitleAr: "الخُطُوَاتُ الأُولَى الشُّجَاعَةُ",
    sceneTheme: "first-steps-triumph",
    bgImage: "/images/book_craftsmanship.jpg",
    leftPage: {
      titleEn: "Walking Into Loving Arms",
      verseEn: "One wobble left, one wobble right, you took a step ahead,\nAnd into open, loving arms you flew without a dread!\nYour very first courageous steps! A milestone so profound,\nWith tears of happiness and joy from everyone around!",
    },
    rightPage: {
      titleAr: "خُطُوَاتٌ نَحْوَ الأَحْضَانِ المَفْتُوحَةِ",
      verseAr: "خُطْوَةٌ أُولَى إِلَى الأَمَامِ، ثُمَّ خُطْوَةٌ ثَانِيَةٌ ثَابِتَةُ البُنْيَانِ،\nنَحْوَ أَحْضَانِنَا المَفْتُوحَةِ بِعَيْنٍ تَفِيضُ بِالأَمَانِ!\nمَشَى {childName} وَصَفَّقَتِ الدُّنْيَا لِهَذَا الانْتِصَارِ،\nفَيَا لَهَا مِنْ فَرْحَةٍ كَبِيرَةٍ سَتَبْقَى فَخْرَ هَذِهِ الدِّيَارِ!\nتَمَّتْ بِحَمْدِ اللهِ",
      verseArGirl: "خُطْوَةٌ أُولَى إِلَى الأَمَامِ، ثُمَّ خُطْوَةٌ ثَانِيَةٌ ثَابِتَةُ البُنْيَانِ،\nنَحْوَ أَحْضَانِنَا المَفْتُوحَةِ بِعَيْنٍ تَفِيضُ بِالأَمَانِ!\nمَشَتْ {childName} وَصَفَّقَتِ الدُّنْيَا لِهَذَا الانْتِصَارِ،\nفَيَا لَهَا مِنْ فَرْحَةٍ كَبِيرَةٍ سَتَبْقَى فَخْرَ هَذِهِ الدِّيَارِ!\nتَمَّتْ بِحَمْدِ اللهِ",
    },
    characterPose: "walking-first-steps",
  },
];

// =========================================================================
// EXPANSION BOOK 3: SUPER SIBLING ADVENTURE: THE DYNAMIC DUO (12 SPREADS)
// Slug: super-sibling-adventure-dynamic-duo | ID: super-sibling-adventure
// =========================================================================
export const SUPER_SIBLING_SPREADS: StorySpread[] = [
  {
    id: 0,
    spreadNumber: 0,
    spreadTitleEn: "Front Cover Keepsake",
    spreadTitleAr: "الغلاف التذكاري الأمامي",
    sceneTheme: "superhero-cover",
    bgImage: "/books/super-sibling-adventure-cover.jpg",
    leftPage: {
      titleEn: "{childName}'s Super Sibling Adventure: The Dynamic Duo",
      verseEn: "An Action-Packed Heroic Tale of Teamwork, Sharing & Fun\nCrafted with Love in the United Arab Emirates",
      noteEn: "Personalized with love by: {gifterName}\nPersonalizedTales.com • United Arab Emirates",
    },
    rightPage: {
      titleAr: "مَغَامَرَةُ الأَبْطَالِ الخَارِقِينَ: {childName} وَالإِخْوَةُ الرَّائِعُونَ",
      verseAr: "قِصَّةٌ بُطُولِيَّةٌ مُلْهِمَةٌ عَنِ التَّعَاوُنِ وَالمَحَبَّةِ الأَخَوِيَّةِ\nصُنِعَ بِكُلِّ حُبٍّ فِي دَوْلَةِ الإِمَارَاتِ العَرَبِيَّةِ المُتَّحِدَةِ",
      noteAr: "إِهْدَاءٌ مَفْعُومٌ بِالحُبِّ مِنْ: {gifterName}\nحِكَايَاتٌ مُخَصَّصَةٌ • دَوْلَةُ الإِمَارَاتِ العَرَبِيَّةِ المُتَّحِدَةِ",
    },
    characterPose: "superhero-landing",
  },
  {
    id: 1,
    spreadNumber: 1,
    spreadTitleEn: "Secret Superhero Agent Dedication",
    spreadTitleAr: "صفحة الإهداء وميثاق الأبطال",
    sceneTheme: "parchment-superhero",
    bgImage: "/images/book_craftsmanship.jpg",
    leftPage: {
      titleEn: "Secret Superhero Agent Dedication",
      verseEn: "{dedicationText}",
      noteEn: "Archival 200gsm Mohawk Silk Paper • Superhero Keepsake Edition • UAE",
    },
    rightPage: {
      titleAr: "رِسَالَةٌ سِرِّيَّةٌ لِلأَبْطَالِ الخَارِقِينَ",
      verseAr: "«إِلَى أَبْطَالِنَا الشُّجْعَانِ {childName}،\n\nإِنَّ أَعْظَمَ قُوَّةٍ خَارِقَةٍ فِي هَذَا العَالَمِ هِيَ قُوَّةُ الأُخُوَّةِ وَالتَّعَاوُنِ. حِينَ تَكُونُونَ مَعاً، لَيْسَ هُنَاكَ أَمْرٌ مُسْتَحِيلٌ. دَافِعُوا عَنِ الخَيْرِ وَانْشُرُوا الفَرَحَ دَوْماً.\n\nمَعَ كُلِّ مَحَبَّتِنَا،\n{gifterName}»",
      verseArGirl: "«إِلَى بَطَلاَتِنَا الشُّجَاعَاتِ {childName}،\n\nإِنَّ أَعْظَمَ قُوَّةٍ خَارِقَةٍ فِي هَذَا العَالَمِ هِيَ قُوَّةُ الأُخُوَّةِ وَالتَّعَاوُنِ. حِينَ تَكُونُونَ مَعاً، لَيْسَ هُنَاكَ أَمْرٌ مُسْتَحِيلٌ. دَافِعُوا عَنِ الخَيْرِ وَانْشُرُوا الفَرَحَ دَوْماً.\n\nمَعَ كُلِّ مَحَبَّتِنَا،\n{gifterName}»",
      noteAr: "طُبِعَ خِصِّيصاً كَذِكْرَى خَالِدَةٍ • نُسْخَةُ إِهْدَاءٍ بُطُولِيَّةٍ",
    },
    characterPose: "holding-hero-mask",
  },
  {
    id: 2,
    spreadNumber: 2,
    spreadTitleEn: "The Secret Treehouse Base",
    spreadTitleAr: "المَقَرُّ السِّرِّيُّ فَوْقَ الشَّجَرَةِ",
    sceneTheme: "treehouse-hq",
    bgImage: "/images/category_for_kids.jpg",
    leftPage: {
      titleEn: "Chapter One: Mission Headquarters",
      verseEn: "High in the branches of the yard, the wooden fortress stands,\nThe secret superhero base that guards the neighborhood lands!\n{childName} gathered supplies and rolled the blueprints out,\n“Our superhero mission starts! Let's show what we're about!”",
    },
    rightPage: {
      titleAr: "الفَصْلُ الأَوَّلُ: مَقَرُّ التَّخْطِيطِ السِّرِّيُّ",
      verseAr: "فَوْقَ أَغْصَانِ الحَدِيقَةِ ارْتَفَعَ الحِصْنُ الخَشَبِيُّ المَنِيعُ الشَّامِخُ،\nمَقَرُّ الأَبْطَالِ الصِّغَارِ حَيْثُ التَّخْطِيطُ البَدِيعُ الرَّاسِخُ!\nجَمَعَ {childName} الخَرَائِطَ وَالأَلْعَابَ لِبَدْءِ المَهَمَّةِ الكُبْرَى،\n«مَعاً سَنَحْمِي الحَيَّ وَنَنْشُرُ الخَيْرَ فِي كُلِّ مَسْرَى!»",
      verseArGirl: "فَوْقَ أَغْصَانِ الحَدِيقَةِ ارْتَفَعَ الحِصْنُ الخَشَبِيُّ المَنِيعُ الشَّامِخُ،\nمَقَرُّ الأَبْطَالِ الصِّغَارِ حَيْثُ التَّخْطِيطُ البَدِيعُ الرَّاسِخُ!\nجَمَعَتْ {childName} الخَرَائِطَ وَالأَلْعَابَ لِبَدْءِ المَهَمَّةِ الكُبْرَى،\n«مَعاً سَنَحْمِي الحَيَّ وَنَنْشُرُ الخَيْرَ فِي كُلِّ مَسْرَى!»",
    },
    characterPose: "pointing-at-map",
  },
  {
    id: 3,
    spreadNumber: 3,
    spreadTitleEn: "Crafting Blanket Capes",
    spreadTitleAr: "أَرْدِيَةُ البُطُولَةِ السِّرِّيَّةُ",
    sceneTheme: "cape-making",
    bgImage: "/final_book_mockup_1788701924626.jpg",
    leftPage: {
      titleEn: "Suited for Adventure",
      verseEn: "Two velvet blankets pinned with clips, bright masks across their eyes,\nTransforming everyday clothes into a super-hero guise!\nWith capes that fluttered in the breeze like banners in the air,\nA dynamic heroic duo ready anywhere!",
    },
    rightPage: {
      titleAr: "أَرْدِيَةُ الشَّجَاعَةِ وَالأَقْنِعَةُ البَرَّاقَةُ",
      verseAr: "رَبَطَ الأَبْطَالُ أَرْدِيَةَ الشَّجَاعَةِ مِنْ أَغْطِيَةِ الصُّوفِ النَّاعِمِ،\nوَوَضَعُوا الأَقْنِعَةَ البَرَّاقَةَ لِمُوَاجَهَةِ كُلِّ حَالِمٍ!\nتُرَفْرِفُ الأَرْدِيَةُ خَلْفَهُمْ كَأَجْنِحَةِ النُّسُورِ فِي الهَوَاءِ،\nمُسْتَعِدِّينَ لِمُغَامَرَةٍ تَمْلأُ القُلُوبَ بِالصَّفَاءِ وَالبَهَاءِ!",
      verseArGirl: "رَبَطَتِ البَطَلاَتُ أَرْدِيَةَ الشَّجَاعَةِ مِنْ أَغْطِيَةِ الصُّوفِ النَّاعِمِ،\nوَوَضَعْنَ الأَقْنِعَةَ البَرَّاقَةَ لِمُوَاجَهَةِ كُلِّ حَالِمٍ!\nتُرَفْرِفُ الأَرْدِيَةُ خَلْفَهُنَّ كَأَجْنِحَةِ النُّسُورِ فِي الهَوَاءِ،\nمُسْتَعِدَّاتٍ لِمُغَامَرَةٍ تَمْلأُ القُلُوبَ بِالصَّفَاءِ وَالبَهَاءِ!",
    },
    characterPose: "cape-flying",
  },
  {
    id: 4,
    spreadNumber: 4,
    spreadTitleEn: "The Great Living Room Lava Mission",
    spreadTitleAr: "مَهَمَّةُ بُرْكَانِ غُرْفَةِ المَعِيشَةِ",
    sceneTheme: "floor-is-lava",
    bgImage: "/images/category_for_family.jpg",
    leftPage: {
      titleEn: "Floor is Molten Lava!",
      verseEn: "“Watch out below!” the leader cried, “The carpet turned to flame!”\nThe famous living room lava quest, their favorite jumping game!\nFrom armchair cushion to the stool, they leapt across the floor,\nCatching each other hand in hand right by the hallway door!",
    },
    rightPage: {
      titleAr: "قَفَزَاتُ الأَبْطَالِ فَوْقَ الوَسَائِدِ",
      verseAr: "«احْذَرُوا الأَرْضِيَّةَ!» هَتَفَ البَطَلُ، «لَقَدْ صَارَتْ حِمَماً وَلَهِيباً دَفَّاقاً!»\nفَقَفَزَ الإِخْوَةُ فَوْقَ الوَسَائِدِ مَشْهَداً عَجِيباً بَرَّاقاً!\nمِنَ المَقْعَدِ إِلَى الطَّاوِلَةِ تَشَابَكَتِ الأَيْدِي بِثَبَاتٍ مَتِينٍ،\nيُنْقِذُ أَحَدُهُمَا الآخَرَ مِنَ العَثَرَاتِ فِي كُلِّ حِينٍ!",
      verseArGirl: "«احْذَرُوا الأَرْضِيَّةَ!» هَتَفَتِ البَطَلَةُ، «لَقَدْ صَارَتْ حِمَماً وَلَهِيباً دَفَّاقاً!»\nفَقَفَزَتِ الأَخَوَاتُ فَوْقَ الوَسَائِدِ مَشْهَداً عَجِيباً بَرَّاقاً!\nمِنَ المَقْعَدِ إِلَى الطَّاوِلَةِ تَشَابَكَتِ الأَيْدِي بِثَبَاتٍ مَتِينٍ،\nتُنْقِذُ إِحْدَاهُمَا الأُخْرَى مِنَ العَثَرَاتِ فِي كُلِّ حِينٍ!",
    },
    characterPose: "jumping-cushions",
  },
  {
    id: 5,
    spreadNumber: 5,
    spreadTitleEn: "The Case of the Missing Bear",
    spreadTitleAr: "لُغْزُ الدُّبِّ المَفْقُودِ",
    sceneTheme: "detective-clues",
    bgImage: "/final_book_mockup_1788701924626.jpg",
    leftPage: {
      titleEn: "Super Detective Skills",
      verseEn: "A mystery called for clever minds: the favorite bear was gone!\nTogether they examined tracks that led across the lawn.\nWith magnifying glass in hand and teamwork on their side,\nThey found him resting near the porch where sunny shadows hide!",
    },
    rightPage: {
      titleAr: "البَحْثُ وَالتَّحَرِّي بِذَكَاءِ الأَبْطَالِ",
      verseAr: "طَلَبَتِ المَهَمَّةُ ذَكَاءً خَاصّاً: الدُّبُّ المَحْبُوبُ قَدْ ضَاعَ خَبَرُهُ،\nفَتَبِعَ الأَبْطَالُ الآثَارَ بِعَزِيمَةٍ حَتَّى انْكَشَفَ سِرُّهُ!\nبِالمُكَبِّرِ السِّرِّيِّ وَالتَّعَاوُنِ الَّذِي لاَ يَلِينُ وَلاَ يَحِيدُ،\nوَجَدُوا الدُّبَّ يَبْتَسِمُ قُرْبَ أَشْجَارِ الوَرْدِ كَعِيدٍ جَدِيدٍ!",
      verseArGirl: "طَلَبَتِ المَهَمَّةُ ذَكَاءً خَاصّاً: الدُّبُّ المَحْبُوبُ قَدْ ضَاعَ خَبَرُهُ،\nفَتَبِعَتِ البَطَلاَتُ الآثَارَ بِعَزِيمَةٍ حَتَّى انْكَشَفَ سِرُّهُ!\nبِالمُكَبِّرِ السِّرِّيِّ وَالتَّعَاوُنِ الَّذِي لاَ يَلِينُ وَلاَ يَحِيدُ،\nوَجَدْنَ الدُّبَّ يَبْتَسِمُ قُرْبَ أَشْجَارِ الوَرْدِ كَعِيدٍ جَدِيدٍ!",
    },
    characterPose: "holding-magnifying-glass",
  },
  {
    id: 6,
    spreadNumber: 6,
    spreadTitleEn: "Learning to Share the Secret Map",
    spreadTitleAr: "حِكْمَةُ التَّقَاسُمِ وَالمُشَارَكَةِ",
    sceneTheme: "sharing-lesson",
    bgImage: "/images/hero_reading_lifestyle.jpg",
    leftPage: {
      titleEn: "Two Minds Are Better Than One",
      verseEn: "At first they both pulled on the chart, each wanting their own way,\nUntil they remembered superheroes never fight at play!\nThey held the edges side by side, sharing the compass guide,\nAnd found the solution twice as fast when cooperating with pride!",
    },
    rightPage: {
      titleAr: "التَّعَاوُنُ سِرُّ الانْتِصَارِ",
      verseAr: "فِي البِدَايَةِ تَنَازَعَا الخَرِيطَةَ، كُلٌّ يُرِيدُ الانْفِرَادَ بِالقِيَادَةِ،\nثُمَّ تَذَكَّرَا أَنَّ الإِخْوَةَ أَهْلُ نُبْلٍ وَشَرَفٍ وَسِيَادَةٍ!\nأَمْسَكَا الخَرِيطَةَ مَعاً فَتَبَيَّنَتْ كُلُّ الطُّرُقِ فِي ضِيَاءِ الإِشْرَاقِ،\nوَعَرَفَا أَنَّ النَّجَاحَ يَكْمُنُ فِي الوَفَاقِ وَحُسْنِ الاتِّفَاقِ!",
      verseArGirl: "فِي البِدَايَةِ تَنَازَعَتَا الخَرِيطَةَ، كُلٌّ تُرِيدُ الانْفِرَادَ بِالقِيَادَةِ،\nثُمَّ تَذَكَّرَتَا أَنَّ الأَخَوَاتِ أَهْلُ نُبْلٍ وَشَرَفٍ وَسِيَادَةٍ!\nأَمْسَكَتَا الخَرِيطَةَ مَعاً فَتَبَيَّنَتْ كُلُّ الطُّرُقِ فِي ضِيَاءِ الإِشْرَاقِ،\nوَعَرَفَتَا أَنَّ النَّجَاحَ يَكْمُنُ فِي الوَفَاقِ وَحُسْنِ الاتِّفَاقِ!",
    },
    characterPose: "holding-map-together",
  },
  {
    id: 7,
    spreadNumber: 7,
    spreadTitleEn: "Combining Superpowers",
    spreadTitleAr: "اتِّحَادُ القُوَى الخَارِقَةِ",
    sceneTheme: "power-glow",
    bgImage: "/images/category_for_kids.jpg",
    leftPage: {
      titleEn: "Synchronized Strength",
      verseEn: "A glowing high-five in the air unlocked their greatest skill:\nWhen siblings team together, they have double the iron will!\nOne brought the speed, one brought the wit, unbeatable and grand,\nThe most impressive heroic duo in all the Emirates land!",
    },
    rightPage: {
      titleAr: "قُوَّةُ الأُخُوَّةِ الَّتِي لاَ تُقْهَرُ",
      verseAr: "تَصَافَحَتِ الأَيْدِي فِي الفَضَاءِ فَتَوَهَّجَتْ قُوَّةُ الإِخْلاَصِ العَظِيمِ،\nحِينَ يَتَّحِدُ الإِخْوَةُ يَصِيرُونَ أَعْظَمَ حِصْنٍ سَلِيمٍ!\nأَحَدُهُمَا سَرِيعٌ كَالرِّيحِ، وَالآخَرُ ذَكِيٌّ حَكِيمُ التَّدْبِيرِ،\nثُنَائِيٌّ بَطَلٌ يَمْلأُ الأَرْضَ بِالخَيْرِ وَالعَطَاءِ الوَفِيرِ!",
      verseArGirl: "تَصَافَحَتِ الأَيْدِي فِي الفَضَاءِ فَتَوَهَّجَتْ قُوَّةُ الإِخْلاَصِ العَظِيمِ،\nحِينَ تَتَّحِدُ الأَخَوَاتُ يَصِرْنَ أَعْظَمَ حِصْنٍ سَلِيمٍ!\nإِحْدَاهُمَا سَرِيعَةٌ كَالرِّيحِ، وَالأُخْرَى ذَكِيَّةٌ حَكِيمَةُ التَّدْبِيرِ،\nثُنَائِيٌّ بَطَلٌ يَمْلأُ الأَرْضَ بِالخَيْرِ وَالعَطَاءِ الوَفِيرِ!",
    },
    characterPose: "high-fiving",
  },
  {
    id: 8,
    spreadNumber: 8,
    spreadTitleEn: "The Garden Glider Rescue",
    spreadTitleAr: "إِنْقَاذُ الطَّائِرَةِ الوَرَقِيَّةِ",
    sceneTheme: "tree-rescue",
    bgImage: "/final_book_mockup_1788701924626.jpg",
    leftPage: {
      titleEn: "Reaching New Heights",
      verseEn: "A little toy glider got caught high upon a garden tree,\nToo high for one alone to reach, as high as high could be.\n{childName} gave a steady boost, lifted their sibling tall,\nAnd rescued safe the little plane without a slip or fall!",
    },
    rightPage: {
      titleAr: "بُطُولَةٌ تُنْقِذُ اللُّعْبَةَ مِنْ سَعَفِ النَّخِيلِ",
      verseAr: "عَلِقَتِ الطَّائِرَةُ الوَرَقِيَّةُ بَيْنَ سَعَفِ النَّخِيلِ البَاسِقِ العَالِي،\nلاَ يَصِلُ إِلَيْهَا وَاحِدٌ بِمُفْرَدِهِ فِي هَذَا المَجَالِ.\nرَفَعَ {childName} رَفِيقَهُ بِحِرْصٍ وَشَجَاعَةٍ وَعَزْمٍ مَشْهُودٍ،\nفَأَنْقَذَا اللُّعْبَةَ وَعَادَتِ البَهْجَةُ تَمْلأُ الوُجُودَ!",
      verseArGirl: "عَلِقَتِ الطَّائِرَةُ الوَرَقِيَّةُ بَيْنَ سَعَفِ النَّخِيلِ البَاسِقِ العَالِي،\nلاَ يَصِلُ إِلَيْهَا وَاحِدٌ بِمُفْرَدِهِ فِي هَذَا المَجَالِ.\nرَفَعَتْ {childName} رَفِيقَتَهَا بِحِرْصٍ وَشَجَاعَةٍ وَعَزْمٍ مَشْهُودٍ،\nفَأَنْقَذَتَا اللُّعْبَةَ وَعَادَتِ البَهْجَةُ تَمْلأُ الوُجُودَ!",
    },
    characterPose: "lifting-sibling-up",
  },
  {
    id: 9,
    spreadNumber: 9,
    spreadTitleEn: "The Great Blanket Fortress",
    spreadTitleAr: "قَلْعَةُ الوَسَائِدِ الحَصِينَةُ",
    sceneTheme: "blanket-fort",
    bgImage: "/images/category_for_family.jpg",
    leftPage: {
      titleEn: "The Safe Citadel",
      verseEn: "With chairs and sheets and heavy books, they built a mighty dome,\nA cozy superhero fort inside their loving home!\nLanterns glowed softly through the cloth, whispering stories bold,\nOf heroic quests and noble deeds far more precious than gold!",
    },
    rightPage: {
      titleAr: "حِصْنُ الأَبْطَالِ الدَّافِئُ",
      verseAr: "بِالمَقَاعِدِ وَالأَغْطِيَةِ شَيَّدَا قَلْعَةً مَنِيعَةً فِي سَاحَةِ الدَّارِ،\nحِصْناً لِلأَبْطَالِ يُشِعُّ بِالدِّفْءِ وَالمَحَبَّةِ وَالأَسْرَارِ!\nأَضَاءَتْ فِيهِ المَصَابِيحُ الصَّغِيرَةُ فَتَبَادَلاَ الحَدِيثَ بِافْتِخَارٍ،\nعَنْ بُطُولاَتِ اليَوْمِ وَأَجْمَلِ أَيَّامِ الانْتِصَارِ!",
      verseArGirl: "بِالمَقَاعِدِ وَالأَغْطِيَةِ شَيَّدَتَا قَلْعَةً مَنِيعَةً فِي سَاحَةِ الدَّارِ،\nحِصْناً لِلأَبْطَالِ يُشِعُّ بِالدِّفْءِ وَالمَحَبَّةِ وَالأَسْرَارِ!\nأَضَاءَتْ فِيهِ المَصَابِيحُ الصَّغِيرَةُ فَتَبَادَلَتَا الحَدِيثَ بِافْتِخَارٍ،\nعَنْ بُطُولاَتِ اليَوْمِ وَأَجْمَلِ أَيَّامِ الانْتِصَارِ!",
    },
    characterPose: "inside-fort",
  },
  {
    id: 10,
    spreadNumber: 10,
    spreadTitleEn: "The Superhero Victory Treat",
    spreadTitleAr: "وَلِيمَةُ النَّصْرِ مَعَ الأَهْلِ",
    sceneTheme: "victory-snack",
    bgImage: "/images/gift_box_packaging.jpg",
    leftPage: {
      titleEn: "Mission Accomplished!",
      verseEn: "Mission accomplished! Heroes cheered as mama called them in,\nFor fresh sweet dates and fruit juices, wearing a triumphant grin.\nParents hugged their dynamic pair with proud and beaming eyes:\n“True heroes share and care for all beneath the sunny skies!”",
    },
    rightPage: {
      titleAr: "مُكَافَأَةُ الأَبْطَالِ بَيْنَ الأَحْبَابِ",
      verseAr: "انْتَهَتِ المَهَمَّةُ بِنَجَاحٍ! فَجَاءَ نِدَاءُ الوَالِدَيْنِ الحَبِيبَيْنِ الكَرِيمَيْنِ،\nبِعَصِيرٍ طَازَجٍ وَتَمْرٍ لَذِيذٍ يُبْهِجُ القَلْبَيْنِ.\nضَمَّتْهُمَا العَائِلَةُ بِفَخْرٍ وَقَالَتْ بِكُلِّ صِدْقٍ وَحَنَانٍ مَصُونٍ:\n«الأَبْطَالُ الحَقِيقِيُّونَ هُمْ مَنْ يَنْشُرُونَ الخَيْرَ فِي هَذَا الكَوْنِ!»",
      verseArGirl: "انْتَهَتِ المَهَمَّةُ بِنَجَاحٍ! فَجَاءَ نِدَاءُ الوَالِدَيْنِ الحَبِيبَيْنِ الكَرِيمَيْنِ،\nبِعَصِيرٍ طَازَجٍ وَتَمْرٍ لَذِيذٍ يُبْهِجُ القَلْبَيْنِ.\nضَمَّتْهُمَا العَائِلَةُ بِفَخْرٍ وَقَالَتْ بِكُلِّ صِدْقٍ وَحَنَانٍ مَصُونٍ:\n«الأَبْطَالُ الحَقِيقِيُّونَ هُمْ مَنْ يَنْشُرُونَ الخَيْرَ فِي هَذَا الكَوْنِ!»",
    },
    characterPose: "celebrating-treat",
  },
  {
    id: 11,
    spreadNumber: 11,
    spreadTitleEn: "Partners Forever, Hand in Hand",
    spreadTitleAr: "أَبْطَالٌ إِلَى الأَبَدِ، يَداً بِيَدٍ",
    sceneTheme: "heroic-finale",
    bgImage: "/images/book_craftsmanship.jpg",
    leftPage: {
      titleEn: "Lifelong Best Friends",
      verseEn: "They folded up the superhero capes beside the cozy bed,\nWith happy memories of the day revolving in their head.\nTwo little heroes hand in hand, through sunshine and through rain,\nA team of loyalty and love that always will remain!",
    },
    rightPage: {
      titleAr: "العَهْدُ الأَخَوِيُّ الدَّائِمُ",
      verseAr: "طَوَى الأَبْطَالُ أَرْدِيَةَ البُطُولَةِ بِهُدُوءٍ وَاطْمِئْنَانٍ وَسَكِينَةٍ،\nيَسْتَعِدُّونَ لِأَحْلاَمٍ بَرِيئَةٍ تَفِيضُ بِالرِّقَّةِ المَكِينَةِ.\n{childName} وَرَفِيقُهُ يَداً بِيَدٍ عَلَى مَدَى الزَّمَانِ الأَمِينِ،\nأَعْظَمُ سَنَدٍ، وَأَوْفَى رَفِيقٍ فِي دَرْبِ الحَيَاةِ المُبِينِ!\nتَمَّتْ بِحَمْدِ اللهِ",
      verseArGirl: "طَوَتِ البَطَلاَتُ أَرْدِيَةَ البُطُولَةِ بِهُدُوءٍ وَاطْمِئْنَانٍ وَسَكِينَةٍ،\nيَسْتَعِدُّونَ لِأَحْلاَمٍ بَرِيئَةٍ تَفِيضُ بِالرِّقَّةِ المَكِينَةِ.\n{childName} وَرَفِيقَتُهَا يَداً بِيَدٍ عَلَى مَدَى الزَّمَانِ الأَمِينِ،\nأَعْظَمُ سَنَدٍ، وَأَوْفَى رَفِيقٍ فِي دَرْبِ الحَيَاةِ المُبِينِ!\nتَمَّتْ بِحَمْدِ اللهِ",
    },
    characterPose: "superhero-standing-proud",
  },
];

// =========================================================================
// EXPANSION BOOK 4: THE BRAVE EXPLORER & THE HIDDEN ARABIAN OASIS (12 SPREADS)
// Slug: the-brave-explorer-hidden-oasis | ID: brave-explorer-oasis
// Focus: Arabian Oryx (المها العربي), Desert Gazelle (غزال الريم), Desert Hare (الأرنب البري).
// =========================================================================
export const BRAVE_EXPLORER_SPREADS: StorySpread[] = [
  {
    id: 0,
    spreadNumber: 0,
    spreadTitleEn: "Front Cover Keepsake",
    spreadTitleAr: "الغلاف التذكاري الأمامي",
    sceneTheme: "desert-oasis-cover",
    bgImage: "/books/brave-explorer-oasis-cover.jpg",
    leftPage: {
      titleEn: "{childName} & The Hidden Arabian Oasis",
      verseEn: "An Inspiring Desert Wildlife Expedition Across Liwa Dunes\nCrafted with Love in the United Arab Emirates",
      noteEn: "Personalized with love by: {gifterName}\nPersonalizedTales.com • United Arab Emirates",
    },
    rightPage: {
      titleAr: "{childName} وَالوَاحَةُ العَرَبِيَّةُ السَّاحِرَةُ",
      verseAr: "رِحْلَةٌ اسْتِكْشَافِيَّةٌ شَيِّقَةٌ فِي أَعْمَاقِ صَحْرَاءِ لِيوَا الذَّهَبِيَّةِ\nصُنِعَ بِكُلِّ حُبٍّ فِي دَوْلَةِ الإِمَارَاتِ العَرَبِيَّةِ المُتَّحِدَةِ",
      noteAr: "إِهْدَاءٌ مَفْعُومٌ بِالحُبِّ مِنْ: {gifterName}\nحِكَايَاتٌ مُخَصَّصَةٌ • دَوْلَةُ الإِمَارَاتِ العَرَبِيَّةِ المُتَّحِدَةِ",
    },
    characterPose: "explorer-standing-proud",
  },
  {
    id: 1,
    spreadNumber: 1,
    spreadTitleEn: "Explorer's Field Journal Dedication",
    spreadTitleAr: "صفحة الإهداء وميثاق حارس الطبيعة",
    sceneTheme: "parchment-explorer",
    bgImage: "/images/book_craftsmanship.jpg",
    leftPage: {
      titleEn: "Explorer's Field Journal Dedication",
      verseEn: "{dedicationText}",
      noteEn: "Archival 200gsm Mohawk Silk Paper • Wildlife Heritage Edition • UAE",
    },
    rightPage: {
      titleAr: "صَفْحَةُ مِيثَاقِ المُسْتَكْشِفِ الشُّجَاعِ",
      verseAr: "«إِلَى مُسْتَكْشِفِنَا المِقْدَامِ {childName}،\n\nتَعَلَّمْ مِنْ رِمَالِ لِيوَا الذَّهَبِيَّةِ الشُّمُوخَ، وَمِنْ شَجَرِ الغَافِ الصَّبْرَ، وَمِنْ وُحُوشِ الصَّحْرَاءِ الرِّفْقَ. كُنْ حَارِساً أَمِيناً لِلطَّبِيعَةِ وَانْشُرِ الخَيْرَ حَيْثُمَا حَلَلْتَ.\n\nمَعَ كُلِّ مَحَبَّتِنَا،\n{gifterName}»",
      verseArGirl: "«إِلَى مُسْتَكْشِفَتِنَا المِقْدَامَةِ {childName}،\n\nتَعَلَّمِي مِنْ رِمَالِ لِيوَا الذَّهَبِيَّةِ الشُّمُوخَ، وَمِنْ شَجَرِ الغَافِ الصَّبْرَ، وَمِنْ وُحُوشِ الصَّحْرَاءِ الرِّفْقَ. كُونِي حَارِسَةً أَمِينَةً لِلطَّبِيعَةِ وَانْشُرِي الخَيْرَ حَيْثُمَا حَلَلْتِ.\n\nمَعَ كُلِّ مَحَبَّتِنَا،\n{gifterName}»",
      noteAr: "طُبِعَ خِصِّيصاً كَذِكْرَى خَالِدَةٍ • نُسْخَةُ اسْتِكْشَافٍ بَرِّيَّةٍ",
    },
    characterPose: "reading-field-journal",
  },
  {
    id: 2,
    spreadNumber: 2,
    spreadTitleEn: "Setting Out Across Liwa Dunes",
    spreadTitleAr: "الانْطِلاَقُ عَبْرَ كُثْبَانِ لِيوَا الحَمْرَاءِ",
    sceneTheme: "liwa-departure",
    bgImage: "/books/starlit-dunes/spreads/spread_0_cover.jpg",
    leftPage: {
      titleEn: "Chapter One: The Golden Ridges",
      verseEn: "With field-book in backpack and compass held firm in hand,\nYoung {childName} ventured out across the rolling Liwa sand.\nThe amber dunes rose tall and proud beneath the morning sun,\nA wildlife conservation quest had bravely just begun!",
    },
    rightPage: {
      titleAr: "الفَصْلُ الأَوَّلُ: مَهَابَةُ الرِّمَالِ الذَّهَبِيَّةِ",
      verseAr: "شَدَّ {childName} حَقِيبَةَ الاسْتِكْشَافِ بَيْنَ كُثْبَانِ لِيوَا العَالِيَةِ الشَّامِخَةِ،\nوَعَيْنَاهُ تَتَطَلَّعَانِ إِلَى الرِّمَالِ الذَّهَبِيَّةِ الصَّافِيَةِ البَاذِخَةِ.\nتَرْتَفِعُ التِّلاَلُ الحَمْرَاءُ تَحْتَ ضَوْءِ الصَّبَاحِ المُنِيرِ الكَبِيرِ،\nتُعْلِنُ بَدْءَ رِحْلَةِ حِمَايَةِ الحَيَاةِ البَرِّيَّةِ بِعَزْمٍ جَدِيرٍ!",
      verseArGirl: "شَدَّتْ {childName} حَقِيبَةَ الاسْتِكْشَافِ بَيْنَ كُثْبَانِ لِيوَا العَالِيَةِ الشَّامِخَةِ،\nوَعَيْنَاهَا تَتَطَلَّعَانِ إِلَى الرِّمَالِ الذَّهَبِيَّةِ الصَّافِيَةِ البَاذِخَةِ.\nتَرْتَفِعُ التِّلاَلُ الحَمْرَاءُ تَحْتَ ضَوْءِ الصَّبَاحِ المُنِيرِ الكَبِيرِ،\nتُعْلِنُ بَدْءَ رِحْلَةِ حِمَايَةِ الحَيَاةِ البَرِّيَّةِ بِعَزْمٍ جَدِيرٍ!",
    },
    characterPose: "walking-dunes",
  },
  {
    id: 3,
    spreadNumber: 3,
    spreadTitleEn: "Reading Tracks with Desert Hare",
    spreadTitleAr: "قِرَاءَةُ الآثَارِ مَعَ الأَرْنَبِ البَرِّيِّ",
    sceneTheme: "animal-tracks",
    bgImage: "/final_book_mockup_1788701924626.jpg",
    leftPage: {
      titleEn: "Footprints in the Sand",
      verseEn: "Two tiny footprints in the dust, a desert hare hopped near,\nIts long ears twitching in the breeze, without a trace of fear.\nIt showed where gentle creatures walk across the desert floor,\nLeading our young explorer on to wonders more and more!",
    },
    rightPage: {
      titleAr: "آثَارٌ نَدِيَّةٌ فَوْقَ رِمَالِ الوَطَنِ",
      verseAr: "لاَحَتْ آثَارُ أَقْدَامٍ صَغِيرَةٍ فَوْقَ رِمَالِ الصَّحْرَاءِ النَّدِيَّةِ المَمْدُودَةِ،\nفَأَطَلَّ أَرْنَبٌ بَرِّيٌّ يُحَيِّي بِأُذُنَيْهِ الرَّشِيقَةِ المَعْهُودَةِ.\nدَلَّ البَطَلَ عَلَى مَسَارَاتِ الحَيَوَانَاتِ بَيْنَ الصُّخُورِ وَالرِّيَاضِ،\nيَقُودُ خُطَاهُ الشُّجَاعَةَ بَيْنَ الرِّمَالِ الحُمْرِ وَالفَيَاضِ!",
      verseArGirl: "لاَحَتْ آثَارُ أَقْدَامٍ صَغِيرَةٍ فَوْقَ رِمَالِ الصَّحْرَاءِ النَّدِيَّةِ المَمْدُودَةِ،\nفَأَطَلَّ أَرْنَبٌ بَرِّيٌّ يُحَيِّي بِأُذُنَيْهِ الرَّشِيقَةِ المَعْهُودَةِ.\nدَلَّ البَطَلَةَ عَلَى مَسَارَاتِ الحَيَوَانَاتِ بَيْنَ الصُّخُورِ وَالرِّيَاضِ،\nيَقُودُ خُطَاهَا الشُّجَاعَةَ بَيْنَ الرِّمَالِ الحُمْرِ وَالفَيَاضِ!",
    },
    characterPose: "examining-tracks",
  },
  {
    id: 4,
    spreadNumber: 4,
    spreadTitleEn: "The Enduring Ghaf Tree Sanctuary",
    spreadTitleAr: "شَجَرَةُ الغَافِ الصَّامِدَةُ العَتِيقَةُ",
    sceneTheme: "ghaf-shelter",
    bgImage: "/final_book_mockup_1788701924626.jpg",
    leftPage: {
      titleEn: "The Tree of Endurance",
      verseEn: "Beneath the spreading canopy of one great ancient Ghaf,\nThe travelers paused to rest their feet and share a happy laugh.\nIts deep roots drink from hidden springs through seasons hot and dry,\nA national symbol of endurance reaching toward the sky!",
    },
    rightPage: {
      titleAr: "ظِلاَلُ الشَّجَرَةِ الوَطَنِيَّةِ الخَالِدَةِ",
      verseAr: "تَحْتَ ظِلاَلِ شَجَرَةِ الغَافِ المُبَارَكَةِ الوَرِيقَةِ الخَضْرَاءِ،\nاسْتَرَاحَ {childName} يَسْتَمِعُ لِحِكْمَتِهَا فِي هَذِهِ الصَّحْرَاءِ.\nجُذُورُهَا تَصِلُ الأَعْمَاقَ لِتَجْلِبَ المَاءَ النَّمِيرَ العَذْبَ،\nرَمْزُ الصُّمُودِ الإِمَارَاتِيِّ الَّذِي يَسْكُنُ القَلْبَ!",
      verseArGirl: "تَحْتَ ظِلاَلِ شَجَرَةِ الغَافِ المُبَارَكَةِ الوَرِيقَةِ الخَضْرَاءِ،\nاسْتَرَاحَتْ {childName} تَسْتَمِعُ لِحِكْمَتِهَا فِي هَذِهِ الصَّحْرَاءِ.\nجُذُورُهَا تَصِلُ الأَعْمَاقَ لِتَجْلِبَ المَاءَ النَّمِيرَ العَذْبَ،\nرَمْزُ الصُّمُودِ الإِمَارَاتِيِّ الَّذِي يَسْكُنُ القَلْبَ!",
    },
    characterPose: "resting-under-ghaf",
  },
  {
    id: 5,
    spreadNumber: 5,
    spreadTitleEn: "The Graceful Reem Gazelle",
    spreadTitleAr: "غَزَالُ الرِّيمِ الرَّشِيقُ الجَمِيلُ",
    sceneTheme: "gazelle-meeting",
    bgImage: "/books/starlit-dunes/spreads/spread_5_oasis.jpg",
    leftPage: {
      titleEn: "A Wild Desert Companion",
      verseEn: "A graceful Reem gazelle appeared with eyes like polished jet,\nThe gentlest wild desert friend that one could ever have met.\nIt bowed its slender horns in trust, acknowledging the guide,\nWalking alongside {childName} in harmony and pride.",
    },
    rightPage: {
      titleAr: "رِفْقَةُ الأَمَانِ مَعَ ظِبَاءِ الرِّيمِ",
      verseAr: "أَقْبَلَ غَزَالُ الرِّيمِ يَمْشِي بِخُطَى الرَّشَاقَةِ وَالأَمَانِ التَّامِّ،\nبِعَيْنَيْنِ كَحِيلَتَيْنِ كَأَجْمَلِ مَا رَأَى فِي هَذِهِ الأَيَّامِ.\nحَيَّا البَطَلَ الصَّغِيرَ بِثِقَةٍ وَوَدَادٍ مُبِينٍ صَافٍ،\nيَسِيرُ إِلَى جَانِبِهِ بَيْنَ الشُّجَيْرَاتِ دُونَ مَخَافٍ!",
      verseArGirl: "أَقْبَلَ غَزَالُ الرِّيمِ يَمْشِي بِخُطَى الرَّشَاقَةِ وَالأَمَانِ التَّامِّ،\nبِعَيْنَيْنِ كَحِيلَتَيْنِ كَأَجْمَلِ مَا رَأَتْ فِي هَذِهِ الأَيَّامِ.\nحَيَّا البَطَلَةَ الصَّغِيرَةَ بِثِقَةٍ وَوَدَادٍ مُبِينٍ صَافٍ،\nيَسِيرُ إِلَى جَانِبِهَا بَيْنَ الشُّجَيْرَاتِ دُونَ مَخَافٍ!",
    },
    characterPose: "petting-gazelle",
  },
  {
    id: 6,
    spreadNumber: 6,
    spreadTitleEn: "The Lost Baby Arabian Oryx",
    spreadTitleAr: "مُهْرَةُ المَهَا العَرَبِيِّ الصَّغِيرَةُ",
    sceneTheme: "oryx-rescue",
    bgImage: "/final_book_mockup_1788701924626.jpg",
    leftPage: {
      titleEn: "A Vulnerable White Calf",
      verseEn: "Beside a sun-bleached dune crest, a baby oryx cried,\nIts pure white coat and slender horns with no herd by its side.\n{childName} knelt down gently, poured water from the flask,\n“I'll bring you home to safety now, my most important task!”",
    },
    rightPage: {
      titleAr: "نَجْدَةُ وَحِيدِ المَهَا فِي الرِّمَالِ",
      verseAr: "خَلْفَ كَثِيبٍ شَامِخٍ انْفَرَدَ صَغِيرُ المَهَا العَرَبِيِّ النَّاصِعِ البَيَاضِ،\nيَبْحَثُ عَنْ أُمِّهِ بَيْنَ المَسَارَاتِ وَيَرْتَكِضُ فِي الفَيَاضِ.\nاقْتَرَبَ {childName} بِرِفْقٍ وَسَقَاهُ مَاءً زُلاَلاً بَارِداً عَذْباً،\n«سَأُعِيدُكَ إِلَى قَطِيعِكَ آمِناً لِتَجِدَ فَرَحاً وَقُرْباً!»",
      verseArGirl: "خَلْفَ كَثِيبٍ شَامِخٍ انْفَرَدَ صَغِيرُ المَهَا العَرَبِيِّ النَّاصِعِ البَيَاضِ،\nيَبْحَثُ عَنْ أُمِّهِ بَيْنَ المَسَارَاتِ وَيَرْتَكِضُ فِي الفَيَاضِ.\nاقْتَرَبَتْ {childName} بِرِفْقٍ وَسَقَتْهُ مَاءً زُلاَلاً بَارِداً عَذْباً،\n«سَأُعِيدُكَ إِلَى قَطِيعِكَ آمِناً لِتَجِدَ فَرَحاً وَقُرْباً!»",
    },
    characterPose: "giving-water-to-oryx",
  },
  {
    id: 7,
    spreadNumber: 7,
    spreadTitleEn: "Following the Date Palm Breeze",
    spreadTitleAr: "نَسَائِمُ وَاحَةِ النَّخِيلِ العَذْبَةُ",
    sceneTheme: "palm-breeze",
    bgImage: "/books/starlit-dunes/spreads/spread_5_oasis.jpg",
    leftPage: {
      titleEn: "The Scent of Fresh Water",
      verseEn: "The breeze brought forth the scent of mint and date palms growing near,\nA cool, refreshing desert wind that made the pathway clear.\nStep by step together, the child and oryx strode,\nFollowing the water trails along the sandy road.",
    },
    rightPage: {
      titleAr: "رَائِحَةُ المَاءِ وَالنَّعْنَاعِ البَرِّيِّ",
      verseAr: "هَبَّتْ نَسِيمٌ عَذْبٌ يَحْمِلُ عِطْرَ النَّخِيلِ وَالنَّعْنَاعِ الزَّكِيِّ،\nيَدُلُّ الرَّحَّالَةَ الشُّجَاعَ عَلَى مَسَارِ المَاءِ النَّقِيِّ.\nتَقَدَّمَ {childName} مَعَ صَغِيرِ المَهَا خُطْوَةً بِخُطْوَةٍ فِي أَمَانٍ،\nيَتْبَعَانِ خَرِيرَ الجَدَاوِلِ المُنْسَابَةِ فِي هَذَا الزَّمَانِ!",
      verseArGirl: "هَبَّتْ نَسِيمٌ عَذْبٌ يَحْمِلُ عِطْرَ النَّخِيلِ وَالنَّعْنَاعِ الزَّكِيِّ،\nيَدُلُّ الرَّحَّالَةَ الشُّجَاعَةَ عَلَى مَسَارِ المَاءِ النَّقِيِّ.\nتَقَدَّمَتْ {childName} مَعَ صَغِيرِ المَهَا خُطْوَةً بِخُطْوَةٍ فِي أَمَانٍ،\nيَتْبَعَانِ خَرِيرَ الجَدَاوِلِ المُنْسَابَةِ فِي هَذَا الزَّمَانِ!",
    },
    characterPose: "walking-with-oryx",
  },
  {
    id: 8,
    spreadNumber: 8,
    spreadTitleEn: "The Hidden Emerald Oasis Sanctuary",
    spreadTitleAr: "اكْتِشَافُ الوَاحَةِ الزُّمُرُّدِيَّةِ السِّرِّيَّةِ",
    sceneTheme: "oasis-discovery",
    bgImage: "/books/starlit-dunes/spreads/spread_5_oasis.jpg",
    leftPage: {
      titleEn: "The Sanctuary Revealed",
      verseEn: "Between two giant crimson dunes, a secret wonder shone:\nAn emerald oasis pool, untouched, pristine, unknown!\nTall date palms arched above the spring, wild mint perfumed the air,\nA wildlife haven in the sands, preserved beyond compare!",
    },
    rightPage: {
      titleAr: "جَنَّةُ النَّخِيلِ بَيْنَ الكُثْبَانِ الحُمْرِ",
      verseAr: "بَيْنَ كَثِيبَيْنِ حُمْرَاوَيْنِ انْفَلَقَتْ وَاحَةٌ كَالزُّمُرُّدِ الأَخْضَرِ الفَتَّانِ،\nعَيْنُ مَاءٍ رَقْرَاقَةٌ تَفِيضُ بِالخَيْرِ فِي كُلِّ أَنٍ!\nنَخِيلٌ بَاسِقٌ يُظَلِّلُ الغُدْرَانَ وَالرِّيَاضَ السَّاحِرَةَ البَدِيعَةَ،\nمَلاَذٌ آمِنٌ يَحْضُنُ كَائِنَاتِ الصَّحْرَاءِ المَنِيعَةَ!",
      verseArGirl: "بَيْنَ كَثِيبَيْنِ حُمْرَاوَيْنِ انْفَلَقَتْ وَاحَةٌ كَالزُّمُرُّدِ الأَخْضَرِ الفَتَّانِ،\nعَيْنُ مَاءٍ رَقْرَاقَةٌ تَفِيضُ بِالخَيْرِ فِي كُلِّ أَنٍ!\nنَخِيلٌ بَاسِقٌ يُظَلِّلُ الغُدْرَانَ وَالرِّيَاضَ السَّاحِرَةَ البَدِيعَةَ،\nمَلاَذٌ آمِنٌ يَحْضُنُ كَائِنَاتِ الصَّحْرَاءِ المَنِيعَةَ!",
    },
    characterPose: "standing-at-oasis-spring",
  },
  {
    id: 9,
    spreadNumber: 9,
    spreadTitleEn: "Rejoining the Arabian Oryx Herd",
    spreadTitleAr: "لِقَاءُ قَطِيعِ المَهَا العَرَبِيِّ الشَّامِخِ",
    sceneTheme: "herd-reunion",
    bgImage: "/final_book_mockup_1788701924626.jpg",
    leftPage: {
      titleEn: "Reunion of the White Herd",
      verseEn: "Across the spring, the oryx herd raised long majestic horns,\nTheir snowy coats gleaming bright like sunrise on the thorns.\nThe mother ran to greet her calf with gentle nuzzling sound,\nBow head to our young guardian on this oasis ground!",
    },
    rightPage: {
      titleAr: "فَرْحَةُ الأُمِّ بِعَوْدَةِ صَغِيرِهَا المَفْقُودِ",
      verseAr: "عَلَى ضَفَافِ العَيْنِ وَقَفَ قَطِيعُ المَهَا العَرَبِيِّ المَهِيبِ الأَبْيَضِ،\nبِقُرُونٍ طَوِيلَةٍ كَالسُّيُوفِ تَلْمَعُ فَوْقَ المَرْعَى المُرَوَّضِ.\nرَكَضَتِ الأُمُّ تَضُمُّ صَغِيرَهَا بِفَرَحٍ وَحَنَانٍ غَامِرٍ،\nتَنْظُرُ إِلَى {childName} بِشُكْرٍ فِي هَذَا اللِّقَاءِ العَامِرِ!",
      verseArGirl: "عَلَى ضَفَافِ العَيْنِ وَقَفَ قَطِيعُ المَهَا العَرَبِيِّ المَهِيبِ الأَبْيَضِ،\nبِقُرُونٍ طَوِيلَةٍ كَالسُّيُوفِ تَلْمَعُ فَوْقَ المَرْعَى المُرَوَّضِ.\nرَكَضَتِ الأُمُّ تَضُمُّ صَغِيرَهَا بِفَرَحٍ وَحَنَانٍ غَامِرٍ،\nتَنْظُرُ إِلَى {childName} بِشُكْرٍ فِي هَذَا اللِّقَاءِ العَامِرِ!",
    },
    characterPose: "watching-herd-reunion",
  },
  {
    id: 10,
    spreadNumber: 10,
    spreadTitleEn: "Fireside Tales with Bedouin Elders",
    spreadTitleAr: "مَجْلِسُ السَّمَرِ حَوْلَ نَارِ الصَّحْرَاءِ",
    sceneTheme: "campfire-stories",
    bgImage: "/books/starlit-dunes/spreads/spread_6_campfire.jpg",
    leftPage: {
      titleEn: "Hospitality Under the Stars",
      verseEn: "Beside the tent as twilight fell, the Bedouin elders spoke,\nOf ancient times and desert ways amidst the saffron smoke.\nThey poured hot spiced Arabian tea and praised the noble deed:\n“A true explorer helps the wild and serves the land in need!”",
    },
    rightPage: {
      titleAr: "حِكَمُ الأَجْدَادِ فِي ضِيَافَةِ البَادِيَةِ",
      verseAr: "قُرْبَ الخَيْمَةِ مَعَ حُلُولِ المَسَاءِ اشْتَعَلَتْ نَارُ السَّمَرِ الدَّافِئَةُ،\nيَفُوحُ مِنْهَا عَبَقُ الهَيْلِ وَالزَّعْفَرَانِ فِي لَيْلَةٍ نَاشِئَةٍ.\nأَشَادَ كِبَارُ البَادِيَةِ بِشَجَاعَةِ {childName} وَنُبْلِ أَفْعَالِهِ الحَسَنَةِ:\n«مَنْ يَحْمِ الحَيَاةَ البَرِّيَّةَ فَقَدْ نَالَ شَرَفَ هَذِهِ السَّنَةِ!»",
      verseArGirl: "قُرْبَ الخَيْمَةِ مَعَ حُلُولِ المَسَاءِ اشْتَعَلَتْ نَارُ السَّمَرِ الدَّافِئَةُ،\nيَفُوحُ مِنْهَا عَبَقُ الهَيْلِ وَالزَّعْفَرَانِ فِي لَيْلَةٍ نَاشِئَةٍ.\nأَشَادَ كِبَارُ البَادِيَةِ بِشَجَاعَةِ {childName} وَنُبْلِ أَفْعَالِهَا الحَسَنَةِ:\n«مَنْ يَحْمِ الحَيَاةَ البَرِّيَّةَ فَقَدْ نَالَتْ شَرَفَ هَذِهِ السَّنَةِ!»",
    },
    characterPose: "sitting-by-campfire",
  },
  {
    id: 11,
    spreadNumber: 11,
    spreadTitleEn: "The Desert Guardian's Sacred Oath",
    spreadTitleAr: "عَهْدُ حَارِسِ الحَيَاةِ البَرِّيَّةِ",
    sceneTheme: "conservation-pledge",
    bgImage: "/images/book_craftsmanship.jpg",
    leftPage: {
      titleEn: "True Courage is Protection",
      verseEn: "{childName} kept the oasis secret mapped within the heart,\nA sacred promise made to play a conservation part.\nFor true explorer courage isn't conquering the sand,\nIt's caring for the living things across our blessed land!",
    },
    rightPage: {
      titleAr: "أَمَانَةُ الطَّبِيعَةِ وَرِعَايَةُ الحَيَاةِ البَرِّيَّةِ",
      verseAr: "عَاهَدَ {childName} الصَّحْرَاءَ أَنْ يَحْفَظَ سِرَّ هَذِهِ الوَاحَةِ الطَّاهِرَةِ،\nلِتَبْقَى لِلْغِزْلاَنِ وَالمَهَا أَرْضَ أَمَانٍ وَعَيْشٍ زَاهِرَةٍ.\nفَالشَّجَاعَةُ الحَقِيقِيَّةُ لَيْسَتْ فِي قَهْرِ الرِّمَالِ وَالجِبَالِ،\nبَلْ فِي حِمَايَةِ الحَيَاةِ البَرِّيَّةِ، وَصَوْنِ الجَمَالِ!\nتَمَّتْ بِحَمْدِ اللهِ",
      verseArGirl: "عَاهَدَتْ {childName} الصَّحْرَاءَ أَنْ تَحْفَظَ سِرَّ هَذِهِ الوَاحَةِ الطَّاهِرَةِ،\nلِتَبْقَى لِلْغِزْلاَنِ وَالمَهَا أَرْضَ أَمَانٍ وَعَيْشٍ زَاهِرَةٍ.\nفَالشَّجَاعَةُ الحَقِيقِيَّةُ لَيْسَتْ فِي قَهْرِ الرِّمَالِ وَالجِبَالِ،\nبَلْ فِي حِمَايَةِ الحَيَاةِ البَرِّيَّةِ، وَصَوْنِ الجَمَالِ!\nتَمَّتْ بِحَمْدِ اللهِ",
    },
    characterPose: "standing-proud-guardian",
  },
];

// =========================================================================
// EXPANSION BOOK 5: MY FIRST RAMADAN & THE LANTERN OF KINDNESS (12 SPREADS)
// Slug: my-first-ramadan-lantern-of-kindness | ID: first-ramadan-lantern
// =========================================================================
export const FIRST_RAMADAN_SPREADS: StorySpread[] = [
  {
    id: 0,
    spreadNumber: 0,
    spreadTitleEn: "Front Cover Keepsake",
    spreadTitleAr: "الغلاف التذكاري الأمامي",
    sceneTheme: "ramadan-lantern-cover",
    bgImage: "/books/first-ramadan-lantern-cover.jpg",
    leftPage: {
      titleEn: "{childName}'s First Ramadan & The Lantern of Kindness",
      verseEn: "A Glowing Celebration of Family Love, Generosity & Crescent Nights\nCrafted with Love in the United Arab Emirates",
      noteEn: "Personalized with love by: {gifterName}\nPersonalizedTales.com • United Arab Emirates",
    },
    rightPage: {
      titleAr: "رَمَضَانُ {childName} الأَوَّلُ وَقِنْدِيلُ العَطَاءِ",
      verseAr: "احْتِفَالٌ دَافِئٌ بِقِيَمِ الشَّهْرِ الفَضِيلِ وَبَرَكَةِ اللَّيَالِي الهِلاَلِيَّةِ\nصُنِعَ بِكُلِّ حُبٍّ فِي دَوْلَةِ الإِمَارَاتِ العَرَبِيَّةِ المُتَّحِدَةِ",
      noteAr: "إِهْدَاءٌ مَفْعُومٌ بِالحُبِّ مِنْ: {gifterName}\nحِكَايَاتٌ مُخَصَّصَةٌ • دَوْلَةُ الإِمَارَاتِ العَرَبِيَّةِ المُتَّحِدَةِ",
    },
    characterPose: "holding-lantern-high",
  },
  {
    id: 1,
    spreadNumber: 1,
    spreadTitleEn: "Blessed Month Family Dedication",
    spreadTitleAr: "صفحة الإهداء والبركة العائلية",
    sceneTheme: "parchment-ramadan",
    bgImage: "/images/book_craftsmanship.jpg",
    leftPage: {
      titleEn: "Blessed Month Family Dedication",
      verseEn: "{dedicationText}",
      noteEn: "Archival 200gsm Mohawk Silk Paper • Ramadan Heirloom Edition • UAE",
    },
    rightPage: {
      titleAr: "إِهْدَاءُ الشَّهْرِ الفَضِيلِ وَبَرَكَةُ العَائِلَةِ",
      verseAr: "«إِلَى حَبِيبِنَا الغَالِي {childName}،\n\nفِي هَذَا الشَّهْرِ الكَرِيمِ، نَدْعُو اللهَ أَنْ يَمْلأَ قَلْبَكَ بِالإِيمَانِ، وَحَيَاتَكَ بِالإِحْسَانِ، كَمَا يُنِيرُ الفَانُوسُ دَرْبَ الظَّلاَمِ. كُنْ دَوْماً قِنْدِيلاً لِلْخَيْرِ وَالعَطَاءِ. نُحِبُّكَ حُبّاً كَبِيراً.\n\nمَعَ كُلِّ مَحَبَّتِنَا،\n{gifterName}»",
      verseArGirl: "«إِلَى حَبِيبَتِنَا الغَالِيَةِ {childName}،\n\nفِي هَذَا الشَّهْرِ الكَرِيمِ، نَدْعُو اللهَ أَنْ يَمْلأَ قَلْبَكِ بِالإِيمَانِ، وَحَيَاتَكِ بِالإِحْسَانِ، كَمَا يُنِيرُ الفَانُوسُ دَرْبَ الظَّلاَمِ. كُونِي دَوْماً قِنْدِيلاً لِلْخَيْرِ وَالعَطَاءِ. نُحِبُّكِ حُبّاً كَبِيراً.\n\nمَعَ كُلِّ مَحَبَّتِنَا،\n{gifterName}»",
      noteAr: "طُبِعَ خِصِّيصاً كَذِكْرَى خَالِدَةٍ • نُسْخَةُ إِهْدَاءٍ رَمَضَانِيَّةٍ",
    },
    characterPose: "holding-open-hands",
  },
  {
    id: 2,
    spreadNumber: 2,
    spreadTitleEn: "Sighting the Silver Crescent Moon",
    spreadTitleAr: "رُؤْيَةُ هِلاَلِ شَهْرِ الخَيْرِ الفَضِيلِ",
    sceneTheme: "hilal-sighting",
    bgImage: "/final_book_mockup_1788701924626.jpg",
    leftPage: {
      titleEn: "Chapter One: The Silver Thread",
      verseEn: "Up through the courtyard date palm trees, a silver ribbon shone,\nThe blessed crescent moon appeared, the fairest ever known!\n{childName} clapped with joyful glee and called the family out:\n“Ramadan Mubarak, all! The holy month is about!”",
    },
    rightPage: {
      titleAr: "الفَصْلُ الأَوَّلُ: بَهْجَةُ رُؤْيَةِ الهِلاَلِ",
      verseAr: "بَيْنَ سَعَفِ النَّخِيلِ لاَحَ خَيْطُ الفِضَّةِ الوَضَّاءِ المُنِيرِ،\nهِلاَلُ رَمَضَانَ المُبَارَكِ يُشِعُّ فِي أَرْجَاءِ الأُفُقِ الأَثِيرِ!\nصَفَّقَ {childName} فَرَحاً وَنَادَى الأَهْلَ بِبَهْجَةٍ كَبِيرَةٍ سَاطِعَةٍ:\n«مُبَارَكٌ عَلَيْكُمُ الشَّهْرُ يَا أَهْلَ البُيُوتِ الجَامِعَةِ!»",
      verseArGirl: "بَيْنَ سَعَفِ النَّخِيلِ لاَحَ خَيْطُ الفِضَّةِ الوَضَّاءِ المُنِيرِ،\nهِلاَلُ رَمَضَانَ المُبَارَكِ يُشِعُّ فِي أَرْجَاءِ الأُفُقِ الأَثِيرِ!\nصَفَّقَتْ {childName} فَرَحاً وَنَادَتِ الأَهْلَ بِبَهْجَةٍ كَبِيرَةٍ سَاطِعَةٍ:\n«مُبَارَكٌ عَلَيْكُمُ الشَّهْرُ يَا أَهْلَ البُيُوتِ الجَامِعَةِ!»",
    },
    characterPose: "pointing-at-crescent",
  },
  {
    id: 3,
    spreadNumber: 3,
    spreadTitleEn: "Lighting the Golden Fanous Lantern",
    spreadTitleAr: "إِضَاءَةُ الفَانُوسِ النُّحَاسِيِّ الذَّهَبِيِّ",
    sceneTheme: "fanous-lighting",
    bgImage: "/images/hero_story_spread.jpg",
    leftPage: {
      titleEn: "Lace Shadows in the Night",
      verseEn: "Crafted of polished golden brass with glass of jewel tone,\nA glowing Fanous lantern shone that was {childName}'s very own!\nIt cast bright lace upon the walls, warm geometric light,\nWelcoming family love and peace upon the festive night.",
    },
    rightPage: {
      titleAr: "قِنْدِيلُ النُّحَاسِ وَظِلاَلُ الزَّخَارِفِ",
      verseAr: "فَانُوسٌ نُحَاسِيٌّ ذَهَبِيٌّ نُقِشَتْ فِيهِ الزَّخَارِفُ البَدِيعَةُ المَلِيحَةُ،\nأَضَاءَهُ {childName} فَتَوَهَّجَتْ أَنْوَارُهُ الوَضِيئَةُ الصَّحِيحَةُ!\nتَرْتَسِمُ الظِّلاَلُ كَالدَّانْتِيلِ فَوْقَ الجُدْرَانِ فِي هَذَا اللَّيْلِ،\nتَنْشُرُ البَهْجَةَ فِي الدَّارِ وَتُهْدِي السَّرُورَ بِكُلِّ فَيْضٍ وَسَيْلٍ!",
      verseArGirl: "فَانُوسٌ نُحَاسِيٌّ ذَهَبِيٌّ نُقِشَتْ فِيهِ الزَّخَارِفُ البَدِيعَةُ المَلِيحَةُ،\nأَضَاءَتْهُ {childName} فَتَوَهَّجَتْ أَنْوَارُهُ الوَضِيئَةُ الصَّحِيحَةُ!\nتَرْتَسِمُ الظِّلاَلُ كَالدَّانْتِيلِ فَوْقَ الجُدْرَانِ فِي هَذَا اللَّيْلِ،\nتَنْشُرُ البَهْجَةَ فِي الدَّارِ وَتُهْدِي السَّرُورَ بِكُلِّ فَيْضٍ وَسَيْلٍ!",
    },
    characterPose: "admiring-lantern",
  },
  {
    id: 4,
    spreadNumber: 4,
    spreadTitleEn: "Setting the Family Iftar Table",
    spreadTitleAr: "إِعْدَادُ مَائِدَةِ الإِفْطَارِ العَائِلِيَّةِ",
    sceneTheme: "iftar-prep",
    bgImage: "/images/category_for_family.jpg",
    leftPage: {
      titleEn: "Fragrant Spices & Family Kitchen",
      verseEn: "The kitchen buzzed with fragrant spice, sweet cinnamon and rose,\nAs mama rolled the samosa sheets and checked the baking trays in rows.\n{childName} washed the glossy dates and set each porcelain bowl,\nHelping with eager little hands and pure, devoted soul.",
    },
    rightPage: {
      titleAr: "بَرَكَةُ التَّعَاوُنِ فِي مَطْبَخِ البَيْتِ",
      verseAr: "فَاحَتْ رَوَائِحُ الزَّعْفَرَانِ وَالهَيْلِ فِي أَرْجَاءِ البَيْتِ الكَرِيمِ،\nوَالأُمُّ تُعِدُّ طَيِّبَاتِ الطَّعَامِ بِكُلِّ حُبٍّ وَمَذَاقٍ قَوِيمٍ.\nرَتَّبَ {childName} حَبَّاتِ التَّمْرِ فِي الصِّحَافِ المُذَهَّبَةِ بِنِظَامٍ،\nيُسَاعِدُ الأَهْلَ بِفَرَحٍ فِي هَذِهِ الأَيَّامِ العِظَامِ!",
      verseArGirl: "فَاحَتْ رَوَائِحُ الزَّعْفَرَانِ وَالهَيْلِ فِي أَرْجَاءِ البَيْتِ الكَرِيمِ،\nوَالأُمُّ تُعِدُّ طَيِّبَاتِ الطَّعَامِ بِكُلِّ حُبٍّ وَمَذَاقٍ قَوِيمٍ.\nرَتَّبَتْ {childName} حَبَّاتِ التَّمْرِ فِي الصِّحَافِ المُذَهَّبَةِ بِنِظَامٍ،\nيُسَاعِدُ الأَهْلَ بِفَرَحٍ فِي هَذِهِ الأَيَّامِ العِظَامِ!",
    },
    characterPose: "placing-dates-bowl",
  },
  {
    id: 5,
    spreadNumber: 5,
    spreadTitleEn: "The Historic Sunset Cannon",
    spreadTitleAr: "دَوِيُّ مِدْفَعِ الإِفْطَارِ التَّارِيخِيِّ",
    sceneTheme: "cannon-boom",
    bgImage: "/final_book_mockup_1788701924626.jpg",
    leftPage: {
      titleEn: "Waiting for the Signal",
      verseEn: "Quiet fell across the dunes, the golden sun dipped low,\nWaiting beside the window sill to catch the evening glow.\nThen BOOM! The historic cannon roared across the sunset plain,\nDeclaring fast is broken now with blessings in our train!",
    },
    rightPage: {
      titleAr: "صَوْتُ المِدْفَعِ يُعْلِنُ فَرْحَةَ اللِّقَاءِ",
      verseAr: "سَادَ السُّكُونُ قُبَيْلَ الغُرُوبِ وَالكُلُّ يَتَرَقَّبُ اللِّقَاءَ البَهِيَّ،\nحِينَ تَوَارَتِ الشَّمْسُ خَلْفَ الأُفُقِ لِتَرْسُمَ الشَّفَقَ النَّدِيَّ.\n«بُوووم!» انْطَلَقَ صَوْتُ مِدْفَعِ الإِفْطَارِ مُدَوِّياً فِي الأَرْجَاءِ،\nيُعْلِنُ فَرْحَةَ الصَّائِمِينَ وَيَبْعَثُ فِي القُلُوبِ الرَّجَاءَ!",
      verseArGirl: "سَادَ السُّكُونُ قُبَيْلَ الغُرُوبِ وَالكُلُّ يَتَرَقَّبُ اللِّقَاءَ البَهِيَّ،\nحِينَ تَوَارَتِ الشَّمْسُ خَلْفَ الأُفُقِ لِتَرْسُمَ الشَّفَقَ النَّدِيَّ.\n«بُوووم!» انْطَلَقَ صَوْتُ مِدْفَعِ الإِفْطَارِ مُدَوِّياً فِي الأَرْجَاءِ،\nيُعْلِنُ فَرْحَةَ الصَّائِمِينَ وَيَبْعَثُ فِي القُلُوبِ الرَّجَاءَ!",
    },
    characterPose: "listening-to-cannon",
  },
  {
    id: 6,
    spreadNumber: 6,
    spreadTitleEn: "Blessing the First Date & Water",
    spreadTitleAr: "بَرَكَةُ التَّمْرَةِ وَالمَاءِ الزُّلاَلِ",
    sceneTheme: "iftar-blessing",
    bgImage: "/images/hero_reading_lifestyle.jpg",
    leftPage: {
      titleEn: "Gratitude at the Table",
      verseEn: "With whispered gratitude and prayer, the crystal glass was poured,\nA sweet brown date to break the fast, thanking the loving Lord.\n{childName} shared a warm embrace with grandma, dad, and mother,\nNo sweeter joy in all the world than breaking bread with one another!",
    },
    rightPage: {
      titleAr: "دُعَاءُ الشُّكْرِ وَاجْتِمَاعُ الأَحِبَّةِ",
      verseAr: "بِدُعَاءِ الشُّكْرِ وَالحَمْدِ ارْتَشَفَ الصَّغِيرُ جُرْعَةَ المَاءِ الهَنِيِّ،\nوَتَنَاوَلَ تَمْرَةً حُلْوَةً زَكِيَّةً فَتَجَدَّدَ النَّشَاطُ الرَّضِيُّ.\nعَانَقَ {childName} أُمَّهُ وَأَبَاهُ وَالجَدَّ الكَرِيمَ بِافْتِخَارٍ،\nفَمَا أَجْمَلَ مَائِدَةَ الإِفْطَارِ حِينَ تَجْمَعُ شَمْلَ الدَّارِ!",
      verseArGirl: "بِدُعَاءِ الشُّكْرِ وَالحَمْدِ ارْتَشَفَتِ الصَّغِيرَةُ جُرْعَةَ المَاءِ الهَنِيِّ،\nوَتَنَاوَلَتْ تَمْرَةً حُلْوَةً زَكِيَّةً فَتَجَدَّدَ النَّشَاطُ الرَّضِيُّ.\nعَانَقَتْ {childName} أُمَّهَا وَأَبَاهَا وَالجَدَّ الكَرِيمَ بِافْتِخَارٍ،\nفَمَا أَجْمَلَ مَائِدَةَ الإِفْطَارِ حِينَ تَجْمَعُ شَمْلَ الدَّارِ!",
    },
    characterPose: "breaking-fast-with-date",
  },
  {
    id: 7,
    spreadNumber: 7,
    spreadTitleEn: "Sharing Warm Luqaimat with Neighbors",
    spreadTitleAr: "طَبَقُ اللُّقَيْمَاتِ الذَّهَبِيُّ لِلْجِيرَانِ",
    sceneTheme: "luqaimat-sharing",
    bgImage: "/images/category_for_kids.jpg",
    leftPage: {
      titleEn: "Sweet Hospitality",
      verseEn: "Carrying a silver tray piled high with crispy golden treats,\nCrisp sweet Luqaimat drizzled with dates along the cobblestone streets.\n{childName} walked to neighbor doors with greeting proud and grand,\nDelivering warmth and hospitality throughout our friendly land!",
    },
    rightPage: {
      titleAr: "عَطَاءٌ يَصِلُ قُلُوبَ الجِيرَانِ",
      verseAr: "حَمَلَ {childName} صِينِيَّةَ اللُّقَيْمَاتِ الذَّهَبِيَّةِ المُقَرْمَشَةِ بِرِفْقٍ،\nمُغَطَّاةً بِدِبْسِ التَّمْرِ الأَصِيلِ الَّذِي يَلْمَعُ بِالصِّدْقِ.\nطَرَقَ أَبْوَابَ الجِيرَانِ يُهْدِيهِمْ حَلْوَى الإِفْطَارِ الزَّاهِيَةَ،\nفَرُدَّتِ التَّحِيَّةُ بِالدُّعَاءِ وَالمَحَبَّةِ النَّاهِيَةِ!",
      verseArGirl: "حَمَلَتْ {childName} صِينِيَّةَ اللُّقَيْمَاتِ الذَّهَبِيَّةِ المُقَرْمَشَةِ بِرِفْقٍ،\nمُغَطَّاةً بِدِبْسِ التَّمْرِ الأَصِيلِ الَّذِي يَلْمَعُ بِالصِّدْقِ.\nطَرَقَتْ أَبْوَابَ الجِيرَانِ تُهْدِيهِمْ حَلْوَى الإِفْطَارِ الزَّاهِيَةَ،\nفَرُدَّتِ التَّحِيَّةُ بِالدُّعَاءِ وَالمَحَبَّةِ النَّاهِيَةِ!",
    },
    characterPose: "carrying-tray-of-sweets",
  },
  {
    id: 8,
    spreadNumber: 8,
    spreadTitleEn: "Smiles and Blessings from Elders",
    spreadTitleAr: "دَعَوَاتُ الأَجْدَادِ وَابْتِسَامَاتُ البَرَكَةِ",
    sceneTheme: "elders-blessing",
    bgImage: "/final_book_mockup_1788701924626.jpg",
    leftPage: {
      titleEn: "Hands of Kindness",
      verseEn: "An elder patted {childName}'s cheek with eyes of misty pride:\n“May generous hands like yours forever prosper and abide!”\nA little deed of charity had sparked a radiant light,\nMaking the neighborhood feel like family throughout the holy night!",
    },
    rightPage: {
      titleAr: "دُعَاءُ الشَّيْخِ الكَبِيرِ لِلْفَتَى الصَّغِيرِ",
      verseAr: "ابْتَسَمَ الجَدُّ العَطُوفُ وَمَسَحَ عَلَى رَأْسِ البَطَلِ بِلُطْفٍ جَمِيلٍ،\n«بَارَكَ اللهُ فِيكَ يَا بُنَيَّ، وَأَجْزَلَ لَكَ الأَجْرَ الجَزِيلَ!»\nشَعَرَ {childName} بِدِفْءِ العَطَاءِ يَمْلأُ فُؤَادَهُ الصَّغِيرَ بِالإِيمَانِ،\nفَعَرَفَ أَنَّ صَنَائِعَ المَعْرُوفِ هِيَ أَبْهَى تِيجَانِ الزَّمَانِ!",
      verseArGirl: "ابْتَسَمَ الجَدُّ العَطُوفُ وَمَسَحَ عَلَى رَأْسِ البَطَلَةِ بِلُطْفٍ جَمِيلٍ،\n«بَارَكَ اللهُ فِيكِ يَا بُنَيَّتِي، وَأَجْزَلَ لَكِ الأَجْرَ الجَزِيلَ!»\nشَعَرَتْ {childName} بِدِفْءِ العَطَاءِ يَمْلأُ فُؤَادَهَا الصَّغِيرَ بِالإِيمَانِ،\nفَعَرَفَتْ أَنَّ صَنَائِعَ المَعْرُوفِ هِيَ أَبْهَى تِيجَانِ الزَّمَانِ!",
    },
    characterPose: "smiling-with-elder",
  },
  {
    id: 9,
    spreadNumber: 9,
    spreadTitleEn: "Evening Tarawih Prayers",
    spreadTitleAr: "سَكِينَةُ صَلاَةِ التَّرَاوِيحِ فِي الفِنَاءِ",
    sceneTheme: "tarawih-courtyard",
    bgImage: "/final_book_mockup_1788701924626.jpg",
    leftPage: {
      titleEn: "Peace in the Courtyard",
      verseEn: "Beneath the mosque arches washed in amber lanterns glow,\nQuiet rows of worshippers bowed gracefully and slow.\n{childName} stood beside the elders, hands folded at the chest,\nFinding in evening peaceful prayer the deepest sense of rest.",
    },
    rightPage: {
      titleAr: "خُشُوعُ الرُّكُوعِ وَالسُّجُودِ",
      verseAr: "تَحْتَ أَقْوَاسِ المَسْجِدِ المُنِيرِ اصْطَفَّ المُصَلُّونَ بِخُشُوعٍ وَسَكِينَةٍ،\nتَتَرَدَّدُ آيَاتُ الذِّكْرِ الحَكِيمِ فَتَسْكُنُ كُلُّ رُوحٍ مَكِينَةٍ.\nوَقَفَ {childName} بِجَانِبِ أَبِيهِ يُرَدِّدُ الدُّعَاءَ بِاطْمِئْنَانٍ جَلِيٍّ،\nيَغْمُرُهُ السَّلاَمُ وَالرِّضَا فِي هَذَا الشَّهْرِ البَهِيِّ!",
      verseArGirl: "تَحْتَ أَقْوَاسِ المَسْجِدِ المُنِيرِ اصْطَفَّتِ المُصَلِّيَاتُ بِخُشُوعٍ وَسَكِينَةٍ،\nتَتَرَدَّدُ آيَاتُ الذِّكْرِ الحَكِيمِ فَتَسْكُنُ كُلُّ رُوحٍ مَكِينَةٍ.\nوَقَفَتْ {childName} بِجَانِبِ أُمِّهَا تُرَدِّدُ الدُّعَاءَ بِاطْمِئْنَانٍ جَلِيٍّ،\nيَغْمُرُهَا السَّلاَمُ وَالرِّضَا فِي هَذَا الشَّهْرِ البَهِيِّ!",
    },
    characterPose: "prayer-pose",
  },
  {
    id: 10,
    spreadNumber: 10,
    spreadTitleEn: "Majlis Tales of Ancient Generosity",
    spreadTitleAr: "حِكَايَاتُ الكَرَمِ فِي المَجْلِسِ العَامِرِ",
    sceneTheme: "majlis-generosity",
    bgImage: "/images/category_for_family.jpg",
    leftPage: {
      titleEn: "Stories of Hospitality",
      verseEn: "In the carpeted majlis where Arabic coffee steamed,\nGrandpa recounted historic tales while glowing lanterns gleamed.\nOf travelers welcomed from the sands and strangers given bread,\nTeaching that generosity is how the heart is fed!",
    },
    rightPage: {
      titleAr: "عِبَرُ الأَجْدَادِ حَوْلَ دَلَّةِ القَهْوَةِ",
      verseAr: "فِي المَجْلِسِ التُّرَاثِيِّ الفَسِيحِ جَلَسَتِ العَائِلَةُ تَتَسَامَرُ فِي سُرُورٍ،\nحَوْلَ دَلَّةِ القَهْوَةِ الزَّكِيَّةِ وَحَدِيثٍ يَفُوحُ بِالعُطُورِ.\nرَوَى الجَدُّ قِصَصَ الكَرَمِ الإِمَارَاتِيِّ وَإِكْرَامِ كُلِّ ضَيْفٍ،\nفَتَعَلَّمَ {childName} أَنَّ الجُودَ شِيمَةُ الأَهْلِ فِي الشِّتَاءِ وَالصَّيْفِ!",
      verseArGirl: "فِي المَجْلِسِ التُّرَاثِيِّ الفَسِيحِ جَلَسَتِ العَائِلَةُ تَتَسَامَرُ فِي سُرُورٍ،\nحَوْلَ دَلَّةِ القَهْوَةِ الزَّكِيَّةِ وَحَدِيثٍ يَفُوحُ بِالعُطُورِ.\nرَوَى الجَدُّ قِصَصَ الكَرَمِ الإِمَارَاتِيِّ وَإِكْرَامِ كُلِّ ضَيْفٍ،\nفَتَعَلَّمَتْ {childName} أَنَّ الجُودَ شِيمَةُ الأَهْلِ فِي الشِّتَاءِ وَالصَّيْفِ!",
    },
    characterPose: "listening-in-majlis",
  },
  {
    id: 11,
    spreadNumber: 11,
    spreadTitleEn: "The Joy of Ramadan is Giving",
    spreadTitleAr: "فَرْحَةُ العَطَاءِ وَانْتِظَارُ العِيدِ",
    sceneTheme: "eid-morning",
    bgImage: "/images/book_craftsmanship.jpg",
    leftPage: {
      titleEn: "The Greatest Gift",
      verseEn: "The crescent moon of Shawwal arrived, announcing Eid morning bright,\nNew holiday clothes all pressed, sweet perfumes and delight!\n{childName} hugged the family close with gratitude anew:\nThe true light of Ramadan had made every kind wish come true!",
    },
    rightPage: {
      titleAr: "بَهْجَةُ عِيدِ الفِطْرِ وَثَمَرَةُ الإِحْسَانِ",
      verseAr: "أَهَلَّ هِلاَلُ شَوَّالٍ لِيُعْلِنَ فَرْحَةَ عِيدِ الفِطْرِ السَّعِيدِ المُبَارَكِ،\nفَارْتَدَى الأَحْبَابُ أَجْمَلَ الثِّيَابِ لِتَتَوَالَى التَّهَانِي بَيْنَ الأَرَائِكِ!\nضَمَّ {childName} وَالِدَيْهِ بِشُكْرٍ وَابْتِهَاجٍ مُبِينٍ صَافٍ:\n«عَرَفْتُ أَنَّ بَهْجَةَ رَمَضَانَ هِيَ فِي إِسْعَادِ الآخَرِينَ بِإِنْصَافٍ!»\nتَمَّتْ بِحَمْدِ اللهِ",
      verseArGirl: "أَهَلَّ هِلاَلُ شَوَّالٍ لِيُعْلِنَ فَرْحَةَ عِيدِ الفِطْرِ السَّعِيدِ المُبَارَكِ،\nفَارْتَدَتِ المَحْبُوبَةُ أَجْمَلَ الثِّيَابِ لِتَتَوَالَى التَّهَانِي بَيْنَ الأَرَائِكِ!\nضَمَّتْ {childName} وَالِدَيْهَا بِشُكْرٍ وَابْتِهَاجٍ مُبِينٍ صَافٍ:\n«عَرَفْتُ أَنَّ بَهْجَةَ رَمَضَانَ هِيَ فِي إِسْعَادِ الآخَرِينَ بِإِنْصَافٍ!»\nتَمَّتْ بِحَمْدِ اللهِ",
    },
    characterPose: "eid-hug",
  },
];

// =========================================================================
// MASTER BOOK SPREADS MAP & DYNAMIC LOOKUP ENGINE
// =========================================================================
export const BOOK_SPREADS_MAP: Record<string, StorySpread[]> = {
  // Flagship Book
  "the-secret-of-the-starlit-dunes": SAMPLE_BOOK_SPREADS,
  "starlit-dunes": SAMPLE_BOOK_SPREADS,

  // Expansion Book 1
  "the-pearl-divers-secret-treasure": PEARL_DIVER_SPREADS,
  "pearl-diver-treasure": PEARL_DIVER_SPREADS,

  // Expansion Book 2
  "first-steps-in-the-big-world": BABY_MILESTONE_SPREADS,
  "baby-milestone-chronicle": BABY_MILESTONE_SPREADS,

  // Expansion Book 3
  "super-sibling-adventure-dynamic-duo": SUPER_SIBLING_SPREADS,
  "super-sibling-adventure": SUPER_SIBLING_SPREADS,

  // Expansion Book 4
  "the-brave-explorer-hidden-oasis": BRAVE_EXPLORER_SPREADS,
  "brave-explorer-oasis": BRAVE_EXPLORER_SPREADS,

  // Expansion Book 5
  "my-first-ramadan-lantern-of-kindness": FIRST_RAMADAN_SPREADS,
  "first-ramadan-lantern": FIRST_RAMADAN_SPREADS,

  // Expansion Book 6: The Magical Garden
  "the-magical-garden-of-whispering-trees": SAMPLE_BOOK_SPREADS,
  "magical-trees-garden": SAMPLE_BOOK_SPREADS,

  // Expansion Book 7: Little Chef
  "i-am-a-little-chef-feast-of-wonders": SAMPLE_BOOK_SPREADS,
  "little-chef-wonders": SAMPLE_BOOK_SPREADS,

  // Expansion Book 8: Grandpa's Workshop
  "grandpas-enchanted-workshop-flying-carpet": SAMPLE_BOOK_SPREADS,
  "grandpas-workshop-flying-carpet": SAMPLE_BOOK_SPREADS,

  // Expansion Book 9: The Little Equestrian
  "the-little-equestrian-golden-stallion": BRAVE_EXPLORER_SPREADS,
  "equestrian-golden-stallion": BRAVE_EXPLORER_SPREADS,

  // Expansion Book 10: Wildlife Rescuer
  "the-wildlife-rescuer-pink-flamingos": BRAVE_EXPLORER_SPREADS,
  "wildlife-mangrove-flamingos": BRAVE_EXPLORER_SPREADS,

  // Expansion Book 11: Time-Traveling Dhow
  "the-time-traveling-dhow-ancient-cities": PEARL_DIVER_SPREADS,
  "time-traveling-dhow-cities": PEARL_DIVER_SPREADS,

  // Expansion Book 12: Musical Oud
  "my-musical-oud-melody-of-the-dunes": FIRST_RAMADAN_SPREADS,
  "musical-oud-melody": FIRST_RAMADAN_SPREADS,

  // Expansion Book 13: The Little Botanist
  "the-little-botanist-desert-rose": BRAVE_EXPLORER_SPREADS,
  "botanist-desert-rose": BRAVE_EXPLORER_SPREADS,

  // Expansion Book 14: Pearl Festival Lantern Boat
  "the-starlit-pearl-festival-lantern-boat": PEARL_DIVER_SPREADS,
  "pearl-festival-lantern-boat": PEARL_DIVER_SPREADS,

  // Expansion Book 15: Date Palm Harvest
  "the-great-date-palm-harvest-golden-baskets": FIRST_RAMADAN_SPREADS,
  "date-palm-harvest-baskets": FIRST_RAMADAN_SPREADS,

  // Expansion Book 16: The Pottery Artisan of Hatta
  "the-pottery-artisan-of-hatta": POTTERY_ARTISAN_SPREADS,
  "pottery-artisan-hatta": POTTERY_ARTISAN_SPREADS,

  // Expansion Book 17: The Young Architect of Wonder Towers
  "the-young-architect-wonder-towers": YOUNG_ARCHITECT_SPREADS,
  "young-architect-wonder-towers": YOUNG_ARCHITECT_SPREADS,

  // Expansion Book 18: Sandcastle Master of Saadiyat Beach
  "the-grand-sandcastle-of-saadiyat": SANDCASTLE_MASTER_SPREADS,
  "sandcastle-master-saadiyat": SANDCASTLE_MASTER_SPREADS,

  // Expansion Book 19: The Calligraphy Apprentice
  "the-calligraphy-apprentice-golden-ink": CALLIGRAPHY_APPRENTICE_SPREADS,
  "calligraphy-apprentice-letters": CALLIGRAPHY_APPRENTICE_SPREADS,

  // Expansion Book 20: Diver of the Secret Lagoon
  "the-coral-reef-diver-hidden-lagoon": PEARL_DIVER_SPREADS,
  "diver-underwater-coral-pearls": PEARL_DIVER_SPREADS,

  // Expansion Book 21: Desert Astronomer
  "the-desert-astronomer-starlight-camp": SAMPLE_BOOK_SPREADS,
  "desert-astronomer-starlight-camp": SAMPLE_BOOK_SPREADS,
};

/**
 * Dynamically resolves story spreads for a requested book slug or product ID.
 *
 * Returns `undefined` for unknown slugs instead of silently serving the
 * flagship story — showing the wrong book's story is never acceptable.
 *
 * CALLERS MUST HANDLE `undefined`:
 * - Server components: call notFound() (or render the coming-soon state).
 * - Client components: redirect (e.g. to /all-books) or render an error state.
 *
 * NOTE: device file search on the Mac has false negatives, so this caller
 * list was verified by direct import reads and may be incomplete. The changed
 * return type makes any unverified caller a compile-time error under
 * `npm run typecheck` — that is intentional fail-loud behavior.
 * Verified callers (2026-10-13):
 * - web/app/create/preview/page.tsx (client; redirects to /all-books on undefined)
 * - web/app/preview/[bookId]/page.tsx (client; notFound() when undefined/empty)
 * Verified NON-callers: web/app/books/[slug]/page.tsx (+ /ar mirror),
 * web/app/sample-book/**,
 * web/components/SampleBookEngine.tsx (uses SAMPLE_BOOK_SPREADS directly),
 * web/components/seo/SeoLandingView.tsx, web/components/seo/NameHubView.tsx,
 * web/app/books/category/[slug]/page.tsx, web/app/all-books/page.tsx,
 * web/app/create/formats/page.tsx, web/app/create/giftwraps/page.tsx.
 */
export function getBookSpreads(slugOrId: string): StorySpread[] | undefined {
  return BOOK_SPREADS_MAP[slugOrId];
}


