import json
import math
import os
import re
import struct
from pathlib import Path

REPO_ROOT = Path("/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks")
WEB_ROOT = REPO_ROOT / "web"
CONFIG_DIR = WEB_ROOT / "config"
COMPONENTS_DIR = WEB_ROOT / "components"
APP_DIR = WEB_ROOT / "app"
BUILD_DIR = WEB_ROOT / ".next"
SERVER_APP_DIR = BUILD_DIR / "server" / "app"

def js_round(x: float) -> int:
    """Emulates JavaScript Math.round(x) behavior."""
    return int(math.floor(x + 0.5))

def get_prerender_manifest():
    manifest_path = BUILD_DIR / "prerender-manifest.json"
    if not manifest_path.exists():
        raise FileNotFoundError(f"Prerender manifest not found at {manifest_path}")
    with open(manifest_path, "r", encoding="utf-8") as f:
        return json.load(f)

def get_routes_manifest():
    manifest_path = BUILD_DIR / "routes-manifest.json"
    if not manifest_path.exists():
        raise FileNotFoundError(f"Routes manifest not found at {manifest_path}")
    with open(manifest_path, "r", encoding="utf-8") as f:
        return json.load(f)

def get_app_path_routes_manifest():
    manifest_path = BUILD_DIR / "app-path-routes-manifest.json"
    if not manifest_path.exists():
        raise FileNotFoundError(f"App path manifest not found at {manifest_path}")
    with open(manifest_path, "r", encoding="utf-8") as f:
        return json.load(f)

def read_source_file(rel_path):
    target = WEB_ROOT / rel_path
    if not target.exists():
        target = REPO_ROOT / rel_path
    with open(target, "r", encoding="utf-8") as f:
        return f.read()

def render_verse(template: str, child_name: str, gender: str = "boy", gifter_name: str = "Mama & Baba", lang: str = "en") -> str:
    """
    Implements the exact logic of web/config/sampleBookData.ts:renderVerse
    """
    name_clean = child_name.strip() if child_name else ""
    if not name_clean:
        resolved_name = "زايد" if lang == "ar" else "Zayed"
    else:
        resolved_name = name_clean

    gifter_clean = gifter_name.strip() if gifter_name else ""
    if not gifter_clean:
        resolved_gifter = "ماما وبابا" if lang == "ar" else "Mama & Baba"
    else:
        resolved_gifter = gifter_clean

    if gender == "boy":
        resolved_gender = "البطل الصغير" if lang == "ar" else "boy"
    else:
        resolved_gender = "البطلة الصغيرة" if lang == "ar" else "girl"

    result = template.replace("{childName}", resolved_name)
    result = result.replace("{gifterName}", resolved_gifter)
    result = result.replace("{childGender}", resolved_gender)
    return result

def calculate_cart_pricing(
    format_type: str = "hardcover",
    quantity: int = 1,
    has_gift_box: bool = False,
    has_coloring_book: bool = False,
    has_audio_keepsake: bool = False,
    coupon_code: str = ""
):
    """
    Calculates cart pricing exactly as implemented in web/app/cart/page.tsx
    """
    if format_type == "layflat":
        base_unit_price = 169
    elif format_type == "hardcover":
        base_unit_price = 129
    else:
        base_unit_price = 49

    GIFT_BOX_PRICE = 39
    COLORING_BOOK_PRICE = 19
    AUDIO_KEEPSAKE_PRICE = 19

    addons_total = (
        (GIFT_BOX_PRICE if has_gift_box else 0) +
        (COLORING_BOOK_PRICE if has_coloring_book else 0) +
        (AUDIO_KEEPSAKE_PRICE if has_audio_keepsake else 0)
    )

    items_subtotal = base_unit_price * quantity
    gross_subtotal = items_subtotal + addons_total

    discount_amount = 0
    applied = coupon_code.strip().upper() if coupon_code else ""

    if applied == "BOGO50":
        if quantity >= 2:
            discount_amount = js_round(base_unit_price * 0.5)
    elif applied in ("DUBAI10", "MAGIC10"):
        discount_amount = js_round(gross_subtotal * 0.1)
    elif applied == "UNWRAP20":
        discount_amount = js_round(gross_subtotal * 0.2)

    final_total = max(gross_subtotal - discount_amount, 0)
    tabby_installment = round((final_total / 4) * 100) / 100

    return {
        "base_unit_price": base_unit_price,
        "items_subtotal": items_subtotal,
        "addons_total": addons_total,
        "gross_subtotal": gross_subtotal,
        "discount_amount": discount_amount,
        "final_total": final_total,
        "tabby_installment": tabby_installment,
    }

def validate_uae_phone(phone_input: str) -> bool:
    """
    Validates UAE phone format: 9 digits starting with 5 (e.g. 50 123 4567, 501234567)
    """
    cleaned = re.sub(r"[\s\-\+]", "", phone_input)
    if cleaned.startswith("971"):
        cleaned = cleaned[3:]
    return bool(re.match(r"^5[0-9]{8}$", cleaned))

def inspect_pdf_structure(filepath: str):
    """
    Parses low-level PDF structure and extracts metadata
    """
    with open(filepath, "rb") as f:
        data = f.read()

    header = data[:8].decode("latin1", errors="ignore")
    is_valid_pdf = header.startswith("%PDF-")
    has_eof = b"%%EOF" in data

    # Find page count from /Count or page objects
    page_count_match = re.search(rb"/Type\s*/Pages.*?/Count\s+(\d+)", data)
    page_count = int(page_count_match.group(1)) if page_count_match else None

    # Check for MediaBox 612 612 (8.5 x 8.5 inches square)
    mediabox_matches = re.findall(rb"/MediaBox\s*\[\s*0\s+0\s+(\d+)\s+(\d+)\s*\]", data)
    dimensions = []
    for w, h in mediabox_matches:
        dimensions.append((int(w), int(h)))

    # Find embedded images and filters
    images_count = len(re.findall(rb"/Subtype\s*/Image", data))
    jpeg_dct_count = len(re.findall(rb"/Filter\s*/DCTDecode", data))

    return {
        "is_valid_pdf": is_valid_pdf,
        "header": header.strip(),
        "has_eof": has_eof,
        "file_size": len(data),
        "page_count": page_count,
        "dimensions": dimensions,
        "images_count": images_count,
        "jpeg_dct_count": jpeg_dct_count,
    }
