import { TableHandlesState } from '@blocknote/core';

export interface TableHandleOptions {
  orientation: 'row' | 'column';
  tableHandles: TableHandlesState<any, any>;
  closeMenu: () => void;
  showOtherHandle: () => void;
  hideOtherHandle: () => void;
}
