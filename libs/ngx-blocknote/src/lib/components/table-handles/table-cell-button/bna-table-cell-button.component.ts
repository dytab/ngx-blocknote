import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ComponentRef,
  ViewContainerRef,
  Type,
  TemplateRef,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  InlineContentSchema,
  StyleSchema,
} from '@blocknote/core';
import { BnaTableCellButtonProps } from './bna-table-cell-button-props';
import { BnaTableCellMenuComponent } from '../table-cell-menu/bna-table-cell-menu.component';

@Component({
  selector: 'bna-table-cell-button',
  template: `
    <button
      #triggerButton
      type="button"
      class="bn-table-cell-handle"
      (click)="toggleMenu()"
      (mousedown)="$event.preventDefault()"
    >
      <ng-content>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </ng-content>
    </button>
  `,
  standalone: true,
  imports: [CommonModule, OverlayModule]
})
export class BnaTableCellButtonComponent<
  I extends InlineContentSchema = DefaultInlineContentSchema,
  S extends StyleSchema = DefaultStyleSchema,
> implements OnInit, OnDestroy {
  @Input() editor!: BnaTableCellButtonProps<I, S>['editor'];
  @Input() rowIndex!: number;
  @Input() colIndex!: number;
  @Input() menuContainer!: HTMLDivElement;
  @Input() tableCellMenu?: Type<any>;
  @Input() block!: BnaTableCellButtonProps<I, S>['block'];
  @Input() freezeHandles!: () => void;
  @Input() unfreezeHandles!: () => void;

  @ViewChild('triggerButton', { static: true }) triggerButton!: ElementRef<HTMLButtonElement>;

  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private overlayRef: OverlayRef | null = null;
  private menuComponentRef: ComponentRef<any> | null = null;

  private positions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
      offsetX: 8
    },
    {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
      offsetX: -8
    }
  ];

  ngOnInit() {
    // Hide the button if all table cell settings are disabled
    const settings = this.editor.settings.tables;
    if (!settings.splitCells && !settings.cellBackgroundColor && !settings.cellTextColor) {
      // Component should be hidden - this could be handled by parent
      return;
    }
  }

  ngOnDestroy() {
    this.closeMenu();
  }

  toggleMenu() {
    if (this.overlayRef?.hasAttached()) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  private openMenu() {
    if (this.overlayRef?.hasAttached()) {
      return;
    }

    this.freezeHandles();

    // Create overlay
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.triggerButton)
      .withPositions(this.positions)
      .withPush(false);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });

    // Handle backdrop click
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeMenu();
    });

    // Create and attach the menu component
    const MenuComponent = this.tableCellMenu || BnaTableCellMenuComponent;
    const portal = new ComponentPortal(MenuComponent, this.viewContainerRef);
    this.menuComponentRef = this.overlayRef.attach(portal);

    // Set inputs on the menu component
    if (this.menuComponentRef.instance) {
      this.menuComponentRef.instance.block = this.block;
      this.menuComponentRef.instance.rowIndex = this.rowIndex;
      this.menuComponentRef.instance.colIndex = this.colIndex;
    }
  }

  private closeMenu() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
    if (this.menuComponentRef) {
      this.menuComponentRef.destroy();
      this.menuComponentRef = null;
    }
    this.unfreezeHandles();
    this.editor.focus();
  }
}
