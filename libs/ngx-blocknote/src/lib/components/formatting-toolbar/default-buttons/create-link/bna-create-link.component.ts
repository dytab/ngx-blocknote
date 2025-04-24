import { Component, computed, inject } from '@angular/core';
import { BlockNoteEditor, BlockSchema, StyleSchema } from '@blocknote/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLink } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
} from '@spartan-ng/ui-menu-helm';
import { BrnTooltipContentDirective } from '@spartan-ng/brain/tooltip';
import {
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '@spartan-ng/ui-tooltip-helm';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';
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
    HlmButtonDirective,
    HlmMenuComponent,
    BrnMenuTriggerDirective,
    HlmMenuGroupComponent,
    BnaLinkFormComponent,
    HlmTooltipTriggerDirective,
    BrnTooltipContentDirective,
    HlmTooltipComponent,
    NgIcon,
    HlmIconDirective,
  ],
  templateUrl: './bna-create-link.component.html',
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
  private ngxBlockNoteService = inject(NgxBlocknoteService);

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

  constructor() {
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
