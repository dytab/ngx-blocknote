import { Component, computed, inject } from '@angular/core';
import {
  BlockNoteEditor,
  BlockSchema,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  InlineContentSchema,
} from '@blocknote/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
} from '@spartan-ng/ui-menu-helm';
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';
import {
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '@spartan-ng/ui-tooltip-helm';
import { ColorOptions } from '../../../../interfaces/color-options.type';
import { NgxBlocknoteService } from '../../../../services';
import { BnaColorPickerComponent } from '../../../color-picker/bna-color-picker.component';
import { BnaColorIconComponent } from '../../../color-picker/color-icon/bna-color-icon.component';

function checkColorInSchema<Color extends 'text' | 'background'>(
  color: Color,
  editor: BlockNoteEditor<any, any, any>,
): editor is BlockNoteEditor<
  BlockSchema,
  InlineContentSchema,
  Color extends 'text'
    ? {
        textColor: {
          type: 'textColor';
          propSchema: 'string';
        };
      }
    : {
        backgroundColor: {
          type: 'backgroundColor';
          propSchema: 'string';
        };
      }
> {
  return (
    `${color}Color` in editor.schema.styleSchema &&
    editor.schema.styleSchema[`${color}Color`].type === `${color}Color` &&
    editor.schema.styleSchema[`${color}Color`].propSchema === 'string'
  );
}

@Component({
  selector: 'bna-color-style-button',
  imports: [
    HlmButtonDirective,
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuGroupComponent,
    BnaColorIconComponent,
    BnaColorPickerComponent,
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
    BrnTooltipContentDirective,
  ],
  templateUrl: './bna-color-style-button.component.html',
  host: {
    '[class]': '_visibilityClass()',
  },
})
export class BnaColorStyleButtonComponent {
  private ngxBlockNoteService = inject(
    NgxBlocknoteService<
      DefaultBlockSchema,
      DefaultInlineContentSchema,
      DefaultStyleSchema
    >,
  );

  _visibilityClass = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    const selectedBlocks = this.ngxBlockNoteService.selectedBlocks();
    const textColorInSchema = checkColorInSchema('text', editor);
    const backgroundColorInSchema = checkColorInSchema('background', editor);
    if (!textColorInSchema && !backgroundColorInSchema) {
      return 'hidden';
    }
    for (const block of selectedBlocks) {
      if (block.content !== undefined) {
        return '';
      }
    }
    return 'hidden';
  });

  options: ColorOptions = this.getOptions();
  dict = this.ngxBlockNoteService.editor().dictionary;

  constructor() {
    this.ngxBlockNoteService.editor().onSelectionChange(() => {
      this.options = this.getOptions();
    });
  }

  private getOptions(): ColorOptions {
    const editor = this.ngxBlockNoteService.editor();
    return {
      text: {
        color: editor.getActiveStyles().textColor || 'default',
        setColor: (color: string) => {
          //TODO: add check if color is in schema

          color === 'default'
            ? editor.removeStyles({ textColor: color })
            : editor.addStyles({ textColor: color });

          editor.focus();
        },
      },
      background: {
        color: editor.getActiveStyles().backgroundColor || 'default',
        setColor: (color: string) => {
          //TODO: add check if color is in schema
          color === 'default'
            ? editor.removeStyles({ backgroundColor: color })
            : editor.addStyles({ backgroundColor: color });

          editor.focus();
        },
      },
    };
  }
}
