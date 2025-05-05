import { Component, computed, inject } from '@angular/core';
import {
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
} from '@blocknote/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideDownload } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import {
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '@spartan-ng/ui-tooltip-helm';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
import { fileBlock } from '../../../../util/file-block.util';
import { showFileBlock } from '../../../../util/show-file-block.util';

@Component({
  selector: 'bna-file-download-button',
  imports: [
    HlmButtonDirective,
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
    NgIcon,
    HlmIconDirective,
  ],
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

  fileBlock = computed(() =>
    fileBlock<
      DefaultBlockSchema,
      DefaultInlineContentSchema,
      DefaultStyleSchema
    >(
      this.ngxBlockNoteService.editor(),
      this.ngxBlockNoteService.selectedBlocks(),
    ),
  );
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

  downloadFile() {
    const editor = this.ngxBlockNoteService.editor();
    const fileBlock = this.fileBlock();
    // TODO: check if download button is still needed when .resolveFileUrl() is undefined
    if (editor.resolveFileUrl && fileBlock && fileBlock.props.url) {
      editor.focus();
      editor
        .resolveFileUrl(fileBlock.props.url)
        .then((downloadUrl) => window.open(downloadUrl));
    }
  }
}
