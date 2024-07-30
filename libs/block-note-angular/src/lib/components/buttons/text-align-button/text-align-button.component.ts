import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import {
  BlockNoteEditor,
  checkBlockHasDefaultProp,
  checkBlockTypeHasDefaultProp,
} from '@blocknote/core';
import { provideIcons } from '@ng-icons/core';
import {
  lucideAlignCenter,
  lucideAlignLeft,
  lucideAlignRight,
} from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

const icons = {
  left: 'lucideAlignLeft',
  center: 'lucideAlignCenter',
  right: 'lucideAlignRight',
} as const;

type Alignments = 'left' | 'center' | 'right';

@Component({
  selector: 'bna-text-align-button',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective, HlmIconComponent],
  templateUrl: './text-align-button.component.html',
  styleUrl: './text-align-button.component.css',
  providers: [
    provideIcons({ lucideAlignLeft, lucideAlignCenter, lucideAlignRight }),
  ],
})
export class TextAlignButtonComponent {
  editor = input.required<BlockNoteEditor>();
  alignment = input.required<Alignments>();
  icon = computed(() => {
    return icons[this.alignment()];
  });

  toggleAlignment(textAlignment: Alignments) {
    const selectedBlocks = this.editor().getSelection()?.blocks;
    if (selectedBlocks) {
      for (const block of selectedBlocks) {
        if (
          checkBlockTypeHasDefaultProp(
            'textAlignment',
            block.type,
            this.editor()
          )
        ) {
          this.editor().updateBlock(block, {
            props: { textAlignment: textAlignment },
          });
        }
      }
    }
  }

  hasAlignment() {
    const selectedBlocks = this.editor().getSelection()?.blocks;
    const block = selectedBlocks?.[0];
    if (!block) {
      return false;
    }
    if (checkBlockHasDefaultProp('textAlignment', block, this.editor())) {
      return block.props.textAlignment === this.alignment();
    } else {
      return false;
    }
  }
}
