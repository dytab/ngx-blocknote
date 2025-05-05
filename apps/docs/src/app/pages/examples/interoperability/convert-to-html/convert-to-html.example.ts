import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Block, BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { BnaEditorComponent } from '@dytab/ngx-blocknote';

@Component({
  selector: 'bna-convert-to-html-example',
  imports: [CommonModule, BnaEditorComponent],
  template: `
    <p>Input (BlockNote Editor)</p>
    <bna-editor
      class="h-[250px] block"
      [initialContent]="initialContent"
      (contentChanged)="onContentChange($event)"
      (editorReady)="editorReady($event)"
    />
    <p>Output (HTML)</p>
    <div class="border border-black bg-background rounded min-h-20 w-full p-2">
      {{ htmlString }}
    </div>
  `,
})
export class ConvertToHtmlExample {
  initialContent: PartialBlock[] = [
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

  htmlString = '';

  async onContentChange(blocks: Block[]) {
    this.htmlString = await this.editor.blocksToHTMLLossy();
  }

  async editorReady(editor: BlockNoteEditor) {
    this.editor = editor;
    this.htmlString = await this.editor.blocksToHTMLLossy();
  }
}

export const convertToHtmlExampleCode = `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Block, BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { BnaEditorComponent } from '@dytab/ngx-blocknote';

@Component({
  selector: 'bna-convert-to-html-example',
  standalone: true,
  imports: [CommonModule, BnaEditorComponent],
  template: \`
    <p>Input (BlockNote Editor)</p>
    <bna-editor
      class="h-[250px] block"
      [initialContent]="initialContent"
      (contentChanged)="onContentChange($event)"
      (editorReady)="editorReady($event)"
    />
    <p>Output (HTML)</p>
    <div class="border border-black bg-background rounded min-h-20 w-full p-2">
      {{ htmlString }}
    </div>
  \`,
})
export class ConvertToHtmlExample {
  initialContent: PartialBlock[] = [
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

  htmlString = '';

  async onContentChange(blocks: Block[]) {
    this.htmlString = await this.editor.blocksToHTMLLossy();
  }

  async editorReady(editor: BlockNoteEditor) {
    this.editor = editor;
    this.htmlString = await this.editor.blocksToHTMLLossy();
  }
}`;
