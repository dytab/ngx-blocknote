import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Block, PartialBlock } from '@blocknote/core';
import { BnaEditorComponent } from '@dytab/ngx-blocknote';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  selector: 'bna-form-example',
  imports: [CommonModule, BnaEditorComponent, HlmButton, ReactiveFormsModule],
  template: `
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
    <bna-editor [formControl]="form.controls.editor" />
    <p>Form Value (JSON)</p>
    <div
      class="border border-black bg-background rounded min-h-20 w-full p-2 max-h-[400px] overflow-auto"
    >
      <pre><code>{{ form.value | json}}</code></pre>
    </div>
  `,
})
export class FormExample {
  private formBuilder = inject(FormBuilder);

  editorContent!: Block[];
  form = this.formBuilder.group({
    editor: new FormControl<Block[] | PartialBlock[]>([
      {
        type: 'paragraph',
        content: [
          'Hello, ',
          {
            type: 'text',
            text: 'world!',
            styles: {
              bold: true,
            },
          },
        ],
      },
    ]),
  });

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

export const basicSetupExampleCode = `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Block, PartialBlock } from '@blocknote/core';
import { BnaEditorComponent } from '@dytab/ngx-blocknote';

@Component({
  selector: 'bna-form-example',
  standalone: true,
  imports: [
    CommonModule,
    BnaEditorComponent,
    HlmButton,
    ReactiveFormsModule,
  ],
  template: \`
    <button type="button" hlmBtn (click)="patchFormValue()">
      Patch Value
    </button>
    <bna-editor [formControl]="form.controls.editor" />
    <p>Form Value (JSON)</p>
    <div
      class="border border-black bg-background rounded min-h-20 w-full p-2 max-h-[400px] overflow-auto"
    >
      <pre><code>{{ form.value | json}}</code></pre>
    </div>
  \`,
})
export class FormExample {
  editorContent!: Block[];
  form = this.formBuilder.group({
    editor: new FormControl<Block[] | PartialBlock[]>([
      {
        type: 'paragraph',
        content: [
          'Hello, ',
          {
            type: 'text',
            text: 'world!',
            styles: {
              bold: true,
            },
          },
        ],
      },
    ]),
  });

  constructor(private formBuilder: FormBuilder) {}

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
}`;
