import { Component, inject } from '@angular/core';
import { NgxBlocknoteService } from '../../services/ngx-blocknote.service';

@Component({
  selector: 'bna-link-toolbar',
  imports: [],
  templateUrl: './link-toolbar.component.html',
  host: {
    class: 'bn-toolbar bn-link-toolbar',
    '(mouseenter)': 'stopHideTimer()',
    '(mouseleave)': 'startHideTimer()',
  },
})
export class BnaLinkToolbarComponent {
  private ngxBlockNoteService = inject(NgxBlocknoteService);

  startHideTimer() {
    this.ngxBlockNoteService.editor()!.linkToolbar.startHideTimer();
  }

  stopHideTimer() {
    this.ngxBlockNoteService.editor()!.linkToolbar.stopHideTimer();
  }
}
