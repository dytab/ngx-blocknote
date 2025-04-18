
import { Component, effect, inject } from '@angular/core';
import { Block } from '@blocknote/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { NgxBlocknoteService } from '../../../../../services/ngx-blocknote.service';
import { useSelectedBlocks } from '../../../../../util/use-selected-blocks';

@Component({
  selector: 'bna-delete-block-item',
  imports: [HlmButtonDirective],
  templateUrl: './bna-delete-block-item.component.html',
  styleUrl: './bna-delete-block-item.component.css',
  host: {
    class: 'block',
  },
})
export class BnaDeleteBlockItemComponent {
  ngxBlockNoteService = inject(NgxBlocknoteService);

  dragBlock?: Block<any, any, any>;

  constructor() {
    const ngxBlockNoteService = this.ngxBlockNoteService;

    effect(() => {
      const editor = ngxBlockNoteService.editor();
      if (!editor) {
        return;
      }
      editor.sideMenu.onUpdate((state) => {
        this.dragBlock = state.block;
      });
    });
  }

  deleteBlock() {
    const editor = this.ngxBlockNoteService.editor();
    const sideMenuFocusedBlock =
      this.ngxBlockNoteService.sideMenuFocusedBlock();
    let selectedBlocks = useSelectedBlocks(editor);
    if (
      sideMenuFocusedBlock &&
      selectedBlocks.find((block) => block.id === sideMenuFocusedBlock.id) ===
        undefined
    ) {
      //the current block where the side menu is opened is not in selection, then use this instead of selection
      selectedBlocks = [sideMenuFocusedBlock as Block];
    }
    editor.removeBlocks(selectedBlocks);
    editor.focus();
    editor.sideMenu.unfreezeMenu();
  }
}
