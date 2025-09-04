import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
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
      'bg-gray-900 text-gray-100': isBlueActive()
    }"
  >
    Blue
  </button>`,
  styles: ``,
})
export class BlueButtonComponent {
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(public ngxBlockNoteService: NgxBlocknoteService) {}

  isBlueActive = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    if (!editor) return false;
    const styles = editor.getActiveStyles();
    return styles.textColor === 'blue' && styles.backgroundColor === 'blue';
  });

  changeToBlue() {
    this.ngxBlockNoteService.editor()?.toggleStyles({
      textColor: 'blue',
      backgroundColor: 'blue',
    });
  }
}
