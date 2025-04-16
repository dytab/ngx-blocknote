import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'bna-color-icon',
  imports: [CommonModule],
  templateUrl: './bna-color-icon.component.html',
})
export class BnaColorIconComponent {
  @Input() textColor = 'default';
  @Input() backgroundColor = 'default';
}
