import { Injectable, signal, ElementRef, DestroyRef, inject } from '@angular/core';

// Copied and adapted from https://github.com/mantinedev/mantine/blob/90900efc7f107933ba027007cf240fea61d9c9f2/packages/%40mantine/hooks/src/use-focus-within/use-focus-within.ts#L16
// Converted to Angular service pattern with signals

export interface UseFocusWithinOptions {
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
}

/**
 * Utility function to check if the related target is contained within the current target
 */
function containsRelatedTarget(event: FocusEvent): boolean {
  if (
    event.currentTarget instanceof HTMLElement &&
    event.relatedTarget instanceof HTMLElement
  ) {
    return event.currentTarget.contains(event.relatedTarget);
  }
  return false;
}

/**
 * Angular equivalent of React's useFocusWithin hook.
 * Tracks whether focus is within a specific element and its descendants.
 */
@Injectable({
  providedIn: 'root'
})
export class UseFocusWithinService {
  private destroyRef = inject(DestroyRef);

  /**
   * Sets up focus tracking for an element.
   * Returns a signal that indicates whether the element or its descendants have focus.
   *
   * @param elementRef - Angular ElementRef to track focus for
   * @param options - Optional callbacks for focus and blur events
   * @returns Signal containing the focused state
   */
  setupFocusWithin<T extends HTMLElement>(
    elementRef: ElementRef<T>,
    options: UseFocusWithinOptions = {}
  ) {
    const { onFocus, onBlur } = options;
    const focused = signal(false);
    let focusedRef = false; // Internal ref to track current state

    const setFocused = (value: boolean) => {
      focused.set(value);
      focusedRef = value;
    };

    const handleFocusIn = (event: FocusEvent) => {
      if (!focusedRef) {
        setFocused(true);
        onFocus?.(event);
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      if (focusedRef && !containsRelatedTarget(event)) {
        setFocused(false);
        onBlur?.(event);
      }
    };

    const element = elementRef.nativeElement;
    if (element) {
      element.addEventListener('focusin', handleFocusIn);
      element.addEventListener('focusout', handleFocusOut);

      // Clean up event listeners
      this.destroyRef.onDestroy(() => {
        element.removeEventListener('focusin', handleFocusIn);
        element.removeEventListener('focusout', handleFocusOut);
      });
    }

    return focused.asReadonly();
  }

  /**
   * Creates a focus within tracker that can be dynamically attached to different elements.
   * Returns both the focused signal and methods to attach/detach from elements.
   *
   * @param options - Optional callbacks for focus and blur events
   * @returns Object with focused signal and attach/detach methods
   */
  createFocusWithinTracker(options: UseFocusWithinOptions = {}) {
    const { onFocus, onBlur } = options;
    const focused = signal(false);
    let focusedRef = false;
    let currentElement: HTMLElement | null = null;
    let cleanup: (() => void) | null = null;

    const setFocused = (value: boolean) => {
      focused.set(value);
      focusedRef = value;
    };

    const handleFocusIn = (event: FocusEvent) => {
      if (!focusedRef) {
        setFocused(true);
        onFocus?.(event);
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      if (focusedRef && !containsRelatedTarget(event)) {
        setFocused(false);
        onBlur?.(event);
      }
    };

    const attachToElement = (element: HTMLElement) => {
      // Clean up previous attachment
      detachFromElement();

      currentElement = element;
      element.addEventListener('focusin', handleFocusIn);
      element.addEventListener('focusout', handleFocusOut);

      cleanup = () => {
        element.removeEventListener('focusin', handleFocusIn);
        element.removeEventListener('focusout', handleFocusOut);
      };
    };

    const detachFromElement = () => {
      if (cleanup) {
        cleanup();
        cleanup = null;
      }
      currentElement = null;
      setFocused(false);
    };

    // Auto cleanup on destroy
    this.destroyRef.onDestroy(() => {
      detachFromElement();
    });

    return {
      focused: focused.asReadonly(),
      attachToElement,
      detachFromElement
    };
  }
}

/**
 * Standalone function version for use without dependency injection
 */
export function useFocusWithin<T extends HTMLElement>(
  element: T,
  options: UseFocusWithinOptions = {}
): {
  focused: () => boolean;
  cleanup: () => void;
} {
  const { onFocus, onBlur } = options;
  const focused = signal(false);
  let focusedRef = false;

  const setFocused = (value: boolean) => {
    focused.set(value);
    focusedRef = value;
  };

  const handleFocusIn = (event: FocusEvent) => {
    if (!focusedRef) {
      setFocused(true);
      onFocus?.(event);
    }
  };

  const handleFocusOut = (event: FocusEvent) => {
    if (focusedRef && !containsRelatedTarget(event)) {
      setFocused(false);
      onBlur?.(event);
    }
  };

  // Set up event listeners
  element.addEventListener('focusin', handleFocusIn);
  element.addEventListener('focusout', handleFocusOut);

  return {
    focused: focused.asReadonly(),
    cleanup: () => {
      element.removeEventListener('focusin', handleFocusIn);
      element.removeEventListener('focusout', handleFocusOut);
    }
  };
}
