import { Injectable, signal, computed, DestroyRef, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// This code is adapted from the `use-prefers-color-scheme` repo:
// https://github.com/rfoel/use-prefers-color-scheme/blob/v1.0.0/src/index.ts
// Converted to Angular service pattern with signals

export type ColorScheme = 'dark' | 'light' | 'no-preference';

/**
 * Angular equivalent of React's usePrefersColorScheme hook.
 * Detects and tracks the user's preferred color scheme using CSS media queries.
 */
@Injectable({
  providedIn: 'root'
})
export class UsePrefersColorSchemeService {
  private destroyRef = inject(DestroyRef);
  private platformId = inject(PLATFORM_ID);

  private preferredColorScheme = signal<ColorScheme>('no-preference');
  private isInitialized = signal(false);

  /**
   * Computed signal that returns the current preferred color scheme.
   * Automatically initializes and tracks changes when accessed.
   */
  colorScheme = computed(() => {
    if (!this.isInitialized() && isPlatformBrowser(this.platformId)) {
      this.initializeColorSchemeDetection();
    }
    return this.preferredColorScheme();
  });

  /**
   * Initializes color scheme detection using media queries.
   * Sets up listeners for changes in color scheme preference.
   */
  private initializeColorSchemeDetection(): void {
    if (!isPlatformBrowser(this.platformId) || typeof window.matchMedia !== 'function') {
      this.preferredColorScheme.set('no-preference');
      this.isInitialized.set(true);
      return;
    }

    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const lightQuery = window.matchMedia('(prefers-color-scheme: light)');

    // Set initial value
    const initialScheme = this.getColorSchemeFromQueries(darkQuery, lightQuery);
    this.preferredColorScheme.set(initialScheme);

    // Set up listeners for changes
    this.setupMediaQueryListeners(darkQuery, lightQuery);

    this.isInitialized.set(true);
  }

  /**
   * Determines color scheme from media query results
   */
  private getColorSchemeFromQueries(darkQuery: MediaQueryList, lightQuery: MediaQueryList): ColorScheme {
    const isDark = darkQuery?.matches;
    const isLight = lightQuery?.matches;

    if (isDark) return 'dark';
    if (isLight) return 'light';
    return 'no-preference';
  }

  /**
   * Sets up media query event listeners
   */
  private setupMediaQueryListeners(darkQuery: MediaQueryList, lightQuery: MediaQueryList): void {
    if (typeof darkQuery?.addEventListener === 'function') {
      // Modern browsers - MediaQueryList subclasses EventTarget
      const darkListener = (event: MediaQueryListEvent) => {
        if (event.matches) {
          this.preferredColorScheme.set('dark');
        }
      };

      const lightListener = (event: MediaQueryListEvent) => {
        if (event.matches) {
          this.preferredColorScheme.set('light');
        }
      };

      darkQuery.addEventListener('change', darkListener);
      lightQuery.addEventListener('change', lightListener);

      // Clean up listeners
      this.destroyRef.onDestroy(() => {
        darkQuery.removeEventListener('change', darkListener);
        lightQuery.removeEventListener('change', lightListener);
      });
    } else {
      // Legacy browsers - MediaQueryList doesn't subclass EventTarget
      const listener = () => {
        const newScheme = this.getColorSchemeFromQueries(darkQuery, lightQuery);
        this.preferredColorScheme.set(newScheme);
      };

      // This handles both dark and light changes
      darkQuery?.addEventListener('change', listener);
      lightQuery?.addEventListener('change', listener);

      // Clean up listeners
      this.destroyRef.onDestroy(() => {
        darkQuery?.removeEventListener('change', listener);
        lightQuery?.removeEventListener('change', listener);
      });
    }
  }

  /**
   * Gets the current color scheme synchronously.
   * Initializes detection if not already done.
   */
  getCurrentColorScheme(): ColorScheme {
    return this.colorScheme();
  }
}

/**
 * Standalone function version for use without dependency injection
 */
export function usePrefersColorScheme(): {
  colorScheme: () => ColorScheme;
  cleanup: () => void;
} {
  const preferredColorScheme = signal<ColorScheme>('no-preference');
  let cleanupFunctions: (() => void)[] = [];

  // Only run in browser environment
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return {
      colorScheme: () => 'no-preference',
      cleanup: () => {
        // No cleanup needed when not in browser environment
      }
    };
  }

  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const lightQuery = window.matchMedia('(prefers-color-scheme: light)');

  // Set initial value
  const getColorScheme = (): ColorScheme => {
    const isDark = darkQuery?.matches;
    const isLight = lightQuery?.matches;
    return isDark ? 'dark' : isLight ? 'light' : 'no-preference';
  };

  preferredColorScheme.set(getColorScheme());

  // Set up listeners
  if (typeof darkQuery?.addEventListener === 'function') {
    const darkListener = (event: MediaQueryListEvent) => {
      if (event.matches) preferredColorScheme.set('dark');
    };
    const lightListener = (event: MediaQueryListEvent) => {
      if (event.matches) preferredColorScheme.set('light');
    };

    darkQuery.addEventListener('change', darkListener);
    lightQuery.addEventListener('change', lightListener);

    cleanupFunctions.push(
      () => darkQuery.removeEventListener('change', darkListener),
      () => lightQuery.removeEventListener('change', lightListener)
    );
  } else {
    const listener = () => preferredColorScheme.set(getColorScheme());

    darkQuery?.addEventListener('change', listener);
    lightQuery?.addEventListener('change', listener);

    cleanupFunctions.push(
      () => darkQuery?.removeEventListener('change', listener),
      () => lightQuery?.removeEventListener('change', listener)
    );
  }

  return {
    colorScheme: preferredColorScheme.asReadonly(),
    cleanup: () => {
      cleanupFunctions.forEach(cleanup => cleanup());
      cleanupFunctions = [];
    }
  };
}
