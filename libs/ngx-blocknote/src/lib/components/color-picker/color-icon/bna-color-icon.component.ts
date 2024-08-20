import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'bna-color-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bna-color-icon.component.html',
  styleUrl: './bna-color-icon.component.css',
})
export class BnaColorIconComponent {
  @Input() textColor = 'default';
  @Input() backgroundColor = 'default';
}
