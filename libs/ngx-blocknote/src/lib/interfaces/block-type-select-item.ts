import {
  Block,
} from '@blocknote/core';

export type BlockTypeSelectItem = {
  name: string;
  type: string;
  props?: Record<string, boolean | number | string>;
  icon: string;
  isSelected: (
    block: Block<any, any, any> | undefined
  ) => boolean;
};
