import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bna-link-with-caption',
  template: `
    <div>
      <ng-content></ng-content>
      <p>{{ caption }}</p>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class BnaLinkWithCaptionComponent {
  @Input() caption!: string;
}
