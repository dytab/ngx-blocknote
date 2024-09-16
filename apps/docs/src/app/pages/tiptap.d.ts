import {
  BlockSchema,
  InlineContentSchema,
  PartialBlock,
  StyleSchema,
} from '@blocknote/core';

//TODO: check if tooling is the problem, that this is needed
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    block: {
      BNCreateBlock: (pos: number) => ReturnType;
      BNDeleteBlock: (posInBlock: number) => ReturnType;
      BNMergeBlocks: (posBetweenBlocks: number) => ReturnType;
      BNSplitBlock: (
        posInBlock: number,
        keepType?: boolean,
        keepProps?: boolean,
      ) => ReturnType;
      BNUpdateBlock: <
        BSchema extends BlockSchema,
        I extends InlineContentSchema,
        S extends StyleSchema,
      >(
        posInBlock: number,
        block: PartialBlock<BSchema, I, S>,
      ) => ReturnType;
      BNCreateOrUpdateBlock: <
        BSchema extends BlockSchema,
        I extends InlineContentSchema,
        S extends StyleSchema,
      >(
        posInBlock: number,
        block: PartialBlock<BSchema, I, S>,
      ) => ReturnType;
    };
  }
}
