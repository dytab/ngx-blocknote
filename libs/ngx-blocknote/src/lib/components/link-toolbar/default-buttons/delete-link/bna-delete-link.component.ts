import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideUnlink } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';

@Component({
  selector: 'bna-delete-link',
  imports: [CommonModule, HlmButtonDirective, NgIcon, HlmIconDirective],
  templateUrl: './bna-delete-link.component.html',
  styleUrl: './bna-delete-link.component.css',
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
