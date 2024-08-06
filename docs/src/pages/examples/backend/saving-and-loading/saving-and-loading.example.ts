import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BnaEditorComponent } from '@dytab/block-note-angular';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  Block, BlockNoteEditor,
  PartialBlock
} from '@blocknote/core';

@Component({
  selector: 'bna-saving-and-loading-example',
  standalone: true,
  imports: [CommonModule, BnaEditorComponent, HlmButtonDirective],
  template: `
    <bna-editor [initialContent]="initialContent" (contentChanged)="saveToStorage($event)" />
  `,
})
export class SavingAndLoadingExample implements OnInit {
  initialContent = this.loadFromStorage();

  ngOnInit(): void {
    BlockNoteEditor.create({ initialContent: this.initialContent });
  }

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
}

export const savingAndLoadingExampleCode = `import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BnaEditorComponent } from '@dytab/block-note-angular';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  Block, BlockNoteEditor,
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
export class SavingAndLoadingExample implements OnInit {
  initialContent = this.loadFromStorage();

  ngOnInit(): void {
    BlockNoteEditor.create({ initialContent: this.initialContent });
  }

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
