import { Component } from '@angular/core';
import { BlockNoteEditor } from '@blocknote/core';
import { BnaEditorComponent } from '@dytab/ngx-blocknote';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'bna-manipulating-blocks-example',
  imports: [BnaEditorComponent, HlmButtonDirective],
  template: `
    <div class="flex gap-2">
      <button hlmBtn size="sm" type="button" (click)="insertFirstBlock()">
        Insert First Block
      </button>
      <button hlmBtn size="sm" type="button" (click)="updateFirstBlock()">
        Update First Block
      </button>
      <button hlmBtn size="sm" type="button" (click)="removeFirstBlock()">
        Remove First Block
      </button>
      <button hlmBtn size="sm" type="button" (click)="replaceFirstBlock()">
        Replace First Block
      </button>
    </div>
    <bna-editor
      [initialContent]="initialContent"
      (editorReady)="editorReady($event)"
    />
  `,
})
export class ManipulatingBlocksExample {
  initialContent = undefined;
  editor!: BlockNoteEditor;

  async editorReady(editor: BlockNoteEditor) {
    this.editor = editor;
  }

  insertFirstBlock() {
    this.editor.insertBlocks(
      [
        {
          content:
            'This block was inserted at ' + new Date().toLocaleTimeString(),
        },
      ],
      this.editor.document[0],
      'before',
    );
  }

  updateFirstBlock() {
    this.editor.updateBlock(this.editor.document[0], {
      content: 'This block was updated at ' + new Date().toLocaleTimeString(),
    });
  }

  removeFirstBlock() {
    this.editor.removeBlocks([this.editor.document[0]]);
  }

  replaceFirstBlock() {
    this.editor.replaceBlocks(
      [this.editor.document[0]],
      [
        {
          content:
            'This block was replaced at ' + new Date().toLocaleTimeString(),
        },
      ],
    );
  }
}

export const manipulatingBlocksExampleCode = `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BnaEditorComponent } from '@dytab/ngx-blocknote';
import { HlmButtonDirective } from '@dytab/ngx-blocknote';
import { BlockNoteEditor } from '@blocknote/core';

@Component({
  selector: 'bna-manipulating-blocks-example',
  standalone: true,
  imports: [CommonModule, BnaEditorComponent, HlmButtonDirective],
  template: \`
    <div class="flex gap-2">
      <button hlmBtn size="sm" type="button" (click)="insertFirstBlock()">Insert First Block</button>
      <button hlmBtn size="sm" type="button" (click)="updateFirstBlock()">Update First Block</button>
      <button hlmBtn size="sm" type="button" (click)="removeFirstBlock()">Remove First Block</button>
      <button hlmBtn size="sm" type="button" (click)="replaceFirstBlock()">Replace First Block</button>
    </div>
    <bna-editor [initialContent]="initialContent" (editorReady)="editorReady($event)" />
  \`,
})
export class ManipulatingBlocksExample{
  initialContent = undefined;
  editor!: BlockNoteEditor;

  async editorReady(editor: BlockNoteEditor) {
    this.editor = editor;
  }

  insertFirstBlock(){
    this.editor.insertBlocks(
      [
        {
          content:
            "This block was inserted at " +
            new Date().toLocaleTimeString(),
        },
      ],
      this.editor.document[0],
      "before"
    )
  }

  updateFirstBlock(){
    this.editor.updateBlock(this.editor.document[0], {
      content:
        "This block was updated at " + new Date().toLocaleTimeString(),
    })
  }

  removeFirstBlock(){
    this.editor.removeBlocks([this.editor.document[0]])
  }

  replaceFirstBlock(){
    this.editor.replaceBlocks(
      [this.editor.document[0]],
      [
        {
          content:
            "This block was replaced at " +
            new Date().toLocaleTimeString(),
        },
      ]
    )
  }
}`;
