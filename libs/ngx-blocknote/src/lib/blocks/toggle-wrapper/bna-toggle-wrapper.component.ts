import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  signal,
  computed,
  inject,
  TemplateRef,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Block,
  BlockNoteEditor,
  BlockSchema,
  InlineContentSchema,
  StyleSchema,
  defaultToggledState,
} from '@blocknote/core';
import { NgxBlocknoteService } from '../../services/ngx-blocknote.service';

export interface ToggleState {
  set: (block: Block<any, any, any>, isToggled: boolean) => void;
  get: (block: Block<any, any, any>) => boolean;
}

@Component({
  selector: 'bna-toggle-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <div class="bn-toggle-wrapper" [attr.data-show-children]="showChildren()">
        <button
          class="bn-toggle-button"
          type="button"
          (mousedown)="$event.preventDefault()"
          (click)="handleToggle()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 -960 960 960"
            width="1em"
            fill="currentcolor"
          >
            <!-- Material Design chevron_right icon -->
            <path d="M472-480 332-620q-18-18-18-44t18-44q18-18 44-18t44 18l183 183q9 9 14 21t5 24q0 12-5 24t-14 21L420-252q-18 18-44 18t-44-18q-18-18-18-44t18-44l140-140Z" />
          </svg>
        </button>
        <ng-content></ng-content>
      </div>
      @if (showChildren() && childCount() === 0) {
        <button
          class="bn-toggle-add-block-button"
          type="button"
          (click)="handleAddBlock()"
        >
          {{ addBlockButtonText() }}
        </button>
      }
    </div>
  `,
  styleUrls: ['./bna-toggle-wrapper.component.css']
})
export class BnaToggleWrapperComponent<
  BSchema extends BlockSchema = BlockSchema,
  ISchema extends InlineContentSchema = InlineContentSchema,
  SSchema extends StyleSchema = StyleSchema
> implements OnInit, OnDestroy {
  @Input() block!: Block<BSchema, ISchema, SSchema>;
  @Input() editor?: BlockNoteEditor<BSchema, ISchema, SSchema>;
  @Input() toggledState?: ToggleState;

  private ngxBlocknoteService = inject(NgxBlocknoteService);
  private unsubscribeContentChange?: () => void;

  // Signals for reactive state management
  showChildren = signal<boolean>(false);
  childCount = signal<number>(0);

  // Computed properties
  addBlockButtonText = computed(() => {
    const editor = this.getEditor();
    return editor?.dictionary?.toggle_blocks?.add_block_button || 'Add block';
  });

  ngOnInit() {
    if (!this.block) {
      throw new Error('BnaToggleWrapperComponent requires a block input');
    }

    const toggleState = this.toggledState || defaultToggledState;
    this.showChildren.set(toggleState.get(this.block));
    this.childCount.set(this.block.children?.length || 0);

    // Set up content change listener
    const editor = this.getEditor();
    if (editor) {
      this.unsubscribeContentChange = editor.onChange(() => {
        this.handleContentChange();
      });
    }
  }

  ngOnDestroy() {
    if (this.unsubscribeContentChange) {
      this.unsubscribeContentChange();
    }
  }

  private getEditor(): BlockNoteEditor<BSchema, ISchema, SSchema> {
    return this.editor || this.ngxBlocknoteService.editor() as BlockNoteEditor<BSchema, ISchema, SSchema>;
  }

  private handleContentChange() {
    const editor = this.getEditor();
    if (!editor) return;

    if ('isToggleable' in this.block.props && !this.block.props.isToggleable) {
      return;
    }

    const newBlock = editor.getBlock(this.block)!;
    const newChildCount = newBlock.children?.length ?? 0;
    const currentChildCount = this.childCount();

    if (newChildCount > currentChildCount) {
      // If a child block is added while children are hidden, show children
      if (!this.showChildren()) {
        this.handleChildAdded(newBlock);
      }
    } else if (newChildCount === 0 && newChildCount < currentChildCount) {
      // If the last child block is removed while children are shown, hide children
      if (this.showChildren()) {
        this.handleLastChildRemoved(newBlock);
      }
    }

    this.childCount.set(newChildCount);
  }

  handleToggle() {
    const editor = this.getEditor();
    if (!editor) return;

    const currentBlock = editor.getBlock(this.block)!;
    const newShowChildren = !this.showChildren();

    const toggleState = this.toggledState || defaultToggledState;
    toggleState.set(currentBlock, newShowChildren);

    this.showChildren.set(newShowChildren);
  }

  private handleChildAdded(block: Block<BSchema, ISchema, SSchema>) {
    const toggleState = this.toggledState || defaultToggledState;
    toggleState.set(block, true);
    this.showChildren.set(true);
  }

  private handleLastChildRemoved(block: Block<BSchema, ISchema, SSchema>) {
    const toggleState = this.toggledState || defaultToggledState;
    toggleState.set(block, false);
    this.showChildren.set(false);
  }

  handleAddBlock() {
    const editor = this.getEditor();
    if (!editor) return;

    const updatedBlock = editor.updateBlock(this.block, {
      // Single empty block with default type
      children: [{}],
    });

    if (updatedBlock.children && updatedBlock.children.length > 0) {
      editor.setTextCursorPosition(updatedBlock.children[0].id, 'end');
      editor.focus();
    }
  }
}
