import { Directive, effect, ElementRef } from '@angular/core';
import { NgxBlocknoteService } from '../../services/ngx-blocknote.service';

@Directive({
  selector: 'bna-view-controller',
  standalone: true,
})
export class BnaViewControllerDirective {
  constructor(
    private ngxBlockNoteService: NgxBlocknoteService,
    protected elRef: ElementRef<HTMLElement>
  ) {
    effect(() => {
      const editorSnapshot = this.ngxBlockNoteService.editor();
      if (!editorSnapshot) {
        return;
      }

      editorSnapshot.mount(this.elRef.nativeElement);
    });
  }
}
