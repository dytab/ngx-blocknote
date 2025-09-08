import {
  BlockNoteEditor,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  InlineContentSchema,
  StyleSchema,
} from '@blocknote/core';

export interface BnaExtendButtonProps<
  I extends InlineContentSchema = DefaultInlineContentSchema,
  S extends StyleSchema = DefaultStyleSchema,
> {
  editor: BlockNoteEditor<
    {
      table: DefaultBlockSchema['table'];
    },
    I,
    S
  >;
  onMouseDown: () => void;
  onMouseUp: () => void;
  orientation: 'addOrRemoveRows' | 'addOrRemoveColumns';
  block: DefaultBlockSchema['table'];
}
