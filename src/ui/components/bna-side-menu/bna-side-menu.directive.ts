import { Directive, effect, ElementRef, input, Renderer2 } from '@angular/core';
import { BlockNoteEditor } from '@blocknote/core';

@Directive({
  selector: 'bna-side-menu[editor]',
  standalone: true,
})
export class BnaSideMenuDirective {
  editor = input.required<BlockNoteEditor>();

  constructor(
    protected elRef: ElementRef<HTMLElement>,
    private renderer2: Renderer2
  ) {
    effect(() => {
      const position = this.elRef.nativeElement.getBoundingClientRect();
      const editorSnapshot = this.editor();
      this.renderer2.setStyle(this.elRef.nativeElement, 'display', 'none');
      this.renderer2.setStyle(this.elRef.nativeElement, 'position', 'absolute');
      editorSnapshot.sideMenu.onUpdate((sideMenuState) => {
        if (sideMenuState.show) {
          this.renderer2.setStyle(this.elRef.nativeElement, 'display', 'block');
          this.renderer2.setStyle(
            this.elRef.nativeElement,
            'top',
            sideMenuState.referencePos.top - position.top + 'px'
          );
        } else {
          this.renderer2.setStyle(this.elRef.nativeElement, 'display', 'none');
        }
      });
    });
  }
}
