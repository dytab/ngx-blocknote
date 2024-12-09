import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  ElementRef, OnDestroy,
  Renderer2,
  signal
} from '@angular/core';
import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom';
import { NgxBlocknoteService } from '../../services/ngx-blocknote.service';
import { getVirtualElement } from '../../util/get-virtual-element.util';

@Component({
  imports: [CommonModule],
  selector: 'bna-file-panel-controller',
  host: {
    class: 'z-30 fixed',
  },
  template: `@if (show()) {
    <ng-content />
  }`,
})
export class BnaFilePanelControllerComponent implements OnDestroy{
  show = signal(false);
  cleanup: () => void = () => {
    return;
  }

  constructor(
    private ngxBlockNoteService: NgxBlocknoteService,
    private elRef: ElementRef<HTMLElement>,
    private renderer2: Renderer2,
  ) {
    effect(() => {
      this.adjustVisibilityAndPosition();
    });
  }

  ngOnDestroy(){
    this.cleanup();
  }

  private adjustVisibilityAndPosition() {
    const editor = this.ngxBlockNoteService.editor();
    editor.filePanel?.onUpdate(async (filePanelState) => {
      this.show.set(filePanelState.show);
      this.cleanup();
      if (filePanelState.show) {
        this.cleanup = autoUpdate(
          getVirtualElement(filePanelState.referencePos),
          this.elRef.nativeElement,
          async () => {
            await this.updatePosition(filePanelState.referencePos);
          },
        );
      }
    });
  }

  private async updatePosition(referencePos: DOMRect) {
    const result = await computePosition(
      getVirtualElement(referencePos),
      this.elRef.nativeElement,
      {
        strategy: 'fixed',
        placement: 'bottom',
        middleware: [offset(10), flip()],
      },
    );
    this.renderer2.setStyle(this.elRef.nativeElement, 'top', `${result.y}px`);
    this.renderer2.setStyle(this.elRef.nativeElement, 'left', `${result.x}px`);
  }
}
