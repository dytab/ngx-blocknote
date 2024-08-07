import {
  Directive,
  ElementRef,
  input,
  OnChanges,
  Renderer2,
} from '@angular/core';
import { BlockNoteEditor, FormattingToolbarState } from '@blocknote/core';
import { autoUpdate, computePosition, flip } from '@floating-ui/dom';
import { getVirtualElement } from '../../util/get-virtual-element.util';

@Directive({
  selector: 'bna-formatting-toolbar[editor]',
  standalone: true,
})
export class BnaFormattingToolbarDirective implements OnChanges {
  editor = input.required<BlockNoteEditor<any, any, any>>();

  constructor(
    protected elRef: ElementRef<HTMLElement>,
    private renderer2: Renderer2
  ) {}

  ngOnChanges() {
    this.adjustVisibilityAndPosition();
  }

  adjustVisibilityAndPosition() {
    this.toggleVisibility(false);
    let cleanup: () => void = () => {
      return;
    };
    this.renderer2.addClass(this.elRef.nativeElement, 'z-40');
    this.renderer2.addClass(this.elRef.nativeElement, 'absolute');
    if (this.editor()) {
      this.editor().formattingToolbar.onUpdate(async (formattingToolbar) => {
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
