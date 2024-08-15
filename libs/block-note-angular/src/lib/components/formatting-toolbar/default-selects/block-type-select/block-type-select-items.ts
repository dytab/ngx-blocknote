import { BlockTypeSelectItem } from '../../../../interfaces/block-type-select-item';

export const blockTypeSelectItems: BlockTypeSelectItem[] = [
  {
    name: 'Paragraph',
    type: 'paragraph',
    icon: 'lucideType',
    isSelected: (block) => block?.type === 'paragraph',
  },
  {
    name: 'Heading 1',
    type: 'heading',
    props: { level: 1 },
    icon: 'lucideHeading1',
    isSelected: (block) =>
      block?.type === 'heading' &&
      'level' in block.props &&
      block?.props['level'] === 1,
  },
  {
    name: 'Heading 2',
    type: 'heading',
    props: { level: 2 },
    icon: 'lucideHeading2',
    isSelected: (block) =>
      block?.type === 'heading' &&
      'level' in block.props &&
      block?.props['level'] === 2,
  },
  {
    name: 'Heading 3',
    type: 'heading',
    props: { level: 3 },
    icon: 'lucideHeading3',
    isSelected: (block) =>
      block?.type === 'heading' &&
      'level' in block.props &&
      block?.props['level'] === 3,
  },
  {
    name: 'Heading 4',
    type: 'heading',
    props: { level: 4 },
    icon: 'lucideHeading4',
    isSelected: (block) =>
      block?.type === 'heading' &&
      'level' in block.props &&
      block?.props['level'] === 4,
  },
  {
    name: 'Heading 5',
    type: 'heading',
    props: { level: 5 },
    icon: 'lucideHeading5',
    isSelected: (block) =>
      block?.type === 'heading' &&
      'level' in block.props &&
      block?.props['level'] === 5,
  },
  {
    name: 'Heading 6',
    type: 'heading',
    props: { level: 6 },
    icon: 'lucideHeading6',
    isSelected: (block) =>
      block?.type === 'heading' &&
      'level' in block.props &&
      block?.props['level'] === 6,
  },
  {
    name: 'Bullet List',
    type: 'bulletListItem',
    icon: 'lucideList',
    isSelected: (block) => block?.type === 'bulletListItem',
  },
  {
    name: 'Numbered List',
    type: 'numberedListItem',
    icon: 'lucideListOrdered',
    isSelected: (block) => block?.type === 'numberedListItem',
  },
  {
    name: 'Check List',
    type: 'checkListItem',
    icon: 'lucideListChecks',
    isSelected: (block) => block?.type === 'checkListItem',
  },
] as const;
