'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  DEFAULT_PROMOTIONS_SETTINGS,
  PromotionOffer,
  PromotionsSettings,
} from '@/config/promotions';

const STORAGE_KEY = 'personalizedtales_promotions_settings_v2';
const UPDATE_EVENT = 'personalizedtales:promo-update';

/**
 * Structural fallback so `activeOffer` always satisfies its non-optional
 * PromotionOffer type under noUncheckedIndexedAccess.
 */
function fallbackOffer(): PromotionOffer {
  const fromDefaults = DEFAULT_PROMOTIONS_SETTINGS.offers[0];
  if (fromDefaults) return fromDefaults;
  return {
    id: 'welcome10',
    code: 'WELCOME10',
    badge: '10% OFF',
    titleEn: 'Welcome offer — 10% off',
    titleAr: 'عرض الترحيب — خصم ١٠٪',
    descriptionEn: '10% off your first personalized book order.',
    descriptionAr: 'خصم ١٠٪ على طلبك الأول من القصص المخصصة.',
    showCountdown: false,
    discountType: 'percentage',
    discountValue: 10,
  };
}

export function usePromotions() {
  const [settings, setSettings] = useState<PromotionsSettings>(DEFAULT_PROMOTIONS_SETTINGS);
  const [isMounted, setIsMounted] = useState(false);
  // Tracks the last JSON we persisted, so our own broadcast echo (same tab)
  // is ignored and can never cause an update loop.
  const lastPersistedRef = useRef<string>('');

  // Load from localStorage on mount (hydration-safe)
  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        lastPersistedRef.current = stored;
        const parsed = JSON.parse(stored) as PromotionsSettings;
        if (parsed && typeof parsed.isBannerActive === 'boolean' && parsed.activeOfferId) {
          setSettings(parsed);
        }
      }
    } catch {
      // Fallback to default
    }

    const handleUpdate = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        // Ignore our own broadcast echo — only adopt changes written by
        // another tab or another hook instance.
        if (stored && stored !== lastPersistedRef.current) {
          lastPersistedRef.current = stored;
          const parsed = JSON.parse(stored) as PromotionsSettings;
          setSettings(parsed);
        }
      } catch {
        // Ignore
      }
    };

    window.addEventListener(UPDATE_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(UPDATE_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Persist + broadcast whenever settings change. Side effects live here —
  // NEVER inside setState updaters (updaters must be pure; impure updaters
  // double-fire under React StrictMode and break concurrent rendering).
  useEffect(() => {
    if (!isMounted) return;
    try {
      const json = JSON.stringify(settings);
      lastPersistedRef.current = json;
      localStorage.setItem(STORAGE_KEY, json);
      window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
    } catch {
      // Ignore (private mode, quota, etc.)
    }
  }, [settings, isMounted]);

  const saveSettings = useCallback((newSettings: PromotionsSettings) => {
    setSettings(newSettings);
  }, []);

  const toggleBanner = useCallback((active?: boolean) => {
    setSettings((prev) => ({
      ...prev,
      isBannerActive: active !== undefined ? active : !prev.isBannerActive,
    }));
  }, []);

  const selectOffer = useCallback((offerId: string) => {
    setSettings((prev) => ({ ...prev, activeOfferId: offerId }));
  }, []);

  const updateOffer = useCallback((offerId: string, updates: Partial<PromotionOffer>) => {
    setSettings((prev) => ({
      ...prev,
      offers: prev.offers.map((offer) =>
        offer.id === offerId ? { ...offer, ...updates } : offer
      ),
    }));
  }, []);

  const resetToDefault = useCallback(() => {
    saveSettings(DEFAULT_PROMOTIONS_SETTINGS);
  }, [saveSettings]);

  const activeOffer: PromotionOffer = useMemo(() => {
    const found = settings.offers.find((o) => o.id === settings.activeOfferId);
    return found ?? settings.offers[0] ?? fallbackOffer();
  }, [settings]);

  return {
    settings,
    isMounted,
    activeOffer,
    isBannerActive: settings.isBannerActive,
    toggleBanner,
    selectOffer,
    updateOffer,
    resetToDefault,
    saveSettings,
  };
}
