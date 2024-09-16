import {
  BlockNoteEditor,
  createBlockSpecFromStronglyTypedTiptapNode,
  createDefaultBlockDOMOutputSpec,
  createStronglyTypedTiptapNode,
  defaultBlockSpecs,
  defaultProps,
  formatKeyboardShortcut,
  getBlockSchemaFromSpecs,
  getCurrentBlockContentType,
  insertOrUpdateBlock,
  PropSchema,
} from '@blocknote/core';
import { InputRule } from '@tiptap/core';
import { TagParseRule } from 'prosemirror-model';

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
            'data-level': (attributes['level'] as number).toString(),
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

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
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

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.editor.commands.BNUpdateBlock(
          this.editor.state.selection.anchor,
          {
            type: 'heading',
            props: {
              level: 1 as any,
            },
          },
        );
      },
      'Mod-Alt-2': () => {
        if (getCurrentBlockContentType(this.editor) !== 'inline*') {
          return true;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.editor.commands.BNUpdateBlock(
          this.editor.state.selection.anchor,
          {
            type: 'heading',
            props: {
              level: 2 as any,
            },
          },
        );
      },
      'Mod-Alt-3': () => {
        if (getCurrentBlockContentType(this.editor) !== 'inline*') {
          return true;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.editor.commands.BNUpdateBlock(
          this.editor.state.selection.anchor,
          {
            type: 'heading',
            props: {
              level: 3 as any,
            },
          },
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
      `h${x.node.attrs['level']}`,
      {
        ...(this.options.domAttributes?.blockContent || {}),
        ...x.HTMLAttributes,
      },
      this.options.domAttributes?.inlineContent || {},
    );
    //add id to element, but how to access id here?
    return element;
  },
});

export const Heading = createBlockSpecFromStronglyTypedTiptapNode(
  HeadingBlockContent,
  headingPropSchema,
);

const headingSchema = getBlockSchemaFromSpecs({
  ...defaultBlockSpecs,
  heading: Heading,
});

export const getHeadingSlashMenuItems = (
  editor: BlockNoteEditor<typeof headingSchema>,
) => [
  {
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: 'heading',
        props: { level: 1 },
      });
    },
    badge: formatKeyboardShortcut('Mod-Alt-1'),
    key: 'heading',
    ...editor.dictionary.slash_menu.heading,
    subtext: 'Big section heading',
  },
  {
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: 'heading',
        props: { level: 2 },
      });
    },
    badge: formatKeyboardShortcut('Mod-Alt-2'),
    key: 'heading_2',
    ...editor.dictionary.slash_menu.heading_2,
    subtext: 'Medium section heading',
  },
  {
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: 'heading',
        props: { level: 3 },
      });
    },
    badge: formatKeyboardShortcut('Mod-Alt-3'),
    key: 'heading_3',
    ...editor.dictionary.slash_menu.heading_3,
    subtext: 'Small section heading',
  },
  {
    ...editor.dictionary.slash_menu.heading_3,
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: 'heading',
        props: { level: 4 },
      });
    },
    badge: formatKeyboardShortcut('Mod-Alt-4'),
    title: 'Heading 4',
    key: 'heading_4',
    subtext: 'Very small section heading',
  },
  {
    ...editor.dictionary.slash_menu.heading_3,
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: 'heading',
        props: { level: 5 },
      });
    },
    badge: formatKeyboardShortcut('Mod-Alt-5'),
    title: 'Heading 5',
    key: 'heading_5',
    subtext: 'Smallest section heading',
  },
  {
    ...editor.dictionary.slash_menu.heading_3,
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: 'heading',
        props: { level: 6 },
      });
    },
    title: 'Heading 6',
    badge: formatKeyboardShortcut('Mod-Alt-6'),
    key: 'heading_6',
    subtext: 'Very big section heading',
  },
];
