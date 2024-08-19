import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  HlmButtonDirective,
  hlmP,
  HlmTabsComponent,
} from '@dytab/ui';
import { CodeComponent } from '../../../../shared/code/code.component';
import { DemoBoxComponent } from '../../../../shared/layout/demo-box.component';
import { TabsComponent } from '../../../../shared/layout/example-tabs.component';
import { SectionIntroComponent } from '../../../../shared/layout/section-intro.component';
import {
  HeadingBlockExample,
  headingBlockExampleCode,
} from './heading-block.example';
import { BnaEditorComponent } from '@dytab/block-note-angular';

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
    HeadingBlockExample,
  ],
  template: `<bna-section-intro name="Heading Block">
      <p class="${hlmP} mb-8">
        In this example, we show the custom heading which allows us to use 6
        level headings instead of the default 3.
      </p>
      <p>
        <strong>Try it out</strong>: Press the "/" key to open the Slash Menu
        and insert the new heading levels!
      </p>
    </bna-section-intro>
    <hlm-tabs tab="preview">
      <bna-example-tabs firstTab="Preview" secondTab="Code">
        <bna-demo-box firstTab>
          <bna-heading-block-example />
        </bna-demo-box>
        <bna-code [code]="exampleCode" secondTab />
      </bna-example-tabs>
    </hlm-tabs>`,
})
export class HeadingBlockPage {
  exampleCode = headingBlockExampleCode;
}
