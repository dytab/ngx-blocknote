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
    const selection = this.editor().getSelection();
    //Todo: create type
    let selectedBlocks = [];
    // Get the blocks in the current selection and store on the state. If
    // the selection is empty, store the block containing the text cursor
    // instead.
    if (selection !== undefined) {
      selectedBlocks = selection.blocks;
    } else {
      selectedBlocks = [this.editor().getTextCursorPosition().block];
    }
    console.log('delete block', selectedBlocks);
    this.editor().removeBlocks(selectedBlocks);
    this.editor().sideMenu.unfreezeMenu();
  }
}
