import {
  ConnectedPosition,
  Overlay,
  OverlayModule,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { isTableCell, mapTableCell } from '@blocknote/core';
import { ColorOptions } from '../../../../interfaces/color-options.type';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
import { BnaColorPickerComponent } from '../../../color-picker/bna-color-picker.component';

@Component({
  selector: 'bna-table-cell-color-picker-button',
  template: `
    <div *ngIf="shouldShowColorPicker" class="bn-menu-item-wrapper">
      <button
        #triggerButton
        type="button"
        class="bn-menu-item bn-menu-item-sub-trigger"
        (click)="toggleSubmenu()"
        (mouseenter)="onMouseEnter()"
        (mouseleave)="onMouseLeave()"
      >
        {{ colorsText }}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="9,6 15,12 9,18"></polyline>
        </svg>
      </button>

      <ng-template #submenuTemplate>
        <div class="bn-menu-dropdown bn-color-picker-dropdown">
          <bna-color-picker [options]="colorPickerOptions"></bna-color-picker>
        </div>
      </ng-template>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, OverlayModule, BnaColorPickerComponent],
})
export class BnaTableCellColorPickerButtonComponent {
  @Input() block!: any; // Use any for now to avoid type conflicts
  @Input() rowIndex!: number;
  @Input() colIndex!: number;

  @ViewChild('triggerButton') triggerButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('submenuTemplate') submenuTemplate!: any;

  private blockNoteService = inject(NgxBlocknoteService);
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private overlayRef: OverlayRef | null = null;
  private hoverTimeout: any = null;

  // i18n fallback - TODO: implement proper i18n service
  colorsText = 'Colors';

  private positions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
      offsetX: 8,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'top',
      offsetX: -8,
    },
  ];

  get shouldShowColorPicker(): boolean {
    const editor = this.blockNoteService.editor();

    const currentCell =
      this.block.content?.rows?.[this.rowIndex]?.cells?.[this.colIndex];

    return !!(
      currentCell &&
      (editor?.settings?.tables?.cellTextColor ||
        editor?.settings?.tables?.cellBackgroundColor)
    );
  }

  get currentCell() {
    return this.block.content?.rows?.[this.rowIndex]?.cells?.[this.colIndex];
  }

  get colorPickerOptions(): ColorOptions {
    const editor = this.blockNoteService.editor();
    const options: ColorOptions = {
      iconSize: 18,
      onClick: () => this.closeSubmenu(),
    };

    if (editor?.settings?.tables?.cellTextColor) {
      options.text = {
        color: isTableCell(this.currentCell)
          ? this.currentCell.props.textColor || 'default'
          : 'default',
        setColor: (color: string) => this.updateColor(color, 'text'),
      };
    }

    if (editor?.settings?.tables?.cellBackgroundColor) {
      options.background = {
        color: isTableCell(this.currentCell)
          ? this.currentCell.props.backgroundColor || 'default'
          : 'default',
        setColor: (color: string) => this.updateColor(color, 'background'),
      };
    }

    return options;
  }

  toggleSubmenu(): void {
    if (this.overlayRef?.hasAttached()) {
      this.closeSubmenu();
    } else {
      this.openSubmenu();
    }
  }

  onMouseEnter(): void {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
    this.hoverTimeout = setTimeout(() => {
      if (!this.overlayRef?.hasAttached()) {
        this.openSubmenu();
      }
    }, 300);
  }

  onMouseLeave(): void {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
  }

  private openSubmenu(): void {
    if (this.overlayRef?.hasAttached()) {
      return;
    }

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.triggerButton)
      .withPositions(this.positions)
      .withPush(false);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    this.overlayRef.backdropClick().subscribe(() => {
      this.closeSubmenu();
    });

    const portal = new TemplatePortal(
      this.submenuTemplate,
      this.viewContainerRef,
    );
    this.overlayRef.attach(portal);
  }

  private closeSubmenu(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  private updateColor(color: string, type: 'text' | 'background'): void {
    const editor = this.blockNoteService.editor();
    if (!this.block.content?.rows) return;

    const newTable = this.block.content.rows.map((row: any) => {
      return {
        ...row,
        cells: row.cells.map((cell: any) => mapTableCell(cell)),
      };
    });

    if (type === 'text') {
      newTable[this.rowIndex].cells[this.colIndex].props.textColor = color;
    } else {
      newTable[this.rowIndex].cells[this.colIndex].props.backgroundColor =
        color;
    }

    editor?.updateBlock(this.block.id, {
      type: 'table',
      content: {
        ...this.block.content,
        rows: newTable,
      },
    });

    // Reset text cursor position to the block as updateBlock moves the existing selection out of the block
    editor?.setTextCursorPosition(this.block.id);
    this.closeSubmenu();
  }
}
