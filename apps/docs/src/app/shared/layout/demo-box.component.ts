import { Component } from '@angular/core';
import { HlmCard } from '@spartan-ng/helm/card';

@Component({
  selector: 'bna-demo-box',
  host: {
    class: 'preview flex w-full justify-center items-center',
  },
  template: ` <div
    hlmCard
    class="h-[600px] overflow-auto h-full w-full py-10 px-4"
  >
    <ng-content></ng-content>
  </div>`,
  imports: [HlmCard],
})
export class DemoBoxComponent {}
