import { Component } from '@angular/core';
import { HlmTabsComponent } from '@spartan-ng/ui-tabs-helm';
import { hlmP } from '@spartan-ng/ui-typography-helm';
import { CodeComponent } from '../../../../shared/code/code.component';
import { DemoBoxComponent } from '../../../../shared/layout/demo-box.component';
import { TabsComponent } from '../../../../shared/layout/example-tabs.component';
import { SectionIntroComponent } from '../../../../shared/layout/section-intro.component';
import {
  ServerSideRenderingExample,
  uploadFileExampleCode,
} from './server-side-rendering.example';

@Component({
  imports: [
    SectionIntroComponent,
    DemoBoxComponent,
    HlmTabsComponent,
    TabsComponent,
    CodeComponent,
    ServerSideRenderingExample,
  ],
  template: `
    <bna-section-intro name="Server Side Rendering">
      <p class="${hlmP} mb-8">
        This example only works locally with the running server from apps/api.
      </p>
    </bna-section-intro>
    <hlm-tabs tab="preview">
      <bna-example-tabs firstTab="Preview" secondTab="Code">
        <bna-demo-box firstTab>
          <bna-server-side-rendering-example />
        </bna-demo-box>
        <bna-code [code]="exampleCode" secondTab />
      </bna-example-tabs>
    </hlm-tabs>
  `,
})
export class ServerSideRenderingPage {
  exampleCode = uploadFileExampleCode;
}
