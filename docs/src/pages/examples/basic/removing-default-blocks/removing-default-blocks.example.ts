import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BnaEditorComponent } from '@dytab/block-note-angular';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BlockSpecs, defaultBlockSpecs } from '@blocknote/core';

@Component({
  selector: 'bna-removing-default-blocks-example',
  standalone: true,
  imports: [CommonModule, BnaEditorComponent, HlmButtonDirective],
  template: `
    <bna-editor [initialContent]="initialContent" [blockSpecs]="blockSpecs" />
  `,
})
export class RemovingDefaultBlocksExample{
  initialContent = undefined;

  blockSpecs: BlockSpecs = {
    ...defaultBlockSpecs,
    audio: undefined as never,
    image: undefined as never,
  };
}

export const removingDefaultBlocksExampleCode = `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BnaEditorComponent } from '@dytab/block-note-angular';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
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
    <bna-editor [initialContent]="initialContent" (onEditorReady)="editorReady($event)" />
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
