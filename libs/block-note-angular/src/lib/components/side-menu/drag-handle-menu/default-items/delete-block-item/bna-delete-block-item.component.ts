import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { Block } from '@blocknote/core';
import { BlockNoteAngularService } from '../../../../../services/block-note-angular.service';
import { HlmButtonDirective, HlmMenuItemDirective } from '../../../../../ui';

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
export class BnaDeleteBlockItemComponent implements OnInit {
  dragBlock?: Block<any, any, any>;
  selectedBlocks: Block<any, any, any>[] = [];

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

  ngOnInit() {
    const editor = this.blockNoteAngularService.editor();
    if (!editor) {
      return;
    }
    const selection = editor.getSelection();
    //Todo: create type
    // Get the blocks in the current selection and store on the state. If
    // the selection is empty, store the block containing the text cursor
    // instead.
    let selectedBlocks: Block<any, any, any>[] = [];
    if (selection !== undefined) {
      selectedBlocks = selection.blocks;
    } else {
      selectedBlocks = [editor.getTextCursorPosition().block];
    }
    if (
      this.dragBlock &&
      selectedBlocks.find(
        (selectedBlock) => this.dragBlock!.id === selectedBlock.id
      ) === undefined
    ) {
      selectedBlocks = [this.dragBlock];
    }
    this.selectedBlocks = selectedBlocks;
  }

  deleteBlock() {
    const editor = this.blockNoteAngularService.editor();
    if (!editor) {
      return;
    }
    editor.removeBlocks(this.selectedBlocks);
    editor.sideMenu.unfreezeMenu();
  }
}
