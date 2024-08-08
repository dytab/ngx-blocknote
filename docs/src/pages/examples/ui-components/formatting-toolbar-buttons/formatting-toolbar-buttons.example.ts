import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PartialBlock } from '@blocknote/core';
import {
  BnaEditorComponent,
  BnaFormattingToolbarDirective,
} from '@dytab/block-note-angular';
import { BasicTextStyleButtonComponent } from '../../../../../../libs/block-note-angular/src/lib/components/buttons/basic-text-style-button/basic-text-style-button.component';

@Component({
  selector: 'bna-basic-setup-example',
  standalone: true,
  imports: [
    CommonModule,
    BnaEditorComponent,
    BnaFormattingToolbarDirective,
    BasicTextStyleButtonComponent,
  ],
  template: `<bna-editor [initialContent]="initialContent">
    <div test>
      <bna-formatting-toolbar>
        <bna-basic-text-style-button [basicTextStyle]="'italic'" />
        <bna-basic-text-style-button [basicTextStyle]="'bold'" />
      </bna-formatting-toolbar>
    </div>
    <!--    <bna-formatting-toolbar test>-->
    <!--    </bna-formatting-toolbar>-->
  </bna-editor> `,
})
export class FormattingToolbarButtonsExample {
  initialContent: PartialBlock[] = [
    {
      type: 'paragraph',
      content: 'Welcome to this demo!',
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'You can now toggle ',
          styles: {},
        },
        {
          type: 'text',
          text: 'blue',
          styles: { textColor: 'blue', backgroundColor: 'blue' },
        },
        {
          type: 'text',
          text: ' and ',
          styles: {},
        },
        {
          type: 'text',
          text: 'code',
          styles: { code: true },
        },
        {
          type: 'text',
          text: ' styles with new buttons in the Formatting Toolbar',
          styles: {},
        },
      ],
    },
    {
      type: 'paragraph',
      content: 'Select some text to try them out',
    },
    {
      type: 'paragraph',
    },
  ];
}

export const formattingToolbarButtonsExampleCode = `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BnaEditorComponent } from '@dytab/block-note-angular';

@Component({
  standalone: true,
  imports: [CommonModule, BnaEditorComponent],
  template: \` <bna-editor [initialContent]="initialContent" /> \`,
})
export class BasicSetupExample {
  initialContent = undefined;
}`;
