import { Component, effect } from '@angular/core';
import { Block } from '@blocknote/core';
import { NgxBlocknoteService } from '@dytab/ngx-blocknote';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTrash } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'bna-remove-block-button',
  imports: [HlmButtonDirective, NgIcon, HlmIconDirective],
  providers: [provideIcons({ lucideTrash })],
  template: ` <button hlmBtn size="xs" variant="ghost" (click)="deleteBlock()">
    <ng-icon hlm size="xs" name="lucideTrash" />
  </button>`,
  styles: ``,
})
export class RemoveBlockButtonComponent {
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

  deleteBlock() {
    const editor = this.ngxBlockNoteService.editor();
    if (!editor || !this.block) {
      return;
    }
    this.ngxBlockNoteService.editor()!.removeBlocks([this.block]);
  }
}
