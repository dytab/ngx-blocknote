import { Directive, effect, ElementRef, input } from '@angular/core';
import { BlockNoteEditor } from '@blocknote/core';

@Directive({
  selector: 'bna-view[editor]',
  standalone: true,
})
export class BnaViewDirective {
  editor = input.required<BlockNoteEditor<any, any, any>>();

  constructor(protected elRef: ElementRef<HTMLElement>) {
    effect(() => {
      const editorSnapshot = this.editor();

      editorSnapshot.mount(this.elRef.nativeElement);
    });
  }
}
