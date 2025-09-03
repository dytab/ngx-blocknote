import { Component, computed, inject, input } from '@angular/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { NgxBlocknoteService } from '../../../../../services';
import { TableHandleOptions } from '../../../../../interfaces/table-handle-options.type';
import { getColspan, getRowspan, isTableCell } from '@blocknote/core';

@Component({
  selector: 'bna-split-cell-button',
  imports: [HlmButton],
  templateUrl: './bna-split-cell-button.component.html',
})
export class BnaSplitCellButtonComponent {
  private ngxBlockNoteService = inject(NgxBlocknoteService);

  readonly options = input.required<TableHandleOptions>();

  readonly dict = computed(() => this.ngxBlockNoteService.editor().dictionary);

  readonly show = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    if (editor.settings.tables.splitCells === false) {
      return false;
    }
    const opts = this.options();
    const th = opts.tableHandles as any;
    if (!th) {
      return false;
    }
    const block = th.block as any;
    const rowIndex = th.rowIndex as number | undefined;
    const colIndex = th.colIndex as number | undefined;
    if (!block || rowIndex === undefined || colIndex === undefined) {
      return false;
    }
    const currentCell = block.content?.rows?.[rowIndex]?.cells?.[colIndex];
    if (!currentCell || !isTableCell(currentCell)) {
      return false;
    }
    return getRowspan(currentCell) > 1 || getColspan(currentCell) > 1;
  });

  splitCell() {
    const editor = this.ngxBlockNoteService.editor();
    const opts = this.options();
    const th = opts.tableHandles as any;
    const rowIndex = th.rowIndex as number | undefined;
    const colIndex = th.colIndex as number | undefined;
    if (rowIndex === undefined || colIndex === undefined) {
      return;
    }

    editor.tableHandles?.splitCell({ row: rowIndex, col: colIndex });
    // Restore UI state similar to other actions
    editor.tableHandles?.unfreezeHandles();
    opts.showOtherHandle();
    opts.closeMenu();
    editor.focus();
  }
}
