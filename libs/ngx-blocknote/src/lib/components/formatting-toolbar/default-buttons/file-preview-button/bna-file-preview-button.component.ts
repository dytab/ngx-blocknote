
import { Component, computed, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
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
    HlmButtonDirective,
    NgIcon,
    HlmIconDirective,
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
    BrnTooltipContentDirective
],
  templateUrl: './bna-file-preview-button.component.html',
  providers: [provideIcons({ lucideImagePlus })],
  host: {
    '[class]': '_visibilityClass()',
  },
})
export class BnaFilePreviewButtonComponent {
  private ngxBlockNoteService = inject(NgxBlocknoteService);

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
