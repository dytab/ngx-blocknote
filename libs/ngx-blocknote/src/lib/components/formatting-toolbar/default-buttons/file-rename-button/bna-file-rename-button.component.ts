import { Component, computed, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
} from '@blocknote/core';
import { HlmButton } from '@spartan-ng/helm/button';

import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { BrnTooltipContentTemplate } from '@spartan-ng/brain/tooltip';
import { HlmTooltip, HlmTooltipTrigger } from '@spartan-ng/helm/tooltip';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
import { fileBlock } from '../../../../util/file-block.util';
import { showFileBlock } from '../../../../util/show-file-block.util';

@Component({
  selector: 'bna-file-rename-button',
  imports: [
    HlmButton,
    HlmDropdownMenuImports,
    ReactiveFormsModule,
    HlmTooltip,
    HlmTooltipTrigger,
    BrnTooltipContentTemplate,
  ],
  templateUrl: './bna-file-rename-button.component.html',
  host: {
    '[class]': '_visibilityClass()',
  },
})
export class BnaFileRenameButtonComponent {
  private ngxBlockNoteService = inject(
    NgxBlocknoteService<
      DefaultBlockSchema,
      DefaultInlineContentSchema,
      DefaultStyleSchema
    >,
  );
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
