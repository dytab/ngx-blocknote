import {
  Component,
  effect,
  ElementRef,
  Renderer2, signal
} from '@angular/core';
import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom';
import { NgxBlocknoteService } from '../../services/ngx-blocknote.service';
import { getVirtualElement } from '../../util/get-virtual-element.util';
import { CommonModule } from '@angular/common';

@Component({
  imports:[CommonModule],
  selector: 'bna-file-panel-controller',
  standalone: true,
  host:{
    class: 'z-30 fixed'
  },
  template: `@if(show()){<ng-content />}`,
})
export class BnaFilePanelControllerComponent {
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
    const editor = this.ngxBlockNoteService.editor();
    if (!editor) {
      return;
    }
    let cleanup: () => void = () => {
      return;
    };
    editor.filePanel?.onUpdate(async (filePanelState) => {
      this.show.set(filePanelState.show);
      if (!filePanelState.show) {
        cleanup();
      } else {
        const updatePosition = async () => {
          const result = await computePosition(
            getVirtualElement(filePanelState.referencePos),
            this.elRef.nativeElement,
            {
              strategy:'fixed',
              placement: 'bottom',
              middleware: [offset(10), flip()],
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
          getVirtualElement(filePanelState.referencePos),
          this.elRef.nativeElement,
          updatePosition
        );
      }
    });
  }
}
