import { DestroyRef, Injectable, effect, inject } from '@angular/core';
import { BlockNoteEditor } from '@blocknote/core';
import { NgxBlocknoteService } from '../ngx-blocknote.service';

/**
 * Angular equivalent of React's useEditorChange hook.
 * Sets up a listener for editor content changes.
 */
@Injectable({
  providedIn: 'root',
})
export class UseEditorChangeService {
  private destroyRef = inject(DestroyRef);

  /**
   * Sets up an onChange listener on the editor.
   * The listener will be automatically cleaned up when the component/service is destroyed.
   *
   * @param callback - Function to call when editor content changes
   * @param editor - Optional editor instance (uses NgxBlocknoteService if not provided)
   */
  setupEditorChangeListener(
    callback: Parameters<BlockNoteEditor<any, any, any>['onChange']>[0],
    editor?: BlockNoteEditor<any, any, any>,
  ) {
    if (!editor) {
      const ngxBlocknoteService = inject(NgxBlocknoteService);
      editor = ngxBlocknoteService.editor();
    }

    if (!editor) {
      console.warn('Editor not available for change listener');
      return () => {
        /* no-op */
      }; // Return no-op function
    }

    // Set up the onChange listener
    const unsubscribe = editor.onChange(callback);

    // Clean up when component/service is destroyed
    this.destroyRef.onDestroy(() => {
      if (unsubscribe) {
        unsubscribe();
      }
    });

    return unsubscribe;
  }

  /**
   * Creates an effect that automatically sets up and tears down the onChange listener
   * when the editor or callback changes.
   *
   * @param callbackFactory - Function that returns the callback to use
   * @param editorFactory - Function that returns the editor to use
   */
  createEditorChangeEffect(
    callbackFactory: () => Parameters<
      BlockNoteEditor<any, any, any>['onChange']
    >[0],
    editorFactory?: () => BlockNoteEditor<any, any, any> | undefined,
  ) {
    return effect(() => {
      const callback = callbackFactory();
      let editor: BlockNoteEditor<any, any, any> | undefined;

      if (editorFactory) {
        editor = editorFactory();
      } else {
        const ngxBlocknoteService = inject(NgxBlocknoteService);
        editor = ngxBlocknoteService.editor();
      }

      if (!editor) {
        console.warn('Editor not available for change effect');
        return () => {
          /* no-op */
        };
      }

      // Set up the onChange listener
      const unsubscribe = editor.onChange(callback);

      // Clean up when effect re-runs or component is destroyed
      this.destroyRef.onDestroy(() => {
        if (unsubscribe) {
          unsubscribe();
        }
      });

      return unsubscribe;
    });
  }
}

/**
 * Standalone function version for use without dependency injection
 */
export function useEditorChange(
  callback: Parameters<BlockNoteEditor<any, any, any>['onChange']>[0],
  editor: BlockNoteEditor<any, any, any>,
): () => void {
  if (!editor) {
    throw new Error("'editor' is required as a function argument");
  }

  const unsubscribe = editor.onChange(callback);
  return (
    unsubscribe ||
    (() => {
      /* no-op */
    })
  );
}
