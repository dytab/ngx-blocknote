import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateRef } from '@angular/core';
import {
  DefaultAngularGridSuggestionItem,
  GridSuggestionMenuProps,
} from './types';

@Component({
  selector: 'bna-grid-suggestion-menu-loader',
  template: `
    <div
      class="bn-grid-suggestion-menu-loader"
      [style.grid-column]="'span ' + columns"
    >
      Loading...
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class BnaGridSuggestionMenuLoaderComponent {
  @Input() columns!: number;
}

@Component({
  selector: 'bna-grid-suggestion-menu-item',
  template: `
    <button
      type="button"
      class="bn-grid-suggestion-menu-item"
      [class.bn-grid-suggestion-menu-item-selected]="isSelected"
      [id]="id"
      (click)="onClick()"
    >
      <div class="bn-grid-suggestion-menu-item-icon">
        <ng-container *ngIf="isEmojiIcon(item.icon); else templateIcon">
          {{ item.icon }}
        </ng-container>
        <ng-template #templateIcon>
          <ng-container
            *ngTemplateOutlet="getTemplateIcon(item.icon)"
          ></ng-container>
        </ng-template>
      </div>
      <div class="bn-grid-suggestion-menu-item-title">
        {{ getItemTitle(item) }}
      </div>
    </button>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class BnaGridSuggestionMenuItemComponent {
  @Input() item!: DefaultAngularGridSuggestionItem;
  @Input() id!: string;
  @Input() isSelected = false;
  @Input() onClick!: () => void;

  isEmojiIcon(icon: any): boolean {
    return typeof icon === 'string';
  }

  getItemTitle(item: DefaultAngularGridSuggestionItem): string {
    return (item as any)?.title || 'Item';
  }

  getTemplateIcon(icon: any): TemplateRef<any> | null {
    return typeof icon === 'string' ? null : (icon as TemplateRef<any>);
  }
}

@Component({
  selector: 'bna-grid-suggestion-menu-empty-item',
  template: `
    <div
      class="bn-grid-suggestion-menu-empty-item"
      [style.grid-column]="'span ' + columns"
    >
      <ng-content></ng-content>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class BnaGridSuggestionMenuEmptyItemComponent {
  @Input() columns!: number;
}

@Component({
  selector: 'bna-grid-suggestion-menu-root',
  template: `
    <div
      [id]="id"
      [class]="className"
      [style.grid-template-columns]="'repeat(' + columns + ', 1fr)'"
      style="display: grid; gap: 4px;"
    >
      <ng-content></ng-content>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class BnaGridSuggestionMenuRootComponent {
  @Input() id!: string;
  @Input() className!: string;
  @Input() columns!: number;
}

@Component({
  selector: 'bna-grid-suggestion-menu',
  template: `
    <bna-grid-suggestion-menu-root
      id="bn-grid-suggestion-menu"
      className="bn-grid-suggestion-menu"
      [columns]="columns"
    >
      <!-- Loader -->
      <bna-grid-suggestion-menu-loader
        *ngIf="showLoader()"
        [columns]="columns"
      ></bna-grid-suggestion-menu-loader>

      <!-- Items -->
      <bna-grid-suggestion-menu-item
        *ngFor="let item of items; let i = index; trackBy: trackByItemId"
        [item]="item"
        [id]="'bn-grid-suggestion-menu-item-' + i"
        [isSelected]="i === selectedIndex"
        [onClick]="getItemClickHandler(item)"
      ></bna-grid-suggestion-menu-item>

      <!-- Empty state -->
      <bna-grid-suggestion-menu-empty-item
        *ngIf="showEmptyState()"
        [columns]="columns"
      >
        {{ noItemsText }}
      </bna-grid-suggestion-menu-empty-item>
    </bna-grid-suggestion-menu-root>
  `,
  standalone: true,
  imports: [
    CommonModule,
    BnaGridSuggestionMenuRootComponent,
    BnaGridSuggestionMenuLoaderComponent,
    BnaGridSuggestionMenuItemComponent,
    BnaGridSuggestionMenuEmptyItemComponent,
  ],
})
export class BnaGridSuggestionMenuComponent<
  T extends DefaultAngularGridSuggestionItem,
> implements GridSuggestionMenuProps<T>
{
  @Input() items!: T[];
  @Input() loadingState!: 'loading-initial' | 'loading' | 'loaded';
  @Input() selectedIndex: number | undefined = undefined;
  @Input() onItemClick?: (item: T) => void;
  @Input() columns!: number;

  // i18n fallbacks - TODO: implement proper i18n service
  noItemsText = 'No items found';

  showLoader = computed(() => {
    return (
      this.loadingState === 'loading-initial' || this.loadingState === 'loading'
    );
  });

  showEmptyState = computed(() => {
    return this.items.length === 0 && this.loadingState === 'loaded';
  });

  trackByItemId(index: number, item: T): string {
    return (item as any)?.id || index.toString();
  }

  getItemClickHandler(item: T): () => void {
    return () => {
      this.onItemClick?.(item);
    };
  }
}
