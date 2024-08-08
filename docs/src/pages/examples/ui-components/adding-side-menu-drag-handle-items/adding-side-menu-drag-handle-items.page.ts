import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-helm';
import { hlmP } from '@spartan-ng/ui-typography-helm';
import { Highlight } from 'ngx-highlightjs';
import { CodeComponent } from '../../../../shared/code/code.component';
import { DemoBoxComponent } from '../../../../shared/layout/demo-box.component';
import { TabsComponent } from '../../../../shared/layout/example-tabs.component';
import { SectionIntroComponent } from '../../../../shared/layout/section-intro.component';
import {
  AddingSideMenuDragHandleItemsExample,
  addingSideMenuDragHandleItemsExampleCode,
} from './adding-side-menu-drag-handle-items.example';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    SectionIntroComponent,
    DemoBoxComponent,
    HlmTabsComponent,
    HlmTabsListComponent,
    HlmTabsContentDirective,
    HlmTabsTriggerDirective,
    TabsComponent,
    CodeComponent,
    AddingSideMenuDragHandleItemsExample,
    Highlight,
  ],
  template: `
    <bna-section-intro name="Adding Drag Handle Menu Items">
      <p class="${hlmP} mb-8">
        In this example, we add an item to the Drag Handle Menu, which resets
        the hovered block to a paragraph.
      </p>
      <p>
        <strong>Try it out</strong>:Hover a block to open the Block Side Menu,
        and click "Reset Type" in the Drag Handle Menu to reset the selected
        block!
      </p>
    </bna-section-intro>
    <hlm-tabs tab="preview">
      <bna-example-tabs firstTab="Preview" secondTab="Code">
        <bna-demo-box firstTab>
          <bna-basic-setup-example />
        </bna-demo-box>
        <bna-code [code]="exampleCode" secondTab />
      </bna-example-tabs>
    </hlm-tabs>
  `,
})
export class AddingSideMenuDragHandleItemsPage {
  exampleCode = addingSideMenuDragHandleItemsExampleCode;
}
