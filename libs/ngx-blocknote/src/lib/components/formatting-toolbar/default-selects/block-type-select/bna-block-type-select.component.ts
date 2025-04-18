import { Component, computed, inject, input, signal } from '@angular/core';
import {
  BlockNoteEditor,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  Dictionary,
} from '@blocknote/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCheck,
  lucideHeading1,
  lucideHeading2,
  lucideHeading3,
  lucideHeading4,
  lucideHeading5,
  lucideHeading6,
  lucideList,
  lucideListChecks,
  lucideListOrdered,
  lucideType,
} from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemCheckboxDirective,
  HlmMenuItemCheckComponent,
} from '@spartan-ng/ui-menu-helm';
import { BlockTypeSelectItem } from '../../../../interfaces/block-type-select-item';
import { NgxBlocknoteService } from '../../../../services';
import { useEditorContentOrSelectionChange } from '../../../../util/use-editor-content-or-selection-change';
import { defaultBlockTypeSelectItems } from './default-block-type-select-items';

@Component({
  selector: 'bna-block-type-selection-button',
  imports: [
    HlmButtonDirective,
    HlmMenuComponent,
    HlmMenuGroupComponent,
    BrnMenuTriggerDirective,
    HlmMenuItemCheckComponent,
    HlmMenuItemCheckboxDirective,
    NgIcon,
    HlmIconDirective,
  ],
  templateUrl: './bna-block-type-select.component.html',
  styleUrl: './bna-block-type-select.component.css',
  providers: [
    provideIcons({
      lucideType,
      lucideHeading1,
      lucideHeading2,
      lucideHeading3,
      lucideHeading4,
      lucideHeading5,
      lucideHeading6,
      lucideList,
      lucideListOrdered,
      lucideListChecks,
      lucideCheck,
    }),
  ],
  host: {
    '[class]': '_visibilityClass()',
  },
})
export class BnaBlockTypeSelectComponent {
  private ngxBlockNoteService = inject(
    NgxBlocknoteService<
      DefaultBlockSchema,
      DefaultInlineContentSchema,
      DefaultStyleSchema
    >,
  );

  _visibilityClass = computed(() => {
    const selectedBlocks = this.ngxBlockNoteService.selectedBlocks();
    const firstBlock = selectedBlocks[0];
    const filteredBlockTypes = this.filteredBlockTypes();
    const hasItem =
      filteredBlockTypes.find((item) => item.type === firstBlock?.type) !==
      undefined;
    return hasItem ? '' : 'hidden';
  });
  blockTypeSelectItems = input<(dict: Dictionary) => BlockTypeSelectItem[]>(
    defaultBlockTypeSelectItems,
  );
  filteredBlockTypes = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    const dict = editor.dictionary;
    const blockTypeSelectItems = this.blockTypeSelectItems();
    return blockTypeSelectItems(dict).filter(
      (item) => item.type in editor.schema.blockSchema,
    );
  });
  currentBlockType = computed(() => {
    const index = this.currentBlockTypeIndex();
    return index !== undefined ? this.filteredBlockTypes()[index] : undefined;
  });
  currentBlockTypeIndex = signal<number | undefined>(
    this.getCurrentBlockIndex(this.ngxBlockNoteService.editor()),
  );

  constructor() {
    this.updateCurrentBlockTypeOnChanges();
  }

  private updateCurrentBlockTypeOnChanges() {
    const editor = this.ngxBlockNoteService.editor();
    useEditorContentOrSelectionChange(() => {
      this.currentBlockTypeIndex.set(this.getCurrentBlockIndex(editor));
    }, editor);
  }

  private getCurrentBlockIndex(editor: BlockNoteEditor<any, any, any>) {
    return this.filteredBlockTypes().findIndex((a) =>
      a.isSelected(editor.getTextCursorPosition().block),
    );
  }

  changeBlockType(
    type: string,
    props?: Record<string, boolean | number | string> | undefined,
  ) {
    const editor = this.ngxBlockNoteService.editor();
    const selectedBlocks = this.ngxBlockNoteService.selectedBlocks();
    editor.focus();
    for (const block of selectedBlocks) {
      editor.updateBlock(block, {
        type: type as any,
        props: props,
      });
    }
  }
}
