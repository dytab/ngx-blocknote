import {
  Block,
  BlockNoteEditor,
  checkBlockIsFileBlockWithPlaceholder,
} from '@blocknote/core';

export const showFileBlock = (
  editor: BlockNoteEditor,
  fileBlock: Block<any, any, any> | undefined,
): 'hidden' | '' => {
  return !fileBlock ||
    checkBlockIsFileBlockWithPlaceholder(fileBlock, editor) ||
    !editor.isEditable
    ? 'hidden'
    : '';
};
