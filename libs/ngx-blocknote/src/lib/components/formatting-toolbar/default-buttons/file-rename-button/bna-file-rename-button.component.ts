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
import { BrnMenuTrigger } from '@spartan-ng/brain/menu';
import { BrnTooltipContentTemplate } from '@spartan-ng/brain/tooltip';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmMenu, HlmMenuGroup } from '@spartan-ng/helm/menu';
import { HlmTooltip, HlmTooltipTrigger } from '@spartan-ng/helm/tooltip';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
import { fileBlock } from '../../../../util/file-block.util';
import { showFileBlock } from '../../../../util/show-file-block.util';

@Component({
  selector: 'bna-file-rename-button',
  imports: [
    HlmButton,
    BrnMenuTrigger,
    HlmMenu,
    HlmMenuGroup,
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
    if (!editor) return null;
    return fileBlock(editor, selectedBlocks);
  });
  _visibilityClass = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    const file = this.fileBlock();
    if (!editor || !file) return 'hidden';
    return showFileBlock(editor, file);
  });
  tooltip = computed(() => {
    const fileBlock = this.fileBlock();
    const editor = this.ngxBlockNoteService.editor();
    if (!fileBlock || !editor) {
      return '';
    }
    return editor.dictionary.formatting_toolbar.file_rename.tooltip[
      fileBlock.type
    ];
  });

  submit() {
    const editor = this.ngxBlockNoteService.editor();
    const name = this.form.controls.name.value;
    const fileBlock = this.fileBlock();
    if (!fileBlock || !editor) {
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
