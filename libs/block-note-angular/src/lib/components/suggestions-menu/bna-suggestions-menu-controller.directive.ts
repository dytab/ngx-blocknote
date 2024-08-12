import { Directive, effect, ElementRef, Input, Renderer2 } from '@angular/core';
import { autoUpdate, computePosition, flip } from '@floating-ui/dom';
import { BlockNoteAngularService } from '../../services/block-note-angular.service';
import { getVirtualElement } from '../../util/get-virtual-element.util';

@Directive({
  selector: 'bna-suggestions-menu-controller',
  standalone: true,
})
export class BnaSuggestionsMenuControllerDirective {
  @Input({ required: true }) triggerCharacter = '/';
  constructor(
    private blockNoteEditorService: BlockNoteAngularService,
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
    this.toggleVisibility(false);
    let cleanup: () => void = () => {
      return;
    };
    this.renderer2.addClass(this.elRef.nativeElement, 'z-30');
    this.renderer2.addClass(this.elRef.nativeElement, 'absolute');
    editor.suggestionMenus.onUpdate(
      this.triggerCharacter,
      async (suggestionMenuState) => {
        if (!suggestionMenuState.show) {
          cleanup();
        } else {
          const updatePosition = async () => {
            const result = await computePosition(
              getVirtualElement(suggestionMenuState.referencePos),
              this.elRef.nativeElement,
              {
                placement: 'bottom-start',
                middleware: [flip()],
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
        this.toggleVisibility(suggestionMenuState.show);
      }
    );
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
