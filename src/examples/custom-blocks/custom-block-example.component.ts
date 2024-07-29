import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Block, BlockNoteEditor } from '@blocknote/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  BnaEditorComponent
} from '../../ui/block-note-editor/_component/bna-editor.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'bna-custom-block-example',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BnaEditorComponent, HlmButtonDirective],
  templateUrl: './custom-block-example.component.html',
  styleUrl: './custom-block-example.component.css',
})
export class CustomBlockExampleComponent {
  constructor(private formBuilder: NonNullableFormBuilder){}

  form = this.formBuilder.group({
    editor: this.formBuilder.control<Block[] | undefined>(
      undefined,
      Validators.required
    ),
  });

  get control() {
    return this.form.controls.editor;
  }

  submit(){
    this.form.markAllAsTouched();
    if (!this.form.valid) return;

    console.log('submitted', this.form.value);
  }
}
