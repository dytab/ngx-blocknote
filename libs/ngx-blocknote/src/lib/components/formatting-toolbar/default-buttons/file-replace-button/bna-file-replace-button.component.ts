import { Component, computed, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
} from '@blocknote/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideImage } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';

import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { BrnTooltipContentTemplate } from '@spartan-ng/brain/tooltip';
import { HlmTooltip, HlmTooltipTrigger } from '@spartan-ng/helm/tooltip';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
import { fileBlock } from '../../../../util/file-block.util';
import { showFileBlock } from '../../../../util/show-file-block.util';
import { BnaFilePanelComponent } from '../../../file-panel/bna-file-panel.component';

@Component({
  selector: 'bna-file-replace-button',
  imports: [
    ReactiveFormsModule,
    HlmButton,
    HlmDropdownMenuImports,
    BnaFilePanelComponent,
    HlmTooltip,
    HlmTooltipTrigger,
    BrnTooltipContentTemplate,
    NgIcon,
    HlmIcon,
  ],
  templateUrl: './bna-file-replace-button.component.html',
  providers: [provideIcons({ lucideImage })],
  host: {
    '[class]': '_visibilityClass()',
  },
})
export class BnaFileReplaceButtonComponent {
  private ngxBlockNoteService = inject(
    NgxBlocknoteService<
      DefaultBlockSchema,
      DefaultInlineContentSchema,
      DefaultStyleSchema
    >,
  );

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
}
