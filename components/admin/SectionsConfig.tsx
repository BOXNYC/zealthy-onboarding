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
import { InputSteps } from "@/types/config";
import { Inputs } from '@/settings/config';

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

type SectionsConfigProps = {
    sectionsDefault: InputSteps;
}
export default function SectionsConfig({ sectionsDefault }: SectionsConfigProps) {
    const [containers, setContainers] = useState<InputSteps>(sectionsDefault);
    const [activeId, setActiveId] = useState<string | null>(null);

    const onSave = useCallback((data: FormData) => {
        console.log('Save', data.get('sections'));
    }, []);
    
    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);
        if (!over) return;
        const sourceContainerId = Object.keys(containers).find((key) =>
            containers[key].includes(active.id.toString())
        );
        const targetContainerId = over.id;
        if (
            sourceContainerId &&
            targetContainerId &&
            sourceContainerId !== targetContainerId
        ) {
            setContainers((prev) => {
                const sourceItems = prev[sourceContainerId].filter(
                    (item) => item !== active.id
                );
                const targetItems = [...prev[targetContainerId], active.id.toString()];
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
            <button type="submit">Save</button>
        </form>
        <pre>{JSON.stringify(containers, null, 2)}</pre>
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

    attributes['aria-describedby'] = attributes['aria-describedby'] || '';

    return (
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        {children}
      </div>
    );
};

interface ItemProps {
    id: string;
}
const Item = forwardRef<HTMLDivElement, ItemProps>(({ id, ...props }, ref) => {
    return (
        <div {...props} style={{...itemStyles, ...draggingItemStyles}} ref={ref}>{id}</div>
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