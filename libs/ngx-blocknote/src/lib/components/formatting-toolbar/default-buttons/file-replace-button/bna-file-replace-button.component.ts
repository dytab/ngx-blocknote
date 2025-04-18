import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideImage } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
} from '@spartan-ng/ui-menu-helm';
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';
import {
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '@spartan-ng/ui-tooltip-helm';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
import { fileBlock } from '../../../../util/file-block.util';
import { showFileBlock } from '../../../../util/show-file-block.util';
import { BnaFilePanelComponent } from '../../../file-panel/bna-file-panel.component';

@Component({
  selector: 'bna-file-replace-button',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HlmButtonDirective,
    BrnMenuTriggerDirective,
    HlmMenuGroupComponent,
    HlmMenuComponent,
    BnaFilePanelComponent,
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
    BrnTooltipContentDirective,
    NgIcon,
    HlmIconDirective,
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
    const editor = this.ngxBlockNoteService.editor();
    const selectedBlocks = this.ngxBlockNoteService.selectedBlocks();
    return fileBlock(editor, selectedBlocks);
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
      .file_replace.tooltip[fileBlock.type];
  });

  constructor(private ngxBlockNoteService: NgxBlocknoteService) {}
}
