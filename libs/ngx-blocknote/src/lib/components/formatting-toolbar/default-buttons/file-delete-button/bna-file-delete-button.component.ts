import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '../../../../ui/ui-button-helm/hlm-button.directive';
import { HlmIconComponent } from '../../../../ui/ui-icon-helm/hlm-icon.component';
import { BlockNoteAngularService } from '../../../../services/block-note-angular.service';
import { provideIcons } from '@ng-icons/core';
import { lucideTrash } from '@ng-icons/lucide';
import { fileBlock } from '../../../../util/file-block.util';
import { showFileBlock } from '../../../../util/show-file-block.util';

@Component({
  selector: 'bna-file-delete-button',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective, HlmIconComponent],
  templateUrl: './bna-file-delete-button.component.html',
  styleUrl: './bna-file-delete-button.component.css',
  providers: [provideIcons({ lucideTrash })],
  host: {
    '[class]': '_visibilityClass()',
  },
})
export class BnaFileDeleteButtonComponent {
  fileBlock = computed(() => {
    return fileBlock(
      this.blockNoteAngularService.editor(),
      this.blockNoteAngularService.selectedBlocks()
    );
  });

  _visibilityClass = computed(() => {
    return showFileBlock(
      this.blockNoteAngularService.editor(),
      this.fileBlock()
    );
  });

  constructor(private blockNoteAngularService: BlockNoteAngularService) {}

  deleteFile() {
    const editor = this.blockNoteAngularService.editor();
    const fileBlock = this.fileBlock();
    if (!fileBlock) {
      return;
    }
    editor.removeBlocks([fileBlock]);
    editor.focus();
  }
}
