import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { 
    DndContext, 
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay
} from '@dnd-kit/core';
import {
    arrayMove,
    horizontalListSortingStrategy,
    SortableContext,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { SortableItem } from '../components/SortableItem';
import { TitleBar } from '../components/TitleBar';
import { SceneCard } from '../components/SceneCard';
import SideBar from '../components/SideBar';

const Home = () => {
    const [scenes, setScenes] = useState([]);
    const [selectedScene, setSelectedScene] = useState(null);
    const [activeId, setActiveId] = useState(null);
    
    const addScene = (title, description) => {
        const newScene = {
            id: `scene-${scenes.length + 1}`,
            title: title,
            description: description,
            expanded: false
        };
        setScenes([...scenes, newScene]);
    };

    const toggleDescription = (id) => {
        setScenes(scenes.map(scene =>
            scene.id === id ? { ...scene, expanded: !scene.expanded } : scene
        ));
    };

    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );

    function handleDragStart(event) {
        setActiveId(event.active.id);
    }

    function handleDragEnd(event) {
        const { active, over } = event;
        if (active.id !== over.id) {
            setScenes((items) => {
                const oldIndex = scenes.findIndex(scene => scene.id === active.id);
                const newIndex = scenes.findIndex(scene => scene.id === over.id);
                return arrayMove(scenes, oldIndex, newIndex);
            });
        }
        // Reset activeId after dragging
        setActiveId(null);
    }

    return (
        <Flex minHeight="100vh" bg="white" fontFamily="'Roboto', sans-serif">
            <SideBar onAddScene={addScene} />
            <Box flex="1" p={8} overflowY="auto">
                <TitleBar selectedScene={selectedScene} onAddScene={addScene} />
                <DndContext 
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}
                >
                    <SortableContext 
                        items={scenes}
                        strategy={horizontalListSortingStrategy}
                    >
                        {scenes.map((scene) =>
                            <SortableItem key={scene.id} id={scene.id}>
                                <SceneCard
                                    scene={scene}
                                    isSelected={selectedScene === scene.id}
                                    onSelect={() => setSelectedScene(scene.id)}
                                    onToggleDescription={toggleDescription}
                                />
                            </SortableItem>
                        )}
                    </SortableContext>
                    <DragOverlay>
                        {activeId ? (
                            <SceneCard
                                scene={scenes.find(scene => scene.id === activeId)}
                                isSelected={false}
                            />
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </Box>
        </Flex>
    );
};

export default Home;