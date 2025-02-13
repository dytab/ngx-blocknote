import { Component, computed, input } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideChevronRight } from '@ng-icons/lucide';
import { hlm } from '@spartan-ng/ui-core';
import type { ClassValue } from 'clsx';
import { HlmIconComponent } from '../ui-icon-helm/hlm-icon.component';

@Component({
  selector: 'hlm-menu-item-sub-indicator',
  providers: [provideIcons({ lucideChevronRight })],
  imports: [HlmIconComponent],
  template: `
    <hlm-icon size="none" class="w-full h-full" name="lucideChevronRight" />
  `,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmMenuItemSubIndicatorComponent {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    hlm('inline-block ml-auto h-4 w-4', this.userClass()),
  );
}
