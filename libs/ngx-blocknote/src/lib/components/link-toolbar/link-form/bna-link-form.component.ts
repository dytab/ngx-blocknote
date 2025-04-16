import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLink, lucideType } from '@ng-icons/lucide';
import { NgxBlocknoteService } from '../../../services';
import { HlmIconDirective } from '../../../ui';

@Component({
  selector: 'bna-link-form',
  imports: [
    CommonModule,
    NgIcon,
    HlmIconDirective,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './bna-link-form.component.html',
  providers: [
    provideIcons({
      lucideLink,
      lucideType,
    }),
  ],
})
export class BnaLinkFormComponent implements OnChanges {
  @Input() initialValue: Partial<{ url: string; text: string }> = {};
  form = this.formBuilder.group({
    url: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private ngxBlockNoteService: NgxBlocknoteService,
  ) {}

  ngOnChanges() {
    this.form.patchValue(this.initialValue);
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
