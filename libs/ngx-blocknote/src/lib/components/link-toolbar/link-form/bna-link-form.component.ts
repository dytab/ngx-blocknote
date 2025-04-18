import { CommonModule } from '@angular/common';
import { Component, OnChanges, input, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLink, lucideType } from '@ng-icons/lucide';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { NgxBlocknoteService } from '../../../services';

@Component({
  selector: 'bna-link-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIcon,
    HlmIconDirective,
  ],
  templateUrl: './bna-link-form.component.html',
  styleUrl: './bna-link-form.component.css',
  providers: [
    provideIcons({
      lucideLink,
      lucideType,
    }),
  ],
})
export class BnaLinkFormComponent implements OnChanges {
  private formBuilder = inject(FormBuilder);
  private ngxBlockNoteService = inject(NgxBlocknoteService);

  readonly initialValue = input<Partial<{
    url: string;
    text: string;
}>>({});
  form = this.formBuilder.group({
    url: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
  });

  ngOnChanges() {
    this.form.patchValue(this.initialValue());
  }

  submit() {
    const editor = this.ngxBlockNoteService.editor();
    if (this.form.invalid) {
      return;
    }
    const formValue = this.form.value as { url: string; text: string };
    editor.createLink(formValue.url, formValue.text);
    editor.focus();
  }
}
