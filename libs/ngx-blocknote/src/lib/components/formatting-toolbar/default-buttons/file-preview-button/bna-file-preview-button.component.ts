import { NgIcon } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideImagePlus } from '@ng-icons/lucide';
import { BrnTooltipContentDirective } from '@spartan-ng/brain/tooltip';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
import {
  HlmButtonDirective,
  HlmIconDirective,
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '../../../../ui';
import { fileBlock } from '../../../../util/file-block.util';
import { showFileBlock } from '../../../../util/show-file-block.util';

@Component({
  selector: 'bna-file-preview-button',
  imports: [
    CommonModule,
    HlmButtonDirective,
    NgIcon,
    HlmIconDirective,
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
    BrnTooltipContentDirective,
  ],
  templateUrl: './bna-file-preview-button.component.html',
  styleUrl: './bna-file-preview-button.component.css',
  providers: [provideIcons({ lucideImagePlus })],
  host: {
    '[class]': '_visibilityClass()',
  },
})
export class BnaFilePreviewButtonComponent {
  fileBlock = computed(() => {
    return fileBlock(
      this.ngxBlockNoteService.editor(),
      this.ngxBlockNoteService.selectedBlocks(),
    );
  });
  _visibilityClass = computed(() => {
    return showFileBlock(this.ngxBlockNoteService.editor(), this.fileBlock());
  });
  dict = this.ngxBlockNoteService.editor().dictionary;

  constructor(private ngxBlockNoteService: NgxBlocknoteService) {}

  togglePreview() {
    const editor = this.ngxBlockNoteService.editor();
    const fileBlock = this.fileBlock();
    if (!fileBlock) {
      return;
    }
    editor.updateBlock(fileBlock, {
      props: {
        showPreview: !fileBlock.props.showPreview,
      },
    });
    editor.focus();
  }
}
