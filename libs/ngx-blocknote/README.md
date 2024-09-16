# ngx-blocknote

This project is an Angular implementation of [BlockNote](https://github.com/TypeCellOS/BlockNote). It aims to provide the same functionality and appearance as the original React project but with the added benefit of being fully integrated into the Angular framework.

## Installation

```bash
npm install @dytab/ngx-blocknote
```

## Basic Setup

```typescript
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BnaEditorComponent } from '@dytab/ngx-blocknote';

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

For more examples and detailed guides, please visit the [documentation website](https://dytab.github.io/ngx-blocknote/).

## Features

| Blocks       | Status |
| ------------ | ------ |
| Headings     | ✅     |
| Basic Blocks | ✅     |
| Table        | ✅     |
| Media        | ✅     |
| Emojis       | ❌     |

| Formatting Toolbar | Status |
| ------------------ | ------ |
| Block Type Select  | ✅     |
| Bold               | ✅     |
| Italic             | ✅     |
| Unterline          | ✅     |
| Strikethrough      | ✅     |
| Align text left    | ✅️    |
| Align text center  | ✅     |
| Align text right   | ✅️    |
| Text Colors        | ✅️    |
| Nest Block         | ❌     |
| Unnest Block       | ❌️    |
| Create Link        | ✅️    |

## License

This project is distributed under the terms of the [MIT License](LICENSE.md).
