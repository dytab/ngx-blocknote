import { Injectable, signal, computed, DestroyRef, inject } from '@angular/core';
import {
  BlockNoteEditor,
  BlockNoteEditorOptions,
  BlockSchema,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  InlineContentSchema,
  StyleSchema,
} from '@blocknote/core';

/**
 * Angular equivalent of React's useCreateBlockNote hook.
 * Main service for creating and managing a BlockNote editor in Angular.
 */
@Injectable({
  providedIn: 'root'
})
export class UseCreateBlockNoteService {
  private destroyRef = inject(DestroyRef);

  /**
   * Creates a BlockNote editor with the provided options.
   * Uses Angular signals for reactive state management instead of React's useMemo.
   *
   * @param options - Editor configuration options
   * @returns Signal containing the created editor instance
   */
  createEditor<
    BSchema extends BlockSchema = DefaultBlockSchema,
    ISchema extends InlineContentSchema = DefaultInlineContentSchema,
    SSchema extends StyleSchema = DefaultStyleSchema,
  >(
    options: Partial<BlockNoteEditorOptions<BSchema, ISchema, SSchema>> = {}
  ) {
    // Create editor instance
    const editor = BlockNoteEditor.create<BSchema, ISchema, SSchema>(options);

    // For testing/dev purposes (similar to React version)
    if (typeof window !== 'undefined') {
      (window as any).ProseMirror = editor._tiptapEditor;
    }

    // Clean up editor on component/service destroy
    this.destroyRef.onDestroy(() => {
      editor.destroy();
    });

    // Return as signal for reactive access
    const editorSignal = signal(editor);
    return editorSignal.asReadonly();
  }

  /**
   * Creates a computed editor signal that recreates the editor when dependencies change.
   * This mimics React's dependency array behavior.
   *
   * @param optionsFactory - Function that returns editor options
   * @param dependencies - Array of dependency signals to watch
   * @returns Computed signal that recreates editor when dependencies change
   */
  createEditorComputed<
    BSchema extends BlockSchema = DefaultBlockSchema,
    ISchema extends InlineContentSchema = DefaultInlineContentSchema,
    SSchema extends StyleSchema = DefaultStyleSchema,
  >(
    optionsFactory: () => Partial<BlockNoteEditorOptions<BSchema, ISchema, SSchema>>,
    dependencies: (() => any)[] = []
  ) {
    return computed(() => {
      // Watch all dependencies
      dependencies.forEach(dep => dep());

      // Create new editor with current options
      const options = optionsFactory();
      const editor = BlockNoteEditor.create<BSchema, ISchema, SSchema>(options);

      // For testing/dev purposes
      if (typeof window !== 'undefined') {
        (window as any).ProseMirror = editor._tiptapEditor;
      }

      return editor;
    });
  }
}

/**
 * Standalone function version for use without dependency injection
 * Similar to React's useCreateBlockNote but returns editor directly
 */
export function createBlockNoteEditor<
  BSchema extends BlockSchema = DefaultBlockSchema,
  ISchema extends InlineContentSchema = DefaultInlineContentSchema,
  SSchema extends StyleSchema = DefaultStyleSchema,
>(
  options: Partial<BlockNoteEditorOptions<BSchema, ISchema, SSchema>> = {}
): BlockNoteEditor<BSchema, ISchema, SSchema> {
  const editor = BlockNoteEditor.create<BSchema, ISchema, SSchema>(options);

  // For testing/dev purposes
  if (typeof window !== 'undefined') {
    (window as any).ProseMirror = editor._tiptapEditor;
  }

  return editor;
}

/**
 * @deprecated use UseCreateBlockNoteService instead
 */
export const UseBlockNoteService = UseCreateBlockNoteService;
