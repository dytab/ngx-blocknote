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
    const position = this.elRef.nativeElement.getBoundingClientRect();
    this.renderer2.setStyle(this.elRef.nativeElement, 'display', 'none');
    this.renderer2.setStyle(this.elRef.nativeElement, 'position', 'absolute');
    this.renderer2.setStyle(this.elRef.nativeElement, 'z-index', '10000');
    this.renderer2.addClass(this.elRef.nativeElement, 'Test');
    if (this.editor()) {
      this.editor().formattingToolbar.onUpdate((formattingToolbar) => {
        if (formattingToolbar.show) {
          this.renderer2.setStyle(this.elRef.nativeElement, 'display', 'block');
          this.renderer2.setStyle(
            this.elRef.nativeElement,
            'top',
            `${
              formattingToolbar.referencePos.top -
              position.top +
              formattingToolbar.referencePos.height
            }px`
          );
          this.renderer2.setStyle(
            this.elRef.nativeElement,
            'left',
            `${formattingToolbar.referencePos.left - position.left}px`
          );
        } else {
          this.renderer2.setStyle(this.elRef.nativeElement, 'display', 'none');
        }
      });
    }
  }
}
