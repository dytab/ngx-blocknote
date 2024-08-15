import { Component, Input, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideIcons } from '@ng-icons/core';
import {
  lucideCheck,
  lucideHeading1,
  lucideHeading2,
  lucideHeading3,
  lucideHeading4,
  lucideHeading5,
  lucideHeading6,
  lucideList,
  lucideListChecks,
  lucideListOrdered,
  lucideSpellCheck
} from '@ng-icons/lucide';
import { HlmButtonDirective, HlmIconComponent } from '../../ui';
import {
  Block,
  BlockNoteEditor,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
} from '@blocknote/core';
import { blockTypeSelectItems } from '../../util/block-type-select-items.util';

@Component({
  selector: 'bna-block-type-select',
  standalone: true,
  imports: [CommonModule, HlmIconComponent, HlmButtonDirective],
  templateUrl: './bna-block-type-select.component.html',
  styleUrl: './bna-block-type-select.component.css',
  providers: [
    provideIcons({
      lucideHeading1,
      lucideHeading2,
      lucideHeading3,
      lucideHeading4,
      lucideHeading5,
      lucideHeading6,
      lucideList,
      lucideListChecks,
      lucideListOrdered,
      lucideCheck,
      lucideSpellCheck
    }),
  ],
})
export class BnaBlockTypeSelectComponent {
  blockTypeSelectItems=blockTypeSelectItems;

  @Input() editor?: BlockNoteEditor<DefaultBlockSchema, DefaultInlineContentSchema, DefaultStyleSchema>;
  @Input() block?: Block<any, any, any>;

  changeBlockType(type: string, props?: Record<string, boolean | number | string> | undefined){
    if(this.block){
      this.editor?.focus()

      this.editor?.updateBlock(this.block, {
        type: type as any,
        props: props
      })
    }
  }
}
