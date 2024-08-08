import { Directive, effect, ElementRef, Renderer2 } from '@angular/core';
import { autoUpdate, computePosition, flip } from '@floating-ui/dom';
import { BlockNoteAngularService } from '../../services/block-note-angular.service';
import { getVirtualElement } from '../../util/get-virtual-element.util';

@Directive({
  selector: 'bna-side-menu-controller',
  standalone: true,
})
export class BnaSideMenuControllerDirective {
  constructor(
    private blockNoteAngularService: BlockNoteAngularService,
    private elRef: ElementRef<HTMLElement>,
    private renderer2: Renderer2
  ) {
    effect(() => {
      this.adjustVisibilityAndPosition();
    });
  }

  private adjustVisibilityAndPosition() {
    let cleanup: () => void = () => {
      return;
    };
    const editorSnapshot = this.blockNoteAngularService.editor();
    if (!editorSnapshot) {
      return;
    }
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
