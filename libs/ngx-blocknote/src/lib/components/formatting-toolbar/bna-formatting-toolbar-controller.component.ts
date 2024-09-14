import {
  Component,
  effect,
  ElementRef,
  Renderer2,
  signal,
} from '@angular/core';
import { FormattingToolbarState } from '@blocknote/core';
import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom';
import { NgxBlocknoteService } from '../../services/ngx-blocknote.service';
import { getVirtualElement } from '../../util/get-virtual-element.util';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'bna-formatting-toolbar-controller',
  standalone: true,
  template: `@if(show()){<ng-content />}`,
  host:{
    class: 'z-40 fixed'
  }
})
export class BnaFormattingToolbarControllerComponent {
  show = signal(false);

  constructor(
    private ngxBlockNoteService: NgxBlocknoteService,
    protected elRef: ElementRef<HTMLElement>,
    private renderer2: Renderer2
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
    if (editor) {
      editor.formattingToolbar.onUpdate(async (formattingToolbar) => {
        this.show.set(formattingToolbar.show);
        if (!formattingToolbar.show) {
          cleanup();
        } else {
          const updatePosition = this.getUpdatePositionFn(formattingToolbar);
          cleanup = autoUpdate(
            getVirtualElement(formattingToolbar.referencePos),
            this.elRef.nativeElement,
            updatePosition
          );
        }
      });
    }
  }

  private getUpdatePositionFn(formattingToolbar: FormattingToolbarState) {
    return async () => {
      const result = await computePosition(
        getVirtualElement(formattingToolbar.referencePos),
        this.elRef.nativeElement,
        {
          placement: 'top',
          strategy: 'fixed',
          middleware: [flip(), offset(15)],
        }
      );
      this.renderer2.setStyle(this.elRef.nativeElement, 'top', `${result.y}px`);
      this.renderer2.setStyle(
        this.elRef.nativeElement,
        'left',
        `${result.x}px`
      );
    };
  }
}
