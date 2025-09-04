import { Injectable, signal, computed, inject } from '@angular/core';
import { BlockNoteEditor } from '@blocknote/core';
import { NgxBlocknoteService } from '../ngx-blocknote.service';
import { UseEditorSelectionChangeService } from './use-editor-selection-change.service';

/**
 * Angular equivalent of React's useEditorSelectionBoundingBox hook.
 * Tracks the bounding box of the editor's current selection.
 */
@Injectable({
  providedIn: 'root'
})
export class UseEditorSelectionBoundingBoxService {
  private useEditorSelectionChangeService = inject(UseEditorSelectionChangeService);

  /**
   * Creates a signal that tracks the editor's selection bounding box.
   * Updates automatically when the selection changes.
   *
   * @param enabled - Signal or boolean to control when tracking is active
   * @param editor - Optional editor instance (uses NgxBlocknoteService if not provided)
   * @returns Signal containing the selection bounding box or undefined
   */
  createSelectionBoundingBoxSignal(
    enabled: boolean | (() => boolean) = true,
    editor?: BlockNoteEditor<any, any, any>
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

    // Create signal for bounding box
    const boundingBox = signal<DOMRect | undefined>(undefined);

    // Function to check if enabled
    const isEnabled = typeof enabled === 'function' ? enabled : () => enabled;

    // Function to update bounding box
    const updateBoundingBox = () => {
      if (!isEnabled() || !editor) {
        boundingBox.set(undefined);
        return;
      }

      const selection = editor.getSelectionBoundingBox();
      boundingBox.set(selection);
    };

    // Set initial value
    updateBoundingBox();

    // Set up selection change listener
    this.useEditorSelectionChangeService.setupEditorSelectionChangeListener(
      updateBoundingBox,
      editor,
      true // Include remote selection changes
    );

    return boundingBox.asReadonly();
  }

  /**
   * Creates a computed selection bounding box signal that automatically updates
   * when dependencies change.
   *
   * @param enabledFactory - Function that returns whether tracking is enabled
   * @param editorFactory - Function that returns the editor to use
   * @returns Computed signal containing the selection bounding box
   */
  createSelectionBoundingBoxEffect(
    enabledFactory: () => boolean,
    editorFactory?: () => BlockNoteEditor<any, any, any> | undefined
  ) {
    return computed(() => {
      const enabled = enabledFactory();
      let editor: BlockNoteEditor<any, any, any> | undefined;

      if (editorFactory) {
        editor = editorFactory();
      } else {
        const ngxBlocknoteService = inject(NgxBlocknoteService);
        editor = ngxBlocknoteService.editor();
      }

      if (!enabled || !editor) {
        return undefined;
      }

      return editor.getSelectionBoundingBox();
    });
  }

  /**
   * Creates a selection bounding box signal with reactive enabled state.
   * The signal automatically updates when either enabled state or selection changes.
   *
   * @param enabledSignal - Signal controlling when tracking is active
   * @param editor - Optional editor instance
   * @returns Signal containing the selection bounding box
   */
  createReactiveSelectionBoundingBoxSignal(
    enabledSignal: () => boolean,
    editor?: BlockNoteEditor<any, any, any>
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

    const boundingBox = signal<DOMRect | undefined>(undefined);

    // Update function that checks enabled state
    const updateBoundingBox = () => {
      const enabled = enabledSignal();
      if (!enabled || !editor) {
        boundingBox.set(undefined);
        return;
      }

      const selection = editor.getSelectionBoundingBox();
      boundingBox.set(selection);
    };

    // Set initial value
    updateBoundingBox();

    // Set up selection change listener with reactive enabled check
    this.useEditorSelectionChangeService.createEditorSelectionChangeEffect(
      () => updateBoundingBox,
      () => editor,
      () => true // Include remote selection changes
    );

    return boundingBox.asReadonly();
  }
}

/**
 * Standalone function version for use without dependency injection
 */
export function useEditorSelectionBoundingBox(
  editor: BlockNoteEditor<any, any, any>,
  enabled = true
): {
  boundingBox: () => DOMRect | undefined;
  cleanup: () => void;
} {
  if (!editor) {
    throw new Error("'editor' is required as a function argument");
  }

  const boundingBox = signal<DOMRect | undefined>(undefined);

  const updateBoundingBox = () => {
    if (!enabled) {
      boundingBox.set(undefined);
      return;
    }

    const selection = editor.getSelectionBoundingBox();
    boundingBox.set(selection);
  };

  // Set initial value
  updateBoundingBox();

  // Set up selection change listener
  const unsubscribe = editor.onSelectionChange(updateBoundingBox, true);

  return {
    boundingBox: boundingBox.asReadonly(),
    cleanup: () => {
      unsubscribe();
    }
  };
}
