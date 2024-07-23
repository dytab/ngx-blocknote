import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Block } from '@blocknote/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BnaEditorComponent } from '../_component/bna-editor.component';

@Component({
  standalone: true,
  imports: [
    BnaEditorComponent,
    CommonModule,
    HlmButtonDirective,
    ReactiveFormsModule,
  ],
  styles: `
  .btn {
    margin: 0 1rem;
    border: 1px solid silver;
    padding: 0.5rem
  }
  fieldset {
    padding: 1rem;
    margin: 1rem;
    border: 1px solid silver;
  }
  .invalid-feedback {
    color: red;
  }
  `,
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <button (click)="disable()" type="button" class="btn">disable</button>
      <button (click)="enable()" type="button" class="btn">enable</button>
      <button (click)="patch()" type="button" class="btn">patch</button>
      <button (click)="reset()" type="button" class="btn">reset</button>

      <fieldset class="mb-3">
        <label class="form-label" for="someControl">Editor:</label>
        <bna-editor formControlName="editor" />
        @if (control.invalid && control.touched) {
        <em class="invalid-feedback">Required!</em>
        }
      </fieldset>
      <button class="btn">submit</button>
      <hr />
      <pre>{{ form.value | json }}</pre>
    </form>
  `,
})
export class TestHostBlockNodeEditorComponent {
  form = this.formBuilder.group({
    editor: this.formBuilder.control<Block[] | undefined>(
      undefined,
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
    const demoContent: Block[] = [
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
    ];
    this.form.patchValue({
      editor: demoContent,
    });
  }

  disable() {
    this.control.disable();
  }

  enable() {
    this.control.enable();
  }
}
