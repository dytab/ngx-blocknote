import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { Block } from '@blocknote/core';
import { BlockNoteAngularService } from '../../../../../services/block-note-angular.service';
import { HlmButtonDirective, HlmMenuItemDirective } from '../../../../../ui';
import { useSelectedBlocks } from '../../../../../hooks/use-selected-blocks';

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
    const sideMenuFocusedBlock =
      this.blockNoteAngularService.sideMenuFocusedBlock();
    let selectedBlocks = useSelectedBlocks(editor)
    if (
      sideMenuFocusedBlock &&
      selectedBlocks.find((block) => block.id === sideMenuFocusedBlock.id) ===
      undefined
    ) {
      //the current block where the side menu is opened is not in selection, then use this instead of selection
      selectedBlocks = [sideMenuFocusedBlock as Block];
    }
    editor.removeBlocks(selectedBlocks);
  }
}
