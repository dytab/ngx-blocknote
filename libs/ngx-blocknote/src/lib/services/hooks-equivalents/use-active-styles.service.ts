import { Injectable, signal, effect, DestroyRef, inject } from '@angular/core';
import { BlockNoteEditor, StyleSchema } from '@blocknote/core';
import { NgxBlocknoteService } from '../ngx-blocknote.service';

/**
 * Angular equivalent of React's useActiveStyles hook.
 * Provides reactive access to the currently active styles in the editor.
 */
@Injectable({
  providedIn: 'root'
})
export class UseActiveStylesService {
  private destroyRef = inject(DestroyRef);

  /**
   * Creates a signal that tracks the currently active styles in the editor.
   * Updates automatically when editor content or selection changes.
   */
  createActiveStylesSignal<T extends StyleSchema>(
    editor?: BlockNoteEditor<any, any, T>
  ) {
    if (!editor) {
      const ngxBlocknoteService = inject(NgxBlocknoteService);
      editor = ngxBlocknoteService.editor() as BlockNoteEditor<any, any, T>;
    }

    if (!editor) {
      throw new Error(
        "'editor' is required, either from NgxBlocknoteService or as a function argument"
      );
    }

    // Create signal to track active styles
    const activeStyles = signal(editor.getActiveStyles());

    // Update function
    const updateStyles = () => {
      activeStyles.set(editor!.getActiveStyles());
    };

    // Set up listeners for editor changes
    effect(() => {
      if (!editor) return;

      // Listen for content changes
      const contentChangeUnsubscribe = editor.onChange(updateStyles);

      // Listen for selection changes
      const selectionChangeUnsubscribe = editor.onSelectionChange(updateStyles);

      // Cleanup on destroy
      this.destroyRef.onDestroy(() => {
        contentChangeUnsubscribe();
        selectionChangeUnsubscribe();
      });
    });

    return activeStyles.asReadonly();
  }
}

/**
 * Standalone function version for use without dependency injection
 */
export function createActiveStylesSignal<T extends StyleSchema>(
  editor: BlockNoteEditor<any, any, T>
) {
  const activeStyles = signal(editor.getActiveStyles());

  const updateStyles = () => {
    activeStyles.set(editor.getActiveStyles());
  };

  // Set up listeners
  const contentChangeUnsubscribe = editor.onChange(updateStyles);
  const selectionChangeUnsubscribe = editor.onSelectionChange(updateStyles);

  // Return both the signal and cleanup function
  return {
    activeStyles: activeStyles.asReadonly(),
    cleanup: () => {
      contentChangeUnsubscribe();
      selectionChangeUnsubscribe();
    }
  };
}
