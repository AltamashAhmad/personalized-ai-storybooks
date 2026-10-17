export interface CategoryMeta {
  slug: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  group: 'age' | 'occasion' | 'recipient' | 'theme';
  filterType: string;
  filterValue: string;
  metaTitle: string;
  metaDescription: string;
}

export const CATEGORIES: CategoryMeta[] = [
  // Shop by Age
  {
    slug: '0-3-years',
    titleEn: 'Personalized Books for Babies & Toddlers (0–3 Years)',
    titleAr: 'قصص مخصصة للمواليد والأطفال الصغار (٠–٣ سنوات)',
    subtitleEn: 'From burps to bedtime, discover personalized keepsake books crafted for cuddles, sensory giggles, and lifelong memories.',
    subtitleAr: 'من التهويدة حتى المنام، اكتشف كتباً تذكارية ساحرة صُممت لأجمل لحظات الطفولة الأولى.',
    group: 'age',
    filterType: 'age',
    filterValue: '0-3',
    metaTitle: "Personalized Baby & Toddler Books (Ages 0–3) | PersonalizedTales",
    metaDescription: "Explore heirloom personalized storybooks for babies and toddlers aged 0 to 3. Bilingual Arabic & English with instant 3D preview."
  },
  {
    slug: '3-6-years',
    titleEn: 'Personalized Books for Young Children (3–6 Years)',
    titleAr: 'قصص مخصصة للأطفال (٣–٦ سنوات)',
    subtitleEn: 'Spark imagination, courage, and bedtime wonder with personalized adventures starring your little explorer.',
    subtitleAr: 'أشعل خيال طفلك ببطولات ومغامرات ساحرة تجعله نجم الرواية الأول.',
    group: 'age',
    filterType: 'age',
    filterValue: '3-6',
    metaTitle: "Personalized Children's Books (Ages 3–6) | PersonalizedTales",
    metaDescription: "Delight children aged 3 to 6 with magical personalized adventures across enchanted deserts and starlit skies. Free 3D preview."
  },
  {
    slug: '6-9-years',
    titleEn: 'Personalized Books for Adventurers (6–9 Years)',
    titleAr: 'قصص مخصصة للمغامرين الصغار (٦–٩ سنوات)',
    subtitleEn: 'Empowering chapter stories and cultural heritage quests to foster a lifelong love for reading.',
    subtitleAr: 'مغامرات بطولية ملهمة تعزز الشجاعة والشغف بالقراءة واكتشاف التراث.',
    group: 'age',
    filterType: 'age',
    filterValue: '6-9',
    metaTitle: "Personalized Books for Kids (Ages 6–9) | PersonalizedTales",
    metaDescription: "Inspiring personalized storybooks for children aged 6 to 9. Rich storylines in Modern Standard Arabic and English."
  },
  {
    slug: '9-12-years',
    titleEn: 'Personalized Books for Big Kids & STEM Explorers (9–12 Years)',
    titleAr: 'قصص مخصصة للناشئة وعشاق الفضاء (٩–١٢ سنة)',
    subtitleEn: 'Cosmic space exploration and historical mysteries where your child saves the constellations.',
    subtitleAr: 'رحلات فضاء واستكشاف علمي ملهمة تجعل طفلك يقود مهمة إنقاذ النجوم.',
    group: 'age',
    filterType: 'age',
    filterValue: '9-12',
    metaTitle: "Personalized Books for Big Kids (Ages 9–12) | PersonalizedTales",
    metaDescription: "Exciting space and STEM personalized books for kids aged 9 to 12. Instant digital keepsakes and 300 DPI print editions."
  },

  // Shop by Occasion
  {
    slug: 'birthday',
    titleEn: 'Personalized Birthday Storybooks',
    titleAr: 'قصص أعياد الميلاد المخصصة',
    subtitleEn: 'The unforgettable birthday gift that outshines every toy. Starring your child on their grandest year yet.',
    subtitleAr: 'الهدية الأجمل في عيد ميلاد طفلك، تبقى ذكرى خالدة تفوق جميع الألعاب.',
    group: 'occasion',
    filterType: 'occasion',
    filterValue: 'birthday',
    metaTitle: "Personalized Birthday Books for Kids | PersonalizedTales",
    metaDescription: "Give the ultimate personalized birthday gift. Starring the birthday star with custom dedication and free 3D virtual preview."
  },
  {
    slug: 'new-baby',
    titleEn: 'Personalized Newborn & Baby Keepsakes',
    titleAr: 'هدايا وكتب تذكارية للمواليد الجدد',
    subtitleEn: 'Celebrate the miracle of a new arrival with an heirloom keepsake book that families cherish forever.',
    subtitleAr: 'احتفِ بقدوم طفلك إلى الحياة بكتاب تذكاري خالد يروي قصة ليلة مولده السعيدة.',
    group: 'occasion',
    filterType: 'occasion',
    filterValue: 'newborn',
    metaTitle: "Personalized Newborn Gifts & Books | PersonalizedTales",
    metaDescription: "Meaningful personalized newborn keepsake books for babies, parents, and grandparents in UAE and GCC."
  },
  {
    slug: 'bedtime',
    titleEn: 'Personalized Bedtime & Calming Rhymes',
    titleAr: 'قصص النوم والتهويدات المخصصة للأطفال',
    subtitleEn: 'Gentle lyrical verses and soothing desert moonlight to help little dreamers drift peacefully to sleep.',
    subtitleAr: 'أشعار رقيقة دافئة تحت ضوء قمر الصحراء لتنويم الأطفال بأمان وطمأنينة.',
    group: 'occasion',
    filterType: 'occasion',
    filterValue: 'bedtime',
    metaTitle: "Personalized Bedtime Stories for Kids | PersonalizedTales",
    metaDescription: "Calming bedtime personalized storybooks featuring your child's name in soothing rhymes."
  },
  {
    slug: 'ramadan-eid',
    titleEn: 'Personalized Ramadan & Eid Keepsake Books',
    titleAr: 'قصص رمضان والعيد المخصصة للأطفال',
    subtitleEn: 'Celebrate the blessings of the holy month with inspiring adventures of generosity, kindness, and festive joy.',
    subtitleAr: 'عش فرحة العيد وروحانية الشهر الفضيل بمغامرات مخصصة تعلم الطفل قيم الكرم والمحبة.',
    group: 'occasion',
    filterType: 'occasion',
    // Matches first-ramadan-lantern precisely via its 'ramadan' occasion
    // (getMatchingProducts: p.occasions.includes(filterValue)).
    filterValue: 'ramadan',
    metaTitle: "Personalized Ramadan & Eid Books for Children | PersonalizedTales",
    metaDescription: "Beautiful personalized storybooks celebrating Ramadan and Eid for families in Dubai, Abu Dhabi, and Saudi Arabia."
  },

  // Shop by Recipient
  {
    slug: 'for-siblings',
    titleEn: 'Personalized Storybooks for Siblings & Twins',
    titleAr: 'قصص مخصصة للأخوة والتوائم',
    subtitleEn: 'Two heroes, one unforgettable adventure! Celebrate the magical bond between siblings and twins together.',
    subtitleAr: 'بطلان في مغامرة واحدة! احتفِ برابطة الأخوة العميقة بين أطفالك في قصة ملحمية مشتركة.',
    group: 'recipient',
    filterType: 'recipient',
    filterValue: 'twins',
    metaTitle: "Personalized Storybooks for Siblings & Twins | PersonalizedTales",
    metaDescription: "The premier personalized book starring two siblings or twins together. Perfect for brothers and sisters."
  },
  {
    slug: 'for-grandparents',
    titleEn: 'Personalized Keepsakes from Grandparents',
    titleAr: 'كتب وهدايا تذكارية من الأجداد والجدات',
    subtitleEn: 'Bridging generations with boundless love. A priceless keepsake from grandma and grandpa to their beloved grandchild.',
    subtitleAr: 'رسائل حب ودفء من الجد والجدة إلى حفيدهم الغالي، تظل محفوظة جيلاً بعد جيل.',
    group: 'recipient',
    filterType: 'recipient',
    filterValue: 'grandchildren',
    metaTitle: "Personalized Books for Grandchildren | PersonalizedTales",
    metaDescription: "Heartfelt personalized storybooks gifted with love by grandparents. Heirloom quality with custom dedication."
  }
];

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
