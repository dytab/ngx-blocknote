import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
} from '@spartan-ng/ui-menu-helm';
import { NgxBlocknoteService } from '../../../../services';
import { BnaLinkFormComponent } from '../../link-form/bna-link-form.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'bna-edit-link-button',
  imports: [
    CommonModule,
    BnaLinkFormComponent,
    HlmButtonDirective,
    HlmMenuComponent,
    BrnMenuTriggerDirective,
    HlmMenuGroupComponent,
  ],
  templateUrl: './bna-edit-link-button.component.html',
  styleUrl: './bna-edit-link-button.component.css',
})
export class BnaEditLinkButtonComponent {
  initialValue: Partial<{ text: string; url: string }> = {};

  constructor(private ngxBlockNoteService: NgxBlocknoteService) {
    this.ngxBlockNoteService.editor().linkToolbar.onUpdate((linkToolbar) => {
      this.initialValue = { text: linkToolbar.text, url: linkToolbar.url };
    });
  }
}
