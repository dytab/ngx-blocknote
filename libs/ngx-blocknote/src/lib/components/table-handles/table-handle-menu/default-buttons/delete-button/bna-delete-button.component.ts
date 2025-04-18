import { CommonModule } from '@angular/common';
import { Component, input, inject } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { TableHandleOptions } from '../../../../../interfaces/table-handle-options.type';
import { NgxBlocknoteService } from '../../../../../services';

@Component({
  selector: 'bna-delete-button',
  imports: [CommonModule, HlmButtonDirective],
  templateUrl: './bna-delete-button.component.html',
  styleUrl: './bna-delete-button.component.css',
})
export class BnaDeleteButtonComponent {
  private ngxBlockNoteService = inject(NgxBlocknoteService);

  options = input.required<TableHandleOptions>();

  deleteColumn() {
    // const { editor, block, index } = this.getProperties('column');
    // if (!block) {
    //   return;
    // }
    // const content: TableContent<any> = {
    //   ...block.content,
    //   type: 'tableContent',
    //   rows: block.content.rows.map((row) => ({
    //     cells: row.cells.filter((_, cellIndex) => cellIndex !== index),
    //   })),
    // };
    // editor.updateBlock(block, {
    //   type: 'table',
    //   //TODO: remove this
    //   content: content as any,
    // });
    // editor.tableHandles?.unfreezeHandles();
    // editor.focus();
    // this.options().closeMenu();
    // this.options().showOtherHandle();
  }

  deleteRow() {
    // const { editor, block, index } = this.getProperties('row');
    // if (!block) {
    //   return;
    // }
    // const content: TableContent<any> = {
    //   ...block.content,
    //   type: 'tableContent',
    //   rows: block.content.rows.filter((_, rowIndex) => rowIndex !== index),
    // };
    // editor.updateBlock(block, {
    //   type: 'table',
    //   //TODO: remove this any cast
    //   content: content as any,
    // });
    // editor.tableHandles?.unfreezeHandles();
    // editor.focus();
    // this.options().closeMenu();
    // this.options().showOtherHandle();
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
