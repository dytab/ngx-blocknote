import {
  Block,
  BlockNoteEditor,
  checkBlockIsFileBlockWithPlaceholder,
} from '@blocknote/core';

export const showFileBlock = (
  editor: BlockNoteEditor<any, any, any>,
  fileBlock: Block<any, any, any> | undefined,
): 'hidden' | '' => {
  return !fileBlock ||
    checkBlockIsFileBlockWithPlaceholder(
      //TODO: remove cast
      fileBlock as Block<any, any, any>,
      editor,
    ) ||
    !editor.isEditable
    ? 'hidden'
    : '';
};
