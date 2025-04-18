import {
  Block,
  BlockNoteEditor,
  checkBlockIsFileBlockWithPlaceholder,
} from '@blocknote/core';

export const showFileBlock = (
  editor: BlockNoteEditor,
  fileBlock: Block | undefined,
): 'hidden' | '' => {
  return !fileBlock ||
    checkBlockIsFileBlockWithPlaceholder(fileBlock, editor) ||
    !editor.isEditable
    ? 'hidden'
    : '';
};
