import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  OnDestroy,
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
  host: {
    class: 'z-40 fixed',
  },
  template: `@if (show()) {
    <ng-content />
  }`,
})
export class BnaLinkToolbarControllerDirective implements OnDestroy {
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

  private adjustVisibilityAndPosition() {
    const editor = this.ngxBlockNoteService.editor();
    editor.linkToolbar.onUpdate((linkToolbar) => {
      this.cleanup();

      this.show.set(linkToolbar.show);
      if (linkToolbar.show) {
        this.cleanup = autoUpdate(
          getVirtualElement(linkToolbar.referencePos),
          this.elRef.nativeElement,
          async () => await this.updatePosition(linkToolbar),
        );
      }
    });
  }

  private async updatePosition(linkToolbar: LinkToolbarState) {
    const result = await computePosition(
      getVirtualElement(linkToolbar.referencePos),
      this.elRef.nativeElement,
      {
        strategy: 'fixed',
        placement: 'top',
        middleware: [flip()],
      },
    );
    this.renderer2.setStyle(this.elRef.nativeElement, 'top', `${result.y}px`);
    this.renderer2.setStyle(this.elRef.nativeElement, 'left', `${result.x}px`);
  }
}
