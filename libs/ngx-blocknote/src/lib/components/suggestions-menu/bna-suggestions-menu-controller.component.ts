import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  signal,
} from '@angular/core';
import {
  autoPlacement,
  autoUpdate,
  computePosition,
  offset,
  size,
} from '@floating-ui/dom';
import { NgxBlocknoteService } from '../../services/ngx-blocknote.service';
import { getVirtualElement } from '../../util/get-virtual-element.util';

@Component({
  imports: [CommonModule],
  selector: 'bna-suggestions-menu-controller',
  host: {
    class: 'z-30 fixed flex',
  },
  template: `@if (show()) {
    <ng-content />
  }`,
})
export class BnaSuggestionsMenuControllerComponent implements OnDestroy {
  show = signal(false);
  cleanup: () => void = () => {
    return;
  };

  @Input({ required: true }) triggerCharacter = '/';
  constructor(
    private blockNoteEditorService: NgxBlocknoteService,
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
    const editor = this.blockNoteEditorService.editor();
    editor.suggestionMenus.onUpdate(
      this.triggerCharacter,
      async (suggestionMenuState) => {
        this.cleanup();

        this.show.set(suggestionMenuState.show);
        if (suggestionMenuState.show) {
          this.cleanup = autoUpdate(
            getVirtualElement(suggestionMenuState.referencePos),
            this.elRef.nativeElement,
            async () =>
              await this.updatePosition(suggestionMenuState.referencePos),
          );
        }
      },
    );
  }

  private async updatePosition(referencePos: DOMRect) {
    const result = await computePosition(
      getVirtualElement(referencePos),
      this.elRef.nativeElement,
      {
        strategy: 'fixed',
        placement: 'bottom-start',
        middleware: [
          offset(10),
          autoPlacement({ allowedPlacements: ['bottom-start', 'top-start'] }),
          size({
            apply: ({ availableHeight }) => {
              this.renderer2.setStyle(
                this.elRef.nativeElement,
                'maxHeight',
                `${availableHeight - 10}px`,
              );
            },
          }),
        ],
      },
    );
    this.renderer2.setStyle(this.elRef.nativeElement, 'top', `${result.y}px`);
    this.renderer2.setStyle(this.elRef.nativeElement, 'left', `${result.x}px`);
  }
}
