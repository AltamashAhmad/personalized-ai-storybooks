import struct
import os

def get_jpeg_info(filepath):
    with open(filepath, 'rb') as f:
        data = f.read()
    i = 0
    while i < len(data) - 1:
        if data[i] == 0xFF:
            marker = data[i+1]
            if marker in (0xC0, 0xC1, 0xC2):
                h, w = struct.unpack('>HH', data[i+5:i+9])
                return w, h, data
            elif marker not in (0xD8, 0xD9, 0x00):
                length = struct.unpack('>H', data[i+2:i+4])[0]
                i += 2 + length
                continue
        i += 1
    return None, None, None

class SimplePDF:
    def __init__(self):
        self.objects = []
        self.pages = []
        self.images = {} # name -> (w, h, data, obj_idx)
        
    def add_object(self, content):
        self.objects.append(content)
        return len(self.objects) # 1-based index

    def add_image(self, name, filepath):
        w, h, data = get_jpeg_info(filepath)
        if not data:
            raise ValueError(f"Failed to read JPEG: {filepath}")
        self.images[name] = {
            "w": w,
            "h": h,
            "data": data,
            "obj_id": None
        }

    def add_page(self, stream_content):
        self.pages.append(stream_content)

    def compile(self, output_path):
        # 1. Catalog obj
        # 2. Pages obj
        # 3. Font obj (Helvetica)
        # 4. Font obj (Helvetica-Bold)
        # 5. Font obj (Times-Roman)
        # 6. Font obj (Times-Bold)
        # Image objects
        # Page objects & Page stream objects
        
        pdf_bytes = bytearray()
        pdf_bytes.extend(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
        
        offsets = {}
        
        # We will build objects sequentially
        objects_dict = {}
        next_id = 1
        
        catalog_id = next_id; next_id += 1
        pages_id = next_id; next_id += 1
        font_helv_id = next_id; next_id += 1
        font_bold_id = next_id; next_id += 1
        font_times_id = next_id; next_id += 1
        font_times_bold_id = next_id; next_id += 1
        
        # Allocate image object ids
        for img_name in self.images:
            self.images[img_name]["obj_id"] = next_id
            next_id += 1
            
        page_ids = []
        page_stream_ids = []
        for _ in self.pages:
            page_ids.append(next_id); next_id += 1
            page_stream_ids.append(next_id); next_id += 1
            
        # Write Catalog
        objects_dict[catalog_id] = f"<< /Type /Catalog /Pages {pages_id} 0 R >>".encode('latin1')
        
        # Write Pages root
        kids_refs = " ".join([f"{pid} 0 R" for pid in page_ids])
        objects_dict[pages_id] = f"<< /Type /Pages /Kids [{kids_refs}] /Count {len(page_ids)} >>".encode('latin1')
        
        # Write Standard Type 1 Fonts
        objects_dict[font_helv_id] = b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"
        objects_dict[font_bold_id] = b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"
        objects_dict[font_times_id] = b"<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman >>"
        objects_dict[font_times_bold_id] = b"<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold >>"
        
        # Write Images
        for img_name, img_info in self.images.items():
            header = (
                f"<< /Type /XObject /Subtype /Image /Width {img_info['w']} /Height {img_info['h']} "
                f"/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length {len(img_info['data'])} >>\nstream\n"
            ).encode('latin1')
            footer = b"\nendstream"
            objects_dict[img_info["obj_id"]] = header + img_info["data"] + footer
            
        # Build resource dict string
        img_xobjects = " ".join([f"/{name} {info['obj_id']} 0 R" for name, info in self.images.items()])
        res_dict = (
            f"/Font << /F1 {font_helv_id} 0 R /F2 {font_bold_id} 0 R /F3 {font_times_id} 0 R /F4 {font_times_bold_id} 0 R >> "
            f"/XObject << {img_xobjects} >> /ProcSet [/PDF /Text /ImageC]"
        )
        
        # Write Pages & Content Streams
        for idx in range(len(self.pages)):
            pid = page_ids[idx]
            sid = page_stream_ids[idx]
            stream_data = self.pages[idx].encode('utf-8')
            
            # Page object: 612 x 612 pt (8.5 x 8.5 inches square picture book format)
            page_obj = (
                f"<< /Type /Page /Parent {pages_id} 0 R /MediaBox [0 0 612 612] "
                f"/Contents {sid} 0 R /Resources << {res_dict} >> >>"
            ).encode('latin1')
            objects_dict[pid] = page_obj
            
            # Stream object
            stream_obj = (
                f"<< /Length {len(stream_data)} >>\nstream\n"
            ).encode('latin1') + stream_data + b"\nendstream"
            objects_dict[sid] = stream_obj
            
        # Serialize everything and record byte offsets
        for obj_num in range(1, next_id):
            offsets[obj_num] = len(pdf_bytes)
            pdf_bytes.extend(f"{obj_num} 0 obj\n".encode('latin1'))
            pdf_bytes.extend(objects_dict[obj_num])
            pdf_bytes.extend(b"\nendobj\n")
            
        xref_offset = len(pdf_bytes)
        pdf_bytes.extend(f"xref\n0 {next_id}\n".encode('latin1'))
        pdf_bytes.extend(b"0000000000 65535 f \n")
        for obj_num in range(1, next_id):
            pdf_bytes.extend(f"{offsets[obj_num]:010d} 00000 n \n".encode('latin1'))
            
        trailer = (
            f"trailer\n<< /Size {next_id} /Root {catalog_id} 0 R >>\n"
            f"startxref\n{xref_offset}\n%%EOF\n"
        ).encode('latin1')
        pdf_bytes.extend(trailer)
        
        with open(output_path, "wb") as f:
            f.write(pdf_bytes)
        print(f"Successfully generated PDF ({len(pdf_bytes)} bytes): {output_path}")

def escape_pdf_text(text):
    return text.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')

def build_storybook_pdf():
    pdf = SimplePDF()
    
    # Register image assets
    cover_img_path = "/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/research/competitor_assets/cover_and_gift_box_mockup.jpg"
    interior_img_path = "/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/research/competitor_assets/interior_spread_mockup.jpg"
    
    pdf.add_image("CoverImg", cover_img_path)
    pdf.add_image("InteriorImg", interior_img_path)
    
    # ----------------------------------------------------
    # PAGE 1: FRONT COVER
    # ----------------------------------------------------
    p1 = """
    q
    % Background Cover Image
    0 0 612 612 re W n
    612 0 0 612 0 0 cm
    /CoverImg Do
    Q
    
    % Semi-transparent dark overlay gradient for readability
    q
    0 0 0 rg
    0 0 612 180 re f
    0 480 612 132 re f
    Q
    
    % Title & Branding
    BT
    /F2 12 Tf
    1 0.8 0.2 rg
    180 570 Td
    (★ HIKAYATI LUXURY KEEPSAKE EDITION ★) Tj
    ET
    
    BT
    /F4 26 Tf
    1 1 1 rg
    100 520 Td
    (ZAYED & THE SECRET OF THE STARS) Tj
    ET
    
    BT
    /F2 13 Tf
    0.9 0.9 0.9 rg
    110 80 Td
    (Specially Written & Illustrated for Zayed | Abu Dhabi, UAE) Tj
    ET
    """
    pdf.add_page(p1)
    
    # ----------------------------------------------------
    # PAGE 2: SENTIMENTAL DEDICATION PAGE
    # ----------------------------------------------------
    p2 = """
    q
    % Soft warm cream background
    0.98 0.97 0.95 rg
    0 0 612 612 re f
    
    % Elegant Border
    0.2 0.3 0.5 RG
    2 w
    36 36 540 540 re S
    0.8 0.6 0.2 RG
    1 w
    42 42 528 528 re S
    Q
    
    BT
    /F2 12 Tf
    0.5 0.5 0.6 rg
    230 520 Td
    (A VERY SPECIAL DEDICATION) Tj
    ET
    
    BT
    /F4 22 Tf
    0.1 0.15 0.3 rg
    160 470 Td
    (To Our Brave Little Explorer, Zayed) Tj
    ET
    
    BT
    /F3 16 Tf
    0.2 0.2 0.2 rg
    85 390 Td
    (May your heart always soar as high as the golden falcon,) Tj
    0 -26 Td
    (and may your curiosity light up the darkest night.) Tj
    0 -26 Td
    (Never forget that you are capable of wondrous things,) Tj
    0 -26 Td
    (and that kindness is the greatest compass of all.) Tj
    ET
    
    BT
    /F4 15 Tf
    0.8 0.5 0.1 rg
    215 250 Td
    (With all our love forever and always,) Tj
    0 -24 Td
    (Mummy & Daddy xxx) Tj
    ET
    
    % QR Code Box for Bedtime Audio
    q
    0.9 0.92 0.96 rg
    206 80 200 110 re f
    0.7 0.8 0.9 RG
    1 w
    206 80 200 110 re S
    Q
    
    BT
    /F2 11 Tf
    0.1 0.2 0.4 rg
    230 160 Td
    (SCAN FOR BEDTIME AUDIO) Tj
    /F1 9 Tf
    0.3 0.3 0.3 rg
    220 140 Td
    ([ Interactive Bedtime Narration ]) Tj
    225 110 Td
    (hikayati.ae/audio/zayed-789) Tj
    ET
    """
    pdf.add_page(p2)
    
    # ----------------------------------------------------
    # PAGE 3: SPREAD 1 (STORY TEXT - CHAPTER ONE)
    # ----------------------------------------------------
    p3 = """
    q
    % Cream background
    0.99 0.98 0.96 rg
    0 0 612 612 re f
    
    % Decorative header line
    0.8 0.8 0.8 RG
    1 w
    50 540 m 562 540 l S
    50 70 m 562 70 l S
    Q
    
    BT
    /F2 11 Tf
    0.5 0.5 0.5 rg
    50 550 Td
    (CHAPTER ONE: THE GOLDEN DISCOVERY) Tj
    350 0 Td
    (ABU DHABI SANDS) Tj
    ET
    
    % English Verse
    BT
    /F4 18 Tf
    0.1 0.15 0.3 rg
    70 450 Td
    (Across the golden dunes where warm winds blow,) Tj
    0 -28 Td
    (Young Zayed watched the desert sunset glow.) Tj
    0 -38 Td
    (Beneath the sand, a golden compass gleamed,) Tj
    0 -28 Td
    (More magical than anything he'd dreamed!) Tj
    ET
    
    % Arabic Verse Translation Note (Rendered with poetic Romanized / Arabic notice)
    BT
    /F2 14 Tf
    0.8 0.5 0.1 rg
    70 280 Td
    ([ ARABIC EDITION WITH FULL TASHKEEL ]) Tj
    /F3 13 Tf
    0.2 0.3 0.5 rg
    70 245 Td
    (Fawqa kuthbani ar-rimali adh-dhahabiyyah...) Tj
    0 -22 Td
    (Tawassa'a Zayed as-saghiru yarqubu ghuroob ash-shams...) Tj
    0 -22 Td
    (Wa tahta ar-ramli lama'at bawsalatun min dhahabin safin...) Tj
    0 -22 Td
    (Tafuqu fee sihriha kulla hulmin jameel!) Tj
    ET
    
    BT
    /F1 10 Tf
    0.6 0.6 0.6 rg
    50 50 Td
    (Page 3) Tj
    400 0 Td
    (Zayed & the Secret of the Starlit Dunes) Tj
    ET
    """
    pdf.add_page(p3)
    
    # ----------------------------------------------------
    # PAGE 4: SPREAD 1 (FULL-BLEED ARTWORK)
    # ----------------------------------------------------
    p4 = """
    q
    0 0 612 612 re W n
    612 0 0 612 0 0 cm
    /InteriorImg Do
    Q
    """
    pdf.add_page(p4)
    
    # ----------------------------------------------------
    # PAGE 5: SPREAD 2 (STORY TEXT - CHAPTER TWO)
    # ----------------------------------------------------
    p5 = """
    q
    0.99 0.98 0.96 rg
    0 0 612 612 re f
    0.8 0.8 0.8 RG
    1 w
    50 540 m 562 540 l S
    50 70 m 562 70 l S
    Q
    
    BT
    /F2 11 Tf
    0.5 0.5 0.5 rg
    50 550 Td
    (CHAPTER TWO: A FEATHERED FRIEND) Tj
    370 0 Td
    (LIWA OASIS) Tj
    ET
    
    BT
    /F4 18 Tf
    0.1 0.15 0.3 rg
    70 450 Td
    (The compass hummed and pointed to a stone,) Tj
    0 -28 Td
    (Where sat a tiny falcon, all alone.) Tj
    0 -38 Td
    (Its golden wing was caught in desert vine,) Tj
    0 -28 Td
    (Zayed gently smiled and said: "Your wing is fine!") Tj
    ET
    
    BT
    /F2 14 Tf
    0.8 0.5 0.1 rg
    70 280 Td
    ([ ARABIC EDITION WITH FULL TASHKEEL ]) Tj
    /F3 13 Tf
    0.2 0.3 0.5 rg
    70 245 Td
    (Hamasati al-bawsalatu wa asharat ila sakhratin fil-mada...) Tj
    0 -22 Td
    (Haythu jalasa saqrun sagheerun yabhathu 'an al-huda...) Tj
    0 -22 Td
    (Kana janahuhu adh-dhahabiyyu 'aliqan bayna al-aghsaan...) Tj
    0 -22 Td
    (Fabtasama Zayedun qa'ilan: La takhaf, fa ana 'awnuka!) Tj
    ET
    
    BT
    /F1 10 Tf
    0.6 0.6 0.6 rg
    50 50 Td
    (Page 5) Tj
    400 0 Td
    (Zayed & the Secret of the Starlit Dunes) Tj
    ET
    """
    pdf.add_page(p5)
    
    # ----------------------------------------------------
    # PAGE 6: SPREAD 2 (FULL-BLEED ARTWORK)
    # ----------------------------------------------------
    p6 = """
    q
    0 0 612 612 re W n
    612 0 0 612 0 0 cm
    /InteriorImg Do
    Q
    """
    pdf.add_page(p6)
    
    # ----------------------------------------------------
    # PAGE 7: SPREAD 3 (CHAPTER THREE - GRAND MOSQUE)
    # ----------------------------------------------------
    p7 = """
    q
    0.99 0.98 0.96 rg
    0 0 612 612 re f
    0.8 0.8 0.8 RG
    1 w
    50 540 m 562 540 l S
    50 70 m 562 70 l S
    Q
    
    BT
    /F2 11 Tf
    0.5 0.5 0.5 rg
    50 550 Td
    (CHAPTER THREE: FLIGHT OVER ABU DHABI) Tj
    320 0 Td
    (GRAND MOSQUE) Tj
    ET
    
    BT
    /F4 18 Tf
    0.1 0.15 0.3 rg
    70 450 Td
    (With wings now free, the falcon leaped so high,) Tj
    0 -28 Td
    (Inviting Zayed to watch the starry sky.) Tj
    0 -38 Td
    (Above the glowing oasis they took flight,) Tj
    0 -28 Td
    (Where shining domes lit up the peaceful night!) Tj
    ET
    
    BT
    /F4 16 Tf
    0.1 0.3 0.6 rg
    70 260 Td
    ("True courage is not having no fear,") Tj
    0 -24 Td
    ("it is choosing kindness when someone needs a helping hand.") Tj
    ET
    
    BT
    /F1 10 Tf
    0.6 0.6 0.6 rg
    50 50 Td
    (Page 7) Tj
    400 0 Td
    (Zayed & the Secret of the Starlit Dunes) Tj
    ET
    """
    pdf.add_page(p7)
    
    # ----------------------------------------------------
    # PAGE 8: BACK COVER
    # ----------------------------------------------------
    p8 = """
    q
    0.05 0.08 0.18 rg
    0 0 612 612 re f
    
    0.8 0.6 0.2 RG
    2 w
    36 36 540 540 re S
    Q
    
    BT
    /F2 13 Tf
    1 0.8 0.2 rg
    215 520 Td
    (★ HIKAYATI KEEPSAKE BOOKS ★) Tj
    ET
    
    BT
    /F3 15 Tf
    0.9 0.9 0.9 rg
    85 380 Td
    (Tonight, young Zayed unlocked the ancient magic of the Abu Dhabi dunes.) Tj
    0 -25 Td
    (A heartwarming bedtime journey of courage, companionship, and the) Tj
    0 -25 Td
    (everlasting bond between a brave boy and his golden falcon.) Tj
    ET
    
    % Barcode Box
    q
    1 1 1 rg
    206 120 200 70 re f
    Q
    
    BT
    /F2 11 Tf
    0 0 0 rg
    230 160 Td
    (ISBN 978-0-998877-01-2) Tj
    /F1 9 Tf
    240 135 Td
    (MADE IN THE UAE) Tj
    ET
    """
    pdf.add_page(p8)
    
    output_pdf = "/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/Zayed_And_The_Starlit_Dunes_Keepsake_Book.pdf"
    pdf.compile(output_pdf)

if __name__ == "__main__":
    build_storybook_pdf()
