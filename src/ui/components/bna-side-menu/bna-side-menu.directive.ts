import {
  Directive,
  ElementRef,
  input,
  OnChanges,
  Renderer2,
} from '@angular/core';
import { BlockNoteEditor } from '@blocknote/core';

@Directive({
  selector: 'bna-side-menu[editor]',
  standalone: true,
})
export class BnaSideMenuDirective implements OnChanges {
  editor = input.required<BlockNoteEditor>();

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private renderer2: Renderer2
  ) {}

  ngOnChanges() {
    this.adjustVisibilityAndPosition();
  }

  private adjustVisibilityAndPosition() {
    const position = this.elRef.nativeElement.getBoundingClientRect();
    const editorSnapshot = this.editor();
    this.toggleVisibility(true);
    this.renderer2.addClass(this.elRef.nativeElement, 'z-30');
    this.renderer2.addClass(this.elRef.nativeElement, 'absolute');
    editorSnapshot.sideMenu.onUpdate((sideMenuState) => {
      if (sideMenuState.show) {
        this.renderer2.setStyle(
          this.elRef.nativeElement,
          'top',
          sideMenuState.referencePos.top - position.top + 25 + 'px'
        );
      }
      // this.toggleVisibility(sideMenuState.show);
    });
  }

  private toggleVisibility(state: boolean): void {
    if (state) {
      this.renderer2.removeClass(this.elRef.nativeElement, 'hidden');
      this.renderer2.addClass(this.elRef.nativeElement, 'block');
    } else {
      this.renderer2.addClass(this.elRef.nativeElement, 'hidden');
      this.renderer2.removeClass(this.elRef.nativeElement, 'block');
    }
  }
}
