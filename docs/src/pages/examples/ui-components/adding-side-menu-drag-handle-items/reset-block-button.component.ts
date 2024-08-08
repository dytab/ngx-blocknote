import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { Block } from '@blocknote/core';
import { BlockNoteAngularService } from '@dytab/block-note-angular';
import { provideIcons } from '@ng-icons/core';
import { lucideTrash } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

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
    if (!editor || !this.block) {
      return;
    }
    this.blockNoteAngularService
      .editor()!
      .updateBlock(this.block, { type: 'paragraph' });
  }
}
