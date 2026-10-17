'use client';

import { useState, useCallback } from 'react';

export interface UseDisclosureOptions {
  defaultIsOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface UseDisclosureReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  onOpenChange: (open: boolean) => void;
}

/**
 * Custom hook for managing boolean disclosure states (drawers, modals, menus, accordions).
 * Returns { isOpen, open, close, toggle, onOpenChange }.
 */
export function useDisclosure(
  initial?: boolean | UseDisclosureOptions
): UseDisclosureReturn {
  const options = typeof initial === 'boolean' ? { defaultIsOpen: initial } : initial || {};
  const { defaultIsOpen = false, onOpen, onClose } = options;

  const [isOpen, setIsOpen] = useState<boolean>(defaultIsOpen);

  const open = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const toggle = useCallback(() => {
    // Callbacks run outside the state updater: side effects inside updaters
    // double-fire under React StrictMode.
    const next = !isOpen;
    setIsOpen(next);
    if (next) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [isOpen, onOpen, onClose]);

  const onOpenChange = useCallback(
    (nextOpen: boolean) => {
      setIsOpen(nextOpen);
      if (nextOpen) {
        onOpen?.();
      } else {
        onClose?.();
      }
    },
    [onOpen, onClose]
  );

  return {
    isOpen,
    open,
    close,
    toggle,
    onOpenChange,
  };
}

export default useDisclosure;
