import { Component, inject, input } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { TableHandleOptions } from '../../../../../interfaces/table-handle-options.type';
import { NgxBlocknoteService } from '../../../../../services';

@Component({
  selector: 'bna-add-button',
  imports: [HlmButtonDirective],
  templateUrl: './bna-add-button.component.html',
})
export class BnaAddButtonComponent {
  private ngxBlockNoteService = inject(NgxBlocknoteService);

  options = input.required<TableHandleOptions>();

  add(
    props:
      | { orientation: 'row'; side: 'above' | 'below' }
      | { orientation: 'column'; side: 'left' | 'right' },
  ) {
    const editor = this.ngxBlockNoteService.editor();
    const options = this.options();
    const block = options.tableHandles.block;

    const index =
      props.orientation === 'row'
        ? options.tableHandles.rowIndex
        : options.tableHandles.colIndex;
    if (!block) {
      return;
    }
    if (index === undefined) {
      return;
    }
    const tableHandles = editor.tableHandles;
    if (!tableHandles) {
      return;
    }
    tableHandles.addRowOrColumn(index, props);
    editor.tableHandles?.unfreezeHandles();
    editor.focus();
    this.options().closeMenu();
    this.options().showOtherHandle();
  }
}
