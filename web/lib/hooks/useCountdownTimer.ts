"use client";

import { useState, useEffect } from "react";

export interface CountdownState {
  hours: number;
  minutes: number;
  seconds: number;
  formattedHours: string;
  formattedMinutes: string;
  formattedSeconds: string;
  totalSecondsRemaining: number;
  isMounted: boolean;
}

/**
 * useCountdownTimer
 * Hydration-safe countdown timer targeting daily express delivery / BOGO50 cutoff (default 23:59:59).
 * Guaranteed zero SSR hydration mismatch: returns stable fallback until client mount.
 */
export function useCountdownTimer(cutoffHour: number = 24): CountdownState {
  const [isMounted, setIsMounted] = useState(false);
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0, total: 0 });

  useEffect(() => {
    setIsMounted(true);

    const calcRemaining = () => {
      const now = new Date();
      const target = new Date(now);

      if (cutoffHour >= 24) {
        target.setHours(23, 59, 59, 999);
      } else {
        target.setHours(cutoffHour, 0, 0, 0);
        if (now.getTime() > target.getTime()) {
          target.setDate(target.getDate() + 1);
        }
      }

      const diffMs = Math.max(0, target.getTime() - now.getTime());
      const totalSeconds = Math.floor(diffMs / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      return { hours, minutes, seconds, total: totalSeconds };
    };

    setTime(calcRemaining());

    const interval = setInterval(() => {
      setTime(calcRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [cutoffHour]);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return {
    hours: time.hours,
    minutes: time.minutes,
    seconds: time.seconds,
    formattedHours: pad(time.hours),
    formattedMinutes: pad(time.minutes),
    formattedSeconds: pad(time.seconds),
    totalSecondsRemaining: time.total,
    isMounted,
  };
}
