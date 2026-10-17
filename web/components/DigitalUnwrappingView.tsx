"use client";

import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  BookOpen,
  Check,
  Copy,
  ExternalLink,
  Gift,
  Heart,
  Languages,
  RotateCcw,
  Share2,
  Sparkles,
  Scissors,
  Play,
  Pause,
  Volume2,
  Music,
} from "lucide-react";
import { PRODUCTS } from "@/config/products";
import { useCountry } from "@/lib/context/CountryContext";

// Confetti Particle Color Palette matching the UAE Heritage palette
const CONFETTI_COLORS = [
  "#FFD700", // Gold
  "#C9A96E", // Desert Sand
  "#1E5751", // Racing Green
  "#D4AF37", // Amber
  "#FFFFFF", // White
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  color: string;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  opacity: number;
  decay: number;
  shape: "rect" | "circle" | "strip";
}

function DigitalUnwrappingContent({
  initialLang,
  giftId: propGiftId,
}: {
  initialLang?: "en" | "ar";
  giftId?: string;
}) {
  const searchParams = useSearchParams();
  const { language: contextLang } = useCountry();

  // Language state allowing inline bilingual toggling
  const [lang, setLang] = useState<"en" | "ar">(initialLang || (contextLang === "ar" ? "ar" : "en"));
  const isAr = lang === "ar";
  const currentDir = isAr ? "rtl" : "ltr";

  // Gift parameters resolution
  const resolvedGiftId = (propGiftId || searchParams.get("giftId") || "demo").toLowerCase();
  const childName = searchParams.get("name") || (isAr ? "زايد" : "Zayed");
  const gifterName = searchParams.get("gifter") || (isAr ? "خالتك فاطمة" : "Auntie Fatima");

  // Audio Player State (Web Audio API Synthesizer)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioIntervalRef = useRef<number | null>(null);

  // Occasion & Gift ID resolution
  const getOccasionDetails = () => {
    switch (resolvedGiftId) {
      case "eid-gift":
        return {
          tagEn: "🌙 Eid Mubarak Keepsake",
          tagAr: "🌙 هدية العيد المبارك التذكارية",
          headingEn: `Eid Mubarak! A special gift for ${childName}`,
          headingAr: `عيد مبارك! هدية خاصة للبطل ${childName}`,
          defaultMsgEn: `Dearest ${childName}, may this blessed Eid fill your heart with radiant joy, wonderful laughter, and heroic adventures! We love you infinitely.`,
          defaultMsgAr: `إلى بطلنا الغالي ${childName}، تقبل الله طاعاتكم وجعل عيدكم مباركاً مليئاً بالبهجة والشجاعة والمغامرات الساحرة. نحبك من كل قلوبنا!`,
        };
      case "birthday-gift":
        return {
          tagEn: "🎂 Happy Birthday Adventure",
          tagAr: "🎂 مغامرة عيد ميلاد سحرية",
          headingEn: `Happy Birthday! A magical adventure just for ${childName}`,
          headingAr: `عيد ميلاد سعيد! مغامرة سحرية خاصة لـ ${childName}`,
          defaultMsgEn: `Happy Birthday ${childName}! You are the shining star of this story and our hearts. May you always dream big and soar high!`,
          defaultMsgAr: `عيد ميلاد سعيد يا أغلى ${childName}! أنت البطل الحقيقي لهذه القصة ولقلوبنا، نتمنى لك عاماً يفيض بالفرح والنجاح والبطولات!`,
        };
      case "welcome":
        return {
          tagEn: "✨ Welcome to the World of Stories",
          tagAr: "✨ مرحباً بك في عالم القصص",
          headingEn: `Welcome to the world of stories, ${childName}!`,
          headingAr: `مرحباً بك في عالم القصص الساحر يا ${childName}!`,
          defaultMsgEn: `Welcome to a world where dreams take flight! A personalized keepsake crafted just for you, ${childName}.`,
          defaultMsgAr: `أهلاً بك في عالم الحكايات الساحرة حيث تصبح أنت بطل كل صفحة. صُنعت هذه الهدية خصيصاً لك بكل فخر وحب.`,
        };
      case "demo":
      default:
        return {
          tagEn: "🎁 Magical Personalized Keepsake",
          tagAr: "🎁 هدية مخصصة سحرية",
          headingEn: `A magical personalized gift created with love for ${childName}`,
          headingAr: `هدية مخصصة سحرية صُنعت بكل حب لـ ${childName}`,
          defaultMsgEn: `To our dearest ${childName}, may your life be filled with grand adventures, infinite wonder, and radiant courage. We love you more than all the stars in the desert sky!`,
          defaultMsgAr: `إلى بطلي الصغير ${childName}، بارك الله فيك وحفظك ذخراً وسنداً. نرجو لك حياة مليئة بالمغامرات، الشجاعة، والنجاح. نحبك من كل قلوبنا!`,
        };
    }
  };

  const occasion = getOccasionDetails();
  const customMessage = searchParams.get("msg") || (isAr ? occasion.defaultMsgAr : occasion.defaultMsgEn);

  // Unwrapping Animation States: 'wrapped' | 'untying' | 'opening' | 'unwrapped'
  const [animationPhase, setAnimationPhase] = useState<"wrapped" | "untying" | "opening" | "unwrapped">("wrapped");
  const [isUnwrapped, setIsUnwrapped] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [copiedShareLink, setCopiedShareLink] = useState(false);

  // Canvas Ref for pure HTML5 confetti particle physics simulation
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  // Unwrap sequence timeouts — cleared on re-wrap/unmount so stale timers can't fire.
  const unwrapTimeoutsRef = useRef<number[]>([]);

  const product = PRODUCTS[0]; // Flagship Starlit Dunes / Golden Falcon

  // Confetti Particle Spawner (No external npm library)
  const triggerConfettiExplosion = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Spawn 160 high-fidelity confetti particles from center of gift box
    const originX = canvas.width / 2;
    const originY = canvas.height * 0.45;
    const newParticles: Particle[] = [];

    const shapes: ("rect" | "circle" | "strip")[] = ["rect", "rect", "circle", "strip"];

    for (let i = 0; i < 160; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 8 + Math.random() * 18;
      const vyOffset = -(6 + Math.random() * 12);

      newParticles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity + vyOffset,
        width: 8 + Math.random() * 8,
        height: 5 + Math.random() * 9,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)] ?? "#FFD700",
        rotationX: Math.random() * Math.PI,
        rotationY: Math.random() * Math.PI,
        rotationZ: Math.random() * Math.PI,
        rotSpeedX: 0.05 + Math.random() * 0.1,
        rotSpeedY: 0.05 + Math.random() * 0.1,
        rotSpeedZ: 0.03 + Math.random() * 0.08,
        opacity: 1,
        decay: 0.003 + Math.random() * 0.004,
        shape: shapes[Math.floor(Math.random() * shapes.length)] ?? "rect",
      });
    }

    particlesRef.current = newParticles;

    // Particle Animation Loop with 3D rotation, gravity, drag, and wind drift
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p) continue;

        // Physics updates
        p.vx *= 0.985; // Drag
        p.vy *= 0.985;
        p.vy += 0.28; // Gravity
        p.vx += Math.sin(p.y * 0.015) * 0.15; // Wind drift

        p.x += p.vx;
        p.y += p.vy;

        p.rotationX += p.rotSpeedX;
        p.rotationY += p.rotSpeedY;
        p.rotationZ += p.rotSpeedZ;

        p.opacity -= p.decay;

        if (p.opacity > 0) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotationZ);
          ctx.scale(Math.cos(p.rotationX), Math.sin(p.rotationY));
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;

          if (p.shape === "circle") {
            ctx.beginPath();
            ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.shape === "strip") {
            ctx.fillRect(-p.width / 2, -p.height, p.width / 3, p.height * 2);
          } else {
            ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
          }

          ctx.restore();
        }
      }

      // Filter out dead particles
      particlesRef.current = particles.filter((p) => p.opacity > 0 && p.y < canvas.height + 50);

      if (particlesRef.current.length > 0) {
        animFrameIdRef.current = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
    }
    animFrameIdRef.current = requestAnimationFrame(render);
  }, []);

  // Cleanup confetti on unmount
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
      if (audioIntervalRef.current) {
        clearInterval(audioIntervalRef.current);
      }
      unwrapTimeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  // Web Audio Bedtime Lullaby Synthesizer
  const toggleAudioPlayer = () => {
    if (isPlayingAudio) {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend().catch(() => {});
      }
      if (audioIntervalRef.current) {
        clearInterval(audioIntervalRef.current);
      }
      setIsPlayingAudio(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Pentatonic desert chime melody sequence (C4, E4, G4, A4, C5, B4, G4)
      const notes = [261.63, 329.63, 392.0, 440.0, 523.25, 493.88, 392.0, 329.63];
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.45);

        // Gentle envelope chime
        gain.gain.setValueAtTime(0.001, now + idx * 0.45);
        gain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.45 + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.45 + 0.9);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.45);
        osc.stop(now + idx * 0.45 + 1.0);
      });

      setIsPlayingAudio(true);
      setAudioProgress(10);

      // Increment progress simulation
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      audioIntervalRef.current = window.setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
            return 0;
          }
          return prev + 5;
        });
      }, 500);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  // Master Ribbon Untie & 3D Box Open Sequence with Ribbon Cutting
  const handleUnwrap = () => {
    if (animationPhase !== "wrapped") return;

    // Step 1: Ribbon cutting & untie animation begins (0ms)
    setAnimationPhase("untying");

    // Step 2: Box lid rotates open (-120deg) at 650ms, and confetti fires
    unwrapTimeoutsRef.current.push(window.setTimeout(() => {
      setAnimationPhase("opening");
      triggerConfettiExplosion();
    }, 650));

    // Step 3: Transition to full unwrapped presentation at 1550ms
    unwrapTimeoutsRef.current.push(window.setTimeout(() => {
      setAnimationPhase("unwrapped");
      setIsUnwrapped(true);
    }, 1550));
  };

  const handleRewrap = () => {
    unwrapTimeoutsRef.current.forEach(clearTimeout);
    unwrapTimeoutsRef.current = [];
    setAnimationPhase("wrapped");
    setIsUnwrapped(false);
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    }
  };

  const handleCopyCoupon = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText("UNWRAP20");
      setCopiedCoupon(true);
      setTimeout(() => setCopiedCoupon(false), 3000);
    }
  };

  const handleCopyShareLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(typeof window !== "undefined" ? window.location.href : "");
      setCopiedShareLink(true);
      setTimeout(() => setCopiedShareLink(false), 3000);
    }
  };

  // WhatsApp Share URL Generator with personalized greeting and unwrap link
  const generateWhatsAppUrl = () => {
    const currentUrl = typeof window !== "undefined" ? window.location.href : "https://personalizedtales.com";
    const bookTitleText = isAr && product.titleAr ? product.titleAr : product.title;

    const shareText = isAr
      ? `🎁✨ شاهدوا هذه الهدية التذكارية الساحرة للبطل ${childName}!\n\nقصة: "${bookTitleText}"\nمقدمة بكل حب من: ${gifterName}\n\nافتحوا شريط الهدية وتصفحوا القصة ثلاثية الأبعاد هنا:\n${currentUrl}`
      : `🎁✨ Look at the magical storybook gift created for ${childName}!\n\nKeepsake: "${bookTitleText}"\nPresented with love by: ${gifterName}\n\nUntie the ribbon and open the 3D book here:\n${currentUrl}`;

    return `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  };

  // Strict index access: PRODUCTS[0] is the flagship, but the flag types it
  // as possibly-undefined — bail out instead of crashing on product.title.
  // Placed after all hooks so hook order is stable.
  if (!product) return null;

  return (
    <div
      className={`min-h-screen bg-[#FDF8F1] text-[#23231e] flex flex-col justify-between selection:bg-[#1E5751] selection:text-white relative overflow-hidden ${
        isAr ? "font-serif" : "font-sans"
      }`}
      dir={currentDir}
    >
      {/* Background ambient texture */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#1E5751_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Pure HTML5 Confetti Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />

      {/* Top Header Bar with Brand & Bilingual Switcher */}
      <header className="relative z-20 max-w-5xl mx-auto px-4 py-6 w-full flex items-center justify-between border-b border-[#23231e]/10">
        <Link
          href={isAr ? "/ar" : "/"}
          className="flex items-center gap-2 text-[#23231e] hover:text-[#1E5751] transition"
        >
          <span className="text-2xl">✨</span>
          <span className="font-serif font-black text-xl tracking-tight">
            {isAr ? "حكايات مخصصة" : "PersonalizedTales"}
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Occasion Badge */}
          <span className="text-xs bg-[#1E5751]/10 text-[#1E5751] font-bold px-3 py-1 rounded-[2px] border border-[#1E5751]/20 hidden sm:inline-flex items-center gap-1.5 font-serif">
            {isAr ? occasion.tagAr : occasion.tagEn}
          </span>

          {/* Bilingual Toggle Button */}
          <button
            onClick={() => setLang(isAr ? "en" : "ar")}
            className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-xs font-bold text-[#23231e] px-3 py-1.5 rounded-[2px] border border-[#23231e]/20 transition cursor-pointer shadow-2xs"
            title={isAr ? "Switch to English" : "التحويل إلى العربية"}
          >
            <Languages className="w-3.5 h-3.5 text-[#1E5751]" />
            <span>{isAr ? "English" : "العربية"}</span>
          </button>
        </div>
      </header>

      {/* Main Unwrapping Stage */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 py-6 flex-1 flex flex-col items-center justify-center text-center">
        {!isUnwrapped ? (
          /* STAGE 1: WRAPPED LUXURY 3D GIFT BOX WITH INTERACTIVE RIBBON CUTTING */
          <div className="w-full space-y-8">
            {/* Dedication Tag */}
            <div className="inline-block bg-white border border-[#23231e]/20 rounded-[2px] p-6 shadow-sm max-w-md mx-auto relative transform -rotate-1 hover:rotate-0 transition">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-[2px] bg-[#1E5751] text-white flex items-center justify-center text-[10px] font-black">
                ★
              </div>
              <span className="text-[11px] font-serif uppercase tracking-widest text-[#1E5751] font-bold block mb-1">
                {isAr ? occasion.tagAr : occasion.tagEn}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#23231e]">
                {isAr ? `إلى: ${childName}` : `To: ${childName}`}
              </h2>
              <p className="text-xs text-[#23231e]/70 font-medium mt-1">
                {isAr ? `مقدمة بكل حب من: ${gifterName}` : `Presented with love by: ${gifterName}`}
              </p>
            </div>

            {/* 3D GIFT BOX CONTAINER WITH PERSPECTIVE & RIBBON CUTTING ANIMATION */}
            <div
              className="relative mx-auto w-72 sm:w-80 aspect-square flex items-center justify-center select-none"
              style={{ perspective: "1200px" }}
            >
              {/* Box Ambient Glow */}
              <div
                className={`absolute inset-0 rounded-[2px] blur-2xl transition duration-700 ${
                  animationPhase === "opening"
                    ? "bg-[#1E5751]/30 scale-110"
                    : "bg-amber-500/15 hover:bg-amber-500/25"
                }`}
              />

              {/* 3D Gift Box Body */}
              <div
                onClick={handleUnwrap}
                className="relative w-full h-full rounded-[2px] cursor-pointer group shadow-xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Internal Book Inside Box (Revealed as lid opens) */}
                <div
                  className={`absolute inset-4 bg-[#FDF8F1] rounded-[2px] overflow-hidden border border-[#1E5751]/40 flex flex-col items-center justify-center transition-all duration-1000 ${
                    animationPhase === "opening"
                      ? "opacity-100 scale-100 shadow-[0_0_40px_rgba(30,87,81,0.4)]"
                      : "opacity-0 scale-90"
                  }`}
                  style={{
                    transform:
                      animationPhase === "opening"
                        ? "translateZ(40px) translateY(-10px)"
                        : "translateZ(0px)",
                  }}
                >
                  <div className="relative w-36 h-36">
                    <Image
                      src={product.coverImage}
                      alt={product.title}
                      fill
                      className="object-cover rounded-[2px] shadow-md border border-[#23231e]/15"
                      sizes="144px"
                    />
                  </div>
                  <span className="text-[11px] font-serif font-black text-[#1E5751] mt-2">
                    {isAr ? "كتابك التذكاري ينبثق..." : "Your keepsake emerges..."}
                  </span>
                </div>

                {/* Box Base (Deep Kraft / Racing Green Luxury Leather Texture) */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E5751] to-[#123834] rounded-[2px] border-2 border-amber-300/80 shadow-xl flex items-center justify-center">
                  <div className="absolute top-2 left-2 text-amber-200/50 text-xs font-serif">✦</div>
                  <div className="absolute top-2 right-2 text-amber-200/50 text-xs font-serif">✦</div>
                  <div className="absolute bottom-2 left-2 text-amber-200/50 text-xs font-serif">✦</div>
                  <div className="absolute bottom-2 right-2 text-amber-200/50 text-xs font-serif">✦</div>
                </div>

                {/* 3D Box Lid (Swings open with rotateX(-120deg)) */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-[#1E5751] via-[#236861] to-[#123834] rounded-[2px] border-2 border-amber-300 shadow-xl transition-transform duration-1000 origin-top flex items-center justify-center overflow-hidden"
                  style={{
                    transformOrigin: "top center",
                    transform:
                      animationPhase === "opening"
                        ? "rotateX(-120deg) translateY(-20px)"
                        : "rotateX(0deg)",
                    transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                >
                  {/* Horizontal Ribbon Strap */}
                  <div
                    className="absolute inset-x-0 h-10 bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400 shadow-md transition-transform duration-700"
                    style={{
                      transform:
                        animationPhase === "untying" || animationPhase === "opening"
                          ? "scaleX(0) rotate(-15deg)"
                          : "scaleX(1)",
                      opacity: animationPhase === "wrapped" ? 1 : 0,
                    }}
                  />

                  {/* Vertical Ribbon Strap */}
                  <div
                    className="absolute inset-y-0 w-10 bg-gradient-to-b from-amber-300 via-yellow-100 to-amber-400 shadow-md transition-transform duration-700"
                    style={{
                      transform:
                        animationPhase === "untying" || animationPhase === "opening"
                          ? "scaleY(0) rotate(15deg)"
                          : "scaleY(1)",
                      opacity: animationPhase === "wrapped" ? 1 : 0,
                    }}
                  />

                  {/* Ribbon Bow Center with Interactive Scissors Indicator */}
                  <div
                    className="relative z-10 w-24 h-24 rounded-[2px] bg-gradient-to-tr from-amber-300 via-yellow-200 to-amber-400 text-slate-950 flex flex-col items-center justify-center shadow-lg transition-all duration-700 group-hover:scale-105"
                    style={{
                      transform:
                        animationPhase === "untying" || animationPhase === "opening"
                          ? "scale(1.8) rotate(180deg)"
                          : "scale(1)",
                      opacity: animationPhase === "wrapped" ? 1 : 0,
                    }}
                  >
                    <Gift className="w-10 h-10 text-[#23231e]" />
                    <span className="text-[9px] font-black uppercase text-[#23231e] mt-0.5 tracking-tighter">
                      {isAr ? "فك الشريط" : "Untie"}
                    </span>
                  </div>

                  {/* Tap prompt badge */}
                  {animationPhase === "wrapped" && (
                    <div className="absolute bottom-5 z-20 bg-white/95 px-4 py-1.5 rounded-[2px] border border-[#23231e]/20 text-[11px] font-serif font-black text-[#1E5751] uppercase tracking-wider shadow-xs">
                      {isAr ? "✂️ اضغط لقص الشريط وفتح الهدية" : "✂️ Tap to Cut Ribbon & Open"}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CTA Ribbon Cutting Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleUnwrap}
                disabled={animationPhase !== "wrapped"}
                className="bg-[#1E5751] hover:bg-[#16433e] text-white font-serif font-black text-base sm:text-lg px-10 py-4 rounded-[2px] shadow-sm hover:shadow transition transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-3 mx-auto disabled:opacity-50"
              >
                <Scissors className="w-5 h-5 text-amber-300" />
                <span>{isAr ? "قص شريط الهدية وفتح العلبة 🎁" : "Cut Ribbon & Untie Keepsake 🎁"}</span>
              </button>
              <p className="text-xs text-[#23231e]/70 mt-3 font-medium">
                {isAr
                  ? "لا يتطلب تحميل أي تطبيق • تجربة تفاعلية ثلاثية الأبعاد فورية عبر المتصفح"
                  : "No app download required • Instant 3D keepsake in your browser"}
              </p>
            </div>
          </div>
        ) : (
          /* STAGE 2: UNWRAPPED KEEPSAKE BOOK, DEDICATION CARD, BEDTIME AUDIO PLAYER & PROMO */
          <div className="w-full space-y-8">
            {/* Confetti Celebration Banner */}
            <div className="inline-flex items-center gap-2 bg-[#1E5751]/10 border border-[#1E5751]/30 text-[#1E5751] text-xs font-serif font-bold uppercase tracking-wider px-5 py-2 rounded-[2px] shadow-xs">
              <Sparkles className="w-4 h-4 text-[#1E5751]" />
              <span>{isAr ? "مفاجأة! تم قص الشريط وفتح هديتك السحرية بنجاح" : "Surprise! Your magical gift is unwrapped"}</span>
            </div>

            {/* Occasion Banner Header */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#23231e]">
                {isAr ? occasion.headingAr : occasion.headingEn}
              </h2>
              <p className="text-xs text-[#1E5751] font-bold mt-1">
                {isAr
                  ? `هدية تذكارية فريدة ومخصصة صُممت خصيصاً للبطل: ${childName}`
                  : `An heirloom keepsake uniquely customized for ${childName}`}
              </p>
            </div>

            {/* Book Presentation Card */}
            <div className="bg-white border border-[#23231e]/15 rounded-[2px] p-6 sm:p-8 shadow-sm text-left rtl:text-right relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                <div className="relative w-44 sm:w-52 aspect-square rounded-[2px] overflow-hidden shadow-md shrink-0 border border-[#23231e]/15 group">
                  <Image
                    src={product.coverImage}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                    sizes="(max-width: 640px) 176px, 208px"
                  />
                  <div className="absolute top-2 left-2 bg-[#1E5751] text-white font-bold text-[9px] uppercase px-2 py-0.5 rounded-[2px]">
                    {isAr ? "كتاب مخصص" : "Personalized"}
                  </div>
                </div>

                <div className="space-y-3 text-center sm:text-left rtl:sm:text-right flex-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] text-[10px] font-serif font-bold uppercase tracking-wider">
                    <span>{isAr ? "كتاب تذكاري ملكي للأطفال" : "Heirloom Personalized Storybook"}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#23231e]">
                    {isAr && product.titleAr ? product.titleAr : product.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#23231e]/80 font-medium leading-relaxed">
                    {isAr
                      ? `بطولة البطل الصغير: ${childName} • إصدار ثنائي اللغة بالعربية الفصحى المشكولة والإنجليزية مع رسوم مخصصة وملامح مطابقة.`
                      : `Starring: ${childName} • Dual-language English and vocalized Arabic poetic verses with custom character illustrations.`}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <Link
                      href={
                        isAr
                          ? `/create/preview?book=${product.slug}&name=${encodeURIComponent(childName)}&lang=ar`
                          : `/create/preview?book=${product.slug}&name=${encodeURIComponent(childName)}`
                      }
                      className="inline-flex items-center gap-2 bg-[#1E5751] hover:bg-[#16433e] text-white font-serif font-black px-6 py-3 rounded-[2px] text-sm shadow-xs transition cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{isAr ? `تصفح قصة ${childName} ثلاثية الأبعاد ➔` : `Read ${childName}'s 3D Book ➔`}</span>
                    </Link>

                    <button
                      type="button"
                      onClick={triggerConfettiExplosion}
                      className="inline-flex items-center gap-1.5 bg-[#FDF8F1] hover:bg-slate-100 text-[#1E5751] font-bold px-4 py-3 rounded-[2px] text-xs border border-[#1E5751]/30 transition cursor-pointer"
                      title={isAr ? "إطلاق الألعاب النارية والقصاصات مجدداً" : "Celebrate again with confetti"}
                    >
                      <Sparkles className="w-4 h-4 text-[#1E5751]" />
                      <span>{isAr ? "احتفل مجدداً ✨" : "Celebrate Again ✨"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Heartfelt Dedication Letter Box */}
              <div className="bg-[#FDF8F1] rounded-[2px] p-5 border border-[#23231e]/15 relative mb-4">
                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[#23231e]/10">
                  <span className="text-[11px] font-serif font-bold text-[#1E5751] uppercase tracking-wider flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 fill-[#1E5751] text-[#1E5751]" />
                    <span>{isAr ? "إهداء خاص من القلب" : "Personal Dedication"}</span>
                  </span>
                  <span className="text-[11px] text-[#23231e]/70 font-bold">
                    {isAr ? `من: ${gifterName}` : `From: ${gifterName}`}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#23231e] leading-relaxed italic font-serif">
                  &ldquo;{customMessage}&rdquo;
                </p>
              </div>

              {/* Interactive Bedtime Audio Companion / Lullaby Player */}
              <div className="bg-[#1E5751]/10 rounded-[2px] p-4 border border-[#1E5751]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={toggleAudioPlayer}
                    className="w-12 h-12 rounded-[2px] bg-[#1E5751] hover:bg-[#16433e] text-white flex items-center justify-center shrink-0 shadow-xs transition cursor-pointer"
                    aria-label={isPlayingAudio ? "Pause Audio" : "Play Bedtime Audio"}
                  >
                    {isPlayingAudio ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white fill-white ml-0.5" />}
                  </button>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5 text-[#1E5751]" />
                      <span className="font-serif font-bold text-xs sm:text-sm text-[#23231e]">
                        {isAr ? `التسجيل الصوتي والتهويدة السحرية لـ ${childName}` : `Bedtime Audio Lullaby for ${childName}`}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#23231e]/70 mt-0.5">
                      {isAr
                        ? "استمع لنغمات تهويدة النوم وأصوات واحة النجوم الهادئة"
                        : "Listen to the cinematic desert soundscape & soothing bedtime chimes"}
                    </p>
                  </div>
                </div>

                {/* Simulated Audio Waveform Bar */}
                <div className="flex items-center gap-1 w-full sm:w-48 justify-end">
                  <Volume2 className="w-4 h-4 text-[#1E5751] shrink-0" />
                  <div className="h-2 w-full bg-[#23231e]/10 rounded-[2px] overflow-hidden">
                    <div
                      className="h-full bg-[#1E5751] transition-all duration-300"
                      style={{ width: `${audioProgress}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-[#23231e]/60 shrink-0">
                    {isPlayingAudio ? "0:45" : "2:30"}
                  </span>
                </div>
              </div>
            </div>

            {/* UNWRAP20 PROMO CODE CARD REVEAL */}
            <div className="bg-white border-2 border-[#1E5751] rounded-[2px] p-6 sm:p-7 text-center space-y-4 shadow-sm relative overflow-hidden">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-[#1E5751]/10 text-[#1E5751] text-[10px] font-serif font-bold uppercase tracking-widest border border-[#1E5751]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#1E5751]" />
                <span>{isAr ? "هدية إضافية لمتلقي الهدية" : "Special Gift for the Recipient"}</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-serif font-black text-[#23231e]">
                {isAr
                  ? "أحببت هذه الهدية؟ اصنع كتاباً مشابهاً لطفلك بخصم ٢٠٪!"
                  : "Loved this keepsake? Create a magical book for your child with 20% OFF!"}
              </h4>

              <p className="text-xs sm:text-sm text-[#23231e]/75 max-w-lg mx-auto font-medium leading-relaxed">
                {isAr
                  ? "استخدم كود الخصم الحصري UNWRAP20 عند الدفع لتحصل على خصم فوري بنسبة ٢٠٪ على أي كتاب مخصص، مع شحن سريع مجاني لجميع الإمارات."
                  : "Use exclusive code UNWRAP20 at checkout for 20% OFF any personalized storybook with free express delivery across all 7 UAE Emirates."}
              </p>

              {/* Coupon Box with Copy Button */}
              <div className="max-w-md mx-auto bg-[#FDF8F1] border border-[#23231e]/20 rounded-[2px] p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
                <div className="text-left rtl:text-right">
                  <span className="text-[10px] uppercase font-bold text-[#23231e]/60 block">
                    {isAr ? "كود خصمك الترحيبي:" : "Your Discount Code:"}
                  </span>
                  <span className="font-mono font-black text-xl sm:text-2xl text-[#1E5751] tracking-wider">
                    UNWRAP20
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyCoupon}
                    className="bg-[#1E5751] hover:bg-[#16433e] text-white font-bold text-xs px-4 py-2.5 rounded-[2px] transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {copiedCoupon ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedCoupon ? (isAr ? "تم النسخ!" : "Copied!") : (isAr ? "نسخ الكود" : "Copy Code")}</span>
                  </button>

                  <Link
                    href={isAr ? "/ar/cart?coupon=UNWRAP20" : "/cart?coupon=UNWRAP20"}
                    className="bg-white hover:bg-slate-50 text-[#23231e] font-bold text-xs px-3.5 py-2.5 rounded-[2px] border border-[#23231e]/20 transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isAr ? "تطبيق في السلة" : "Apply to Cart"}</span>
                    <ExternalLink className="w-3 h-3 text-[#1E5751]" />
                  </Link>
                </div>
              </div>
            </div>

            {/* VIRAL WHATSAPP FAMILY SHARE BUTTON */}
            <div className="bg-white border border-[#23231e]/15 rounded-[2px] p-6 text-center space-y-4 shadow-xs">
              <span className="text-[11px] font-serif font-bold text-[#1E5751] uppercase tracking-wider block">
                {isAr ? "شارك الفرحة والمفاجأة مع الأهل والأصدقاء" : "Share the Joy & Surprise with Family"}
              </span>

              <h4 className="text-lg sm:text-xl font-serif font-black text-[#23231e]">
                {isAr
                  ? `أرسل رابط القصة إلى الجدة، الأعمام، والأقارب عبر الواتساب`
                  : `Send ${childName}'s Keepsake to Grandparents, Aunts & Uncles on WhatsApp`}
              </h4>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                {/* WhatsApp Link Button */}
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-[#23231e] font-black px-8 py-3.5 rounded-[2px] text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Share2 className="w-4 h-4 text-[#23231e]" />
                  <span>
                    {isAr
                      ? "مشاركة الهدية مع العائلة عبر الواتساب 💬"
                      : "Share with Family via WhatsApp 💬"}
                  </span>
                </a>

                {/* Direct Link Copy Button */}
                <button
                  type="button"
                  onClick={handleCopyShareLink}
                  className="w-full sm:w-auto bg-white hover:bg-slate-50 text-[#23231e] font-bold px-6 py-3.5 rounded-[2px] text-xs sm:text-sm border border-[#23231e]/20 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedShareLink ? <Check className="w-4 h-4 text-[#1E5751]" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedShareLink ? (isAr ? "تم نسخ الرابط!" : "Link Copied!") : (isAr ? "نسخ الرابط المباشر" : "Copy Gift Link")}</span>
                </button>
              </div>
            </div>

            {/* Re-wrap Link & Explore Store */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
              <button
                type="button"
                onClick={handleRewrap}
                className="text-xs font-bold text-[#23231e]/70 hover:text-[#1E5751] transition flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isAr ? "إعادة لف الهدية والشريط 🎁" : "Re-wrap gift box 🎁"}</span>
              </button>

              <span className="text-slate-300">•</span>

              <Link
                href={isAr ? "/ar" : "/"}
                className="text-xs font-bold text-[#1E5751] hover:underline transition"
              >
                {isAr ? "استكشاف مكتبة الحكايات الكاملة ➔" : "Explore All Personalized Books ➔"}
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Footer */}
      <footer className="relative z-20 max-w-5xl mx-auto px-4 py-6 w-full text-center text-xs text-[#23231e]/60 border-t border-[#23231e]/10">
        <p>
          {isAr
            ? "حكايات مخصصة © ٢٠٢٦ • صُنعت بكل فخر في دولة الإمارات العربية المتحدة"
            : "PersonalizedTales © 2026 • Crafted with pride in Abu Dhabi & Dubai, UAE"}
        </p>
      </footer>
    </div>
  );
}

export default function DigitalUnwrappingView(props: { initialLang?: "en" | "ar"; giftId?: string }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FDF8F1] flex items-center justify-center text-[#1E5751] font-bold">
          Loading magical gift...
        </div>
      }
    >
      <DigitalUnwrappingContent {...props} />
    </Suspense>
  );
}
