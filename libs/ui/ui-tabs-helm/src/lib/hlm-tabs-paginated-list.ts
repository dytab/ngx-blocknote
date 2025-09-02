import { CdkObserveContent } from '@angular/cdk/observers';
import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  computed,
  contentChildren,
  input,
  viewChild,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronLeft, lucideChevronRight } from '@ng-icons/lucide';
import { hlm } from '@spartan-ng/helm/utils';
import {
  type BrnPaginatedTabHeaderItem,
  BrnTabsPaginatedList,
  BrnTabsTrigger,
} from '@spartan-ng/brain/tabs';
import { buttonVariants } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import type { ClassValue } from 'clsx';
import type { Observable } from 'rxjs';
import { listVariants } from './hlm-tabs-list';

@Component({
  selector: 'hlm-paginated-tabs-list',
  imports: [CdkObserveContent, NgIcon, HlmIcon],
  providers: [provideIcons({ lucideChevronRight, lucideChevronLeft })],
  template: `
    <button
      #previousPaginator
      data-pagination="previous"
      type="button"
      aria-hidden="true"
      tabindex="-1"
      [class.flex]="showPaginationControls()"
      [class.hidden]="!showPaginationControls()"
      [class]="_paginationButtonClass()"
      [disabled]="disableScrollBefore || null"
      (click)="_handlePaginatorClick('before')"
      (mousedown)="_handlePaginatorPress('before', $event)"
      (touchend)="_stopInterval()"
    >
      <ng-icon hlm size="base" name="lucideChevronLeft" />
    </button>

    <div
      #tabListContainer
      class="z-[1] flex grow overflow-hidden"
      (keydown)="_handleKeydown($event)"
    >
      <div
        class="relative grow transition-transform"
        #tabList
        role="tablist"
        (cdkObserveContent)="_onContentChanges()"
      >
        <div #tabListInner [class]="_tabListClass()">
          <ng-content></ng-content>
        </div>
      </div>
    </div>

    <button
      #nextPaginator
      data-pagination="next"
      type="button"
      aria-hidden="true"
      tabindex="-1"
      [class.flex]="showPaginationControls()"
      [class.hidden]="!showPaginationControls()"
      [class]="_paginationButtonClass()"
      [disabled]="disableScrollAfter || null"
      (click)="_handlePaginatorClick('after')"
      (mousedown)="_handlePaginatorPress('after', $event)"
      (touchend)="_stopInterval()"
    >
      <ng-icon hlm size="base" name="lucideChevronRight" />
    </button>
  `,
  host: {
    '[class]': '_computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HlmTabsPaginatedList extends BrnTabsPaginatedList {
  public readonly items = contentChildren(BrnTabsTrigger, {
    descendants: false,
  });
  /** Explicitly annotating type to avoid non-portable inferred type */
  public readonly itemsChanges: Observable<
    ReadonlyArray<BrnPaginatedTabHeaderItem>
  > = toObservable(this.items);

  public readonly tabListContainer =
    viewChild.required<ElementRef<HTMLElement>>('tabListContainer');
  public readonly tabList =
    viewChild.required<ElementRef<HTMLElement>>('tabList');
  public readonly tabListInner =
    viewChild.required<ElementRef<HTMLElement>>('tabListInner');
  public readonly nextPaginator =
    viewChild.required<ElementRef<HTMLElement>>('nextPaginator');
  public readonly previousPaginator =
    viewChild.required<ElementRef<HTMLElement>>('previousPaginator');

  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    hlm('flex overflow-hidden relative gap-1 flex-shrink-0', this.userClass()),
  );

  public readonly tabListClass = input<ClassValue>('', {
    alias: 'tabListClass',
  });
  protected readonly _tabListClass = computed(() =>
    hlm(listVariants(), this.tabListClass()),
  );

  public readonly paginationButtonClass = input<ClassValue>('', {
    alias: 'paginationButtonClass',
  });
  protected readonly _paginationButtonClass = computed(() =>
    hlm(
      'relative z-[2] select-none disabled:cursor-default',
      buttonVariants({ variant: 'ghost', size: 'icon' }),
      this.paginationButtonClass(),
    ),
  );

  protected _itemSelected(event: KeyboardEvent) {
    event.preventDefault();
  }
}
