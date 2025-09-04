import { Injectable, signal, effect, DestroyRef, inject } from '@angular/core';

/**
 * Angular equivalent of React's useUIPluginState hook.
 * Generic service for managing UI plugin state using Angular signals.
 */
@Injectable({
  providedIn: 'root'
})
export class UseUIPluginStateService {
  private destroyRef = inject(DestroyRef);

  /**
   * Creates a signal that manages state for a UI plugin.
   * The onUpdate function should set up a callback that will be called with state updates.
   *
   * @param onUpdate - Function that sets up the state update callback
   * @returns Signal containing the current plugin state
   */
  createUIPluginStateSignal<State>(
    onUpdate: (callback: (state: State) => void) => void
  ) {
    const state = signal<State | undefined>(undefined);

    // Set up the state update listener
    const unsubscribe = onUpdate((newState) => {
      // Create a copy of the state (similar to React's {...state} spread)
      state.set({ ...newState });
    });

    // Clean up when component/service is destroyed
    this.destroyRef.onDestroy(() => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    });

    return state.asReadonly();
  }

  /**
   * Creates an effect-based UI plugin state signal that automatically updates
   * when the onUpdate function changes.
   *
   * @param onUpdateFactory - Function that returns the onUpdate function
   * @returns Signal containing the current plugin state
   */
  createUIPluginStateEffect<State>(
    onUpdateFactory: () => (callback: (state: State) => void) => void
  ) {
    const state = signal<State | undefined>(undefined);

    const stateEffect = effect(() => {
      const onUpdate = onUpdateFactory();

      // Set up the state update listener
      const unsubscribe = onUpdate((newState) => {
        // Create a copy of the state (similar to React's {...state} spread)
        state.set({ ...newState });
      });

      // Clean up when effect re-runs or component is destroyed
      this.destroyRef.onDestroy(() => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      });

      return unsubscribe;
    });

    return state.asReadonly();
  }
}

/**
 * Standalone function version for use without dependency injection
 */
export function useUIPluginState<State>(
  onUpdate: (callback: (state: State) => void) => void
): {
  state: () => State | undefined;
  cleanup: () => void;
} {
  const state = signal<State | undefined>(undefined);

  // Set up the state update listener
  const unsubscribe = onUpdate((newState) => {
    // Create a copy of the state (similar to React's {...state} spread)
    state.set({ ...newState });
  });

  return {
    state: state.asReadonly(),
    cleanup: () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    }
  };
}
