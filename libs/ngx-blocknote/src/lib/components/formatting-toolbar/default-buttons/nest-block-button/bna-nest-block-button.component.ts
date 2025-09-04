import { Component, computed, inject, signal } from '@angular/core';
import { formatKeyboardShortcut } from '@blocknote/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronRight } from '@ng-icons/lucide';
import { BrnTooltipContentTemplate } from '@spartan-ng/brain/tooltip';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmTooltip, HlmTooltipTrigger } from '@spartan-ng/helm/tooltip';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';

@Component({
  selector: 'bna-nest-block-button',
  imports: [
    HlmButton,
    HlmTooltip,
    HlmTooltipTrigger,
    BrnTooltipContentTemplate,
    NgIcon,
    HlmIcon,
  ],
  providers: [provideIcons({ lucideChevronRight })],
  templateUrl: './bna-nest-block-button.component.html',
  host: {
    '[class]': '_visibilityClass()',
  },
})
export class BnaNestBlockButtonComponent {
  private ngxBlockNoteService = inject(NgxBlocknoteService);

  readonly canNestBlock = signal(false);

  readonly tooltip = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    return editor?.dictionary.formatting_toolbar.nest.tooltip || '';
  });

  readonly secondaryTooltip = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    if (!editor) return '';
    const dict = editor.dictionary;
    return formatKeyboardShortcut(
      dict.formatting_toolbar.nest.secondary_tooltip,
      dict.generic.ctrl_shortcut,
    );
  });

  readonly show = computed(() => {
    const selectedBlocks = this.ngxBlockNoteService.selectedBlocks();
    const editor = this.ngxBlockNoteService.editor();
    if (!editor) return false;

    // Only show for blocks with inline content (not complex blocks like tables)
    return !selectedBlocks.find(
      (block) => editor.schema.blockSchema[block.type].content !== 'inline',
    );
  });

  readonly _visibilityClass = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    if (!editor || !editor.isEditable || !this.show()) {
      return 'hidden';
    }
    return '';
  });

  readonly isDisabled = computed(() => !this.canNestBlock());

  constructor() {
    const editor = this.ngxBlockNoteService.editor();
    if (!editor) return;

    // Initialize can nest state
    this.canNestBlock.set(editor.canNestBlock());

    // Update state on content or selection changes
    editor.onEditorContentChange(() => {
      this.canNestBlock.set(editor.canNestBlock());
    });
    editor.onEditorSelectionChange(() => {
      this.canNestBlock.set(editor.canNestBlock());
    });
  }

  onClick() {
    const editor = this.ngxBlockNoteService.editor();
    if (!editor) return;
    editor.focus();
    editor.nestBlock();
  }
}
