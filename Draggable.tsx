import * as React from 'react';
import { useDraggable } from '@dnd-kit/core';

export const Draggable = ({ id, children, callback }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    border: '1px solid black',
    padding: '2px',
    backgroundColor: 'white',
    marginBottom: '5px',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
      <button onClick={callback}>x</button>
    </div>
  );
};
