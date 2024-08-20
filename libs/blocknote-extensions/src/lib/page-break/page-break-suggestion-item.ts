import {
  BlockNoteEditor,
  insertOrUpdateBlock,
} from '@blocknote/core';

export const getPageBreakSuggestionItem = (
  editor: BlockNoteEditor<any, any, any>
) => ({
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
