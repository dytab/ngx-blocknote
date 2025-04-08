import { NgIcon } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';
import { ColorOptions } from '../../interfaces/color-options.type';
import { HlmButtonDirective, HlmIconDirective } from '../../ui';
import { BnaColorIconComponent } from './color-icon/bna-color-icon.component';
import { NgxBlocknoteService } from '../../services';

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
    CommonModule,
    BnaColorIconComponent,
    HlmButtonDirective,
    NgIcon,
    HlmIconDirective,
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
  dict = this.ngxBlockNoteService.editor().dictionary;
  @Input() options: ColorOptions = {};

  constructor(private ngxBlockNoteService: NgxBlocknoteService) {}
}
