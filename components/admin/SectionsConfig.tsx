'use client'

import React, { forwardRef, useCallback, useState } from 'react';
import {
    DndContext,
    useDraggable,
    useDroppable,
    DragOverlay,
    DragEndEvent,
    DragStartEvent,
} from '@dnd-kit/core';
import { InputComponenets, InputSteps, Inputs, Settings } from '@/settings/config';
import { saveConfig } from '@/app/actions/api';

const itemStyles: React.CSSProperties = {
    padding: '8px',
    border: '1px solid gray',
    backgroundColor: '#f4f4f4',
    marginBottom: '4px',
};

const draggingItemStyles: React.CSSProperties = {
    backgroundColor: 'lightblue',
    scale: 1.1,
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
};

const containerStyle: React.CSSProperties = {
    padding: '1rem',
    border: '1px solid black',
    minHeight: '100px',
    marginBottom: '1rem',
    minWidth: '100%',
};

function checkSavable(containers: InputSteps) {
    let savable = true;
    for (const key in containers) {
        if (containers[key].length === 0) {
            savable = false;
            break;
        }
    }
    return savable;
}

type SectionsConfigProps = {
    configDefault: Settings;
}
export default function SectionsConfig({ configDefault }: SectionsConfigProps) {
    const [containers, setContainers] = useState<InputSteps>(configDefault.input.steps);
    const [activeId, setActiveId] = useState<string | null>(null);

    const onSave = useCallback(async () => {
        const success = await saveConfig(containers);
        if (success) {
            alert('Saved');
        } else {
            alert('Error saving');
        }
    }, [containers]);
    
    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);
        if (!over) return;
        const sourceContainerId = Object.keys(containers).find((key) =>
            containers[key].includes(active.id.toString() as InputComponenets)
        );
        const targetContainerId = over.id;
        if (
            sourceContainerId &&
            targetContainerId &&
            sourceContainerId !== targetContainerId
        ) {
            setContainers((prev: InputSteps) => {
                const sourceItems = prev[sourceContainerId].filter(
                    (item) => item !== active.id
                );
                const targetItems = [...prev[targetContainerId], active.id.toString() as InputComponenets];
                return {
                    ...prev,
                    [sourceContainerId]: sourceItems,
                    [targetContainerId]: targetItems,
                };
            });
        }
    }, [containers, setContainers]);

    const handleDragStart = useCallback((event: DragStartEvent) => {
        const { active } = event;
        setActiveId(active.id.toString());
    }, [setActiveId]);


    const savable = checkSavable(containers);
    return (<>
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            {Object.entries(containers).map(([id, items]) => (
                <DroppableContainer key={id} id={id} items={items} />
            ))}
            <DragOverlay>
                {activeId ? <Item id={activeId} /> : null}
            </DragOverlay>
        </DndContext>
        <form action={onSave}>
            <input type="hidden" name="sections" value={JSON.stringify(containers)} />
            <button type="submit" disabled={!savable} className="border border-[#ddd] px-8 py-4">Save</button>
        </form>
    </>);
}
  
const DraggableItem: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
    });
  
    const style: React.CSSProperties = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
        ...itemStyles,
        ...{
            pointerEvents: id == Inputs.EMAIL_PASSWORD ? 'none' : 'auto',
        },
    };

    return (
      <div ref={setNodeRef} style={style} {...listeners} {...attributes} suppressHydrationWarning>
        {children}
      </div>
    );
};

type ItemProps = {
    id: string;
}
const Item = forwardRef<HTMLDivElement, ItemProps & React.HTMLAttributes<HTMLDivElement>>(({ id, ...props }, ref) => {
    return (
        <div {...props} style={{...itemStyles, ...draggingItemStyles}} ref={ref} suppressHydrationWarning>{id}</div>
    )
});
Item.displayName = 'Item';

const DroppableContainer: React.FC<{
    id: string;
    items: string[];
}> = ({ id, items }) => {
    const { setNodeRef } = useDroppable({
        id,
    });
  
    return (
      <div ref={setNodeRef} style={containerStyle}>
        {id}
        {items.map((item) => (
            <DraggableItem key={item} id={item}>
                {item}
            </DraggableItem>
        ))}
      </div>
    );
};