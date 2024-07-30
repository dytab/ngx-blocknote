import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { BlockNoteEditor } from '@blocknote/core';
import { provideIcons } from '@ng-icons/core';
import { lucideBold, lucideItalic, lucideUnderline } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

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
  editor = input.required<BlockNoteEditor>();
  basicTextStyle = input.required<BasicTextStyle>();
  icon = computed(() => {
    return icons[this.basicTextStyle()];
  });

  toggleStyle(style: BasicTextStyle) {
    this.editor().toggleStyles({ [style]: true });
  }
}
