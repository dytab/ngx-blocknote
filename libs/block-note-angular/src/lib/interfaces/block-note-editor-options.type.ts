import {
  BlockNoteEditor,
  BlockNoteSchema,
  BlockSchema,
  InlineContentSchema,
  StyleSchema,
} from '@blocknote/core';
import { SuggestionItem } from './suggestion-item.type';

export interface BlockNoteEditorOptionsType<
  BSchema extends BlockSchema = any,
  ISchema extends InlineContentSchema = any,
  SSchema extends StyleSchema = any
> {
  schema?: BlockNoteSchema<BSchema, ISchema, SSchema>;
  getSuggestionItems?: (editor: BlockNoteEditor<BSchema, ISchema, SSchema>) => SuggestionItem[];
  uploadFile?: (file: File) => Promise<string | Record<string, any>>;
}
