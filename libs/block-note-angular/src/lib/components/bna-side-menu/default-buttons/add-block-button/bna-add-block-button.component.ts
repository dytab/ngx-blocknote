import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { BlockNoteEditor } from '@blocknote/core';
import { provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'bna-add-block-btn',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective, HlmIconComponent],
  templateUrl: './bna-add-block-button.component.html',
  styleUrl: './bna-add-block-button.component.css',
  providers: [provideIcons({ lucidePlus })],
})
export class BnaAddBlockButtonComponent {
  editor = input.required<BlockNoteEditor>();

  addNewBlock() {
    this.editor().sideMenu.addBlock();
  }
}
