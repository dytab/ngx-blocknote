import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { Dictionary } from '@blocknote/core';
import { provideIcons } from '@ng-icons/core';
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
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { BlockTypeSelectItem } from '../../../../interfaces/block-type-select-item';
import { BlockNoteAngularService } from '../../../../services';
import {
  HlmButtonDirective,
  HlmIconComponent,
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemCheckboxDirective,
  HlmMenuItemCheckComponent,
} from '../../../../ui';
import { BnaColorPickerComponent } from '../../../color-picker/bna-color-picker.component';
import { BnaColorIconComponent } from '../../../color-picker/color-icon/bna-color-icon.component';
import { defaultBlockTypeSelectItems } from './default-block-type-select-items';
import { useEditorContentOrSelectionChange } from '../../../../util/use-editor-content-or-selection-change';

@Component({
  selector: 'bna-block-type-selection-button',
  standalone: true,
  imports: [
    CommonModule,
    BnaColorIconComponent,
    BnaColorPickerComponent,
    HlmButtonDirective,
    HlmMenuComponent,
    HlmMenuGroupComponent,
    BrnMenuTriggerDirective,
    HlmIconComponent,
    HlmMenuItemCheckComponent,
    HlmMenuItemCheckboxDirective,
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
  _visibilityClass = computed(() => {
    const selectedBlocks = this.blockNoteAngularService.selectedBlocks();
    const firstBlock = selectedBlocks[0];
    const filteredBlockTypes = this.filteredBlockTypes();
    const hasItem =
      filteredBlockTypes.find((item) => item.type === firstBlock?.type) !==
      undefined;
    return hasItem ? '' : 'hidden';
  });
  blockTypeSelectItems = input<(dict: Dictionary) => BlockTypeSelectItem[]>(
    defaultBlockTypeSelectItems
  );
  filteredBlockTypes = computed(() => {
    const editor = this.blockNoteAngularService.editor();
    const dict = editor.dictionary;
    const blockTypeSelectItems = this.blockTypeSelectItems();
    return blockTypeSelectItems(dict).filter(
      (item) => item.type in editor.schema.blockSchema
    );
  });
  currentBlockType = signal<BlockTypeSelectItem | undefined>(undefined);

  constructor(private blockNoteAngularService: BlockNoteAngularService) {
    this.updateCurrentBlockTypeOnChanges();
  }

  private updateCurrentBlockTypeOnChanges() {
    const editor = this.blockNoteAngularService.editor();
    useEditorContentOrSelectionChange(() => {
      this.currentBlockType.set(
        this.filteredBlockTypes().find((a) =>
          a.isSelected(editor.getTextCursorPosition().block)
        )
      );
    }, editor);
  }

  changeBlockType(
    type: string,
    props?: Record<string, boolean | number | string> | undefined
  ) {
    const editor = this.blockNoteAngularService.editor();
    const selectedBlocks = this.blockNoteAngularService.selectedBlocks();
    editor.focus();
    for (const block of selectedBlocks) {
      editor.updateBlock(block, {
        type: type as any,
        props: props,
      });
    }
  }
}
