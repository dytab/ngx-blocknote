import { Component, input } from '@angular/core';
import { TableHandleOptions } from '../../../interfaces/table-handle-options.type';
import { BnaAddButtonComponent } from './default-buttons/add-button/bna-add-button.component';
import { BnaDeleteButtonComponent } from './default-buttons/delete-button/bna-delete-button.component';
import { BnaColorPickerButtonComponent } from './default-buttons/color-picker/bna-color-picker-button.component';
import { BnaTableHeaderButtonComponent } from './default-buttons/table-header/bna-table-header-button.component';
import { BnaSplitCellButtonComponent } from './default-buttons/split-cell/bna-split-cell-button.component';

@Component({
  selector: 'bna-table-handle-menu',
  imports: [BnaDeleteButtonComponent, BnaAddButtonComponent, BnaColorPickerButtonComponent, BnaTableHeaderButtonComponent, BnaSplitCellButtonComponent],
  templateUrl: './bna-table-handle-menu.component.html',
  host: {
    class: 'block bg-background shadow-xl p-2 rounded',
  },
})
export class BnaTableHandleMenuComponent {
  options = input.required<TableHandleOptions>();
}
