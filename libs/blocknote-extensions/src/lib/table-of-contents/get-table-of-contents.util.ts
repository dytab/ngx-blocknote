import {
  Block,
  BlockFromConfig,
  BlockNoteEditor,
  Link,
  StyledText,
} from '@blocknote/core';
import { TOCItem } from './toc-item.type';

export const getTableOfContents = (
  editor: BlockNoteEditor<any, any, any>,
): TOCItem[] => {
  const blocks = editor.document;

  const headingBlocks: BlockFromConfig<any, any, any>[] = (
    blocks as Block<any, any, any>[]
  ).filter((block) => block.type === 'heading') as any;

  return headingBlocks.map((block) => ({
    headingLevel: block.props['level'],
    id: block.id,
    text: (block.content && Array.isArray(block.content)
      ? block.content.map((inlineContent) => {
          if (inlineContent.type === 'text') {
            return (inlineContent as StyledText<any>).text;
          }

          return (inlineContent as Link<any>).content
            .map((styledText) => styledText.text)
            .join(', ');
        })
      : []
    ).join(),
  }));
};
