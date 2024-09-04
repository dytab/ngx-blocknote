import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  hlmP,
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@dytab/ui';
import { Highlight } from 'ngx-highlightjs';
import { CodeComponent } from '../../../../shared/code/code.component';
import { DemoBoxComponent } from '../../../../shared/layout/demo-box.component';
import { TabsComponent } from '../../../../shared/layout/example-tabs.component';
import { SectionIntroComponent } from '../../../../shared/layout/section-intro.component';
import {
  SavingAndLoadingExample,
  savingAndLoadingExampleCode,
} from './saving-and-loading.example';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    SectionIntroComponent,
    DemoBoxComponent,
    HlmTabsComponent,
    HlmTabsListComponent,
    HlmTabsContentDirective,
    HlmTabsTriggerDirective,
    TabsComponent,
    CodeComponent,
    SavingAndLoadingExample,
    Highlight,
  ],
  template: `
    <bna-section-intro name="Saving & Loading">
      <p class="${hlmP} mb-8">
        This example shows how to save the editor contents to local storage
        whenever a change is made, and load the saved contents when the editor
        is created.
        <br /><br />
        You can replace the <code>saveToStorage</code> and
        <code>loadFromStorage</code> functions with calls to your backend or
        database. <br /><br />
        <b>Try it out:</b> Try typing in the editor and reloading the page!
      </p>
    </bna-section-intro>
    <hlm-tabs tab="preview">
      <bna-example-tabs firstTab="Preview" secondTab="Code">
        <bna-demo-box firstTab>
          <bna-saving-and-loading-example />
        </bna-demo-box>
        <bna-code [code]="exampleCode" secondTab />
      </bna-example-tabs>
    </hlm-tabs>
  `,
})
export class SavingAndLoadingPage {
  exampleCode = savingAndLoadingExampleCode;
}
