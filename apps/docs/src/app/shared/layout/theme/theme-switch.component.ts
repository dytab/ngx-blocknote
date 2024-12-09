import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  HlmButtonDirective,
  HlmIconComponent,
  HlmMenuComponent,
  HlmMenuItemCheckboxDirective,
  HlmMenuItemCheckComponent,
} from '@dytab/ui';
import { provideIcons } from '@ng-icons/core';
import { lucideMonitor, lucideMoon, lucideSun } from '@ng-icons/lucide';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { DarkMode, ThemeService } from './theme.service';

@Component({
  imports: [
    BrnMenuTriggerDirective,
    HlmButtonDirective,
    HlmIconComponent,
    AsyncPipe,
    HlmMenuComponent,
    HlmMenuItemCheckComponent,
    HlmMenuItemCheckboxDirective,
  ],
  providers: [provideIcons({ lucideMoon, lucideMonitor, lucideSun })],
  selector: 'bna-theme-switch',
  template: `
    <button
      size="sm"
      variant="ghost"
      align="end"
      [brnMenuTriggerFor]="theme"
      hlmBtn
    >
      <hlm-icon name="lucideMoon" size="sm" />
      <span class="sr-only">Open menu to change theme</span>
    </button>
    <ng-template #theme>
      <hlm-menu class="w-40">
        <button
          hlmMenuItemCheckbox
          [checked]="(theme$ | async) === 'light'"
          (click)="setTheme('light')"
        >
          <hlm-menu-item-check />
          <hlm-icon name="lucideSun" size="sm" class="me-2" />
          Light
        </button>
        <button
          hlmMenuItemCheckbox
          [checked]="(theme$ | async) === 'dark'"
          (click)="setTheme('dark')"
        >
          <hlm-menu-item-check />
          <hlm-icon name="lucideMoon" size="sm" class="me-2" />
          Dark
        </button>
        <button
          hlmMenuItemCheckbox
          [checked]="(theme$ | async) === 'system'"
          (click)="setTheme('system')"
        >
          <hlm-menu-item-check />
          <hlm-icon name="lucideMonitor" size="sm" class="me-2" />
          System
        </button>
      </hlm-menu>
    </ng-template>
  `,
})
export class ThemeSwitchComponent {
  private _themeService = inject(ThemeService);
  theme$ = this._themeService.darkMode$;
  public setTheme(theme: DarkMode) {
    this._themeService.setDarkMode(theme);
  }
}
