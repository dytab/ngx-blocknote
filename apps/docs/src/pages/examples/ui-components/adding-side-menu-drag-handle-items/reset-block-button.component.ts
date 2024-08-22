import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { Block } from '@blocknote/core';
import {
  BlockNoteAngularService,
} from '@dytab/ngx-blocknote';
import { provideIcons } from '@ng-icons/core';
import { lucideTrash } from '@ng-icons/lucide';
import { HlmButtonDirective, HlmIconComponent } from '@dytab/ui';

@Component({
  selector: 'bna-reset-block-button',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective, HlmIconComponent],
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
  constructor(public blockNoteAngularService: BlockNoteAngularService) {
    effect(() => {
      const editor = blockNoteAngularService.editor();
      if (!editor) {
        return;
      }
      editor.sideMenu.onUpdate((state) => {
        this.block = state.block;
      });
    });
  }

  resetBlock() {
    const editor = this.blockNoteAngularService.editor();
    if (!this.block) {
      return;
    }
    editor.updateBlock(this.block, { type: 'paragraph' });
    editor.focus();
  }
}
