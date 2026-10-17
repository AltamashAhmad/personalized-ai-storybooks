import React from 'react';
import { cn } from '@/lib/utils/cn';

export type PageSectionTone = 'default' | 'kraft' | 'paper' | 'white' | 'green' | 'tinkerbell' | 'sharpie';

export interface PageSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  tone?: PageSectionTone;
  /** Removes the vertical padding, e.g. for full-bleed hero art. */
  flush?: boolean;
}

const toneStyles: Record<PageSectionTone, string> = {
  default: 'bg-[var(--color-kraft-paper-60)] text-[var(--color-sharpie)]',
  kraft: 'bg-[var(--color-kraft-paper)] text-[var(--color-sharpie)]',
  paper: 'bg-[var(--color-kraft-paper-60)] text-[var(--color-sharpie)]',
  white: 'bg-[var(--color-bright-smile)] text-[var(--color-sharpie)]',
  green: 'bg-[var(--color-racing-green)] text-white',
  tinkerbell: 'bg-[var(--color-tinkerbell)] text-[var(--color-sharpie)]',
  sharpie: 'bg-[var(--color-sharpie)] text-white',
};

/**
 * Full-bleed horizontal band with a centred content column (max 80rem).
 * Every homepage section is a PageSection so spacing and width stay uniform.
 */
export function PageSection({ tone = 'default', flush = false, className, children, ...rest }: PageSectionProps) {
  return (
    <section className={cn(toneStyles[tone], flush ? '' : 'py-10 md:py-14', className)} {...rest}>
      <div className="wb-container">{children}</div>
    </section>
  );
}

export default PageSection;
