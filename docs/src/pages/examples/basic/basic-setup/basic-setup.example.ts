import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BnaEditorComponent } from '@dytab/block-note-angular';

@Component({
  selector: 'bna-basic-setup-example',
  standalone: true,
  imports: [CommonModule, BnaEditorComponent],
  template: ` <bna-editor [initialContent]="initialContent" /> `,
})
export class BasicSetupExample {
  initialContent = undefined;
}

export const basicSetupExampleCode = `import { CommonModule } from '@angular/common';
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
