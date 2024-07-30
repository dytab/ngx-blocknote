import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Block } from '@blocknote/core';
import { BnaEditorComponent } from '@dytab/block-note-angular';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BnaEditorComponent,
    HlmButtonDirective,
  ],
  templateUrl: './basic-minimal.component.html',
  styleUrl: './basic-minimal.component.css',
})
export class BasicMinimal {
  constructor(private formBuilder: NonNullableFormBuilder) {}

  form = this.formBuilder.group({
    editor: this.formBuilder.control<Block[] | undefined>(
      undefined,
      Validators.required
    ),
  });

  get control() {
    return this.form.controls.editor;
  }

  submit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;

    console.log('submitted', this.form.value);
  }
}
