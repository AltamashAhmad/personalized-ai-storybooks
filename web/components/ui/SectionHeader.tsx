import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface SectionHeaderProps {
  title: React.ReactNode;
  titleAr?: React.ReactNode;
  subtitle?: React.ReactNode;
  subtitleAr?: React.ReactNode;
  eyebrow?: React.ReactNode;
  eyebrowIcon?: React.ReactNode;
  description?: React.ReactNode;
  descriptionAr?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  isAr?: boolean;
  dir?: 'ltr' | 'rtl';
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  titleAr,
  subtitle,
  subtitleAr,
  eyebrow,
  eyebrowIcon,
  description,
  descriptionAr,
  align = 'center',
  isAr = false,
  dir,
  className,
  titleClassName,
  descriptionClassName,
}) => {
  const effectiveTitle = isAr && titleAr ? titleAr : title;
  const effectiveSubtitle = isAr && subtitleAr ? subtitleAr : subtitle;
  const effectiveDescription = isAr && descriptionAr ? descriptionAr : description;

  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const justifyStyles = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <div
      dir={dir}
      className={cn(
        'flex flex-col mb-10 md:mb-14 max-w-4xl mx-auto',
        alignStyles[align],
        className
      )}
    >
      {/* Eyebrow Badge */}
      {eyebrow && (
        <div className={cn('flex w-full mb-3.5', justifyStyles[align])}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E5751]/10 text-[#1E5751] text-xs font-black uppercase tracking-wider">
            {eyebrowIcon && <span className="shrink-0">{eyebrowIcon}</span>}
            <span>{eyebrow}</span>
          </div>
        </div>
      )}

      {/* Main Heading */}
      <h2
        className={cn(
          'text-3xl sm:text-4xl md:text-5xl font-black text-[#23231E] font-serif tracking-tight leading-tight',
          titleClassName
        )}
      >
        {effectiveTitle}
      </h2>

      {/* Optional Subtitle (e.g. Arabic dual language subtitle or explanatory deck) */}
      {effectiveSubtitle && (
        <p className="mt-2 text-sm sm:text-base font-bold text-amber-700 font-serif">
          {effectiveSubtitle}
        </p>
      )}

      {/* Description */}
      {effectiveDescription && (
        <p
          className={cn(
            'mt-3.5 text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl',
            align === 'center' ? 'mx-auto' : '',
            descriptionClassName
          )}
        >
          {effectiveDescription}
        </p>
      )}
    </div>
  );
};

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;
