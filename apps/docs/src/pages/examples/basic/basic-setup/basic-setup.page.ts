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
  BasicSetupExample,
  basicSetupExampleCode,
} from './basic-setup.example';

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
    BasicSetupExample,
    Highlight,
  ],
  template: `
    <bna-section-intro name="Basic Setup">
      <p class="${hlmP} mb-8">
        This example shows the minimal code required to set up a BlockNote
        editor in Angular.
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
export class BasicSetupPage {
  exampleCode = basicSetupExampleCode;
}
