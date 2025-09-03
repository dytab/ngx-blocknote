import { DefaultGridSuggestionItem } from '@blocknote/core';
import { TemplateRef } from '@angular/core';
import { SuggestionMenuProps } from '../types';

export interface DefaultAngularGridSuggestionItem extends DefaultGridSuggestionItem {
  icon?: TemplateRef<any> | string; // Can be template ref or SVG string
}

export interface GridSuggestionMenuProps<T> extends SuggestionMenuProps<T> {
  columns: number;
}
