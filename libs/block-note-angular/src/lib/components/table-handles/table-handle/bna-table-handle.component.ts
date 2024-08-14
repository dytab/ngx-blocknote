import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import {
  HlmButtonDirective,
  HlmIconComponent,
} from '@dytab/block-note-angular';
import { provideIcons } from '@ng-icons/core';
import { lucideGripHorizontal, lucideGripVertical } from '@ng-icons/lucide';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';

const icons = {
  row: 'lucideGripVertical',
  column: 'lucideGripHorizontal',
} as const;

@Component({
  selector: 'bna-table-handle',
  standalone: true,
  imports: [
    CommonModule,
    HlmButtonDirective,
    HlmIconComponent,
    BrnMenuTriggerDirective,
  ],
  templateUrl: './bna-table-handle.component.html',
  styleUrl: './bna-table-handle.component.css',
  providers: [provideIcons({ lucideGripVertical, lucideGripHorizontal })],
})
export class BnaTableHandleComponent {
  orientation = input.required<'row' | 'column'>();
  index = input.required<number>();
  icon = computed(() => {
    return icons[this.orientation()];
  });
}
