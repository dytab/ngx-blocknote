import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  Renderer2,
  signal,
  viewChild,
} from '@angular/core';
import { TableHandlesState } from '@blocknote/core/types/src/extensions/TableHandles/TableHandlesPlugin';
import { TableHandleOptions } from '../../interfaces/table-handle-options.type';
import { NgxBlocknoteService } from '../../services/ngx-blocknote.service';
import { BnaTableHandleComponent } from './table-handle/bna-table-handle.component';
import { useTableHandlesPositioning } from './use-table-handles-positioning.util';

@Component({
  imports: [CommonModule, BnaTableHandleComponent],
  selector: 'bna-table-handles-controller',
  templateUrl: 'bna-table-handle-controller.component.html',
  styleUrl: 'bna-table-handle-controller.component.css',
  standalone: true,
  host: {
    class: 'z-40 fixed',
  },
})
export class BnaTableHandlesController implements AfterViewInit {
  rowHandleElement = viewChild<ElementRef>('rowHandle');
  columnHandleElement = viewChild<ElementRef>('colHandle');
  showColumnHandle = signal(true);
  showRowHandle = signal(true);

  tableHandles = signal<TableHandlesState<any, any> | undefined>(undefined);

  options = signal<TableHandleOptions | undefined>(undefined);
  rowOptions = computed(() => {
    const options = this.options();
    if (!options) {
      return;
    }
    const rowHandleOptions: TableHandleOptions = {
      ...options,
      orientation: 'row',
      showOtherHandle: () => {
        this.showColumnHandle.set(true);
      },
      hideOtherHandle: () => {
        this.showColumnHandle.set(false);
      },
    };
    return rowHandleOptions;
  });
  columnOptions = computed(() => {
    const options = this.options();
    if (!options) {
      return;
    }
    const columnHandleOptions: TableHandleOptions = {
      ...options,
      orientation: 'column',
      showOtherHandle: () => {
        this.showRowHandle.set(true);
      },
      hideOtherHandle: () => {
        this.showRowHandle.set(false);
      },
    };
    return columnHandleOptions;
  });

  constructor(
    private ngxBlockNoteService: NgxBlocknoteService,
    private renderer2: Renderer2,
  ) {
    effect(async () => {
      const tableHandles = this.tableHandles();
      const rowElement = this.rowHandleElement();
      const colElement = this.columnHandleElement();
      if (!tableHandles || !rowElement || !colElement) {
        return;
      }
      await this.adjustTableHandlePositions(
        tableHandles,
        rowElement,
        colElement,
      );
    });
    this.adjustVisibilityAndOptions();
  }

  private async adjustTableHandlePositions(
    tableHandles: TableHandlesState<any, any>,
    rowElement: ElementRef,
    colElement: ElementRef,
  ) {
    const result = await useTableHandlesPositioning(
      tableHandles.referencePosCell ?? null,
      tableHandles.referencePosTable,
      {
        row: rowElement.nativeElement,
        col: colElement.nativeElement,
      },
    );

    if (result.rowHandle?.position) {
      this.renderer2.setStyle(
        rowElement.nativeElement,
        'top',
        `${result.rowHandle.position.y}px`,
      );
      this.renderer2.setStyle(
        rowElement.nativeElement,
        'left',
        `${result.rowHandle.position.x}px`,
      );
    }
    if (result.colHandle?.position) {
      this.renderer2.setStyle(
        colElement.nativeElement,
        'top',
        `${result.colHandle.position.y}px`,
      );
      this.renderer2.setStyle(
        colElement.nativeElement,
        'left',
        `${result.colHandle.position.x}px`,
      );
    }
  }

  ngAfterViewInit() {
    this.adjustVisibilityAndOptions();
  }

  adjustVisibilityAndOptions() {
    const editor = this.ngxBlockNoteService.editor();
    editor.tableHandles?.onUpdate(async (tableHandles) => {
      this.tableHandles.set(tableHandles);
      const options: TableHandleOptions = {
        orientation: 'row',
        tableHandles,
        closeMenu: () => undefined,
        showOtherHandle: () => undefined,
        hideOtherHandle: () => undefined,
      };
      this.options.set(options);
    });
  }
}
