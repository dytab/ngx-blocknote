import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'bna-color-icon',
  imports: [],
  templateUrl: './bna-color-icon.component.html',
})
export class BnaColorIconComponent {
  readonly textColor = input('default');
  readonly backgroundColor = input('default');
  readonly iconSize = input<number>();

  // React defaults to size 16 and font-size = size * 0.75
  readonly resolvedSize = computed(() => this.iconSize() ?? 16);
  readonly fontSizePx = computed(() => Math.round(this.resolvedSize() * 0.75));
}
