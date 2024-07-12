import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { BlockNoteEditor } from '@blocknote/core';
import {HlmButtonDirective} from "@spartan-ng/ui-button-helm";

@Component({
  selector: 'block-note-add-block-btn',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective],
  templateUrl: './add-block-button.component.html',
  styleUrl: './add-block-button.component.css',
})
export class AddBlockButtonComponent {
  editor = input.required<BlockNoteEditor>();

  addNewBlock() {
    this.editor().sideMenu.addBlock();
  }
}
