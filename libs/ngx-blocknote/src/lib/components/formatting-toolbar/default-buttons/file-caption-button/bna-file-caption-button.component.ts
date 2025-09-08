import { Component, computed, effect, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  checkBlockIsFileBlock,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
} from '@blocknote/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTextCursorInput } from '@ng-icons/lucide';
import { BrnMenuTrigger } from '@spartan-ng/brain/menu';
import { BrnTooltipContentTemplate } from '@spartan-ng/brain/tooltip';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmMenu, HlmMenuGroup } from '@spartan-ng/helm/menu';
import { HlmTooltip, HlmTooltipTrigger } from '@spartan-ng/helm/tooltip';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
import { fileBlock } from '../../../../util/file-block.util';
import { showFileBlock } from '../../../../util/show-file-block.util';

@Component({
  selector: 'bna-file-caption-button',
  imports: [
    HlmButton,
    HlmMenu,
    BrnMenuTrigger,
    HlmMenuGroup,
    ReactiveFormsModule,
    HlmTooltip,
    HlmTooltipTrigger,
    BrnTooltipContentTemplate,
    NgIcon,
    HlmIcon,
  ],
  templateUrl: './bna-file-caption-button.component.html',
  providers: [provideIcons({ lucideTextCursorInput })],
  host: {
    '[class]': '_visibilityClass()',
  },
})
export class BnaFileCaptionButtonComponent {
  private ngxBlockNoteService = inject(
    NgxBlocknoteService<
      DefaultBlockSchema,
      DefaultInlineContentSchema,
      DefaultStyleSchema
    >,
  );
  private formBuilder = inject(NonNullableFormBuilder);

  fileBlock = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    if (!editor) return null;
    return fileBlock<
      DefaultBlockSchema,
      DefaultInlineContentSchema,
      DefaultStyleSchema
    >(editor, this.ngxBlockNoteService.selectedBlocks());
  });

  _visibilityClass = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    if (!editor) return 'hidden';
    const fileBlock = this.fileBlock();
    if (!fileBlock) return 'hidden';
    return showFileBlock(editor, fileBlock);
  });

  form = this.formBuilder.group({ caption: ['', Validators.required] });
  dict = this.ngxBlockNoteService.editor()?.dictionary || {};

  constructor() {
    effect(() => {
      this.patchFormValues();
    });
  }

  private patchFormValues() {
    const editor = this.ngxBlockNoteService.editor();
    if (!editor) return;
    const selectedBlocks = this.ngxBlockNoteService.selectedBlocks();
    const firstBlock = selectedBlocks[0];
    if (!firstBlock) {
      return;
    }
    if (checkBlockIsFileBlock(firstBlock, editor)) {
      //TODO: remove cast
      this.form.setValue({ caption: (firstBlock.props as any).caption });
    }
  }

  submit() {
    const editor = this.ngxBlockNoteService.editor();
    if (!editor) return;
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
