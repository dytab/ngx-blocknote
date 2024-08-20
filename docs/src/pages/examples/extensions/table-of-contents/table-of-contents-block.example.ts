import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  BlockNoteEditor,
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  defaultStyleSpecs,
  getDefaultSlashMenuItems,
  insertOrUpdateBlock,
  PartialBlock,
} from '@blocknote/core';
import {
  BlockNoteEditorOptionsType,
  BnaEditorComponent,
} from '@dytab/ngx-blocknote';
import {
  getTableOfContentSuggestionItem,
  Heading,
  TableOfContentBlock,
} from '@dytab/blocknote-extensions';
import { HlmButtonDirective } from '@dytab/ui';

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    table_of_contents: TableOfContentBlock,
    heading: Heading,
  },
  inlineContentSpecs: { ...defaultInlineContentSpecs },
  styleSpecs: { ...defaultStyleSpecs },
});

@Component({
  selector: 'bna-table-of-contents-block-example',
  standalone: true,
  imports: [CommonModule, BnaEditorComponent, HlmButtonDirective],
  template: ` <bna-editor
    [initialContent]="initialContent"
    [options]="options"
  />`,
})
export class TableOfContentsBlockExample {
  initialContent: PartialBlock<typeof schema.blockSchema>[] = [
    { type: 'table_of_contents' },
    { type: 'heading', props: { level: 1 }, content: 'First Heading 1' },
    { type: 'heading', props: { level: 2 }, content: 'Level 2' },
    { type: 'heading', props: { level: 3 }, content: 'Level 3' },
    { type: 'heading', props: { level: 4 }, content: 'Level 4' },
    { type: 'heading', props: { level: 5 }, content: 'Level 5' },
    { type: 'heading', props: { level: 6 }, content: 'Level 6' },
    { type: 'heading', props: { level: 1 }, content: 'Second Heading 1' },
    { type: 'heading', props: { level: 2 }, content: '(1.1)' },
    { type: 'heading', props: { level: 2 }, content: '(1.2)' },
  ];
  options: BlockNoteEditorOptionsType<
    typeof schema.blockSchema,
    typeof schema.inlineContentSchema,
    typeof schema.styleSchema
  > = {
    schema: schema,
    getSuggestionItems: (editor) => [
      //TODO: remove as any cast
      getTableOfContentSuggestionItem(editor as any),
      ...getDefaultSlashMenuItems(editor),
    ],
  };
}

export const tableOfContentsBlockExampleCode = `import { CommonModule } from '@angular/common';
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
} from '@dytab/ngx-blocknote';
import { HlmButtonDirective } from '@dytab/ngx-blocknote';
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
