import { BlockNoteEditor } from '@blocknote/core';

export const useEditorContentOrSelectionChange = (
  callback: () => void,
  editor: BlockNoteEditor<any, any, any>,
) => {
  const cleanupOnChange = editor.onChange(callback);
  const cleanupOnSelectionChange = editor.onSelectionChange(callback);
  return [cleanupOnChange, cleanupOnSelectionChange];
};
