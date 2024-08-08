import { Component, effect, ElementRef, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BlockFromConfig,
  BlockNoteEditor,
  FileBlockConfig,
} from '@blocknote/core';
import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-helm';
import { BlockNoteAngularService } from '../../services/block-note-angular.service';
import { getVirtualElement } from '../../util/get-virtual-element.util';

@Component({
  selector: 'bna-file-panel',
  standalone: true,
  imports: [
    HlmInputDirective,
    HlmTabsComponent,
    HlmTabsListComponent,
    HlmButtonDirective,
    FormsModule,
    HlmTabsTriggerDirective,
    HlmTabsContentDirective,
  ],
  templateUrl: './bna-file-panel.component.html',
})
export class BnaFilePanelComponent {
  private block?: BlockFromConfig<FileBlockConfig, any, any>;

  embedInputText = '';

  constructor(
    private blockNoteAngularService: BlockNoteAngularService,
    private elRef: ElementRef<HTMLElement>,
    private renderer2: Renderer2
  ) {
    effect(() => {
      this.adjustVisibilityAndPosition();
    });
  }

  private adjustVisibilityAndPosition() {
    const editor = this.blockNoteAngularService.editor();
    if (!editor) {
      return;
    }
    this.toggleVisibility(false);
    let cleanup: () => void = () => {
      return;
    };
    this.renderer2.addClass(this.elRef.nativeElement, 'z-30');
    this.renderer2.addClass(this.elRef.nativeElement, 'absolute');
    editor.filePanel?.onUpdate(async (filePanelState) => {
      if (!filePanelState.show) {
        cleanup();
      } else {
        this.block = filePanelState.block;
        const updatePosition = async () => {
          const result = await computePosition(
            getVirtualElement(filePanelState.referencePos),
            this.elRef.nativeElement,
            {
              placement: 'bottom',
              middleware: [offset(10), flip()],
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
          getVirtualElement(filePanelState.referencePos),
          this.elRef.nativeElement,
          updatePosition
        );
      }
      this.toggleVisibility(filePanelState.show);
    });
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

  async onFileInputChanged(event: Event) {
    const editor = this.blockNoteAngularService.editor();
    if (!editor) {
      return;
    }
    if (!editor.uploadFile || !this.block) {
      console.error('uploadFile was not provided in editor options');
      return;
    }

    const files = (event.target as HTMLInputElement).files;
    if (!files) return;

    const file = files[0];
    const fileUrl = await editor.uploadFile(file);

    this.updateBlockWithEmbedFileUrl(this.block, editor, fileUrl);
  }

  insertEmbedFile(embedFileUrl: string) {
    const editor = this.blockNoteAngularService.editor();
    if (!editor || !this.block) return;
    this.updateBlockWithEmbedFileUrl(this.block, editor, embedFileUrl);
  }

  private updateBlockWithEmbedFileUrl(
    block: BlockFromConfig<FileBlockConfig, any, any>,
    editor: BlockNoteEditor<any, any, any>,
    embedFileUrl: string | Record<string, any>
  ) {
    editor.updateBlock(block, {
      props: {
        url: embedFileUrl,
      },
    });

    editor.filePanel?.closeMenu();
  }
}
