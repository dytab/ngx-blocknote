import { computePosition, FloatingElement, offset } from '@floating-ui/dom';

function getBoundingClientRectRow(
  referencePosCell: DOMRect | null,
  referencePosTable: DOMRect | null,
  draggingState?: {
    draggedCellOrientation: 'row' | 'col';
    mousePos: number;
  }
) {
  if (draggingState && draggingState.draggedCellOrientation === 'row') {
    return new DOMRect(
      referencePosTable!.x,
      draggingState.mousePos,
      referencePosTable!.width,
      0
    );
  }

  return new DOMRect(
    referencePosTable!.x,
    referencePosCell!.y,
    referencePosTable!.width,
    referencePosCell!.height
  );
}

function getBoundingClientRectCol(
  referencePosCell: DOMRect | null,
  referencePosTable: DOMRect | null,
  draggingState?: {
    draggedCellOrientation: 'row' | 'col';
    mousePos: number;
  }
) {
  if (draggingState && draggingState.draggedCellOrientation === 'col') {
    return new DOMRect(
      draggingState.mousePos,
      referencePosTable!.y,
      0,
      referencePosTable!.height
    );
  }

  return new DOMRect(
    referencePosCell!.x,
    referencePosTable!.y,
    referencePosCell!.width,
    referencePosTable!.height
  );
}

async function useTableHandlePosition(
  orientation: 'row' | 'col',
  referencePosCell: DOMRect | null,
  referencePosTable: DOMRect | null,
  floatings: {
    row: FloatingElement;
    col: FloatingElement;
  },
  draggingState?: {
    draggedCellOrientation: 'row' | 'col';
    mousePos: number;
  }
) {
  // Will be null on initial render when used in UI component controllers.
  if (referencePosCell === null || referencePosTable === null) {
    return;
  }
  const fn =
    orientation === 'row' ? getBoundingClientRectRow : getBoundingClientRectCol;

  const position = await computePosition(
    {
      getBoundingClientRect: () =>
        fn(referencePosCell, referencePosTable, draggingState),
    },
    floatings[orientation],
    {
      strategy:'fixed',
      placement: orientation === 'row' ? 'left' : 'top',
      middleware: [offset(orientation === 'row' ? -5 : -12)],
    }
  );

  return {
    position,
  };
}

export const useTableHandlesPositioning = async (
  referencePosCell: DOMRect | null,
  referencePosTable: DOMRect | null,
  floatings: {
    row: FloatingElement;
    col: FloatingElement;
  },
  draggingState?: {
    draggedCellOrientation: 'row' | 'col';
    mousePos: number;
  }
) => {
  const rowHandle = await useTableHandlePosition(
    'row',
    referencePosCell,
    referencePosTable,
    floatings,
    draggingState
  );
  const colHandle = await useTableHandlePosition(
    'col',
    referencePosCell,
    referencePosTable,
    floatings,
    draggingState
  );
  return { rowHandle, colHandle };
};
