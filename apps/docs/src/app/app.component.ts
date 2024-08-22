import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeSwitchComponent } from '../shared/layout/theme/theme-switch.component';
import { HlmButtonDirective } from '@dytab/ui';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    NgOptimizedImage,
    ThemeSwitchComponent,
    HlmButtonDirective,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
