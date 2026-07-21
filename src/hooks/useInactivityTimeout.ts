import { useCallback } from 'react';

interface UseInactivityTimeoutOptions {
  timeout?: number; // in milliseconds
  onTimeout?: () => void;
  enabled?: boolean;
}

export const useInactivityTimeout = ({
  timeout = 30000, // 30 seconds default
  onTimeout,
  enabled = true,
}: UseInactivityTimeoutOptions = {}) => {
  const resetTimer = useCallback(() => {
    // No automatic inactivity logout. This hook is intentionally disabled.
    if (onTimeout) {
      // If any code still passes an onTimeout callback, do not execute it automatically.
    }
  }, [onTimeout]);

  return { resetTimer };
};