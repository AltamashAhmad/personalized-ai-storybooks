'use client';

import React from 'react';
import { Palette, Users } from 'lucide-react';
import {
  SKIN_TONES,
  HAIR_STYLES,
  HAIR_COLORS,
  BEARD_STYLES,
} from '@/config/sampleBookData';

export interface CoStarConfig {
  enabled: boolean;
  role: 'dad' | 'mom' | 'grandpa' | 'grandma';
  name: string;
  beardStyle: string;
}

export interface CharacterBuilderStepProps {
  isAr: boolean;
  childName: string;
  setChildName: (val: string) => void;
  nameValidation: { isValid: boolean; errorKey?: string; errorMessageEn?: string; errorMessageAr?: string };
  gender: 'boy' | 'girl';
  setGender: (val: 'boy' | 'girl') => void;
  skinTone: string;
  setSkinTone: (val: string) => void;
  hairStyle: string;
  setHairStyle: (val: string) => void;
  hairColor: string;
  setHairColor: (val: string) => void;
  glasses: boolean;
  setGlasses: (val: boolean) => void;
  hearingAid: boolean;
  setHearingAid: (val: boolean) => void;
  coStar: CoStarConfig;
  setCoStar: (val: CoStarConfig) => void;
}

interface CharacterAvatarIllustrationProps {
  skinToneId: string;
  hairStyleId: string;
  hairColorId: string;
  glasses: boolean;
  hearingAid: boolean;
  gender: 'boy' | 'girl';
  name?: string;
  isAr: boolean;
}

