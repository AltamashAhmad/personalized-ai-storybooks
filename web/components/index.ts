/**
 * Barrel exports for public components in PersonalizedTales UAE.
 */

// Navigation & Layout
export { default as Header, default as StoreHeader } from './StoreHeader';
export type { StoreHeaderProps } from './StoreHeader';
export { default as Footer } from './Footer';
export type { FooterProps } from './Footer';
export { default as CountrySelectorModal } from './CountrySelectorModal';
export { default as HeaderSearchModal, default as SearchModal } from './HeaderSearchModal';
export { default as BrandLogo } from './ui/BrandLogo';
export type { BrandLogoProps } from './ui/BrandLogo';
export { default as AmazonCartIcon } from './ui/AmazonCartIcon';
export type { AmazonCartIconProps } from './ui/AmazonCartIcon';

// Storefront & Discovery
export { default as StorefrontView } from './StorefrontView';
export { default as HeroPersonalizer } from './HeroPersonalizer';
export type { HeroPersonalizerProps } from './HeroPersonalizer';
export { default as BookCarousel } from './BookCarousel';
export type { BookCarouselProps } from './BookCarousel';
export { default as HowItWorksSection } from './HowItWorksSection';
export type { HowItWorksSectionProps } from './HowItWorksSection';
export { default as TrustBar } from './TrustBar';
export type { TrustBarProps } from './TrustBar';
export { default as RangeRail } from './RangeRail';
export type { RangeRailProps } from './RangeRail';
export { default as ThoughtfullyMade } from './ThoughtfullyMade';
export type { ThoughtfullyMadeProps } from './ThoughtfullyMade';
export { default as SeoAccordionSection } from './SeoAccordionSection';
export type { SeoAccordionSectionProps } from './SeoAccordionSection';
export { default as NewsletterBand } from './NewsletterBand';
export type { NewsletterBandProps } from './NewsletterBand';
export { default as ProductCard } from './ProductCard';

// Product Detail & Personalization Studio
export { default as ProductDetailView } from './ProductDetailView';
export { default as CharacterBuilderStep } from './CharacterBuilderStep';
export type { CharacterBuilderStepProps } from './CharacterBuilderStep';
export { default as DedicationStep } from './DedicationStep';
export type { DedicationStepProps } from './DedicationStep';
export { default as CoverFormatSelector } from './CoverFormatSelector';
export type { CoverFormatSelectorProps } from './CoverFormatSelector';
export { default as ReviewsSection } from './ReviewsSection';
export type { ReviewsSectionProps } from './ReviewsSection';
export { default as ProductSpecsDrawer } from './ProductSpecsDrawer';

// 3D Virtual Flipbook Experience
export { default as FlipbookStage } from './FlipbookStage';
export type { FlipbookStageProps } from './FlipbookStage';
export { default as FlipbookPage } from './FlipbookPage';
export type { FlipbookPageProps } from './FlipbookPage';
export { default as FlipbookScrubBar } from './FlipbookScrubBar';
export type { FlipbookScrubBarProps } from './FlipbookScrubBar';
export { default as FlipbookControls } from './FlipbookControls';
export type { FlipbookControlsProps } from './FlipbookControls';
export { default as AudioNarrationQrBadge } from './AudioNarrationQrBadge';

// Cart & Drawers
export { default as MiniCartDrawer, default as CartDrawer } from './MiniCartDrawer';

// Informational & Trust Pages
export { default as FaqView, default as FAQView } from './FaqView';
export { default as DeliveryView } from './DeliveryView';
export { default as QualityView } from './QualityView';
export { default as AboutUsView } from './AboutUsView';
export { default as ContactView } from './ContactView';
export { default as GiftFinderView } from './GiftFinderView';
export { default as DigitalUnwrappingView, default as GiftUnwrapView } from './DigitalUnwrappingView';

// Shared UI Primitives
export * from './ui';
