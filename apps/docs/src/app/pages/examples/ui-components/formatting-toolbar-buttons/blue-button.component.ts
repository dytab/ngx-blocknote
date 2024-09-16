import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxBlocknoteService } from '@dytab/ngx-blocknote';
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
      'bg-gray-900 text-gray-100': ngxBlockNoteService.editor()
        ? ngxBlockNoteService.editor()!.getActiveStyles().textColor ===
            'blue' &&
          ngxBlockNoteService.editor()!.getActiveStyles().backgroundColor ===
            'blue'
        : false,
    }"
  >
    Blue<button></button>
  </button>`,
  styles: ``,
})
export class BlueButtonComponent {
  constructor(public ngxBlockNoteService: NgxBlocknoteService) {}

  changeToBlue() {
    this.ngxBlockNoteService.editor()?.toggleStyles({
      textColor: 'blue',
      backgroundColor: 'blue',
    });
  }
}
