import {
  BlockNoteSchema,
  createBlockSpecFromStronglyTypedTiptapNode,
  createStronglyTypedTiptapNode,
  defaultBlockSpecs,
  defaultStyleSpecs,
} from '@blocknote/core';

/**
 * Angular equivalent of React's comments schema
 * Creates a specialized BlockNote schema for use in comment editors
 */

// Create a simplified paragraph block for comments
// This is quite convoluted. We'll clean this up when we make
// it easier to extend / customize the default blocks
const paragraph = createBlockSpecFromStronglyTypedTiptapNode(
  createStronglyTypedTiptapNode<'paragraph', 'inline*'>(
    defaultBlockSpecs.paragraph.implementation.node.config as any,
  ),
  // disable default props on paragraph (such as textalignment and colors)
  {},
);

// Remove textColor, backgroundColor from styleSpecs for comments
const { textColor, backgroundColor, ...styleSpecs } = defaultStyleSpecs;

/**
 * The schema to use for comments in Angular BlockNote components
 * This provides a simplified editor experience suitable for comment content
 */
export const bnaCommentsSchema = BlockNoteSchema.create({
  blockSpecs: {
    paragraph,
  },
  styleSpecs,
});

/**
 * Type helper for the comments schema
 */
export type BnaCommentsSchema = typeof bnaCommentsSchema;
