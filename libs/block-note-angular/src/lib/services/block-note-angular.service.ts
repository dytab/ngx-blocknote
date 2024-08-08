import { Injectable, signal } from '@angular/core';
import {
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
export class BlockNoteAngularService<
  BSchema extends BlockSchema = DefaultBlockSchema,
  ISchema extends InlineContentSchema = DefaultInlineContentSchema,
  SSchema extends StyleSchema = DefaultStyleSchema
> {
  editor = signal<BlockNoteEditor<BSchema, ISchema, SSchema>>(null as never);
  options = signal<BlockNoteEditorOptionsType<BSchema, ISchema, SSchema>>({});

  setEditor(editor: BlockNoteEditor<any, any, any>) {
    this.editor.set(editor);
  }

  setOptions(options: BlockNoteEditorOptionsType<any, any, any>) {
    this.options.set(options);
  }
}
