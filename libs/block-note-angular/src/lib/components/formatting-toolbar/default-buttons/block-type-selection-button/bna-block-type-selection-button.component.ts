import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BnaColorIconComponent
} from '../../../color-picker/color-icon/bna-color-icon.component';
import {
  BnaColorPickerComponent
} from '../../../color-picker/bna-color-picker.component';
import {
  HlmButtonDirective, HlmIconComponent,
  HlmMenuComponent, HlmMenuGroupComponent
} from '../../../../ui';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
  BnaBlockTypeSelectComponent
} from '../../../block-type-select/bna-block-type-select.component';
import {
  Block,
  BlockNoteEditor,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema
} from '@blocknote/core';
import { BlockNoteAngularService } from '../../../../services';
import {
  blockTypeSelectItems
} from '../../../../util/block-type-select-items.util';
import { BlockTypeSelectItem } from '../../../../interfaces/block-type-select-item';

@Component({
  selector: 'bna-block-type-selection-button',
  standalone: true,
  imports: [CommonModule, BnaColorIconComponent, BnaColorPickerComponent, HlmButtonDirective, HlmMenuComponent, HlmMenuGroupComponent, BrnMenuTriggerDirective, BnaBlockTypeSelectComponent, HlmIconComponent],
  templateUrl: './bna-block-type-selection-button.component.html',
  styleUrl: './bna-block-type-selection-button.component.css'
})
export class BnaBlockTypeSelectionButtonComponent{
  blockType?: BlockTypeSelectItem
  block? :Block<any, any, any>;

  protected editor: BlockNoteEditor<DefaultBlockSchema, DefaultInlineContentSchema, DefaultStyleSchema>;

  constructor(private blockNoteAngularService: BlockNoteAngularService) {
    this.editor = this.blockNoteAngularService.editor()
    this.blockNoteAngularService.editor().onSelectionChange(() => {
      console.log('onSelectionChange');
      this.block = this.blockNoteAngularService.sideMenuFocusedBlock();
      this.blockType = this.getBlockType()
    })
    this.blockNoteAngularService.editor().onEditorContentChange(() => {
      console.log('onEditorContentChange');
      this.block = this.blockNoteAngularService.sideMenuFocusedBlock();
      this.blockType = this.getBlockType()
    })
  }

  private getBlockType = () => blockTypeSelectItems.find(a => a.isSelected(this.block));
}
