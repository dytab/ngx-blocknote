import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideUnlink } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';

@Component({
  selector: 'bna-delete-link',
  imports: [HlmButton, NgIcon, HlmIcon],
  templateUrl: './bna-delete-link.component.html',
  providers: [
    provideIcons({
      lucideUnlink,
    }),
  ],
})
export class BnaDeleteLinkComponent {
  private ngxBlockNoteService = inject(NgxBlocknoteService);

  unlink() {
    const editor = this.ngxBlockNoteService.editor();
    if (!editor) {
      return;
    }
    editor.linkToolbar.deleteLink();
  }
}
