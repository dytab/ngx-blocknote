import { Component, inject, computed } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideExternalLink } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { NgxBlocknoteService } from '../../../../services';
import { sanitizeUrl } from '../../../../util/sanitize-url.util';

@Component({
  selector: 'bna-open-link',
  imports: [HlmButton, NgIcon, HlmIcon],
  templateUrl: './bna-open-link.component.html',
  providers: [
    provideIcons({
      lucideExternalLink,
    }),
  ],
})
export class BnaOpenLinkComponent {
  private ngxBlockNoteService = inject(NgxBlocknoteService);

  readonly dict = computed(() => this.ngxBlockNoteService.editor()!.dictionary);

  url?: string;
  constructor() {
    this.ngxBlockNoteService.editor()!.linkToolbar.onUpdate((linkToolbar) => {
      this.url = linkToolbar.url;
    });
  }

  goToUrl() {
    if (!this.url) {
      return;
    }
    const safeUrl = sanitizeUrl(this.url, window.location.href);
    window.open(safeUrl, '_blank');
  }
}
