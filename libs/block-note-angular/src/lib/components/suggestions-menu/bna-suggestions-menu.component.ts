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
import { BlockNoteAngularService } from '../../services';
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
    this.blockNoteAngularService.editor().suggestionMenus.closeMenu();
    this.blockNoteAngularService.editor().suggestionMenus.clearQuery();
    this.filteredSlashMenuItems[this.selectedIndex].onItemClick();
    this.selectedIndex = 0;
  }

  constructor(private blockNoteAngularService: BlockNoteAngularService) {
    effect(() => {
      this.filteredSlashMenuItems = filterSuggestionItems(
        this.getSlashMenuItems(),
        this.query()
      );
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['triggerCharacter']) {
      //remove old update listener before adding new on change
      this.cleanUpFn();
      this.cleanUpFn = this.blockNoteAngularService
        .editor()
        .suggestionMenus.onUpdate(this.triggerCharacter, (state) => {
          if (this.query() !== state.query) {
            this.query.set(state.query);
            this.selectedIndex = 0;
          }
          if (this.isShown() !== state.show) {
            this.isShown.set(state.show);
          }
        });
    }
  }

  getSlashMenuItems(): (Omit<DefaultSuggestionItem, 'key'> & {
    key: string;
  })[] {
    const editor = this.blockNoteAngularService.editor();
    if (!editor) {
      return [];
    }
    const slashMenuItems =
      this.blockNoteAngularService.options().suggestionItems;
    if (slashMenuItems) {
      const customSlashMenuItem = slashMenuItems.map((a) =>
        a(this.blockNoteAngularService.editor())
      );
      return [...customSlashMenuItem] as any;
    }

    return [...getDefaultSlashMenuItems(editor)];
  }
}
