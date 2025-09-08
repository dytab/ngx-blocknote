import { Component, computed, inject, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { TableHandleOptions } from '../../../../../interfaces/table-handle-options.type';
import { NgxBlocknoteService } from '../../../../../services';

@Component({
  selector: 'bna-table-header-button',
  imports: [HlmButton, NgIcon, HlmIcon],
  providers: [provideIcons({ lucideCheck })],
  templateUrl: './bna-table-header-button.component.html',
})
export class BnaTableHeaderButtonComponent {
  private ngxBlockNoteService = inject(NgxBlocknoteService);

  readonly options = input.required<TableHandleOptions>();

  readonly dict = computed(
    () => this.ngxBlockNoteService.editor()?.dictionary || {},
  );

  // Show only for first row/column and when headers are enabled in settings
  readonly show = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    const opts = this.options();
    const th = opts.tableHandles;
    if (!editor || !th || editor.settings.tables.headers === false) {
      return false;
    }
    const isRow = opts.orientation === 'row';
    const index = isRow ? th.rowIndex : th.colIndex;
    return index === 0;
  });

  readonly checked = computed(() => {
    const opts = this.options();
    const th = opts.tableHandles;
    const block: any = th.block;
    if (!block) return false;
    if (opts.orientation === 'row') {
      return Boolean(block.content?.headerRows);
    }
    return Boolean(block.content?.headerCols);
  });

  readonly label = computed(() => {
    const d = this.dict();
    return this.options().orientation === 'row'
      ? (d as any)?.drag_handle?.header_row_menuitem || 'Toggle Header Row'
      : (d as any)?.drag_handle?.header_column_menuitem ||
          'Toggle Header Column';
  });

  toggleHeader() {
    const editor = this.ngxBlockNoteService.editor();
    const opts = this.options();
    const th = opts.tableHandles;
    const current = th.block as any;
    if (!editor || !current) return;

    // Fetch latest block to avoid stale updates
    const latest = (editor.getBlock(current.id) as any) || current;

    if (opts.orientation === 'row') {
      const isHeaderRow = Boolean(latest.content?.headerRows);
      editor.updateBlock(latest, {
        ...latest,
        content: {
          ...latest.content,
          headerRows: isHeaderRow ? undefined : 1,
        },
      });
    } else {
      const isHeaderCol = Boolean(latest.content?.headerCols);
      editor.updateBlock(latest, {
        ...latest,
        content: {
          ...latest.content,
          headerCols: isHeaderCol ? undefined : 1,
        },
      });
    }
  }
}
