import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TableContent } from '@blocknote/core';
import type { InlineContentSchema } from '@blocknote/core/src/schema/inlineContent/types';
import type { StyleSchema } from '@blocknote/core/src/schema/styles/types';
import { TableHandleOptions } from '../../../../../interfaces/table-handle-options.type';
import { NgxBlocknoteService } from '../../../../../services';
import { HlmButtonDirective, HlmIconComponent } from '../../../../../ui';

@Component({
  selector: 'bna-add-button',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective, HlmIconComponent],
  templateUrl: './bna-add-button.component.html',
  styleUrl: './bna-add-button.component.css',
})
export class BnaAddButtonComponent {
  options = input.required<TableHandleOptions>();
  constructor(private ngxBlockNoteService: NgxBlocknoteService) {}

  addColumn(side: 'right' | 'left') {
    const { editor, block, index } = this.getProperties('column');
    if (!block) {
      return;
    }
    if(index === undefined){
      //TODO: when can this be?
      return;
    }
    console.log(block.content);
    const content: TableContent<InlineContentSchema, StyleSchema> = {
      ...block.content,
      type: 'tableContent',
      rows: block.content.rows.map((row) => {
        const cells = [...row.cells];
        cells.splice(index + (side === 'right' ? 1 : 0), 0, []);
        return { cells };
      }),
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

  addRow(side: 'above' | 'below') {
    const { editor, block, index } = this.getProperties('row');
    if (!block) {
      return;
    }
    if(index === undefined){
      //TODO: when can index be undefined?
      return;
    }
    const emptyCol = block.content.rows[index].cells.map(() => []);
    const rows = [...block.content.rows];
    rows.splice(index + (side === 'below' ? 1 : 0), 0, {
      cells: emptyCol,
    });

    editor.updateBlock(block, {
      type: 'table',
      content: {
        type: 'tableContent',
        rows,
      } as any,
    });
    editor.tableHandles?.unfreezeHandles();
    editor.focus();
    this.options().closeMenu();
    this.options().showOtherHandle();
  }

  private getProperties(orientation: 'row' | 'column') {
    const editor = this.ngxBlockNoteService.editor();
    //TODO: get the block
    const options = this.options();
    const block = options.tableHandles.block;
    console.log(block);

    const index =
      orientation === 'row'
        ? options.tableHandles.rowIndex
        : options.tableHandles.colIndex;
    return { editor, block, index };
  }
}
