import { NgIcon } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideTrash } from '@ng-icons/lucide';
import { BrnTooltipContentDirective } from '@spartan-ng/brain/tooltip';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
import {
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '../../../../ui';
import { HlmButtonDirective } from '../../../../ui/ui-button-helm/hlm-button.directive';
import { HlmIconDirective } from '../../../../ui/ui-icon-helm/hlm-icon.component';
import { fileBlock } from '../../../../util/file-block.util';
import { showFileBlock } from '../../../../util/show-file-block.util';

@Component({
  selector: 'bna-file-delete-button',
  imports: [
    CommonModule,
    HlmButtonDirective,
    NgIcon,
    HlmIconDirective,
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
    BrnTooltipContentDirective,
  ],
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
      .file_delete.tooltip[fileBlock.type];
  });

  constructor(private ngxBlockNoteService: NgxBlocknoteService) {}

  deleteFile() {
    const editor = this.ngxBlockNoteService.editor();
    const fileBlock = this.fileBlock();
    if (!fileBlock) {
      return;
    }
    editor.focus();
    editor.removeBlocks([fileBlock]);
  }
}
