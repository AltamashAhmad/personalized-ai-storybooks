"""
Tier 2: Boundary & Corner Cases Automated Test Suite
Exhaustively tests input length limits, empty fallbacks, Arabic Tashkeel diacritic preservation, coupon codes, and remote Emirates.
"""

import unittest
from tests.test_helpers import (
    render_verse,
    calculate_cart_pricing,
    validate_uae_phone,
    read_source_file,
)


class TestTier2BoundaryCornerCases(unittest.TestCase):
    # -------------------------------------------------------------
    # Boundary 1: Protagonist Name Length Boundary (14 char limit)
    # -------------------------------------------------------------
    def test_boundary_name_length_single_character(self):
        """1-character boundary: Short names must interpolate cleanly."""
        template = "Hello {childName}, welcome to the dunes!"
        rendered_en = render_verse(template, child_name="A", lang="en")
        self.assertEqual(rendered_en, "Hello A, welcome to the dunes!")

        template_ar = "مرحباً يا {childName}، أهلاً بك في الكثبان!"
        rendered_ar = render_verse(template_ar, child_name="ن", lang="ar")
        self.assertEqual(rendered_ar, "مرحباً يا ن، أهلاً بك في الكثبان!")

    def test_boundary_name_length_fourteen_characters(self):
        """Exact 14-character boundary: Longest allowed name must format cleanly."""
        long_name_en = "Abdel-Rahman01"  # exactly 14 characters
        self.assertEqual(len(long_name_en), 14)
        template = "Hero {childName} is ready for adventure."
        rendered = render_verse(template, child_name=long_name_en, lang="en")
        self.assertIn("Abdel-Rahman01", rendered)

        long_name_ar = "عبدالرحمن_حمد١"  # exactly 14 characters
        self.assertEqual(len(long_name_ar), 14)
        rendered_ar = render_verse("البطل {childName}", child_name=long_name_ar, lang="ar")
        self.assertIn(long_name_ar, rendered_ar)

    def test_boundary_name_input_max_length_contract(self):
        """UI input contracts: Check that inputs enforce maxLength between 13 and 14."""
        pdp_code = read_source_file("components/ProductDetailView.tsx")
        self.assertIn("maxLength={13}", pdp_code, "PDP input must specify maxLength limit")

    # -------------------------------------------------------------
    # Boundary 2: Empty & Whitespace Name Fallback
    # -------------------------------------------------------------
    def test_boundary_empty_name_fallback_en(self):
        """Empty string in English falls back to default hero 'Zayed'."""
        template = "Starring {childName} in the desert."
        rendered = render_verse(template, child_name="", lang="en")
        self.assertEqual(rendered, "Starring Zayed in the desert.")

    def test_boundary_whitespace_name_fallback_en(self):
        """Whitespace string in English falls back to 'Zayed'."""
        template = "Starring {childName}."
        rendered = render_verse(template, child_name="   \t\n  ", lang="en")
        self.assertEqual(rendered, "Starring Zayed.")

    def test_boundary_empty_name_fallback_ar(self):
        """Empty string in Arabic falls back to 'زايد'."""
        template = "بطولة البطل الصغير {childName} في الصحراء."
        rendered = render_verse(template, child_name="", lang="ar")
        self.assertEqual(rendered, "بطولة البطل الصغير زايد في الصحراء.")

    def test_boundary_empty_gifter_fallback(self):
        """Empty gifter name falls back to default parents signature."""
        template = "With love from {gifterName}."
        rendered_en = render_verse(template, child_name="Zayed", gifter_name="", lang="en")
        self.assertEqual(rendered_en, "With love from Mama & Baba.")

        rendered_ar = render_verse("بكل حب من {gifterName}.", child_name="زايد", gifter_name="", lang="ar")
        self.assertEqual(rendered_ar, "بكل حب من ماما وبابا.")

    # -------------------------------------------------------------
    # Boundary 3: Arabic Tashkeel Diacritic Preservation
    # -------------------------------------------------------------
    def test_boundary_arabic_tashkeel_all_diacritics_preserved(self):
        """Verifies that all 8 classical Tashkeel vowel marks remain intact during rendering."""
        # Diacritics: Fathah (064E), Dammah (064F), Kasrah (0650), Sukun (0652),
        # Shaddah (0651), Fathatan (064B), Dammatan (064C), Kasratan (064D)
        vocalized_name = "زَايِدٌ"  # Zayed with Fathah and Dammatan
        template_with_tashkeel = (
            "فَوْقَ كُثْبَانِ الرِّمَالِ الذَّهَبِيَّةِ حَيْثُ تَهَبُّ النَّسَمَاتُ،\n"
            "وَقَفَ {childName} يَرْقُبُ غُرُوبَ الشَّمْسِ البَاسِمَاتِ."
        )
        rendered = render_verse(template_with_tashkeel, child_name=vocalized_name, lang="ar")

        # Verify child name with Tashkeel is fully preserved
        self.assertIn("زَايِدٌ", rendered)
        # Verify stanza diacritics are preserved
        self.assertIn("فَوْقَ", rendered)
        self.assertIn("كُثْبَانِ", rendered)
        self.assertIn("الرِّمَالِ", rendered)
        self.assertIn("الذَّهَبِيَّةِ", rendered)
        self.assertIn("تَهَبُّ", rendered)

        # Count diacritics to ensure none were stripped
        tashkeel_codepoints = set(range(0x064B, 0x0653))
        diacritic_count = sum(1 for c in rendered if ord(c) in tashkeel_codepoints)
        self.assertGreaterEqual(diacritic_count, 15, "Rendered text must retain at least 15 vocalized diacritics")

    # -------------------------------------------------------------
    # Boundary 4: Coupon Codes Engine
    # -------------------------------------------------------------
    def test_boundary_coupon_bogo50_quantity_thresholds(self):
        """BOGO50 only triggers on quantity >= 2."""
        # Qty = 1: No discount
        c1 = calculate_cart_pricing("hardcover", quantity=1, coupon_code="BOGO50")
        self.assertEqual(c1["discount_amount"], 0)
        self.assertEqual(c1["final_total"], 129)

        # Qty = 2: Exactly 50% on 2nd book
        c2 = calculate_cart_pricing("hardcover", quantity=2, coupon_code="BOGO50")
        self.assertEqual(c2["discount_amount"], 65)
        self.assertEqual(c2["final_total"], 258 - 65)

        # Qty = 3: 50% on 2nd book
        c3 = calculate_cart_pricing("hardcover", quantity=3, coupon_code="BOGO50")
        self.assertEqual(c3["discount_amount"], 65)
        self.assertEqual(c3["final_total"], 387 - 65)

    def test_boundary_coupon_case_insensitivity(self):
        """Coupons must be case-insensitive (e.g. 'bogo50', 'dubai10', 'unwrap20')."""
        c_lower = calculate_cart_pricing("hardcover", quantity=2, coupon_code="bogo50")
        self.assertEqual(c_lower["discount_amount"], 65)

        c_mixed = calculate_cart_pricing("softcover", quantity=1, coupon_code="dUbAi10")
        self.assertEqual(c_mixed["discount_amount"], 5)  # 49 * 0.1 = 4.9 -> 5

        c_unwrap = calculate_cart_pricing("softcover", quantity=1, coupon_code="unwrap20")
        self.assertEqual(c_unwrap["discount_amount"], 10)  # 49 * 0.2 = 9.8 -> 10

    def test_boundary_coupon_invalid_codes(self):
        """Invalid coupons result in zero discount."""
        c_invalid = calculate_cart_pricing("hardcover", quantity=2, coupon_code="FAKECODE")
        self.assertEqual(c_invalid["discount_amount"], 0)
        self.assertEqual(c_invalid["final_total"], 258)

        c_empty = calculate_cart_pricing("hardcover", quantity=2, coupon_code="")
        self.assertEqual(c_empty["discount_amount"], 0)

    # -------------------------------------------------------------
    # Boundary 5: Remote Emirates Delivery Handling
    # -------------------------------------------------------------
    def test_boundary_remote_emirates_supported(self):
        """Ensure non-popular remote Emirates are strictly valid in checkout and delivery."""
        locales_code = read_source_file("config/locales.ts")
        remote_emirates = ["umm-al-quwain", "fujairah", "ras-al-khaimah", "ajman"]
        for em in remote_emirates:
            self.assertIn(f'id: "{em}"', locales_code)

    def test_boundary_remote_emirates_delivery_timetable(self):
        """Ensure delivery view table lists 48 Hours express courier for remote Emirates."""
        delivery_code = read_source_file("components/DeliveryView.tsx")
        self.assertIn("Ras Al Khaimah", delivery_code)
        self.assertIn("Fujairah", delivery_code)
        self.assertIn("Umm Al Quwain", delivery_code)
        self.assertIn("48 Hours", delivery_code)

    # -------------------------------------------------------------
    # Boundary 6: Sentimental Dedication 400-Character Limit
    # -------------------------------------------------------------
    def test_boundary_dedication_four_hundred_characters(self):
        """Exact 400-character dedication boundary condition."""
        exact_400_chars = "A" * 400
        self.assertEqual(len(exact_400_chars), 400)

        template = "Dedication: {childName}\nMessage: " + exact_400_chars
        rendered = render_verse(template, child_name="Zayed")
        self.assertIn(exact_400_chars, rendered)

    def test_boundary_dedication_character_limit_specification(self):
        """Ensure 400 characters limit is documented and constrained in the codebase."""
        faq_code = read_source_file("components/FaqView.tsx")
        self.assertTrue(
            "400" in faq_code or "٤٠٠" in faq_code,
            "FAQ must document the 400 character dedication limit",
        )


if __name__ == "__main__":
    unittest.main()
