
import { Component, computed, signal, inject } from '@angular/core';
import {
  Block,
  checkBlockHasDefaultProp,
  checkBlockTypeHasDefaultProp,
} from '@blocknote/core';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { ColorOptions } from '../../../../../interfaces/color-options.type';
import { NgxBlocknoteService } from '../../../../../services';
import {
  HlmButtonDirective,
  HlmMenuComponent,
  HlmMenuGroupComponent,
} from '../../../../../ui';
import { useSelectedBlocks } from '../../../../../util/use-selected-blocks';
import { BnaColorPickerComponent } from '../../../../color-picker/bna-color-picker.component';

@Component({
  selector: 'bna-block-color-style',
  imports: [
    BnaColorPickerComponent,
    HlmButtonDirective,
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuGroupComponent
],
  templateUrl: './bna-block-color-style.component.html',
})
export class BnaBlockColorStyleComponent {
  private ngxBlockNoteService = inject(NgxBlocknoteService);

  selectedBlocks = signal<Block[]>(
    useSelectedBlocks(this.ngxBlockNoteService.editor()),
  );
  options = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    const sideMenuFocusedBlock =
      this.ngxBlockNoteService.sideMenuFocusedBlock();
    let selectedBlocks = this.selectedBlocks();
    if (
      sideMenuFocusedBlock &&
      selectedBlocks.find((block) => block.id === sideMenuFocusedBlock.id) ===
        undefined
    ) {
      //the current block where the side menu is opened is not in selection, then use this instead of selection
      selectedBlocks = [sideMenuFocusedBlock as Block];
    }
    const firstSelectedBlock = selectedBlocks[0];
    const colorOptions: ColorOptions = {};

    if (!firstSelectedBlock) {
      return colorOptions;
    }
    if (
      checkBlockTypeHasDefaultProp(
        'textColor',
        firstSelectedBlock.type,
        editor,
      ) &&
      checkBlockHasDefaultProp('textColor', firstSelectedBlock, editor)
    ) {
      colorOptions.text = {
        color: firstSelectedBlock.props.textColor || 'default',
        setColor: (color: string) => {
          for (const block of selectedBlocks) {
            editor.updateBlock(block, {
              type: block.type,
              props: { textColor: color },
            });
          }
          editor.focus();
          editor.sideMenu.unfreezeMenu();
        },
      };
    }
    if (
      checkBlockTypeHasDefaultProp(
        'backgroundColor',
        firstSelectedBlock.type,
        editor,
      ) &&
      checkBlockHasDefaultProp('backgroundColor', firstSelectedBlock, editor)
    ) {
      colorOptions.background = {
        color: firstSelectedBlock.props.backgroundColor || 'default',
        setColor: (color: string) => {
          for (const block of selectedBlocks) {
            editor.updateBlock(block, {
              type: block.type,
              props: { backgroundColor: color },
            });
          }
          editor.focus();
          editor.sideMenu.unfreezeMenu();
        },
      };
    }

    return colorOptions;
  });

  constructor() {
    this.ngxBlockNoteService.editor().onSelectionChange(() => {
      //Update selected blocks, when selection changes, so that we change the color of all selected blocks
      const selected = useSelectedBlocks(this.ngxBlockNoteService.editor());
      this.selectedBlocks.set(selected);
    });
  }
}
