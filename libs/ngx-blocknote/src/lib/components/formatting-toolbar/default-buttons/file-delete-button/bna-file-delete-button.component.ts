import { Component, computed, inject } from '@angular/core';
import {
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
} from '@blocknote/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTrash } from '@ng-icons/lucide';
import { BrnTooltipContentTemplate } from '@spartan-ng/brain/tooltip';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmTooltip, HlmTooltipTrigger } from '@spartan-ng/helm/tooltip';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
import { fileBlock } from '../../../../util/file-block.util';
import { showFileBlock } from '../../../../util/show-file-block.util';

@Component({
  selector: 'bna-file-delete-button',
  imports: [
    HlmButton,
    HlmTooltip,
    HlmTooltipTrigger,
    BrnTooltipContentTemplate,
    NgIcon,
    HlmIcon,
  ],
  templateUrl: './bna-file-delete-button.component.html',
  providers: [provideIcons({ lucideTrash })],
  host: {
    '[class]': '_visibilityClass()',
  },
})
export class BnaFileDeleteButtonComponent {
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
    return fileBlock(editor, this.ngxBlockNoteService.selectedBlocks());
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
      .file_delete.tooltip[fileBlock.type];
  });

  deleteFile() {
    const editor = this.ngxBlockNoteService.editor();
    if (!editor) return;
    const fileBlock = this.fileBlock();
    if (!fileBlock) {
      return;
    }
    editor.focus();
    editor.removeBlocks([fileBlock]);
  }
}
