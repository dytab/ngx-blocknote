import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Renderer2,
  signal,
  viewChild,
} from '@angular/core';
import { TableHandlesState } from '@blocknote/core';
import { TableHandleOptions } from '../../interfaces/table-handle-options.type';
import { NgxBlocknoteService } from '../../services/ngx-blocknote.service';
import { BnaTableHandleComponent } from './table-handle/bna-table-handle.component';
import { useTableHandlesPositioning } from './use-table-handles-positioning.util';

@Component({
  imports: [BnaTableHandleComponent],
  selector: 'bna-table-handles-controller',
  templateUrl: 'bna-table-handle-controller.component.html',
  host: {
    class: 'z-40 fixed',
  },
})
export class BnaTableHandlesControllerComponent implements AfterViewInit {
  private ngxBlockNoteService = inject(NgxBlocknoteService);
  private renderer2 = inject(Renderer2);

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

  constructor() {
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
    if (!editor) return;
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
