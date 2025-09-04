import {
  BlockNoteEditor,
  BlockSchema,
  getDefaultEmojiPickerItems,
  InlineContentSchema,
  StyleSchema,
} from '@blocknote/core';
import { DefaultAngularGridSuggestionItem } from './types';

export async function getDefaultAngularEmojiPickerItems<
  BSchema extends BlockSchema,
  I extends InlineContentSchema,
  S extends StyleSchema,
>(
  editor: BlockNoteEditor<BSchema, I, S>,
  query: string,
): Promise<DefaultAngularGridSuggestionItem[]> {
  return (await getDefaultEmojiPickerItems(editor, query)).map(
    ({ id, onItemClick }) => ({
      id,
      onItemClick,
      icon: id, // Emoji id is used directly as the icon (emoji character)
    }),
  );
}
