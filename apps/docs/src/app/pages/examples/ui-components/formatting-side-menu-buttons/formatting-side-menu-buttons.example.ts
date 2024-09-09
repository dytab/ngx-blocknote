import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PartialBlock } from '@blocknote/core';
import {
  BnaBasicTextStyleButtonComponent,
  BnaDragHandleMenuComponent,
  BnaEditorComponent,
  BnaSideMenuComponent,
  BnaSideMenuControllerDirective,
} from '@dytab/ngx-blocknote';
import { RemoveBlockButtonComponent } from './remove-block-button.component';
import { HlmButtonDirective } from '@dytab/ui';

@Component({
  selector: 'bna-formatting-side-menu-buttons-example',
  standalone: true,
  imports: [
    CommonModule,
    BnaEditorComponent,
    BnaBasicTextStyleButtonComponent,
    HlmButtonDirective,
    BnaSideMenuControllerDirective,
    BnaSideMenuComponent,
    RemoveBlockButtonComponent,
    BnaDragHandleMenuComponent,
  ],
  template: `<bna-editor [initialContent]="initialContent">
    <bna-side-menu-controller>
      <bna-side-menu>
        <bna-remove-block-button /> <bna-drag-handle-menu-btn
      /></bna-side-menu>
    </bna-side-menu-controller>
  </bna-editor> `,
})
export class FormattingSideMenuButtonsExample {
  initialContent: PartialBlock[] = [
    {
      type: 'paragraph',
      content: 'Welcome to this demo!',
    },
    {
      type: 'paragraph',
      content: '<- Notice the new button in the side menu',
    },
    {
      type: 'paragraph',
      content: 'Click it to remove the hovered block',
    },
    {
      type: 'paragraph',
    },
  ];
}

export const formattingSideMenuButtonsExampleCode = `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BnaEditorComponent } from '@dytab/ngx-blocknote';

@Component({
  standalone: true,
  imports: [CommonModule, BnaEditorComponent],
  template: \` <bna-editor [initialContent]="initialContent" /> \`,
})
export class BasicSetupExample {
  initialContent = undefined;
}`;