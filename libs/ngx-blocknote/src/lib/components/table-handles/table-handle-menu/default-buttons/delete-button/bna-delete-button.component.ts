import { Component, inject, input } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { TableHandleOptions } from '../../../../../interfaces/table-handle-options.type';
import { NgxBlocknoteService } from '../../../../../services';

@Component({
  selector: 'bna-delete-button',
  imports: [HlmButtonDirective],
  templateUrl: './bna-delete-button.component.html',
})
export class BnaDeleteButtonComponent {
  private ngxBlockNoteService = inject(NgxBlocknoteService);

  options = input.required<TableHandleOptions>();

  delete(orientation: 'row' | 'column') {
    const editor = this.ngxBlockNoteService.editor();
    const options = this.options();
    const tableHandles = editor.tableHandles;
    if (!tableHandles) {
      return;
    }

    const index =
      orientation === 'row'
        ? options.tableHandles.rowIndex
        : options.tableHandles.colIndex;
    if (index === undefined) {
      return;
    }
    tableHandles.removeRowOrColumn(index, orientation);
  }
}
