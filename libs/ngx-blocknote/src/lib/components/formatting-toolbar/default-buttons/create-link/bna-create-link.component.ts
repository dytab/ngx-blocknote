import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideLink } from '@ng-icons/lucide';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { BlockNoteAngularService } from '../../../../services/block-note-angular.service';
import {
  HlmButtonDirective,
  HlmIconComponent,
  HlmMenuComponent,
  HlmMenuGroupComponent,
} from '../../../../ui';
import { BnaLinkFormComponent } from '../../../link-toolbar/link-form/bna-link-form.component';
import { BlockNoteEditor, BlockSchema, StyleSchema } from '@blocknote/core';

function checkLinkInSchema(
  editor: BlockNoteEditor<any, any, any>
): editor is BlockNoteEditor<
  BlockSchema,
  {
    link: {
      type: "link";
      propSchema: any;
      content: "styled";
    };
  },
  StyleSchema
> {
  return (
    "link" in editor.schema.inlineContentSchema &&
    editor.schema.inlineContentSchema["link"] === "link"
  );
}

@Component({
  selector: 'bna-create-link',
  standalone: true,
  imports: [
    CommonModule,
    HlmButtonDirective,
    HlmIconComponent,
    HlmMenuComponent,
    BrnMenuTriggerDirective,
    HlmMenuGroupComponent,
    BnaLinkFormComponent,
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
    const editor = this.blockNoteAngularService.editor();
    const selectedBlocks = this.blockNoteAngularService.selectedBlocks();
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

  constructor(private blockNoteAngularService: BlockNoteAngularService) {
    this.blockNoteAngularService.editor().onSelectionChange(() => {
      this.initialValue = this.getInitialValue();
    });
  }

  private getInitialValue() {
    const editor = this.blockNoteAngularService.editor();

    return {
      url: editor.getSelectedLinkUrl(),
      text: editor.getSelectedText(),
    };
  }
}
