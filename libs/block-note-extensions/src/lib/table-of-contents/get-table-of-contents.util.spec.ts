import { getTableOfContents } from './get-table-of-contents.util';

describe('getTableOfContents', () => {
  it('should be defined', () => {
    expect(getTableOfContents).toEqual(expect.any(Function));
  });
});
