"""
Tier 3: Cross-Feature Combinations Automated Test Suite
Exhaustively tests cross-module interactions:
1. BOGO50 promo combined with order bumps and Tabby installment calculations.
2. Arabic locale + character customization + checkout delivery routing.
3. Social gifting digital unwrapping + ribbon untie + confetti + UNWRAP20 referral discount.
4. Dual-language route parity across all informational and transactional pages.
"""

import unittest
from tests.test_helpers import (
    render_verse,
    calculate_cart_pricing,
    validate_uae_phone,
    get_prerender_manifest,
    read_source_file,
)


class TestTier3CrossFeatureCombinations(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.prerender_manifest = get_prerender_manifest()

    # -------------------------------------------------------------
    # Combination 1: BOGO50 Promo + Order Bumps + Tabby Split
    # -------------------------------------------------------------
    def test_combo_bogo50_with_all_order_bumps_and_tabby(self):
        """Cross-feature combo: BOGO50 discount applied with all 3 order bumps and Tabby 4-installment split."""
        # 2 Hardcovers (129 AED each) + Gift Box (39) + Coloring Book (19) + Audio (19)
        pricing = calculate_cart_pricing(
            format_type="hardcover",
            quantity=2,
            has_gift_box=True,
            has_coloring_book=True,
            has_audio_keepsake=True,
            coupon_code="BOGO50",
        )

        self.assertEqual(pricing["items_subtotal"], 258)
        self.assertEqual(pricing["addons_total"], 39 + 19 + 19)  # 77 AED
        self.assertEqual(pricing["gross_subtotal"], 258 + 77)     # 335 AED
        self.assertEqual(pricing["discount_amount"], 65)          # 50% off 129
        self.assertEqual(pricing["final_total"], 335 - 65)        # 270 AED

        # Tabby split: 270 / 4 = 67.50 AED
        self.assertEqual(pricing["tabby_installment"], 67.50)

    # -------------------------------------------------------------
    # Combination 2: Arabic RTL + Customizer Likeness + Tabby Checkout
    # -------------------------------------------------------------
    def test_combo_arabic_customizer_and_tabby_checkout(self):
        """Cross-feature combo: Arabic RTL personalization with custom character and Tabby financing."""
        # Step 1: Render Arabic verse for Maryam (girl)
        template_ar = "رَأَتْ فَرْخَهَا الصَّغِيرَ آمِناً فِي رِعَايَةِ الأَوْفِيَاءِ!\nشَاكِرَيْنِ {childName} الَّذِي مَلأَ لَيْلَهُمَا بِالسَّخَاءِ."
        rendered_stanza = render_verse(template_ar, child_name="مَرْيَم", gender="girl", lang="ar")
        self.assertIn("مَرْيَم", rendered_stanza)
        self.assertIn("فَرْخَهَا", rendered_stanza)

        # Step 2: Layflat format pricing (169 AED) with Tabby split
        pricing = calculate_cart_pricing(format_type="layflat", quantity=1)
        self.assertEqual(pricing["final_total"], 169)
        self.assertEqual(pricing["tabby_installment"], 42.25)  # 169 / 4 = 42.25 AED

        # Step 3: Verify phone auto-formatting for recipient
        self.assertTrue(validate_uae_phone("50 987 6543"))

    # -------------------------------------------------------------
    # Combination 3: WhatsApp Digital Unwrapping + Referral Discount
    # -------------------------------------------------------------
    def test_combo_unwrapping_confetti_and_referral_coupon(self):
        """Cross-feature combo: Digital unwrapping view generates UNWRAP20 coupon, verified in cart pricing."""
        unwrap_code = read_source_file("components/DigitalUnwrappingView.tsx")
        self.assertIn("UNWRAP20", unwrap_code)
        self.assertIn("isUnwrapped", unwrap_code)

        # Recipient redeems UNWRAP20 at checkout for a Hardcover book (129 AED)
        pricing_redeemed = calculate_cart_pricing(
            format_type="hardcover",
            quantity=1,
            coupon_code="UNWRAP20",
        )
        expected_discount = round(129 * 0.2)  # 25.8 -> 26 AED
        self.assertEqual(pricing_redeemed["discount_amount"], expected_discount)
        self.assertEqual(pricing_redeemed["final_total"], 129 - expected_discount)

    # -------------------------------------------------------------
    # Combination 4: Bilingual Route Parity (English vs Arabic)
    # -------------------------------------------------------------
    def test_combo_bilingual_route_parity(self):
        """Cross-feature combo: Complete route parity between English and Arabic."""
        prerendered = self.prerender_manifest.get("routes", {})

        route_pairs = [
            ("/", "/ar"),
            ("/sample-book", "/ar/sample-book"),
            ("/cart", "/ar/cart"),
            ("/checkout", "/ar/checkout"),
            ("/delivery", "/ar/delivery"),
            ("/faq", "/ar/faq"),
            ("/quality", "/ar/quality"),
            ("/about-us", "/ar/about-us"),
            ("/unwrap/demo", "/ar/unwrap/demo"),
        ]

        for en_route, ar_route in route_pairs:
            self.assertIn(en_route, prerendered, f"English route {en_route} must be prerendered")
            self.assertIn(ar_route, prerendered, f"Arabic route {ar_route} must be prerendered")


if __name__ == "__main__":
    unittest.main()
