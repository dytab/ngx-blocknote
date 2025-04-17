
import { Component, input, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';
import { ColorOptions } from '../../interfaces/color-options.type';
import { NgxBlocknoteService } from '../../services';
import { HlmButtonDirective, HlmIconDirective } from '../../ui';
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

@Component({
  selector: 'bna-color-picker',
  imports: [
    BnaColorIconComponent,
    HlmButtonDirective,
    NgIcon,
    HlmIconDirective
],
  templateUrl: './bna-color-picker.component.html',
  providers: [
    provideIcons({
      lucideCheck,
    }),
  ],
})
export class BnaColorPickerComponent {
  private ngxBlockNoteService = inject(NgxBlocknoteService);

  colors = colors;
  dict = this.ngxBlockNoteService.editor().dictionary;
  options = input.required<ColorOptions>();
}
