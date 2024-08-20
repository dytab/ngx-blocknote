import { getTableOfContents } from './get-table-of-contents.util';

describe('getTableOfContents', () => {
  const editor = {
    document: [
      {
        id: 1,
        type: 'heading',
        props: { level: 1 },
        content: [{ type: 'text', text: 'Level 1 Heading' }],
      },
      {
        type: 'paragraph',
      },
      {
        id: 2,
        type: 'heading',
        props: { level: 2 },
        content: [{ type: 'text', text: 'Level 2 Heading' }],
      },
      {
        id: 3,

        type: 'heading',
        props: { level: 1 },
        content: [{ type: 'text', text: 'Second Level 1 Heading' }],
      },
      {
        type: 'paragraph',
      },
      {
        type: 'image',
      },
      {
        type: 'table',
      },
      {
        id: 5,
        type: 'heading',
        props: { level: 2 },
        content: [
          {
            content: [
              { type: 'text', text: 'Hello' },
              { type: 'text', text: 'World' },
            ],
          },
        ],
      },
    ],
  } as never;

  it('should be defined', () => {
    expect(getTableOfContents).toEqual(expect.any(Function));
  });

  it('should return the correct table of contents', () => {
    expect(getTableOfContents(editor)).toEqual([
      {
        id: 1,
        headingLevel: 1,
        text: 'Level 1 Heading',
      },
      {
        id: 2,
        headingLevel: 2,
        text: 'Level 2 Heading',
      },
      {
        id: 3,
        headingLevel: 1,
        text: 'Second Level 1 Heading',
      },
      {
        id: 5,
        headingLevel: 2,
        text: 'Hello, World',
      },
    ]);
  });
});
