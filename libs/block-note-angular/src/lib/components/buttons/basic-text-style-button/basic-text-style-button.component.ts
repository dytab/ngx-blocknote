import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideBold, lucideItalic, lucideUnderline } from '@ng-icons/lucide';
import { BlockNoteAngularService } from '../../../services/block-note-angular.service';
import { HlmButtonDirective, HlmIconComponent } from '../../../ui';

const icons = {
  bold: 'lucideBold',
  italic: 'lucideItalic',
  underline: 'lucideUnderline',
  strike: '',
  code: '',
} as const;

type BasicTextStyle = 'bold' | 'italic' | 'underline' | 'strike' | 'code';

@Component({
  selector: 'bna-basic-text-style-button',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective, HlmIconComponent],
  templateUrl: './basic-text-style-button.component.html',
  styleUrl: './basic-text-style-button.component.css',
  providers: [provideIcons({ lucideBold, lucideItalic, lucideUnderline })],
})
export class BasicTextStyleButtonComponent {
  basicTextStyle = input.required<BasicTextStyle>();
  icon = computed(() => {
    return icons[this.basicTextStyle()];
  });

  constructor(public blockNoteAngularService: BlockNoteAngularService) {}

  toggleStyle(style: BasicTextStyle) {
    this.blockNoteAngularService.editor()?.toggleStyles({ [style]: true });
  }
}
