import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { showFileBlock } from '../../../../util/show-file-block.util';
import { fileBlock } from '../../../../util/file-block.util';
import { BlockNoteAngularService } from '../../../../services/block-note-angular.service';
import { HlmButtonDirective } from '../../../../ui/ui-button-helm/hlm-button.directive';
import { HlmIconComponent } from '../../../../ui/ui-icon-helm/hlm-icon.component';
import { provideIcons } from '@ng-icons/core';
import { lucideDownload } from '@ng-icons/lucide';

@Component({
  selector: 'bna-file-download-button',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective, HlmIconComponent],
  templateUrl: './bna-file-download-button.component.html',
  styleUrl: './bna-file-download-button.component.css',
  providers: [provideIcons({ lucideDownload })],
  host: {
    '[class]': '_visibilityClass()',
  },
})
export class BnaFileDownloadButtonComponent {
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

  downloadFile() {
    const editor = this.blockNoteAngularService.editor();
    const fileBlock = this.fileBlock();
    if (fileBlock && fileBlock.props.url) {
      editor.focus();
      editor
        .resolveFileUrl(fileBlock.props.url)
        .then((downloadUrl) => window.open(downloadUrl));
    }
  }
}
