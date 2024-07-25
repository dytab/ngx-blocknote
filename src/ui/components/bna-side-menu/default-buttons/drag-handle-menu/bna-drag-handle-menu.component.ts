import { CommonModule } from '@angular/common';
import { Component, input, OnChanges } from '@angular/core';
import { Block, BlockNoteEditor } from '@blocknote/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'bna-drag-handle-menu-btn',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective],
  templateUrl: './bna-drag-handle-menu.component.html',
  styleUrl: './bna-drag-handle-menu.component.css',
})
export class BnaDragHandleMenuComponent implements OnChanges {
  editor = input.required<BlockNoteEditor>();
  dragMenuShown = false;
  focusedBlock?: Block;

  openDragMenu() {
    console.log('Open drag menu');
    this.dragMenuShown = !this.dragMenuShown;
    // this.editor().block;
    if (this.dragMenuShown) {
      this.editor().sideMenu.freezeMenu();
    }
    // this.editor().removeBlocks([this.editor.name]);
  }

  dragStart($event: DragEvent) {
    console.log('drag start', $event);
    this.editor().sideMenu.blockDragStart($event);
  }

  dragEnd() {
    console.log('drag end');

    this.editor().sideMenu.blockDragEnd();
  }

  ngOnChanges() {
    this.editor().sideMenu.onUpdate((state) => {
      if (!state.show) {
        this.dragMenuShown = false;
        this.focusedBlock = undefined;
      } else {
        this.focusedBlock = state.block;
      }
    });
  }

  deleteBlock() {
    if (this.focusedBlock) {
      console.log('delete block', [this.focusedBlock?.id]);
      this.editor().removeBlocks([this.focusedBlock.id]);
      this.focusedBlock = undefined;
      this.dragMenuShown = false;
    }
    this.editor().sideMenu.unfreezeMenu();
  }
}
