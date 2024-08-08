import { Directive, effect, ElementRef } from '@angular/core';
import { BlockNoteAngularService } from '../../services/block-note-angular.service';

@Directive({
  selector: 'bna-view',
  standalone: true,
})
export class BnaViewDirective {
  constructor(
    private blockNoteAngularService: BlockNoteAngularService,
    protected elRef: ElementRef<HTMLElement>
  ) {
    effect(() => {
      const editorSnapshot = this.blockNoteAngularService.editor();
      if (!editorSnapshot) {
        return;
      }

      editorSnapshot.mount(this.elRef.nativeElement);
    });
  }
}
