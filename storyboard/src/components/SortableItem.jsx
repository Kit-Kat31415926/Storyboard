import React from 'react';
import { useSortable } from '@dnd-kit/sortable';

export const SortableItem = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useSortable({ id });

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={{ 
          opacity: isDragging ? 0.5 : 1,
          display: 'inline-block', // This allows inline rendering
          opacity: isDragging ? 0.5 : 1,
          transition: 'opacity 0.2s ease',
          margin: '8px', // Space between items
        }}>
            {children}
        </div>
    );
};