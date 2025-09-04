import {
  Component,
  computed,
  HostListener,
  inject,
  linkedSignal,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  DefaultSuggestionItem,
  filterSuggestionItems,
  getDefaultSlashMenuItems,
} from '@blocknote/core';
import { NgxBlocknoteService } from '../../services';
import { BnaSlashMenuItemComponent } from './default-item/bna-slash-menu-item.component';

@Component({
  selector: 'bna-slash-menu',
  imports: [BnaSlashMenuItemComponent],
  templateUrl: './bna-slash-menu.component.html',
})
export class BnaSlashMenuComponent implements OnInit, OnDestroy {
  private ngxBlockNoteService = inject(NgxBlocknoteService);

  dict = computed(() => {
    return this.ngxBlockNoteService.editor()?.dictionary;
  });

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const menuShown = this.isShown();
    if (!menuShown) {
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const newSelectedIndex = this.selectedIndex - 1;
      if (newSelectedIndex < 0) {
        this.selectedIndex = this.filteredSlashMenuItems().length - 1;
      } else {
        this.selectedIndex = newSelectedIndex;
      }
      return;
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      const newSelectedIndex = this.selectedIndex + 1;
      if (newSelectedIndex > this.filteredSlashMenuItems().length - 1) {
        this.selectedIndex = 0;
      } else {
        this.selectedIndex = newSelectedIndex;
      }
      return;
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.ngxBlockNoteService.editor()?.suggestionMenus.closeMenu();
      return;
    }
  }

  cleanUpListeners: (() => any)[] = [];

  selectedIndex = 0;
  triggerCharacter = '/';
  query = signal('');
  isShown = signal(false);
  filteredSlashMenuItems = linkedSignal(() =>
    filterSuggestionItems(this.getSlashMenuItems(), this.query()),
  );

  insertSelectedBlock() {
    const editor = this.ngxBlockNoteService.editor();
    const item = this.filteredSlashMenuItems()[this.selectedIndex];
    editor?.suggestionMenus.closeMenu();
    editor?.suggestionMenus.clearQuery();
    item.onItemClick();
    this.selectedIndex = 0;
  }

  ngOnInit() {
    const cleanUpFn = this.ngxBlockNoteService
      .editor()
      ?.suggestionMenus.onUpdate(this.triggerCharacter, (state) => {
        if (this.query() !== state.query) {
          this.query.set(state.query);
          this.selectedIndex = 0;
        }
        if (this.isShown() !== state.show) {
          this.selectedIndex = 0;
          this.isShown.set(state.show);
        }
      });
    this.addCaptureEventForEnter();
    if (cleanUpFn) {
      this.cleanUpListeners.push(cleanUpFn);
    }
  }

  ngOnDestroy() {
    this.cleanUpListeners.forEach((fn) => fn());
  }

  private addCaptureEventForEnter() {
    const keyboardEventListener = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        this.handleEnter(event);
      }
    };
    this.cleanUpListeners.push(() => {
      document.removeEventListener('keydown', keyboardEventListener, {
        capture: true,
      });
    });

    document.addEventListener('keydown', keyboardEventListener, {
      capture: true,
    });
  }

  private handleEnter(event: KeyboardEvent) {
    const isMenuShown = this.isShown();
    if (!isMenuShown) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.insertSelectedBlock();
  }

  private getSlashMenuItems(): (Omit<DefaultSuggestionItem, 'key'> & {
    key: string;
  })[] {
    const editor = this.ngxBlockNoteService.editor();
    if (!editor) {
      return [];
    }
    const getItems = this.ngxBlockNoteService.options().getSuggestionItems;
    if (getItems) {
      return [...getItems(editor)];
    }

    return [...getDefaultSlashMenuItems(editor)];
  }
}
