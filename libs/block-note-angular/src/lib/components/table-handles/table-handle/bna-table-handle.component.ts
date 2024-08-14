import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import {
  HlmButtonDirective,
  HlmIconComponent,
} from '@dytab/block-note-angular';
import { computePosition, flip } from '@floating-ui/dom';
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
export class BnaTableHandleComponent implements AfterViewInit {
  orientation = input.required<'row' | 'column'>();
  index = input.required<number>();
  icon = computed(() => {
    return icons[this.orientation()];
  });
  styles = signal<Record<string, string>>({});

  button = viewChild<ElementRef<HTMLElement>>('button');
  menu = viewChild<ElementRef<HTMLElement>>('menu');

  isMenuOpened = false;

  async ngAfterViewInit() {
    const result = await computePosition(
      this.button()!.nativeElement,
      this.menu()!.nativeElement,
      {
        placement: 'right',
        strategy: 'absolute',
        middleware: [flip()],
      }
    );
    console.log(result);
    this.styles.set(this.getStyles(result.y, result.x));
  }

  getStyles(x: number, y: number) {
    return { top: y + 'px', left: x + 'px' } as const;
  }

  openMenu() {
    this.isMenuOpened = true;
  }
}
