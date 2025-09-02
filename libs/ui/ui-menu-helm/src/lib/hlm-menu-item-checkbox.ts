import { Directive, computed, input } from '@angular/core';
import { BrnMenuItemCheckbox } from '@spartan-ng/brain/menu';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';

@Directive({
  selector: '[hlmMenuItemCheckbox]',
  host: {
    '[class]': '_computedClass()',
  },
  hostDirectives: [
    {
      directive: BrnMenuItemCheckbox,
      inputs: ['disabled: disabled', 'checked: checked'],
      outputs: ['triggered: triggered'],
    },
  ],
})
export class HlmMenuItemCheckbox {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    hlm(
      'hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground group relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors disabled:pointer-events-none disabled:opacity-50',
      this.userClass(),
    ),
  );
}
