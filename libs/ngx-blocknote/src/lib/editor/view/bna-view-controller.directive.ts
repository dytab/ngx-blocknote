import { Directive, effect, ElementRef, inject } from '@angular/core';
import { NgxBlocknoteService } from '../../services/ngx-blocknote.service';

@Directive({
  selector: 'bna-view-controller',
  standalone: true,
})
export class BnaViewControllerDirective {
  private ngxBlockNoteService = inject(NgxBlocknoteService);
  protected elRef = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    effect(() => {
      const editorSnapshot = this.ngxBlockNoteService.editor();
      if (!editorSnapshot) {
        return;
      }

      editorSnapshot.mount(this.elRef.nativeElement);
    });
  }
}
