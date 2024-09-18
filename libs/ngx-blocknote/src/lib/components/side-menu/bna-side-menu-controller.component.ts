import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  OnDestroy,
  Renderer2,
  signal,
} from '@angular/core';
import { autoUpdate, computePosition } from '@floating-ui/dom';
import { NgxBlocknoteService } from '../../services/ngx-blocknote.service';
import { getVirtualElement } from '../../util/get-virtual-element.util';

@Component({
  imports: [CommonModule],
  selector: 'bna-side-menu-controller',
  standalone: true,
  host: {
    class: 'z-30 fixed',
  },
  template: `@if (show()) {
    <ng-content />
  }`,
})
export class BnaSideMenuControllerComponent implements OnDestroy {
  show = signal(false);
  cleanup: () => void = () => {
    return;
  };

  constructor(
    private ngxBlockNoteService: NgxBlocknoteService,
    private elRef: ElementRef<HTMLElement>,
    private renderer2: Renderer2,
  ) {
    effect(() => {
      this.adjustVisibilityAndPosition();
    });
  }

  ngOnDestroy() {
    this.cleanup();
  }

  private adjustVisibilityAndPosition() {
    const editor = this.ngxBlockNoteService.editor();
    editor.sideMenu.onUpdate(async (sideMenuState) => {
      this.cleanup();

      this.show.set(sideMenuState.show);
      this.ngxBlockNoteService.sideMenuFocusedBlock.set(sideMenuState.block);
      if (sideMenuState.show) {
        //TODO: remove auto update
        //had the problem that the first set position was not good
        this.cleanup = autoUpdate(
          getVirtualElement(sideMenuState.referencePos),
          this.elRef.nativeElement,
          async () => {
            await this.updateSideMenuPosition(sideMenuState.referencePos);
          },
        );
      }
    });
  }

  private async updateSideMenuPosition(referencePos: DOMRect) {
    const placement = referencePos.height < 80 ? 'left' : 'left-start';
    const result = await computePosition(
      getVirtualElement(referencePos),
      this.elRef.nativeElement,
      {
        strategy: 'fixed',
        placement: placement,
      },
    );
    this.renderer2.setStyle(this.elRef.nativeElement, 'top', `${result.y}px`);
  }
}
