import { BooleanInput } from '@angular/cdk/coercion';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import { ClassValue } from 'clsx';

@Component({
  selector: 'hlm-menu-label',
  template: ` <ng-content /> `,
  host: {
    '[class]': '_computedClass()',
    '[attr.data-inset]': 'inset() ? "" : null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HlmMenuLabel {
  public readonly inset = input<boolean, BooleanInput>(false, {
    transform: booleanAttribute,
  });

  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    hlm(
      'block px-2 py-1.5 text-sm font-medium data-[inset]:pl-8',
      this.userClass(),
    ),
  );
}
