import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { BlockNoteEditor } from '@blocknote/core';

@Component({
  selector: 'bna-add-block-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bna-add-block-button.component.html',
  styleUrl: './bna-add-block-button.component.css',
})
export class BnaAddBlockButtonComponent {
  editor = input.required<BlockNoteEditor>();

  addNewBlock() {
    this.editor().sideMenu.addBlock();
  }
}
