'use client';

import React, { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface AccordionItem {
  id: string;
  heading: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Only one panel open at a time when true (default). */
  single?: boolean;
  /** Optionally specify default open item ID(s). */
  defaultOpenId?: string | string[];
  /** Optionally specify default open 0-based item index(es). */
  defaultOpenIndex?: number | number[];
  className?: string;
}

/**
 * Accessible disclosure list. Each trigger is a button with aria-expanded/aria-controls,
 * the heading hairline and chevron follow the reference storefront.
 */
export function Accordion({ items, single = true, defaultOpenId, defaultOpenIndex, className }: AccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<string[]>(() => {
    if (defaultOpenId) {
      return Array.isArray(defaultOpenId) ? defaultOpenId : [defaultOpenId];
    }
    if (defaultOpenIndex !== undefined) {
      const indices = Array.isArray(defaultOpenIndex) ? defaultOpenIndex : [defaultOpenIndex];
      return indices.map((i) => items[i]?.id).filter(Boolean);
    }
    return [];
  });

  const toggle = (id: string) =>
    setOpen((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      return single ? [id] : [...prev, id];
    });

  return (
    <div className={className}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        const panelId = `${baseId}-${item.id}-panel`;
        const triggerId = `${baseId}-${item.id}-trigger`;
        return (
          <div key={item.id} className="border-b border-[var(--color-sharpie-20)]">
            <h3 className="m-0">
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 py-3 text-start text-base font-semibold text-[var(--color-sharpie)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-paper-boat)]"
              >
                <span>{item.heading}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn('h-5 w-5 shrink-0 text-[var(--color-racing-green)] transition-transform duration-200', isOpen && 'rotate-180')}
                />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!isOpen} className="pb-4 text-[15px] leading-relaxed text-[var(--color-sharpie-80)]">
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
