import { Component } from '@angular/core';
import { HlmTabs } from '@spartan-ng/helm/tabs';
import { hlmP } from '@spartan-ng/helm/typography';
import { CodeComponent } from '../../../../shared/code/code.component';
import { DemoBoxComponent } from '../../../../shared/layout/demo-box.component';
import { TabsComponent } from '../../../../shared/layout/example-tabs.component';
import { SectionIntroComponent } from '../../../../shared/layout/section-intro.component';
import {
  AlertBlockExample,
  alertBlockExampleCode,
} from './alert-block.example';

@Component({
  imports: [
    SectionIntroComponent,
    CodeComponent,
    DemoBoxComponent,
    HlmTabs,
    TabsComponent,
    AlertBlockExample,
  ],
  template: `<bna-section-intro name="Alert Block">
      <p class="${hlmP} mb-8">
        In this example, we create a custom Alert block which is used to
        emphasize text. In addition, we create a Slash Menu item which inserts
        an Alert block.
      </p>
      <p>
        <strong>Try it out</strong>: Press the "/" key to open the Slash Menu
        and insert an Alert block!
      </p>
    </bna-section-intro>
    <hlm-tabs tab="preview">
      <bna-example-tabs firstTab="Preview" secondTab="Code">
        <bna-demo-box firstTab>
          <bna-alert-block-example />
        </bna-demo-box>
        <bna-code [code]="exampleCode" secondTab />
      </bna-example-tabs>
    </hlm-tabs>`,
})
export class AlertBlockPage {
  exampleCode = alertBlockExampleCode;
}
