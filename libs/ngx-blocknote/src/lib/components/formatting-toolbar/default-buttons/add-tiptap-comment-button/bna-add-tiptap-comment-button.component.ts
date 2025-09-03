import { Component, computed, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMessageCircle } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { BrnTooltipContentTemplate } from '@spartan-ng/brain/tooltip';
import { HlmTooltip, HlmTooltipTrigger } from '@spartan-ng/helm/tooltip';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';

/**
 * This comment button shows when a addPendingComment command is available on the underlying tiptap editor.
 */
@Component({
  selector: 'bna-add-tiptap-comment-button',
  imports: [
    HlmButton,
    HlmTooltip,
    HlmTooltipTrigger,
    BrnTooltipContentTemplate,
    NgIcon,
    HlmIcon,
  ],
  providers: [provideIcons({ lucideMessageCircle })],
  templateUrl: './bna-add-tiptap-comment-button.component.html',
  host: {
    '[class]': '_visibilityClass()',
  },
})
export class BnaAddTiptapCommentButtonComponent {
  private ngxBlockNoteService = inject(NgxBlocknoteService);

  readonly tooltip = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    return editor.dictionary.formatting_toolbar.comment.tooltip;
  });

  // Control visibility - only show if addPendingComment command is available
  readonly _visibilityClass = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    if (!editor.isEditable) {
      return 'hidden';
    }
    // Check if addPendingComment command is available on the underlying tiptap editor
    const tiptapEditor = (editor as any)._tiptapEditor;
    return tiptapEditor && (tiptapEditor.commands as any)['addPendingComment'] ? '' : 'hidden';
  });

  onClick() {
    const editor = this.ngxBlockNoteService.editor();
    const tiptapEditor = (editor as any)._tiptapEditor;
    if (tiptapEditor) {
      tiptapEditor.chain().focus().addPendingComment().run();
    }
  }
}
