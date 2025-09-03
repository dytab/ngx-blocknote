import { Component, computed, inject, input } from '@angular/core';
import { isTableCell, mapTableCell } from '@blocknote/core';
import { NgxBlocknoteService } from '../../../../../services';
import { TableHandleOptions } from '../../../../../interfaces/table-handle-options.type';
import { BnaColorPickerComponent } from '../../../../color-picker/bna-color-picker.component';
import { ColorOptions } from '../../../../../interfaces/color-options.type';

@Component({
  selector: 'bna-color-picker-button',
  imports: [BnaColorPickerComponent],
  templateUrl: './bna-color-picker-button.component.html',
})
export class BnaColorPickerButtonComponent {
  private ngxBlockNoteService = inject(NgxBlocknoteService);

  readonly options = input.required<TableHandleOptions>();

  readonly dict = computed(() =>
    this.ngxBlockNoteService.editor().dictionary,
  );

  // Compute current selected cells based on orientation
  readonly currentCells = computed(() => {
    const opts = this.options();
    const th = opts.tableHandles;
    if (!th) {
      return [] as { row: number; col: number; cell: any }[];
    }
    const block = th.block as any;
    if (!block || !block.content?.rows) {
      return [] as { row: number; col: number; cell: any }[];
    }

    // Manual implementation of cell selection since getCellsAt*Handle methods don't exist
    if (opts.orientation === 'row') {
      const rowIndex = th.rowIndex!;
      if (rowIndex >= block.content.rows.length) {
        return [];
      }
      const row = block.content.rows[rowIndex];
      return row.cells.map((cell: any, colIndex: number) => ({ row: rowIndex, col: colIndex, cell }));
    } else {
      const colIndex = th.colIndex!;
      const cells: { row: number; col: number; cell: any }[] = [];
      block.content.rows.forEach((row: any, rowIndex: number) => {
        if (colIndex < row.cells.length) {
          cells.push({ row: rowIndex, col: colIndex, cell: row.cells[colIndex] });
        }
      });
      return cells;
    }
  });

  private updateColor(color: string, type: 'text' | 'background') {
    const editor = this.ngxBlockNoteService.editor();
    const opts = this.options();
    const th = opts.tableHandles;
    const block = th.block as any;
    const currentCells = this.currentCells();

    if (!block || !currentCells || currentCells.length === 0) {
      return;
    }

    const newRows = block.content.rows.map((row: any) => ({
      ...row,
      cells: row.cells.map((cell: any) => mapTableCell(cell)),
    }));

    currentCells.forEach(({ row, col }: { row: number; col: number; cell: any }) => {
      if (type === 'text') {
        newRows[row].cells[col].props.textColor = color;
      } else {
        newRows[row].cells[col].props.backgroundColor = color;
      }
    });

    editor.updateBlock(block, {
      type: 'table',
      content: {
        ...block.content,
        rows: newRows,
      },
    } as any);

    // Reset cursor position as updateBlock may move selection
    editor.setTextCursorPosition(block);
  }

  readonly colorOptions = computed<ColorOptions>(() => {
    const editor = this.ngxBlockNoteService.editor();
    const currentCells = this.currentCells();
    const firstCell = currentCells[0] ? mapTableCell(currentCells[0].cell) : undefined;

    const allowText = editor.settings.tables.cellTextColor !== false;
    const allowBg = editor.settings.tables.cellBackgroundColor !== false;

    return {
      iconSize: 18,
      onClick: () => {
        // Close the submenu and restore handle state after picking a color
        this.options().closeMenu();
        this.options().showOtherHandle();
        editor.tableHandles?.unfreezeHandles();
        editor.focus();
      },
      text: allowText && firstCell
        ? {
            color: currentCells.every(({ cell }: { row: number; col: number; cell: any }) =>
              isTableCell(cell) && mapTableCell(cell).props.textColor === firstCell.props.textColor,
            )
              ? firstCell.props.textColor
              : 'default',
            setColor: (color: string) => this.updateColor(color, 'text'),
          }
        : undefined,
      background: allowBg && firstCell
        ? {
            color: currentCells.every(({ cell }: { row: number; col: number; cell: any }) =>
              isTableCell(cell) && mapTableCell(cell).props.backgroundColor === firstCell.props.backgroundColor,
            )
              ? firstCell.props.backgroundColor
              : 'default',
            setColor: (color: string) => this.updateColor(color, 'background'),
          }
        : undefined,
    };
  });
}
