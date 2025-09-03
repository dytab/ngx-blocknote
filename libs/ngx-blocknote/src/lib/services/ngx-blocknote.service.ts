import { Injectable, signal } from '@angular/core';
import {
  Block,
  BlockNoteEditor,
  BlockSchema,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  InlineContentSchema,
  StyleSchema,
} from '@blocknote/core';
import { BlockNoteEditorOptionsType } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class NgxBlocknoteService<
  BSchema extends BlockSchema = DefaultBlockSchema,
  ISchema extends InlineContentSchema = DefaultInlineContentSchema,
  SSchema extends StyleSchema = DefaultStyleSchema,
> {
  editor = signal<BlockNoteEditor<BSchema, ISchema, SSchema> | null>(null);
  options = signal<BlockNoteEditorOptionsType<BSchema, ISchema, SSchema>>({});
  selectedBlocks = signal<Block<BSchema, ISchema, SSchema>[]>([]);

  setEditor(editor: BlockNoteEditor<BSchema, ISchema, SSchema>) {
    this.editor.set(editor);
  }

  setOptions(options: BlockNoteEditorOptionsType<BSchema, ISchema, SSchema>) {
    this.options.set(options);
  }

  ///TESTING
  sideMenuFocusedBlock = signal<Block<BSchema, ISchema, SSchema> | undefined>(
    undefined,
  );
}
