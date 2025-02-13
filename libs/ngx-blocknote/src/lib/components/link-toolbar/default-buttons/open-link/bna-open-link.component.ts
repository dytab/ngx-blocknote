import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideExternalLink } from '@ng-icons/lucide';
import { NgxBlocknoteService } from '../../../../services';
import { HlmButtonDirective, HlmIconComponent } from '../../../../ui';

@Component({
  selector: 'bna-open-link',
  imports: [CommonModule, HlmButtonDirective, HlmIconComponent],
  templateUrl: './bna-open-link.component.html',
  styleUrl: './bna-open-link.component.css',
  providers: [
    provideIcons({
      lucideExternalLink,
    }),
  ],
})
export class BnaOpenLinkComponent {
  url?: string;
  constructor(private ngxBlockNoteService: NgxBlocknoteService) {
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
