import { Component, Input } from '@angular/core';
import { hlmH1, hlmLead } from '@spartan-ng/ui-typography-helm';

@Component({
  selector: 'bna-section-intro',
  standalone: true,
  host: {
    class: 'mb-8 block',
  },
  template: `
    <h1 class="{{ hlmH1 }}">{{ name }}</h1>
    <p class="{{ hlmLead }}">{{ lead }}</p>
    <div class="mt-6"><ng-content></ng-content></div>
  `,
})
export class SectionIntroComponent {
  @Input()
  name = '';
  @Input()
  lead = '';
  protected readonly hlmLead = hlmLead;
  protected readonly hlmH1 = hlmH1;
}
