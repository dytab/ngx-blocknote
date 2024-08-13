import {
  BlockFromConfig,
  BlockNoteEditor,
  createBlockSpec,
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

export const tableOfContentsPropSchema = {} satisfies PropSchema;

export const tableOfContentsBlockConfig = {
  type: 'tableOfContents' as const,
  propSchema: tableOfContentsPropSchema,
  content: 'none' as const,
} as const;

const render = (
  block: BlockFromConfig<typeof tableOfContentsBlockConfig, any, any>,
  editor: BlockNoteEditor<any, any, any>
) => {
  const tocElement = document.createElement('div');
  tocElement.className = 'toc';
  tocElement.contentEditable = 'false';
  const tocHeading = document.createElement('div');
  tocHeading.className = 'toc-heading';
  //TODO: how we do this in other translations
  tocHeading.textContent = 'Table of Content';
  tocElement.appendChild(tocHeading);

  const toc = getTableOfContents(editor);
  for (const entry of toc) {
    const tocEntryElement = document.createElement('a');
    tocEntryElement.className = 'toc-entry';
    tocEntryElement.setAttribute('data-level', entry.headingLevel.toString());
    tocEntryElement.setAttribute('data-heading-id', entry.id);
    tocEntryElement.textContent = entry.text;
    tocElement.appendChild(tocEntryElement);

    tocEntryElement.addEventListener('click', () => {
      scrollToHeadingElement(entry);
    });
  }
  return {
    dom: tocElement,
  };
};

export const TableOfContentBlock = createBlockSpec(tableOfContentsBlockConfig, {
  render: render,
});
