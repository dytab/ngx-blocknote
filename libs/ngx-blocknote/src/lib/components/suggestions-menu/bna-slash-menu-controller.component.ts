import { Component } from '@angular/core';
import { BnaSuggestionsMenuControllerComponent } from './bna-suggestions-menu-controller.component';

@Component({
  imports: [BnaSuggestionsMenuControllerComponent],
  selector: 'bna-slash-menu-controller',
  template: `<bna-suggestions-menu-controller triggerCharacter="/"
    ><ng-content
  /></bna-suggestions-menu-controller>`,
})
export class BnaSlashMenuControllerComponent {}
