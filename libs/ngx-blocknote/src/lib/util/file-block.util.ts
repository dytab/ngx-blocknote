import {
  Block,
  BlockFromConfig,
  BlockNoteEditor,
  checkBlockIsFileBlock,
  FileBlockConfig,
} from '@blocknote/core';
import {
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
} from '@blocknote/core/src/blocks/defaultBlocks';
import {
  BlockSchema,
  InlineContentSchema,
  StyleSchema,
} from '@blocknote/core/src/schema';

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
