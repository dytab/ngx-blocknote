import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { Block } from '@blocknote/core';
import { provideIcons } from '@ng-icons/core';
import { lucideGripVertical } from '@ng-icons/lucide';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { BlockNoteAngularService } from '../../../../services/block-note-angular.service';
import {
  HlmButtonDirective,
  HlmIconComponent,
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuItemSubIndicatorComponent,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
  HlmMenuShortcutComponent,
  HlmSubMenuComponent,
} from '../../../../ui';
import { BnaFormattingToolbarControllerDirective } from '../../../bna-formatting-toolbar/bna-formatting-toolbar-controller.directive';
import { BnaFormattingToolbarComponent } from '../../../bna-formatting-toolbar/bna-formatting-toolbar.component';
import { BasicTextStyleButtonComponent } from '../../../buttons/basic-text-style-button/basic-text-style-button.component';
import { TextAlignButtonComponent } from '../../../buttons/text-align-button/text-align-button.component';
import { BnaDeleteBlockItemComponent } from '../bna-delete-block-item/bna-delete-block-item.component';

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
    BasicTextStyleButtonComponent,
    BnaFormattingToolbarComponent,
    BnaFormattingToolbarControllerDirective,
    TextAlignButtonComponent,
    BnaDeleteBlockItemComponent,
  ],
  templateUrl: './bna-drag-handle-menu.component.html',
  styleUrl: './bna-drag-handle-menu.component.css',
  providers: [provideIcons({ lucideGripVertical })],
})
export class BnaDragHandleMenuComponent {
  dragMenuShown = false;
  selectedBlocks: Block<any, any, any>[] = [];
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

  openDragMenu() {
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
    console.log('Open drag menu', this.selectedBlocks);
    this.dragMenuShown = !this.dragMenuShown;
    if (this.dragMenuShown) {
      editor.sideMenu.freezeMenu();
    }
  }

  dragStart($event: DragEvent) {
    const editor = this.blockNoteAngularService.editor();
    if (!editor) {
      return;
    }
    console.log('drag start', $event);
    editor.sideMenu.blockDragStart($event);
  }

  dragEnd() {
    const editor = this.blockNoteAngularService.editor();
    if (!editor) {
      return;
    }
    editor.sideMenu.blockDragEnd();
  }

  deleteBlock() {
    const editor = this.blockNoteAngularService.editor();
    if (!editor) {
      return;
    }
    console.log('delete block', this.selectedBlocks);
    editor.removeBlocks(this.selectedBlocks);
    editor.sideMenu.unfreezeMenu();
  }
}
