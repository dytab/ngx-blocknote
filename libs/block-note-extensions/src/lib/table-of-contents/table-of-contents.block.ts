import {
  BlockFromConfig,
  BlockNoteEditor,
  createBlockSpec,
  Props,
  PropSchema,
} from '@blocknote/core';

export const tableOfContentsPropSchema = {} satisfies PropSchema;

export const tableOfContentsBlockConfig = {
  type: 'tableOfContents' as const,
  propSchema: tableOfContentsPropSchema,
  content: 'none',
} as const;

const render = (
  block: BlockFromConfig<typeof tableOfContentsBlockConfig, any, any>,
  editor: BlockNoteEditor<any, any, any>
) => {
  const div = document.createElement('div');
  div.innerHTML = 'TABLE Of contents';
  // for (const block of editor.document) {
  // }

  // editor.onChange(() => {
  //   //we need to  rerender our stuff here
  //   // editor.
  // });
  return {
    dom: div,
  };
};

export const parse = (
  element: HTMLElement
): Partial<Props<typeof tableOfContentsBlockConfig.propSchema>> | undefined => {
  return undefined;
};

export const TableOfContentBlock = createBlockSpec(tableOfContentsBlockConfig, {
  render: render,
  parse: parse,
});
