import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import type { TConstructorIngredient } from '@services/burgerConstructor/slice.ts';
import type { Identifier } from 'dnd-core';

import styles from './constructor-ingredient.module.css';

const DRAG_TYPE = 'constructor-ingredient';

type TConstructorIngredientProps = {
  ingredient: TConstructorIngredient;
  index: number;
  onMove: (fromIndex: number, toIndex: number) => void;
  onRemove: (key: string) => void;
};

type TDragItem = {
  index: number;
};

export const ConstructorIngredient = ({
  ingredient,
  index,
  onMove,
  onRemove,
}: TConstructorIngredientProps): React.JSX.Element => {
  const rowRef = useRef<HTMLDivElement>(null);

  const [{ handlerId }, dropRef] = useDrop<
    TDragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: DRAG_TYPE,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item, monitor) {
      const node = rowRef.current;
      if (!node) return;

      const fromIndex = item.index;
      const toIndex = index;

      if (fromIndex === toIndex) return;

      const { top, bottom } = node.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) return;

      const isPointerBelowMiddle = clientOffset.y - top > (bottom - top) / 2;
      const isDraggingDown = fromIndex < toIndex;

      if (isDraggingDown && !isPointerBelowMiddle) return;
      if (!isDraggingDown && isPointerBelowMiddle) return;

      onMove(fromIndex, toIndex);
      item.index = toIndex;
    },
  });

  const [{ isDragging, canDrag, didDrop }, dragRef, dragPreviewRef] = useDrag<
    TDragItem,
    void,
    { isDragging: boolean; canDrag: boolean; didDrop: boolean }
  >({
    type: DRAG_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      canDrag: monitor.canDrag(),
      didDrop: monitor.didDrop(),
    }),
  });

  const attachRef = (node: HTMLDivElement | null): void => {
    rowRef.current = node;
    dropRef(node);
    dragRef(node);
    dragPreviewRef(node);
  };

  return (
    <div
      ref={attachRef}
      data-handler-id={handlerId}
      className={`${styles.constructor_ingredient} mb-4 pr-2 ${isDragging ? 'isDragging' : ''} ${canDrag ? 'canDrag' : ''} ${didDrop ? 'didDrop' : ''}`}
    >
      <DragIcon type={'primary'} />
      <ConstructorElement
        price={ingredient.price}
        text={ingredient.name}
        thumbnail={ingredient.image}
        handleClose={() => {
          onRemove(ingredient.key);
        }}
      />
    </div>
  );
};
