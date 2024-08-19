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
  MentionsMenuExample,
  mentionsMenuExampleCode,
} from './mentions-menu.example';
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
    MentionsMenuExample,
  ],
  template: `<bna-section-intro name="Mentions Menu">
      <p class="${hlmP} mb-8">
        In this example, we create a custom Mention inline content type which is
        used to tag people. In addition, we create a new Suggestion Menu for
        mentions which opens with the "&#64;" character.
      </p>
      <p>
        <strong>Try it out</strong>: Press the "&#64;" key to open the mentions
        menu and insert a mention!
      </p>
    </bna-section-intro>
    <hlm-tabs tab="preview">
      <bna-example-tabs firstTab="Preview" secondTab="Code">
        <bna-demo-box firstTab>
          <bna-mentions-menu-example />
        </bna-demo-box>
        <bna-code [code]="exampleCode" secondTab />
      </bna-example-tabs>
    </hlm-tabs>`,
})
export class MentionsMenuPage {
  exampleCode = mentionsMenuExampleCode;
}
