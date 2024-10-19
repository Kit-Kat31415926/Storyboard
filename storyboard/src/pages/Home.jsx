import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { TitleBar } from '../components/TitleBar';
import { SceneCard } from '../components/SceneCard';

const Home = () => {
  const [scenes, setScenes] = useState([]);
  const [selectedScene, setSelectedScene] = useState(null);

  const addScene = () => {
    const newScene = {
      id: `scene-${scenes.length + 1}`,
      title: `Scene ${scenes.length + 1}`,
      description: 'New scene description',
      expanded: false,
    };
    setScenes([...scenes, newScene]);
  };

  const toggleDescription = (id) => {
    setScenes(scenes.map(scene =>
      scene.id === id ? { ...scene, expanded: !scene.expanded } : scene
    ));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(scenes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setScenes(items);
  };

  return (
    <Box minHeight="100vh" bg="white" fontFamily="'Roboto', sans-serif">
      <TitleBar selectedScene={selectedScene} onAddScene={addScene} />
      <Box p={8} overflowY="auto" height="calc(100vh - 70px)">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="scenes" direction="horizontal">
            {(provided) => (
              <Flex
                flexWrap="wrap"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {scenes.map((scene, index) => (
                  <Draggable key={scene.id} draggableId={scene.id} index={index}>
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        m={2}
                        transition="transform 0.2s"
                        transform={snapshot.isDragging ? "scale(1.05)" : "scale(1)"}
                        zIndex={snapshot.isDragging ? 100 : 1}
                      >
                        <SceneCard
                          scene={scene}
                          isSelected={selectedScene === scene.id}
                          onSelect={() => setSelectedScene(scene.id)}
                          onToggleDescription={toggleDescription}
                        />
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Flex>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </Box>
  );
};

export default Home;