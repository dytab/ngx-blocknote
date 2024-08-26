import { Component, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HlmButtonDirective,
  HlmIconComponent,
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '../../../../ui';
import { provideIcons } from '@ng-icons/core';
import { lucideTextCursorInput } from '@ng-icons/lucide';
import { BlockNoteAngularService } from '../../../../services/block-note-angular.service';
import { showFileBlock } from '../../../../util/show-file-block.util';
import { fileBlock } from '../../../../util/file-block.util';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { checkBlockIsFileBlock } from '@blocknote/core';
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';

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
      this.blockNoteAngularService.editor(),
      this.blockNoteAngularService.selectedBlocks()
    );
  });

  _visibilityClass = computed(() => {
    return showFileBlock(
      this.blockNoteAngularService.editor(),
      this.fileBlock()
    );
  });

  form = this.formBuilder.group({ caption: ['', Validators.required] });
  dict = this.blockNoteAngularService.editor().dictionary;

  constructor(
    private blockNoteAngularService: BlockNoteAngularService,
    private formBuilder: NonNullableFormBuilder
  ) {
    effect(() => {
      this.patchFormValues();
    });
  }

  private patchFormValues() {
    const editor = this.blockNoteAngularService.editor();
    const selectedBlocks = this.blockNoteAngularService.selectedBlocks();
    const firstBlock = selectedBlocks[0];
    if (!firstBlock) {
      return;
    }
    if (checkBlockIsFileBlock(firstBlock, editor)) {
      this.form.setValue({ caption: firstBlock.props.caption });
    }
  }

  submit() {
    const editor = this.blockNoteAngularService.editor();
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
