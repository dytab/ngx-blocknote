import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';

@Component({
  selector: 'bna-add-block-btn',
  imports: [HlmButton, NgIcon, HlmIcon],
  templateUrl: './bna-add-block-button.component.html',
  providers: [provideIcons({ lucidePlus })],
})
export class BnaAddBlockButtonComponent {
  ngxBlockNoteService = inject(NgxBlocknoteService);

  addNewBlock() {
    const editor = this.ngxBlockNoteService.editor();
    const currentBlock = this.ngxBlockNoteService.sideMenuFocusedBlock();
    if (!currentBlock) return;
    const insertedBlock = this.ngxBlockNoteService.editor().insertBlocks(
      [
        {
          type: 'paragraph',
        },
      ],
      currentBlock,
      'after',
    )[0];
    editor.setTextCursorPosition(insertedBlock);
    editor.openSuggestionMenu('/');
  }
}
