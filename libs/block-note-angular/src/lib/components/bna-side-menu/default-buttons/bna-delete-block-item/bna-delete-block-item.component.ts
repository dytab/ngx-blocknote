import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { Block } from '@blocknote/core';
import { BlockNoteAngularService } from '@dytab/block-note-angular';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmMenuItemDirective } from '@spartan-ng/ui-menu-helm';

@Component({
  selector: 'bna-delete-block-item',
  standalone: true,
  imports: [CommonModule, HlmMenuItemDirective, HlmButtonDirective],
  templateUrl: './bna-delete-block-item.component.html',
  styleUrl: './bna-delete-block-item.component.css',
  host: {
    class: 'block',
  },
})
export class BnaDeleteBlockItemComponent {
  dragBlock?: Block<any, any, any>;

  constructor(public blockNoteAngularService: BlockNoteAngularService) {
    effect(() => {
      const editor = blockNoteAngularService.editor();
      if (!editor) {
        return;
      }
      editor.sideMenu.onUpdate((state) => {
        this.dragBlock = state.block;
      });
    });
  }

  deleteBlock() {
    const editor = this.blockNoteAngularService.editor();
    if (!editor) {
      return;
    }
    console.log('delete block');
    // console.log('delete block', this.selectedBlocks);
    // editor.removeBlocks(this.selectedBlocks);
    // editor.sideMenu.unfreezeMenu();
  }
}
