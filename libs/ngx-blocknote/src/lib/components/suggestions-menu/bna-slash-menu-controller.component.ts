import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BnaSuggestionsMenuControllerComponent } from './bna-suggestions-menu-controller.component';

@Component({
  imports: [CommonModule, BnaSuggestionsMenuControllerComponent],
  selector: 'bna-slash-menu-controller',
  standalone: true,
  template: `<bna-suggestions-menu-controller triggerCharacter="/"
    ><ng-content></ng-content
  ></bna-suggestions-menu-controller>`,
})
export class BnaSlashMenuControllerComponent {}
