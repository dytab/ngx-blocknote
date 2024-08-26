import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockNoteAngularService } from '../../../../services/block-note-angular.service';
import { fileBlock } from '../../../../util/file-block.util';
import { showFileBlock } from '../../../../util/show-file-block.util';
import { BnaLinkFormComponent } from '../../../link-toolbar/link-form/bna-link-form.component';
import {
  HlmButtonDirective,
  HlmIconComponent,
  HlmMenuComponent,
  HlmMenuGroupComponent, HlmTooltipComponent, HlmTooltipTriggerDirective
} from '../../../../ui';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';

@Component({
  selector: 'bna-file-rename-button',
  standalone: true,
  imports: [
    CommonModule,
    BnaLinkFormComponent,
    HlmButtonDirective,
    HlmIconComponent,
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
  form = this.formBuilder.group({ name: ['', Validators.required] });
  fileBlock = computed(() => {
    const editor = this.blockNoteAngularService.editor();
    const selectedBlocks = this.blockNoteAngularService.selectedBlocks();
    return fileBlock(editor, selectedBlocks);
  });
  _visibilityClass = computed(() => {
    return showFileBlock(
      this.blockNoteAngularService.editor(),
      this.fileBlock()
    );
  });
  tooltip = computed(() => {
    const fileBlock = this.fileBlock();
    if (!fileBlock) {
      return '';
    }
    return this.blockNoteAngularService.editor().dictionary.formatting_toolbar
      .file_rename.tooltip[fileBlock.type];
  });

  constructor(
    private blockNoteAngularService: BlockNoteAngularService,
    private formBuilder: NonNullableFormBuilder
  ) {}

  submit() {
    const editor = this.blockNoteAngularService.editor();
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
