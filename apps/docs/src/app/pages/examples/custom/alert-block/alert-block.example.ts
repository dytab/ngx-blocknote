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
  imports: [CommonModule, BnaEditorComponent],
  template: `<bna-editor
    [initialContent]="initialContent"
    [options]="options"
  />`,
})
export class AlertBlockExample {
  initialContent: PartialBlock<typeof schema.blockSchema>[] = [
    {
      type: 'alert',
      props: {
        type: 'warning',
      },
      content: 'Hallo Welt.',
    },
  ];
  options: BlockNoteEditorOptionsType<
    typeof schema.blockSchema,
    typeof schema.inlineContentSchema,
    typeof schema.styleSchema
  > = {
    schema,
    getSuggestionItems: (editor) => [
      {
        key: 'alert',
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
      },
      ...getDefaultSlashMenuItems(editor),
    ],
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
