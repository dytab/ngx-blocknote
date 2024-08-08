import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PartialBlock } from '@blocknote/core';
import {
  BnaBasicTextStyleButtonComponent,
  BnaEditorComponent,
  BnaFormattingToolbarComponent,
  BnaFormattingToolbarControllerDirective,
  HlmButtonDirective,
} from '@dytab/block-note-angular';
import { BlueButtonComponent } from './blue-button.component';

@Component({
  selector: 'bna-formatting-toolbar-buttons-example',
  standalone: true,
  imports: [
    CommonModule,
    BnaEditorComponent,
    BnaFormattingToolbarControllerDirective,
    BnaBasicTextStyleButtonComponent,
    BnaFormattingToolbarComponent,
    HlmButtonDirective,
    BlueButtonComponent,
  ],
  template: `<bna-editor [initialContent]="initialContent">
    <bna-formatting-toolbar-controller>
      <bna-formatting-toolbar>
        <bna-blue-button />
        <bna-basic-text-style-button [basicTextStyle]="'italic'" />
        <bna-basic-text-style-button [basicTextStyle]="'bold'" />
      </bna-formatting-toolbar>
    </bna-formatting-toolbar-controller>
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
