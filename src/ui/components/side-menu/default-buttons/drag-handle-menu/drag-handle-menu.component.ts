import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { BlockNoteEditor } from '@blocknote/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'block-note-drag-handle-menu-btn',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective],
  templateUrl: './drag-handle-menu.component.html',
  styleUrl: './drag-handle-menu.component.css',
})
export class DragHandleMenuComponent {
  editor = input.required<BlockNoteEditor>();

  openDragMenu() {
    console.log('Open drag menu');
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
