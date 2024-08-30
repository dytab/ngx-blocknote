import { Directive, effect, ElementRef, Renderer2 } from '@angular/core';
import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom';
import { NgxBlocknoteService } from '../../services/ngx-blocknote.service';
import { getVirtualElement } from '../../util/get-virtual-element.util';

@Directive({
  selector: 'bna-file-panel-controller',
  standalone: true,
})
export class BnaFilePanelControllerDirective {
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
    this.toggleVisibility(false);
    let cleanup: () => void = () => {
      return;
    };
    this.renderer2.addClass(this.elRef.nativeElement, 'z-30');
    this.renderer2.addClass(this.elRef.nativeElement, 'absolute');
    editor.filePanel?.onUpdate(async (filePanelState) => {
      if (!filePanelState.show) {
        cleanup();
      } else {
        const updatePosition = async () => {
          const result = await computePosition(
            getVirtualElement(filePanelState.referencePos),
            this.elRef.nativeElement,
            {
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
      this.toggleVisibility(filePanelState.show);
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
