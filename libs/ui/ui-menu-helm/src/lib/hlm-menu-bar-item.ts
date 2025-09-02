import { Directive, computed, input } from '@angular/core';
import { BrnMenuItem } from '@spartan-ng/brain/menu';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';

@Directive({
  selector: '[hlmMenuBarItem]',
  host: {
    '[class]': '_computedClass()',
  },
  hostDirectives: [BrnMenuItem],
})
export class HlmMenuBarItem {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    hlm(
      'focus:bg-accent focus:text-accent-foreground aria-expanded:bg-accent aria-expanded:text-accent-foreground flex select-none items-center rounded-sm px-2 py-1 text-sm font-medium outline-none',
      this.userClass(),
    ),
  );
}
