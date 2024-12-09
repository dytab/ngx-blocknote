import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  hlmP,
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@dytab/ui';
import { Highlight } from 'ngx-highlightjs';
import { CodeComponent } from '../../../../shared/code/code.component';
import { DemoBoxComponent } from '../../../../shared/layout/demo-box.component';
import { TabsComponent } from '../../../../shared/layout/example-tabs.component';
import { SectionIntroComponent } from '../../../../shared/layout/section-intro.component';
import {
  ManipulatingBlocksExample,
  manipulatingBlocksExampleCode,
} from './manipulating-blocks.example';

@Component({
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
    ManipulatingBlocksExample,
    Highlight,
  ],
  template: `
    <bna-section-intro name="Manipulating Blocks">
      <p class="${hlmP} mb-8">
        This example shows 4 buttons to manipulate the first block using the
        <code>insertBlocks</code>, <code>updateBlock</code>,
        <code>removeBlocks</code> and <code>replaceBlocks</code> methods.
      </p>
    </bna-section-intro>
    <hlm-tabs tab="preview">
      <bna-example-tabs firstTab="Preview" secondTab="Code">
        <bna-demo-box firstTab>
          <bna-manipulating-blocks-example />
        </bna-demo-box>
        <bna-code [code]="exampleCode" secondTab />
      </bna-example-tabs>
    </hlm-tabs>
  `,
})
export class ManipulatingBlocksPage {
  exampleCode = manipulatingBlocksExampleCode;
}
