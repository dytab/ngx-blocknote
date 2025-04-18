import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
} from '@spartan-ng/ui-menu-helm';
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';
import {
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '@spartan-ng/ui-tooltip-helm';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
import { fileBlock } from '../../../../util/file-block.util';
import { showFileBlock } from '../../../../util/show-file-block.util';

@Component({
  selector: 'bna-file-rename-button',
  imports: [
    CommonModule,
    HlmButtonDirective,
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuGroupComponent,
    ReactiveFormsModule,
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
    BrnTooltipContentDirective,
  ],
  templateUrl: './bna-file-rename-button.component.html',
  styleUrl: './bna-file-rename-button.component.css',
  host: {
    '[class]': '_visibilityClass()',
  },
})
export class BnaFileRenameButtonComponent {
  private ngxBlockNoteService = inject(NgxBlocknoteService);
  private formBuilder = inject(NonNullableFormBuilder);

  form = this.formBuilder.group({ name: ['', Validators.required] });
  fileBlock = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    const selectedBlocks = this.ngxBlockNoteService.selectedBlocks();
    return fileBlock(editor, selectedBlocks);
  });
  _visibilityClass = computed(() => {
    return showFileBlock(this.ngxBlockNoteService.editor(), this.fileBlock());
  });
  tooltip = computed(() => {
    const fileBlock = this.fileBlock();
    if (!fileBlock) {
      return '';
    }
    return this.ngxBlockNoteService.editor().dictionary.formatting_toolbar
      .file_rename.tooltip[fileBlock.type];
  });

  submit() {
    const editor = this.ngxBlockNoteService.editor();
    const name = this.form.controls.name.value;
    const fileBlock = this.fileBlock();
    if (!fileBlock) {
      return;
    }
    editor.updateBlock(fileBlock, {
      props: {
        name: name,
      },
    });
    editor.focus();
  }
}
