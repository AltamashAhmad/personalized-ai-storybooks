/**
 * Programmatic SEO Taxonomy & Keyword Architecture
 * Powers programmatic landing pages capturing zero-competition long-tail
 * search traffic across the UAE (PHASE_ONE_UAE_ONLY).
 */

import { buildCanonicalUrl, buildSeoPageJsonLd as buildSeoPageJsonLdCore } from './schema';

export interface SEOName {
  slug: string;
  nameEn: string;
  nameAr: string;
  gender: 'boy' | 'girl';
  origin: 'emirati' | 'saudi' | 'kuwaiti' | 'qatari' | 'arab' | 'global';
  meaningEn: string;
  meaningAr: string;
  suggestedBookSlug?: string;
  siblingSlugs?: string[];
  aliases?: string[];
  sampleVersesEn?: string[];
  sampleVersesAr?: string[];
  dedicationSampleEn?: string;
  dedicationSampleAr?: string;
}

export interface SEOOccasion {
  slug: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
}

/**
 * Canonical Top 12 UAE Child Names Matrix
 * Verified against KHDA, ADEK, and Gulf civil registry trends (Emirati, Arab, and Top Expat names).
 */
export const TOP_UAE_CHILD_NAMES: SEOName[] = [
  {
    slug: 'zayed',
    nameEn: 'Zayed',
    nameAr: 'زايد',
    gender: 'boy',
    origin: 'emirati',
    meaningEn: 'One who increases in goodness, generosity, and noble grace',
    meaningAr: 'الذي يزيد في الخير والكرم والعطاء النبيل',
    suggestedBookSlug: 'the-secret-of-the-starlit-dunes',
    siblingSlugs: ['rashid', 'hamdan', 'fatima', 'omar', 'ali'],
    sampleVersesEn: [
      'Across the rolling dunes where golden starlight gleams,',
      'Brave Zayed journeys far to find the land of desert dreams.',
    ],
    sampleVersesAr: [
      'فَوْقَ رِمَالِ الصَّحْرَاءِ الذَّهَبِيَّةِ وَتَحْتَ ضِيَاءِ النُّجُومِ،',
      'انْطَلَقَ زَايِدُ الشُّجَاعُ فِي رِحْلَةٍ تَفِيضُ بِالْخَيْرِ وَالْعُلُومِ.',
    ],
    dedicationSampleEn: 'To our dearest Zayed, may you always lead with wisdom, courage, and a generous heart. With endless love, Mama & Baba.',
    dedicationSampleAr: 'إلى حبيبنا زايد، نرجو لك عمراً مليئاً بالحكمة والشهامة والخير العميم. بكل الحب، ماما وبابا.',
  },
  {
    slug: 'fatima',
    nameEn: 'Fatima',
    nameAr: 'فاطمة',
    gender: 'girl',
    origin: 'arab',
    meaningEn: 'Pure, noble soul, nurturing and virtuous',
    meaningAr: 'السيدة العفيفة الطاهرة، الحانية ذات المقام الرفيع',
    suggestedBookSlug: 'the-child-who-found-the-golden-falcon',
    siblingSlugs: ['maryam', 'zayed', 'sarah', 'layla', 'hamdan'],
    aliases: ['fatimah'],
    sampleVersesEn: [
      'Through skies of pearl and royal gold, the falcon took to flight,',
      "Guided by sweet Fatima's smile, illuminating the desert night.",
    ],
    sampleVersesAr: [
      'بَيْنَ عُطُورِ الْيَاسَمِينَ وَسَمَاءِ دُبَيَّ الزَّرْقَاءِ،',
      'تَبِعَتْ فَاطِمَةُ الصَّقْرَ الذَّهَبِيَّ إِلَى عَالَمِ النَّقَاءِ وَالضِّيَاءِ.',
    ],
    dedicationSampleEn: 'For precious Fatima, our shining light. May your journey be blessed with purity, joy, and gentle grace.',
    dedicationSampleAr: 'إلى غاليتنا فاطمة، زهرة قلوبنا النقية. نهديكِ هذه القصة لتتذكري دوماً كم أنتِ محبوبة ومميزة.',
  },
  {
    slug: 'hamdan',
    nameEn: 'Hamdan',
    nameAr: 'حمدان',
    gender: 'boy',
    origin: 'emirati',
    meaningEn: 'One who constantly praises and is praiseworthy',
    meaningAr: 'الكثير الحمد والثناء والشكر، ذو الخصال المحمودة',
    suggestedBookSlug: 'the-secret-of-the-starlit-dunes',
    siblingSlugs: ['zayed', 'rashid', 'omar', 'ali', 'fatima'],
    sampleVersesEn: [
      'With every step upon the dunes beneath the velvet sky,',
      'Hamdan discovered hidden stars that sparkled bright and high.',
    ],
    sampleVersesAr: [
      'مَعَ كُلِّ خُطْوَةٍ فَوْقَ رِمَالِ الْوَاحَةِ تَحْتَ قَبَسِ السَّمَاءِ،',
      'اكْتَشَفَ حَمْدَانُ نُجُومَ الْعِزِّ وَالشَّهَامَةِ وَالْوَفَاءِ.',
    ],
    dedicationSampleEn: 'To our beloved Hamdan, may your life always be filled with gratitude, honor, and great adventures.',
    dedicationSampleAr: 'إلى حبيبنا حمدان، دمتَ محمود الخصال نبيلاً كريماً يملأ حياتنا بهجة وفخراً.',
  },
  {
    slug: 'maryam',
    nameEn: 'Maryam',
    nameAr: 'مريم',
    gender: 'girl',
    origin: 'arab',
    meaningEn: 'Beloved, elevated, symbol of grace and purity',
    meaningAr: 'السيدة العفيفة رفيعة القدر، رمز الطهر والجمال',
    suggestedBookSlug: 'the-child-who-found-the-golden-falcon',
    siblingSlugs: ['fatima', 'sarah', 'layla', 'zayed', 'noah'],
    aliases: ['mariam'],
    sampleVersesEn: [
      "A golden feather fell to earth before sweet Maryam's feet,",
      'Leading her to a magical realm where wonder and courage meet.',
    ],
    sampleVersesAr: [
      'تَهَادَتْ رِيشَةُ الصَّقْرِ بَيْنَ يَدَيْ مَرْيَمَ كَالضِّيَاءِ،',
      'لِتَبْدَأَ حِكَايَةَ الْعِزِّ فِي أَرْضِ الْخَيْرِ وَالنَّمَاءِ.',
    ],
    dedicationSampleEn: 'For Maryam, our little miracle. Walk with pride, live with love, and let your heart always soar.',
    dedicationSampleAr: 'إلى قرة عيننا مريم، نهديكِ هذه المغامرة لتكوني دوماً شمس الدار وعنوان الطيبة والنقاء.',
  },
  {
    slug: 'rashid',
    nameEn: 'Rashid',
    nameAr: 'راشد',
    gender: 'boy',
    origin: 'emirati',
    meaningEn: 'Rightly guided, wise, mature and discerning leader',
    meaningAr: 'المهتدي إلى الحق، الحكيم ذو الرأي السديد والشهامة',
    suggestedBookSlug: 'the-secret-of-the-starlit-dunes',
    siblingSlugs: ['zayed', 'hamdan', 'ali', 'omar', 'fatima'],
    sampleVersesEn: [
      'The desert whispers ancient tales to those who listen well,',
      'And wise young Rashid unlocked the secrets no one else could tell.',
    ],
    sampleVersesAr: [
      'هَمَسَتْ رِمَالُ اللِّيوَا لِرَاشِدَ بِأَسْرَارِ الشَّجَاعَةِ وَالْهُدَى،',
      'فَقَادَ خُطَاهُ نَحْوَ مَجْدٍ يَبْقَى شَامِخاً عَلَى الْمَدَى.',
    ],
    dedicationSampleEn: 'To dearest Rashid, may wisdom and leadership light your path wherever your adventures take you.',
    dedicationSampleAr: 'إلى راشد الغالي، كن دوماً رشيد الرأي حكيم الفؤاد، فخراً لعائلتك ووطنك.',
  },
  {
    slug: 'noah',
    nameEn: 'Noah',
    nameAr: 'نوح',
    gender: 'boy',
    origin: 'global',
    meaningEn: 'Rest, peace, comfort and tranquil sanctuary',
    meaningAr: 'الراحة والهدوء والسكينة والسلام الدائم',
    suggestedBookSlug: 'the-secret-of-the-starlit-dunes',
    siblingSlugs: ['liam', 'olivia', 'sarah', 'zayed', 'layla'],
    sampleVersesEn: [
      'Across the tranquil sea of dunes where twilight shadows fall,',
      'Gentle Noah brought quiet peace and kindness to them all.',
    ],
    sampleVersesAr: [
      'عَبْرَ أَمْوَاجِ الرِّمَالِ الْهَادِئَةِ حَيْثُ يَسْكُنُ الْمَسَاءُ،',
      'نَشَرَ نُوحٌ رُوحَ السَّكِينَةِ وَالْمَحَبَّةِ وَالصَّفَاءِ.',
    ],
    dedicationSampleEn: 'For Noah, whose sweet laughter brings calmness and joy to our home every single day.',
    dedicationSampleAr: 'إلى حبيبنا نوح، يا من جئت بسلام الروح وسعادة الأيام، نهديك هذه الذكرى الخالدة.',
  },
  {
    slug: 'olivia',
    nameEn: 'Olivia',
    nameAr: 'أوليفيا',
    gender: 'girl',
    origin: 'global',
    meaningEn: 'Olive branch of peaceful beauty, kindness, and harmony',
    meaningAr: 'غصن الزيتون، رمز السلام والجمال والتناغم',
    suggestedBookSlug: 'the-child-who-found-the-golden-falcon',
    siblingSlugs: ['noah', 'liam', 'sarah', 'layla', 'fatima'],
    sampleVersesEn: [
      'With petals soft and starry crown beneath the Arabian sky,',
      'Olivia danced with falcon wings as gentle winds swept by.',
    ],
    sampleVersesAr: [
      'تَحْتَ سَمَاءِ الإِمَارَاتِ الْمُتَلأْلِئَةِ بِالنُّجُومِ وَالْأَمَلِ،',
      'حَلَّقَتْ أُولِيفْيَا مَعَ الصَّقْرِ فِي رِحْلَةِ الْحُبِّ وَالْعَمَلِ.',
    ],
    dedicationSampleEn: 'To our darling Olivia, may your world always be filled with friendship, peace, and wonder.',
    dedicationSampleAr: 'إلى صغيرتنا أوليفيا، غصن السلام وريحانة البيت، دمتِ فرحاً ونوراً يضيء دروبنا.',
  },
  {
    slug: 'liam',
    nameEn: 'Liam',
    nameAr: 'ليام',
    gender: 'boy',
    origin: 'global',
    meaningEn: 'Resolute protector and strong-willed guardian',
    meaningAr: 'الحامي القوي ذو العزيمة الصلبة والإرادة الشجاعة',
    suggestedBookSlug: 'the-secret-of-the-starlit-dunes',
    siblingSlugs: ['noah', 'olivia', 'zayed', 'omar', 'sarah'],
    sampleVersesEn: [
      'Strong of heart and swift of stride across the golden plain,',
      'Brave Liam guarded ancient stars that never shall fade again.',
    ],
    sampleVersesAr: [
      'بِقَلْبٍ جَسُورٍ وَعَزِيمَةٍ لَا تَلِينُ فَوْقَ الرِّمَالِ،',
      'حَمَى لِيَامُ كُنُوزَ الصَّحْرَاءِ بِالشَّجَاعَةِ وَالْكَمَالِ.',
    ],
    dedicationSampleEn: 'To our brave Liam, always stand strong, be kind to everyone, and chase your grandest dreams.',
    dedicationSampleAr: 'إلى بطلنا ليام، كن دوماً حامياً للحق شجاع الفؤاد، محاطاً بحبنا الذي لا ينتهي.',
  },
  {
    slug: 'sarah',
    nameEn: 'Sarah',
    nameAr: 'سارة',
    gender: 'girl',
    origin: 'arab',
    meaningEn: 'Joyful princess who brings radiant happiness to hearts',
    meaningAr: 'الأميرة البهيجة، مفرحة القلوب ومصدر السرور',
    suggestedBookSlug: 'the-child-who-found-the-golden-falcon',
    siblingSlugs: ['maryam', 'fatima', 'layla', 'olivia', 'noah'],
    aliases: ['sara'],
    sampleVersesEn: [
      'A joyful princess crowned with light where desert blossoms bloom,',
      'Sweet Sarah chased the falcon high and banished every gloom.',
    ],
    sampleVersesAr: [
      'أَمِيرَةُ الْفَرَحِ الَّتِي تُشْرِقُ كَالشَّمْسِ فِي الصَّبَاحِ،',
      'انْطَلَقَتْ سَارَةُ مَعَ الصَّقْرِ تَحْمِلُ بَشَائِرَ النَّجَاحِ.',
    ],
    dedicationSampleEn: 'To dearest Sarah, our radiant princess. You bring joy and sunshine to every single moment of our lives.',
    dedicationSampleAr: 'إلى أميرتنا سارة، مفرحة القلوب وسر ابتسامتنا. نهديكِ هذه الحكاية لتبقي دوماً نجمة البيت الساطعة.',
  },
  {
    slug: 'omar',
    nameEn: 'Omar',
    nameAr: 'عمر',
    gender: 'boy',
    origin: 'arab',
    meaningEn: 'Flourishing, long-lived, symbol of justice and vitality',
    meaningAr: 'صاحب العمر المديد والعدل والهمة العالية',
    suggestedBookSlug: 'the-secret-of-the-starlit-dunes',
    siblingSlugs: ['ali', 'zayed', 'rashid', 'hamdan', 'fatima'],
    sampleVersesEn: [
      'With noble stride and steady hand through dunes of amber light,',
      'Fair Omar solved the mystery that lit the Dubai night.',
    ],
    sampleVersesAr: [
      'بِعَزْمٍ أَصِيلٍ وَعَدْلٍ يُنِيرُ دُرُوبَ الزَّمَانِ،',
      'سَارَ عُمَرُ الشُّجَاعُ فِي مَغَامِرَةِ الْفَخْرِ وَالأَمَانِ.',
    ],
    dedicationSampleEn: 'To our wonderful Omar, may your days be blessed with vitality, righteousness, and boundless joy.',
    dedicationSampleAr: 'إلى عمر الحبيب، جعل الله عمرك مديداً بالصحة والبركة والخير، فخورون بك دائماً.',
  },
  {
    slug: 'ali',
    nameEn: 'Ali',
    nameAr: 'علي',
    gender: 'boy',
    origin: 'arab',
    meaningEn: 'High, exalted, elevated in honor and noble standing',
    meaningAr: 'الشريف الرفيع، صاحب المنزلة السامية والشجاعة',
    suggestedBookSlug: 'the-secret-of-the-starlit-dunes',
    siblingSlugs: ['omar', 'zayed', 'rashid', 'hamdan', 'maryam'],
    sampleVersesEn: [
      'High on the crest of golden dunes where desert falcons soar,',
      "Brave Ali climbed the starlit heights to open wonder's door.",
    ],
    sampleVersesAr: [
      'عَلَى قِمَمِ الْعِزِّ وَالْمَجْدِ فَوْقَ رِمَالِ الذَّهَبِ،',
      'عَلَا اسْمُ عَلِيٍّ بِالشَّجَاعَةِ وَالشَّهَامَةِ وَالْأَدَبِ.',
    ],
    dedicationSampleEn: 'To our dearest Ali, always aim high and let your noble heart lead the way. We love you beyond words.',
    dedicationSampleAr: 'إلى علي الغالي، صاحب المقام الرفيع والقلب الطيب، نهديك قصة بطولتك لتبقى دوماً في الأعالي.',
  },
  {
    slug: 'layla',
    nameEn: 'Layla',
    nameAr: 'ليلى',
    gender: 'girl',
    origin: 'arab',
    meaningEn: 'Enchanting nocturnal beauty, star of poetic wonder',
    meaningAr: 'الجمال الساحر، نجمة الليالي الشاعرية والهدوء',
    suggestedBookSlug: 'the-child-who-found-the-golden-falcon',
    siblingSlugs: ['sarah', 'maryam', 'fatima', 'olivia', 'zayed'],
    aliases: ['laila'],
    sampleVersesEn: [
      'Beneath the silver desert moon where gentle breezes play,',
      'Fair Layla found the starlit trail that turned the night to day.',
    ],
    sampleVersesAr: [
      'تَحْتَ ضِيَاءِ الْقَمَرِ الْفِضِّيِّ فِي لَيَالِي الأُنْسِ وَالسَّمَرِ،',
      'أَشْرَقَتْ لَيْلَى بِسِحْرِهَا وَجَمَالِهَا كَأَجْمَلِ الصُّوَرِ.',
    ],
    dedicationSampleEn: 'To our sweet Layla, a star that illuminates our darkest night. May your life be filled with poetry and magic.',
    dedicationSampleAr: 'إلى غاليتنا ليلى، يا قمر ليالينا ونور عيوننا. نهديكِ هذه القصة لتتذكري دوماً سحر روحك وجمالك.',
  },
];

