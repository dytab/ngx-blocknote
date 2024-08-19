import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  BlockNoteEditor,
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  defaultStyleSpecs,
  formatKeyboardShortcut,
  insertOrUpdateBlock,
  PartialBlock,
} from '@blocknote/core';
import {
  BlockNoteEditorOptionsType,
  BnaEditorComponent,
} from '@dytab/block-note-angular';
import { Heading } from '@dytab/block-note-extensions';
import { HlmButtonDirective } from '@dytab/ui';

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    heading: Heading,
  },
  inlineContentSpecs: { ...defaultInlineContentSpecs },
  styleSpecs: { ...defaultStyleSpecs },
});
@Component({
  selector: 'bna-heading-block-example',
  standalone: true,
  imports: [CommonModule, BnaEditorComponent, HlmButtonDirective],
  template: `<bna-editor
    [initialContent]="initialContent"
    [options]="options"
  />`,
})
export class HeadingBlockExample {
  initialContent: PartialBlock<typeof schema.blockSchema>[] = [
    { type: 'heading', props: { level: 1 }, content: 'Level 1' },
    { type: 'heading', props: { level: 2 }, content: 'Level 2' },
    { type: 'heading', props: { level: 3 }, content: 'Level 3' },
    { type: 'heading', props: { level: 4 }, content: 'Level 4' },
    { type: 'heading', props: { level: 5 }, content: 'Level 5' },
    { type: 'heading', props: { level: 6 }, content: 'Level 6' },
  ];
  options: BlockNoteEditorOptionsType<
    typeof schema.blockSchema,
    typeof schema.inlineContentSchema,
    typeof schema.styleSchema
  > = {
    schema,
    inputSlashMenuItems: [
      (
        editor: BlockNoteEditor<
          typeof schema.blockSchema,
          typeof schema.inlineContentSchema,
          typeof schema.styleSchema
        >
      ) => ({
        onItemClick: () => {
          insertOrUpdateBlock(editor, {
            type: 'heading',
            props: { level: 1 },
          });
        },
        badge: formatKeyboardShortcut('Mod-Alt-1'),
        key: 'heading',
        ...editor.dictionary.slash_menu.heading,
      }),
      (
        editor: BlockNoteEditor<
          typeof schema.blockSchema,
          typeof schema.inlineContentSchema,
          typeof schema.styleSchema
        >
      ) => ({
        onItemClick: () => {
          insertOrUpdateBlock(editor, {
            type: 'heading',
            props: { level: 2 },
          });
        },
        badge: formatKeyboardShortcut('Mod-Alt-2'),
        key: 'heading_2',
        ...editor.dictionary.slash_menu.heading_2,
      }),
      (
        editor: BlockNoteEditor<
          typeof schema.blockSchema,
          typeof schema.inlineContentSchema,
          typeof schema.styleSchema
        >
      ) => ({
        onItemClick: () => {
          insertOrUpdateBlock(editor, {
            type: 'heading',
            props: { level: 3 },
          });
        },
        badge: formatKeyboardShortcut('Mod-Alt-3'),
        key: 'heading_3',
        ...editor.dictionary.slash_menu.heading_3,
      }),
      (
        editor: BlockNoteEditor<
          typeof schema.blockSchema,
          typeof schema.inlineContentSchema,
          typeof schema.styleSchema
        >
      ) => ({
        ...editor.dictionary.slash_menu.heading_3,
        onItemClick: () => {
          insertOrUpdateBlock(editor, {
            type: 'heading',
            props: { level: 4 },
          });
        },
        badge: formatKeyboardShortcut('Mod-Alt-4'),
        key: 'heading_4',
      }),
      (
        editor: BlockNoteEditor<
          typeof schema.blockSchema,
          typeof schema.inlineContentSchema,
          typeof schema.styleSchema
        >
      ) => ({
        ...editor.dictionary.slash_menu.heading_3,
        onItemClick: () => {
          insertOrUpdateBlock(editor, {
            type: 'heading',
            props: { level: 5 },
          });
        },
        badge: formatKeyboardShortcut('Mod-Alt-5'),
        key: 'heading_5',
      }),
      (
        editor: BlockNoteEditor<
          typeof schema.blockSchema,
          typeof schema.inlineContentSchema,
          typeof schema.styleSchema
        >
      ) => ({
        ...editor.dictionary.slash_menu.heading_3,
        onItemClick: () => {
          insertOrUpdateBlock(editor, {
            type: 'heading',
            props: { level: 6 },
          });
        },
        badge: formatKeyboardShortcut('Mod-Alt-6'),
        key: 'heading_6',
      }),
    ],
  };
}

export const headingBlockExampleCode = ``;
