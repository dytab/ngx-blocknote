import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bna-add-file-button',
  template: `
    <button
      type="button"
      class="bn-add-file-button"
      (mousedown)="onMouseDown($event)"
      (click)="onClick()"
    >
      <div class="bn-add-file-button-icon">
        <ng-container *ngIf="buttonIcon; else defaultIcon">
          <ng-container *ngTemplateOutlet="buttonIcon"></ng-container>
        </ng-container>
        <ng-template #defaultIcon>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
            ></path>
            <polyline points="13,2 13,9 20,9"></polyline>
          </svg>
        </ng-template>
      </div>
      <div class="bn-add-file-button-text">
        {{ buttonText || defaultButtonText }}
      </div>
    </button>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class BnaAddFileButtonComponent {
  @Input() editor!: any; // Simplified type to avoid import conflicts
  @Input() block!: any; // FileBlockConfig block
  @Input() buttonText?: string;
  @Input() buttonIcon?: TemplateRef<any>;

  defaultButtonText = 'Add File'; // Fallback until i18n is implemented

  onMouseDown(event: MouseEvent): void {
    // Prevents focus from moving to the button
    event.preventDefault();
  }

  onClick(): void {
    // Opens the file toolbar/panel
    if (this.editor.filePanel) {
      this.editor.transact((tr: any) =>
        tr.setMeta(this.editor.filePanel!.plugins[0], {
          block: this.block,
        }),
      );
    }
  }
}
