import {
  Directive,
  ElementRef,
  input,
  OnChanges,
  Renderer2,
} from '@angular/core';
import { BlockNoteEditor } from '@blocknote/core';

@Directive({
  selector: 'bna-suggestions-menu[editor]',
  standalone: true,
})
export class BnaSuggestionsMenuDirective implements OnChanges {
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
    this.toggleVisibility(false);
    this.renderer2.addClass(this.elRef.nativeElement, 'z-30');
    this.renderer2.addClass(this.elRef.nativeElement, 'absolute');
    this.editor().suggestionMenus.onUpdate('/', (suggestionMenuState) => {
      if (suggestionMenuState.show) {
        this.renderer2.setStyle(
          this.elRef.nativeElement,
          'top',
          `${
            suggestionMenuState.referencePos.top -
            position.top +
            suggestionMenuState.referencePos.height
          }px`
        );
        this.renderer2.setStyle(
          this.elRef.nativeElement,
          'left',
          `${suggestionMenuState.referencePos.left - position.left}px`
        );
      }
      this.toggleVisibility(suggestionMenuState.show);
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
