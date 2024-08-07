import {
  BlockNoteEditor,
  BlockNoteSchema,
  BlockSchema,
  DefaultSuggestionItem,
  InlineContentSchema,
  StyleSchema,
} from '@blocknote/core';

export interface BlockNoteEditorOptionsType<
  BSchema extends BlockSchema = any,
  ISchema extends InlineContentSchema = any,
  SSchema extends StyleSchema = any
> {
  schema?: BlockNoteSchema<BSchema, ISchema, SSchema>;
  inputSlashMenuItems?: Array<
    (
      editor: BlockNoteEditor<BSchema, ISchema, SSchema>
    ) => Omit<DefaultSuggestionItem, 'key'>
  >;
  uploadFile?: (file: File) => Promise<string | Record<string, any>>;
}
