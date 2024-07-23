import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { BlockNoteEditor } from '@blocknote/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'bna-drag-handle-menu-btn',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective],
  templateUrl: './bna-drag-handle-menu.component.html',
  styleUrl: './bna-drag-handle-menu.component.css'
})
export class BnaDragHandleMenuComponent {
  editor = input.required<BlockNoteEditor>();

  openDragMenu() {
    console.log('Open drag menu');
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
}
