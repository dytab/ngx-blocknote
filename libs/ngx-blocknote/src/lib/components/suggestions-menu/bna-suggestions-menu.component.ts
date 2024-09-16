import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  HostListener,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import {
  DefaultSuggestionItem,
  filterSuggestionItems,
  getDefaultSlashMenuItems,
} from '@blocknote/core';
import { SuggestionItem } from '../../interfaces/suggestion-item.type';
import { NgxBlocknoteService } from '../../services';
import { BnaSuggestionMenuItemComponent } from './default-item/bna-suggestion-menu-item.component';

@Component({
  selector: 'bna-suggestions-menu',
  standalone: true,
  imports: [CommonModule, BnaSuggestionMenuItemComponent],
  templateUrl: './bna-suggestions-menu.component.html',
  styleUrl: './bna-suggestions-menu.component.css',
})
export class BnaSuggestionsMenuComponent implements OnChanges {
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
        this.selectedIndex = this.filteredSlashMenuItems.length - 1;
      } else {
        this.selectedIndex = newSelectedIndex;
      }
      return;
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      const newSelectedIndex = this.selectedIndex + 1;
      if (newSelectedIndex > this.filteredSlashMenuItems.length - 1) {
        this.selectedIndex = 0;
      } else {
        this.selectedIndex = newSelectedIndex;
      }
      return;
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.insertSelectedBlock();
      return;
    }
  }
  selectedIndex = 0;
  @Input({ required: true }) triggerCharacter = '/';
  query = signal('');
  isShown = signal(false);
  filteredSlashMenuItems: SuggestionItem[] = [];
  cleanUpFn = () => {
    return;
  };

  insertSelectedBlock() {
    const editor = this.ngxBlockNoteService.editor();
    editor.suggestionMenus.closeMenu();
    editor.suggestionMenus.clearQuery();
    this.filteredSlashMenuItems[this.selectedIndex].onItemClick();
    this.selectedIndex = 0;
  }

  constructor(private ngxBlockNoteService: NgxBlocknoteService) {
    effect(() => {
      this.filteredSlashMenuItems = filterSuggestionItems(
        this.getSlashMenuItems(),
        this.query(),
      );
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['triggerCharacter']) {
      //remove old update listener before adding new on change
      this.cleanUpFn();
      this.cleanUpFn = this.ngxBlockNoteService
        .editor()
        .suggestionMenus.onUpdate(this.triggerCharacter, (state) => {
          if (this.query() !== state.query) {
            this.query.set(state.query);
            this.selectedIndex = 0;
          }
          if (this.isShown() !== state.show) {
            this.selectedIndex = 0;
            this.isShown.set(state.show);
          }
        });
    }
  }

  getSlashMenuItems(): (Omit<DefaultSuggestionItem, 'key'> & {
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
