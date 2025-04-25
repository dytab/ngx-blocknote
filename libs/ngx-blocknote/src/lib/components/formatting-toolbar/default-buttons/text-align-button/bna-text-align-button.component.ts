import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import {
  checkBlockTypeHasDefaultProp,
  TableContent,
  type Block,
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

// Use types from the default specs but keep them simple
type DefaultBlock = Block<any, any, any>;

interface TableCellBlock extends DefaultBlock {
  type: 'tableCell';
  props: {
    textAlignment?: Alignments;
    [key: string]: unknown;
  };
}

function isTableCellBlock(
  block: DefaultBlock | undefined,
): block is TableCellBlock {
  return block?.type === 'tableCell';
}

function hasTextAlignmentProp(block: DefaultBlock | undefined): boolean {
  if (!block?.props) return false;
  return 'textAlignment' in block.props;
}

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
    return selectedBlocks.find(
      (block) => block.content !== undefined || isTableCellBlock(block),
    )
      ? ''
      : 'hidden';
  });

  alignmentBlock = signal<DefaultBlock | undefined>(undefined);

  hasAlignment = computed(() => {
    const block = this.alignmentBlock();
    if (!block?.props) return false;
    return block.props['textAlignment'] === this.alignment();
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
    const selectedText = editor.getSelectedText();

    for (const block of selectedBlocks) {
      if (block.type === 'table') {
        if ((block.content as TableContent<any, any>)?.rows) {
          for (const row of (block.content as TableContent<any, any>).rows) {
            for (const cell of row.cells) {
              if (
                Array.isArray(cell) &&
                cell.some(
                  (content) =>
                    (content as { text: string }).text === selectedText,
                )
              ) {
                console.log('Found cell:', cell);
                (cell as any[])[0].styles = {
                  ...(cell as any[])[0].styles,
                  textAlignment,
                };
              }
            }
          }
        }
      }
      if (checkBlockTypeHasDefaultProp('textAlignment', block.type, editor)) {
        editor.updateBlock(block, {
          props: { textAlignment: textAlignment },
        });
      }
    }
  }
}
