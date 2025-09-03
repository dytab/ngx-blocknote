import { Injectable, signal, DestroyRef, inject } from '@angular/core';
import { Editor } from '@tiptap/core';

/**
 * Angular equivalent of React's useEditorForceUpdate hook.
 * In React, this hook forces component re-renders when editor transactions occur.
 * In Angular, we use signals to achieve reactive updates instead of forcing re-renders.
 */
@Injectable({
  providedIn: 'root'
})
export class UseEditorForceUpdateService {
  private destroyRef = inject(DestroyRef);

  /**
   * Creates a signal that updates whenever the editor has a transaction.
   * This mimics React's force update behavior but uses Angular's reactive system.
   *
   * @param editor - The TipTap editor instance to listen to
   * @returns Signal that increments on each transaction (for reactivity)
   */
  createForceUpdateSignal(editor: Editor) {
    const updateCounter = signal(0);

    const callback = () => {
      // Use requestAnimationFrame like the React version
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Increment counter to trigger reactive updates
          updateCounter.update(count => count + 1);
        });
      });
    };

    // Listen for transaction events
    editor.on('transaction', callback);

    // Clean up listener when component/service is destroyed
    this.destroyRef.onDestroy(() => {
      editor.off('transaction', callback);
    });

    return updateCounter.asReadonly();
  }

  /**
   * Sets up a transaction listener that calls a callback on each editor transaction.
   * This is useful when you need to perform side effects on editor changes.
   *
   * @param editor - The TipTap editor instance to listen to
   * @param callback - Function to call on each transaction
   * @returns Cleanup function to remove the listener
   */
  setupTransactionListener(
    editor: Editor,
    callback: () => void
  ) {
    const wrappedCallback = () => {
      // Use requestAnimationFrame like the React version
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          callback();
        });
      });
    };

    // Listen for transaction events
    editor.on('transaction', wrappedCallback);

    // Clean up listener when component/service is destroyed
    this.destroyRef.onDestroy(() => {
      editor.off('transaction', wrappedCallback);
    });

    // Return cleanup function for manual cleanup if needed
    return () => {
      editor.off('transaction', wrappedCallback);
    };
  }

  /**
   * Creates a reactive signal that tracks editor transaction count.
   * Useful for components that need to react to any editor changes.
   *
   * @param editorFactory - Function that returns the editor instance
   * @returns Signal containing the transaction count
   */
  createReactiveTransactionCounter(
    editorFactory: () => Editor | undefined
  ) {
    const transactionCount = signal(0);

    const setupListener = () => {
      const editor = editorFactory();
      if (!editor) return;

      const callback = () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            transactionCount.update(count => count + 1);
          });
        });
      };

      editor.on('transaction', callback);

      return () => {
        editor.off('transaction', callback);
      };
    };

    const cleanup = setupListener();

    // Clean up when component/service is destroyed
    this.destroyRef.onDestroy(() => {
      if (cleanup) {
        cleanup();
      }
    });

    return transactionCount.asReadonly();
  }
}

/**
 * Standalone function version for use without dependency injection
 */
export function useEditorForceUpdate(editor: Editor): {
  updateCounter: () => number;
  cleanup: () => void;
} {
  const updateCounter = signal(0);

  const callback = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        updateCounter.update(count => count + 1);
      });
    });
  };

  // Listen for transaction events
  editor.on('transaction', callback);

  return {
    updateCounter: updateCounter.asReadonly(),
    cleanup: () => {
      editor.off('transaction', callback);
    }
  };
}