/**
 * Normalizes slug input to handle 'for-[name]', uppercase characters, and aliases.
 * Example: 'for-zayed' -> 'zayed', 'for-sara' -> 'sarah', 'for-FATIMA' -> 'fatima'.
 */
export function normalizeNameSlug(slug: string): string {
  if (!slug) return '';
  const clean = slug.toLowerCase().trim().replace(/^for-/, '');
  if (clean === 'sara') return 'sarah';
  if (clean === 'fatimah') return 'fatima';
  if (clean === 'mariam') return 'maryam';
  if (clean === 'laila') return 'layla';
  return clean;
}

/**
 * Retrieves a child name configuration by slug or alias.
 */
export function getTopUaeChildName(slug: string): SEOName | undefined {
  const normalized = normalizeNameSlug(slug);
  return (
    TOP_UAE_CHILD_NAMES.find(
      (n) => n.slug === normalized || (n.aliases && n.aliases.includes(normalized))
    ) ||
    GULF_AND_GLOBAL_NAMES.find(
      (n) => n.slug === normalized || (n.aliases && n.aliases.includes(normalized))
    )
  );
}

/**
 * Full Gulf & Global Names Collection (Backwards compatible union)
 */
export const GULF_AND_GLOBAL_NAMES: SEOName[] = [
  ...TOP_UAE_CHILD_NAMES,

  // Additional Emirati Heritage Names
  { slug: 'mansoor', nameEn: 'Mansoor', nameAr: 'منصور', gender: 'boy', origin: 'emirati', meaningEn: 'Victorious, assisted by divine grace', meaningAr: 'الظافر المنتصر بعون الله', suggestedBookSlug: 'the-secret-of-the-starlit-dunes' },
  { slug: 'saif', nameEn: 'Saif', nameAr: 'سيف', gender: 'boy', origin: 'emirati', meaningEn: 'Sword of honor and courage', meaningAr: 'رمز الشجاعة والقوة والشرف', suggestedBookSlug: 'the-secret-of-the-starlit-dunes' },
  { slug: 'noura', nameEn: 'Noura', nameAr: 'نورة', gender: 'girl', origin: 'emirati', meaningEn: 'Radiant light, illumination', meaningAr: 'الضوء الساطع والإشراق', suggestedBookSlug: 'the-child-who-found-the-golden-falcon' },
  { slug: 'shamma', nameEn: 'Shamma', nameAr: 'شما', gender: 'girl', origin: 'emirati', meaningEn: 'Noble-minded, high-stature, honorable', meaningAr: 'رفيعة القدر، العالية الشأن', suggestedBookSlug: 'the-child-who-found-the-golden-falcon' },
  { slug: 'latifa', nameEn: 'Latifa', nameAr: 'لطيفة', gender: 'girl', origin: 'emirati', meaningEn: 'Kind, gentle, refined and elegant', meaningAr: 'الرقيقة، الكريمة، الودودة', suggestedBookSlug: 'the-child-who-found-the-golden-falcon' },

  // Regional Favorite Names
  { slug: 'mohammed', nameEn: 'Mohammed', nameAr: 'محمد', gender: 'boy', origin: 'saudi', meaningEn: 'The praised one, most beloved', meaningAr: 'المحمود الخصال، صاحب المقام الرفيع', suggestedBookSlug: 'the-secret-of-the-starlit-dunes' },
  { slug: 'abdullah', nameEn: 'Abdullah', nameAr: 'عبدالله', gender: 'boy', origin: 'saudi', meaningEn: 'Servant of the Divine, pure devotion', meaningAr: 'العابد الخالص، خادم الرحمن', suggestedBookSlug: 'the-secret-of-the-starlit-dunes' },
  { slug: 'abdulaziz', nameEn: 'Abdulaziz', nameAr: 'عبدالعزيز', gender: 'boy', origin: 'saudi', meaningEn: 'Servant of the Mighty and Glorious', meaningAr: 'خادم العزيز ذو القوة والشرف', suggestedBookSlug: 'the-secret-of-the-starlit-dunes' },
  { slug: 'salman', nameEn: 'Salman', nameAr: 'سلمان', gender: 'boy', origin: 'saudi', meaningEn: 'Peaceful, safe from harm, loyal', meaningAr: 'السالم من كل عيب، المخلص', suggestedBookSlug: 'the-secret-of-the-starlit-dunes' },
  { slug: 'saud', nameEn: 'Saud', nameAr: 'سعود', gender: 'boy', origin: 'saudi', meaningEn: 'Fortunate, bearer of good fortune and joy', meaningAr: 'صاحب الحظ السعيد واليمن والبركة', suggestedBookSlug: 'the-secret-of-the-starlit-dunes' },
  { slug: 'fahad', nameEn: 'Fahad', nameAr: 'فهد', gender: 'boy', origin: 'saudi', meaningEn: 'Cheetah/panther, symbol of swift agility and bravery', meaningAr: 'الفهد، رمز الشجاعة والسرعة والشهامة', suggestedBookSlug: 'the-secret-of-the-starlit-dunes' },
  { slug: 'reem', nameEn: 'Reem', nameAr: 'ريم', gender: 'girl', origin: 'saudi', meaningEn: 'Graceful white gazelle of the Arabian dunes', meaningAr: 'الظبي الأبيض الجميل في الرمال', suggestedBookSlug: 'the-child-who-found-the-golden-falcon' },
  { slug: 'dana', nameEn: 'Dana', nameAr: 'دانة', gender: 'girl', origin: 'saudi', meaningEn: 'Precious luminous sea pearl', meaningAr: 'حبة اللؤلؤ الكبيرة النادرة', suggestedBookSlug: 'the-child-who-found-the-golden-falcon' },

  // Additional Expat Names
  { slug: 'leo', nameEn: 'Leo', nameAr: 'ليو', gender: 'boy', origin: 'global', meaningEn: 'Brave lion, noble heart', meaningAr: 'الأسد الشجاع ذو القلب النبيل', suggestedBookSlug: 'the-secret-of-the-starlit-dunes' },
  { slug: 'oliver', nameEn: 'Oliver', nameAr: 'أوليفر', gender: 'boy', origin: 'global', meaningEn: 'Olive tree bearer, symbol of lasting peace', meaningAr: 'غصن الزيتون، رمز السلام الدائم', suggestedBookSlug: 'the-secret-of-the-starlit-dunes' },
  { slug: 'adam', nameEn: 'Adam', nameAr: 'آدم', gender: 'boy', origin: 'global', meaningEn: 'Created of the earth, noble first soul', meaningAr: 'سيد الإنسانية، المتصل بالأرض', suggestedBookSlug: 'the-secret-of-the-starlit-dunes' },
  { slug: 'mia', nameEn: 'Mia', nameAr: 'ميا', gender: 'girl', origin: 'global', meaningEn: 'Mine, deeply beloved cherish', meaningAr: 'المحبوبة الغالية، درة القلب', suggestedBookSlug: 'the-child-who-found-the-golden-falcon' },
  { slug: 'emma', nameEn: 'Emma', nameAr: 'إيما', gender: 'girl', origin: 'global', meaningEn: 'Universal strength, whole and complete', meaningAr: 'الشاملة، ذات القوة والعزيمة', suggestedBookSlug: 'the-child-who-found-the-golden-falcon' },
  { slug: 'sophia', nameEn: 'Sophia', nameAr: 'صوفيا', gender: 'girl', origin: 'global', meaningEn: 'Divine wisdom and radiant clarity', meaningAr: 'الحكمة النقية والنور الساطع', suggestedBookSlug: 'the-child-who-found-the-golden-falcon' },
  { slug: 'charlotte', nameEn: 'Charlotte', nameAr: 'شارلوت', gender: 'girl', origin: 'global', meaningEn: 'Free-spirited, noble and courageous', meaningAr: 'الحرة النبيلة، ذات البأس', suggestedBookSlug: 'the-child-who-found-the-golden-falcon' },
];

