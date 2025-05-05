import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PartialBlock } from '@blocknote/core';
import {
  BnaEditorComponent,
  BnaSlashMenuControllerComponent,
} from '@dytab/ngx-blocknote';
import { CustomSlashMenuComponent } from './custom-slash-menu.component';

@Component({
  selector: 'bna-replacing-slash-menu-example',
  imports: [
    CommonModule,
    BnaEditorComponent,
    CustomSlashMenuComponent,
    BnaSlashMenuControllerComponent,
  ],
  template: `<bna-editor [initialContent]="initialContent">
    <bna-slash-menu-controller>
      <bna-custom-slash-menu />
    </bna-slash-menu-controller>
  </bna-editor> `,
})
export class ReplacingSlashMenuExample {
  initialContent: PartialBlock[] = [
    {
      type: 'paragraph',
      content: 'Welcome to this demo!',
    },
    {
      type: 'paragraph',
      content: "Press the '/' key to open the Slash Menu",
    },
    {
      type: 'paragraph',
      content: "It's been replaced with a custom component",
    },
    {
      type: 'paragraph',
    },
  ];
}

export const formattingToolbarButtonsExampleCode = `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PartialBlock } from '@blocknote/core';
import { CustomSlashMenuComponent } from './custom-slash-menu.component';
import {
  BnaBasicTextStyleButtonComponent,
  BnaEditorComponent,
  BnaFormattingToolbarComponent,
  BnaFormattingToolbarControllerComponent,
  BnaSuggestionsMenuControllerComponent,
} from '@dytab/ngx-blocknote';

@Component({
  selector: 'bna-replacing-slash-menu-example',
  standalone: true,
  imports: [
    CommonModule,
    BnaEditorComponent,
    CustomSlashMenuComponent,
    BnaSuggestionsMenuControllerComponent,
  ],
  template: \`<bna-editor [initialContent]="initialContent">
    <bna-suggestions-menu-controller triggerCharacter="/">
      <bna-custom-slash-menu />
    </bna-suggestions-menu-controller>
  </bna-editor> \`,
})
export class ReplacingSlashMenuExample {
  initialContent: PartialBlock[] = [
    {
      type: 'paragraph',
      content: 'Welcome to this demo!',
    },
    {
      type: 'paragraph',
      content: "Press the '/' key to open the Slash Menu",
    },
    {
      type: 'paragraph',
      content: "It's been replaced with a custom component",
    },
    {
      type: 'paragraph',
    },
  ];
}`;
