import {
  BlockFromConfig,
  BlockNoteEditor,
  createBlockSpec,
  PropSchema,
} from '@blocknote/core';

export const pageBreakPropSchema = {} satisfies PropSchema;

export const pageBreakBlockConfig = {
  type: 'pageBreak' as const,
  propSchema: pageBreakPropSchema,
  content: 'none' as const,
} as const;

const render = (
  block: BlockFromConfig<typeof pageBreakBlockConfig, any, any>,
  editor: BlockNoteEditor<any, any, any>
) => {
  const element = document.createElement('div');
  element.style.pageBreakAfter = 'always';
  //TODO: do not render this
  element.textContent = '..........PageBreak..........';
  return {
    dom: element,
  };
};

export const PageBreak = createBlockSpec(pageBreakBlockConfig, {
  render: render,
});
