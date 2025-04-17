
import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideUnlink } from '@ng-icons/lucide';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
import { HlmButtonDirective, HlmIconDirective } from '../../../../ui';

@Component({
  selector: 'bna-delete-link',
  imports: [HlmButtonDirective, NgIcon, HlmIconDirective],
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
    this.ngxBlockNoteService.editor().linkToolbar.deleteLink();
  }
}
