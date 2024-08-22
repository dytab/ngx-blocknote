import { Directive } from '@angular/core';

@Directive({
  selector: '[bnaCodePreview]',
  standalone: true,
  host: {
    class: '',
  },
})
export class CodePreviewDirective {}
