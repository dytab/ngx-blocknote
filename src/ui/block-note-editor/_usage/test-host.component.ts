import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BlockNoteEditorComponent } from '../_component/block-note-editor.component';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BlockNoteEditorComponent, HlmButtonDirective],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <div class="mb-3">
        <label class="form-label" for="someControl">Editor</label>
        <block-note formControlName="editor" />
        @if (control?.invalid && control?.touched) {
        <em class="invalid-feedback">Required!</em>
        }
      </div>
      <hr />
      <pre> {{ form.value | json }} </pre>
    </form>
  `,
})
export class TestHostBlockNodeEditorComponent {
  form = this.formBuilder.group({
    editor: this.formBuilder.control<any | undefined>(
      [
        {
          id: '2b778029-3985-46a1-a30f-756b6b4636db',
          type: 'paragraph',
          props: {
            textColor: 'default',
            backgroundColor: 'default',
            textAlignment: 'left',
          },
          content: [
            {
              type: 'text',
              text: '1',
              styles: {},
            },
          ],
          children: [],
        },
        {
          id: 'aece5b48-dd54-435e-9008-26e4b0c35bb4',
          type: 'paragraph',
          props: {
            textColor: 'default',
            backgroundColor: 'default',
            textAlignment: 'left',
          },
          content: [
            {
              type: 'text',
              text: '2',
              styles: {},
            },
          ],
          children: [],
        },
        {
          id: '6dcc2772-cadd-4bfa-ab5a-e566e58d4148',
          type: 'paragraph',
          props: {
            textColor: 'default',
            backgroundColor: 'default',
            textAlignment: 'left',
          },
          content: [
            {
              type: 'text',
              text: '3',
              styles: {},
            },
          ],
          children: [],
        },
        {
          id: 'a7a34c06-710b-4739-8e82-8681c50d6b4b',
          type: 'paragraph',
          props: {
            textColor: 'default',
            backgroundColor: 'default',
            textAlignment: 'left',
          },
          content: [
            {
              type: 'text',
              text: '4',
              styles: {},
            },
          ],
          children: [],
        },
      ],
      Validators.required
    ),
  });

  constructor(private formBuilder: NonNullableFormBuilder) {}

  get control() {
    return this.form.controls.editor;
  }

  reset() {
    this.form.reset();
  }

  submit() {
    this.form.markAllAsTouched();

    if (!this.form.valid) return;

    console.log('submitted', this.form.value);
    this.form.reset();
  }

  patch() {
    this.form.patchValue({
      editor: [
        {
          id: '262bf9c4-3c2a-4543-bc47-49976ec904c3',
          type: 'paragraph',
          props: {
            textColor: 'default',
            backgroundColor: 'default',
            textAlignment: 'left',
          },
          content: [
            {
              type: 'text',
              text: 'Some Custom text',
              styles: {},
            },
          ],
          children: [],
        },
        {
          id: '78b618ea-417e-4eea-a432-7baf561a5585',
          type: 'paragraph',
          props: {
            textColor: 'default',
            backgroundColor: 'default',
            textAlignment: 'left',
          },
          content: [],
          children: [],
        },
      ],
    });
  }

  disable() {
    this.control.disable();
  }

  enable() {
    this.control.enable();
  }
}
