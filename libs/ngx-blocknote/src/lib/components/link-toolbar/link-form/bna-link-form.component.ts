import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { lucideLink, lucideType } from '@ng-icons/lucide';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { NgxBlocknoteService } from '../../../services';
import {
  HlmIconComponent,
  HlmInputDirective,
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
} from '../../../ui';

@Component({
  selector: 'bna-link-form',
  standalone: true,
  imports: [
    CommonModule,
    HlmIconComponent,
    HlmMenuComponent,
    BrnMenuTriggerDirective,
    HlmMenuGroupComponent,
    HlmMenuItemDirective,
    HlmInputDirective,
    FormsModule,
    ReactiveFormsModule,
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
