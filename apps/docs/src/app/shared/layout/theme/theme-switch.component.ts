import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMonitor, lucideMoon, lucideSun } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';

import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { DarkMode, ThemeService } from './theme.service';

@Component({
  imports: [HlmButton, AsyncPipe, HlmDropdownMenuImports, NgIcon, HlmIcon],
  providers: [provideIcons({ lucideMoon, lucideMonitor, lucideSun })],
  selector: 'bna-theme-switch',
  template: `
    <button
      size="sm"
      variant="ghost"
      align="end"
      [hlmDropdownMenuTrigger]="theme"
      hlmBtn
    >
      <ng-icon hlm name="lucideMoon" size="sm" />
      <span class="sr-only">Open menu to change theme</span>
    </button>
    <ng-template #theme>
      <hlm-dropdown-menu class="w-40">
        <button
          hlmDropdownMenuCheckbox
          [checked]="(theme$ | async) === 'light'"
          (click)="setTheme('light')"
        >
          <hlm-dropdown-menu-checkbox-indicator />
          <ng-icon hlm name="lucideSun" size="sm" class="me-2" />
          Light
        </button>
        <button
          hlmDropdownMenuCheckbox
          [checked]="(theme$ | async) === 'dark'"
          (click)="setTheme('dark')"
        >
          <hlm-dropdown-menu-checkbox-indicator />
          <ng-icon hlm name="lucideMoon" size="sm" class="me-2" />
          Dark
        </button>
        <button
          hlmDropdownMenuCheckbox
          [checked]="(theme$ | async) === 'system'"
          (click)="setTheme('system')"
        >
          <hlm-dropdown-menu-checkbox-indicator />
          <ng-icon hlm name="lucideMonitor" size="sm" class="me-2" />
          System
        </button>
      </hlm-dropdown-menu>
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
