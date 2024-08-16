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
  const pageBreakWrapper = document.createElement('div');
  pageBreakWrapper.style.pageBreakAfter = 'always';

  const pageBreakText = document.createElement('div');
  pageBreakText.className = 'page-wrapper-text';
  pageBreakText.textContent = '..........PageBreak..........';
  pageBreakWrapper.appendChild(pageBreakText);
  return {
    dom: pageBreakWrapper,
  };
};

export const PageBreak = createBlockSpec(pageBreakBlockConfig, {
  render: render,
});
