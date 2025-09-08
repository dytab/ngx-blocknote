import { Component, Input } from '@angular/core';

@Component({
  selector: 'bna-file-name-with-icon',
  template: `
    <div
      class="bn-file-name-with-icon"
      contentEditable="false"
      draggable="false"
    >
      <div class="bn-file-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
          <polyline points="13,2 13,9 20,9"></polyline>
        </svg>
      </div>
      <p class="bn-file-name">{{ block?.props?.name }}</p>
    </div>
  `,
  standalone: true,
  imports: []
})
export class BnaFileNameWithIconComponent {
  @Input() block!: any; // FileBlockConfig block
}
