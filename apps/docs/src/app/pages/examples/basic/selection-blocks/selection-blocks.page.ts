import { Component } from '@angular/core';
import { HlmTabs } from '@spartan-ng/helm/tabs';
import { hlmP } from '@spartan-ng/helm/typography';
import { CodeComponent } from '../../../../shared/code/code.component';
import { DemoBoxComponent } from '../../../../shared/layout/demo-box.component';
import { TabsComponent } from '../../../../shared/layout/example-tabs.component';
import { SectionIntroComponent } from '../../../../shared/layout/section-intro.component';
import {
  SelectionBlocksExample,
  selectionBlocksExampleCode,
} from './selection-blocks.example';

@Component({
  imports: [
    SectionIntroComponent,
    DemoBoxComponent,
    HlmTabs,
    TabsComponent,
    CodeComponent,
    SelectionBlocksExample,
  ],
  template: `
    <bna-section-intro name="Displaying Selected Blocks">
      <p class="${hlmP} mb-8">
        In this example, the JSON representation of blocks spanned by the user's
        selection, is displayed below the editor.
      </p>
      <p class="${hlmP}">
        <strong>Try it out</strong>: Select different blocks in the editor and
        see the JSON update!
      </p>
    </bna-section-intro>
    <hlm-tabs tab="preview">
      <bna-example-tabs firstTab="Preview" secondTab="Code">
        <bna-demo-box firstTab>
          <bna-selection-blocks-example />
        </bna-demo-box>
        <bna-code [code]="exampleCode" secondTab />
      </bna-example-tabs>
    </hlm-tabs>
  `,
})
export class SelectionBlocksPage {
  exampleCode = selectionBlocksExampleCode;
}
