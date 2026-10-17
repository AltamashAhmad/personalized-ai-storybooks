import React from 'react';
import { cn } from '@/lib/utils/cn';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'gold' | 'outline';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  isRtl?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[#1E5751]/10 text-[#1E5751] border border-[#1E5751]/20',
  gold: 'bg-[#C9A96E]/20 text-[#825c17] border border-[#C9A96E]/40',
  success: 'bg-emerald-50 text-emerald-800 border border-emerald-300',
  warning: 'bg-amber-100/80 text-amber-900 border border-amber-300',
  outline: 'bg-transparent text-slate-700 border border-slate-300',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-[10px] px-2.5 py-0.5 gap-1 font-bold',
  md: 'text-xs px-3 py-1 gap-1.5 font-black',
  lg: 'text-sm px-3.5 py-1.5 gap-2 font-black',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  icon,
  isRtl = false,
  className,
  children,
  ...rest
}) => {
  return (
    <span
      dir={isRtl ? 'rtl' : undefined}
      className={cn(
        'inline-flex items-center rounded-full tracking-wider uppercase select-none transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...rest}
    >
      {icon && <span className="shrink-0 flex items-center">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

Badge.displayName = 'Badge';

export default Badge;
