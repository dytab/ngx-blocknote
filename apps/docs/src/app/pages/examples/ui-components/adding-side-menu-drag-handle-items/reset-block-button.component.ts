
import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { Block } from '@blocknote/core';
import { NgxBlocknoteService } from '@dytab/ngx-blocknote';
import { HlmButtonDirective } from '@dytab/ui';
import { provideIcons } from '@ng-icons/core';
import { lucideTrash } from '@ng-icons/lucide';

@Component({
  selector: 'bna-reset-block-button',
  imports: [CommonModule, HlmButtonDirective],
  providers: [provideIcons({ lucideTrash })],
  template: ` <button
    hlmBtn
    size="sm"
    class="w-full justify-start"
    variant="ghost"
    (click)="resetBlock()"
  >
    Reset Block
  </button>`,
  styles: ``,
})
export class ResetBlockButtonComponent {
  block?: Block;
  constructor(public ngxBlockNoteService: NgxBlocknoteService) {
    effect(() => {
      const editor = ngxBlockNoteService.editor();
      if (!editor) {
        return;
      }
      editor.sideMenu.onUpdate((state) => {
        this.block = state.block;
      });
    });
  }

  resetBlock() {
    const editor = this.ngxBlockNoteService.editor();
    if (!this.block) {
      return;
    }
    editor.updateBlock(this.block, { type: 'paragraph' });
    editor.focus();
  }
}
