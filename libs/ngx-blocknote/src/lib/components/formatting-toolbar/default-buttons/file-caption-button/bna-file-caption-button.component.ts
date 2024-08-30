import { CommonModule } from '@angular/common';
import { Component, computed, effect } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { checkBlockIsFileBlock } from '@blocknote/core';
import { provideIcons } from '@ng-icons/core';
import { lucideTextCursorInput } from '@ng-icons/lucide';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
import {
  HlmButtonDirective,
  HlmIconComponent,
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '../../../../ui';
import { fileBlock } from '../../../../util/file-block.util';
import { showFileBlock } from '../../../../util/show-file-block.util';

@Component({
  selector: 'bna-file-caption-button',
  standalone: true,
  imports: [
    CommonModule,
    HlmButtonDirective,
    HlmIconComponent,
    HlmMenuComponent,
    BrnMenuTriggerDirective,
    HlmMenuGroupComponent,
    ReactiveFormsModule,
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
    BrnTooltipContentDirective,
  ],
  templateUrl: './bna-file-caption-button.component.html',
  styleUrl: './bna-file-caption-button.component.css',
  providers: [provideIcons({ lucideTextCursorInput })],
  host: {
    '[class]': '_visibilityClass()',
  },
})
export class BnaFileCaptionButtonComponent {
  fileBlock = computed(() => {
    return fileBlock(
      this.ngxBlockNoteService.editor(),
      this.ngxBlockNoteService.selectedBlocks()
    );
  });

  _visibilityClass = computed(() => {
    return showFileBlock(this.ngxBlockNoteService.editor(), this.fileBlock());
  });

  form = this.formBuilder.group({ caption: ['', Validators.required] });
  dict = this.ngxBlockNoteService.editor().dictionary;

  constructor(
    private ngxBlockNoteService: NgxBlocknoteService,
    private formBuilder: NonNullableFormBuilder
  ) {
    effect(() => {
      this.patchFormValues();
    });
  }

  private patchFormValues() {
    const editor = this.ngxBlockNoteService.editor();
    const selectedBlocks = this.ngxBlockNoteService.selectedBlocks();
    const firstBlock = selectedBlocks[0];
    if (!firstBlock) {
      return;
    }
    if (checkBlockIsFileBlock(firstBlock, editor)) {
      this.form.setValue({ caption: firstBlock.props.caption });
    }
  }

  submit() {
    const editor = this.ngxBlockNoteService.editor();
    const caption = this.form.controls.caption.value;
    const fileBlock = this.fileBlock();
    if (!fileBlock) {
      return;
    }
    editor.updateBlock(fileBlock, {
      props: {
        caption: caption,
      },
    });
    editor.focus();
  }
}
