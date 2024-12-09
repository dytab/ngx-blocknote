import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TableHandleOptions } from '../../../interfaces/table-handle-options.type';
import { BnaAddButtonComponent } from './default-buttons/add-button/bna-add-button.component';
import { BnaDeleteButtonComponent } from './default-buttons/delete-button/bna-delete-button.component';

@Component({
  selector: 'bna-table-handle-menu',
  imports: [CommonModule, BnaDeleteButtonComponent, BnaAddButtonComponent],
  templateUrl: './bna-table-handle-menu.component.html',
  styleUrl: './bna-table-handle-menu.component.css',
  host: {
    //TODO: change to class not tailwind classes
    class: 'block bg-background shadow-xl p-2 rounded',
  },
})
export class BnaTableHandleMenuComponent {
  options = input.required<TableHandleOptions>();
}
