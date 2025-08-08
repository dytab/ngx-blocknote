import { Component } from '@angular/core';
import { HlmTabsComponent } from '@spartan-ng/ui-tabs-helm';
import { hlmP } from '@spartan-ng/ui-typography-helm';
import { CodeComponent } from '../../../../shared/code/code.component';
import { DemoBoxComponent } from '../../../../shared/layout/demo-box.component';
import { TabsComponent } from '../../../../shared/layout/example-tabs.component';
import { SectionIntroComponent } from '../../../../shared/layout/section-intro.component';
import {
  apiContentBlockExampleCode,
  CustomEditorExample,
} from './custom-editor.example';

@Component({
  imports: [
    SectionIntroComponent,
    CodeComponent,
    DemoBoxComponent,
    HlmTabsComponent,
    TabsComponent,
    CustomEditorExample,
  ],
  template: `<bna-section-intro name="Custom Editor">
      <p class="${hlmP} mb-8">
        In this example, we want to give a custom editor as input
      </p>
    </bna-section-intro>
    <hlm-tabs tab="preview">
      <bna-example-tabs firstTab="Preview" secondTab="Code">
        <bna-demo-box firstTab>
          <bna-custom-editor-example />
        </bna-demo-box>
        <bna-code [code]="exampleCode" secondTab />
      </bna-example-tabs>
    </hlm-tabs>`,
})
export class CustomEditorPage {
  exampleCode = apiContentBlockExampleCode;
}
