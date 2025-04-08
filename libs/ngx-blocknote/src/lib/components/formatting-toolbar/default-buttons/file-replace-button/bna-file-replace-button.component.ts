import { NgIcon } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { lucideImage } from '@ng-icons/lucide';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { BrnTooltipContentDirective } from '@spartan-ng/brain/tooltip';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
import {
  HlmButtonDirective,
  HlmIconDirective,
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '../../../../ui';
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
    NgIcon,
    HlmIconDirective,
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
