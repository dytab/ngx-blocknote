import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  HlmButtonDirective,
  HlmIconComponent,
} from '@dytab/block-note-angular';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';
import { ColorOptions } from '../../interfaces/color-options.type';
import { BnaColorIconComponent } from './color-icon/bna-color-icon.component';

const colors = [
  'default',
  'gray',
  'brown',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'pink',
] as const;

const emptyFn = () => {
  //empty
};

@Component({
  selector: 'bna-color-picker',
  standalone: true,
  imports: [
    CommonModule,
    BnaColorIconComponent,
    HlmButtonDirective,
    HlmIconComponent,
  ],
  templateUrl: './bna-color-picker.component.html',
  styleUrl: './bna-color-picker.component.css',
  providers: [
    provideIcons({
      lucideCheck,
    }),
  ],
})
export class BnaColorPickerComponent {
  colors = colors;
  @Input() options: ColorOptions = {};
}
