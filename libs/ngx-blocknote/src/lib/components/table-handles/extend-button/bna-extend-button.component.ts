import {
  Component,
  Input,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  EMPTY_CELL_HEIGHT,
  EMPTY_CELL_WIDTH,
  InlineContentSchema,
  mergeCSSClasses,
  PartialTableContent,
  StyleSchema,
} from '@blocknote/core';
import { BnaExtendButtonProps } from './bna-extend-button-props';

// Rounds a number up or down, depending on whether we're close (as defined by margin) to the next integer.
const marginRound = (num: number, margin = 0.3): number => {
  const lowerBound = Math.floor(num) + margin;
  const upperBound = Math.ceil(num) - margin;

  if (num >= lowerBound && num <= upperBound) {
    return Math.round(num);
  } else if (num < lowerBound) {
    return Math.floor(num);
  } else {
    return Math.ceil(num);
  }
};

interface EditingState {
  originalContent: PartialTableContent<any, any>;
  originalCroppedContent: PartialTableContent<any, any>;
  startPos: number;
}

@Component({
  selector: 'bna-extend-button',
  template: `
    <button
      #extendButton
      type="button"
      [class]="buttonClass"
      (mousedown)="onMouseDown($event)"
      (click)="onClick()"
    >
      <ng-content>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </ng-content>
    </button>
  `,
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'bn-extend-button-wrapper'
  }
})
export class BnaExtendButtonComponent<
  I extends InlineContentSchema = DefaultInlineContentSchema,
  S extends StyleSchema = DefaultStyleSchema,
> implements OnInit, OnDestroy, BnaExtendButtonProps<I, S> {
  @Input() editor!: BnaExtendButtonProps<I, S>['editor'];
  @Input() onMouseDown!: () => void;
  @Input() onMouseUp!: () => void;
  @Input() orientation!: 'addOrRemoveRows' | 'addOrRemoveColumns';
  @Input() block!: BnaExtendButtonProps<I, S>['block'];

  @ViewChild('extendButton', { static: true }) extendButton!: ElementRef<HTMLButtonElement>;

  private movedMouse = false;
  private editingState: EditingState | undefined = undefined;
  private mouseMoveHandler?: (event: MouseEvent) => void;
  private mouseUpHandler?: () => void;

  get buttonClass(): string {
    return mergeCSSClasses(
      'bn-extend-button',
      this.orientation === 'addOrRemoveColumns' ? 'bn-extend-button-columns' : 'bn-extend-button-rows'
    );
  }


  ngOnDestroy() {
    this.removeMouseListeners();
  }

  onMouseDown(event: MouseEvent): void {
    this.onMouseDown();
    this.editingState = {
      originalContent: this.block.content,
      originalCroppedContent: {
        rows: this.editor.tableHandles!.cropEmptyRowsOrColumns(
          this.block,
          this.orientation === 'addOrRemoveColumns' ? 'columns' : 'rows',
        ),
      } as PartialTableContent<any, any>,
      startPos: this.orientation === 'addOrRemoveColumns' ? event.clientX : event.clientY,
    };
    this.movedMouse = false;

    // Add global mouse listeners
    this.addMouseListeners();

    // Prevent default to avoid text selection in the table
    event.preventDefault();
  }

  onClick(): void {
    if (this.movedMouse) {
      return;
    }

    // Add a single row or column
    this.editor.updateBlock(this.block, {
      type: 'table',
      content: {
        ...this.block.content,
        rows:
          this.orientation === 'addOrRemoveColumns'
            ? this.editor.tableHandles!.addRowsOrColumns(this.block, 'columns', 1)
            : this.editor.tableHandles!.addRowsOrColumns(this.block, 'rows', 1),
      } as any,
    });
  }

  private addMouseListeners(): void {
    this.mouseMoveHandler = (event: MouseEvent) => {
      this.handleMouseMove(event);
    };
    this.mouseUpHandler = () => {
      this.handleMouseUp();
    };

    window.addEventListener('mousemove', this.mouseMoveHandler);
    window.addEventListener('mouseup', this.mouseUpHandler);
  }

  private removeMouseListeners(): void {
    if (this.mouseMoveHandler) {
      window.removeEventListener('mousemove', this.mouseMoveHandler);
      this.mouseMoveHandler = undefined;
    }
    if (this.mouseUpHandler) {
      window.removeEventListener('mouseup', this.mouseUpHandler);
      this.mouseUpHandler = undefined;
    }
  }

  private handleMouseMove(event: MouseEvent): void {
    if (!this.editingState) {
      return;
    }

    this.movedMouse = true;

    const currentPos = this.orientation === 'addOrRemoveColumns' ? event.clientX : event.clientY;
    const deltaPos = currentPos - this.editingState.startPos;

    // Calculate new number of rows/columns based on mouse movement
    const cellSize = this.orientation === 'addOrRemoveColumns' ? EMPTY_CELL_WIDTH : EMPTY_CELL_HEIGHT;
    const deltaCells = marginRound(deltaPos / cellSize);

    const originalCount =
      this.orientation === 'addOrRemoveColumns'
        ? this.editingState.originalCroppedContent.rows[0]?.cells.length || 0
        : this.editingState.originalCroppedContent.rows.length;

    const newCount = Math.max(1, originalCount + deltaCells);
    const actualDelta = newCount - originalCount;

    if (actualDelta === 0) {
      // No change needed
      this.editor.updateBlock(this.block, {
        type: 'table',
        content: this.editingState.originalContent,
      } as any);
      return;
    }

    // Update the table with new rows/columns
    let newRows: any;
    if (actualDelta > 0) {
      // Add rows/columns
      newRows = this.editor.tableHandles!.addRowsOrColumns(
        this.block,
        this.orientation === 'addOrRemoveColumns' ? 'columns' : 'rows',
        actualDelta
      );
    } else {
      // Remove rows/columns
      newRows = this.editor.tableHandles!.removeRowsOrColumns(
        this.block,
        this.orientation === 'addOrRemoveColumns' ? 'columns' : 'rows',
        Math.abs(actualDelta)
      );
    }

    this.editor.updateBlock(this.block, {
      type: 'table',
      content: {
        ...this.block.content,
        rows: newRows,
      },
    } as any);
  }

  private handleMouseUp(): void {
    this.removeMouseListeners();
    this.editingState = undefined;
    this.onMouseUp();
  }
}
