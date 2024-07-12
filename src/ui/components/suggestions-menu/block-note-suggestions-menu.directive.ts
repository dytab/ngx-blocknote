import { Directive, effect, ElementRef, input, Renderer2 } from '@angular/core';
import { BlockNoteEditor } from '@blocknote/core';

@Directive({
  selector: 'block-node-suggestions-menu[editor]',
  standalone: true,
})
export class BlockNoteSuggestionsMenuDirective {
  editor = input.required<BlockNoteEditor>();

  constructor(
    protected elRef: ElementRef<HTMLElement>,
    private renderer2: Renderer2
  ) {
    effect(() => {
      const position = this.elRef.nativeElement.getBoundingClientRect();
      this.renderer2.setStyle(this.elRef.nativeElement, 'display', 'none');
      this.renderer2.setStyle(this.elRef.nativeElement, 'position', 'absolute');
      this.renderer2.setStyle(this.elRef.nativeElement, 'z-index', '10000');
      this.editor().suggestionMenus.onUpdate('/', (suggestionMenuState) => {
        console.log(suggestionMenuState);
        if (suggestionMenuState.show) {
          this.renderer2.setStyle(this.elRef.nativeElement, 'display', 'block');
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
        } else {
          this.renderer2.setStyle(this.elRef.nativeElement, 'display', 'none');
        }
      });
    });
  }
}
