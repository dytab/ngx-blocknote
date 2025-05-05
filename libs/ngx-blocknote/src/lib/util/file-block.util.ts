import {
  Block,
  BlockFromConfig,
  BlockNoteEditor,
  BlockSchema,
  checkBlockIsFileBlock,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  FileBlockConfig,
  InlineContentSchema,
  StyleSchema,
} from '@blocknote/core';

export const fileBlock = <
  BSchema extends BlockSchema = DefaultBlockSchema,
  ISchema extends InlineContentSchema = DefaultInlineContentSchema,
  SSchema extends StyleSchema = DefaultStyleSchema,
>(
  editor: BlockNoteEditor<BSchema, ISchema, SSchema>,
  selectedBlocks: Block<BSchema, ISchema, SSchema>[],
):
  | BlockFromConfig<
      FileBlockConfig,
      DefaultInlineContentSchema,
      DefaultStyleSchema
    >
  | undefined => {
  if (selectedBlocks.length !== 1) {
    return undefined;
  }
  const block = selectedBlocks[0];
  if (checkBlockIsFileBlock<BSchema, ISchema, SSchema>(block, editor)) {
    return block;
  }

  return undefined;
};
