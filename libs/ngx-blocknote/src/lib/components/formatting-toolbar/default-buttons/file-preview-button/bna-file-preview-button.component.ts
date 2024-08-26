import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockNoteAngularService } from '../../../../services/block-note-angular.service';
import { showFileBlock } from '../../../../util/show-file-block.util';
import { fileBlock } from '../../../../util/file-block.util';
import {
  HlmButtonDirective,
  HlmIconComponent,
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '../../../../ui';
import { lucideImagePlus } from '@ng-icons/lucide';
import { provideIcons } from '@ng-icons/core';
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';

@Component({
  selector: 'bna-file-preview-button',
  standalone: true,
  imports: [
    CommonModule,
    HlmButtonDirective,
    HlmIconComponent,
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
  dict = this.blockNoteAngularService.editor().dictionary;


  constructor(private blockNoteAngularService: BlockNoteAngularService) {}

  togglePreview() {
    const editor = this.blockNoteAngularService.editor();
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
