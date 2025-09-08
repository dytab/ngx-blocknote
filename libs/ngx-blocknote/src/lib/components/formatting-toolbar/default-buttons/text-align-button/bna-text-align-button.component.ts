import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import {
  Block,
  checkBlockHasDefaultProp,
  checkBlockTypeHasDefaultProp,
  mapTableCell,
  TableContent,
} from '@blocknote/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideAlignCenter,
  lucideAlignJustify,
  lucideAlignLeft,
  lucideAlignRight,
} from '@ng-icons/lucide';
import { BrnTooltipContentTemplate } from '@spartan-ng/brain/tooltip';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmTooltip, HlmTooltipTrigger } from '@spartan-ng/helm/tooltip';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
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
    HlmButton,
    HlmTooltip,
    HlmTooltipTrigger,
    BrnTooltipContentTemplate,
    NgIcon,
    HlmIcon,
  ],
  templateUrl: './bna-text-align-button.component.html',
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
  ngxBlockNoteService = inject(NgxBlocknoteService);

  alignment = input.required<Alignments>();
  icon = computed(() => {
    return icons[this.alignment()];
  });
  _visibilityClass = computed(() => {
    const selectedBlocks = this.ngxBlockNoteService.selectedBlocks();
    // Also don't show when none of the selected blocks have text content
    return selectedBlocks.find(
      (block) =>
        'textAlignment' in block.props ||
        (block.type === 'table' && block.children),
    )
      ? ''
      : 'hidden';
  });
  alignmentBlock = signal<Block<any, any, any> | undefined>(undefined);
  hasAlignment = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    const block = this.alignmentBlock();
    if (!block || !editor) {
      return false;
    }
    if (checkBlockHasDefaultProp('textAlignment', block, editor)) {
      return block.props.textAlignment === this.alignment();
    }

    if (block.type === 'table') {
      const cellSelection = editor.tableHandles?.getCellSelection();
      if (!cellSelection) {
        return false;
      }

      const allCellsInTable = cellSelection.cells.map(
        ({ row, col }) =>
          mapTableCell(
            (block.content as TableContent<any, any>).rows[row].cells[col],
          ).props.textAlignment,
      );

      const firstAlignment = allCellsInTable[0];
      if (allCellsInTable.every((alignment) => alignment === firstAlignment)) {
        return firstAlignment === this.alignment();
      }
    }

    return false;
  });

  textAlignDict = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    if (!editor) {
      return '';
    }
    return editor.dictionary.formatting_toolbar[`align_${this.alignment()}`];
  });

  constructor() {
    this.updateAlignmentOnContentOrSelectionChange();
  }

  private updateAlignmentOnContentOrSelectionChange() {
    const editor = this.ngxBlockNoteService.editor();
    if (!editor) {
      return;
    }
    useEditorContentOrSelectionChange(() => {
      const currentEditor = this.ngxBlockNoteService.editor();
      if (currentEditor) {
        this.alignmentBlock.set(currentEditor.getTextCursorPosition().block);
      }
    }, editor);
  }

  toggleAlignment(textAlignment: Alignments) {
    const editor = this.ngxBlockNoteService.editor();
    if (!editor) {
      return;
    }
    editor.focus();
    const selectedBlocks = this.ngxBlockNoteService.selectedBlocks();
    for (const block of selectedBlocks) {
      if (checkBlockTypeHasDefaultProp('textAlignment', block.type, editor)) {
        editor.updateBlock(block, {
          props: { textAlignment: textAlignment },
        });
      } else if (block.type === 'table') {
        const cellSelection = editor.tableHandles?.getCellSelection();
        if (!cellSelection) {
          continue;
        }

        const newTable = (block.content as TableContent<any, any>).rows.map(
          (row) => {
            return {
              ...row,
              cells: row.cells.map((cell) => {
                return mapTableCell(cell);
              }),
            };
          },
        );

        // Apply the text alignment to the cells that are within the selected range
        cellSelection.cells.forEach(({ row, col }) => {
          newTable[row].cells[col].props.textAlignment = textAlignment;
        });

        editor.updateBlock(block, {
          type: 'table',
          content: {
            ...(block.content as TableContent<any, any>),
            type: 'tableContent',
            rows: newTable,
          } as any,
        });

        // Have to reset text cursor position to the block as `updateBlock`
        // moves the existing selection out of the block.
        editor.setTextCursorPosition(block);
      }
    }
  }
}
