import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Block } from '@blocknote/core';
import { BnaEditorComponent } from '@dytab/block-note-angular';

@Component({
  selector: 'bna-basic-setup-example',
  standalone: true,
  imports: [CommonModule, BnaEditorComponent],
  templateUrl: 'basic-setup.example.html',
})
export class BasicSetupExample {
  editorContent!: Block[];

  readTextFromEditor(blocks: Block[]) {
    this.editorContent = blocks;
  }
}

export const basicSetupExampleCode = `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BnaEditorComponent } from '@dytab/block-note-angular';

@Component({
  standalone: true,
  imports: [CommonModule, BnaEditorComponent],
  template: \` <bna-editor (contentChanged)="readTextFromEditor($event)" /> \`,
})
export class BasicSetupExample {
  editorContent!: Block[];

  readTextFromEditor(blocks: Block[]) {
    this.editorContent = blocks;
  }
}`;
