import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { ThemeSwitchComponent } from './shared/layout/theme/theme-switch.component';

@Component({
  imports: [RouterModule, ThemeSwitchComponent, HlmButtonDirective],
  selector: 'docs-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
