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

@Injectable()
export class BlockNoteAngularService<
  BSchema extends BlockSchema = DefaultBlockSchema,
  ISchema extends InlineContentSchema = DefaultInlineContentSchema,
  SSchema extends StyleSchema = DefaultStyleSchema
> {
  editor = signal<BlockNoteEditor | undefined>(undefined);

  setEditor(editor: BlockNoteEditor<any, any, any>) {
    this.editor.set(editor);
  }
}
