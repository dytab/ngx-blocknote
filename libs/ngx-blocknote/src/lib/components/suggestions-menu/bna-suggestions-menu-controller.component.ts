import {
  Component,
  effect,
  ElementRef,
  Input,
  Renderer2,
  signal,
} from '@angular/core';
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  size,
} from '@floating-ui/dom';
import { NgxBlocknoteService } from '../../services/ngx-blocknote.service';
import { getVirtualElement } from '../../util/get-virtual-element.util';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'bna-suggestions-menu-controller',
  standalone: true,
  host:{
    class: 'z-30 fixed flex'
  },
  template: `@if(show()){<ng-content />}`,
})
export class BnaSuggestionsMenuControllerComponent {
  show = signal(false);

  @Input({ required: true }) triggerCharacter = '/';
  constructor(
    private blockNoteEditorService: NgxBlocknoteService,
    private elRef: ElementRef<HTMLElement>,
    private renderer2: Renderer2
  ) {
    effect(() => {
      this.adjustVisibilityAndPosition();
    });
  }

  private adjustVisibilityAndPosition() {
    const editor = this.blockNoteEditorService.editor();
    if (!editor) {
      return;
    }
    let cleanup: () => void = () => {
      return;
    };
    editor.suggestionMenus.onUpdate(
      this.triggerCharacter,
      async (suggestionMenuState) => {
        this.show.set(suggestionMenuState.show);
        if (!suggestionMenuState.show) {
          cleanup();
        } else {
          const updatePosition = async () => {
            const result = await computePosition(
              getVirtualElement(suggestionMenuState.referencePos),
              this.elRef.nativeElement,
              {
                strategy: 'fixed',
                placement: 'bottom-start',
                middleware: [
                  offset(10),
                  flip(),
                  size({
                    apply: ({ availableWidth, availableHeight, elements }) => {
                      this.renderer2.setStyle(
                        this.elRef.nativeElement,
                        'maxHeight',
                        `${availableHeight - 10}px`
                      );
                    },
                  }),
                ],
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
            getVirtualElement(suggestionMenuState.referencePos),
            this.elRef.nativeElement,
            updatePosition
          );
        }
      }
    );
  }
}
