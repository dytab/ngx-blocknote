import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import {
  DefaultSuggestionItem,
  filterSuggestionItems,
  getDefaultSlashMenuItems,
} from '@blocknote/core';
import { SlashMenuItemsGroups } from '../../interfaces/slash-menu-items-group.type';
import { BlockNoteAngularService } from '../../services';
import { BnaSuggestionMenuItemComponent } from './default-item/bna-suggestion-menu-item.component';
import { getGroupedSlashMenuItems } from './get-grouped-slash-menu-items.util';

@Component({
  selector: 'bna-suggestions-menu',
  standalone: true,
  imports: [CommonModule, BnaSuggestionMenuItemComponent],
  templateUrl: './bna-suggestions-menu.component.html',
  styleUrl: './bna-suggestions-menu.component.css',
})
export class BnaSuggestionsMenuComponent {
  //TODO: add search
  query = signal('');
  filteredSlashMenuItemGroups: SlashMenuItemsGroups = [];

  constructor(private blockNoteAngularService: BlockNoteAngularService) {
    effect(() => {
      this.filteredSlashMenuItemGroups = getGroupedSlashMenuItems(
        filterSuggestionItems(this.getSlashMenuItems(), this.query())
      );
    });
  }

  getSlashMenuItems(): (Omit<DefaultSuggestionItem, 'key'> & {
    key: string;
  })[] {
    const editor = this.blockNoteAngularService.editor();
    if (!editor) {
      return [];
    }
    const slashMenuItems =
      this.blockNoteAngularService.options().inputSlashMenuItems;
    if (slashMenuItems) {
      const customSlashMenuItem = slashMenuItems.map((a) =>
        a(this.blockNoteAngularService.editor())
      );
      return [
        ...getDefaultSlashMenuItems(editor),
        ...customSlashMenuItem,
        //TODO: remove casting
      ] as any;
    }

    return [...getDefaultSlashMenuItems(editor)];
  }
}
