import { Component, computed, inject, signal } from '@angular/core';
import { formatKeyboardShortcut } from '@blocknote/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronLeft } from '@ng-icons/lucide';
import { BrnTooltipContentTemplate } from '@spartan-ng/brain/tooltip';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmTooltip, HlmTooltipTrigger } from '@spartan-ng/helm/tooltip';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';

@Component({
  selector: 'bna-unnest-block-button',
  imports: [
    HlmButton,
    HlmTooltip,
    HlmTooltipTrigger,
    BrnTooltipContentTemplate,
    NgIcon,
    HlmIcon,
  ],
  providers: [provideIcons({ lucideChevronLeft })],
  templateUrl: './bna-unnest-block-button.component.html',
  host: {
    '[class]': '_visibilityClass()',
  },
})
export class BnaUnnestBlockButtonComponent {
  private ngxBlockNoteService = inject(NgxBlocknoteService);

  readonly canUnnestBlock = signal(false);

  readonly tooltip = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    return editor?.dictionary.formatting_toolbar.unnest.tooltip;
  });

  readonly secondaryTooltip = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    const dict = editor?.dictionary;

    if (!dict) {
      return '';
    }

    return formatKeyboardShortcut(
      dict.formatting_toolbar.unnest.secondary_tooltip,
      dict.generic.ctrl_shortcut,
    );
  });

  readonly show = computed(() => {
    const selectedBlocks = this.ngxBlockNoteService.selectedBlocks();
    const editor = this.ngxBlockNoteService.editor();

    // Only show for blocks with inline content (not complex blocks like tables)
    return !selectedBlocks.find(
      (block) => editor?.schema.blockSchema[block.type].content !== 'inline',
    );
  });

  readonly _visibilityClass = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    if (!editor?.isEditable || !this.show()) {
      return 'hidden';
    }
    return '';
  });

  readonly isDisabled = computed(() => !this.canUnnestBlock());

  constructor() {
    const editor = this.ngxBlockNoteService.editor();

    // Initialize can unnest state
    if (editor) {
      this.canUnnestBlock.set(editor.canUnnestBlock());
    }

    // Update state on content or selection changes
    editor?.onEditorContentChange(() => {
      this.canUnnestBlock.set(editor?.canUnnestBlock());
    });
    editor?.onEditorSelectionChange(() => {
      this.canUnnestBlock.set(editor?.canUnnestBlock());
    });
  }

  onClick() {
    const editor = this.ngxBlockNoteService.editor();
    editor?.focus();
    editor?.unnestBlock();
  }
}
