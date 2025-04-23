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
  lucideAlignJustify,
  lucideAlignLeft,
  lucideAlignRight,
} from '@ng-icons/lucide';
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
import {
  HlmButtonDirective,
  HlmIconComponent,
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '../../../../ui';
import { useEditorContentOrSelectionChange } from '../../../../util/use-editor-content-or-selection-change';

const icons = {
  left: 'lucideAlignLeft',
  center: 'lucideAlignCenter',
  right: 'lucideAlignRight',
  justify: 'lucideAlignJustify',
} as const;

type Alignments = 'left' | 'center' | 'right' | 'justify';

@Component({
  selector: 'bna-text-align-button',
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
    provideIcons({
      lucideAlignLeft,
      lucideAlignCenter,
      lucideAlignRight,
      lucideAlignJustify,
    }),
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
    const selectedBlocks = this.ngxBlockNoteService.selectedBlocks();
    // Also don't show when none of the selected blocks have text content
    return selectedBlocks.find((block) => 'textAlignment' in block.props)
      ? ''
      : 'hidden';
  });
  alignmentBlock = signal<Block<any, any, any> | undefined>(undefined);
  hasAlignment = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
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
    const editor = this.ngxBlockNoteService.editor();
    return editor.dictionary.formatting_toolbar[`align_${this.alignment()}`];
  });

  constructor(public ngxBlockNoteService: NgxBlocknoteService) {
    this.updateAlignmentOnContentOrSelectionChange();
  }

  private updateAlignmentOnContentOrSelectionChange() {
    useEditorContentOrSelectionChange(() => {
      this.alignmentBlock.set(
        this.ngxBlockNoteService.editor().getTextCursorPosition().block,
      );
    }, this.ngxBlockNoteService.editor());
  }

  toggleAlignment(textAlignment: Alignments) {
    const editor = this.ngxBlockNoteService.editor();
    editor.focus();
    const selectedBlocks = this.ngxBlockNoteService.selectedBlocks();
    for (const block of selectedBlocks) {
      if (checkBlockTypeHasDefaultProp('textAlignment', block.type, editor)) {
        editor.updateBlock(block, {
          props: { textAlignment: textAlignment },
        });
      }
    }
  }
}
