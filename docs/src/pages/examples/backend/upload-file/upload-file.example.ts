import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PartialBlock } from '@blocknote/core';
import {
  BnaEditorComponent,
  HlmButtonDirective,
} from '@dytab/block-note-angular';

@Component({
  selector: 'bna-upload-file-example',
  standalone: true,
  imports: [CommonModule, BnaEditorComponent, HlmButtonDirective],
  template: `
    <bna-editor [initialContent]="initialContent" [options]="{uploadFile}" />
  `,
})
export class UploadFileExample {
  initialContent: PartialBlock[] = [
    {
      type: 'paragraph',
      content: 'Welcome to this demo!',
    },
    {
      type: 'paragraph',
      content: 'Upload an image using the button below',
    },
    {
      type: 'image',
    },
    {
      type: 'paragraph',
    },
  ];

  // Uploads a file to tmpfiles.org and returns the URL to the uploaded file.
  async uploadFile(file: File) {
    const body = new FormData();
    body.append('file', file);

    const ret = await fetch('https://tmpfiles.org/api/v1/upload', {
      method: 'POST',
      body: body,
    });
    return (await ret.json()).data.url.replace(
      'tmpfiles.org/',
      'tmpfiles.org/dl/'
    );
  }
}

export const uploadFileExampleCode = `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BnaEditorComponent } from '@dytab/block-note-angular';
import { HlmButtonDirective } from '@dytab/block-note-angular';
import { PartialBlock } from '@blocknote/core';

@Component({
  selector: 'bna-upload-file-example',
  standalone: true,
  imports: [CommonModule, BnaEditorComponent, HlmButtonDirective],
  template: \`
    <bna-editor [initialContent]="initialContent" [options]="{uploadFile}" />
  \`
})
export class UploadFileExample{
  initialContent: PartialBlock[] = [
    {
      type: "paragraph",
      content: "Welcome to this demo!",
    },
    {
      type: "paragraph",
      content: "Upload an image using the button below",
    },
    {
      type: "image",
    },
    {
      type: "paragraph",
    },
  ];

  // Uploads a file to tmpfiles.org and returns the URL to the uploaded file.
  async uploadFile(file: File) {
    const body = new FormData();
    body.append("file", file);

    const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
      method: "POST",
      body: body,
    });
    return (await ret.json()).data.url.replace(
      "tmpfiles.org/",
      "tmpfiles.org/dl/"
    );
  }
}`;
