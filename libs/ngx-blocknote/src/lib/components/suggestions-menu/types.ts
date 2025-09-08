import { DefaultSuggestionItem } from '@blocknote/core';
import { TemplateRef } from '@angular/core';

/**
 * Although any arbitrary data can be passed as suggestion items, the built-in
 * UI components expect a shape that conforms to DefaultSuggestionItem
 */
export interface DefaultAngularSuggestionItem extends Omit<DefaultSuggestionItem, 'key'> {
  icon?: TemplateRef<any> | string; // Can be template ref or SVG string
  size?: 'default' | 'small';
}

/**
 * Props passed to a suggestion menu component
 */
export interface SuggestionMenuProps<T> {
  items: T[];
  loadingState: 'loading-initial' | 'loading' | 'loaded';
  selectedIndex: number | undefined;
  onItemClick?: (item: T) => void;
}
