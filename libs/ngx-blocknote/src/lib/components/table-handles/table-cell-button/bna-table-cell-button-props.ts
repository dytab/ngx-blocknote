import {
  BlockNoteEditor,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  InlineContentSchema,
  StyleSchema,
  TableHandlesState,
} from '@blocknote/core';
import { Type } from '@angular/core';

export interface BnaTableCellMenuProps<
  I extends InlineContentSchema = DefaultInlineContentSchema,
  S extends StyleSchema = DefaultStyleSchema,
> {
  block: DefaultBlockSchema['table'];
  rowIndex: number;
  colIndex: number;
}

export interface BnaTableCellButtonProps<
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
  rowIndex: number;
  colIndex: number;
  menuContainer: HTMLDivElement;
  tableCellMenu?: Type<any>; // Angular component type
  block: DefaultBlockSchema['table'];
  freezeHandles: () => void;
  unfreezeHandles: () => void;
}
