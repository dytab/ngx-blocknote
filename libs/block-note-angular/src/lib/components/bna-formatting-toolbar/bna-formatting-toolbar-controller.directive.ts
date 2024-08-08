import { Directive, effect, ElementRef, Renderer2 } from '@angular/core';
import { FormattingToolbarState } from '@blocknote/core';
import { autoUpdate, computePosition, flip } from '@floating-ui/dom';
import { BlockNoteAngularService } from '../../services/block-note-angular.service';
import { getVirtualElement } from '../../util/get-virtual-element.util';

@Directive({
  selector: 'bna-formatting-toolbar-controller',
  standalone: true,
})
export class BnaFormattingToolbarControllerDirective {
  constructor(
    private blockNoteAngularService: BlockNoteAngularService,
    protected elRef: ElementRef<HTMLElement>,
    private renderer2: Renderer2
  ) {
    effect(() => {
      this.adjustVisibilityAndPosition();
    });
  }

  adjustVisibilityAndPosition() {
    this.toggleVisibility(false);
    let cleanup: () => void = () => {
      return;
    };
    this.renderer2.addClass(this.elRef.nativeElement, 'z-40');
    this.renderer2.addClass(this.elRef.nativeElement, 'absolute');
    const editor = this.blockNoteAngularService.editor();
    if (editor) {
      editor.formattingToolbar.onUpdate(async (formattingToolbar) => {
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
        this.toggleVisibility(formattingToolbar.show);
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
