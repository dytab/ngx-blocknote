import { NgIcon } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { BlockNoteEditor, BlockSchema, StyleSchema } from '@blocknote/core';
import { provideIcons } from '@ng-icons/core';
import { lucideLink } from '@ng-icons/lucide';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { BrnTooltipContentDirective } from '@spartan-ng/brain/tooltip';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
import {
  HlmButtonDirective,
  HlmIconDirective,
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '../../../../ui';
import { BnaLinkFormComponent } from '../../../link-toolbar/link-form/bna-link-form.component';

function checkLinkInSchema(
  editor: BlockNoteEditor<any, any, any>,
): editor is BlockNoteEditor<
  BlockSchema,
  {
    link: {
      type: 'link';
      propSchema: any;
      content: 'styled';
    };
  },
  StyleSchema
> {
  return (
    'link' in editor.schema.inlineContentSchema &&
    editor.schema.inlineContentSchema['link'] === 'link'
  );
}

@Component({
  selector: 'bna-create-link',
  imports: [
    CommonModule,
    HlmButtonDirective,
    NgIcon,
    HlmIconDirective,
    HlmMenuComponent,
    BrnMenuTriggerDirective,
    HlmMenuGroupComponent,
    BnaLinkFormComponent,
    HlmTooltipTriggerDirective,
    BrnTooltipContentDirective,
    HlmTooltipComponent,
  ],
  templateUrl: './bna-create-link.component.html',
  styleUrl: './bna-create-link.component.css',
  providers: [
    provideIcons({
      lucideLink,
    }),
  ],
  host: {
    '[class]': '_visibilityClass()',
  },
})
export class BnaCreateLinkComponent {
  _visibilityClass = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    const selectedBlocks = this.ngxBlockNoteService.selectedBlocks();
    if (!checkLinkInSchema(editor)) {
      return 'hidden';
    }
    for (const block of selectedBlocks) {
      if (block.content === undefined) {
        return 'hidden';
      }
    }
    return '';
  });
  initialValue = this.getInitialValue();
  dict = this.ngxBlockNoteService.editor().dictionary;

  constructor(private ngxBlockNoteService: NgxBlocknoteService) {
    this.ngxBlockNoteService.editor().onSelectionChange(() => {
      this.initialValue = this.getInitialValue();
    });
  }

  private getInitialValue() {
    const editor = this.ngxBlockNoteService.editor();

    return {
      url: editor.getSelectedLinkUrl(),
      text: editor.getSelectedText(),
    };
  }
}
