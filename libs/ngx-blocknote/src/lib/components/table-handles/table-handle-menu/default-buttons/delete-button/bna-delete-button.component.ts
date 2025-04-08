import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { TableHandleOptions } from '../../../../../interfaces/table-handle-options.type';
import { NgxBlocknoteService } from '../../../../../services';
import { HlmButtonDirective } from '../../../../../ui';

@Component({
  selector: 'bna-delete-button',
  imports: [CommonModule, HlmButtonDirective],
  templateUrl: './bna-delete-button.component.html',
})
export class BnaDeleteButtonComponent {
  options = input.required<TableHandleOptions>();
  dict = computed(() => this.ngxBlockNoteService.editor().dictionary);

  constructor(private ngxBlockNoteService: NgxBlocknoteService) {}

  removeRowOrColumn(orientation: 'row' | 'column') {
    const { editor, block, index } = this.getProperties('column');
    if (!block || index === undefined) {
      return null;
    }
    const tableHandles = editor.tableHandles;
    if (!tableHandles) {
      return null;
    }

    const result = tableHandles.removeRowOrColumn(index, orientation);
    editor.tableHandles?.unfreezeHandles();
    editor.focus();
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
