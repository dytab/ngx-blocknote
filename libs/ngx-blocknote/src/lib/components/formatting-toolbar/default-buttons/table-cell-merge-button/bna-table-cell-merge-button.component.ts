import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { BrnTooltipContentTemplate } from '@spartan-ng/brain/tooltip';
import { HlmTooltip, HlmTooltipTrigger } from '@spartan-ng/helm/tooltip';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
import { lucideArrowLeftRight, lucideArrowUpDown } from '@ng-icons/lucide';

@Component({
  selector: 'bna-table-cell-merge-button',
  imports: [
    CommonModule,
    HlmButton,
    HlmTooltip,
    HlmTooltipTrigger,
    BrnTooltipContentTemplate,
    NgIcon,
    HlmIcon,
  ],
  providers: [provideIcons({ lucideArrowLeftRight, lucideArrowUpDown })],
  templateUrl: './bna-table-cell-merge-button.component.html',
  host: {
    '[class]': '_visibilityClass()',
  },
})
export class BnaTableCellMergeButtonComponent {
  private ngxBlockNoteService = inject(NgxBlocknoteService);

  // Determine merge direction when a single table block is selected
  readonly mergeDirection = computed<"horizontal" | "vertical" | undefined>(() => {
    const editor = this.ngxBlockNoteService.editor();
    const selected = this.ngxBlockNoteService.selectedBlocks();
    if (selected.length !== 1) {
      return undefined;
    }
    const block = selected[0];
    if (block.type === 'table') {
      return editor.tableHandles?.getMergeDirection(block as any);
    }
    return undefined;
  });

  readonly iconName = computed(() => {
    const dir = this.mergeDirection();
    return dir === 'horizontal' ? 'lucideArrowLeftRight' : 'lucideArrowUpDown';
  });

  readonly tooltip = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    return editor.dictionary.formatting_toolbar.table_cell_merge.tooltip;
  });

  // Control visibility similar to other toolbar buttons
  readonly _visibilityClass = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    if (!editor.isEditable) {
      return 'hidden';
    }
    if (editor.settings.tables.splitCells === false) {
      return 'hidden';
    }
    return this.mergeDirection() ? '' : 'hidden';
  });

  onClick() {
    const editor = this.ngxBlockNoteService.editor();
    editor.tableHandles?.mergeCells();
  }
}
