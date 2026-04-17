import { useEffect } from 'react';

/** Locks body scroll while a drawer/overlay is open. */
export function useDrawerLock(isOpen: boolean) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
}
