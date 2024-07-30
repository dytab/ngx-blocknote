import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Block, BlockSpecs, defaultBlockSpecs } from '@blocknote/core';
import { BnaEditorComponent } from '@dytab/block-note-angular';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { alertBlock } from './alert-block';

@Component({
  selector: 'bna-custom-alert-block-example',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BnaEditorComponent,
    HlmButtonDirective,
  ],
  templateUrl: './custom-alert-block.page.html',
  styleUrl: './custom-alert-block.page.css',
})
export class CustomAlertBlockPage {
  constructor(private formBuilder: NonNullableFormBuilder) {}

  form = this.formBuilder.group({
    editor: this.formBuilder.control<Block[] | undefined>(
      [
        {
          id: '262bf9c4-3c2a-4543-bc47-49976ec904c3',
          type: 'alert',
          props: {},
          content: [],
          children: [],
        },
        //TODO: remove cast
      ] as any,
      Validators.required
    ),
  });
  blockSpecs: BlockSpecs = {
    ...defaultBlockSpecs,
    alert: alertBlock,
  };

  get control() {
    return this.form.controls.editor;
  }

  submit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;

    console.log('submitted', this.form.value);
  }
}
