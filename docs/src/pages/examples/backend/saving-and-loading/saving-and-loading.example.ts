import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Block, PartialBlock } from '@blocknote/core';
import {
  BnaEditorComponent,
} from '@dytab/block-note-angular';
import {
  HlmButtonDirective,
} from '@dytab/ui';

@Component({
  selector: 'bna-saving-and-loading-example',
  standalone: true,
  imports: [CommonModule, BnaEditorComponent, HlmButtonDirective],
  template: `
    <bna-editor
      [initialContent]="initialContent"
      (contentChanged)="saveToStorage($event)"
    />
  `,
})
export class SavingAndLoadingExample {
  initialContent = this.loadFromStorage();

  saveToStorage(jsonBlocks: Block[]) {
    // Save contents to local storage. You might want to debounce this or replace
    // with a call to your API / database.
    localStorage.setItem('editorContent', JSON.stringify(jsonBlocks));
  }

  private loadFromStorage() {
    // Gets the previously stored editor contents.
    const storageString = localStorage.getItem('editorContent');
    return storageString
      ? (JSON.parse(storageString) as PartialBlock[])
      : undefined;
  }
}

export const savingAndLoadingExampleCode = `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BnaEditorComponent } from '@dytab/block-note-angular';
import { HlmButtonDirective } from '@dytab/block-note-angular';
import {
  Block,
  PartialBlock
} from '@blocknote/core';

@Component({
  selector: 'bna-saving-and-loading-example',
  standalone: true,
  imports: [CommonModule, BnaEditorComponent, HlmButtonDirective],
  template: \`
    <bna-editor [initialContent]="initialContent" (contentChanged)="saveToStorage($event)" />
  \`,
})
export class SavingAndLoadingExample {
  initialContent = this.loadFromStorage();

  saveToStorage(jsonBlocks: Block[]) {
    // Save contents to local storage. You might want to debounce this or replace
    // with a call to your API / database.
    localStorage.setItem("editorContent", JSON.stringify(jsonBlocks));
  }

  private loadFromStorage() {
    // Gets the previously stored editor contents.
    const storageString = localStorage.getItem("editorContent");
    return storageString
      ? (JSON.parse(storageString) as PartialBlock[])
      : undefined;
  }
}`;
