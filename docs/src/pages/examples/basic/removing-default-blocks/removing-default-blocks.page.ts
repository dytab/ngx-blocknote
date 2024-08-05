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
  RemovingDefaultBlocksExample,
  removingDefaultBlocksExampleCode,
} from './removing-default-blocks.example';

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
    RemovingDefaultBlocksExample,
    Highlight,
  ],
  template: `
    <bna-section-intro name="Removing Default Blocks from Schema">
      <p class="${hlmP} mb-8">
        This example shows how to change the default schema and disable the Audio and Image blocks. To do this, we pass in a custom schema based on the built-in, default schema, with two specific blocks removed.
      </p>
    </bna-section-intro>
    <hlm-tabs tab="preview">
      <bna-example-tabs firstTab="Preview" secondTab="Code">
        <bna-demo-box firstTab>
          <bna-removing-default-blocks-example />
        </bna-demo-box>
        <bna-code [code]="exampleCode" secondTab />
      </bna-example-tabs>
    </hlm-tabs>
  `,
})
export class RemovingDefaultBlocksPage{
  exampleCode = removingDefaultBlocksExampleCode;
}
