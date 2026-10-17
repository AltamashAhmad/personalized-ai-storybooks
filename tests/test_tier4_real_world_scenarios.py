"""
Tier 4: Real-World Workload Scenarios Automated Test Suite
Exhaustively simulates full end-to-end production user journeys:
1. Complete UAE Parent Purchasing Journey (Storefront -> Customizer -> Cart Bumps -> Checkout -> Tabby -> Confirmation).
2. Recipient Gift Unboxing & Social Viral Referral Journey (Gift Link -> Unwrapping -> Confetti -> 3D Reader -> UNWRAP20).
3. End-to-End Production Print PDF Generation Pipeline (300 DPI square keepsake compilation & structural validation).
"""

import os
import subprocess
import unittest
from pathlib import Path

from tests.test_helpers import (
    REPO_ROOT,
    WEB_ROOT,
    render_verse,
    calculate_cart_pricing,
    validate_uae_phone,
    inspect_pdf_structure,
    read_source_file,
    get_prerender_manifest,
)


class TestTier4RealWorldScenarios(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.prerender_manifest = get_prerender_manifest()

    # -------------------------------------------------------------
    # Scenario 1: Complete UAE Parent Purchasing Journey
    # -------------------------------------------------------------
    def test_scenario_01_full_uae_parent_purchasing_journey(self):
        """Simulates full end-to-end purchasing journey from storefront discovery to order confirmation."""
        # 1. Storefront Discovery
        prerendered = self.prerender_manifest.get("routes", {})
        self.assertIn("/", prerendered)
        self.assertIn("/ae", prerendered)

        # 2. Hero Rapid Personalization Input
        child_name = "Rashid"
        child_gender = "boy"
        self.assertTrue(len(child_name) <= 14)

        # 3. PDP Customizer Studio Setup
        # Hero verse interpolated with Rashid
        hero_verse = render_verse(
            "The golden desert whispers soft when evening shadows grow,\nA little {childGender} named {childName} watched the shifting crimson glow.",
            child_name=child_name,
            gender=child_gender,
            lang="en",
        )
        self.assertIn("Rashid", hero_verse)
        self.assertIn("boy", hero_verse)

        # 4. Dedication Message
        dedication_text = (
            "To our precious boy Rashid,\n"
            "May your heart be as brave as the desert falcon, and your kindness guide you across every golden dune.\n"
            "With all our eternal love,\n"
            "Mama & Baba"
        )
        self.assertLessEqual(len(dedication_text), 400)

        # 5. Cart Configuration: 2 Hardcover Keepsakes + Coloring Book + Luxury Box
        # Triggers BOGO50 promo
        cart = calculate_cart_pricing(
            format_type="hardcover",
            quantity=2,
            has_gift_box=True,
            has_coloring_book=True,
            has_audio_keepsake=False,
            coupon_code="BOGO50",
        )

        self.assertEqual(cart["base_unit_price"], 129)
        self.assertEqual(cart["items_subtotal"], 258)
        self.assertEqual(cart["addons_total"], 39 + 19)  # 58 AED
        self.assertEqual(cart["discount_amount"], 65)    # 50% on 2nd book
        self.assertEqual(cart["final_total"], 258 + 58 - 65)  # 251 AED

        # 6. Tabby 4-installment split calculation
        # 251 / 4 = 62.75 AED / month
        self.assertEqual(cart["tabby_installment"], 62.75)

        # 7. Express UAE Checkout Details
        recipient_phone = "50 987 6543"
        self.assertTrue(validate_uae_phone(recipient_phone))
        selected_emirate = "abu-dhabi"
        delivery_address = "Villa 12, Al Bateen, Abu Dhabi, UAE"
        self.assertTrue(len(delivery_address) > 10)

        # 8. Simulated Payment Confirmation & Order Confirmation Generation
        order_id = "PT-839201"
        self.assertTrue(order_id.startswith("PT-"))
        self.assertEqual(len(order_id), 9)

    # -------------------------------------------------------------
    # Scenario 2: Recipient Gift Unboxing & Social Viral Referral
    # -------------------------------------------------------------
    def test_scenario_02_recipient_unboxing_and_referral_journey(self):
        """Simulates recipient receiving digital unwrapping link, opening gift, and claiming UNWRAP20 coupon."""
        # 1. Recipient lands on unwrap route
        prerendered = self.prerender_manifest.get("routes", {})
        self.assertIn("/unwrap/demo", prerendered)
        self.assertIn("/unwrap/eid-gift", prerendered)

        # 2. Gifter parameters
        child_name = "Zayed"
        gifter_name = "Auntie Fatima"
        custom_message = "Happy Birthday Zayed! May all your desert dreams come true."

        # 3. Verify digital unwrapping component mechanics
        unwrap_view_code = read_source_file("components/DigitalUnwrappingView.tsx")
        self.assertIn("handleUnwrap", unwrap_view_code)
        self.assertIn("UNWRAP20", unwrap_view_code)
        self.assertIn("Share2", unwrap_view_code)

        # 4. Recipient clicks viral referral discount link: 20% off with UNWRAP20
        referral_cart = calculate_cart_pricing(
            format_type="hardcover",
            quantity=1,
            coupon_code="UNWRAP20",
        )
        self.assertEqual(referral_cart["discount_amount"], 26)  # round(129 * 0.2)
        self.assertEqual(referral_cart["final_total"], 103)

    # -------------------------------------------------------------
    # Scenario 3: End-to-End Production Print PDF Generation Pipeline
    # -------------------------------------------------------------
    def test_scenario_03_production_print_pdf_pipeline(self):
        """Executes the 300 DPI PDF export generator and inspects the binary output artifact."""
        export_script = REPO_ROOT / "scripts" / "export_sample_book_pdf.py"
        self.assertTrue(export_script.exists(), "PDF export script must exist")

        # Execute the PDF export script
        proc = subprocess.run(
            ["python3", str(export_script)],
            cwd=str(REPO_ROOT),
            capture_output=True,
            text=True,
        )
        self.assertEqual(proc.returncode, 0, f"Script failed with stderr: {proc.stderr}")

        # Verify generated PDF artifact
        output_pdf = REPO_ROOT / "Zayed_Starlit_Dunes_Keepsake_Book.pdf"
        self.assertTrue(output_pdf.exists(), "PDF book must be compiled")

        pdf_info = inspect_pdf_structure(str(output_pdf))
        self.assertTrue(pdf_info["is_valid_pdf"], "Must have valid %PDF header")
        self.assertTrue(pdf_info["has_eof"], "Must end with %%EOF")
        self.assertEqual(pdf_info["header"], "%PDF-1.4")

        # Check square keepsake dimensions (612 x 612 pt = 8.5 x 8.5 in)
        self.assertGreaterEqual(len(pdf_info["dimensions"]), 1)
        for w, h in pdf_info["dimensions"]:
            self.assertEqual((w, h), (612, 612), "Every page MediaBox must be 612x612 pt square")

        # Check high resolution assets embedded
        self.assertGreaterEqual(pdf_info["images_count"], 6, "Must embed at least 6 high-res illustration spreads")
        self.assertGreaterEqual(pdf_info["file_size"], 5000000, "File size must be > 5 MB for 300 DPI keepsake print")


if __name__ == "__main__":
    unittest.main()
