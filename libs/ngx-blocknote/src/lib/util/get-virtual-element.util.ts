export const getVirtualElement = (referencePos: DOMRect) => {
  return {
    getBoundingClientRect() {
      return referencePos;
    },
  };
};
