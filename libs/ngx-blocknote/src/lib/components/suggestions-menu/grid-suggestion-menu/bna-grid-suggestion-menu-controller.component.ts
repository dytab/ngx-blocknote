import {
  Component,
  effect,
  ElementRef,
  OnDestroy,
  Renderer2,
  signal,
  input,
  inject,
  computed,
  ComponentRef,
  ViewContainerRef,
  Type,
} from '@angular/core';
import {
  autoUpdate,
  computePosition,
  offset,
  size,
  flip,
} from '@floating-ui/dom';
import {
  BlockSchema,
  InlineContentSchema,
  StyleSchema,
  SuggestionMenuState,
} from '@blocknote/core';
import { NgxBlocknoteService } from '../../../services/ngx-blocknote.service';
import { getVirtualElement } from '../../../util/get-virtual-element.util';
import { getDefaultAngularEmojiPickerItems } from './get-default-angular-emoji-picker-items';
import { DefaultAngularGridSuggestionItem, GridSuggestionMenuProps } from './types';

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;
type ItemType<GetItemsType extends (query: string) => Promise<any[]>> =
  ArrayElement<Awaited<ReturnType<GetItemsType>>>;

export interface GridSuggestionMenuControllerConfig<
  GetItemsType extends (query: string) => Promise<any[]> = (
    query: string,
  ) => Promise<DefaultAngularGridSuggestionItem[]>
> {
  triggerCharacter: string;
  getItems?: GetItemsType;
  columns: number;
  minQueryLength?: number;
  gridSuggestionMenuComponent?: Type<any>; // Angular component type
  onItemClick?: (item: ItemType<GetItemsType>) => void;
}

@Component({
  selector: 'bna-grid-suggestion-menu-controller',
  template: `
    @if (show()) {
      <ng-template #gridMenuContainer></ng-template>
    }
  `,
  host: {
    class: 'fixed flex',
    style: 'z-index: 2000;',
    '(mousedown)': '$event.preventDefault()',
  },
  standalone: true,
  imports: [],
})
export class BnaGridSuggestionMenuControllerComponent<
  GetItemsType extends (query: string) => Promise<any[]> = (
    query: string,
  ) => Promise<DefaultAngularGridSuggestionItem[]>
> implements OnDestroy {
  private blockNoteEditorService = inject(NgxBlocknoteService);
  private elRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private renderer2 = inject(Renderer2);
  private viewContainerRef = inject(ViewContainerRef);

  // Inputs
  readonly config = input.required<GridSuggestionMenuControllerConfig<GetItemsType>>();

  // State
  show = signal(false);
  currentState = signal<SuggestionMenuState | null>(null);

  // Computed
  private onItemClickOrDefault = computed(() => {
    const cfg = this.config();
    return cfg.onItemClick || ((item: ItemType<GetItemsType>) => {
      (item as any).onItemClick(this.blockNoteEditorService.editor());
    });
  });

  private getItemsOrDefault = computed(() => {
    const cfg = this.config();
    const editor = this.blockNoteEditorService.editor();
    return cfg.getItems || (async (query: string) =>
      await getDefaultAngularEmojiPickerItems(editor, query) as any
    );
  });

  // Private state
  private cleanup: () => void = () => {
    // Cleanup positioning updates
  };
  private unsubscribeUpdate: () => void = () => {
    // Cleanup suggestion menu updates
  };
  private componentRef: ComponentRef<any> | null = null;

  constructor() {
    effect(() => {
      this.adjustVisibilityAndPosition();
    });
  }

  ngOnDestroy() {
    this.cleanup();
    this.unsubscribeUpdate();
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  private adjustVisibilityAndPosition() {
    const editor = this.blockNoteEditorService.editor();
    const config = this.config();

    // Unsubscribe any previous listener before registering a new one
    this.unsubscribeUpdate();

    this.unsubscribeUpdate = editor.suggestionMenus.onUpdate(
      config.triggerCharacter,
      async (suggestionMenuState) => {
        this.cleanup();

        const minLen = config.minQueryLength;
        let shouldShow = suggestionMenuState.show;

        if (minLen && !suggestionMenuState.ignoreQueryLength) {
          const q = suggestionMenuState.query ?? '';
          if (q.startsWith(' ') || q.length < minLen) {
            shouldShow = false;
          }
        }

        this.show.set(shouldShow);
        this.currentState.set(suggestionMenuState);

        if (shouldShow) {
          this.createGridMenuComponent();
          this.cleanup = autoUpdate(
            getVirtualElement(suggestionMenuState.referencePos),
            this.elRef.nativeElement,
            async () => await this.updatePosition(suggestionMenuState.referencePos),
          );
        } else {
          this.destroyGridMenuComponent();
        }
      },
    );
  }

  private async updatePosition(referencePos: DOMRect) {
    const result = await computePosition(
      getVirtualElement(referencePos),
      this.elRef.nativeElement,
      {
        strategy: 'fixed',
        placement: 'bottom-start',
        middleware: [
          offset(10),
          flip(),
          size({
            apply: ({ availableHeight }) => {
              this.renderer2.setStyle(
                this.elRef.nativeElement,
                'maxHeight',
                `${availableHeight - 10}px`,
              );
            },
          }),
        ],
      },
    );

    this.renderer2.setStyle(this.elRef.nativeElement, 'top', `${result.y}px`);
    this.renderer2.setStyle(this.elRef.nativeElement, 'left', `${result.x}px`);
  }

  private createGridMenuComponent() {
    this.destroyGridMenuComponent();

    const config = this.config();
    const state = this.currentState();

    if (!state || !config.gridSuggestionMenuComponent) return;

    // Create the grid menu wrapper component dynamically
    // This would need to be implemented with proper component creation
    // For now, this is a placeholder for the dynamic component creation logic
  }

  private destroyGridMenuComponent() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
