import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react'
import { 
    DndContext, 
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {
    arrayMove,
    horizontalListSortingStrategy,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from '../components/SortableItem';

import { TitleBar } from '../components/TitleBar';
import { SceneCard } from '../components/SceneCard';
import SideBar from '../components/SideBar';

const Home = () => {
    // Creates scenes to be displayed
    const [scenes, setScenes] = useState([]);
    // Highlights selected scene
    const [selectedScene, setSelectedScene] = useState(null);
    // Set draggable properties
    const [activeId, setActiveId] = useState(null);
    
    // Adds scene to screen
    const addScene = (title, description) => {
        const newScene = {
            id: `scene-${scenes.length + 1}`,
            title: title,
            description: description,
            expanded: false
        };
        setScenes([...scenes, newScene]);
    };

    // Increases size of description within panel
    const toggleDescription = (id) => {
        setScenes(scenes.map(scene =>
            scene.id === id ? { ...scene, expanded: !scene.expanded } : scene
        ));
    };

    // Creates sensors for dragging
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );
  
    // Allows dragging of panels
    function handleDragEnd(event) {
        const {active, over} = event;
        if (active.id !== over.id) {
            setScenes((items) => {
                const oldIndex = scenes.findIndex(scene => scene.id === active.id);
                const newIndex = scenes.findIndex(scene => scene.id === over.id);
                
                return arrayMove(scenes, oldIndex, newIndex);
            });
        }
    }

    return (
        <Flex minHeight="100vh" bg="white" fontFamily="'Roboto', sans-serif">
        <SideBar onAddScene={ addScene } />
        <Box flex="1" p={8} overflowY="auto">
            <TitleBar selectedScene={ selectedScene } onAddScene={ addScene } />
            <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext 
                    items={scenes}
                    strategy={horizontalListSortingStrategy}
                >
                    {scenes.map((scene) =>
                        <SortableItem key={scene.id} id={scene.id}>
                            <SceneCard
                                scene={scene}
                                isSelected={false}
                                onSelect={() => setSelectedScene(scene.id)}
                                onToggleDescription={toggleDescription}
                            />
                        </SortableItem>
                    )}
                </SortableContext>
            </DndContext>
        </Box>
        </Flex>
    );
};

export default Home;