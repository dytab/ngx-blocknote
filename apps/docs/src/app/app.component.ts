import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';
import { ThemeSwitchComponent } from './shared/layout/theme/theme-switch.component';

@Component({
  imports: [RouterModule, ThemeSwitchComponent, HlmButton],
  selector: 'docs-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
