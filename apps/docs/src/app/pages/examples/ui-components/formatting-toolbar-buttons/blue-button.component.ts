import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxBlocknoteService } from '@dytab/ngx-blocknote';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  selector: 'bna-blue-button',
  imports: [CommonModule, HlmButton],
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
    Blue
  </button>`,
  styles: ``,
})
export class BlueButtonComponent {
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(public ngxBlockNoteService: NgxBlocknoteService) {}

  changeToBlue() {
    this.ngxBlockNoteService.editor()?.toggleStyles({
      textColor: 'blue',
      backgroundColor: 'blue',
    });
  }
}
