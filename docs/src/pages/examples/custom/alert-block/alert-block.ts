import { BlockNoteEditor, insertOrUpdateBlock } from '@blocknote/core';
import {
  BlockFromConfig,
  createBlockSpec,
  Props,
  PropSchema,
} from '@blocknote/core';
import { schema } from '@angular-devkit/core';

export const alertPropSchema = {} satisfies PropSchema;

export const alertBlockConfig = {
  type: 'alert' as const,
  propSchema: alertPropSchema,
  content: 'none',
} as const;

const alertRender = (
  block: BlockFromConfig<typeof alertBlockConfig, any, any>,
  editor: BlockNoteEditor<any, any, any>
) => {
  const div = document.createElement('p');
  div.textContent = 'Alert';

  return {
    dom: div,
  };
};

export const alertParse = (
  element: HTMLElement
): Partial<Props<typeof alertBlockConfig.propSchema>> | undefined => {
  return undefined;
};

export const alertBlock = createBlockSpec(alertBlockConfig, {
  render: alertRender,
  parse: alertParse,
});
