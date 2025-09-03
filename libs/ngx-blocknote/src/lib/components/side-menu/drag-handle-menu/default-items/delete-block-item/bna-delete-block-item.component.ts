import { Component, effect, inject, computed } from '@angular/core';
import {
  Block,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
} from '@blocknote/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { NgxBlocknoteService } from '../../../../../services/ngx-blocknote.service';
import { useSelectedBlocks } from '../../../../../util/use-selected-blocks';

@Component({
  selector: 'bna-delete-block-item',
  imports: [HlmButton],
  templateUrl: './bna-delete-block-item.component.html',
  host: {
    class: 'block',
  },
})
export class BnaDeleteBlockItemComponent {
  private ngxBlockNoteService = inject(
    NgxBlocknoteService<
      DefaultBlockSchema,
      DefaultInlineContentSchema,
      DefaultStyleSchema
    >,
  );

  dict = computed(() => this.ngxBlockNoteService.editor().dictionary);

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
      selectedBlocks = [sideMenuFocusedBlock];
    }
    editor.removeBlocks(selectedBlocks);
    editor.focus();
    editor.sideMenu.unfreezeMenu();
  }
}
