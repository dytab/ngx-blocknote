import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { showFileBlock } from '../../../../util/show-file-block.util';
import { BlockNoteAngularService } from '../../../../services/block-note-angular.service';
import { fileBlock } from '../../../../util/file-block.util';
import {
  HlmButtonDirective,
  HlmIconComponent,
  HlmMenuComponent,
  HlmMenuGroupComponent, HlmTooltipComponent, HlmTooltipTriggerDirective
} from '../../../../ui';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { ReactiveFormsModule } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { lucideImage } from '@ng-icons/lucide';
import { BnaFilePanelComponent } from '../../../file-panel/bna-file-panel.component';
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';

@Component({
  selector: 'bna-file-replace-button',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HlmButtonDirective,
    BrnMenuTriggerDirective,
    HlmIconComponent,
    HlmMenuGroupComponent,
    HlmMenuComponent,
    BnaFilePanelComponent,
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
    BrnTooltipContentDirective,
  ],
  templateUrl: './bna-file-replace-button.component.html',
  styleUrl: './bna-file-replace-button.component.css',
  providers: [provideIcons({ lucideImage })],
  host: {
    '[class]': '_visibilityClass()',
  },
})
export class BnaFileReplaceButtonComponent {
  fileBlock = computed(() => {
    const editor = this.blockNoteAngularService.editor();
    const selectedBlocks = this.blockNoteAngularService.selectedBlocks();
    return fileBlock(editor, selectedBlocks);
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
      .file_replace.tooltip[fileBlock.type];
  });

  constructor(private blockNoteAngularService: BlockNoteAngularService) {}
}
