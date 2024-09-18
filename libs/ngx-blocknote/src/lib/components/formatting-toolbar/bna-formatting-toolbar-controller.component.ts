import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  OnDestroy,
  Renderer2,
  signal,
} from '@angular/core';
import {
  autoPlacement,
  autoUpdate,
  computePosition,
  hide,
  offset,
} from '@floating-ui/dom';
import { NgxBlocknoteService } from '../../services/ngx-blocknote.service';
import { getVirtualElement } from '../../util/get-virtual-element.util';

@Component({
  imports: [CommonModule],
  selector: 'bna-formatting-toolbar-controller',
  standalone: true,
  template: `@if (show()) {
    <ng-content />
  }`,
  host: {
    class: 'z-40 fixed',
  },
})
export class BnaFormattingToolbarControllerComponent implements OnDestroy {
  show = signal(false);
  cleanup: () => void = () => {
    return;
  };

  constructor(
    private ngxBlockNoteService: NgxBlocknoteService,
    protected elRef: ElementRef<HTMLElement>,
    private renderer2: Renderer2,
  ) {
    effect(() => {
      this.adjustVisibilityAndPosition();
    });
  }

  ngOnDestroy() {
    this.cleanup();
  }

  adjustVisibilityAndPosition() {
    const editor = this.ngxBlockNoteService.editor();
    editor.formattingToolbar.onUpdate(async (formattingToolbar) => {
      this.show.set(formattingToolbar.show);
      this.cleanup();
      //TODO: remove auto update
      //had the problem that the first set position was not good
      if (formattingToolbar.show) {
        this.cleanup = autoUpdate(
          getVirtualElement(formattingToolbar.referencePos),
          this.elRef.nativeElement,
          async () =>
            await this.updateFormattingToolbarPosition(
              formattingToolbar.referencePos,
            ),
        );
      }
    });
  }

  private async updateFormattingToolbarPosition(referencePos: DOMRect) {
    const result = await computePosition(
      getVirtualElement(referencePos),
      this.elRef.nativeElement,
      {
        strategy: 'fixed',
        middleware: [
          offset(10),
          autoPlacement({
            allowedPlacements: [
              'top-start',
              'top',
              'top-end',
              'bottom-start',
              'bottom',
              'bottom-end',
            ],
          }),
          hide({}),
        ],
      },
    );
    this.renderer2.setStyle(this.elRef.nativeElement, 'top', `${result.y}px`);
    this.renderer2.setStyle(this.elRef.nativeElement, 'left', `${result.x}px`);
  }
}
