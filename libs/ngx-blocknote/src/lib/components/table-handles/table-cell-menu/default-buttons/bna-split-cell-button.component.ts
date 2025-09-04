import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  getColspan,
  getRowspan,
  InlineContentSchema,
  isTableCell,
  StyleSchema,
} from '@blocknote/core';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';

@Component({
  selector: 'bna-split-cell-button',
  template: `
    <button
      *ngIf="canSplitCell"
      type="button"
      class="bn-menu-item"
      (click)="splitCell()"
    >
      {{ splitCellText }}
    </button>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class BnaSplitCellButtonComponent<
  I extends InlineContentSchema = DefaultInlineContentSchema,
  S extends StyleSchema = DefaultStyleSchema,
> {
  @Input() block!: DefaultBlockSchema['table'];
  @Input() rowIndex!: number;
  @Input() colIndex!: number;

  private blockNoteService = inject(NgxBlocknoteService);

  // i18n fallback - TODO: implement proper i18n service
  splitCellText = 'Split Cell';

  get canSplitCell(): boolean {
    const editor = this.blockNoteService.editor();
    const currentCell = this.block.content.rows[this.rowIndex]?.cells?.[this.colIndex];

    if (
      !currentCell ||
      !isTableCell(currentCell) ||
      (getRowspan(currentCell) === 1 && getColspan(currentCell) === 1) ||
      !editor.settings.tables.splitCells
    ) {
      return false;
    }

    return true;
  }

  splitCell(): void {
    const editor = this.blockNoteService.editor();
    if (editor.tableHandles) {
      editor.tableHandles.splitCell({
        row: this.rowIndex,
        col: this.colIndex,
      });
    }
  }
}
