import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { showFileBlock } from '../../../../util/show-file-block.util';
import { fileBlock } from '../../../../util/file-block.util';
import { BlockNoteAngularService } from '../../../../services/block-note-angular.service';
import {
  HlmButtonDirective,
  HlmIconComponent,
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '../../../../ui';
import { provideIcons } from '@ng-icons/core';
import { lucideDownload } from '@ng-icons/lucide';
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';

@Component({
  selector: 'bna-file-download-button',
  standalone: true,
  imports: [
    CommonModule,
    HlmButtonDirective,
    HlmIconComponent,
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
    BrnTooltipContentDirective,
  ],
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
  tooltip = computed(() => {
    const fileBlock = this.fileBlock();
    if (!fileBlock) {
      return '';
    }
    return this.blockNoteAngularService.editor().dictionary.formatting_toolbar
      .file_download.tooltip[fileBlock.type];
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
