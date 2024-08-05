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
    let cleanup: () => void = () => {
      return;
    };
    const editorSnapshot = this.editor();
    this.toggleVisibility(true);
    this.renderer2.addClass(this.elRef.nativeElement, 'z-30');
    this.renderer2.addClass(this.elRef.nativeElement, 'absolute');
    editorSnapshot.sideMenu.onUpdate(async (sideMenuState) => {
      if (!sideMenuState.show) {
        cleanup();
      } else {
        const updatePosition = async () => {
          const result = await computePosition(
            getVirtualElement(sideMenuState.referencePos),
            this.elRef.nativeElement,
            {
              placement: 'left',
              middleware: [flip()],
            }
          );
          this.renderer2.setStyle(
            this.elRef.nativeElement,
            'top',
            `${result.y}px`
          );
        };
        cleanup = autoUpdate(
          getVirtualElement(sideMenuState.referencePos),
          this.elRef.nativeElement,
          updatePosition
        );
      }
      this.toggleVisibility(sideMenuState.show);
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
