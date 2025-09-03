import { signal, effect, Signal } from '@angular/core';

/**
 * Utility that automatically closes the suggestion menu after a certain number
 * of consecutive invalid queries. An invalid query is one which returns no items,
 * and each invalid query must be longer than the previous useful one.
 */
export function createCloseSuggestionMenuNoItems<Item>(
  itemsSignal: Signal<Item[]>,
  usedQuerySignal: Signal<string | undefined>,
  closeMenu: () => void,
  invalidQueries = 3
): void {
  const lastUsefulQueryLength = signal(0);

  effect(() => {
    const items = itemsSignal();
    const usedQuery = usedQuerySignal();

    if (usedQuery === undefined) {
      return;
    }

    if (items.length > 0) {
      // Query returned items, update the last useful query length
      lastUsefulQueryLength.set(usedQuery.length);
    } else if (
      usedQuery.length - lastUsefulQueryLength() > invalidQueries
    ) {
      // Too many consecutive invalid queries, close the menu
      closeMenu();
    }
  });
}

/**
 * Alternative class-based implementation for use within components
 */
export class CloseSuggestionMenuNoItemsManager<Item> {
  private lastUsefulQueryLength = 0;

  constructor(
    private closeMenu: () => void,
    private invalidQueries = 3
  ) {}

  /**
   * Call this method whenever items or query changes
   */
  checkAndClose(items: Item[], usedQuery: string | undefined): void {
    if (usedQuery === undefined) {
      return;
    }

    if (items.length > 0) {
      this.lastUsefulQueryLength = usedQuery.length;
    } else if (
      usedQuery.length - this.lastUsefulQueryLength > this.invalidQueries
    ) {
      this.closeMenu();
    }
  }

  /**
   * Reset the internal state (useful when menu opens/closes)
   */
  reset(): void {
    this.lastUsefulQueryLength = 0;
  }
}
