import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  defaultStyleSpecs,
  PartialBlock,
} from '@blocknote/core';
import {
  BlockNoteEditorOptionsType,
  BnaEditorComponent,
  HlmButtonDirective,
} from '@dytab/block-note-angular';
import { Heading } from '@dytab/block-note-extensions';

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
  };
}

export const alertBlockExampleCode = `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  BlockNoteEditor,
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  defaultStyleSpecs,
  insertOrUpdateBlock,
  PartialBlock,
} from '@blocknote/core';
import {
  BlockNoteEditorOptionsType,
  BnaEditorComponent,
} from '@dytab/block-note-angular';
import { HlmButtonDirective } from '@dytab/block-note-angular';
import { alertBlock } from './alert-block';

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    alert: alertBlock,
  },
  inlineContentSpecs: { ...defaultInlineContentSpecs },
  styleSpecs: { ...defaultStyleSpecs },
});
@Component({
  selector: 'bna-alert-block-example',
  standalone: true,
  imports: [CommonModule, BnaEditorComponent, HlmButtonDirective],
  template: \`<bna-editor
    [initialContent]="initialContent"
    [options]="options"
  />\`,
})
export class AlertBlockExample {
  initialContent: PartialBlock<typeof schema.blockSchema>[] = [
    {
      type: 'alert',
      props: {
        type: 'warning',
      },
    },
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
        title: 'Alert',
        onItemClick: () => {
          insertOrUpdateBlock(editor, {
            type: 'alert' as never,
          });
        },
        badge: 'BAFD',
        subtext: 'SUBTEXT',
        aliases: [
          'alert',
          'notification',
          'emphasize',
          'warning',
          'error',
          'info',
          'success',
        ],
        group: 'Other',
      }),
    ],
  };
}`;
