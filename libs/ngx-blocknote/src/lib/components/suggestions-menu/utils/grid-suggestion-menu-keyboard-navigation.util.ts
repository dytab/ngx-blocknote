import {
  computed,
  DestroyRef,
  effect,
  inject,
  signal,
  Signal,
} from '@angular/core';
import {
  BlockNoteEditor,
  BlockSchema,
  InlineContentSchema,
  StyleSchema,
} from '@blocknote/core';

/**
 * Utility that handles keyboard navigation for grid suggestion menus.
 * Provides 2D navigation with arrow keys and Enter to select items.
 */
export function createGridSuggestionMenuKeyboardNavigation<Item>(
  editor: BlockNoteEditor<BlockSchema, InlineContentSchema, StyleSchema>,
  querySignal: Signal<string>,
  itemsSignal: Signal<Item[]>,
  columns: number,
  onItemClick?: (item: Item) => void,
): {
  selectedIndex: Signal<number | undefined>;
} {
  const selectedIndexInternal = signal<number>(0);
  const destroyRef = inject(DestroyRef);

  // Computed selected index (undefined if no items)
  const selectedIndex = computed(() => {
    const items = itemsSignal();
    return items.length === 0 ? undefined : selectedIndexInternal();
  });

  // Reset selected index when query changes
  effect(() => {
    querySignal(); // Track query changes
    selectedIndexInternal.set(0);
  });

  // Set up keyboard event listener
  effect(() => {
    const items = itemsSignal();
    const currentSelectedIndex = selectedIndexInternal();

    if (!editor.domElement) return;

    const handleMenuNavigationKeys = (event: KeyboardEvent): boolean => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        if (items.length) {
          selectedIndexInternal.set(
            (currentSelectedIndex - 1 + items.length) % items.length,
          );
        }
        return true;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        if (items.length) {
          selectedIndexInternal.set((currentSelectedIndex + 1) % items.length);
        }
        return true;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (items.length) {
          selectedIndexInternal.set(
            (currentSelectedIndex - columns + items.length) % items.length,
          );
        }
        return true;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (items.length) {
          selectedIndexInternal.set(
            (currentSelectedIndex + columns) % items.length,
          );
        }
        return true;
      }

      if (event.key === 'Enter' && !event.isComposing) {
        event.stopPropagation();
        event.preventDefault();
        if (items.length && onItemClick) {
          onItemClick(items[currentSelectedIndex]);
        }
        return true;
      }

      return false;
    };

    // Add event listener with capture
    editor.domElement.addEventListener(
      'keydown',
      handleMenuNavigationKeys,
      true,
    );

    // Cleanup on destroy
    destroyRef.onDestroy(() => {
      editor.domElement?.removeEventListener(
        'keydown',
        handleMenuNavigationKeys,
        true,
      );
    });
  });

  return {
    selectedIndex: selectedIndex,
  };
}

/**
 * Alternative class-based implementation for use within components
 */
export class GridSuggestionMenuKeyboardNavigationManager<Item> {
  private selectedIndexInternal = 0;
  private keyboardHandler?: (event: KeyboardEvent) => boolean;

  constructor(
    private editor: BlockNoteEditor<
      BlockSchema,
      InlineContentSchema,
      StyleSchema
    >,
    private columns: number,
    private onItemClick?: (item: Item) => void,
  ) {}

  /**
   * Get the current selected index (undefined if no items)
   */
  getSelectedIndex(items: Item[]): number | undefined {
    return items.length === 0 ? undefined : this.selectedIndexInternal;
  }

  /**
   * Update the navigation state when items or query change
   */
  updateState(items: Item[], queryChanged = false): void {
    if (queryChanged) {
      this.selectedIndexInternal = 0;
    }

    // Ensure selected index is within bounds
    if (items.length > 0 && this.selectedIndexInternal >= items.length) {
      this.selectedIndexInternal = items.length - 1;
    }
  }

  /**
   * Start listening for keyboard events
   */
  startListening(items: Item[]): void {
    this.stopListening();

    if (!this.editor.domElement) return;

    this.keyboardHandler = (event: KeyboardEvent): boolean => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        if (items.length) {
          this.selectedIndexInternal =
            (this.selectedIndexInternal - 1 + items.length) % items.length;
        }
        return true;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        if (items.length) {
          this.selectedIndexInternal =
            (this.selectedIndexInternal + 1) % items.length;
        }
        return true;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (items.length) {
          this.selectedIndexInternal =
            (this.selectedIndexInternal - this.columns + items.length) %
            items.length;
        }
        return true;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (items.length) {
          this.selectedIndexInternal =
            (this.selectedIndexInternal + this.columns) % items.length;
        }
        return true;
      }

      if (event.key === 'Enter' && !event.isComposing) {
        event.stopPropagation();
        event.preventDefault();
        if (items.length && this.onItemClick) {
          this.onItemClick(items[this.selectedIndexInternal]);
        }
        return true;
      }

      return false;
    };

    this.editor.domElement.addEventListener(
      'keydown',
      this.keyboardHandler,
      true,
    );
  }

  /**
   * Stop listening for keyboard events
   */
  stopListening(): void {
    if (this.keyboardHandler && this.editor.domElement) {
      this.editor.domElement.removeEventListener(
        'keydown',
        this.keyboardHandler,
        true,
      );
      this.keyboardHandler = undefined;
    }
  }

  /**
   * Reset the internal state
   */
  reset(): void {
    this.selectedIndexInternal = 0;
  }
}
