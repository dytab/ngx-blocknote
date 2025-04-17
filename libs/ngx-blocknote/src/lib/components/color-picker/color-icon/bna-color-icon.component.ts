
import { Component, input } from '@angular/core';

@Component({
  selector: 'bna-color-icon',
  imports: [],
  templateUrl: './bna-color-icon.component.html',
})
export class BnaColorIconComponent {
  readonly textColor = input('default');
  readonly backgroundColor = input('default');
}
