import { Injectable, inject } from '@angular/core';
import { BlockNoteEditor } from '@blocknote/core';
import { UseEditorChangeService } from './use-editor-change.service';
import { UseEditorSelectionChangeService } from './use-editor-selection-change.service';

/**
 * Angular equivalent of React's useEditorContentOrSelectionChange hook.
 * Sets up listeners for both editor content changes and selection changes.
 * This is a composite service that uses both UseEditorChangeService and UseEditorSelectionChangeService.
 */
@Injectable({
  providedIn: 'root'
})
export class UseEditorContentOrSelectionChangeService {
  private useEditorChangeService = inject(UseEditorChangeService);
  private useEditorSelectionChangeService = inject(UseEditorSelectionChangeService);

  /**
   * Sets up both onChange and onSelectionChange listeners on the editor.
   * Both listeners will be automatically cleaned up when the component/service is destroyed.
   *
   * @param callback - Function to call when editor content or selection changes
   * @param editor - Optional editor instance (uses NgxBlocknoteService if not provided)
   * @param includeSelectionChangedByRemote - Whether to include remote selection changes
   */
  setupEditorContentOrSelectionChangeListener(
    callback: () => void,
    editor?: BlockNoteEditor<any, any, any>,
    includeSelectionChangedByRemote?: boolean
  ) {
    // Set up content change listener
    const contentUnsubscribe = this.useEditorChangeService.setupEditorChangeListener(
      callback,
      editor
    );

    // Set up selection change listener
    const selectionUnsubscribe = this.useEditorSelectionChangeService.setupEditorSelectionChangeListener(
      callback,
      editor,
      includeSelectionChangedByRemote
    );

    // Return combined cleanup function
    return () => {
      contentUnsubscribe();
      selectionUnsubscribe();
    };
  }

  /**
   * Creates effects that automatically set up and tear down both onChange and onSelectionChange listeners
   * when the editor, callback, or includeRemote parameter changes.
   *
   * @param callbackFactory - Function that returns the callback to use
   * @param editorFactory - Function that returns the editor to use
   * @param includeRemoteFactory - Function that returns whether to include remote changes
   */
  createEditorContentOrSelectionChangeEffect(
    callbackFactory: () => () => void,
    editorFactory?: () => BlockNoteEditor<any, any, any> | undefined,
    includeRemoteFactory?: () => boolean | undefined
  ) {
    // Create content change effect
    const contentEffect = this.useEditorChangeService.createEditorChangeEffect(
      callbackFactory,
      editorFactory
    );

    // Create selection change effect
    const selectionEffect = this.useEditorSelectionChangeService.createEditorSelectionChangeEffect(
      callbackFactory,
      editorFactory,
      includeRemoteFactory
    );

    return {
      contentEffect,
      selectionEffect
    };
  }
}

/**
 * Standalone function version for use without dependency injection
 */
export function useEditorContentOrSelectionChange(
  callback: () => void,
  editor: BlockNoteEditor<any, any, any>,
  includeSelectionChangedByRemote?: boolean
): () => void {
  if (!editor) {
    throw new Error("'editor' is required as a function argument");
  }

  // Set up both listeners
  const contentUnsubscribe = editor.onChange(callback);
  const selectionUnsubscribe = editor.onSelectionChange(callback, includeSelectionChangedByRemote);

  // Return combined cleanup function
  return () => {
    contentUnsubscribe();
    selectionUnsubscribe();
  };
}
