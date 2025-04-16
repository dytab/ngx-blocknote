import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { BrnTooltipContentDirective } from '@spartan-ng/brain/tooltip';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
import {
  HlmButtonDirective,
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '../../../../ui';
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
  host: {
    '[class]': '_visibilityClass()',
  },
})
export class BnaFileRenameButtonComponent {
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

  constructor(
    private ngxBlockNoteService: NgxBlocknoteService,
    private formBuilder: NonNullableFormBuilder,
  ) {}

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
