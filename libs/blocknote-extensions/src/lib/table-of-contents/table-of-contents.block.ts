import {
  BlockFromConfig,
  BlockNoteEditor,
  createBlockSpec,
  defaultBlockSpecs,
  getBlockSchemaFromSpecs,
  insertOrUpdateBlock,
  PropSchema,
} from '@blocknote/core';
import { getTableOfContents } from './get-table-of-contents.util';
import { TOCItem } from './toc-item.type';

function scrollToHeadingElement(entry: TOCItem) {
  // Find the element
  const element = document.querySelector(`[data-id="${entry.id}"]`);
  // If the element exists
  if (element) {
    // Scroll to the element
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

function renderTableOfContent(
  editor: BlockNoteEditor<any, any, any>,
  tocWrapper: HTMLElement,
) {
  //TODO: check if there is a way to clear this better;
  tocWrapper.innerHTML = '';
  const tocHeading = document.createElement('div');
  tocHeading.className = 'toc-heading';
  //TODO: how we do this in other translations
  tocHeading.textContent = 'Table of Content';
  tocWrapper.appendChild(tocHeading);

  const toc = getTableOfContents(editor);
  for (const entry of toc) {
    const tocEntryElement = document.createElement('a');
    tocEntryElement.className = 'toc-entry';
    tocEntryElement.setAttribute('data-level', entry.headingLevel.toString());
    tocEntryElement.setAttribute('data-heading-id', entry.id);
    tocEntryElement.textContent = entry.text;
    tocWrapper.appendChild(tocEntryElement);

    tocEntryElement.addEventListener('click', () => {
      scrollToHeadingElement(entry);
    });
  }
}

export const tableOfContentsPropSchema = {} satisfies PropSchema;

export const tableOfContentsBlockConfig = {
  type: 'table_of_contents' as const,
  propSchema: tableOfContentsPropSchema,
  content: 'none' as const,
} as const;

const render = (
  block: BlockFromConfig<typeof tableOfContentsBlockConfig, any, any>,
  editor: BlockNoteEditor<any, any, any>,
) => {
  const tocWrapperElement = document.createElement('div');
  tocWrapperElement.className = 'toc';
  tocWrapperElement.contentEditable = 'false';
  renderTableOfContent(editor, tocWrapperElement);
  editor.onEditorContentChange(() => {
    //Table of content is rerended on content change, could cause performance issues in the future, but is very fast right now
    //Content of tocWrapperElement will be cleared and added
    renderTableOfContent(editor, tocWrapperElement);
  });
  return {
    dom: tocWrapperElement,
  };
};

export const TableOfContentBlock = createBlockSpec(tableOfContentsBlockConfig, {
  render: render,
});

const tableOfContentsSchema = getBlockSchemaFromSpecs({
  ...defaultBlockSpecs,
  tableOfContents: TableOfContentBlock,
});

export const getTableOfContentSuggestionItem = (
  editor: BlockNoteEditor<typeof tableOfContentsSchema>,
) => ({
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: 'table_of_contents',
    });
  },
  key: 'table_of_contents',
  group: 'Special',
  title: 'Table of Contents',
});
