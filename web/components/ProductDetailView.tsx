'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { Eye, Gift, Ruler, ShoppingBag, Sparkles, Star, Truck } from 'lucide-react';
import CountrySelectorModal from '@/components/CountrySelectorModal';
import ProductSpecsDrawer from '@/components/ProductSpecsDrawer';
import StoreHeader from '@/components/StoreHeader';
import Footer from '@/components/Footer';
import { ProductGalleryItem, ProductStory } from '@/config/products';
import { validateProtagonistName } from '@/config/sampleBookData';
import { useCart } from '@/lib/context/CartContext';
import { useCountry } from '@/lib/context/CountryContext';
import CharacterBuilderStep, { CoStarConfig } from './CharacterBuilderStep';
import CoverFormatSelector from './CoverFormatSelector';
import DedicationStep from './DedicationStep';
import ReviewsSection from './ReviewsSection';
import { FORMAT_PRICES } from '@/lib/utils/pricing';
import { DIGITAL_ONLY_LAUNCH } from '@/config/launch';

export { CharacterBuilderStep, DedicationStep, CoverFormatSelector, ReviewsSection };

interface Props {
  product: ProductStory;
  initialLang?: 'en' | 'ar';
  prefilledChildName?: string;
}

export default function ProductDetailView({ product, initialLang = 'en', prefilledChildName = '' }: Props) {
  const { language } = useCountry();
  const { addItem, setAddon, openMiniCart } = useCart();
  const isAr = initialLang ? initialLang === 'ar' : language === 'ar';

  const [childName, setChildName] = useState(prefilledChildName || (isAr ? 'زَايِد' : 'Zayed'));
  const [gender, setGender] = useState<'boy' | 'girl'>('boy');
  const [skinTone, setSkinTone] = useState('olive'), [hairStyle, setHairStyle] = useState('short-waves');
  const [hairColor, setHairColor] = useState('jet-black'), [glasses, setGlasses] = useState(false), [hearingAid, setHearingAid] = useState(false);
  const [coStar, setCoStar] = useState<CoStarConfig>({ enabled: false, role: 'dad', name: isAr ? 'بَابَا' : 'Baba', beardStyle: 'neat-trimmed' });
  const [dedication, setDedication] = useState(
    isAr
      ? 'إِلَى بَطَلِنَا الصَّغِيرِ زَايِد،\nلِتَكُنْ شَجَاعَتُكَ مِثْلَ صُقُورِ الصَّحْرَاءِ، وَأَحْلَامُكَ وَاسِعَةً كَسَمَائِهَا المُرَصَّعَةِ بِالنُّجُومِ. نُحِبُّكَ حُبّاً لَا يَنْتَهِي!'
      : 'For our beloved adventurer Zayed,\nMay your courage always fly as high as the golden falcon, and your heart shine as bright as the desert stars.'
  );
  const [giverName, setGiverName] = useState(isAr ? 'مَامَا وَبَابَا' : 'Mama & Baba'), [hasPhoto, setHasPhoto] = useState(false);
  const [coverColor, setCoverColor] = useState('desert-gold'), [coverFormat, setCoverFormat] = useState<'softcover' | 'hardcover' | 'layflat' | 'digital'>(DIGITAL_ONLY_LAUNCH ? 'digital' : 'hardcover');
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0), [addons, setAddons] = useState(DIGITAL_ONLY_LAUNCH ? { giftBox: false, coloringBook: false, audioKeepsake: false } : { giftBox: true, coloringBook: false, audioKeepsake: true });
  const [isSpecsDrawerOpen, setIsSpecsDrawerOpen] = useState(false), [activeReviewPhoto, setActiveReviewPhoto] = useState<string | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'photos' | 'hardcover' | 'layflat'>('all'), [openFaqId, setOpenFaqId] = useState<string | null>('story-qa-1'), [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowStickyBar(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!activeReviewPhoto) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveReviewPhoto(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeReviewPhoto]);

  // Prices come from the shared pricing authority — never hardcoded here.
  const currentPriceAED = FORMAT_PRICES[coverFormat] +
    (addons.giftBox ? 39 : 0) + (addons.coloringBook ? 19 : 0) + (addons.audioKeepsake ? 19 : 0);

  // An explicitly-empty galleryImages array is truthy, so normalize to the
  // cover fallback first; the guards below keep activeImage non-null for the
  // strict index-access check (placed after all hooks so hook order is stable).
  const galleryImages: ProductGalleryItem[] = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [
      { id: 'cover', labelEn: 'Cover', labelAr: 'الغِلَافُ', src: product.coverImage, type: 'cover' }
    ];
  if (!galleryImages.length) return null;
  const activeImage = galleryImages[activeGalleryIndex] ?? galleryImages[0];
  if (!activeImage) return null;
  let createUrl = `/create?book=${encodeURIComponent(product.slug)}&name=${encodeURIComponent(childName)}&gender=${gender}&skinTone=${skinTone}&hairStyle=${hairStyle}&hairColor=${hairColor}&glasses=${glasses}&format=${coverFormat}&color=${coverColor}&giftBox=${addons.giftBox}&coloringBook=${addons.coloringBook}&audioKeepsake=${addons.audioKeepsake}`;
  if (dedication.trim()) createUrl += `&dedicationText=${encodeURIComponent(dedication)}`;
  if (giverName.trim()) createUrl += `&giver=${encodeURIComponent(giverName)}`;

  const handleAddToCart = () => {
    if (addons.giftBox) setAddon('giftWrap', true);
    if (addons.coloringBook) setAddon('coloringBook', true);
    addItem({
      bookSlug: product.slug, title: product.title, titleAr: product.titleAr, coverImage: product.coverImage,
      childName: childName.trim() || (isAr ? 'زَايِد' : 'Zayed'), gender, format: coverFormat,
      unitPrice: FORMAT_PRICES[coverFormat], quantity: 1,
      // Personalization payload — CartItem gains these optional fields in a parallel change
      dedicationText: dedication,
      giverName: giverName,
      coverColor: coverColor,
      characterJson: JSON.stringify({
        skinTone, hairStyle, hairColor, glasses, hearingAid, coStar,
      }),
    } as Parameters<typeof addItem>[0]);
    try { confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } }); } catch {}
    openMiniCart();
  };

  const nameValidation = validateProtagonistName(childName);
  const scrollToCustomizer = () => document.getElementById('personalization-box')?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Product Story FAQs — ids namespaced with 'story-' so they never collide
  // with ReviewsSection's PDP_QA_ACCORDION ids ('qa-1'…'qa-6') sharing the same openFaqId state.
  const storyFaqs = [
    {
      id: 'story-qa-1',
      qEn: '1. How is this book personalized for your child?',
      qAr: '١. كَيْفَ يُخَصَّصُ الكِتَابُ بِاسْمِ وَمَلَامِحِ طِفْلِي؟',
      aEn: 'Add your child’s first name to make them the star of the entire adventure, beautifully woven into every page and cover. Choose their skin tone, hair style, hair color, and inclusive accessories (glasses/hearing aid). You can also write a heartfelt personal dedication on page 1 and preview all 32 pages free!',
      aAr: 'أَدْخِلْ اسْمَ طِفْلِكَ الأَوَّلَ لِيُصْبِحَ هُوَ بَطَلَ المُغَامَرَةِ الرَّئِيسِيَّ، مَنْسُوجاً بِحِرَفِيَّةٍ فِي كُلِّ صَفْحَةٍ وَعَلَى الغِلَافِ. اخْتَرْ دَرَجَةَ لَوْنِ البَشَرَةِ، وَلَوْنَ وَتَسْرِيحَةَ الشَّعْرِ، وَإِكْسِسْوَارَاتِ النَّظَّارَاتِ أَوْ السَّمَّاعَةِ، وَأَضِفْ إِهْدَاءَكَ الخَاصَّ عَلَى الصَّفْحَةِ الأُولَى. يُمْكِنُكَ مُعَايَنَةُ كَافَّةِ الصَّفَحَاتِ (٣٢ صَفْحَةً) مَجَّاناً قَبْلَ الشِّرَاءِ!',
    },
    {
      id: 'story-qa-2',
      qEn: '2. What is this story about?',
      qAr: '٢. مَا هِيَ فِكْرَةُ وَمُغَامَرَةُ القِصَّةِ؟',
      aEn: `${product.subtitle} A heartwarming quest inspiring bravery, kindness, and curiosity, crafted in lyrical rhyming stanzas in side-by-side English and Modern Standard Arabic with full vocalized Tashkeel.`,
      aAr: `${product.subtitleAr || ''} حِكَايَةٌ تُلْهِمُ الشَّجَاعَةَ وَالفُضُولَ وَحُبَّ الاسْتِكْشَافِ، مُصَاغَةٌ بِأَبْيَاتٍ شِعْرِيَّةٍ مَوْزُونَةٍ بِاللُّغَتَيْنِ الإِنْجِلِيزِيَّةِ وَالعَرَبِيَّةِ مَعَ التَّشْكِيلِ الكَامِلِ.`,
    },
    {
      id: 'story-qa-3',
      qEn: '3. Size, paper & printing craftsmanship',
      qAr: '٣. مُوَاصَفَاتُ الوَرَقِ وَجَوْدَةُ الطِّبَاعَةِ وَالتَّجْلِيدِ',
      // DIGITAL-ONLY LAUNCH: only the digital edition is sold at launch.
      aEn: DIGITAL_ONLY_LAUNCH
        ? 'The Digital Edition (49 AED) is available now with instant delivery to your email & WhatsApp. Printed keepsake editions — Flexible Softcover, Classic Hardcover Keepsake, and Deluxe Layflat — are coming soon.'
        : 'Printed on 200 GSM archival Mohawk silk paper with EN71-3 certified non-toxic food-grade vegetable inks. Available in three formats: Flexible Softcover (49 AED), Classic Hardcover Keepsake (79 AED), and Deluxe Layflat with hot-stamped gold foil detailing (99 AED).',
      aAr: DIGITAL_ONLY_LAUNCH
        ? 'النُّسْخَةُ الرَّقْمِيَّةُ (٤٩ د.إ) مُتَوَفِّرَةٌ الْآنَ مَعَ تَوْصِيلٍ فَوْرِيٍّ إِلَى بَرِيدِكَ الْإِلِكْتْرُونِيِّ وَالْوَاتْسَاب. النُّسَخُ الْمَطْبُوعَةُ الْفَاخِرَةُ قَرِيباً.'
        : 'طِبَاعَةٌ أَرْشِيفِيَّةٌ مُلَوَّنَةٌ عَلَى وَرَقِ مُوهُوكْ حَرِيرِيٍّ فَاخِرٍ ٢٠٠ جم (200gsm) خَالٍ مِنَ الأَحْمَاضِ، بِأَحْبَارٍ نَبَاتِيَّةٍ آمِنَةٍ لِلأَطْفَالِ وَمُعْتَمَدَةٍ أُورُوبِّيّاً (EN71-3). مُتَوَفِّرٌ بِثَلَاثَةِ إِصْدَارَاتٍ: غِلَافٌ مَرِنٌ خَفِيفٌ (٤٩ د.إ)، غِلَافٌ مُقَوَّى كَلَاسِيكِيٌّ مَتِينٌ (٧٩ د.إ)، وَإِصْدَارٌ مَلَكِيٌّ مُنْبَسِطٌ ١٨٠ دَرَجَةً بِخَتْمٍ ذَهَبِيٍّ بَارِزٍ (٩٩ د.إ).',
    },
    {
      id: 'story-qa-4',
      qEn: '4. UAE Express Delivery & Gifting',
      qAr: '٤. التَّوْصِيلُ السَّرِيعُ وَالهَدَايَا فِي دَوْلَةِ الإِمَارَاتِ',
      // DIGITAL-ONLY LAUNCH: digital delivery is instant; courier comes later.
      aEn: DIGITAL_ONLY_LAUNCH
        ? 'Your personalized 3D digital storybook is delivered instantly to your email & WhatsApp within minutes of ordering — no shipping needed. Express courier delivery of printed keepsakes across all 7 Emirates is coming soon.'
        : 'Printed and bound locally in the UAE within 24 hours. Tracked courier delivery to Dubai, Abu Dhabi, Sharjah, and all 7 Emirates in 24–48 hours. For gifting reassurance, no prices or invoices are ever included inside the package.',
      aAr: DIGITAL_ONLY_LAUNCH
        ? 'تَصِلُكَ قِصَّتُكَ الرَّقْمِيَّةُ التَّفَاعُلِيَّةُ ثُلَاثِيَّةُ الأَبْعَادِ فَوْراً عَلَى بَرِيدِكَ الْإِلِكْتْرُونِيِّ وَالْوَاتْسَاب خِلَالَ دَقَائِقَ مِنَ الطَّلَب. التَّوْصِيلُ السَّرِيعُ لِلنُّسَخِ الْمَطْبُوعَةِ لِجَمِيعِ الْإِمَارَاتِ السَّبْعِ قَرِيباً.'
        : 'يَتِمُّ تَجْهِيزُ وَطِبَاعَةُ الكِتَابِ مَحَلِّيّاً فِي دَوْلَةِ الإِمَارَاتِ خِلَالَ ٢٤ سَاعَةً. التَّوْصِيلُ سَرِيعٌ إِلَى بَابِ مَنْزِلِكَ فِي دُبَيّ، أَبُوظَبْي، الشَّارِقَةِ، عَجْمَانَ، رَأْسِ الخَيْمَةِ، الفُجَيْرَةِ، وَأُمِّ القُيُوَيْنِ خِلَالَ ٢٤ إِلَى ٤٨ سَاعَةً. كَمَا لَا نَضَعُ أَيَّ أَسْعَارٍ أَوْ فَوَاتِيرَ دَاخِلَ طَرْدِ الهَدِيَّةِ لِتَصِلَ مُبَاشَرَةً إِلَى أَحِبَّائِكُمْ بِكَامِلِ فَخَامَتِهَا.',
    },
  ];

  // Sub-component contracts: maxLength={13}, (coStar.role === 'dad' || coStar.role === 'grandpa')
  return (
    <div className={`min-h-screen bg-[#FDF8F1] text-slate-900 font-sans ${isAr ? 'rtl' : 'ltr'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <StoreHeader />
      <CountrySelectorModal />

      {/* Editorial Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 py-3 text-xs text-slate-500 flex items-center gap-2">
        <Link href={isAr ? '/ar' : '/'} className="hover:text-[#1E5751] transition">{isAr ? 'الرَّئِيسِيَّةُ' : 'Home'}</Link>
        <span>/</span>
        <Link href={isAr ? '/ar#catalog' : '/#catalog'} className="hover:text-[#1E5751] transition">{isAr ? 'كُتُبٌ وَقِصَصٌ مُخَصَّصَةٌ لِلأَطْفَالِ' : 'Personalized Books'}</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold truncate">{isAr ? product.titleAr : product.title}</span>
      </nav>

      {/* Main PDP Grid */}
      <section className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Gallery & Craftsmanship Highlights */}
        <div className="lg:col-span-7 flex flex-col gap-4 lg:sticky lg:top-24 self-start">
          <div className="relative aspect-square sm:aspect-[4/3] w-full rounded-[2px] overflow-hidden bg-white border border-amber-900/10 shadow-sm group">
            <div className="absolute top-4 inset-x-4 z-10 flex items-center justify-between pointer-events-none">
              {product.badge && <span className="bg-slate-950/90 text-amber-400 text-xs font-black px-3 py-1 rounded-[2px]">{product.badge}</span>}
              <span className="bg-[#1E5751] text-white text-[11px] font-bold px-3 py-1 rounded-[2px] flex items-center gap-1.5 shadow-sm">
                <Truck className="w-3.5 h-3.5" />{isAr ? 'تَوْصِيلٌ خِلَالَ ٢٤–٤٨ سَاعَةٍ بِالإِمَارَاتِ' : '24-48h UAE Delivery'}
              </span>
            </div>
            <img src={activeImage.src} alt={isAr ? activeImage.labelAr : activeImage.labelEn} className="w-full h-full object-cover group-hover:scale-102 transition duration-300" />
            <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-none">
              <span className="bg-white/95 text-slate-800 text-xs font-bold px-3 py-1 rounded-[2px] shadow-sm border border-slate-200/80">{isAr ? activeImage.labelAr : activeImage.labelEn}</span>
              <Link href={`/create/preview?book=${encodeURIComponent(product.slug)}&name=${encodeURIComponent(childName)}&gender=${gender}&skin=${skinTone}&hairStyle=${hairStyle}&hairColor=${hairColor}&format=${coverFormat}&color=${coverColor}`} className="bg-[#1E5751] hover:bg-[#16433e] text-white text-xs font-bold px-4 py-1.5 rounded-[2px] shadow-sm transition flex items-center gap-1.5 pointer-events-auto">
                <Eye className="w-3.5 h-3.5" /><span>{isAr ? 'تَصَفَّحْ بِثَلَاثِيِّ الأَبْعَادِ' : 'Open 3D Flipbook'}</span>
              </Link>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {galleryImages.map((img, idx) => (
              <button key={img.id} onClick={() => setActiveGalleryIndex(idx)} className={`relative shrink-0 w-20 h-20 rounded-[2px] overflow-hidden border-2 transition ${idx === activeGalleryIndex ? 'border-[#1E5751] ring-1 ring-[#1E5751]' : 'border-slate-200 hover:border-slate-300'}`}>
                <img src={img.src} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Specs Micro-Highlights */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-[2px] bg-white border border-amber-900/10 text-center text-xs shadow-sm">
            <div>
              <span className="text-[#1E5751] font-serif font-bold block text-base">٢٠٠ جم</span>
              <span className="text-slate-600 text-[11px]">{isAr ? 'وَرَقُ مُوهُوكْ حَرِيرِيٌّ فَاخِرٌ (200gsm)' : '200gsm Archival Mohawk Silk'}</span>
            </div>
            <div className="border-x border-slate-100">
              <span className="text-[#1E5751] font-serif font-bold block text-base">٣٢ صَفْحَةً</span>
              <span className="text-slate-600 text-[11px]">{isAr ? '٣٢ صَفْحَةً بِرُسُومَاتٍ كَامِلَةِ الأَلْوَانِ' : '32 Full-Color Pages'}</span>
            </div>
            <div>
              <span className="text-[#1E5751] font-serif font-bold block text-base">١٠٠٪</span>
              <span className="text-slate-600 text-[11px]">{isAr ? 'ضَمَانُ الجَوْدَةِ وَالسَّعَادَةِ ١٠٠٪' : 'Happiness Guarantee'}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Reviews, Rapid Personalization Card */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-amber-100/80 text-amber-900 text-xs font-bold mb-2">
              <span>{product.ageRange}</span>•<span className="text-[#1E5751]">{isAr ? 'ثُنَائِيُّ اللُّغَةِ (عَرَبِيٌّ بِالتَّشْكِيلِ وَإِنْجِلِيزِيٌّ)' : 'Bilingual Arabic & English'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-950 tracking-tight">{isAr ? product.titleAr : product.title}</h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium leading-relaxed">{isAr ? product.subtitleAr : product.subtitle}</p>
            <div className="flex items-center gap-2 mt-2 text-xs">
              <div className="flex text-amber-400">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}</div>
              <span className="font-bold text-slate-900">{product.rating.toFixed(2)}</span>
              <span className="text-slate-500">({product.reviewCount} {isAr ? 'تَقْيِيمٌ مُوَثَّقٌ مِنْ أَوْلِيَاءِ الأُمُورِ' : 'verified parent reviews'})</span>
            </div>

            {/* Key Product Highlights Checklist */}
            <div className="grid grid-cols-2 gap-2 mt-3.5 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-1.5 p-2 rounded-[2px] bg-white border border-amber-900/10">
                <span>🎁</span>
                <span className="truncate">{isAr ? `مُنَاسِبٌ لِعُمْرِ ${product.ageRange}` : `For ${product.ageRange}`}</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-[2px] bg-white border border-amber-900/10">
                <span>📖</span>
                <span className="truncate">{isAr ? 'مُعَايَنَةُ كَافَّةِ الصَّفَحَاتِ (٣٢ صَفْحَةً) مَجَّاناً' : 'Preview all 32 pages'}</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-[2px] bg-white border border-amber-900/10">
                <span>🚚</span>
                <span className="truncate">{isAr ? 'شَحْنٌ سَرِيعٌ ٢٤–٤٨ سَاعَةً لِكَافَّةِ الإِمَارَاتِ' : '24-48h UAE Delivery'}</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-[2px] bg-white border border-amber-900/10">
                <span>✍️</span>
                <span className="truncate">{isAr ? 'إِهْدَاءٌ شَخْصِيٌّ مَطْبُوعٌ مَجَّاناً' : 'Free printed dedication'}</span>
              </div>
            </div>
          </div>

          {/* Above-The-Fold Rapid Personalization Card */}
          <div id="personalization-box" className="p-5 rounded-[2px] bg-white border-2 border-[#1E5751]/30 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-serif font-black uppercase tracking-wider text-[#1E5751] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#1E5751]" />
                {isAr ? 'تَخْصِيصٌ سَرِيعٌ فَوْرِيٌّ' : 'Rapid Personalization'}
              </span>
              <span className="text-[11px] font-bold text-[#1E5751] bg-[#1E5751]/10 px-2 py-0.5 rounded-[2px]">
                {isAr ? 'جَاهِزٌ خِلَالَ دَقِيقَةٍ' : 'Ready in 1 min'}
              </span>
            </div>

            <CharacterBuilderStep isAr={isAr} childName={childName} setChildName={setChildName} nameValidation={nameValidation} gender={gender} setGender={setGender} skinTone={skinTone} setSkinTone={setSkinTone} hairStyle={hairStyle} setHairStyle={setHairStyle} hairColor={hairColor} setHairColor={setHairColor} glasses={glasses} setGlasses={setGlasses} hearingAid={hearingAid} setHearingAid={setHearingAid} coStar={coStar} setCoStar={setCoStar} />
            <DedicationStep isAr={isAr} dedication={dedication} setDedication={setDedication} giverName={giverName} setGiverName={setGiverName} hasPhoto={hasPhoto} setHasPhoto={setHasPhoto} />
            <CoverFormatSelector isAr={isAr} coverColor={coverColor} setCoverColor={setCoverColor} coverFormat={coverFormat} setCoverFormat={setCoverFormat} digitalOnly={DIGITAL_ONLY_LAUNCH} />

            {/* Primary Action Button */}
            <button type="button" onClick={handleAddToCart} className="w-full bg-[#1E5751] hover:bg-[#16433e] text-white font-serif font-bold py-4 rounded-[2px] shadow-sm transition text-base flex items-center justify-center gap-2 cursor-pointer">
              <ShoppingBag className="w-5 h-5" /><span>{isAr ? `أَضِفْ إِلَى السَّلَّةِ • ${currentPriceAED} د.إ` : `Add to Cart • ${currentPriceAED} AED`}</span>
            </button>
            <Link href={createUrl} className="w-full bg-white hover:bg-amber-50 text-[#1E5751] border border-[#1E5751] font-bold text-center py-2.5 rounded-[2px] transition text-xs flex items-center justify-center gap-1.5">
              <Eye className="w-4 h-4 text-[#1E5751]" /><span>{isAr ? `مُعَايَنَةُ قِصَّةِ ${childName || 'طِفْلِكَ'} ثُلَاثِيَّةِ الأَبْعَادِ مَجَّاناً` : `Preview ${childName || 'Child'}’s Book in 3D Free`}</span>
            </Link>
          </div>

          {/* Keepsake Add-ons */}
          <div className="p-4 rounded-[2px] bg-white border border-slate-200 shadow-sm flex flex-col gap-3">
            {/* DIGITAL-ONLY LAUNCH: physical add-ons are visible but unavailable. */}
            <span className="text-xs font-serif font-black text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-[#1E5751]" />
              {isAr ? 'إِضَافَاتٌ تِذْكَارِيَّةٌ فَاخِرَةٌ (اخْتِيَارِيَّةٌ):' : 'Companion Keepsake Add-ons:'}
              {DIGITAL_ONLY_LAUNCH && (
                <span className="text-[10px] font-black uppercase tracking-wider text-white bg-amber-600 px-2 py-0.5 rounded-[2px] ml-1">
                  {isAr ? 'قريباً' : 'Coming soon'}
                </span>
              )}
            </span>
            {([
              { key: 'giftBox' as const, label: isAr ? 'صُنْدُوقُ هَدَايَا مَلَكِيٌّ بِنُقُوشٍ ذَهَبِيَّةٍ بَارِزَةٍ' : 'Luxury Gold-Foil Keepsake Gift Box', price: 39 },
              { key: 'coloringBook' as const, label: isAr ? 'دَفْتَرُ تَلْوِينٍ مُخَصَّصٌ بِاسْمِ الطِّفْلِ' : 'Personalized Coloring Book Companion', price: 19 },
              { key: 'audioKeepsake' as const, label: isAr ? 'تَسْجِيلٌ صَوْتِيٌّ سِينِمَائِيٌّ لِلْقِصَّةِ مَعَ تَهْوِيدَةِ النَّوْمِ' : 'Bedtime Audio Companion & Lullaby', price: 19 },
            ]).map((addon) => (
              <label key={addon.key} className={`flex items-center justify-between p-2.5 rounded-[2px] border border-slate-100 transition ${DIGITAL_ONLY_LAUNCH ? 'opacity-60 cursor-not-allowed' : 'hover:bg-slate-50 cursor-pointer'}`}>
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={addons[addon.key]} disabled={DIGITAL_ONLY_LAUNCH} onChange={(e) => setAddons({ ...addons, [addon.key]: e.target.checked })} className="w-4 h-4 text-[#1E5751] rounded-[2px] disabled:cursor-not-allowed" />
                  <span className="text-xs font-bold text-slate-900">{addon.label}</span>
                </div>
                {DIGITAL_ONLY_LAUNCH ? (
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">{isAr ? 'قريباً' : 'Soon'}</span>
                ) : (
                  <span className="text-xs font-bold text-[#1E5751]">+{addon.price} AED</span>
                )}
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* Emotional Storytelling Block: Why kids love this story & Why parents love it */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-[#FDF8F1] rounded-[2px] p-6 sm:p-8 border border-amber-900/10 shadow-sm">
          <div className="text-center mb-8">
            <span className="inline-block bg-[#1E5751] text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-[2px] mb-3">
              {isAr ? 'قِصَّةٌ تَأْسِرُ القُلُوبَ' : 'A Story To Cherish Forever'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-950">
              {isAr ? 'لِمَاذَا تَأْسِرُ هَذِهِ القِصَّةُ قُلُوبَ العَائِلَةِ؟' : 'Why Families Fall in Love With This Story'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Column 1: Why kids love this story */}
            <div className="bg-white rounded-[2px] p-6 border border-amber-900/10 shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-3 pb-3 border-b border-amber-900/10">
                <span className="text-2xl" role="img" aria-label="sparkles">✨</span>
                <h3 className="text-lg font-serif font-bold text-[#1E5751]">
                  {isAr ? 'لماذا يحب الأطفال هذه القصة' : 'Why kids love this story'}
                </h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-700 font-bold shrink-0">✓</span>
                  <span>{isAr ? 'يَرَوْنَ أَنْفُسَهُمْ أَبْطَالاً حَقِيقِيِّينَ بِأَسْمَائِهِمْ وَمَلَامِحِهِمْ فِي كُلِّ صَفْحَةٍ.' : 'They see themselves as the brave hero, with their own name and customized appearance woven into every scene.'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-700 font-bold shrink-0">✓</span>
                  <span>{isAr ? 'مُغَامَرَاتٌ خَيَالِيَّةٌ مُشَوِّقَةٌ تَفْتَحُ آفَاقَ الإِبْدَاعِ وَتُعَزِّزُ الثِّقَةَ بِالنَّفْسِ.' : 'Thrilling quests and magical discoveries that spark vivid imagination and build fearless self-confidence.'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-700 font-bold shrink-0">✓</span>
                  <span>{isAr ? 'رُسُومَاتٌ بَصَرِيَّةٌ سَاحِرَةٌ وَأَلْوَانٌ دَافِئَةٌ تَجْعَلُ وَقْتَ القِرَاءَةِ أَجْمَلَ لَحَظَاتِ اليَوْمِ.' : 'Breathtaking full-spread illustrations and whimsical rhymes that make storytime the absolute highlight of their day.'}</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Why parents love it */}
            <div className="bg-white rounded-[2px] p-6 border border-amber-900/10 shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-3 pb-3 border-b border-amber-900/10">
                <span className="text-2xl" role="img" aria-label="heart">❤️</span>
                <h3 className="text-lg font-serif font-bold text-[#1E5751]">
                  {isAr ? 'لماذا يحب الآباء هذا الكتاب' : 'Why parents love it'}
                </h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-700 font-bold shrink-0">✓</span>
                  <span>{isAr ? 'يَغْرِسُ حُبَّ القِرَاءَةِ وَاللُّغَةِ العَرَبِيَّةِ الفُصْحَى بِالتَّشْكِيلِ الكَامِلِ مُنْذُ الصِّغَرِ.' : 'Nurtures a lifelong love of reading and celebrates rich bilingual Arabic-English heritage from an early age.'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-700 font-bold shrink-0">✓</span>
                  <span>{isAr ? 'إِهْدَاءٌ عَاطِفِيٌّ خَاصٌّ يُخَلِّدُ رَسَائِلَ الحُبِّ وَيَجْعَلُهُ كَنْزاً عائِلِيّاً تِذْكَارِيّاً.' : 'A sentimental 400-character custom dedication makes it an heirloom keepsake treasured for generations.'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-700 font-bold shrink-0">✓</span>
                  <span>{isAr ? 'جَوْدَةُ طِبَاعَةٍ مُتْقَنَةٌ عَلَى وَرَقِ Mohawk الأَرْشِيفِيِّ بِأَحْبَارٍ آمِنَةٍ لِلأَطْفَالِ.' : 'Artisan craftsmanship printed on 200 GSM Mohawk archival silk paper with child-safe vegetable inks.'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship & Specifications Banner */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-[2px] p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-serif font-black text-slate-950">{isAr ? 'مُوَاصَفَاتُ الكِتَابِ وَجَوْدَةُ الحِرَفِيَّةِ' : 'Product Specs & Craftsmanship'}</h2>
            <p className="text-xs text-slate-500 mt-1">{isAr ? 'مَعَايِيرُ أُورُوبِّيَّةٌ وَمَوَادٌّ أَرْشِيفِيَّةٌ تَدُومُ لأَجْيَالٍ (200gsm Mohawk, 32 صفحة)' : '200gsm Mohawk paper, 32 archival pages, child-safe inks'}</p>
          </div>
          <button type="button" onClick={() => setIsSpecsDrawerOpen(true)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[2px] bg-white hover:bg-amber-50 text-[#1E5751] border border-[#1E5751] font-bold text-xs transition">
            <Ruler className="w-4 h-4 text-[#1E5751]" /><span>{isAr ? 'عَرْضُ جَدْوَلِ المُوَاصَفَاتِ الفَنِّيَّةِ الكَامِلِ' : 'View Full Specifications'}</span>
          </button>
        </div>
      </section>

      {/* Product Story & Personalization Accordions */}
      <section className="max-w-4xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-[2px] p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col gap-4">
          <h2 className="text-xl sm:text-2xl font-serif font-black text-slate-950 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#1E5751]" />
            <span>{isAr ? 'كُلُّ مَا يَهُمُّكَ مَعْرِفَتُهُ عَنْ هَذَا الكِتَابِ' : 'About This Personalized Story'}</span>
          </h2>

          <div className="divide-y divide-slate-100">
            {storyFaqs.map((qa) => {
              const isOpen = openFaqId === qa.id;
              return (
                <div key={qa.id} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : qa.id)}
                    aria-expanded={openFaqId === qa.id}
                    className="w-full flex items-center justify-between text-left rtl:text-right font-serif font-bold text-slate-900 hover:text-[#1E5751] transition"
                  >
                    <span>{isAr ? qa.qAr : qa.qEn}</span>
                    <span className={`text-[#1E5751] font-bold transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {isOpen && (
                    <div className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed bg-[#FDF8F1] p-4 rounded-[2px] border border-amber-900/10">
                      <p>{isAr ? qa.aAr : qa.aEn}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ReviewsSection isAr={isAr} reviewFilter={reviewFilter} setReviewFilter={setReviewFilter} openFaqId={openFaqId} setOpenFaqId={setOpenFaqId} onPhotoClick={(url) => setActiveReviewPhoto(url)} currentSlug={product.slug} />
      <ProductSpecsDrawer isOpen={isSpecsDrawerOpen} onClose={() => setIsSpecsDrawerOpen(false)} initialLang={isAr ? 'ar' : 'en'} />

      {/* Lightbox for Verified Customer Photo Reviews */}
      {activeReviewPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveReviewPhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label={isAr ? "صورة تقييم العميل" : "Customer review photo"}
        >
          <div className="relative max-w-2xl w-full bg-white rounded-[2px] overflow-hidden shadow-2xl p-4" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setActiveReviewPhoto(null)} aria-label={isAr ? "إغلاق الصورة" : "Close photo"} className="absolute top-4 right-4 z-10 w-9 h-9 rounded-[2px] bg-slate-900/80 text-white font-black flex items-center justify-center hover:bg-slate-950 transition">✕</button>
            <div className="relative aspect-square w-full rounded-[2px] overflow-hidden"><img src={activeReviewPhoto} alt="Customer unboxing photo" className="w-full h-full object-contain bg-slate-950" /></div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Bar on Mobile */}
      {showStickyBar && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:hidden shadow-2xl flex items-center justify-between gap-3">
          <div className="truncate">
            <div className="text-xs font-serif font-black text-slate-950 truncate">{isAr ? product.titleAr : product.title}</div>
            <div className="text-[11px] font-bold text-[#1E5751]">{currentPriceAED} AED</div>
          </div>
          <button onClick={scrollToCustomizer} className="shrink-0 bg-[#1E5751] hover:bg-[#16433e] text-white font-serif font-bold text-xs px-5 py-2.5 rounded-[2px] shadow-sm">
            {isAr ? 'خَصِّصْ الآنَ' : 'Personalize Now'}
          </button>
        </div>
      )}

      {/* S11: Editorial Footer */}
      <Footer initialLang={isAr ? 'ar' : 'en'} />
    </div>
  );
}
