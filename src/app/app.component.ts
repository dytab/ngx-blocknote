import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomAlertBlockExampleComponent } from '../examples/custom-alert-block/custom-alert-block-example.component';
import { TestHostBlockNodeEditorComponent } from '../ui/block-note-editor/_usage/test-host.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterModule,
    TestHostBlockNodeEditorComponent,
    CustomAlertBlockExampleComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dytab';
}
