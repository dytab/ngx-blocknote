import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HlmButtonDirective } from '@dytab/ui';
import { BnaEditorComponent } from '@dytab/ngx-blocknote';
import { HttpClient } from '@angular/common/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'bna-server-side-rendering-example',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BnaEditorComponent,
    HlmButtonDirective,
  ],
  template: `
    <button type="button" hlmBtn size="sm" type (click)="logSSR()">
      Log SSR
    </button>
    <bna-editor [formControl]="control" />
    SSR Output
    <div class="bg">{{ ssrContent }}</div>
  `,
})
export class ServerSideRenderingExample {
  ssrContent = '';
  control = new FormControl([
    {
      type: 'paragraph',
      content: 'Welcome to this demo!',
    },
    {
      type: 'paragraph',
      content: 'Try to get the html result',
    },
  ]);

  constructor(private httpClient: HttpClient) {}

  logSSR() {
    this.httpClient
      .post('http://localhost:3000/api/test-html', this.control.value, {
        responseType: 'text',
      })
      .subscribe((result) => {
        console.log(result);
        this.ssrContent = result;
      });
  }
}

export const uploadFileExampleCode = `
TO BE ADDED`;
