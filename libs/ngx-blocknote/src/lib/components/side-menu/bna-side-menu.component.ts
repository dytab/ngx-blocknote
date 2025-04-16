import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'bna-side-menu',
  imports: [CommonModule],
  templateUrl: './bna-side-menu.component.html',
  host: {
    class: 'text-gray-500',
  },
})
export class BnaSideMenuComponent {}
