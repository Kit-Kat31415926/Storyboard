import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { Box, Flex, Button, Text, Heading, VStack, Input } from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { TitleBar } from '../components/TitleBar';
import { SceneCard } from '../components/SceneCard';
import SideBar from '../components/SideBar';

const Home = () => {
  const location = useLocation();
  const params = location.state;
  var temp;
  if (params != null) {
    temp = [{
      id: `scene-1`,
      title: '',
      description: params.text,
      image: null,
      expanded: false,
  }];
  } else {
    temp = []
  }
  const [scenes, setScenes] = useState(temp);
  const [selectedSceneIndex, setSelectedSceneIndex] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [saveCreate, setSaveCreate] = useState('Create');
  const [file, setFile] = useState(null); // Store the uploaded file
  const [imageUrl, setImageUrl] = useState(null); // Preview of the uploaded image

  const createNewScene = () => {
    setTitle('');
    setDescription('');
    setSaveCreate('Create');
    setSelectedSceneIndex(null);
    setFile(null);
    setImageUrl(null);
  };

  const editScene = (index) => {
    if (selectedSceneIndex === index) {
      console.log('Deepgram API Key:', process.env.REACT_APP_DEEPGRAM_API_KEY);
      createNewScene()
      return
    }
    const selectedScene = scenes[index];
    // can't use selectedScenesIndex because above operation is asynchronous
    setTitle(selectedScene.title);
    setDescription(selectedScene.description);
    setSaveCreate('Save');
    setSelectedSceneIndex(index);
  };

  const toggleDescription = (id) => {
    setScenes(scenes.map(scene =>
      scene.id === id ? { ...scene, expanded: !scene.expanded } : scene
    ));
  };

  const onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;
  };

  return (
    <Flex minHeight="100vh" bg="white" fontFamily="'Inknut Antiqua', serif">
      <SideBar 
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        saveCreate={saveCreate}
        scenes={scenes}
        setScenes={setScenes}
        selectedSceneIndex={selectedSceneIndex}
        createNewScene={createNewScene}
        file={file}
        setFile={setFile}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}/>
      <Box flex="1" p={8} overflowY="auto">
        <TitleBar scenes={scenes} selectedSceneIndex={selectedSceneIndex} createNewScene={createNewScene} />
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
                        width="250px"
                        transition="transform 0.2s"
                        transform={snapshot.isDragging ? "scale(1.05)" : "scale(1)"}
                        zIndex={snapshot.isDragging ? 100 : 1}
                      >
                        <SceneCard
                          scene={scene}
                          isSelected={selectedSceneIndex === index}
                          onSelect={() => editScene(index)}
                          // onSelect={() => setSelectedScene(scene.id)}
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
    </Flex>
  );
};

export default Home;