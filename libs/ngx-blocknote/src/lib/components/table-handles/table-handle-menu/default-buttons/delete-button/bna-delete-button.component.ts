import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TableContent } from '@blocknote/core';
import { TableHandleOptions } from '../../../../../interfaces/table-handle-options.type';
import { NgxBlocknoteService } from '../../../../../services';
import { HlmButtonDirective, HlmIconComponent } from '../../../../../ui';

@Component({
  selector: 'bna-delete-button',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective, HlmIconComponent],
  templateUrl: './bna-delete-button.component.html',
  styleUrl: './bna-delete-button.component.css',
})
export class BnaDeleteButtonComponent {
  options = input.required<TableHandleOptions>();
  constructor(private ngxBlockNoteService: NgxBlocknoteService) {}

  deleteColumn() {
    const { editor, block, index } = this.getProperties('column');
    if (!block) {
      return;
    }
    const content: TableContent<any> = {
      type: 'tableContent',
      rows: block.content.rows.map((row) => ({
        cells: row.cells.filter((_, cellIndex) => cellIndex !== index),
      })),
    };
    editor.updateBlock(block, {
      type: 'table',
      //TODO: remove this
      content: content as any,
    });
    editor.tableHandles?.unfreezeHandles();
    editor.focus();
    this.options().closeMenu();
    this.options().showOtherHandle();
  }

  deleteRow() {
    const { editor, block, index } = this.getProperties('row');
    if (!block) {
      return;
    }
    const content: TableContent<any> = {
      type: 'tableContent',
      rows: block.content.rows.filter((_, rowIndex) => rowIndex !== index),
    };
    editor.updateBlock(block, {
      type: 'table',
      //TODO: remove this any cast
      content: content as any,
    });
    editor.tableHandles?.unfreezeHandles();
    editor.focus();
    this.options().closeMenu();
    this.options().showOtherHandle();
  }

  private getProperties(orientation: 'row' | 'column') {
    const editor = this.ngxBlockNoteService.editor();
    const options = this.options();
    const block = options.tableHandles.block;

    const index =
      orientation === 'row'
        ? options.tableHandles.rowIndex
        : options.tableHandles.colIndex;
    return { editor, block, index };
  }
}
