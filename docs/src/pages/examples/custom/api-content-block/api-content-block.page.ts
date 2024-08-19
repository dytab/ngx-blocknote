import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  BnaEditorComponent,
} from '@dytab/block-note-angular';
import { CodeComponent } from '../../../../shared/code/code.component';
import { DemoBoxComponent } from '../../../../shared/layout/demo-box.component';
import { TabsComponent } from '../../../../shared/layout/example-tabs.component';
import { SectionIntroComponent } from '../../../../shared/layout/section-intro.component';
import {
  ApiContentBlockExample,
  apiContentBlockExampleCode,
} from './api-content-block.example';
import { HlmButtonDirective, hlmP, HlmTabsComponent } from '@dytab/ui';

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
    ApiContentBlockExample,
  ],
  template: `<bna-section-intro name="Api Content Block">
      <p class="${hlmP} mb-8">
        In this example, we create a custom block which is used to render
        content fetched by an api.
      </p>
      <ul class="list-disc">
        <li>Block can be configured</li>
        <li>Block content is fetched from api with configuration data</li>
        <li>Fetched Content is rendered</li>
      </ul>
    </bna-section-intro>
    <hlm-tabs tab="preview">
      <bna-example-tabs firstTab="Preview" secondTab="Code">
        <bna-demo-box firstTab>
          <bna-api-content-block-example />
        </bna-demo-box>
        <bna-code [code]="exampleCode" secondTab />
      </bna-example-tabs>
    </hlm-tabs>`,
})
export class ApiContentBlockPage {
  exampleCode = apiContentBlockExampleCode;
}
