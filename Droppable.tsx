import * as React from 'react';
import { useDroppable } from '@dnd-kit/core';

export const Droppable = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const style = {
    backgroundColor: isOver ? 'hsl(120,100%,50%,0.2)' : undefined,
    border: '1px solid black',
    padding: '1rem',
    width: '300px',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};
