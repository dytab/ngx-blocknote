import { Component, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BlockFromConfig,
  BlockNoteEditor,
  FileBlockConfig,
} from '@blocknote/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-helm';
import { BlockNoteAngularService } from '../../services/block-note-angular.service';

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
  private focusedBlock?: BlockFromConfig<FileBlockConfig, any, any>;

  embedInputText = '';

  constructor(private blockNoteAngularService: BlockNoteAngularService) {
    effect(() => {
      this.updateFocusedBlock();
    });
  }

  private updateFocusedBlock() {
    const editor = this.blockNoteAngularService.editor();
    if (!editor) {
      return;
    }
    editor.filePanel?.onUpdate(async (filePanelState) => {
      if (!filePanelState.show) {
        this.focusedBlock = undefined;
      } else {
        this.focusedBlock = filePanelState.block;
      }
    });
  }

  async onFileInputChanged(event: Event) {
    const editor = this.blockNoteAngularService.editor();
    if (!editor) {
      return;
    }
    if (!editor.uploadFile || !this.focusedBlock) {
      console.error('uploadFile was not provided in editor options');
      return;
    }

    const files = (event.target as HTMLInputElement).files;
    if (!files) return;

    const file = files[0];
    const fileUrl = await editor.uploadFile(file);

    this.updateBlockWithEmbedFileUrl(this.focusedBlock, editor, fileUrl);
  }

  insertEmbedFile(embedFileUrl: string) {
    const editor = this.blockNoteAngularService.editor();
    if (!editor || !this.focusedBlock) return;
    this.updateBlockWithEmbedFileUrl(this.focusedBlock, editor, embedFileUrl);
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
