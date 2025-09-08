import { Injectable, effect, DestroyRef, inject } from '@angular/core';
import { BlockNoteEditor } from '@blocknote/core';
import { NgxBlocknoteService } from '../ngx-blocknote.service';

/**
 * Angular equivalent of React's useEditorSelectionChange hook.
 * Sets up a listener for editor selection changes.
 */
@Injectable({
  providedIn: 'root'
})
export class UseEditorSelectionChangeService {
  private destroyRef = inject(DestroyRef);

  /**
   * Sets up an onSelectionChange listener on the editor.
   * The listener will be automatically cleaned up when the component/service is destroyed.
   *
   * @param callback - Function to call when editor selection changes
   * @param editor - Optional editor instance (uses NgxBlocknoteService if not provided)
   * @param includeSelectionChangedByRemote - Whether to include remote selection changes
   */
  setupEditorSelectionChangeListener(
    callback: () => void,
    editor?: BlockNoteEditor<any, any, any>,
    includeSelectionChangedByRemote?: boolean
  ) {
    if (!editor) {
      const ngxBlocknoteService = inject(NgxBlocknoteService);
      editor = ngxBlocknoteService.editor();
    }

    if (!editor) {
      throw new Error(
        "'editor' is required, either from NgxBlocknoteService or as a function argument"
      );
    }

    // Set up the onSelectionChange listener
    const unsubscribe = editor.onSelectionChange(callback, includeSelectionChangedByRemote);

    // Clean up when component/service is destroyed
    this.destroyRef.onDestroy(() => {
      unsubscribe();
    });

    return unsubscribe;
  }

  /**
   * Creates an effect that automatically sets up and tears down the onSelectionChange listener
   * when the editor, callback, or includeRemote parameter changes.
   *
   * @param callbackFactory - Function that returns the callback to use
   * @param editorFactory - Function that returns the editor to use
   * @param includeRemoteFactory - Function that returns whether to include remote changes
   */
  createEditorSelectionChangeEffect(
    callbackFactory: () => () => void,
    editorFactory?: () => BlockNoteEditor<any, any, any> | undefined,
    includeRemoteFactory?: () => boolean | undefined
  ) {
    return effect(() => {
      const callback = callbackFactory();
      const includeRemote = includeRemoteFactory?.();
      let editor: BlockNoteEditor<any, any, any> | undefined;

      if (editorFactory) {
        editor = editorFactory();
      } else {
        const ngxBlocknoteService = inject(NgxBlocknoteService);
        editor = ngxBlocknoteService.editor();
      }

      if (!editor) {
        throw new Error(
          "'editor' is required, either from NgxBlocknoteService or as a function argument"
        );
      }

      // Set up the onSelectionChange listener
      const unsubscribe = editor.onSelectionChange(callback, includeRemote);

      // Clean up when effect re-runs or component is destroyed
      this.destroyRef.onDestroy(() => {
        unsubscribe();
      });

      return unsubscribe;
    });
  }
}

/**
 * Standalone function version for use without dependency injection
 */
export function useEditorSelectionChange(
  callback: () => void,
  editor: BlockNoteEditor<any, any, any>,
  includeSelectionChangedByRemote?: boolean
): () => void {
  if (!editor) {
    throw new Error("'editor' is required as a function argument");
  }

  return editor.onSelectionChange(callback, includeSelectionChangedByRemote);
}
