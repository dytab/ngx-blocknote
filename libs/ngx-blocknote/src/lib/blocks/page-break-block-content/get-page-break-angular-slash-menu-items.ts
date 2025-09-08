import {
  BlockNoteEditor,
  BlockSchema,
  getPageBreakSlashMenuItems,
  InlineContentSchema,
  StyleSchema,
} from '@blocknote/core';
import { DefaultAngularSuggestionItem } from '../../components/suggestions-menu/types';

// Page break icon SVG
const pageBreakIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 12h18m-9-9v18"/>
  <path d="M8 8l-4 4 4 4M16 8l4 4-4 4"/>
</svg>`;

const icons: Record<string, string> = {
  page_break: pageBreakIcon,
};

export function getPageBreakAngularSlashMenuItems<
  BSchema extends BlockSchema,
  I extends InlineContentSchema,
  S extends StyleSchema,
>(
  editor: BlockNoteEditor<BSchema, I, S>,
): (Omit<DefaultAngularSuggestionItem, 'key'> & { key: 'page_break' })[] {
  return getPageBreakSlashMenuItems(editor).map((item) => {
    const iconSvg = icons[item.key];
    return {
      ...item,
      icon: iconSvg,
    };
  });
}
