import { Injectable, signal, effect, DestroyRef, inject } from '@angular/core';
import {
  Block,
  BlockNoteEditor,
  BlockSchema,
  InlineContentSchema,
  StyleSchema,
} from '@blocknote/core';
import { NgxBlocknoteService } from '../ngx-blocknote.service';

/**
 * Angular equivalent of React's useSelectedBlocks hook.
 * Provides reactive access to the currently selected blocks in the editor.
 */
@Injectable({
  providedIn: 'root'
})
export class UseSelectedBlocksService {
  private destroyRef = inject(DestroyRef);

  /**
   * Creates a signal that tracks the currently selected blocks in the editor.
   * Updates automatically when editor content or selection changes.
   * Defaults to the current text cursor position block if no selection exists.
   */
  createSelectedBlocksSignal<
    BSchema extends BlockSchema,
    ISchema extends InlineContentSchema,
    SSchema extends StyleSchema,
  >(editor?: BlockNoteEditor<BSchema, ISchema, SSchema>) {
    if (!editor) {
      const ngxBlocknoteService = inject(NgxBlocknoteService);
      editor = ngxBlocknoteService.editor() as BlockNoteEditor<BSchema, ISchema, SSchema>;
    }

    if (!editor) {
      throw new Error(
        "'editor' is required, either from NgxBlocknoteService or as a function argument"
      );
    }

    // Helper function to get current selected blocks
    const getSelectedBlocks = (): Block<BSchema, ISchema, SSchema>[] => {
      const selection = editor!.getSelection();
      return selection?.blocks || [editor!.getTextCursorPosition().block];
    };

    // Create signal to track selected blocks
    const selectedBlocks = signal<Block<BSchema, ISchema, SSchema>[]>(getSelectedBlocks());

    // Update function
    const updateSelectedBlocks = () => {
      selectedBlocks.set(getSelectedBlocks());
    };

    // Set up listeners for editor changes
    effect(() => {
      if (!editor) return;

      // Listen for content changes
      const contentChangeUnsubscribe = editor.onChange(updateSelectedBlocks);

      // Listen for selection changes
      const selectionChangeUnsubscribe = editor.onSelectionChange(updateSelectedBlocks);

      // Cleanup on destroy
      this.destroyRef.onDestroy(() => {
        contentChangeUnsubscribe();
        selectionChangeUnsubscribe();
      });
    });

    return selectedBlocks.asReadonly();
  }
}

/**
 * Standalone function version for use without dependency injection
 */
export function createSelectedBlocksSignal<
  BSchema extends BlockSchema,
  ISchema extends InlineContentSchema,
  SSchema extends StyleSchema,
>(editor: BlockNoteEditor<BSchema, ISchema, SSchema>) {
  // Helper function to get current selected blocks
  const getSelectedBlocks = (): Block<BSchema, ISchema, SSchema>[] => {
    const selection = editor.getSelection();
    return selection?.blocks || [editor.getTextCursorPosition().block];
  };

  const selectedBlocks = signal<Block<BSchema, ISchema, SSchema>[]>(getSelectedBlocks());

  const updateSelectedBlocks = () => {
    selectedBlocks.set(getSelectedBlocks());
  };

  // Set up listeners
  const contentChangeUnsubscribe = editor.onChange(updateSelectedBlocks);
  const selectionChangeUnsubscribe = editor.onSelectionChange(updateSelectedBlocks);

  // Return both the signal and cleanup function
  return {
    selectedBlocks: selectedBlocks.asReadonly(),
    cleanup: () => {
      contentChangeUnsubscribe();
      selectionChangeUnsubscribe();
    }
  };
}
