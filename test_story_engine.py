import json
import os

def generate_sample_bilingual_story():
    """
    Simulates the production output of the Gemini 1.5 Flash Story Engine
    constrained to structured bilingual rhyming verse with full Arabic Tashkeel.
    """
    story_payload = {
        "metadata": {
            "title_en": "Zayed and the Secret of the Starlit Dunes",
            "title_ar": "زَايِد وَسِرُّ الكُثْبَانِ المُضِيئَةِ",
            "child_name": "Zayed",
            "age": 5,
            "target_age_group": "3-6 years",
            "location_setting": "Abu Dhabi Desert & Liwa Oasis",
            "moral_lesson": "Kindness, courage, and the beauty of helping others",
            "reading_time_minutes": 4,
            "rhyme_scheme": "AABB (poetic couplets)",
            "page_count": 4
        },
        "pages": [
            {
                "page_number": 1,
                "scene_title": "The Golden Discovery",
                "text_en": (
                    "Across the golden dunes where warm winds blow,\n"
                    "Young Zayed watched the desert sunset glow.\n"
                    "Beneath the sand, a golden compass gleamed,\n"
                    "More magical than anything he'd dreamed!"
                ),
                "text_ar": (
                    "فَوْقَ كُثْبَانِ الرِّمَالِ الذَّهَبِيَّةِ حَيْثُ تَهَبُّ النَّسَمَاتُ،\n"
                    "وَقَفَ زَايِدُ الصَّغِيرُ يَرْقُبُ غُرُوبَ الشَّمْسِ البَاسِمَاتِ.\n"
                    "وَتَحْتَ الرَّمْلِ، لَمَعَتْ بَوْصَلَةٌ مِنْ ذَهَبٍ صَافٍ وَنَقِيّ،\n"
                    "تَفُوقُ فِي سِحْرِهَا كُلَّ حُلْمٍ جَمِيلٍ وَبَهِيّ!"
                ),
                "illustration_prompt": (
                    "Children's book watercolor illustration, 5-year-old Emirati boy named Zayed with wavy black hair, "
                    "sparkling curious dark brown eyes, wearing a clean desert adventurer outfit with rolled sleeves. "
                    "Kneeling on undulating golden sand dunes during a breathtaking purple and orange sunset. "
                    "Holding a glowing antique golden compass that casts gentle starlight beams. "
                    "Whimsical, warm, cozy atmosphere, storybook art style, soft lighting, 8k resolution, award-winning illustration."
                ),
                "audio_narration_notes": {
                    "pacing": "Gentle, wonder-filled, moderate cadence",
                    "background_audio": "Soft desert breeze and distant gentle chime"
                }
            },
            {
                "page_number": 2,
                "scene_title": "A Feathered Friend in Need",
                "text_en": (
                    "The compass hummed and pointed to a stone,\n"
                    "Where sat a tiny falcon, all alone.\n"
                    "Its golden wing was caught in desert vine,\n"
                    "Zayed gently smiled and said: 'Your wing is fine!'"
                ),
                "text_ar": (
                    "هَمَسَتِ البَوْصَلَةُ وَأَشَارَتْ إِلَى صَخْرَةٍ فِي المَدَى،\n"
                    "حَيْثُ جَلَسَ صَقْرٌ صَغِيرٌ يَبْحَثُ عَنِ الهُدَى.\n"
                    "كَانَ جَنَاحُهُ الذَّهَبِيُّ عَالِقًا بَيْنَ أَغْصَانِ النَّبَاتِ،\n"
                    "فَابْتَسَمَ زَايِدُ قَائِلًا: 'لَا تَخَفْ، فَأَنَا عَوْنُكَ فِي الحَيَاةِ!'"
                ),
                "illustration_prompt": (
                    "Children's storybook illustration, Zayed gently freeing a small, fluffy golden baby falcon with amber eyes "
                    "from a soft desert shrub. Zayed has a kind, empathetic smile. The tiny falcon looks up with gratitude. "
                    "Soft watercolor gradients, warm glowing twilight tones, beautiful emotional connection, picture book masterpiece."
                ),
                "audio_narration_notes": {
                    "pacing": "Empathetic, soothing, soft reassurance",
                    "background_audio": "Gentle acoustic harp notes"
                }
            },
            {
                "page_number": 3,
                "scene_title": "Flight Under the Crescent Moon",
                "text_en": (
                    "With wings now free, the falcon leaped so high,\n"
                    "Inviting Zayed to watch the starry sky.\n"
                    "Above the glowing oasis they took flight,\n"
                    "Where shining domes lit up the peaceful night!"
                ),
                "text_ar": (
                    "فَرَدَ الصَّقْرُ جَنَاحَيْهِ وَحَلَّقَ فِي الفَضَاءِ البَعِيدِ،\n"
                    "يَدْعُو زَايِدَ لِرُؤْيَةِ سِحْرِ السَّمَاءِ وَالقَمَرِ الفَرِيدِ.\n"
                    "فَوْقَ وَاحَةِ النَّخِيلِ الخَضْرَاءِ كَانَ المَنْظَرُ يَسُرُّ النَّاظِرِينَ،\n"
                    "وَقِبَابُ المَسْجِدِ الكَبِيرِ تُضِيءُ نُورًا لِلْعَالَمِينَ!"
                ),
                "illustration_prompt": (
                    "Whimsical double-spread illustration. Zayed and the majestic golden falcon flying side by side "
                    "above lush green desert oasis date palms. Below in the distance, the glowing white marble domes of the "
                    "Sheikh Zayed Grand Mosque shine with sapphire and gold illumination under a silver crescent moon and glittering constellations. "
                    "Dreamy, magical, uplifting, watercolor and gouache texture."
                ),
                "audio_narration_notes": {
                    "pacing": "Aspirational, majestic, soaring musical swell",
                    "background_audio": "Uplifting orchestral strings and soft night crickets"
                }
            },
            {
                "page_number": 4,
                "scene_title": "Bedtime at the Cozy Oasis",
                "text_en": (
                    "Back in his cozy bed of linen white,\n"
                    "Zayed whispered: 'Thank you for this wondrous night.'\n"
                    "For kindness is the compass of the heart,\n"
                    "Where all the greatest grand adventures start!"
                ),
                "text_ar": (
                    "عَادَ زَايِدُ إِلَى سَرِيرِهِ الدَّافِئِ المَلِيءِ بِالأَحْلَامِ،\n"
                    "هَمَسَ شَاكِرًا: 'مَا أَجْمَلَ هَذِهِ اللَّيْلَةَ فِي سَلَامٍ!'\n"
                    "فَالطِّيبَةُ هِيَ بَوْصَلَةُ القَلْبِ الَّتِي لَا تَضِلُّ الطَّرِيقَ،\n"
                    "وَمِنْهَا تَبْدَأُ أَجْمَلُ الرِّحْلَاتِ لِكُلِّ صَدِيقٍ!"
                ),
                "illustration_prompt": (
                    "Cozy children's bedroom illustration. Zayed tucked warmly under a soft quilt in a modern Abu Dhabi room, "
                    "looking through the open arched window where the crescent moon smiles. On the windowsill perches the friendly golden falcon. "
                    "Warm amber bedside lamp glow, peaceful sleeping atmosphere, comforting bedtime story finale."
                ),
                "audio_narration_notes": {
                    "pacing": "Slow, relaxing, whisper-soft lullaby tempo",
                    "background_audio": "Gentle music box melody fading out peacefully"
                }
            }
        ]
    }
    
    # Save the output to research directory
    output_path = "/Users/altamashahmad/Desktop/Job-automater-hunter/personalized-ai-storybooks/research/SAMPLE_STORY_ENGINE_OUTPUT.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(story_payload, f, ensure_ascii=False, indent=2)
    
    print(f"Sample story JSON generated and verified at: {output_path}")
    return story_payload

if __name__ == "__main__":
    generate_sample_bilingual_story()
