import { CommonModule } from '@angular/common';
import { Component, effect, ElementRef, Renderer2, signal, inject } from '@angular/core';
import { Block, BlockNoteEditor } from '@blocknote/core';
import { NgxBlocknoteService } from '../../services/ngx-blocknote.service';

@Component({
  imports: [CommonModule],
  selector: 'bna-side-menu-controller',
  host: {
    class: 'bn-side-menu',
  },
  template: `@if (show()) {
    <ng-content />
  }`,
})
export class BnaSideMenuControllerComponent {
  private ngxBlockNoteService = inject(NgxBlocknoteService);
  private elRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private renderer2 = inject(Renderer2);

  show = signal(true);

  constructor() {
    effect(() => {
      this.adjustVisibilityAndPosition();
    });
  }

  private adjustVisibilityAndPosition() {
    const editor = this.ngxBlockNoteService.editor();
    editor.sideMenu.onUpdate(async (sideMenuState) => {
      this.show.set(sideMenuState.show);
      this.ngxBlockNoteService.sideMenuFocusedBlock.set(sideMenuState.block);
      if (sideMenuState.show) {
        this.updateSideMenuAttributesWithBlock(editor, sideMenuState.block);
        this.renderer2.setStyle(
          this.elRef.nativeElement,
          'top',
          `${sideMenuState.referencePos.y}px`,
        );
      }
    });
  }

  private updateSideMenuAttributesWithBlock(
    editor: BlockNoteEditor,
    block: Block,
  ) {
    this.renderer2.setAttribute(
      this.elRef.nativeElement,
      'data-block-type',
      block.type,
    );

    if (block.type === 'heading') {
      this.renderer2.setAttribute(
        this.elRef.nativeElement,
        'data-level',
        block.props.level.toString(),
      );
    } else {
      this.renderer2.removeAttribute(this.elRef.nativeElement, 'data-level');
    }
    //TODO: remove any cast
    if ((editor.schema.blockSchema[block.type] as any).isFileBlock) {
      //TODO: remove any cast
      if ((block.props as any).url) {
        this.renderer2.setAttribute(
          this.elRef.nativeElement,
          'data-url',
          'true',
        );
      } else {
        this.renderer2.setAttribute(
          this.elRef.nativeElement,
          'data-url',
          'false',
        );
      }
    } else {
      this.renderer2.removeAttribute(this.elRef.nativeElement, 'data-url');
    }
  }
}
