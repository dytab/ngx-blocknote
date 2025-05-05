import { Component } from '@angular/core';
import { HlmCardDirective } from '@spartan-ng/ui-card-helm';

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
  imports: [HlmCardDirective],
})
export class DemoBoxComponent {}
