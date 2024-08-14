import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  Renderer2,
  signal,
  viewChild,
} from '@angular/core';
import { TableHandlesState } from '@blocknote/core/types/src/extensions/TableHandles/TableHandlesPlugin';
import { BlockNoteAngularService } from '../../services/block-note-angular.service';
import { BnaTableHandleComponent } from './table-handle/bna-table-handle.component';
import { useTableHandlesPositioning } from './use-table-handles-positioning.util';

@Component({
  imports: [CommonModule, BnaTableHandleComponent],
  selector: 'bna-table-handles-controller',
  templateUrl: 'bna-table-handle-controller.component.html',
  styleUrl: 'bna-table-handle-controller.component.css',
  standalone: true,
})
export class BnaTableHandlesController implements AfterViewInit {
  rowHandleElement = viewChild<ElementRef>('rowHandle');
  columnHandleElement = viewChild<ElementRef>('colHandle');

  tableHandles = signal<TableHandlesState<any, any> | undefined>(undefined);

  constructor(
    private blockNoteAngularService: BlockNoteAngularService,
    protected elRef: ElementRef<HTMLElement>,
    private renderer2: Renderer2
  ) {
    effect(async () => {
      console.log(
        this.rowHandleElement(),
        this.columnHandleElement(),
        this.tableHandles()
      );
      const tableHandles = this.tableHandles();
      const rowElement = this.rowHandleElement();
      const colElement = this.columnHandleElement();
      if (!tableHandles || !rowElement || !colElement) {
        return;
      }
      const result = await useTableHandlesPositioning(
        tableHandles.referencePosCell,
        tableHandles.referencePosTable,
        {
          row: rowElement.nativeElement,
          col: colElement.nativeElement,
        }
      );

      if (result.rowHandle?.position) {
        this.renderer2.setStyle(
          rowElement.nativeElement,
          'top',
          `${result.rowHandle.position.y}px`
        );
        this.renderer2.setStyle(
          rowElement.nativeElement,
          'left',
          `${result.rowHandle.position.x}px`
        );
      }
      if (result.colHandle?.position) {
        this.renderer2.setStyle(
          colElement.nativeElement,
          'top',
          `${result.colHandle.position.y}px`
        );
        this.renderer2.setStyle(
          colElement.nativeElement,
          'left',
          `${result.colHandle.position.x}px`
        );
      }

      console.log('POSITION RESULT', result);
    });
    this.adjustVisibilityAndPosition();
  }

  ngAfterViewInit() {
    this.adjustVisibilityAndPosition();
  }

  adjustVisibilityAndPosition() {
    this.toggleVisibility(false);
    this.renderer2.addClass(this.elRef.nativeElement, 'z-40');
    this.renderer2.addClass(this.elRef.nativeElement, 'absolute');
    const editor = this.blockNoteAngularService.editor();
    editor.tableHandles?.onUpdate(async (tableHandles) => {
      this.tableHandles.set(tableHandles);
      this.toggleVisibility(tableHandles.show);
    });
  }

  private toggleVisibility(state: boolean): void {
    if (state) {
      this.renderer2.removeClass(this.elRef.nativeElement, 'hidden');
      this.renderer2.addClass(this.elRef.nativeElement, 'block');
    } else {
      this.renderer2.addClass(this.elRef.nativeElement, 'hidden');
      this.renderer2.removeClass(this.elRef.nativeElement, 'block');
    }
  }
}
