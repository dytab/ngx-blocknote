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
  standalone: true,
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
        this.updateShowSuggestionMenuOnChange(suggestionMenuState.show);
        this.cleanup();
        const updatePosition = this.getUpdatePositionFn(
          suggestionMenuState.referencePos,
        );
        this.cleanup = autoUpdate(
          getVirtualElement(suggestionMenuState.referencePos),
          this.elRef.nativeElement,
          updatePosition,
        );
      },
    );
  }

  private getUpdatePositionFn(referencePos: DOMRect) {
    return async () => {
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
      this.renderer2.setStyle(
        this.elRef.nativeElement,
        'left',
        `${result.x}px`,
      );
    };
  }

  private updateShowSuggestionMenuOnChange(show: boolean) {
    if (this.show() !== show) {
      this.show.set(show);
    }
  }
}
