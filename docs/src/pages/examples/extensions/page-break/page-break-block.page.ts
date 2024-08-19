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
  PageBreakBlockExample,
  pageBreakBlockExampleCode,
} from './page-break-block.example';
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
    PageBreakBlockExample,
  ],
  template: `<bna-section-intro name="Page Break">
      <p class="${hlmP} mb-8">
        In this example, we show the page break block, which helps us break
        pages when generating pdfs.
      </p>
    </bna-section-intro>
    <hlm-tabs tab="preview">
      <bna-example-tabs firstTab="Preview" secondTab="Code">
        <bna-demo-box firstTab>
          <bna-page-break-block-example />
        </bna-demo-box>
        <bna-code [code]="exampleCode" secondTab />
      </bna-example-tabs>
    </hlm-tabs>`,
})
export class PageBreakBlockPage {
  exampleCode = pageBreakBlockExampleCode;
}
