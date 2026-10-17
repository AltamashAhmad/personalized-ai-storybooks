'use client';

import React from 'react';
import {
  Volume2,
  VolumeX,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  RotateCcw,
  X,
  BookOpen,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { StorySpread, CharacterConfig, getSpreadContent } from '@/config/sampleBookData';

export interface FlipbookControlsProps {
  currentSpread: StorySpread;
  isAr: boolean;
  soundEnabled: boolean;
  onToggleSound?: () => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  isZoomOpen: boolean;
  setIsZoomOpen: (val: boolean) => void;
  zoomScale: number;
  setZoomScale: React.Dispatch<React.SetStateAction<number>>;
  panOffset: { x: number; y: number };
  setPanOffset: (val: { x: number; y: number }) => void;
  config: CharacterConfig;
  lang: 'en' | 'ar';
  currentSpreadIndex: number;
  spreadsCount: number;
  turnPrev: () => void;
  turnNext: () => void;
}

export default function FlipbookControls({
  currentSpread,
  isAr,
  soundEnabled,
  onToggleSound,
  isFullscreen,
  toggleFullscreen,
  isZoomOpen,
  setIsZoomOpen,
  zoomScale,
  setZoomScale,
  panOffset,
  setPanOffset,
  config,
  lang,
  currentSpreadIndex,
  spreadsCount,
  turnPrev,
  turnNext,
}: FlipbookControlsProps) {
  const [isDraggingPan, setIsDraggingPan] = React.useState(false);
  const panStartRef = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const content = getSpreadContent(currentSpread, config, lang);

  const handlePanDown = (e: React.MouseEvent) => {
    if (zoomScale <= 1) return;
    setIsDraggingPan(true);
    panStartRef.current = {
      x: e.clientX - panOffset.x,
      y: e.clientY - panOffset.y,
    };
  };

  const handlePanMove = (e: React.MouseEvent) => {
    if (!isDraggingPan || zoomScale <= 1) return;
    const maxPan = (zoomScale - 1) * 350;
    const nextX = Math.max(-maxPan, Math.min(maxPan, e.clientX - panStartRef.current.x));
    const nextY = Math.max(-maxPan, Math.min(maxPan, e.clientY - panStartRef.current.y));
    setPanOffset({ x: nextX, y: nextY });
  };

  const handlePanUp = () => {
    setIsDraggingPan(false);
  };

  // Lock background scroll while the zoom lightbox is open; restore on close.
  React.useEffect(() => {
    if (!isZoomOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isZoomOpen]);

  return (
    <>
      {/* Floating HUD Bar (Zoom, Fullscreen, Sound) */}
      <div className="w-full flex items-center justify-between px-2 pb-2.5 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-amber-500 uppercase tracking-wider text-[11px] flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            {currentSpread.id === 0
              ? isAr
                ? 'الغلاف التذكاري'
                : 'Cover Keepsake'
              : `${isAr ? 'الصفحات' : 'Spreads'} ${currentSpread.spreadNumber * 2 - 1}–${
                  currentSpread.spreadNumber * 2
                } ${isAr ? 'من ٢٤' : 'of 24'}`}
          </span>
          <span className="hidden sm:inline-block text-slate-600">•</span>
          <span className="hidden sm:inline-block text-slate-400 font-medium truncate max-w-[240px]">
            {isAr ? currentSpread.spreadTitleAr : currentSpread.spreadTitleEn}
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={onToggleSound}
            className="p-1.5 rounded-[2px] bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer border border-slate-700/60"
            title={soundEnabled ? 'Mute page turns' : 'Enable page turns sound'}
            aria-label="Toggle sound"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[#1E5751] dark:text-emerald-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>

          {/* Lightbox Zoom */}
          <button
            type="button"
            onClick={() => {
              setIsZoomOpen(true);
              setZoomScale(1.5);
              setPanOffset({ x: 0, y: 0 });
            }}
            className="p-1.5 rounded-[2px] bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer border border-slate-700/60"
            title="Inspect with Zoom Lightbox"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
          </button>

          {/* Fullscreen Mode */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 rounded-[2px] bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer border border-slate-700/60"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Reading Mode'}
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Arrows for Stage */}
      <button
        type="button"
        onClick={isAr ? turnNext : turnPrev}
        disabled={currentSpreadIndex === 0}
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-25 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white transition cursor-pointer backdrop-blur-sm ${
          currentSpreadIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-80 hover:opacity-100'
        }`}
        title={isAr ? 'Next spread' : 'Previous spread'}
        aria-label="Previous spread"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={isAr ? turnPrev : turnNext}
        disabled={currentSpreadIndex === spreadsCount - 1}
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-25 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white transition cursor-pointer backdrop-blur-sm ${
          currentSpreadIndex === spreadsCount - 1
            ? 'opacity-0 pointer-events-none'
            : 'opacity-80 hover:opacity-100'
        }`}
        title={isAr ? 'Previous spread' : 'Next spread'}
        aria-label="Next spread"
      >
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* FEATURE 22: LIGHTBOX ZOOM MODAL WITH DRAGGABLE PAN */}
      {isZoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={isAr ? 'تكبير وفحص التفاصيل' : 'High-Resolution Inspection'}
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <div className="w-full max-w-5xl flex items-center justify-between text-white pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold text-sm sm:text-base">
                {isAr ? 'تكبير وفحص التفاصيل' : 'High-Resolution Inspection'}
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                ({zoomScale}x Magnification)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomScale((z) => Math.max(1, Math.round((z - 0.5) * 10) / 10))}
                disabled={zoomScale <= 1}
                className="p-2 rounded-[2px] bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white cursor-pointer transition border border-slate-700"
                title="Zoom Out"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setZoomScale((z) => Math.min(2.5, Math.round((z + 0.5) * 10) / 10))}
                disabled={zoomScale >= 2.5}
                className="p-2 rounded-[2px] bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white cursor-pointer transition border border-slate-700"
                title="Zoom In"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setZoomScale(1);
                  setPanOffset({ x: 0, y: 0 });
                }}
                className="p-2 rounded-[2px] bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer transition border border-slate-700"
                title="Reset Zoom"
                aria-label="Reset zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="p-2 rounded-[2px] bg-rose-900/40 hover:bg-rose-900/80 text-rose-300 hover:text-white cursor-pointer transition border border-rose-700/60 ml-2"
                title="Close Zoom Lightbox"
                aria-label="Close zoom"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Draggable Pan Zoom Canvas */}
          <div
            onMouseDown={handlePanDown}
            onMouseMove={handlePanMove}
            onMouseUp={handlePanUp}
            onMouseLeave={handlePanUp}
            className={`my-auto w-full max-w-5xl aspect-[16/10] overflow-hidden rounded-[2px] relative border-2 border-[#1E5751]/60 shadow-[var(--shadow-spine)] bg-slate-900 ${
              zoomScale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
            }`}
          >
            <div
              className="w-full h-full relative transition-transform duration-75"
              style={{
                transform: `scale(${zoomScale}) translate(${panOffset.x / zoomScale}px, ${
                  panOffset.y / zoomScale
                }px)`,
                transformOrigin: 'center center',
              }}
            >
              <img
                src={currentSpread.bgImage}
                alt={currentSpread.spreadTitleEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/60" />

              <div className="absolute inset-0 p-8 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x md:divide-slate-800/80">
                <div className="flex-1 p-4 text-white font-serif text-base sm:text-xl whitespace-pre-line leading-relaxed text-shadow-arabic">
                  {content.leftVerse}
                </div>
                <div
                  className="flex-1 p-4 text-white font-amiri text-base sm:text-xl whitespace-pre-line leading-loose text-shadow-arabic"
                  dir="rtl"
                >
                  {content.rightVerse}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-slate-400">
            {isAr
              ? 'اسحب للتجول داخل الصفحة عند التكبير • اضغط زر الإغلاق للعودة'
              : 'Click & drag to pan across the magnified page • Press Escape or Close to return'}
          </div>
        </div>
      )}
    </>
  );
}
