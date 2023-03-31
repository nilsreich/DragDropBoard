import * as React from 'react';
import { Droppable } from './Droppable';
import { Draggable } from './Draggable';
import {
  closestCenter,
  DndContext,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

export default function App() {
  const [value, setValue] = React.useState('');
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { delay: 100, tolerance: 10 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 10 },
    }),
    useSensor(KeyboardSensor, {
      keyboardCodes: {
        start: ['Space'],
        cancel: ['Escape'],
        end: ['Space'],
      },
    })
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
    setValue('');
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
                return item.parent === id ? (
                  <Draggable
                    key={item.id}
                    id={item.id}
                    callback={() =>
                      setItems(
                        items.filter((current) => {
                          return current.id !== item.id;
                        })
                      )
                    }
                  >
                    {item.value}
                  </Draggable>
                ) : null;
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
