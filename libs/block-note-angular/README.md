# BlockNote – Unofficial Angular Wrapper 

This project is an Angular implementation of [BlockNote](https://github.com/TypeCellOS/BlockNote). It aims to provide the same functionality and appearance as the original React project but with the added benefit of being fully integrated into the Angular framework.

## Installation
```bash
npm install @dytab/block-note-angular
```

## Basic Setup
```typescript
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BnaEditorComponent } from '@dytab/block-note-angular';

@Component({
  standalone: true,
  imports: [CommonModule, BnaEditorComponent],
  template: ` <bna-editor (contentChanged)="readTextFromEditor($event)" /> `,
})
export class BasicSetupExample {
  editorContent!: Block[];

  readTextFromEditor(blocks: Block[]) {
    this.editorContent = blocks;
  }
}
```

## Further Examples
For more examples and detailed guides, please visit the [documentation website](https://dytab.github.io/BlockNoteAngular).

## License

This project is licensed under the [MIT License](LICENSE.md).
