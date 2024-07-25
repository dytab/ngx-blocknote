import {
  Directive,
  ElementRef,
  input,
  OnChanges,
  Renderer2,
} from '@angular/core';
import { BlockNoteEditor } from '@blocknote/core';

@Directive({
  selector: 'bna-formatting-toolbar[editor]',
  standalone: true,
})
export class BnaFormattingToolbarDirective implements OnChanges {
  editor = input.required<BlockNoteEditor>();

  constructor(
    protected elRef: ElementRef<HTMLElement>,
    private renderer2: Renderer2
  ) {}

  ngOnChanges() {
    this.adjustVisibilityAndPosition();
  }

  adjustVisibilityAndPosition() {
    const position = this.elRef.nativeElement.getBoundingClientRect();
    this.toggleVisibility(false);
    this.renderer2.addClass(this.elRef.nativeElement, 'z-30');
    this.renderer2.addClass(this.elRef.nativeElement, 'absolute');
    if (this.editor()) {
      this.editor().formattingToolbar.onUpdate((formattingToolbar) => {
        if (formattingToolbar.show) {
          this.renderer2.setStyle(
            this.elRef.nativeElement,
            'top',
            `${formattingToolbar.referencePos.top - position.top - 50}px`
          );
          this.renderer2.setStyle(
            this.elRef.nativeElement,
            'left',
            `${formattingToolbar.referencePos.left - position.left}px`
          );
        }
        this.toggleVisibility(formattingToolbar.show);
      });
    }
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
