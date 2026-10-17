'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isRtl?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#1E5751] hover:bg-[#16433e] text-white shadow-md shadow-[#1E5751]/20 border border-transparent focus:ring-[#1E5751]',
  secondary:
    'bg-[#C9A96E] hover:bg-[#b89555] text-[#23231E] shadow-md shadow-[#C9A96E]/20 border border-transparent focus:ring-[#C9A96E]',
  outline:
    'bg-transparent hover:bg-[#1E5751]/10 text-[#1E5751] border-2 border-[#1E5751] focus:ring-[#1E5751]',
  ghost:
    'bg-transparent hover:bg-slate-100 text-[#23231E] border border-transparent focus:ring-slate-400',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-xs px-3.5 py-1.5 rounded-xl gap-1.5 font-bold',
  md: 'text-sm px-5 py-2.5 rounded-xl gap-2 font-black',
  lg: 'text-base px-6 py-3.5 rounded-2xl gap-2.5 font-black',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      isRtl = false,
      disabled,
      className,
      children,
      type = 'button',
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading}
        dir={isRtl ? 'rtl' : undefined}
        className={cn(
          'inline-flex items-center justify-center transition-all duration-200 cursor-pointer select-none',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth ? 'w-full' : '',
          className
        )}
        {...rest}
      >
        {isLoading ? (
          <span
            className={cn(
              'inline-flex items-center gap-2',
              isRtl ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            <svg
              className="animate-spin h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>{children}</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
