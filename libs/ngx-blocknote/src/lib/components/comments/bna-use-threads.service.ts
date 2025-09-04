import { Injectable, signal, DestroyRef, inject } from '@angular/core';
import { BlockNoteEditor } from '@blocknote/core';
import { ThreadData } from '@blocknote/core/comments';

/**
 * Angular equivalent of React's useThreads hook
 * Bridges the ThreadStore to Angular using signals for reactive updates
 */
@Injectable({
  providedIn: 'root'
})
export class BnaUseThreadsService {
  private destroyRef = inject(DestroyRef);

  /**
   * Creates a signal that tracks threads from the editor's thread store
   * @param editor - BlockNote editor instance with comments plugin
   * @returns Signal containing the threads map
   */
  createThreadsSignal(editor: BlockNoteEditor<any, any, any>) {
    const comments = editor.comments;
    if (!comments) {
      throw new Error('Comments plugin not found');
    }

    const store = comments.threadStore;
    const threadsSignal = signal<Map<string, ThreadData> | undefined>(undefined);

    // Initialize with current threads
    threadsSignal.set(store.getThreads());

    // Set up subscription for updates
    const unsubscribe = store.subscribe((threads) => {
      threadsSignal.set(threads);
    });

    // Clean up subscription when component/service is destroyed
    this.destroyRef.onDestroy(() => {
      unsubscribe();
    });

    return threadsSignal.asReadonly();
  }

  /**
   * Gets threads synchronously from the editor's thread store
   * @param editor - BlockNote editor instance with comments plugin
   * @returns Current threads map
   */
  getThreads(editor: BlockNoteEditor<any, any, any>): Map<string, ThreadData> | undefined {
    const comments = editor.comments;
    if (!comments) {
      throw new Error('Comments plugin not found');
    }

    return comments.threadStore.getThreads();
  }

  /**
   * Sets up a callback for thread updates
   * @param editor - BlockNote editor instance
   * @param callback - Function to call when threads are updated
   * @returns Cleanup function
   */
  setupThreadsListener(
    editor: BlockNoteEditor<any, any, any>,
    callback: (threads: Map<string, ThreadData> | undefined) => void
  ): () => void {
    const comments = editor.comments;
    if (!comments) {
      throw new Error('Comments plugin not found');
    }

    const store = comments.threadStore;

    // Call immediately with current state
    callback(store.getThreads());

    // Set up subscription for updates
    const unsubscribe = store.subscribe(callback);

    // Clean up subscription when component/service is destroyed
    this.destroyRef.onDestroy(() => {
      unsubscribe();
    });

    return unsubscribe;
  }
}

/**
 * Standalone function version for use without dependency injection
 * Angular equivalent of React's useThreads hook
 */
export function useThreads(editor: BlockNoteEditor<any, any, any>): {
  threads: () => Map<string, ThreadData> | undefined;
  cleanup: () => void;
} {
  const comments = editor.comments;
  if (!comments) {
    throw new Error('Comments plugin not found');
  }

  const store = comments.threadStore;
  const threadsSignal = signal<Map<string, ThreadData> | undefined>(undefined);

  // Initialize with current threads
  threadsSignal.set(store.getThreads());

  // Set up subscription for updates
  const unsubscribe = store.subscribe((threads) => {
    threadsSignal.set(threads);
  });

  return {
    threads: threadsSignal.asReadonly(),
    cleanup: unsubscribe
  };
}
