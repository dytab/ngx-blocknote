import { CommonModule } from '@angular/common';
import { Component, input, OnChanges } from '@angular/core';
import { Block, BlockNoteEditor } from '@blocknote/core';
import { provideIcons } from '@ng-icons/core';
import { lucideGripVertical } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuItemSubIndicatorComponent,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
  HlmMenuShortcutComponent,
  HlmSubMenuComponent,
} from '@spartan-ng/ui-menu-helm';

@Component({
  selector: 'bna-drag-handle-menu-btn',
  standalone: true,
  imports: [
    CommonModule,
    HlmButtonDirective,
    BrnMenuTriggerDirective,
    HlmIconComponent,
    HlmMenuComponent,
    HlmSubMenuComponent,
    HlmMenuItemDirective,
    HlmMenuItemSubIndicatorComponent,
    HlmMenuLabelComponent,
    HlmMenuShortcutComponent,
    HlmMenuSeparatorComponent,
    HlmMenuGroupComponent,
  ],
  templateUrl: './bna-drag-handle-menu.component.html',
  styleUrl: './bna-drag-handle-menu.component.css',
  providers: [provideIcons({ lucideGripVertical })],
})
export class BnaDragHandleMenuComponent implements OnChanges {
  editor = input.required<BlockNoteEditor<any, any, any>>();
  dragMenuShown = false;
  selectedBlocks: Block<any, any, any>[] = [];
  dragBlock?: Block<any, any, any>;

  openDragMenu() {
    const selection = this.editor().getSelection();
    //Todo: create type
    // Get the blocks in the current selection and store on the state. If
    // the selection is empty, store the block containing the text cursor
    // instead.
    let selectedBlocks: Block<any, any, any>[] = [];
    if (selection !== undefined) {
      selectedBlocks = selection.blocks;
    } else {
      selectedBlocks = [this.editor().getTextCursorPosition().block];
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
    console.log('Open drag menu', this.selectedBlocks);
    this.dragMenuShown = !this.dragMenuShown;
    if (this.dragMenuShown) {
      this.editor().sideMenu.freezeMenu();
    }
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
      this.dragBlock = state.block;
    });
  }

  deleteBlock() {
    console.log('delete block', this.selectedBlocks);
    this.editor().removeBlocks(this.selectedBlocks);
    this.editor().sideMenu.unfreezeMenu();
  }
}
