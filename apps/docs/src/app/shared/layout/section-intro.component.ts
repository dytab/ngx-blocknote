import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { hlmH1, hlmLead } from '@spartan-ng/helm/typography';

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
export class SectionIntroComponent implements OnChanges {
  @Input()
  name = '';
  @Input()
  lead = '';
  protected readonly hlmLead = hlmLead;
  protected readonly hlmH1 = hlmH1;

  constructor(private title: Title) {}

  ngOnChanges(changes: SimpleChanges) {
    this.title.setTitle(this.name);
  }
}
