import { Component } from '@angular/core';
import { HlmCardDirective } from '@spartan-ng/ui-card-helm';

@Component({
  selector: 'bna-demo-box',
  standalone: true,
  host: {
    class:
      'h-[650px] preview flex min-h-[350px] w-full justify-center items-center',
  },
  template: ` <div hlmCard class="h-full w-full demo py-10 px-4">
    <div class="rounded h-full demo"><ng-content></ng-content></div>
  </div>`,
  imports: [HlmCardDirective],
})
export class DemoBoxComponent {}
