import {
  Block,
  BlockFromConfig,
  BlockNoteEditor,
  checkBlockIsFileBlock,
  FileBlockConfig,
} from '@blocknote/core';

export const fileBlock = (
  editor: BlockNoteEditor<any, any, any>,
  selectedBlocks: Block<any, any, any>[],
): BlockFromConfig<FileBlockConfig, any, any> | undefined => {
  if (selectedBlocks.length !== 1) {
    return undefined;
  }
  const block = selectedBlocks[0];
  if (checkBlockIsFileBlock(block, editor)) {
    return block;
  }

  return undefined;
};
