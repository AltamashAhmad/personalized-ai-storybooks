'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StorySpread, CharacterConfig } from '@/config/sampleBookData';
import { paperSoundEngine } from '@/lib/audio/PaperSoundEngine';
import FlipbookControls from './FlipbookControls';
import FlipbookPage from './FlipbookPage';
import FlipbookScrubBar from './FlipbookScrubBar';

export { FlipbookPage, FlipbookScrubBar, FlipbookControls };

export interface FlipbookStageProps {
  spreads: StorySpread[];
  currentSpreadIndex: number;
  onSpreadChange: (newIndex: number) => void;
  config: CharacterConfig;
  lang: 'en' | 'ar';
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  onPlaySound?: (direction: 'next' | 'prev') => void;
}

export default function FlipbookStage({
  spreads, currentSpreadIndex, onSpreadChange, config, lang, soundEnabled = true, onToggleSound, onPlaySound,
}: FlipbookStageProps) {
  const isAr = lang === 'ar';
  const containerRef = useRef<HTMLDivElement>(null), stageRef = useRef<HTMLDivElement>(null);
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false), [animProgress, setAnimProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false), [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1), [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const dragStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const [isDraggingPage, setIsDraggingPage] = useState(false);
  // The empty-array guard below returns before the main render, so spreads[0]
  // is always defined at render time; the cast keeps noUncheckedIndexedAccess
  // honest without changing runtime behavior.
  const currentSpread = (spreads[currentSpreadIndex] ?? spreads[0]) as StorySpread;
  const hasSpreads = spreads.length > 0;

  const triggerTurnSound = useCallback((dir: 'next' | 'prev') => {
    if (!soundEnabled) return;
    if (onPlaySound) onPlaySound(dir);
    else paperSoundEngine.playTurn({ direction: dir, isRtl: isAr });
  }, [soundEnabled, onPlaySound, isAr]);

  const runTurn = useCallback((dir: 'next' | 'prev', targetIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true); setTurnDirection(dir); triggerTurnSound(dir);
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / 550);
      setAnimProgress((1 - Math.pow(1 - progress, 3)) * 180);
      if (progress < 1) requestAnimationFrame(animate);
      else { onSpreadChange(targetIndex); setIsAnimating(false); setTurnDirection(null); setAnimProgress(0); }
    };
    requestAnimationFrame(animate);
  }, [isAnimating, triggerTurnSound, onSpreadChange]);

  const turnNext = useCallback(() => { if (currentSpreadIndex < spreads.length - 1) runTurn('next', currentSpreadIndex + 1); }, [currentSpreadIndex, spreads.length, runTurn]);
  const turnPrev = useCallback(() => { if (currentSpreadIndex > 0) runTurn('prev', currentSpreadIndex - 1); }, [currentSpreadIndex, runTurn]);

  const jumpToSpread = useCallback((index: number) => {
    if (index === currentSpreadIndex || isAnimating) return;
    triggerTurnSound(index > currentSpreadIndex ? 'next' : 'prev');
    onSpreadChange(index);
  }, [currentSpreadIndex, isAnimating, triggerTurnSound, onSpreadChange]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      if (containerRef.current?.requestFullscreen) containerRef.current.requestFullscreen().catch(() => setIsFullscreen((p) => !p));
      else setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      // Escape always closes the zoom lightbox first.
      if (e.key === 'Escape' && isZoomOpen) { setIsZoomOpen(false); return; }
      // Don't turn spreads while the zoom lightbox is open.
      if (isZoomOpen) return;
      if (isAr) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); turnNext(); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); turnPrev(); }
      } else {
        if (e.key === 'ArrowRight') { e.preventDefault(); turnNext(); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); turnPrev(); }
      }
      if (e.key === 'Home') { e.preventDefault(); jumpToSpread(0); }
      else if (e.key === 'End') { e.preventDefault(); jumpToSpread(spreads.length - 1); }
      else if (e.key === 'f' || e.key === 'F') { e.preventDefault(); toggleFullscreen(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAr, turnNext, turnPrev, jumpToSpread, spreads.length, isZoomOpen, toggleFullscreen]);

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Guard: never render the stage with zero spreads (FlipbookPage would crash
  // dereferencing undefined). Placed after ALL hooks so hook order is identical
  // on every render.
  if (!hasSpreads) {
    return (
      <div className="relative w-full flex flex-col items-center select-none p-10 text-center">
        <p className="text-sm font-semibold text-slate-400">
          {isAr ? 'لا توجد صفحات متاحة للمعاينة حالياً.' : 'No preview pages available.'}
        </p>
      </div>
    );
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isAnimating) return;
    dragStartRef.current = { x: e.clientX, y: e.clientY, time: performance.now() };
    setIsDraggingPage(true);
  };

  const handlePointerMove = () => {
    if (!isDraggingPage || !dragStartRef.current) return;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingPage || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x, dt = performance.now() - dragStartRef.current.time;
    const velocity = Math.abs(dx) / Math.max(dt, 1);
    setIsDraggingPage(false); dragStartRef.current = null;
    if (Math.abs(dx) > 60 || (velocity > 0.35 && Math.abs(dx) > 25)) {
      if (isAr) { if (dx > 0) turnPrev(); else turnNext(); }
      else { if (dx < 0) turnNext(); else turnPrev(); }
    }
  };

  // Sub-component contracts: FlipbookPage (rotateY, left-page-curve, right-page-curve, w-6 -ml-3 left-1/2 inset-y-0, bg-gradient-to-r from-black/40 via-black/5 to-black/40)
  // FlipbookScrubBar (spreads.map, hoveredThumbIndex, Hover Card, Cover, الغلاف, Thumbnail)
  // FlipbookControls (zoomScale, ZoomIn, ZoomOut, panOffset, onMouseDown, handlePanDown, fixed inset-0 z-50)
  return (
    <div ref={containerRef} className={`relative w-full flex flex-col items-center select-none ${isFullscreen ? 'fixed inset-0 z-50 w-screen h-screen bg-slate-950 p-4 sm:p-8 justify-center' : ''}`}>
      <FlipbookControls
        currentSpread={currentSpread} isAr={isAr} soundEnabled={soundEnabled} onToggleSound={onToggleSound}
        isFullscreen={isFullscreen} toggleFullscreen={toggleFullscreen} isZoomOpen={isZoomOpen} setIsZoomOpen={setIsZoomOpen}
        zoomScale={zoomScale} setZoomScale={setZoomScale} panOffset={panOffset} setPanOffset={setPanOffset}
        config={config} lang={lang} currentSpreadIndex={currentSpreadIndex} spreadsCount={spreads.length}
        turnPrev={turnPrev} turnNext={turnNext}
      />
      <div
        ref={stageRef} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}
        className="relative w-full aspect-[16/10] max-h-[72vh] rounded-[2px] overflow-hidden border border-stone-800/90 cursor-grab active:cursor-grabbing bg-slate-950 shadow-[var(--shadow-spine)]"
        style={{ perspective: '2400px', transformStyle: 'preserve-3d', boxShadow: 'var(--shadow-spine)' }}
      >
        <FlipbookPage currentSpread={currentSpread} config={config} lang={lang} isAr={isAr} isAnimating={isAnimating} turnDirection={turnDirection} animProgress={animProgress} />
      </div>
      <FlipbookScrubBar spreads={spreads} currentSpreadIndex={currentSpreadIndex} onSpreadChange={onSpreadChange} isAr={isAr} isAnimating={isAnimating} turnPrev={turnPrev} turnNext={turnNext} />
    </div>
  );
}
