import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Block, BlockNoteEditor } from '@blocknote/core';
import { BnaEditorComponent } from '@dytab/block-note-angular';

@Component({
  selector: 'bna-convert-to-html-example',
  standalone: true,
  imports: [CommonModule, BnaEditorComponent],
  template: `
    <p>Input (BlockNote Editor)</p>
    <bna-editor
      class="h-[250px] block"
      [initialContent]="initialContent"
      (contentChanged)="onContentChange($event)"
      (onEditorReady)="editorReady($event)"
    />
    <p>Output (HTML)</p>
    <div class="border border-black bg-background rounded min-h-20 w-full p-2">
      {{ htmlString }}
    </div>
  `,
})
export class ConvertToHtmlExample {
  initialContent = [
    {
      type: 'paragraph',
      content: [
        'Hello, ',
        {
          type: 'text',
          text: 'world!',
          styles: {
            bold: true,
          },
        },
      ],
    },
    //TODO: remove cast
  ] as any;
  editor!: BlockNoteEditor;

  htmlString = '';

  async onContentChange(data: Block[]) {
    this.htmlString = await this.editor.blocksToHTMLLossy();
  }

  async editorReady(editor: BlockNoteEditor) {
    this.editor = editor;
    this.htmlString = await this.editor.blocksToHTMLLossy();
  }
}

export const convertToHtmlExampleCode = `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Block, BlockNoteEditor } from '@blocknote/core';
import { BnaEditorComponent } from '@dytab/block-note-angular';

@Component({
  selector: 'bna-convert-to-html-example',
  standalone: true,
  imports: [CommonModule, BnaEditorComponent],
  template: \`
    <p>Input (BlockNote Editor)</p>
    <bna-editor
      [initialContent]="initialContent"
      (contentChanged)="onContentChange($event)"
      (onEditorReady)="editorReady($event)"
    />
    <p>Output (HTML)</p>
    <div class="border border-black bg-background rounded min-h-20 w-full p-2">
      {{ htmlString }}
    </div>
  \`,
})
export class ConvertToHtmlExample {
  initialContent = [
    {
      type: 'paragraph',
      content: [
        'Hello, ',
        {
          type: 'text',
          text: 'world!',
          styles: {
            bold: true,
          },
        },
      ],
    },
  ];
  editor!: BlockNoteEditor;

  htmlString  = '';

  async onContentChange(data: Block[]) {
    this.htmlString = await this.editor.blocksToHTMLLossy();
  }

  editorReady(editor: BlockNoteEditor) {
    this.editor = editor;
  }
}`;
