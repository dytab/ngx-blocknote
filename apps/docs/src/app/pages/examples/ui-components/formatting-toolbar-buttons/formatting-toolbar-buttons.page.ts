import { Component } from '@angular/core';
import { HlmTabs } from '@spartan-ng/helm/tabs';
import { hlmP } from '@spartan-ng/helm/typography';
import { CodeComponent } from '../../../../shared/code/code.component';
import { DemoBoxComponent } from '../../../../shared/layout/demo-box.component';
import { TabsComponent } from '../../../../shared/layout/example-tabs.component';
import { SectionIntroComponent } from '../../../../shared/layout/section-intro.component';
import {
  FormattingToolbarButtonsExample,
  formattingToolbarButtonsExampleCode,
} from './formatting-toolbar-buttons.example';

@Component({
  imports: [
    SectionIntroComponent,
    DemoBoxComponent,
    HlmTabs,
    TabsComponent,
    CodeComponent,
    FormattingToolbarButtonsExample,
  ],
  template: `
    <bna-section-intro name="Adding Formatting Toolbar Buttons">
      <p class="${hlmP} mb-8">
        In this example, we add a blue text/background color and code style
        button to the Formatting Toolbar.
      </p>
      <p>
        <strong>Try it out</strong>: Select some text to open the Formatting
        Toolbar, and click one of the new buttons!
      </p>
    </bna-section-intro>
    <hlm-tabs tab="preview">
      <bna-example-tabs firstTab="Preview" secondTab="Code">
        <bna-demo-box firstTab>
          <bna-formatting-toolbar-buttons-example />
        </bna-demo-box>
        <bna-code [code]="exampleCode" secondTab />
      </bna-example-tabs>
    </hlm-tabs>
  `,
})
export class FormattingToolbarButtonsPage {
  exampleCode = formattingToolbarButtonsExampleCode;
}
