import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideUnlink } from '@ng-icons/lucide';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
import { HlmButtonDirective, HlmIconDirective } from '../../../../ui';

@Component({
  selector: 'bna-delete-link',
  imports: [CommonModule, HlmButtonDirective, NgIcon, HlmIconDirective],
  templateUrl: './bna-delete-link.component.html',
  providers: [
    provideIcons({
      lucideUnlink,
    }),
  ],
})
export class BnaDeleteLinkComponent {
  constructor(private ngxBlockNoteService: NgxBlocknoteService) {}

  unlink() {
    this.ngxBlockNoteService.editor().linkToolbar.deleteLink();
  }
}
