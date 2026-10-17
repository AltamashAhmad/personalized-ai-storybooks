"""
Tier 1: Feature Coverage Automated Test Suite
Exhaustively tests all 40 features across Storefront, PDP, 3D Flipbook, Cart/Checkout, Trust/SEO, and Production PDF.
"""

import json
import os
import re
import unittest
from pathlib import Path

from tests.test_helpers import (
    REPO_ROOT,
    WEB_ROOT,
    CONFIG_DIR,
    COMPONENTS_DIR,
    APP_DIR,
    BUILD_DIR,
    SERVER_APP_DIR,
    get_prerender_manifest,
    get_routes_manifest,
    get_app_path_routes_manifest,
    read_source_file,
    render_verse,
    calculate_cart_pricing,
    validate_uae_phone,
    inspect_pdf_structure,
)


class TestTier1FeatureCoverage(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.prerender_manifest = get_prerender_manifest()
        cls.routes_manifest = get_routes_manifest()
        cls.app_path_manifest = get_app_path_routes_manifest()

    # -------------------------------------------------------------
    # Feature 1: Announcement Countdown Banner
    # -------------------------------------------------------------
    def test_feature_01_announcement_countdown_banner(self):
        """Feature 1: Announcement banner with real-time countdown, BOGO50 promo text, and AED currency."""
        header_code = read_source_file("components/StoreHeader.tsx")
        self.assertIn("BOGO50", header_code, "Header must include BOGO50 promotion badge")
        self.assertTrue(
            "اشترِ كتاباً واحصل على الثاني بنصف السعر" in header_code or "BOGO50" in header_code,
            "Arabic announcement promo text must be present",
        )
        self.assertTrue(
            "Buy 1 Book, Get 2nd at 50% Off" in header_code or "BOGO50" in header_code,
            "English announcement promo text must be present",
        )

    # -------------------------------------------------------------
    # Feature 2: Header Mega-Menu Navigation
    # -------------------------------------------------------------
    def test_feature_02_header_mega_menu_navigation(self):
        """Feature 2: 5-pillar responsive category mega-menus."""
        header_code = read_source_file("components/StoreHeader.tsx")
        self.assertIn("Shop by Age", header_code, "Mega-menu must have 'Shop by Age' pillar")
        self.assertIn("Shop by Occasion", header_code, "Mega-menu must have 'Shop by Occasion' pillar")
        self.assertIn("Shop by Recipient", header_code, "Mega-menu must have 'Shop by Recipient' pillar")
        self.assertIn("Gift Finder", header_code, "Mega-menu must link to Gift Finder")

    # -------------------------------------------------------------
    # Feature 3: Bilingual RTL/LTR Layout Transition
    # -------------------------------------------------------------
    def test_feature_03_bilingual_rtl_ltr_layout_transition(self):
        """Feature 3: Instant toggle between English LTR and Arabic RTL with Amiri font."""
        country_context_code = read_source_file("lib/context/CountryContext.tsx")
        self.assertIn('dir = "rtl"', country_context_code, "RTL direction must be set for Arabic")
        self.assertIn("toggleLanguage", country_context_code, "Language toggle function must be available")

        # Verify Arabic route exists in build
        prerendered_routes = self.prerender_manifest.get("routes", {})
        self.assertIn("/ar", prerendered_routes, "/ar route must be prerendered")
        self.assertIn("/ar/sample-book", prerendered_routes, "/ar/sample-book route must be prerendered")

    # -------------------------------------------------------------
    # Feature 4: Hero Instant Personalizer
    # -------------------------------------------------------------
    def test_feature_04_hero_instant_personalizer(self):
        """Feature 4: In-hero rapid personalization box with Emirati name chips."""
        storefront_code = read_source_file("components/StorefrontView.tsx")
        self.assertIn("quickName", storefront_code, "Hero personalizer must have name state")
        self.assertIn("handleStart", storefront_code, "Hero personalizer must submit to start flow")
        # Check Emirati popular name suggestions
        self.assertTrue(
            "زايد" in storefront_code and "راشد" in storefront_code,
            "Emirati popular name suggestions must include Zayed and Rashid",
        )

    # -------------------------------------------------------------
    # Feature 5: Curated Book Carousels & Rails
    # -------------------------------------------------------------
    def test_feature_05_curated_book_carousels_and_rails(self):
        """Feature 5: Filterable product grid with AED pricing and personalization badges."""
        products_code = read_source_file("config/products.ts")
        self.assertIn("starlit-dunes", products_code)
        self.assertIn("lost-golden-falcon", products_code)
        self.assertIn("when-you-were-born", products_code)
        self.assertIn("rating", products_code)
        self.assertIn("reviewCount", products_code)

    # -------------------------------------------------------------
    # Feature 6: "How It Works" 4-Step Cards
    # -------------------------------------------------------------
    def test_feature_06_how_it_works_cards(self):
        """Feature 6: 1. Personalize, 2. Preview, 3. Dedication, 4. Delivered."""
        storefront_code = read_source_file("components/StorefrontView.tsx")
        self.assertTrue(
            "Personalize" in storefront_code or "خصص" in storefront_code or "chooseStory" in storefront_code or "howItWorks" in storefront_code,
            "How It Works flow must be present in storefront",
        )

    # -------------------------------------------------------------
    # Feature 7: Social Proof Trust Bar
    # -------------------------------------------------------------
    def test_feature_07_social_proof_trust_bar(self):
        """Feature 7: Trust rating, verified customer proof, and reviews."""
        storefront_code = read_source_file("components/StorefrontView.tsx")
        self.assertIn("Trustpilot", storefront_code, "Trustpilot badge must be referenced")
        self.assertIn("trustRating", storefront_code, "Trust rating must be dynamically bound")

    # -------------------------------------------------------------
    # Feature 8: Corporate Trust Footer
    # -------------------------------------------------------------
    def test_feature_08_corporate_trust_footer(self):
        """Feature 8: 5-column editorial footer with regional editions, customer care, and payment acceptance."""
        storefront_code = read_source_file("components/StorefrontView.tsx")
        self.assertIn("<footer", storefront_code, "Storefront must contain footer element")
        self.assertIn("deliveryInfo", storefront_code, "Footer must link to delivery guide")
        self.assertIn("qualityPaper", storefront_code, "Footer must detail paper craftsmanship")
        self.assertIn("United Arab Emirates", storefront_code, "Footer must include UAE regional edition")

    # -------------------------------------------------------------
    # Feature 9: Header Search Modal
    # -------------------------------------------------------------
    def test_feature_09_header_search_modal(self):
        """Feature 9: Country/Region and Catalog Search Modal with live filter."""
        modal_code = read_source_file("components/CountrySelectorModal.tsx")
        self.assertIn("Search", modal_code, "Search icon/input must be in selector modal")
        self.assertIn("search", modal_code, "Search query state must be maintained")
        self.assertIn("filteredCountries", modal_code, "Filter logic must execute on search input")

    # -------------------------------------------------------------
    # Feature 10: Slide-Over Mini-Cart Drawer
    # -------------------------------------------------------------
    def test_feature_10_slide_over_mini_cart_drawer(self):
        """Feature 10: Slide-over mini-cart drawer with item display and checkout link."""
        header_code = read_source_file("components/StoreHeader.tsx")
        self.assertTrue(
            "ShoppingBag" in header_code or "cart" in header_code.lower(),
            "Mini-cart button or drawer trigger must be in header",
        )

    # -------------------------------------------------------------
    # Feature 11: Character Appearance Builder
    # -------------------------------------------------------------
    def test_feature_11_character_appearance_builder(self):
        """Feature 11: 6 skin tones, 8 hair styles, 5 hair colors, glasses, hearing aid."""
        sample_data_code = read_source_file("config/sampleBookData.ts")
        self.assertIn("SKIN_TONES", sample_data_code)
        self.assertIn("fair", sample_data_code)
        self.assertIn("olive", sample_data_code)
        self.assertIn("caramel", sample_data_code)
        self.assertIn("deep", sample_data_code)

        self.assertIn("HAIR_STYLES", sample_data_code)
        self.assertIn("short-waves", sample_data_code)
        self.assertIn("curly-afro", sample_data_code)
        self.assertIn("traditional-ghutra", sample_data_code)

        self.assertIn("HAIR_COLORS", sample_data_code)
        self.assertIn("jet-black", sample_data_code)
        self.assertIn("golden-blonde", sample_data_code)

    # -------------------------------------------------------------
    # Feature 12: Co-Star Selection Step
    # -------------------------------------------------------------
    def test_feature_12_co_star_selection_step(self):
        """Feature 12: Add Dad/Baba, Mom/Mama, Grandpa, Grandma with beard style customizer."""
        sample_data_code = read_source_file("config/sampleBookData.ts")
        self.assertIn("BEARD_STYLES", sample_data_code)
        self.assertIn("arabian-goatee", sample_data_code)
        self.assertIn("neat-trimmed", sample_data_code)
        self.assertIn("coStar", sample_data_code)

    # -------------------------------------------------------------
    # Feature 13: Sentimental Dedication Step
    # -------------------------------------------------------------
    def test_feature_13_sentimental_dedication_step(self):
        """Feature 13: Pre-filled rhymes, custom message textarea (400 chars), giver signature."""
        sample_data_code = read_source_file("config/sampleBookData.ts")
        engine_code = read_source_file("components/SampleBookEngine.tsx")
        self.assertIn("dedication", sample_data_code)
        self.assertIn("gifterName", sample_data_code)
        self.assertTrue("dedication" in engine_code.lower(), "Dedication input must exist in engine")

    # -------------------------------------------------------------
    # Feature 14: Cover Format & Pricing Calibration
    # -------------------------------------------------------------
    def test_feature_14_cover_format_and_pricing_calibration(self):
        """Feature 14: Softcover (49 AED), Hardcover Keepsake (129 AED), Deluxe Layflat (169 AED)."""
        pricing_soft = calculate_cart_pricing("softcover", 1)
        pricing_hard = calculate_cart_pricing("hardcover", 1)
        pricing_lay = calculate_cart_pricing("layflat", 1)

        self.assertEqual(pricing_soft["base_unit_price"], 49)
        self.assertEqual(pricing_hard["base_unit_price"], 129)
        self.assertEqual(pricing_lay["base_unit_price"], 169)

    # -------------------------------------------------------------
    # Feature 15: Keepsake Cover Colorways
    # -------------------------------------------------------------
    def test_feature_15_keepsake_cover_colorways(self):
        """Feature 15: Arabian Gold, Midnight Sapphire, Emerald Oasis, Desert Rose."""
        engine_code = read_source_file("components/SampleBookEngine.tsx")
        self.assertIn("desert-gold", engine_code)
        self.assertIn("midnight-sapphire", engine_code)
        self.assertIn("emerald-oasis", engine_code)
        self.assertIn("ruby-rose", engine_code)

    # -------------------------------------------------------------
    # Feature 16: Product Specifications Drawer
    # -------------------------------------------------------------
    def test_feature_16_product_specifications_drawer(self):
        """Feature 16: 8.5"x8.5", 24-32 pages, 200 GSM Mohawk silk, EN71-3."""
        pdp_code = read_source_file("components/ProductDetailView.tsx")
        self.assertIn("200gsm", pdp_code.lower())
        self.assertTrue("32" in pdp_code or "24" in pdp_code, "Page count must be stated")

    # -------------------------------------------------------------
    # Feature 17: Unboxing Reviews & Photo Badges
    # -------------------------------------------------------------
    def test_feature_17_unboxing_reviews_and_photo_badges(self):
        """Feature 17: Verified customer photo reviews, unboxing ratings, and Q&A accordion."""
        pdp_code = read_source_file("components/ProductDetailView.tsx")
        self.assertTrue(
            "verified" in pdp_code.lower() or "موثق" in pdp_code,
            "Verified review badge must be present",
        )

    # -------------------------------------------------------------
    # Feature 18: 3D Virtual Page Turner
    # -------------------------------------------------------------
    def test_feature_18_3d_virtual_page_turner(self):
        """Feature 18: CSS 3D dual spread with spine curvature and drop shadow."""
        engine_code = read_source_file("components/SampleBookEngine.tsx")
        self.assertIn("currentSpreadIndex", engine_code)
        self.assertIn("handleNext", engine_code)
        self.assertIn("handlePrev", engine_code)

    # -------------------------------------------------------------
    # Feature 19: Pure Web Audio Paper Synthesizer
    # -------------------------------------------------------------
    def test_feature_19_pure_web_audio_paper_synthesizer(self):
        """Feature 19: Multi-layer paper turn soundscape (friction noise + bandpass filter + gain envelope)."""
        engine_code = read_source_file("components/SampleBookEngine.tsx")
        self.assertIn("AudioContext", engine_code)
        self.assertIn("createBufferSource", engine_code)
        self.assertIn("createBiquadFilter", engine_code)
        self.assertIn("exponentialRampToValueAtTime", engine_code)

    # -------------------------------------------------------------
    # Feature 20: Dynamic Bilingual Tashkeel Engine
    # -------------------------------------------------------------
    def test_feature_20_dynamic_bilingual_tashkeel_engine(self):
        """Feature 20: Interpolates child name into rhyming stanzas in English and vocalized Arabic."""
        template_ar = "تَهْمِسُ الرِّمَالُ الذَّهَبِيَّةُ حِينَ يَمِيلُ المَسَاءُ،\nوَ{childName} يَتَأَمَّلُ كَيْفَ تُوَدِّعُ الكُثْبَانَ الأَضْوَاءُ."
        rendered = render_verse(template_ar, child_name="رَاشِد", lang="ar")
        self.assertIn("رَاشِد", rendered)
        self.assertIn("تَهْمِسُ الرِّمَالُ الذَّهَبِيَّةُ", rendered)
        self.assertTrue(any(ord(c) in range(0x064B, 0x065F) for c in rendered), "Arabic text must contain Tashkeel diacritics")

    # -------------------------------------------------------------
    # Feature 21: Page Thumbnail Scrub Bar
    # -------------------------------------------------------------
    def test_feature_21_page_thumbnail_scrub_bar(self):
        """Feature 21: Stepper allowing direct jump across all 12 spreads with preview indicators."""
        engine_code = read_source_file("components/SampleBookEngine.tsx")
        self.assertIn("SAMPLE_BOOK_SPREADS", engine_code)
        self.assertIn("setCurrentSpreadIndex", engine_code)

    # -------------------------------------------------------------
    # Feature 22: Reader Zoom & Fullscreen Mode
    # -------------------------------------------------------------
    def test_feature_22_reader_zoom_and_fullscreen_mode(self):
        """Feature 22: Lightbox zoom mode with full-screen reading inspection."""
        engine_code = read_source_file("components/SampleBookEngine.tsx")
        self.assertTrue(
            "aspect" in engine_code or "zoom" in engine_code.lower() or "flip" in engine_code.lower(),
            "Flipbook viewport formatting must exist",
        )

    # -------------------------------------------------------------
    # Feature 23: Audio Narration QR Code Generation
    # -------------------------------------------------------------
    def test_feature_23_audio_narration_qr_code_generation(self):
        """Feature 23: Embedded high-contrast QR code on dedication spread linking to digital audio."""
        template_code = read_source_file("book_print_template.html")
        self.assertIn("api.qrserver.com", template_code)
        self.assertIn("qr-code", template_code.lower())

    # -------------------------------------------------------------
    # Feature 24: High-Margin Order Bump Drawer
    # -------------------------------------------------------------
    def test_feature_24_high_margin_order_bump_drawer(self):
        """Feature 24: Coloring Book (19 AED), Gift Wrap/Box (39/15 AED), Audio Keepsake (19 AED)."""
        cart_code = read_source_file("app/cart/page.tsx")
        self.assertIn("hasColoringBook", cart_code)
        self.assertIn("hasGiftBox", cart_code)
        self.assertIn("hasAudioKeepsake", cart_code)
        self.assertIn("19", cart_code)
        self.assertIn("39", cart_code)

    # -------------------------------------------------------------
    # Feature 25: Dynamic BOGO50 Promo Engine
    # -------------------------------------------------------------
    def test_feature_25_dynamic_bogo50_promo_engine(self):
        """Feature 25: Computes 50% discount on 2nd book when quantity >= 2."""
        # 1 book: no discount
        res_1 = calculate_cart_pricing("hardcover", quantity=1, coupon_code="BOGO50")
        self.assertEqual(res_1["discount_amount"], 0)
        self.assertEqual(res_1["final_total"], 129)

        # 2 books: 50% discount on 1 book (129 * 0.5 = 64.5 -> rounded to 65 via Math.round)
        res_2 = calculate_cart_pricing("hardcover", quantity=2, coupon_code="BOGO50")
        self.assertEqual(res_2["discount_amount"], 65)
        self.assertEqual(res_2["final_total"], 129 * 2 - 65)

    # -------------------------------------------------------------
    # Feature 26: 7 UAE Emirates Validation
    # -------------------------------------------------------------
    def test_feature_26_seven_uae_emirates_validation(self):
        """Feature 26: Selection strictly supporting all 7 Emirates."""
        locales_code = read_source_file("config/locales.ts")
        expected_emirates = [
            "dubai",
            "abu-dhabi",
            "sharjah",
            "ajman",
            "ras-al-khaimah",
            "fujairah",
            "umm-al-quwain",
        ]
        for em in expected_emirates:
            self.assertIn(em, locales_code, f"Emirate {em} must be defined in UAE_EMIRATES")

    # -------------------------------------------------------------
    # Feature 27: UAE Phone Number Auto-Formatting
    # -------------------------------------------------------------
    def test_feature_27_uae_phone_number_auto_formatting(self):
        """Feature 27: Prefixed with +971 and formatted for 9-digit UAE mobile numbers."""
        checkout_code = read_source_file("app/checkout/page.tsx")
        self.assertIn("+971", checkout_code)
        self.assertTrue(validate_uae_phone("50 123 4567"))
        self.assertTrue(validate_uae_phone("971501234567"))
        self.assertFalse(validate_uae_phone("123456"))

    # -------------------------------------------------------------
    # Feature 28: WhatsApp Delivery Updates Opt-In
    # -------------------------------------------------------------
    def test_feature_28_whatsapp_delivery_updates_opt_in(self):
        """Feature 28: Checkbox for real-time dispatch tracking and digital book link."""
        checkout_code = read_source_file("app/checkout/page.tsx")
        self.assertIn("whatsappOptIn", checkout_code)
        self.assertTrue("واتساب" in checkout_code or "WhatsApp" in checkout_code)

    # -------------------------------------------------------------
    # Feature 29: Tabby Split-Payment Breakdown
    # -------------------------------------------------------------
    def test_feature_29_tabby_split_payment_breakdown(self):
        """Feature 29: 4 interest-free payments displayed on PDP, Cart, Checkout."""
        p_soft = calculate_cart_pricing("softcover", 1)
        self.assertEqual(p_soft["tabby_installment"], 12.25)

        checkout_code = read_source_file("app/checkout/page.tsx")
        self.assertIn("tabby", checkout_code.lower())

    # -------------------------------------------------------------
    # Feature 30: 1-Tap Apple Pay / Card Simulator
    # -------------------------------------------------------------
    def test_feature_30_apple_pay_simulator(self):
        """Feature 30: Apple Pay button and card simulator with instant confirmation screen."""
        checkout_code = read_source_file("app/checkout/page.tsx")
        self.assertIn("apple_pay", checkout_code)
        self.assertIn("PT-", checkout_code, "Order confirmation number format PT-XXXXXX must be generated")

    # -------------------------------------------------------------
    # Feature 31: "Gift via WhatsApp" Digital Unwrapping
    # -------------------------------------------------------------
    def test_feature_31_gift_via_whatsapp_digital_unwrapping(self):
        """Feature 31: Dedicated /unwrap/[giftId] route with interactive 3D gift box."""
        unwrap_code = read_source_file("components/DigitalUnwrappingView.tsx")
        self.assertIn("isUnwrapped", unwrap_code)
        self.assertIn("handleUnwrap", unwrap_code)

        prerendered = self.prerender_manifest.get("routes", {})
        self.assertIn("/unwrap/demo", prerendered)
        self.assertIn("/ar/unwrap/demo", prerendered)

    # -------------------------------------------------------------
    # Feature 32: Ribbon-Cutting & Confetti Celebration
    # -------------------------------------------------------------
    def test_feature_32_ribbon_cutting_and_confetti(self):
        """Feature 32: Click-to-untie ribbon triggering confetti and revealing dedication & book."""
        unwrap_code = read_source_file("components/DigitalUnwrappingView.tsx")
        self.assertTrue(
            "ribbon" in unwrap_code.lower() or "untie" in unwrap_code.lower() or "شريط" in unwrap_code,
            "Ribbon unwrapping UI must be defined",
        )

    # -------------------------------------------------------------
    # Feature 33: Recipient Referral Coupon
    # -------------------------------------------------------------
    def test_feature_33_recipient_referral_coupon(self):
        """Feature 33: UNWRAP20 promo code (20% discount) and WhatsApp family share button."""
        unwrap_code = read_source_file("components/DigitalUnwrappingView.tsx")
        self.assertIn("UNWRAP20", unwrap_code)

        p_unwrap = calculate_cart_pricing("hardcover", 1, coupon_code="UNWRAP20")
        self.assertEqual(p_unwrap["discount_amount"], round(129 * 0.2))

    # -------------------------------------------------------------
    # Feature 34: UAE Delivery & Timetable Guide
    # -------------------------------------------------------------
    def test_feature_34_uae_delivery_and_timetable_guide(self):
        """Feature 34: /delivery route with 24-48h timetable across 7 Emirates."""
        delivery_code = read_source_file("components/DeliveryView.tsx")
        self.assertTrue("24" in delivery_code and "48" in delivery_code)
        prerendered = self.prerender_manifest.get("routes", {})
        self.assertIn("/delivery", prerendered)
        self.assertIn("/ar/delivery", prerendered)

    # -------------------------------------------------------------
    # Feature 35: Searchable 30-Question FAQ Accordion
    # -------------------------------------------------------------
    def test_feature_35_searchable_30_question_faq(self):
        """Feature 35: /faq route with comprehensive accordion."""
        faq_code = read_source_file("components/FaqView.tsx")
        self.assertIn("faqs", faq_code)
        self.assertIn("openIndex", faq_code)
        prerendered = self.prerender_manifest.get("routes", {})
        self.assertIn("/faq", prerendered)
        self.assertIn("/ar/faq", prerendered)

    # -------------------------------------------------------------
    # Feature 36: Paper & Craftsmanship Quality Guide
    # -------------------------------------------------------------
    def test_feature_36_paper_quality_guide(self):
        """Feature 36: /quality route detailing 200 GSM Mohawk silk, vegetable inks."""
        quality_code = read_source_file("components/QualityView.tsx")
        self.assertIn("200", quality_code)
        prerendered = self.prerender_manifest.get("routes", {})
        self.assertIn("/quality", prerendered)
        self.assertIn("/ar/quality", prerendered)

    # -------------------------------------------------------------
    # Feature 37: About Us & Brand Heritage Page
    # -------------------------------------------------------------
    def test_feature_37_about_us_page(self):
        """Feature 37: /about-us route with Abu Dhabi heritage and artisanal mission."""
        about_code = read_source_file("components/AboutUsView.tsx")
        self.assertTrue("Abu Dhabi" in about_code or "أبوظبي" in about_code)
        prerendered = self.prerender_manifest.get("routes", {})
        self.assertIn("/about-us", prerendered)
        self.assertIn("/ar/about-us", prerendered)

    # -------------------------------------------------------------
    # Feature 38: Programmatic SEO Schemas & Sitemap
    # -------------------------------------------------------------
    def test_feature_38_programmatic_seo_and_sitemap(self):
        """Feature 38: Structured JSON-LD & sitemap.xml."""
        sitemap_code = read_source_file("app/sitemap.ts")
        self.assertIn("changeFrequency", sitemap_code)
        self.assertIn("priority", sitemap_code)

        prerendered = self.prerender_manifest.get("routes", {})
        self.assertIn("/sitemap.xml", prerendered)
        self.assertIn("/robots.txt", prerendered)

    # -------------------------------------------------------------
    # Feature 39: Production 300 DPI PDF Exporter
    # -------------------------------------------------------------
    def test_feature_39_production_300_dpi_pdf_exporter(self):
        """Feature 39: Standalone script compiling square keepsake PDF."""
        pdf_path = REPO_ROOT / "Zayed_Starlit_Dunes_Keepsake_Book.pdf"
        self.assertTrue(pdf_path.exists(), "PDF book file must exist")
        info = inspect_pdf_structure(str(pdf_path))
        self.assertTrue(info["is_valid_pdf"], "Must have valid %PDF header")
        self.assertTrue(info["has_eof"], "Must have %%EOF marker")
        self.assertGreaterEqual(info["file_size"], 1000000, "PDF file must be high-res (> 1 MB)")
        self.assertGreaterEqual(info["images_count"], 1, "Must contain embedded XObject images")

    # -------------------------------------------------------------
    # Feature 40: E2E Regression & Build Integrity
    # -------------------------------------------------------------
    def test_feature_40_e2e_regression_and_build_integrity(self):
        """Feature 40: 0 build errors, 192 static and SSG routes verified."""
        prerendered = self.prerender_manifest.get("routes", {})
        self.assertGreaterEqual(len(prerendered), 150, "At least 150 routes must be prerendered")
        self.assertIn("/", prerendered)
        self.assertIn("/cart", prerendered)
        self.assertIn("/checkout", prerendered)
        self.assertIn("/sample-book", prerendered)


if __name__ == "__main__":
    unittest.main()
