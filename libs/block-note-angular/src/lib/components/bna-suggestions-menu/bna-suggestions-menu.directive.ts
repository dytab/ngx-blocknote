import {
  Directive,
  ElementRef,
  input,
  OnChanges,
  Renderer2,
} from '@angular/core';
import { BlockNoteEditor } from '@blocknote/core';
import { autoUpdate, computePosition, flip } from '@floating-ui/dom';
import { getVirtualElement } from '../../util/get-virtual-element.util';

@Directive({
  selector: 'bna-suggestions-menu[editor]',
  standalone: true,
})
export class BnaSuggestionsMenuDirective<B> implements OnChanges {
  editor = input.required<BlockNoteEditor<any, any, any>>();

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private renderer2: Renderer2
  ) {}

  ngOnChanges() {
    this.adjustVisibilityAndPosition();
  }

  private adjustVisibilityAndPosition() {
    this.toggleVisibility(false);
    let cleanup: () => void = () => {
      return;
    };
    this.renderer2.addClass(this.elRef.nativeElement, 'z-30');
    this.renderer2.addClass(this.elRef.nativeElement, 'absolute');
    this.editor().suggestionMenus.onUpdate('/', async (suggestionMenuState) => {
      if (!suggestionMenuState.show) {
        cleanup();
      } else {
        const updatePosition = async () => {
          const result = await computePosition(
            getVirtualElement(suggestionMenuState.referencePos),
            this.elRef.nativeElement,
            {
              placement: 'bottom-start',
              middleware: [flip()],
            }
          );
          this.renderer2.setStyle(
            this.elRef.nativeElement,
            'top',
            `${result.y}px`
          );
          this.renderer2.setStyle(
            this.elRef.nativeElement,
            'left',
            `${result.x}px`
          );
        };
        cleanup = autoUpdate(
          getVirtualElement(suggestionMenuState.referencePos),
          this.elRef.nativeElement,
          updatePosition
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
