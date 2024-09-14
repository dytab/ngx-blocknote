import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  Renderer2,
  signal,
} from '@angular/core';
import { autoUpdate, computePosition, flip } from '@floating-ui/dom';
import { NgxBlocknoteService } from '../../services/ngx-blocknote.service';
import { getVirtualElement } from '../../util/get-virtual-element.util';

@Component({
  imports: [CommonModule],
  selector: 'bna-side-menu-controller',
  standalone: true,
  template: `@if(show()){<ng-content />}`,
})
export class BnaSideMenuControllerComponent {
  show = signal(false);

  constructor(
    private ngxBlockNoteService: NgxBlocknoteService,
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
    const editorSnapshot = this.ngxBlockNoteService.editor();
    if (!editorSnapshot) {
      return;
    }
    this.renderer2.addClass(this.elRef.nativeElement, 'z-30');
    this.renderer2.addClass(this.elRef.nativeElement, 'fixed');
    editorSnapshot.sideMenu.onUpdate(async (sideMenuState) => {
      this.show.set(sideMenuState.show);
      if (!sideMenuState.show) {
        cleanup();
      } else {
        //TODO: remove this and use editor directly
        this.ngxBlockNoteService.sideMenuFocusedBlock.set(sideMenuState.block);
        const updatePosition = async () => {
          const result = await computePosition(
            getVirtualElement(sideMenuState.referencePos),
            this.elRef.nativeElement,
            {
              strategy: 'fixed',
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
    });
  }
}
