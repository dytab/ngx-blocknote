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
    ReactiveFormsModule,
    HlmButtonDirective,
  ],
  styles: `
  .invalid-feedback {
    color: red;
  }
  `,
  selector: 'bna-test-editor',
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="submit()"
      class="flex gap-3 p-3 flex-col"
    >
      <div class="flex gap-1">
        <button (click)="disable()" type="button" hlmBtn size="sm">
          disable
        </button>
        <button (click)="enable()" type="button" hlmBtn size="sm">
          enable
        </button>
        <button (click)="patch()" type="button" hlmBtn size="sm">patch</button>
        <button (click)="reset()" type="button" hlmBtn size="sm">reset</button>
      </div>

      <fieldset>
        <label class="font-bold" for="someControl">Editor</label>
        <bna-editor
          formControlName="editor"
          class="block min-h-52 bg-gray-200 rounded"
        />
        @if (control.invalid && control.touched) {
        <em class="invalid-feedback">Required!</em>
        }
      </fieldset>
      <button hlmBtn>submit</button>
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