export const SEO_OCCASIONS: SEOOccasion[] = [
  {
    slug: 'saudi-national-day',
    titleEn: 'Saudi National Day Personalized Keepsake Book',
    titleAr: 'قصة اليوم الوطني السعودي المخصصة بالاسم',
    descriptionEn: 'Celebrate Saudi National Day (Sept 23) with a patriotic heirloom story of courage, heritage, and pride across Diriyah, AlUla, and the Kingdom.',
    descriptionAr: 'احتفل باليوم الوطني السعودي (23 سبتمبر) مع قصة وطنية تذكارية فاخرة تخلد فخر طفلك بتراث المملكة من الدرعية إلى العلا.',
  },
  {
    slug: 'saudi-founding-day',
    titleEn: 'Saudi Founding Day Children Storybook',
    titleAr: 'قصة يوم التأسيس السعودي للأطفال',
    descriptionEn: 'Journey back 300 years to the foundation of the Kingdom in traditional Bisht and Thobe, learning values of loyalty and courage.',
    descriptionAr: 'رحلة مشوقة عبر 300 عام تروي قصة التأسيس والشجاعة وأصالة الأجداد بالزي التقليدي الفاخر.',
  },
  {
    slug: 'gargeean-haq-al-laila',
    titleEn: 'Gargee’an & Haq Al Laila Keepsake Book',
    titleAr: 'قصة قرقيعان وحق الليلة وقرنقشوه بالاسم',
    descriptionEn: 'The traditional mid-Ramadan children’s festival gift across the Emirates and Arabian Gulf.',
    descriptionAr: 'الهدية الأجمل لمهرجان القرقيعان وحق الليلة في منتصف رمضان، تجمع الأهازيج الشعبية وفرحة الصغار.',
  },
  {
    slug: 'first-birthday',
    titleEn: 'First Birthday Gift Book',
    titleAr: 'هدية كتاب عيد الميلاد الأول',
    descriptionEn: 'Commemorate baby’s very first milestone with a personalized heirloom storybook.',
    descriptionAr: 'خلد ذكرى أول عام لطفلك مع قصة تذكارية فاخرة تحمل اسمه.',
  },
  {
    slug: 'ramadan-eid',
    titleEn: 'Ramadan & Eid Mubarak Keepsake Book',
    titleAr: 'كتاب تذكاري لرمضان والعيد المبارك',
    descriptionEn: 'Inspiring values of generosity, family, and light for holy month celebrations across the UAE.',
    descriptionAr: 'قيم العطاء والمحبة وصلة الرحم في قصة ساحرة لأيام العيد المبارك.',
  },
  {
    slug: 'newborn-aqiqah',
    titleEn: 'Newborn & Aqiqah Keepsake Gift Book',
    titleAr: 'هدية استقبال المواليد والعقيقة الفاخرة',
    descriptionEn: 'The ultimate welcome-to-the-world gift for baby showers, hospital receptions, and Aqiqah celebrations.',
    descriptionAr: 'أرقى هدية تذكارية لاستقبال المولود الجديد وتوزيعات العقيقة الفخمة التي تبقى للأبد.',
  },
  {
    slug: 'bedtime',
    titleEn: 'Personalized Bedtime Storybook',
    titleAr: 'قصة قبل النوم المخصصة بالاسم',
    descriptionEn: 'A soothing lyrical lullaby adventure guiding your little dreamer to sleep.',
    descriptionAr: 'قصة شعرية مهدئة ترافق صغيرك إلى نوم هادئ وأحلام سعيدة.',
  },
];

