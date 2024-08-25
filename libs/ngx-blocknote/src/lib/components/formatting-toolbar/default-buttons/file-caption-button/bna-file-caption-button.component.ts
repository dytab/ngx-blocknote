import { Component, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '../../../../ui/ui-button-helm/hlm-button.directive';
import { HlmIconComponent } from '../../../../ui/ui-icon-helm/hlm-icon.component';
import { provideIcons } from '@ng-icons/core';
import { lucideTextCursorInput } from '@ng-icons/lucide';
import { BlockNoteAngularService } from '../../../../services/block-note-angular.service';
import { showFileBlock } from '../../../../util/show-file-block.util';
import { fileBlock } from '../../../../util/file-block.util';
import { HlmMenuComponent } from '../../../../ui/ui-menu-helm/hlm-menu.component';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { HlmMenuGroupComponent } from '../../../../ui/ui-menu-helm/hlm-menu-group.component';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { checkBlockIsFileBlock } from '@blocknote/core';

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

  constructor(
    private blockNoteAngularService: BlockNoteAngularService,
    private formBuilder: NonNullableFormBuilder
  ) {
    effect(() => {
      const editor = this.blockNoteAngularService.editor();
      const selectedBlocks = this.blockNoteAngularService.selectedBlocks();
      const firstBlock = selectedBlocks[0];
      if (!firstBlock) {
        return;
      }
      if (checkBlockIsFileBlock(firstBlock, editor)) {
        this.form.setValue({ caption: firstBlock.props.caption });
      }
    });
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
