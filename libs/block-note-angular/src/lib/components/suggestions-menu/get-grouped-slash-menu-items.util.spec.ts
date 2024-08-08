import { getGroupedSlashMenuItems } from './get-grouped-slash-menu-items.util';

describe('getGroupedSlashMenuItems', () => {
  it('should return empty array, when items are empty', () => {
    expect(getGroupedSlashMenuItems([])).toEqual([]);
  });

  it('should return groups with items', () => {
    expect(
      getGroupedSlashMenuItems([
        {
          badge: 'Ctrl-Alt-1',
          key: 'heading',
          title: 'Heading 1',
          subtext: 'Top-level heading',
          aliases: ['h', 'heading1', 'h1'],
          group: 'Headings',
          onItemClick: () => undefined,
        },
        {
          badge: 'Ctrl-Alt-2',
          key: 'heading_2',
          title: 'Heading 2',
          subtext: 'Key section heading',
          aliases: ['h2', 'heading2', 'subheading'],
          group: 'Headings',
          onItemClick: () => undefined,
        },
        {
          badge: 'Ctrl-Alt-3',
          key: 'heading_3',
          title: 'Heading 3',
          subtext: 'Subsection and group heading',
          aliases: ['h3', 'heading3', 'subheading'],
          group: 'Headings',
          onItemClick: () => undefined,
        },
        {
          badge: 'Ctrl-Shift-9',
          key: 'check_list',
          title: 'Check List',
          subtext: 'List with checkboxes',
          onItemClick: () => undefined,
          aliases: [
            'ul',
            'li',
            'list',
            'checklist',
            'check list',
            'checked list',
            'checkbox',
          ],
          group: 'Basic blocks',
        },
      ])
    ).toEqual([
      {
        label: 'Headings',
        items: [
          {
            aliases: ['h', 'heading1', 'h1'],
            badge: 'Ctrl-Alt-1',
            group: 'Headings',
            key: 'heading',
            onItemClick: expect.any(Function),
            subtext: 'Top-level heading',
            title: 'Heading 1',
          },
          {
            aliases: ['h2', 'heading2', 'subheading'],
            badge: 'Ctrl-Alt-2',
            group: 'Headings',
            key: 'heading_2',
            onItemClick: expect.any(Function),
            subtext: 'Key section heading',
            title: 'Heading 2',
          },
          {
            aliases: ['h3', 'heading3', 'subheading'],
            badge: 'Ctrl-Alt-3',
            group: 'Headings',
            key: 'heading_3',
            onItemClick: expect.any(Function),
            subtext: 'Subsection and group heading',
            title: 'Heading 3',
          },
        ],
      },
      {
        label: 'Basic blocks',
        items: [
          {
            aliases: [
              'ul',
              'li',
              'list',
              'checklist',
              'check list',
              'checked list',
              'checkbox',
            ],
            badge: 'Ctrl-Shift-9',
            group: 'Basic blocks',
            key: 'check_list',
            onItemClick: expect.any(Function),
            subtext: 'List with checkboxes',
            title: 'Check List',
          },
        ],
      },
    ]);
  });
});
