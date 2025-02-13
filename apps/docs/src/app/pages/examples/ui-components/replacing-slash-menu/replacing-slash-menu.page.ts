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
  ReplacingSlashMenuExample,
  formattingToolbarButtonsExampleCode,
} from './replacing-slash-menu.example';

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
    ReplacingSlashMenuExample,
    Highlight,
  ],
  template: `
    <bna-section-intro name="Replacing Slash Menu">
      <p class="${hlmP} mb-8">
        In this example, we replace the default Slash Menu component with a
        basic custom one.
      </p>
      <p>
        <strong>Try it out</strong>: Press the "/" key to see the new Slash
        Menu!
      </p>
    </bna-section-intro>
    <hlm-tabs tab="preview">
      <bna-example-tabs firstTab="Preview" secondTab="Code">
        <bna-demo-box firstTab>
          <bna-replacing-slash-menu-example />
        </bna-demo-box>
        <bna-code [code]="exampleCode" secondTab />
      </bna-example-tabs>
    </hlm-tabs>
  `,
})
export class ReplacingSlashMenuPage {
  exampleCode = formattingToolbarButtonsExampleCode;
}
