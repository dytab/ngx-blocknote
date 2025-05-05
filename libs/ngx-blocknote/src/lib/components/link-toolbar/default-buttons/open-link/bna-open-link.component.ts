import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideExternalLink } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { NgxBlocknoteService } from '../../../../services';

@Component({
  selector: 'bna-open-link',
  imports: [HlmButtonDirective, NgIcon, HlmIconDirective],
  templateUrl: './bna-open-link.component.html',
  providers: [
    provideIcons({
      lucideExternalLink,
    }),
  ],
})
export class BnaOpenLinkComponent {
  private ngxBlockNoteService = inject(NgxBlocknoteService);

  url?: string;
  constructor() {
    this.ngxBlockNoteService.editor().linkToolbar.onUpdate((linkToolbar) => {
      this.url = linkToolbar.url;
    });
  }

  goToUrl() {
    if (!this.url) {
      return;
    }
    window.open(this.url, '_blank');
  }
}
