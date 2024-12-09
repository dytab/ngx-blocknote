import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideDownload } from '@ng-icons/lucide';
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
import {
  HlmButtonDirective,
  HlmIconComponent,
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '../../../../ui';
import { fileBlock } from '../../../../util/file-block.util';
import { showFileBlock } from '../../../../util/show-file-block.util';

@Component({
  selector: 'bna-file-download-button',
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
      this.ngxBlockNoteService.editor(),
      this.ngxBlockNoteService.selectedBlocks(),
    );
  });
  _visibilityClass = computed(() => {
    return showFileBlock(this.ngxBlockNoteService.editor(), this.fileBlock());
  });
  tooltip = computed(() => {
    const fileBlock = this.fileBlock();
    if (!fileBlock) {
      return '';
    }
    return this.ngxBlockNoteService.editor().dictionary.formatting_toolbar
      .file_download.tooltip[fileBlock.type];
  });

  constructor(private ngxBlockNoteService: NgxBlocknoteService) {}

  downloadFile() {
    const editor = this.ngxBlockNoteService.editor();
    const fileBlock = this.fileBlock();
    if (fileBlock && fileBlock.props.url) {
      editor.focus();
      editor
        .resolveFileUrl(fileBlock.props.url)
        .then((downloadUrl) => window.open(downloadUrl));
    }
  }
}
