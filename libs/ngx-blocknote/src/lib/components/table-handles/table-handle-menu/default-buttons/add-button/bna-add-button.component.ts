
import { Component, computed, input, inject } from '@angular/core';
import { TableHandleOptions } from '../../../../../interfaces/table-handle-options.type';
import { NgxBlocknoteService } from '../../../../../services';
import { HlmButtonDirective } from '../../../../../ui';

@Component({
  selector: 'bna-add-button',
  imports: [HlmButtonDirective],
  templateUrl: './bna-add-button.component.html',
})
export class BnaAddButtonComponent {
  private ngxBlockNoteService = inject(NgxBlocknoteService);

  options = input.required<TableHandleOptions>();
  dict = computed(() => this.ngxBlockNoteService.editor().dictionary);

  addColumn(side: 'right' | 'left') {
    return this.addColumnOrRow({ orientation: 'column', side });
  }

  addRow(side: 'above' | 'below') {
    return this.addColumnOrRow({ orientation: 'row', side });
  }

  addColumnOrRow(
    params:
      | { orientation: 'row'; side: 'above' | 'below' }
      | { orientation: 'column'; side: 'left' | 'right' },
  ) {
    const { editor, block, index } = this.getProperties(params.orientation);
    if (!block) {
      return;
    }
    if (index === undefined) {
      //TODO: when can index be undefined?
      return;
    }
    const tableHandles = editor.tableHandles;
    if (!tableHandles) {
      return null;
    }

    const result = tableHandles.addRowOrColumn(index, params);

    // editor.tableHandles?.unfreezeHandles();
    // editor.focus();
    this.options().closeMenu();
    this.options().showOtherHandle();
    return result;
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
