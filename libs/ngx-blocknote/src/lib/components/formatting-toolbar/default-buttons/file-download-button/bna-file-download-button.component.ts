import { Component, computed, inject } from '@angular/core';
import {
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
} from '@blocknote/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideDownload } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmTooltip, HlmTooltipTrigger } from '@spartan-ng/helm/tooltip';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
import { fileBlock } from '../../../../util/file-block.util';
import { sanitizeUrl } from '../../../../util/sanitize-url.util';
import { showFileBlock } from '../../../../util/show-file-block.util';

@Component({
  selector: 'bna-file-download-button',
  imports: [HlmButton, HlmTooltip, HlmTooltipTrigger, NgIcon, HlmIcon],
  templateUrl: './bna-file-download-button.component.html',
  providers: [provideIcons({ lucideDownload })],
  host: {
    '[class]': '_visibilityClass()',
  },
})
export class BnaFileDownloadButtonComponent {
  private ngxBlockNoteService = inject(
    NgxBlocknoteService<
      DefaultBlockSchema,
      DefaultInlineContentSchema,
      DefaultStyleSchema
    >,
  );

  fileBlock = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    if (!editor) return null;
    return fileBlock<
      DefaultBlockSchema,
      DefaultInlineContentSchema,
      DefaultStyleSchema
    >(editor, this.ngxBlockNoteService.selectedBlocks());
  });
  _visibilityClass = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    const fileBlock = this.fileBlock();
    if (!editor || !fileBlock) return 'hidden';
    return showFileBlock(editor, fileBlock);
  });
  tooltip = computed(() => {
    const fileBlock = this.fileBlock();
    if (!fileBlock) {
      return '';
    }
    return this.ngxBlockNoteService.editor()!.dictionary.formatting_toolbar
      .file_download.tooltip[fileBlock.type];
  });

  downloadFile() {
    const editor = this.ngxBlockNoteService.editor();
    if (!editor) return;
    const fileBlock = this.fileBlock();
    if (fileBlock && fileBlock.props.url) {
      editor.focus();
      if (!editor.resolveFileUrl) {
        const safe = sanitizeUrl(fileBlock.props.url, window.location.href);
        window.open(safe);
      } else {
        editor
          .resolveFileUrl(fileBlock.props.url)
          .then((downloadUrl) =>
            window.open(sanitizeUrl(downloadUrl, window.location.href)),
          );
      }
    }
  }
}
