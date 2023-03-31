import * as React from 'react';
import { Droppable } from './Droppable';
import { Draggable } from './Draggable';
import {
  closestCenter,
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
  const style = { display: 'flex', gap: '3rem', marginBottom: '4rem' };

  // Drop an Item
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setItems(
      items.map((item) =>
        item.id === active.id ? { ...item, parent: over.id } : item
      )
    );
  };

  // DropZones
  const containers = ['ToDO', 'inProgress', 'Done'];

  // Items
  const [items, setItems] = React.useState([
    { parent: 'ToDO', value: 'x-3', id: crypto.randomUUID() },
    { parent: 'ToDO', value: '2x-4', id: crypto.randomUUID() },
    { parent: 'ToDO', value: 'x^2-9', id: crypto.randomUUID() },
  ]);

  return (
    <div>
      <div style={style}>
        <DndContext
          onDragEnd={handleDragEnd}
          sensors={sensors}
          collisionDetection={closestCenter}
        >
          {containers.map((id) => (
            <Droppable key={id} id={id}>
              <div>{id}</div>
              {items.map((item) => {
                if (item.parent === id) {
                  return (
                    <Draggable key={item.id} id={item.id}>
                      {item.value}
                    </Draggable>
                  );
                }
              })}
            </Droppable>
          ))}
        </DndContext>
      </div>
      <button onClick={() => console.log(items)}>Log ItemArray</button>
    </div>
  );
}
