import { DefaultSuggestionItem } from '@blocknote/core';
import { SlashMenuItemsGroups } from '../../interfaces/slash-menu-items-group.type';

export function getGroupedSlashMenuItems(
  items: (Omit<DefaultSuggestionItem, 'key'> & { key: string })[]
): SlashMenuItemsGroups {
  const slashMenuItemsGroups: SlashMenuItemsGroups = [];

  for (const item of items) {
    const groupIndex = slashMenuItemsGroups.findIndex(
      (group) => group.label === item.group
    );
    if (groupIndex !== -1) {
      // Group exists, push this item into it.
      slashMenuItemsGroups[groupIndex].items.push(item);
    } else {
      //TODO: check if group was not found
      slashMenuItemsGroups.push({
        label: item.group as string,
        items: [item],
      });
    }
  }

  return slashMenuItemsGroups;
}
