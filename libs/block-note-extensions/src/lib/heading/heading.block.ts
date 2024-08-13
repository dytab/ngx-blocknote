import {
  createBlockSpecFromStronglyTypedTiptapNode,
  createStronglyTypedTiptapNode,
  defaultProps,
  PropSchema,
} from '@blocknote/core';
import { InputRule } from '@tiptap/core';
import { TagParseRule } from 'prosemirror-model';
import { createDefaultBlockDOMOutputSpec } from '../helpers/defaultBlockHelpers';
import { getCurrentBlockContentType } from '../helpers/getCurrentBlockType';

const headings = [1, 2, 3, 4, 5, 6] as const;
export const headingPropSchema = {
  ...defaultProps,
  level: { default: 1, values: headings },
} satisfies PropSchema;

const HeadingBlockContent = createStronglyTypedTiptapNode({
  name: 'heading',
  content: 'inline*',
  group: 'blockContent',
  addAttributes() {
    return {
      level: {
        default: 1,
        // instead of "level" attributes, use "data-level"
        parseHTML: (element) => {
          const attr = element.getAttribute('data-level')!;
          const parsed = parseInt(attr);
          if (isFinite(parsed)) {
            return parsed;
          }
          return undefined;
        },
        renderHTML: (attributes) => {
          return {
            'data-level': (attributes.level as number).toString(),
          };
        },
      },
    };
  },

  addInputRules() {
    return [
      ...headings.map((level) => {
        // Creates a heading of appropriate level when starting with "#", "##", or "###".
        return new InputRule({
          find: new RegExp(`^(#{${level}})\\s$`),
          handler: ({ state, chain, range }) => {
            if (getCurrentBlockContentType(this.editor) !== 'inline*') {
              return;
            }

            chain()
              .BNUpdateBlock(state.selection.from, {
                type: 'heading',
                props: {
                  level: level as any,
                },
              })
              // Removes the "#" character(s) used to set the heading.
              .deleteRange({ from: range.from, to: range.to });
          },
        });
      }),
    ];
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Alt-1': () => {
        if (getCurrentBlockContentType(this.editor) !== 'inline*') {
          return true;
        }

        return this.editor.commands.BNUpdateBlock(
          this.editor.state.selection.anchor,
          {
            type: 'heading',
            props: {
              level: 1 as any,
            },
          }
        );
      },
      'Mod-Alt-2': () => {
        if (getCurrentBlockContentType(this.editor) !== 'inline*') {
          return true;
        }

        return this.editor.commands.BNUpdateBlock(
          this.editor.state.selection.anchor,
          {
            type: 'heading',
            props: {
              level: 2 as any,
            },
          }
        );
      },
      'Mod-Alt-3': () => {
        if (getCurrentBlockContentType(this.editor) !== 'inline*') {
          return true;
        }
        return this.editor.commands.BNUpdateBlock(
          this.editor.state.selection.anchor,
          {
            type: 'heading',
            props: {
              level: 3 as any,
            },
          }
        );
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-content-type=' + this.name + ']',
        getAttrs: (element) => {
          if (typeof element === 'string') {
            return false;
          }
          return {
            level: element.getAttribute('data-level'),
          };
        },
      },
      ...(headings.map((headingLevel) => ({
        tag: `h${headingLevel}`,
        attrs: { level: headingLevel },
        node: 'heading',
      })) as TagParseRule[]),
    ];
  },

  renderHTML(x) {
    const element = createDefaultBlockDOMOutputSpec(
      this.name,
      `h${x.node.attrs.level}`,
      {
        ...(this.options.domAttributes?.blockContent || {}),
        ...x.HTMLAttributes,
      },
      this.options.domAttributes?.inlineContent || {}
    );
    //add id to element, but how to access id here?
    return element;
  },
});

export const Heading = createBlockSpecFromStronglyTypedTiptapNode(
  HeadingBlockContent,
  headingPropSchema
);