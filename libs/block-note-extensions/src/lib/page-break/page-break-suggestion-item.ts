import {
  BlockNoteEditor,
  DefaultSuggestionItem,
  insertOrUpdateBlock,
} from '@blocknote/core';

export const getPageBreakSuggestionItem = (
  editor: BlockNoteEditor<any, any, any>
): Omit<DefaultSuggestionItem, 'key'> & { key: string } => ({
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: 'page_break',
    });
  },
  key: 'page_break',
  group: 'Special',
  title: 'Page Break',
  subtext: 'Breaks the content',
});
