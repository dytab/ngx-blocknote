import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Block, BlockNoteEditor } from '@blocknote/core';
import { BnaEditorComponent } from '@dytab/block-note-angular';

@Component({
  selector: 'bna-blocks-json-example',
  standalone: true,
  imports: [CommonModule, BnaEditorComponent],
  template: `
    <p>Input (BlockNote Editor)</p>
    <bna-editor
      [initialContent]="initialContent"
      (contentChanged)="onContentChange($event)"
      (onEditorReady)="editorReady($event)"
    />
    <p>Output (JSON)</p>
    <div
      class="border border-black bg-background rounded min-h-20 w-full p-2 max-h-[400px] overflow-auto"
    >
      <pre><code>{{ content }}</code></pre>
    </div>
  `,
})
export class BlocksJsonExample {
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

  content = '';

  onContentChange(data: Block[]) {
    this.content = JSON.stringify(data, null, 2);
  }

  async editorReady(editor: BlockNoteEditor) {
    this.editor = editor;
    // this.content = await this.editor.bl();
  }
}

export const blocksJsonExampleCode = `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BnaEditorComponent } from '@dytab/block-note-angular';

@Component({
  standalone: true,
  imports: [CommonModule, BnaEditorComponent],
  template: \` <bna-editor [initialContent]="initialContent" /> \`,
})
export class BasicSetupExample {
  initialContent = undefined;
}`;
