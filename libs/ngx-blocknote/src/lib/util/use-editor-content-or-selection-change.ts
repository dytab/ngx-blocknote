import { BlockNoteEditor } from '@blocknote/core';

export const useEditorContentOrSelectionChange = (
  callback: () => void,
  editor: BlockNoteEditor<any, any, any>
) => {
  editor.onChange(callback);
  editor.onSelectionChange(callback);
};
