import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  input,
  signal,
  viewChild,
} from '@angular/core';

import { computePosition, flip } from '@floating-ui/dom';
import { provideIcons } from '@ng-icons/core';
import { lucideGripHorizontal, lucideGripVertical } from '@ng-icons/lucide';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { TableHandleOptions } from '../../../interfaces/table-handle-options.type';
import { NgxBlocknoteService } from '../../../services';
import { HlmButtonDirective, HlmIconComponent } from '../../../ui';
import { BnaTableHandleMenuComponent } from '../table-handle-menu/bna-table-handle-menu.component';

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
    BnaTableHandleMenuComponent,
  ],
  templateUrl: './bna-table-handle.component.html',
  styleUrl: './bna-table-handle.component.css',
  providers: [provideIcons({ lucideGripVertical, lucideGripHorizontal })],
})
export class BnaTableHandleComponent {
  options = input.required<TableHandleOptions>();
  optionsWithCloseMenu = computed(() => {
    const options: TableHandleOptions = {
      ...this.options(),
      closeMenu: () => {
        console.log('close menu');
        this.closeMenu();
      },
    };
    return options;
  });
  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent) {
    const menu = this.menu()?.nativeElement;
    if (!menu || !event.target) {
      return;
    }
    const target = event.target as HTMLElement;
    if (this.isMenuOpened) {
      const clickedInside = menu.contains(target);
      if (!clickedInside) {
        this.isMenuOpened = false;
        this.options().showOtherHandle();
        this.ngxBlockNoteService.editor().tableHandles!.unfreezeHandles();
      }
    }
  }
  icon = computed(() => {
    return icons[this.options().orientation];
  });
  styles = signal<Record<string, string>>({});

  button = viewChild<ElementRef<HTMLElement>>('button');
  menu = viewChild<ElementRef<HTMLElement>>('menu');

  constructor(private ngxBlockNoteService: NgxBlocknoteService) {
    effect(async () => {
      const button = this.button()?.nativeElement;
      const menu = this.menu()?.nativeElement;
      if (!menu || !button) {
        return;
      }
      const result = await computePosition(button, menu, {
        placement: this.options().orientation === 'row' ? 'top' : 'left',
        strategy: 'absolute',
        middleware: [flip()],
      });
      this.styles.set(this.getStyles(result.y, result.x));
    });
  }

  isMenuOpened = false;

  getStyles(x: number, y: number) {
    return { top: y + 'px', left: x + 'px' } as const;
  }

  closeMenu() {
    this.isMenuOpened = false;
  }

  openMenu(event: MouseEvent) {
    event.stopPropagation();
    const tableHandles = this.ngxBlockNoteService.editor().tableHandles;
    if (!tableHandles) {
      return;
    }
    tableHandles.freezeHandles();
    //hide other xyz
    this.options().hideOtherHandle();
    this.isMenuOpened = true;
  }
}
