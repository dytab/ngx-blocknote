import { BlockTypeSelectItem } from '../../../../interfaces/block-type-select-item';
import { Dictionary } from '@blocknote/core';

export const defaultBlockTypeSelectItems =(  dict: Dictionary): BlockTypeSelectItem[] => [
  {
    name: dict.slash_menu.paragraph.title,
    type: 'paragraph',
    icon: 'lucideType',
    isSelected: (block) => block?.type === 'paragraph',
  },
  {
    name: dict.slash_menu.heading.title,
    type: 'heading',
    props: { level: 1 },
    icon: 'lucideHeading1',
    isSelected: (block) =>
      block?.type === 'heading' &&
      'level' in block.props &&
      block?.props['level'] === 1,
  },
  {
    name: dict.slash_menu.heading_2.title,
    type: 'heading',
    props: { level: 2 },
    icon: 'lucideHeading2',
    isSelected: (block) =>
      block?.type === 'heading' &&
      'level' in block.props &&
      block?.props['level'] === 2,
  },
  {
    name: dict.slash_menu.heading_3.title,
    type: 'heading',
    props: { level: 3 },
    icon: 'lucideHeading3',
    isSelected: (block) =>
      block?.type === 'heading' &&
      'level' in block.props &&
      block?.props['level'] === 3,
  },
  {
    name: dict.slash_menu.bullet_list.title,
    type: 'bulletListItem',
    icon: 'lucideList',
    isSelected: (block) => block?.type === 'bulletListItem',
  },
  {
    name: dict.slash_menu.numbered_list.title,
    type: 'numberedListItem',
    icon: 'lucideListOrdered',
    isSelected: (block) => block?.type === 'numberedListItem',
  },
  {
    name: dict.slash_menu.check_list.title,
    type: 'checkListItem',
    icon: 'lucideListChecks',
    isSelected: (block) => block?.type === 'checkListItem',
  },
];
