import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  contentChildren,
  effect,
  input,
} from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import { BrnFormFieldControl } from '@spartan-ng/brain/form-field';
import { ClassValue } from 'clsx';
import { HlmError } from './hlm-error';

@Component({
  selector: 'hlm-form-field',
  template: `
    <ng-content />

    @switch (_hasDisplayedMessage()) {
      @case ('error') {
        <ng-content select="hlm-error" />
      }
      @default {
        <ng-content select="hlm-hint" />
      }
    }
  `,
  host: {
    '[class]': '_computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HlmFormField {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    hlm('space-y-2 block', this.userClass()),
  );
  public readonly control = contentChild(BrnFormFieldControl);

  public readonly errorChildren = contentChildren(HlmError);

  protected readonly _hasDisplayedMessage = computed<'error' | 'hint'>(() =>
    this.errorChildren() &&
    this.errorChildren().length > 0 &&
    this.control()?.errorState()
      ? 'error'
      : 'hint',
  );

  constructor() {
    effect(() => {
      if (!this.control()) {
        throw new Error('hlm-form-field must contain a BrnFormFieldControl.');
      }
    });
  }
}
