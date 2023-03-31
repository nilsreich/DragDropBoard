import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export const Droppable = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    backgroundColor: isOver ? 'green' : undefined,
    border: '1px solid black',
    padding: '1rem',
    width: '300px',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};
