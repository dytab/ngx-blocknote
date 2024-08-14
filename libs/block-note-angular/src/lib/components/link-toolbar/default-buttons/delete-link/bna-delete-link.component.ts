import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideUnlink } from '@ng-icons/lucide';
import { BlockNoteAngularService } from '../../../../services/block-note-angular.service';
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
  constructor(private blockNoteAngularService: BlockNoteAngularService) {}

  unlink() {
    this.blockNoteAngularService.editor().linkToolbar.deleteLink();
  }
}
