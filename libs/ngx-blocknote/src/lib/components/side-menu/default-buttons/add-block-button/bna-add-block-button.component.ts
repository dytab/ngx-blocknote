import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
import { HlmButtonDirective, HlmIconComponent } from '../../../../ui';

@Component({
  selector: 'bna-add-block-btn',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective, HlmIconComponent],
  templateUrl: './bna-add-block-button.component.html',
  styleUrl: './bna-add-block-button.component.css',
  providers: [provideIcons({ lucidePlus })],
})
export class BnaAddBlockButtonComponent {
  constructor(public ngxBlockNoteService: NgxBlocknoteService) {}

  addNewBlock() {
    const currentBlock = this.ngxBlockNoteService.editor().getTextCursorPosition().block;
    this.ngxBlockNoteService.editor().insertBlocks([{
      type: "paragraph",
    }], currentBlock, "after");
  }
}
