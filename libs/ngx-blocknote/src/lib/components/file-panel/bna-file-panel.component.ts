import { Component, signal, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { NgxBlocknoteService } from '../../services/ngx-blocknote.service';

@Component({
  selector: 'bna-file-panel',
  imports: [
    HlmInputDirective,
    HlmTabsComponent,
    HlmTabsListComponent,
    HlmButtonDirective,
    FormsModule,
    HlmTabsTriggerDirective,
    HlmTabsContentDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './bna-file-panel.component.html',
})
export class BnaFilePanelComponent {
  private ngxBlockNoteService = inject(NgxBlocknoteService);

  focusedBlock = signal<BlockFromConfig<FileBlockConfig, any, any> | undefined>(
    undefined,
  );

  embedInputText = '';
  fileControl = new FormControl();

  constructor() {
    const editor = this.ngxBlockNoteService.editor();
    if (editor.filePanel) {
      //TODO: remove the workaround
      //Workaround use view state from file panel to get the block
      this.focusedBlock.set((editor.filePanel! as any).view.state.block);
      editor.filePanel.onUpdate(async (filePanelState) => {
        if (!filePanelState.show) {
          this.focusedBlock.set(undefined);
        } else {
          this.focusedBlock.set(filePanelState.block);
        }
      });
    }
  }

  async onFileInputChanged(event: Event) {
    const editor = this.ngxBlockNoteService.editor();
    const focusedBlock = this.focusedBlock();
    if (!editor.uploadFile || !focusedBlock) {
      console.error('uploadFile was not provided in editor options');
      return;
    }

    const files = (event.target as HTMLInputElement).files;
    if (!files) return;

    const file = files[0];
    const fileUrl = await editor.uploadFile(file);
    this.updateBlockWithEmbedFileUrl(focusedBlock, editor, fileUrl);
    this.focusedBlock.set(undefined);
    this.fileControl.reset();
  }

  insertEmbedFile(embedFileUrl: string) {
    const editor = this.ngxBlockNoteService.editor();
    const focusedBlock = this.focusedBlock();
    if (!focusedBlock) return;
    this.updateBlockWithEmbedFileUrl(focusedBlock, editor, embedFileUrl);
  }

  private updateBlockWithEmbedFileUrl(
    block: BlockFromConfig<FileBlockConfig, any, any>,
    editor: BlockNoteEditor<any, any, any>,
    embedFileUrl: string | Record<string, any>,
  ) {
    editor.updateBlock(block, {
      props: {
        url: embedFileUrl,
      },
    });
    editor.filePanel?.closeMenu();
    editor.focus();
  }
}
