import { Component, computed, inject } from '@angular/core';
import { BlockNoteEditor, BlockSchema, StyleSchema } from '@blocknote/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLink } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { BrnMenuTrigger } from '@spartan-ng/brain/menu';
import { HlmMenu, HlmMenuGroup } from '@spartan-ng/helm/menu';
import { BrnTooltipContentTemplate } from '@spartan-ng/brain/tooltip';
import { HlmTooltip, HlmTooltipTrigger } from '@spartan-ng/helm/tooltip';
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
    HlmButton,
    HlmMenu,
    BrnMenuTrigger,
    HlmMenuGroup,
    BnaLinkFormComponent,
    HlmTooltipTrigger,
    BrnTooltipContentTemplate,
    HlmTooltip,
    NgIcon,
    HlmIcon,
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
