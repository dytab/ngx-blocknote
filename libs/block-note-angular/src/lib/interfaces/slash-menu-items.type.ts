export interface SlashMenuItem {
  key: string;
  title: string;
  onItemClick: () => void;
  subtext?: string;
  badge?: string;
  aliases?: string[];
  group?: string;
}

