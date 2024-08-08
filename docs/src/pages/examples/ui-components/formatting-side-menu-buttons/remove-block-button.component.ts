import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { Block } from '@blocknote/core';
import {
  BlockNoteAngularService,
  HlmButtonDirective,
  HlmIconComponent,
} from '@dytab/block-note-angular';
import { provideIcons } from '@ng-icons/core';
import { lucideTrash } from '@ng-icons/lucide';

@Component({
  selector: 'bna-remove-block-button',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective, HlmIconComponent],
  providers: [provideIcons({ lucideTrash })],
  template: ` <button hlmBtn size="xs" variant="ghost" (click)="deleteBlock()">
    <hlm-icon size="xs" name="lucideTrash" />
  </button>`,
  styles: ``,
})
export class RemoveBlockButtonComponent {
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

  deleteBlock() {
    const editor = this.blockNoteAngularService.editor();
    if (!editor || !this.block) {
      return;
    }
    this.blockNoteAngularService.editor()!.removeBlocks([this.block]);
  }
}
