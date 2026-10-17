"use client";

import { useState, useEffect, useCallback } from "react";
import { paperSoundEngine, PlayTurnOptions } from "@/lib/audio/PaperSoundEngine";

export interface UsePaperSoundReturn {
  /** Play page turn soundscape with optional direction, panning, or volume overrides */
  playTurn: (options?: PlayTurnOptions) => void;
  /** Whether the sound engine is currently muted */
  isMuted: boolean;
  /** Toggle muted state */
  toggleMute: () => boolean;
  /** Set explicit muted state */
  setMuted: (muted: boolean) => void;
  /** Current volume level (0.0 to 1.0) */
  volume: number;
  /** Set volume level */
  setVolume: (vol: number) => void;
}

/**
 * usePaperSound
 * React hook providing reactive audio controls and seamless integration
 * with the pure Web Audio PaperSoundEngine singleton.
 */
export function usePaperSound(initialMuted: boolean = false): UsePaperSoundReturn {
  const [isMuted, setIsMutedState] = useState<boolean>(initialMuted);
  const [volume, setVolumeState] = useState<number>(() => paperSoundEngine.getVolume());

  useEffect(() => {
    paperSoundEngine.setMuted(initialMuted);
    setIsMutedState(paperSoundEngine.getIsMuted());
  }, [initialMuted]);

  const playTurn = useCallback((options?: PlayTurnOptions) => {
    paperSoundEngine.playTurn(options);
  }, []);

  const setMuted = useCallback((muted: boolean) => {
    paperSoundEngine.setMuted(muted);
    setIsMutedState(muted);
  }, []);

  const toggleMute = useCallback(() => {
    const newMuted = paperSoundEngine.toggleMute();
    setIsMutedState(newMuted);
    return newMuted;
  }, []);

  const setVolume = useCallback((vol: number) => {
    paperSoundEngine.setVolume(vol);
    setVolumeState(paperSoundEngine.getVolume());
  }, []);

  return {
    playTurn,
    isMuted,
    toggleMute,
    setMuted,
    volume,
    setVolume,
  };
}
