
import { Component, inject } from '@angular/core';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { NgxBlocknoteService } from '../../../../services';
import {
  HlmButtonDirective,
  HlmMenuComponent,
  HlmMenuGroupComponent,
} from '../../../../ui';
import { BnaLinkFormComponent } from '../../link-form/bna-link-form.component';

@Component({
  selector: 'bna-edit-link-button',
  imports: [
    BnaLinkFormComponent,
    HlmButtonDirective,
    HlmMenuComponent,
    BrnMenuTriggerDirective,
    HlmMenuGroupComponent
],
  templateUrl: './bna-edit-link-button.component.html',
})
export class BnaEditLinkButtonComponent {
  private ngxBlockNoteService = inject(NgxBlocknoteService);

  initialValue: Partial<{ text: string; url: string }> = {};

  constructor() {
    this.ngxBlockNoteService.editor().linkToolbar.onUpdate((linkToolbar) => {
      this.initialValue = { text: linkToolbar.text, url: linkToolbar.url };
    });
  }
}
