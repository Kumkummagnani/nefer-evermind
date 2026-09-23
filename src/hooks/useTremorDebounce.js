import { useRef, useCallback } from 'react';

/**
 * useTremorDebounce
 * Handles pointerdown debounce tolerance (150-200ms) for tremor-affected elderly users.
 * Confirms taps only after debounce window passes without erratic flutter or double-tapping.
 */
export function useTremorDebounce(callback, debounceMs = 180) {
  const lastExecutionTimeRef = useRef(0);
  const pendingTimerRef = useRef(null);
  const isInteractingRef = useRef(false);

  const handlePointerDown = useCallback((e) => {
    // Prevent double invocation if already tracking
    const now = Date.now();
    const timeSinceLast = now - lastExecutionTimeRef.current;

    // Reject rapid multi-taps or Parkinsonian tremor flutters
    if (timeSinceLast < debounceMs) {
      if (e && e.preventDefault) e.preventDefault();
      return;
    }

    if (pendingTimerRef.current) {
      clearTimeout(pendingTimerRef.current);
      pendingTimerRef.current = null;
    }

    isInteractingRef.current = true;

    // Enforce 150-200ms clean window confirmation
    pendingTimerRef.current = setTimeout(() => {
      lastExecutionTimeRef.current = Date.now();
      isInteractingRef.current = false;
      pendingTimerRef.current = null;
      if (typeof callback === 'function') {
        callback(e);
      }
    }, debounceMs);
  }, [callback, debounceMs]);

  const handlePointerCancel = useCallback(() => {
    if (pendingTimerRef.current) {
      clearTimeout(pendingTimerRef.current);
      pendingTimerRef.current = null;
    }
    isInteractingRef.current = false;
  }, []);

  return {
    onPointerDown: handlePointerDown,
    onPointerCancel: handlePointerCancel,
    // Provide fallback onClick for keyboard accessibility (Enter / Space)
    onClick: (e) => {
      // If triggered via keyboard (detail === 0), execute cleanly
      if (e.detail === 0) {
        callback(e);
      }
    }
  };
}
