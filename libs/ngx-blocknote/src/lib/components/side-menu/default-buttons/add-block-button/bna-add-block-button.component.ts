import { NgIcon } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
import { HlmButtonDirective, HlmIconDirective } from '../../../../ui';

@Component({
  selector: 'bna-add-block-btn',
  imports: [CommonModule, HlmButtonDirective, NgIcon, HlmIconDirective],
  templateUrl: './bna-add-block-button.component.html',
  styleUrl: './bna-add-block-button.component.css',
  providers: [provideIcons({ lucidePlus })],
})
export class BnaAddBlockButtonComponent {
  constructor(public ngxBlockNoteService: NgxBlocknoteService) {}

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
