import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  hlmP,
  HlmTabsComponent
} from '@dytab/ui';

import { CodeComponent } from '../../../../shared/code/code.component';
import { DemoBoxComponent } from '../../../../shared/layout/demo-box.component';
import { TabsComponent } from '../../../../shared/layout/example-tabs.component';
import { SectionIntroComponent } from '../../../../shared/layout/section-intro.component';
import {
  UploadFileExample,
  uploadFileExampleCode,
} from './upload-file.example';

@Component({
  imports: [
    CommonModule,
    SectionIntroComponent,
    DemoBoxComponent,
    HlmTabsComponent,
    TabsComponent,
    CodeComponent,
    UploadFileExample
],
  template: `
    <bna-section-intro name="Upload Files">
      <p class="${hlmP} mb-8">
        This example allows users to upload files and use them in the editor.
        The files are uploaded to /TMP/Files, and can be used for File, Image,
        Video, and Audio blocks.
        <br /><br />
        <b>Try it out:</b> Click the "Add Image" button and see there's now an
        "Upload" tab in the toolbar!
      </p>
    </bna-section-intro>
    <hlm-tabs tab="preview">
      <bna-example-tabs firstTab="Preview" secondTab="Code">
        <bna-demo-box firstTab>
          <bna-upload-file-example />
        </bna-demo-box>
        <bna-code [code]="exampleCode" secondTab />
      </bna-example-tabs>
    </hlm-tabs>
  `,
})
export class UploadFilePage {
  exampleCode = uploadFileExampleCode;
}
