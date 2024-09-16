import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import {
  BlockNoteEditor,
  BlockSchema,
  InlineContentSchema,
} from '@blocknote/core';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';
import { ColorOptions } from '../../../../interfaces/color-options.type';
import { NgxBlocknoteService } from '../../../../services';
import {
  HlmButtonDirective,
  HlmIconComponent,
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '../../../../ui';
import { BnaColorPickerComponent } from '../../../color-picker/bna-color-picker.component';
import { BnaColorIconComponent } from '../../../color-picker/color-icon/bna-color-icon.component';
import { BnaLinkFormComponent } from '../../../link-toolbar/link-form/bna-link-form.component';

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
  standalone: true,
  imports: [
    CommonModule,
    HlmButtonDirective,
    HlmIconComponent,
    BrnMenuTriggerDirective,
    BnaLinkFormComponent,
    HlmMenuComponent,
    HlmMenuGroupComponent,
    BnaColorIconComponent,
    BnaColorPickerComponent,
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
    BrnTooltipContentDirective,
  ],
  templateUrl: './bna-color-style-button.component.html',
  styleUrl: './bna-color-style-button.component.css',
  host: {
    '[class]': '_visibilityClass()',
  },
})
export class BnaColorStyleButtonComponent {
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

  constructor(private ngxBlockNoteService: NgxBlocknoteService) {
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
