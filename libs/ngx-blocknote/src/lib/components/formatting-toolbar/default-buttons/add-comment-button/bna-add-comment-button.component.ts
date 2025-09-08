import { Component, computed, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMessageCircle } from '@ng-icons/lucide';
import { BrnTooltipContentTemplate } from '@spartan-ng/brain/tooltip';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmTooltip, HlmTooltipTrigger } from '@spartan-ng/helm/tooltip';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';

@Component({
  selector: 'bna-add-comment-button',
  imports: [
    HlmButton,
    HlmTooltip,
    HlmTooltipTrigger,
    BrnTooltipContentTemplate,
    NgIcon,
    HlmIcon,
  ],
  providers: [provideIcons({ lucideMessageCircle })],
  templateUrl: './bna-add-comment-button.component.html',
  host: {
    '[class]': '_visibilityClass()',
  },
})
export class BnaAddCommentButtonComponent {
  private ngxBlockNoteService = inject(NgxBlocknoteService);

  readonly tooltip = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    return editor?.dictionary.formatting_toolbar.comment.tooltip || '';
  });

  // Control visibility - only show if comments extension is available
  readonly _visibilityClass = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    if (!editor || !editor.isEditable) {
      return 'hidden';
    }
    // Check if a comment extension (like liveblocks) is installed
    return (editor as any).comments ? '' : 'hidden';
  });

  onClick() {
    const editor = this.ngxBlockNoteService.editor();
    if (!editor) return;
    (editor as any).comments?.startPendingComment();
    editor.formattingToolbar.closeMenu();
  }
}
