import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'bna-table-handle-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bna-table-handle-menu.component.html',
  styleUrl: './bna-table-handle-menu.component.css',
  host: {
    //TODO: change to class not tailwind classes
    class: 'block bg-background shadow-xl p-2 rounded',
  },
})
export class BnaTableHandleMenuComponent {}
