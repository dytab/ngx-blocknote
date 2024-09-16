import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BnaEditorComponent } from '@dytab/ngx-blocknote';
import { CodeComponent } from '../../../../shared/code/code.component';
import { DemoBoxComponent } from '../../../../shared/layout/demo-box.component';
import { TabsComponent } from '../../../../shared/layout/example-tabs.component';
import { SectionIntroComponent } from '../../../../shared/layout/section-intro.component';
import {
  TableOfContentsBlockExample,
  tableOfContentsBlockExampleCode,
} from './table-of-contents-block.example';
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
    TableOfContentsBlockExample,
  ],
  template: `<bna-section-intro name="Table of contents">
      <p class="${hlmP} mb-8">
        In this example, we show the table of contents block, which shows us all
        the headings. When you click on an entry in the toc you get to the
        corresponding heading.
      </p>
    </bna-section-intro>
    <hlm-tabs tab="preview">
      <bna-example-tabs firstTab="Preview" secondTab="Code">
        <bna-demo-box firstTab>
          <bna-table-of-contents-block-example />
        </bna-demo-box>
        <bna-code [code]="exampleCode" secondTab />
      </bna-example-tabs>
    </hlm-tabs>`,
})
export class TableOfContentsBlockPage {
  exampleCode = tableOfContentsBlockExampleCode;
}
