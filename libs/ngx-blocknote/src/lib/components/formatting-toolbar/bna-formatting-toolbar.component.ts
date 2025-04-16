import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'bna-formatting-toolbar',
  imports: [CommonModule],
  templateUrl: './bna-formatting-toolbar.component.html',
  host: {
    class: 'bn-toolbar',
  },
})
export class BnaFormattingToolbarComponent {}
