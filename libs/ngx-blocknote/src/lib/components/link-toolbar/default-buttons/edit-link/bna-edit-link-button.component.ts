import { Component, inject } from '@angular/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { BrnMenuTrigger } from '@spartan-ng/brain/menu';
import { HlmMenu, HlmMenuGroup } from '@spartan-ng/helm/menu';
import { NgxBlocknoteService } from '../../../../services';
import { BnaLinkFormComponent } from '../../link-form/bna-link-form.component';

@Component({
  selector: 'bna-edit-link-button',
  imports: [
    BnaLinkFormComponent,
    HlmButton,
    HlmMenu,
    BrnMenuTrigger,
    HlmMenuGroup,
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
