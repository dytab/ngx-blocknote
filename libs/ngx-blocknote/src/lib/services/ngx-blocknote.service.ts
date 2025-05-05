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

@Injectable()
export class NgxBlocknoteService<
  BSchema extends BlockSchema = DefaultBlockSchema,
  ISchema extends InlineContentSchema = DefaultInlineContentSchema,
  SSchema extends StyleSchema = DefaultStyleSchema,
> {
  editor = signal<BlockNoteEditor<BSchema, ISchema, SSchema>>(null as never);
  options = signal<BlockNoteEditorOptionsType<BSchema, ISchema, SSchema>>({});
  selectedBlocks = signal<Block<BSchema, ISchema, SSchema>[]>([]);

  setEditor(editor: BlockNoteEditor<any, any, any>) {
    this.editor.set(editor as BlockNoteEditor<BSchema, ISchema, SSchema>);
  }

  setOptions(options: BlockNoteEditorOptionsType<BSchema, ISchema, SSchema>) {
    this.options.set(options);
  }

  ///TESTING
  sideMenuFocusedBlock = signal<Block<BSchema, ISchema, SSchema> | undefined>(
    undefined,
  );
}
