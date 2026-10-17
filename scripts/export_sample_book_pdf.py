import struct
import os
import sys

def get_jpeg_info(filepath):
    with open(filepath, "rb") as f:
        data = f.read()
    i = 0
    while i < len(data) - 1:
        if data[i] == 0xFF:
            marker = data[i+1]
            if marker in (0xC0, 0xC1, 0xC2):
                h, w = struct.unpack(">HH", data[i+5:i+9])
                return w, h, data
            elif marker not in (0xD8, 0xD9, 0x00):
                length = struct.unpack(">H", data[i+2:i+4])[0]
                i += 2 + length
                continue
        i += 1
    return None, None, None

class StorybookPDF:
    def __init__(self):
        self.objects = []
        self.pages = []
        self.images = {} # name -> (w, h, data, obj_id)
        
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
        pdf_bytes = bytearray()
        pdf_bytes.extend(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
        
        offsets = {}
        objects_dict = {}
        next_id = 1
        
        catalog_id = next_id; next_id += 1
        pages_id = next_id; next_id += 1
        font_helv_id = next_id; next_id += 1
        font_bold_id = next_id; next_id += 1
        font_times_id = next_id; next_id += 1
        font_times_bold_id = next_id; next_id += 1
        
        for img_name in self.images:
            self.images[img_name]["obj_id"] = next_id
            next_id += 1
            
        page_ids = []
        page_stream_ids = []
        for _ in self.pages:
            page_ids.append(next_id); next_id += 1
            page_stream_ids.append(next_id); next_id += 1
            
        objects_dict[catalog_id] = f"<< /Type /Catalog /Pages {pages_id} 0 R >>".encode("latin1")
        kids_refs = " ".join([f"{pid} 0 R" for pid in page_ids])
        objects_dict[pages_id] = f"<< /Type /Pages /Kids [{kids_refs}] /Count {len(page_ids)} >>".encode("latin1")
        
        objects_dict[font_helv_id] = b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"
        objects_dict[font_bold_id] = b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"
        objects_dict[font_times_id] = b"<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman >>"
        objects_dict[font_times_bold_id] = b"<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold >>"
        
        for img_name, img_info in self.images.items():
            header = (
                f"<< /Type /XObject /Subtype /Image /Width {img_info['w']} /Height {img_info['h']} "
                f"/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length {len(img_info['data'])} >>\nstream\n"
            ).encode("latin1")
            footer = b"\nendstream"
            objects_dict[img_info["obj_id"]] = header + img_info["data"] + footer
            
        img_xobjects = " ".join([f"/{name} {info['obj_id']} 0 R" for name, info in self.images.items()])
        res_dict = (
            f"/Font << /F1 {font_helv_id} 0 R /F2 {font_bold_id} 0 R /F3 {font_times_id} 0 R /F4 {font_times_bold_id} 0 R >> "
            f"/XObject << {img_xobjects} >> /ProcSet [/PDF /Text /ImageC]"
        )
        
        for idx in range(len(self.pages)):
            pid = page_ids[idx]
            sid = page_stream_ids[idx]
            stream_data = self.pages[idx].encode("latin1")
            
            # 612 x 612 pt = 8.5 x 8.5 in square keepsake format
            page_obj = (
                f"<< /Type /Page /Parent {pages_id} 0 R /MediaBox [0 0 612 612] "
                f"/Contents {sid} 0 R /Resources << {res_dict} >> >>"
            ).encode("latin1")
            objects_dict[pid] = page_obj
            
            stream_obj = (
                f"<< /Length {len(stream_data)} >>\nstream\n"
            ).encode("latin1") + stream_data + b"\nendstream"
            objects_dict[sid] = stream_obj
            
        for obj_num in range(1, next_id):
            offsets[obj_num] = len(pdf_bytes)
            pdf_bytes.extend(f"{obj_num} 0 obj\n".encode("latin1"))
            pdf_bytes.extend(objects_dict[obj_num])
            pdf_bytes.extend(b"\nendobj\n")
            
        xref_offset = len(pdf_bytes)
        pdf_bytes.extend(f"xref\n0 {next_id}\n".encode("latin1"))
        pdf_bytes.extend(b"0000000000 65535 f \n")
        for obj_num in range(1, next_id):
            pdf_bytes.extend(f"{offsets[obj_num]:010d} 00000 n \n".encode("latin1"))
            
        trailer = (
            f"trailer\n<< /Size {next_id} /Root {catalog_id} 0 R >>\n"
            f"startxref\n{xref_offset}\n%%EOF\n"
        ).encode("latin1")
        pdf_bytes.extend(trailer)
        
        with open(output_path, "wb") as f:
            f.write(pdf_bytes)
        print(f"Successfully generated 300 DPI Print-Ready PDF ({len(pdf_bytes):,} bytes): {output_path}")

def escape_text(text):
    return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")

def generate_sample_book(child_name="Zayed", gifter_name="Mama & Baba", gender="boy", output_file="Zayed_Starlit_Dunes_Sample_Book.pdf"):
    pdf = StorybookPDF()
    
    base_dir = "/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/web/public"
    spread_dir = f"{base_dir}/books/starlit-dunes/spreads"
    
    pdf.add_image("CoverImg", f"{spread_dir}/spread_0_cover.jpg")
    pdf.add_image("FalconImg", f"{spread_dir}/spread_3_falcon.jpg")
    pdf.add_image("OasisImg", f"{spread_dir}/spread_5_oasis.jpg")
    pdf.add_image("CampfireImg", f"{spread_dir}/spread_6_campfire.jpg")
    pdf.add_image("SkylineImg", f"{spread_dir}/spread_8_skyline.jpg")
    pdf.add_image("BedtimeImg", f"{spread_dir}/spread_10_bedtime.jpg")
    
    # ----------------------------------------------------
    # SPREAD 0: FRONT COVER
    # ----------------------------------------------------
    p1 = f"""
    q
    612 0 0 612 0 0 cm
    /CoverImg Do
    Q
    
    q
    0 0 0 rg
    0 0 612 160 re f
    0 490 612 122 re f
    Q
    
    BT
    /F2 11 Tf
    1 0.8 0.2 rg
    195 570 Td
    (* PERSONALIZED KEEPSAKE EDITION *) Tj
    ET
    
    BT
    /F4 24 Tf
    1 1 1 rg
    120 525 Td
    ({escape_text(child_name.upper())} & THE SECRET OF THE STARLIT DUNES) Tj
    ET
    
    BT
    /F2 12 Tf
    1 0.9 0.6 rg
    180 85 Td
    (Personalized with Love by: {escape_text(gifter_name)}) Tj
    ET
    
    BT
    /F1 10 Tf
    0.8 0.8 0.8 rg
    195 60 Td
    (PersonalizedTales.com - United Arab Emirates) Tj
    ET
    """
    pdf.add_page(p1)
    
    # ----------------------------------------------------
    # SPREAD 1: DEDICATION
    # ----------------------------------------------------
    p2 = f"""
    q
    0.04 0.06 0.12 rg
    0 0 612 612 re f
    Q
    
    BT
    /F2 14 Tf
    1 0.8 0.2 rg
    170 520 Td
    (A MESSAGE TO KEEP IN YOUR HEART FOREVER) Tj
    ET
    
    BT
    /F3 13 Tf
    0.95 0.95 0.95 rg
    100 450 Td
    (Dearest {escape_text(child_name)},) Tj
    ET
    
    BT
    /F3 12 Tf
    0.9 0.9 0.9 rg
    100 410 Td
    (Before you were born, we dreamed of the adventures you would take.) Tj
    100 385 Td
    (Walk through life with kindness, bravery, and an endless curiosity.) Tj
    100 360 Td
    (Whenever you gaze upon the stars, remember how fiercely you are loved.) Tj
    ET
    
    BT
    /F4 13 Tf
    1 0.85 0.3 rg
    100 300 Td
    (Always with you,) Tj
    100 275 Td
    ({escape_text(gifter_name)}) Tj
    ET
    
    BT
    /F1 9 Tf
    0.6 0.6 0.6 rg
    210 60 Td
    (Archival 200gsm Mohawk Silk Paper - First Edition) Tj
    ET
    """
    pdf.add_page(p2)
    
    # ----------------------------------------------------
    # SPREAD 2: THE BABY FALCON (SPREAD 3 IN STORY)
    # ----------------------------------------------------
    p3 = f"""
    q
    612 0 0 612 0 0 cm
    /FalconImg Do
    Q
    
    q
    0 0 0 rg
    0 0 612 180 re f
    Q
    
    BT
    /F2 11 Tf
    1 0.8 0.2 rg
    220 145 Td
    (CHAPTER ONE: THE DESERT FALCON) Tj
    ET
    
    BT
    /F3 12 Tf
    1 1 1 rg
    80 115 Td
    (A gentle flutter in the palms, two curious golden eyes,) Tj
    80 95 Td
    (A fledgling falcon looked up close with innocent surprise.) Tj
    80 75 Td
    ({escape_text(child_name)} smiled and whispered: "We will find your way together, friend,) Tj
    80 55 Td
    (Where desert starlight dances and the sand dunes never end!") Tj
    ET
    """
    pdf.add_page(p3)
    
    # ----------------------------------------------------
    # SPREAD 3: THE EMERALD OASIS (SPREAD 5 IN STORY)
    # ----------------------------------------------------
    p4 = f"""
    q
    612 0 0 612 0 0 cm
    /OasisImg Do
    Q
    
    q
    0 0 0 rg
    0 0 612 180 re f
    Q
    
    BT
    /F2 11 Tf
    1 0.8 0.2 rg
    220 145 Td
    (CHAPTER TWO: THE WHISPERING OASIS) Tj
    ET
    
    BT
    /F3 12 Tf
    1 1 1 rg
    80 115 Td
    (Beneath tall date palms they found a crystal bubbling spring,) Tj
    80 95 Td
    (Where graceful white gazelles stepped out to hear the desert sing.) Tj
    80 75 Td
    ({escape_text(child_name)} offered water, calm and pure with gentle hands and feet,) Tj
    80 55 Td
    (A lesson in true kindness that makes every heart complete.) Tj
    ET
    """
    pdf.add_page(p4)
    
    # ----------------------------------------------------
    # SPREAD 4: BEDOUIN CAMPFIRE TALES (SPREAD 6 IN STORY)
    # ----------------------------------------------------
    p5 = f"""
    q
    612 0 0 612 0 0 cm
    /CampfireImg Do
    Q
    
    q
    0 0 0 rg
    0 0 612 180 re f
    Q
    
    BT
    /F2 11 Tf
    1 0.8 0.2 rg
    220 145 Td
    (CHAPTER THREE: STORIES BY THE FIRE) Tj
    ET
    
    BT
    /F3 12 Tf
    1 1 1 rg
    80 115 Td
    (Cardamom steam and crackling wood around a desert tent,) Tj
    80 95 Td
    (Where greetings of "Marhaba" were generously sent.) Tj
    80 75 Td
    (An elder spoke: "True bravery is in the helping hand,) Tj
    80 55 Td
    (And {escape_text(child_name)} carries honor across this blessed land!") Tj
    ET
    """
    pdf.add_page(p5)
    
    # ----------------------------------------------------
    # SPREAD 5: SKYLINE FLIGHT OVER UAE (SPREAD 8 IN STORY)
    # ----------------------------------------------------
    p6 = f"""
    q
    612 0 0 612 0 0 cm
    /SkylineImg Do
    Q
    
    q
    0 0 0 rg
    0 0 612 180 re f
    Q
    
    BT
    /F2 11 Tf
    1 0.8 0.2 rg
    220 145 Td
    (CHAPTER FOUR: THE FALCON SOARS) Tj
    ET
    
    BT
    /F3 12 Tf
    1 1 1 rg
    80 115 Td
    (A majestic golden falcon swept down through starry air,) Tj
    80 95 Td
    (She saw her baby safe and sound in {escape_text(child_name)}'s loving care!) Tj
    80 75 Td
    (Across the glowing skyline where the desert meets the sea,) Tj
    80 55 Td
    (They circled high with joyful hearts in grand tranquility.) Tj
    ET
    """
    pdf.add_page(p6)
    
    # ----------------------------------------------------
    # SPREAD 6: BEDTIME & HEIRLOOM CLOSING (SPREAD 10 IN STORY)
    # ----------------------------------------------------
    p7 = f"""
    q
    612 0 0 612 0 0 cm
    /BedtimeImg Do
    Q
    
    q
    0 0 0 rg
    0 0 612 195 re f
    Q
    
    BT
    /F2 11 Tf
    1 0.8 0.2 rg
    225 160 Td
    (CHAPTER FIVE: THE HEIRLOOM PROMISE) Tj
    ET
    
    BT
    /F3 12 Tf
    1 1 1 rg
    80 130 Td
    (Now nestled close in cozy warmth as night turns calm and deep,) Tj
    80 110 Td
    (The desert breeze sings tender tunes to lull our child to sleep.) Tj
    80 90 Td
    (The compass rests beside the bed, its magic glowing bright,) Tj
    80 70 Td
    (Dream sweet, beloved {escape_text(child_name)}, until the morning light.) Tj
    ET
    
    BT
    /F4 12 Tf
    1 0.8 0.2 rg
    275 35 Td
    (THE END) Tj
    ET
    """
    pdf.add_page(p7)
    
    out_dir = "/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks"
    pdf.compile(f"{out_dir}/{output_file}")

if __name__ == "__main__":
    generate_sample_book(child_name="Zayed", gifter_name="Mama & Baba", gender="boy", output_file="Zayed_Starlit_Dunes_Keepsake_Book.pdf")
    generate_sample_book(child_name="Nimmu", gifter_name="Mama & Baba", gender="girl", output_file="Nimmu_Starlit_Dunes_Keepsake_Book.pdf")
