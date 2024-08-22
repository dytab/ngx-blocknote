import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BlockNoteAngularService } from '@dytab/ngx-blocknote';
import { HlmButtonDirective } from '@dytab/ui';

@Component({
  selector: 'bna-blue-button',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective],
  template: ` <button
    hlmBtn
    size="icon"
    variant="ghost"
    (click)="changeToBlue()"
    [ngClass]="{
      'bg-gray-900 text-gray-100': blockNoteAngularService.editor()
        ? blockNoteAngularService.editor()!.getActiveStyles().textColor ===
            'blue' &&
          blockNoteAngularService.editor()!.getActiveStyles()
            .backgroundColor === 'blue'
        : false
    }"
  >
    Blue<button></button>
  </button>`,
  styles: ``,
})
export class BlueButtonComponent {
  constructor(public blockNoteAngularService: BlockNoteAngularService) {}

  changeToBlue() {
    this.blockNoteAngularService.editor()?.toggleStyles({
      textColor: 'blue',
      backgroundColor: 'blue',
    });
  }
}
