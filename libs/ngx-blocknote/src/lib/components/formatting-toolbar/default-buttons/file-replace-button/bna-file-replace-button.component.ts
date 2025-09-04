import { Component, computed, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
} from '@blocknote/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideImage } from '@ng-icons/lucide';
import { BrnMenuTrigger } from '@spartan-ng/brain/menu';
import { BrnTooltipContentTemplate } from '@spartan-ng/brain/tooltip';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmMenu, HlmMenuGroup } from '@spartan-ng/helm/menu';
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
    BrnMenuTrigger,
    HlmMenuGroup,
    HlmMenu,
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
    if (!editor) return null;
    return fileBlock(editor, selectedBlocks);
  });
  _visibilityClass = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    const file = this.fileBlock();
    if (!editor || !file) return 'hidden';
    return showFileBlock(editor, file);
  });
  tooltip = computed(() => {
    const fileBlock = this.fileBlock();
    const editor = this.ngxBlockNoteService.editor();
    if (!fileBlock || !editor) {
      return '';
    }
    return editor.dictionary.formatting_toolbar.file_replace.tooltip[
      fileBlock.type
    ];
  });
}
