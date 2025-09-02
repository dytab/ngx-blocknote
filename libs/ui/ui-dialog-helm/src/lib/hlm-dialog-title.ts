import { Directive, computed, input } from '@angular/core';
import { BrnDialogTitle } from '@spartan-ng/brain/dialog';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';

@Directive({
  selector: '[hlmDialogTitle]',
  hostDirectives: [BrnDialogTitle],
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmDialogTitle {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    hlm('text-lg font-semibold leading-none', this.userClass()),
  );
}