export function CharacterAvatarIllustration({
  skinToneId,
  hairStyleId,
  hairColorId,
  glasses,
  hearingAid,
  gender,
  name,
  isAr,
}: CharacterAvatarIllustrationProps) {
  const skin = SKIN_TONES.find((s) => s.id === skinToneId) || SKIN_TONES[2];
  const hair = HAIR_COLORS.find((h) => h.id === hairColorId) || HAIR_COLORS[0];
  // Strict index access: the theme lists are non-empty, but the flag types
  // SKIN_TONES[2] / HAIR_COLORS[0] as possibly-undefined — bail out instead of
  // crashing on skin.hex / hair.hex.
  if (!skin || !hair) return null;
  const skinColor = skin.hex;
  const hairColor = hair.hex;

  return (
    <div className="bg-[#FDF8F1] rounded-[2px] p-3 border border-amber-900/10 flex items-center gap-4 shadow-sm">
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-white rounded-[2px] border border-amber-900/15 overflow-hidden shadow-inner flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Subtle Celestial / Studio Background */}
          <rect width="200" height="200" fill="#FBF4E8" />
          <circle cx="100" cy="95" r="70" fill="#FFFFFF" opacity="0.6" />

          {/* Shoulders / Shirt / Kandora */}
          <path
            d="M 40 200 C 40 160, 70 152, 100 152 C 130 152, 160 160, 160 200 Z"
            fill="#1E5751"
          />
          {/* Collar / V-neck */}
          <path d="M 85 152 L 100 170 L 115 152 Z" fill="#FDF8F1" />
          <path d="M 100 152 L 100 175" stroke="#FFD15A" strokeWidth="2" strokeLinecap="round" />

          {/* Neck */}
          <rect x="86" y="132" width="28" height="25" rx="4" fill={skinColor} />
          {/* Neck Shadow */}
          <path d="M 86 132 C 92 140, 108 140, 114 132 Z" fill="#000000" opacity="0.12" />

          {/* Back Hair for Long Waves / Bob / Braids */}
          {hairStyleId === 'long-waves' && (
            <path
              d="M 50 85 C 38 120, 42 165, 58 185 C 64 165, 66 125, 68 100 M 150 85 C 162 120, 158 165, 142 185 C 136 165, 134 125, 132 100 Z"
              fill={hairColor}
            />
          )}
          {hairStyleId === 'braids' && (
            <g fill={hairColor}>
              <circle cx="48" cy="130" r="8" />
              <circle cx="46" cy="144" r="7" />
              <circle cx="44" cy="158" r="6" />
              <circle cx="42" cy="170" r="5" />
              <circle cx="152" cy="130" r="8" />
              <circle cx="154" cy="144" r="7" />
              <circle cx="156" cy="158" r="6" />
              <circle cx="158" cy="170" r="5" />
            </g>
          )}

          {/* Ears */}
          <circle cx="56" cy="108" r="9" fill={skinColor} />
          <circle cx="56" cy="108" r="5" fill="#000000" opacity="0.08" />
          <circle cx="144" cy="108" r="9" fill={skinColor} />
          <circle cx="144" cy="108" r="5" fill="#000000" opacity="0.08" />

          {/* Hearing Aid on Right Ear */}
          {hearingAid && (
            <g>
              <path
                d="M 148 100 C 156 103, 156 114, 148 117"
                fill="none"
                stroke="#FFD15A"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <circle cx="150" cy="108" r="3" fill="#1E5751" />
            </g>
          )}

          {/* Head & Face */}
          <ellipse cx="100" cy="105" rx="44" ry="46" fill={skinColor} />

          {/* Eyebrows */}
          <path
            d="M 72 88 Q 82 84 90 87"
            fill="none"
            stroke={hairColor}
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M 110 87 Q 118 84 128 88"
            fill="none"
            stroke={hairColor}
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Eyes */}
          <g>
            <circle cx="81" cy="102" r="6" fill="#1E293B" />
            <circle cx="79.5" cy="100" r="2.2" fill="#FFFFFF" />
            {gender === 'girl' && (
              <path d="M 75 97 L 72 94 M 87 97 L 90 94" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
            )}
            <circle cx="119" cy="102" r="6" fill="#1E293B" />
            <circle cx="117.5" cy="100" r="2.2" fill="#FFFFFF" />
            {gender === 'girl' && (
              <path d="M 113 97 L 110 94 M 125 97 L 128 94" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </g>

          {/* Cheeks / Blush */}
          <ellipse cx="73" cy="115" rx="6" ry="4" fill="#F43F5E" opacity="0.22" />
          <ellipse cx="127" cy="115" rx="6" ry="4" fill="#F43F5E" opacity="0.22" />

          {/* Cute Nose */}
          <path d="M 98 107 Q 100 112 104 111" fill="none" stroke="#000000" strokeWidth="1.8" opacity="0.25" strokeLinecap="round" />

          {/* Happy Child Smile */}
          <path
            d="M 90 123 Q 100 133 110 123"
            fill="none"
            stroke="#78350F"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Glasses */}
          {glasses && (
            <g stroke="#1E5751" strokeWidth="2.6" fill="rgba(255,255,255,0.25)">
              <circle cx="80" cy="102" r="14" />
              <circle cx="120" cy="102" r="14" />
              <path d="M 94 102 Q 100 99 106 102" fill="none" strokeLinecap="round" />
              <path d="M 66 102 L 54 104" strokeLinecap="round" />
              <path d="M 134 102 L 146 104" strokeLinecap="round" />
            </g>
          )}

          {/* Hairstyles Front / Overlay */}
          {hairStyleId === 'traditional-ghutra' ? (
            <g>
              <path
                d="M 52 100 C 48 65, 70 52, 100 52 C 130 52, 152 65, 148 100 C 158 130, 162 170, 164 195 L 144 195 C 142 165, 138 120, 134 100 C 120 74, 80 74, 66 100 C 62 120, 58 165, 56 195 L 36 195 C 38 170, 42 130, 52 100 Z"
                fill="#FFFFFF"
                stroke="#E2E8F0"
                strokeWidth="1.5"
              />
              <ellipse cx="100" cy="62" rx="42" ry="6" fill="#1C1917" />
              <ellipse cx="100" cy="66" rx="40" ry="5" fill="#292524" />
            </g>
          ) : hairStyleId === 'modest-shaila' ? (
            <g>
              <path
                d="M 50 110 C 44 65, 70 48, 100 48 C 130 48, 156 65, 150 110 C 158 150, 154 185, 152 195 L 48 195 C 46 185, 42 150, 50 110 Z"
                fill="#24514C"
              />
              <ellipse cx="100" cy="106" rx="40" ry="42" fill={skinColor} />
              <path d="M 64 88 C 76 76, 124 76, 136 88 Z" fill="#FFD15A" />
            </g>
          ) : hairStyleId === 'curly-afro' ? (
            <g fill={hairColor}>
              <circle cx="100" cy="58" r="22" />
              <circle cx="78" cy="62" r="20" />
              <circle cx="122" cy="62" r="20" />
              <circle cx="60" cy="74" r="18" />
              <circle cx="140" cy="74" r="18" />
              <circle cx="50" cy="92" r="16" />
              <circle cx="150" cy="92" r="16" />
              <circle cx="54" cy="108" r="13" />
              <circle cx="146" cy="108" r="13" />
              <path d="M 60 88 C 75 75, 125 75, 140 88 Z" />
            </g>
          ) : hairStyleId === 'modern-quiff' ? (
            <path
              d="M 52 94 C 50 72, 70 54, 96 46 C 114 40, 136 46, 142 62 C 146 72, 142 86, 144 94 C 138 82, 128 74, 114 74 C 94 74, 76 86, 52 94 Z"
              fill={hairColor}
            />
          ) : hairStyleId === 'classic-bob' ? (
            <path
              d="M 48 115 C 44 80, 62 55, 100 55 C 138 55, 156 80, 152 115 C 146 118, 140 102, 138 88 C 124 78, 76 78, 62 88 C 60 102, 54 118, 48 115 Z"
              fill={hairColor}
            />
          ) : hairStyleId === 'high-ponytail' ? (
            <g fill={hairColor}>
              <circle cx="138" cy="46" r="18" />
              <circle cx="132" cy="56" r="4" fill="#FFD15A" />
              <path d="M 52 92 C 54 66, 80 56, 106 58 C 126 60, 140 70, 144 92 C 132 82, 118 76, 100 76 C 80 76, 64 82, 52 92 Z" />
            </g>
          ) : hairStyleId === 'straight-crop' ? (
            <path
              d="M 52 92 C 54 68, 78 56, 100 56 C 122 56, 144 68, 146 92 C 138 85, 126 80, 110 80 L 64 82 Z"
              fill={hairColor}
            />
          ) : hairStyleId === 'braids' ? (
            <g fill={hairColor}>
              <path d="M 54 90 C 60 68, 80 58, 100 58 C 120 58, 140 68, 146 90 C 136 82, 120 78, 100 78 C 80 78, 64 82, 54 90 Z" />
            </g>
          ) : hairStyleId === 'long-waves' ? (
            <path
              d="M 50 90 C 54 65, 78 56, 100 56 C 122 56, 146 65, 150 90 C 140 80, 126 75, 100 75 C 74 75, 60 80, 50 90 Z"
              fill={hairColor}
            />
          ) : (
            <path
              d="M 52 92 C 52 68, 74 56, 100 56 C 126 56, 148 68, 148 92 C 138 82, 124 76, 102 76 C 80 76, 66 82, 52 92 Z"
              fill={hairColor}
            />
          )}
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-black text-[#1E5751] uppercase tracking-wider font-serif">
            {isAr ? 'المعاينة الحية للبطل' : 'Live Character Preview'}
          </span>
        </div>
        <h4 className="text-sm font-black text-slate-900 truncate font-serif">
          {name?.trim() ? (isAr ? `البطل: ${name}` : `Hero: ${name}`) : (isAr ? 'بطل القصة المخصص' : 'Custom Story Hero')}
        </h4>
        <div className="flex flex-wrap gap-1.5 mt-2">
          <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-[2px] border border-amber-900/10 text-slate-700">
            {isAr ? skin.nameAr : skin.nameEn}
          </span>
          <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-[2px] border border-amber-900/10 text-slate-700">
            {isAr ? hair.nameAr : hair.nameEn}
          </span>
          {glasses && (
            <span className="text-[10px] font-bold bg-[#1E5751]/10 px-2 py-0.5 rounded-[2px] text-[#1E5751]">
              👓 {isAr ? 'نظارة' : 'Glasses'}
            </span>
          )}
          {hearingAid && (
            <span className="text-[10px] font-bold bg-amber-500/15 px-2 py-0.5 rounded-[2px] text-amber-900">
              🦻 {isAr ? 'سماعة' : 'Hearing Aid'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CharacterBuilderStep({
  isAr,
  childName,
  setChildName,
  nameValidation,
  gender,
  setGender,
  skinTone,
  setSkinTone,
  hairStyle,
  setHairStyle,
  hairColor,
  setHairColor,
  glasses,
  setGlasses,
  hearingAid,
  setHearingAid,
  coStar,
  setCoStar,
}: CharacterBuilderStepProps) {
  // Default display name per co-star role — used to detect whether the user typed a custom name.
  const coStarRoleDefaultName = (role: CoStarConfig['role']): string =>
    isAr
      ? { dad: 'بَابَا', mom: 'مَامَا', grandpa: 'جِدّو', grandma: 'تِيتَا' }[role]
      : { dad: 'Baba', mom: 'Mama', grandpa: 'Grandpa', grandma: 'Grandma' }[role];

  return (
    <>
      {/* Field 1: Child Name */}
      <div>
        <label className="block text-xs font-black text-slate-800 mb-1.5 font-serif">
          {isAr ? 'اِسْمُ الطِّفْلِ الْأَوَّلُ (يَظْهَرُ عَلَى الْغِلَافِ وَفِي الْقِصَّةِ):' : 'Child’s First Name (Appears on cover & inside):'}
        </label>
        <input
          type="text"
          maxLength={13}
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
          placeholder={isAr ? 'مِثَال: زَايِد، رَاشِد، فَاطِمَة' : 'e.g. Zayed, Noah, Emma'}
          className="w-full px-4 py-3 rounded-[2px] border border-amber-900/20 font-bold text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5751]/40 focus:border-[#1E5751] bg-white shadow-sm"
        />
        {!nameValidation.isValid && (
          <p className="text-[11px] font-bold text-red-500 mt-1">
            {isAr ? nameValidation.errorMessageAr : nameValidation.errorMessageEn}
          </p>
        )}
        <span className="text-[10px] text-slate-400 block mt-1">
          {isAr ? 'الْحَدُّ الْأَقْصَى ١٣ حَرْفاً لِضَمَانِ مِثَالِيَّةِ طِبَاعَةِ الْغِلَافِ الْفَاخِرِ' : 'Max 13 characters for perfect cover typography'}
        </span>
      </div>

      {/* Field 2: Gender Selector */}
      <div>
        <label className="block text-xs font-black text-slate-800 mb-1.5 font-serif">
          {isAr ? 'جِنْسُ بَطَلِ الْقِصَّةِ:' : 'Hero Gender:'}
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setGender('boy')}
            className={`py-2.5 px-4 rounded-[2px] font-bold text-xs border-2 transition flex items-center justify-center gap-2 cursor-pointer ${
              gender === 'boy'
                ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751] font-black shadow-sm'
                : 'border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <span>👦</span>
            <span>{isAr ? 'وَلَدٌ (بَطَلُ الْمُغَامَرَةِ)' : 'Boy (Hero)'}</span>
          </button>
          <button
            type="button"
            onClick={() => setGender('girl')}
            className={`py-2.5 px-4 rounded-[2px] font-bold text-xs border-2 transition flex items-center justify-center gap-2 cursor-pointer ${
              gender === 'girl'
                ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751] font-black shadow-sm'
                : 'border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <span>👧</span>
            <span>{isAr ? 'بِنْتٌ (بَطَلَةُ الْمُغَامَرَةِ)' : 'Girl (Heroine)'}</span>
          </button>
        </div>
      </div>

      {/* Feature 11: Character Appearance Builder */}
      <div className="flex flex-col gap-3.5 pt-2 border-t border-amber-900/10">
        <span className="text-xs font-black text-slate-900 flex items-center gap-1.5 font-serif">
          <Palette className="w-4 h-4 text-[#1E5751]" />
          {isAr ? 'مَظْهَرُ وَمَلَامِحُ الْبَطَلِ:' : 'Character Appearance Builder:'}
        </span>

        {/* Dynamic Visual Character Avatar Illustration */}
        <CharacterAvatarIllustration
          skinToneId={skinTone}
          hairStyleId={hairStyle}
          hairColorId={hairColor}
          glasses={glasses}
          hearingAid={hearingAid}
          gender={gender}
          name={childName}
          isAr={isAr}
        />

        {/* Skin Tone Swatches */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
            {isAr ? 'دَرَجَةُ لَوْنِ الْبَشَرَةِ:' : 'Skin Tone:'}
          </label>
          <div className="flex items-center gap-2.5 flex-wrap">
            {SKIN_TONES.map((tone) => {
              const isSelected = skinTone === tone.id;
              return (
                <button
                  key={tone.id}
                  type="button"
                  onClick={() => setSkinTone(tone.id)}
                  title={isAr ? tone.nameAr : tone.nameEn}
                  className={`w-8 h-8 rounded-full border-2 transition transform cursor-pointer ${
                    isSelected
                      ? 'border-[#1E5751] ring-2 ring-[#1E5751]/40 scale-110 shadow'
                      : 'border-white shadow-sm hover:scale-105'
                  }`}
                  style={{ backgroundColor: tone.hex }}
                />
              );
            })}
          </div>
        </div>

        {/* Hair Style Selector */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
            {isAr ? 'تَسْرِيحَةُ الشَّعْرِ:' : 'Hair Style:'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-36 overflow-y-auto pr-1">
            {HAIR_STYLES.map((style) => {
              const isSelected = hairStyle === style.id;
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setHairStyle(style.id)}
                  className={`px-2.5 py-1.5 rounded-[2px] border text-[11px] font-bold text-left rtl:text-right transition truncate cursor-pointer ${
                    isSelected
                      ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751] font-black'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {isAr ? style.nameAr : style.nameEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hair Color Selector */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
            {isAr ? 'لَوْنُ الشَّعْرِ:' : 'Hair Color:'}
          </label>
          <div className="flex items-center gap-2.5 flex-wrap">
            {HAIR_COLORS.map((hc) => {
              const isSelected = hairColor === hc.id;
              return (
                <button
                  key={hc.id}
                  type="button"
                  onClick={() => setHairColor(hc.id)}
                  title={isAr ? hc.nameAr : hc.nameEn}
                  className={`w-7 h-7 rounded-full border-2 transition transform cursor-pointer ${
                    isSelected
                      ? 'border-[#1E5751] ring-2 ring-[#1E5751]/40 scale-110 shadow'
                      : 'border-white shadow-sm hover:scale-105'
                  }`}
                  style={{ backgroundColor: hc.hex }}
                />
              );
            })}
          </div>
        </div>

        {/* Inclusive Features: Glasses & Hearing Aid */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setGlasses(!glasses)}
            className={`p-2 rounded-[2px] border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              glasses ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751]' : 'border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <span>👓</span>
            <span>{isAr ? 'نَظَّارَاتٌ طِبِّيَّةٌ' : 'Glasses'}</span>
          </button>
          <button
            type="button"
            onClick={() => setHearingAid(!hearingAid)}
            className={`p-2 rounded-[2px] border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              hearingAid ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751]' : 'border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <span>🦻</span>
            <span>{isAr ? 'سَمَّاعَةُ أُذُنٍ' : 'Hearing Aid'}</span>
          </button>
        </div>
      </div>

      {/* Feature 12: Co-Star Selection Step */}
      <div className="flex flex-col gap-3 pt-2 border-t border-amber-900/10">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-slate-900 flex items-center gap-1.5 font-serif">
            <Users className="w-4 h-4 text-[#1E5751]" />
            {isAr ? 'إِضَافَةُ شَخْصِيَّةٍ مُسَانِدَةٍ (بَابَا، مَامَا، جِدّو، تِيتَا):' : 'Add Co-Star (Baba, Mama, Grandpa):'}
          </span>
          <button
            type="button"
            onClick={() => setCoStar({ ...coStar, enabled: !coStar.enabled })}
            className={`text-[11px] font-bold px-2.5 py-1 rounded-[2px] transition cursor-pointer ${
              coStar.enabled ? 'bg-[#1E5751] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {coStar.enabled ? (isAr ? 'مُضَافٌ ✓' : 'Added ✓') : (isAr ? '+ إِضَافَةٌ' : '+ Add')}
          </button>
        </div>

        {coStar.enabled && (
          <div className="p-3 rounded-[2px] bg-white border border-amber-900/10 shadow-sm flex flex-col gap-2.5">
            <div className="grid grid-cols-4 gap-1.5">
              {([
                { role: 'dad' as const, labelEn: 'Baba / Dad', labelAr: 'بَابَا' },
                { role: 'mom' as const, labelEn: 'Mama / Mom', labelAr: 'مَامَا' },
                { role: 'grandpa' as const, labelEn: 'Grandpa', labelAr: 'جِدّو' },
                { role: 'grandma' as const, labelEn: 'Grandma', labelAr: 'تِيتَا' },
              ]).map((item) => (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => {
                    // Preserve a custom-typed name; only fill in the role default when the
                    // current name is empty or still matches the previous role's default.
                    const prevDefault = coStarRoleDefaultName(coStar.role);
                    const hasCustomName =
                      coStar.name.trim() !== '' && coStar.name.trim() !== prevDefault;
                    setCoStar({
                      ...coStar,
                      role: item.role,
                      name: hasCustomName ? coStar.name : isAr ? item.labelAr : (item.labelEn.split(' ')[0] ?? ''),
                    });
                  }}
                  className={`py-1.5 rounded-[2px] text-[11px] font-bold border transition truncate cursor-pointer ${
                    coStar.role === item.role
                      ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751] font-black'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  {isAr ? item.labelAr : (item.labelEn.split('/')[0] ?? '')}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">
                {isAr ? 'الِاسْمُ الَّذِي يُنَادِيهِ بِهِ الطِّفْلُ:' : 'Co-Star Display Name:'}
              </label>
              <input
                type="text"
                maxLength={20}
                value={coStar.name}
                onChange={(e) => setCoStar({ ...coStar, name: e.target.value })}
                placeholder={isAr ? 'مِثَال: بَابَا سَعِيد، عَمُّو طَارِق' : 'e.g. Baba, Uncle Tariq'}
                className="w-full px-3 py-1.5 rounded-[2px] border border-slate-200 text-xs font-bold bg-white focus:outline-none focus:ring-1 focus:ring-[#1E5751]"
              />
            </div>

            {(coStar.role === 'dad' || coStar.role === 'grandpa') && (
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">
                  {isAr ? 'سْتَايِلُ اللِّحْيَةِ وَالشَّارِبِ:' : 'Beard Style:'}
                </label>
                <div className="grid grid-cols-2 gap-1">
                  {BEARD_STYLES.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setCoStar({ ...coStar, beardStyle: b.id })}
                      className={`px-2 py-1 rounded-[2px] text-[10px] font-bold border truncate transition cursor-pointer ${
                        coStar.beardStyle === b.id
                          ? 'border-[#1E5751] bg-[#1E5751]/10 text-[#1E5751] font-bold'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      {isAr ? b.nameAr : b.nameEn}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
