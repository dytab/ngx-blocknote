import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import {
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
import { BlockNoteAngularService } from '../../../services/block-note-angular.service';

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
  alignment = input.required<Alignments>();
  icon = computed(() => {
    return icons[this.alignment()];
  });

  constructor(public blockNoteAngularService: BlockNoteAngularService) {}

  toggleAlignment(textAlignment: Alignments) {
    const editor = this.blockNoteAngularService.editor();
    if (!editor) {
      return;
    }
    const selectedBlocks = editor.getSelection()?.blocks;
    if (selectedBlocks) {
      for (const block of selectedBlocks) {
        if (checkBlockTypeHasDefaultProp('textAlignment', block.type, editor)) {
          editor.updateBlock(block, {
            props: { textAlignment: textAlignment },
          });
        }
      }
    }
  }

  hasAlignment() {
    const editor = this.blockNoteAngularService.editor();
    if (!editor) {
      return;
    }
    const selectedBlocks = editor.getSelection()?.blocks;
    const block = selectedBlocks?.[0];
    if (!block) {
      return false;
    }
    if (checkBlockHasDefaultProp('textAlignment', block, editor)) {
      return block.props.textAlignment === this.alignment();
    } else {
      return false;
    }
  }
}
