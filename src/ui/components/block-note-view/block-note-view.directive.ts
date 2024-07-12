import { Directive, effect, ElementRef, input } from '@angular/core';
import { BlockNoteEditor } from '@blocknote/core';

@Directive({
  selector: 'block-note-view[editor]',
  standalone: true,
})
export class BlockNoteViewDirective {
  editor = input.required<BlockNoteEditor>();

  constructor(protected elRef: ElementRef<HTMLElement>) {
    effect(() => {
      const editorSnapshot = this.editor();

      editorSnapshot.mount(this.elRef.nativeElement);
    });
  }
}
