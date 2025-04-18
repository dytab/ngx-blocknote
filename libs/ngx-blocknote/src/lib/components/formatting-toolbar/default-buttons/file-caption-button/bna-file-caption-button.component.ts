import { CommonModule } from '@angular/common';
import { Component, computed, effect } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { checkBlockIsFileBlock } from '@blocknote/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTextCursorInput } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
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
  selector: 'bna-file-caption-button',
  imports: [
    CommonModule,
    HlmButtonDirective,
    HlmMenuComponent,
    BrnMenuTriggerDirective,
    HlmMenuGroupComponent,
    ReactiveFormsModule,
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
    BrnTooltipContentDirective,
    NgIcon,
    HlmIconDirective,
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
      this.ngxBlockNoteService.selectedBlocks(),
    );
  });

  _visibilityClass = computed(() => {
    return showFileBlock(this.ngxBlockNoteService.editor(), this.fileBlock());
  });

  form = this.formBuilder.group({ caption: ['', Validators.required] });
  dict = this.ngxBlockNoteService.editor().dictionary;

  constructor(
    private ngxBlockNoteService: NgxBlocknoteService,
    private formBuilder: NonNullableFormBuilder,
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
