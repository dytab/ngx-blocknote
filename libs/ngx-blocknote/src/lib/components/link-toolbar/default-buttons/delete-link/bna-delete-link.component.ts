import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideUnlink } from '@ng-icons/lucide';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
import { HlmButtonDirective, HlmIconComponent } from '../../../../ui';

@Component({
  selector: 'bna-delete-link',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective, HlmIconComponent],
  templateUrl: './bna-delete-link.component.html',
  styleUrl: './bna-delete-link.component.css',
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
