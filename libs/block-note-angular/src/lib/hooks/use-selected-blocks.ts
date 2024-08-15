import {
  BlockNoteEditor,
  BlockSchema,
  InlineContentSchema,
  StyleSchema,
} from '@blocknote/core';

export const useSelectedBlocks = <
  BSchema extends BlockSchema,
  ISchema extends InlineContentSchema,
  SSchema extends StyleSchema
>(
  editor?: BlockNoteEditor<BSchema, ISchema, SSchema>
) => {
  if (!editor) {
    throw new Error(
      "'editor' is required, either from BlockNoteContext or as a function argument"
    );
  }

  return (
    editor.getSelection()?.blocks || [editor.getTextCursorPosition().block]
  );
};
