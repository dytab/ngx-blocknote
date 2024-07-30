import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BnaEditorComponent } from '@dytab/block-note-angular';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmTabsComponent } from '@spartan-ng/ui-tabs-helm';
import { hlmP } from '@spartan-ng/ui-typography-helm';
import { CodeComponent } from '../../../../shared/code/code.component';
import { DemoBoxComponent } from '../../../../shared/layout/demo-box.component';
import { TabsComponent } from '../../../../shared/layout/example-tabs.component';
import { SectionIntroComponent } from '../../../../shared/layout/section-intro.component';
import {
  AlertBlockExample,
  alertBlockExampleCode,
} from './alert-block.example';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    BnaEditorComponent,
    HlmButtonDirective,
    SectionIntroComponent,
    CodeComponent,
    DemoBoxComponent,
    HlmTabsComponent,
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
