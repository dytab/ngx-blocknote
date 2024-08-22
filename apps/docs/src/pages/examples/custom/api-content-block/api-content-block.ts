import {
  BlockFromConfig,
  BlockNoteEditor,
  createBlockSpec,
  Props,
} from '@blocknote/core';

export const apiContentPropSchema = {
  name: {
    default: '',
  },
  age: {
    default: false,
  },
  address: {
    default: false,
  },
};

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
  div.innerHTML = 'Content not configured';

  const data = {
    name: 'Max Musetrmann',
    age: 25,
    address: '123 Main St',
  };

  let dataString = '';
  for (const [key, value] of Object.entries(block.props)) {
    if (value) {
      if (key === 'name') {
        dataString += `<p>${value}</p>`;
        continue;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const asdf = data[key] as number | string;
      dataString += `<p>${asdf}</p>`;
    }
  }
  if (dataString.length > 0) div.innerHTML = dataString;

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
