import { createInlineContentSpec } from '@blocknote/core';
import { InlineContentFromConfig } from '@blocknote/core/types/src/schema/inlineContent/types';

export const mentionConfig = {
  type: 'mention',
  propSchema: {
    user: {
      default: 'Unknown',
    },
  },
  content: 'none',
} as const;

export type MentionConfigType = typeof mentionConfig;

const render = (
  inlineContent: InlineContentFromConfig<MentionConfigType, any>
) => {
  const div = document.createElement('span');
  div.style.backgroundColor = '#9d9';
  div.style.width = '100%';
  div.style.padding = '4px 8px';
  div.style.borderRadius = '4px';
  div.innerHTML = `${inlineContent.props.user}`;
  console.log(inlineContent);
  return {
    dom: div,
  };
};

export const Mention = createInlineContentSpec(mentionConfig, {
  render: render,
});
