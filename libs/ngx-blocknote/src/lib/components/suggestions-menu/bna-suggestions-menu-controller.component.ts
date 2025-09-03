import {
  Component,
  effect,
  ElementRef,
  OnDestroy,
  Renderer2,
  signal,
  input,
  inject,
} from '@angular/core';
import {
  autoUpdate,
  computePosition,
  offset,
  size,
  flip,
  shift,
} from '@floating-ui/dom';
import { NgxBlocknoteService } from '../../services/ngx-blocknote.service';
import { getVirtualElement } from '../../util/get-virtual-element.util';

@Component({
  imports: [],
  selector: 'bna-suggestions-menu-controller',
  host: {
    class: 'fixed flex',
    style: 'z-index: 2000;',
    '(mousedown)': '$event.preventDefault()',
  },
  template: `@if (show()) {
    <ng-content />
  }`,
})
export class BnaSuggestionsMenuControllerComponent implements OnDestroy {
  private blockNoteEditorService = inject(NgxBlocknoteService);
  private elRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private renderer2 = inject(Renderer2);

  show = signal(false);
  cleanup: () => void = () => {
    return;
  };
  unsubscribeUpdate: () => void = () => {
    return;
  };

  readonly triggerCharacter = input.required<string>();
  readonly minQueryLength = input<number | undefined>();

  constructor() {
    effect(() => {
      this.adjustVisibilityAndPosition();
    });
  }

  ngOnDestroy() {
    this.cleanup();
    this.unsubscribeUpdate();
  }

  private adjustVisibilityAndPosition() {
    const editor = this.blockNoteEditorService.editor();

    // Unsubscribe any previous listener before registering a new one
    this.unsubscribeUpdate();

    this.unsubscribeUpdate = editor.suggestionMenus.onUpdate(
      this.triggerCharacter(),
      async (suggestionMenuState) => {
        this.cleanup();

        const minLen = this.minQueryLength();
        let shouldShow = suggestionMenuState.show;
        if (minLen && !suggestionMenuState.ignoreQueryLength) {
          const q = suggestionMenuState.query ?? '';
          if (q.startsWith(' ') || q.length < minLen) {
            shouldShow = false;
          }
        }

        this.show.set(shouldShow);
        if (shouldShow) {
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
          flip({ mainAxis: true, crossAxis: false }),
          shift(),
          size({
            apply: ({ availableHeight }) => {
              this.renderer2.setStyle(
                this.elRef.nativeElement,
                'maxHeight',
                `${availableHeight - 10}px`,
              );
              this.renderer2.setStyle(
                this.elRef.nativeElement,
                'minHeight',
                `300px`,
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
