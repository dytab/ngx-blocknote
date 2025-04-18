import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PartialBlock } from '@blocknote/core';
import {
  BnaAddBlockButtonComponent,
  BnaDeleteBlockItemComponent,
  BnaDragHandleMenuComponent,
  BnaEditorComponent,
  BnaSideMenuComponent,
  BnaSideMenuControllerComponent,
} from '@dytab/ngx-blocknote';
import { ResetBlockButtonComponent } from './reset-block-button.component';

@Component({
  selector: 'bna-adding-side-menu-drag-handle-items-example',
  imports: [
    CommonModule,
    BnaEditorComponent,
    BnaSideMenuControllerComponent,
    BnaSideMenuComponent,
    BnaAddBlockButtonComponent,
    ResetBlockButtonComponent,
    BnaDragHandleMenuComponent,
    BnaDeleteBlockItemComponent,
  ],
  template: `<bna-editor [initialContent]="initialContent">
    <bna-side-menu-controller>
      <bna-side-menu>
        <bna-add-block-btn />
        <bna-drag-handle-menu-btn>
          <bna-delete-block-item />
          <bna-reset-block-button /> </bna-drag-handle-menu-btn
      ></bna-side-menu>
    </bna-side-menu-controller>
  </bna-editor> `,
})
export class AddingSideMenuDragHandleItemsExample {
  initialContent: PartialBlock[] = [
    {
      type: 'paragraph',
      content: 'Welcome to this demo!',
    },
    {
      type: 'paragraph',
      content: '<- Click the Drag Handle to see the new item',
    },
    {
      type: 'bulletListItem',
      content:
        "Try resetting this block's type using the new Drag Handle Menu item",
    },
    {
      type: 'paragraph',
    },
  ];
}

export const addingSideMenuDragHandleItemsExampleCode = `import { CommonModule } from '@angular/common';
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
