import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HlmTabsComponent } from '@spartan-ng/ui-tabs-helm';
import { hlmP } from '@spartan-ng/ui-typography-helm';
import { CodeComponent } from '../../../../shared/code/code.component';
import { DemoBoxComponent } from '../../../../shared/layout/demo-box.component';
import { TabsComponent } from '../../../../shared/layout/example-tabs.component';
import { SectionIntroComponent } from '../../../../shared/layout/section-intro.component';
import {
  ConvertToHtmlExample,
  convertToHtmlExampleCode,
} from './convert-to-html.example';

@Component({
  imports: [
    CommonModule,
    SectionIntroComponent,
    DemoBoxComponent,
    HlmTabsComponent,
    TabsComponent,
    CodeComponent,
    ConvertToHtmlExample,
  ],
  template: `
    <bna-section-intro name="Convert Blocks to HTML">
      <p class="${hlmP} mb-8">
        This example exports the current document (all blocks) as HTML and
        displays it below the editor.
      </p>
    </bna-section-intro>
    <hlm-tabs tab="preview">
      <bna-example-tabs firstTab="Preview" secondTab="Code">
        <bna-demo-box firstTab>
          <bna-convert-to-html-example />
        </bna-demo-box>
        <bna-code [code]="exampleCode" secondTab />
      </bna-example-tabs>
    </hlm-tabs>
  `,
})
export class ConvertToHtmlPage {
  exampleCode = convertToHtmlExampleCode;
}
