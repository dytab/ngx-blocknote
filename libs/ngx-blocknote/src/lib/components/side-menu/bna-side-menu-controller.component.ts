import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  Renderer2,
  signal,
} from '@angular/core';
import { Block } from '@blocknote/core';
import { computePosition } from '@floating-ui/dom';
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
export class BnaSideMenuControllerComponent {
  show = signal(false);

  constructor(
    private ngxBlockNoteService: NgxBlocknoteService,
    private elRef: ElementRef<HTMLElement>,
    private renderer2: Renderer2,
  ) {
    effect(() => {
      this.adjustVisibilityAndPosition();
    });
  }

  private adjustVisibilityAndPosition() {
    const editor = this.ngxBlockNoteService.editor();
    editor.sideMenu.onUpdate(async (sideMenuState) => {
      this.updateShowSideMenuOnChange(sideMenuState.show);
      this.updateSideMenuFocusedBlockOnChange(sideMenuState.block);
      if (sideMenuState.show) {
        await this.updateSideMenuPosition(sideMenuState.referencePos);
      }
    });
  }

  private updateShowSideMenuOnChange(show: boolean) {
    if (this.show() !== show) {
      this.show.set(show);
    }
  }

  private updateSideMenuFocusedBlockOnChange(block: Block<any, any, any>) {
    if (this.ngxBlockNoteService.sideMenuFocusedBlock() !== block) {
      this.ngxBlockNoteService.sideMenuFocusedBlock.set(block);
    }
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
