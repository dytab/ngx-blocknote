import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BnaEditorComponent } from '@dytab/block-note-angular';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  standalone: true,
  imports: [CommonModule, BnaEditorComponent, HlmButtonDirective],
  templateUrl: './basic-minimal.page.html',
  styleUrl: './basic-minimal.page.css',
})
export class BasicMinimalPage {
  initialContent = undefined;
}
