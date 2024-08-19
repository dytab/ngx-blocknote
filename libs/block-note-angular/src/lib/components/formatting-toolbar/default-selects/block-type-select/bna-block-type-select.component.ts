import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { Block } from '@blocknote/core';
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
import { useSelectedBlocks } from '../../../../util/use-selected-blocks';
import { BlockTypeSelectItem } from '../../../../interfaces/block-type-select-item';
import { BlockNoteAngularService } from '../../../../services';
import {
  HlmButtonDirective,
  HlmIconComponent,
  HlmMenuComponent,
  HlmMenuGroupComponent,
} from '../../../../ui';
import { BnaColorPickerComponent } from '../../../color-picker/bna-color-picker.component';
import { BnaColorIconComponent } from '../../../color-picker/color-icon/bna-color-icon.component';
import { defaultBlockTypeSelectItems } from './default-block-type-select-items';

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
})
export class BnaBlockTypeSelectComponent {
  currentBlockType = signal<BlockTypeSelectItem | undefined>(undefined);
  @Input() blockTypeSelectItems = defaultBlockTypeSelectItems;
  block?: Block;

  constructor(private blockNoteAngularService: BlockNoteAngularService) {
    this.blockNoteAngularService.editor().onSelectionChange(() => {
      const selectedBlocks = useSelectedBlocks(
        this.blockNoteAngularService.editor()
      );
      this.block = selectedBlocks[0];
      this.currentBlockType.set(this.getBlockType(this.block));
    });
  }

  private getBlockType(block: Block) {
    return defaultBlockTypeSelectItems.find((a) => a.isSelected(block));
  }

  changeBlockType(
    type: string,
    props?: Record<string, boolean | number | string> | undefined
  ) {
    let selectedBlocks = useSelectedBlocks(
      this.blockNoteAngularService.editor()
    );
    this.blockNoteAngularService.editor().focus();
    for (const block of selectedBlocks) {
      this.blockNoteAngularService.editor().updateBlock(block, {
        type: type as any,
        props: props,
      });
    }
    //update selected blocks, because the type changed
    selectedBlocks = useSelectedBlocks(this.blockNoteAngularService.editor());
    this.block = selectedBlocks[0];
    this.currentBlockType.set(this.getBlockType(this.block));
  }
}
