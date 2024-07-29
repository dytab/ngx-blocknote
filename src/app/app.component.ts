import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TestHostBlockNodeEditorComponent } from '../ui/block-note-editor/_usage/test-host.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import {
  CustomBlockExampleComponent
} from '../examples/custom-blocks/custom-block-example.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, TestHostBlockNodeEditorComponent, CustomBlockExampleComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dytab';
}
