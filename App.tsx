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
  const [value, setValue] = React.useState('');
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );
  const style = { display: 'flex', gap: '3rem', marginBottom: '4rem' };

  // DropZones
  const containers = ['To Do', 'In Progress', 'Done'];

  // Items
  const [items, setItems] = React.useState([
    { parent: 'To Do', value: 'x-3', id: crypto.randomUUID() },
    { parent: 'To Do', value: '2x-4', id: crypto.randomUUID() },
    { parent: 'To Do', value: 'x^2-9', id: crypto.randomUUID() },
  ]);

  // Add new Item
  const addNewItem = (e) => {
    e.preventDefault();
    setItems([
      ...items,
      {
        parent: 'To Do',
        value: value,
        id: crypto.randomUUID(),
      },
    ]);
    setValue('')
  };

  return (
    <div>
      <div style={style}>
        <DndContext
          onDragEnd={(e) =>
            setItems(
              items.map((item) =>
                item.id === e.active.id ? { ...item, parent: e.over.id } : item
              )
            )
          }
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
      <form onSubmit={addNewItem}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
        />
        <button>add</button>
      </form>
      <button onClick={() => console.log(items)}>Log ItemArray</button>
    </div>
  );
}
