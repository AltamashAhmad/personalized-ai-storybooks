'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useFocusTrap } from './useFocusTrap';

export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: DrawerSize;
  dir?: 'ltr' | 'rtl';
  isRtl?: boolean;
  className?: string;
  contentClassName?: string;
  ariaLabel?: string;
  showCloseButton?: boolean;
}

const sizeClasses: Record<DrawerSize, string> = {
  sm: 'max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-md md:max-w-lg',
  xl: 'sm:max-w-lg md:max-w-xl',
  full: 'max-w-full',
};

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  description,
  icon,
  children,
  footer,
  size = 'lg',
  dir,
  isRtl: isRtlProp,
  className,
  contentClassName,
  ariaLabel,
  showCloseButton = true,
}) => {
  const rtl = isRtlProp ?? dir === 'rtl';

  // Trap Tab focus inside the drawer while open; restore focus to the opener on close.
  const dialogRef = useFocusTrap<HTMLElement>(isOpen);

  // Handle ESC key listener & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop with blur & smooth fade */}
      <div
        className={cn(
          'fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel with RTL Awareness */}
      <aside
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel || (typeof title === 'string' ? title : undefined)}
        aria-hidden={!isOpen || undefined}
        inert={!isOpen}
        dir={rtl ? 'rtl' : 'ltr'}
        className={cn(
          'fixed top-0 bottom-0 z-50 w-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out h-full overflow-hidden',
          rtl ? 'left-0' : 'right-0',
          sizeClasses[size],
          isOpen
            ? 'translate-x-0 pointer-events-auto visible'
            : rtl
            ? '-translate-x-full pointer-events-none invisible'
            : 'translate-x-full pointer-events-none invisible',
          className
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 bg-slate-50/70 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              {icon && <div className="shrink-0">{icon}</div>}
              {title && (
                <div className="min-w-0">
                  <h2 className="font-black text-base sm:text-lg text-slate-950 truncate">
                    {title}
                  </h2>
                  {description && (
                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                      {description}
                    </p>
                  )}
                </div>
              )}
            </div>

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer shrink-0"
                aria-label={rtl ? 'إغلاق' : 'Close'}
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Scrollable Content Body */}
        <div
          className={cn(
            'flex-1 overflow-y-auto px-6 py-5 space-y-6 text-slate-900',
            contentClassName
          )}
        >
          {children}
        </div>

        {/* Optional Sticky Footer */}
        {footer && (
          <div className="p-5 border-t border-slate-200/80 bg-slate-50/90 shrink-0">
            {footer}
          </div>
        )}
      </aside>
    </>
  );
};

Drawer.displayName = 'Drawer';

export default Drawer;
