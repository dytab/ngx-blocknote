
import { Component, input, inject } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { TableHandleOptions } from '../../../../../interfaces/table-handle-options.type';
import { NgxBlocknoteService } from '../../../../../services';

@Component({
  selector: 'bna-add-button',
  imports: [HlmButtonDirective],
  templateUrl: './bna-add-button.component.html',
  styleUrl: './bna-add-button.component.css',
})
export class BnaAddButtonComponent {
  private ngxBlockNoteService = inject(NgxBlocknoteService);

  options = input.required<TableHandleOptions>();

  addColumn(side: 'right' | 'left') {
    // const { editor, block, index } = this.getProperties('column');
    // if (!block) {
    //   return;
    // }
    // if (index === undefined) {
    //   //TODO: when can this be?
    //   return;
    // }
    // const content: TableContent<InlineContentSchema, StyleSchema> = {
    //   ...block.content,
    //   type: 'tableContent',
    //   rows: block.content.rows.map((row) => {
    //     const cells = [...row.cells];
    //     cells.splice(index + (side === 'right' ? 1 : 0), 0, []);
    //     return { cells };
    //   }),
    // };
    //
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

  addRow(side: 'above' | 'below') {
    //   const { editor, block, index } = this.getProperties('row');
    //   if (!block) {
    //     return;
    //   }
    //   if (index === undefined) {
    //     //TODO: when can index be undefined?
    //     return;
    //   }
    //   const emptyCol = block.content.rows[index].cells.map(() => []);
    //   const rows = [...block.content.rows];
    //   rows.splice(index + (side === 'below' ? 1 : 0), 0, {
    //     cells: emptyCol,
    //   });
    //
    //   editor.updateBlock(block, {
    //     type: 'table',
    //     content: {
    //       type: 'tableContent',
    //       rows,
    //     } as any,
    //   });
    //   editor.tableHandles?.unfreezeHandles();
    //   editor.focus();
    //   this.options().closeMenu();
    //   this.options().showOtherHandle();
    // }
    //
    // private getProperties(orientation: 'row' | 'column') {
    //   const editor = this.ngxBlockNoteService.editor();
    //   const options = this.options();
    //   const block = options.tableHandles.block;
    //
    //   const index =
    //     orientation === 'row'
    //       ? options.tableHandles.rowIndex
    //       : options.tableHandles.colIndex;
    //   return { editor, block, index };
  }
}
