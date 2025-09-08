import {
  Injectable,
  InjectionToken,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  BlockNoteEditor,
  BlockNoteSchema,
  BlockSchema,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  InlineContentSchema,
  StyleSchema,
} from '@blocknote/core';

/**
 * Angular equivalent of React's BlockNoteContextValue
 * Represents the context data that should be available throughout the BlockNote component tree
 */
export interface BnaEditorContextValue<
  BSchema extends BlockSchema = DefaultBlockSchema,
  ISchema extends InlineContentSchema = DefaultInlineContentSchema,
  SSchema extends StyleSchema = DefaultStyleSchema,
> {
  editor?: BlockNoteEditor<BSchema, ISchema, SSchema>;
  contentEditableProps?: WritableSignal<Record<string, unknown>>;
  colorSchemePreference?: 'light' | 'dark';
}

/**
 * Injection token for BlockNote editor context
 * This allows for hierarchical injection and provides type safety
 */
export const BNA_EDITOR_CONTEXT = new InjectionToken<BnaEditorContextValue>(
  'BNA_EDITOR_CONTEXT'
);

/**
 * Angular service equivalent of React's BlockNoteContext
 * Provides editor context throughout the Angular component tree using dependency injection
 */
@Injectable({
  providedIn: 'root'
})
export class BnaEditorContextService<
  BSchema extends BlockSchema = DefaultBlockSchema,
  ISchema extends InlineContentSchema = DefaultInlineContentSchema,
  SSchema extends StyleSchema = DefaultStyleSchema,
> {
  private _editor = signal<BlockNoteEditor<BSchema, ISchema, SSchema> | undefined>(undefined);
  private _contentEditableProps = signal<Record<string, unknown>>({});
  private _colorSchemePreference = signal<'light' | 'dark' | undefined>(undefined);

  /**
   * Get the current editor instance
   */
  get editor() {
    return this._editor.asReadonly();
  }

  /**
   * Get the current contentEditable props
   */
  get contentEditableProps() {
    return this._contentEditableProps;
  }

  /**
   * Get the current color scheme preference
   */
  get colorSchemePreference() {
    return this._colorSchemePreference.asReadonly();
  }

  /**
   * Set the editor instance
   */
  setEditor(editor: BlockNoteEditor<BSchema, ISchema, SSchema> | undefined) {
    this._editor.set(editor);
  }

  /**
   * Update contentEditable props
   */
  setContentEditableProps(props: Record<string, unknown>) {
    this._contentEditableProps.set(props);
  }

  /**
   * Update contentEditable props partially
   */
  updateContentEditableProps(props: Partial<Record<string, unknown>>) {
    this._contentEditableProps.update(current => ({ ...current, ...props }));
  }

  /**
   * Set color scheme preference
   */
  setColorSchemePreference(preference: 'light' | 'dark' | undefined) {
    this._colorSchemePreference.set(preference);
  }

  /**
   * Get the context value object (similar to React Context value)
   */
  getContextValue(): BnaEditorContextValue<BSchema, ISchema, SSchema> {
    return {
      editor: this._editor(),
      contentEditableProps: this._contentEditableProps,
      colorSchemePreference: this._colorSchemePreference(),
    };
  }
}

/**
 * Factory function to create a typed editor context service
 * This helps with type inference when using custom schemas
 */
export function createBnaEditorContextService<
  BSchema extends BlockSchema = DefaultBlockSchema,
  ISchema extends InlineContentSchema = DefaultInlineContentSchema,
  SSchema extends StyleSchema = DefaultStyleSchema,
>() {
  return new BnaEditorContextService<BSchema, ISchema, SSchema>();
}

/**
 * Angular equivalent of React's useBlockNoteContext hook
 * Injects the editor context service
 */
export function useBnaEditorContext<
  BSchema extends BlockSchema = DefaultBlockSchema,
  ISchema extends InlineContentSchema = DefaultInlineContentSchema,
  SSchema extends StyleSchema = DefaultStyleSchema,
>(
  _schema?: BlockNoteSchema<BSchema, ISchema, SSchema>,
): BnaEditorContextService<BSchema, ISchema, SSchema> | null {
  try {
    return inject(BnaEditorContextService);
  } catch {
    // Return null if not provided (similar to React's useContext returning undefined)
    return null;
  }
}

/**
 * Utility function to inject editor context with error handling
 * Throws an error if context is not available (useful for required contexts)
 */
export function requireBnaEditorContext<
  BSchema extends BlockSchema = DefaultBlockSchema,
  ISchema extends InlineContentSchema = DefaultInlineContentSchema,
  SSchema extends StyleSchema = DefaultStyleSchema,
>(
  _schema?: BlockNoteSchema<BSchema, ISchema, SSchema>,
): BnaEditorContextService<BSchema, ISchema, SSchema> {
  const context = useBnaEditorContext(_schema);
  if (!context) {
    throw new Error(
      'BnaEditorContextService not found. Make sure to provide BnaEditorContextService in your component or module.'
    );
  }
  return context;
}

/**
 * Convenience function to get just the editor instance from context
 * Returns undefined if no context or no editor is available
 */
export function useBnaEditor<
  BSchema extends BlockSchema = DefaultBlockSchema,
  ISchema extends InlineContentSchema = DefaultInlineContentSchema,
  SSchema extends StyleSchema = DefaultStyleSchema,
>(
  _schema?: BlockNoteSchema<BSchema, ISchema, SSchema>,
): BlockNoteEditor<BSchema, ISchema, SSchema> | undefined {
  const context = useBnaEditorContext(_schema);
  return context?.editor();
}

/**
 * Convenience function to require editor from context
 * Throws an error if no editor is available
 */
export function requireBnaEditor<
  BSchema extends BlockSchema = DefaultBlockSchema,
  ISchema extends InlineContentSchema = DefaultInlineContentSchema,
  SSchema extends StyleSchema = DefaultStyleSchema,
>(
  _schema?: BlockNoteSchema<BSchema, ISchema, SSchema>,
): BlockNoteEditor<BSchema, ISchema, SSchema> {
  const editor = useBnaEditor(_schema);
  if (!editor) {
    throw new Error(
      'BlockNote editor not found in context. Make sure the editor is properly initialized.'
    );
  }
  return editor;
}
