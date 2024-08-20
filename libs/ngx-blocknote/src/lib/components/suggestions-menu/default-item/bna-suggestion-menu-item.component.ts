import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
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
import { SuggestionItem } from '../../../interfaces/suggestion-item.type';
import { BlockNoteAngularService } from '../../../services';
import { HlmButtonDirective, HlmIconComponent } from '../../../ui';

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
  selector: 'bna-suggestion-menu-item',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective, HlmIconComponent],
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
  templateUrl: './bna-suggestion-menu-item.component.html',
  styleUrl: './bna-suggestion-menu-item.component.css',
})
export class BnaSuggestionMenuItemComponent {
  suggestionItem = input.required<SuggestionItem>();
  iconName = computed(() => {
    const item = this.suggestionItem();
    if (!item) {
      return 'lucideLayoutPanelTop';
    }
    const icon = icons[item?.key];
    return icon ? icon : 'lucideLayoutPanelTop';
  });
  selected = input<boolean>(false);
  mouseEnter = output();

  constructor(private blockNoteAngularService: BlockNoteAngularService) {}

  onClick() {
    this.blockNoteAngularService.editor().suggestionMenus.clearQuery();
    this.suggestionItem().onItemClick();
    this.blockNoteAngularService.editor().suggestionMenus.closeMenu();
  }

  onMouseEnter() {
    this.mouseEnter.emit();
  }
}
