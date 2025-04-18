import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import {
  BlockNoteEditor,
  BlockSchema,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  InlineContentSchema,
} from '@blocknote/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBold,
  lucideCode,
  lucideItalic,
  lucideStrikethrough,
  lucideUnderline,
} from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';
import {
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '@spartan-ng/ui-tooltip-helm';
import { NgxBlocknoteService } from '../../../../services/ngx-blocknote.service';

const icons = {
  bold: 'lucideBold',
  italic: 'lucideItalic',
  underline: 'lucideUnderline',
  strike: 'lucideStrikethrough',
  code: 'lucideCode',
} as const;

type BasicTextStyle = 'bold' | 'italic' | 'underline' | 'strike' | 'code';

function checkBasicTextStyleInSchema<Style extends BasicTextStyle>(
  style: Style,
  editor: BlockNoteEditor<any, any, any>,
): editor is BlockNoteEditor<
  BlockSchema,
  InlineContentSchema,
  {
    [k in Style]: {
      type: k;
      propSchema: 'boolean';
    };
  }
> {
  return (
    style in editor.schema.styleSchema &&
    editor.schema.styleSchema[style].type === style &&
    editor.schema.styleSchema[style].propSchema === 'boolean'
  );
}

@Component({
  selector: 'bna-basic-text-style-button',
  imports: [
    CommonModule,
    HlmButtonDirective,
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
    BrnTooltipContentDirective,
    NgIcon,
    HlmIconDirective,
  ],
  templateUrl: './bna-basic-text-style-button.component.html',
  styleUrl: './bna-basic-text-style-button.component.css',
  providers: [
    provideIcons({
      lucideBold,
      lucideItalic,
      lucideUnderline,
      lucideStrikethrough,
      lucideCode,
    }),
  ],
  host: {
    '[class]': '_visibilityClass()',
  },
})
export class BnaBasicTextStyleButtonComponent {
  private ngxBlockNoteService = inject(
    NgxBlocknoteService<
      DefaultBlockSchema,
      DefaultInlineContentSchema,
      DefaultStyleSchema
    >,
  );

  basicTextStyle = input.required<BasicTextStyle>();
  icon = computed(() => {
    return icons[this.basicTextStyle()];
  });
  _visibilityClass = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    const selectedBlocks = this.ngxBlockNoteService.selectedBlocks();
    const basicTextStyleInSchema = checkBasicTextStyleInSchema(
      this.basicTextStyle(),
      editor,
    );
    if (!basicTextStyleInSchema) {
      return '';
    }
    // Also don't show when none of the selected blocks have text content
    return selectedBlocks.find((block) => block.content !== undefined)
      ? ''
      : 'hidden';
  });

  hasTextStyle = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    //needs to be here, so we update, when selectedBlocks update
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const selection = this.ngxBlockNoteService.selectedBlocks();
    const style = this.basicTextStyle();
    return editor.getActiveStyles()[style];
  });

  basicTextStyleDict = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    return editor.dictionary.formatting_toolbar[this.basicTextStyle()];
  });

  toggleStyle(style: BasicTextStyle) {
    this.ngxBlockNoteService.editor().focus();
    this.ngxBlockNoteService.editor()?.toggleStyles({ [style]: true });
  }
}
