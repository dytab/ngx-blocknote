import { getVirtualElement } from './get-virtual-element.util';

describe('getVirtualElement', () => {
  it('should return object with getBoundingClientRect function to act as a virtual element for floating ui ', () => {
    const domRect: DOMRect = { x: 0, y: 0 } as DOMRect;
    expect(getVirtualElement(domRect).getBoundingClientRect()).toEqual(domRect);
  });
});
