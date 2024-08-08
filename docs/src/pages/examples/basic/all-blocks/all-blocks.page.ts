import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { hlmP, HlmTabsComponent } from '@dytab/block-note-angular';
import { CodeComponent } from '../../../../shared/code/code.component';
import { DemoBoxComponent } from '../../../../shared/layout/demo-box.component';
import { TabsComponent } from '../../../../shared/layout/example-tabs.component';
import { SectionIntroComponent } from '../../../../shared/layout/section-intro.component';
import { AllBlocksExample, allBlocksExampleCode } from './all-blocks.example';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    SectionIntroComponent,
    CodeComponent,
    DemoBoxComponent,
    HlmTabsComponent,
    TabsComponent,
    AllBlocksExample,
  ],
  template: `<bna-section-intro name="Default Schema Showcase">
      <p class="${hlmP} mb-8">
        This example shows the minimal code required to set up a BlockNote
        editor in Angular.
      </p>
    </bna-section-intro>
    <hlm-tabs tab="preview">
      <bna-example-tabs firstTab="Preview" secondTab="Code">
        <bna-demo-box firstTab>
          <bna-all-blocks-example />
        </bna-demo-box>
        <bna-code [code]="exampleCode" secondTab />
      </bna-example-tabs>
    </hlm-tabs>`,
})
export class AllBlocksPage {
  exampleCode = allBlocksExampleCode;
}
