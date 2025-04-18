import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HlmTabsComponent } from '@spartan-ng/ui-tabs-helm';
import { hlmP } from '@spartan-ng/ui-typography-helm';
import { CodeComponent } from '../../../../shared/code/code.component';
import { DemoBoxComponent } from '../../../../shared/layout/demo-box.component';
import { TabsComponent } from '../../../../shared/layout/example-tabs.component';
import { SectionIntroComponent } from '../../../../shared/layout/section-intro.component';
import { basicSetupExampleCode, FormExample } from './form.example';

@Component({
  imports: [
    CommonModule,
    SectionIntroComponent,
    DemoBoxComponent,
    HlmTabsComponent,
    TabsComponent,
    CodeComponent,
    FormExample,
  ],
  template: `
    <bna-section-intro name="Form">
      <p class="${hlmP} mb-8">
        This example shows how the editor can be integrated in every form.
      </p>
    </bna-section-intro>
    <hlm-tabs tab="preview">
      <bna-example-tabs firstTab="Preview" secondTab="Code">
        <bna-demo-box firstTab>
          <bna-form-example />
        </bna-demo-box>
        <bna-code [code]="exampleCode" secondTab />
      </bna-example-tabs>
    </hlm-tabs>
  `,
})
export class FormPage {
  exampleCode = basicSetupExampleCode;
}
