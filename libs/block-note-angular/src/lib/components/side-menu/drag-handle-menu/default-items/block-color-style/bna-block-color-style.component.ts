import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import {
  Block,
  checkBlockHasDefaultProp,
  checkBlockTypeHasDefaultProp,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
} from '@blocknote/core';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { ColorOptions } from '../../../../../interfaces/color-options.type';
import { BlockNoteAngularService } from '../../../../../services';
import {
  HlmButtonDirective,
  HlmMenuComponent,
  HlmMenuGroupComponent,
} from '../../../../../ui';
import { BnaColorPickerComponent } from '../../../../color-picker/bna-color-picker.component';
import { BnaColorIconComponent } from '../../../../color-picker/color-icon/bna-color-icon.component';

@Component({
  selector: 'bna-block-color-style',
  standalone: true,
  imports: [
    CommonModule,
    BnaColorIconComponent,
    BnaColorPickerComponent,
    HlmButtonDirective,
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuGroupComponent,
  ],
  templateUrl: './bna-block-color-style.component.html',
  styleUrl: './bna-block-color-style.component.css',
})
export class BnaBlockColorStyleComponent {
  options = computed(() => {
    const editor = this.blockNoteAngularService.editor();
    const block = this.blockNoteAngularService.sideMenuFocusedBlock() as
      | Block<
          DefaultBlockSchema,
          DefaultInlineContentSchema,
          DefaultStyleSchema
        >
      | undefined;
    const colorOptions: ColorOptions = {};

    if (!block) {
      return colorOptions;
    }
    if (
      checkBlockTypeHasDefaultProp('textColor', block.type, editor) &&
      checkBlockHasDefaultProp('textColor', block, editor)
    ) {
      colorOptions.text = {
        color: block.props.textColor || 'default',
        setColor: (color: string) => {
          editor.updateBlock(block, {
            type: block.type,
            props: { textColor: color },
          });
          editor.focus();
        },
      };
    }
    if (
      checkBlockTypeHasDefaultProp('backgroundColor', block.type, editor) &&
      checkBlockHasDefaultProp('backgroundColor', block, editor)
    ) {
      colorOptions.background = {
        color: block.props.backgroundColor || 'default',
        setColor: (color: string) => {
          editor.updateBlock(block, {
            type: block.type,
            props: { backgroundColor: color },
          });
          editor.focus();
        },
      };
    }

    return colorOptions;
  });

  constructor(private blockNoteAngularService: BlockNoteAngularService) {}
}
