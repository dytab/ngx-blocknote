import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
  NgxBlocknoteService,
} from '@dytab/ngx-blocknote';
import { alertBlock } from '../alert-block/alert-block';

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    alert: alertBlock,
  },
  inlineContentSpecs: { ...defaultInlineContentSpecs },
  styleSpecs: { ...defaultStyleSpecs },
});

@Component({
  selector: 'bna-custom-editor-example',
  imports: [BnaEditorComponent, ReactiveFormsModule],
  providers: [NgxBlocknoteService],
  template: `
    <bna-editor
      [initialContent]="initialContent"
      [editorInput]="editor"
      [options]="options"
      (editorReady)="onEditorReady($event)"
    />
  `,
})
export class CustomEditorExample {
  editor = BlockNoteEditor.create({ schema });

  initialContent: PartialBlock<typeof schema.blockSchema>[] = [
    {
      type: 'paragraph',
      content: 'test',
    },
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

  onEditorReady(editor: BlockNoteEditor<typeof schema.blockSchema>) {
    console.log('editor ready', editor);
  }
}

export const apiContentBlockExampleCode = ``;
