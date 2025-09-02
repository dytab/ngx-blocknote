import { computed, Directive, input } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';

@Directive({
  selector: '[hlmCardTitle]',
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmCardTitle {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    hlm('font-semibold leading-none', this.userClass()),
  );
}
