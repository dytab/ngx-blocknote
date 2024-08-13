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
      type: 'pageBreak',
    });
  },
  key: 'pageBreak',
  group: 'Special',
  title: 'Page Break',
  subtext: 'Breaks the content',
});