/**
 * Standard Schema.org JSON-LD structured data generators for UAE market
 */
export function generateBookSchemaJSONLD(
  name: SEOName,
  currencyCode: 'AED' | 'USD' = 'AED',
  price: string = '49.00',
  baseUrl: string = 'https://personalizedtales.com'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Personalized Storybook for ${name.nameEn} (Bilingual Arabic & English)`,
    image: [`${baseUrl}/final_book_mockup_1788701924626.jpg`],
    description: `An heirloom-grade personalized storybook starring ${name.nameEn}. Features rhyming English and vowel-marked Arabic verses with stunning 3D interactive flipbook and 300 DPI print keepsake. Delivered across all 7 Emirates in the UAE.`,
    brand: {
      '@type': 'Brand',
      name: 'PersonalizedTales',
    },
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/personalized-books/for-${name.slug}`,
      priceCurrency: currencyCode,
      price: price,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
    },
  };
}

export {
  buildCanonicalUrl,
  buildHreflangAlternates,
  CANONICAL_BASE,
  DEFAULT_UAE_FAQS,
} from './schema';
export type {
  BuildSeoPageJsonLdOptions,
  SeoBreadcrumbItem,
  SeoFaqItem,
} from './schema';

/**
 * Schema.org multi-entity graph builder (backwards-compatible entry point).
 *
 * Delegates to the canonical builder in ./schema.ts so both entry points emit
 * identical markup: default UAE FAQs, trailing-slash stripping, and the
 * environment-aware canonical base. The option types are structurally
 * identical to BuildSeoPageJsonLdOptions.
 *
 * Behavioral note: callers that previously omitted `faqs` (and got no
 * FAQPage entity) now receive the default UAE FAQs, matching schema.ts.
 */
export function buildSeoPageJsonLd(options: {
  pageUrl: string;
  name: string;
  description: string;
  breadcrumbs: { name: string; url: string }[];
  faqs?: { q: string; a: string }[];
  lowPrice?: string;
  highPrice?: string;
  ratingValue?: string;
  reviewCount?: string;
}) {
  return buildSeoPageJsonLdCore(options);
}

