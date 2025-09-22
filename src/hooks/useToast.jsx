import { useCallback } from 'react';

export default function useToast() {
  const showToast = useCallback((type, title, message) => {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { type, title, message }
    }));
  }, []);

  return { showToast };
}