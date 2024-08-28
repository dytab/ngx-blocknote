import { CommonModule } from '@angular/common';
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
  BlockNoteAngularService,
  BlockNoteEditorOptionsType,
  BnaAddBlockButtonComponent,
  BnaDeleteBlockItemComponent,
  BnaDragHandleMenuComponent,
  BnaEditorComponent,
  BnaSideMenuComponent,
  BnaSideMenuControllerDirective,
} from '@dytab/ngx-blocknote';
import {
  BrnDialogContentDirective,
  BrnDialogDescriptionDirective,
  BrnDialogTitleDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain';
import { ResetBlockButtonComponent } from '../../ui-components/adding-side-menu-drag-handle-items/reset-block-button.component';
import {
  HlmButtonDirective,
  HlmCheckboxComponent,
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmInputDirective,
} from '@dytab/ui';
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
  standalone: true,
  imports: [
    CommonModule,
    BnaEditorComponent,
    HlmButtonDirective,
    BnaAddBlockButtonComponent,
    BnaDeleteBlockItemComponent,
    BnaDragHandleMenuComponent,
    BnaSideMenuComponent,
    BnaSideMenuControllerDirective,
    ResetBlockButtonComponent,
    HlmDialogComponent,
    HlmDialogContentComponent,
    BrnDialogContentDirective,
    HlmDialogHeaderComponent,
    BrnDialogTitleDirective,
    BrnDialogDescriptionDirective,
    BrnDialogTriggerDirective,
    HlmDialogFooterComponent,
    HlmCheckboxComponent,
    ReactiveFormsModule,
    HlmInputDirective,
  ],
  providers: [BlockNoteAngularService],
  template: `
    <bna-editor
      [initialContent]="initialContent"
      [editor]="editor"
      [options]="options"
      (onEditorReady)="onEditorReady($event)"
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
