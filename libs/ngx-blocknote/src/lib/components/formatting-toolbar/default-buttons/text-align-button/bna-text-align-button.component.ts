import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import {
  Block,
  checkBlockHasDefaultProp,
  checkBlockTypeHasDefaultProp,
} from '@blocknote/core';
import { provideIcons } from '@ng-icons/core';
import {
  lucideAlignCenter,
  lucideAlignLeft,
  lucideAlignRight,
} from '@ng-icons/lucide';
import { BlockNoteAngularService } from '../../../../services/block-note-angular.service';
import {
  HlmButtonDirective,
  HlmIconComponent,
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '../../../../ui';
import { useEditorContentOrSelectionChange } from '../../../../util/use-editor-content-or-selection-change';
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';

const icons = {
  left: 'lucideAlignLeft',
  center: 'lucideAlignCenter',
  right: 'lucideAlignRight',
} as const;

type Alignments = 'left' | 'center' | 'right';

@Component({
  selector: 'bna-text-align-button',
  standalone: true,
  imports: [
    CommonModule,
    HlmButtonDirective,
    HlmIconComponent,
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
    BrnTooltipContentDirective,
  ],
  templateUrl: './bna-text-align-button.component.html',
  styleUrl: './bna-text-align-button.component.css',
  providers: [
    provideIcons({ lucideAlignLeft, lucideAlignCenter, lucideAlignRight }),
  ],
  host: {
    '[class]': '_visibilityClass()',
  },
})
export class BnaTextAlignButtonComponent {
  alignment = input.required<Alignments>();
  icon = computed(() => {
    return icons[this.alignment()];
  });
  _visibilityClass = computed(() => {
    const selectedBlocks = this.blockNoteAngularService.selectedBlocks();
    // Also don't show when none of the selected blocks have text content
    return selectedBlocks.find((block) => 'textAlignment' in block.props)
      ? ''
      : 'hidden';
  });
  alignmentBlock = signal<Block<any, any, any> | undefined>(undefined);
  hasAlignment = computed(() => {
    const editor = this.blockNoteAngularService.editor();
    const block = this.alignmentBlock();
    if (!block) {
      return false;
    }
    if (checkBlockHasDefaultProp('textAlignment', block, editor)) {
      return block.props.textAlignment === this.alignment();
    }
    return false;
  });

  textAlignDict = computed(() => {
    const editor = this.blockNoteAngularService.editor();
    return editor.dictionary.formatting_toolbar[`align_${this.alignment()}`];
  });

  constructor(public blockNoteAngularService: BlockNoteAngularService) {
    this.updateAlignmentOnContentOrSelectionChange();
  }

  private updateAlignmentOnContentOrSelectionChange() {
    useEditorContentOrSelectionChange(() => {
      this.alignmentBlock.set(
        this.blockNoteAngularService.editor().getTextCursorPosition().block
      );
    }, this.blockNoteAngularService.editor());
  }

  toggleAlignment(textAlignment: Alignments) {
    const editor = this.blockNoteAngularService.editor();
    editor.focus();
    const selectedBlocks = this.blockNoteAngularService.selectedBlocks();
    for (const block of selectedBlocks) {
      if (checkBlockTypeHasDefaultProp('textAlignment', block.type, editor)) {
        editor.updateBlock(block, {
          props: { textAlignment: textAlignment },
        });
      }
    }
  }
}
