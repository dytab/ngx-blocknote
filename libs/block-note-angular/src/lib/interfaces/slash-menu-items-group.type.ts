export interface SlashMenuItemsGroup {
  label: string;
  items: SlashMenuItem[];
}
export interface SlashMenuItem {
  key: string;
  title: string;
  onItemClick: () => void;
  subtext?: string;
  badge?: string;
  aliases?: string[];
  group?: string;
}

export type SlashMenuItemsGroups = SlashMenuItemsGroup[];
