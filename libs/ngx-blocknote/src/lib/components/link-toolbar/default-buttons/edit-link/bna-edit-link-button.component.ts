import { Component, inject } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
} from '@spartan-ng/ui-menu-helm';
import { NgxBlocknoteService } from '../../../../services';
import { BnaLinkFormComponent } from '../../link-form/bna-link-form.component';

@Component({
  selector: 'bna-edit-link-button',
  imports: [
    BnaLinkFormComponent,
    HlmButtonDirective,
    HlmMenuComponent,
    BrnMenuTriggerDirective,
    HlmMenuGroupComponent,
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
