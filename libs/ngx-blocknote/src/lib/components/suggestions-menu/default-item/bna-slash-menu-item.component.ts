import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideFileAudio,
  lucideHeading1,
  lucideHeading2,
  lucideHeading3,
  lucideImage,
  lucideLayoutPanelTop,
  lucideList,
  lucideListChecks,
  lucideListOrdered,
  lucidePilcrow,
  lucideSmile,
  lucideTable,
  lucideVideo,
} from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { SuggestionItem } from '../../../interfaces/suggestion-item.type';
import { NgxBlocknoteService } from '../../../services';

const icons: Record<string, string> = {
  heading: 'lucideHeading1',
  heading_2: 'lucideHeading2',
  heading_3: 'lucideHeading3',
  check_list: 'lucideListChecks',
  numbered_list: 'lucideListOrdered',
  bullet_list: 'lucideList',
  paragraph: 'lucidePilcrow',
  image: 'lucideImage',
  video: 'lucideVideo',
  audio: 'lucideFileAudio',
  table: 'lucideTable',
  emoji: 'lucideSmile',
};

@Component({
  selector: 'bna-slash-menu-item',
  imports: [CommonModule, HlmButtonDirective, NgIcon, HlmIconDirective],
  providers: [
    provideIcons({
      lucideHeading1,
      lucideHeading2,
      lucideHeading3,
      lucideList,
      lucideLayoutPanelTop,
      lucideListChecks,
      lucideTable,
      lucideSmile,
      lucidePilcrow,
      lucideImage,
      lucideFileAudio,
      lucideVideo,
      lucideListOrdered,
    }),
  ],
  templateUrl: './bna-slash-menu-item.component.html',
  styleUrl: './bna-slash-menu-item.component.css',
})
export class BnaSlashMenuItemComponent {
  suggestionItem = input.required<SuggestionItem>();
  iconName = computed(() => {
    const item = this.suggestionItem();
    if (!item) {
      return 'lucideLayoutPanelTop';
    }
    const icon = icons[item.key];
    return icon ? icon : 'lucideLayoutPanelTop';
  });
  selected = input<boolean>(false);
  mouseEnter = output();

  constructor(private ngxBlockNoteService: NgxBlocknoteService) {}

  onClick($event: Event) {
    $event.preventDefault();
    const editor = this.ngxBlockNoteService.editor();
    editor.suggestionMenus.clearQuery();
    this.suggestionItem().onItemClick();
    editor.suggestionMenus.closeMenu();
    editor.focus();
  }

  onMouseEnter() {
    this.mouseEnter.emit();
  }
}
