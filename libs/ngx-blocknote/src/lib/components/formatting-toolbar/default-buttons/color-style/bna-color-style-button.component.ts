import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { ColorOptions } from '../../../../interfaces/color-options.type';
import { BlockNoteAngularService } from '../../../../services';
import {
  HlmButtonDirective,
  HlmIconComponent,
  HlmMenuComponent,
  HlmMenuGroupComponent,
} from '../../../../ui';
import { BnaColorPickerComponent } from '../../../color-picker/bna-color-picker.component';
import { BnaColorIconComponent } from '../../../color-picker/color-icon/bna-color-icon.component';
import { BnaLinkFormComponent } from '../../../link-toolbar/link-form/bna-link-form.component';

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
  ],
  templateUrl: './bna-color-style-button.component.html',
  styleUrl: './bna-color-style-button.component.css',
})
export class BnaColorStyleButtonComponent {
  options: ColorOptions = this.getOptions();

  constructor(private blockNoteAngularService: BlockNoteAngularService) {
    this.blockNoteAngularService.editor().onSelectionChange(() => {
      this.options = this.getOptions();
    });
  }

  private getOptions(): ColorOptions {
    const editor = this.blockNoteAngularService.editor();
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
