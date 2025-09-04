import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  InlineContentSchema,
  StyleSchema,
  DefaultBlockSchema,
} from '@blocknote/core';
import { BnaTableCellMenuProps } from '../table-cell-button/bna-table-cell-button-props';
import { BnaSplitCellButtonComponent } from './default-buttons/bna-split-cell-button.component';
import { BnaTableCellColorPickerButtonComponent } from './default-buttons/bna-table-cell-color-picker-button.component';

@Component({
  selector: 'bna-table-cell-menu',
  template: `
    <div class="bn-menu-dropdown bn-table-handle-menu">
      <ng-content>
        <bna-split-cell-button
          [block]="block"
          [rowIndex]="rowIndex"
          [colIndex]="colIndex"
        ></bna-split-cell-button>
        <bna-table-cell-color-picker-button
          [block]="block"
          [rowIndex]="rowIndex"
          [colIndex]="colIndex"
        ></bna-table-cell-color-picker-button>
      </ng-content>
    </div>
  `,
  standalone: true,
  imports: [
    CommonModule,
    BnaSplitCellButtonComponent,
    BnaTableCellColorPickerButtonComponent
  ]
})
export class BnaTableCellMenuComponent<
  I extends InlineContentSchema = DefaultInlineContentSchema,
  S extends StyleSchema = DefaultStyleSchema,
> implements BnaTableCellMenuProps<I, S> {
  @Input() block!: DefaultBlockSchema['table'];
  @Input() rowIndex!: number;
  @Input() colIndex!: number;
}
