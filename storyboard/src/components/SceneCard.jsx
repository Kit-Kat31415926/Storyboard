import React from 'react';

const SceneCard = ({ scene, isSelected, onSelect, onToggleDescription }) => {
    return (
        <div 
            style={{
                border: isSelected ? '2px solid blue' : '1px solid gray',
                padding: '10px',
                borderRadius: '4px',
                backgroundColor: isSelected ? '#f0f8ff' : 'white',
                cursor: 'move', // Indicates draggable
                transition: 'background-color 0.2s, border 0.2s', // Smooth transitions
                zIndex: 1, // Make sure it's above others when dragging
            }}
            onClick={onSelect}
        >
            <h3>{scene.title}</h3>
            {scene.expanded && <p>{scene.description}</p>}
            <button onClick={() => onToggleDescription(scene.id)}>Toggle Description</button>
        </div>
    );
};

export default SceneCard;