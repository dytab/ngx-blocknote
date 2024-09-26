import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  Block,
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
  BnaAddBlockButtonComponent,
  BnaDeleteBlockItemComponent,
  BnaDragHandleMenuComponent,
  BnaEditorComponent,
  BnaSideMenuComponent,
  BnaSideMenuControllerComponent,
  NgxBlocknoteService,
} from '@dytab/ngx-blocknote';
import {
  HlmButtonDirective,
  HlmCheckboxComponent,
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmInputDirective,
} from '@dytab/ui';
import {
  BrnDialogContentDirective,
  BrnDialogDescriptionDirective,
  BrnDialogTitleDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain';
import { ResetBlockButtonComponent } from '../../ui-components/adding-side-menu-drag-handle-items/reset-block-button.component';
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
    BnaSideMenuControllerComponent,
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
  providers: [NgxBlocknoteService],
  template: `
    <div>{{editor.isEditable | json}}</div>
    <div class="flex gap-2">
      <button type="button" hlmBtn size="sm" (click)="patchFormValue()">
        Patch Value
      </button>
      <button type="button" hlmBtn size="sm" (click)="disableForm()">
        Disable
      </button>
      <button type="button" hlmBtn size="sm" (click)="enableForm()">
        Enable
      </button>
    </div>
    <bna-editor
      [formControl]="form.controls.editor"
      [editor]="editor"
      [options]="options"
      (onEditorReady)="onEditorReady($event)"
    />
  `,
})
export class CustomEditorExample {
  editor = BlockNoteEditor.create({ schema });
  form = this.formBuilder.group({
    editor: new FormControl<
      Block<any, any, any>[] | PartialBlock<any, any, any>[]
    >([
      {
        type: 'paragraph',
        content: 'test',
      },
    ]),
  });

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

  constructor(private formBuilder: FormBuilder) {
    this.form.disable();
  }

  onEditorReady(editor: BlockNoteEditor<any,any,any>) {
    console.log('editor ready', editor);
  }

  patchFormValue() {
    this.form.patchValue({
      editor: [
        {
          type: 'paragraph',
          content: [
            'Hello, ',
            {
              type: 'text',
              text: 'new Content!',
              styles: {
                bold: true,
              },
            },
          ],
        },
      ],
    });
  }

  disableForm() {
    this.form.disable();
  }

  enableForm() {
    this.form.enable();
  }
}

export const apiContentBlockExampleCode = ``;
