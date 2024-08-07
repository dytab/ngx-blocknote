import {
  BlockFromConfig,
  BlockNoteEditor,
  createBlockSpec,
  Props,
  PropSchema,
} from '@blocknote/core';

export const apiContentPropSchema = {
  type: {
    default: 'abc',
  },
} satisfies PropSchema;

export const apiContentBlockConfig = {
  type: 'apiContent' as const,
  propSchema: apiContentPropSchema,
  content: 'inline',
} as const;

const apiContentRender = (
  block: BlockFromConfig<typeof apiContentBlockConfig, any, any>,
  editor: BlockNoteEditor<any, any, any>
) => {
  const div = document.createElement('div');
  // Render content in div
  div.style.backgroundColor = '#BBB';
  div.style.width = '100%';
  div.style.padding = '4px 8px';
  div.style.borderRadius = '4px';
  div.innerHTML = 'Add rendered content';
  return {
    dom: div,
  };
};

export const apiContentParse = (
  element: HTMLElement
): Partial<Props<typeof apiContentBlockConfig.propSchema>> | undefined => {
  return undefined;
};

export const apiContentBlock = createBlockSpec(apiContentBlockConfig, {
  render: apiContentRender,
  parse: apiContentParse,
});
