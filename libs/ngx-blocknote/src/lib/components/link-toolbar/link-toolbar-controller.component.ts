import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  Renderer2,
  signal,
} from '@angular/core';
import { LinkToolbarState } from '@blocknote/core';
import { autoUpdate, computePosition, flip } from '@floating-ui/dom';
import { NgxBlocknoteService } from '../../services/ngx-blocknote.service';
import { getVirtualElement } from '../../util/get-virtual-element.util';

@Component({
  imports: [CommonModule],
  selector: 'bna-link-toolbar-controller',
  standalone: true,
  host: {
    class: 'z-40 fixed',
  },
  template: `@if(show()){<ng-content />}`,
})
export class BnaLinkToolbarControllerDirective {
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
    editor.linkToolbar.onUpdate(async (linkToolbar) => {
      this.show.set(linkToolbar.show);
      if (!linkToolbar.show) {
        cleanup();
      } else {
        const updatePosition = this.getUpdatePositionFn(linkToolbar);
        cleanup = autoUpdate(
          getVirtualElement(linkToolbar.referencePos),
          this.elRef.nativeElement,
          updatePosition
        );
      }
    });
  }

  private getUpdatePositionFn(linkToolbar: LinkToolbarState) {
    return async () => {
      const result = await computePosition(
        getVirtualElement(linkToolbar.referencePos),
        this.elRef.nativeElement,
        {
          strategy: 'fixed',
          placement: 'top',
          middleware: [flip()],
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
