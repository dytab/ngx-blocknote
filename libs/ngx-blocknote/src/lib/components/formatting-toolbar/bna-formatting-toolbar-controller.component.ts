import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  Renderer2,
  signal,
} from '@angular/core';
import { Block, DefaultProps } from '@blocknote/core';
import {
  autoPlacement,
  autoUpdate,
  computePosition,
  offset,
} from '@floating-ui/dom';
import { NgxBlocknoteService } from '../../services/ngx-blocknote.service';
import { getVirtualElement } from '../../util/get-virtual-element.util';

const textAlignmentToPlacement = (
  textAlignment: DefaultProps['textAlignment'],
) => {
  switch (textAlignment) {
    case 'left':
      return 'top-start';
    case 'center':
      return 'top';
    case 'right':
      return 'top-end';
    default:
      return 'top-start';
  }
};

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
export class BnaFormattingToolbarControllerComponent {
  show = signal(false);

  constructor(
    private ngxBlockNoteService: NgxBlocknoteService,
    protected elRef: ElementRef<HTMLElement>,
    private renderer2: Renderer2,
  ) {
    effect(() => {
      this.adjustVisibilityAndPosition();
    });
  }

  adjustVisibilityAndPosition() {
    let cleanup: () => void = () => {
      return;
    };
    const editor = this.ngxBlockNoteService.editor();
    editor.formattingToolbar.onUpdate(async (formattingToolbar) => {
      this.updateShowFormattingToolbarOnChange(formattingToolbar.show);
      cleanup();
      //TODO: remove auto update
      //had the problem that the first set position was not good
      cleanup = autoUpdate(
        getVirtualElement(formattingToolbar.referencePos),
        this.elRef.nativeElement,
        async () => {
          await this.updateFormattingToolbarPosition(
            formattingToolbar.referencePos,
          );
        },
      );
    });
  }

  private updateShowFormattingToolbarOnChange(show: boolean) {
    if (this.show() !== show) {
      this.show.set(show);
    }
  }

  private async updateFormattingToolbarPosition(
    referencePos: DOMRect,
  ) {
    const result = await computePosition(
      getVirtualElement(referencePos),
      this.elRef.nativeElement,
      {
        strategy: 'fixed',
        placement: 'top',
        middleware: [offset(15), autoPlacement()],
      },
    );
    this.renderer2.setStyle(this.elRef.nativeElement, 'top', `${result.y}px`);
    this.renderer2.setStyle(this.elRef.nativeElement, 'left', `${result.x}px`);
  }
}
