import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'bna-link-toolbar',
  imports: [CommonModule],
  templateUrl: './link-toolbar.component.html',
  styleUrl: './link-toolbar.component.css',
  host: {
    class: 'bn-link-toolbar',
  },
})
export class BnaLinkToolbarComponent {}
