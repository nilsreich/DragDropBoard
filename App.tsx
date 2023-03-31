import React, { useState } from 'react';
import { Droppable } from './Droppable';
import { Draggable } from './Draggable';
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

export default function App() {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );
  const containers = ['ToDO', 'inProgress', 'Done'];

  const [items, setItems] = useState([
    { parent: 'ToDO', value: 'x-3', id: crypto.randomUUID() },
    { parent: 'ToDO', value: '2x-4', id: crypto.randomUUID() },
    { parent: 'ToDO', value: 'x^2-9', id: crypto.randomUUID() },
    { parent: 'ToDO', value: '3x^5+5', id: crypto.randomUUID() },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    const temp = [...items];
    let index = temp.findIndex((item) => item.id === active.id);
    temp[index].parent = over.id;
    setItems(temp);
  };

  return (
    <div style={{ display: 'flex', gap: '3rem' }}>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        {containers.map((id) => (
          <Droppable key={id} id={id}>
            <div>{id}</div>
            {items
              .filter((item) => {
                return item.parent === id;
              })
              .map((item) => {
                return (
                  <Draggable key={item.id} id={item.id}>
                    {item.value}
                  </Draggable>
                );
              })}
          </Droppable>
        ))}
      </DndContext>
    </div>
  );
}
